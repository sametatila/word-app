import type { SpeakingDrillExercise } from "../types";

/**
 * Konuşma alıştırmaları — Almanca kursu.
 *
 * Küçük ve odaklı bir havuz: her egzersiz **tek bir ses sorununu** çalıştırır.
 * Rastgele cümle söyletmek yerine böyle kurulmasının sebebi, düzeltmenin
 * içerikten gelmesi (bkz. lib/speech.ts): tanıyıcı bize "ne duydum"u söyler,
 * "hangi ses bozuktu"yu söylemez. O yüzden her göreve, Türkçe konuşan birinin
 * o kelimede yapacağı sapma önceden yazılır.
 *
 * `heard` yazarken üç kural:
 *
 *   1. **Gerçek bir Almanca kelime olmalı.** Tanıyıcı Almanca sözlükten yazar;
 *      "şön" ya da "horen" gibi var olmayan biçimler hiçbir zaman dönmez, öyle
 *      bir satır ölü içeriktir.
 *   2. **Doğru biçimi içermemeli.** "Ich bin nick müde" satırı „ich“i
 *      düzeltmek için yazılamaz, çünkü „ich“ zaten içinde geçiyor.
 *   3. **Hedefin kendisi olmamalı.** Yalnızca büyük harf ya da noktalama
 *      farkıyla yazılan bir satır doğru söyleyen öğrenciye "hata yaptın" der.
 *
 * Tek kelimelik satırlar tam cümlelerden daha sağlam: tanıyıcı cümlenin
 * tamamını her seferinde farklı yazabilir ama kelimeyi yakalamak yeter.
 *
 * Üç kuralı da e2e mekanik olarak doğruluyor (bkz. "Konuşma alıştırmaları
 * içeriği"): yazdığın her sapma judgeSpeech'ten geçmezse test düşer.
 */
export const speaking: SpeakingDrillExercise[] = [
  // ─────────────────── A1 · uzun ve kısa ünlü ───────────────────
  //
  // Bu egzersiz önce „Ö und Ü“ idi ve yanlış varsayıma dayanıyordu: Türkçede
  // ö ve ü zaten var, dolayısıyla Türkçe konuşan biri „schön“ yerine „schon“
  // demez — o, İngilizce konuşanın hatası. Kendi ipucu da bunu itiraf
  // ediyordu („Türkçe ö ile aynı“), yani egzersiz kendi öncülüyle çelişiyordu.
  //
  // Kontrastif fonetiğin işaret ettiği gerçek zorluk ünlü **uzunluğu**:
  // Türkçede ünlü uzunluğu anlam ayırmaz, Almancada ayırır. Türkçe konuşanlar
  // uzun ünlüleri kısaltıp kısa olanları uzatma eğiliminde.
  //
  // fühlen/füllen ve Höhle/Hölle çiftleri bunu kanıtlıyor: ses kalitesi aynı
  // (ü ü, ö ö), değişen tek şey uzunluk — ve kelime bambaşka oluyor.
  {
    id: "a1-s1",
    level: "A1",
    skill: "speaking",
    title: "Lange und kurze Vokale",
    genre: "Ses çalışması",
    intro:
      "Türkçede ünlünün uzunluğu anlamı değiştirmez; Almancada değiştirir. Aynı ünlü kısa ya da uzun olduğunda karşına bambaşka bir kelime çıkar.",
    gloss: [
      { de: "die Stadt / der Staat", tr: "şehir / devlet", en: "city / state" },
      { de: "in / ihn", tr: "içinde / onu", en: "in / him" },
      { de: "offen / der Ofen", tr: "açık / fırın", en: "open / oven" },
      { de: "füllen / fühlen", tr: "doldurmak / hissetmek", en: "to fill / to feel" },
      { de: "die Hölle / die Höhle", tr: "cehennem / mağara", en: "hell / cave" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Ich wohne in der Stadt.",
        tr: "Şehirde oturuyorum.",
        en: "I live in the city.",
        hint: "„Stadt“ta a KISA: ŞTAT. Uzatırsan „Staat“ (devlet) olur.",
        confusions: [
          {
            heard: ["Staat", "Staate", "Staaten"],
            fix: "„Stadt“taki a'yı uzattın ve „Staat“ (devlet) duyuldu. Sesi kısa kes: ŞTAT.",
            expected: "Stadt",
          },
        ],
      },
      {
        de: "Der Staat zahlt das.",
        tr: "Bunu devlet ödüyor.",
        en: "The state pays for that.",
        hint: "Burada tam tersi: „Staat“ta a UZUN — ŞTAAT. İki a'yı da duy.",
        confusions: [
          {
            heard: ["Stadt", "Statt", "stad"],
            fix: "„Staat“taki a kısa kaldı ve „Stadt“ (şehir) duyuldu. Sesi iki katı kadar tut.",
            expected: "Staat",
          },
        ],
      },
      {
        de: "Ich kenne ihn gut.",
        tr: "Onu iyi tanıyorum.",
        en: "I know him well.",
        hint: "„ihn“de i UZUN: İİN. „in“ ise kısacıktır.",
        confusions: [
          {
            heard: ["in", "im", "Inn"],
            fix: "„ihn“ (onu) yerine „in“ (içinde) duyuldu — ikisi arasındaki tek fark i'nin uzunluğu.",
            expected: "ihn",
          },
        ],
      },
      {
        de: "Das Fenster ist offen.",
        tr: "Pencere açık.",
        en: "The window is open.",
        hint: "„offen“de o KISA ve ardından çift f gelir: OF-fen.",
        confusions: [
          {
            heard: ["Ofen", "oben", "hoffen"],
            fix: "„offen“ (açık) yerine „Ofen“ (fırın) duyuldu. Çift ünsüz, önündeki ünlünün kısa olduğunu gösterir.",
            expected: "offen",
          },
        ],
      },
      {
        de: "Ich fühle mich gut.",
        tr: "Kendimi iyi hissediyorum.",
        en: "I feel good.",
        hint: "Buradaki ü Türkçedeki ü ile aynı — tek fark UZUN olması: FÜÜ-le.",
        confusions: [
          {
            heard: ["fülle", "füllen", "Fülle"],
            fix: "„fühle“ (hissetmek) yerine „fülle“ (doldurmak) duyuldu. Ses doğruydu, uzunluk kısa kaldı — „h“ o ünlüyü uzatır.",
            expected: "fühle",
          },
        ],
      },
      {
        de: "Wir haben eine Höhle gefunden.",
        tr: "Bir mağara bulduk.",
        en: "We found a cave.",
        hint: "„Höhle“de ö uzun (HÖÖ-le); „Hölle“de kısa. Ö sesi ikisinde de aynı.",
        confusions: [
          {
            heard: ["Hölle", "helle", "holen"],
            fix: "„Höhle“ (mağara) yerine „Hölle“ (cehennem) duyuldu — ö'yü uzat, „h“ bunun işareti.",
            expected: "Höhle",
          },
        ],
      },
    ],
  },

  {
    id: "a1-s2",
    level: "A1",
    skill: "speaking",
    title: "W, V und Z",
    genre: "Ses çalışması",
    intro:
      "Bu üç harf Almancada Türkçedekinden farklı okunur: w = v, v = f, z = ts. En sık yapılan hata bunlar.",
    gloss: [
      { de: "das Wasser", tr: "su", en: "water" },
      { de: "wohnen", tr: "oturmak", en: "to live" },
      { de: "der Vater", tr: "baba", en: "father" },
      { de: "die Zeit", tr: "zaman", en: "time" },
      { de: "zwei", tr: "iki", en: "two" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Wasser",
        tr: "su",
        en: "water",
        hint: "„w“ harfi Türkçe „v“ gibi okunur: VAsser.",
        confusions: [
          {
            heard: ["Vater", "was"],
            fix: "Kelime tanınmadı. „w“ = v: alt dudak üst dişlere değsin, İngilizce „w“ gibi yuvarlama.",
            expected: "Wasser",
          },
        ],
      },
      {
        de: "Wo wohnen Sie?",
        tr: "Nerede oturuyorsunuz?",
        en: "Where do you live?",
        confusions: [
          {
            heard: ["Bohnen", "wollen", "kommen"],
            fix: "„wohnen“ VOO-nen diye okunur; „oh“ uzundur ve w, v sesidir.",
            expected: "wohnen",
          },
        ],
      },
      {
        de: "Mein Vater ist Lehrer.",
        tr: "Babam öğretmen.",
        en: "My father is a teacher.",
        hint: "„v“ harfi f gibi okunur: FAA-ter.",
        confusions: [
          {
            heard: ["Wetter", "Vetter"],
            fix: "„Vater“deki v, f sesidir — v değil. „Vetter“ (kuzen) ile karışmasın.",
            expected: "Vater",
          },
        ],
      },
      {
        de: "Ich habe keine Zeit.",
        tr: "Vaktim yok.",
        en: "I have no time.",
        hint: "„z“ = ts. Dilin ucu dişlere değsin: TSAYT.",
        confusions: [
          {
            heard: ["seit", "Seite", "weit"],
            fix: "„Zeit“ Türkçe z ile başlamaz, ts ile. „seit“ (-den beri) başka bir kelime.",
            expected: "Zeit",
          },
        ],
      },
      {
        de: "zwei Kinder",
        tr: "iki çocuk",
        en: "two children",
        confusions: [
          {
            heard: ["Schwein", "schwer", "sei"],
            fix: "„zwei“ = TSVAY. Hem z (ts) hem w (v) burada birlikte geçiyor.",
            expected: "zwei",
          },
        ],
      },
      {
        de: "Wir wohnen zusammen in Wien.",
        tr: "Viyana'da birlikte oturuyoruz.",
        en: "We live together in Vienna.",
        hint: "„Wien“ VEEN diye okunur — „Wein“ (şarap) ile karıştırma.",
        confusions: [
          {
            heard: ["Wein", "wen"],
            fix: "„Wien“ (Viyana) yerine „Wein“ (şarap) duyuldu: „ie“ uzun i'dir, „ei“ ise ay.",
            expected: "Wien",
          },
        ],
      },
    ],
  },

  // ─────────────────── A2 · „ie“ ve „ei“ ───────────────────
  //
  // Bu bir telaffuz değil **okuma** sorunu ve Türkçe konuşanda özellikle
  // inatçı: Türkçede harfler tek tek okunduğu için „ie“ ve „ei“ ikilileri
  // beklenen sesi vermiyor. Kural basit — ikilinin İKİNCİ harfi sesi söyler:
  // „ie“ uzun i, „ei“ ise ay.
  //
  // Seçilen çiftlerin hepsi gerçek kelime ve tek farkları bu iki harfin
  // sırası; yani yanlış okuma sessizce geçmiyor, karşına başka bir kelime
  // çıkarıyor.
  {
    id: "a2-s2",
    level: "A2",
    skill: "speaking",
    title: "„ie“ und „ei“",
    genre: "Ses çalışması",
    intro:
      "İkilinin ikinci harfi sesi belirler: „ie“ uzun i, „ei“ ise ay. Harfleri tek tek okursan kelime değişir — hepsi gerçek kelime olduğu için hata fark edilmeden geçer.",
    gloss: [
      { de: "die Reise / der Riese", tr: "yolculuk / dev", en: "journey / giant" },
      { de: "die Wiese / die Weise", tr: "çayır / biçim", en: "meadow / manner" },
      { de: "sie / sei", tr: "onlar / ol", en: "they / be" },
      { de: "bieten", tr: "sunmak", en: "to offer" },
      { de: "beide", tr: "her ikisi", en: "both" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Die Reise war sehr schön.",
        tr: "Yolculuk çok güzeldi.",
        en: "The journey was very nice.",
        hint: "„Reise“de „ei“ var → RAY-ze. „Riese“ (dev) ise Rİİ-ze.",
        confusions: [
          {
            heard: ["Riese", "Riesen", "riesig"],
            fix: "„Reise“ (yolculuk) yerine „Riese“ (dev) duyuldu. „ei“ ay diye okunur: RAY-ze.",
            expected: "Reise",
          },
        ],
      },
      {
        de: "Der Riese war sehr groß.",
        tr: "Dev çok büyüktü.",
        en: "The giant was very big.",
        hint: "Şimdi tersi: „Riese“de „ie“ var → Rİİ-ze, uzun i.",
        confusions: [
          {
            heard: ["Reise", "reise", "Reisen"],
            fix: "„Riese“ (dev) yerine „Reise“ (yolculuk) duyuldu. „ie“ uzun i'dir, ay değil.",
            expected: "Riese",
          },
        ],
      },
      {
        de: "Die Kühe stehen auf der Wiese.",
        tr: "İnekler çayırda duruyor.",
        en: "The cows are standing in the meadow.",
        hint: "„Wiese“ = Vİİ-ze. „Weise“ (biçim, yol) ise VAY-ze.",
        confusions: [
          {
            heard: ["Weise", "weise", "Weisen"],
            fix: "„Wiese“ (çayır) yerine „Weise“ (biçim) duyuldu — „ie“ uzun i.",
            expected: "Wiese",
          },
        ],
      },
      {
        de: "Auf diese Weise geht es schneller.",
        tr: "Bu şekilde daha hızlı oluyor.",
        en: "This way it goes faster.",
        hint: "„Weise“de „ei“ → VAY-ze. Aynı cümledeki „diese“ ise Dİİ-ze.",
        confusions: [
          {
            heard: ["Wiese", "Wiesen", "weiß"],
            fix: "„Weise“ (biçim) yerine „Wiese“ (çayır) duyuldu. „ei“ ay okunur.",
            expected: "Weise",
          },
        ],
      },
      {
        de: "Sie bieten uns einen guten Preis.",
        tr: "Bize iyi bir fiyat sunuyorlar.",
        en: "They are offering us a good price.",
        hint: "„bieten“ = Bİİ-ten. „beide“ (her ikisi) ile karıştırma: BAY-de.",
        confusions: [
          {
            heard: ["beide", "beiden", "betten"],
            fix: "„bieten“ (sunmak) yerine „beide“ (her ikisi) duyuldu — „ie“ uzun i, „ei“ ay.",
            expected: "bieten",
          },
        ],
      },
      {
        de: "Beide Kinder sind hier.",
        tr: "Her iki çocuk da burada.",
        en: "Both children are here.",
        hint: "„beide“ = BAY-de. Aynı cümlede „hier“ ise HİİR — iki kural yan yana.",
        confusions: [
          {
            heard: ["bieten", "biete", "Biene"],
            fix: "„beide“ (her ikisi) yerine „bieten“ duyuldu. „ei“ ay diye okunur.",
            expected: "beide",
          },
        ],
      },
    ],
  },

  // ─────────────────────── A2 · ch sesleri ───────────────────────
  {
    id: "a2-s1",
    level: "A2",
    skill: "speaking",
    title: "Der ch-Laut",
    genre: "Ses çalışması",
    intro:
      "Almancada iki ayrı „ch“ var: ince ünlülerden sonra yumuşak (ich), kalın ünlülerden sonra gırtlaktan (auch). Türkçede ikisi de yok.",
    gloss: [
      { de: "nicht", tr: "değil", en: "not" },
      { de: "die Milch", tr: "süt", en: "milk" },
      { de: "auch", tr: "de", en: "also" },
      { de: "das Buch", tr: "kitap", en: "book" },
      { de: "die Küche", tr: "mutfak", en: "kitchen" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Ich bin nicht müde.",
        tr: "Yorgun değilim.",
        en: "I am not tired.",
        hint: "„nicht“teki ch yumuşaktır — Türkçe „ş“ ya da „k“ değil. Dilin ortası damağa yaklaşır.",
        confusions: [
          {
            heard: ["nickt", "nix", "Nacht"],
            fix: "„nicht“in sonunu k gibi kapattın. Dili damağa yaklaştır ama dokundurma; hava sürtünerek çıksın.",
            expected: "nicht",
          },
        ],
      },
      {
        de: "Ich trinke gern Milch.",
        tr: "Süt içmeyi severim.",
        en: "I like drinking milk.",
        confusions: [
          {
            heard: ["Milz", "mild"],
            fix: "„Milch“ sonundaki ch ne k ne ş ne z. Yumuşak sürtünme sesiyle bitir.",
            expected: "Milch",
          },
        ],
      },
      {
        de: "Ich lese auch ein Buch.",
        tr: "Ben de bir kitap okuyorum.",
        en: "I am reading a book too.",
        hint: "Burada ch gırtlaktan: „auch“ ve „Buch“ta boğazın arkası çalışır.",
        confusions: [
          {
            heard: ["Bock", "Bug"],
            fix: "„Buch“ sonu k değil. Gırtlaktan sürtünen bir ses — Türkçedeki „hırıltılı h“ya yakın.",
            expected: "Buch",
          },
        ],
      },
      {
        de: "Die Küche ist klein.",
        tr: "Mutfak küçük.",
        en: "The kitchen is small.",
        confusions: [
          {
            heard: ["Kuchen", "Kirche"],
            fix: "„Küche“ (mutfak), „Kuchen“ (kek) ve „Kirche“ (kilise) üçü de birbirine yakın: ü'yü yuvarla, ch'yi yumuşak tut.",
            expected: "Küche",
          },
        ],
      },
      {
        de: "Natürlich, sehr gern!",
        tr: "Tabii ki, memnuniyetle!",
        en: "Of course, gladly!",
        confusions: [
          {
            heard: ["Natur", "naturell"],
            fix: "Hem ü hem yumuşak ch var: na-TÜÜR-lihh. Sonu düşmesin.",
            expected: "natürlich",
          },
        ],
      },
      {
        de: "Ich möchte noch einen Kaffee.",
        tr: "Bir kahve daha istiyorum.",
        en: "I would like another coffee.",
        hint: "„ich“ yumuşak, „noch“ gırtlaktan — iki ch sesi aynı cümlede.",
        confusions: [
          {
            heard: ["nach", "doch"],
            fix: "„noch“ (daha) ile „nach“ (-e doğru) karıştı: o kısadır ve ch gırtlaktan gelir.",
            expected: "noch",
          },
        ],
      },
    ],
  },

  // ─────────────────────── B1 · sp, st ve ünlü uzunluğu ───────────────────────
  {
    id: "b1-s1",
    level: "B1",
    skill: "speaking",
    title: "Sp, St und Vokallänge",
    genre: "Ses çalışması",
    intro:
      "Kelime başındaki sp/st „şp/şt“ okunur. Ayrıca ünlü uzunluğu anlam ayırır: „Stadt“ (şehir) ile „Staat“ (devlet) aynı değil.",
    gloss: [
      { de: "die Stadt", tr: "şehir", en: "city" },
      { de: "der Staat", tr: "devlet", en: "state" },
      { de: "sprechen", tr: "konuşmak", en: "to speak" },
      { de: "der Sport", tr: "spor", en: "sport" },
      { de: "spät", tr: "geç", en: "late" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Ich spreche ein bisschen Deutsch.",
        tr: "Biraz Almanca konuşuyorum.",
        en: "I speak a little German.",
        hint: "Kelime başındaki „sp“ = şp: ŞPREH-e.",
        confusions: [
          {
            heard: ["Sprache", "sprach", "breche"],
            fix: "„spreche“ ŞP ile başlar ve sonu yumuşak ch'dir; „Sprache“ (dil) ise isimdir.",
            expected: "spreche",
          },
        ],
      },
      {
        de: "Die Stadt ist sehr groß.",
        tr: "Şehir çok büyük.",
        en: "The city is very big.",
        confusions: [
          {
            heard: ["Staat", "statt", "Start"],
            fix: "„Stadt“ (şehir) kısa a ile, „Staat“ (devlet) uzun a ile söylenir. Kısa tut.",
            expected: "Stadt",
          },
        ],
      },
      {
        de: "Ich treibe gern Sport.",
        tr: "Spor yapmayı severim.",
        en: "I like doing sport.",
        confusions: [
          {
            heard: ["Spur", "Sorte"],
            fix: "„Sport“ ŞPORT diye okunur — Türkçedeki „spor“ gibi değil, sonunda t de var.",
            expected: "Sport",
          },
        ],
      },
      {
        de: "Es ist schon spät.",
        tr: "Vakit geç oldu.",
        en: "It is already late.",
        hint: "Burada „schon“ (zaten) doğru — „schön“ değil. „spät“ ise uzun okunur.",
        confusions: [
          {
            heard: ["spielt", "Speed"],
            fix: "„spät“ ŞPEET diye uzun söylenir; kısa kesince başka bir kelimeye dönüyor.",
            expected: "spät",
          },
        ],
      },
      {
        de: "Wir stehen am Bahnhof.",
        tr: "Tren istasyonunda duruyoruz.",
        en: "We are standing at the train station.",
        confusions: [
          {
            heard: ["sehen", "gehen"],
            fix: "„stehen“ ŞTEE-en. Kelime başındaki st de ş ile başlar; „sehen“ (görmek) başka bir fiil.",
            expected: "stehen",
          },
        ],
      },
      {
        de: "Verstehen Sie mich?",
        tr: "Beni anlıyor musunuz?",
        en: "Do you understand me?",
        hint: "Buradaki „st“ kelime başında değil ama „ver-stehen“ birleşik olduğu için yine şt okunur.",
        confusions: [
          {
            heard: ["versehen", "bestehen"],
            fix: "„verstehen“ fer-ŞTEE-en. Sondaki „mich“in ch'si de yumuşak kalmalı.",
            expected: "verstehen",
          },
        ],
      },
    ],
  },

  // ─────────── B2 · kelime başı dışında „z“ ───────────
  //
  // A1'deki „W, V und Z“ z'yi kelime başında çalıştırıyor (Zeit, zwei). Asıl
  // inatçı olan yer ise ortada ve sonda: orada Türkçe konuşan „z“yi kendi
  // dilindeki gibi [z] söylüyor ve karşısına gerçek ama başka bir kelime
  // çıkıyor. Yanlış sessizce geçmiyor, yanlış anlaşılıyor — bu yüzden B2'de
  // bile ayrı bir çalışmayı hak ediyor.
  //
  // Seçilen çiftlerin tamamı yalnızca bu tek sesle ayrılıyor.
  {
    id: "b2-s1",
    level: "B2",
    skill: "speaking",
    title: "„z“ in der Wortmitte und am Ende",
    genre: "Ses çalışması",
    intro:
      "Almanca „z“ her yerde ts'dir — kelime başında da, ortasında da, sonunda da. Türkçedeki gibi z söylersen karşındaki başka bir kelime duyar.",
    gloss: [
      { de: "heizen / heißen", tr: "ısıtmak / adı olmak", en: "to heat / to be called" },
      { de: "reizen / reisen", tr: "tahriş etmek / seyahat etmek", en: "to irritate / to travel" },
      { de: "ganz / die Gans", tr: "tamamen / kaz", en: "completely / goose" },
      { de: "kurz / der Kurs", tr: "kısa / kurs", en: "short / course" },
      { de: "die Zahl / der Saal", tr: "sayı / salon", en: "number / hall" },
    ],
    minutes: 7,
    tasks: [
      {
        de: "Wir heizen im Winter mit Gas.",
        tr: "Kışın gazla ısıtıyoruz.",
        en: "In winter we heat with gas.",
        hint: "„heizen“ = HAY-tsen. Dilin ucu dişlere değip t ve s birlikte çıkar.",
        confusions: [
          {
            heard: ["heißen", "heiße", "heißt"],
            fix: "„heizen“ (ısıtmak) yerine „heißen“ (adı olmak) duyuldu. „z“ ts'dir, sadece s değil.",
            expected: "heizen",
          },
        ],
      },
      {
        de: "Wir reisen jedes Jahr nach Italien.",
        tr: "Her yıl İtalya'ya seyahat ediyoruz.",
        en: "We travel to Italy every year.",
        hint: "Burada „s“ var, ts değil: RAY-zen. „reizen“ ise RAY-tsen.",
        confusions: [
          {
            heard: ["reizen", "reizt", "reize"],
            fix: "„reisen“ (seyahat etmek) yerine „reizen“ (tahriş etmek) duyuldu — burada ts yok, yumuşak z sesi var.",
            expected: "reisen",
          },
        ],
      },
      {
        de: "Das ist ganz einfach.",
        tr: "Bu gayet basit.",
        en: "That is quite simple.",
        hint: "„ganz“ın sonu ts: GANTS. Sadece z dersen „Gans“ (kaz) olur.",
        confusions: [
          {
            heard: ["Gans", "Gänse", "gans"],
            fix: "„ganz“ (tamamen) yerine „Gans“ (kaz) duyuldu. Kelime sonundaki z de ts okunur.",
            expected: "ganz",
          },
        ],
      },
      // İki kelime bilerek ayrı cümlelere konuldu. Tek cümlede ikisi birden
      // geçseydi hangisinin yanlış söylendiği ayırt edilemezdi: doğru biçim
      // zaten cümlenin içinde olurdu ve sapma hiç tetiklenmezdi.
      {
        de: "Die Pause war viel zu kurz.",
        tr: "Mola çok kısaydı.",
        en: "The break was much too short.",
        hint: "„kurz“un sonu ts: KURTS. Sadece s dersen „Kurs“ (kurs) olur.",
        confusions: [
          {
            heard: ["Kurs", "Kurse", "Kursen"],
            fix: "„kurz“ (kısa) yerine „Kurs“ (kurs) duyuldu. Kelime sonundaki z de ts okunur.",
            expected: "kurz",
          },
        ],
      },
      {
        de: "Der Kurs beginnt am Montag.",
        tr: "Kurs pazartesi başlıyor.",
        en: "The course starts on Monday.",
        hint: "Şimdi tersi: „Kurs“ta ts yok, düz s var — KURS.",
        confusions: [
          {
            heard: ["kurz", "kurze", "kurzen"],
            fix: "„Kurs“ (kurs) yerine „kurz“ (kısa) duyuldu. Burada z yok, yalnızca s.",
            expected: "Kurs",
          },
        ],
      },
      {
        de: "Bitte nennen Sie mir die Zahl.",
        tr: "Lütfen bana sayıyı söyleyin.",
        en: "Please tell me the number.",
        hint: "„Zahl“ = TSAAL, uzun a ile. „Saal“ (salon) ise ZAAL.",
        confusions: [
          {
            heard: ["Saal", "Sahl", "Säle"],
            fix: "„Zahl“ (sayı) yerine „Saal“ (salon) duyuldu. Baştaki z ts'dir.",
            expected: "Zahl",
          },
        ],
      },
    ],
  },

  // ─────────── A2 · uzatma „h“si ───────────
  //
  // Türkçede „h“ her yerde okunur; Almancada ünlüden sonra gelen h okunmaz,
  // önündeki ünlüyü uzatır. Türkçe konuşan bu h'yi söylemeye çalışıp hem
  // fazladan bir ses ekliyor hem de ünlüyü kısaltıyor. Yazıda görünüp seste
  // görünmeyen bir işaret olduğu için ayrı bir çalışmayı hak ediyor.
  {
    id: "a2-s3",
    level: "A2",
    skill: "speaking",
    title: "Das stumme „h“",
    genre: "Ses çalışması",
    intro:
      "Ünlüden sonraki „h“ okunmaz — önündeki ünlüyü uzatır. Türkçede h her zaman söylenir, bu yüzden en sık atlanan kurallardan biri.",
    gloss: [
      { de: "gehen", tr: "gitmek", en: "to go" },
      { de: "sehen", tr: "görmek", en: "to see" },
      { de: "die Uhr", tr: "saat", en: "clock" },
      { de: "wahr", tr: "doğru", en: "true" },
      { de: "ihn", tr: "onu", en: "him" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Wir gehen nach Hause.",
        tr: "Eve gidiyoruz.",
        en: "We are going home.",
        hint: "„gehen“ = GEE-en. Ortadaki h söylenmez, e uzar. Baştaki „Hause“daki h ise okunur.",
      },
      {
        de: "Ich kann dich sehen.",
        tr: "Seni görebiliyorum.",
        en: "I can see you.",
        hint: "„sehen“ = ZEE-en. h yok, uzun e var. Baştaki s ise z gibi okunur.",
        confusions: [
          {
            heard: ["Seen", "sehnen", "Sehne"],
            fix: "„sehen“ SEE-en değil ZEE-en; baştaki „s“ ünlüden önce z gibi okunur ve h söylenmez.",
            expected: "sehen",
          },
        ],
      },
      {
        de: "Wie spät ist es auf deiner Uhr?",
        tr: "Senin saatinde saat kaç?",
        en: "What time is it on your clock?",
        hint: "„Uhr“ = UUR, tek uzun u. h'yi söylemeye çalışma.",
      },
      {
        de: "Das ist nicht wahr.",
        tr: "Bu doğru değil.",
        en: "That is not true.",
        hint: "„wahr“ = VAAR. h okunmaz, a uzar — „war“ (idi) ile aynı duyulur ama yazımı farklı.",
      },
      {
        de: "Ich habe ihn gestern gesehen.",
        tr: "Onu dün gördüm.",
        en: "I saw him yesterday.",
        hint: "„ihn“ = İİN, uzun i. „in“ (içinde) ise kısacık — fark yalnızca uzunlukta.",
        confusions: [
          {
            heard: ["in", "im", "ihm"],
            fix: "„ihn“deki i uzun; „h“ okunmaz ama onu uzatır. Kısa söylersen „in“ (içinde) oluyor.",
            expected: "ihn",
          },
        ],
      },
    ],
  },

  // ─────────── B1 · vurgusuz „-er“ sonu ───────────
  //
  // Almanca kelime sonundaki vurgusuz „-er“ neredeyse „a“ gibi okunur
  // (Vater = FAA-ta). Türkçe konuşan her heceyi tam söylediği için buraya
  // belirgin bir „er“ koyuyor; anlaşılırlığı bozmuyor ama aksanı ele veren
  // en belirgin işaretlerden biri. Tanıyıcı bunu ayırt edemiyor, o yüzden
  // sapma yazılmadı — çalışma dinle-tekrarla üzerinden yürüyor.
  {
    id: "b1-s2",
    // Vurgusuz „-er“ farkını tanıyıcı ayırt edemiyor: „Vater“ hangi
    // biçimde söylenirse söylensin aynı yazılıyor. Tanıyıcıyı açık bırakmak,
    // hatalı söyleyene „Anlaşıldı“ demek olurdu — egzersizin öğrettiği şeyin
    // tam tersi.
    judge: "self",
    level: "B1",
    skill: "speaking",
    title: "Das unbetonte „-er“",
    genre: "Ses çalışması",
    intro:
      "Kelime sonundaki vurgusuz „-er“ belirgin bir „er“ değil, neredeyse „a“dır: Vater = FAA-ta. Aksanı en çok ele veren ayrıntı bu.",
    gloss: [
      { de: "der Vater", tr: "baba", en: "father" },
      { de: "die Mutter", tr: "anne", en: "mother" },
      { de: "die Schwester", tr: "kız kardeş", en: "sister" },
      { de: "besser", tr: "daha iyi", en: "better" },
      { de: "immer", tr: "her zaman", en: "always" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Mein Vater und meine Mutter wohnen hier.",
        tr: "Babam ve annem burada oturuyor.",
        en: "My father and my mother live here.",
        hint: "FAA-ta ve MU-ta. Sonlardaki r'yi yuvarlama, ağzın gevşesin.",
      },
      {
        de: "Meine Schwester ist Lehrerin.",
        tr: "Kız kardeşim öğretmen.",
        en: "My sister is a teacher.",
        hint: "ŞVES-ta. „Lehrerin“de ise vurgu LEE'de ve ortadaki -er- yine hafif.",
      },
      {
        de: "Heute geht es mir besser.",
        tr: "Bugün daha iyiyim.",
        en: "I am feeling better today.",
        hint: "BES-sa. Çift s ünlüyü kısaltıyor, sondaki -er ise neredeyse a.",
      },
      {
        de: "Er kommt immer zu spät.",
        tr: "O her zaman geç geliyor.",
        en: "He always comes too late.",
        hint: "İ-ma. Cümledeki „Er“ ise vurgulu ve tam okunur — aynı harfler, farklı ses.",
      },
      {
        de: "Der Winter war dieses Jahr sehr kalt.",
        tr: "Bu yıl kış çok soğuktu.",
        en: "The winter was very cold this year.",
        hint: "VİN-ta. „Der“ de hafif: DEA gibi. Üç ayrı -er sesi var, üçü de kısa.",
      },
    ],
  },

  // ─────────── C1 · Türkçeye de girmiş kelimeler ───────────
  //
  // Bu egzersiz Türkçe konuşana özel bir tuzağı çalıştırıyor ve havuzdaki
  // diğerlerinden farklı bir mekanizması var: sorun kelimeyi bilmemek değil,
  // **fazla iyi bilmek**. Universität, Restaurant, Ingenieur, Journalist —
  // hepsi Türkçede de var (üniversite, restoran, mühendis, jurnalist) çünkü
  // ikisi de Fransızcadan almış. Öğrenci kelimeyi tanıyor ve Türkçe
  // alışkanlığıyla okuyor.
  //
  // İki fark birden var: sesler (j = Fransızca j, ch = ş) ve vurgu. Almancada
  // yerli kelimelerde vurgu ilk hecededir ama bu alıntılarda SON hecededir —
  // yani öğrencinin öğrendiği kural burada tersine dönüyor.
  {
    id: "c1-s1",
    // Alıntı kelimelerde ölçülen şey vurgu ve Fransızca sesler; tanıyıcı
    // kelimeyi tanısa bile vurgunun doğru olup olmadığını söyleyemiyor.
    judge: "self",
    level: "C1",
    skill: "speaking",
    title: "Fremdwörter",
    genre: "Ses çalışması",
    intro:
      "Bu kelimeler Türkçede de var, çünkü iki dil de Fransızcadan almış. Tuzak da orada: tanıdık geldikleri için Türkçe alışkanlığıyla okunuyorlar. Vurguları da yerli Almanca kelimelerin tersine son hecede.",
    gloss: [
      { de: "die Universität", tr: "üniversite", en: "university" },
      { de: "das Restaurant", tr: "restoran", en: "restaurant" },
      { de: "der Ingenieur", tr: "mühendis", en: "engineer" },
      { de: "der Journalist", tr: "gazeteci", en: "journalist" },
      { de: "die Garage", tr: "garaj", en: "garage" },
    ],
    minutes: 7,
    tasks: [
      {
        de: "Ich studiere an der Universität.",
        tr: "Üniversitede okuyorum.",
        en: "I study at the university.",
        hint:
          "Vurgu SON hecede: uni-ver-zi-TÄT. Türkçedeki „üniversite“ gibi ortaya vurma, ve „v“ burada v okunur (alıntı olduğu için f değil).",
      },
      {
        de: "Wir essen heute im Restaurant.",
        tr: "Bugün restoranda yemek yiyoruz.",
        en: "We are eating at the restaurant today.",
        hint:
          "Res-to-RANG. Sondaki „nt“ Fransızcadaki gibi genizden ve neredeyse yutulur; Türkçedeki „restoran“dan farkı bu.",
      },
      {
        de: "Mein Bruder ist Ingenieur.",
        tr: "Erkek kardeşim mühendis.",
        en: "My brother is an engineer.",
        hint:
          "In-je-NİÖR. Baştaki „In“ genizden, „g“ Fransız j'si gibi. Türkçedeki „mühendis“ hiç yardımcı olmuyor, kelime tamamen başka.",
      },
      {
        de: "Sie arbeitet als Journalistin.",
        tr: "Gazeteci olarak çalışıyor.",
        en: "She works as a journalist.",
        hint:
          "Jur-na-LİS-tin. Baştaki „J“ burada Almanca y sesi değil, Fransız j'si — Türkçedeki „jurnal“ ile aynı ses.",
      },
      {
        de: "Das Auto steht in der Garage.",
        tr: "Araba garajda duruyor.",
        en: "The car is in the garage.",
        hint:
          "Ga-RAA-je. Sondaki „ge“ yine Fransız j'si; Türkçedeki „garaj“a yakın ama sonu açık kalır.",
      },
      {
        de: "Der Chef hat den Termin verschoben.",
        tr: "Patron randevuyu erteledi.",
        en: "The boss postponed the appointment.",
        hint:
          "ŞEF — Almancada „Ch“ burada ş okunur, „ch“ sesi değil. „Termin“de vurgu ise son hecede: ter-MİİN.",
      },
    ],
  },

  // ─────────── B2 · kelime sonu sertleşmesi ───────────
  //
  // Almancada kelime sonundaki b, d, g sertleşir: Tag = TAAK, Hund = HUNT,
  // gelb = GELP. Türkçede de benzer bir sertleşme var (kitab → kitap), o
  // yüzden kural tanıdık. Asıl tuzak tersi durumda: kelime çekimlenip ünlü
  // eklenince ses geri yumuşuyor — Tag → Tage'de g yine g, Hund → Hunde'de
  // d yine d. Türkçe konuşan sertleşmiş biçimi ezberleyip her yerde
  // kullanıyor ve „Taake“ diyor.
  //
  // Bu, tek tek kelime değil **çift** çalışmayı gerektiriyor: aynı kelimenin
  // iki hâli yan yana söylenmeli.
  {
    id: "b2-s2",
    // Sertleşme farkı da tanıyıcıya görünmüyor: „Tage“ ile „Taake“ aynı
    // yazıya düşüyor. Değerlendirme öğrencide.
    judge: "self",
    level: "B2",
    skill: "speaking",
    title: "Auslautverhärtung",
    genre: "Ses çalışması",
    intro:
      "Kelime sonundaki b, d, g sertleşir (Tag = TAAK). Ama çekimlenip ünlü eklenince yumuşak hâline döner (Tage = TAA-ge). Kuralın kolay kısmı ilki, zor kısmı ikincisi.",
    gloss: [
      { de: "der Tag / die Tage", tr: "gün / günler", en: "day / days" },
      { de: "der Hund / die Hunde", tr: "köpek / köpekler", en: "dog / dogs" },
      { de: "gelb / gelbe", tr: "sarı", en: "yellow" },
      { de: "das Kind / die Kinder", tr: "çocuk / çocuklar", en: "child / children" },
      { de: "der Berg / die Berge", tr: "dağ / dağlar", en: "mountain / mountains" },
    ],
    minutes: 7,
    tasks: [
      {
        de: "Der Tag war lang, aber die Tage davor waren kurz.",
        tr: "Gün uzundu ama ondan önceki günler kısaydı.",
        en: "The day was long, but the days before it were short.",
        hint:
          "„Tag“ = TAAK (sert), „Tage“ = TAA-ge (yumuşak). Aynı cümlede ikisi de var; farkı duyur.",
      },
      {
        de: "Der Hund bellt, die Hunde schlafen.",
        tr: "Köpek havlıyor, köpekler uyuyor.",
        en: "The dog is barking, the dogs are sleeping.",
        hint:
          "„Hund“ = HUNT, „Hunde“ = HUN-de. Sonuna ünlü gelince d geri geliyor.",
      },
      {
        de: "Das Kind spielt mit den anderen Kindern.",
        tr: "Çocuk diğer çocuklarla oynuyor.",
        en: "The child is playing with the other children.",
        hint:
          "„Kind“ = KİNT, „Kindern“ = KİN-dern. Çoğulda d yumuşak.",
      },
      {
        de: "Der Berg ist hoch, die Berge sind höher.",
        tr: "Dağ yüksek, dağlar daha yüksek.",
        en: "The mountain is high, the mountains are higher.",
        hint:
          "„Berg“ = BERK, „Berge“ = BER-ge. „höher“de ise h okunmaz, ö uzar.",
      },
      {
        de: "Das Auto ist gelb, ich mag gelbe Autos.",
        tr: "Araba sarı, sarı arabaları severim.",
        en: "The car is yellow, I like yellow cars.",
        hint:
          "„gelb“ = GELP, „gelbe“ = GEL-be. Sıfat çekimlenince b geri dönüyor.",
      },
    ],
  },
];

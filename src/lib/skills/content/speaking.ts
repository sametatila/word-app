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
      { de: "die Stadt / der Staat", tr: "şehir / devlet" },
      { de: "in / ihn", tr: "içinde / onu" },
      { de: "offen / der Ofen", tr: "açık / fırın" },
      { de: "füllen / fühlen", tr: "doldurmak / hissetmek" },
      { de: "die Hölle / die Höhle", tr: "cehennem / mağara" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Ich wohne in der Stadt.",
        tr: "Şehirde oturuyorum.",
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
      { de: "das Wasser", tr: "su" },
      { de: "wohnen", tr: "oturmak" },
      { de: "der Vater", tr: "baba" },
      { de: "die Zeit", tr: "zaman" },
      { de: "zwei", tr: "iki" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Wasser",
        tr: "su",
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
      { de: "die Reise / der Riese", tr: "yolculuk / dev" },
      { de: "die Wiese / die Weise", tr: "çayır / biçim" },
      { de: "sie / sei", tr: "o, onlar / ol (emir)" },
      { de: "bieten", tr: "sunmak" },
      { de: "beide", tr: "her ikisi" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Die Reise war sehr schön.",
        tr: "Yolculuk çok güzeldi.",
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
      { de: "nicht", tr: "değil" },
      { de: "die Milch", tr: "süt" },
      { de: "auch", tr: "de, da" },
      { de: "das Buch", tr: "kitap" },
      { de: "die Küche", tr: "mutfak" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Ich bin nicht müde.",
        tr: "Yorgun değilim.",
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
      { de: "die Stadt", tr: "şehir" },
      { de: "der Staat", tr: "devlet" },
      { de: "sprechen", tr: "konuşmak" },
      { de: "der Sport", tr: "spor" },
      { de: "spät", tr: "geç" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Ich spreche ein bisschen Deutsch.",
        tr: "Biraz Almanca konuşuyorum.",
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
      { de: "heizen / heißen", tr: "ısıtmak / adı olmak" },
      { de: "reizen / reisen", tr: "tahriş etmek / seyahat etmek" },
      { de: "ganz / die Gans", tr: "tamamen / kaz" },
      { de: "kurz / der Kurs", tr: "kısa / kurs" },
      { de: "die Zahl / der Saal", tr: "sayı / salon" },
    ],
    minutes: 7,
    tasks: [
      {
        de: "Wir heizen im Winter mit Gas.",
        tr: "Kışın gazla ısıtıyoruz.",
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
];

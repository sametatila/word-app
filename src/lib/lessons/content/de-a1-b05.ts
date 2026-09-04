import { de, tr, type Lesson } from "../types";

/**
 * A1 · Parti 5 — Alışveriş (konular 041-050).
 *
 * Modülün omurgası tek bir dilbilgisi düşüncesi: bir şey artık cümlenin
 * NESNESİ olduğunda Almancada yalnızca eril kelimeler biçim değiştiriyor
 * (der → den, ein → einen). Kıyafet almak, hediye seçmek, sepete atmak —
 * hepsi bu kuralın doğal geçtiği sahneler, o yüzden kural tek derste
 * anlatılıp bırakılmıyor, on derse yayılıp her seferinde başka bir kelimeyle
 * karşımıza çıkıyor.
 *
 * İkinci omurga sahne sürekliliği: mağazada aranan kazak 042'de deneniyor,
 * 043'te rengi soruluyor, 044'te fiyatı konuşuluyor, 046'da değiştiriliyor.
 * Aynı birkaç eşya dolaşımda kaldığı için öğrenci her derste yeni kelime
 * yığınıyla değil, tanıdık bir dünyada yeni bir kalıpla karşılaşıyor.
 */
export const deA1B05: Lesson[] = [
  {
    id: "de-a1-kleidung",
    icon: "shirt",
    level: "A1",
    course: "de",
    title: "Kleidung kaufen",
    titleTr: "Kıyafet almak",
    summary:
      "Mağazada aradığın kıyafeti söylemeyi, kararını bildirmeyi ve kasayı sormayı öğretir.",
    minutes: 8,
    focusId: "Akkusativ-einen",
    vocab: [
      { de: "der Pullover", tr: "kazak" },
      { de: "die Jacke", tr: "ceket" },
      { de: "die Hose", tr: "pantolon" },
      { de: "suchen", tr: "aramak" },
      { de: "die Kasse", tr: "kasa" },
      { de: "die Bluse", tr: "bluz" },
      { de: "das Kleid", tr: "elbise" },
      { de: "der Mantel", tr: "palto" },
],
    patterns: [
      { de: "Ich suche einen …", tr: "aradığın şeyi söylerken kullanılır" },
      { de: "Ich nehme …", tr: "alma kararını bildirirken kullanılır" },
      { de: "Wo ist die Kasse?", tr: "ödeme yerini sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bir mağazadayız. Aradığın kıyafeti söylemeyi, beğendiğini alacağını bildirmeyi ve kasanın yerini sormayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da bir mağazaya girdiğinde satıcı çoğu zaman hemen yanına gelir ve ne aradığını sorar. Tek bir kalıpla cevap verebilirsin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Pullover"),
          tr("Türkçesi 'kazak' demek. Lütfen"),
          de("der Pullover"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Pullover" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Jacke"),
          tr("Türkçesi 'ceket' demek. Lütfen"),
          de("die Jacke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Jacke" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Hose"),
          tr("Türkçesi 'pantolon' demek. Lütfen"),
          de("die Hose"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Hose" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("suchen"),
          tr("Türkçesi 'aramak' demek. Lütfen"),
          de("suchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "suchen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Kasse"),
          tr("Türkçesi 'kasa' demek. Lütfen"),
          de("die Kasse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kasse" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Bluse"),
          tr("Türkçesi 'bluz' demek. Lütfen"),
          de("die Bluse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bluse" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Kleid"),
          tr("Türkçesi 'elbise' demek. Lütfen"),
          de("das Kleid"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kleid" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Mantel"),
          tr("Türkçesi 'palto' demek. Lütfen"),
          de("der Mantel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mantel" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich suche einen Pullover."),
          tr(
            "Yani 'Bir kazak arıyorum'. Burada küçük ama çok işine yarayacak bir kural var. Türkçede aranan şeyi işaretlemek için ismin sonuna ek getiririz: 'kazağı arıyorum'. Almancada isim hiç değişmez; önündeki küçük kelime değişir. Sözlükteki hâli",
          ),
          de("der Pullover"),
          tr("ama aradığın şey olunca"),
          de("einen Pullover"),
          tr("oluyor. Üstelik bu yalnızca eril kelimelerde oluyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich suche einen Pullover"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich suche einen Pullover" },
      },
      {
        say: [
          tr("Sıra sende: 'Bir ceket arıyorum.' nasıl dersin?"),
          de("die Jacke"),
          tr("dişil bir kelime ve dişillerde bu değişiklik olmaz."),
        ],
        expect: {
          kind: "produce",
          target: "Ich suche eine Jacke",
          hint: [
            de("die Jacke"),
            tr("dişil; dişil kelimeler nesne olunca değişmiyor:"),
            de("Ich suche eine Jacke."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız çok kısa:"),
          de("Ich nehme …"),
          tr("Yani 'Bunu alıyorum'. Kararını verdiğinde bu cümleyi söylersin. Aynı kural burada da geçerli:"),
          de("der Pullover"),
          tr("nesne olunca"),
          de("den Pullover"),
          tr("olur."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kazağı alıyorum.' Almancası:"),
          de("Ich nehme den Pullover."),
          tr("Lütfen"),
          de("Ich nehme den Pullover"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich nehme den Pullover" },
      },
      {
        say: [
          tr("Şimdi sen dene: 'Pantolonu alıyorum.' nasıl olur?"),
          de("die Hose"),
          tr("dişil."),
        ],
        expect: {
          kind: "produce",
          target: "Ich nehme die Hose",
          hint: [
            de("die Hose"),
            tr("dişil olduğu için hiç değişmiyor:"),
            de("Ich nehme die Hose."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ödeme sırası geldiğinde tek bir soru yeter:"),
          de("Wo ist die Kasse?"),
          tr("Yani 'Kasa nerede?' Lütfen"),
          de("Wo ist die Kasse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wo ist die Kasse" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich suche einen Jacke."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich suche einen Jacke.",
          answer: false,
          why: [
            tr("Bu cümledeki biçim eril kelimeler içindir."),
            de("die Jacke"),
            tr("dişil olduğu için doğrusu:"),
            de("Ich suche eine Jacke."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir mağazada ne aradığını söyleyebilir, kararını verebilir ve kasayı bulabilirsin. Şimdi gerçek bir mağazadasın: satıcı sana doğru geliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir giyim mağazasındasın ve satıcı yanına geldi. Ne aradığını söyle, sana gösterdiklerinden birini seç ve sonunda kasanın nerede olduğunu sor.",
      partner: "işini seven, biraz konuşkan bir satıcı",
      opening: "Guten Tag! Suchen Sie etwas Bestimmtes?",
      openingTr: "İyi günler! Aradığınız belli bir şey var mı?",
      goal: "Aradığın parça bulunmuş, biri seçilmiş ve kasanın yeri öğrenilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-groesse",
    icon: "shopping",
    level: "A1",
    course: "de",
    title: "Welche Größe haben Sie?",
    titleTr: "Beden ve deneme",
    summary:
      "Beden sormayı, bir kıyafeti denemek için izin istemeyi ve üstüne olup olmadığını söylemeyi öğretir.",
    minutes: 8,
    focusId: "W-Fragen",
    vocab: [
      { de: "die Größe", tr: "beden" },
      { de: "anprobieren", tr: "denemek" },
      { de: "das Hemd", tr: "gömlek" },
      { de: "die Umkleide", tr: "soyunma kabini" },
      { de: "welche", tr: "hangi" },
      { de: "der Schuh", tr: "ayakkabı" },
      { de: "die Jeans", tr: "kot pantolon" },
      { de: "kurz", tr: "kısa" },
],
    patterns: [
      { de: "Welche Größe haben Sie?", tr: "beden sorarken kullanılır" },
      { de: "Kann ich das anprobieren?", tr: "denemek için izin isterken kullanılır" },
      { de: "Es passt nicht.", tr: "üstüne olmadığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bir mağazada en çok duyacağın soru bedenle ilgili olur. Bugün beden sormayı, bir şeyi denemek için izin istemeyi ve üstüne olup olmadığını söylemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Denemeden almak Almanya'da pek âdet değil; kabinler her mağazada var ve kimse acele ettirmez. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Größe"),
          tr("Türkçesi 'beden' demek. Lütfen"),
          de("die Größe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Größe" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("anprobieren"),
          tr("Türkçesi 'denemek' demek. Lütfen"),
          de("anprobieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anprobieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Hemd"),
          tr("Türkçesi 'gömlek' demek. Lütfen"),
          de("das Hemd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Hemd" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Umkleide"),
          tr("Türkçesi 'soyunma kabini' demek. Lütfen"),
          de("die Umkleide"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Umkleide" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("welche"),
          tr("Türkçesi 'hangi' demek. Lütfen"),
          de("welche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "welche" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Schuh"),
          tr("Türkçesi 'ayakkabı' demek. Lütfen"),
          de("der Schuh"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schuh" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Jeans"),
          tr("Türkçesi 'kot pantolon' demek. Lütfen"),
          de("die Jeans"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Jeans" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("kurz"),
          tr("Türkçesi 'kısa' demek. Lütfen"),
          de("kurz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kurz" },
      },
      {
        say: [
          tr("İlk kalıbımız bir soru:"),
          de("Welche Größe haben Sie?"),
          tr(
            "Yani 'Hangi bedeni giyiyorsunuz?' Türkçede 'giymek' fiilini kullanırız, Almancada 'sahip olmak' fiili geçer. Birebir çevirmeye çalışma, kalıbı olduğu gibi al. Cevabın da kısacık olur: bir sayı.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Welche Größe haben Sie"), tr("deyin.")],
        expect: { kind: "repeat", target: "Welche Größe haben Sie" },
      },
      {
        say: [
          tr(
            "Sıra sende. Elindeki gömleğin etiketini bulamadın ve soruyorsun: 'Bu hangi beden?' nasıl dersin?",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Welche Größe ist das",
          hint: [
            tr("Soru kelimesi başta durur, hemen arkasından fiil gelir:"),
            de("Welche Größe ist das?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız denemek için:"),
          de("Kann ich das anprobieren?"),
          tr(
            "Yani 'Bunu deneyebilir miyim?' Cümlenin sonuna dikkat et: asıl fiil en sonda duruyor. Türkçede de fiil sona gider, o yüzden bu sıralama sana yabancı gelmeyecek.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Kann ich das anprobieren"), tr("deyin.")],
        expect: { kind: "repeat", target: "Kann ich das anprobieren" },
      },
      {
        say: [
          tr("Şimdi elindeki gömleği göstererek sor: 'Gömleği deneyebilir miyim?'"),
        ],
        expect: {
          kind: "produce",
          target: "Kann ich das Hemd anprobieren",
          hint: [
            tr("Soruyu açan fiil başa, asıl fiil en sona gider:"),
            de("Kann ich das Hemd anprobieren?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Denemek için bir yer lazım:"),
          de("Wo ist die Umkleide?"),
          tr("Yani 'Soyunma kabini nerede?' Lütfen"),
          de("Wo ist die Umkleide"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wo ist die Umkleide" },
      },
      {
        say: [
          tr(
            "Denedin, aynaya baktın. Sonucu iki kısa cümleden biriyle söylersin. Fiili saat konuşurken görmüştün, orada 'bana uyuyor' demekti; kıyafette de aynı iş görüyor:",
          ),
          de("Es passt."),
          tr("ya da"),
          de("Es passt nicht."),
          tr("Yani 'Üstüme oldu' ve 'Üstüme olmadı'. Lütfen"),
          de("Es passt nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es passt nicht" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Hose passt nicht."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Hose passt nicht.",
          answer: true,
          why: [
            tr(
              "Doğru. Bir şeyin üstüne olmadığını söylemek için bu kadarı yeter, başka bir ekleme gerekmez:",
            ),
            de("Die Hose passt nicht."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bedeni sorabiliyor, deneme izni isteyebiliyor ve sonucu söyleyebiliyorsun. Şimdi kabinin önündesin ve görevli sana bakıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir mağazada beğendiğin bir ceketi denemek istiyorsun. Bedenini söyle, denemek için izin iste, kabinin yerini sor ve sonunda üstüne olup olmadığını anlat.",
      partner: "aceleci ama yardımcı olmaya çalışan bir satış görevlisi",
      opening: "Die Jacke ist gerade neu gekommen. Welche Größe haben Sie?",
      openingTr: "Ceket daha yeni geldi. Hangi bedeni giyiyorsunuz?",
      goal: "Beden bulunmuş, kabinde denenmiş ve üstüne olup olmadığı söylenmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-farben",
    icon: "art",
    level: "A1",
    course: "de",
    title: "Die Jacke in Blau",
    titleTr: "Renkler",
    summary: "Renkleri söylemeyi ve aynı ürünün başka rengini istemeyi öğretir.",
    minutes: 8,
    focusId: "Artikel",
    vocab: [
      { de: "die Farbe", tr: "renk" },
      { de: "rot", tr: "kırmızı" },
      { de: "blau", tr: "mavi" },
      { de: "schwarz", tr: "siyah" },
      { de: "weiß", tr: "beyaz" },
      { de: "die Kleidung", tr: "kıyafet" },
      { de: "das T-Shirt", tr: "tişört" },
      { de: "der Ring", tr: "yüzük" },
],
    patterns: [
      { de: "Die Jacke ist rot.", tr: "bir şeyin rengini söylerken kullanılır" },
      { de: "Haben Sie das auch in Rot?", tr: "aynı şeyin başka rengini sorarken kullanılır" },
      { de: "Ich möchte den Pullover in Schwarz.", tr: "rengini belirterek isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün renkler var. Beş renk öğreneceğiz, bir şeyin rengini söylemeyi ve aynı ürünün başka rengini sormayı çalışacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Renkler alışverişte en çok işine yarayacak kelimelerden. İyi haber şu: bu derste öğreneceğin biçimde renk kelimeleri hiç değişmiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Farbe"),
          tr("Türkçesi 'renk' demek. Lütfen"),
          de("die Farbe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Farbe" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("rot"),
          tr("Türkçesi 'kırmızı' demek. Lütfen"),
          de("rot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rot" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("blau"),
          tr("Türkçesi 'mavi' demek. Lütfen"),
          de("blau"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "blau" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schwarz"),
          tr("Türkçesi 'siyah' demek. Lütfen"),
          de("schwarz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwarz" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("weiß"),
          tr("Türkçesi 'beyaz' demek. Lütfen"),
          de("weiß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weiß" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Kleidung"),
          tr("Türkçesi 'kıyafet' demek. Lütfen"),
          de("die Kleidung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kleidung" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das T-Shirt"),
          tr("Türkçesi 'tişört' demek. Lütfen"),
          de("das T-Shirt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das T-Shirt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Ring"),
          tr("Türkçesi 'yüzük' demek. Lütfen"),
          de("der Ring"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Ring" },
      },
      {
        say: [
          tr("İlk kalıbımız çok basit:"),
          de("Die Jacke ist rot."),
          tr(
            "Yani 'Ceket kırmızı'. Renk cümlenin sonunda duruyor ve hiçbir ek almıyor. Türkçede de 'ceket kırmızı' deriz; burada iki dil aynı çalışıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Die Jacke ist rot"), tr("deyin.")],
        expect: { kind: "repeat", target: "Die Jacke ist rot" },
      },
      {
        say: [tr("Sıra sende: 'Pantolon siyah.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Die Hose ist schwarz",
          hint: [
            tr("Önce eşya, sonra fiil, en sonda renk:"),
            de("Die Hose ist schwarz."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr(
            "Şimdi dikkat: rengi kelimenin önüne koymak işi zorlaştırır. 'Kırmızı ceket' derken renge ek gelir ve o ekler şu an için erken. Neyse ki mağazada kimse öyle konuşmuyor; herkes şu küçük numarayı kullanıyor:",
          ),
          de("die Jacke in Rot"),
          tr("Yani 'ceketin kırmızısı'. Renk yine hiç değişmiyor."),
        ],
      },
      {
        say: [
          tr("Bu numarayla en çok kuracağın cümle şu:"),
          de("Haben Sie das auch in Rot?"),
          tr("Yani 'Bunun kırmızısı da var mı?' Lütfen"),
          de("Haben Sie das auch in Rot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Haben Sie das auch in Rot" },
      },
      {
        say: [tr("Şimdi sen sor: 'Bunun beyazı da var mı?'")],
        expect: {
          kind: "produce",
          target: "Haben Sie das auch in Weiß",
          hint: [
            tr("Soru olduğu gibi kalır, yalnızca sondaki renk değişir:"),
            de("Haben Sie das auch in Weiß?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Rengini seçtiğinde de aynı numara işini görür:"),
          de("Ich möchte den Pullover in Schwarz."),
          tr("Yani 'Kazağın siyahını istiyorum'. Lütfen"),
          de("Ich möchte den Pullover in Schwarz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte den Pullover in Schwarz" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Hose ist blaue."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Hose ist blaue.",
          answer: false,
          why: [
            tr("Renk cümlenin sonunda yalın kalır, ek almaz. Doğrusu:"),
            de("Die Hose ist blau."),
          ],
        },
      },
      {
        say: [
          tr(
            "Beş renk ve iki kalıp cebinde: rengi söyleyebiliyor, başkasını isteyebiliyorsun. Şimdi küçük bir butiktesin: vitrindeki gömleği beğendin ama rengi tam istediğin gibi değil.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Küçük bir butikte vitrindeki gömleği beğendin ama başka bir rengini istiyorsun. Rengini sor, beğendiğin rengi söyle ve satıcının önerdiği renge cevap ver.",
      partner: "renk konusundaki fikirlerini saklamayan bir butik sahibi",
      opening: "Dieses Hemd gibt es in vier Farben. Welche Farbe suchen Sie?",
      openingTr: "Bu gömlekten dört renk var. Hangi rengi arıyorsunuz?",
      goal: "İstediğin renk sorulmuş ve alıp almayacağın kararlaşmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-preis",
    icon: "money",
    level: "A1",
    course: "de",
    title: "Was kostet das?",
    titleTr: "Fiyat sorma",
    summary:
      "Fiyat sormayı, bir şeyi pahalı ya da uygun bulduğunu söylemeyi ve indirimi anlamayı öğretir.",
    minutes: 9,
    focusId: "Zahlen-Preise",
    vocab: [
      { de: "der Preis", tr: "fiyat" },
      { de: "teuer", tr: "pahalı" },
      { de: "günstig", tr: "uygun fiyatlı" },
      { de: "das Angebot", tr: "indirim" },
      { de: "bar", tr: "nakit" },
      { de: "billig", tr: "ucuz" },
      { de: "die Kreditkarte", tr: "kredi kartı" },
      { de: "das Konto", tr: "banka hesabı" },
],
    patterns: [
      { de: "Was kostet …?", tr: "fiyat sorarken kullanılır" },
      { de: "Das ist zu teuer.", tr: "pahalı bulduğunu söylerken kullanılır" },
      { de: "Das ist im Angebot.", tr: "indirimde olduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Etikette fiyat yoksa ne yaparsın? Bugün fiyat sormayı, pahalı bulduğunu söylemeyi ve indirimden yararlanmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Fiyat sormak tek bir soruyla oluyor ve o soruyu mağazada da, pazarda da, kafede de kullanacaksın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Preis"),
          tr("Türkçesi 'fiyat' demek. Lütfen"),
          de("der Preis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Preis" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("teuer"),
          tr("Türkçesi 'pahalı' demek. Lütfen"),
          de("teuer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "teuer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("günstig"),
          tr("Türkçesi 'uygun fiyatlı' demek. Lütfen"),
          de("günstig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "günstig" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Angebot"),
          tr("Türkçesi 'indirim, kampanya' demek. Lütfen"),
          de("das Angebot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Angebot" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("bar"),
          tr("Türkçesi 'nakit' demek. Lütfen"),
          de("bar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bar" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("billig"),
          tr("Türkçesi 'ucuz' demek. Lütfen"),
          de("billig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "billig" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Kreditkarte"),
          tr("Türkçesi 'kredi kartı' demek. Lütfen"),
          de("die Kreditkarte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kreditkarte" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Konto"),
          tr("Türkçesi 'banka hesabı' demek. Lütfen"),
          de("das Konto"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Konto" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Was kostet der Pullover?"),
          tr(
            "Yani 'Kazak ne kadar?' Bu soruyu büfede duymuştun; şimdi mağazada da işine yarayacak. Türkçede 'kaç para' diye sorarız, yani soruyu para kelimesiyle kurarız; Almancada bunun için ayrı bir fiil var ve soru 'ne' kelimesiyle başlar.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was kostet der Pullover"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was kostet der Pullover" },
      },
      {
        say: [tr("Sıra sende: 'Ceket ne kadar?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Was kostet die Jacke",
          accept: ["Wie viel kostet die Jacke"],
          hint: [
            tr("Soru kelimesi başta, fiyatı sorulan şey sonda:"),
            de("Was kostet die Jacke?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Fiyatı duydun ve yüksek geldi. İkinci kalıbımız tam bunun için:"),
          de("Das ist zu teuer."),
          tr(
            "Burada küçük ama önemli bir ayrım var. Türkçede 'çok pahalı' derken bazen hayranlıkla söyleriz; bu kalıptaki kelime ise 'gereğinden fazla' demek. Yani bu cümleyi kurduğunda satıcı senin almayacağını anlar.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist zu teuer"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist zu teuer" },
      },
      {
        say: [tr("Şimdi tersini söyle: 'Bu uygun fiyatlı.'")],
        expect: {
          kind: "produce",
          target: "Das ist günstig",
          hint: [
            tr("Kalıp aynı kalıyor, yalnızca sondaki kelime değişiyor:"),
            de("Das ist günstig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de mağazada görünce sevineceğin tabela var:"),
          de("Das ist im Angebot."),
          tr("Yani 'Bu indirimde'. O zaman fiyat da hoşuna gider:"),
          de("Der Preis ist gut."),
          tr("Lütfen"),
          de("Das ist im Angebot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das ist im Angebot" },
      },
      {
        say: [
          tr("Kasada da tek bir soru duyacaksın:"),
          de("Bezahlen Sie bar oder mit Karte?"),
          tr("Yani 'Nakit mi, kartla mı ödeyeceksiniz?' Cevabın kısacık:"),
          de("Mit Karte, bitte."),
          tr("Lütfen"),
          de("Mit Karte, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mit Karte, bitte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Hose kostet dreißig Euro."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Hose kostet dreißig Euro.",
          answer: true,
          why: [
            tr("Doğru. Tek bir şeyin fiyatı söylendiği için fiil tekil kaldı:"),
            de("Die Hose kostet dreißig Euro."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık fiyat sorabilir, pahalı bulduğunu söyleyebilir ve indirimi kaçırmazsın. Şimdi bir ayakkabı mağazasındasın ve gözüne bir çift takıldı.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir ayakkabı mağazasında beğendiğin bir çiftin fiyatını öğrenmek istiyorsun. Fiyatı sor, pahalı bulduğunu söyle ve indirimde başka bir şey olup olmadığını öğren.",
      partner: "indirimleri ezbere bilen, ikna etmeyi seven bir satıcı",
      opening: "Diese Schuhe sind gerade im Angebot. Möchten Sie sie anprobieren?",
      openingTr: "Bu ayakkabılar şu an indirimde. Denemek ister misiniz?",
      goal: "Fiyat öğrenilmiş ve indirimde olan başka bir seçenek konuşulmuş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-gefallen",
    icon: "feelings",
    level: "A1",
    course: "de",
    title: "Das gefällt mir!",
    titleTr: "Beğenme",
    summary:
      "Beğendiğini söylemeyi, iki şey arasında seçim yapmayı ve karşındakinin fikrini sormayı öğretir.",
    minutes: 9,
    focusId: "Dativ-gefallen",
    vocab: [
      { de: "gefallen", tr: "hoşuna gitmek" },
      { de: "praktisch", tr: "kullanışlı" },
      { de: "schön", tr: "güzel" },
      { de: "besser", tr: "daha iyi" },
      { de: "gar nicht", tr: "hiç" },
      { de: "der Ohrring", tr: "küpe" },
      { de: "die Karte", tr: "kart" },
      { de: "zeigen", tr: "göstermek" },
],
    patterns: [
      { de: "Das gefällt mir.", tr: "beğendiğini söylerken kullanılır" },
      { de: "Mir gefällt … besser.", tr: "iki şeyden birini seçerken kullanılır" },
      { de: "Wie findest du …?", tr: "karşındakinin fikrini sorarken kullanılır" },
      { de: "Das gefällt ihm.", tr: "bir erkeğin beğendiğini söyler (er → ihm)" },
      { de: "Das gefällt ihr.", tr: "bir kadının beğendiğini söyler (sie → ihr)" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Alışverişte en çok söylenen cümlelerden biri 'bu hoşuma gitti'. Bugün bunu söylemeyi, iki şey arasında seçim yapmayı ve arkadaşının fikrini sormayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü kalıp, Türkçeye şaşırtıcı biçimde uyan kalıplardan biri. Nedenini birazdan göreceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("gefallen"),
          tr("Türkçesi 'hoşuna gitmek' demek. Lütfen"),
          de("gefallen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gefallen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("praktisch"),
          tr("Türkçesi 'kullanışlı' demek. Lütfen"),
          de("praktisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "praktisch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("schön"),
          tr("Türkçesi 'güzel' demek. Lütfen"),
          de("schön"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schön" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("besser"),
          tr("Türkçesi 'daha çok, daha iyi' demek. Lütfen"),
          de("besser"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "besser" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("gar nicht"),
          tr("Türkçesi 'hiç' demek. Lütfen"),
          de("gar nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gar nicht" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Ohrring"),
          tr("Türkçesi 'küpe' demek. Lütfen"),
          de("der Ohrring"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Ohrring" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Karte"),
          tr("Türkçesi 'kart' demek. Lütfen"),
          de("die Karte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Karte" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zeigen"),
          tr("Türkçesi 'göstermek' demek. Lütfen"),
          de("zeigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zeigen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Das gefällt mir."),
          tr(
            "Türkçesi 'Bu hoşuma gitti'. Şimdi güzel kısım: Türkçede de beğenen kişi 'benim hoşuma' diye arkada durur, beğenilen şey öznedir. Almanca tam olarak böyle çalışıyor. Yani 'ben beğeniyorum' diye kurmaya çalışma; 'o bana hoş geliyor' diye kur.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das gefällt mir"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das gefällt mir" },
      },
      {
        say: [tr("Sıra sende: 'Ceket hoşuma gitti.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Die Jacke gefällt mir",
          hint: [
            tr("Beğenilen şey başa gelir, sen cümlenin sonunda durursun:"),
            de("Die Jacke gefällt mir."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Beğenmediğinde de aynı kalıbı kullanırsın, sonuna küçük bir ekleme yaparsın:"),
          de("Das gefällt mir gar nicht."),
          tr("Yani 'Bu hiç hoşuma gitmedi'. Lütfen"),
          de("Das gefällt mir gar nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das gefällt mir gar nicht" },
      },
      {
        say: [
          tr("İki şey arasında kaldığında önce ikisini de översin:"),
          de("Beide sind schön."),
          tr("Sonra gerekçeni söylersin:"),
          de("Der Pullover ist praktisch."),
          tr("ve kararını:"),
          de("Mir gefällt der Pullover besser."),
          tr("Lütfen"),
          de("Mir gefällt der Pullover besser"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mir gefällt der Pullover besser" },
      },
      {
        say: [
          tr("Bir de karşındakinin fikrini sormak var:"),
          de("Wie findest du das?"),
          tr(
            "Yani 'Sen bunu nasıl buluyorsun?' Bu fiili markette 'nerede bulurum' derken kullanmıştın; burada bir şey hakkındaki fikri soruyor. Türkçede de 'nasıl buldun' deriz — aynı fiil, aynı mantık.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie findest du das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie findest du das" },
      },
      {
        say: [tr("Şimdi arkadaşına ceketi sor: 'Ceketi nasıl buluyorsun?'")],
        expect: {
          kind: "produce",
          target: "Wie findest du die Jacke",
          hint: [
            tr("Soru kelimesi başta, fiil hemen arkasında:"),
            de("Wie findest du die Jacke?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gefalle die Jacke."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gefalle die Jacke.",
          answer: false,
          why: [
            tr("Bu kalıpta beğenen kişi özne olamaz; beğenilen şey başa gelir. Doğrusu:"),
            de("Die Jacke gefällt mir."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık beğendiğini, beğenmediğini ve hangisini daha çok sevdiğini söyleyebilirsin. Şimdi bir arkadaşınla alışveriştesin ve o senin fikrini merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla alışveriştesin ve o iki ceket arasında karar veremiyor. Hangisini beğendiğini söyle, neden daha güzel bulduğunu anlat ve ona da fikrini sor.",
      partner: "kararsız ama şakacı bir arkadaş",
      opening: "Ich kann mich nicht entscheiden. Wie findest du die schwarze Jacke?",
      openingTr: "Bir türlü karar veremiyorum. Siyah ceketi nasıl buluyorsun?",
      goal: "İki ceket karşılaştırılmış ve arkadaşın hangisini alacağına karar vermiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-umtausch",
    icon: "shopping",
    level: "A1",
    course: "de",
    title: "Ich möchte das umtauschen",
    titleTr: "Değişim ve iade",
    summary:
      "Aldığın bir şeyi değiştirmeyi, sebebini söylemeyi ve fiş sorusuna cevap vermeyi öğretir.",
    minutes: 9,
    focusId: "Modalverb-möchten",
    vocab: [
      { de: "umtauschen", tr: "değiştirmek" },
      { de: "zurückgeben", tr: "geri vermek" },
      { de: "der Kassenbon", tr: "fiş" },
      { de: "eng", tr: "dar" },
      { de: "weit", tr: "bol" },
      { de: "verkaufen", tr: "satmak" },
      { de: "die Bank", tr: "banka" },
      { de: "der Laden", tr: "dükkân" },
],
    patterns: [
      { de: "Ich möchte … umtauschen.", tr: "bir şeyi değiştirmek isterken kullanılır" },
      { de: "Es ist zu eng.", tr: "sebebini söylerken kullanılır" },
      { de: "Ich möchte … zurückgeben.", tr: "bir şeyi iade ederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Aldığın pantolon evde üstüne olmadı. Bugün onu değiştirmeyi öğreneceğiz: ne istediğini söylemeyi, sebebini anlatmayı ve fiş sorusuna cevap vermeyi. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da değişim ve iade çok yaygındır, kimse seni zorlamaz. Tek şart var: fişi saklamak. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("umtauschen"),
          tr("Türkçesi 'değiştirmek' demek. Lütfen"),
          de("umtauschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umtauschen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("zurückgeben"),
          tr("Türkçesi 'geri vermek' demek. Lütfen"),
          de("zurückgeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zurückgeben" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Kassenbon"),
          tr("Türkçesi 'fiş' demek. Lütfen"),
          de("der Kassenbon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kassenbon" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("eng"),
          tr("Türkçesi 'dar' demek. Lütfen"),
          de("eng"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "eng" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("weit"),
          tr("Türkçesi 'bol' demek. Lütfen"),
          de("weit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weit" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("verkaufen"),
          tr("Türkçesi 'satmak' demek. Lütfen"),
          de("verkaufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verkaufen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Bank"),
          tr("Türkçesi 'banka' demek. Lütfen"),
          de("die Bank"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bank" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Laden"),
          tr("Türkçesi 'dükkân' demek. Lütfen"),
          de("der Laden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Laden" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich möchte die Hose umtauschen."),
          tr(
            "Yani 'Pantolonu değiştirmek istiyorum'. Cümlenin sonuna dikkat et: iki fiil olduğunda ikincisi en sona gidiyor. Bu sana tanıdık gelecek, çünkü Türkçede de 'değiştirmek istiyorum' derken iki fiili yan yana sona koyarız.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich möchte die Hose umtauschen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich möchte die Hose umtauschen" },
      },
      {
        say: [tr("Sıra sende: 'Ceketi değiştirmek istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte die Jacke umtauschen",
          hint: [
            tr("İkinci fiil cümlenin en sonunda kalır:"),
            de("Ich möchte die Jacke umtauschen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Görevli hemen sebebini soracak. Sebep genelde tek cümledir:"),
          de("Es ist zu eng."),
          tr("Yani 'Çok dar'. Aynı biçimde"),
          de("Es ist zu weit."),
          tr("ya da"),
          de("Es ist zu groß."),
          tr("diyebilirsin. Lütfen"),
          de("Es ist zu eng"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es ist zu eng" },
      },
      {
        say: [
          tr(
            "Sebep her zaman beden olmak zorunda değil. Geçen dersteki kalıpla başka bir sebep söyle: 'Renk hoşuma gitmiyor.'",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Die Farbe gefällt mir nicht",
          hint: [
            tr("Beğenilen şey başa gelir, olumsuzluk en sona:"),
            de("Die Farbe gefällt mir nicht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de tamamen vazgeçtiğin durum var; o zaman değişim değil iade istersin:"),
          de("Ich möchte die Jacke zurückgeben."),
          tr("Lütfen"),
          de("Ich möchte die Jacke zurückgeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte die Jacke zurückgeben" },
      },
      {
        say: [
          tr("Kasadaki görevlinin ilk sorusu şu olacak:"),
          de("Haben Sie den Kassenbon?"),
          tr("Yani 'Fişiniz var mı?' Fişin yanında değilse cevabın:"),
          de("Nein, leider nicht."),
          tr("Lütfen"),
          de("Nein, leider nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nein, leider nicht" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich möchte umtauschen die Hose."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich möchte umtauschen die Hose.",
          answer: false,
          why: [
            tr("İkinci fiil cümlenin en sonunda durmalı. Doğrusu:"),
            de("Ich möchte die Hose umtauschen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir şeyi değiştirebilir, iade edebilir ve sebebini anlatabilirsin. Şimdi mağazanın iade masasındasın ve sıra sana geldi.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Dün aldığın pantolonu değiştirmek için mağazanın iade masasındasın. Ne istediğini söyle, sebebini anlat, fiş sorusuna cevap ver ve yerine ne alacağını konuş.",
      partner: "kurallara bağlı ama yardımcı olmaya çalışan bir kasa görevlisi",
      opening: "Guten Tag! Was kann ich für Sie tun?",
      openingTr: "İyi günler! Sizin için ne yapabilirim?",
      goal: "Değişimin yapılıp yapılamayacağı netleşmiş ve yerine ne alacağın kararlaşmış olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-geschenk",
    icon: "gift",
    level: "A1",
    course: "de",
    title: "Ein Geschenk suchen",
    titleTr: "Hediye seçme",
    summary:
      "Birine hediye ararken kime aldığını söylemeyi, öneri yapmayı ve paket istemeyi öğretir.",
    minutes: 9,
    focusId: "Akkusativ-einen",
    vocab: [
      { de: "das Geschenk", tr: "hediye" },
      { de: "einpacken", tr: "paketlemek" },
      { de: "die Tasche", tr: "çanta" },
      { de: "das Parfüm", tr: "parfüm" },
      { de: "der Gutschein", tr: "hediye çeki" },
      { de: "der Rucksack", tr: "sırt çantası" },
      { de: "der Koffer", tr: "bavul" },
      { de: "kaufen", tr: "satın almak" },
],
    patterns: [
      { de: "Ich suche ein Geschenk für …", tr: "kime hediye aradığını söylerken kullanılır" },
      { de: "Vielleicht ein Parfüm?", tr: "öneri yaparken kullanılır" },
      { de: "Können Sie es einpacken?", tr: "hediye paketi isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bir doğum günü yaklaşıyor ve hediye lazım. Bugün kime hediye aradığını söylemeyi, satıcıyla öneri alışverişi yapmayı ve paket istemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste tek bir küçük kural var ve hediyenin kime olduğunu söylerken karşına çıkıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Geschenk"),
          tr("Türkçesi 'hediye' demek. Lütfen"),
          de("das Geschenk"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Geschenk" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("einpacken"),
          tr("Türkçesi 'paketlemek' demek. Lütfen"),
          de("einpacken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einpacken" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Tasche"),
          tr("Türkçesi 'çanta' demek. Lütfen"),
          de("die Tasche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tasche" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Parfüm"),
          tr("Türkçesi 'parfüm' demek. Lütfen"),
          de("das Parfüm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Parfüm" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Gutschein"),
          tr("Türkçesi 'hediye çeki' demek. Lütfen"),
          de("der Gutschein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Gutschein" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Rucksack"),
          tr("Türkçesi 'sırt çantası' demek. Lütfen"),
          de("der Rucksack"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Rucksack" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
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
          de("kaufen"),
          tr("Türkçesi 'satın almak' demek. Lütfen"),
          de("kaufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kaufen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich suche ein Geschenk für meine Schwester."),
          tr("Yani 'Kız kardeşime bir hediye arıyorum'. Şimdi kurala dikkat: 'için' anlamındaki kelimeden sonra eril kelimeler biçim değiştirir. Tek başına"),
          de("mein Bruder"),
          tr("deriz, ama hediye ona olunca"),
          de("für meinen Bruder"),
          tr("olur. Dişil ve nötr kelimeler yine hiç değişmez."),
        ],
      },
      {
        say: [
          tr("Lütfen"),
          de("Ich suche ein Geschenk für meine Schwester"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Ich suche ein Geschenk für meine Schwester",
        },
      },
      {
        say: [
          tr("Sıra sende: 'Babama bir hediye arıyorum.' Dikkat et, baba eril bir kelime."),
        ],
        expect: {
          kind: "produce",
          target: "Ich suche ein Geschenk für meinen Vater",
          hint: [
            de("mein Vater"),
            tr("eril olduğu için 'için'den sonra biçim değiştirir:"),
            de("Ich suche ein Geschenk für meinen Vater."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Satıcı hemen öneriye başlayacak ve önerileri hep şöyle kurar:"),
          de("Vielleicht ein Parfüm?"),
          tr("ya da hiç karar veremiyorsan:"),
          de("Vielleicht ein Gutschein?"),
          tr("Yani 'Belki bir parfüm, belki bir hediye çeki?' Sen de aynı biçimde öneri yapabilirsin. Lütfen"),
          de("Vielleicht ein Parfüm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Vielleicht ein Parfüm" },
      },
      {
        say: [
          tr("Şimdi sen bir öneri yap: 'Belki bir çanta?'"),
          de("die Tasche"),
          tr("dişil bir kelime."),
        ],
        expect: {
          kind: "produce",
          target: "Vielleicht eine Tasche",
          hint: [
            de("die Tasche"),
            tr("dişil olduğu için:"),
            de("Vielleicht eine Tasche?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kararını verdin. Son bir isteğin daha var:"),
          de("Können Sie es einpacken?"),
          tr(
            "Yani 'Paketleyebilir misiniz?' Almanya'da hediye paketi çoğu dükkânda ücretsizdir; sorman yeterli.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Können Sie es einpacken"), tr("deyin.")],
        expect: { kind: "repeat", target: "Können Sie es einpacken" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das Geschenk ist für mein Bruder."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das Geschenk ist für mein Bruder.",
          answer: false,
          why: [
            tr("'İçin' anlamındaki kelimeden sonra eril kelimeler biçim değiştirir. Doğrusu:"),
            de("Das Geschenk ist für meinen Bruder."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kime hediye aradığını söyleyebilir, öneri yapabilir ve paket isteyebilirsin. Şimdi bir hediyelik eşya dükkânındasın ve satıcı fikirlerle dolu.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir hediyelik eşya dükkânındasın ve annen için hediye arıyorsun. Kime aradığını söyle, satıcının önerilerine cevap ver, kendin de bir öneri yap ve sonunda paket iste.",
      partner: "öneri yapmayı çok seven, güler yüzlü bir satıcı",
      opening: "Herzlich willkommen! Suchen Sie ein Geschenk für jemanden?",
      openingTr: "Hoş geldiniz! Birine hediye mi arıyorsunuz?",
      goal: "Hediye seçilmiş ve paket yapılması istenmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-markt",
    icon: "shopping",
    level: "A1",
    course: "de",
    title: "Auf dem Wochenmarkt",
    titleTr: "Pazarda",
    summary:
      "Pazarda birden çok şeyin fiyatını sormayı, miktarı ayarlamayı ve tutarı anlamayı öğretir.",
    minutes: 8,
    focusId: "Zahlen-Preise",
    vocab: [
      { de: "der Markt", tr: "pazar" },
      { de: "frisch", tr: "taze" },
      { de: "das Pfund", tr: "yarım kilo" },
      { de: "mehr", tr: "daha fazla" },
      { de: "weniger", tr: "daha az" },
      { de: "der Marktplatz", tr: "pazar meydanı" },
      { de: "die Bäckerei", tr: "fırın" },
      { de: "der Kiosk", tr: "büfe" },
],
    patterns: [
      { de: "Was kosten …?", tr: "birden çok şeyin fiyatını sorarken kullanılır" },
      { de: "Ein bisschen mehr, bitte.", tr: "miktarı ayarlarken kullanılır" },
      { de: "Das macht … Euro.", tr: "toplam tutarı söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün pazardayız! Meyvenin fiyatını sormayı, miktarı ayarlamayı ve tutarı anlamayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr("Almanya'da haftada bir kurulan pazarın adı şudur:"),
          de("der Wochenmarkt"),
          tr(
            "Orada konuşma hızlı akar ama kalıplar hep aynıdır; üç tanesini bilirsen her tezgâhta işini görürsün. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Markt"),
          tr("Türkçesi 'pazar' demek. Lütfen"),
          de("der Markt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Markt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("frisch"),
          tr("Türkçesi 'taze' demek. Lütfen"),
          de("frisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "frisch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Pfund"),
          tr("Türkçesi 'yarım kilo' demek. Lütfen"),
          de("das Pfund"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Pfund" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("mehr"),
          tr("Türkçesi 'daha fazla' demek. Lütfen"),
          de("mehr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mehr" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("weniger"),
          tr("Türkçesi 'daha az' demek. Lütfen"),
          de("weniger"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weniger" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Marktplatz"),
          tr("Türkçesi 'pazar meydanı' demek. Lütfen"),
          de("der Marktplatz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Marktplatz" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Bäckerei"),
          tr("Türkçesi 'fırın' demek. Lütfen"),
          de("die Bäckerei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bäckerei" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Kiosk"),
          tr("Türkçesi 'büfe' demek. Lütfen"),
          de("der Kiosk"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kiosk" },
      },
      {
        say: [
          tr(
            "Fiyat sorarken tek bir şeyi sormayı öğrenmiştin. Pazarda çoğu şey çoğuldur ve fiil buna uyar. Tek elma için",
          ),
          de("Was kostet der Apfel?"),
          tr("deriz, ama bütün elmalar için"),
          de("Was kosten die Äpfel?"),
          tr(
            "olur. Türkçede 'ne kadar' sorusu hiç değişmez; Almancada fiil, sorduğun şey çoğulsa çoğullaşır.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was kosten die Äpfel"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was kosten die Äpfel" },
      },
      {
        say: [tr("Sıra sende: 'Domatesler ne kadar?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Was kosten die Tomaten",
          hint: [
            tr("Sorduğun şey çoğul olduğu için fiil de çoğul olur:"),
            de("Was kosten die Tomaten?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sipariş verirken miktarı yarım kiloyla söylemek en yaygını:"),
          de("Ein Pfund Tomaten, bitte."),
          tr("Yani 'Yarım kilo domates, lütfen'. Lütfen"),
          de("Ein Pfund Tomaten, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ein Pfund Tomaten, bitte" },
      },
      {
        say: [
          tr("Satıcı tartar ve sana gösterir. İki küçük cümleyle ayarlarsın:"),
          de("Ein bisschen mehr, bitte."),
          tr("ya da"),
          de("Ein bisschen weniger, bitte."),
          tr("Lütfen"),
          de("Ein bisschen mehr, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ein bisschen mehr, bitte" },
      },
      {
        say: [tr("Şimdi tersini iste: 'Biraz daha az, lütfen.'")],
        expect: {
          kind: "produce",
          target: "Ein bisschen weniger, bitte",
          hint: [
            tr("Cümle aynı kalır, yalnızca ortadaki kelime değişir:"),
            de("Ein bisschen weniger, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sonunda satıcı toplamı söyler:"),
          de("Das macht vier Euro fünfzig."),
          tr("Yani 'Dört buçuk euro tutuyor'. Duyunca şaşırmamak için bir de sen söyle. Lütfen"),
          de("Das macht vier Euro fünfzig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das macht vier Euro fünfzig" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Tomaten sind sehr frisch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Tomaten sind sehr frisch.",
          answer: true,
          why: [
            tr("Doğru. Domatesler çoğul olduğu için fiil de çoğul kaldı:"),
            de("Die Tomaten sind sehr frisch."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık pazarda fiyat sorabilir, miktarı ayarlayabilir ve tutarı anlayabilirsin. Şimdi tezgâhın önündesin, sıra sende.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Cumartesi pazarında bir meyve tezgâhının önündesin. Fiyat sor, ne kadar istediğini söyle, miktarı ayarla ve sonunda tutarı öğren.",
      partner: "yüksek sesle konuşan, şakacı bir tezgâhtar",
      opening: "Alles frisch von heute Morgen! Was darf es sein?",
      openingTr: "Hepsi bu sabahtan taze! Ne vereyim?",
      goal: "İstediğin ürünler ölçüsüyle tartılmış ve ödenecek tutar söylenmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-apotheke-kauf",
    icon: "shopping",
    level: "A1",
    course: "de",
    title: "In der Drogerie",
    titleTr: "Kişisel bakım alışverişi",
    summary:
      "Bakım ürünlerini adlandırmayı, neye ihtiyacın olduğunu söylemeyi ve reyonu sormayı öğretir.",
    minutes: 8,
    focusId: "Akkusativ",
    vocab: [
      { de: "die Zahnpasta", tr: "diş macunu" },
      { de: "die Seife", tr: "sabun" },
      { de: "das Shampoo", tr: "şampuan" },
      { de: "die Creme", tr: "krem" },
      { de: "das Taschentuch", tr: "kâğıt mendil" },
      { de: "benutzen", tr: "kullanmak" },
      { de: "das Papier", tr: "kâğıt" },
      { de: "die Toilette", tr: "tuvalet" },
],
    patterns: [
      { de: "Ich brauche …", tr: "neye ihtiyacın olduğunu söylerken kullanılır" },
      { de: "Wo finde ich …?", tr: "bir şeyin nerede olduğunu sorarken kullanılır" },
      { de: "Gibt es etwas gegen …?", tr: "bir şikâyete çözüm sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün küçük bir alışveriş var: sabun, şampuan, diş macunu. Bunları adlandırmayı, ihtiyacını söylemeyi ve raflarda kaybolmadan sormayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da bu ürünler eczanede değil, ayrı bir markette satılır. İçeride kimse yanına gelmez; bulamazsan sorman gerekir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Zahnpasta"),
          tr("Türkçesi 'diş macunu' demek. Lütfen"),
          de("die Zahnpasta"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zahnpasta" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Seife"),
          tr("Türkçesi 'sabun' demek. Lütfen"),
          de("die Seife"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Seife" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Shampoo"),
          tr("Türkçesi 'şampuan' demek. Lütfen"),
          de("das Shampoo"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Shampoo" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Creme"),
          tr("Türkçesi 'krem' demek. Lütfen"),
          de("die Creme"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Creme" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Taschentuch"),
          tr("Türkçesi 'kâğıt mendil' demek. Lütfen"),
          de("das Taschentuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Taschentuch" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("benutzen"),
          tr("Türkçesi 'kullanmak' demek. Lütfen"),
          de("benutzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "benutzen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Papier"),
          tr("Türkçesi 'kâğıt' demek. Lütfen"),
          de("das Papier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Papier" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Toilette"),
          tr("Türkçesi 'tuvalet' demek. Lütfen"),
          de("die Toilette"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Toilette" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich brauche eine Zahnpasta."),
          tr(
            "Yani 'Diş macununa ihtiyacım var'. Türkçede ismin sonuna ek getiriyoruz: 'macuna'. Almancada isim aynı kalır, önündeki küçük kelime değişebilir — ama dişil ve nötr kelimelerde o da değişmez.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich brauche eine Zahnpasta"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich brauche eine Zahnpasta" },
      },
      {
        say: [
          tr("Sıra sende: 'Şampuana ihtiyacım var.'"),
          de("das Shampoo"),
          tr("nötr bir kelime."),
        ],
        expect: {
          kind: "produce",
          target: "Ich brauche ein Shampoo",
          hint: [
            de("das Shampoo"),
            tr("nötr; nesne olunca biçimi değişmiyor:"),
            de("Ich brauche ein Shampoo."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız aradığın rafı bulmak için:"),
          de("Wo finde ich die Seife?"),
          tr(
            "Yani 'Sabunu nerede bulurum?' Almancada bu soruda sıra sabittir: önce soru kelimesi, hemen arkasından fiil.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wo finde ich die Seife"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wo finde ich die Seife" },
      },
      {
        say: [tr("Şimdi kremi sor: 'Kremi nerede bulurum?'")],
        expect: {
          kind: "produce",
          target: "Wo finde ich die Creme",
          hint: [
            tr("Soru kelimesi başta, fiil hemen arkasında:"),
            de("Wo finde ich die Creme?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp, canını sıkan küçük bir şey olduğunda işe yarar:"),
          de("Gibt es etwas gegen Husten?"),
          tr("Yani 'Öksürüğe karşı bir şey var mı?' Lütfen"),
          de("Gibt es etwas gegen Husten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Gibt es etwas gegen Husten" },
      },
      {
        say: [
          tr("Sepetine son bir şey daha ekleyelim:"),
          de("Ich brauche auch ein Taschentuch."),
          tr("Yani 'Bir de kâğıt mendile ihtiyacım var'. Lütfen"),
          de("Ich brauche auch ein Taschentuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich brauche auch ein Taschentuch" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich brauche eine Creme."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich brauche eine Creme.",
          answer: true,
          why: [
            tr("Doğru."),
            de("die Creme"),
            tr("dişil ve dişil kelimeler nesne olunca biçim değiştirmez."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ihtiyacını söyleyebilir ve aradığın rafı bulabilirsin. Şimdi kişisel bakım marketindesin ve elinde küçük bir liste var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kişisel bakım marketindesin ve listende birkaç şey var. Neye ihtiyacın olduğunu söyle, bulamadığın ürünün yerini sor ve rafta göremediğin bir şeyi çalışandan iste.",
      partner: "raflardan hiç ayrılmayan, sakin bir market çalışanı",
      opening: "Sie suchen bestimmt etwas. Kann ich Ihnen helfen?",
      openingTr: "Bir şey arıyorsunuz galiba. Yardımcı olabilir miyim?",
      goal: "Listendeki ürünler bulunmuş ya da yerine bir seçenek önerilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-online",
    icon: "tech",
    level: "A1",
    course: "de",
    title: "Online bestellen",
    titleTr: "İnternetten sipariş",
    summary:
      "İnternetten sipariş vermeyi, ürünü sepete eklemeyi ve teslimat süresini konuşmayı öğretir.",
    minutes: 9,
    focusId: "Akkusativ",
    vocab: [
      { de: "der Warenkorb", tr: "sepet" },
      { de: "die Lieferung", tr: "teslimat" },
      { de: "das Paket", tr: "kargo paketi" },
      { de: "dauern", tr: "sürmek" },
      { de: "kostenlos", tr: "ücretsiz" },
      { de: "das Internet", tr: "internet" },
      { de: "anklicken", tr: "tıklamak" },
      { de: "die Post", tr: "postane" },
],
    patterns: [
      { de: "Ich bestelle … online.", tr: "internetten sipariş verdiğini söylerken kullanılır" },
      { de: "Ich lege … in den Warenkorb.", tr: "ürünü sepete eklerken kullanılır" },
      { de: "Die Lieferung dauert … Tage.", tr: "teslimat süresini söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün alışverişi ekrandan yapıyoruz. Sipariş vermeyi, ürünü sepete atmayı ve kargonun ne kadar süreceğini konuşmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İnternet alışverişinin kelimeleri her sitede aynıdır; bir kez öğrenince bütün siteler tanıdık gelir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Warenkorb"),
          tr("Türkçesi 'sepet' demek. Lütfen"),
          de("der Warenkorb"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Warenkorb" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Lieferung"),
          tr("Türkçesi 'teslimat' demek. Lütfen"),
          de("die Lieferung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Lieferung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Paket"),
          tr("Türkçesi 'kargo paketi' demek. Lütfen"),
          de("das Paket"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Paket" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("dauern"),
          tr("Türkçesi 'sürmek' demek. Lütfen"),
          de("dauern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dauern" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("kostenlos"),
          tr("Türkçesi 'ücretsiz' demek. Lütfen"),
          de("kostenlos"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kostenlos" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Internet"),
          tr("Türkçesi 'internet' demek. Lütfen"),
          de("das Internet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Internet" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("anklicken"),
          tr("Türkçesi 'tıklamak' demek. Lütfen"),
          de("anklicken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anklicken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Post"),
          tr("Türkçesi 'postane' demek. Lütfen"),
          de("die Post"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Post" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich bestelle die Jacke online."),
          tr(
            "Yani 'Ceketi internetten sipariş ediyorum'. Sipariş etmek fiilini kafede öğrenmiştin; ekran başında da aynı fiil çalışıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bestelle die Jacke online"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bestelle die Jacke online" },
      },
      {
        say: [tr("Sıra sende: 'Pantolonu internetten sipariş ediyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich bestelle die Hose online",
          hint: [
            tr("Fiil ikinci sırada durur, sipariş ettiğin şey hemen arkasında:"),
            de("Ich bestelle die Hose online."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sipariş vermeden önce ürünü sepete koyarsın ve Almancada bu bir hareket cümlesidir:"),
          de("Ich lege die Jacke in den Warenkorb."),
          tr("Yani 'Ceketi sepete koyuyorum'. Sepetin adı eril ve bir şey oraya doğru gittiği için biçim değişiyor:"),
          de("der Warenkorb"),
          tr("yerine"),
          de("in den Warenkorb"),
          tr("diyoruz."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich lege die Jacke in den Warenkorb"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich lege die Jacke in den Warenkorb" },
      },
      {
        say: [
          tr("Sipariş verdikten sonra tek bir merakın kalır:"),
          de("Wie lange dauert die Lieferung?"),
          tr("Yani 'Teslimat ne kadar sürüyor?' Lütfen"),
          de("Wie lange dauert die Lieferung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wie lange dauert die Lieferung" },
      },
      {
        say: [tr("Şimdi cevabı sen ver: 'Teslimat iki gün sürüyor.'")],
        expect: {
          kind: "produce",
          target: "Die Lieferung dauert zwei Tage",
          hint: [
            tr("Önce teslimat, sonra fiil, en sonda süre:"),
            de("Die Lieferung dauert zwei Tage."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İki güzel haber daha:"),
          de("Die Lieferung ist kostenlos."),
          tr("ve"),
          de("Das Paket kommt morgen."),
          tr("Lütfen"),
          de("Die Lieferung ist kostenlos"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Lieferung ist kostenlos" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich lege die Jacke in dem Warenkorb."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich lege die Jacke in dem Warenkorb.",
          answer: false,
          why: [
            tr("Ceket sepete doğru gidiyor, yani ortada bir hareket var; o zaman biçim değişir. Doğrusu:"),
            de("Ich lege die Jacke in den Warenkorb."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık internetten sipariş verebilir, sepeti yönetebilir ve teslimatı sorabilirsin. Ama bu kez paket gelmedi: müşteri hizmetlerini arıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İnternetten verdiğin sipariş hâlâ gelmedi ve müşteri hizmetlerini aradın. Ne sipariş ettiğini söyle, teslimatın ne kadar sürmesi gerektiğini sor ve paketin nerede olduğunu öğren.",
      partner: "sakin ve özür dilemeye alışkın bir müşteri temsilcisi",
      opening: "Kundenservice, guten Tag! Wie kann ich Ihnen helfen?",
      openingTr: "Müşteri hizmetleri, iyi günler! Size nasıl yardımcı olabilirim?",
      goal: "Siparişinin nerede olduğu öğrenilmiş ve ne zaman geleceği söylenmiş olur.",
      minTurns: 6,
    },
  },
];

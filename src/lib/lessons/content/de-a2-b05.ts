import { de, tr, type Lesson } from "../types";

/**
 * A2 · Modül 5 — İş hayatı (konular 041-050).
 *
 * Modülün omurgası yan cümle: sebep bildiren `weil` ve `denn` yan yana
 * öğretiliyor, çünkü ikisi aynı şeyi söyleyip söz dizimini farklı kuruyor —
 * biri fiili sona atıyor, öteki hiç dokunmuyor. Aynı kural sonra `dass` ile
 * üç derste pekişiyor (toplantı, telefon, rapor). İkinci hat niyet:
 * `wollen`, A1'de öğrenilen kibar `möchten`in kararlı kardeşi olarak
 * tanıtılıyor ve iş başvurusu ile izin talebinde çalıştırılıyor.
 *
 * Sahneler bir iş gününü baştan sona kuruyor: başvuru, sebep anlatma,
 * geç kalma, tanışma, toplantı, telefon, öğle molası, izin, rapor ve
 * değerlendirme görüşmesi. Önceki seviyelerin kelimeleri (der Kollege,
 * die Kollegin, der Urlaub, die Pause, krank) yeni diye öğretilmiyor,
 * örneklerde geri geliyor.
 */
export const deA2B05: Lesson[] = [
  {
    id: "de-a2-neue-stelle",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Die neue Stelle",
    titleTr: "Yeni iş",
    summary: "Ne olmak istediğini ve bir işe başvurduğunu anlatmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-wollen",
    vocab: [
      { de: "die Stelle", tr: "iş, pozisyon" },
      { de: "sich bewerben", tr: "başvurmak" },
      { de: "der Vertrag", tr: "sözleşme" },
      { de: "verdienen", tr: "kazanmak" },
      { de: "werden", tr: "olmak" },
    ],
    patterns: [
      { de: "Ich will … werden", tr: "hedefini kararlı biçimde söylerken kullanılır" },
      { de: "Ich habe mich beworben", tr: "bir işe başvurduğunu söylerken kullanılır" },
      { de: "ab nächstem Monat", tr: "ne zaman başladığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün iş hayatına giriyoruz. Ne olmak istediğini söylemeyi ve bir işe başvurduğunu anlatmayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada 'istemek' için iki fiil var ve aralarındaki fark kibarlık değil, kararlılık. Kafede kullandığın nazik olanı biliyorsun; bugün kararlı olanı öğreniyoruz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Stelle"),
          tr("Türkçesi 'iş, pozisyon' demek. Lütfen"),
          de("die Stelle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stelle" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sich bewerben"),
          tr("Türkçesi 'başvurmak' demek. Lütfen"),
          de("sich bewerben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich bewerben" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Vertrag"),
          tr("Türkçesi 'sözleşme' demek. Lütfen"),
          de("der Vertrag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vertrag" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("verdienen"),
          tr("Türkçesi 'kazanmak' demek. Lütfen"),
          de("verdienen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verdienen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("werden"),
          tr("Türkçesi 'olmak' demek, yani bir şeye dönüşmek. Lütfen"),
          de("werden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "werden" },
      },
      {
        say: [
          tr("İşte bugünün fiili:"),
          de("wollen"),
          tr(
            "Kibarca bir şey isterken kullandığın fiil ricayı yumuşatır; bu ise hedefini söyler. Türkçede ikisi de 'istiyorum' diye çıkar, o yüzden farkı akılda tutman gerek.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Doktor olmak istiyorum.' Almancası:"),
          de("Ich will Ärztin werden."),
          tr("Asıl fiil yine cümlenin en sonunda bekliyor. Lütfen"),
          de("Ich will Ärztin werden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich will Ärztin werden" },
      },
      {
        say: [tr("Sıra sende: 'Öğretmen olmak istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich will Lehrer werden",
          hint: [
            tr("Niyet fiili ikinci sırada, meslek ortada, asıl fiil en sonda:"),
            de("Ich will Lehrer werden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Başvuru yaptığını anlatmak için geçmiş zamanı kullanırsın:"),
          de("Ich habe mich beworben."),
          tr(
            "Bu fiil dönüşlü, yani ortadaki küçük kelime hiç düşmüyor; geçmiş biçim de her zamanki gibi sona gidiyor. Lütfen",
          ),
          de("Ich habe mich beworben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe mich beworben" },
      },
      {
        say: [
          tr("Neye başvurduğunu da ekleyebilirsin:"),
          de("Ich habe mich um die Stelle beworben."),
          tr("Başvuru tuttuysa sırada imza var:"),
          de("Ich habe einen Vertrag bekommen."),
          tr("Ne kazandığını da söyleyebilirsin:"),
          de("Ich verdiene dort besser."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Bir sözleşme aldım.'")],
        expect: {
          kind: "produce",
          target: "Ich habe einen Vertrag bekommen",
          hint: [
            tr("Yardımcı fiil ikinci sırada, geçmiş biçim en sonda:"),
            de("Ich habe einen Vertrag bekommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ne zaman başladığını söylemek için hazır bir kalıp var:"),
          de("ab nächstem Monat"),
          tr("Yani 'gelecek aydan itibaren'. Lütfen"),
          de("Ich fange ab nächstem Monat an"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich fange ab nächstem Monat an" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich will Lehrer zu werden."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich will Lehrer zu werden.",
          answer: false,
          why: [
            tr("Niyet fiilinden sonra gelen asıl fiil yalın hâlde durur, araya küçük bir kelime girmez. Doğrusu:"),
            de("Ich will Lehrer werden."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hedefini ve başvurunu anlatabilirsin. Şimdi bir iş görüşmesindesin: karşındaki neden bu işi istediğini merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir iş görüşmesindesin ve karşında seni işe alacak kişi oturuyor. Ne olmak istediğini söyle, nereye başvurduğunu anlat ve ne zaman başlayabileceğini belirt.",
      partner: "sakin ama her cevabı not alan bir insan kaynakları uzmanı",
      opening: "Schön, dass Sie da sind. Warum haben Sie sich bei uns beworben?",
      openingTr: "Geldiğiniz için teşekkürler. Neden bize başvurdunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-weil",
    icon: "school",
    level: "A2",
    course: "de",
    title: "Warum lernst du Deutsch?",
    titleTr: "Sebep: weil",
    summary: "Bir şeyin sebebini yan cümleyle anlatmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "weil", tr: "çünkü" },
      { de: "der Grund", tr: "sebep" },
      { de: "deshalb", tr: "bu yüzden" },
      { de: "die Sprache", tr: "dil" },
      { de: "der Kurs", tr: "kurs" },
    ],
    patterns: [
      { de: "…, weil ich … möchte", tr: "sebebini anlatırken kullanılır" },
      { de: "Warum …?", tr: "sebep sorarken kullanılır" },
      { de: "Deshalb …", tr: "sonucu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün 'neden' sorusunun cevabını kuruyoruz. Bir şeyi neden yaptığını anlatmayı öğreneceksin ve bu, bütün A2 boyunca kullanacağın bir yapı. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İyi haber: bugünkü kural Türkçeye yabancı değil. Türkçede de sebep cümlesinde fiil sona gider. Almancada da tam olarak bu oluyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("weil"),
          tr("Türkçesi 'çünkü' demek. Lütfen"),
          de("weil"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weil" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Grund"),
          tr("Türkçesi 'sebep' demek. Lütfen"),
          de("der Grund"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Grund" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("deshalb"),
          tr("Türkçesi 'bu yüzden' demek. Lütfen"),
          de("deshalb"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "deshalb" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Sprache"),
          tr("Türkçesi 'dil' demek. Lütfen"),
          de("die Sprache"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sprache" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Kurs"),
          tr("Türkçesi 'kurs' demek. Lütfen"),
          de("der Kurs"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kurs" },
      },
      {
        say: [
          tr("Önce soruyu öğrenelim:"),
          de("Warum lernst du Deutsch?"),
          tr("Yani 'Neden Almanca öğreniyorsun?' Soru kelimesi başta, fiil hemen arkasında."),
        ],
      },
      {
        say: [
          tr("Cevap ise iki parçalı. İkinci parça bugünün kelimesiyle başlıyor ve o kelime fiili cümlenin en sonuna itiyor:"),
          de("Ich lerne Deutsch, weil ich hier arbeite."),
          tr("Dikkat et: ikinci parçada fiil özneden hemen sonra değil, en sonda."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich lerne Deutsch, weil ich hier arbeite"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich lerne Deutsch, weil ich hier arbeite" },
      },
      {
        say: [tr("Sıra sende: 'Almanca öğreniyorum çünkü burada çalışmak istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich lerne Deutsch, weil ich hier arbeiten will",
          hint: [
            tr("İki fiil varsa ikisi de sona gider ve çekimli olan en sonda kalır:"),
            de("Ich lerne Deutsch, weil ich hier arbeiten will."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Aynı şeyi tersten de söyleyebilirsin. Önce sebebi verirsin, sonra sonucu:"),
          de("Ich wohne in Deutschland. Deshalb lerne ich die Sprache."),
          tr("Buradaki kelime yan cümle kurmuyor, o yüzden fiil ikinci sırada kalıyor."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Kursa gidiyorum çünkü Almancaya ihtiyacım var.'")],
        expect: {
          kind: "produce",
          target: "Ich gehe zum Kurs, weil ich Deutsch brauche",
          hint: [
            tr("Sebep parçasında fiil en sona gider:"),
            de("Ich gehe zum Kurs, weil ich Deutsch brauche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Birinin sebebini merak edersen tek kelime bile yeter:"),
          de("Warum?"),
          tr("Ya da tam sor:"),
          de("Was ist der Grund?"),
          tr("Lütfen"),
          de("Was ist der Grund"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Was ist der Grund" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich lerne Deutsch, weil ich will hier arbeiten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich lerne Deutsch, weil ich will hier arbeiten.",
          answer: false,
          why: [
            tr("Sebep cümlesinde çekimli fiil en sona gider, ortada duramaz. Doğrusu:"),
            de("Ich lerne Deutsch, weil ich hier arbeiten will."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık her 'neden' sorusuna tam cümleyle cevap verebilirsin. Şimdi kurstaki öğretmeninle konuşuyorsun: seni neyin buraya getirdiğini soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Almanca kursunda öğretmenin seninle tanışıyor ve hedeflerini soruyor. Neden Almanca öğrendiğini anlat, bir sebep daha ekle ve bu yüzden neler yaptığını söyle.",
      partner: "her cevabın arkasını merak eden, sıcak bir kurs öğretmeni",
      opening: "Sie sind neu im Kurs. Warum lernen Sie Deutsch?",
      openingTr: "Kursta yenisiniz. Neden Almanca öğreniyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-denn",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Ich komme später, denn…",
    titleTr: "Sebep: denn",
    summary: "Sebebi söz dizimini bozmadan söylemeyi ve iki sebep bağlacını ayırmayı öğretir.",
    minutes: 9,
    focusId: "Konnektor-denn",
    vocab: [
      { de: "denn", tr: "çünkü" },
      { de: "der Stau", tr: "trafik" },
      { de: "die Schicht", tr: "vardiya" },
      { de: "unterwegs", tr: "yolda" },
      { de: "sich verspäten", tr: "gecikmek" },
    ],
    patterns: [
      { de: "…, denn …", tr: "sebebi söz dizimi değişmeden söylerken kullanılır" },
      { de: "Ich komme später", tr: "geç kalacağını haber verirken kullanılır" },
      { de: "Ich bin unterwegs", tr: "yolda olduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Geçen ders sebebi yan cümleyle söylemeyi öğrendin. Bugün aynı şeyi söyleyen ikinci bir kelime var ama söz dizimine hiç dokunmuyor. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ikisi anlamca aynı, dizilişçe zıt. Farkı bir kez oturtursan iş yerinde geç kaldığın her sabah işine yarayacak. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("denn"),
          tr("Türkçesi 'çünkü' demek. Lütfen"),
          de("denn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "denn" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Stau"),
          tr("Türkçesi 'trafik sıkışıklığı' demek. Lütfen"),
          de("der Stau"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stau" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Schicht"),
          tr("Türkçesi 'vardiya' demek. Lütfen"),
          de("die Schicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schicht" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("unterwegs"),
          tr("Türkçesi 'yolda' demek. Lütfen"),
          de("unterwegs"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unterwegs" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich verspäten"),
          tr("Türkçesi 'gecikmek' demek. Lütfen"),
          de("sich verspäten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich verspäten" },
      },
      {
        say: [
          tr("Bugünün kelimesiyle kurulan cümle şöyle:"),
          de("Ich komme später, denn ich stehe im Stau."),
          tr(
            "İkinci parçaya bak: fiil özneden hemen sonra, yani hiçbir şey değişmedi. Geçen dersin kelimesi fiili sona itiyordu, bu itmiyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich komme später, denn ich stehe im Stau"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich komme später, denn ich stehe im Stau" },
      },
      {
        say: [tr("Sıra sende: 'Geç geliyorum çünkü vardiyam sekizde başlıyor.'")],
        expect: {
          kind: "produce",
          target: "Ich komme später, denn meine Schicht beginnt um acht",
          hint: [
            tr("Bu bağlaçtan sonra cümle olduğu gibi kurulur, fiil ikinci sırada kalır:"),
            de("Ich komme später, denn meine Schicht beginnt um acht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi asıl alıştırma: aynı cümleyi geçen dersin kelimesiyle kur. Anlam bir kelimesi bile değişmeyecek, sadece fiil yer değiştirecek."),
        ],
      },
      {
        say: [tr("Söyle bakalım: 'Geç geliyorum çünkü trafikteyim.'")],
        expect: {
          kind: "produce",
          target: "Ich komme später, weil ich im Stau stehe",
          hint: [
            tr("Bu bağlaç fiili sona itiyor:"),
            de("Ich komme später, weil ich im Stau stehe."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Haber vermenin en kısa yolu ise şu iki cümle:"),
          de("Ich bin schon unterwegs."),
          tr("ve"),
          de("Ich verspäte mich um zehn Minuten."),
          tr("Lütfen"),
          de("Ich bin schon unterwegs"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bin schon unterwegs" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich komme später, denn ich im Stau stehe."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich komme später, denn ich im Stau stehe.",
          answer: false,
          why: [
            tr("Bu bağlaç söz dizimine dokunmaz, fiil ikinci sırada kalmalı. Doğrusu:"),
            de("Ich komme später, denn ich stehe im Stau."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık iki sebep bağlacını da ayırt ediyorsun. Şimdi sabahın köründe iş yerini arıyorsun: geç kalacaksın ve bunu haber vermen gerek.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yolda trafiğe takıldın ve işe geç kalacaksın. Ekip arkadaşını ara, geç kalacağını söyle, sebebini iki farklı bağlaçla anlat ve ne zaman orada olacağını bildir.",
      partner: "sabahları biraz gergin ama anlayışlı bir ekip arkadaşı",
      opening: "Guten Morgen! Die Schicht hat schon angefangen. Wo bist du denn?",
      openingTr: "Günaydın! Vardiya çoktan başladı. Neredesin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-kollegen",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Die neuen Kollegen",
    titleTr: "İş arkadaşları",
    summary: "İş yerinde tanışmayı ve kimin neyden sorumlu olduğunu söylemeyi öğretir.",
    minutes: 8,
    focusId: "Vorstellung",
    vocab: [
      { de: "die Abteilung", tr: "bölüm" },
      { de: "zuständig", tr: "sorumlu" },
      { de: "vorstellen", tr: "tanıtmak" },
      { de: "das Team", tr: "ekip" },
      { de: "die Aufgabe", tr: "görev" },
    ],
    patterns: [
      { de: "Darf ich vorstellen?", tr: "birini tanıştırırken kullanılır" },
      { de: "Ich bin für … zuständig", tr: "sorumlu olduğun işi söylerken kullanılır" },
      { de: "Willkommen im Team!", tr: "yeni geleni karşılarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! İlk iş günün. Bugün kendini iş yerinde tanıtmayı, birini tanıştırmayı ve neyden sorumlu olduğunu söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Alman iş yerlerinde tanışma kısa ve nettir: adın, bölümün, işin. Üç cümleyle bütün kat seni tanır. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Abteilung"),
          tr("Türkçesi 'bölüm' demek. Lütfen"),
          de("die Abteilung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Abteilung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("zuständig"),
          tr("Türkçesi 'sorumlu' demek. Lütfen"),
          de("zuständig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zuständig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("vorstellen"),
          tr("Türkçesi 'tanıtmak' demek. Lütfen"),
          de("vorstellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorstellen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Team"),
          tr("Türkçesi 'ekip' demek. Lütfen"),
          de("das Team"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Team" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Aufgabe"),
          tr("Türkçesi 'görev' demek. Lütfen"),
          de("die Aufgabe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Aufgabe" },
      },
      {
        say: [
          tr("Birini tanıştırmanın hazır kalıbı şu:"),
          de("Darf ich vorstellen?"),
          tr(
            "Yani 'Tanıştırabilir miyim?' Arkasından kimi tanıttığını söylersin ve tanıtma fiili yine cümlenin sonuna düşer.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek:"),
          de("Darf ich Ihnen meinen Kollegen vorstellen?"),
          tr("Lütfen"),
          de("Darf ich Ihnen meinen Kollegen vorstellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Darf ich Ihnen meinen Kollegen vorstellen" },
      },
      {
        say: [tr("Sıra sende: 'Size iş arkadaşımı tanıtabilir miyim?' Kadın bir arkadaştan söz ediyorsun.")],
        expect: {
          kind: "produce",
          target: "Darf ich Ihnen meine Kollegin vorstellen",
          hint: [
            tr("Tanıtma fiili en sonda kalır, tanıtılan kişi ortada durur:"),
            de("Darf ich Ihnen meine Kollegin vorstellen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kendini tanıtırken en çok işine yarayacak kalıp ise şu:"),
          de("Ich bin für den Einkauf zuständig."),
          tr("Sorumluluk kelimesi hep en sonda durur, işin adı ise ortada."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Ekipten ben sorumluyum.'")],
        expect: {
          kind: "produce",
          target: "Ich bin für das Team zuständig",
          hint: [
            tr("Önce kim olduğun, sonra iş, en sonda sorumluluk kelimesi:"),
            de("Ich bin für das Team zuständig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yeni gelen biri varsa onu şöyle karşılarsın:"),
          de("Willkommen im Team!"),
          tr("İşin ne olduğunu sorarsan da şöyle sorarsın:"),
          de("Was sind Ihre Aufgaben?"),
          tr("Lütfen"),
          de("Willkommen im Team"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Willkommen im Team" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Meine Kollegin ist für die Abteilung zuständig."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Meine Kollegin ist für die Abteilung zuständig.",
          answer: true,
          why: [
            tr("Doğru. Sorumluluk kelimesi cümlenin sonunda duruyor ve sorumlu olunan şey onun önünde:"),
            de("für die Abteilung zuständig"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ilk günü atlatırsın. Şimdi yeni bölümündesin: biri sana doğru geliyor ve elini uzatıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni işinin ilk günü ve bölümdeki bir çalışan seninle tanışmak istiyor. Kendini tanıt, hangi işten sorumlu olduğunu söyle ve ona da ne yaptığını sor.",
      partner: "yeni geleni hemen sahiplenen, konuşkan bir bölüm çalışanı",
      opening: "Sie sind die neue Kollegin, oder? Für welche Abteilung arbeiten Sie?",
      openingTr: "Yeni iş arkadaşımız sizsiniz, değil mi? Hangi bölümde çalışıyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-meeting",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Das Team-Meeting",
    titleTr: "Toplantı",
    summary: "Toplantıda görüş bildirmeyi ve öneri yapmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "das Meeting", tr: "toplantı" },
      { de: "vorschlagen", tr: "önermek" },
      { de: "einverstanden", tr: "hemfikir" },
      { de: "denken", tr: "düşünmek" },
      { de: "der Punkt", tr: "gündem maddesi" },
    ],
    patterns: [
      { de: "Ich denke, dass …", tr: "görüşünü söylerken kullanılır" },
      { de: "Ich schlage vor …", tr: "öneri yaparken kullanılır" },
      { de: "Sind alle einverstanden?", tr: "herkesin katılıp katılmadığını sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün toplantıdayız. Görüşünü söylemeyi, öneri yapmayı ve herkesin hemfikir olup olmadığını sormayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünün bağlacı sebep bağlacıyla aynı işi yapıyor: fiili cümlenin sonuna itiyor. Bir kez oturttuğun bu kural artık üçüncü kez karşına çıkacak. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Meeting"),
          tr("Türkçesi 'toplantı' demek. Lütfen"),
          de("das Meeting"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Meeting" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vorschlagen"),
          tr("Türkçesi 'önermek' demek. Lütfen"),
          de("vorschlagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorschlagen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("einverstanden"),
          tr("Türkçesi 'hemfikir' demek. Lütfen"),
          de("einverstanden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einverstanden" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("denken"),
          tr("Türkçesi 'düşünmek' demek. Lütfen"),
          de("denken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "denken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Punkt"),
          tr("Türkçesi 'gündem maddesi' demek. Lütfen"),
          de("der Punkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Punkt" },
      },
      {
        say: [
          tr("Görüş bildirmenin kalıbı iki parçalı:"),
          de("Ich denke, dass …"),
          tr(
            "İlk parça senin görüşün, ikinci parça asıl söylediğin şey. Ve o ikinci parçada fiil yine en sona gidiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bunun iyi bir fikir olduğunu düşünüyorum.' Almancası:"),
          de("Ich denke, dass das eine gute Idee ist."),
          tr("Türkçede de 'olduğunu' derken fiili sona koyuyorsun; buradaki mantık aynı. Lütfen"),
          de("Ich denke, dass das eine gute Idee ist"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich denke, dass das eine gute Idee ist" },
      },
      {
        say: [tr("Sıra sende: 'Daha fazla zamana ihtiyacımız olduğunu düşünüyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich denke, dass wir mehr Zeit brauchen",
          hint: [
            tr("İkinci parçada fiil en sona gider:"),
            de("Ich denke, dass wir mehr Zeit brauchen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Öneri yapmanın fiili ise ikiye bölünüyor:"),
          de("Ich schlage eine Pause vor."),
          tr("Fiilin öneki her zamanki gibi cümlenin en sonuna düşüyor."),
        ],
      },
      {
        say: [tr("Şimdi sen öner: 'Bir ara öneriyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich schlage eine Pause vor",
          hint: [
            tr("Fiilin gövdesi ikinci sırada, öneki en sonda:"),
            de("Ich schlage eine Pause vor."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Toplantıyı kapatmadan önce sorulacak soru hazır:"),
          de("Sind alle einverstanden?"),
          tr("Bir maddeye dönmek istersen de şöyle dersin:"),
          de("Ich habe noch einen Punkt."),
          tr("Toplantının kendisinden söz ederken:"),
          de("Das Meeting dauert eine Stunde."),
          tr("Lütfen"),
          de("Sind alle einverstanden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Sind alle einverstanden" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich denke, dass wir morgen anfangen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich denke, dass wir morgen anfangen.",
          answer: true,
          why: [
            tr("Doğru. İkinci parçada fiil en sonda duruyor, zaman ifadesi de onun önünde:"),
            de("dass wir morgen anfangen"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık toplantıda susmak zorunda değilsin. Şimdi masadasın: ekip lideri gündemi açtı ve senin görüşünü bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ekip toplantısındasın ve yeni bir çalışma planı konuşuluyor. Görüşünü söyle, bir öneri yap ve başkalarının katılıp katılmadığını sor.",
      partner: "herkesi konuşturmaya çalışan, hızlı düşünen bir ekip lideri",
      opening: "Der erste Punkt ist der neue Plan. Was denken Sie darüber?",
      openingTr: "İlk gündem maddesi yeni plan. Bu konuda ne düşünüyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-telefon-arbeit",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Ein Anruf für Sie",
    titleTr: "İşte telefon",
    summary: "İş telefonunda not almayı, bağlamayı ve mesaj iletmeyi öğretir.",
    minutes: 9,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "ausrichten", tr: "iletmek" },
      { de: "verbinden", tr: "bağlamak" },
      { de: "der Anruf", tr: "arama" },
      { de: "die Durchwahl", tr: "dahili numara" },
      { de: "erreichen", tr: "ulaşmak" },
    ],
    patterns: [
      { de: "Können Sie ausrichten, dass …?", tr: "mesaj bırakırken kullanılır" },
      { de: "Er ist gerade nicht da", tr: "aranan kişi yoksa kullanılır" },
      { de: "Ich verbinde Sie", tr: "telefonu bağlarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün iş telefonundayız. Karşı tarafa mesaj bırakmayı, birini bağlamayı ve aradığın kişiye ulaşamadığını söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Telefonda karşındakinin yüzünü görmüyorsun, o yüzden kalıplar kısa ve hep aynı. Üçünü ezberlersen hiçbir aramada takılmazsın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ausrichten"),
          tr("Türkçesi 'iletmek' demek. Lütfen"),
          de("ausrichten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausrichten" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("verbinden"),
          tr("Türkçesi 'bağlamak' demek. Lütfen"),
          de("verbinden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verbinden" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Anruf"),
          tr("Türkçesi 'arama' demek. Lütfen"),
          de("der Anruf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anruf" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Durchwahl"),
          tr("Türkçesi 'dahili numara' demek. Lütfen"),
          de("die Durchwahl"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Durchwahl" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("erreichen"),
          tr("Türkçesi 'ulaşmak' demek. Lütfen"),
          de("erreichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erreichen" },
      },
      {
        say: [
          tr("Aradığın kişi yoksa ilk duyacağın cümle şu:"),
          de("Er ist gerade nicht da."),
          tr("Sen de mesaj bırakırsın. Kalıp, toplantı dersindeki bağlacın aynısıyla kuruluyor:"),
          de("Können Sie ausrichten, dass …?"),
        ],
      },
      {
        say: [
          tr("Örnek:"),
          de("Können Sie ausrichten, dass ich angerufen habe?"),
          tr(
            "İkinci parçada iki fiil birden sona gidiyor: önce geçmiş biçim, sonra yardımcı fiil. Lütfen",
          ),
          de("Können Sie ausrichten, dass ich angerufen habe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Können Sie ausrichten, dass ich angerufen habe" },
      },
      {
        say: [tr("Sıra sende: 'Yarın tekrar arayacağımı iletebilir misiniz?' Bunu şimdiki zamanla söyle.")],
        expect: {
          kind: "produce",
          target: "Können Sie ausrichten, dass ich morgen wieder anrufe",
          hint: [
            tr("İkinci parçada fiil en sona gider ve öneki de ona yapışır:"),
            de("Können Sie ausrichten, dass ich morgen wieder anrufe?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sen telefonu açan taraftaysan iki cümle yeter:"),
          de("Ich verbinde Sie."),
          tr("ve numarayı sorman gerekirse:"),
          de("Wie ist Ihre Durchwahl?"),
          tr("Lütfen"),
          de("Ich verbinde Sie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich verbinde Sie" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Ona ulaşamıyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich kann ihn nicht erreichen",
          hint: [
            tr("Yapabilmeyi anlatan fiil ikinci sırada, asıl fiil en sonda:"),
            de("Ich kann ihn nicht erreichen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich verbinde Sie mit die Kollegin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich verbinde Sie mit die Kollegin.",
          answer: false,
          why: [
            tr("Bu edattan sonra dişil artikel değişir. Doğrusu:"),
            de("Ich verbinde Sie mit der Kollegin."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık iş telefonunu açabilirsin. Şimdi masandaki telefon çalıyor: arayan kişi senin bölümünden birini istiyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş yerinde telefonu sen açtın ve arayan kişi bir iş arkadaşını istiyor, ama o şu an yerinde yok. Durumu söyle, mesaj almayı teklif et ve dahili numarayı ver.",
      partner: "acelesi olan ama kibar bir müşteri",
      opening: "Guten Tag! Kann ich bitte Frau Krüger sprechen?",
      openingTr: "İyi günler! Bayan Krüger ile görüşebilir miyim?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-pause",
    icon: "cafe",
    level: "A2",
    course: "de",
    title: "In der Mittagspause",
    titleTr: "Öğle molası",
    summary: "Öğle molasında birlikte yemeğe gitmeyi ve tercih söylemeyi öğretir.",
    minutes: 8,
    focusId: "Gern-lieber",
    vocab: [
      { de: "die Kantine", tr: "yemekhane" },
      { de: "die Mittagspause", tr: "öğle molası" },
      { de: "holen", tr: "alıp getirmek" },
      { de: "der Hunger", tr: "açlık" },
      { de: "Mahlzeit", tr: "afiyet olsun" },
    ],
    patterns: [
      { de: "Kommst du mit in die Kantine?", tr: "birlikte yemeğe çağırırken kullanılır" },
      { de: "Ich hole mir …", tr: "kendine bir şey alacağını söylerken kullanılır" },
      { de: "Mahlzeit!", tr: "iş yerinde öğle vakti selamlaşırken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Saat on iki oldu, mola zamanı. Bugün birini yemeğe çağırmayı ve ne yemek istediğini söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Alman iş yerlerinde öğle molası kutsaldır ve saati şaşmaz. O saatte koridorda duyacağın tek bir kelime var; onu da öğreneceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Kantine"),
          tr("Türkçesi 'yemekhane' demek. Lütfen"),
          de("die Kantine"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kantine" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Mittagspause"),
          tr("Türkçesi 'öğle molası' demek. Lütfen"),
          de("die Mittagspause"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mittagspause" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("holen"),
          tr("Türkçesi 'alıp getirmek' demek. Lütfen"),
          de("holen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "holen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Hunger"),
          tr("Türkçesi 'açlık' demek. Lütfen"),
          de("der Hunger"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hunger" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("Mahlzeit"),
          tr("Türkçesi 'afiyet olsun' demek. Lütfen"),
          de("Mahlzeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mahlzeit" },
      },
      {
        say: [
          tr("Birini yemeğe çağırmanın kalıbı kısa:"),
          de("Kommst du mit in die Kantine?"),
          tr("Buradaki fiil ikiye bölünen fiillerden; öneki özneden hemen sonra duruyor."),
        ],
      },
      {
        say: [
          tr("En kısa hâli iki kelime. Lütfen"),
          de("Kommst du mit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Kommst du mit" },
      },
      {
        say: [tr("Şimdi nereye çağırdığını da ekle: 'Yemekhaneye geliyor musun?'")],
        expect: {
          kind: "produce",
          target: "Kommst du mit in die Kantine",
          hint: [
            tr("Fiil başta, sen hemen arkasında, önek üçüncü sırada:"),
            de("Kommst du mit in die Kantine?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kendine bir şey alacaksan araya küçük bir kelime giriyor:"),
          de("Ich hole mir einen Kaffee."),
          tr("Bu kelime 'kendime' demek ve fiilden hemen sonra duruyor."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Kendime bir çorba alıyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich hole mir eine Suppe",
          hint: [
            tr("Fiilden sonra 'kendime' anlamındaki kelime, sonra ne aldığın:"),
            de("Ich hole mir eine Suppe."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Molanın saati de bellidir:"),
          de("Die Mittagspause beginnt um zwölf."),
          tr("Masaya oturunca herkesin söylediği kelime ise şu:"),
          de("Mahlzeit!"),
          tr("Açsan da söyleyebilirsin:"),
          de("Ich habe großen Hunger."),
          tr("Lütfen"),
          de("Ich habe großen Hunger"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe großen Hunger" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich esse lieber in der Kantine."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich esse lieber in der Kantine.",
          answer: true,
          why: [
            tr("Doğru. Tercih bildiren kelime fiilden hemen sonra duruyor, yer ifadesi de sonda:"),
            de("lieber in der Kantine"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık molayı yalnız geçirmek zorunda değilsin. Şimdi saat on iki: iş arkadaşın kapıda bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Öğle molası başladı ve iş arkadaşınla nerede yiyeceğinizi konuşuyorsunuz. Onu yemeğe çağır, nereyi tercih ettiğini söyle ve ne alacağını anlat.",
      partner: "yemekhane yemeklerinden bıkmış, dışarıyı öneren bir iş arkadaşı",
      opening: "Mahlzeit! Gehen wir heute in die Kantine oder lieber raus?",
      openingTr: "Afiyet olsun! Bugün yemekhaneye mi gidelim, yoksa dışarı mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-urlaub-antrag",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Urlaub beantragen",
    titleTr: "İzin istemek",
    summary: "İzin talebini iletmeyi ve tarihleri söylemeyi öğretir.",
    minutes: 9,
    focusId: "Modalverb-wollen",
    vocab: [
      { de: "beantragen", tr: "talep etmek" },
      { de: "der Antrag", tr: "talep, dilekçe" },
      { de: "genehmigen", tr: "onaylamak" },
      { de: "die Vertretung", tr: "yerine bakan kişi" },
      { de: "die Frist", tr: "son tarih" },
    ],
    patterns: [
      { de: "Ich will Urlaub nehmen", tr: "izin almak istediğini söylerken kullanılır" },
      { de: "vom … bis zum …", tr: "tarih aralığı verirken kullanılır" },
      { de: "Geht das?", tr: "uygun olup olmadığını sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün izin istiyoruz. Talebini söylemeyi, tarihleri vermeyi ve onay almayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da izin sözlü rica değil, yazılı taleptir; ama süreci başlatan cümle yine ağızdan çıkar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("beantragen"),
          tr("Türkçesi 'talep etmek' demek. Lütfen"),
          de("beantragen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beantragen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Antrag"),
          tr("Türkçesi 'talep, dilekçe' demek. Lütfen"),
          de("der Antrag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Antrag" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("genehmigen"),
          tr("Türkçesi 'onaylamak' demek. Lütfen"),
          de("genehmigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "genehmigen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Vertretung"),
          tr("Türkçesi 'yerine bakan kişi' demek. Lütfen"),
          de("die Vertretung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Vertretung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Frist"),
          tr("Türkçesi 'son tarih' demek. Lütfen"),
          de("die Frist"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Frist" },
      },
      {
        say: [
          tr("Talebini söylerken kararlı isteme fiilini kullanırsın:"),
          de("Ich will Urlaub nehmen."),
          tr("Daha yumuşak söylemek istersen kibar olanına geçersin:"),
          de("Ich möchte Urlaub nehmen."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Yazın izin almak istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich will im Sommer Urlaub nehmen",
          hint: [
            tr("Niyet fiili ikinci sırada, zaman ortada, asıl fiil en sonda:"),
            de("Ich will im Sommer Urlaub nehmen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Tarih aralığı vermenin hazır kalıbı şu:"),
          de("vom ersten bis zum zehnten August"),
          tr("Yani 'birinden onuna kadar'. Lütfen"),
          de("Ich habe vom ersten bis zum zehnten August frei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe vom ersten bis zum zehnten August frei" },
      },
      {
        say: [
          tr("Kaç gün istediğini de doğrudan söyleyebilirsin:"),
          de("Ich beantrage drei Tage Urlaub."),
          tr("Yerine kimin bakacağını eklemek işini kolaylaştırır:"),
          de("Meine Vertretung ist der Kollege aus dem Team."),
          tr("Bir de son tarih var, onu kaçırma:"),
          de("Die Frist ist am Montag."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Üç gün izin talep ediyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich beantrage drei Tage Urlaub",
          hint: [
            tr("Fiil ikinci sırada, kaç gün olduğu arkasında:"),
            de("Ich beantrage drei Tage Urlaub."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sonunda tek bir soru kalır:"),
          de("Geht das?"),
          tr("Yani 'Olur mu?' Lütfen"),
          de("Geht das"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Geht das" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Chef hat meinen Antrag genehmigt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Chef hat meinen Antrag genehmigt.",
          answer: true,
          why: [
            tr("Doğru. Yardımcı fiil ikinci sırada, geçmiş biçim en sonda duruyor:"),
            de("hat … genehmigt"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık izin sürecini başlatabilirsin. Şimdi yöneticinin kapısını çaldın: takvim önünde ve senin tarihlerini bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yöneticinle izin tarihlerini konuşuyorsun. Ne zaman izin istediğini söyle, tarih aralığını ver, yerine kimin bakacağını anlat ve onay iste.",
      partner: "takvimi ezbere bilen, pazarlığı seven bir yönetici",
      opening: "Sie wollten mich sprechen. Geht es um den Urlaub?",
      openingTr: "Benimle görüşmek istemişsiniz. Konu izin mi?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-krankmeldung-buero",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Die Krankmeldung",
    titleTr: "Rapor süreci",
    summary: "Hastalığı iş yerine bildirmeyi ve rapor sürecini anlatmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "die Krankmeldung", tr: "hastalık bildirimi" },
      { de: "das Attest", tr: "doktor raporu" },
      { de: "Bescheid sagen", tr: "haber vermek" },
      { de: "der Arbeitgeber", tr: "işveren" },
      { de: "spätestens", tr: "en geç" },
    ],
    patterns: [
      { de: "Ich sage Bescheid, dass …", tr: "durumu haber verirken kullanılır" },
      { de: "Das Attest schicke ich", tr: "raporu göndereceğini söylerken kullanılır" },
      { de: "Gute Besserung!", tr: "hastaya iyi dilek sunarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün hastasın ve işe gidemiyorsun. Bunu doğru biçimde haber vermeyi ve rapor sürecini anlatmayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da bu işin iki adımı var: sabah telefonla haber vermek, sonra doktordan aldığın kâğıdı iş yerine ulaştırmak. İkisinin de dili hazır kalıp. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Krankmeldung"),
          tr("Türkçesi 'hastalık bildirimi' demek. Lütfen"),
          de("die Krankmeldung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Krankmeldung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Attest"),
          tr("Türkçesi 'doktor raporu' demek. Lütfen"),
          de("das Attest"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Attest" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("Bescheid sagen"),
          tr("Türkçesi 'haber vermek' demek. Lütfen"),
          de("Bescheid sagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bescheid sagen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Arbeitgeber"),
          tr("Türkçesi 'işveren' demek. Lütfen"),
          de("der Arbeitgeber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Arbeitgeber" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("spätestens"),
          tr("Türkçesi 'en geç' demek. Lütfen"),
          de("spätestens"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "spätestens" },
      },
      {
        say: [
          tr("Sabah yapacağın arama tek cümleye sığar ve yine o bağlacı kullanır:"),
          de("Ich sage Bescheid, dass ich krank bin."),
          tr("İkinci parçada fiil yine en sonda; artık bu sana tanıdık geliyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich sage Bescheid, dass ich krank bin"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich sage Bescheid, dass ich krank bin" },
      },
      {
        say: [tr("Sıra sende: 'Bugün gelemeyeceğimi haber veriyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich sage Bescheid, dass ich heute nicht komme",
          hint: [
            tr("İkinci parçada fiil en sona gider, olumsuzluk onun önünde kalır:"),
            de("Ich sage Bescheid, dass ich heute nicht komme."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci adım rapor ve kuralı işveren koyar:"),
          de("Der Arbeitgeber braucht das Attest spätestens am dritten Tag."),
          tr("Sıralamayı da aklında tut:"),
          de("Zuerst die Krankmeldung, dann das Attest."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Raporu yarın gönderiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich schicke das Attest morgen",
          hint: [
            tr("Fiil ikinci sırada, ne gönderdiğin ortada, zaman sonda:"),
            de("Ich schicke das Attest morgen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Karşı taraf konuşmayı hep aynı dilekle kapatır:"),
          de("Gute Besserung!"),
          tr("Yani 'Geçmiş olsun.' Lütfen"),
          de("Gute Besserung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Gute Besserung" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich sage Bescheid, dass ich bin krank."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich sage Bescheid, dass ich bin krank.",
          answer: false,
          why: [
            tr("Bu bağlaçtan sonra çekimli fiil en sona gider. Doğrusu:"),
            de("Ich sage Bescheid, dass ich krank bin."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hasta olduğun sabah ne diyeceğini biliyorsun. Şimdi telefonu açtın: karşında iş yerinden biri var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Sabah hastalandın ve işe gidemeyeceksin. İş yerini ara, durumu haber ver, kaç gün geleceğini söyleme konusunda tahminini paylaş ve raporu ne zaman göndereceğini belirt.",
      partner: "süreci ezbere bilen, sakin bir insan kaynakları çalışanı",
      opening: "Personalbüro, guten Morgen. Was kann ich für Sie tun?",
      openingTr: "İnsan kaynakları, günaydın. Sizin için ne yapabilirim?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-feedback",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Das Gespräch mit der Chefin",
    titleTr: "Geri bildirim",
    summary: "Değerlendirme görüşmesinde memnuniyetini ve gelişim isteğini anlatmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "das Gespräch", tr: "görüşme" },
      { de: "die Chefin", tr: "kadın yönetici" },
      { de: "zufrieden", tr: "memnun" },
      { de: "loben", tr: "övmek" },
      { de: "das Ziel", tr: "hedef" },
    ],
    patterns: [
      { de: "Ich bin zufrieden, weil …", tr: "memnuniyetinin sebebini söylerken kullanılır" },
      { de: "Woran kann ich arbeiten?", tr: "neyi geliştirebileceğini sorarken kullanılır" },
      { de: "Vielen Dank für …", tr: "teşekkür ederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün yılın en gergin yarım saati: değerlendirme görüşmesi. Memnuniyetini sebebiyle anlatmayı ve geri bildirim istemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu görüşmede iki şey iyi karşılanır: söylediğin her şeyin bir sebebini vermek ve eleştiriyi kendin istemek. İkisinin de dili elinde. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Gespräch"),
          tr("Türkçesi 'görüşme' demek. Lütfen"),
          de("das Gespräch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gespräch" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Chefin"),
          tr("Türkçesi 'kadın yönetici' demek. Lütfen"),
          de("die Chefin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Chefin" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("zufrieden"),
          tr("Türkçesi 'memnun' demek. Lütfen"),
          de("zufrieden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zufrieden" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("loben"),
          tr("Türkçesi 'övmek' demek. Lütfen"),
          de("loben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "loben" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Ziel"),
          tr("Türkçesi 'hedef' demek. Lütfen"),
          de("das Ziel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ziel" },
      },
      {
        say: [
          tr("Memnuniyetini söylerken sebebini de eklersen cümlen ciddiye alınır:"),
          de("Ich bin zufrieden, weil die Arbeit interessant ist."),
          tr("Sebep parçasında fiil yine en sonda; bu kuralı artık tanıyorsun."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Memnunum çünkü ekip iyi.'")],
        expect: {
          kind: "produce",
          target: "Ich bin zufrieden, weil das Team gut ist",
          hint: [
            tr("Sebep parçasında fiil en sona gider:"),
            de("Ich bin zufrieden, weil das Team gut ist."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Geri bildirimi kendin istemek burada iyi karşılanır:"),
          de("Woran kann ich arbeiten?"),
          tr("Yani 'Neyi geliştirebilirim?' Lütfen"),
          de("Woran kann ich arbeiten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Woran kann ich arbeiten" },
      },
      {
        say: [
          tr("Bir sonraki yıl için hedef koymanı da isterler:"),
          de("Das ist mein Ziel für dieses Jahr."),
          tr("Yönetici memnunsa bunu duyarsın:"),
          de("Sie hat mich gelobt."),
        ],
      },
      {
        say: [tr("Şimdi görüşmeyi kapat: 'Görüşme için çok teşekkürler.'")],
        expect: {
          kind: "produce",
          target: "Vielen Dank für das Gespräch",
          hint: [
            tr("Teşekkür kalıbının sonuna neye teşekkür ettiğini ekle:"),
            de("Vielen Dank für das Gespräch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Chefin hat mich gelobt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Chefin hat mich gelobt.",
          answer: true,
          why: [
            tr("Doğru. Yardımcı fiil ikinci sırada, geçmiş biçim en sonda:"),
            de("hat mich gelobt"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bu görüşmeden çekinmene gerek yok. Şimdi yöneticinin odasındasın: kapı kapandı ve konuşma başlıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yılda bir yapılan değerlendirme görüşmesindesin. Neden memnun olduğunu sebebiyle anlat, neyi geliştirebileceğini sor ve görüşme için teşekkür et.",
      partner: "doğrudan konuşan ama destekleyici bir kadın yönetici",
      opening: "Setzen Sie sich. Wie zufrieden sind Sie mit Ihrer Arbeit?",
      openingTr: "Buyurun oturun. İşinizden ne kadar memnunsunuz?",
      minTurns: 4,
    },
  },
];

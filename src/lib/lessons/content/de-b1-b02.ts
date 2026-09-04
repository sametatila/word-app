import { de, tr, type LectureStep, type Lesson } from "../types";

/**
 * B1 · Modül 2 — Ev ve kira dünyası (011–020).
 *
 * Modül 1 iş dünyasında yan cümleyi açtı. Bu modül aynı araçları **hakkını
 * ararken** kullandırıyor: kira dünyası Almanya'da baştan sona yazılı,
 * kurallı ve resmî bir alan; orada anlaşılmak için kibar kalmak yetmiyor,
 * doğru kalıbı bilmek gerekiyor.
 *
 * İki yeni yapı geliyor ve ikisi de Türkçe konuşan için alışılmadık:
 *
 *   - **Edilgen çatı.** Türkçede edilgen fiile bir ekle kuruluyor (ödenir,
 *     hesaplanır). Almancada ayrı bir yardımcı fiil geliyor ve asıl fiilin
 *     üçüncü biçimi cümlenin sonuna düşüyor. Sözleşmelerin dili bu.
 *   - **Sıfat çekimi.** Türkçede sıfat hiç değişmez: büyük oda, büyük evde.
 *     Almancada sıfat, önündeki artikele ve ismin hâline göre ek alıyor.
 *
 * Yanlarında `Konjunktiv II` nezaketi (komşuyla anlaşmazlık, ev sahibinden
 * rica), dolaylı soru (daire gezerken) ve `bevor/während` zaman bağlaçları
 * çalışıyor.
 */
/**
 * Standart kelime adımı — b03…b10 ile aynı desen, metni b01in eskisiyle birebir
 * aynı. Sözlükçe 5ten 8e çıkarken aynı adımı on kez elle yazmak diffi
 * okunamaz hâle getiriyordu.
 */
function word(n: string, w: { de: string; tr: string }, note?: string): LectureStep {
  return {
    say: [
      tr(`${n} kelimemiz:`),
      de(w.de),
      tr(`Türkçesi '${w.tr}' demek${note ? ` — ${note}` : ""}. Lütfen`),
      de(w.de),
      tr("deyin."),
    ],
    expect: { kind: "repeat", target: w.de },
  };
}

export const deB1B02: Lesson[] = [
  {
    id: "de-b1-wohnung",
    icon: "home",
    level: "B1",
    course: "de",
    title: "Die Wohnungssuche",
    titleTr: "Ev arama",
    summary: "Kibar istek ve ricayı öğretir: Konjunktiv II ile würde ve könnten.",
    minutes: 10,
    focusId: "Konjunktiv-II",
    vocab: [
      { de: "der Mieter", tr: "kiracı" },
      { de: "die Etage", tr: "kat" },
      { de: "das Gebäude", tr: "bina" },
      { de: "die Fläche", tr: "alan / yüzölçümü" },
      { de: "der Zustand", tr: "durum / hâl" },
      { de: "überlegen", tr: "iyice düşünmek" },
      { de: "nötig", tr: "gerekli" },
      { de: "eventuell", tr: "belki / olası" },
    ],
    patterns: [
      { de: "Ich würde gern …", tr: "kibarca '… isterdim' derken kullanılır" },
      { de: "Könnten Sie …?", tr: "kibar rica: '… yapabilir misiniz?' derken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ev arıyoruz! Almanya'da ev sahibiyle konuşmanın anahtarı kibarlık: 'isterdim' ve 'yapabilir misiniz' kalıplarını öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu iki kalıp Konjunktiv II ile kurulur — dilek kipi. Doğrudan 'istiyorum' demekten daha yumuşak duyulur ve resmî konuşmaların tamamı bununla döner. Önce kelimeler.",
          ),
        ],
      },
      word("İlk", { de: "der Mieter", tr: "kiracı" }),
      word("İkinci", { de: "die Etage", tr: "kat" }),
      word("Üçüncü", { de: "das Gebäude", tr: "bina" }),
      word("Dördüncü", { de: "die Fläche", tr: "alan / yüzölçümü" }),
      word("Beşinci", { de: "der Zustand", tr: "durum / hâl" }),
      word("Altıncı", { de: "überlegen", tr: "iyice düşünmek" }),
      word("Yedinci", { de: "nötig", tr: "gerekli" }),
      word("Son", { de: "eventuell", tr: "belki / olası" }),
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich würde gern …"),
          tr("Kibarca '… isterdim' demek. Asıl fiil mastar hâliyle cümlenin sonuna gider."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Daireyi gezmek isterdim.' Almancası:"),
          de("Ich würde gern die Wohnung besichtigen."),
          tr("Lütfen"),
          de("Ich würde gern die Wohnung besichtigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich würde gern die Wohnung besichtigen" },
      },
      {
        say: [
          tr("Şimdi sıra sende: 'Ev sahibiyle konuşmak isterdim.' nasıl dersin? İpucu:"),
          de("mit"),
          tr("edatı Dativ alır."),
        ],
        expect: {
          kind: "produce",
          target: "Ich würde gern mit dem Vermieter sprechen",
          hint: [
            de("mit"),
            tr("Dativ aldığı için 'mit dem Vermieter' olur, fiil sona:"),
            de("Ich würde gern mit dem Vermieter sprechen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Könnten Sie …?"),
          tr("Kibar rica: '… yapabilir misiniz?' demek. Fiil yine cümlenin sonunda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bana daireyi gösterebilir misiniz?' Almancası:"),
          de("Könnten Sie mir die Wohnung zeigen?"),
          tr("Lütfen"),
          de("Könnten Sie mir die Wohnung zeigen?"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Könnten Sie mir die Wohnung zeigen" },
      },
      {
        say: [tr("Peki 'Bana kirayı söyleyebilir misiniz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Könnten Sie mir die Miete sagen",
          accept: ["Könnten Sie die Miete sagen"],
          hint: [
            tr("Kalıp:"),
            de("Könnten Sie"),
            tr("artı istenen şey, fiil sonda:"),
            de("Könnten Sie mir die Miete sagen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Könnten Sie zeigen mir die Wohnung?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Könnten Sie zeigen mir die Wohnung?",
          answer: false,
          why: [
            tr("Bu kalıpta asıl fiil cümlenin sonuna gider. Doğrusu:"),
            de("Könnten Sie mir die Wohnung zeigen?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Çok iyi! Şimdi ilanını gördüğün daire için ev sahibiyle görüşüyorsun. Kibar kalıplarla soru sor ve bir gezme randevusu almaya çalış.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir daire ilanı için ev sahibiyle telefonda görüşüyorsun. 'Ich würde gern …' ve 'Könnten Sie …?' kalıplarıyla daireyi sor, kirayı öğren ve bir gezme randevusu al.",
      partner: "biraz resmî ama yardımsever bir ev sahibi",
      opening: "Guten Tag! Sie interessieren sich für die Wohnung, richtig?",
      openingTr: "İyi günler! Daireyle ilgileniyorsunuz, değil mi?",
      goal: "Dairenin durumu ve kirası öğrenilmiş, bir gezme randevusu alınmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-b1-besichtigung",
    icon: "key",
    level: "B1",
    course: "de",
    title: "Die Wohnungsbesichtigung",
    titleTr: "Daire gezme",
    summary: "Daire gezerken doğru soruları kibarca sormayı öğretir.",
    minutes: 10,
    focusId: "Indirekte-Frage",
    vocab: [
      { de: "einziehen", tr: "yeni eve taşınmak" },
      { de: "ausziehen", tr: "evden çıkmak" },
      { de: "der Flur", tr: "hol" },
      { de: "das Dach", tr: "çatı" },
      { de: "der Boden", tr: "zemin" },
      { de: "heizen", tr: "ısıtmak" },
      { de: "beachten", tr: "dikkate almak" },
      { de: "zusätzlich", tr: "ek olarak" },
    ],
    patterns: [
      { de: "Ich wüsste gern, ob …", tr: "kibarca bilgi ister" },
      { de: "Wie hoch sind die Nebenkosten?", tr: "gider tutarını sorar" },
      { de: "Wann könnte ich einziehen?", tr: "ne zaman taşınabileceğini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün daire gezerken sorulacak soruları öğreneceğiz. Almanya'da bir daireye çok kişi başvuruyor; doğru soruları soran kişi hem bilgiyi alıyor hem ciddi görünüyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü kalıp, gömülü sorunun daha kibar bir biçimi: 'bilmek isterdim' diye başlıyor ve soruyu içine alıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "einziehen", tr: "yeni eve taşınmak" }),
      word("İkinci", { de: "ausziehen", tr: "evden çıkmak" }),
      word("Üçüncü", { de: "der Flur", tr: "hol" }),
      word("Dördüncü", { de: "das Dach", tr: "çatı" }),
      word("Beşinci", { de: "der Boden", tr: "zemin" }),
      word("Altıncı", { de: "heizen", tr: "ısıtmak" }),
      word("Yedinci", { de: "beachten", tr: "dikkate almak" }),
      word("Son", { de: "zusätzlich", tr: "ek olarak" }),
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich wüsste gern, ob …"),
          tr(
            "'Bilmek isterdim' demek ve arkasından gömülü soru geliyor. Fiilin yumuşak biçimi cümleyi kibarlaştırıyor, gömülü bölümde fiil yine sonda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Dairenin yenilenmiş olup olmadığını bilmek isterdim.' Almancası:"),
          de("Ich wüsste gern, ob die Wohnung renoviert ist."),
          tr("Lütfen"),
          de("Ich wüsste gern, ob die Wohnung renoviert ist"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wüsste gern, ob die Wohnung renoviert ist" },
      },
      {
        say: [tr("Sıra sende: 'Asansör var mı, bilmek isterdim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich wüsste gern, ob es einen Aufzug gibt",
          hint: [
            tr("Gömülü bölümde fiil en sona gider:"),
            de("Ich wüsste gern, ob es einen Aufzug gibt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız doğrudan bir soru:"),
          de("Wie hoch sind die Nebenkosten?"),
          tr("'Giderler ne kadar?' demek. Lütfen"),
          de("Wie hoch sind die Nebenkosten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wie hoch sind die Nebenkosten" },
      },
      {
        say: [tr("Şimdi sen: 'Ne zaman taşınabilirim?' demek için ne dersin? Kibar biçimi kullan.")],
        expect: {
          kind: "produce",
          target: "Wann könnte ich einziehen",
          hint: [
            tr("Fiilin yumuşak biçimi ikinci sırada, asıl fiil sonda:"),
            de("Wann könnte ich einziehen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Die Kaution beträgt drei Monatsmieten."),
          tr("'Depozito üç aylık kira tutarında' demek. Lütfen"),
          de("Die Kaution beträgt drei Monatsmieten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Kaution beträgt drei Monatsmieten" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich wüsste gern, ob die Wohnung renoviert ist."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich wüsste gern, ob die Wohnung renoviert ist.",
          answer: true,
          why: [
            tr("Doğru. Kibar biçim ana bölümde, gömülü bölümde ise fiil cümlenin sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık daire gezebilirsin. Şimdi bir dairedesin ve ev sahibiyle konuşuyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir daire gezmeye geldin ve ev sahibi seni gezdiriyor. Giderleri, depozitoyu ve ne zaman taşınabileceğini kibar soru kalıplarıyla öğren.",
      partner: "birçok adayla görüşen, ölçüp biçen bir ev sahibi",
      opening: "Kommen Sie herein! Was möchten Sie über die Wohnung wissen?",
      openingTr: "Buyurun, girin! Daire hakkında ne öğrenmek istersiniz?",
      goal: "Giderler, depozito ve ne zaman taşınabileceğin öğrenilmiş olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-mietvertrag",
    icon: "law",
    level: "B1",
    course: "de",
    title: "Der Mietvertrag",
    titleTr: "Kira sözleşmesi",
    summary: "Sözleşme dilini okumayı öğretir: edilgen çatının nasıl kurulduğunu gösterir.",
    minutes: 10,
    focusId: "Passiv-Präsens",
    vocab: [
      { de: "verpflichtet", tr: "yükümlü" },
      { de: "die Kündigung", tr: "fesih bildirimi / işten çıkarma" },
      { de: "die Gebühr", tr: "ücret / harç" },
      { de: "das Amt", tr: "resmî daire" },
      { de: "der Anwalt", tr: "avukat" },
      { de: "regeln", tr: "düzenlemek" },
      { de: "falls", tr: "şayet / eğer" },
      { de: "übernehmen", tr: "devralmak" },
    ],
    patterns: [
      { de: "Die Kaution wird … gezahlt.", tr: "edilgen bir işlemi anlatır" },
      { de: "Es wird vereinbart, dass …", tr: "sözleşmede neyin kararlaştırıldığını söyler" },
      { de: "kündigen mit Frist", tr: "süreli fesih bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün sözleşme dilini öğreneceğiz. Bu dilin bir özelliği var: kimin yaptığı söylenmez, sadece ne olduğu söylenir. Türkçede buna edilgen diyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede edilgen fiile bir ek getirerek kurulur: ödenir, hesaplanır. Almancada ise ayrı bir yardımcı fiil geliyor ve asıl fiilin geçmiş biçimi cümlenin sonuna düşüyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "verpflichtet", tr: "yükümlü" }),
      word("İkinci", { de: "die Kündigung", tr: "fesih bildirimi / işten çıkarma" }),
      word("Üçüncü", { de: "die Gebühr", tr: "ücret / harç" }),
      word("Dördüncü", { de: "das Amt", tr: "resmî daire" }),
      word("Beşinci", { de: "der Anwalt", tr: "avukat" }),
      word("Altıncı", { de: "regeln", tr: "düzenlemek" }),
      word("Yedinci", { de: "falls", tr: "şayet / eğer" }),
      word("Son", { de: "übernehmen", tr: "devralmak" }),
      {
        say: [
          tr(
            "Şimdi kural. Edilgen cümlede yardımcı fiil ikinci sıraya oturuyor ve asıl fiilin geçmiş biçimi cümlenin sonuna gidiyor — yapı geçmiş zamana benziyor ama yardımcı fiil farklı.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Depozito taşınmadan önce ödenir.' Almancası:"),
          de("Die Kaution wird vor dem Einzug gezahlt."),
          tr("Lütfen"),
          de("Die Kaution wird vor dem Einzug gezahlt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Kaution wird vor dem Einzug gezahlt" },
      },
      {
        say: [tr("Sıra sende: 'Kira aylık ödenir.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Die Miete wird monatlich gezahlt",
          hint: [
            tr("Yardımcı fiil ikinci sırada, asıl fiilin geçmiş biçimi en sonda:"),
            de("Die Miete wird monatlich gezahlt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sözleşmelerde çok geçer:"),
          de("Es wird vereinbart, dass die Miete steigt."),
          tr("'Kiranın artacağı kararlaştırılır' demek. Lütfen"),
          de("Es wird vereinbart, dass die Miete steigt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es wird vereinbart, dass die Miete steigt" },
      },
      {
        say: [tr("Şimdi sen: 'Sözleşme iki yıl geçerli.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Vertrag ist zwei Jahre gültig",
          hint: [
            tr("Bu cümlede edilgen yok; basit bir durum bildiriliyor:"),
            de("Der Vertrag ist zwei Jahre gültig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız fesih için:"),
          de("Man kann mit einer Frist von drei Monaten kündigen."),
          tr("'Üç ay ihbar süresiyle fesih verilebilir' demek. Lütfen"),
          de("Man kann mit einer Frist von drei Monaten kündigen"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Man kann mit einer Frist von drei Monaten kündigen",
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Miete wird monatlich zahlen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Miete wird monatlich zahlen.",
          answer: false,
          why: [
            tr("Edilgen cümlede asıl fiil mastar değil, geçmiş biçimiyle sonda durur. Doğrusu"),
            de("Die Miete wird monatlich gezahlt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık sözleşme dilini çözebilirsin. Şimdi ev sahibiyle sözleşmeyi gözden geçireceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ev sahibiyle kira sözleşmesini gözden geçiriyorsun. Anlamadığın maddeleri sor, depozito ve fesih süresini öğren ve neye yükümlü olduğunu netleştir.",
      partner: "sözleşmeye hâkim, maddeleri tek tek açıklayan bir ev sahibi",
      opening: "Hier ist der Mietvertrag. Haben Sie Fragen zu einzelnen Punkten?",
      openingTr: "İşte kira sözleşmesi. Maddelerle ilgili sorunuz var mı?",
      goal: "Anlamadığın maddeler açıklanmış, depozito ve fesih süresi netleşmiş olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-nachbarn-streit",
    icon: "home",
    level: "B1",
    course: "de",
    title: "Ärger im Haus",
    titleTr: "Komşu anlaşmazlığı",
    summary: "Şikâyeti kavga etmeden söylemeyi öğretir; nezaket biçimlerini çalıştırır.",
    minutes: 10,
    focusId: "Konjunktiv-II",
    vocab: [
      { de: "der Lärm", tr: "gürültü" },
      { de: "sich beschweren", tr: "şikâyet etmek" },
      { de: "der Streit", tr: "tartışma / kavga" },
      { de: "die Nachbarin", tr: "kadın komşu" },
      { de: "der Ärger", tr: "sıkıntı / dert" },
      { de: "still", tr: "sessiz" },
      { de: "klopfen", tr: "kapıyı çalmak" },
      { de: "aufmerksam", tr: "dikkatli" },
    ],
    patterns: [
      { de: "Wären Sie so nett …?", tr: "çok kibar bir rica kurar" },
      { de: "Es wäre schön, wenn …", tr: "isteği yumuşatarak söyler" },
      { de: "Können wir eine Lösung finden?", tr: "çözüm arar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün zor bir konuşmayı öğreneceğiz: komşuna rahatsız olduğunu söylemek. İşin püf noktası, şikâyeti bir ricaya çevirmek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada bunun hazır kalıpları var ve hepsi fiilin yumuşak biçimini kullanıyor. Doğrudan söylersen kavga başlıyor, yumuşak biçimle söylersen konuşma açılıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "der Lärm", tr: "gürültü" }),
      word("İkinci", { de: "sich beschweren", tr: "şikâyet etmek" }),
      word("Üçüncü", { de: "der Streit", tr: "tartışma / kavga" }),
      word("Dördüncü", { de: "die Nachbarin", tr: "kadın komşu" }),
      word("Beşinci", { de: "der Ärger", tr: "sıkıntı / dert" }),
      word("Altıncı", { de: "still", tr: "sessiz" }),
      word("Yedinci", { de: "klopfen", tr: "kapıyı çalmak" }),
      word("Son", { de: "aufmerksam", tr: "dikkatli" }),
      {
        say: [
          tr("İlk kalıbımız en kibar rica:"),
          de("Wären Sie so nett, etwas leiser zu sein?"),
          tr("'Biraz daha sessiz olur muydunuz acaba?' demek. Lütfen"),
          de("Wären Sie so nett, etwas leiser zu sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wären Sie so nett, etwas leiser zu sein" },
      },
      {
        say: [tr("Sıra sende: 'Akşamları daha sessiz olsanız çok iyi olurdu.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Es wäre schön, wenn Sie abends leiser wären",
          hint: [
            tr("Koşul bölümünde fiil sona gider ve o da yumuşak biçimini alır:"),
            de("Es wäre schön, wenn Sie abends leiser wären."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız çözüm arar:"),
          de("Können wir eine Lösung finden?"),
          tr("'Bir çözüm bulabilir miyiz?' demek. Lütfen"),
          de("Können wir eine Lösung finden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Können wir eine Lösung finden" },
      },
      {
        say: [tr("Şimdi sen: 'Kavga etmeden bir çözüm bulmak isterim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte eine Lösung ohne Streit finden",
          hint: [
            tr("Asıl fiil çekilmeden cümlenin sonunda kalır:"),
            de("Ich möchte eine Lösung ohne Streit finden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Der Lärm stört mich sehr."),
          tr("'Gürültü beni çok rahatsız ediyor' demek. Lütfen"),
          de("Der Lärm stört mich sehr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Lärm stört mich sehr" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es wäre schön, wenn Sie abends leiser sind."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es wäre schön, wenn Sie abends leiser sind.",
          answer: false,
          why: [
            tr("Ana bölüm yumuşak biçimdeyse koşul bölümü de aynı biçimi almalı; yoksa cümle yarı kibar kalır. Doğrusu"),
            de("Es wäre schön, wenn Sie abends leiser wären."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık şikâyetini kavga etmeden söyleyebilirsin. Şimdi komşunun kapısını çalıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Üst komşun geceleri çok gürültü yapıyor ve kapısını çaldın. Rahatsızlığını kibar biçimlerle anlat, suçlamadan söyle ve birlikte bir çözüm öner.",
      partner: "önce savunmaya geçen ama sonra anlayan bir komşu",
      opening: "Ja bitte? Ist etwas passiert?",
      openingTr: "Buyurun? Bir şey mi oldu?",
      goal: "Rahatsızlık suçlamadan anlatılmış ve iki tarafın da kabul ettiği bir çözüm bulunmuş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-b1-wg",
    icon: "family",
    level: "B1",
    course: "de",
    title: "Das WG-Casting",
    titleTr: "Ev arkadaşı seçme",
    summary: "Neyin senin için önemli olduğunu bir yan cümleyle anlatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "die WG", tr: "paylaşımlı ev" },
      { de: "gemeinsam", tr: "ortak / birlikte" },
      { de: "sich einigen", tr: "anlaşmak / uzlaşmak" },
      { de: "der Hausmeister", tr: "kapıcı" },
      { de: "reinigen", tr: "temizlemek" },
      { de: "ordnen", tr: "düzene sokmak" },
      { de: "das Haustier", tr: "evcil hayvan" },
      { de: "das Zeug", tr: "eşya" },
    ],
    patterns: [
      { de: "Uns ist wichtig, dass …", tr: "neyin önemli olduğunu söyler" },
      { de: "Wie stehst du zu …?", tr: "bir konudaki tutumunu sorar" },
      { de: "Wer putzt wann?", tr: "iş bölümünü sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün paylaşımlı ev görüşmesini öğreneceğiz. Almanya'da ev arkadaşları adayla tanışıp seçim yapıyor; bu görüşmenin kendi dili var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü bağlaç bir düşünceyi ya da bir isteği cümlenin içine yerleştiriyor. Türkçede bunu ekle yaparsın: 'temiz olmasını istiyoruz'. Almancada ayrı bir bağlaç geliyor ve fiil yine sona düşüyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "die WG", tr: "paylaşımlı ev" }),
      word("İkinci", { de: "gemeinsam", tr: "ortak / birlikte" }),
      word("Üçüncü", { de: "sich einigen", tr: "anlaşmak / uzlaşmak" }),
      word("Dördüncü", { de: "der Hausmeister", tr: "kapıcı" }),
      word("Beşinci", { de: "reinigen", tr: "temizlemek" }),
      word("Altıncı", { de: "ordnen", tr: "düzene sokmak" }),
      word("Yedinci", { de: "das Haustier", tr: "evcil hayvan" }),
      word("Son", { de: "das Zeug", tr: "eşya" }),
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Uns ist wichtig, dass alle mithelfen."),
          tr("'Herkesin yardım etmesi bizim için önemli' demek; bağlaçtan sonra fiil sonda. Lütfen"),
          de("Uns ist wichtig, dass alle mithelfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Uns ist wichtig, dass alle mithelfen" },
      },
      {
        say: [tr("Sıra sende: 'Mutfağın temiz kalması benim için önemli.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Mir ist wichtig, dass die Küche sauber bleibt",
          hint: [
            tr("Bağlaçtan sonraki bölümde fiil en sona gider:"),
            de("Mir ist wichtig, dass die Küche sauber bleibt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız tutum sorar:"),
          de("Wie stehst du zu Besuch am Wochenende?"),
          tr("'Hafta sonu misafir konusunda ne düşünüyorsun?' demek. Lütfen"),
          de("Wie stehst du zu Besuch am Wochenende"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wie stehst du zu Besuch am Wochenende" },
      },
      {
        say: [tr("Şimdi sen: 'Bir temizlik çizelgesinde anlaşabiliriz.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir können uns auf einen Putzplan einigen",
          hint: [
            tr("Dönüşlü zamir fiilden sonra, asıl fiil ise cümlenin sonunda:"),
            de("Wir können uns auf einen Putzplan einigen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız kısa ve doğrudan:"),
          de("Wer putzt wann?"),
          tr("'Kim ne zaman temizlik yapıyor?' demek. Lütfen"),
          de("Wer putzt wann"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wer putzt wann" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Uns ist wichtig, dass alle helfen mit."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Uns ist wichtig, dass alle helfen mit.",
          answer: false,
          why: [
            tr("Bu bölümde fiil sona giderken ikiye bölünen fiil de birleşir. Doğrusu"),
            de("Uns ist wichtig, dass alle mithelfen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık paylaşımlı ev görüşmesine girebilirsin. Şimdi bir eve bakmaya gittin ve ev arkadaşları seninle tanışıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Paylaşımlı bir eve aday olarak gittin. Senin için neyin önemli olduğunu anlat, ortak yaşam kurallarını sor ve iş bölümü konusunda uzlaşma öner.",
      partner: "sıcak ama seçici bir ev arkadaşı",
      opening: "Schön, dass du da bist! Erzähl mal: Was ist dir beim Zusammenleben wichtig?",
      openingTr: "Geldiğine sevindim! Anlat bakalım: Birlikte yaşarken senin için ne önemli?",
      goal: "Senin için önemli olan söylenmiş, ev kuralları öğrenilmiş ve iş bölümünde uzlaşılmış olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-reparatur-vermieter",
    icon: "repair",
    level: "B1",
    course: "de",
    title: "Der Schaden muss weg",
    titleTr: "Arıza talebi",
    summary: "Ev sahibinden onarım istemeyi öğretir; talebi resmî dille kurar.",
    minutes: 10,
    focusId: "Passiv-Präsens",
    vocab: [
      { de: "der Schaden", tr: "hasar / arıza" },
      { de: "spätestens", tr: "en geç" },
      { de: "der Handwerker", tr: "usta / tamirci" },
      { de: "der Mechaniker", tr: "tamirci" },
      { de: "die Panne", tr: "arıza" },
      { de: "die Heizung", tr: "kalorifer" },
      { de: "funktionieren", tr: "çalışmak / işlemek" },
      { de: "sorgen", tr: "gereğini yapmak / sağlamak" },
    ],
    patterns: [
      { de: "… muss repariert werden.", tr: "bir şeyin onarılması gerektiğini söyler" },
      { de: "Ich bitte darum, dass …", tr: "resmî bir talep kurar" },
      { de: "bis spätestens …", tr: "son tarihi bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ev sahibinden onarım istemeyi öğreneceğiz. Bunu resmî dille söylemek işe yarıyor: talebin yazılı bir kayda dönüşüyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Edilgen çatıyı biliyorsun. Bugün onun üstüne bir katman koyacağız: zorunluluk ile birlikte kullanılınca 'onarılması gerekiyor' anlamı çıkıyor ve iki fiil birden sona gidiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "der Schaden", tr: "hasar / arıza" }),
      word("İkinci", { de: "spätestens", tr: "en geç" }),
      word("Üçüncü", { de: "der Handwerker", tr: "usta / tamirci" }),
      word("Dördüncü", { de: "der Mechaniker", tr: "tamirci" }),
      word("Beşinci", { de: "die Panne", tr: "arıza" }),
      word("Altıncı", { de: "die Heizung", tr: "kalorifer" }),
      word("Yedinci", { de: "funktionieren", tr: "çalışmak / işlemek" }),
      word("Son", { de: "sorgen", tr: "gereğini yapmak / sağlamak" }),
      {
        say: [
          tr(
            "Şimdi kural. Zorunluluk fiili ikinci sıraya oturuyor, asıl fiilin geçmiş biçimi ve edilgen yardımcısı birlikte cümlenin sonuna gidiyor. Yani sonda iki kelime yan yana duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kalorifer onarılmak zorunda.' Almancası:"),
          de("Die Heizung muss repariert werden."),
          tr("Lütfen"),
          de("Die Heizung muss repariert werden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Heizung muss repariert werden" },
      },
      {
        say: [tr("Sıra sende: 'Hasarın giderilmesi gerekiyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Schaden muss repariert werden",
          hint: [
            tr("Sonda iki kelime yan yana durur: önce geçmiş biçim, sonra edilgen yardımcısı:"),
            de("Der Schaden muss repariert werden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız resmî talep:"),
          de("Ich bitte darum, dass Sie sich bald melden."),
          tr("'Kısa sürede dönüş yapmanızı rica ediyorum' demek. Lütfen"),
          de("Ich bitte darum, dass Sie sich bald melden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bitte darum, dass Sie sich bald melden" },
      },
      {
        say: [tr("Şimdi sen: 'Musluk damlıyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Wasserhahn tropft",
          hint: [
            tr("Basit bir durum bildirimi; fiil ikinci sırada:"),
            de("Der Wasserhahn tropft."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız son tarih koyar:"),
          de("Bitte bis spätestens Freitag."),
          tr("'Lütfen en geç cumaya kadar' demek. Lütfen"),
          de("Bitte bis spätestens Freitag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bitte bis spätestens Freitag" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Heizung muss repariert werden."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Heizung muss repariert werden.",
          answer: true,
          why: [
            tr("Doğru. Zorunluluk fiili ikinci sırada, geçmiş biçim ve edilgen yardımcısı cümlenin sonunda yan yana duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık onarım talebini resmî dille kurabilirsin. Şimdi ev sahibini arıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Evinde bir arıza var ve ev sahibini aradın. Neyin bozuk olduğunu anlat, onarılması gerektiğini resmî dille söyle ve bir son tarih iste.",
      partner: "işi savsaklamaya meyilli ama ikna edilebilir bir ev sahibi",
      opening: "Hallo, hier Meier. Sie hatten angerufen — was ist denn los?",
      openingTr: "Alo, ben Meier. Aramışsınız — sorun nedir?",
      goal: "Arıza resmî dille bildirilmiş ve bir son tarih üzerinde anlaşılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-b1-nebenkosten",
    icon: "chart",
    level: "B1",
    course: "de",
    title: "Die Nebenkostenabrechnung",
    titleTr: "Gider hesabı",
    summary: "Gider hesabına itiraz etmeyi öğretir; edilgenin geçmiş biçimini gösterir.",
    minutes: 10,
    focusId: "Passiv-Präteritum",
    vocab: [
      { de: "berechnen", tr: "hesaplamak" },
      { de: "prüfen", tr: "denetlemek / kontrol etmek" },
      { de: "die Zahlung", tr: "ödeme" },
      { de: "der Betrag", tr: "tutar" },
      { de: "die Summe", tr: "toplam" },
      { de: "die Höhe", tr: "yükseklik; tutar" },
      { de: "das Recht", tr: "hak" },
      { de: "der Grund", tr: "sebep" },
    ],
    patterns: [
      { de: "Es wurde … berechnet.", tr: "geçmişte neyin hesaplandığını söyler" },
      { de: "Das kommt mir zu hoch vor.", tr: "bir tutarı fazla bulduğunu söyler" },
      { de: "Ich lege Widerspruch ein.", tr: "resmî itirazda bulunur" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün gider hesabına itiraz etmeyi öğreneceğiz. Almanya'da bu hesap yılda bir kez geliyor ve yanlış çıkması çok olağan; itiraz hakkın var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Edilgen çatının geçmiş biçimini kullanacağız. Yapı aynı, sadece yardımcı fiil geçmişe giriyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "berechnen", tr: "hesaplamak" }),
      word("İkinci", { de: "prüfen", tr: "denetlemek / kontrol etmek" }),
      word("Üçüncü", { de: "die Zahlung", tr: "ödeme" }),
      word("Dördüncü", { de: "der Betrag", tr: "tutar" }),
      word("Beşinci", { de: "die Summe", tr: "toplam" }),
      word("Altıncı", { de: "die Höhe", tr: "yükseklik; tutar" }),
      word("Yedinci", { de: "das Recht", tr: "hak" }),
      word("Son", { de: "der Grund", tr: "sebep" }),
      {
        say: [
          tr("İlk kalıbımız geçmişte yapılan bir işlemi anlatır:"),
          de("Es wurde zu viel berechnet."),
          tr("'Fazla hesaplanmış' demek. Yardımcı fiil geçmiş biçiminde, asıl fiil sonda. Lütfen"),
          de("Es wurde zu viel berechnet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es wurde zu viel berechnet" },
      },
      {
        say: [tr("Sıra sende: 'Isıtma yanlış hesaplanmış.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Die Heizung wurde falsch berechnet",
          hint: [
            tr("Yardımcı fiil geçmiş biçimini alır, asıl fiil sonda kalır:"),
            de("Die Heizung wurde falsch berechnet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız izlenimini söyler:"),
          de("Das kommt mir zu hoch vor."),
          tr("'Bana fazla geliyor' demek. Lütfen"),
          de("Das kommt mir zu hoch vor"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das kommt mir zu hoch vor" },
      },
      {
        say: [tr("Şimdi sen: 'Hesabı kontrol etmek istiyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte die Abrechnung prüfen",
          hint: [
            tr("Asıl fiil çekilmeden cümlenin sonunda kalır:"),
            de("Ich möchte die Abrechnung prüfen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız resmî itiraz:"),
          de("Ich lege Widerspruch ein."),
          tr("'İtirazda bulunuyorum' demek — resmî yazıların kalıbı. Lütfen"),
          de("Ich lege Widerspruch ein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich lege Widerspruch ein" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es wurde zu viel berechnen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es wurde zu viel berechnen.",
          answer: false,
          why: [
            tr("Edilgen cümlede asıl fiil mastar değil geçmiş biçimiyle sonda durur. Doğrusu"),
            de("Es wurde zu viel berechnet."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık gider hesabına itiraz edebilirsin. Şimdi ev sahibiyle hesabı konuşuyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Gider hesabı geldi ve ek ödeme çok yüksek görünüyor. Neyin nasıl hesaplandığını sor, fazla bulduğunu söyle ve itiraz hakkını kullan.",
      partner: "rakamları savunan ama belge göstermeye açık bir ev sahibi",
      opening: "Sie haben die Abrechnung bekommen. Gibt es damit ein Problem?",
      openingTr: "Hesap dökümünü aldınız. Bir sorun mu var?",
      goal: "Hesabın nasıl çıktığı öğrenilmiş, itirazın iletilmiş ve nasıl devam edileceği söylenmiş olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-einrichtung-stil",
    icon: "art",
    level: "B1",
    course: "de",
    title: "Mein Einrichtungsstil",
    titleTr: "Dekorasyon zevki",
    summary: "Sıfatların ismin önünde nasıl çekildiğini öğretir.",
    minutes: 10,
    focusId: "Adjektivdeklination",
    vocab: [
      { de: "die Einrichtung", tr: "döşeme / dekorasyon" },
      { de: "der Stil", tr: "tarz" },
      { de: "der Teppich", tr: "halı" },
      { de: "das Regal", tr: "raf" },
      { de: "die Wand", tr: "duvar" },
      { de: "der Sessel", tr: "koltuk" },
      { de: "der Spiegel", tr: "ayna" },
      { de: "die Kerze", tr: "mum" },
    ],
    patterns: [
      { de: "der große helle Raum", tr: "sıfatı ismin önünde kullanır" },
      { de: "mit gemütlichen Möbeln", tr: "sıfatı edatlı öbekte kullanır" },
      { de: "Ich mag den … Stil.", tr: "beğendiği tarzı söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Almancanın en çok korkulan konusuna gireceğiz ama korkacak bir şey yok: sıfatın ismin önünde ek alması. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede sıfat hiç değişmez: büyük oda, büyük odada, büyük odayı. Almancada sıfat önündeki artikele ve ismin hâline göre ek alıyor. Kural karmaşık görünüyor ama günlük konuşmada birkaç biçim işini görüyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "die Einrichtung", tr: "döşeme / dekorasyon" }),
      word("İkinci", { de: "der Stil", tr: "tarz" }),
      word("Üçüncü", { de: "der Teppich", tr: "halı" }),
      word("Dördüncü", { de: "das Regal", tr: "raf" }),
      word("Beşinci", { de: "die Wand", tr: "duvar" }),
      word("Altıncı", { de: "der Sessel", tr: "koltuk" }),
      word("Yedinci", { de: "der Spiegel", tr: "ayna" }),
      word("Son", { de: "die Kerze", tr: "mum" }),
      {
        say: [
          tr(
            "Şimdi işin kolay tarafı. Belirli artikel varsa sıfat neredeyse hep aynı iki ekten birini alıyor: yalın hâlde kısa ek, diğer hâllerde uzun ek. Yani seçim ikiye iniyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'büyük aydınlık oda' Almancada:"),
          de("der große helle Raum"),
          tr("İki sıfat da aynı eki aldı. Lütfen"),
          de("der große helle Raum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der große helle Raum" },
      },
      {
        say: [tr("Sıra sende: 'küçük sade mutfak' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "die kleine schlichte Küche",
          hint: [
            tr("Belirli artikelle yalın hâlde sıfatlar kısa eki alır:"),
            de("die kleine schlichte Küche"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Edatlı öbekte ek değişir:"),
          de("mit gemütlichen Möbeln"),
          tr("'rahat mobilyalarla' demek; burada sıfat uzun eki aldı. Lütfen"),
          de("mit gemütlichen Möbeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mit gemütlichen Möbeln" },
      },
      {
        say: [tr("Şimdi sen: 'İskandinav tarzını seviyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich mag den skandinavischen Stil",
          hint: [
            tr("Nesne olduğu için hem artikel hem sıfat ek alır:"),
            de("Ich mag den skandinavischen Stil."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Der alte Teppich passt gut dazu."),
          tr("'Eski halı buna çok yakışıyor' demek. Lütfen"),
          de("Der alte Teppich passt gut dazu"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der alte Teppich passt gut dazu" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich mag den großen hellen Raum."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich mag den großen hellen Raum.",
          answer: true,
          why: [
            tr("Doğru. Nesne olduğu için artikel değişti ve iki sıfat da uzun eki aldı."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık evini tarif edebilirsin. Şimdi bir arkadaşın dekorasyon zevkini merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın evini yeni döşüyor ve senin zevkini soruyor. Hangi tarzı sevdiğini anlat, odaları sıfatlarla tarif et ve öneri ver.",
      partner: "zevkine güvendiği için sana danışan bir arkadaş",
      opening: "Ich richte gerade neu ein. Welchen Stil magst du eigentlich?",
      openingTr: "Şu an evi yeniden döşüyorum. Sen aslında hangi tarzı seviyorsun?",
      goal: "Sevdiğin tarz anlatılmış, odalar tarif edilmiş ve arkadaşına somut bir öneri verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-b1-umzugshelfer",
    icon: "suitcase",
    level: "B1",
    course: "de",
    title: "Der Umzugstag",
    titleTr: "Taşınma organizasyonu",
    summary: "İşleri zaman sırasına göre örgütlemeyi öğretir: öncesi, sırası, sonrası.",
    minutes: 10,
    focusId: "Nebensatz-bevor-während",
    vocab: [
      { de: "bevor", tr: "-den önce" },
      { de: "während", tr: "-diği sırada" },
      { de: "erledigen", tr: "halletmek" },
      { de: "sobald", tr: "-ir -mez" },
      { de: "solange", tr: "-dığı sürece" },
      { de: "die Kiste", tr: "sandık / koli" },
      { de: "bereits", tr: "çoktan" },
      { de: "schließlich", tr: "en sonunda" },
    ],
    patterns: [
      { de: "Bevor wir anfangen, …", tr: "bir işten öncesini anlatır" },
      { de: "Während du packst, …", tr: "aynı anda olanı anlatır" },
      { de: "Danach feiern wir.", tr: "sonrasını anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün işleri zamana göre örgütlemeyi öğreneceğiz: öncesi, sırası ve sonrası. İki yeni bağlaç var ve ikisi de fiili sona atıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede bunları ekle yaparsın: başlamadan önce, sen toplarken. Almancada ayrı kelimeler geliyor ve cümlenin yapısını değiştiriyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "bevor", tr: "-den önce" }),
      word("İkinci", { de: "während", tr: "-diği sırada" }),
      word("Üçüncü", { de: "erledigen", tr: "halletmek" }),
      word("Dördüncü", { de: "sobald", tr: "-ir -mez" }),
      word("Beşinci", { de: "solange", tr: "-dığı sürece" }),
      word("Altıncı", { de: "die Kiste", tr: "sandık / koli" }),
      word("Yedinci", { de: "bereits", tr: "çoktan" }),
      word("Son", { de: "schließlich", tr: "en sonunda" }),
      {
        say: [
          tr("İlk kalıbımız öncesini anlatır:"),
          de("Bevor wir anfangen, trinken wir einen Kaffee."),
          tr("'Başlamadan önce bir kahve içelim' demek. Lütfen"),
          de("Bevor wir anfangen, trinken wir einen Kaffee"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Bevor wir anfangen, trinken wir einen Kaffee",
        },
      },
      {
        say: [tr("Sıra sende: 'Sen toplarken ben kamyoneti alıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Während du packst, hole ich den Transporter",
          hint: [
            tr("Bağlaç bölümünde fiil sonda, virgülden sonra fiil öne geçer:"),
            de("Während du packst, hole ich den Transporter."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sonrasını anlatır:"),
          de("Danach feiern wir zusammen."),
          tr("'Sonra birlikte kutlarız' demek. Lütfen"),
          de("Danach feiern wir zusammen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Danach feiern wir zusammen" },
      },
      {
        say: [tr("Şimdi sen: 'Bugün her şeyi hallediyoruz.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Heute erledigen wir alles",
          hint: [
            tr("Zaman başta olduğu için fiil hemen arkasından gelir:"),
            de("Heute erledigen wir alles."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Wir brauchen noch zwei Helfer."),
          tr("'İki yardımcıya daha ihtiyacımız var' demek. Lütfen"),
          de("Wir brauchen noch zwei Helfer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir brauchen noch zwei Helfer" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Bevor wir fangen an, trinken wir einen Kaffee."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Bevor wir fangen an, trinken wir einen Kaffee.",
          answer: false,
          why: [
            tr("Bağlaçtan sonra fiil sona giderken ikiye bölünen fiil birleşir. Doğrusu"),
            de("Bevor wir anfangen, trinken wir einen Kaffee."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık taşınma gününü örgütleyebilirsin. Şimdi yardıma gelen arkadaşınla işi bölüşeceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Taşınma günü ve bir arkadaşın yardıma geldi. İşleri zaman sırasına göre böl: başlamadan önce ne yapılacak, sen bir şey yaparken o ne yapacak, sonra ne olacak.",
      partner: "işi organize etmeyi seven, sorumluluk alan bir arkadaş",
      opening: "So, ich bin da! Was machen wir zuerst?",
      openingTr: "İşte geldim! Önce ne yapıyoruz?",
      goal: "İşler zaman sırasına göre bölüşülmüş ve gün sonunda ne yapılacağı kararlaşmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-b1-untermiete",
    icon: "key",
    level: "B1",
    course: "de",
    title: "Zur Untermiete",
    titleTr: "Kısa dönem kira",
    summary: "Geçici kiralamayı konuşmayı öğretir; çekince belirtmeyi tekrar çalıştırır.",
    minutes: 10,
    focusId: "Nebensatz-obwohl",
    vocab: [
      { de: "möbliert", tr: "eşyalı" },
      { de: "trotzdem", tr: "yine de" },
      { de: "zwar", tr: "gerçi" },
      { de: "die Wahl", tr: "seçim" },
      { de: "ziemlich", tr: "oldukça" },
      { de: "bestimmt", tr: "kesinlikle" },
      { de: "das Kissen", tr: "yastık" },
      { de: "die Decke", tr: "battaniye; tavan" },
    ],
    patterns: [
      { de: "Obwohl es klein ist, …", tr: "çekince belirterek olumlu bir şey söyler" },
      { de: "möbliert vermietet", tr: "eşyalı kiralandığını söyler" },
      { de: "auf Zeit", tr: "geçici olduğunu belirtir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bu modülün son dersi. Bugün geçici kiralamayı konuşacağız — Almanya'da öğrenciler ve yeni gelenler için çok yaygın bir yol. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Küçük ve geçici bir yerde iyi tarafları öne çıkarmak gerekiyor; bunun için çekince bağlacını kullanacağız. Onu iş modülünde görmüştün, burada evde çalıştıracağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "möbliert", tr: "eşyalı" }),
      word("İkinci", { de: "trotzdem", tr: "yine de" }),
      word("Üçüncü", { de: "zwar", tr: "gerçi" }),
      word("Dördüncü", { de: "die Wahl", tr: "seçim" }),
      word("Beşinci", { de: "ziemlich", tr: "oldukça" }),
      word("Altıncı", { de: "bestimmt", tr: "kesinlikle" }),
      word("Yedinci", { de: "das Kissen", tr: "yastık" }),
      word("Son", { de: "die Decke", tr: "battaniye; tavan" }),
      {
        say: [
          tr("İlk kalıbımız çekince belirtir:"),
          de("Obwohl es klein ist, gefällt mir das Zimmer."),
          tr("'Küçük olmasına rağmen odayı beğendim' demek. Lütfen"),
          de("Obwohl es klein ist, gefällt mir das Zimmer"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Obwohl es klein ist, gefällt mir das Zimmer",
        },
      },
      {
        say: [tr("Sıra sende: 'Süreli olmasına rağmen bana uyuyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Obwohl es befristet ist, passt es mir",
          hint: [
            tr("Bağlaç bölümünde fiil sonda, virgülden sonra fiil öne geçer:"),
            de("Obwohl es befristet ist, passt es mir."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız ilanlarda geçer:"),
          de("Das Zimmer wird möbliert vermietet."),
          tr("'Oda eşyalı kiralanıyor' demek; edilgen çatıyı hatırla. Lütfen"),
          de("Das Zimmer wird möbliert vermietet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das Zimmer wird möbliert vermietet" },
      },
      {
        say: [tr("Şimdi sen: 'Sadece bir yıllığına arıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich suche nur für ein Jahr",
          hint: [
            tr("Süreyi bildiren öbek cümlenin sonunda durur:"),
            de("Ich suche nur für ein Jahr."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız kısa ve ilanlarda sık geçer:"),
          de("Wir vermieten nur auf Zeit."),
          tr("'Sadece geçici kiralıyoruz' demek. Lütfen"),
          de("Wir vermieten nur auf Zeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir vermieten nur auf Zeit" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Obwohl es befristet ist, passt es mir."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Obwohl es befristet ist, passt es mir.",
          answer: true,
          why: [
            tr("Doğru. Çekince bölümünde fiil sonda duruyor ve virgülden sonra fiil öne geçmiş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Modülü bitirdin. Şimdi bir odayı geçici olarak kiralamak için gidiyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir yıllığına eşyalı bir oda arıyorsun ve kiracıyla konuşuyorsun. Ne kadar süre kalacağını söyle, odayı değerlendir ve koşulları netleştir.",
      partner: "bir yıl yurt dışına gideceği için odasını veren bir kiracı",
      opening: "Hallo! Du suchst also ein Zimmer auf Zeit — für wie lange denn?",
      openingTr: "Merhaba! Yani geçici bir oda arıyorsun — ne kadarlığına?",
      goal: "Kalış süresi, odanın durumu ve koşullar netleşmiş olur.",
      minTurns: 8,
    },
  },
];

import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 10 — konular 091-100 (Modül 10: Şehir ve resmî işler, A2 kapanışı).
 *
 * Modül iki yarıdan oluşuyor. İlk yarı Almanya'da yaşamanın kâğıt işini
 * konuşuyor: kayıt, form, kuyruk, kütüphane kartı, kurs kaydı. İkinci yarı
 * ileriye bakıyor ve seviyenin son yapısını pekiştiriyor — werden ile gelecek.
 * Son ders geriye bakıyor: öğrencinin A2 boyunca öğrendiği her şeyi kendi
 * ağzından duyması, kapanışın kendisi.
 *
 * Sözlükçe havuzun A2 katmanından geliyor. Resmî işler alanı havuzda vardı
 * (Rathaus, Meldebescheinigung, Anmeldeformular, Arbeitsamt, Warteschlange,
 * Erdgeschoss, geehrte) ama derslerde hiç geçmiyordu; modülün 50 kelimesinin
 * 24'ü B1 ve üstündeydi. 097 meslek adlarıyla dolduruldu — hayaldeki işi
 * anlatmak için gereken malzeme bu.
 *
 * 100 kapanış dersi bilerek söylem bağlayıcılarına ayrıldı (fast, sogar,
 * immerhin, außerdem, ganz, selbst): bir yılı özetlerken gereken kelimeler
 * bunlar ve altısı da havuzun A2 katmanının en sık geçen maddeleri arasında.
 */
export const deA2B10: Lesson[] = [
  {
    id: "de-a2-buergeramt",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Auf dem Bürgeramt",
    titleTr: "Nüfus dairesi",
    summary: "Adres kaydını yaptırmayı ve resmî soruları cevaplamayı öğretir.",
    minutes: 10,
    focusId: "W-Fragen",
    vocab: [
      { de: "das Rathaus", tr: "belediye binası" },
      { de: "die Meldebescheinigung", tr: "ikametgâh belgesi" },
      { de: "das Anmeldeformular", tr: "kayıt formu" },
      { de: "sich ausweisen", tr: "kimliğini göstermek" },
      { de: "stempeln", tr: "damgalamak" },
      { de: "die Hausnummer", tr: "kapı numarası" },
      { de: "das Arbeitsamt", tr: "iş bulma kurumu" },
      { de: "örtlich", tr: "yerel" },
    ],
    patterns: [
      { de: "Ich möchte mich anmelden.", tr: "kayıt yaptırmak istediğini söyler" },
      { de: "Wo bekomme ich das Formular?", tr: "formu nereden alacağını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün nüfus dairesindeyiz. Almanya'da taşındıktan sonra iki hafta içinde adres kaydı yaptırmak zorunludur ve bu ders o işi anlatıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Resmî dairede sorular soru kelimesiyle başlar ve fiil ikinci sırada durur. Kayıt yaptırmak dönüşlü bir fiille söylenir; zamir kip fiilinden hemen sonra gelir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Rathaus"),
          tr("Türkçesi 'belediye binası' demek. Lütfen"),
          de("das Rathaus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Rathaus" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Meldebescheinigung"),
          tr("Türkçesi 'ikametgâh belgesi' demek. Lütfen"),
          de("die Meldebescheinigung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Meldebescheinigung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Anmeldeformular"),
          tr("Türkçesi 'kayıt formu' demek. Lütfen"),
          de("das Anmeldeformular"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Anmeldeformular" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sich ausweisen"),
          tr("Türkçesi 'kimliğini göstermek' demek. Lütfen"),
          de("sich ausweisen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich ausweisen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("stempeln"),
          tr("Türkçesi 'damgalamak, mühürlemek' demek. Lütfen"),
          de("stempeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stempeln" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Hausnummer"),
          tr("Türkçesi 'kapı numarası' demek. Lütfen"),
          de("die Hausnummer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Hausnummer" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Arbeitsamt"),
          tr("Türkçesi 'iş bulma kurumu' demek. Lütfen"),
          de("das Arbeitsamt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Arbeitsamt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("örtlich"),
          tr("Türkçesi 'yerel' demek. Lütfen"),
          de("örtlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "örtlich" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich möchte mich anmelden."),
          tr(
            "Dönüşlü zamir kip fiilinden hemen sonra, asıl fiil sonda ve bölünmemiş hâlde. Dairede söylenecek ilk cümle bu.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Formu belediye binasından alıyorsunuz.' Almancası:"),
          de("Das Formular bekommen Sie im Rathaus."),
          tr("Lütfen"),
          de("Das Formular bekommen Sie im Rathaus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das Formular bekommen Sie im Rathaus" },
      },
      {
        say: [tr("Sıra sende: 'Formda kapı numarasını unutmuşsunuz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sie haben die Hausnummer im Formular vergessen",
          hint: [
            tr("Nesne belirtme hâline girer ve ortaç sona gider:"),
            de("Sie haben die Hausnummer im Formular vergessen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wo bekomme ich das Formular?"),
          tr("Soru kelimesi başta, fiil ikinci sırada, özne onun arkasında."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kontrolde kimliğini göstermek zorundasın.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Bei der Kontrolle musst du dich ausweisen",
          hint: [
            tr("Yer ifadesi başta, kip fiili ikinci sırada ve dönüşlü zamir öznenin arkasında:"),
            de("Bei der Kontrolle musst du dich ausweisen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich möchte anmelden mich."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich möchte anmelden mich.",
          answer: false,
          why: [
            tr("Dönüşlü zamir kip fiilinden hemen sonra durur, asıl fiil ise en sonda. Doğrusu:"),
            de("Ich möchte mich anmelden."),
          ],
        },
      },
      {
        say: [tr("Şimdi nüfus dairesindesin ve adres kaydı yaptırıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Yeni bir şehre taşındın ve adres kaydı yaptırmaya geldin. Ne istediğini söyle, hangi belgelerin gerektiğini sor ve belgeyi ne zaman alacağını öğren.",
      partner: "gişenin arkasında, adım adım soran bir memur",
      opening: "Guten Tag. Was kann ich für Sie tun?",
      openingTr: "İyi günler. Size nasıl yardımcı olabilirim?",
      goal: "Kayıt isteği söylenmiş, gereken belgeler öğrenilmiş ve ikametgâh belgesinin ne zaman hazır olacağı kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-formulare",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Das Formular ausfüllen",
    titleTr: "Form dili",
    summary: "Form doldururken karşılaşılan talimatları anlamayı öğretir.",
    minutes: 10,
    focusId: "Imperativ-Sie",
    vocab: [
      { de: "leserlich", tr: "okunaklı" },
      { de: "vollständig", tr: "eksiksiz" },
      { de: "fehlerfrei", tr: "hatasız" },
      { de: "durchlesen", tr: "baştan sona okumak" },
      { de: "der Stift", tr: "kalem" },
      { de: "zuordnen", tr: "eşleştirmek" },
      { de: "beschriften", tr: "etiketlemek" },
      { de: "der Notizblock", tr: "not defteri" },
    ],
    patterns: [
      { de: "Füllen Sie das Formular vollständig aus.", tr: "resmî talimatı verir" },
      { de: "Bitte schreiben Sie leserlich.", tr: "nasıl yazılacağını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün form dilini öğreniyoruz. Formlardaki talimatlar hep resmî emir kipiyle yazılır ve bu kipi tanımak formu doğru doldurmanın yarısıdır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Resmî emirde fiil başa geçer ve hitap zamiri onun hemen arkasında kalır; samimi emirde ise zamir düşerdi. Ayrılabilen bir fiilse ön ek cümlenin sonuna gider. Formlarda bu üç şey sürekli birlikte görünür. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("leserlich"),
          tr("Türkçesi 'okunaklı' demek. Lütfen"),
          de("leserlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leserlich" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vollständig"),
          tr("Türkçesi 'eksiksiz, tam' demek. Lütfen"),
          de("vollständig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vollständig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("fehlerfrei"),
          tr("Türkçesi 'hatasız' demek. Lütfen"),
          de("fehlerfrei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fehlerfrei" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("durchlesen"),
          tr("Türkçesi 'baştan sona okumak' demek. Lütfen"),
          de("durchlesen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "durchlesen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Stift"),
          tr("Türkçesi 'kalem' demek. Lütfen"),
          de("der Stift"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stift" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("zuordnen"),
          tr("Türkçesi 'eşleştirmek' demek. Lütfen"),
          de("zuordnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zuordnen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("beschriften"),
          tr("Türkçesi 'üzerine yazmak, etiketlemek' demek. Lütfen"),
          de("beschriften"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beschriften" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Notizblock"),
          tr("Türkçesi 'not defteri' demek. Lütfen"),
          de("der Notizblock"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Notizblock" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Füllen Sie das Formular vollständig aus."),
          tr("Fiil başta, hitap zamiri arkasında ve ayrılabilen ön ek cümlenin en sonunda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Lütfen formu eksiksiz doldurun.' cümlesini bir kez daha duy:"),
          de("Bitte füllen Sie das Formular vollständig aus."),
          tr("Lütfen"),
          de("Bitte füllen Sie das Formular vollständig aus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bitte füllen Sie das Formular vollständig aus" },
      },
      {
        say: [tr("Sıra sende: 'Soruyu sakin sakin baştan sona okuyun.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Lesen Sie die Aufgabe in Ruhe durch",
          hint: [
            tr("Resmî emirde fiil başta, hitap zamiri arkasında ve ön ek sonda:"),
            de("Lesen Sie die Aufgabe in Ruhe durch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Bitte schreiben Sie leserlich."),
          tr(
            "Sıfat burada bir zarf gibi kullanılıyor ve hiç ek almıyor; Almancada sıfat ile zarf arasında biçim farkı yok.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bana bir kalem verebilir misin?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Kannst du mir bitte einen Stift geben",
          hint: [
            tr("Alan kişi yönelme hâlinde ve önde, verilen şey belirtme hâlinde:"),
            de("Kannst du mir bitte einen Stift geben?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Füllen Sie das Formular vollständig aus."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Füllen Sie das Formular vollständig aus.",
          answer: true,
          why: [
            tr(
              "Resmî emirde fiil başta, hitap zamiri arkasında ve ayrılabilen ön ek en sonda: kalıbın üçü de doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi bir form dolduruyorsun ve anlamadığın yerleri soruyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir dairede form dolduruyorsun ama bazı alanları anlamadın. Memura sor, ne yazacağını öğren ve formu tamamla.",
      partner: "formu satır satır açıklayan bir memur",
      opening: "Sie können das Formular hier ausfüllen. Ist Ihnen etwas unklar?",
      openingTr: "Formu burada doldurabilirsiniz. Anlamadığınız bir yer var mı?",
      goal: "En az iki alan sorulup açıklanmış ve form tamamlanıp teslim edilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-verspaetet-amt",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Lange Warteschlange am Amt",
    titleTr: "Randevu sorunu",
    summary: "Dairedeki bekleyişi anlatmayı ve yazılı şikâyetin dilini öğretir.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "die Warteschlange", tr: "kuyruk" },
      { de: "die Reihe", tr: "sıra" },
      { de: "unpünktlich", tr: "dakik olmayan" },
      { de: "zeitweise", tr: "zaman zaman" },
      { de: "das Erdgeschoss", tr: "zemin kat" },
      { de: "das Obergeschoss", tr: "üst kat" },
      { de: "der Wegweiser", tr: "yön levhası" },
      { de: "geehrte", tr: "sayın" },
    ],
    patterns: [
      { de: "Ich habe zwei Stunden gewartet.", tr: "ne kadar beklediğini anlatır" },
      { de: "Sehr geehrte Frau Meyer, …", tr: "resmî yazının açılışıdır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün dairede uzun bir bekleyiş yaşadık. Hem olanı anlatmayı hem de yazılı şikâyetin açılışını öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Resmî bir yazı Almancada belirli bir hitapla başlar ve o hitaptaki sıfat, yazdığın kişinin cinsine göre ek alır. Bu kalıp mektupta, e-postada ve dilekçede hep aynıdır; ezberlenir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Warteschlange"),
          tr("Türkçesi 'kuyruk' demek. Lütfen"),
          de("die Warteschlange"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Warteschlange" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Reihe"),
          tr("Türkçesi 'sıra, dizi' demek. Lütfen"),
          de("die Reihe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Reihe" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("unpünktlich"),
          tr("Türkçesi 'dakik olmayan' demek. Lütfen"),
          de("unpünktlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unpünktlich" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("zeitweise"),
          tr("Türkçesi 'zaman zaman, ara ara' demek. Lütfen"),
          de("zeitweise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zeitweise" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Erdgeschoss"),
          tr("Türkçesi 'zemin kat' demek. Lütfen"),
          de("das Erdgeschoss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Erdgeschoss" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Obergeschoss"),
          tr("Türkçesi 'üst kat' demek. Lütfen"),
          de("das Obergeschoss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Obergeschoss" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Wegweiser"),
          tr("Türkçesi 'yön levhası' demek. Lütfen"),
          de("der Wegweiser"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wegweiser" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("geehrte"),
          tr("Türkçesi 'sayın' demek; resmî yazının hitabında kullanılır. Lütfen"),
          de("geehrte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geehrte" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe zwei Stunden gewartet."),
          tr("Süre bildiren ifade belirtme hâline giriyor ve ortaç cümlenin sonunda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kasada uzun bir kuyruk vardı.' Almancası:"),
          de("An der Kasse war eine lange Warteschlange."),
          tr("Lütfen"),
          de("An der Kasse war eine lange Warteschlange"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "An der Kasse war eine lange Warteschlange" },
      },
      {
        say: [tr("Sıra sende: 'Ofis zemin katta.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das Büro ist im Erdgeschoss",
          hint: [
            tr("Yer bildiren edat yönelme hâlini getirir ve artikelle kaynaşır:"),
            de("Das Büro ist im Erdgeschoss."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız resmî yazının açılışı:"),
          de("Sehr geehrte Frau Meyer, …"),
          tr(
            "Sıfat yazdığın kişinin cinsine göre ek alıyor. Bu hitap resmî yazışmanın standart başlangıcıdır.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Meslektaşım maalesef hep geç kalıyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Kollege ist leider immer unpünktlich",
          hint: [
            tr("Sıfat yüklem olarak kullanıldığı için hiç ek almaz:"),
            de("Mein Kollege ist leider immer unpünktlich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Sehr geehrte Frau Meyer, vielen Dank für Ihre E-Mail."),
          tr("cümlesi resmî bir yazı için doğru mu?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Sehr geehrte Frau Meyer, vielen Dank für Ihre E-Mail.",
          answer: true,
          why: [
            tr(
              "Hitaptaki sıfat dişil bir isme göre ek almış ve teşekkür kalıbı da resmî yazının standart devamı: açılış doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi dairedeki uzun bekleyişi anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Randevun olduğu hâlde dairede iki saat bekledin. Görevliye durumu anlat, ne olduğunu sor ve yazılı şikâyeti nereye göndereceğini öğren.",
      partner: "yoğunluktan bunalmış ama nazik bir görevli",
      opening: "Es tut mir leid, dass es heute so lange gedauert hat. Was war Ihr Anliegen?",
      openingTr: "Bugün bu kadar uzun sürdüğü için üzgünüm. Talebiniz neydi?",
      goal: "Bekleyiş anlatılmış, sebebi öğrenilmiş ve yazılı şikâyetin nereye gideceği netleşmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-bibliothek",
    icon: "book",
    level: "A2",
    course: "de",
    title: "In der Bibliothek",
    titleTr: "Kütüphane üyeliği",
    summary: "Kütüphane kurallarını anlamayı ve kitap aramayı öğretir.",
    minutes: 10,
    focusId: "Modalverb-dürfen",
    vocab: [
      { de: "das E-Book", tr: "e-kitap" },
      { de: "das Kochbuch", tr: "yemek kitabı" },
      { de: "das Schulbuch", tr: "ders kitabı" },
      { de: "aufschlagen", tr: "kitabı açmak" },
      { de: "sortieren", tr: "sıralamak" },
      { de: "nachlesen", tr: "okuyup bakmak" },
      { de: "das Pfand", tr: "depozito" },
      { de: "flüstern", tr: "fısıldamak" },
    ],
    patterns: [
      { de: "Wie lange darf ich das behalten?", tr: "ne kadar süre alabileceğini sorar" },
      { de: "Hier darf man nur flüstern.", tr: "kuralı genel bir özneyle söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kütüphanedeyiz. Kuralları anlamak ve süre sormak, üyeliğin işini görmek için yeter. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kurallar iki biçimde söylenir: sana özel olduğunda izin fiili kişiyle, herkes için geçerli olduğunda belirsiz özneyle. İkincisinde fiil hep tekil kalır. Modül 3'te izin fiilini, modül 8'de belirsiz özneyi görmüştün; burada ikisi bir arada. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das E-Book"),
          tr("Türkçesi 'e-kitap' demek. Lütfen"),
          de("das E-Book"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das E-Book" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Kochbuch"),
          tr("Türkçesi 'yemek kitabı' demek. Lütfen"),
          de("das Kochbuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kochbuch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Schulbuch"),
          tr("Türkçesi 'ders kitabı' demek. Lütfen"),
          de("das Schulbuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Schulbuch" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("aufschlagen"),
          tr("Türkçesi 'kitabı açmak' demek. Lütfen"),
          de("aufschlagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufschlagen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("sortieren"),
          tr("Türkçesi 'sıralamak, düzene koymak' demek. Lütfen"),
          de("sortieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sortieren" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("nachlesen"),
          tr("Türkçesi 'okuyup bakmak, kaynağından bakmak' demek. Lütfen"),
          de("nachlesen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nachlesen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Pfand"),
          tr("Türkçesi 'depozito' demek. Lütfen"),
          de("das Pfand"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Pfand" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("flüstern"),
          tr("Türkçesi 'fısıldamak' demek. Lütfen"),
          de("flüstern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "flüstern" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wie lange darf ich das behalten?"),
          tr("Soru kalıbı başta, izin fiili ikinci sırada ve asıl fiil sonda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kuralı kitaptan okuyup bakabilirsin.' Almancası:"),
          de("Die Regel kannst du im Buch nachlesen."),
          tr("Lütfen"),
          de("Die Regel kannst du im Buch nachlesen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Regel kannst du im Buch nachlesen" },
      },
      {
        say: [tr("Sıra sende: 'Lütfen kitabı on ikinci sayfadan açın.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Schlagen Sie bitte das Buch auf Seite zwölf auf",
          hint: [
            tr("Resmî emirde fiil başta, hitap zamiri arkasında ve ayrılabilen ön ek en sonda:"),
            de("Schlagen Sie bitte das Buch auf Seite zwölf auf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kuralı herkes için söylüyor:"),
          de("Hier darf man nur flüstern."),
          tr("Belirsiz özne kullanılıyor ve fiil tekil kalıyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Faturaları tarihe göre sıralıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich sortiere die Rechnungen nach Datum",
          hint: [
            tr("Ölçüt bildiren edat yönelme hâlini getirir ve isim artikelsiz durur:"),
            de("Ich sortiere die Rechnungen nach Datum."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Hier darf man nur flüstern."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Hier darf man nur flüstern.",
          answer: true,
          why: [
            tr(
              "Belirsiz özne tekil, izin fiili ona uymuş ve asıl fiil sonda: herkes için geçerli bir kuralın doğru kuruluşu.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi kütüphanedesin ve üye olmak istiyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Kütüphaneye üye olmak istiyorsun. Ne gerektiğini sor, kaç kitap ve ne kadar süre alabileceğini öğren ve bir kitap ara.",
      partner: "kütüphanenin kurallarını anlatan bir görevli",
      opening: "Guten Tag! Möchten Sie einen Ausweis beantragen?",
      openingTr: "İyi günler! Üyelik kartı çıkartmak ister misiniz?",
      goal: "Üyelik şartları ve ödünç süresi öğrenilmiş, bir kitap aranmış ve bir kural teyit edilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-volkshochschule",
    icon: "school",
    level: "A2",
    course: "de",
    title: "Ein Kurs an der VHS",
    titleTr: "Kurs kaydı",
    summary: "Kursa kayıt olmayı ve gelecek zamanla plan yapmayı öğretir.",
    minutes: 10,
    focusId: "Futur-werden",
    vocab: [
      { de: "teilnehmen", tr: "katılmak" },
      { de: "die Universität", tr: "üniversite" },
      { de: "die Fachhochschule", tr: "uygulamalı bilimler yüksekokulu" },
      { de: "der Stundenplan", tr: "ders programı" },
      { de: "der Workshop", tr: "çalıştay" },
      { de: "beibringen", tr: "öğretmek" },
      { de: "das Klassenzimmer", tr: "derslik" },
      { de: "das Instrument", tr: "enstrüman" },
    ],
    patterns: [
      { de: "Ich möchte am Kurs teilnehmen.", tr: "kursa katılmak istediğini söyler" },
      { de: "Der Kurs wird im Herbst beginnen.", tr: "gelecek zamanla plan bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün halk eğitim merkezine kayıt oluyoruz. Almanya'da bu kurumlar ucuzdur ve dil, müzik, spor her şey vardır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Katılmak fiili kendi edatını taşır ve o edat yönelme hâlini getirir; ayrıca ayrılabilen bir fiildir. Bir de gelecek zamanı bu derste bir kez daha çalışacağız: yardımcı fiil ikinci sırada, asıl fiil sonda. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("teilnehmen"),
          tr("Türkçesi 'katılmak' demek. Lütfen"),
          de("teilnehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "teilnehmen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Universität"),
          tr("Türkçesi 'üniversite' demek. Lütfen"),
          de("die Universität"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Universität" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Fachhochschule"),
          tr("Türkçesi 'uygulamalı bilimler yüksekokulu' demek. Lütfen"),
          de("die Fachhochschule"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Fachhochschule" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Stundenplan"),
          tr("Türkçesi 'ders programı' demek. Lütfen"),
          de("der Stundenplan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stundenplan" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Workshop"),
          tr("Türkçesi 'çalıştay, atölye' demek. Lütfen"),
          de("der Workshop"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Workshop" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("beibringen"),
          tr("Türkçesi 'birine bir şey öğretmek' demek. Lütfen"),
          de("beibringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beibringen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Klassenzimmer"),
          tr("Türkçesi 'derslik' demek. Lütfen"),
          de("das Klassenzimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Klassenzimmer" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Instrument"),
          tr("Türkçesi 'enstrüman, çalgı' demek. Lütfen"),
          de("das Instrument"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Instrument" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich möchte am Kurs teilnehmen."),
          tr(
            "Fiilin kendi edatı yönelme hâlini getiriyor ve artikelle kaynaşıyor; ayrılabilen fiil kip fiiliyle birlikte sonda duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Dans kursuna katılmak istiyorum.' Almancası:"),
          de("Ich möchte am Tanzkurs teilnehmen."),
          tr("Lütfen"),
          de("Ich möchte am Tanzkurs teilnehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte am Tanzkurs teilnehmen" },
      },
      {
        say: [tr("Sıra sende: 'Babam bana yüzmeyi öğretiyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Vater bringt mir das Schwimmen bei",
          hint: [
            tr("Öğretilen kişi yönelme hâlinde ve ayrılabilen ön ek cümlenin sonunda:"),
            de("Mein Vater bringt mir das Schwimmen bei."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız gelecek zamanla plan bildiriyor:"),
          de("Der Kurs wird im Herbst beginnen."),
          tr("Yardımcı fiil ikinci sırada, asıl fiil sonda."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Siz de bir enstrüman çalıyor musunuz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Spielen Sie auch ein Instrument",
          hint: [
            tr("Fiil başta olduğu için cümle soru olur ve nesne belirtme hâlinde durur:"),
            de("Spielen Sie auch ein Instrument?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich möchte an dem Kurs teilnehmen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich möchte an dem Kurs teilnehmen.",
          answer: true,
          why: [
            tr(
              "Fiilin edatı yönelme hâlini getirmiş ve asıl fiil sonda; edat ile artikel konuşmada kaynaşır ama ayrı yazmak da yanlış değildir.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi kurs merkezindesin ve kayıt olmak istiyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Halk eğitim merkezine geldin ve bir kursa kayıt olmak istiyorsun. Hangi kursları sunduklarını sor, ne zaman başlayacağını öğren ve kayıt ol.",
      partner: "kurs programını elinde tutan bir danışman",
      opening: "Guten Tag! Interessieren Sie sich für einen bestimmten Kurs?",
      openingTr: "İyi günler! Belirli bir kursla mı ilgileniyorsunuz?",
      goal: "Bir kurs seçilmiş, başlangıç zamanı ve ders programı öğrenilmiş ve kayıt tamamlanmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-zukunftsplaene",
    icon: "idea",
    level: "A2",
    course: "de",
    title: "Meine Pläne",
    titleTr: "Gelecek planları",
    summary: "Gelecek planlarını anlatmayı ve hedefleri sıralamayı öğretir.",
    minutes: 10,
    focusId: "Futur-werden",
    vocab: [
      { de: "das Ziel", tr: "hedef" },
      { de: "wählen", tr: "seçmek" },
      { de: "vorwärts", tr: "ileri" },
      { de: "jedenfalls", tr: "her durumda" },
      { de: "bauen", tr: "inşa etmek" },
      { de: "anstatt", tr: "yerine" },
      { de: "beenden", tr: "bitirmek" },
      { de: "das Ferienhaus", tr: "tatil evi" },
    ],
    patterns: [
      { de: "Ich werde meine Ausbildung beenden.", tr: "gelecek planını bildirir" },
      { de: "Was ist dein Ziel?", tr: "karşıdakinin hedefini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün gelecek planlarını anlatıyoruz. Gelecek zamanı hava tahmininde görmüştün; burada kendi hayatın için kullanacaksın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Gelecek zaman Almancada iki iş görür: tahmin ve karar. Kendi planını söylerken kararı bildirir ve bu, şimdiki zamanla söylemekten daha kesin durur. Yardımcı fiil ikinci sırada, asıl fiil sonda. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Ziel"),
          tr("Türkçesi 'hedef' demek. Lütfen"),
          de("das Ziel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ziel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("wählen"),
          tr("Türkçesi 'seçmek' demek. Lütfen"),
          de("wählen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wählen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("vorwärts"),
          tr("Türkçesi 'ileri, ileriye doğru' demek. Lütfen"),
          de("vorwärts"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorwärts" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("jedenfalls"),
          tr("Türkçesi 'her durumda, ne olursa olsun' demek. Lütfen"),
          de("jedenfalls"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jedenfalls" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("bauen"),
          tr("Türkçesi 'inşa etmek' demek. Lütfen"),
          de("bauen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bauen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("anstatt"),
          tr("Türkçesi 'yerine' demek. Lütfen"),
          de("anstatt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anstatt" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("beenden"),
          tr("Türkçesi 'bitirmek, tamamlamak' demek. Lütfen"),
          de("beenden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beenden" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Ferienhaus"),
          tr("Türkçesi 'tatil evi' demek. Lütfen"),
          de("das Ferienhaus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ferienhaus" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich werde meine Ausbildung beenden."),
          tr("Yardımcı fiil ikinci sırada, asıl fiil sonda ve nesne belirtme hâlinde."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Eğitimini mutlaka bitirmelisin.' Almancası:"),
          de("Du musst deine Ausbildung auf jeden Fall beenden."),
          tr("Lütfen"),
          de("Du musst deine Ausbildung auf jeden Fall beenden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Du musst deine Ausbildung auf jeden Fall beenden" },
      },
      {
        say: [tr("Sıra sende: 'Komşularımız yeni bir ev inşa ediyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Unsere Nachbarn bauen ein neues Haus",
          hint: [
            tr("Çoğul özneye fiil uyar ve cinssiz isimde sıfat belirtme hâlinde ek alır:"),
            de("Unsere Nachbarn bauen ein neues Haus."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız hedefi soruyor:"),
          de("Was ist dein Ziel?"),
          tr("Soru kelimesi başta, fiil ikinci sırada."),
        ],
      },
      {
        say: [tr("Sıra sende: 'İki menü arasından seçebilirsiniz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sie können zwischen zwei Menüs wählen",
          hint: [
            tr("Bu edat yönelme hâlini getirir ve asıl fiil sonda kalır:"),
            de("Sie können zwischen zwei Menüs wählen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich werde meine Ausbildung beenden."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich werde meine Ausbildung beenden.",
          answer: true,
          why: [
            tr("Yardımcı fiil ikinci sırada, asıl fiil en sonda: gelecek zamanın doğru kuruluşu."),
          ],
        },
      },
      {
        say: [tr("Şimdi önümüzdeki yıllar için planlarını anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla önümüzdeki yıllar için planlarınızı konuşuyorsunuz. En az iki hedefini gelecek zamanla anlat ve birinin neden önemli olduğunu söyle.",
      partner: "kendi planlarını da anlatan bir arkadaş",
      opening: "Und wo siehst du dich in fünf Jahren?",
      openingTr: "Peki kendini beş yıl sonra nerede görüyorsun?",
      goal: "En az iki hedef gelecek zamanla anlatılmış, biri gerekçelendirilmiş ve arkadaşın da kendi planını söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-traumjob",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Mein Traumjob",
    titleTr: "Hayaldeki iş",
    summary: "Hayaldeki mesleği ve sebebini anlatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "der Chirurg", tr: "cerrah" },
      { de: "der Buchhalter", tr: "muhasebeci" },
      { de: "der Programmierer", tr: "yazılımcı" },
      { de: "der Erzieher", tr: "anaokulu öğretmeni" },
      { de: "der Gärtner", tr: "bahçıvan" },
      { de: "der Berater", tr: "danışman" },
      { de: "der Tischler", tr: "marangoz" },
      { de: "unerfahren", tr: "deneyimsiz" },
    ],
    patterns: [
      { de: "Ich möchte Programmierer werden, weil ich gern am Computer arbeite.", tr: "meslek tercihini gerekçesiyle söyler" },
      { de: "Dafür brauche ich eine Ausbildung.", tr: "gereken adımı bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün hayaldeki mesleği konuşuyoruz. Meslek söylerken artikel kullanılmadığını modül 2'de görmüştün; burada gerekçesini de ekleyeceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Meslek adları Almancada bir kalıba oturur: eril biçim temel alınır, dişil biçim sonuna bir ek alır. Meslek söylenirken artikel gelmez. Gerekçe ise yan cümleyle eklenir ve orada fiil sona gider. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Chirurg"),
          tr("Türkçesi 'cerrah' demek. Lütfen"),
          de("der Chirurg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Chirurg" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Buchhalter"),
          tr("Türkçesi 'muhasebeci' demek. Lütfen"),
          de("der Buchhalter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Buchhalter" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Programmierer"),
          tr("Türkçesi 'yazılımcı' demek. Lütfen"),
          de("der Programmierer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Programmierer" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Erzieher"),
          tr("Türkçesi 'anaokulu öğretmeni' demek. Lütfen"),
          de("der Erzieher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Erzieher" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Gärtner"),
          tr("Türkçesi 'bahçıvan' demek. Lütfen"),
          de("der Gärtner"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Gärtner" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Berater"),
          tr("Türkçesi 'danışman' demek. Lütfen"),
          de("der Berater"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Berater" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Tischler"),
          tr("Türkçesi 'marangoz' demek. Lütfen"),
          de("der Tischler"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tischler" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("unerfahren"),
          tr("Türkçesi 'deneyimsiz' demek. Lütfen"),
          de("unerfahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unerfahren" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich möchte Programmierer werden, weil ich gern am Computer arbeite."),
          tr(
            "Meslek adının önünde artikel yok; gerekçe yan cümleyle geliyor ve orada fiil en sona gidiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yazılımcı olarak bütün gün bilgisayar başındayım.' Almancası:"),
          de("Als Programmierer sitze ich den ganzen Tag am Computer."),
          tr("Lütfen"),
          de("Als Programmierer sitze ich den ganzen Tag am Computer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Als Programmierer sitze ich den ganzen Tag am Computer" },
      },
      {
        say: [tr("Sıra sende: 'Bahçıvan olmak istiyorum çünkü doğayı seviyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte Gärtner werden, weil ich die Natur liebe",
          hint: [
            tr("Meslek adı artikelsiz durur ve yan cümlede fiil en sona gider:"),
            de("Ich möchte Gärtner werden, weil ich die Natur liebe."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız gereken adımı bildiriyor:"),
          de("Dafür brauche ich eine Ausbildung."),
          tr("Bu kelime bir edat ile zamirin kaynaşmış hâli ve başta olduğu için özne arkaya düşüyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Yeni şoför henüz çok deneyimsiz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der neue Fahrer ist noch sehr unerfahren",
          hint: [
            tr("Sıfat isimden önce ek alır, yüklem olarak kullanıldığında almaz:"),
            de("Der neue Fahrer ist noch sehr unerfahren."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich möchte ein Programmierer werden."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich möchte ein Programmierer werden.",
          answer: false,
          why: [
            tr("Meslek söylenirken artikel kullanılmaz. Doğrusu:"),
            de("Ich möchte Programmierer werden."),
          ],
        },
      },
      {
        say: [tr("Şimdi hayaldeki mesleğini ve sebebini anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "İş bulma kurumundaki bir danışmanla konuşuyorsun. Hangi mesleği istediğini ve neden istediğini anlat, gereken adımları sor.",
      partner: "meslek seçiminde yol gösteren bir danışman",
      opening: "Erzählen Sie mir: Was möchten Sie beruflich machen?",
      openingTr: "Anlatın bakalım: Meslek olarak ne yapmak istiyorsunuz?",
      goal: "Bir meslek ve gerekçesi söylenmiş, gereken eğitim öğrenilmiş ve bir sonraki adım kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-deutschland-leben",
    icon: "culture",
    level: "A2",
    course: "de",
    title: "Leben in Deutschland",
    titleTr: "Kültür gözlemleri",
    summary: "Kültür farklarını karşılaştırmayı ve gözlemi anlatmayı öğretir.",
    minutes: 10,
    focusId: "Komparativ",
    vocab: [
      { de: "ungerecht", tr: "adaletsiz" },
      { de: "anständig", tr: "düzgün" },
      { de: "getrennt", tr: "ayrı" },
      { de: "zudem", tr: "üstelik" },
      { de: "der Mülleimer", tr: "çöp kovası" },
      { de: "sonntags", tr: "pazarları" },
      { de: "pro", tr: "başına" },
      { de: "der Bäcker", tr: "fırıncı" },
    ],
    patterns: [
      { de: "Hier ist alles sauberer als bei uns.", tr: "iki ülkeyi karşılaştırır" },
      { de: "Den Müll trennt man hier getrennt.", tr: "genel bir âdeti anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Almanya'da yaşarken göze çarpan şeyleri konuşuyoruz ve kendi ülkenle karşılaştırıyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kültür karşılaştırması iki araç istiyor: karşılaştırma biçimi ve belirsiz özne. Birincisiyle 'burada daha …' dersin, ikincisiyle 'burada şöyle yapılır' dersin. İkisi de bu seviyede öğrendiğin yapılar; burada bir arada çalışıyorlar. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ungerecht"),
          tr("Türkçesi 'adaletsiz' demek. Lütfen"),
          de("ungerecht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ungerecht" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("anständig"),
          tr("Türkçesi 'düzgün, dürüst' demek. Lütfen"),
          de("anständig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anständig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("getrennt"),
          tr("Türkçesi 'ayrı, ayrılmış' demek. Lütfen"),
          de("getrennt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "getrennt" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("zudem"),
          tr("Türkçesi 'üstelik' demek. Lütfen"),
          de("zudem"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zudem" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Mülleimer"),
          tr("Türkçesi 'çöp kovası' demek. Lütfen"),
          de("der Mülleimer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mülleimer" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("sonntags"),
          tr("Türkçesi 'pazarları' demek. Lütfen"),
          de("sonntags"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sonntags" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("pro"),
          tr("Türkçesi 'başına' demek; kişi başına, hafta başına. Lütfen"),
          de("pro"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "pro" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Bäcker"),
          tr("Türkçesi 'fırıncı' demek. Lütfen"),
          de("der Bäcker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bäcker" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Hier ist alles sauberer als bei uns."),
          tr("Karşılaştırma eki sıfatın sonunda ve karşılaştırma kelimesi iki tarafın arasında."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Giriş kişi başına beş avro.' Almancası:"),
          de("Der Eintritt kostet fünf Euro pro Person."),
          tr("Lütfen"),
          de("Der Eintritt kostet fünf Euro pro Person"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Eintritt kostet fünf Euro pro Person" },
      },
      {
        say: [tr("Sıra sende: 'Pazarları dükkânlar kapalı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sonntags haben die Geschäfte geschlossen",
          hint: [
            tr("Zaman zarfı başta olduğu için özne fiilin arkasına düşer:"),
            de("Sonntags haben die Geschäfte geschlossen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız genel bir âdeti anlatıyor:"),
          de("Den Müll trennt man hier getrennt."),
          tr("Nesne başa alınmış ve belirtme hâlinde; belirsiz özne fiilin arkasında ve fiil tekil."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Çöp kovasını boşaltabilir misin?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Kannst du bitte den Mülleimer leeren",
          hint: [
            tr("Kip fiili başta olduğu için soru; nesne belirtme hâlinde ve asıl fiil sonda:"),
            de("Kannst du bitte den Mülleimer leeren?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Hier ist alles sauberer als bei uns."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Hier ist alles sauberer als bei uns.",
          answer: true,
          why: [
            tr("Karşılaştırma eki sıfatın sonunda ve karşılaştırma kelimesi doğru yerde: cümle doğru."),
          ],
        },
      },
      {
        say: [tr("Şimdi burada göze çarpan şeyleri kendi ülkenle karşılaştırıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir Alman arkadaşın buraya alışıp alışmadığını soruyor. Sana tuhaf gelen iki şeyi anlat ve kendi ülkende nasıl olduğunu karşılaştır.",
      partner: "kendi ülkesini dışarıdan görmek isteyen bir arkadaş",
      opening: "Sag mal ehrlich: Was ist dir hier am meisten aufgefallen?",
      openingTr: "Dürüst söyle: Burada en çok neyi fark ettin?",
      goal: "En az iki gözlem karşılaştırma biçimiyle anlatılmış ve arkadaşın da kendi görüşünü söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-pruefung",
    icon: "pen",
    level: "A2",
    course: "de",
    title: "Vor der Prüfung",
    titleTr: "Sınav heyecanı",
    summary: "Sınav öncesi heyecanı anlatmayı ve hazırlığı konuşmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "aufgeregt", tr: "heyecanlı" },
      { de: "besorgt", tr: "endişeli" },
      { de: "konzentriert", tr: "odaklanmış" },
      { de: "ablegen", tr: "sınava girmek" },
      { de: "wiederholt", tr: "defalarca" },
      { de: "tagelang", tr: "günlerce" },
      { de: "schwierig", tr: "zor" },
      { de: "schläfrig", tr: "uykulu" },
    ],
    patterns: [
      { de: "Wenn ich aufgeregt bin, kann ich nicht schlafen.", tr: "duyguyu koşula bağlar" },
      { de: "Nächste Woche lege ich meine Prüfung ab.", tr: "sınava ne zaman gireceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün sınav öncesini konuşuyoruz. Heyecanı anlatmak ve hazırlığı sıralamak, sınavdan önceki en çok kurulan cümleler. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Koşul cümlesini bu modülde bir kez daha kullanacağız ama bu kez bir duyguyla: heyecanlıysam şu oluyor. Bir de sınava girmenin fiili ayrılabilen bir fiil ve ön eki cümlenin sonuna düşüyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("aufgeregt"),
          tr("Türkçesi 'heyecanlı, tedirgin' demek. Lütfen"),
          de("aufgeregt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufgeregt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("besorgt"),
          tr("Türkçesi 'endişeli' demek. Lütfen"),
          de("besorgt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "besorgt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("konzentriert"),
          tr("Türkçesi 'odaklanmış' demek. Lütfen"),
          de("konzentriert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "konzentriert" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ablegen"),
          tr("Türkçesi 'sınava girmek' demek. Lütfen"),
          de("ablegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ablegen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("wiederholt"),
          tr("Türkçesi 'defalarca' demek. Lütfen"),
          de("wiederholt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wiederholt" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("tagelang"),
          tr("Türkçesi 'günlerce' demek. Lütfen"),
          de("tagelang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tagelang" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("schwierig"),
          tr("Türkçesi 'zor' demek. Lütfen"),
          de("schwierig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwierig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("schläfrig"),
          tr("Türkçesi 'uykulu' demek. Lütfen"),
          de("schläfrig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schläfrig" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn ich aufgeregt bin, kann ich nicht schlafen."),
          tr(
            "Koşul cümlesinde fiil sonda, ana cümlede kip fiili hemen virgülden sonra ve asıl fiil en sonda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Gelecek hafta sözlü sınavıma giriyorum.' Almancası:"),
          de("Nächste Woche lege ich meine mündliche Prüfung ab."),
          tr("Lütfen"),
          de("Nächste Woche lege ich meine mündliche Prüfung ab"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nächste Woche lege ich meine mündliche Prüfung ab" },
      },
      {
        say: [tr("Sıra sende: 'Heyecanlıyken uyuyamıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wenn ich aufgeregt bin, kann ich nicht schlafen",
          hint: [
            tr("Koşul cümlesinde fiil sonda, ana cümlede fiil hemen virgülden sonra:"),
            de("Wenn ich aufgeregt bin, kann ich nicht schlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Nächste Woche lege ich meine Prüfung ab."),
          tr("Zaman ifadesi başta, özne fiilin arkasında ve ayrılabilen ön ek cümlenin sonunda."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Günlerce çalıştım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe tagelang gelernt",
          hint: [
            tr("Süre bildiren zarf ortacın önünde durur:"),
            de("Ich habe tagelang gelernt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Nächste Woche ich lege meine Prüfung ab."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Nächste Woche ich lege meine Prüfung ab.",
          answer: false,
          why: [
            tr("Zaman ifadesi başa geçince fiil ikinci sırada kalır ve özne arkaya düşer. Doğrusu:"),
            de("Nächste Woche lege ich meine Prüfung ab."),
          ],
        },
      },
      {
        say: [tr("Şimdi sınav öncesi hazırlığını ve heyecanını anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Yarın sınavın var ve bir arkadaşınla konuşuyorsun. Nasıl hazırlandığını anlat, heyecanını söyle ve arkadaşından tavsiye al.",
      partner: "aynı sınava girmiş, sakinleştirmeye çalışan bir arkadaş",
      opening: "Morgen ist es so weit. Bist du nervös?",
      openingTr: "Yarın gün geldi. Gergin misin?",
      goal: "Hazırlık anlatılmış, heyecan dile getirilmiş ve arkadaşın somut bir tavsiye vermiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-a2-rueckblick",
    icon: "star",
    level: "A2",
    course: "de",
    title: "Schon so weit!",
    titleTr: "A2 kapanışı",
    summary: "Öğrenilen yolu özetlemeyi ve bir dönemi değerlendirmeyi öğretir.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "sich trauen", tr: "cesaret etmek" },
      { de: "fast", tr: "neredeyse" },
      { de: "sogar", tr: "bile" },
      { de: "immerhin", tr: "hiç değilse" },
      { de: "außerdem", tr: "ayrıca" },
      { de: "ganz", tr: "bütün" },
      { de: "selbst", tr: "kendi" },
      { de: "erstaunt", tr: "şaşkın" },
    ],
    patterns: [
      { de: "Ich habe fast alles verstanden.", tr: "ne kadarını başardığını söyler" },
      { de: "Immerhin traue ich mich jetzt zu sprechen.", tr: "kazanımı öne çıkarır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Son ders. Bugün A2 boyunca öğrendiğin yolu kendi ağzından anlatacaksın. Bunun için gereken küçük ama önemli kelimeleri öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir dönemi özetlerken sekiz küçük kelime işini görür: neredeyse, bile, hiç değilse, ayrıca. Bunlar cümlenin anlamını değil, tonunu taşır ve bir anlatıyı düz bir listeden değerlendirmeye çevirir. Almancada bu kelimelerin yeri sabittir ve yanlış yere konursa cümle tuhaf durur. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("sich trauen"),
          tr("Türkçesi 'cesaret etmek' demek. Lütfen"),
          de("sich trauen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich trauen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("fast"),
          tr("Türkçesi 'neredeyse' demek. Lütfen"),
          de("fast"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fast" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sogar"),
          tr("Türkçesi 'bile, hatta' demek. Lütfen"),
          de("sogar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sogar" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("immerhin"),
          tr("Türkçesi 'hiç değilse' demek. Lütfen"),
          de("immerhin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "immerhin" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("außerdem"),
          tr("Türkçesi 'ayrıca' demek. Lütfen"),
          de("außerdem"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "außerdem" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("ganz"),
          tr("Türkçesi 'bütün, tamamen' demek. Lütfen"),
          de("ganz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ganz" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("selbst"),
          tr("Türkçesi 'kendi, bizzat' demek. Lütfen"),
          de("selbst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "selbst" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("erstaunt"),
          tr("Türkçesi 'şaşkın, hayret etmiş' demek. Lütfen"),
          de("erstaunt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erstaunt" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe fast alles verstanden."),
          tr("Derece bildiren kelime nesnenin hemen önünde ve ortaç cümlenin sonunda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Pastayı kendim yaptım.' Almancası:"),
          de("Ich habe den Kuchen selbst gebacken."),
          tr("Lütfen"),
          de("Ich habe den Kuchen selbst gebacken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe den Kuchen selbst gebacken" },
      },
      {
        say: [tr("Sıra sende: 'Bütün gün çalıştık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben den ganzen Tag gearbeitet",
          hint: [
            tr("Süre bildiren ifade belirtme hâline girer ve sıfat da ona göre ek alır:"),
            de("Wir haben den ganzen Tag gearbeitet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kazanımı öne çıkarıyor:"),
          de("Immerhin traue ich mich jetzt zu sprechen."),
          tr(
            "Bağlayıcı başta olduğu için özne fiilin arkasına düşüyor ve dönüşlü zamir onu izliyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Herkes onun iyi Almancasına şaşırdı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Alle waren erstaunt über sein gutes Deutsch",
          hint: [
            tr("Şaşkınlığın sebebi bir edatla söylenir ve o edat belirtme hâlini getirir:"),
            de("Alle waren erstaunt über sein gutes Deutsch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Immerhin ich traue mich jetzt zu sprechen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Immerhin ich traue mich jetzt zu sprechen.",
          answer: false,
          why: [
            tr("Bağlayıcı başa geçince fiil ikinci sırada kalır ve özne arkaya düşer. Doğrusu:"),
            de("Immerhin traue ich mich jetzt zu sprechen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Ve bu A2'nin son dersiydi. Yüz derste geçmişi anlatmayı, yan cümle kurmayı, hâlleri ayırmayı ve günlük hayatın her sahnesinde konuşmayı öğrendin. Şimdi geriye bak ve neler yapabildiğini kendi cümlelerinle anlat.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Kursun son gününde öğretmenin sana bu dönemde neler öğrendiğini soruyor. Neyi başardığını, neyin hâlâ zor olduğunu ve bundan sonra ne yapacağını anlat.",
      partner: "dönemi kapatan, öğrencisiyle gurur duyan bir öğretmen",
      opening: "Das war unser letzter Kurstag. Was können Sie jetzt, was Sie vorher nicht konnten?",
      openingTr: "Bugün kursun son günüydü. Eskiden yapamadığınız neyi şimdi yapabiliyorsunuz?",
      goal: "En az iki kazanım ve bir zorluk anlatılmış ve bundan sonraki adım söylenmiş olur.",
      minTurns: 8,
    },
  },
];

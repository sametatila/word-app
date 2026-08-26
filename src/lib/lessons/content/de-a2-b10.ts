import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 10 — konular 091-100 (Modül 10: Şehir ve resmî işler, A2 kapanışı).
 *
 * Modül iki yarıdan oluşuyor. İlk yarı Almanya'da yaşamanın kâğıt işini
 * konuşuyor: kayıt, form, iptal olan randevu, kütüphane kartı, kurs kaydı.
 * İkinci yarı ileriye bakıyor ve seviyenin tek yeni yapısını getiriyor —
 * werden ile gelecek. Son ders geriye bakıyor: öğrencinin A2 boyunca
 * öğrendiği her şeyi kendi ağzından duyması, kapanışın kendisi.
 */
export const deA2B10: Lesson[] = [
  {
    id: "de-a2-buergeramt",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Auf dem Bürgeramt",
    titleTr: "Nüfus dairesi",
    summary:
      "İkamet kaydı yaptırmayı ve resmî dairede hangi belgelerin gerektiğini sormayı öğretir.",
    minutes: 9,
    focusId: "W-Fragen",
    vocab: [
      { de: "das Bürgeramt", tr: "nüfus dairesi" },
      { de: "sich anmelden", tr: "kayıt yaptırmak" },
      { de: "die Bescheinigung", tr: "belge" },
      { de: "die Wartenummer", tr: "sıra numarası" },
      { de: "der Beamte", tr: "memur" },
    ],
    patterns: [
      { de: "Ich möchte mich anmelden.", tr: "kayıt yaptırmak istediğini söyler" },
      { de: "Welche Unterlagen brauche ich?", tr: "hangi belgelerin gerektiğini sorar" },
      { de: "Ziehen Sie eine Nummer.", tr: "sıra numarası almasını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Almanya'ya taşınan herkesin ilk iki haftada yaptığı bir iş var: ikamet kaydı. Bugün o kapıdan geçiyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Burada yeni bir dilbilgisi yok; bildiğin soru kalıpları resmî dairenin kelimeleriyle doluyor. Bir şeyi baştan söyleyeyim: memurlar kısa ve doğrudan konuşur. Bu kabalık değil, işin temposu. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Bürgeramt"),
          tr("Türkçesi 'nüfus dairesi' demek. Lütfen"),
          de("das Bürgeramt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bürgeramt" },
      },
      {
        say: [
          tr("İkinci kelimemiz iki parçadan oluşuyor:"),
          de("sich anmelden"),
          tr("Türkçesi 'kayıt yaptırmak' demek. Lütfen"),
          de("sich anmelden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich anmelden" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Bescheinigung"),
          tr("Türkçesi 'belge, yazı' demek. Lütfen"),
          de("die Bescheinigung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bescheinigung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Wartenummer"),
          tr("Türkçesi 'sıra numarası' demek. Lütfen"),
          de("die Wartenummer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wartenummer" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Beamte"),
          tr("Türkçesi 'memur' demek. Lütfen"),
          de("der Beamte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Beamte" },
      },
      {
        say: [
          tr("İlk kalıbımız, gişeye oturur oturmaz söyleyeceğin cümle:"),
          de("Ich möchte mich anmelden."),
          tr(
            "Dönüşlü fiil olduğu için küçük zamir zorunlu; kip fiilinden hemen sonra geliyor, asıl fiil ise en sonda.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich möchte mich anmelden"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich möchte mich anmelden" },
      },
      {
        say: [
          tr("İkinci kalıbımız en önemlisi, çünkü eksik belgeyle geldiysen geri gönderilirsin:"),
          de("Welche Unterlagen brauche ich?"),
          tr("Bunu randevu alırken telefonda da sorabilirsin."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Welche Unterlagen brauche ich"), tr("deyin.")],
        expect: { kind: "repeat", target: "Welche Unterlagen brauche ich" },
      },
      {
        say: [tr("Sıra sende: 'Bir belgeye ihtiyacım var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich brauche eine Bescheinigung",
          hint: [
            tr("Belge dişil ve cümlenin nesnesi, bu yüzden artikeli değişmeden kalır:"),
            de("Ich brauche eine Bescheinigung."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp kapıdaki görevliden gelir:"),
          de("Ziehen Sie eine Nummer."),
          tr("Yani 'Bir sıra numarası alın.' Almanya'da hiçbir kuyruğa doğrudan girilmez, önce numara çekilir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ziehen Sie eine Nummer"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ziehen Sie eine Nummer" },
      },
      {
        say: [tr("Şimdi sen sor: 'Sıra numaramı nereden alabilirim?' Kısaca: 'Sıra numarası nerede?'")],
        expect: {
          kind: "produce",
          target: "Wo bekomme ich eine Wartenummer",
          hint: [
            tr("Soru kelimesi başta, fiil hemen arkasında, özne üçüncü sırada:"),
            de("Wo bekomme ich eine Wartenummer?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Meine Frau möchte sich auch anmelden."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Meine Frau möchte sich auch anmelden.",
          answer: true,
          why: [
            tr("Doğru. Küçük zamir kip fiilinin hemen arkasına oturmuş ve asıl fiil cümlenin sonunda kalmış; iki kural da yerinde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık o kapıdan korkmadan girebilirsin. Şimdi Almanya'ya yeni taşındın ve ikamet kaydı için gişedesin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Almanya'ya yeni taşındın ve nüfus dairesinde ikamet kaydı yaptırıyorsun. Ne istediğini söyle, hangi belgelerin gerektiğini sor ve memurun sorularını cevapla.",
      partner: "işini hızlı yapan, kısa cevaplar veren bir memur",
      opening: "Der Nächste, bitte! Was kann ich für Sie tun?",
      openingTr: "Sıradaki, lütfen! Size nasıl yardımcı olabilirim?",
      goal: "İstediğin işlem söylenmiş, gereken belgeler öğrenilmiş ve memurun soruları cevaplanmış olur.",
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
    summary:
      "Form üzerindeki talimatları anlamayı ve anlamadığın alanı sormayı öğretir.",
    minutes: 9,
    focusId: "Imperativ-Sie",
    vocab: [
      { de: "ausfüllen", tr: "doldurmak" },
      { de: "das Feld", tr: "alan" },
      { de: "ankreuzen", tr: "işaretlemek" },
      { de: "bedeuten", tr: "anlamına gelmek" },
      { de: "leserlich", tr: "okunaklı" },
    ],
    patterns: [
      { de: "Füllen Sie das Formular aus.", tr: "formu doldurmasını söyler" },
      { de: "Was bedeutet das?", tr: "bir kelimenin anlamını sorar" },
      { de: "Bitte in Druckbuchstaben.", tr: "matbaa harfleriyle yazmasını ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Alman formları kendi dilini konuşur ve o dil kibar emir kipiyle yazılır. Bugün onu okumayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir noktaya dikkat edeceğiz: form talimatlarındaki fiillerin çoğu ayrılabilen fiil ve emir kipinde önek cümlenin en sonuna gidiyor. Yani talimatın asıl anlamını taşıyan parça en sonda duruyor; baştan okuyup bırakırsan yanlış anlarsın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ausfüllen"),
          tr("Türkçesi 'doldurmak' demek. Lütfen"),
          de("ausfüllen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausfüllen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Feld"),
          tr("Türkçesi 'alan, kutucuk' demek. Lütfen"),
          de("das Feld"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Feld" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("ankreuzen"),
          tr("Türkçesi 'işaretlemek' demek, kutucuğa çarpı koymak gibi. Lütfen"),
          de("ankreuzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ankreuzen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("bedeuten"),
          tr("Türkçesi 'anlamına gelmek' demek. Lütfen"),
          de("bedeuten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bedeuten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("leserlich"),
          tr("Türkçesi 'okunaklı' demek. Lütfen"),
          de("leserlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leserlich" },
      },
      {
        say: [
          tr("İlk kalıbımızda öneki takip et:"),
          de("Füllen Sie das Formular aus."),
          tr(
            "Fiil başta, kibar hitap arkasında, nesne ortada ve önek en sonda. Sondaki o kısacık parça olmadan fiil başka bir şey demek olur.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Füllen Sie das Formular aus"), tr("deyin.")],
        expect: { kind: "repeat", target: "Füllen Sie das Formular aus" },
      },
      {
        say: [tr("Sıra sende: 'Bu alanı işaretleyin.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Kreuzen Sie das Feld an",
          hint: [
            tr("Fiilin gövdesi başa, öneki ise cümlenin en sonuna gider:"),
            de("Kreuzen Sie das Feld an."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız senin kurtarıcın:"),
          de("Was bedeutet das?"),
          tr("Formda anlamadığın bir kelime gördüğünde çekinmeden sor. Daha belirli sormak istersen:"),
          de("Was bedeutet dieses Wort?"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was bedeutet das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was bedeutet das" },
      },
      {
        say: [tr("Şimdi sen sor: 'Bu kelime ne anlama geliyor?'")],
        expect: {
          kind: "produce",
          target: "Was bedeutet dieses Wort",
          hint: [
            tr("Soru kelimesi başta, fiil hemen arkasında, sorduğun şey sonda:"),
            de("Was bedeutet dieses Wort?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp neredeyse her formun üstünde yazar:"),
          de("Bitte in Druckbuchstaben."),
          tr("Yani 'Matbaa harfleriyle lütfen.' Bir de sık duyacağın uyarı:"),
          de("Schreiben Sie bitte leserlich."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Bitte in Druckbuchstaben"), tr("deyin.")],
        expect: { kind: "repeat", target: "Bitte in Druckbuchstaben" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ausfüllen Sie das Formular."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ausfüllen Sie das Formular.",
          answer: false,
          why: [
            tr("Yanlış. Ayrılabilen fiilde önek başta kalamaz, cümlenin sonuna gider. Doğrusu:"),
            de("Füllen Sie das Formular aus."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık formun dilini çözebilirsin. Şimdi görevli önüne bir form koydu ve birkaç alanı anlamıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Resmî bir dairede önüne bir form koydular ve bazı alanları anlamıyorsun. Anlamadığın kelimeleri sor, ne yazman gerektiğini öğren ve talimatları teyit et.",
      partner: "sabırla açıklayan, acelesi olmayan bir danışma görevlisi",
      opening: "Hier fehlen noch drei Felder. Kommen Sie damit zurecht?",
      openingTr: "Burada üç alan eksik. Halledebiliyor musunuz?",
      goal: "Anlaşılmayan alanlar sorulmuş, ne yazılacağı öğrenilmiş ve talimat tekrarlanarak teyit edilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-verspaetet-amt",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Der Termin ist geplatzt",
    titleTr: "Randevu sorunu",
    summary:
      "İptal olan bir randevuyu ve boşa geçen beklemeyi anlatmayı öğretir.",
    minutes: 9,
    focusId: "Perfekt",
    vocab: [
      { de: "ausfallen", tr: "iptal olmak" },
      { de: "die Schlange", tr: "kuyruk" },
      { de: "die Beschwerde", tr: "şikâyet" },
      { de: "sich ärgern", tr: "sinirlenmek" },
      { de: "umsonst", tr: "boşuna" },
    ],
    patterns: [
      { de: "Ich habe zwei Stunden gewartet.", tr: "ne kadar beklediğini söyler" },
      { de: "Der Termin ist ausgefallen.", tr: "randevunun iptal olduğunu söyler" },
      { de: "Wann bekomme ich einen neuen Termin?", tr: "yeni randevu ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün sinir bozucu ama çok gerçek bir durumu konuşacağız: saatlerce bekleyip randevunun iptal olduğunu öğrenmek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Böyle bir anda iki şeyi anlatabilmen gerekir: ne olduğunu ve şimdi ne istediğini. Birincisi geçmiş zaman, ikincisi soru. İkisini de biliyorsun; bugün onları sinirini kaybetmeden bir araya getireceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ausfallen"),
          tr("Türkçesi 'iptal olmak' demek. Lütfen"),
          de("ausfallen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausfallen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Schlange"),
          tr("Türkçesi 'kuyruk' demek. Lütfen"),
          de("die Schlange"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schlange" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Beschwerde"),
          tr("Türkçesi 'şikâyet' demek. Lütfen"),
          de("die Beschwerde"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Beschwerde" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz iki parçadan oluşuyor:"),
          de("sich ärgern"),
          tr("Türkçesi 'sinirlenmek' demek. Lütfen"),
          de("sich ärgern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich ärgern" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("umsonst"),
          tr("Türkçesi 'boşuna' demek. Lütfen"),
          de("umsonst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umsonst" },
      },
      {
        say: [
          tr("İlk kalıbımız olanı anlatır:"),
          de("Ich habe zwei Stunden gewartet."),
          tr("Süre ortada, ortaç en sonda. Kuyruğu da anlatabilirsin:"),
          de("Die Schlange war sehr lang."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe zwei Stunden gewartet"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe zwei Stunden gewartet" },
      },
      {
        say: [tr("Sıra sende: 'Boşuna bekledim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe umsonst gewartet",
          hint: [
            tr("Niteleyen kelime ortada durur, ortaç yine sonda:"),
            de("Ich habe umsonst gewartet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kötü haberi verir:"),
          de("Der Termin ist ausgefallen."),
          tr(
            "İptal olmak bir değişim bildirdiği için yardımcı fiil 'sein'; ayrılabilen fiil olduğu için de ek öneğin arkasına girmiş.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Termin ist ausgefallen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Termin ist ausgefallen" },
      },
      {
        say: [
          tr("Sinirlendiğini de söyleyebilirsin ama kibarca:"),
          de("Ich ärgere mich sehr über die Situation."),
          tr("Şikâyet etmek istersen tek soru yeter:"),
          de("Wo kann ich eine Beschwerde einreichen?"),
        ],
      },
      {
        say: [
          tr("Üçüncü kalıbımız asıl işi görür:"),
          de("Wann bekomme ich einen neuen Termin?"),
          tr("Şikâyetten çok bu soru işine yarar; görevliyi çözüme yönlendirir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wann bekomme ich einen neuen Termin"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wann bekomme ich einen neuen Termin" },
      },
      {
        say: [tr("Şimdi sen sor: 'Yeni bir randevuyu ne zaman alabilirim?' Kısaca: 'Ne zaman yeni bir randevu alabilirim?'")],
        expect: {
          kind: "produce",
          target: "Wann kann ich einen neuen Termin bekommen",
          hint: [
            tr("Soru kelimesi başta, kip fiili arkasında, asıl fiil en sonda:"),
            de("Wann kann ich einen neuen Termin bekommen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Termin ist ausgefallt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Termin ist ausgefallt.",
          answer: false,
          why: [
            tr("Yanlış. Bu fiil kuralsız; ortacı düz ekle bitmez, mastar sonuyla biter. Doğrusu:"),
            de("Der Termin ist ausgefallen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık aksiliği sakin sakin anlatabilirsin. Şimdi iki saat bekledin ve gişedeki görevli sana kötü haberi veriyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İki saat kuyrukta bekledin ve randevunun iptal olduğunu öğrendin. Ne kadar beklediğini anlat, durumdan memnun olmadığını kibarca söyle ve yeni bir randevu iste.",
      partner: "kalabalıktan bunalmış ama elinden geleni yapan bir görevli",
      opening: "Es tut mir leid, der Termin ist ausgefallen. Was möchten Sie jetzt machen?",
      openingTr: "Üzgünüm, randevu iptal oldu. Şimdi ne yapmak istersiniz?",
      goal: "Bekleme anlatılmış, memnuniyetsizlik kibarca bildirilmiş ve yeni bir randevu alınmış olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-bibliothek",
    icon: "book",
    level: "A2",
    course: "de",
    title: "In der Bibliothek",
    titleTr: "Kütüphane üyeliği",
    summary:
      "Kütüphaneye üye olmayı, ödünç süresini sormayı ve uzatmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-dürfen",
    vocab: [
      { de: "die Bibliothek", tr: "kütüphane" },
      { de: "ausleihen", tr: "ödünç almak" },
      { de: "verlängern", tr: "uzatmak" },
      { de: "die Rückgabe", tr: "iade" },
      { de: "die Mahnung", tr: "gecikme uyarısı" },
    ],
    patterns: [
      { de: "Wie lange darf ich das ausleihen?", tr: "ne kadar süre alabileceğini sorar" },
      { de: "Kann ich verlängern?", tr: "süreyi uzatmak istediğini söyler" },
      { de: "Der Ausweis kostet zehn Euro.", tr: "kartın ücretini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Almanya'da kütüphane kartı en ucuz eğlence biletidir: kitap, film, dergi, hepsi bedava. Bugün o kartı çıkartıyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İzin fiilini biliyorsun. Burada onu süre sormak için kullanacağız, çünkü kütüphanede asıl mesele ne kadar süreyle alabildiğin. Süreyi kaçırırsan ücret çıkar; o yüzden bu ders gerçekten para kazandırır. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Bibliothek"),
          tr("Türkçesi 'kütüphane' demek. Lütfen"),
          de("die Bibliothek"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bibliothek" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("ausleihen"),
          tr("Türkçesi 'ödünç almak' demek. Lütfen"),
          de("ausleihen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausleihen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("verlängern"),
          tr("Türkçesi 'uzatmak' demek. Lütfen"),
          de("verlängern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verlängern" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Rückgabe"),
          tr("Türkçesi 'iade' demek. Lütfen"),
          de("die Rückgabe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rückgabe" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Mahnung"),
          tr("Türkçesi 'gecikme uyarısı' demek; geç kalırsan bu gelir ve ücreti vardır. Lütfen"),
          de("die Mahnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mahnung" },
      },
      {
        say: [
          tr("İlk kalıbımız süreyi sorar:"),
          de("Wie lange darf ich das ausleihen?"),
          tr("Soru kelimesi başta, kip fiili hemen arkasında, asıl fiil en sonda; sıra hiç değişmiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie lange darf ich das ausleihen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie lange darf ich das ausleihen" },
      },
      {
        say: [tr("Sıra sende: 'Kitabı ne kadar süre alabilirim?' nasıl sorulur?")],
        expect: {
          kind: "produce",
          target: "Wie lange darf ich das Buch ausleihen",
          hint: [
            tr("Sıra bozulmaz, yalnızca nesne belirginleşir:"),
            de("Wie lange darf ich das Buch ausleihen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız süreyi uzatır:"),
          de("Kann ich verlängern?"),
          tr("Almanya'da bunu genelde internetten de yapabilirsin ama sormayı bilmek işe yarar. Cevap şu olabilir:"),
          de("Einmal verlängern geht, danach müssen Sie es zurückgeben."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Kann ich verlängern"), tr("deyin.")],
        expect: { kind: "repeat", target: "Kann ich verlängern" },
      },
      {
        say: [tr("Şimdi daha belirli sor: 'Süreyi bir hafta uzatabilir miyim?'")],
        expect: {
          kind: "produce",
          target: "Kann ich eine Woche verlängern",
          hint: [
            tr("Kip fiili başta, süre ortada, asıl fiil sonda:"),
            de("Kann ich eine Woche verlängern?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp gişeden gelir:"),
          de("Der Ausweis kostet zehn Euro."),
          tr("Kart bir kez alınır, sonrası bedava. Geç kalırsan çıkacak olan şey ise başka:"),
          de("Sonst bekommen Sie eine Mahnung."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Ausweis kostet zehn Euro"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Ausweis kostet zehn Euro" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich darf das Buch vier Wochen ausleihen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich darf das Buch vier Wochen ausleihen.",
          answer: true,
          why: [
            tr("Doğru. Kip fiili ikinci sırada, nesne ve süre ortada, asıl fiil ise cümlenin sonunda; kalıp tam kuralına uygun."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kütüphane senin. Şimdi ilk kez içeri girdin ve danışmaya yöneliyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kütüphaneye ilk kez geldin ve üye olmak istiyorsun. Kartın ne kadar olduğunu, ne kadar süreyle ödünç alabildiğini ve uzatmanın mümkün olup olmadığını sor.",
      partner: "kitapları çok seven, önerilerini de paylaşan bir kütüphaneci",
      opening: "Willkommen! Möchten Sie einen Ausweis beantragen?",
      openingTr: "Hoş geldiniz! Kart çıkartmak ister misiniz?",
      goal: "Kart ücreti, ödünç süresi ve uzatma imkânı öğrenilmiş olur.",
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
    summary:
      "Kursa kaydolmayı ve gelecek zamanı werden ile kurmayı öğretir.",
    minutes: 9,
    focusId: "Futur-werden",
    vocab: [
      { de: "die Volkshochschule", tr: "halk eğitim merkezi" },
      { de: "der Anfänger", tr: "başlangıç seviyesindeki kişi" },
      { de: "teilnehmen", tr: "katılmak" },
      { de: "das Niveau", tr: "seviye" },
      { de: "der Platz", tr: "kontenjan" },
    ],
    patterns: [
      { de: "Ich werde einen Kurs machen.", tr: "bir kursa gideceğini söyler" },
      { de: "Der Kurs beginnt am Montag.", tr: "kursun ne zaman başladığını söyler" },
      { de: "Gibt es noch Plätze?", tr: "boş yer olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün seviyenin son yeni yapısını alıyoruz: gelecek zaman. Bir de Almanya'nın en ucuz kurs merkezine kayıt olacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede gelecek eki fiile yapışır: 'gideceğim' tek kelimedir. Almancada iki parça var: yardımcı fiil ikinci sırada, asıl fiil mastar hâlinde en sonda. Bu iskelet sana artık tanıdık. Dürüst bir not: Almanlar gelecek için çoğunlukla şimdiki zamanı kullanır; bu yapıyı vurgu yapmak, söz vermek ya da tahminde bulunmak için seçerler. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Volkshochschule"),
          tr("Türkçesi 'halk eğitim merkezi' demek. Lütfen"),
          de("die Volkshochschule"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Volkshochschule" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Anfänger"),
          tr("Türkçesi 'başlangıç seviyesindeki kişi' demek. Lütfen"),
          de("der Anfänger"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anfänger" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("teilnehmen"),
          tr("Türkçesi 'katılmak' demek. Lütfen"),
          de("teilnehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "teilnehmen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Niveau"),
          tr("Türkçesi 'seviye' demek. Lütfen"),
          de("das Niveau"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Niveau" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Platz"),
          tr("Türkçesi 'yer, kontenjan' demek. Lütfen"),
          de("der Platz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Platz" },
      },
      {
        say: [
          tr("İlk kalıbımızda iskeleti gör:"),
          de("Ich werde einen Kurs machen."),
          tr(
            "Yardımcı fiil ikinci sırada, nesne ortada, asıl fiil en sonda ve mastar hâlinde. Kip fiillerindeki düzenin aynısı.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich werde einen Kurs machen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich werde einen Kurs machen" },
      },
      {
        say: [tr("Sıra sende: 'Bir Almanca kursuna gideceğim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich werde einen Deutschkurs machen",
          hint: [
            tr("Yardımcı fiil ikinci sırada kalır, asıl fiil sona gider:"),
            de("Ich werde einen Deutschkurs machen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bilgi verir:"),
          de("Der Kurs beginnt am Montag."),
          tr("Bak, burada gelecekten söz ediliyor ama fiil şimdiki zamanda. Zamanı söyleyen kelime varsa Almancada bu gayet doğal."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Kurs beginnt am Montag"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Kurs beginnt am Montag" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız kayıt masasının ilk sorusu:"),
          de("Gibt es noch Plätze?"),
          tr("Seviyeni de söylemen istenecek:"),
          de("Ich bin Anfänger."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Gibt es noch Plätze"), tr("deyin.")],
        expect: { kind: "repeat", target: "Gibt es noch Plätze" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Kursa katılmak istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich möchte am Kurs teilnehmen",
          accept: ["Ich möchte an dem Kurs teilnehmen"],
          hint: [
            tr("Bu fiil arkasına bir edat alır; edat artikelle kaynaşır ve asıl fiil sonda kalır:"),
            de("Ich möchte am Kurs teilnehmen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich werde einen Kurs machen nächstes Jahr."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich werde einen Kurs machen nächstes Jahr.",
          answer: false,
          why: [
            tr("Yanlış. Asıl fiil cümlenin en sonunda durmalı; zaman ifadesi ondan önce gelir. Doğrusu:"),
            de("Ich werde nächstes Jahr einen Kurs machen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Gelecek zaman artık elinde. Şimdi halk eğitim merkezinin kayıt masasındasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Halk eğitim merkezinde bir kursa kaydolmak istiyorsun. Hangi kursa gideceğini söyle, seviyeni belirt ve boş yer olup olmadığını sor.",
      partner: "kurs programını ezbere bilen, yardımsever bir danışman",
      opening: "Wir haben zwei Kurse im Herbst. Welches Niveau haben Sie denn?",
      openingTr: "Sonbaharda iki kursumuz var. Sizin seviyeniz nedir?",
      goal: "Hangi kursa gideceğin ve seviyen söylenmiş, boş yer durumu öğrenilmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-zukunftsplaene",
    icon: "idea",
    level: "A2",
    course: "de",
    title: "Meine Pläne",
    titleTr: "Gelecek planları",
    summary:
      "Gelecek planlarını anlatmayı ve bir şeyi yapmayı planladığını söylemeyi öğretir.",
    minutes: 9,
    focusId: "Futur-werden",
    vocab: [
      { de: "vorhaben", tr: "niyetinde olmak" },
      { de: "sich entscheiden", tr: "karar vermek" },
      { de: "bestimmt", tr: "kesinlikle" },
      { de: "die Zukunft", tr: "gelecek" },
      { de: "der Wunsch", tr: "dilek" },
    ],
    patterns: [
      { de: "Ich werde …", tr: "gelecekte ne yapacağını söyler" },
      { de: "Ich habe vor, … zu …", tr: "bir şeyi yapmayı planladığını söyler" },
      { de: "Das ist mein größter Wunsch.", tr: "en büyük dileğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Gelecek zamanı öğrendin; bugün onu kendi hayatın için kullanacağız. Bir de plan anlatmanın ikinci yolunu ekleyeceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü yeni yapıda küçük bir kelime var ve öğrencilerin en çok takıldığı yer tam orası: kip fiilinden sonra bu kelime gelmez, ama bugünkü fiilden sonra gelir. İkisini yan yana koyup farkı duyacağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("vorhaben"),
          tr("Türkçesi 'niyetinde olmak, planlamak' demek. Lütfen"),
          de("vorhaben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorhaben" },
      },
      {
        say: [
          tr("İkinci kelimemiz iki parçadan oluşuyor:"),
          de("sich entscheiden"),
          tr("Türkçesi 'karar vermek' demek. Lütfen"),
          de("sich entscheiden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich entscheiden" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("bestimmt"),
          tr("Türkçesi 'kesinlikle, mutlaka' demek. Lütfen"),
          de("bestimmt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bestimmt" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Zukunft"),
          tr("Türkçesi 'gelecek' demek. Lütfen"),
          de("die Zukunft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zukunft" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Wunsch"),
          tr("Türkçesi 'dilek' demek. Lütfen"),
          de("der Wunsch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wunsch" },
      },
      {
        say: [
          tr("İlk kalıbımız tanıdık:"),
          de("Nächstes Jahr werde ich umziehen."),
          tr("Zaman başta, yardımcı fiil arkasında, asıl fiil sonda."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Nächstes Jahr werde ich umziehen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Nächstes Jahr werde ich umziehen" },
      },
      {
        say: [
          tr("Şimdi farkı duy. Kip fiiliyle:"),
          de("Ich will mehr lernen."),
          tr("Bugünkü fiille:"),
          de("Ich habe vor, mehr zu lernen."),
          tr("İkincisinde asıl fiilin önüne küçük bir kelime geldi ve virgülden sonra ayrı bir bölüm açıldı."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe vor, mehr zu lernen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe vor, mehr zu lernen" },
      },
      {
        say: [tr("Sıra sende: 'Daha çok kitap okumayı planlıyorum.' Kısaca: 'Daha çok okumayı planlıyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich habe vor, mehr zu lesen",
          hint: [
            tr("Virgülden sonra önce miktar, sonra o küçük kelime, en sonda mastar gelir:"),
            de("Ich habe vor, mehr zu lesen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kararsızsan da bir cümlen olsun:"),
          de("Ich habe mich noch nicht entschieden."),
          tr("Kararlıysan:"),
          de("Ich mache das bestimmt."),
        ],
      },
      {
        say: [
          tr("Üçüncü kalıbımız en içten olanı:"),
          de("Das ist mein größter Wunsch."),
          tr("Geleceğinden söz ederken bunu eklemek cümleye ağırlık katar."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist mein größter Wunsch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist mein größter Wunsch" },
      },
      {
        say: [tr("Bir üretim daha: 'Gelecek yıl daha çok Almanca konuşacağım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Nächstes Jahr werde ich mehr Deutsch sprechen",
          hint: [
            tr("Zaman ifadesi başta, yardımcı fiil hemen arkasında, asıl fiil en sonda:"),
            de("Nächstes Jahr werde ich mehr Deutsch sprechen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe vor, mehr Deutsch lernen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe vor, mehr Deutsch lernen.",
          answer: false,
          why: [
            tr("Yanlış. Bu yapıda mastarın önüne o küçük kelime gelmek zorunda; kip fiilinden sonra gelmiyordu ama burada gerekiyor. Doğrusu:"),
            de("Ich habe vor, mehr Deutsch zu lernen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık geleceğinden söz edebilirsin. Şimdi bir arkadaşınla oturmuş, bundan sonra ne yapacağını konuşuyorsunuz.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla gelecek planlarınızı konuşuyorsunuz. Ne yapmayı planladığını, neye henüz karar vermediğini ve en büyük dileğini anlat.",
      partner: "her planı 'peki ya sonra' diye sorgulayan gerçekçi bir arkadaş",
      opening: "Und, was machst du nach dem Kurs?",
      openingTr: "Ee, kurstan sonra ne yapacaksın?",
      goal: "Planların, henüz karar vermediğin nokta ve en büyük dileğin anlatılmış olur.",
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
    summary:
      "Hangi mesleği neden istediğini ve oraya nasıl varacağını anlatmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "der Traumjob", tr: "hayaldeki iş" },
      { de: "die Ausbildung", tr: "meslek eğitimi" },
      { de: "der Schritt", tr: "adım" },
      { de: "der Abschluss", tr: "diploma" },
      { de: "realistisch", tr: "gerçekçi" },
    ],
    patterns: [
      { de: "Ich will … werden, weil …", tr: "ne olmak istediğini ve nedenini söyler" },
      { de: "Dafür muss ich …", tr: "bunun için ne gerektiğini söyler" },
      { de: "Schritt für Schritt", tr: "adım adım demek" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün hayalindeki işi anlatacağız. Almanya'da bu soru iş görüşmelerinde de, tanışma sohbetlerinde de karşına çıkar. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İyi bir cevabın üç parçası var: ne istediğin, neden istediğin ve bunun için ne gerektiği. Ortadaki parça sebep bağlacıyla kuruluyor ve orada fiil yine sona gidiyor. Bir de küçük bir zorluk var: sebep cümlesinde iki fiil varsa ikisi de sona yığılıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Traumjob"),
          tr("Türkçesi 'hayaldeki iş' demek. Lütfen"),
          de("der Traumjob"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Traumjob" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Ausbildung"),
          tr("Türkçesi 'meslek eğitimi' demek; Almanya'da pek çok mesleğin şartı budur. Lütfen"),
          de("die Ausbildung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ausbildung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Schritt"),
          tr("Türkçesi 'adım' demek. Lütfen"),
          de("der Schritt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schritt" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Abschluss"),
          tr("Türkçesi 'diploma, mezuniyet' demek. Lütfen"),
          de("der Abschluss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Abschluss" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("realistisch"),
          tr("Türkçesi 'gerçekçi' demek. Lütfen"),
          de("realistisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "realistisch" },
      },
      {
        say: [
          tr("Hayal kurarken ayakları yerde tutan cümle de hazır olsun:"),
          de("Der Plan muss realistisch sein."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız hem isteği hem sebebi verir:"),
          de("Ich will Lehrerin werden, weil ich gern mit Kindern arbeite."),
          tr(
            "Ana cümlede asıl fiil sonda; sebep cümlesinde de fiil sonda. İki ayrı sonda, iki ayrı fiil.",
          ),
        ],
      },
      {
        say: [
          tr("Lütfen"),
          de("Ich will Lehrerin werden, weil ich gern mit Kindern arbeite"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Ich will Lehrerin werden, weil ich gern mit Kindern arbeite",
        },
      },
      {
        say: [tr("Sıra sende: 'Doktor olmak istiyorum, çünkü insanlara yardım etmek istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich will Ärztin werden, weil ich Menschen helfen will",
          hint: [
            tr("Sebep cümlesinde iki fiil varsa ikisi de sona yığılır: önce mastar, sonra kip fiili:"),
            de("Ich will Ärztin werden, weil ich Menschen helfen will."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yolu gösterir:"),
          de("Dafür muss ich einen Abschluss haben."),
          tr("Baştaki kelime 'bunun için' demek ve cümlenin ilk öğesi olduğu için fiil hemen arkasına geçiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Dafür muss ich einen Abschluss haben"), tr("deyin.")],
        expect: { kind: "repeat", target: "Dafür muss ich einen Abschluss haben" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bunun için bir meslek eğitimi yapmam gerekiyor.'")],
        expect: {
          kind: "produce",
          target: "Dafür muss ich eine Ausbildung machen",
          hint: [
            tr("Baştaki kelimeden sonra kip fiili gelir, asıl fiil ise sonda kalır:"),
            de("Dafür muss ich eine Ausbildung machen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız beklentiyi gerçekçi tutar:"),
          de("Schritt für Schritt"),
          tr("Yani 'adım adım'. Cümlede şöyle kullanılır:"),
          de("Ich mache das Schritt für Schritt."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich mache das Schritt für Schritt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich mache das Schritt für Schritt" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich will Lehrer werden, weil ich Kinder mag."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich will Lehrer werden, weil ich Kinder mag.",
          answer: true,
          why: [
            tr("Doğru. Sebep cümlesinde çekimli fiil en sona gitmiş; ana cümlede ise asıl fiil sonda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hedefini anlatabilirsin. Şimdi bir kariyer danışmanının karşısındasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kariyer danışmanıyla oturuyorsun. Hangi işi neden istediğini anlat, bunun için ne gerektiğini sor ve planının gerçekçi olup olmadığını konuş.",
      partner: "gerçekçi ama cesaretlendiren bir kariyer danışmanı",
      opening: "Erzählen Sie mal: Was möchten Sie beruflich machen?",
      openingTr: "Anlatın bakalım: mesleki olarak ne yapmak istiyorsunuz?",
      goal: "İstediğin iş gerekçesiyle anlatılmış, gerekenler öğrenilmiş ve planın gerçekçiliği konuşulmuş olur.",
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
    summary:
      "Buradaki hayatı memleketinle karşılaştırmayı ve neye alıştığını anlatmayı öğretir.",
    minutes: 9,
    focusId: "Komparativ",
    vocab: [
      { de: "auffallen", tr: "dikkat çekmek" },
      { de: "die Pünktlichkeit", tr: "dakiklik" },
      { de: "die Regel", tr: "kural" },
      { de: "üblich", tr: "alışılmış" },
      { de: "das Vorurteil", tr: "önyargı" },
    ],
    patterns: [
      { de: "Hier ist alles anders als zu Hause.", tr: "buranın farklı olduğunu söyler" },
      { de: "Daran habe ich mich gewöhnt.", tr: "bir şeye alıştığını söyler" },
      { de: "Was mir gefällt, ist die Ruhe.", tr: "neyi sevdiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün kendi gözlemlerini anlatacağız: burada ne farklı, neye alıştın, ne hâlâ tuhaf geliyor. Bu sohbet Almanlarla en kolay kurulan sohbettir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Karşılaştırma yaparken bir kelimeye dikkat edeceğiz. Türkçede 'gibi' ve 'daha' ayrı ayrı çalışır; Almancada eşitlik için bir kelime, farklılık için başka bir kelime var ve bunlar karıştırılınca cümle kulağı tırmalar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("auffallen"),
          tr("Türkçesi 'dikkat çekmek, göze çarpmak' demek. Lütfen"),
          de("auffallen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auffallen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Pünktlichkeit"),
          tr("Türkçesi 'dakiklik' demek. Lütfen"),
          de("die Pünktlichkeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Pünktlichkeit" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Regel"),
          tr("Türkçesi 'kural' demek. Lütfen"),
          de("die Regel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Regel" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("üblich"),
          tr("Türkçesi 'alışılmış, olağan' demek. Lütfen"),
          de("üblich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "üblich" },
      },
      {
        say: [
          tr("Gözlem anlatırken en çok işine yarayacak cümle şu:"),
          de("Das ist hier so üblich."),
        ],
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Vorurteil"),
          tr("Türkçesi 'önyargı' demek. Lütfen"),
          de("das Vorurteil"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Vorurteil" },
      },
      {
        say: [
          tr("İlk kalıbımız karşılaştırır:"),
          de("Hier ist alles anders als zu Hause."),
          tr("Farklılık bildiren o küçük kelimeyi iyi tut; eşitlik bildiren kelimeyle karıştırılıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Hier ist alles anders als zu Hause"), tr("deyin.")],
        expect: { kind: "repeat", target: "Hier ist alles anders als zu Hause" },
      },
      {
        say: [tr("Sıra sende: 'Buradaki insanlar bizdekinden daha doğrudan.' Kısaca: 'Burada insanlar daha doğrudan.'")],
        expect: {
          kind: "produce",
          target: "Hier sind die Leute direkter als bei uns",
          hint: [
            tr("Karşılaştırmada sıfat sonuna ek alır ve arkasından o küçük kelime gelir:"),
            de("Hier sind die Leute direkter als bei uns."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız zamanla değişeni anlatır:"),
          de("Daran habe ich mich gewöhnt."),
          tr("Yani 'Buna alıştım.' Baştaki kelime 'ona, buna' demek ve cümlenin ilk öğesi olduğu için fiil hemen arkasına geçiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Daran habe ich mich gewöhnt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Daran habe ich mich gewöhnt" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız beğendiğini söyler:"),
          de("Was mir gefällt, ist die Ruhe."),
          tr("Sevmediğin bir şey varsa da aynı biçimde söylersin; önemli olan bunu bir önyargıya dönüştürmemek:"),
          de("Das ist nur ein Vorurteil."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was mir gefällt, ist die Ruhe"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was mir gefällt, ist die Ruhe" },
      },
      {
        say: [tr("Bir üretim daha: 'Dakiklik dikkatimi çekti.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Die Pünktlichkeit ist mir aufgefallen",
          hint: [
            tr("Bu fiil kişiyi 'bana' biçiminde alır ve ayrılabilen olduğu için ek öneğin arkasına girer:"),
            de("Die Pünktlichkeit ist mir aufgefallen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Hier ist alles anders wie zu Hause."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Hier ist alles anders wie zu Hause.",
          answer: false,
          why: [
            tr("Yanlış. Bu kelime eşitlik bildirir; farklılık ve karşılaştırma için başka bir kelime gerekir. Doğrusu:"),
            de("Hier ist alles anders als zu Hause."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık gözlemlerini paylaşabilirsin. Şimdi Almanya'ya yeni gelmiş bir tanıdığın sana sorular soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Almanya'ya yeni gelmiş bir tanıdığınla oturuyorsun. Burada neyin farklı olduğunu, neye alıştığını ve neyi sevdiğini anlat; onun sorularını cevapla.",
      partner: "her şeye şaşıran, daha yeni gelmiş bir tanıdık",
      opening: "Ich bin erst seit einer Woche hier. Was war für dich am Anfang schwer?",
      openingTr: "Buraya geleli daha bir hafta oldu. Senin için başlangıçta ne zordu?",
      goal: "Neyin farklı olduğu, neye alıştığın ve neyi sevdiğin anlatılmış olur.",
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
    summary:
      "Sınav öncesi heyecanı anlatmayı ve birine cesaret vermeyi öğretir.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "aufgeregt", tr: "heyecanlı" },
      { de: "atmen", tr: "nefes almak" },
      { de: "die Angst", tr: "korku" },
      { de: "sich beruhigen", tr: "sakinleşmek" },
      { de: "gelassen", tr: "sakin" },
    ],
    patterns: [
      { de: "Wenn ich aufgeregt bin, atme ich tief.", tr: "heyecanlandığında ne yaptığını söyler" },
      { de: "Du schaffst das!", tr: "cesaret verirken kullanılır" },
      { de: "Tief durchatmen!", tr: "derin nefes almasını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Yarın sınavın var gibi düşün. Bugün hem o heyecanı anlatmayı hem de birine cesaret vermeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Koşul cümlesini biliyorsun. Bugün onu duygularınla kullanacağız ve o kuralın ikinci yarısını bir kez daha çalışacağız: koşul başa geçince ana cümlede fiil hemen virgülün arkasına gelir. Önce kelimeleri öğrenelim.",
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
          de("atmen"),
          tr("Türkçesi 'nefes almak' demek. Lütfen"),
          de("atmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "atmen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Angst"),
          tr("Türkçesi 'korku' demek. Lütfen"),
          de("die Angst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Angst" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz iki parçadan oluşuyor:"),
          de("sich beruhigen"),
          tr("Türkçesi 'sakinleşmek' demek. Lütfen"),
          de("sich beruhigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich beruhigen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("gelassen"),
          tr("Türkçesi 'sakin, soğukkanlı' demek. Lütfen"),
          de("gelassen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gelassen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn ich aufgeregt bin, atme ich tief."),
          tr(
            "Koşul cümlesinde fiil sonda; virgülden sonra ana cümlede önce fiil, sonra özne geliyor. Bu ters sıra Türkçede yok, o yüzden kulağını alıştırman gerek.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wenn ich aufgeregt bin, atme ich tief"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wenn ich aufgeregt bin, atme ich tief" },
      },
      {
        say: [tr("Sıra sende: 'Heyecanlandığımda çay içerim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wenn ich aufgeregt bin, trinke ich Tee",
          hint: [
            tr("Koşulda fiil sonda; virgülden sonra fiil öne, özne arkaya geçer:"),
            de("Wenn ich aufgeregt bin, trinke ich Tee."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Korkunu söylemek istersen:"),
          de("Ich habe Angst vor der Prüfung."),
          tr("Yani 'Sınavdan korkuyorum.' Bu fiil arkasından hep aynı edatı alır."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe Angst vor der Prüfung"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe Angst vor der Prüfung" },
      },
      {
        say: [
          tr("İkinci kalıbımız karşındakine güç verir:"),
          de("Du schaffst das!"),
          tr("Almanlar bunu sınavdan önce, işe başlarken, zor günlerde hep söyler. Bir de:"),
          de("Bleib gelassen!"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Du schaffst das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Du schaffst das" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız en kısa öğüt:"),
          de("Tief durchatmen!"),
          tr("Fiil mastar hâlinde ve tek başına; Almanlar kısa yönergeleri böyle verir."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Bunu kesinlikle başarırsın.'")],
        expect: {
          kind: "produce",
          target: "Du schaffst das bestimmt",
          hint: [
            tr("Pekiştiren kelime fiilden sonra, cümlenin sonuna gelir:"),
            de("Du schaffst das bestimmt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich aufgeregt bin, hilft mir Musik."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich aufgeregt bin, hilft mir Musik.",
          answer: true,
          why: [
            tr("Doğru. Koşulda fiil sonda, virgülden sonra fiil öne geçmiş ve özne en sona düşmüş; bu fiil de kişiyi 'bana' biçiminde alıyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hem kendini hem başkasını sakinleştirebilirsin. Şimdi yarın sınavın var ve kurs arkadaşınla konuşuyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yarın Almanca sınavın var ve kurs arkadaşınla konuşuyorsun. Ne hissettiğini anlat, heyecanlandığında ne yaptığını söyle ve ona da cesaret ver.",
      partner: "kendi de gergin olan ama seni sakinleştirmeye çalışan bir kurs arkadaşı",
      opening: "Morgen ist die Prüfung. Wie fühlst du dich?",
      openingTr: "Yarın sınav var. Kendini nasıl hissediyorsun?",
      goal: "Heyecanın anlatılmış, ne yaptığın söylenmiş ve arkadaşına cesaret verilmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-a2-rueckblick",
    icon: "star",
    level: "A2",
    course: "de",
    title: "Schon so weit!",
    titleTr: "A2 kapanışı",
    summary:
      "Baştan bugüne neler öğrendiğini anlatmayı ve kendi ilerlemeni görmeyi sağlar.",
    minutes: 9,
    focusId: "Perfekt",
    vocab: [
      { de: "der Fortschritt", tr: "ilerleme" },
      { de: "sich trauen", tr: "cesaret etmek" },
      { de: "der Rückblick", tr: "geriye bakış" },
      { de: "sicher", tr: "kendinden emin" },
      { de: "das Zertifikat", tr: "sertifika" },
    ],
    patterns: [
      { de: "Ich habe viel gelernt.", tr: "çok şey öğrendiğini söyler" },
      { de: "Am Anfang konnte ich nichts sagen.", tr: "başlangıçta ne yapamadığını söyler" },
      { de: "Jetzt kann ich …", tr: "artık neler yapabildiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bu, A2'nin son dersi. Yeni bir kural yok; bugün geriye dönüp baktığında ne kadar yol aldığını kendi ağzından duyacaksın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir düşün: bu seviyeye başlarken geçmişten söz edemiyordun, sebep söyleyemiyordun, gelecek kuramıyordun. Şimdi üçünü de yapabiliyorsun. Bugünkü iş, bunu Almanca anlatabilmek. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Fortschritt"),
          tr("Türkçesi 'ilerleme' demek. Lütfen"),
          de("der Fortschritt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Fortschritt" },
      },
      {
        say: [
          tr("İkinci kelimemiz iki parçadan oluşuyor:"),
          de("sich trauen"),
          tr("Türkçesi 'cesaret etmek' demek. Lütfen"),
          de("sich trauen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich trauen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Rückblick"),
          tr("Türkçesi 'geriye bakış' demek. Lütfen"),
          de("der Rückblick"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Rückblick" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sicher"),
          tr("Türkçesi 'kendinden emin' demek. Lütfen"),
          de("sicher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sicher" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Zertifikat"),
          tr("Türkçesi 'sertifika' demek. Lütfen"),
          de("das Zertifikat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Zertifikat" },
      },
      {
        say: [
          tr("İlk kalıbımız en yalın hâliyle:"),
          de("Ich habe viel gelernt."),
          tr("Bunu söylerken ne öğrendiğini de ekleyebilirsin:"),
          de("Ich habe viel Grammatik gelernt."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe viel gelernt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe viel gelernt" },
      },
      {
        say: [
          tr("İkinci kalıbımız geriye bakar:"),
          de("Am Anfang konnte ich nichts sagen."),
          tr(
            "Kip fiilinin tek parça geçmişi burada işe yarıyor; 'yapabiliyordum' demek için Perfekt kurmana gerek yok.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Am Anfang konnte ich nichts sagen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Am Anfang konnte ich nichts sagen" },
      },
      {
        say: [tr("Sıra sende: 'Başlangıçta hiçbir şey anlayamıyordum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Anfang konnte ich nichts verstehen",
          hint: [
            tr("Zaman ifadesi başta, kip fiilinin tek parça geçmişi arkasında, asıl fiil sonda:"),
            de("Am Anfang konnte ich nichts verstehen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız bugünü söyler:"),
          de("Jetzt kann ich ein Gespräch führen."),
          tr("İkisini yan yana koyunca ilerlemen duyuluyor:"),
          de("Am Anfang war ich unsicher, jetzt bin ich sicher."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Jetzt kann ich ein Gespräch führen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Jetzt kann ich ein Gespräch führen" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Artık konuşmaya cesaret ediyorum.'")],
        expect: {
          kind: "produce",
          target: "Jetzt traue ich mich zu sprechen",
          hint: [
            tr("Bu fiil küçük zamirini alır ve arkasındaki mastarın önüne o kelime gelir:"),
            de("Jetzt traue ich mich zu sprechen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sırada ne var, onu da söyleyebilirsin:"),
          de("Ich werde die Prüfung machen und ein Zertifikat bekommen."),
          tr("Ya da daha sakin bir cümle:"),
          de("Mein Fortschritt macht mich froh."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Jetzt kann ich mich auf Deutsch vorstellen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Jetzt kann ich mich auf Deutsch vorstellen.",
          answer: true,
          why: [
            tr("Doğru. Zaman kelimesi başta, kip fiili arkasında, küçük zamir onun ardında ve asıl fiil sonda; öğrendiğin dört kural tek cümlede birden çalışıyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "A2'yi bitirdin. Geçmişi anlatabiliyor, sebep söyleyebiliyor, plan yapabiliyor ve bir durumu yönetebiliyorsun. Şimdi son konuşma: öğretmenin sana bu yolu soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Kurs bitti ve öğretmeninle son bir sohbet ediyorsun. Başlangıçta neleri yapamadığını, şimdi neleri yapabildiğini ve bundan sonra ne planladığını anlat.",
      partner: "seninle gurur duyan, sorular sorarak konuşturan Almanca öğretmenin",
      opening: "Wir sind am Ende des Kurses. Was hat sich für Sie verändert?",
      openingTr: "Kursun sonuna geldik. Sizin için ne değişti?",
      goal: "Başta yapamadıkların, şimdi yapabildiklerin ve bundan sonraki planın anlatılmış olur.",
      minTurns: 8,
    },
  },
];

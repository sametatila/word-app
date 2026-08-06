import { de, tr, type Lesson } from "../types";

/**
 * A1 · Modül 10 — İletişim ve geçmişe ilk adım (091–100).
 *
 * A1'in kapanış modülü ve iki işi var.
 *
 * Birincisi iletişim: telefon, mesaj, randevu ve davet. Bunlar sınıfta değil
 * hayatta geçen konuşmalar ve hepsinin hazır kalıpları var.
 *
 * İkincisi ve asıl olanı **geçmiş zaman**. Türkçe konuşan için buradaki
 * kırılma büyük: Türkçede geçmiş tek bir ekle kuruluyor (gittim, aldım),
 * Almancada ise cümle ikiye bölünüyor — yardımcı fiil ikinci sıraya, asıl
 * fiilin geçmiş biçimi cümlenin en sonuna. Üstüne hangi yardımcı fiilin
 * geleceği fiile göre değişiyor: yer değiştirme bildiren fiiller `sein`,
 * gerisi `haben` alıyor.
 *
 * Sıra bunu taşımak için kurulu: önce `haben` ile Perfekt (çoğunluk), sonra
 * `sein` ile Perfekt (küçük ama sık kullanılan küme), sonra ikisinin birlikte
 * kullanıldığı iki anlatım dersi. Modül — ve A1 — öğrencinin ne öğrendiğini
 * kendi cümleleriyle anlattığı bir dersle kapanıyor; o ders de yeni geçmiş
 * zamanı kullanıyor.
 */
export const deA1B10: Lesson[] = [
  {
    id: "de-a1-telefonieren",
    icon: "phone",
    level: "A1",
    course: "de",
    title: "Am Telefon",
    titleTr: "Telefonda",
    summary: "Telefonda kendini tanıtmayı ve birini istemeyi öğretir.",
    minutes: 9,
    focusId: "Vorstellung",
    vocab: [
      { de: "das Handy", tr: "cep telefonu" },
      { de: "klingeln", tr: "çalmak" },
      { de: "später", tr: "sonra, daha sonra" },
      { de: "zurückrufen", tr: "geri aramak" },
      { de: "falsch", tr: "yanlış" },
    ],
    patterns: [
      { de: "Hier ist …", tr: "telefonda kendini tanıtırken kullanılır" },
      { de: "Kann ich mit … sprechen?", tr: "birini telefona isterken kullanılır" },
      { de: "Ich rufe später an.", tr: "sonra arayacağını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün telefonda konuşmayı öğreneceğiz: kendini tanıtmak, birini istemek ve sonra arayacağını söylemek. Telefonda yüz ifadesi yok, o yüzden kalıplar daha da önemli. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Telefonda Almanların kendini tanıtma biçimi Türkçeden farklı: karşıdaki açar açmaz soyadını söyler. Sen de aynısını yapacaksın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Handy"),
          tr("Türkçesi 'cep telefonu' demek. Lütfen"),
          de("das Handy"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Handy" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("klingeln"),
          tr("Türkçesi 'çalmak' demek — telefonun çalması. Lütfen"),
          de("klingeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "klingeln" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("später"),
          tr("Türkçesi 'sonra, daha sonra' demek. Lütfen"),
          de("später"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "später" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("zurückrufen"),
          tr("Türkçesi 'geri aramak' demek. Bu da ikiye bölünen fiillerden. Lütfen"),
          de("zurückrufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zurückrufen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("falsch"),
          tr("Türkçesi 'yanlış' demek. Lütfen"),
          de("falsch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "falsch" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Hier ist …"),
          tr(
            "Telefonda kendini tanıtırken kullanılır. Türkçede 'ben Ali' dersin; Almancada 'burası Ali' der gibi kurulur ve bu tamamen normaldir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ben Ali.' Almancası:"),
          de("Hier ist Ali."),
          tr("Lütfen"),
          de("Hier ist Ali"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hier ist Ali" },
      },
      {
        say: [tr("Sıra sende: 'Ben Anna.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Hier ist Anna",
          hint: [
            tr("Kalıp hiç değişmiyor, sadece adı koyuyorsun:"),
            de("Hier ist Anna."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız birini istemek için:"),
          de("Kann ich mit Frau Berger sprechen?"),
          tr("'Berger Hanımla görüşebilir miyim?' demek. Lütfen"),
          de("Kann ich mit Frau Berger sprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Kann ich mit Frau Berger sprechen" },
      },
      {
        say: [tr("Şimdi sen: 'Ali'yle görüşebilir miyim?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Kann ich mit Ali sprechen",
          hint: [
            tr("Asıl fiil çekilmeden cümlenin sonunda kalır:"),
            de("Kann ich mit Ali sprechen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız görüşme bitince:"),
          de("Ich rufe später an."),
          tr("'Sonra ararım' demek; ikiye bölünen fiil yine sona gitti. Lütfen"),
          de("Ich rufe später an"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich rufe später an" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich anrufe später."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich anrufe später.",
          answer: false,
          why: [
            tr("Fiilin baştaki parçası yapışık kalmış; cümlenin sonuna gitmeli. Doğrusu"),
            de("Ich rufe später an."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık telefonda konuşabilirsin. Şimdi bir yeri arayacaksın ve karşındaki kişiyle görüşmek isteyeceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir ofisi aradın ve telefonu sekreter açtı. Kendini tanıt, görüşmek istediğin kişiyi söyle ve o kişi yoksa sonra arayacağını belirt.",
      partner: "resmî konuşan, kibar bir sekreter",
      opening: "Firma Berger, guten Tag. Was kann ich für Sie tun?",
      openingTr: "Berger Şirketi, iyi günler. Sizin için ne yapabilirim?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-nachricht",
    icon: "mail",
    level: "A1",
    course: "de",
    title: "Eine Nachricht schreiben",
    titleTr: "Mesaj yazma",
    summary: "Kısa mesaj yazmayı ve mesajı doğru kapatmayı öğretir.",
    minutes: 8,
    focusId: "V2-Regel",
    vocab: [
      { de: "die Nachricht", tr: "mesaj" },
      { de: "schicken", tr: "göndermek" },
      { de: "der Gruß", tr: "selam" },
      { de: "lieb", tr: "sevgili, canım" },
      { de: "bald", tr: "yakında" },
    ],
    patterns: [
      { de: "Ich schreibe dir …", tr: "birine yazdığını söyler" },
      { de: "Bis später!", tr: "mesajı arkadaşça kapatır" },
      { de: "Liebe Grüße", tr: "mesajı sıcak biçimde kapatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kısa mesaj yazmayı öğreneceğiz. Almancada mesajın kapanışı neredeyse mesaj kadar önemli; hazır kalıplar var ve hepsi kullanılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu kalıpları öğrenince arkadaşına da iş yerine de mesaj yazabilirsin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Nachricht"),
          tr("Türkçesi 'mesaj' demek. Lütfen"),
          de("die Nachricht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nachricht" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("schicken"),
          tr("Türkçesi 'göndermek' demek. Lütfen"),
          de("schicken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schicken" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Gruß"),
          tr("Türkçesi 'selam' demek. Lütfen"),
          de("der Gruß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Gruß" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("lieb"),
          tr("Türkçesi 'sevgili, canım' demek. Lütfen"),
          de("lieb"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lieb" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("bald"),
          tr("Türkçesi 'yakında' demek. Lütfen"),
          de("bald"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bald" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich schreibe dir …"),
          tr("'Sana yazıyorum' demek. Kime yazdığını söyleyen kelime fiilden hemen sonra gelir."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sana yarın yazarım.' Almancası:"),
          de("Ich schreibe dir morgen."),
          tr("Lütfen"),
          de("Ich schreibe dir morgen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich schreibe dir morgen" },
      },
      {
        say: [tr("Sıra sende: 'Yarın sana yazarım.' Bu sefer cümleye zamanla başla.")],
        expect: {
          kind: "produce",
          target: "Morgen schreibe ich dir",
          hint: [
            tr("Zaman başa geçince özne fiilin arkasına düşer:"),
            de("Morgen schreibe ich dir."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız mesajı kapatır:"),
          de("Bis später!"),
          tr("'Sonra görüşürüz' demek ve arkadaşça bir kapanıştır. Lütfen"),
          de("Bis später"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bis später" },
      },
      {
        say: [
          tr("Son kalıbımız daha sıcak bir kapanış:"),
          de("Liebe Grüße"),
          tr("'Sevgiler' demek. Mesajın sonuna, adının üstüne yazılır. Lütfen"),
          de("Liebe Grüße"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Liebe Grüße" },
      },
      {
        say: [tr("Şimdi sen: 'Sana bir mesaj gönderiyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich schicke dir eine Nachricht",
          hint: [
            tr("Önce kime, sonra ne gönderdiğin gelir:"),
            de("Ich schicke dir eine Nachricht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Heute schicke ich dir eine Nachricht."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Heute schicke ich dir eine Nachricht.",
          answer: true,
          why: [
            tr("Doğru. Zaman ifadesi başta duruyor, fiil ikinci sırada ve özne fiilin arkasına geçmiş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık mesaj yazabilir ve doğru kapatabilirsin. Şimdi bir arkadaşınla mesajlaşacaksın: seni akşam için bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla mesajlaşıyorsun. Ne zaman yazacağını, ne göndereceğini söyle ve konuşmayı uygun bir kapanışla bitir.",
      partner: "kısa ve hızlı yazan bir arkadaş",
      opening: "Hey! Schreibst du mir heute Abend?",
      openingTr: "Selam! Bu akşam bana yazar mısın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-termin-machen",
    icon: "calendar",
    level: "A1",
    course: "de",
    title: "Einen Termin machen",
    titleTr: "Randevu almak",
    summary: "Randevu almayı, tarih önermeyi ve randevuyu ertelemeyi öğretir.",
    minutes: 9,
    focusId: "Temporal-am-um",
    vocab: [
      { de: "verschieben", tr: "ertelemek" },
      { de: "der Kalender", tr: "takvim" },
      { de: "das Datum", tr: "tarih" },
      { de: "die Uhrzeit", tr: "saat bilgisi" },
      { de: "nächste", tr: "gelecek, sonraki" },
    ],
    patterns: [
      { de: "Passt es am …?", tr: "bir günün uygun olup olmadığını sorar" },
      { de: "Können wir verschieben?", tr: "randevuyu ertelemek isterken kullanılır" },
      { de: "Der Termin ist um …", tr: "randevunun saatini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün randevu almayı öğreneceğiz: gün önermek, saati konuşmak ve gerekirse ertelemek. Gün için ayrı, saat için ayrı bir kelime kullanıldığını hatırlıyorsun; bugün onu işleteceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da neredeyse her şey randevuyla yürüyor: doktor, kurum, tamirci. Bu üç kalıp hepsinde işini görür. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("verschieben"),
          tr("Türkçesi 'ertelemek' demek. Lütfen"),
          de("verschieben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verschieben" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Kalender"),
          tr("Türkçesi 'takvim' demek. Lütfen"),
          de("der Kalender"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kalender" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Datum"),
          tr("Türkçesi 'tarih' demek. Lütfen"),
          de("das Datum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Datum" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Uhrzeit"),
          tr("Türkçesi 'saat bilgisi' demek — kaçta olduğu. Lütfen"),
          de("die Uhrzeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Uhrzeit" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("nächste"),
          tr("Türkçesi 'gelecek, sonraki' demek. Lütfen"),
          de("nächste"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nächste" },
      },
      {
        say: [
          tr("İlk kalıbımız gün önerir:"),
          de("Passt es am …?"),
          tr("'Falanca gün uyar mı?' demek. Günle birlikte kullanılan kelimeyi hatırla."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Pazartesi uyar mı?' Almancası:"),
          de("Passt es am Montag?"),
          tr("Lütfen"),
          de("Passt es am Montag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Passt es am Montag" },
      },
      {
        say: [tr("Sıra sende: 'Cuma uyar mı?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Passt es am Freitag",
          hint: [
            tr("Günlerle birlikte kullanılan kelimeyi koy:"),
            de("Passt es am Freitag?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız erteleme için:"),
          de("Können wir verschieben?"),
          tr("'Erteleyebilir miyiz?' demek. Lütfen"),
          de("Können wir verschieben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Können wir verschieben" },
      },
      {
        say: [
          tr("Son kalıbımız saati söyler:"),
          de("Der Termin ist um zehn Uhr."),
          tr("'Randevu saat onda' demek. Lütfen"),
          de("Der Termin ist um zehn Uhr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Termin ist um zehn Uhr" },
      },
      {
        say: [tr("Şimdi sen: 'Randevu gelecek hafta.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Termin ist nächste Woche",
          hint: [
            tr("Bu zaman ifadesinde ayrı bir edat gerekmez:"),
            de("Der Termin ist nächste Woche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Termin ist am zehn Uhr."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Termin ist am zehn Uhr.",
          answer: false,
          why: [
            tr("Saatlerle gün edatı kullanılmaz, saatin kendi edatı vardır. Doğrusu"),
            de("Der Termin ist um zehn Uhr."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık randevu alabilirsin. Şimdi bir muayenehaneyi arayıp randevu isteyeceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir muayenehaneyi aradın ve randevu almak istiyorsun. Uygun günü öner, saati konuş ve gerekirse randevuyu ertelemeyi iste.",
      partner: "takvimi dolu ama çözüm arayan bir sekreter",
      opening: "Praxis Dr. Wagner, guten Morgen. Möchten Sie einen Termin?",
      openingTr: "Dr. Wagner Muayenehanesi, günaydın. Randevu mu almak istiyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-einladung",
    icon: "party",
    level: "A1",
    course: "de",
    title: "Die Einladung",
    titleTr: "Davet etme",
    summary: "Birini davet etmeyi ve ne getireceğini söylemeyi öğretir.",
    minutes: 8,
    focusId: "Modalverb-möchten",
    vocab: [
      { de: "die Einladung", tr: "davet" },
      { de: "einladen", tr: "davet etmek" },
      { de: "mitbringen", tr: "yanında getirmek" },
      { de: "der Gast", tr: "misafir" },
      { de: "die Party", tr: "parti" },
    ],
    patterns: [
      { de: "Ich möchte dich einladen.", tr: "birini kibarca davet eder" },
      { de: "Kommst du zu …?", tr: "birini bir etkinliğe çağırır" },
      { de: "Bring bitte … mit.", tr: "ne getireceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün birini davet etmeyi öğreneceğiz. İki tane ikiye bölünen fiil daha var; kuralı biliyorsun, şimdi davet cümlelerinde çalıştıracağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da davet edilince ne getireceğini sormak alışılmış bir şey; ev sahibi de genellikle açıkça söyler. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Einladung"),
          tr("Türkçesi 'davet' demek. Lütfen"),
          de("die Einladung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Einladung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("einladen"),
          tr("Türkçesi 'davet etmek' demek. Lütfen"),
          de("einladen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einladen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("mitbringen"),
          tr("Türkçesi 'yanında getirmek' demek. Lütfen"),
          de("mitbringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mitbringen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Gast"),
          tr("Türkçesi 'misafir' demek. Lütfen"),
          de("der Gast"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Gast" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Party"),
          tr("Türkçesi 'parti' demek. Lütfen"),
          de("die Party"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Party" },
      },
      {
        say: [
          tr("İlk kalıbımız kibar bir davet:"),
          de("Ich möchte dich einladen."),
          tr(
            "'Seni davet etmek istiyorum' demek. Bu kalıpla kullanılan asıl fiil çekilmez ve cümlenin sonunda durur.",
          ),
        ],
      },
      {
        say: [
          tr("Lütfen"),
          de("Ich möchte dich einladen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte dich einladen" },
      },
      {
        say: [tr("Sıra sende: 'Seni partiye davet etmek istiyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte dich zur Party einladen",
          hint: [
            tr("Nereye davet ettiğin ortada kalır, asıl fiil en sonda:"),
            de("Ich möchte dich zur Party einladen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız daha günlük bir çağrı:"),
          de("Kommst du zu meiner Party?"),
          tr("'Partime geliyor musun?' demek. Lütfen"),
          de("Kommst du zu meiner Party"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Kommst du zu meiner Party" },
      },
      {
        say: [
          tr("Son kalıbımız ne getirileceğini söyler:"),
          de("Bring bitte einen Salat mit."),
          tr("'Lütfen bir salata getir' demek; ikiye bölünen fiil yine sonda. Lütfen"),
          de("Bring bitte einen Salat mit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bring bitte einen Salat mit" },
      },
      {
        say: [tr("Şimdi sen: 'Lütfen bir kek getir.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Bring bitte einen Kuchen mit",
          hint: [
            tr("Ne getireceği ortada, fiilin parçası en sonda:"),
            de("Bring bitte einen Kuchen mit."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich möchte dich zum Essen einladen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich möchte dich zum Essen einladen.",
          answer: true,
          why: [
            tr("Doğru. Çekimli fiil ikinci sırada, asıl fiil ise çekilmeden cümlenin sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık davet edebilirsin. Şimdi bir arkadaşını doğum günü partine çağıracaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir parti veriyorsun ve arkadaşını çağırıyorsun. Onu davet et, ne zaman olduğunu söyle ve ne getirmesini istediğini belirt.",
      partner: "davetlere bayılan, hemen soru soran bir arkadaş",
      opening: "Oh, eine Party? Wann ist die denn?",
      openingTr: "Aa, parti mi? Ne zamanmış?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-perfekt-haben",
    icon: "calendar",
    level: "A1",
    course: "de",
    title: "Was hast du gemacht?",
    titleTr: "Geçmiş zaman: haben ile",
    summary: "Geçmişte ne yaptığını anlatmayı öğretir; cümlenin ikiye bölündüğünü gösterir.",
    minutes: 9,
    focusId: "Perfekt-Einstieg",
    vocab: [
      { de: "gestern", tr: "dün" },
      { de: "gemacht", tr: "yapmak fiilinin geçmiş biçimi" },
      { de: "gekauft", tr: "almak fiilinin geçmiş biçimi" },
      { de: "gesehen", tr: "görmek fiilinin geçmiş biçimi" },
      { de: "gehört", tr: "duymak fiilinin geçmiş biçimi" },
    ],
    patterns: [
      { de: "Ich habe … gemacht.", tr: "geçmişte ne yaptığını söyler" },
      { de: "Ich habe … gekauft.", tr: "geçmişte ne aldığını söyler" },
      { de: "Hast du … gesehen?", tr: "birinin bir şeyi görüp görmediğini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün geçmiş zamana başlıyoruz ve bu, A1'in en büyük adımı. Türkçede geçmiş tek bir ekle kurulur: aldım, gördüm. Almancada ise cümle ikiye bölünür. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural şu: yardımcı fiil ikinci sıraya oturur, asıl fiilin geçmiş biçimi cümlenin en sonuna gider. Yani cümlenin başını ve sonunu birlikte kurman gerekiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("gestern"),
          tr("Türkçesi 'dün' demek. Lütfen"),
          de("gestern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gestern" },
      },
      {
        say: [
          tr("İkinci kelimemiz 'yapmak' fiilinin geçmiş biçimi:"),
          de("gemacht"),
          tr("Lütfen"),
          de("gemacht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gemacht" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz 'almak' fiilinin geçmiş biçimi:"),
          de("gekauft"),
          tr("Lütfen"),
          de("gekauft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gekauft" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz 'görmek' fiilinin geçmiş biçimi:"),
          de("gesehen"),
          tr("Lütfen"),
          de("gesehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gesehen" },
      },
      {
        say: [
          tr("Son kelimemiz 'duymak, dinlemek' fiilinin geçmiş biçimi:"),
          de("gehört"),
          tr("Lütfen"),
          de("gehört"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gehört" },
      },
      {
        say: [
          tr(
            "Fark ettin mi: dördü de aynı iki sesle başlıyor. Bu, geçmiş biçimin işaretidir; fiilin başına eklenir ve o hâliyle cümlenin sonuna gider.",
          ),
        ],
      },
      {
        say: [
          tr("İlk örneğimiz. 'Bir kitap aldım.' Almancası:"),
          de("Ich habe ein Buch gekauft."),
          tr("Yardımcı fiil ikinci sırada, geçmiş biçim en sonda. Lütfen"),
          de("Ich habe ein Buch gekauft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe ein Buch gekauft" },
      },
      {
        say: [tr("Sıra sende: 'Bir kahve aldım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe einen Kaffee gekauft",
          hint: [
            tr("Yardımcı fiil ikinci sırada kalır, geçmiş biçim en sona gider:"),
            de("Ich habe einen Kaffee gekauft."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi bir soru kuralım:"),
          de("Hast du das gehört?"),
          tr("'Bunu duydun mu?' demek. Soruda yardımcı fiil başa geçer ama geçmiş biçim yine sonda kalır. Lütfen"),
          de("Hast du das gehört"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hast du das gehört" },
      },
      {
        say: [tr("Şimdi sen: 'Dün müzik dinledim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Gestern habe ich Musik gehört",
          accept: ["Ich habe gestern Musik gehört"],
          hint: [
            tr("Zaman başa gelirse özne yardımcı fiilin arkasına geçer:"),
            de("Gestern habe ich Musik gehört."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe gestern gekauft ein Buch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe gestern gekauft ein Buch.",
          answer: false,
          why: [
            tr("Geçmiş biçim cümlenin en sonunda olmalı, ortasında değil. Doğrusu"),
            de("Ich habe gestern ein Buch gekauft."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık geçmişte ne yaptığını anlatabilirsin. Şimdi bir arkadaşın dünü soracak ve ona anlatacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın dün ne yaptığını soruyor. Ne aldığını, ne gördüğünü, ne dinlediğini anlat; her cümlede geçmiş biçimi sona koymayı unutma.",
      partner: "her ayrıntıyı merak eden bir arkadaş",
      opening: "Erzähl mal, was hast du gestern gemacht?",
      openingTr: "Anlatsana, dün ne yaptın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-perfekt-sein",
    icon: "city",
    level: "A1",
    course: "de",
    title: "Wohin bist du gegangen?",
    titleTr: "Geçmiş zaman: sein ile",
    summary: "Yer değiştirme bildiren fiillerin geçmişte başka bir yardımcı fiil aldığını öğretir.",
    minutes: 9,
    focusId: "Perfekt-Einstieg",
    vocab: [
      { de: "gegangen", tr: "gitmek fiilinin geçmiş biçimi" },
      { de: "gefahren", tr: "araçla gitmek fiilinin geçmiş biçimi" },
      { de: "geblieben", tr: "kalmak fiilinin geçmiş biçimi" },
      { de: "gekommen", tr: "gelmek fiilinin geçmiş biçimi" },
      { de: "wohin", tr: "nereye" },
    ],
    patterns: [
      { de: "Ich bin … gegangen.", tr: "bir yere gittiğini söyler" },
      { de: "Wohin bist du gefahren?", tr: "birinin nereye gittiğini sorar" },
      { de: "Ich bin zu Hause geblieben.", tr: "bir yerde kaldığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Geçen derste geçmiş zamanı kurduk. Bugün küçük ama önemli bir istisna var: bazı fiiller başka bir yardımcı fiil alıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Ayrım şu: bir yerden bir yere gitmeyi anlatan fiiller ve durum değişikliği bildirenler ayrı bir yardımcı fiil alır. Gerisi eskisi gibi. Bu küme küçük ama en sık kullandığın fiiller onun içinde. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz 'gitmek' fiilinin geçmiş biçimi:"),
          de("gegangen"),
          tr("Lütfen"),
          de("gegangen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gegangen" },
      },
      {
        say: [
          tr("İkinci kelimemiz 'araçla gitmek' fiilinin geçmiş biçimi:"),
          de("gefahren"),
          tr("Lütfen"),
          de("gefahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gefahren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz 'kalmak' fiilinin geçmiş biçimi:"),
          de("geblieben"),
          tr("Lütfen"),
          de("geblieben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geblieben" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz 'gelmek' fiilinin geçmiş biçimi:"),
          de("gekommen"),
          tr("Lütfen"),
          de("gekommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gekommen" },
      },
      {
        say: [
          tr("Son kelimemiz bir soru kelimesi:"),
          de("wohin"),
          tr("Türkçesi 'nereye' demek. Lütfen"),
          de("wohin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wohin" },
      },
      {
        say: [
          tr(
            "Şimdi kural. Bu fiillerde yardımcı fiil değişiyor: 'sahip olmak' yerine 'olmak' fiili kullanılıyor. Cümlenin yapısı aynı kalıyor — yardımcı fiil ikinci sırada, geçmiş biçim en sonda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sinemaya gittim.' Almancası:"),
          de("Ich bin ins Kino gegangen."),
          tr("Lütfen"),
          de("Ich bin ins Kino gegangen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bin ins Kino gegangen" },
      },
      {
        say: [tr("Sıra sende: 'Berlin'e gittim, arabayla.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bin nach Berlin gefahren",
          hint: [
            tr("Yer değiştirme var, o yüzden yardımcı fiil değişiyor:"),
            de("Ich bin nach Berlin gefahren."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi soru kuralım:"),
          de("Wohin bist du gefahren?"),
          tr("'Nereye gittin?' demek. Lütfen"),
          de("Wohin bist du gefahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wohin bist du gefahren" },
      },
      {
        say: [tr("Şimdi sen: 'Evde kaldım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bin zu Hause geblieben",
          hint: [
            tr("Kalmak da bu kümeye girer, yani aynı yardımcı fiili alır:"),
            de("Ich bin zu Hause geblieben."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Meine Freunde sind gekommen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Meine Freunde sind gekommen.",
          answer: true,
          why: [
            tr("Doğru. Gelmek de yer değiştirme bildirir, o yüzden bu yardımcı fiili alır ve geçmiş biçim sonda durur."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık nereye gittiğini de anlatabilirsin. Şimdi bir arkadaşın hafta sonu nereye gittiğini soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın hafta sonu nereye gittiğini soruyor. Nereye gittiğini, nasıl gittiğini ve bir gün evde kalıp kalmadığını anlat.",
      partner: "gezmeyi seven, sürekli yer öneren bir arkadaş",
      opening: "Wohin bist du am Wochenende gefahren?",
      openingTr: "Hafta sonu nereye gittin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-gestern",
    icon: "feelings",
    level: "A1",
    course: "de",
    title: "Gestern war ein guter Tag",
    titleTr: "Dünü anlatma",
    summary: "Dünü baştan sona sırayla anlatmayı öğretir; iki yardımcı fiili bir arada çalıştırır.",
    minutes: 9,
    focusId: "Perfekt-Einstieg",
    vocab: [
      { de: "aufgestanden", tr: "kalkmak fiilinin geçmiş biçimi" },
      { de: "gegessen", tr: "yemek fiilinin geçmiş biçimi" },
      { de: "getrunken", tr: "içmek fiilinin geçmiş biçimi" },
      { de: "geschlafen", tr: "uyumak fiilinin geçmiş biçimi" },
      { de: "vorgestern", tr: "evvelki gün" },
    ],
    patterns: [
      { de: "Zuerst habe ich …", tr: "önce ne yaptığını söyler" },
      { de: "Dann bin ich …", tr: "sonra nereye gittiğini söyler" },
      { de: "Am Abend …", tr: "akşam ne yaptığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün dünü baştan sona anlatmayı öğreneceğiz. İki yardımcı fiili bir arada kullanacağız — hangisinin ne zaman geldiğini artık biliyorsun. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir günü anlatmak, öğrendiğin her şeyi bir araya getiren en iyi alıştırma: sıralama kelimeleri, saatler ve geçmiş zaman. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz 'kalkmak' fiilinin geçmiş biçimi:"),
          de("aufgestanden"),
          tr("Lütfen"),
          de("aufgestanden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufgestanden" },
      },
      {
        say: [
          tr("İkinci kelimemiz 'yemek' fiilinin geçmiş biçimi:"),
          de("gegessen"),
          tr("Lütfen"),
          de("gegessen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gegessen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz 'içmek' fiilinin geçmiş biçimi:"),
          de("getrunken"),
          tr("Lütfen"),
          de("getrunken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "getrunken" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz 'uyumak' fiilinin geçmiş biçimi:"),
          de("geschlafen"),
          tr("Lütfen"),
          de("geschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geschlafen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("vorgestern"),
          tr("Türkçesi 'evvelki gün' demek. Lütfen"),
          de("vorgestern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorgestern" },
      },
      {
        say: [
          tr(
            "Sıralama kelimeleri cümlenin başına gelir ve yardımcı fiil hemen arkasından. Yani hem sıralama kuralı hem geçmiş zaman aynı cümlede çalışıyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Önce kalktım.' Almancası:"),
          de("Zuerst bin ich aufgestanden."),
          tr("Kalkmak yer değiştirme bildirdiği için o yardımcı fiili aldı. Lütfen"),
          de("Zuerst bin ich aufgestanden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Zuerst bin ich aufgestanden" },
      },
      {
        say: [tr("Sıra sende: 'Sonra bir kahve içtim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Dann habe ich einen Kaffee getrunken",
          hint: [
            tr("İçmek yer değiştirme bildirmez, o yüzden diğer yardımcı fiili alır:"),
            de("Dann habe ich einen Kaffee getrunken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Akşamı anlatalım:"),
          de("Am Abend habe ich gut geschlafen."),
          tr("'Akşam iyi uyudum' demek. Lütfen"),
          de("Am Abend habe ich gut geschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Abend habe ich gut geschlafen" },
      },
      {
        say: [tr("Şimdi sen: 'Akşam pizza yedim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Abend habe ich Pizza gegessen",
          hint: [
            tr("Zaman başta, yardımcı fiil ikinci sırada, geçmiş biçim en sonda:"),
            de("Am Abend habe ich Pizza gegessen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Zuerst ich bin aufgestanden."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Zuerst ich bin aufgestanden.",
          answer: false,
          why: [
            tr("Sıralama kelimesi başta olduğu için özne yardımcı fiilin arkasına geçmeli. Doğrusu"),
            de("Zuerst bin ich aufgestanden."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir günü baştan sona anlatabilirsin. Şimdi bir arkadaşınla dünü konuşacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla dünü konuşuyorsunuz. Gününü sırayla anlat: önce ne yaptın, sonra nereye gittin, akşam ne oldu.",
      partner: "kendi gününü de anlatmak isteyen bir arkadaş",
      opening: "Wie war dein Tag gestern? Was hast du zuerst gemacht?",
      openingTr: "Peki dünkü günün nasıldı? Önce ne yaptın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-wochenende-bericht",
    icon: "party",
    level: "A1",
    course: "de",
    title: "Mein Wochenende",
    titleTr: "Hafta sonu raporu",
    summary: "Hafta sonunu anlatmayı ve nasıl geçtiğini değerlendirmeyi öğretir.",
    minutes: 9,
    focusId: "Perfekt-Einstieg",
    vocab: [
      { de: "besucht", tr: "ziyaret etmek fiilinin geçmiş biçimi" },
      { de: "getroffen", tr: "buluşmak fiilinin geçmiş biçimi" },
      { de: "war", tr: "idi, oldu" },
      { de: "die Reise", tr: "yolculuk" },
      { de: "toll", tr: "harika" },
    ],
    patterns: [
      { de: "Am Samstag habe ich …", tr: "hangi gün ne yaptığını söyler" },
      { de: "Wir sind … gefahren.", tr: "birlikte nereye gittiğinizi söyler" },
      { de: "Es war schön.", tr: "nasıl geçtiğini değerlendirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün hafta sonunu anlatmayı öğreneceğiz. Bir de çok işine yarayacak kısa bir kelime var: geçmişte bir şeyin nasıl olduğunu söyleyen kelime. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Pazartesi sabahı herkesin birbirine sorduğu şey bu. Cevabı hazır olsun. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz 'ziyaret etmek' fiilinin geçmiş biçimi:"),
          de("besucht"),
          tr("Lütfen"),
          de("besucht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "besucht" },
      },
      {
        say: [
          tr("İkinci kelimemiz 'buluşmak' fiilinin geçmiş biçimi:"),
          de("getroffen"),
          tr("Lütfen"),
          de("getroffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "getroffen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("war"),
          tr("Türkçesi 'idi, oldu' demek — 'güzeldi' derkenki geçmiş. Lütfen"),
          de("war"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "war" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Reise"),
          tr("Türkçesi 'yolculuk' demek. Lütfen"),
          de("die Reise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Reise" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("toll"),
          tr("Türkçesi 'harika' demek. Lütfen"),
          de("toll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "toll" },
      },
      {
        say: [
          tr(
            "Küçük bir kolaylık: 'olmak' fiilinin geçmişi iki parçaya bölünmez, tek kelimeyle söylenir. Değerlendirme cümlelerinde hep onu kullanacaksın.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız. 'Cumartesi arkadaşlarımla buluştum.' Almancası:"),
          de("Am Samstag habe ich Freunde getroffen."),
          tr("Lütfen"),
          de("Am Samstag habe ich Freunde getroffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Samstag habe ich Freunde getroffen" },
      },
      {
        say: [tr("Sıra sende: 'Pazar günü aileme gittim, yani onları ziyaret ettim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Sonntag habe ich meine Familie besucht",
          hint: [
            tr("Gün başta, yardımcı fiil ikinci sırada, geçmiş biçim en sonda:"),
            de("Am Sonntag habe ich meine Familie besucht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız birlikte gidilen yeri söyler:"),
          de("Wir sind nach Hamburg gefahren."),
          tr("'Hamburg'a gittik' demek. Lütfen"),
          de("Wir sind nach Hamburg gefahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir sind nach Hamburg gefahren" },
      },
      {
        say: [
          tr("Son kalıbımız değerlendirme:"),
          de("Es war schön."),
          tr("'Güzeldi' demek. Lütfen"),
          de("Es war schön"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es war schön" },
      },
      {
        say: [tr("Şimdi sen: 'Yolculuk harikaydı.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Die Reise war toll",
          hint: [
            tr("Önce yolculuk, sonra geçmiş biçim, sonra değerlendirme:"),
            de("Die Reise war toll."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es war ein tolles Wochenende."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es war ein tolles Wochenende.",
          answer: true,
          why: [
            tr("Doğru. Geçmişte bir şeyin nasıl olduğu bu tek kelimeyle söylenir ve cümle ikiye bölünmez."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hafta sonunu anlatabilirsin. Şimdi pazartesi sabahı bir iş arkadaşın soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Pazartesi sabahı bir iş arkadaşın hafta sonunu soruyor. Hangi gün ne yaptığını anlat, nereye gittiğinizi söyle ve nasıl geçtiğini değerlendir.",
      partner: "pazartesi sabahı sohbete ihtiyacı olan bir iş arkadaşı",
      opening: "Guten Morgen! Wie war dein Wochenende?",
      openingTr: "Günaydın! Hafta sonun nasıl geçti?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-jahreszeiten",
    icon: "snow",
    level: "A1",
    course: "de",
    title: "Die Jahreszeiten",
    titleTr: "Mevsimler ve tarih",
    summary: "Mevsimleri ve bir tarihi söylemeyi öğretir.",
    minutes: 8,
    focusId: "Ordinalzahlen-Datum",
    vocab: [
      { de: "der Sommer", tr: "yaz" },
      { de: "der Winter", tr: "kış" },
      { de: "der Frühling", tr: "ilkbahar" },
      { de: "der Herbst", tr: "sonbahar" },
      { de: "der Mai", tr: "mayıs" },
    ],
    patterns: [
      { de: "im Sommer", tr: "hangi mevsimde olduğunu söyler" },
      { de: "am ersten Mai", tr: "bir tarihi söyler" },
      { de: "Mein Geburtstag ist am …", tr: "doğum gününü söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün mevsimleri ve tarih söylemeyi öğreneceğiz. Tarihte Türkçeden farklı bir şey var: gün sayısı sıra sayısına dönüşüyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Doğum günü, randevu, tatil — tarih söylemek her yerde lazım. Önce mevsimleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Sommer"),
          tr("Türkçesi 'yaz' demek. Lütfen"),
          de("der Sommer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sommer" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Winter"),
          tr("Türkçesi 'kış' demek. Lütfen"),
          de("der Winter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Winter" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Frühling"),
          tr("Türkçesi 'ilkbahar' demek. Lütfen"),
          de("der Frühling"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Frühling" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Herbst"),
          tr("Türkçesi 'sonbahar' demek. Lütfen"),
          de("der Herbst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Herbst" },
      },
      {
        say: [
          tr("Son kelimemiz bir ay adı:"),
          de("der Mai"),
          tr("Türkçesi 'mayıs' demek. Lütfen"),
          de("der Mai"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mai" },
      },
      {
        say: [
          tr("İlk kalıbımız mevsim için:"),
          de("im Sommer"),
          tr("'Yazın' demek. Mevsimlerle ve aylarla hep bu kısa biçim kullanılır."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yazın hava sıcak olur.' Almancası:"),
          de("Im Sommer ist es warm."),
          tr("Lütfen"),
          de("Im Sommer ist es warm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Im Sommer ist es warm" },
      },
      {
        say: [tr("Sıra sende: 'Kışın hava soğuk olur.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Im Winter ist es kalt",
          hint: [
            tr("Mevsim başta, fiil hemen arkasında:"),
            de("Im Winter ist es kalt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr(
            "Şimdi tarih. Türkçede 'bir mayıs' dersin, sayıyı olduğu gibi söylersin. Almancada ise gün sayısı sıra sayısına dönüşür: birinci, ikinci, üçüncü. Ayrıca gün için kullandığımız edat başa gelir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Doğum günüm bir mayısta.' Almancası:"),
          de("Mein Geburtstag ist am ersten Mai."),
          tr("Lütfen"),
          de("Mein Geburtstag ist am ersten Mai"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mein Geburtstag ist am ersten Mai" },
      },
      {
        say: [tr("Şimdi sen: 'Doğum günüm üç haziranda.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Geburtstag ist am dritten Juni",
          hint: [
            tr("Gün sayısı sıra sayısına dönüşür:"),
            de("Mein Geburtstag ist am dritten Juni."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Mein Geburtstag ist in ersten Mai."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Mein Geburtstag ist in ersten Mai.",
          answer: false,
          why: [
            tr("Tarihte günlerle kullandığımız edat gelir, mevsim edatı değil. Doğrusu"),
            de("Mein Geburtstag ist am ersten Mai."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık mevsimleri ve tarihleri söyleyebilirsin. Şimdi yeni bir tanıdığınla doğum günlerinizi konuşacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni tanıştığın biriyle mevsimleri ve doğum günlerinizi konuşuyorsunuz. Hangi mevsimi sevdiğini söyle ve doğum gününün tarihini ver.",
      partner: "yazı çok seven, konuşkan bir tanıdık",
      opening: "Welche Jahreszeit magst du am liebsten?",
      openingTr: "En çok hangi mevsimi seversin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-a1-rueckblick",
    icon: "star",
    level: "A1",
    course: "de",
    title: "Mein Deutsch-Start",
    titleTr: "A1 kapanışı",
    summary: "Neler öğrendiğini ve sırada ne olduğunu anlatmayı öğretir.",
    minutes: 9,
    focusId: "Perfekt-Einstieg",
    vocab: [
      { de: "gelernt", tr: "öğrenmek fiilinin geçmiş biçimi" },
      { de: "jetzt", tr: "artık, şimdi" },
      { de: "stolz", tr: "gururlu" },
      { de: "weiter", tr: "devam, ileri" },
      { de: "der Anfang", tr: "başlangıç" },
    ],
    patterns: [
      { de: "Ich habe … gelernt.", tr: "neler öğrendiğini söyler" },
      { de: "Ich kann jetzt …", tr: "artık ne yapabildiğini söyler" },
      { de: "Als Nächstes möchte ich …", tr: "sırada ne olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bu A1'in son dersi. Bugün yeni bir kural yok; öğrendiklerini anlatmayı öğreneceğiz. Geçmiş zamanı kendi hikâyen için kullanacaksın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir dili öğrenirken en çok unutulan şey ne kadar yol alındığı. Bu ders tam olarak onu söylemek için. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz 'öğrenmek' fiilinin geçmiş biçimi:"),
          de("gelernt"),
          tr("Lütfen"),
          de("gelernt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gelernt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("jetzt"),
          tr("Türkçesi 'artık, şimdi' demek. Lütfen"),
          de("jetzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jetzt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("stolz"),
          tr("Türkçesi 'gururlu' demek. Lütfen"),
          de("stolz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stolz" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("weiter"),
          tr("Türkçesi 'devam, ileri' demek. Lütfen"),
          de("weiter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weiter" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Anfang"),
          tr("Türkçesi 'başlangıç' demek. Lütfen"),
          de("der Anfang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anfang" },
      },
      {
        say: [
          tr("İlk kalıbımız geçmiş zamanla kuruluyor:"),
          de("Ich habe … gelernt."),
          tr("'Şunu öğrendim' demek. Yapıyı biliyorsun: geçmiş biçim en sonda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Çok şey öğrendim.' Almancası:"),
          de("Ich habe viel gelernt."),
          tr("Lütfen"),
          de("Ich habe viel gelernt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe viel gelernt" },
      },
      {
        say: [tr("Sıra sende: 'Almanca öğrendim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe Deutsch gelernt",
          hint: [
            tr("Ne öğrendiğin ortada, geçmiş biçim en sonda:"),
            de("Ich habe Deutsch gelernt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bugünü anlatır:"),
          de("Ich kann jetzt Deutsch sprechen."),
          tr("'Artık Almanca konuşabiliyorum' demek. Lütfen"),
          de("Ich kann jetzt Deutsch sprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich kann jetzt Deutsch sprechen" },
      },
      {
        say: [
          tr("Son kalıbımız ileriye bakar:"),
          de("Als Nächstes möchte ich weitermachen."),
          tr("'Sırada devam etmek var' demek. Lütfen"),
          de("Als Nächstes möchte ich weitermachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Als Nächstes möchte ich weitermachen" },
      },
      {
        say: [tr("Şimdi sen: 'Bu bir başlangıçtı.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Das war ein Anfang",
          hint: [
            tr("Geçmişte bir şeyin ne olduğunu tek kelimeyle söylüyorduk:"),
            de("Das war ein Anfang."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe im Kurs viel gelernt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe im Kurs viel gelernt.",
          answer: true,
          why: [
            tr("Doğru. Yardımcı fiil ikinci sırada, geçmiş biçim cümlenin en sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "A1'i bitirdin. Şimdi son bir konuşma: biri sana Almancanın nasıl gittiğini soracak ve ona kendi cümlelerinle anlatacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir tanıdığın Almancanın nasıl gittiğini soruyor. Neler öğrendiğini geçmiş zamanla anlat, artık neler yapabildiğini söyle ve sırada ne olduğunu belirt.",
      partner: "seninle gurur duyan, cesaretlendiren bir tanıdık",
      opening: "Und, wie läuft es mit deinem Deutsch?",
      openingTr: "Ee, Almancan nasıl gidiyor?",
      minTurns: 4,
    },
  },
];

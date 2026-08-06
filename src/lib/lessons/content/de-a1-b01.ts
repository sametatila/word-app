import { de, tr, type Lesson } from "../types";

/**
 * A1 · Parti 1 — konular 001-010 (Modül 1: Tanışma ve ben).
 *
 * Modülün mantığı sırayla kuruluyor: önce kendini tanıtmak, sonra hâl hatır,
 * sonra kime senli kime kibar hitap edileceği, sonra soru sormanın iki biçimi
 * (soru kelimeli ve fiil başta), en sonda da bu bilgilerin toplandığı yer olan
 * kayıt formu. Sayılar ve harfleme araya bilinçli olarak giriyor: yaş, adres ve
 * telefon numarası onlar olmadan söylenemiyor.
 */
export const deA1B01: Lesson[] = [
  {
    id: "de-a1-hallo",
    icon: "greet",
    level: "A1",
    course: "de",
    title: "Hallo!",
    titleTr: "Tanışma",
    summary: "Adını, nereli olduğunu ve nerede oturduğunu söylemeyi öğretir.",
    minutes: 8,
    focusId: "Vorstellung",
    vocab: [
      { de: "hallo", tr: "merhaba" },
      { de: "heißen", tr: "adı … olmak" },
      { de: "kommen", tr: "gelmek" },
      { de: "wohnen", tr: "oturmak" },
      { de: "der Name", tr: "isim" },
    ],
    patterns: [
      { de: "Ich heiße …", tr: "adını söylerken kullanılır" },
      { de: "Ich komme aus …", tr: "nereli olduğunu söylerken kullanılır" },
      { de: "Ich wohne in …", tr: "nerede oturduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün kendimizi tanıtmayı öğreneceğiz. Üç kalıp işleyeceğiz: adını söylemek, nereli olduğunu söylemek ve nerede oturduğunu söylemek. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu üç kalıpla ilk tanışma konuşmanı yapabileceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("hallo"),
          tr("Türkçesi 'merhaba' demek. Lütfen"),
          de("hallo"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hallo" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("heißen"),
          tr("Türkçesi 'adı bir şey olmak' demek. Lütfen"),
          de("heißen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "heißen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("kommen"),
          tr("Türkçesi 'gelmek' demek. Lütfen"),
          de("kommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kommen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("wohnen"),
          tr("Türkçesi 'oturmak, yaşamak' demek. Lütfen"),
          de("wohnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wohnen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Name"),
          tr("Türkçesi 'isim' demek. Lütfen"),
          de("der Name"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Name" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Ich heiße …"),
          tr("Adını söylerken kullanılır, yani 'Benim adım …' demek."),
        ],
      },
      {
        say: [
          tr("Örnek bir cümle: 'Benim adım Anna.' Almancası:"),
          de("Ich heiße Anna."),
          tr("Lütfen"),
          de("Ich heiße Anna"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich heiße Anna" },
      },
      {
        say: [
          tr(
            "Şimdi sıra sende: 'Benim adım Ali.' demek için hangi Almanca cümleyi kullanırsın? Lütfen söyle.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich heiße Ali",
          hint: [
            tr("Kalıbımız"),
            de("Ich heiße …"),
            tr("idi. Adı kalıbın sonuna ekle:"),
            de("Ich heiße Ali."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich komme aus …"),
          tr("Nereli olduğunu söyler: 'Ben …'dan geliyorum' demek."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ben Türkiye'den geliyorum.' Almancası:"),
          de("Ich komme aus der Türkei."),
          tr("Lütfen"),
          de("Ich komme aus der Türkei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich komme aus der Türkei" },
      },
      {
        say: [
          tr(
            "Peki 'Ben İstanbul'dan geliyorum.' demek için hangi cümleyi kullanırsın? Küçük bir bilgi: şehir adlarının önüne artikel gelmez.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich komme aus Istanbul",
          hint: [
            tr("Şehir adlarının önüne artikel gelmez, kalıp yeterli:"),
            de("Ich komme aus Istanbul."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız:"),
          de("Ich wohne in …"),
          tr("Nerede oturduğunu söyler: '… şehrinde oturuyorum' demek."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Berlin'de oturuyorum.' Almancası:"),
          de("Ich wohne in Berlin."),
          tr("Lütfen"),
          de("Ich wohne in Berlin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wohne in Berlin" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich heiße aus Ankara."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich heiße aus Ankara.",
          answer: false,
          why: [
            de("heißen"),
            tr("yalnızca ad söylemek içindir. Nereli olduğunu söylemek için"),
            de("Ich komme aus Ankara."),
            tr("denir."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bugün kendini tanıtmayı öğrendin. Şimdi öğrendiklerini gerçek bir konuşmada kullanma zamanı: yeni bir komşunla tanışacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Apartmanına yeni taşındın ve merdivende bir komşunla karşılaştın. Kendini tanıt: adını, nereli olduğunu ve nerede oturduğunu söyle.",
      partner: "meraklı ama kibar bir komşu",
      opening: "Hallo! Sie sind neu hier, oder? Wie heißen Sie?",
      openingTr: "Merhaba! Buraya yeni taşındınız, değil mi? Adınız ne?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-wie-gehts",
    icon: "greet",
    level: "A1",
    course: "de",
    title: "Wie geht's?",
    titleTr: "Hal hatır sorma",
    summary:
      "Birine nasıl olduğunu sormayı, kendi hâlini söylemeyi ve soruyu geri sormayı öğretir.",
    minutes: 8,
    focusId: "Vorstellung",
    vocab: [
      { de: "gehen", tr: "gitmek" },
      { de: "gut", tr: "iyi" },
      { de: "schlecht", tr: "kötü" },
      { de: "müde", tr: "yorgun" },
      { de: "danke", tr: "teşekkürler" },
    ],
    patterns: [
      { de: "Wie geht es dir?", tr: "bir arkadaşına nasıl olduğunu sorar" },
      { de: "Mir geht es gut.", tr: "kendi hâlini söylerken kullanılır" },
      { de: "Und dir?", tr: "aynı soruyu karşıya geri sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün hâl hatır sormayı öğreneceğiz: birine nasıl olduğunu sormak, kendi hâlini söylemek ve soruyu ona geri sormak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu üç cümle merhabadan hemen sonra gelir ve cevabın kısa olması yeter. Bir tuhaflığı var: Almanlar hâl sorarken 'gitmek' fiilini kullanır. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("gehen"),
          tr("Türkçesi 'gitmek' demek; hâl sorarken de bu fiil kullanılır. Lütfen"),
          de("gehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gehen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("gut"),
          tr("Türkçesi 'iyi' demek. Lütfen"),
          de("gut"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gut" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("schlecht"),
          tr("Türkçesi 'kötü' demek. Lütfen"),
          de("schlecht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schlecht" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("müde"),
          tr("Türkçesi 'yorgun' demek. Lütfen"),
          de("müde"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "müde" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("danke"),
          tr("Türkçesi 'teşekkürler' demek. Lütfen"),
          de("danke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "danke" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Wie geht es dir?"),
          tr(
            "Kelime kelime 'sana nasıl gidiyor' demek, ama anlamı 'Nasılsın?' Arkadaşına böyle sorarsın.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie geht es dir"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie geht es dir" },
      },
      {
        say: [
          tr("İkinci kalıbımız cevap:"),
          de("Mir geht es gut."),
          tr(
            "Yani 'İyiyim.' Türkçede cümleye 'ben' ile başlarsın; Almancada 'bana' ile başlıyor, çünkü fiil hâlâ o 'gitmek' fiili.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mir geht es gut"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mir geht es gut" },
      },
      {
        say: [tr("Sıra sende: 'Kötüyüm.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Mir geht es schlecht",
          hint: [
            tr("Kalıbın tamamı aynı kalır, yalnızca son kelime değişir:"),
            de("Mir geht es schlecht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir şeye dikkat: 'Yorgunum.' derken bu kalıp kullanılmaz."),
          de("Ich bin müde."),
          tr(
            "denir. Bu kalıp işlerin nasıl gittiğini anlatır; yorgunluk ise senin durumun, o yüzden 'olmak' fiiliyle söylenir.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin müde"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin müde" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız iki kelime:"),
          de("Und dir?"),
          tr(
            "Yani 'Ya sen?' Cevabını verdikten sonra soruyu geri sormak Almanya'da nezaketin ta kendisi.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Und dir"), tr("deyin.")],
        expect: { kind: "repeat", target: "Und dir" },
      },
      {
        say: [
          tr(
            "Şimdi tek nefeste birleştir: 'Teşekkürler, iyiyim. Ya sen?' nasıl dersin?",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Danke, gut. Und dir?",
          accept: ["Danke, mir geht es gut. Und dir?"],
          hint: [
            tr("Günlük konuşmada kısa cevap yeter, sonra soruyu geri sor:"),
            de("Danke, gut. Und dir?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es geht mir gut."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es geht mir gut.",
          answer: true,
          why: [
            tr("Doğru. Cümle"),
            de("Mir"),
            tr("ile de başlayabilir,"),
            de("Es"),
            tr("ile de; ikisi de doğru Almanca ve ikisi de aynı anlama gelir."),
          ],
        },
      },
      {
        say: [
          tr(
            "Çok iyi gidiyorsun. Artık hâl hatır sorup cevap verebilirsin. Şimdi işe geldin ve kapıda bir iş arkadaşınla karşılaşıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş yerinin kapısında bir iş arkadaşınla karşılaştın. Ona nasıl olduğunu sor, kendi hâlini söyle ve soruyu mutlaka ona geri sor.",
      partner: "neşeli ve konuşkan bir iş arkadaşı",
      opening: "Guten Morgen! Wie geht es dir heute?",
      openingTr: "Günaydın! Bugün nasılsın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-du-oder-sie",
    icon: "greet",
    level: "A1",
    course: "de",
    title: "Du oder Sie?",
    titleTr: "Sen mi siz mi",
    summary:
      "Kime senli benli, kime kibar hitap edileceğini ve fiilin buna göre nasıl değiştiğini öğretir.",
    minutes: 8,
    focusId: "Konjugation-Präsens",
    vocab: [
      { de: "du", tr: "sen" },
      { de: "Sie", tr: "siz" },
      { de: "der Chef", tr: "patron" },
      { de: "die Kollegin", tr: "iş arkadaşı" },
      { de: "höflich", tr: "kibar" },
    ],
    patterns: [
      { de: "Wie heißt du?", tr: "arkadaşına adını sorar" },
      { de: "Wie heißen Sie?", tr: "tanımadığın birine kibarca adını sorar" },
      { de: "Sind Sie …?", tr: "kibarca 'siz … misiniz' diye sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün Almancanın en çok kafa karıştıran ayrımını çözeceğiz: kime senli benli, kime kibar hitap edilir. İki soru kalıbı ve tek bir kural. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'sen' ve 'siz' var, Almancada da öyle. Fark şurada: Almancada kibar biçime geçince fiilin sonu da değişir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("du"),
          tr("Türkçesi 'sen' demek. Lütfen"),
          de("du"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "du" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("Sie"),
          tr("Türkçesi 'siz' demek ve her zaman büyük harfle yazılır. Lütfen"),
          de("Sie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Sie" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Chef"),
          tr("Türkçesi 'patron' demek. Lütfen"),
          de("der Chef"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Chef" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Kollegin"),
          tr("Türkçesi 'iş arkadaşı' demek; bu biçim kadın iş arkadaşı için kullanılır. Lütfen"),
          de("die Kollegin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kollegin" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("höflich"),
          tr("Türkçesi 'kibar' demek. Lütfen"),
          de("höflich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "höflich" },
      },
      {
        say: [
          tr("Şimdi kural. Arkadaşına, ailene ve çocuklara"),
          de("du"),
          tr("dersin. Tanımadığın bir yetişkine, patronuna ve bütün resmî yerlerde"),
          de("Sie"),
          tr("dersin. Kararsız kaldığında kibar olanı seç; kimse buna gücenmez."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız arkadaş için:"),
          de("Wie heißt du?"),
          tr("Yani 'Adın ne?'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie heißt du"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie heißt du" },
      },
      {
        say: [
          tr("Aynı soru kibar biçimde:"),
          de("Wie heißen Sie?"),
          tr("Fiil de değişti:"),
          de("heißt"),
          tr("yerine"),
          de("heißen"),
          tr(
            "dedik. Kibar biçimde fiil neredeyse hep mastar hâlinde kalır; tek önemli istisna 'olmak' fiili, onu birazdan göreceksin.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie heißen Sie"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie heißen Sie" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız aynı ayrımı 'olmak' fiilinde gösteriyor:"),
          de("Sind Sie …?"),
          tr("Yani kibarca 'Siz … misiniz?'"),
        ],
      },
      {
        say: [
          tr("Örnek: 'Siz Meyer Bey misiniz?' Almancası:"),
          de("Sind Sie Herr Meyer?"),
          tr("Lütfen"),
          de("Sind Sie Herr Meyer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Sind Sie Herr Meyer" },
      },
      {
        say: [tr("Şimdi aynı soruyu arkadaşına sor: 'Sen Ali misin?'")],
        expect: {
          kind: "produce",
          target: "Bist du Ali",
          hint: [
            tr("Senli biçimde bu fiil"),
            de("bist"),
            tr("olur:"),
            de("Bist du Ali?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir tane daha, bu sefer kibar biçimde: 'Nerede oturuyorsunuz?'"),
        ],
        expect: {
          kind: "produce",
          target: "Wo wohnen Sie",
          hint: [
            tr("Kibar biçimde fiil mastar gibi kalır:"),
            de("Wo wohnen Sie?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wie heißen du?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wie heißen du?",
          answer: false,
          why: [
            tr("Yanlış. Senli biçimde fiilin sonu değişir:"),
            de("heißt"),
            tr("olmalı. Doğrusu:"),
            de("Wie heißt du?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kime nasıl hitap edeceğini biliyorsun. Şimdi ilk iş günündesin ve yeni patronunla tanışacaksın: kibar biçimi kullan.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İlk iş günündesin ve yeni patronunla tanışıyorsun. Baştan sona kibar biçimi kullan: adını sor, kendini tanıt ve nerede oturduğunu söyle.",
      partner: "ciddi ama sıcak davranan bir patron",
      opening: "Guten Tag! Sind Sie neu hier im Team?",
      openingTr: "İyi günler! Ekibe yeni misiniz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-woher",
    icon: "culture",
    level: "A1",
    course: "de",
    title: "Woher kommst du?",
    titleTr: "Nerelisin",
    summary:
      "Soru kelimeleriyle nereli olduğunu, nerede oturduğunu ve bir şeyin ne olduğunu sormayı öğretir.",
    minutes: 8,
    focusId: "W-Fragen",
    vocab: [
      { de: "woher", tr: "nereden" },
      { de: "wo", tr: "nerede" },
      { de: "was", tr: "ne" },
      { de: "das Land", tr: "ülke" },
      { de: "die Stadt", tr: "şehir" },
    ],
    patterns: [
      { de: "Woher kommst du?", tr: "birinin nereli olduğunu sorar" },
      { de: "Wo wohnst du?", tr: "birinin nerede oturduğunu sorar" },
      { de: "Was ist das?", tr: "bir şeyin ne olduğunu sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün soru sormayı öğreneceğiz: nereden, nerede ve ne. Bu üç kelimeyle karşındakini konuşturabilirsin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede soru cümlenin sonunda biter: 'Nerelisin?' Almancada tam tersi, soru kelimesi en başta durur ve hemen arkasından fiil gelir. Bu sıra hiç bozulmaz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("woher"),
          tr("Türkçesi 'nereden' demek. Lütfen"),
          de("woher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "woher" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("wo"),
          tr("Türkçesi 'nerede' demek. Lütfen"),
          de("wo"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wo" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("was"),
          tr("Türkçesi 'ne' demek. Lütfen"),
          de("was"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "was" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Land"),
          tr("Türkçesi 'ülke' demek. Lütfen"),
          de("das Land"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Land" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Stadt"),
          tr("Türkçesi 'şehir' demek. Lütfen"),
          de("die Stadt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stadt" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Woher kommst du?"),
          tr(
            "Yani 'Nerelisin?' Bak: soru kelimesi başta, fiil hemen arkasında, kişi en sonda.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Woher kommst du"), tr("deyin.")],
        expect: { kind: "repeat", target: "Woher kommst du" },
      },
      {
        say: [tr("Sıra sende: aynı soruyu tanımadığın birine, kibar biçimde sor.")],
        expect: {
          kind: "produce",
          target: "Woher kommen Sie",
          hint: [
            tr("Kibar biçimde fiil mastar hâlinde kalır:"),
            de("Woher kommen Sie?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wo wohnst du?"),
          tr("Bu ikisi çok karışır:"),
          de("woher"),
          tr("nereden geldiğini,"),
          de("wo"),
          tr("nerede olduğunu sorar. Biri kaynağı, öbürü yeri soruyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wo wohnst du"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wo wohnst du" },
      },
      {
        say: [
          tr(
            "Şimdi ikisini tek soruda birleştir: 'Nerelisin ve nerede oturuyorsun?'",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Woher kommst du und wo wohnst du",
          hint: [
            tr("İki soruyu"),
            de("und"),
            tr("ile bağla, her ikisinde de fiil ikinci sırada kalsın:"),
            de("Woher kommst du und wo wohnst du?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız en kısası:"),
          de("Was ist das?"),
          tr("Yani 'Bu ne?' Bir şeyin adını bilmediğinde en çok işine yarayacak cümle bu."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was ist das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was ist das" },
      },
      {
        say: [
          tr("Cevap vermek de kolay. Ülke söylüyorsan"),
          de("Ich komme aus der Türkei."),
          tr("şehir söylüyorsan"),
          de("Ich wohne in Izmir."),
          tr("dersin."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Woher Sie kommen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Woher Sie kommen?",
          answer: false,
          why: [
            tr(
              "Yanlış. Soruda fiil, soru kelimesinin hemen arkasına gelir; kişi en sonda kalır. Doğrusu:",
            ),
            de("Woher kommen Sie?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Üç soru kelimesi artık cebinde. Şimdi bir Almanca kursunun ilk günündesin ve yanındaki kişiyle tanışacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir Almanca kursunun ilk günündesin ve yanındaki kişiyle tanışıyorsun. Nereli olduğunu ve nerede oturduğunu sor, kendini de anlat.",
      partner: "utangaç ama arkadaş canlısı bir kursiyer",
      opening: "Hallo! Ich bin auch neu hier. Woher kommst du?",
      openingTr: "Merhaba! Ben de buraya yeniyim. Nerelisin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-sprachen",
    icon: "culture",
    level: "A1",
    course: "de",
    title: "Sprichst du Deutsch?",
    titleTr: "Diller",
    summary:
      "Fiili başa alarak dil sormayı ve hangi dilleri konuştuğunu anlatmayı öğretir.",
    minutes: 8,
    focusId: "Ja-Nein-Fragen",
    vocab: [
      { de: "sprechen", tr: "konuşmak" },
      { de: "Deutsch", tr: "Almanca" },
      { de: "Englisch", tr: "İngilizce" },
      { de: "Türkisch", tr: "Türkçe" },
      { de: "ein bisschen", tr: "biraz" },
    ],
    patterns: [
      { de: "Sprichst du Deutsch?", tr: "birinin bir dili bilip bilmediğini sorar" },
      { de: "Ja, ich spreche …", tr: "hangi dilleri konuştuğunu söyler" },
      {
        de: "Nein, aber ich lerne Deutsch.",
        tr: "henüz bilmediğini ama öğrendiğini söyler",
      },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün dillerden konuşacağız: birine hangi dilleri bildiğini sormayı ve kendi cevabını vermeyi öğreneceksin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu soru Almanya'da tanıştıktan beş dakika sonra mutlaka gelir. Bir de yeni bir soru biçimi öğreneceğiz: Türkçede cümlenin sonuna 'mi' koyarsın, Almancada fiili en başa alırsın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("sprechen"),
          tr("Türkçesi 'konuşmak' demek. Lütfen"),
          de("sprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sprechen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("Deutsch"),
          tr("Türkçesi 'Almanca' demek. Diller büyük harfle yazılır. Lütfen"),
          de("Deutsch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Deutsch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("Englisch"),
          tr("Türkçesi 'İngilizce' demek. Lütfen"),
          de("Englisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Englisch" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("Türkisch"),
          tr("Türkçesi 'Türkçe' demek. Lütfen"),
          de("Türkisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Türkisch" },
      },
      {
        say: [
          tr("Son kelimemiz iki kelimeden oluşuyor:"),
          de("ein bisschen"),
          tr("Türkçesi 'biraz' demek. Lütfen"),
          de("ein bisschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ein bisschen" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Sprichst du Deutsch?"),
          tr(
            "Fiil en başta duruyor. Soru eki yok, soru olduğunu anlatan tek şey fiilin bu yeri.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Sprichst du Deutsch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Sprichst du Deutsch" },
      },
      {
        say: [tr("Sıra sende: 'İngilizce konuşuyor musun?' nasıl sorulur?")],
        expect: {
          kind: "produce",
          target: "Sprichst du Englisch",
          hint: [
            tr("Fiil yine en başta kalır, yalnızca dil değişir:"),
            de("Sprichst du Englisch?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Küçük bir püf noktası: bu fiil sen biçiminde ortadaki sesini değiştirir."),
          de("sprechen"),
          tr("mastar hâli, ama"),
          de("du sprichst"),
          tr("deriz. Bunu kural gibi ezberleme, kulağın alışsın yeter."),
        ],
      },
      {
        say: [
          tr("İkinci kalıbımız cevap:"),
          de("Ja, ich spreche Türkisch und ein bisschen Deutsch."),
          tr("Yani 'Evet, Türkçe ve biraz Almanca konuşuyorum.'"),
        ],
      },
      {
        say: [
          tr("Lütfen"),
          de("Ich spreche Türkisch und ein bisschen Deutsch"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Ich spreche Türkisch und ein bisschen Deutsch",
        },
      },
      {
        say: [tr("Şimdi kısa hâlini sen kur: 'Biraz Almanca konuşuyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich spreche ein bisschen Deutsch",
          hint: [
            tr("Miktar önce, dil sonra gelir:"),
            de("Ich spreche ein bisschen Deutsch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bilmiyorsan da hazır bir cümlen olsun:"),
          de("Nein, aber ich lerne Deutsch."),
          tr("Yani 'Hayır, ama Almanca öğreniyorum.' Bu cümle karşındakini sabırlı yapar."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Nein, aber ich lerne Deutsch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Nein, aber ich lerne Deutsch" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Sprechst du Deutsch?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Sprechst du Deutsch?",
          answer: false,
          why: [
            tr("Yanlış. Bu fiil sen biçiminde ortadaki sesini değiştiriyordu. Doğrusu:"),
            de("Sprichst du Deutsch?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bu soruya hazırlıklısın. Şimdi bir kafede yan masadaki kişi seninle sohbete başlıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kafede yan masada oturan kişi seninle sohbete başladı. Hangi dilleri konuştuğunu sor ve kendi dillerini anlat.",
      partner: "meraklı ve sabırlı bir öğrenci",
      opening: "Entschuldigung, sprichst du Deutsch?",
      openingTr: "Affedersin, Almanca konuşuyor musun?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-zahlen",
    icon: "money",
    level: "A1",
    course: "de",
    title: "Zahlen bitte!",
    titleTr: "Sayılar 1-100",
    summary:
      "Yüze kadar saymayı, telefon numarasını söylemeyi ve fiyat sormayı öğretir.",
    minutes: 9,
    focusId: "Zahlen-Preise",
    vocab: [
      { de: "die Zahl", tr: "sayı" },
      { de: "zehn", tr: "on" },
      { de: "zwanzig", tr: "yirmi" },
      { de: "hundert", tr: "yüz" },
      { de: "die Nummer", tr: "numara" },
    ],
    patterns: [
      { de: "Meine Nummer ist …", tr: "telefon numaranı söylerken kullanılır" },
      { de: "Wie viel kostet das?", tr: "bir şeyin fiyatını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün sayıları alıyoruz: yüze kadar saymayı, telefon numaranı söylemeyi ve fiyat sormayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Sayılar dilin en çok işe yarayan parçası: fiyat, saat, adres, telefon, yaş. Almanca sayılarda seni şaşırtacak tek bir şey var, ona birazdan geleceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Zahl"),
          tr("Türkçesi 'sayı' demek. Lütfen"),
          de("die Zahl"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zahl" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("zehn"),
          tr("Türkçesi 'on' demek. Lütfen"),
          de("zehn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zehn" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("zwanzig"),
          tr("Türkçesi 'yirmi' demek. Lütfen"),
          de("zwanzig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zwanzig" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("hundert"),
          tr("Türkçesi 'yüz' demek. Lütfen"),
          de("hundert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hundert" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Nummer"),
          tr("Türkçesi 'numara' demek. Lütfen"),
          de("die Nummer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nummer" },
      },
      {
        say: [
          tr("Şimdi birden ona kadar sayalım:"),
          de("eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn"),
        ],
      },
      {
        say: [tr("İlk beşini benimle söyle. Lütfen"), de("eins zwei drei vier fünf"), tr("deyin.")],
        expect: { kind: "repeat", target: "eins zwei drei vier fünf" },
      },
      {
        say: [tr("Şimdi kalan beşi. Lütfen"), de("sechs sieben acht neun zehn"), tr("deyin.")],
        expect: { kind: "repeat", target: "sechs sieben acht neun zehn" },
      },
      {
        say: [
          tr("Onluklar da düzenli:"),
          de("zehn, zwanzig, dreißig, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig, hundert"),
        ],
      },
      {
        say: [
          tr(
            "Şimdi o şaşırtan kısım. Türkçede önce büyüğü söylersin: yirmi bir. Almancada tam tersi, önce birler sonra onlar gelir ve hepsi tek kelime olur:",
          ),
          de("einundzwanzig"),
          tr("Ortadaki küçük parça 've' demek, yani bir ve yirmi."),
        ],
      },
      {
        say: [tr("Lütfen"), de("einundzwanzig"), tr("deyin.")],
        expect: { kind: "repeat", target: "einundzwanzig" },
      },
      {
        say: [tr("Sıra sende: kırk üç Almancada nasıl söylenir?")],
        expect: {
          kind: "produce",
          target: "dreiundvierzig",
          hint: [
            tr("Önce birler, sonra onlar ve hepsi bitişik:"),
            de("dreiundvierzig"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Meine Nummer ist …"),
          tr(
            "Telefon numaranı söylerken kullanılır. Almanlar numarayı tek tek değil, ikişerli gruplar hâlinde söyler.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Meine Nummer ist siebzehn achtundzwanzig"), tr("deyin.")],
        expect: { kind: "repeat", target: "Meine Nummer ist siebzehn achtundzwanzig" },
      },
      {
        say: [tr("Numaran otuz iki elli olsun. Nasıl söylersin?")],
        expect: {
          kind: "produce",
          target: "Meine Nummer ist zweiunddreißig fünfzig",
          hint: [
            tr("Önce kalıbı kur, sonra grupları sırayla söyle:"),
            de("Meine Nummer ist zweiunddreißig fünfzig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız alışverişin anahtarı:"),
          de("Wie viel kostet das?"),
          tr("Yani 'Bu ne kadar?' Fiyatı sorarken hep bunu kullanacaksın."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie viel kostet das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie viel kostet das" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Meine Nummer ist einsundzwanzig."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Meine Nummer ist einsundzwanzig.",
          answer: false,
          why: [
            tr("Yanlış. Bir sayının içinde"),
            de("eins"),
            tr("değil"),
            de("ein"),
            tr("kullanılır. Doğrusu:"),
            de("Meine Nummer ist einundzwanzig."),
          ],
        },
      },
      {
        say: [
          tr(
            "Sayılar artık senin. Şimdi bir spor salonuna üye oluyorsun: numaranı vereceksin ve fiyatı soracaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir spor salonuna üye oluyorsun ve kayıt masasındasın. Telefon numaranı söyle, sonra aylık ücretin ne kadar olduğunu sor.",
      partner: "hızlı konuşan ama yardımsever bir görevli",
      opening: "Guten Tag! Sie möchten Mitglied werden? Wie ist Ihre Telefonnummer?",
      openingTr: "İyi günler! Üye mi olmak istiyorsunuz? Telefon numaranız kaç?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-alphabet",
    icon: "pen",
    level: "A1",
    course: "de",
    title: "Wie schreibt man das?",
    titleTr: "Harfleme",
    summary:
      "Adını harflemeyi ve bir kelimenin nasıl yazıldığını sormayı öğretir.",
    minutes: 8,
    focusId: "Vorstellung",
    vocab: [
      { de: "der Buchstabe", tr: "harf" },
      { de: "buchstabieren", tr: "harflemek" },
      { de: "schreiben", tr: "yazmak" },
      { de: "der Vorname", tr: "ad" },
      { de: "der Nachname", tr: "soyad" },
    ],
    patterns: [
      { de: "Wie schreibt man das?", tr: "bir kelimenin nasıl yazıldığını sorar" },
      { de: "Mein Nachname ist …", tr: "soyadını söylerken kullanılır" },
      { de: "Buchstabieren Sie bitte.", tr: "karşındakinden harflemesini ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün adını harflemeyi öğreneceğiz. Almanya'da bunu her yerde yapman istenir: bankada, doktorda, telefonda. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçe adlar Alman kulağına yabancı geldiği için harflemek günlük bir iş. Bir de Türkçede karşılığı olmayan küçük bir soru biçimi öğreneceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Buchstabe"),
          tr("Türkçesi 'harf' demek. Lütfen"),
          de("der Buchstabe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Buchstabe" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("buchstabieren"),
          tr("Türkçesi 'harflemek' demek. Lütfen"),
          de("buchstabieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "buchstabieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("schreiben"),
          tr("Türkçesi 'yazmak' demek. Lütfen"),
          de("schreiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schreiben" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Vorname"),
          tr("Türkçesi 'ad' demek, yani soyadından önceki isim. Lütfen"),
          de("der Vorname"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vorname" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Nachname"),
          tr("Türkçesi 'soyad' demek. Lütfen"),
          de("der Nachname"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Nachname" },
      },
      {
        say: [
          tr("Alfabenin çoğu harfi tanıdık ama birkaçının adı şaşırtıcı:"),
          de("Ypsilon, Zett, Vau, Jott"),
          tr("Bir de yalnızca Almancada olan bir harf var:"),
          de("Eszett"),
        ],
      },
      {
        say: [tr("En zorlarını birlikte söyleyelim. Lütfen"), de("Ypsilon Zett Eszett"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ypsilon Zett Eszett" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Wie schreibt man das?"),
          tr("Türkçesi 'Bu nasıl yazılır?' Ortadaki kelime"),
          de("man"),
          tr(
            "belli bir kişiyi göstermez, 'herkes' demektir; Türkçedeki 'yazılır' ekinin yerini tutuyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie schreibt man das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie schreibt man das" },
      },
      {
        say: [tr("Sıra sende: 'Kaya nasıl yazılıyor?' diye sor.")],
        expect: {
          kind: "produce",
          target: "Wie schreibt man Kaya",
          hint: [
            tr("Kalıbın sonuna sorduğun kelimeyi ekle:"),
            de("Wie schreibt man Kaya?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kendini tanıtırken işine yarayacak:"),
          de("Mein Vorname ist Ali."),
          tr("Almanlar adı ve soyadı ayrı ayrı sorar, bu yüzden ikisinin de kendi kelimesi var."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mein Vorname ist Ali"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mein Vorname ist Ali" },
      },
      {
        say: [tr("Şimdi soyadını söyle: 'Soyadım Yılmaz.'")],
        expect: {
          kind: "produce",
          target: "Mein Nachname ist Yilmaz",
          hint: [
            tr("Ad için bir kelime, soyad için başka bir kelime vardı:"),
            de("Mein Nachname ist Yilmaz."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp karşı taraftan gelecek:"),
          de("Buchstabieren Sie bitte."),
          tr("Yani 'Harfleyin lütfen.' Bunu duyduğunda adını harf harf söyleyeceksin."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Buchstabieren Sie bitte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Buchstabieren Sie bitte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wie schreibt man Ihren Namen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wie schreibt man Ihren Namen?",
          answer: true,
          why: [
            tr("Doğru."),
            de("man"),
            tr("tek kişi sayılır, bu yüzden fiil"),
            de("schreibt"),
            tr("olur; soru kelimesi de başta duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık adını harfleyebilir ve bir kelimenin yazılışını sorabilirsin. Şimdi bir kütüphanede üyelik kartı çıkartıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kütüphanede üyelik kartı çıkartıyorsun. Görevli adını ve soyadını soracak: söyle, harfle ve gerektiğinde bir kelimenin nasıl yazıldığını sor.",
      partner: "sakin ve titiz bir kütüphane görevlisi",
      opening: "Guten Tag! Ich brauche Ihren Vornamen und Ihren Nachnamen. Können Sie das buchstabieren?",
      openingTr: "İyi günler! Adınıza ve soyadınıza ihtiyacım var. Harfleyebilir misiniz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-beruf",
    icon: "job",
    level: "A1",
    course: "de",
    title: "Was bist du von Beruf?",
    titleTr: "Meslekler",
    summary:
      "Mesleğini, ne iş yaptığını ve hangi şirkette çalıştığını anlatmayı öğretir.",
    minutes: 8,
    focusId: "Sein-Haben",
    vocab: [
      { de: "der Beruf", tr: "meslek" },
      { de: "arbeiten", tr: "çalışmak" },
      { de: "der Lehrer", tr: "öğretmen" },
      { de: "die Ärztin", tr: "doktor" },
      { de: "die Firma", tr: "şirket" },
    ],
    patterns: [
      { de: "Ich bin … von Beruf.", tr: "mesleğini söylerken kullanılır" },
      { de: "Ich arbeite als …", tr: "hangi işi yaptığını söyler" },
      { de: "Ich arbeite bei …", tr: "hangi şirkette çalıştığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün mesleğini anlatmayı öğreneceğiz: ne iş yaptığını söylemek ve nerede çalıştığını eklemek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu, tanışmanın ikinci cümlesidir; kaçamazsın. Almancada meslek söylerken Türkçeye göre eksilen bir şey var, asıl dikkat edeceğimiz o. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Beruf"),
          tr("Türkçesi 'meslek' demek. Lütfen"),
          de("der Beruf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Beruf" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("arbeiten"),
          tr("Türkçesi 'çalışmak' demek. Lütfen"),
          de("arbeiten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "arbeiten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Lehrer"),
          tr("Türkçesi 'öğretmen' demek. Lütfen"),
          de("der Lehrer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Lehrer" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Ärztin"),
          tr("Türkçesi 'doktor' demek; bu biçim kadın doktor için kullanılır. Lütfen"),
          de("die Ärztin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ärztin" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Firma"),
          tr("Türkçesi 'şirket' demek. Lütfen"),
          de("die Firma"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Firma" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Ich bin Lehrer von Beruf."),
          tr(
            "Şuna dikkat et: Türkçede 'Ben bir öğretmenim' dersin. Almancada meslek söylerken o 'bir' hiç kullanılmaz, meslek doğrudan gelir.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin Lehrer von Beruf"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin Lehrer von Beruf" },
      },
      {
        say: [
          tr("Bir de kadın-erkek farkı var. Erkek için"),
          de("der Lehrer"),
          tr("kadın için"),
          de("die Lehrerin"),
          tr("denir. Sona küçük bir ek geliyor ve bu ek neredeyse bütün mesleklerde aynı."),
        ],
      },
      {
        say: [tr("Sıra sende: bir kadın doktor 'Ben doktorum.' derken ne der?")],
        expect: {
          kind: "produce",
          target: "Ich bin Ärztin von Beruf",
          accept: ["Ich bin Ärztin"],
          hint: [
            tr("Meslekten önce artikel yok, kadın biçimi de sondaki ekle kurulur:"),
            de("Ich bin Ärztin von Beruf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich arbeite als Verkäuferin."),
          tr(
            "Yani 'Satıcı olarak çalışıyorum.' Diploman bir şey, yaptığın iş başka bir şeyse tam bu kalıbı kullanırsın.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich arbeite als Verkäuferin"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich arbeite als Verkäuferin" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız şirketi söyler:"),
          de("Ich arbeite bei Siemens."),
          tr("Şirket adının önüne küçük bir edat geliyor ve şirket adı hiç değişmiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich arbeite bei Siemens"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich arbeite bei Siemens" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bosch'ta çalışıyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich arbeite bei Bosch",
          hint: [
            tr("Şirket adının önüne o küçük edat gelir:"),
            de("Ich arbeite bei Bosch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich arbeite als Lehrerin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich arbeite als Lehrerin.",
          answer: true,
          why: [
            tr("Doğru."),
            de("als"),
            tr(
              "kelimesinden sonra meslek artikelsiz gelir ve kadın biçimi de sondaki ekle doğru kurulmuş.",
            ),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ne iş yaptığını anlatabilirsin. Şimdi bir komşunun evindeki davettesin ve biri sana mesleğini soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir komşunun evindeki davettesin ve yeni tanıştığın biri ne iş yaptığını soruyor. Mesleğini söyle, hangi işi yaptığını ve nerede çalıştığını anlat.",
      partner: "sohbeti seven, biraz meraklı bir davetli",
      opening: "Guten Abend! Und was sind Sie von Beruf?",
      openingTr: "İyi akşamlar! Peki sizin mesleğiniz ne?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-alter",
    icon: "question",
    level: "A1",
    course: "de",
    title: "Wie alt bist du?",
    titleTr: "Yaş ve doğum yeri",
    summary:
      "Yaşını söylemeyi, birinin yaşını sormayı ve nerede doğduğunu anlatmayı öğretir.",
    minutes: 8,
    focusId: "Sein-Haben",
    vocab: [
      { de: "alt", tr: "yaşlı" },
      { de: "jung", tr: "genç" },
      { de: "das Jahr", tr: "yıl" },
      { de: "geboren", tr: "doğmuş" },
      { de: "der Geburtstag", tr: "doğum günü" },
    ],
    patterns: [
      { de: "Ich bin … Jahre alt.", tr: "yaşını söylerken kullanılır" },
      { de: "Wie alt bist du?", tr: "birinin yaşını sorar" },
      { de: "Ich bin in … geboren.", tr: "nerede doğduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün yaşını söylemeyi, birinin yaşını sormayı ve nerede doğduğunu anlatmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Sayıları biliyorsun, şimdi onları kullanacağız. Türkçede 'otuz yaşındayım' dersin ve iki kelime yeter; Almancada sayının yanına iki kelime daha eklemen gerekir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("alt"),
          tr("Türkçesi 'yaşlı' demek; yaş söylerken de bu kelime kullanılır. Lütfen"),
          de("alt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "alt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("jung"),
          tr("Türkçesi 'genç' demek. Lütfen"),
          de("jung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Jahr"),
          tr("Türkçesi 'yıl' demek. Lütfen"),
          de("das Jahr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Jahr" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("geboren"),
          tr("Türkçesi 'doğmuş' demek. Lütfen"),
          de("geboren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geboren" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Geburtstag"),
          tr("Türkçesi 'doğum günü' demek. Lütfen"),
          de("der Geburtstag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Geburtstag" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Ich bin dreißig Jahre alt."),
          tr(
            "Kelime kelime 'ben otuz yıl yaşlıyım' demek. Kulağa tuhaf geliyor ama Almanlar yaşı tam olarak böyle söyler.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin dreißig Jahre alt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin dreißig Jahre alt" },
      },
      {
        say: [
          tr(
            "Sıra sende: 'Yirmi beş yaşındayım.' nasıl dersin? Sayılarda önce birlerin geldiğini unutma.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich bin fünfundzwanzig Jahre alt",
          hint: [
            tr("Sayı tek kelime ve önce birler gelir:"),
            de("Ich bin fünfundzwanzig Jahre alt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız soru:"),
          de("Wie alt bist du?"),
          tr(
            "Türkçede 'Kaç yaşındasın?' dersin, Almanca 'ne kadar yaşlısın' diye sorar. Soru kelimesi başta, fiil hemen arkasında.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie alt bist du"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie alt bist du" },
      },
      {
        say: [tr("Şimdi aynı soruyu tanımadığın birine, kibar biçimde sor.")],
        expect: {
          kind: "produce",
          target: "Wie alt sind Sie",
          hint: [
            tr("Kibar biçimde bu fiil"),
            de("sind"),
            tr("olur:"),
            de("Wie alt sind Sie?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız doğum yerin için:"),
          de("Ich bin in Izmir geboren."),
          tr("Şehir ortada duruyor, 'doğmuş' kelimesi ise en sona atılıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin in Izmir geboren"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin in Izmir geboren" },
      },
      {
        say: [
          tr("Doğum gününü söylemek de kolay:"),
          de("Mein Geburtstag ist im Mai."),
          tr("Yani 'Doğum günüm mayısta.' Ayın adı değişir, kalıp aynı kalır."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe dreißig Jahre."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe dreißig Jahre.",
          answer: false,
          why: [
            tr("Yanlış. Almancada yaş 'sahip olmak' ile değil 'olmak' ile söylenir. Doğrusu:"),
            de("Ich bin dreißig Jahre alt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık yaşını ve nereli olduğunu anlatabilirsin. Şimdi bir doğum günü partisindesin ve orada yeni biriyle tanışıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşının doğum günü partisindesin ve orada yeni biriyle tanıştın. Kaç yaşında olduğunu sor, kendi yaşını ve nerede doğduğunu anlat.",
      partner: "şakacı ve rahat bir parti misafiri",
      opening: "Hallo, ich bin Lena und heute dreißig Jahre alt. Wie alt bist du?",
      openingTr: "Merhaba, ben Lena ve bugün otuz yaşındayım. Sen kaç yaşındasın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-formular",
    icon: "office",
    level: "A1",
    course: "de",
    title: "Das Anmeldeformular",
    titleTr: "Form doldurma",
    summary:
      "Resmî bir formda sorulan ad, adres ve posta kodu sorularını anlamayı ve cevaplamayı öğretir.",
    minutes: 9,
    focusId: "W-Fragen",
    vocab: [
      { de: "das Formular", tr: "form" },
      { de: "die Adresse", tr: "adres" },
      { de: "die Postleitzahl", tr: "posta kodu" },
      { de: "der Wohnort", tr: "ikamet yeri" },
      { de: "unterschreiben", tr: "imzalamak" },
    ],
    patterns: [
      { de: "Wie ist Ihr Name?", tr: "resmî bir yerde adı sorar" },
      { de: "Meine Adresse ist …", tr: "adresini söylerken kullanılır" },
      { de: "Unterschreiben Sie hier, bitte.", tr: "imza atmasını ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün Almanya'da en çok karşına çıkacak kâğıdı dolduracağız: kayıt formu. Adres vermeyi, posta kodunu söylemeyi ve imza istemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Resmî yerlerde hep kibar biçim kullanılır ve sorular hep aynıdır; ezberlersen bir daha zorlanmazsın. Bir de küçük bir tuzak var: Almanca ad sorarken 'ne' değil 'nasıl' der. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Formular"),
          tr("Türkçesi 'form' demek. Lütfen"),
          de("das Formular"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Formular" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Adresse"),
          tr("Türkçesi 'adres' demek. Lütfen"),
          de("die Adresse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Adresse" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Postleitzahl"),
          tr("Türkçesi 'posta kodu' demek. Lütfen"),
          de("die Postleitzahl"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Postleitzahl" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Wohnort"),
          tr("Türkçesi 'ikamet yeri' demek, yani oturduğun şehir. Lütfen"),
          de("der Wohnort"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wohnort" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("unterschreiben"),
          tr("Türkçesi 'imzalamak' demek. Lütfen"),
          de("unterschreiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unterschreiben" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Wie ist Ihr Name?"),
          tr(
            "Türkçede 'Adınız ne?' dersin. Almanca burada 'ne' değil 'nasıl' kullanıyor; sözlükten çevirirsen yanlış yaparsın.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie ist Ihr Name"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie ist Ihr Name" },
      },
      {
        say: [
          tr(
            "Sıra sende: 'Adresiniz nedir?' nasıl sorulur? Küçük bir ipucu: adres dişil bir kelime, bu yüzden ondan önceki iyelik kelimesi bir harf uzar.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Wie ist Ihre Adresse",
          hint: [
            tr("Soru kelimesi yine 'nasıl' olarak kalır, iyelik ise dişil kelimeden önce uzar:"),
            de("Wie ist Ihre Adresse?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız senin cevabın:"),
          de("Meine Adresse ist Gartenstraße acht."),
          tr("Almancada da önce sokak, sonra numara söylenir; Türkçedeki sıranın aynısı."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Meine Adresse ist Gartenstraße acht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Meine Adresse ist Gartenstraße acht" },
      },
      {
        say: [
          tr("Posta kodu Almanya'da beş rakamdır ve rakamlar tek tek okunur:"),
          de("Meine Postleitzahl ist eins null neun neun neun."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Meine Postleitzahl ist eins null neun neun neun"), tr("deyin.")],
        expect: {
          kind: "repeat",
          target: "Meine Postleitzahl ist eins null neun neun neun",
        },
      },
      {
        say: [
          tr("Üçüncü kalıp görevliden gelecek:"),
          de("Unterschreiben Sie hier, bitte."),
          tr("Yani 'Burayı imzalayın lütfen.' Bunu duyduğunda formun altını imzalayacaksın."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Unterschreiben Sie hier bitte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Unterschreiben Sie hier bitte" },
      },
      {
        say: [tr("Bir üretim daha: 'Oturduğum yer Berlin.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Wohnort ist Berlin",
          hint: [
            tr("İkamet yeri eril bir kelime, bu yüzden iyelik kısa hâlinde kalır:"),
            de("Mein Wohnort ist Berlin."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wie ist Ihre Postleitzahl?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wie ist Ihre Postleitzahl?",
          answer: true,
          why: [
            tr("Doğru. Posta kodu dişil bir kelime olduğu için iyelik uzun biçimiyle geliyor ve soru da 'nasıl' ile kuruluyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir formun karşısında dilsiz kalmayacaksın. Şimdi belediyede adres kaydı yaptırıyorsun: görevlinin sorularına cevap ver.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Belediyede adres kaydı yaptırıyorsun ve görevli formu senin için dolduruyor. Adını, adresini, posta kodunu ve oturduğun şehri söyle.",
      partner: "resmî konuşan ama yardımsever bir memur",
      opening: "Guten Tag! Wie ist Ihr Name, bitte?",
      openingTr: "İyi günler! Adınız nedir?",
      minTurns: 4,
    },
  },
];

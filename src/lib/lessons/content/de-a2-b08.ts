import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 8 — konular 071-080 (Modül 8: Kutlamalar ve ilişkiler).
 *
 * Modülün dilbilgisi omurgası tek bir kural: yan cümlede fiil sona gider.
 * Bağlaç değişiyor ama kural değişmiyor — dass (072, 074, 078), weil (076),
 * wenn (079). 079 bu kuralın ikinci yarısını ekliyor: yan cümle başa
 * geçtiğinde ana cümlenin öznesi fiilin arkasına düşüyor. Aralara Dativ
 * giriyor (073 nesne, 077 zamir), çünkü hediye vermek ve iltifat etmek
 * Almancada aynı hâlle kuruluyor.
 */
export const deA2B08: Lesson[] = [
  {
    id: "de-a2-geburtstag",
    icon: "cake",
    level: "A2",
    course: "de",
    title: "Alles Gute zum Geburtstag!",
    titleTr: "Doğum günü",
    summary:
      "Doğum günü tarihini sıra sayısıyla söylemeyi ve tebrik etmeyi öğretir.",
    minutes: 9,
    focusId: "Ordinalzahlen-Datum",
    vocab: [
      { de: "der Glückwunsch", tr: "tebrik" },
      { de: "die Kerze", tr: "mum" },
      { de: "die Torte", tr: "yaş pasta" },
      { de: "die Feier", tr: "kutlama" },
      { de: "der März", tr: "mart" },
    ],
    patterns: [
      { de: "Am dritten März habe ich Geburtstag.", tr: "doğum gününün tarihini söyler" },
      { de: "Ich werde dreißig.", tr: "kaç yaşına gireceğini söyler" },
      { de: "Herzlichen Glückwunsch!", tr: "tebrik ederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün doğum günü sofrasındayız. Tarih söylemeyi öğreneceğiz ve burada Almancanın küçük bir inadı var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'üç Mart' dersin ve sayı hiç değişmez. Almancada tarihte sayı sıra sayısına dönüşür, üstelik edatla birlikte sonuna bir ek de alır. Yani 'üç' değil 'üçüncüsünde' dersin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Glückwunsch"),
          tr("Türkçesi 'tebrik' demek. Lütfen"),
          de("der Glückwunsch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Glückwunsch" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Kerze"),
          tr("Türkçesi 'mum' demek. Lütfen"),
          de("die Kerze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kerze" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Torte"),
          tr("Türkçesi 'yaş pasta' demek. Lütfen"),
          de("die Torte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Torte" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Feier"),
          tr("Türkçesi 'kutlama' demek. Lütfen"),
          de("die Feier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Feier" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der März"),
          tr("Türkçesi 'mart' demek. Lütfen"),
          de("der März"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der März" },
      },
      {
        say: [
          tr("Sıra sayıları düzenli. Ondokuza kadar sona tek harf ekleniyor:"),
          de("der erste, der zweite, der dritte, der vierte"),
          tr("Yirmiden sonra ek biraz uzuyor:"),
          de("der zwanzigste, der einunddreißigste"),
        ],
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Am dritten März habe ich Geburtstag."),
          tr(
            "Baştaki edat gün için kullandığın edatın aynısı; sıra sayısı ise onun arkasında bir ek daha alıyor. Bunu kalıp olarak öğren, tek tek çözmeye çalışma.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Am dritten März habe ich Geburtstag"), tr("deyin.")],
        expect: { kind: "repeat", target: "Am dritten März habe ich Geburtstag" },
      },
      {
        say: [tr("Sıra sende: 'Doğum günüm bir Mayısta.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am ersten Mai habe ich Geburtstag",
          hint: [
            tr("Sıra sayısı edatla birlikte sonuna ek alır, ay adı hemen arkasından gelir:"),
            de("Am ersten Mai habe ich Geburtstag."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yaşı söyler:"),
          de("Ich werde dreißig."),
          tr(
            "Dikkat: kaç yaşında olduğunu söylerken 'olmak' fiilini kullanıyordun. Kaç yaşına GİRECEĞİNİ söylerken başka bir fiil geliyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich werde dreißig"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich werde dreißig" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Kırk yaşına giriyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich werde vierzig",
          hint: [
            tr("Yaşa girmek için o ikinci fiili kullan:"),
            de("Ich werde vierzig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız sofradaki cümle:"),
          de("Herzlichen Glückwunsch!"),
          tr("Kısası da var:"),
          de("Alles Gute!"),
          tr("İkisi de her yaşa, her kutlamaya uyar."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Herzlichen Glückwunsch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Herzlichen Glückwunsch" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe am drei März Geburtstag."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe am drei März Geburtstag.",
          answer: false,
          why: [
            tr("Yanlış. Tarihte sayı düz hâlinde kalmaz, sıra sayısına dönüşür ve ek alır. Doğrusu:"),
            de("Ich habe am dritten März Geburtstag."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık tarihini söyleyip tebrik edebilirsin. Şimdi bir iş arkadaşının doğum günü ve mutfakta pastanın başındasınız.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş yerinde bir arkadaşının doğum gününü kutluyorsunuz. Onu tebrik et, kaç yaşına girdiğini sor ve kendi doğum gününün ne zaman olduğunu söyle.",
      partner: "kendi doğum gününü sevmeyen ama pastayı çok seven bir iş arkadaşı",
      opening: "Danke fürs Kommen! Wann hast du eigentlich Geburtstag?",
      openingTr: "Geldiğin için sağ ol! Senin doğum günün ne zaman aslında?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-party-planen",
    icon: "party",
    level: "A2",
    course: "de",
    title: "Wir planen eine Party",
    titleTr: "Parti planı",
    summary:
      "Parti planlarken umut ve beklenti bildiren yan cümleyi kurmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "planen", tr: "planlamak" },
      { de: "hoffen", tr: "ummak" },
      { de: "organisieren", tr: "düzenlemek" },
      { de: "zusagen", tr: "geleceğini bildirmek" },
      { de: "besorgen", tr: "temin etmek" },
    ],
    patterns: [
      { de: "Ich hoffe, dass du kommst.", tr: "gelmesini umduğunu söyler" },
      { de: "Wer bringt was mit?", tr: "kimin ne getireceğini sorar" },
      { de: "Bis Samstag!", tr: "cumartesi görüşmek üzere demek" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün bir parti planlıyoruz. Yan cümle kuralını biliyorsun; bugün onu umut ve beklenti anlatmak için kullanacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kuralı bir daha söyleyeyim, çünkü bu modülün tamamı onun üstüne kurulu: bağlaçtan sonra gelen cümlede fiil en sona gider. Türkçede zaten fiil sonda durur, yani bu sıra sana yabancı değil; zor olan, ana cümlede öne aldığın fiili yan cümlede geri sona atmayı hatırlamak. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("planen"),
          tr("Türkçesi 'planlamak' demek. Lütfen"),
          de("planen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "planen" },
      },
      {
        say: [
          tr("Fiil iş başında şöyle görünür:"),
          de("Wir planen eine große Party."),
        ],
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("hoffen"),
          tr("Türkçesi 'ummak' demek. Lütfen"),
          de("hoffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hoffen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("organisieren"),
          tr("Türkçesi 'düzenlemek' demek. Lütfen"),
          de("organisieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "organisieren" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("zusagen"),
          tr("Türkçesi 'geleceğini bildirmek' demek. Lütfen"),
          de("zusagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zusagen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("besorgen"),
          tr("Türkçesi 'temin etmek, ayarlamak' demek. Lütfen"),
          de("besorgen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "besorgen" },
      },
      {
        say: [
          tr("Farkı iki cümlede duy. Tek başına:"),
          de("Du kommst."),
          tr("Bağlaçtan sonra:"),
          de("Ich hoffe, dass du kommst."),
          tr("Fiil öne değil sona gitti; virgülden sonrası ayrı bir dünya."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich hoffe, dass du kommst"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich hoffe, dass du kommst" },
      },
      {
        say: [tr("Sıra sende: 'Umarım vaktin vardır.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich hoffe, dass du Zeit hast",
          hint: [
            tr("Bağlaçtan sonra önce özne, sonra nesne, en sonda fiil:"),
            de("Ich hoffe, dass du Zeit hast."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız işleri paylaştırır:"),
          de("Wer bringt was mit?"),
          tr("Yani 'Kim ne getiriyor?' İki soru kelimesi yan yana; Almancada bu gayet olağan."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wer bringt was mit"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wer bringt was mit" },
      },
      {
        say: [tr("Şimdi sen sor: 'İçecekleri kim ayarlıyor?'")],
        expect: {
          kind: "produce",
          target: "Wer besorgt die Getränke",
          hint: [
            tr("Soru kelimesi özne olduğu için fiil hemen arkasına gelir:"),
            de("Wer besorgt die Getränke?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Cevaplar da kısa olur:"),
          de("Ich organisiere die Musik."),
          tr("ya da"),
          de("Ich habe schon zugesagt."),
          tr("Bu ikinci fiil ayrılabilen bir fiil; ortacı ortadan bölünmüş."),
        ],
      },
      {
        say: [
          tr("Üçüncü kalıp konuşmayı kapatır:"),
          de("Bis Samstag!"),
          tr("Yani 'Cumartesi görüşürüz!' Almanlar vedalaşırken bir sonraki buluşmanın gününü söyler."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Bis Samstag"), tr("deyin.")],
        expect: { kind: "repeat", target: "Bis Samstag" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich hoffe, dass alle Zeit haben."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich hoffe, dass alle Zeit haben.",
          answer: true,
          why: [
            tr("Doğru. Virgülden sonra önce özne geliyor, fiil ise cümlenin en sonunda duruyor; yan cümle kuralı tam uygulanmış."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık plan yapabilirsin. Şimdi ortak bir arkadaşınıza sürpriz parti hazırlıyorsunuz ve vakit dar.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ortak bir arkadaşınıza sürpriz parti hazırlıyorsunuz. Kimin neyi ayarlayacağını konuşun, umutlarını ve endişelerini yan cümleyle söyle.",
      partner: "her şeyi listeleyen, biraz telaşlı bir arkadaş",
      opening: "Wir haben nur eine Woche Zeit. Was machen wir zuerst?",
      openingTr: "Sadece bir haftamız var. Önce neyi halledelim?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-gastgeschenk",
    icon: "flower",
    level: "A2",
    course: "de",
    title: "Was bringen wir mit?",
    titleTr: "Ev hediyesi",
    summary:
      "Kime ne hediye götüreceğini söylemeyi ve Dativ nesnesini kurmayı öğretir.",
    minutes: 9,
    focusId: "Dativ",
    vocab: [
      { de: "der Gastgeber", tr: "ev sahibi" },
      { de: "der Strauß", tr: "buket" },
      { de: "die Pralinen", tr: "çikolata" },
      { de: "schenken", tr: "hediye etmek" },
      { de: "passend", tr: "uygun" },
    ],
    patterns: [
      { de: "Wir bringen dem Gastgeber Blumen mit.", tr: "ev sahibine ne götüreceğini söyler" },
      { de: "Blumen gehen immer.", tr: "çiçeğin her zaman uygun olduğunu söyler" },
      { de: "Ich schenke ihr Pralinen.", tr: "kime ne hediye ettiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Almanya'da bir eve elin boş gidilmez. Bugün hem ne götüreceğini hem de bunu nasıl söyleyeceğini öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir cümlede iki nesne olabiliyor: verilen şey ve verilen kişi. Türkçede kişiye bir ek eklersin ve iş biter. Almancada kişinin önündeki artikel tamamen değişiyor. Bugünün işi bu değişim. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Gastgeber"),
          tr("Türkçesi 'ev sahibi' demek. Lütfen"),
          de("der Gastgeber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Gastgeber" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Strauß"),
          tr("Türkçesi 'buket' demek. Lütfen"),
          de("der Strauß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Strauß" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Pralinen"),
          tr("Türkçesi 'çikolata' demek; bu kelime hep çoğul kullanılır. Lütfen"),
          de("die Pralinen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Pralinen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schenken"),
          tr("Türkçesi 'hediye etmek' demek. Lütfen"),
          de("schenken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schenken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("passend"),
          tr("Türkçesi 'uygun, yakışır' demek. Lütfen"),
          de("passend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "passend" },
      },
      {
        say: [
          tr("Hediyenin tek ölçüsü şu:"),
          de("Das Geschenk soll passend sein."),
        ],
      },
      {
        say: [
          tr("Değişimi yan yana duy. Yalın hâlde:"),
          de("der Gastgeber"),
          tr("Kendisine bir şey verdiğinde:"),
          de("dem Gastgeber"),
          tr("Dişilde ise"),
          de("die Schwester"),
          tr("şu hâle giriyor:"),
          de("der Schwester"),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wir bringen dem Gastgeber Blumen mit."),
          tr("Sıra şöyle: önce kişi, sonra şey. Almancada kişi hep önde durur."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wir bringen dem Gastgeber Blumen mit"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wir bringen dem Gastgeber Blumen mit" },
      },
      {
        say: [
          tr("İkinci kalıbımız bir kültür bilgisi:"),
          de("Blumen gehen immer."),
          tr("Yani 'Çiçek her zaman iş görür.' Almanya'da ev sahibine çiçek götürmek en güvenli seçim."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Blumen gehen immer"), tr("deyin.")],
        expect: { kind: "repeat", target: "Blumen gehen immer" },
      },
      {
        say: [
          tr("Üçüncü kalıbımızda kişi zamire dönüşüyor:"),
          de("Ich schenke ihr Pralinen."),
          tr("Yani 'Ona çikolata hediye ediyorum.' Erkek için"),
          de("ihm"),
          tr("dersin."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich schenke ihr Pralinen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich schenke ihr Pralinen" },
      },
      {
        say: [tr("Sıra sende: 'Ona bir buket hediye ediyorum.' Erkek biri için söyle.")],
        expect: {
          kind: "produce",
          target: "Ich schenke ihm einen Strauß",
          hint: [
            tr("Önce kişi zamiri, sonra hediye; buket eril ve verilen şey olduğu için o ek gelir:"),
            de("Ich schenke ihm einen Strauß."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [tr("Bir tane daha: 'Kız kardeşime çiçek hediye ediyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich schenke meiner Schwester Blumen",
          hint: [
            tr("Kız kardeş dişil ve kendisine veriliyor, bu yüzden iyelik kelimesi de değişiyor:"),
            de("Ich schenke meiner Schwester Blumen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich schenke meine Mutter Blumen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich schenke meine Mutter Blumen.",
          answer: false,
          why: [
            tr("Yanlış. Hediyeyi alan kişi olduğu için iyelik kelimesi değişmeli. Doğrusu:"),
            de("Ich schenke meiner Mutter Blumen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık elin boş gitmezsin. Şimdi bir Alman ailesine yemeğe davetlisiniz ve yolda hediye seçiyorsunuz.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir Alman ailesine yemeğe davetlisiniz ve yolda ne götüreceğinizi konuşuyorsunuz. Kime ne uygun düşer, tartışın ve karar verin.",
      partner: "Alman görgü kurallarını iyi bilen, fikri net bir arkadaş",
      opening: "Wir sind in zehn Minuten da. Was bringen wir mit?",
      openingTr: "On dakikaya oradayız. Ne götürüyoruz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-hochzeit",
    icon: "ring",
    level: "A2",
    course: "de",
    title: "Auf einer Hochzeit",
    titleTr: "Düğünde",
    summary:
      "Düğünde görüş bildirmeyi ve yan cümlede fiili sona atmayı pekiştirir.",
    minutes: 9,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "die Hochzeit", tr: "düğün" },
      { de: "das Brautpaar", tr: "gelin ve damat" },
      { de: "heiraten", tr: "evlenmek" },
      { de: "anstoßen", tr: "kadeh kaldırmak" },
      { de: "die Rede", tr: "konuşma" },
    ],
    patterns: [
      { de: "Ich finde, dass …", tr: "kendi görüşünü söyler" },
      { de: "Das Paar sieht glücklich aus.", tr: "çiftin nasıl göründüğünü söyler" },
      { de: "Auf das Brautpaar!", tr: "gelin ve damadın şerefine demek" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bir düğün masasındayız. Görüş bildirmeyi öğreneceğiz ve bunun için yine o yan cümle kuralı lazım. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanlar görüşlerini nadiren tek cümlede söyler; önce 'bence' anlamına gelen kısa bir giriş yaparlar, sonra asıl cümleyi yan cümle olarak eklerler. Bu yüzden fiil yine sona gidiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Hochzeit"),
          tr("Türkçesi 'düğün' demek. Lütfen"),
          de("die Hochzeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Hochzeit" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Brautpaar"),
          tr("Türkçesi 'gelin ve damat' demek. Lütfen"),
          de("das Brautpaar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Brautpaar" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("heiraten"),
          tr("Türkçesi 'evlenmek' demek. Lütfen"),
          de("heiraten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "heiraten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("anstoßen"),
          tr("Türkçesi 'kadeh kaldırmak' demek. Lütfen"),
          de("anstoßen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anstoßen" },
      },
      {
        say: [
          tr("Kadehler bu fiille kalkar:"),
          de("Wir stoßen auf das Brautpaar an."),
        ],
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Rede"),
          tr("Türkçesi 'konuşma' demek, yani kürsüde yapılan konuşma. Lütfen"),
          de("die Rede"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rede" },
      },
      {
        say: [
          tr("İlk kalıbımız görüş bildirir:"),
          de("Ich finde, dass die Musik sehr schön ist."),
          tr(
            "Dikkat et: yan cümlede fiil en sona gitti. Türkçe çeviride de öyle: 'Bence müzik çok güzel.'",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich finde, dass die Musik sehr schön ist"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich finde, dass die Musik sehr schön ist" },
      },
      {
        say: [tr("Sıra sende: 'Bence konuşma güzeldi.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich finde, dass die Rede schön war",
          hint: [
            tr("Yan cümlede geçmiş zaman da sona gider:"),
            de("Ich finde, dass die Rede schön war."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız görünüşü anlatır:"),
          de("Das Paar sieht glücklich aus."),
          tr("Ayrılabilen bir fiil; öneki cümlenin sonuna gitmiş."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das Paar sieht glücklich aus"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das Paar sieht glücklich aus" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız kadeh kaldırırken söylenir:"),
          de("Auf das Brautpaar!"),
          tr("Yani 'Gelin ve damadın şerefine!' Bunu söyleyip kadehleri tokuşturursunuz."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Auf das Brautpaar"), tr("deyin.")],
        expect: { kind: "repeat", target: "Auf das Brautpaar" },
      },
      {
        say: [tr("Şimdi sen sor: 'Siz ne zaman evlendiniz?'")],
        expect: {
          kind: "produce",
          target: "Wann habt ihr geheiratet",
          hint: [
            tr("Soru kelimesi başta, yardımcı fiil hemen arkasında, ortaç en sonda:"),
            de("Wann habt ihr geheiratet?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich finde, dass die Hochzeit war sehr schön."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich finde, dass die Hochzeit war sehr schön.",
          answer: false,
          why: [
            tr("Yanlış. Yan cümlede fiil ortada duramaz, en sona gitmeli. Doğrusu:"),
            de("Ich finde, dass die Hochzeit sehr schön war."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık masada sohbete katılabilirsin. Şimdi bir iş arkadaşının düğünündesin ve yanındaki misafirle konuşuyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir iş arkadaşının düğününde masada oturuyorsun. Düğünle ilgili görüşlerini söyle, çifti sor ve kendi ülkendeki düğünlerden bahset.",
      partner: "düğünlerde ağlayan, çok duygusal bir masa arkadaşı",
      opening: "Was für eine schöne Feier! Wie findest du das Brautpaar?",
      openingTr: "Ne güzel bir kutlama! Gelin ve damadı nasıl buldun?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-feiertage",
    icon: "flag",
    level: "A2",
    course: "de",
    title: "Deutsche Feiertage",
    titleTr: "Alman bayramları",
    summary:
      "Alman bayramlarını ve o günlerde neler yapıldığını anlatmayı öğretir.",
    minutes: 9,
    focusId: "Es-gibt",
    vocab: [
      { de: "der Feiertag", tr: "bayram günü" },
      { de: "Weihnachten", tr: "Noel" },
      { de: "Ostern", tr: "paskalya" },
      { de: "schmücken", tr: "süslemek" },
      { de: "der Brauch", tr: "gelenek" },
    ],
    patterns: [
      { de: "An Weihnachten gibt es Geschenke.", tr: "o gün ne olduğunu anlatır" },
      { de: "Frohe Ostern!", tr: "paskalyayı kutlarken kullanılır" },
      { de: "Das ist ein alter Brauch.", tr: "eski bir gelenek olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Almanya'da bir işyerinin neden kapalı olduğunu anlamak bazen zor olur. Bugün bayramları ve o günlerin geleneklerini konuşacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Yeni bir kural yok; 'var' kalıbını ve gün edatını birleştireceğiz. Küçük bir ayrıntı var: bayram adlarının önüne artikel gelmez, tıpkı şehir adlarında olduğu gibi. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Feiertag"),
          tr("Türkçesi 'bayram günü, resmî tatil' demek. Lütfen"),
          de("der Feiertag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Feiertag" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("Weihnachten"),
          tr("Türkçesi 'Noel' demek; Almanya'nın en büyük bayramı. Lütfen"),
          de("Weihnachten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Weihnachten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("Ostern"),
          tr("Türkçesi 'paskalya' demek. Lütfen"),
          de("Ostern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ostern" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schmücken"),
          tr("Türkçesi 'süslemek' demek. Lütfen"),
          de("schmücken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schmücken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Brauch"),
          tr("Türkçesi 'gelenek' demek. Lütfen"),
          de("der Brauch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Brauch" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("An Weihnachten gibt es Geschenke."),
          tr("Bayram adının önünde bir edat var ama artikel yok; bunu kalıp olarak al."),
        ],
      },
      {
        say: [tr("Lütfen"), de("An Weihnachten gibt es Geschenke"), tr("deyin.")],
        expect: { kind: "repeat", target: "An Weihnachten gibt es Geschenke" },
      },
      {
        say: [tr("Sıra sende: 'Paskalyada yumurta olur.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "An Ostern gibt es Eier",
          hint: [
            tr("Aynı kalıp, yalnızca bayram ve nesne değişir:"),
            de("An Ostern gibt es Eier."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kutlama sözü:"),
          de("Frohe Ostern!"),
          tr("Noel için de aynı biçim:"),
          de("Frohe Weihnachten!"),
          tr("Bu iki cümleyi aralık ve nisan aylarında günde beş kez duyacaksın."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Frohe Weihnachten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Frohe Weihnachten" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız bir açıklama yapar:"),
          de("Das ist ein alter Brauch."),
          tr("Yani 'Bu eski bir gelenek.' Sana tuhaf gelen bir şeyi sorduğunda alacağın cevap çoğunlukla budur."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist ein alter Brauch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist ein alter Brauch" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Evi süslüyoruz.'")],
        expect: {
          kind: "produce",
          target: "Wir schmücken das Haus",
          hint: [
            tr("Ev nötr bir kelime, nesne olunca artikeli değişmez:"),
            de("Wir schmücken das Haus."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("An Weihnachten gibt es viel Essen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "An Weihnachten gibt es viel Essen.",
          answer: true,
          why: [
            tr("Doğru. Bayram adı edatla birlikte artikelsiz gelmiş ve 'var' kalıbı donuk biçimini korumuş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık takvimdeki kırmızı günleri konuşabilirsin. Şimdi Alman komşun sana kendi bayramlarını anlatıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Alman komşun sana buradaki bayramları anlatıyor. Merak ettiklerini sor ve kendi ülkendeki bayramları ve geleneklerini anlat.",
      partner: "geleneklerine bağlı, senin bayramlarını da merak eden bir komşu",
      opening: "Bei uns gibt es an Weihnachten immer Karpfen. Wie feiert ihr denn?",
      openingTr: "Bizde Noel'de hep sazan balığı olur. Siz nasıl kutluyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-einladung-absagen",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Ich muss leider absagen",
    titleTr: "Davet iptali",
    summary:
      "Bir daveti kibarca reddetmeyi ve nedenini yan cümleyle söylemeyi öğretir.",
    minutes: 9,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "nachholen", tr: "telafi etmek" },
      { de: "kurzfristig", tr: "son dakikada" },
      { de: "verhindert", tr: "işi çıkmış" },
      { de: "dazwischenkommen", tr: "araya girmek" },
      { de: "die Ausrede", tr: "bahane" },
    ],
    patterns: [
      { de: "Ich kann nicht kommen, weil …", tr: "gelemeyeceğini ve nedenini söyler" },
      { de: "Schade!", tr: "'yazık' demek" },
      { de: "Wir holen es nach.", tr: "telafi edeceğinizi söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugünkü ders zor bir telefon: bir daveti geri çevireceğiz. Almanya'da bunun yazısız bir kuralı var, ona da geleceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Yazısız kural şu: iptal ediyorsan sebebini söylersin. Sebepsiz bir hayır burada kabalık sayılıyor. Sebep bağlacından sonra fiil yine sona gidiyor; kural aynı, yalnızca bağlaç değişti. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("nachholen"),
          tr("Türkçesi 'telafi etmek, sonra yapmak' demek. Lütfen"),
          de("nachholen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nachholen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("kurzfristig"),
          tr("Türkçesi 'son dakikada' demek. Lütfen"),
          de("kurzfristig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kurzfristig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("verhindert"),
          tr("Türkçesi 'işi çıkmış, engellenmiş' demek. Lütfen"),
          de("verhindert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verhindert" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("dazwischenkommen"),
          tr("Türkçesi 'araya girmek' demek. Lütfen"),
          de("dazwischenkommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dazwischenkommen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Ausrede"),
          tr("Türkçesi 'bahane' demek. Lütfen"),
          de("die Ausrede"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ausrede" },
      },
      {
        say: [
          tr("İlk kalıbımız hem haberi hem sebebi verir:"),
          de("Ich kann nicht kommen, weil ich arbeiten muss."),
          tr(
            "Virgülden sonra fiil yine sona gitti. Burada iki fiil var ve ikisi de sonda: önce asıl fiil, sonra kip fiili.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich kann nicht kommen, weil ich arbeiten muss"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich kann nicht kommen, weil ich arbeiten muss" },
      },
      {
        say: [tr("Sıra sende: 'Gelemem, çünkü hastayım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kann nicht kommen, weil ich krank bin",
          hint: [
            tr("Sebep cümlesinde önce özne, sonra niteleme, en sonda fiil:"),
            de("Ich kann nicht kommen, weil ich krank bin."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sebebi söylemek istemiyorsan hazır bir cümle var:"),
          de("Mir ist etwas dazwischengekommen."),
          tr("Yani 'Araya bir şey girdi.' Kimse ayrıntısını sormaz; bu bir bahane değil, kibar bir kapanıştır. Daha resmisi de var:"),
          de("Ich bin leider verhindert."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mir ist etwas dazwischengekommen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mir ist etwas dazwischengekommen" },
      },
      {
        say: [
          tr("İkinci kalıp karşı taraftan gelir:"),
          de("Schade!"),
          tr("Yani 'Yazık!' Arkasından genelde şu gelir:"),
          de("Aber kein Problem."),
        ],
      },
      {
        say: [
          tr("Üçüncü kalıp kapıyı açık bırakır:"),
          de("Wir holen es nach."),
          tr("Yani 'Telafi ederiz.' Bu cümleyi eklemezsen iptal soğuk kalır."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wir holen es nach"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wir holen es nach" },
      },
      {
        say: [tr("Bir üretim daha: 'Maalesef son dakikada iptal etmem gerekiyor.'")],
        expect: {
          kind: "produce",
          target: "Ich muss leider kurzfristig absagen",
          hint: [
            tr("Kip fiili ikinci sırada, asıl fiil en sonda; araya önce üzüntü sonra zaman kelimesi girer:"),
            de("Ich muss leider kurzfristig absagen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich sage ab, weil ich keine Zeit habe."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich sage ab, weil ich keine Zeit habe.",
          answer: true,
          why: [
            tr("Doğru. Ana cümlede ayrılabilen fiilin öneki sona gitmiş, yan cümlede ise fiil en sonda duruyor; iki kural da yerinde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kibarca hayır diyebilirsin. Şimdi yarınki buluşmaya gelemeyeceğini haber vermek için arkadaşını arıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yarınki buluşmaya gelemeyeceksin ve arkadaşını arayıp haber veriyorsun. Nedenini söyle, üzüntünü belirt ve telafi teklif et.",
      partner: "önce hayal kırıklığına uğrayan ama sonra anlayış gösteren bir arkadaş",
      opening: "Du kommst doch morgen, oder?",
      openingTr: "Yarın geliyorsun, değil mi?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-komplimente",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Das steht dir gut!",
    titleTr: "İltifat etme",
    summary:
      "İltifat etmeyi ve beğeni bildiren fiillerin kişiyi neden Dativ ile aldığını öğretir.",
    minutes: 9,
    focusId: "Personalpronomen-Dativ",
    vocab: [
      { de: "das Kompliment", tr: "iltifat" },
      { de: "die Frisur", tr: "saç modeli" },
      { de: "der Geschmack", tr: "zevk" },
      { de: "ehrlich", tr: "samimi" },
      { de: "sich bedanken", tr: "teşekkür etmek" },
    ],
    patterns: [
      { de: "Das steht dir gut!", tr: "bir şeyin ona yakıştığını söyler" },
      { de: "Das schmeckt mir sehr gut.", tr: "yemeği beğendiğini söyler" },
      { de: "Es gefällt uns sehr.", tr: "hoşunuza gittiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün iltifat edeceğiz. Bunun bir grup fiili var ve hepsi aynı tuhaflığı paylaşıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Tuhaflık şu: bu fiillerde beğenen kişi özne değil. Özne beğenilen şey oluyor, kişi ise 'bana, sana' biçimine giriyor. Türkçede de aslında böyle diyoruz: 'hoşuma gitti'. Yani mantık sana yabancı değil, sadece Almancada bu grup daha kalabalık. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Kompliment"),
          tr("Türkçesi 'iltifat' demek. Lütfen"),
          de("das Kompliment"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kompliment" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Frisur"),
          tr("Türkçesi 'saç modeli' demek. Lütfen"),
          de("die Frisur"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Frisur" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Geschmack"),
          tr("Türkçesi 'zevk' demek; hem damak zevki hem beğeni için kullanılır. Lütfen"),
          de("der Geschmack"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Geschmack" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ehrlich"),
          tr("Türkçesi 'samimi, dürüst' demek. Lütfen"),
          de("ehrlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ehrlich" },
      },
      {
        say: [
          tr("Son kelimemiz iki parçadan oluşuyor:"),
          de("sich bedanken"),
          tr("Türkçesi 'teşekkür etmek' demek. Lütfen"),
          de("sich bedanken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich bedanken" },
      },
      {
        say: [
          tr("İltifatın işe yaramasının tek şartı var:"),
          de("Ein Kompliment muss ehrlich sein."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız kıyafet ve görünüş için:"),
          de("Das steht dir gut!"),
          tr(
            "Kelime kelime 'bu sana iyi duruyor' demek. Özne kıyafet, kişi ise 'sana' biçiminde.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das steht dir gut"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das steht dir gut" },
      },
      {
        say: [tr("Sıra sende: 'Saç modelin sana çok yakışmış.' Kısaca: 'Saç modeli sana yakışıyor.'")],
        expect: {
          kind: "produce",
          target: "Die Frisur steht dir gut",
          hint: [
            tr("Özne saç modeli, kişi ise 'sana' biçiminde:"),
            de("Die Frisur steht dir gut."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sofrada:"),
          de("Das schmeckt mir sehr gut."),
          tr("Ev sahibine söyleyeceğin en değerli cümle bu. Aynı yapı:"),
          de("Das gefällt mir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das schmeckt mir sehr gut"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das schmeckt mir sehr gut" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bu çok hoşuma gitti.'")],
        expect: {
          kind: "produce",
          target: "Das gefällt mir sehr",
          hint: [
            tr("Beğenen kişi 'bana' biçiminde kalır, beğenilen şey özne olur:"),
            de("Das gefällt mir sehr."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp çoğul için:"),
          de("Es gefällt uns sehr."),
          tr("Yani 'Çok hoşumuza gitti.' Zamir kişiye göre değişiyor ama yapı hiç değişmiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es gefällt uns sehr"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es gefällt uns sehr" },
      },
      {
        say: [
          tr("İltifat aldığında da hazır ol:"),
          de("Danke, das ist lieb von dir."),
          tr("Almanlar iltifatı geçiştirmez, kısaca teşekkür eder."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das steht dich gut."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das steht dich gut.",
          answer: false,
          why: [
            tr("Yanlış. Bu fiilde kişi nesne değil, 'sana' biçiminde olmalı. Doğrusu:"),
            de("Das steht dir gut."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık iltifat edebilir ve alabilirsin. Şimdi bir arkadaşının yeni evine ilk kez gidiyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşının yeni evine ilk kez gidiyorsun. Eve, ikram ettiklerine ve görünüşüne dair iltifat et; onun sorularına da içtenlikle cevap ver.",
      partner: "iltifat almaya alışkın olmayan, biraz mahcup bir arkadaş",
      opening: "Komm rein! Und, wie gefällt dir die Wohnung?",
      openingTr: "İçeri gel! Ee, ev nasıl, beğendin mi?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-streit",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Es tut mir leid",
    titleTr: "Özür ve barışma",
    summary:
      "Özür dilemeyi, niyetini açıklamayı ve barışmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "sich entschuldigen", tr: "özür dilemek" },
      { de: "sich versöhnen", tr: "barışmak" },
      { de: "absichtlich", tr: "kasten" },
      { de: "versprechen", tr: "söz vermek" },
      { de: "das Missverständnis", tr: "yanlış anlama" },
    ],
    patterns: [
      { de: "Es tut mir leid, dass …", tr: "neye üzüldüğünü söyler" },
      { de: "Ich wollte das nicht.", tr: "kasten yapmadığını söyler" },
      { de: "Schon okay.", tr: "'sorun değil' demek" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün zor ama gerekli bir konu: özür dilemek. Üç cümleyle bir tartışmayı kapatabilirsin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İyi bir özrün üç parçası var: neye üzüldüğünü söylemek, niyetinin ne olduğunu açıklamak ve söz vermek. Birincisi için yine yan cümle lazım; fiil yine sona gidiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz iki parçadan oluşuyor:"),
          de("sich entschuldigen"),
          tr("Türkçesi 'özür dilemek' demek. Lütfen"),
          de("sich entschuldigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich entschuldigen" },
      },
      {
        say: [
          tr("İkinci kelimemiz de öyle:"),
          de("sich versöhnen"),
          tr("Türkçesi 'barışmak' demek. Lütfen"),
          de("sich versöhnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich versöhnen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("absichtlich"),
          tr("Türkçesi 'kasten, bilerek' demek. Lütfen"),
          de("absichtlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "absichtlich" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("versprechen"),
          tr("Türkçesi 'söz vermek' demek. Lütfen"),
          de("versprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "versprechen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Missverständnis"),
          tr("Türkçesi 'yanlış anlama' demek. Lütfen"),
          de("das Missverständnis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Missverständnis" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Es tut mir leid, dass ich das gesagt habe."),
          tr(
            "Yan cümlede geçmiş zaman var ve iki parçası da sonda: önce ortaç, sonra yardımcı fiil. Sıra ana cümlenin tam tersi.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es tut mir leid, dass ich das gesagt habe"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es tut mir leid, dass ich das gesagt habe" },
      },
      {
        say: [tr("Sıra sende: 'Geç kaldığım için özür dilerim.' Kısaca: 'Üzgünüm, geç kaldım.'")],
        expect: {
          kind: "produce",
          target: "Es tut mir leid, dass ich zu spät bin",
          hint: [
            tr("Yan cümlede fiil en sona gider:"),
            de("Es tut mir leid, dass ich zu spät bin."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız niyeti açıklar:"),
          de("Ich wollte das nicht."),
          tr("Kip fiilinin tek parça geçmişi; Perfekt kurmana gerek yok. Devamı da hazır:"),
          de("Das war ein Missverständnis."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich wollte das nicht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich wollte das nicht" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bunu bilerek yapmadım.'")],
        expect: {
          kind: "produce",
          target: "Ich habe das nicht absichtlich gemacht",
          hint: [
            tr("Olumsuzluk niteleyen kelimenin önüne, ortaç ise en sona gider:"),
            de("Ich habe das nicht absichtlich gemacht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp karşı taraftan gelir:"),
          de("Schon okay."),
          tr("Yani 'Boş ver, tamam.' Bunu duyduğunda mesele kapanmış demektir. Sen de sözünü verirsin:"),
          de("Ich verspreche dir, dass das nicht wieder passiert."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Schon okay"), tr("deyin.")],
        expect: { kind: "repeat", target: "Schon okay" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich konnte das nicht."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich konnte das nicht.",
          answer: true,
          why: [
            tr("Doğru. Kip fiilinin geçmişi tek parçadır; ortaç aramaya gerek yok ve olumsuzluk cümlenin sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir tartışmayı kapatabilirsin. Şimdi dün bir arkadaşınla tartıştın ve onu arıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Dün bir arkadaşınla tartıştın ve bugün onu arayıp özür diliyorsun. Neye üzüldüğünü söyle, niyetini açıkla ve barışmayı teklif et.",
      partner: "hâlâ biraz kırgın ama barışmaya açık bir arkadaş",
      opening: "Ich bin immer noch sauer. Warum hast du das gesagt?",
      openingTr: "Hâlâ kırgınım. Niye öyle dedin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-fernbeziehung",
    icon: "family",
    level: "A2",
    course: "de",
    title: "Meine Familie ist weit weg",
    titleTr: "Özlem",
    summary:
      "Özlemi anlatmayı ve yan cümle başa geçtiğinde ana cümlenin nasıl değiştiğini öğretir.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "vermissen", tr: "özlemek" },
      { de: "sich freuen", tr: "sevinmek" },
      { de: "der Videoanruf", tr: "görüntülü arama" },
      { de: "selten", tr: "nadiren" },
      { de: "das Heimweh", tr: "memleket özlemi" },
    ],
    patterns: [
      { de: "Wenn ich sie vermisse, rufe ich an.", tr: "özlediğinde ne yaptığını söyler" },
      { de: "Wir telefonieren jeden Sonntag.", tr: "ne sıklıkta konuştuğunuzu söyler" },
      { de: "Ich freue mich auf das Wochenende.", tr: "bir şeyi iple çektiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün ailesi uzakta olan herkesin cümlelerini kuracağız. Bir de yan cümle kuralının ikinci yarısını öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Şimdiye kadar yan cümle hep sondaydı. Ama onu başa da alabilirsin ve o zaman ilginç bir şey oluyor: yan cümlenin tamamı tek bir öğe sayılıyor, bu yüzden ana cümlede fiil hemen virgülden sonra geliyor ve özne fiilin arkasına düşüyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("vermissen"),
          tr("Türkçesi 'özlemek' demek. Lütfen"),
          de("vermissen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vermissen" },
      },
      {
        say: [
          tr("İkinci kelimemiz iki parçadan oluşuyor:"),
          de("sich freuen"),
          tr("Türkçesi 'sevinmek' demek. Lütfen"),
          de("sich freuen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich freuen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Videoanruf"),
          tr("Türkçesi 'görüntülü arama' demek. Lütfen"),
          de("der Videoanruf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Videoanruf" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("selten"),
          tr("Türkçesi 'nadiren' demek. Lütfen"),
          de("selten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "selten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Heimweh"),
          tr("Türkçesi 'memleket özlemi' demek. Lütfen"),
          de("das Heimweh"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Heimweh" },
      },
      {
        say: [
          tr("Uzak yaşamanın özeti şu cümle:"),
          de("Wir sehen uns leider selten."),
        ],
      },
      {
        say: [
          tr("Önce yan cümle sonda dursun:"),
          de("Ich rufe an, wenn ich sie vermisse."),
          tr("Şimdi başa alalım:"),
          de("Wenn ich sie vermisse, rufe ich an."),
          tr("Duydun mu? İkincisinde fiil öne, özne arkaya geçti."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wenn ich sie vermisse, rufe ich an"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wenn ich sie vermisse, rufe ich an" },
      },
      {
        say: [tr("Sıra sende: 'Vaktim olduğunda arıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wenn ich Zeit habe, rufe ich an",
          hint: [
            tr("Yan cümlede fiil sonda; virgülden sonra önce fiil, sonra özne gelir:"),
            de("Wenn ich Zeit habe, rufe ich an."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sıklığı söyler:"),
          de("Wir telefonieren jeden Sonntag."),
          tr("Görüntülü konuşuyorsanız:"),
          de("Wir machen einen Videoanruf."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wir telefonieren jeden Sonntag"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wir telefonieren jeden Sonntag" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız umudu anlatır:"),
          de("Ich freue mich auf das Wochenende."),
          tr(
            "Bu fiil hem küçük zamirini hem de arkasındaki edatı zorunlu alıyor. Üçünü birlikte ezberle, parçalamaya çalışma.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich freue mich auf das Wochenende"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich freue mich auf das Wochenende" },
      },
      {
        say: [
          tr("Duygunun adını da koyabilirsin:"),
          de("Manchmal habe ich Heimweh."),
          tr("Yani 'Bazen memleket özlemi çekiyorum.'"),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Ailemi çok özlüyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich vermisse meine Familie sehr",
          hint: [
            tr("Bu fiil doğrudan nesne alır, araya edat girmez:"),
            de("Ich vermisse meine Familie sehr."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich sie vermisse, ich rufe an."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich sie vermisse, ich rufe an.",
          answer: false,
          why: [
            tr("Yanlış. Yan cümle başa geçtiğinde ana cümlede fiil hemen virgülden sonra gelmeli, özne de fiilin arkasına düşmeli. Doğrusu:"),
            de("Wenn ich sie vermisse, rufe ich an."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık özlemini anlatabilirsin. Şimdi bir arkadaşınla oturuyorsun ve o senin dalgın olduğunu fark etti.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla oturuyorsun ve ailenin uzakta olmasından söz açılıyor. Ne zaman özlediğini, nasıl görüştüğünüzü ve neyi iple çektiğini anlat.",
      partner: "kendi ailesi de uzakta olan, seni iyi anlayan bir arkadaş",
      opening: "Du siehst traurig aus. Vermisst du deine Familie?",
      openingTr: "Üzgün görünüyorsun. Aileni mi özledin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-neujahr",
    icon: "party",
    level: "A2",
    course: "de",
    title: "Gute Vorsätze",
    titleTr: "Yılbaşı kararları",
    summary:
      "Yeni yıl kararlarını anlatmayı ve niyetini kip fiiliyle kurmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-wollen",
    vocab: [
      { de: "der Vorsatz", tr: "karar" },
      { de: "durchhalten", tr: "sürdürmek" },
      { de: "das Feuerwerk", tr: "havai fişek" },
      { de: "sich vornehmen", tr: "kendine hedef koymak" },
      { de: "die Mitternacht", tr: "gece yarısı" },
    ],
    patterns: [
      { de: "Nächstes Jahr will ich …", tr: "gelecek yıl ne yapmak istediğini söyler" },
      { de: "Ich höre auf zu rauchen.", tr: "bir şeyi bırakacağını söyler" },
      { de: "Frohes neues Jahr!", tr: "yeni yılı kutlarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bu modülün son dersindeyiz ve yılın da son gecesindeyiz. Kararlarını anlatmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Niyet bildiren kip fiilini biliyorsun. Bugün onu zaman ifadesiyle birlikte kullanacağız; zaman başa geçince fiilin hemen arkasına geldiğini de hatırlıyorsun. Bir de küçük bir yeni yapı var: bir şeyi bırakmayı anlatan kalıp. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Vorsatz"),
          tr("Türkçesi 'karar, niyet' demek. Lütfen"),
          de("der Vorsatz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vorsatz" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("durchhalten"),
          tr("Türkçesi 'sürdürmek, pes etmemek' demek. Lütfen"),
          de("durchhalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "durchhalten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Feuerwerk"),
          tr("Türkçesi 'havai fişek' demek. Lütfen"),
          de("das Feuerwerk"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Feuerwerk" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz iki parçadan oluşuyor:"),
          de("sich vornehmen"),
          tr("Türkçesi 'kendine hedef koymak' demek. Lütfen"),
          de("sich vornehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich vornehmen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Mitternacht"),
          tr("Türkçesi 'gece yarısı' demek. Lütfen"),
          de("die Mitternacht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mitternacht" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Nächstes Jahr will ich mehr lesen."),
          tr(
            "Zaman ifadesi başta, kip fiili hemen arkasında, özne üçüncü sırada, asıl fiil ise en sonda. Dört kural tek cümlede.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Nächstes Jahr will ich mehr lesen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Nächstes Jahr will ich mehr lesen" },
      },
      {
        say: [tr("Sıra sende: 'Gelecek yıl daha çok spor yapmak istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Nächstes Jahr will ich mehr Sport machen",
          hint: [
            tr("Zaman başta, kip fiili arkasında, asıl fiil en sonda:"),
            de("Nächstes Jahr will ich mehr Sport machen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bırakmayı anlatır:"),
          de("Ich höre auf zu rauchen."),
          tr(
            "Burada asıl fiilin önüne küçük bir kelime geliyor. Kip fiilinden sonra bu kelime gelmiyordu; bu fiilden sonra ise geliyor. İkisini karıştırma.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich höre auf zu rauchen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich höre auf zu rauchen" },
      },
      {
        say: [
          tr("Kararını tutmak da bir mesele:"),
          de("Ich nehme mir das jedes Jahr vor."),
          tr("ama"),
          de("Ich halte es nie durch."),
          tr("Almanlar bu şakayı her ocak ayında yapar."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Bu kararı sürdürmek istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich will diesen Vorsatz durchhalten",
          hint: [
            tr("Kip fiili ikinci sırada, nesne ortada, asıl fiil en sonda:"),
            de("Ich will diesen Vorsatz durchhalten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız gece yarısı söylenir:"),
          de("Frohes neues Jahr!"),
          tr("Gece yarısından önce ise şöyle denir:"),
          de("Guten Rutsch!"),
          tr("Kelime kelime 'iyi kaymalar' demek; yeni yıla rahat geç anlamında."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Frohes neues Jahr"), tr("deyin.")],
        expect: { kind: "repeat", target: "Frohes neues Jahr" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Nächstes Jahr will ich weniger arbeiten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Nächstes Jahr will ich weniger arbeiten.",
          answer: true,
          why: [
            tr("Doğru. Zaman ifadesi başa geçmiş, kip fiili hemen arkasına gelmiş, özne üçüncü sıraya düşmüş ve asıl fiil sonda kalmış."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu modülü bitirdin: artık davet edebiliyor, hediye seçebiliyor, iltifat edebiliyor, özür dileyebiliyor ve gelecek yıl için söz verebiliyorsun. Şimdi yılbaşı gecesi, gece yarısına on dakika var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yılbaşı gecesi bir arkadaşınla balkondasın ve gece yarısına az kaldı. Gelecek yıl için kararlarını anlat, onunkileri sor ve gece yarısında kutlayın.",
      partner: "her yıl aynı kararı verip hiç tutmayan neşeli bir arkadaş",
      opening: "Noch zehn Minuten bis Mitternacht! Was ist dein Vorsatz?",
      openingTr: "Gece yarısına on dakika kaldı! Senin kararın ne?",
      minTurns: 4,
    },
  },
];

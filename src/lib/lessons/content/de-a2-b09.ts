import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 9 — Medya ve teknoloji (konular 081-090).
 *
 * Modülün asıl konusu ekran değil, YAN CÜMLE. `wenn` bağlacı burada dört
 * derse yayılıyor ve her seferinde başka bir yüzüyle geliyor: kuralın kendisi
 * (081), yan cümlenin arkaya alınmış hâli (082), kip fiiliyle birlikte (084)
 * ve resmî bir sahnede (089). Türkçeyle karşıtlık modülün omurgası: bizde
 * koşul fiile yapışan bir ektir ve fiil zaten sondadır, o yüzden hiçbir şey
 * yer değiştirmez; Almancada bağlaç fiili sona iter ve ana cümlenin sırasını
 * bozar.
 *
 * Sözlükçe havuzun A2 katmanından geliyor. 081 bilerek sıklık ve belirsizlik
 * zarflarına ayrıldı (meistens, ein paar, manche, gelegentlich, irgendwie,
 * tagsüber): koşul cümlesi bir alışkanlık anlatır ve alışkanlığın dili bu
 * kelimelerdir. Bağlacın kendisi de sözlükçede — havuzda A2 madde başı.
 */
export const deA2B09: Lesson[] = [
  {
    id: "de-a2-wenn",
    icon: "calendar",
    level: "A2",
    course: "de",
    title: "Wenn ich Zeit habe",
    titleTr: "Koşul: wenn",
    summary: "Koşul cümlesini ve alışkanlık anlatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "wenn", tr: "eğer, -diğinde" },
      { de: "meistens", tr: "çoğunlukla" },
      { de: "sonst", tr: "yoksa" },
      { de: "ein paar", tr: "birkaç" },
      { de: "gelegentlich", tr: "ara sıra" },
      { de: "irgendwie", tr: "bir şekilde" },
      { de: "tagsüber", tr: "gündüzleri" },
      { de: "manche", tr: "bazı" },
    ],
    patterns: [
      { de: "Wenn ich Zeit habe, lese ich.", tr: "koşulu sonuca bağlar" },
      { de: "Meistens bin ich tagsüber nicht zu Hause.", tr: "alışkanlığını anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün koşul cümlesini öğreniyoruz. Bu bağlaç hem 'eğer' hem de 'her seferinde' anlamına gelebiliyor ve ikisini de aynı yapıyla söylüyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural iki parçalı. Birincisi: yan cümlede fiil en sona gider. İkincisi: yan cümle başta olursa ana cümlede özne fiilin arkasına düşer. Türkçede koşul fiile yapışan bir ektir ve fiil zaten sondadır, o yüzden bizde hiçbir şey yer değiştirmez. Almancada iki şey birden değişir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("wenn"),
          tr("Türkçesi 'eğer' ya da 'bir şey olduğunda' demek. Lütfen"),
          de("wenn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wenn" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("meistens"),
          tr("Türkçesi 'çoğunlukla' demek. Lütfen"),
          de("meistens"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "meistens" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sonst"),
          tr("Türkçesi 'yoksa, aksi hâlde' demek. Lütfen"),
          de("sonst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sonst" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ein paar"),
          tr("Türkçesi 'birkaç' demek; iki kelimelik bir kalıp. Lütfen"),
          de("ein paar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ein paar" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("gelegentlich"),
          tr("Türkçesi 'ara sıra' demek. Lütfen"),
          de("gelegentlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gelegentlich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("irgendwie"),
          tr("Türkçesi 'bir şekilde' demek. Lütfen"),
          de("irgendwie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "irgendwie" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("tagsüber"),
          tr("Türkçesi 'gündüzleri' demek. Lütfen"),
          de("tagsüber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tagsüber" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("manche"),
          tr("Türkçesi 'bazı' demek. Lütfen"),
          de("manche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "manche" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn ich Zeit habe, lese ich."),
          tr(
            "Yan cümlede fiil en sonda; virgülden sonra ana cümle fiille başlıyor ve özne onun arkasına düşüyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yağmur yağarsa evde kalıyoruz.' Almancası:"),
          de("Wenn es regnet, bleiben wir zu Hause."),
          tr("Lütfen"),
          de("Wenn es regnet, bleiben wir zu Hause"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wenn es regnet, bleiben wir zu Hause" },
      },
      {
        say: [tr("Sıra sende: 'Vaktim olduğunda ara sıra yüzmeye gidiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wenn ich Zeit habe, gehe ich gelegentlich schwimmen",
          hint: [
            tr("Yan cümlede fiil sonda, ana cümlede fiil hemen virgülden sonra:"),
            de("Wenn ich Zeit habe, gehe ich gelegentlich schwimmen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız alışkanlık anlatıyor:"),
          de("Meistens bin ich tagsüber nicht zu Hause."),
          tr("Sıklık zarfı başa geçince özne yine fiilin arkasına düşüyor; aynı kural, başka bir sebeple."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Acele et, yoksa geç kalacağız.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Beeil dich, sonst kommen wir zu spät",
          hint: [
            tr("Bu bağlaç ikinci cümlenin başında durur ve özne fiilin arkasına düşer:"),
            de("Beeil dich, sonst kommen wir zu spät."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich Zeit habe, ich lese."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich Zeit habe, ich lese.",
          answer: false,
          why: [
            tr("Yan cümle başta olunca ana cümlede fiil hemen virgülden sonra gelir. Doğrusu:"),
            de("Wenn ich Zeit habe, lese ich."),
          ],
        },
      },
      {
        say: [tr("Şimdi boş vaktinde ne yaptığını anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın boş vaktinde neler yaptığını soruyor. Alışkanlıklarını koşul cümleleriyle anlat: hava güzelse ne, vaktin varsa ne yapıyorsun.",
      partner: "senin gibi az boş vakti olan bir arkadaş",
      opening: "Was machst du eigentlich, wenn du mal frei hast?",
      openingTr: "Boş vaktin olduğunda ne yapıyorsun?",
      goal: "En az iki alışkanlık koşul cümlesiyle anlatılmış ve arkadaşın da kendi alışkanlığını söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-serien",
    icon: "media",
    level: "A2",
    course: "de",
    title: "Welche Serie schaust du?",
    titleTr: "Diziler",
    summary: "Dizi ve program önermeyi, beğeniyi anlatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "der Krimi", tr: "polisiye" },
      { de: "die Fernsehsendung", tr: "televizyon programı" },
      { de: "total", tr: "tamamen" },
      { de: "der Star", tr: "ünlü" },
      { de: "der Titel", tr: "başlık" },
      { de: "umschalten", tr: "kanal değiştirmek" },
      { de: "anschauen", tr: "izlemek" },
      { de: "der Fan", tr: "hayran" },
    ],
    patterns: [
      { de: "Ich schaue Krimis, wenn ich müde bin.", tr: "yan cümleyi arkaya alır" },
      { de: "Wie heißt der Titel?", tr: "adını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün dizi ve program konuşuyoruz. Koşul cümlesinin ikinci hâlini göreceğiz: yan cümle arkada durduğunda ne oluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçen ders yan cümle baştaydı ve ana cümlenin sırası bozuluyordu. Yan cümle arkaya alınırsa ana cümle hiç değişmez; yalnız yan cümlenin kendi fiili sonda kalır. Yani sıra kayması yan cümlenin yerine bağlı. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Krimi"),
          tr("Türkçesi 'polisiye' demek; dizi, film ya da kitap için. Lütfen"),
          de("der Krimi"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Krimi" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Fernsehsendung"),
          tr("Türkçesi 'televizyon programı' demek. Lütfen"),
          de("die Fernsehsendung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Fernsehsendung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("total"),
          tr("Türkçesi 'tamamen, resmen' demek; günlük konuşmada çok kullanılır. Lütfen"),
          de("total"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "total" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Star"),
          tr("Türkçesi 'ünlü' demek. Lütfen"),
          de("der Star"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Star" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Titel"),
          tr("Türkçesi 'başlık, ad' demek. Lütfen"),
          de("der Titel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Titel" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("umschalten"),
          tr("Türkçesi 'kanal değiştirmek' demek. Lütfen"),
          de("umschalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umschalten" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("anschauen"),
          tr("Türkçesi 'izlemek, bakmak' demek. Lütfen"),
          de("anschauen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anschauen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Fan"),
          tr("Türkçesi 'hayran' demek. Lütfen"),
          de("der Fan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Fan" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich schaue Krimis, wenn ich müde bin."),
          tr(
            "Yan cümle arkada, o yüzden ana cümle hiç değişmedi; yalnız yan cümlenin fiili sonda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu akşam eski bir film izliyoruz.' Almancası:"),
          de("Heute Abend schauen wir einen alten Film an."),
          tr("Lütfen"),
          de("Heute Abend schauen wir einen alten Film an"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Heute Abend schauen wir einen alten Film an" },
      },
      {
        say: [tr("Sıra sende: 'Yorgun olduğumda polisiye izliyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich schaue Krimis, wenn ich müde bin",
          hint: [
            tr("Yan cümle arkada olduğu için ana cümle bozulmaz, yan cümlenin fiili sonda kalır:"),
            de("Ich schaue Krimis, wenn ich müde bin."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wie heißt der Titel?"),
          tr("Bir şeyin adını sormanın yolu; soru kelimesi başta, fiil ikinci sırada."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Lütfen başka bir kanala geç.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Bitte schalte auf einen anderen Sender um",
          hint: [
            tr("Emirde fiil başa geçer ve ayrılabilen ön ek cümlenin sonuna düşer:"),
            de("Bitte schalte auf einen anderen Sender um."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich schaue Krimis, wenn ich bin müde."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich schaue Krimis, wenn ich bin müde.",
          answer: false,
          why: [
            tr("Yan cümle arkada da olsa kendi fiili en sona gider. Doğrusu:"),
            de("Ich schaue Krimis, wenn ich müde bin."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir arkadaşına dizi öneriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın izleyecek bir şey arıyor. Ona bir dizi öner, konusunu kısaca anlat ve ne zaman izlemeyi sevdiğini söyle.",
      partner: "her akşam bir şey izleyen ama seçemeyen bir arkadaş",
      opening: "Ich finde einfach nichts zum Anschauen. Hast du eine Empfehlung?",
      openingTr: "İzleyecek hiçbir şey bulamıyorum. Bir önerin var mı?",
      goal: "Bir dizi önerilmiş, konusu anlatılmış ve arkadaşın izleyip izlemeyeceğine karar vermiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-nachrichten",
    icon: "media",
    level: "A2",
    course: "de",
    title: "Hast du das gehört?",
    titleTr: "Haberler",
    summary: "Bir haberi aktarmayı ve doğruluğunu sorgulamayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "der Zeitungsartikel", tr: "gazete yazısı" },
      { de: "die Zeitschrift", tr: "dergi" },
      { de: "der Radiosender", tr: "radyo istasyonu" },
      { de: "die Lüge", tr: "yalan" },
      { de: "wahrscheinlich", tr: "muhtemelen" },
      { de: "misstrauisch", tr: "kuşkucu" },
      { de: "mitbekommen", tr: "fark etmek" },
      { de: "herausfinden", tr: "öğrenmek" },
    ],
    patterns: [
      { de: "Ich habe gehört, dass die Preise steigen.", tr: "duyduğu bir haberi aktarır" },
      { de: "Stimmt das wirklich?", tr: "haberin doğruluğunu sorgular" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün haber aktarıyoruz. Duyduğun bir şeyi söylerken yan cümle kuruluyor ve kaynağını belirtmek önem kazanıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Haber aktarırken iki şey birden söylenir: kimden duyduğun ve ne duyduğun. İkincisi yan cümleyle gelir ve fiil sona gider. Bir haberi sorgularken de kısa bir kalıp kullanılır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Zeitungsartikel"),
          tr("Türkçesi 'gazete yazısı' demek. Lütfen"),
          de("der Zeitungsartikel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zeitungsartikel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Zeitschrift"),
          tr("Türkçesi 'dergi' demek. Lütfen"),
          de("die Zeitschrift"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zeitschrift" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Radiosender"),
          tr("Türkçesi 'radyo istasyonu' demek. Lütfen"),
          de("der Radiosender"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Radiosender" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Lüge"),
          tr("Türkçesi 'yalan' demek. Lütfen"),
          de("die Lüge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Lüge" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("wahrscheinlich"),
          tr("Türkçesi 'muhtemelen' demek. Lütfen"),
          de("wahrscheinlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wahrscheinlich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("misstrauisch"),
          tr("Türkçesi 'kuşkucu, güvenmeyen' demek. Lütfen"),
          de("misstrauisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "misstrauisch" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("mitbekommen"),
          tr("Türkçesi 'fark etmek, duymuş olmak' demek. Lütfen"),
          de("mitbekommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mitbekommen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("herausfinden"),
          tr("Türkçesi 'öğrenmek, araştırıp bulmak' demek. Lütfen"),
          de("herausfinden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "herausfinden" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe gehört, dass die Preise steigen."),
          tr("Ana cümlede geçmiş zaman, yan cümlede şimdiki zaman ve fiil en sonda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu hatayı hiç fark etmedim.' Almancası:"),
          de("Ich habe den Fehler gar nicht mitbekommen."),
          tr("Lütfen"),
          de("Ich habe den Fehler gar nicht mitbekommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe den Fehler gar nicht mitbekommen" },
      },
      {
        say: [tr("Sıra sende: 'Tamirin ne kadar tuttuğunu öğrenmek istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich will herausfinden, wie viel die Reparatur kostet",
          hint: [
            tr("Soru kelimesiyle açılan yan cümlede de fiil en sona gider:"),
            de("Ich will herausfinden, wie viel die Reparatur kostet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız haberi sorguluyor:"),
          de("Stimmt das wirklich?"),
          tr("Fiil başta olduğu için soru; iki kelimelik bir doğrulama sorusu."),
        ],
      },
      {
        say: [tr("Sıra sende: 'O muhtemelen daha geç gelecek.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Er kommt wahrscheinlich später",
          hint: [
            tr("Bu zarf fiilden sonra durur ve gelecek şimdiki zamanla söylenir:"),
            de("Er kommt wahrscheinlich später."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe gehört, dass die Preise steigen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe gehört, dass die Preise steigen.",
          answer: true,
          why: [
            tr("Ana cümlede ortaç sonda, yan cümlede fiil en sonda: iki kural da yerinde."),
          ],
        },
      },
      {
        say: [tr("Şimdi duyduğun bir haberi aktarıyorsun ve doğruluğunu tartışıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Bir haber duydun ve bir arkadaşına anlatıyorsun. Nereden duyduğunu söyle, o şüpheyle karşılasın ve birlikte doğruluğunu tartışın.",
      partner: "duyduğu her habere şüpheyle yaklaşan bir arkadaş",
      opening: "Sag mal, hast du das auch gehört? Stimmt das wirklich?",
      openingTr: "Söylesene, sen de duydun mu? Bu gerçekten doğru mu?",
      goal: "Haber aktarılmış, kaynağı söylenmiş, şüphe dile getirilmiş ve nasıl doğrulanacağına karar verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-social-media",
    icon: "tech",
    level: "A2",
    course: "de",
    title: "Zu viel am Handy",
    titleTr: "Ekran süresi",
    summary: "Sosyal medya alışkanlıklarını anlatmayı ve koşula bağlamayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "die App", tr: "uygulama" },
      { de: "posten", tr: "paylaşım yapmak" },
      { de: "liken", tr: "beğenmek" },
      { de: "das Profil", tr: "profil" },
      { de: "echt", tr: "gerçek" },
      { de: "der Chat", tr: "sohbet" },
      { de: "das Selfie", tr: "özçekim" },
      { de: "online", tr: "çevrimiçi" },
    ],
    patterns: [
      { de: "Wenn ich Langeweile habe, schaue ich aufs Handy.", tr: "alışkanlığı koşula bağlar" },
      { de: "Ich bin heute Abend wieder online.", tr: "ne zaman çevrimiçi olacağını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ekran süresini konuşuyoruz. Koşul cümlesi burada bir alışkanlığın nedenini anlatmak için kullanılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü fiillerin üçü İngilizceden gelmiş ve Almanca çekime girmiş: sonlarına Almanca ekler alıyorlar ve ortaçları da Almanca kuralına göre kuruluyor. Bu, dilin yeni kelimeleri nasıl içine aldığını gösteren iyi bir örnek. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die App"),
          tr("Türkçesi 'uygulama' demek. Lütfen"),
          de("die App"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die App" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("posten"),
          tr("Türkçesi 'paylaşım yapmak' demek. Lütfen"),
          de("posten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "posten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("liken"),
          tr("Türkçesi 'beğenmek' demek. Lütfen"),
          de("liken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "liken" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Profil"),
          tr("Türkçesi 'profil' demek. Lütfen"),
          de("das Profil"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Profil" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("echt"),
          tr("Türkçesi 'gerçek' demek; günlük dilde 'cidden' anlamında da kullanılır. Lütfen"),
          de("echt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "echt" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Chat"),
          tr("Türkçesi 'sohbet, yazışma' demek. Lütfen"),
          de("der Chat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Chat" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Selfie"),
          tr("Türkçesi 'özçekim' demek. Lütfen"),
          de("das Selfie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Selfie" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("online"),
          tr("Türkçesi 'çevrimiçi' demek. Lütfen"),
          de("online"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "online" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn ich Langeweile habe, schaue ich aufs Handy."),
          tr("Yan cümle başta olduğu için ana cümlede özne fiilin arkasına düşüyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kız kardeşim her gün bir fotoğraf paylaşıyor.' Almancası:"),
          de("Meine Schwester postet jeden Tag ein Foto."),
          tr("Lütfen"),
          de("Meine Schwester postet jeden Tag ein Foto"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Meine Schwester postet jeden Tag ein Foto" },
      },
      {
        say: [tr("Sıra sende: 'Müzenin önünde bir özçekim yaptık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben vor dem Museum ein Selfie gemacht",
          hint: [
            tr("Yer bildiren edat yönelme hâlini getirir ve ortaç sona gider:"),
            de("Wir haben vor dem Museum ein Selfie gemacht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich bin heute Abend wieder online."),
          tr("Sıfat yüklem olarak duruyor ve hiç ek almıyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kardeşim bütün fotoğraflarımı hemen beğeniyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Bruder likt alle meine Bilder sofort",
          hint: [
            tr("Yeni fiil de Almanca çekimini alır ve nesne belirtme hâlinde durur:"),
            de("Mein Bruder likt alle meine Bilder sofort."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich Langeweile habe, ich schaue aufs Handy."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich Langeweile habe, ich schaue aufs Handy.",
          answer: false,
          why: [
            tr("Yan cümle başta olunca ana cümlede fiil hemen virgülden sonra gelir. Doğrusu:"),
            de("Wenn ich Langeweile habe, schaue ich aufs Handy."),
          ],
        },
      },
      {
        say: [tr("Şimdi telefonda ne kadar vakit geçirdiğini konuşuyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla telefonda ne kadar vakit geçirdiğinizi konuşuyorsunuz. Hangi uygulamayı ne zaman kullandığını anlat ve bunu azaltmak isteyip istemediğini söyle.",
      partner: "telefonunu hiç bırakmayan bir arkadaş",
      opening: "Guck mal, meine Bildschirmzeit — sechs Stunden. Wie viel ist es bei dir?",
      openingTr: "Bak, ekran sürem altı saat. Sende ne kadar?",
      goal: "Kullanım alışkanlığı koşul cümleleriyle anlatılmış ve azaltma konusunda bir görüş belirtilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-warten-auf",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Ich warte auf deine Antwort",
    titleTr: "Edatlı fiiller",
    summary: "Belirli bir edat isteyen fiilleri ve beklemeyi anlatmayı öğretir.",
    minutes: 10,
    focusId: "Verben-mit-Präpositionen",
    vocab: [
      { de: "ungeduldig", tr: "sabırsız" },
      { de: "geduldig", tr: "sabırlı" },
      { de: "andauernd", tr: "sürekli" },
      { de: "sich absprechen", tr: "sözleşmek" },
      { de: "anstehen", tr: "kuyrukta beklemek" },
      { de: "erneut", tr: "yeniden" },
      { de: "beantworten", tr: "cevaplamak" },
      { de: "nerven", tr: "sinir etmek" },
    ],
    patterns: [
      { de: "Ich warte auf deine Antwort.", tr: "beklediğini edatla söyler" },
      { de: "Können Sie meine Frage bitte beantworten?", tr: "cevap ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bazı fiillerin yanında hep aynı edatın durduğunu öğreniyoruz. Bu edatlar seçilmez, fiile aittir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Beklemek fiili Almancada hep aynı edatı alır ve o edat belirtme hâlini getirir. Türkçede 'cevabını bekliyorum' derken hiçbir edat kullanmayız; Almancada o edat olmadan cümle kurulamaz ve hangisi olduğu fiille birlikte ezberlenir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ungeduldig"),
          tr("Türkçesi 'sabırsız' demek. Lütfen"),
          de("ungeduldig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ungeduldig" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("geduldig"),
          tr("Türkçesi 'sabırlı' demek. Lütfen"),
          de("geduldig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geduldig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("andauernd"),
          tr("Türkçesi 'sürekli, durmadan' demek. Lütfen"),
          de("andauernd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "andauernd" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sich absprechen"),
          tr("Türkçesi 'sözleşmek, aralarında kararlaştırmak' demek. Lütfen"),
          de("sich absprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich absprechen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("anstehen"),
          tr("Türkçesi 'kuyrukta beklemek' demek. Lütfen"),
          de("anstehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anstehen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("erneut"),
          tr("Türkçesi 'yeniden, bir kez daha' demek. Lütfen"),
          de("erneut"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erneut" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("beantworten"),
          tr("Türkçesi 'cevaplamak' demek. Lütfen"),
          de("beantworten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beantworten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("nerven"),
          tr("Türkçesi 'sinir etmek' demek. Lütfen"),
          de("nerven"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nerven" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich warte auf deine Antwort."),
          tr(
            "Edat fiile ait ve belirtme hâlini getiriyor. Fiil ile edat birlikte öğrenilir; ayrı ayrı ezberlenmez.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kasada uzun süre kuyrukta beklememiz gerekiyor.' Almancası:"),
          de("An der Kasse müssen wir lange anstehen."),
          tr("Lütfen"),
          de("An der Kasse müssen wir lange anstehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "An der Kasse müssen wir lange anstehen" },
      },
      {
        say: [tr("Sıra sende: 'Cevabını bekliyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich warte auf deine Antwort",
          hint: [
            tr("Fiilin kendi edatı gelir ve belirtme hâlini getirir:"),
            de("Ich warte auf deine Antwort."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Können Sie meine Frage bitte beantworten?"),
          tr(
            "Bu fiil edat almaz, doğrudan nesne alır. Aynı anlamı taşıyan iki fiilden biri edatlı, öteki değil.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Randevu konusunda sözleşmemiz gerekiyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir müssen uns über den Termin absprechen",
          hint: [
            tr("Dönüşlü zamir kip fiilinden sonra, konu bildiren edat belirtme hâlini getirir:"),
            de("Wir müssen uns über den Termin absprechen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich warte deine Antwort."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich warte deine Antwort.",
          answer: false,
          why: [
            tr("Bu fiil kendi edatı olmadan kullanılmaz. Doğrusu:"),
            de("Ich warte auf deine Antwort."),
          ],
        },
      },
      {
        say: [tr("Şimdi beklediğin bir cevabı soruyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir başvuruna hâlâ cevap gelmedi ve arayıp soruyorsun. Ne beklediğini söyle, ne zamandır beklediğini belirt ve ne zaman cevap alacağını sor.",
      partner: "telefona bakan, sistemden bakması gereken bir görevli",
      opening: "Guten Tag, was kann ich für Sie tun?",
      openingTr: "İyi günler, size nasıl yardımcı olabilirim?",
      goal: "Beklenen şey ve süresi söylenmiş, görevli bir tarih vermiş ve bu tarih teyit edilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-computerproblem",
    icon: "tech",
    level: "A2",
    course: "de",
    title: "Der Computer spinnt",
    titleTr: "Bilgisayar sorunu",
    summary: "Bilgisayar sorununu anlatmayı ve adım adım talimat vermeyi öğretir.",
    minutes: 10,
    focusId: "Imperativ-du",
    vocab: [
      { de: "speichern", tr: "kaydetmek" },
      { de: "die Datei", tr: "dosya" },
      { de: "das Passwort", tr: "şifre" },
      { de: "der Akku", tr: "batarya" },
      { de: "das Update", tr: "güncelleme" },
      { de: "die Software", tr: "yazılım" },
      { de: "anschalten", tr: "açmak" },
      { de: "herunterladen", tr: "indirmek" },
    ],
    patterns: [
      { de: "Speichere die Datei zuerst!", tr: "adım adım talimat verir" },
      { de: "Mein Akku ist fast leer.", tr: "sorunu bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bilgisayar sorununu çözüyoruz. Birine adım adım talimat vermenin Almanca yolu emir kipinden geçiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Samimi hitapta emir kurmak kolay: fiilin kişiye göre çekimi alınır ve kişi zamiri düşürülür. Ayrılabilen bir fiilse ön ek cümlenin sonuna gider. Türkçede emir eki fiile yapışır; Almancada ön ek uzaklaşır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("speichern"),
          tr("Türkçesi 'kaydetmek' demek. Lütfen"),
          de("speichern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "speichern" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Datei"),
          tr("Türkçesi 'dosya' demek. Lütfen"),
          de("die Datei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Datei" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Passwort"),
          tr("Türkçesi 'şifre' demek. Lütfen"),
          de("das Passwort"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Passwort" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Akku"),
          tr("Türkçesi 'batarya' demek. Lütfen"),
          de("der Akku"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Akku" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Update"),
          tr("Türkçesi 'güncelleme' demek. Lütfen"),
          de("das Update"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Update" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Software"),
          tr("Türkçesi 'yazılım' demek. Lütfen"),
          de("die Software"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Software" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("anschalten"),
          tr("Türkçesi 'açmak' demek; cihaz açmak. Lütfen"),
          de("anschalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anschalten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("herunterladen"),
          tr("Türkçesi 'indirmek' demek. Lütfen"),
          de("herunterladen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "herunterladen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Speichere die Datei zuerst!"),
          tr("Kişi zamiri düşmüş, fiil başa geçmiş ve nesne belirtme hâlinde."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Uygulamayı ücretsiz indirebilirsin.' Almancası:"),
          de("Du kannst die App kostenlos herunterladen."),
          tr("Lütfen"),
          de("Du kannst die App kostenlos herunterladen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Du kannst die App kostenlos herunterladen" },
      },
      {
        say: [tr("Sıra sende: 'Önce bilgisayarı aç!' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Schalte zuerst den Computer an",
          hint: [
            tr("Emirde fiil başa geçer ve ayrılabilen ön ek cümlenin sonuna düşer:"),
            de("Schalte zuerst den Computer an!"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sorunu bildiriyor:"),
          de("Mein Akku ist fast leer."),
          tr("Kısa ve net; teknik destek konuşmasının açılışı hep böyledir."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Şifremi unuttum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe mein Passwort vergessen",
          hint: [
            tr("Nesne belirtme hâline girer ve ortaç sona gider:"),
            de("Ich habe mein Passwort vergessen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Anschalte zuerst den Computer!"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Anschalte zuerst den Computer!",
          answer: false,
          why: [
            tr("Emirde ayrılabilen ön ek fiilin başında kalmaz, cümlenin sonuna düşer. Doğrusu:"),
            de("Schalte zuerst den Computer an!"),
          ],
        },
      },
      {
        say: [tr("Şimdi birine bilgisayar sorununda adım adım yardım ediyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın bilgisayarıyla ilgili bir sorun yaşıyor ve seni arıyor. Sorunu öğren ve ona adım adım ne yapacağını söyle.",
      partner: "bilgisayardan pek anlamayan, panik olmuş bir arkadaş",
      opening: "Mein Computer spinnt total! Kannst du mir helfen?",
      openingTr: "Bilgisayarım resmen çıldırdı! Bana yardım edebilir misin?",
      goal: "Sorun anlaşılmış, en az üç adımlık talimat verilmiş ve sorunun çözülüp çözülmediği öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-fotos-teilen",
    icon: "camera",
    level: "A2",
    course: "de",
    title: "Schau mal, meine Fotos",
    titleTr: "Fotoğraf paylaşma",
    summary: "Fotoğrafları göstermeyi ve en beğenileni seçmeyi öğretir.",
    minutes: 10,
    focusId: "Superlativ",
    vocab: [
      { de: "teilen", tr: "paylaşmak" },
      { de: "witzig", tr: "komik" },
      { de: "der Himmel", tr: "gökyüzü" },
      { de: "der Sonnenschein", tr: "güneş ışığı" },
      { de: "auffällig", tr: "dikkat çekici" },
      { de: "blättern", tr: "sayfa çevirmek" },
      { de: "köstlich", tr: "nefis" },
      { de: "lebendig", tr: "canlı" },
    ],
    patterns: [
      { de: "Dieses Foto gefällt mir am besten.", tr: "en beğendiğini söyler" },
      { de: "Schau mal, das ist am Meer.", tr: "bir fotoğrafı gösterir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün fotoğraf gösteriyoruz. En üstünlük biçimi burada bir seçim yapmak için kullanılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Beğeni bildiren fiil Almancada ilginç çalışıyor: beğenilen şey özne, beğenen kişi ise yönelme hâlinde. Türkçedeki 'bu bana hoş geliyor' ile aynı mantık. En üstünlük biçimini bu fiille birleştirince 'en çok bunu beğendim' çıkıyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("teilen"),
          tr("Türkçesi 'paylaşmak' demek. Lütfen"),
          de("teilen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "teilen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("witzig"),
          tr("Türkçesi 'komik' demek. Lütfen"),
          de("witzig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "witzig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Himmel"),
          tr("Türkçesi 'gökyüzü' demek. Lütfen"),
          de("der Himmel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Himmel" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Sonnenschein"),
          tr("Türkçesi 'güneş ışığı' demek. Lütfen"),
          de("der Sonnenschein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sonnenschein" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("auffällig"),
          tr("Türkçesi 'dikkat çekici, göze batan' demek. Lütfen"),
          de("auffällig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auffällig" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("blättern"),
          tr("Türkçesi 'sayfa çevirmek, göz gezdirmek' demek. Lütfen"),
          de("blättern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "blättern" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("köstlich"),
          tr("Türkçesi 'nefis' demek; yemek için kullanılır. Lütfen"),
          de("köstlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "köstlich" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("lebendig"),
          tr("Türkçesi 'canlı, hareketli' demek. Lütfen"),
          de("lebendig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lebendig" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Dieses Foto gefällt mir am besten."),
          tr(
            "Beğenilen şey özne, beğenen kişi yönelme hâlinde ve en üstünlük biçimi cümlenin sonunda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bugün gökyüzü mavi ve açık.' Almancası:"),
          de("Heute ist der Himmel blau und klar."),
          tr("Lütfen"),
          de("Heute ist der Himmel blau und klar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Heute ist der Himmel blau und klar" },
      },
      {
        say: [tr("Sıra sende: 'Bu fotoğrafı en çok beğendim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Dieses Foto gefällt mir am besten",
          hint: [
            tr("Beğenen kişi yönelme hâlinde durur ve en üstünlük biçimi sonda:"),
            de("Dieses Foto gefällt mir am besten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir fotoğrafı gösteriyor:"),
          de("Schau mal, das ist am Meer."),
          tr("Emir kipi ve kısa bir açıklama; fotoğraf gösterirken en doğal başlangıç."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Annenin yaptığı pasta nefisti.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Kuchen von deiner Mutter war köstlich",
          hint: [
            tr("Aitlik bildiren edat yönelme hâlini getirir ve sıfat yüklem olduğu için ek almaz:"),
            de("Der Kuchen von deiner Mutter war köstlich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gefalle dieses Foto am besten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gefalle dieses Foto am besten.",
          answer: false,
          why: [
            tr(
              "Bu fiilde beğenilen şey özne olur, beğenen kişi yönelme hâlinde durur; ikisi yer değiştirmiş. Doğrusu:",
            ),
            de("Dieses Foto gefällt mir am besten."),
          ],
        },
      },
      {
        say: [tr("Şimdi tatil fotoğraflarını gösteriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Tatilden döndün ve bir arkadaşına telefonundan fotoğrafları gösteriyorsun. Her fotoğrafı kısaca anlat ve en beğendiğini söyle.",
      partner: "fotoğraflara bakıp soru soran bir arkadaş",
      opening: "Oh, zeig mal! Wo war das denn?",
      openingTr: "Aa, göster bakayım! Burası neresi?",
      goal: "En az üç fotoğraf anlatılmış, en beğenilen seçilmiş ve sebebi söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-podcast",
    icon: "music",
    level: "A2",
    course: "de",
    title: "Mein Lieblingspodcast",
    titleTr: "Podcast önerisi",
    summary: "İlgi alanını anlatmayı ve edatlı dönüşlü fiili öğretir.",
    minutes: 10,
    focusId: "Verben-mit-Präpositionen",
    vocab: [
      { de: "der Podcast", tr: "podcast" },
      { de: "sich interessieren", tr: "ilgi duymak" },
      { de: "das Interesse", tr: "ilgi" },
      { de: "das Interview", tr: "röportaj" },
      { de: "nützlich", tr: "faydalı" },
      { de: "plaudern", tr: "sohbet etmek" },
      { de: "erwähnen", tr: "bahsetmek" },
      { de: "stundenlang", tr: "saatlerce" },
    ],
    patterns: [
      { de: "Ich interessiere mich für Fußball.", tr: "ilgi alanını söyler" },
      { de: "Ich habe großes Interesse an Kunst.", tr: "aynı şeyi isimle söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ilgi alanını anlatmayı öğreniyoruz. Bu fiil hem dönüşlü zamir hem de kendi edatını istiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Aynı anlamı iki yolla söyleyebilirsin: fiille ya da isimle. İkisinin edatı FARKLI ve bu, Almanca öğrenirken şaşırtan noktalardan biri. Fiille söylediğinde bir edat, isimle söylediğinde başka bir edat gelir ve hâlleri de ayrıdır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Podcast"),
          tr("Türkçesi 'podcast' demek. Lütfen"),
          de("der Podcast"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Podcast" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sich interessieren"),
          tr("Türkçesi 'ilgi duymak' demek. Lütfen"),
          de("sich interessieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich interessieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Interesse"),
          tr("Türkçesi 'ilgi' demek. Lütfen"),
          de("das Interesse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Interesse" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Interview"),
          tr("Türkçesi 'röportaj' demek. Lütfen"),
          de("das Interview"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Interview" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("nützlich"),
          tr("Türkçesi 'faydalı' demek. Lütfen"),
          de("nützlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nützlich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("plaudern"),
          tr("Türkçesi 'sohbet etmek' demek. Lütfen"),
          de("plaudern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "plaudern" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("erwähnen"),
          tr("Türkçesi 'bahsetmek, anmak' demek. Lütfen"),
          de("erwähnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erwähnen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("stundenlang"),
          tr("Türkçesi 'saatlerce' demek. Lütfen"),
          de("stundenlang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stundenlang" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich interessiere mich für Fußball."),
          tr(
            "Dönüşlü zamir fiilden hemen sonra; edat belirtme hâlini getiriyor. Fiil ile edat birlikte ezberlenir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yemek yaparken podcast dinlemeyi seviyorum.' Almancası:"),
          de("Beim Kochen höre ich gern einen Podcast."),
          tr("Lütfen"),
          de("Beim Kochen höre ich gern einen Podcast"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Beim Kochen höre ich gern einen Podcast" },
      },
      {
        say: [tr("Sıra sende: 'Futbola çok ilgi duyuyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich interessiere mich sehr für Fußball",
          hint: [
            tr("Dönüşlü zamir fiilden sonra, edat belirtme hâlini getirir:"),
            de("Ich interessiere mich sehr für Fußball."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız aynı şeyi isimle söylüyor:"),
          de("Ich habe großes Interesse an Kunst."),
          tr(
            "Edat değişti ve yönelme hâlini getiriyor. Aynı anlam, iki ayrı edat: bu ikisi karıştırılmamalı.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bu uygulama seyahat için çok faydalı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Diese App ist für Reisen sehr nützlich",
          hint: [
            tr("Amaç bildiren edat belirtme hâlini getirir ve sıfat yüklem olduğu için ek almaz:"),
            de("Diese App ist für Reisen sehr nützlich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich interessiere mich an Fußball."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich interessiere mich an Fußball.",
          answer: false,
          why: [
            tr(
              "Fiil hâlindeki edat başka, isim hâlindeki edat başkadır; burada ismin edatı fiile takılmış. Doğrusu:",
            ),
            de("Ich interessiere mich für Fußball."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir arkadaşına sevdiğin bir podcast öneriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşına dinlediğin bir podcast öneriyorsun. Konusunu anlat, neden faydalı olduğunu söyle ve onun neyle ilgilendiğini sor.",
      partner: "yolda dinleyecek bir şey arayan bir arkadaş",
      opening: "Ich brauche was für den Weg zur Arbeit. Hörst du eigentlich Podcasts?",
      openingTr: "İşe giderken dinleyecek bir şey lazım. Sen podcast dinliyor musun?",
      goal: "Bir podcast önerilmiş, konusu ve faydası anlatılmış ve arkadaşının ilgi alanı öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-online-termin",
    icon: "tech",
    level: "A2",
    course: "de",
    title: "Der Online-Termin",
    titleTr: "Görüntülü görüşme",
    summary: "Görüntülü görüşmedeki teknik sorunları ve resmî dili öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "das Mikrofon", tr: "mikrofon" },
      { de: "die Website", tr: "internet sitesi" },
      { de: "der Link", tr: "link" },
      { de: "sich eintragen", tr: "adını yazmak" },
      { de: "sich abmelden", tr: "çıkış yapmak" },
      { de: "unverständlich", tr: "anlaşılmaz" },
      { de: "mitschreiben", tr: "not tutmak" },
      { de: "gegenseitig", tr: "karşılıklı" },
    ],
    patterns: [
      { de: "Wenn Sie mich nicht hören, schreiben Sie bitte im Chat.", tr: "koşulu resmî bir sahnede kurar" },
      { de: "Ich schicke Ihnen den Link.", tr: "bağlantıyı göndereceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün görüntülü bir görüşmedeyiz. Koşul cümlesini bu kez resmî hitapla kuracağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural aynı: koşul cümlesinde fiil sonda, koşul başta olduğunda ana cümlede özne fiilin arkasında. Değişen tek şey hitap. Resmî hitapta emir kipi de farklı kuruluyor: fiil başa geçiyor ama kişi zamiri düşmüyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Mikrofon"),
          tr("Türkçesi 'mikrofon' demek. Lütfen"),
          de("das Mikrofon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Mikrofon" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Website"),
          tr("Türkçesi 'internet sitesi' demek. Lütfen"),
          de("die Website"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Website" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Link"),
          tr("Türkçesi 'link, bağlantı' demek. Lütfen"),
          de("der Link"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Link" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sich eintragen"),
          tr("Türkçesi 'listeye adını yazmak' demek. Lütfen"),
          de("sich eintragen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich eintragen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("sich abmelden"),
          tr("Türkçesi 'çıkış yapmak, kaydını sildirmek' demek. Lütfen"),
          de("sich abmelden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich abmelden" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("unverständlich"),
          tr("Türkçesi 'anlaşılmaz' demek. Lütfen"),
          de("unverständlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unverständlich" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("mitschreiben"),
          tr("Türkçesi 'not tutmak' demek. Lütfen"),
          de("mitschreiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mitschreiben" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("gegenseitig"),
          tr("Türkçesi 'karşılıklı' demek. Lütfen"),
          de("gegenseitig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gegenseitig" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn Sie mich nicht hören, schreiben Sie bitte im Chat."),
          tr(
            "Koşul cümlesinde fiil sonda; ana cümle resmî emir kipiyle kurulmuş, yani fiil başta ve hitap zamiri onun arkasında.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Mikrofonun kapalı, seni duymuyorum.' Almancası:"),
          de("Dein Mikrofon ist aus, ich höre dich nicht."),
          tr("Lütfen"),
          de("Dein Mikrofon ist aus, ich höre dich nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Dein Mikrofon ist aus, ich höre dich nicht" },
      },
      {
        say: [tr("Sıra sende: 'Lütfen bu listeye adınızı yazın.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Tragen Sie sich bitte in diese Liste ein",
          hint: [
            tr("Resmî emirde fiil başta, hitap zamiri arkasında ve ayrılabilen ön ek sonda:"),
            de("Tragen Sie sich bitte in diese Liste ein."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich schicke Ihnen den Link."),
          tr("Alan kişi yönelme hâlinde ve önde; gönderilen şey belirtme hâlinde ve arkada."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Derste hep not tutarım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Im Unterricht schreibe ich immer mit",
          hint: [
            tr("Yer ifadesi başta olduğu için özne fiilin arkasına düşer ve ön ek sona gider:"),
            de("Im Unterricht schreibe ich immer mit."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn Sie mich nicht hören, Sie schreiben bitte im Chat."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn Sie mich nicht hören, Sie schreiben bitte im Chat.",
          answer: false,
          why: [
            tr("Yan cümle başta olunca ana cümlede fiil hemen virgülden sonra gelir. Doğrusu:"),
            de("Wenn Sie mich nicht hören, schreiben Sie bitte im Chat."),
          ],
        },
      },
      {
        say: [tr("Şimdi görüntülü bir görüşmedesin ve teknik bir sorun çıktı.")],
      },
    ],
    roleplay: {
      scene:
        "Resmî bir görüntülü görüşmedesin ve ses sorunu var. Sorunu bildir, çözüm öner ve görüşmenin devamı için ne yapılacağını kararlaştır.",
      partner: "görüşmeyi yöneten resmî bir görevli",
      opening: "Guten Tag, hören Sie mich gut?",
      openingTr: "İyi günler, beni iyi duyuyor musunuz?",
      goal: "Teknik sorun bildirilmiş, bir çözüm denenmiş ve görüşmenin nasıl devam edeceği kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-digital-detox",
    icon: "nature",
    level: "A2",
    course: "de",
    title: "Ein Tag ohne Handy",
    titleTr: "Dijital mola",
    summary: "Telefonsuz bir günü anlatmayı ve deneyimi değerlendirmeyi öğretir.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "ausprobieren", tr: "denemek" },
      { de: "offline", tr: "çevrimdışı" },
      { de: "gelangweilt", tr: "sıkılmış" },
      { de: "spazieren", tr: "yürüyüş yapmak" },
      { de: "nachdenklich", tr: "düşünceli" },
      { de: "das Tablet", tr: "tablet" },
      { de: "aufbleiben", tr: "uyanık kalmak" },
      { de: "wach", tr: "uyanık" },
    ],
    patterns: [
      { de: "Ich habe einen Tag ohne Handy ausprobiert.", tr: "denediği şeyi anlatır" },
      { de: "Am Anfang war ich gelangweilt.", tr: "deneyimin başındaki duyguyu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde telefonsuz bir günü anlatıyoruz. Modülün başında öğrendiğin her şeyi burada bir deneyim anlatısında kullanacaksın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir deneyimi anlatmak üç parçadan oluşur: ne denedin, başta nasıldı, sonunda ne düşündün. Birincisi geçmiş zamanla, ikincisi ve üçüncüsü olmak fiilinin kısa geçmişiyle kurulur. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ausprobieren"),
          tr("Türkçesi 'denemek' demek. Lütfen"),
          de("ausprobieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausprobieren" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("offline"),
          tr("Türkçesi 'çevrimdışı' demek. Lütfen"),
          de("offline"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "offline" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("gelangweilt"),
          tr("Türkçesi 'sıkılmış' demek. Lütfen"),
          de("gelangweilt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gelangweilt" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("spazieren"),
          tr("Türkçesi 'yürüyüş yapmak' demek. Lütfen"),
          de("spazieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "spazieren" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("nachdenklich"),
          tr("Türkçesi 'düşünceli, dalgın' demek. Lütfen"),
          de("nachdenklich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nachdenklich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Tablet"),
          tr("Türkçesi 'tablet' demek. Lütfen"),
          de("das Tablet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Tablet" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("aufbleiben"),
          tr("Türkçesi 'uyanık kalmak, yatmamak' demek. Lütfen"),
          de("aufbleiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufbleiben" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("wach"),
          tr("Türkçesi 'uyanık' demek. Lütfen"),
          de("wach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wach" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe einen Tag ohne Handy ausprobiert."),
          tr(
            "Ayrılabilen fiil ama sonu belirli bir heceyle bitiyor, o yüzden ortacın hecesini almıyor; yalnız ön ek başta duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kardeşim bütün gün çevrimdışıydı.' Almancası:"),
          de("Mein Bruder war den ganzen Tag offline."),
          tr("Lütfen"),
          de("Mein Bruder war den ganzen Tag offline"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mein Bruder war den ganzen Tag offline" },
      },
      {
        say: [tr("Sıra sende: 'Öğleden sonra parkta yürüdük.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Nachmittag spazieren wir durch den Park",
          hint: [
            tr("Zaman ifadesi başta olduğu için özne fiilin arkasına düşer:"),
            de("Am Nachmittag spazieren wir durch den Park."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız duyguyu söylüyor:"),
          de("Am Anfang war ich gelangweilt."),
          tr("Olmak fiilinin kısa geçmişi; deneyimin başındaki hâli anlatır."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Hafta sonu çocuklar geç yatıyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Wochenende bleiben die Kinder länger auf",
          hint: [
            tr("Zaman ifadesi başta ve ayrılabilen ön ek cümlenin sonuna düşer:"),
            de("Am Wochenende bleiben die Kinder länger auf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe einen Tag ohne Handy geausprobiert."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe einen Tag ohne Handy geausprobiert.",
          answer: false,
          why: [
            tr(
              "Sonu belirli bir heceyle biten yabancı kökenli fiiller ortacın hecesini almaz; ayrılabilen ön ek başta kalır. Doğrusu:",
            ),
            de("Ich habe einen Tag ohne Handy ausprobiert."),
          ],
        },
      },
      {
        say: [tr("Şimdi telefonsuz geçen bir günü anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir gün telefonunu hiç açmadın ve bir arkadaşın merak ediyor. Ne yaptığını, başta nasıl hissettiğini ve sonunda ne düşündüğünü anlat.",
      partner: "aynısını denemek isteyen ama cesaret edemeyen bir arkadaş",
      opening: "Du warst gestern gar nicht erreichbar. Was hast du gemacht?",
      openingTr: "Dün sana hiç ulaşılamadı. Ne yapıyordun?",
      goal: "Gün boyunca yapılanlar anlatılmış, baştaki ve sondaki duygu söylenmiş ve arkadaşın denemeye karar verip vermediğini belirtmiş olur.",
      minTurns: 8,
    },
  },
];

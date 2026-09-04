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
 * Sözlükçe havuzun A2 katmanından geliyor ve modülün en büyük eksiğini
 * kapatıyor: iş hayatı havuzda geniş bir alan (başvuru, sözleşme, vardiya,
 * telefon, mola, izin) ama derslerin öğrettiği 50 kelimenin 25'i B1 ve
 * üstündeydi — modülün yarısı seviyenin dışında ders veriyordu.
 *
 * Üç bağlacın kendisi (weil, dass) havuzun A2 katmanında madde başı olarak
 * duruyor ve sözlükçeye ALINDI; `denn` A1 ama dersin konusu olduğu için
 * yerinde bırakıldı.
 */
export const deA2B05: Lesson[] = [
  {
    id: "de-a2-neue-stelle",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Die neue Stelle",
    titleTr: "Yeni iş",
    summary: "İş arama ve işe başlama sürecini anlatmayı öğretir.",
    minutes: 10,
    focusId: "Modalverb-wollen",
    vocab: [
      { de: "die Bewerbung", tr: "iş başvurusu" },
      { de: "das Bewerbungsgespräch", tr: "iş görüşmesi" },
      { de: "der Vertrag", tr: "sözleşme" },
      { de: "das Gehalt", tr: "maaş" },
      { de: "die Ausbildung", tr: "meslek eğitimi" },
      { de: "der Mitarbeiter", tr: "çalışan" },
      { de: "kündigen", tr: "istifa etmek" },
      { de: "der Nebenjob", tr: "ek iş" },
    ],
    patterns: [
      { de: "Ich will mich bewerben.", tr: "kararlı bir niyeti söyler" },
      { de: "Ich habe den Vertrag unterschrieben.", tr: "işe başlama adımını bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün yeni bir işe başlama sürecini konuşuyoruz: başvuru, görüşme, sözleşme. Bir de niyeti kararlı biçimde söylemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "A1'de kibar bir istek biçimi öğrenmiştin: kahve isterim, gitmek isterim. Bugün onun kararlı kardeşi geliyor. İkisi de niyet söyler ama biri rica, öteki karar bildirir. İş konuşmalarında kararlı olan kullanılır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Bewerbung"),
          tr("Türkçesi 'iş başvurusu' demek. Lütfen"),
          de("die Bewerbung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bewerbung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Bewerbungsgespräch"),
          tr("Türkçesi 'iş görüşmesi' demek. Lütfen"),
          de("das Bewerbungsgespräch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bewerbungsgespräch" },
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
          de("das Gehalt"),
          tr("Türkçesi 'maaş' demek. Lütfen"),
          de("das Gehalt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gehalt" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Ausbildung"),
          tr("Türkçesi 'meslek eğitimi' demek; Almanya'da çıraklıkla okulu birleştiren sistem. Lütfen"),
          de("die Ausbildung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ausbildung" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Mitarbeiter"),
          tr("Türkçesi 'çalışan' demek. Lütfen"),
          de("der Mitarbeiter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mitarbeiter" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("kündigen"),
          tr("Türkçesi 'istifa etmek, sözleşmeyi feshetmek' demek. Lütfen"),
          de("kündigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kündigen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Nebenjob"),
          tr("Türkçesi 'ek iş' demek. Lütfen"),
          de("der Nebenjob"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Nebenjob" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich will mich bewerben."),
          tr(
            "Kip fiili ikinci sırada, asıl fiil sonda. Dönüşlü zamir kip fiilinden hemen sonra duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu iş için başvurmak istiyorum.' Almancası:"),
          de("Ich will mich für diese Stelle bewerben."),
          tr("Lütfen"),
          de("Ich will mich für diese Stelle bewerben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich will mich für diese Stelle bewerben" },
      },
      {
        say: [tr("Sıra sende: 'İstifa etmek istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich will kündigen",
          hint: [
            tr("Kararlı niyet için kip fiilinin bu biçimi kullanılır ve asıl fiil sonda kalır:"),
            de("Ich will kündigen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich habe den Vertrag unterschrieben."),
          tr(
            "Kuralsız bir fiil ve vurgusuz bir ön ekle başlıyor, o yüzden ortacın hecesini almıyor ama sonu değişiyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Yarın iş görüşmem var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Morgen habe ich ein Bewerbungsgespräch",
          hint: [
            tr("Zaman ifadesi başta olduğu için özne fiilin arkasına düşer:"),
            de("Morgen habe ich ein Bewerbungsgespräch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich will mich bewerben für diese Stelle."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich will mich bewerben für diese Stelle.",
          answer: false,
          why: [
            tr("Kip fiili varken asıl fiil cümlenin EN sonunda durmalı; onun arkasına bir şey gelmez. Doğrusu:"),
            de("Ich will mich für diese Stelle bewerben."),
          ],
        },
      },
      {
        say: [tr("Şimdi yeni işini bir arkadaşına anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Yeni bir iş buldun ve bir arkadaşınla buluştun. Nasıl başvurduğunu, görüşmenin nasıl geçtiğini ve işin nasıl olduğunu anlat.",
      partner: "kendisi de iş arayan bir arkadaş",
      opening: "Ich habe gehört, du hast eine neue Stelle. Wie ist es denn so?",
      openingTr: "Yeni bir iş bulduğunu duydum. Nasıl gidiyor?",
      goal: "Başvuru, görüşme ve işe başlama sırayla anlatılmış ve arkadaşına da bir tavsiye verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-weil",
    icon: "school",
    level: "A2",
    course: "de",
    title: "Warum lernst du Deutsch?",
    titleTr: "Sebep: weil",
    summary: "Sebep bildiren yan cümleyi ve fiilin sona gitmesini öğretir.",
    minutes: 10,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "weil", tr: "çünkü" },
      { de: "die Vokabel", tr: "sözcük" },
      { de: "die Grammatik", tr: "dil bilgisi" },
      { de: "aussprechen", tr: "telaffuz etmek" },
      { de: "übersetzen", tr: "tercüme etmek" },
      { de: "wegen", tr: "yüzünden" },
      { de: "darum", tr: "o yüzden" },
      { de: "sich informieren", tr: "bilgi almak" },
    ],
    patterns: [
      { de: "Ich lerne Deutsch, weil ich hier arbeite.", tr: "sebebi yan cümleyle söyler" },
      { de: "Wegen der Arbeit lerne ich Deutsch.", tr: "sebebi tek bir edatla söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün sebep bildirmeyi öğreniyoruz. Almancada bunun üç yolu var ve üçü de söz dizimini farklı kuruyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü bağlaç bir yan cümle açar ve o yan cümlede fiil EN SONA gider. Türkçede fiil zaten sondadır, o yüzden bu kural aslında sana tanıdık gelmeli; zor olan, ana cümlede fiilin ikinci sırada kalmaya devam etmesi. Bir de tek bir edatla sebep söylemenin yolunu göreceğiz. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("weil"),
          tr("Türkçesi 'çünkü' demek; arkasından bir yan cümle gelir. Lütfen"),
          de("weil"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weil" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Vokabel"),
          tr("Türkçesi 'sözcük' demek; öğrenilen kelime anlamında. Lütfen"),
          de("die Vokabel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Vokabel" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Grammatik"),
          tr("Türkçesi 'dil bilgisi' demek. Lütfen"),
          de("die Grammatik"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Grammatik" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("aussprechen"),
          tr("Türkçesi 'telaffuz etmek' demek. Lütfen"),
          de("aussprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aussprechen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("übersetzen"),
          tr("Türkçesi 'tercüme etmek' demek. Lütfen"),
          de("übersetzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "übersetzen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("wegen"),
          tr("Türkçesi 'yüzünden, sebebiyle' demek; bir edat. Lütfen"),
          de("wegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wegen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("darum"),
          tr("Türkçesi 'o yüzden' demek; sonucu bildirir. Lütfen"),
          de("darum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "darum" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich informieren"),
          tr("Türkçesi 'bilgi almak' demek. Lütfen"),
          de("sich informieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich informieren" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich lerne Deutsch, weil ich hier arbeite."),
          tr(
            "Virgülden sonra yan cümle başlıyor ve fiil en sona gidiyor. Ana cümlede ise hiçbir şey değişmiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Dil bilgisi zor olduğu için her gün çalışıyorum.' Almancası:"),
          de("Ich lerne jeden Tag, weil die Grammatik schwer ist."),
          tr("Lütfen"),
          de("Ich lerne jeden Tag, weil die Grammatik schwer ist"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich lerne jeden Tag, weil die Grammatik schwer ist" },
      },
      {
        say: [tr("Sıra sende: 'Almanca öğreniyorum çünkü burada yaşıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich lerne Deutsch, weil ich hier lebe",
          hint: [
            tr("Yan cümlede fiil en sona gider:"),
            de("Ich lerne Deutsch, weil ich hier lebe."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız aynı sebebi tek bir edatla söylüyor:"),
          de("Wegen der Arbeit lerne ich Deutsch."),
          tr(
            "Yan cümle yok, fiil de sona gitmiyor. Edat başta olduğu için özne fiilin arkasına düşüyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bu kelimeyi nasıl telaffuz ediliyor?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wie spricht man dieses Wort aus",
          hint: [
            tr("Belirsiz özne kullanılır ve ayrılabilen ön ek cümlenin sonuna düşer:"),
            de("Wie spricht man dieses Wort aus?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich lerne Deutsch, weil ich hier arbeite."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich lerne Deutsch, weil ich hier arbeite.",
          answer: true,
          why: [
            tr("Yan cümlede fiil en sonda, ana cümlede ikinci sırada: iki kural da yerinde."),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana neden Almanca öğrendiğini soruyor. Sebebini anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Dil kursunun ilk gününde öğretmen sınıfa neden Almanca öğrendiğini soruyor. Sebebini yan cümleyle anlat ve neyi zor bulduğunu söyle.",
      partner: "sınıfı tanımak isteyen bir kurs öğretmeni",
      opening: "Willkommen! Sagen Sie mal: Warum lernen Sie Deutsch?",
      openingTr: "Hoş geldiniz! Söyler misiniz: Neden Almanca öğreniyorsunuz?",
      goal: "En az iki sebep yan cümleyle söylenmiş, zor bulunan bir konu belirtilmiş ve öğretmen bir tavsiye vermiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-denn",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Ich komme später, denn…",
    titleTr: "Sebep: denn",
    summary: "Fiili sona atmayan sebep bağlacını ve ötekinden farkını öğretir.",
    minutes: 10,
    focusId: "Konnektor-denn",
    vocab: [
      { de: "denn", tr: "çünkü" },
      { de: "der Verkehr", tr: "trafik" },
      { de: "mitfahren", tr: "birlikte gitmek" },
      { de: "die Nachtschicht", tr: "gece vardiyası" },
      { de: "der Dienstplan", tr: "vardiya çizelgesi" },
      { de: "unterwegs sein", tr: "yolda olmak" },
      { de: "der Arbeitsweg", tr: "işe gidiş yolu" },
      { de: "stressig", tr: "stresli" },
    ],
    patterns: [
      { de: "Ich komme später, denn der Verkehr ist schlimm.", tr: "sebebi düz söz dizimiyle söyler" },
      { de: "Ich bin schon unterwegs.", tr: "yolda olduğunu bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Geçen ders sebep bildiren bir bağlaç öğrendin ve o fiili sona atıyordu. Bugünkü bağlaç aynı şeyi söylüyor ama söz dizimine hiç dokunmuyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Fark tek cümlede: bugünkü bağlaçtan sonra cümle normal kurulur, fiil ikinci sırada kalır. Geçen dersteki bağlaçtan sonra ise fiil en sona giderdi. Anlam ikisinde de aynı; hangisini seçeceğin sana kalmış, ama seçtiğin an söz dizimi belli oluyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("denn"),
          tr("Türkçesi 'çünkü' demek; söz dizimini değiştirmez. Lütfen"),
          de("denn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "denn" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Verkehr"),
          tr("Türkçesi 'trafik' demek. Lütfen"),
          de("der Verkehr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Verkehr" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("mitfahren"),
          tr("Türkçesi 'birlikte gitmek' demek; birinin arabasına binmek. Lütfen"),
          de("mitfahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mitfahren" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Nachtschicht"),
          tr("Türkçesi 'gece vardiyası' demek. Lütfen"),
          de("die Nachtschicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nachtschicht" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Dienstplan"),
          tr("Türkçesi 'vardiya çizelgesi' demek. Lütfen"),
          de("der Dienstplan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Dienstplan" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("unterwegs sein"),
          tr("Türkçesi 'yolda olmak' demek. Lütfen"),
          de("unterwegs sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unterwegs sein" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Arbeitsweg"),
          tr("Türkçesi 'işe gidiş yolu' demek. Lütfen"),
          de("der Arbeitsweg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Arbeitsweg" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("stressig"),
          tr("Türkçesi 'stresli, yorucu' demek. Lütfen"),
          de("stressig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stressig" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich komme später, denn der Verkehr ist schlimm."),
          tr("Virgülden sonra düz bir cümle: özne, fiil, gerisi. Fiil sona gitmiyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Geç kalacağım, çünkü işe gidiş yolum çok uzun.' Almancası:"),
          de("Ich komme später, denn mein Arbeitsweg ist lang."),
          tr("Lütfen"),
          de("Ich komme später, denn mein Arbeitsweg ist lang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich komme später, denn mein Arbeitsweg ist lang" },
      },
      {
        say: [tr("Sıra sende: 'Bugün gelemiyorum çünkü gece vardiyam var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kann heute nicht kommen, denn ich habe Nachtschicht",
          hint: [
            tr("Bu bağlaçtan sonra fiil ikinci sırada kalır, sona gitmez:"),
            de("Ich kann heute nicht kommen, denn ich habe Nachtschicht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich bin schon unterwegs."),
          tr("Yolda olduğunu bildirir; geç kalınca telefonda en çok söylenen cümle."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Seninle gelebilir miyim?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Darf ich mitfahren",
          hint: [
            tr("İzin fiili başta, ayrılabilen fiil sonda ve bölünmemiş hâlde:"),
            de("Darf ich mitfahren?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich komme später, denn der Verkehr schlimm ist."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich komme später, denn der Verkehr schlimm ist.",
          answer: false,
          why: [
            tr(
              "Bu bağlaç fiili sona atmaz; sona atan öteki bağlaçtır. Burada fiil ikinci sırada kalmalı. Doğrusu:",
            ),
            de("Ich komme später, denn der Verkehr ist schlimm."),
          ],
        },
      },
      {
        say: [tr("Şimdi işe geç kalacaksın ve arayıp sebebini söylüyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Trafikte kaldın ve işe geç kalacaksın. İş arkadaşını ara, ne kadar geç kalacağını söyle ve sebebini anlat.",
      partner: "seni bekleyen, toplantıyı erteleyecek bir iş arkadaşı",
      opening: "Hallo? Wo bleibst du denn? Wir wollten um neun anfangen.",
      openingTr: "Alo? Nerede kaldın? Dokuzda başlayacaktık.",
      goal: "Gecikme süresi ve sebebi söylenmiş ve iş arkadaşınla ne yapılacağına karar verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-kollegen",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Die neuen Kollegen",
    titleTr: "İş arkadaşları",
    summary: "İş yerinde kendini ve başkasını tanıtmayı öğretir.",
    minutes: 10,
    focusId: "Vorstellung",
    vocab: [
      { de: "der Arbeitskollege", tr: "iş arkadaşı" },
      { de: "das Team", tr: "ekip" },
      { de: "die Teamarbeit", tr: "takım çalışması" },
      { de: "der Geschäftsführer", tr: "genel müdür" },
      { de: "der Azubi", tr: "çırak" },
      { de: "das Büro", tr: "ofis" },
      { de: "zusammenarbeiten", tr: "birlikte çalışmak" },
      { de: "vorstellen", tr: "tanıtmak" },
    ],
    patterns: [
      { de: "Darf ich Ihnen … vorstellen?", tr: "birini kibarca tanıtır" },
      { de: "Ich arbeite mit … zusammen.", tr: "kiminle çalıştığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün işe ilk gün: kendini tanıtıyorsun ve sana başkalarını tanıtıyorlar. Bu, Almanya'da belirli kalıplarla yapılır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Tanıtma fiili iki nesne alıyor: tanıtılan kişi belirtme hâlinde, kendisine tanıtılan kişi yönelme hâlinde. Modül 4'te çalıştığın sıra burada da geçerli. Resmî ortamda hep kibar hitap kullanılır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Arbeitskollege"),
          tr("Türkçesi 'iş arkadaşı' demek. Lütfen"),
          de("der Arbeitskollege"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Arbeitskollege" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Team"),
          tr("Türkçesi 'ekip' demek. Lütfen"),
          de("das Team"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Team" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Teamarbeit"),
          tr("Türkçesi 'takım çalışması' demek. Lütfen"),
          de("die Teamarbeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Teamarbeit" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Geschäftsführer"),
          tr("Türkçesi 'genel müdür' demek. Lütfen"),
          de("der Geschäftsführer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Geschäftsführer" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Azubi"),
          tr("Türkçesi 'çırak' demek; meslek eğitimindeki genç çalışan. Lütfen"),
          de("der Azubi"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Azubi" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Büro"),
          tr("Türkçesi 'ofis' demek. Lütfen"),
          de("das Büro"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Büro" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("zusammenarbeiten"),
          tr("Türkçesi 'birlikte çalışmak' demek. Lütfen"),
          de("zusammenarbeiten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zusammenarbeiten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("vorstellen"),
          tr("Türkçesi 'tanıtmak' demek. Lütfen"),
          de("vorstellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorstellen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Darf ich Ihnen … vorstellen?"),
          tr(
            "İzin fiiliyle açılan kibar bir soru. Kendisine tanıtılan kişi yönelme hâlinde ve fiilden hemen sonra duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Size iş arkadaşımı tanıtabilir miyim?' Almancası:"),
          de("Darf ich Ihnen meinen Kollegen vorstellen?"),
          tr("Lütfen"),
          de("Darf ich Ihnen meinen Kollegen vorstellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Darf ich Ihnen meinen Kollegen vorstellen" },
      },
      {
        say: [tr("Sıra sende: 'Küçük bir ofiste çalışıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich arbeite in einem kleinen Büro",
          hint: [
            tr("Yer bildiren edat yönelme hâlini getirir ve sıfat da ona göre ek alır:"),
            de("Ich arbeite in einem kleinen Büro."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich arbeite mit … zusammen."),
          tr(
            "Ayrılabilen fiilin ön eki cümlenin sonunda; birlikte çalıştığın kişiyi söyleyen edat yönelme hâlini getiriyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Ekiple birlikte çalışıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich arbeite mit dem Team zusammen",
          hint: [
            tr("Edat yönelme hâlini getirir ve ayrılabilen ön ek sona düşer:"),
            de("Ich arbeite mit dem Team zusammen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Darf ich Ihnen meinen Kollegen vorstellen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Darf ich Ihnen meinen Kollegen vorstellen?",
          answer: true,
          why: [
            tr(
              "Kendisine tanıtılan kişi yönelme hâlinde, tanıtılan kişi belirtme hâlinde ve asıl fiil sonda: kalıbın tamamı doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi işteki ilk günündesin. Kendini tanıt ve ekibi tanı.")],
      },
    ],
    roleplay: {
      scene:
        "Yeni işindeki ilk günün. Bir iş arkadaşın seni ofiste gezdiriyor ve insanlarla tanıştırıyor. Kendini tanıt ve kimin ne yaptığını sor.",
      partner: "seni ofiste gezdiren yardımsever bir iş arkadaşı",
      opening: "Willkommen im Team! Soll ich dir erst mal das Büro zeigen?",
      openingTr: "Ekibe hoş geldin! Önce sana ofisi göstereyim mi?",
      goal: "Kendini tanıtmış, en az iki kişiyle tanışmış ve kimin ne iş yaptığını öğrenmiş olursun.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-meeting",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Das Team-Meeting",
    titleTr: "Toplantı",
    summary: "Toplantıda görüş bildirmeyi ve dass ile yan cümle kurmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "dass", tr: "ki" },
      { de: "der Vorschlag", tr: "öneri" },
      { de: "auf jeden Fall", tr: "kesinlikle" },
      { de: "das Projekt", tr: "proje" },
      { de: "betonen", tr: "vurgulamak" },
      { de: "diskutieren", tr: "tartışmak" },
      { de: "berichten", tr: "bildirmek" },
      { de: "meinen", tr: "demek istemek" },
    ],
    patterns: [
      { de: "Ich denke, dass das eine gute Idee ist.", tr: "görüşünü yan cümleyle söyler" },
      { de: "Ich habe einen Vorschlag.", tr: "öneri getirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün toplantıdayız. Görüş bildirmenin Almanca yolu bir yan cümleden geçiyor ve o yan cümlede fiil yine sona gidiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü bağlaç, düşünme ve söyleme fiillerinden sonra gelir: sanıyorum ki, umuyorum ki, söylüyor ki. Türkçede 'ki' bağlacı vardır ama çoğu zaman hiç kullanılmaz; Almancada ise atlanabilse bile bu ders boyunca hep kuracağız, çünkü kural fiilin yerinde. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("dass"),
          tr("Türkçesi 'ki' demek; arkasından bir yan cümle gelir. Lütfen"),
          de("dass"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dass" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Vorschlag"),
          tr("Türkçesi 'öneri' demek. Lütfen"),
          de("der Vorschlag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vorschlag" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("auf jeden Fall"),
          tr("Türkçesi 'kesinlikle, her hâlükârda' demek; üç kelimelik bir kalıp. Lütfen"),
          de("auf jeden Fall"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auf jeden Fall" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Projekt"),
          tr("Türkçesi 'proje' demek. Lütfen"),
          de("das Projekt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Projekt" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("betonen"),
          tr("Türkçesi 'vurgulamak, altını çizmek' demek. Lütfen"),
          de("betonen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "betonen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("diskutieren"),
          tr("Türkçesi 'tartışmak' demek. Lütfen"),
          de("diskutieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "diskutieren" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("berichten"),
          tr("Türkçesi 'bildirmek, rapor vermek' demek. Lütfen"),
          de("berichten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "berichten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("meinen"),
          tr("Türkçesi 'demek istemek, görüşü olmak' demek. Lütfen"),
          de("meinen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "meinen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich denke, dass das eine gute Idee ist."),
          tr("Virgülden sonra yan cümle ve fiil en sonda. Ana cümle bozulmadan kalıyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bence bu proje çok iyi.' Almancası:"),
          de("Ich denke, dass das Projekt sehr gut ist."),
          tr("Lütfen"),
          de("Ich denke, dass das Projekt sehr gut ist"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich denke, dass das Projekt sehr gut ist" },
      },
      {
        say: [tr("Sıra sende: 'Bence bunu tartışmalıyız.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich meine, dass wir darüber diskutieren müssen",
          hint: [
            tr("Yan cümlede kip fiili en sona gider ve asıl fiil onun hemen önünde durur:"),
            de("Ich meine, dass wir darüber diskutieren müssen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız öneri getiriyor:"),
          de("Ich habe einen Vorschlag."),
          tr("Kısa ve toplantıda söz almanın en doğal yolu."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bu öneriyi kesinlikle destekliyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Diesen Vorschlag unterstütze ich auf jeden Fall",
          hint: [
            tr("Nesne başa alındığında özne fiilin arkasına düşer:"),
            de("Diesen Vorschlag unterstütze ich auf jeden Fall."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich denke, dass das Projekt ist sehr gut."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich denke, dass das Projekt ist sehr gut.",
          answer: false,
          why: [
            tr("Bu bağlaçtan sonra fiil en sona gider. Doğrusu:"),
            de("Ich denke, dass das Projekt sehr gut ist."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir toplantıdasın. Görüşünü söyle ve bir öneri getir.")],
      },
    ],
    roleplay: {
      scene:
        "Ekip toplantısındasın ve yeni bir projeyi konuşuyorsunuz. Görüşünü söyle, bir öneri getir ve başka birinin önerisine katılıp katılmadığını belirt.",
      partner: "toplantıyı yöneten bir ekip lideri",
      opening: "Bevor wir anfangen: Was denkt ihr über das neue Projekt?",
      openingTr: "Başlamadan önce: Yeni proje hakkında ne düşünüyorsunuz?",
      goal: "Bir görüş yan cümleyle söylenmiş, bir öneri getirilmiş ve ekip lideri bir karara varmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-telefon-arbeit",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Ein Anruf für Sie",
    titleTr: "İşte telefon",
    summary: "İşte telefonu karşılamayı, not almayı ve mesaj iletmeyi öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "kontaktieren", tr: "iletişime geçmek" },
      { de: "auflegen", tr: "telefonu kapatmak" },
      { de: "das Telefonat", tr: "telefon görüşmesi" },
      { de: "die Mailbox", tr: "telesekreter" },
      { de: "dranbleiben", tr: "hatta kalmak" },
      { de: "erreichen", tr: "ulaşmak" },
      { de: "die Handynummer", tr: "cep telefonu numarası" },
      { de: "notieren", tr: "not almak" },
    ],
    patterns: [
      { de: "Ich sage ihm, dass Sie angerufen haben.", tr: "mesajı ileteceğini söyler" },
      { de: "Können Sie bitte dranbleiben?", tr: "hatta kalmasını rica eder" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün işte telefonu karşılıyoruz. Almanya'da bu belirli kalıplarla yapılır ve o kalıpları bilmek kendine güven verir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Mesaj iletirken geçen dersteki bağlaç yine karşına çıkıyor: birine bir şey söyleyeceğini anlatırken yan cümle kuruluyor ve fiil sona gidiyor. Bu cümlede üç şey aynı anda oluyor: iletilen kişi yönelme hâlinde, bağlaç ortada, fiil sonda. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("kontaktieren"),
          tr("Türkçesi 'iletişime geçmek' demek. Lütfen"),
          de("kontaktieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kontaktieren" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("auflegen"),
          tr("Türkçesi 'telefonu kapatmak' demek. Lütfen"),
          de("auflegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auflegen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Telefonat"),
          tr("Türkçesi 'telefon görüşmesi' demek. Lütfen"),
          de("das Telefonat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Telefonat" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Mailbox"),
          tr("Türkçesi 'telesekreter' demek. Lütfen"),
          de("die Mailbox"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mailbox" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("dranbleiben"),
          tr("Türkçesi 'hatta kalmak' demek. Lütfen"),
          de("dranbleiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dranbleiben" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("erreichen"),
          tr("Türkçesi 'ulaşmak, birine erişmek' demek. Lütfen"),
          de("erreichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erreichen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Handynummer"),
          tr("Türkçesi 'cep telefonu numarası' demek. Lütfen"),
          de("die Handynummer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Handynummer" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("notieren"),
          tr("Türkçesi 'not almak' demek. Lütfen"),
          de("notieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "notieren" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich sage ihm, dass Sie angerufen haben."),
          tr(
            "Kime söyleyeceğin yönelme hâlinde. Yan cümlede geçmiş zaman var ve yardımcı fiil en sona gidiyor, ortaç onun önünde duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ona sizin aradığınızı söyleyeceğim.' cümlesini bir kez daha duy:"),
          de("Ich sage ihm, dass Sie angerufen haben."),
          tr("Lütfen"),
          de("Ich sage ihm, dass Sie angerufen haben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich sage ihm, dass Sie angerufen haben" },
      },
      {
        say: [tr("Sıra sende: 'Numaranızı not alabilir miyim?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Darf ich Ihre Nummer notieren",
          hint: [
            tr("İzin fiili başta, asıl fiil sonda ve nesne belirtme hâlinde:"),
            de("Darf ich Ihre Nummer notieren?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Können Sie bitte dranbleiben?"),
          tr("Hatta kalmasını rica eder. Ayrılabilen fiil kip fiiliyle birlikte bölünmeden sonda durur."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Beni bugün ofiste bulabilirsiniz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sie können mich heute im Büro erreichen",
          hint: [
            tr("Ulaşılan kişi belirtme hâlinde ve asıl fiil sonda:"),
            de("Sie können mich heute im Büro erreichen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich sage ihm, dass Sie angerufen haben."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich sage ihm, dass Sie angerufen haben.",
          answer: true,
          why: [
            tr(
              "Yan cümlede geçmiş zamanın yardımcı fiili en sona gitmiş ve ortaç onun önünde durmuş: sıralama doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi ofiste telefonu sen açıyorsun ve mesajı alıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Ofiste telefon çalıyor ve aranan kişi yerinde değil. Telefonu karşıla, kim aradığını ve konuyu öğren, numarayı not al ve mesajı ileteceğini söyle.",
      partner: "bir iş arkadaşına ulaşmaya çalışan bir müşteri",
      opening: "Guten Tag, kann ich bitte Frau Keller sprechen?",
      openingTr: "İyi günler, Bayan Keller ile görüşebilir miyim?",
      goal: "Arayanın adı, konusu ve numarası alınmış ve mesajın iletileceği söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-pause",
    icon: "cafe",
    level: "A2",
    course: "de",
    title: "In der Mittagspause",
    titleTr: "Öğle molası",
    summary: "Öğle molasında tercih bildirmeyi ve yemek seçmeyi öğretir.",
    minutes: 10,
    focusId: "Gern-lieber",
    vocab: [
      { de: "die Mittagspause", tr: "öğle molası" },
      { de: "die Kaffeepause", tr: "kahve molası" },
      { de: "die Cafeteria", tr: "kafeterya" },
      { de: "das Mittagessen", tr: "öğle yemeği" },
      { de: "die Portion", tr: "porsiyon" },
      { de: "die Beilage", tr: "garnitür" },
      { de: "das Gericht", tr: "yemek" },
      { de: "die Selbstbedienung", tr: "self servis" },
    ],
    patterns: [
      { de: "Ich esse lieber …", tr: "iki seçenek arasından tercihini söyler" },
      { de: "Als Beilage nehme ich …", tr: "yanına ne alacağını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün öğle molasındayız. İki şey arasından birini seçmenin Almanca yolunu öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "A1'de bir şeyi sevdiğini söylemeyi öğrenmiştin. Bugün onun karşılaştırmalı biçimi geliyor: iki seçenek varsa hangisini tercih ettiğini söyler. En üstünlük biçimi de var ve o hepsinin arasından birini seçer. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Mittagspause"),
          tr("Türkçesi 'öğle molası' demek. Lütfen"),
          de("die Mittagspause"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mittagspause" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Kaffeepause"),
          tr("Türkçesi 'kahve molası' demek. Lütfen"),
          de("die Kaffeepause"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kaffeepause" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Cafeteria"),
          tr("Türkçesi 'kafeterya' demek. Lütfen"),
          de("die Cafeteria"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Cafeteria" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Mittagessen"),
          tr("Türkçesi 'öğle yemeği' demek. Lütfen"),
          de("das Mittagessen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Mittagessen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Portion"),
          tr("Türkçesi 'porsiyon' demek. Lütfen"),
          de("die Portion"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Portion" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Beilage"),
          tr("Türkçesi 'garnitür' demek; ana yemeğin yanındaki pilav, patates ya da salata. Lütfen"),
          de("die Beilage"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Beilage" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Gericht"),
          tr("Türkçesi 'yemek' demek; menüdeki bir yemek. Lütfen"),
          de("das Gericht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gericht" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Selbstbedienung"),
          tr("Türkçesi 'self servis' demek. Lütfen"),
          de("die Selbstbedienung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Selbstbedienung" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich esse lieber …"),
          tr("Tercih bildiren kelime fiilden hemen sonra durur ve iki seçenek arasından birini seçer."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ben kafeteryada yemeyi tercih ederim.' Almancası:"),
          de("Ich esse lieber in der Cafeteria."),
          tr("Lütfen"),
          de("Ich esse lieber in der Cafeteria"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich esse lieber in der Cafeteria" },
      },
      {
        say: [tr("Sıra sende: 'Küçük bir porsiyon alıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich nehme eine kleine Portion",
          hint: [
            tr("Dişil bir isimde belirsiz artikelden sonra sıfat sonuna bir harf alır:"),
            de("Ich nehme eine kleine Portion."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Als Beilage nehme ich …"),
          tr("Bir edatla başlıyor ve o edat başta olduğu için özne fiilin arkasına düşüyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bugün ne yemek var?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Welches Gericht gibt es heute",
          hint: [
            tr("Soru sıfatı ismin cinsine göre ek alır ve 'var' kalıbı belirtme hâlini getirir:"),
            de("Welches Gericht gibt es heute?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich esse lieber Reis als Kartoffeln."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich esse lieber Reis als Kartoffeln.",
          answer: true,
          why: [
            tr(
              "Tercih bildiren kelime fiilden sonra, karşılaştırma bağlacı iki seçeneğin arasında: kalıp doğru kurulmuş.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi öğle molasındasın ve nerede ne yiyeceğinizi konuşuyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Öğle molasında bir iş arkadaşınla nereye gideceğinize karar veriyorsunuz. Tercihini söyle, sebebini belirt ve yemek seçimini yap.",
      partner: "her gün aynı yere gitmekten sıkılmış bir iş arkadaşı",
      opening: "Gehen wir wieder in die Cafeteria oder heute mal woanders hin?",
      openingTr: "Yine kafeteryaya mı gidelim, yoksa bugün başka bir yere mi?",
      goal: "Nereye gidileceğine karar verilmiş ve iki kişi de ne yiyeceğini söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-urlaub-antrag",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Urlaub beantragen",
    titleTr: "İzin istemek",
    summary: "İzin talebini yazılı ve sözlü olarak iletmeyi öğretir.",
    minutes: 10,
    focusId: "Modalverb-wollen",
    vocab: [
      { de: "der Urlaubstag", tr: "izin günü" },
      { de: "übermorgen", tr: "öbür gün" },
      { de: "vereinbaren", tr: "kararlaştırmak" },
      { de: "schriftlich", tr: "yazılı" },
      { de: "notfalls", tr: "gerekirse" },
      { de: "künftig", tr: "bundan sonra" },
      { de: "die Geschäftsreise", tr: "iş seyahati" },
      { de: "frühestens", tr: "en erken" },
    ],
    patterns: [
      { de: "Ich will im Juli Urlaub nehmen.", tr: "izin niyetini kararlı biçimde söyler" },
      { de: "Können wir einen Termin vereinbaren?", tr: "bir tarih üzerinde anlaşmayı önerir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün izin istiyoruz. Almanya'da izin sözlü konuşulur ama yazılı olarak da verilir; ikisinin dili biraz farklıdır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kararlı niyet bildiren kip fiilini bu modülün ilk dersinde görmüştün. Burada onu bir tarihle birlikte kullanacağız. Bir de zamanla ilgili dört kelime öğreneceğiz; bunlar izin ve randevu konuşmalarının belkemiği. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Urlaubstag"),
          tr("Türkçesi 'izin günü' demek. Lütfen"),
          de("der Urlaubstag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Urlaubstag" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("übermorgen"),
          tr("Türkçesi 'öbür gün' demek. Lütfen"),
          de("übermorgen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "übermorgen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("vereinbaren"),
          tr("Türkçesi 'kararlaştırmak, üzerinde anlaşmak' demek. Lütfen"),
          de("vereinbaren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vereinbaren" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schriftlich"),
          tr("Türkçesi 'yazılı olarak' demek. Lütfen"),
          de("schriftlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schriftlich" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("notfalls"),
          tr("Türkçesi 'gerekirse' demek. Lütfen"),
          de("notfalls"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "notfalls" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("künftig"),
          tr("Türkçesi 'bundan sonra' demek. Lütfen"),
          de("künftig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "künftig" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Geschäftsreise"),
          tr("Türkçesi 'iş seyahati' demek. Lütfen"),
          de("die Geschäftsreise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Geschäftsreise" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("frühestens"),
          tr("Türkçesi 'en erken' demek. Lütfen"),
          de("frühestens"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "frühestens" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich will im Juli Urlaub nehmen."),
          tr("Kip fiili ikinci sırada, asıl fiil sonda; ay adı önüne kaynaşmış bir edat alıyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu yıl beş izin günüm kaldı.' Almancası:"),
          de("Dieses Jahr habe ich noch fünf Urlaubstage."),
          tr("Lütfen"),
          de("Dieses Jahr habe ich noch fünf Urlaubstage"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Dieses Jahr habe ich noch fünf Urlaubstage" },
      },
      {
        say: [tr("Sıra sende: 'Yazılı olarak başvurmam gerekiyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich muss mich schriftlich anmelden",
          hint: [
            tr("Dönüşlü zamir kip fiilinden sonra, asıl fiil sonda:"),
            de("Ich muss mich schriftlich anmelden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Können wir einen Termin vereinbaren?"),
          tr("Bir tarih üzerinde anlaşmayı önerir; iş ve resmî hayatta çok kullanılır."),
        ],
      },
      {
        say: [tr("Sıra sende: 'En erken cuma gelebilirim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kann frühestens am Freitag kommen",
          hint: [
            tr("Zaman zarfı kip fiilinden sonra, asıl fiil sonda:"),
            de("Ich kann frühestens am Freitag kommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich will nehmen im Juli Urlaub."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich will nehmen im Juli Urlaub.",
          answer: false,
          why: [
            tr("Kip fiili varken asıl fiil cümlenin en sonunda durur. Doğrusu:"),
            de("Ich will im Juli Urlaub nehmen."),
          ],
        },
      },
      {
        say: [tr("Şimdi yöneticinden izin istiyorsun. Tarihi söyle ve bir çözüm öner.")],
      },
    ],
    roleplay: {
      scene:
        "Yaz için izin almak istiyorsun ama o dönem ekipte iş yoğun. Yöneticine tarihini söyle, kaç gün istediğini belirt ve yokluğunda ne yapılacağına dair bir öneri getir.",
      partner: "izin çizelgesine bakan bir yönetici",
      opening: "Sie wollten wegen Urlaub sprechen? Wann hätten Sie denn frei?",
      openingTr: "İzin için görüşmek istemiştiniz? Ne zaman izinli olmak isterdiniz?",
      goal: "İzin tarihi ve süresi söylenmiş, bir engel konuşulmuş ve sonunda bir tarihte anlaşılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-krankmeldung-buero",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Die Krankmeldung",
    titleTr: "Rapor süreci",
    summary: "Hastalığı işe bildirmeyi ve raporu e-posta ile göndermeyi öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "die Halsschmerzen", tr: "boğaz ağrısı" },
      { de: "die Rückenschmerzen", tr: "sırt ağrısı" },
      { de: "die Migräne", tr: "migren" },
      { de: "der Durchfall", tr: "ishal" },
      { de: "ansteckend", tr: "bulaşıcı" },
      { de: "verschicken", tr: "yollamak" },
      { de: "der Anhang", tr: "ek" },
      { de: "der Betreff", tr: "konu başlığı" },
    ],
    patterns: [
      { de: "Ich muss Ihnen sagen, dass ich krank bin.", tr: "hastalığı resmî biçimde bildirir" },
      { de: "Das Attest ist im Anhang.", tr: "belgenin ekte olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün hastalığı işe bildiriyoruz. Almanya'da bu iki adımdır: aynı gün haber vermek ve belgeyi göndermek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Resmî bildirimde yan cümle kullanılır: 'söylemem gerekiyor ki hastayım'. Türkçede bu ağır durur, Almancada normaldir. Bir de e-posta kelimelerini öğreneceğiz; belgeyi doğru yere koymak sürecin yarısı. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Halsschmerzen"),
          tr("Türkçesi 'boğaz ağrısı' demek; hep çoğul kullanılır. Lütfen"),
          de("die Halsschmerzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Halsschmerzen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Rückenschmerzen"),
          tr("Türkçesi 'sırt ağrısı' demek. Lütfen"),
          de("die Rückenschmerzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rückenschmerzen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Migräne"),
          tr("Türkçesi 'migren' demek. Lütfen"),
          de("die Migräne"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Migräne" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Durchfall"),
          tr("Türkçesi 'ishal' demek. Lütfen"),
          de("der Durchfall"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Durchfall" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("ansteckend"),
          tr("Türkçesi 'bulaşıcı' demek. Lütfen"),
          de("ansteckend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ansteckend" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("verschicken"),
          tr("Türkçesi 'yollamak, göndermek' demek. Lütfen"),
          de("verschicken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verschicken" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Anhang"),
          tr("Türkçesi 'ek' demek; e-postaya eklenen dosya. Lütfen"),
          de("der Anhang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anhang" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Betreff"),
          tr("Türkçesi 'konu başlığı' demek. Lütfen"),
          de("der Betreff"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Betreff" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich muss Ihnen sagen, dass ich krank bin."),
          tr(
            "Ana cümlede kip fiili ikinci sırada ve asıl fiil sonda; yan cümlede ise ayrı bir fiil ve o da en sonda. İki kural aynı cümlede yan yana çalışıyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Boğazım ağrıyor ve bugün gelemiyorum.' Almancası:"),
          de("Ich habe Halsschmerzen und kann heute nicht kommen."),
          tr("Lütfen"),
          de("Ich habe Halsschmerzen und kann heute nicht kommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe Halsschmerzen und kann heute nicht kommen" },
      },
      {
        say: [tr("Sıra sende: 'Doktorun hastalığımın bulaşıcı olduğunu söyledi.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Arzt hat gesagt, dass es ansteckend ist",
          hint: [
            tr("Yan cümlede fiil en sona gider:"),
            de("Der Arzt hat gesagt, dass es ansteckend ist."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Das Attest ist im Anhang."),
          tr("Belgenin nerede olduğunu söyler; e-posta yazarken hazır bir cümle."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Belgeyi bugün gönderiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich verschicke das Dokument heute",
          hint: [
            tr("Vurgusuz ön ekle başlayan fiil düz çekilir ve nesne belirtme hâlinde durur:"),
            de("Ich verschicke das Dokument heute."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Arzt hat gesagt, dass es ist ansteckend."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Arzt hat gesagt, dass es ist ansteckend.",
          answer: false,
          why: [
            tr("Yan cümlede fiil en sona gider, ikinci sıraya değil. Doğrusu:"),
            de("Der Arzt hat gesagt, dass es ansteckend ist."),
          ],
        },
      },
      {
        say: [tr("Şimdi hastasın ve işe haber veriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Sabah hastalandın ve işe haber vermek için ofisi arıyorsun. Neyin olduğunu söyle, kaç gün geleyemeceğini belirt ve belgeyi nasıl göndereceğini konuş.",
      partner: "insan kaynaklarından telefona bakan bir görevli",
      opening: "Guten Morgen, Personalabteilung. Was kann ich für Sie tun?",
      openingTr: "Günaydın, insan kaynakları. Size nasıl yardımcı olabilirim?",
      goal: "Hastalık bildirilmiş, süre söylenmiş ve belgenin ne zaman ve nasıl geleceği kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-feedback",
    icon: "job",
    level: "A2",
    course: "de",
    title: "Das Gespräch mit der Chefin",
    titleTr: "Geri bildirim",
    summary: "Değerlendirme görüşmesinde geri bildirimi anlamayı ve cevaplamayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "bewerten", tr: "değerlendirmek" },
      { de: "motivieren", tr: "motive etmek" },
      { de: "die Beförderung", tr: "terfi" },
      { de: "der Bonus", tr: "prim" },
      { de: "der Verdienst", tr: "kazanç" },
      { de: "deutlich", tr: "net" },
      { de: "sorgfältig", tr: "özenli" },
      { de: "respektvoll", tr: "saygılı" },
    ],
    patterns: [
      { de: "Ich bin zufrieden, weil ich viel gelernt habe.", tr: "değerlendirmesini sebebiyle söyler" },
      { de: "Ich hätte gern mehr Verantwortung.", tr: "isteğini kibarca dile getirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde yıllık değerlendirme görüşmesindeyiz. Burada hem geri bildirimi anlaman hem de kendi isteğini söylemen gerekiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu görüşmede sebep bildirmek merkezî: her değerlendirmenin arkasında bir gerekçe vardır ve seninkini de gerekçesiyle söylemen beklenir. Modülün ikinci dersindeki bağlacı burada iş bağlamında kullanacağız. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("bewerten"),
          tr("Türkçesi 'değerlendirmek' demek. Lütfen"),
          de("bewerten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bewerten" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("motivieren"),
          tr("Türkçesi 'motive etmek' demek. Lütfen"),
          de("motivieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "motivieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Beförderung"),
          tr("Türkçesi 'terfi' demek. Lütfen"),
          de("die Beförderung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Beförderung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Bonus"),
          tr("Türkçesi 'prim' demek. Lütfen"),
          de("der Bonus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bonus" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Verdienst"),
          tr("Türkçesi 'kazanç' demek. Lütfen"),
          de("der Verdienst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Verdienst" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("deutlich"),
          tr("Türkçesi 'net, açık' demek. Lütfen"),
          de("deutlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "deutlich" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("sorgfältig"),
          tr("Türkçesi 'özenli, dikkatli' demek. Lütfen"),
          de("sorgfältig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sorgfältig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("respektvoll"),
          tr("Türkçesi 'saygılı' demek. Lütfen"),
          de("respektvoll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "respektvoll" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich bin zufrieden, weil ich viel gelernt habe."),
          tr(
            "Yan cümlede geçmiş zaman var ve yardımcı fiil en sona gidiyor; ortaç onun hemen önünde duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Memnunum çünkü ekip beni motive ediyor.' Almancası:"),
          de("Ich bin zufrieden, weil mich das Team motiviert."),
          tr("Lütfen"),
          de("Ich bin zufrieden, weil mich das Team motiviert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bin zufrieden, weil mich das Team motiviert" },
      },
      {
        say: [tr("Sıra sende: 'İşimi hep özenle yapıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich mache meine Arbeit immer sorgfältig",
          hint: [
            tr("Sıfat burada bir zarf gibi kullanılıyor ve hiç ek almıyor:"),
            de("Ich mache meine Arbeit immer sorgfältig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız isteği kibarca söylüyor:"),
          de("Ich hätte gern mehr Verantwortung."),
          tr(
            "Sahip olmak fiilinin bu biçimi bir istek bildirir ve doğrudan istemekten çok daha kibardır.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Terfi hakkında konuşmak istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte über eine Beförderung sprechen",
          hint: [
            tr("Konu bildiren edat belirtme hâlini getirir ve asıl fiil sonda kalır:"),
            de("Ich möchte über eine Beförderung sprechen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich bin zufrieden, weil ich habe viel gelernt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich bin zufrieden, weil ich habe viel gelernt.",
          answer: false,
          why: [
            tr("Yan cümlede geçmiş zamanın yardımcı fiili en sona gider. Doğrusu:"),
            de("Ich bin zufrieden, weil ich viel gelernt habe."),
          ],
        },
      },
      {
        say: [tr("Şimdi yıllık değerlendirme görüşmesindesin. Geri bildirimi al ve isteğini söyle.")],
      },
    ],
    roleplay: {
      scene:
        "Yıllık değerlendirme görüşmesindesin. Yöneticin sana geri bildirim veriyor; bir noktada katılmadığını gerekçesiyle söyle ve bir isteğini kibarca dile getir.",
      partner: "doğrudan konuşan ama dinleyen bir yönetici",
      opening: "Setzen Sie sich. Wie war dieses Jahr für Sie?",
      openingTr: "Buyurun oturun. Bu yıl sizin için nasıl geçti?",
      goal: "Yıl değerlendirilmiş, bir noktada gerekçeli itiraz yapılmış ve bir istek dile getirilip cevaplanmış olur.",
      minTurns: 8,
    },
  },
];

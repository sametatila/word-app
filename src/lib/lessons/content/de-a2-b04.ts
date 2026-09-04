import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 4 — Ev ve mahalle (konular 031-040).
 *
 * Modülün tamamı tek bir hâlin etrafında dönüyor: Dativ. Öğrenci onu üç ayrı
 * yerde görüyor ve üçünde de aynı soruyu soruyor — KİME, NEREDE.
 *
 *   1. Kişi olarak (031, 037, 038): bir şeyi alan kişi Dativ'e giriyor.
 *   2. Yer olarak (033, 035, 036): bir şeyin nerede durduğu Dativ ile
 *      söyleniyor; nereye gittiği ise Akkusativ ile (034).
 *   3. Edat olarak (036): mahalle anlatırken kullanılan edatların hepsi
 *      Dativ istiyor.
 *
 * Sözlükçe havuzun A2 katmanından geliyor ve modülün ikinci işini de üstleniyor:
 * ev eşyası, alet, mahalle donanımı ve tamir sözcükleri havuzda çok sayıda
 * duruyordu ama derslerde hiç geçmiyordu. 033 ve 034'te yön/yer zarfları
 * (vorne, drinnen, drüben, hin, her) bilerek sözlükçeye alındı: bunlar
 * Wechselpräpositionen dersinin kendi malzemesi.
 */
export const deA2B04: Lesson[] = [
  {
    id: "de-a2-dativ-geben",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Ich leihe dir meinen Schirm",
    titleTr: "Dativ nesnesi",
    summary: "Bir şeyi birine verirken kişiyi doğru biçimde söylemeyi öğretir.",
    minutes: 10,
    focusId: "Personalpronomen-Dativ",
    vocab: [
      { de: "der Zettel", tr: "not kâğıdı" },
      { de: "die Pflanze", tr: "bitki" },
      { de: "der Schirm", tr: "şemsiye" },
      { de: "das Ding", tr: "şey" },
      { de: "leihen", tr: "ödünç vermek" },
      { de: "zurückgeben", tr: "geri vermek" },
      { de: "die Person", tr: "kişi" },
      { de: "weitersagen", tr: "başkasına söylemek" },
    ],
    patterns: [
      { de: "Ich leihe dir …", tr: "birine bir şey ödünç verdiğini söyler" },
      { de: "Ich gebe es dir zurück.", tr: "geri vereceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir şeyi birine verirken kişinin nasıl söylendiğini öğreniyoruz. Almancada alan kişi ayrı bir hâle giriyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Cümlede iki nesne var: verilen şey ve alan kişi. Türkçede alan kişiye '-e' eki gelir: bana, sana, ona. Almancada da bir hâl değişimi olur ve zamirler bunun için ayrı biçimler taşır. Sıra da önemli: alan kişi verilen şeyden ÖNCE gelir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Zettel"),
          tr("Türkçesi 'not kâğıdı' demek. Lütfen"),
          de("der Zettel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zettel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Pflanze"),
          tr("Türkçesi 'bitki' demek. Lütfen"),
          de("die Pflanze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Pflanze" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Schirm"),
          tr("Türkçesi 'şemsiye' demek. Lütfen"),
          de("der Schirm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schirm" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Ding"),
          tr("Türkçesi 'şey' demek; adını bilmediğin nesne için kullanılır. Lütfen"),
          de("das Ding"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ding" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("leihen"),
          tr("Türkçesi 'ödünç vermek' demek. Lütfen"),
          de("leihen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leihen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("zurückgeben"),
          tr("Türkçesi 'geri vermek' demek. Lütfen"),
          de("zurückgeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zurückgeben" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Person"),
          tr("Türkçesi 'kişi' demek. Lütfen"),
          de("die Person"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Person" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("weitersagen"),
          tr("Türkçesi 'başkasına söylemek, iletmek' demek. Lütfen"),
          de("weitersagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weitersagen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich leihe dir …"),
          tr(
            "Alan kişi fiilin hemen ardında ve yönelme hâlinde; verilen şey ondan sonra geliyor. Sıra bozulursa cümle Almanca kulağa yanlış gelir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sana şemsiyemi ödünç veriyorum.' Almancası:"),
          de("Ich leihe dir meinen Schirm."),
          tr("Lütfen"),
          de("Ich leihe dir meinen Schirm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich leihe dir meinen Schirm" },
      },
      {
        say: [tr("Sıra sende: 'Sana notu veriyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich gebe dir den Zettel",
          hint: [
            tr("Alan kişi önce ve yönelme hâlinde, verilen şey sonra ve belirtme hâlinde:"),
            de("Ich gebe dir den Zettel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich gebe es dir zurück."),
          tr(
            "Burada bir kural değişiyor: verilen şey zamir olduğunda öne geçiyor ve kişi arkaya düşüyor. İki zamir varsa hep önce belirtme hâlindeki gelir.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bunu kimseye söyleme.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sag das bitte nicht weiter",
          hint: [
            tr("Emir cümlesinde fiil başa geçer ve ayrılabilen ön ek sona düşer:"),
            de("Sag das bitte nicht weiter."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gebe den Zettel dir."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gebe den Zettel dir.",
          answer: false,
          why: [
            tr("İki nesneden biri zamirse zamir öne geçer. Doğrusu:"),
            de("Ich gebe dir den Zettel."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir komşuna bir şey ödünç veriyorsun ve ne zaman geri isteyeceğini söylüyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Komşun kapıya geldi ve senden bir şey ödünç istiyor. Ona ver, ne zaman geri getirmesi gerektiğini söyle ve dikkat etmesi gereken bir şeyi ekle.",
      partner: "aceleyle kapıya gelmiş bir komşu",
      opening: "Entschuldigung, kannst du mir kurz etwas leihen?",
      openingTr: "Pardon, bana kısa bir şey ödünç verebilir misin?",
      goal: "Bir eşya ödünç verilmiş, geri getirme zamanı kararlaştırılmış ve komşu teşekkür etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-wem-gehoert",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Wem gehört das?",
    titleTr: "Aitlik",
    summary: "Bir şeyin kime ait olduğunu sormayı ve cevaplamayı öğretir.",
    minutes: 10,
    focusId: "Dativ",
    vocab: [
      { de: "gehören", tr: "ait olmak" },
      { de: "der Handschuh", tr: "eldiven" },
      { de: "die Mütze", tr: "bere" },
      { de: "die Geldbörse", tr: "cüzdan" },
      { de: "die Brille", tr: "gözlük" },
      { de: "der Kopfhörer", tr: "kulaklık" },
      { de: "jemand", tr: "biri" },
      { de: "der Stiefel", tr: "çizme" },
    ],
    patterns: [
      { de: "Wem gehört das?", tr: "bir şeyin sahibini sorar" },
      { de: "Das gehört meiner Kollegin.", tr: "sahibini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kayıp eşyaları konuşuyoruz: bu kimin? Bu sorunun Almancası özel bir soru kelimesiyle kuruluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Aitlik fiili Almancada beklenmedik bir şey yapıyor: sahip olan kişi özne değil, yönelme hâlinde bir nesne. Türkçede 'bu benim' deriz ve 'ben' özne gibi durur; Almanca 'bu bana ait' der. Soru kelimesi de o hâlin kendi biçimini taşır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("gehören"),
          tr("Türkçesi 'ait olmak' demek. Lütfen"),
          de("gehören"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gehören" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Handschuh"),
          tr("Türkçesi 'eldiven' demek. Lütfen"),
          de("der Handschuh"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Handschuh" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Mütze"),
          tr("Türkçesi 'bere' demek. Lütfen"),
          de("die Mütze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mütze" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Geldbörse"),
          tr("Türkçesi 'cüzdan' demek. Lütfen"),
          de("die Geldbörse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Geldbörse" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Brille"),
          tr("Türkçesi 'gözlük' demek. Lütfen"),
          de("die Brille"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Brille" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Kopfhörer"),
          tr("Türkçesi 'kulaklık' demek. Lütfen"),
          de("der Kopfhörer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kopfhörer" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("jemand"),
          tr("Türkçesi 'biri, birisi' demek. Lütfen"),
          de("jemand"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jemand" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Stiefel"),
          tr("Türkçesi 'çizme' demek. Lütfen"),
          de("der Stiefel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stiefel" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wem gehört das?"),
          tr(
            "Soru kelimesi yönelme hâlinin kendi biçimi. 'Kim' sorusunun bu hâldeki karşılığı ve aitlik sorulurken hep bu kullanılır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu eldiven kimin?' Almancası:"),
          de("Wem gehört dieser Handschuh?"),
          tr("Lütfen"),
          de("Wem gehört dieser Handschuh"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wem gehört dieser Handschuh" },
      },
      {
        say: [tr("Sıra sende: 'Bu bere bana ait.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Diese Mütze gehört mir",
          hint: [
            tr("Sahip olan kişi yönelme hâlinde durur, eşya ise özne olur:"),
            de("Diese Mütze gehört mir."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Das gehört meiner Kollegin."),
          tr("Kişi bir isimse iyelik sıfatı da yönelme hâline girer ve sonu değişir."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bu kulaklık komşuma ait.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Kopfhörer gehört meinem Nachbarn",
          hint: [
            tr("Eril bir isim yönelme hâline girince hem iyelik sıfatı hem de ismin kendisi ek alır:"),
            de("Der Kopfhörer gehört meinem Nachbarn."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Diese Brille gehört mir."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Diese Brille gehört mir.",
          answer: true,
          why: [
            tr("Eşya özne, sahibi yönelme hâlinde: aitlik fiilinin doğru kuruluşu bu."),
          ],
        },
      },
      {
        say: [tr("Şimdi kayıp eşya masasındasın ve eşyaların sahibini arıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Bir kurs sonrası sınıfta unutulmuş eşyalar kaldı. Öğretmenle birlikte tek tek kimin olduğunu bulmaya çalışıyorsunuz.",
      partner: "eşyaları tek tek gösteren bir kurs öğretmeni",
      opening: "Hier ist noch einiges liegen geblieben. Wem gehört das hier?",
      openingTr: "Burada birkaç şey kalmış. Bu kimin?",
      goal: "En az üç eşyanın sahibi konuşulmuş, biri seninki çıkmış ve kalanlar için ne yapılacağına karar verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-wechsel-wo",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Wo liegt der Schlüssel?",
    titleTr: "Nerede: Dativ",
    summary: "Bir şeyin nerede durduğunu söylemeyi ve doğru fiili seçmeyi öğretir.",
    minutes: 10,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "die Schublade", tr: "çekmece" },
      { de: "der Nachttisch", tr: "komodin" },
      { de: "das Bücherregal", tr: "kitaplık" },
      { de: "hinter", tr: "arkasında" },
      { de: "neben", tr: "yanında" },
      { de: "gegenüber", tr: "karşısında" },
      { de: "vorne", tr: "önde" },
      { de: "drinnen", tr: "içeride" },
    ],
    patterns: [
      { de: "Der Schlüssel liegt in der Schublade.", tr: "yatan bir şeyin yerini söyler" },
      { de: "Das Buch steht im Regal.", tr: "duran bir şeyin yerini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir şeyin nerede olduğunu söylüyoruz. Almancada iki şey birden seçmen gerekiyor: doğru fiil ve doğru hâl. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bazı edatlar iki hâl birden alabilir. Hangisini alacağını soru belirler: NEREDE sorusuna cevap veriyorsa yönelme hâli, NEREYE sorusuna cevap veriyorsa belirtme hâli. Bugün ilkini çalışıyoruz. Ayrıca Türkçede tek bir 'duruyor' fiili varken Almanca nesnenin biçimine göre ayrı fiiller kullanır: yatan şey için başka, dik duran için başka. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Schublade"),
          tr("Türkçesi 'çekmece' demek. Lütfen"),
          de("die Schublade"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schublade" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Nachttisch"),
          tr("Türkçesi 'komodin' demek. Lütfen"),
          de("der Nachttisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Nachttisch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Bücherregal"),
          tr("Türkçesi 'kitaplık' demek. Lütfen"),
          de("das Bücherregal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bücherregal" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("hinter"),
          tr("Türkçesi 'arkasında' demek. Lütfen"),
          de("hinter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hinter" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("neben"),
          tr("Türkçesi 'yanında' demek. Lütfen"),
          de("neben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "neben" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("gegenüber"),
          tr("Türkçesi 'karşısında' demek. Lütfen"),
          de("gegenüber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gegenüber" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("vorne"),
          tr("Türkçesi 'önde, ön tarafta' demek. Lütfen"),
          de("vorne"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorne" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("drinnen"),
          tr("Türkçesi 'içeride' demek. Lütfen"),
          de("drinnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "drinnen" },
      },
      {
        say: [
          tr("İlk kalıbımız yatan bir şeyi anlatıyor:"),
          de("Der Schlüssel liegt in der Schublade."),
          tr(
            "Fiil 'yatıyor' anlamında ve edat yönelme hâlini getiriyor, çünkü soru NEREDE. Dişil isimde artikel bu hâlde değişiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Gözlüğüm komodinin üstünde duruyor.' Almancası:"),
          de("Meine Brille liegt auf dem Nachttisch."),
          tr("Lütfen"),
          de("Meine Brille liegt auf dem Nachttisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Meine Brille liegt auf dem Nachttisch" },
      },
      {
        say: [tr("Sıra sende: 'Kitaplık kapının arkasında.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das Bücherregal steht hinter der Tür",
          hint: [
            tr("Dik duran bir mobilya için 'duruyor' fiili kullanılır ve edat yönelme hâlini getirir:"),
            de("Das Bücherregal steht hinter der Tür."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız dik duran bir şeyi anlatıyor:"),
          de("Das Buch steht im Regal."),
          tr(
            "Aynı yer, başka fiil. Kitap rafta dik duruyorsa bu fiil, masada yatıyorsa öteki fiil kullanılır.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Fırın buzdolabının yanında.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Ofen steht neben dem Kühlschrank",
          hint: [
            tr("Eril bir isim yönelme hâline girince artikeli değişir:"),
            de("Der Ofen steht neben dem Kühlschrank."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Schlüssel liegt in der Schublade."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Schlüssel liegt in der Schublade.",
          answer: true,
          why: [
            tr(
              "Soru NEREDE olduğu için edat yönelme hâlini getiriyor ve yatan bir nesne için doğru fiil seçilmiş.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana evde bir şeyin nerede olduğunu soruyor. Tarif et.")],
      },
    ],
    roleplay: {
      scene:
        "Ev arkadaşın seni arıyor ve evde bıraktığı bir şeyi bulman için tarif istiyor. Odayı gezip nerede ne olduğunu söyle.",
      partner: "işte olan ve telefonda tarif isteyen ev arkadaşın",
      opening: "Kannst du mal nachsehen? Ich weiß nicht mehr, wo meine Brille liegt.",
      openingTr: "Bir bakabilir misin? Gözlüğümü nereye koyduğumu unuttum.",
      goal: "En az üç yer tarif edilmiş, aranan eşya bulunmuş ve nerede olduğu net bir cümleyle söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-wechsel-wohin",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Wohin stelle ich das?",
    titleTr: "Nereye: Akkusativ",
    summary: "Bir şeyi bir yere koyarken doğru biçimi ve fiili seçmeyi öğretir.",
    minutes: 10,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "hängen", tr: "asmak" },
      { de: "aufhängen", tr: "asmak (yukarı)" },
      { de: "hinstellen", tr: "oraya koymak" },
      { de: "anbringen", tr: "takmak" },
      { de: "befestigen", tr: "sabitlemek" },
      { de: "stapeln", tr: "istiflemek" },
      { de: "hin", tr: "oraya" },
      { de: "her", tr: "buraya" },
    ],
    patterns: [
      { de: "Ich hänge das Bild an die Wand.", tr: "bir şeyi bir yere astığını söyler" },
      { de: "Stell die Blumen bitte dort hin.", tr: "nereye konacağını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Geçen ders NEREDE sorusunu çalıştık. Bugün NEREYE sorusunu çalışıyoruz ve hâl değişiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Aynı edatlar, başka hâl: hareket varsa, yani bir şey bir yere gidiyorsa, edat belirtme hâlini getirir. İki küçük kelime de bugün işine yarayacak: biri konuşandan uzağa, öteki konuşana doğru hareketi gösterir. Türkçede ikisi de 'oraya' ve 'buraya' ile karşılanır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("hängen"),
          tr("Türkçesi 'asmak' demek. Lütfen"),
          de("hängen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hängen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("aufhängen"),
          tr("Türkçesi 'asmak, asıp bırakmak' demek; çamaşır ya da tablo için. Lütfen"),
          de("aufhängen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufhängen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("hinstellen"),
          tr("Türkçesi 'oraya koymak' demek. Lütfen"),
          de("hinstellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hinstellen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("anbringen"),
          tr("Türkçesi 'takmak, monte etmek' demek. Lütfen"),
          de("anbringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anbringen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("befestigen"),
          tr("Türkçesi 'sabitlemek' demek. Lütfen"),
          de("befestigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "befestigen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("stapeln"),
          tr("Türkçesi 'üst üste istiflemek' demek. Lütfen"),
          de("stapeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stapeln" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("hin"),
          tr("Türkçesi 'oraya' demek; konuşandan uzağa doğru hareket. Lütfen"),
          de("hin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hin" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("her"),
          tr("Türkçesi 'buraya' demek; konuşana doğru hareket. Lütfen"),
          de("her"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "her" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich hänge das Bild an die Wand."),
          tr(
            "Tablo duvara doğru hareket ediyor, o yüzden edat belirtme hâlini getiriyor. Aynı cümle 'duvarda asılı duruyor' olsaydı yönelme hâli gelirdi.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Çamaşırı balkona asıyorum.' Almancası:"),
          de("Ich hänge die Wäsche auf den Balkon."),
          tr("Lütfen"),
          de("Ich hänge die Wäsche auf den Balkon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich hänge die Wäsche auf den Balkon" },
      },
      {
        say: [tr("Sıra sende: 'Kutuları bodruma istifliyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich stapele die Kartons in den Keller",
          hint: [
            tr("Hareket olduğu için edat belirtme hâlini getirir:"),
            de("Ich stapele die Kartons in den Keller."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir emir:"),
          de("Stell die Blumen bitte dort hin."),
          tr("Ayrılabilen ön ek cümlenin sonuna düşüyor ve yön bildiriyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Lütfen buraya gel.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Komm bitte mal her",
          hint: [
            tr("Konuşana doğru hareket için ikinci küçük kelime kullanılır ve sonda durur:"),
            de("Komm bitte mal her."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich hänge das Bild an der Wand."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich hänge das Bild an der Wand.",
          answer: false,
          why: [
            tr(
              "Tablo duvara doğru hareket ediyor, o yüzden edat belirtme hâlini getirmeli; yazılan biçim 'duvarda asılıyken asıyorum' anlamına gelir. Doğrusu:",
            ),
            de("Ich hänge das Bild an die Wand."),
          ],
        },
      },
      {
        say: [tr("Şimdi yeni bir odayı düzenliyorsunuz ve neyin nereye gideceğini söylüyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla yeni odanı düzenliyorsunuz. O elinde bir eşyayla nereye koyacağını soruyor; sen her seferinde yeri söylüyorsun.",
      partner: "elinde kutularla dolaşan, sürekli soran bir arkadaş",
      opening: "Ich habe hier noch die Lampe. Wohin stelle ich die?",
      openingTr: "Elimde bir de lamba var. Bunu nereye koyayım?",
      goal: "En az üç eşyanın yeri söylenmiş, biri sonradan değiştirilmiş ve oda düzeni bitmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-einrichten",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Wir richten das Zimmer ein",
    titleTr: "Oda düzenleme",
    summary: "Odayı birlikte döşerken eşyaların yerini tartışmayı öğretir.",
    minutes: 10,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "renovieren", tr: "tadilat yapmak" },
      { de: "streichen", tr: "boyamak" },
      { de: "die Tapete", tr: "duvar kâğıdı" },
      { de: "der Fußboden", tr: "zemin" },
      { de: "die Matratze", tr: "şilte" },
      { de: "der Schreibtisch", tr: "çalışma masası" },
      { de: "eng", tr: "dar" },
      { de: "zwischen", tr: "arasında" },
    ],
    patterns: [
      { de: "Der Schreibtisch steht zwischen dem Fenster und dem Bett.", tr: "iki şeyin arasını tarif eder" },
      { de: "Wir wollen die Wände weiß streichen.", tr: "tadilat planını anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir odayı döşüyoruz. Hem tadilat kelimelerini hem de iki şeyin arasını tarif etmeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İki şeyin arasını anlatan edat, öteki iki hâlli edatlar gibi çalışır ama bir farkı vardır: iki isim birden alır ve ikisi de aynı hâle girer. NEREDE sorusuna cevap veriyorsa ikisi de yönelme hâlinde olur. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("renovieren"),
          tr("Türkçesi 'tadilat yapmak' demek. Lütfen"),
          de("renovieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "renovieren" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("streichen"),
          tr("Türkçesi 'boyamak' demek; duvar boyamak. Lütfen"),
          de("streichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "streichen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Tapete"),
          tr("Türkçesi 'duvar kâğıdı' demek. Lütfen"),
          de("die Tapete"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tapete" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Fußboden"),
          tr("Türkçesi 'zemin, döşeme' demek. Lütfen"),
          de("der Fußboden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Fußboden" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Matratze"),
          tr("Türkçesi 'şilte, yatak minderi' demek. Lütfen"),
          de("die Matratze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Matratze" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Schreibtisch"),
          tr("Türkçesi 'çalışma masası' demek. Lütfen"),
          de("der Schreibtisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schreibtisch" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("eng"),
          tr("Türkçesi 'dar' demek. Lütfen"),
          de("eng"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "eng" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zwischen"),
          tr("Türkçesi 'arasında' demek. Lütfen"),
          de("zwischen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zwischen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Der Schreibtisch steht zwischen dem Fenster und dem Bett."),
          tr("İki isim de yönelme hâlinde, çünkü soru NEREDE. İkisinin arasında bağlaç duruyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Şilte kapıyla pencerenin arasında.' Almancası:"),
          de("Die Matratze liegt zwischen der Tür und dem Fenster."),
          tr("Lütfen"),
          de("Die Matratze liegt zwischen der Tür und dem Fenster"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Matratze liegt zwischen der Tür und dem Fenster" },
      },
      {
        say: [tr("Sıra sende: 'Oda bana çok dar geliyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das Zimmer ist mir zu eng",
          hint: [
            tr("Kişiye göre bir değerlendirme yapılırken kişi yönelme hâlinde durur:"),
            de("Das Zimmer ist mir zu eng."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız planı anlatıyor:"),
          de("Wir wollen die Wände weiß streichen."),
          tr("Kip fiili ikinci sırada, asıl fiil sonda; renk sıfatı fiilden hemen önce duruyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Önce zemini yenileyeceğiz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Zuerst renovieren wir den Fußboden",
          hint: [
            tr("Sıra kelimesi başta olduğu için özne fiilin arkasına düşer:"),
            de("Zuerst renovieren wir den Fußboden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Schreibtisch steht zwischen dem Fenster und das Bett."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Schreibtisch steht zwischen dem Fenster und das Bett.",
          answer: false,
          why: [
            tr("Bu edat iki ismi birden alır ve ikisi de aynı hâle girer. Doğrusu:"),
            de("Der Schreibtisch steht zwischen dem Fenster und dem Bett."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir odayı birlikte döşüyorsunuz ve neyin nereye gideceğini tartışıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Yeni evine taşındın ve bir arkadaşınla odayı döşüyorsunuz. Neyin nereye gideceğini tartışın; bir eşyanın yerinde anlaşamayın ve sonunda bir karara varın.",
      partner: "senden farklı bir düzen isteyen bir arkadaş",
      opening: "Also, wohin kommt der Schreibtisch? Ans Fenster?",
      openingTr: "Peki, çalışma masası nereye gelsin? Pencerenin önüne mi?",
      goal: "En az üç eşyanın yeri konuşulmuş, bir konuda anlaşmazlık çıkmış ve sonunda ortak bir karara varılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-nachbarschaft",
    icon: "city",
    level: "A2",
    course: "de",
    title: "In meiner Nachbarschaft",
    titleTr: "Mahalle",
    summary: "Mahallende neyin nerede olduğunu anlatmayı öğretir.",
    minutes: 10,
    focusId: "Dativ-Präpositionen",
    vocab: [
      { de: "der Nachbar", tr: "komşu" },
      { de: "nebenan", tr: "yan tarafta" },
      { de: "der Bürgersteig", tr: "kaldırım" },
      { de: "die Kreuzung", tr: "kavşak" },
      { de: "die Ampel", tr: "trafik ışığı" },
      { de: "die Bushaltestelle", tr: "otobüs durağı" },
      { de: "drüben", tr: "karşıda" },
      { de: "die Nähe", tr: "yakınlık" },
    ],
    patterns: [
      { de: "Die Post ist in der Nähe vom Bahnhof.", tr: "bir yerin yakınını tarif eder" },
      { de: "Da drüben ist die Haltestelle.", tr: "karşıdaki bir yeri gösterir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün mahalleni anlatıyoruz. Yol tarifi vermenin ve bir yerin nerede olduğunu söylemenin kelimelerini öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Mahalle anlatırken kullandığın edatların neredeyse hepsi tek bir hâl istiyor: yönelme hâli. Bunlar iki hâlli edatlar gibi değil, hep aynı hâli getiriyorlar; bu iyi haber, çünkü karar vermene gerek kalmıyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Nachbar"),
          tr("Türkçesi 'komşu' demek. Lütfen"),
          de("der Nachbar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Nachbar" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("nebenan"),
          tr("Türkçesi 'yan tarafta, bitişikte' demek. Lütfen"),
          de("nebenan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nebenan" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Bürgersteig"),
          tr("Türkçesi 'kaldırım' demek. Lütfen"),
          de("der Bürgersteig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bürgersteig" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Kreuzung"),
          tr("Türkçesi 'kavşak' demek. Lütfen"),
          de("die Kreuzung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kreuzung" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Ampel"),
          tr("Türkçesi 'trafik ışığı' demek. Lütfen"),
          de("die Ampel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ampel" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Bushaltestelle"),
          tr("Türkçesi 'otobüs durağı' demek. Lütfen"),
          de("die Bushaltestelle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bushaltestelle" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("drüben"),
          tr("Türkçesi 'karşıda, öte tarafta' demek. Lütfen"),
          de("drüben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "drüben" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Nähe"),
          tr("Türkçesi 'yakınlık, yakın' demek. Lütfen"),
          de("die Nähe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nähe" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Die Post ist in der Nähe vom Bahnhof."),
          tr(
            "Kalıbın tamamı ezberlenir: bir edat, yönelme hâlinde bir isim ve arkasından ikinci bir edat. Türkçedeki 'garın yakınında' ile aynı işi görür.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Durak süpermarketin yakınında.' Almancası:"),
          de("Die Bushaltestelle ist in der Nähe vom Supermarkt."),
          tr("Lütfen"),
          de("Die Bushaltestelle ist in der Nähe vom Supermarkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Bushaltestelle ist in der Nähe vom Supermarkt" },
      },
      {
        say: [tr("Sıra sende: 'En iyi arkadaşım yan tarafta oturuyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Meine beste Freundin wohnt nebenan",
          hint: [
            tr("Bu kelime bir zarf; kendinden sonra isim almaz ve cümlenin sonunda durur:"),
            de("Meine beste Freundin wohnt nebenan."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir yeri gösteriyor:"),
          de("Da drüben ist die Haltestelle."),
          tr("Yer zarfı başa geçince özne fiilin arkasına düşüyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kavşakta bir trafik ışığı var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "An der Kreuzung gibt es eine Ampel",
          hint: [
            tr("'Var' kalıbından sonra isim belirtme hâline girer ve edat yönelme hâlini getirir:"),
            de("An der Kreuzung gibt es eine Ampel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Post ist in der Nähe vom Bahnhof."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Post ist in der Nähe vom Bahnhof.",
          answer: true,
          why: [
            tr("Kalıp doğru kurulmuş: edat yönelme hâlini getirmiş ve ikinci edat da kaynaşmış hâliyle yazılmış."),
          ],
        },
      },
      {
        say: [tr("Şimdi yeni taşınmış birine mahalleni anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Mahalleye yeni taşınan biri sana çevreyi soruyor. Nerede ne olduğunu, en yakın durağı ve alışverişi nerede yaptığını anlat.",
      partner: "mahalleye yeni taşınmış bir komşu",
      opening: "Ich bin gerade eingezogen. Wo kaufen Sie hier eigentlich ein?",
      openingTr: "Yeni taşındım. Siz burada alışverişi nerede yapıyorsunuz?",
      goal: "En az üç yer tarif edilmiş, en yakın durak söylenmiş ve yeni komşu nereye gideceğini anlamış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-leihen",
    icon: "greet",
    level: "A2",
    course: "de",
    title: "Kannst du mir helfen?",
    titleTr: "Ödünç ve yardım",
    summary: "Komşundan yardım ve eşya istemeyi, teşekkür etmeyi öğretir.",
    minutes: 10,
    focusId: "Personalpronomen-Dativ",
    vocab: [
      { de: "ausleihen", tr: "ödünç almak" },
      { de: "der Eimer", tr: "kova" },
      { de: "der Schraubenzieher", tr: "tornavida" },
      { de: "der Staubsauger", tr: "elektrikli süpürge" },
      { de: "die Werkstatt", tr: "tamirhane" },
      { de: "weiterhelfen", tr: "yardımcı olmak" },
      { de: "aushelfen", tr: "yardıma gitmek" },
      { de: "hilfsbereit", tr: "yardımsever" },
    ],
    patterns: [
      { de: "Kannst du mir kurz helfen?", tr: "yardım ister" },
      { de: "Kann ich mir … ausleihen?", tr: "bir eşyayı ödünç ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün yardım istemeyi öğreniyoruz. Almancada yardım fiili beklenmedik bir hâl istiyor ve bunu bilmeyen herkes aynı hatayı yapıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Yardım edilen kişi Almancada belirtme hâlinde değil, yönelme hâlinde durur. Türkçede de 'bana yardım et' deriz, yani mantık aslında aynı; ama Almanca öğrenirken çoğu kişi bu fiili düz bir nesneyle kurmaya çalışır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ausleihen"),
          tr("Türkçesi 'ödünç almak' demek. Lütfen"),
          de("ausleihen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausleihen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Eimer"),
          tr("Türkçesi 'kova' demek. Lütfen"),
          de("der Eimer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Eimer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Schraubenzieher"),
          tr("Türkçesi 'tornavida' demek. Lütfen"),
          de("der Schraubenzieher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schraubenzieher" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Staubsauger"),
          tr("Türkçesi 'elektrikli süpürge' demek. Lütfen"),
          de("der Staubsauger"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Staubsauger" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Werkstatt"),
          tr("Türkçesi 'tamirhane, atölye' demek. Lütfen"),
          de("die Werkstatt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Werkstatt" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("weiterhelfen"),
          tr("Türkçesi 'yardımcı olmak, yol göstermek' demek. Lütfen"),
          de("weiterhelfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weiterhelfen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("aushelfen"),
          tr("Türkçesi 'yardıma gitmek, elini uzatmak' demek. Lütfen"),
          de("aushelfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aushelfen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("hilfsbereit"),
          tr("Türkçesi 'yardımsever' demek. Lütfen"),
          de("hilfsbereit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hilfsbereit" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Kannst du mir kurz helfen?"),
          tr("Yardım edilen kişi yönelme hâlinde. Kip fiili başta olduğu için cümle soru oluyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bana kısa bir yardım eder misin?' cümlesinin kibar hâli:"),
          de("Könnten Sie mir bitte kurz helfen?"),
          tr("Lütfen"),
          de("Könnten Sie mir bitte kurz helfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Könnten Sie mir bitte kurz helfen" },
      },
      {
        say: [tr("Sıra sende: 'Bana yardımcı olabilir misiniz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Können Sie mir weiterhelfen",
          hint: [
            tr("Yardım edilen kişi yönelme hâlinde ve asıl fiil sonda:"),
            de("Können Sie mir weiterhelfen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız eşya istiyor:"),
          de("Kann ich mir … ausleihen?"),
          tr(
            "Bu fiil ödünç ALAN için kullanılır ve yanında yönelme hâlinde bir zamir taşır: kendine ödünç almak.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Süpürgeni ödünç alabilir miyim?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Kann ich mir deinen Staubsauger ausleihen",
          hint: [
            tr("Yönelme hâlindeki zamir kip fiilinden sonra, eşya ise belirtme hâlinde:"),
            de("Kann ich mir deinen Staubsauger ausleihen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Kannst du mich kurz helfen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Kannst du mich kurz helfen?",
          answer: false,
          why: [
            tr("Yardım fiili kişiyi yönelme hâline sokar, belirtme hâline değil. Doğrusu:"),
            de("Kannst du mir kurz helfen?"),
          ],
        },
      },
      {
        say: [tr("Şimdi komşundan hem yardım hem de bir alet istiyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Evde bir şey monte ediyorsun ama aletin yok. Komşunun kapısını çal, yardım iste, bir alet ödünç al ve ne zaman geri getireceğini söyle.",
      partner: "yardımsever ama meraklı bir komşu",
      opening: "Hallo! Kann ich Ihnen helfen?",
      openingTr: "Merhaba! Size yardımcı olabilir miyim?",
      goal: "Yardım istenmiş, bir alet ödünç alınmış, geri getirme sözü verilmiş ve teşekkür edilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-paket",
    icon: "mail",
    level: "A2",
    course: "de",
    title: "Ein Paket für den Nachbarn",
    titleTr: "Kargo teslim",
    summary: "Komşu adına gelen kargoyu almayı ve teslim etmeyi öğretir.",
    minutes: 10,
    focusId: "Dativ",
    vocab: [
      { de: "das Päckchen", tr: "küçük paket" },
      { de: "die Bestellung", tr: "sipariş" },
      { de: "der Postbote", tr: "postacı" },
      { de: "das Postfach", tr: "posta kutusu" },
      { de: "die Haustür", tr: "sokak kapısı" },
      { de: "die Türklingel", tr: "kapı zili" },
      { de: "austragen", tr: "dağıtmak" },
      { de: "benachrichtigen", tr: "haber vermek" },
    ],
    patterns: [
      { de: "Ich nehme das Päckchen für Sie an.", tr: "kargoyu komşu adına aldığını söyler" },
      { de: "Ich benachrichtige dich, wenn es da ist.", tr: "haber vereceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün komşu adına gelen kargoyu konuşuyoruz. Almanya'da bu çok sık olur ve iki tarafın da bilmesi gereken cümleler vardır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste iki hâl yan yana duruyor: kargoyu ALAN kişi yönelme hâlinde, kargonun KENDİSİ belirtme hâlinde. Bir de kimin adına aldığını söyleyen bir edat var ve o belirtme hâlini getiriyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Päckchen"),
          tr("Türkçesi 'küçük paket' demek. Lütfen"),
          de("das Päckchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Päckchen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Bestellung"),
          tr("Türkçesi 'sipariş' demek. Lütfen"),
          de("die Bestellung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bestellung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Postbote"),
          tr("Türkçesi 'postacı' demek. Lütfen"),
          de("der Postbote"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Postbote" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Postfach"),
          tr("Türkçesi 'posta kutusu' demek. Lütfen"),
          de("das Postfach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Postfach" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Haustür"),
          tr("Türkçesi 'sokak kapısı, bina kapısı' demek. Lütfen"),
          de("die Haustür"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Haustür" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Türklingel"),
          tr("Türkçesi 'kapı zili' demek. Lütfen"),
          de("die Türklingel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Türklingel" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("austragen"),
          tr("Türkçesi 'dağıtmak' demek; posta ya da gazete dağıtmak. Lütfen"),
          de("austragen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "austragen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("benachrichtigen"),
          tr("Türkçesi 'haber vermek, bilgilendirmek' demek. Lütfen"),
          de("benachrichtigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "benachrichtigen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich nehme das Päckchen für Sie an."),
          tr(
            "Kimin adına alındığını söyleyen edat belirtme hâlini getiriyor ve ayrılabilen ön ek cümlenin sonunda duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Paketi komşum için aldım.' Almancası:"),
          de("Ich habe das Päckchen für meinen Nachbarn angenommen."),
          tr("Lütfen"),
          de("Ich habe das Päckchen für meinen Nachbarn angenommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe das Päckchen für meinen Nachbarn angenommen" },
      },
      {
        say: [tr("Sıra sende: 'Postacı sabahları paketleri dağıtır.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Postbote trägt die Pakete am Vormittag aus",
          hint: [
            tr("Ayrılabilen fiilin ön eki şimdiki zamanda cümlenin sonuna düşer:"),
            de("Der Postbote trägt die Pakete am Vormittag aus."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız haber vermeyi anlatıyor:"),
          de("Ich benachrichtige dich, wenn es da ist."),
          tr("Yan cümlede fiil en sona gidiyor; bu kuralı modül 8 ve 9'da ayrıntılı çalışacağız."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Siparişim yarın geliyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Meine Bestellung kommt morgen",
          hint: [
            tr("Gelecekteki bir olay için şimdiki zaman yeter, zaman kelimesi bunu belli eder:"),
            de("Meine Bestellung kommt morgen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich nehme das Päckchen für meinen Nachbarn an."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich nehme das Päckchen für meinen Nachbarn an.",
          answer: true,
          why: [
            tr(
              "Edat belirtme hâlini getirmiş, eril isim ona göre çekilmiş ve ayrılabilen ön ek sona düşmüş: cümle doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi komşunun paketi sende ve ona haber veriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Komşunun paketini senin adresine bıraktılar. Kapısını çal, paketi aldığını söyle, ne zaman geldiğini anlat ve teslim et.",
      partner: "paketini bekleyen ve şaşıran bir komşu",
      opening: "Oh, hallo! Kommen Sie rein — ist etwas passiert?",
      openingTr: "Aa, merhaba! Buyurun girin — bir şey mi oldu?",
      goal: "Paketin neden sende olduğu açıklanmış, teslim edilmiş ve komşu teşekkür edip bir karşılık önermiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-laerm",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Zu laut von oben",
    titleTr: "Gürültü şikâyeti",
    summary: "Üst kattaki gürültüyü kibarca konuşmayı ve şikâyeti yumuşatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "die Lautstärke", tr: "ses seviyesi" },
      { de: "stören", tr: "rahatsız etmek" },
      { de: "die Ruhe", tr: "sessizlik" },
      { de: "rücksichtslos", tr: "düşüncesiz" },
      { de: "sich beklagen", tr: "şikâyet etmek" },
      { de: "meckern", tr: "söylenmek" },
      { de: "nervig", tr: "sinir bozucu" },
      { de: "nachts", tr: "geceleri" },
    ],
    patterns: [
      { de: "Wenn es zu laut ist, kann ich nicht schlafen.", tr: "koşul ile sonucu bağlar" },
      { de: "Könnten Sie bitte die Lautstärke leiser stellen?", tr: "isteği en kibar hâliyle söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün üst kattaki gürültüyü konuşuyoruz. Bu, Almanya'da en sık yaşanan komşu meselesi ve nasıl söylediğin sonucu değiştirir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Şikâyeti yumuşatmanın iki yolu var. Birincisi koşul cümlesi: suçlamak yerine 'şöyle olduğunda şu oluyor' demek. İkincisi kip fiilinin kibar biçimi. Koşul cümlesinde fiil en sona gider; bu kuralı modül 9'da ayrıntılı çalışacağız, burada kalıp olarak kullanacağız. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Lautstärke"),
          tr("Türkçesi 'ses seviyesi' demek. Lütfen"),
          de("die Lautstärke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Lautstärke" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("stören"),
          tr("Türkçesi 'rahatsız etmek' demek. Lütfen"),
          de("stören"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stören" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Ruhe"),
          tr("Türkçesi 'sessizlik, huzur' demek. Lütfen"),
          de("die Ruhe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ruhe" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("rücksichtslos"),
          tr("Türkçesi 'düşüncesiz, başkasını hiç düşünmeyen' demek. Lütfen"),
          de("rücksichtslos"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rücksichtslos" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("sich beklagen"),
          tr("Türkçesi 'şikâyet etmek' demek. Lütfen"),
          de("sich beklagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich beklagen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("meckern"),
          tr("Türkçesi 'söylenmek, mızmızlanmak' demek. Lütfen"),
          de("meckern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "meckern" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("nervig"),
          tr("Türkçesi 'sinir bozucu' demek. Lütfen"),
          de("nervig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nervig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("nachts"),
          tr("Türkçesi 'geceleri' demek. Lütfen"),
          de("nachts"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nachts" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn es zu laut ist, kann ich nicht schlafen."),
          tr(
            "Koşul cümlesinde fiil en sonda. Koşul başta olduğu için ana cümlede özne fiilin arkasına düşüyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Geceleri gürültü olunca uyuyamıyorum.' Almancası:"),
          de("Wenn es nachts laut ist, kann ich nicht schlafen."),
          tr("Lütfen"),
          de("Wenn es nachts laut ist, kann ich nicht schlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wenn es nachts laut ist, kann ich nicht schlafen" },
      },
      {
        say: [tr("Sıra sende: 'Bu beni rahatsız ediyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das stört mich",
          hint: [
            tr("Rahatsız edilen kişi belirtme hâlinde durur:"),
            de("Das stört mich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız isteği en kibar hâliyle söylüyor:"),
          de("Könnten Sie bitte die Lautstärke leiser stellen?"),
          tr(
            "Kip fiilinin bu biçimi doğrudan istemez, rica eder. Komşu meselelerinde ilk seferde hep bu kullanılır.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Geceleri biraz sessizlik istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Nachts brauche ich etwas Ruhe",
          hint: [
            tr("Zaman zarfı başta olduğu için özne fiilin arkasına düşer:"),
            de("Nachts brauche ich etwas Ruhe."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn es zu laut ist, ich kann nicht schlafen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn es zu laut ist, ich kann nicht schlafen.",
          answer: false,
          why: [
            tr(
              "Yan cümle başta olduğunda ana cümlede fiil hemen virgülden sonra gelir ve özne arkaya düşer. Doğrusu:",
            ),
            de("Wenn es zu laut ist, kann ich nicht schlafen."),
          ],
        },
      },
      {
        say: [tr("Şimdi üst kat komşunla konuşuyorsun. Kibar başla, sorunu anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Üst kattaki komşun geceleri çok gürültü yapıyor ve bu hafta hiç uyuyamadın. Kapısını çal, kibar başla, sorunu anlat ve birlikte bir çözüm bulun.",
      partner: "gürültü yaptığının farkında olmayan üst kat komşusu",
      opening: "Hallo, was gibt's denn? Ist etwas nicht in Ordnung?",
      openingTr: "Merhaba, ne oldu? Bir sorun mu var?",
      goal: "Sorun kibarca anlatılmış, komşu bir açıklama yapmış ve iki taraf somut bir çözüm üzerinde anlaşmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-hausmeister",
    icon: "repair",
    level: "A2",
    course: "de",
    title: "Der Hausmeister kommt",
    titleTr: "Yönetici ile arıza",
    summary: "Evdeki arızayı tarif etmeyi ve tamir için randevu almayı öğretir.",
    minutes: 10,
    focusId: "Dativ",
    vocab: [
      { de: "der Wasserhahn", tr: "musluk" },
      { de: "die Heizung", tr: "kalorifer" },
      { de: "der Klempner", tr: "tesisatçı" },
      { de: "der Elektriker", tr: "elektrikçi" },
      { de: "defekt", tr: "arızalı" },
      { de: "die Glühbirne", tr: "ampul" },
      { de: "der Lichtschalter", tr: "ışık düğmesi" },
      { de: "lüften", tr: "havalandırmak" },
    ],
    patterns: [
      { de: "Die Heizung ist defekt.", tr: "arızayı bildirir" },
      { de: "Können Sie mir jemanden schicken?", tr: "tamirci istemeyi sağlar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde evdeki arızaları konuşuyoruz. Neyin bozulduğunu doğru söylemek, tamircinin doğru aleti getirmesi demek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Arıza bildirirken iki kalıp yeter: neyin bozuk olduğunu söylemek ve birinin gönderilmesini istemek. İkincisinde iki nesne yan yana geliyor — sana ve birini — ve modül boyunca çalıştığın sıra burada da geçerli: kişi önce, nesne sonra. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Wasserhahn"),
          tr("Türkçesi 'musluk' demek. Lütfen"),
          de("der Wasserhahn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wasserhahn" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Heizung"),
          tr("Türkçesi 'kalorifer' demek. Lütfen"),
          de("die Heizung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Heizung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Klempner"),
          tr("Türkçesi 'tesisatçı' demek. Lütfen"),
          de("der Klempner"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Klempner" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Elektriker"),
          tr("Türkçesi 'elektrikçi' demek. Lütfen"),
          de("der Elektriker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Elektriker" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("defekt"),
          tr("Türkçesi 'arızalı, bozuk' demek. Lütfen"),
          de("defekt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "defekt" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Glühbirne"),
          tr("Türkçesi 'ampul' demek. Lütfen"),
          de("die Glühbirne"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Glühbirne" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Lichtschalter"),
          tr("Türkçesi 'ışık düğmesi' demek. Lütfen"),
          de("der Lichtschalter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Lichtschalter" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("lüften"),
          tr("Türkçesi 'havalandırmak' demek. Lütfen"),
          de("lüften"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lüften" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Die Heizung ist defekt."),
          tr("Kısa ve net. Bozuk olan şey özne, sıfat yüklem olarak duruyor ve ek almıyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Mutfaktaki musluk damlıyor.' Almancası:"),
          de("Der Wasserhahn in der Küche ist defekt."),
          tr("Lütfen"),
          de("Der Wasserhahn in der Küche ist defekt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Wasserhahn in der Küche ist defekt" },
      },
      {
        say: [tr("Sıra sende: 'Koridordaki ampul bozuk.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Im Flur ist die Glühbirne kaputt",
          hint: [
            tr("Yer ifadesi başta olunca özne fiilin arkasına düşer:"),
            de("Im Flur ist die Glühbirne kaputt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız tamirci istiyor:"),
          de("Können Sie mir jemanden schicken?"),
          tr(
            "İki nesne yan yana: gönderilecek kişi belirtme hâlinde, senin için gönderileceğini söyleyen zamir yönelme hâlinde ve önde.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bize bir elektrikçi gönderebilir misiniz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Können Sie uns einen Elektriker schicken",
          hint: [
            tr("Kişi önce ve yönelme hâlinde, gönderilecek kişi sonra ve belirtme hâlinde:"),
            de("Können Sie uns einen Elektriker schicken?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Können Sie einen Klempner mir schicken?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Können Sie einen Klempner mir schicken?",
          answer: false,
          why: [
            tr("İki nesneden biri zamirse zamir öne geçer. Doğrusu:"),
            de("Können Sie mir einen Klempner schicken?"),
          ],
        },
      },
      {
        say: [tr("Şimdi bina yöneticisini arıyorsun ve arızayı bildiriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Evinde iki şey bozuldu ve bina yöneticisini arıyorsun. Neyin bozuk olduğunu tarif et, ne zamandır böyle olduğunu söyle ve birinin gönderilmesini iste.",
      partner: "telefonda not alan bir bina yöneticisi",
      opening: "Hausverwaltung Weber, guten Tag. Was ist bei Ihnen kaputt?",
      openingTr: "Weber bina yönetimi, iyi günler. Sizde ne bozuldu?",
      goal: "İki arıza tarif edilmiş, bir tamirci sözü alınmış ve gelecek gün ile saat kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
];

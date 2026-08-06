import { de, tr, type Lesson } from "../types";

/**
 * A1 · Parti 2 — konular 011-020 (Modül 2: Aile ve insanlar).
 *
 * Modülün omurgası iki küçük ek: iyelik kelimesinin dişilde uzaması
 * (mein/meine) ve eril adın nesne olunca değişmesi (ein/einen). İkisi de
 * bir kez öğrenilip modül boyunca aynı yerlerden geçiyor — olumsuzlama
 * (kein) aslında aynı ekin olumsuz kardeşi, bu yüzden hemen arkasından
 * geliyor. Çoğul, görünüş ve arkadaş anlatımı bu iskeleti gerçek
 * cümlelere yayıyor.
 */
export const deA1B02: Lesson[] = [
  {
    id: "de-a1-familie",
    icon: "family",
    level: "A1",
    course: "de",
    title: "Meine Familie",
    titleTr: "Ailem",
    summary:
      "Aile üyelerini tanıtmayı ve iyelik kelimesinin kelimeye göre nasıl değiştiğini öğretir.",
    minutes: 8,
    focusId: "Possessiv",
    vocab: [
      { de: "die Familie", tr: "aile" },
      { de: "die Mutter", tr: "anne" },
      { de: "der Vater", tr: "baba" },
      { de: "die Tochter", tr: "kız evlat" },
      { de: "der Sohn", tr: "oğul" },
    ],
    patterns: [
      { de: "Das ist mein …", tr: "eril bir yakınını tanıtırken kullanılır" },
      { de: "Das ist meine …", tr: "dişil bir yakınını tanıtırken kullanılır" },
      { de: "Ich habe …", tr: "kimlerin olduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün aileni tanıtmayı öğreneceğiz: 'Bu benim annem', 'Oğlumun adı Ali' gibi cümleler kuracaksın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'benim' hep aynı kalır: benim annem, benim babam. Almancada bu kelime yanındakine bakar ve dişil bir kelimenin önünde bir harf uzar. Bugünkü asıl işimiz o küçük harf. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Familie"),
          tr("Türkçesi 'aile' demek. Lütfen"),
          de("die Familie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Familie" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Mutter"),
          tr("Türkçesi 'anne' demek. Lütfen"),
          de("die Mutter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mutter" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Vater"),
          tr("Türkçesi 'baba' demek. Lütfen"),
          de("der Vater"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vater" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Tochter"),
          tr("Türkçesi 'kız evlat' demek. Lütfen"),
          de("die Tochter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tochter" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Sohn"),
          tr("Türkçesi 'oğul' demek. Lütfen"),
          de("der Sohn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sohn" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Das ist mein …"),
          tr("Yani 'Bu benim …' Ama tanıttığın kişi dişilse iyelik kelimesi"),
          de("meine"),
          tr("olur. Bakılan şey senin cinsiyetin değil, kelimenin cinsiyeti."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist mein Vater"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist mein Vater" },
      },
      {
        say: [tr("Sıra sende: 'Bu benim annem.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das ist meine Mutter",
          hint: [
            tr("Anne dişil bir kelime, bu yüzden iyelik sonuna bir harf alır:"),
            de("Das ist meine Mutter."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız aile üyesinin adını söyler:"),
          de("Mein Sohn heißt Ali."),
          tr("Buradaki fiili tanıyorsun; kendini tanıtırken de aynısını kullanmıştın."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mein Sohn heißt Ali"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mein Sohn heißt Ali" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Kızımın adı Anna.'")],
        expect: {
          kind: "produce",
          target: "Meine Tochter heißt Anna",
          hint: [
            tr("Kız evlat dişil bir kelime, iyelik yine uzar:"),
            de("Meine Tochter heißt Anna."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız kimlerin olduğunu söyler:"),
          de("Ich habe zwei Kinder."),
          tr(
            "Yani 'İki çocuğum var.' Almancada 'var' diye ayrı bir kelime yoktur; hep 'sahip olmak' fiiliyle kurulur.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe zwei Kinder"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe zwei Kinder" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist mein Mutter."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist mein Mutter.",
          answer: false,
          why: [
            tr("Yanlış. Anne dişil bir kelime, bu yüzden iyelik"),
            de("meine"),
            tr("olmalı. Doğrusu:"),
            de("Das ist meine Mutter."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık aileni tanıtabilirsin. Şimdi bir iş yemeğindesin ve masadaki biri ailenden söz etmeni istiyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir iş yemeğindesin ve masadaki biri ailenden söz etmeni istedi. Anneni, babanı ve çocuklarını tanıt, adlarını söyle.",
      partner: "kibar ve gerçekten ilgilenen bir masa arkadaşı",
      opening: "Erzählen Sie mal von Ihrer Familie. Haben Sie Kinder?",
      openingTr: "Ailenizden biraz söz edin. Çocuklarınız var mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-geschwister",
    icon: "family",
    level: "A1",
    course: "de",
    title: "Hast du Geschwister?",
    titleTr: "Kardeşler",
    summary:
      "Kardeşlerini anlatmayı ve eril adın nesne olunca nasıl değiştiğini öğretir.",
    minutes: 8,
    focusId: "Akkusativ-einen",
    vocab: [
      { de: "die Geschwister", tr: "kardeşler" },
      { de: "der Bruder", tr: "erkek kardeş" },
      { de: "die Schwester", tr: "kız kardeş" },
      { de: "die Eltern", tr: "anne baba" },
      { de: "haben", tr: "sahip olmak" },
    ],
    patterns: [
      { de: "Ich habe einen …", tr: "eril bir yakının olduğunu söyler" },
      { de: "Ich habe eine …", tr: "dişil bir yakının olduğunu söyler" },
      { de: "Hast du Geschwister?", tr: "kardeşi olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün kardeşlerinden konuşacağız ve Almancanın en çok kullanılan küçük kuralını öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'bir kardeşim var' derken 'bir' hiç değişmez. Almancada bir şeye sahip olduğunu söylerken o şey cümlenin nesnesi olur ve nesne olunca eril kelimeler biçim değiştirir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Geschwister"),
          tr("Türkçesi 'kardeşler' demek; bu kelime hep çoğuldur. Lütfen"),
          de("die Geschwister"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Geschwister" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Bruder"),
          tr("Türkçesi 'erkek kardeş' demek. Lütfen"),
          de("der Bruder"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bruder" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Schwester"),
          tr("Türkçesi 'kız kardeş' demek. Lütfen"),
          de("die Schwester"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schwester" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Eltern"),
          tr("Türkçesi 'anne baba' demek; bu da hep çoğul kullanılır. Lütfen"),
          de("die Eltern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Eltern" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("haben"),
          tr("Türkçesi 'sahip olmak' demek. Lütfen"),
          de("haben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "haben" },
      },
      {
        say: [
          tr("Şimdi bugünün kuralı."),
          de("ein Bruder"),
          tr("cümlenin nesnesi olunca"),
          de("einen Bruder"),
          tr(
            "olur. İyi haber şu: bu değişiklik yalnızca eril kelimelerde olur, dişil ve nötr kelimeler hiç kımıldamaz.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe einen Bruder"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe einen Bruder" },
      },
      {
        say: [tr("Sıra sende: 'Bir kız kardeşim var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe eine Schwester",
          hint: [
            tr("Kız kardeş dişil bir kelime, bu yüzden hiç değişmez:"),
            de("Ich habe eine Schwester."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız soru:"),
          de("Hast du Geschwister?"),
          tr("Kardeşleri sorarken çoğul kullanılır ve önüne hiçbir şey gelmez."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Hast du Geschwister"), tr("deyin.")],
        expect: { kind: "repeat", target: "Hast du Geschwister" },
      },
      {
        say: [tr("Şimdi daha belirli sor: 'Erkek kardeşin var mı?'")],
        expect: {
          kind: "produce",
          target: "Hast du einen Bruder",
          hint: [
            tr("Soruda da nesne aynı biçime girer:"),
            de("Hast du einen Bruder?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Cevabın 'hayır' ise hazır bir cümlen olsun:"),
          de("Nein, ich habe keine Geschwister."),
          tr(
            "Buradaki olumsuzluk kelimesini yakında tek tek açacağız; şimdilik hazır bir cümle olarak cebine koy.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Nein, ich habe keine Geschwister"), tr("deyin.")],
        expect: { kind: "repeat", target: "Nein, ich habe keine Geschwister" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe einen Bruder und eine Schwester."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe einen Bruder und eine Schwester.",
          answer: true,
          why: [
            tr("Doğru. Eril nesne"),
            de("einen"),
            tr("aldı, dişil nesne ise"),
            de("eine"),
            tr("olarak kaldı; ikisi de tam olması gerektiği gibi."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu kural bundan sonra her derste karşına çıkacak. Şimdi kahve molasındasın ve iş arkadaşın kardeşlerinden söz ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş yerinde kahve molasındasın ve iş arkadaşınla ailelerinizden konuşuyorsunuz. Kardeşlerini anlat, onunkileri de sor.",
      partner: "sohbeti seven, kalabalık ailesi olan bir iş arkadaşı",
      opening: "Ich habe drei Schwestern. Und du, hast du Geschwister?",
      openingTr: "Benim üç kız kardeşim var. Peki senin kardeşin var mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-kein",
    icon: "feelings",
    level: "A1",
    course: "de",
    title: "Nein, kein Problem!",
    titleTr: "kein ile olumsuzlama",
    summary:
      "Bir şeyin olmadığını söylemeyi ve günlük hayatın hazır ret cümlelerini öğretir.",
    minutes: 8,
    focusId: "Negation-kein",
    vocab: [
      { de: "das Problem", tr: "sorun" },
      { de: "die Zeit", tr: "zaman" },
      { de: "das Geld", tr: "para" },
      { de: "die Ahnung", tr: "fikir" },
      { de: "leider", tr: "maalesef" },
    ],
    patterns: [
      { de: "Ich habe kein …", tr: "nötr bir şeyin olmadığını söyler" },
      { de: "Ich habe keine …", tr: "dişil ve çoğul adlar için kullanılır" },
      { de: "Kein Problem!", tr: "'sorun değil' demek" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün 'yok' demeyi öğreneceğiz: vaktim yok, param yok, sorun değil. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Güzel haber: yeni bir kural öğrenmiyorsun. Geçen sefer öğrendiğin küçük kelimenin başına bir harf ekliyorsun, o kadar; sonu aynı biçimde değişiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Problem"),
          tr("Türkçesi 'sorun' demek. Lütfen"),
          de("das Problem"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Problem" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Zeit"),
          tr("Türkçesi 'zaman' demek. Lütfen"),
          de("die Zeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zeit" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Geld"),
          tr("Türkçesi 'para' demek. Lütfen"),
          de("das Geld"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Geld" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Ahnung"),
          tr("Türkçesi 'fikir' demek. Lütfen"),
          de("die Ahnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ahnung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("leider"),
          tr("Türkçesi 'maalesef' demek. Lütfen"),
          de("leider"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leider" },
      },
      {
        say: [
          tr("Şimdi kalıbımız:"),
          de("Ich habe keine Zeit."),
          tr("Yani 'Vaktim yok.' Bu olumsuzluk kelimesi adın önüne gelir ve sonu adın cinsiyetine göre değişir:"),
          de("kein Geld"),
          tr("ama"),
          de("keine Zeit"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe keine Zeit"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe keine Zeit" },
      },
      {
        say: [tr("Sıra sende: 'Param yok.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe kein Geld",
          hint: [
            tr("Para nötr bir kelime, bu yüzden olumsuzluk kelimesi kısa hâlinde kalır:"),
            de("Ich habe kein Geld."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Eril adlarda ise nesne kuralı burada da işler:"),
          de("Ich habe keinen Bruder."),
          tr("Sondaki ek, sahip olduğun şeyi söylerkenki ekin aynısı."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe keinen Bruder"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe keinen Bruder" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Hiç kardeşim yok.'")],
        expect: {
          kind: "produce",
          target: "Ich habe keine Geschwister",
          hint: [
            tr("Kardeşler çoğul bir kelime ve çoğulda olumsuzluk sonuna bir harf alır:"),
            de("Ich habe keine Geschwister."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Günlük hayatın iki hazır cümlesi de bu kelimeyle kurulur:"),
          de("Kein Problem!"),
          tr("yani 'Sorun değil' ve"),
          de("Keine Ahnung!"),
          tr("yani 'Hiç bilmiyorum'."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Kein Problem"), tr("deyin.")],
        expect: { kind: "repeat", target: "Kein Problem" },
      },
      {
        say: [tr("Şimdi de"), de("Keine Ahnung"), tr("deyin.")],
        expect: { kind: "repeat", target: "Keine Ahnung" },
      },
      {
        say: [
          tr("Kibarca hayır demek istersen araya tek kelime eklemen yeter:"),
          de("Ich habe leider keine Zeit."),
          tr("Yani 'Maalesef vaktim yok.'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe nicht Zeit."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe nicht Zeit.",
          answer: false,
          why: [
            tr("Yanlış. Bir adı olumsuzlarken bugünkü kelimemiz kullanılır. Doğrusu:"),
            de("Ich habe keine Zeit."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kibarca hayır diyebilirsin. Şimdi bir arkadaşın seni bu akşam dışarı çağırıyor ama ne vaktin ne paran var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın seni bu akşam yemeğe çağırıyor ama ne vaktin ne de paran var. Kibarca hayır de ve nedenini anlat.",
      partner: "ısrarcı ama sonunda anlayış gösteren bir arkadaş",
      opening: "Wir gehen heute Abend essen. Kommst du mit?",
      openingTr: "Bu akşam yemeğe gidiyoruz. Sen de gelir misin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-haustiere",
    icon: "dog",
    level: "A1",
    course: "de",
    title: "Hast du ein Haustier?",
    titleTr: "Evcil hayvanlar",
    summary:
      "Evcil hayvanını tanıtmayı, adını ve kaç yaşında olduğunu söylemeyi öğretir.",
    minutes: 8,
    focusId: "Akkusativ-einen",
    vocab: [
      { de: "das Haustier", tr: "evcil hayvan" },
      { de: "der Hund", tr: "köpek" },
      { de: "die Katze", tr: "kedi" },
      { de: "der Vogel", tr: "kuş" },
      { de: "süß", tr: "sevimli" },
    ],
    patterns: [
      { de: "Ich habe einen …", tr: "hangi hayvanın olduğunu söyler" },
      { de: "Er heißt …", tr: "hayvanın adını söyler" },
      { de: "Sie ist … Jahre alt.", tr: "kaç yaşında olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün evcil hayvanlardan konuşacağız: hangi hayvanın olduğunu, adını ve kaç yaşında olduğunu anlatmayı öğreneceksin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da bu soru tanışmanın ilk on dakikasında gelir; köpekler her yerde. Kardeşleri anlatırken öğrendiğin nesne kuralını burada da kullanacağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Haustier"),
          tr("Türkçesi 'evcil hayvan' demek. Lütfen"),
          de("das Haustier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Haustier" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Hund"),
          tr("Türkçesi 'köpek' demek. Lütfen"),
          de("der Hund"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hund" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Katze"),
          tr("Türkçesi 'kedi' demek. Lütfen"),
          de("die Katze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Katze" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Vogel"),
          tr("Türkçesi 'kuş' demek. Lütfen"),
          de("der Vogel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vogel" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("süß"),
          tr("Türkçesi 'sevimli' demek. Lütfen"),
          de("süß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "süß" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Ich habe einen Hund."),
          tr(
            "Köpek eril bir kelime ve burada nesne, bu yüzden tanıdığın o ek geldi. Kural gerçekten her yerde aynı işliyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe einen Hund"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe einen Hund" },
      },
      {
        say: [tr("Sıra sende: 'Bir kedim var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe eine Katze",
          hint: [
            tr("Kedi dişil bir kelime, bu yüzden nesne olsa da değişmez:"),
            de("Ich habe eine Katze."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız hayvanın adını söyler:"),
          de("Er heißt Rocky."),
          tr("Almanlar hayvanlara 'o' derken kelimenin cinsiyetine bakar: köpek eril olduğu için"),
          de("er"),
          tr("kedi dişil olduğu için"),
          de("sie"),
          tr("denir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Er heißt Rocky"), tr("deyin.")],
        expect: { kind: "repeat", target: "Er heißt Rocky" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız yaşını söyler ve bunu zaten biliyorsun:"),
          de("Sie ist drei Jahre alt."),
          tr("İnsanlar için ne diyorsan hayvanlar için de aynısı."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Sie ist drei Jahre alt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Sie ist drei Jahre alt" },
      },
      {
        say: [tr("Şimdi köpeğinden söz et: 'O beş yaşında.'")],
        expect: {
          kind: "produce",
          target: "Er ist fünf Jahre alt",
          hint: [
            tr("Köpek eril olduğu için 'o' yerine eril zamir gelir:"),
            de("Er ist fünf Jahre alt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de her hayvan sahibinin cümlesi:"),
          de("Sie ist sehr süß."),
          tr("Yani 'Çok sevimli.' Lütfen"),
          de("Sie ist sehr süß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Sie ist sehr süß" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe eine Katze und einen Vogel."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe eine Katze und einen Vogel.",
          answer: true,
          why: [
            tr("Doğru. Kedi dişil olduğu için"),
            de("eine"),
            tr("kuş eril olduğu için"),
            de("einen"),
            tr("— ikisi de tam yerinde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hayvanından söz edebilirsin. Şimdi parkta birinin köpeği yanına geldi ve sohbet başlıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Parkta bir bankta oturuyorsun ve yanına köpeğiyle biri oturdu. Kendi evcil hayvanını anlat, adını ve yaşını söyle, onunkini de sor.",
      partner: "hayvanlarına düşkün, konuşkan bir park sakini",
      opening: "Mein Hund heißt Rocky. Hast du auch ein Haustier?",
      openingTr: "Benim köpeğimin adı Rocky. Senin de evcil hayvanın var mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-fotos",
    icon: "camera",
    level: "A1",
    course: "de",
    title: "Wer ist das auf dem Foto?",
    titleTr: "Fotoğraftakiler",
    summary:
      "Fotoğraftaki kişileri sormayı ve 'bizim' ile 'onun' iyeliklerini kullanmayı öğretir.",
    minutes: 8,
    focusId: "Possessiv",
    vocab: [
      { de: "das Foto", tr: "fotoğraf" },
      { de: "wer", tr: "kim" },
      { de: "die Oma", tr: "büyükanne" },
      { de: "der Opa", tr: "dede" },
      { de: "die Tante", tr: "teyze, hala" },
    ],
    patterns: [
      { de: "Wer ist das auf dem Foto?", tr: "fotoğraftaki kişiyi sorar" },
      { de: "Das ist unser …", tr: "'bizim …' derken kullanılır" },
      { de: "Das ist ihre …", tr: "bir kadının yakınını tanıtır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün fotoğraflara bakacağız: kim olduğunu sormayı ve 'bizim dedemiz', 'onun teyzesi' gibi cümleleri öğreneceksin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İyelik kelimesinin dişilde uzadığını biliyorsun. Bugün aynı kural iki yeni kelimede geçerli olacak: 'bizim' ve 'onun'. Kural değişmiyor, sadece kelime değişiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Foto"),
          tr("Türkçesi 'fotoğraf' demek. Lütfen"),
          de("das Foto"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Foto" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("wer"),
          tr("Türkçesi 'kim' demek. Lütfen"),
          de("wer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Oma"),
          tr("Türkçesi 'babaanne' ya da 'anneanne' demek. Lütfen"),
          de("die Oma"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Oma" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Opa"),
          tr("Türkçesi 'dede' demek. Lütfen"),
          de("der Opa"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Opa" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Tante"),
          tr("Türkçesi 'teyze' ya da 'hala' demek. Lütfen"),
          de("die Tante"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tante" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Wer ist das auf dem Foto?"),
          tr("Yani 'Fotoğraftaki kim?' Soru kelimesi yine en başta duruyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wer ist das auf dem Foto"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wer ist das auf dem Foto" },
      },
      {
        say: [
          tr("İkinci kalıbımız cevabın:"),
          de("Das ist unser Opa."),
          tr("Yani 'Bu bizim dedemiz.' Dişil bir kelime gelseydi sonuna yine o harf eklenecekti."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist unser Opa"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist unser Opa" },
      },
      {
        say: [tr("Sıra sende: 'Bu bizim babaannemiz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das ist unsere Oma",
          hint: [
            tr("Babaanne dişil bir kelime, iyelik sonuna bir harf alır:"),
            de("Das ist unsere Oma."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız bir başkasının yakınını tanıtır:"),
          de("Das ist ihre Tante."),
          tr("Yani 'Bu onun teyzesi.' Buradaki 'onun' bir kadını gösteriyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist ihre Tante"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist ihre Tante" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bu onun oğlu.'")],
        expect: {
          kind: "produce",
          target: "Das ist ihr Sohn",
          hint: [
            tr("Oğul eril bir kelime, bu yüzden iyelik kısa hâlinde kalır:"),
            de("Das ist ihr Sohn."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist unser Oma."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist unser Oma.",
          answer: false,
          why: [
            tr("Yanlış. Babaanne dişil bir kelime, iyelik sonuna bir harf almalı. Doğrusu:"),
            de("Das ist unsere Oma."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir fotoğrafın başında sohbet edebilirsin. Şimdi ailenin albümünü bir arkadaşına gösteriyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ailenin fotoğraf albümünü bir arkadaşına gösteriyorsun. Fotoğraftakilerin kim olduğunu anlat, arkadaşın sorularına cevap ver.",
      partner: "her yüzü tek tek soran meraklı bir arkadaş",
      opening: "Schönes Foto! Wer ist das neben dir?",
      openingTr: "Güzel fotoğraf! Yanındaki kim?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-plural",
    icon: "book",
    level: "A1",
    course: "de",
    title: "Ein Kind, zwei Kinder",
    titleTr: "Çoğul",
    summary:
      "Almanca çoğulun neden ezberlendiğini ve sayı ile miktar ifadeleriyle nasıl kullanıldığını öğretir.",
    minutes: 9,
    focusId: "Plural",
    vocab: [
      { de: "das Kind", tr: "çocuk" },
      { de: "das Buch", tr: "kitap" },
      { de: "viele", tr: "birçok" },
      { de: "ein paar", tr: "birkaç" },
      { de: "die Leute", tr: "insanlar" },
    ],
    patterns: [
      { de: "Ich habe zwei …", tr: "kaç tane olduğunu söyler" },
      { de: "Ich habe viele …", tr: "çok sayıda olduğunu söyler" },
      { de: "ein paar …", tr: "birkaç tane demek" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün çoğul yapacağız: iki kitap, birçok insan, birkaç çocuk. Almanca çoğulun bir sırrı var, onu da söyleyeceğim. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Sır şu: Türkçede tek bir çoğul eki vardır ve her kelimeye yapışır. Almancada beş ayrı yol var ve hangisinin geleceği kestirilmez; bu yüzden çoğul, kelimeyle birlikte ezberlenir. Kötü haber gibi duruyor ama işin tamamı bu. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Kind"),
          tr("Türkçesi 'çocuk' demek. Lütfen"),
          de("das Kind"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kind" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Buch"),
          tr("Türkçesi 'kitap' demek. Lütfen"),
          de("das Buch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Buch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("viele"),
          tr("Türkçesi 'birçok' demek. Lütfen"),
          de("viele"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "viele" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz iki parçadan oluşuyor:"),
          de("ein paar"),
          tr("Türkçesi 'birkaç' demek. Lütfen"),
          de("ein paar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ein paar" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Leute"),
          tr("Türkçesi 'insanlar' demek; bu kelimenin tekili yoktur. Lütfen"),
          de("die Leute"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Leute" },
      },
      {
        say: [
          tr("Üç örnek, üç ayrı yol:"),
          de("das Kind – die Kinder, das Buch – die Bücher, die Frau – die Frauen"),
          tr("Gördüğün gibi bazen sona ek geliyor, bazen ortadaki sesli harf de değişiyor."),
        ],
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız ve önemli bir fark:"),
          de("Ich habe zwei Bücher."),
          tr(
            "Türkçede sayıdan sonra kelime tekil kalır, 'iki kitap' dersin. Almancada sayıdan sonra kelime mutlaka çoğula girer.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe zwei Bücher"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe zwei Bücher" },
      },
      {
        say: [tr("Sıra sende: 'Üç çocuğum var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe drei Kinder",
          hint: [
            tr("Sayıdan sonra kelime çoğula girer:"),
            de("Ich habe drei Kinder."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sayı vermeden çokluk anlatır:"),
          de("Hier sind viele Leute."),
          tr("Yani 'Burada çok insan var.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Hier sind viele Leute"), tr("deyin.")],
        expect: { kind: "repeat", target: "Hier sind viele Leute" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Birçok kitabım var.'")],
        expect: {
          kind: "produce",
          target: "Ich habe viele Bücher",
          hint: [
            tr("Çokluk kelimesinden sonra ad yine çoğul olur:"),
            de("Ich habe viele Bücher."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız daha küçük bir sayı için:"),
          de("ein paar Kinder"),
          tr("Yani 'birkaç çocuk'. Başındaki kelime tekil gibi görünse de arkasından hep çoğul gelir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("ein paar Kinder"), tr("deyin.")],
        expect: { kind: "repeat", target: "ein paar Kinder" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe ein paar Bücher."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe ein paar Bücher.",
          answer: true,
          why: [
            tr("Doğru."),
            de("ein paar"),
            tr("tek parça bir ifadedir ve arkasından hep çoğul gelir; kitap da doğru çoğul biçiminde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Çoğul artık korkutucu değil. Şimdi bir ikinci el kitap standındasın ve satıcı kaç tane aldığını soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir ikinci el kitap standındasın ve satıcı kaç kitap aldığını soruyor. Sayılarla ve çokluk kelimeleriyle anlat.",
      partner: "geveze, pazarlığı seven bir stant satıcısı",
      opening: "Guten Tag! Wie viele Bücher nehmen Sie?",
      openingTr: "İyi günler! Kaç kitap alıyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-aussehen",
    icon: "star",
    level: "A1",
    course: "de",
    title: "Wie sieht er aus?",
    titleTr: "Dış görünüş",
    summary:
      "Birinin dış görünüşünü anlatmayı ve özellik ile parçanın farklı fiiller aldığını öğretir.",
    minutes: 8,
    focusId: "Sein-Haben",
    vocab: [
      { de: "groß", tr: "uzun boylu" },
      { de: "klein", tr: "kısa boylu" },
      { de: "die Haare", tr: "saçlar" },
      { de: "die Brille", tr: "gözlük" },
      { de: "tragen", tr: "giymek" },
    ],
    patterns: [
      { de: "Er ist …", tr: "birinin nasıl biri olduğunu anlatır" },
      { de: "Sie hat … Haare.", tr: "saçını anlatır" },
      { de: "Er trägt eine Brille.", tr: "gözlük taktığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün birini tarif etmeyi öğreneceğiz: boyu, saçı, gözlüğü. Bu cümleler birini kalabalıkta bulman gerektiğinde hayat kurtarır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir ayrım var ve Türkçede yok: kişinin kendisiyle ilgili bir özellik söylüyorsan 'olmak' fiili, üstündeki ya da vücudundaki bir şeyi söylüyorsan 'sahip olmak' fiili kullanılır. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("groß"),
          tr("Türkçesi 'uzun boylu' ya da 'büyük' demek. Lütfen"),
          de("groß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "groß" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("klein"),
          tr("Türkçesi 'kısa boylu' ya da 'küçük' demek. Lütfen"),
          de("klein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "klein" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Haare"),
          tr("Türkçesi 'saçlar' demek; Almancada bu kelime hep çoğul kullanılır. Lütfen"),
          de("die Haare"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Haare" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Brille"),
          tr("Türkçesi 'gözlük' demek. Lütfen"),
          de("die Brille"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Brille" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("tragen"),
          tr("Türkçesi 'giymek' demek; gözlük ve şapka için de aynı fiil kullanılır. Lütfen"),
          de("tragen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tragen" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Er ist groß."),
          tr("Boy bir özelliktir, bu yüzden 'olmak' fiiliyle söylenir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Er ist groß"), tr("deyin.")],
        expect: { kind: "repeat", target: "Er ist groß" },
      },
      {
        say: [tr("Sıra sende: bir kadın için 'O kısa boylu.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sie ist klein",
          hint: [
            tr("Kadın için dişil zamir gelir ve özellik yine 'olmak' fiiliyle söylenir:"),
            de("Sie ist klein."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımızda fiil değişiyor:"),
          de("Sie hat braune Haare."),
          tr(
            "Türkçede 'saçları kahverengi' dersin, Almanca 'kahverengi saçlara sahip' der. Birkaç renk:",
          ),
          de("braun, blond, schwarz"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Sie hat braune Haare"), tr("deyin.")],
        expect: { kind: "repeat", target: "Sie hat braune Haare" },
      },
      {
        say: [tr("Şimdi bir erkek için söyle: 'Saçları sarı.'")],
        expect: {
          kind: "produce",
          target: "Er hat blonde Haare",
          hint: [
            tr("Vücutla ilgili şeyler 'sahip olmak' fiiliyle söylenir:"),
            de("Er hat blonde Haare."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız gözlük için:"),
          de("Er trägt eine Brille."),
          tr("Bu fiil hem kıyafet hem gözlük için kullanılır; Türkçedeki 'takmak' ile 'giymek' ayrımı Almancada yok."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Er trägt eine Brille"), tr("deyin.")],
        expect: { kind: "repeat", target: "Er trägt eine Brille" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Sie ist groß und hat braune Haare."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Sie ist groß und hat braune Haare.",
          answer: true,
          why: [
            tr("Doğru. Boy bir özellik olduğu için 'olmak', saç ise vücuda ait olduğu için 'sahip olmak' fiiliyle söylenmiş; ikisi de tam yerinde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık birini tarif edebilirsin. Şimdi bir arkadaşın yeni tanıştığı kişiden söz ediyor ve sen nasıl biri olduğunu merak ediyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın yeni tanıştığı kişiden söz ediyor ve sen nasıl göründüğünü merak ediyorsun. Boyunu, saçını ve gözlük takıp takmadığını sor.",
      partner: "anlatmaya bayılan, biraz abartan bir arkadaş",
      opening: "Ich habe einen neuen Freund, er ist sehr groß. Wie sieht dein bester Freund aus?",
      openingTr: "Yeni bir arkadaşım var, çok uzun boylu. Senin en yakın arkadaşın nasıl biri?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-freunde",
    icon: "greet",
    level: "A1",
    course: "de",
    title: "Mein bester Freund",
    titleTr: "Arkadaşlar",
    summary:
      "Bir başkasından söz ederken fiilin sonunun nasıl değiştiğini öğretir.",
    minutes: 8,
    focusId: "Konjugation-Präsens",
    vocab: [
      { de: "der Freund", tr: "arkadaş" },
      { de: "die Freundin", tr: "kadın arkadaş" },
      { de: "treffen", tr: "buluşmak" },
      { de: "oft", tr: "sık sık" },
      { de: "zusammen", tr: "birlikte" },
    ],
    patterns: [
      { de: "Er wohnt in …", tr: "arkadaşının nerede oturduğunu söyler" },
      { de: "Sie arbeitet bei …", tr: "arkadaşının nerede çalıştığını söyler" },
      { de: "Wir treffen uns oft.", tr: "sık buluştuğunuzu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugüne kadar hep kendinden söz ettin. Bugün bir başkasından söz edeceğiz: arkadaşın nerede oturuyor, nerede çalışıyor, ne zaman buluşuyorsunuz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada fiilin sonu her kişide değişir ve özne asla düşmez. Türkçede 'geliyorum' tek başına yeter, kimden söz ettiğin ekten bellidir; Almancada o küçük özne kelimesini söylemek zorundasın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Freund"),
          tr("Türkçesi 'arkadaş' demek. Lütfen"),
          de("der Freund"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Freund" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Freundin"),
          tr("Türkçesi 'kadın arkadaş' demek; sondaki ek meslek adlarındakiyle aynı. Lütfen"),
          de("die Freundin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Freundin" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("treffen"),
          tr("Türkçesi 'buluşmak' demek. Lütfen"),
          de("treffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "treffen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("oft"),
          tr("Türkçesi 'sık sık' demek. Lütfen"),
          de("oft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "oft" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zusammen"),
          tr("Türkçesi 'birlikte' demek. Lütfen"),
          de("zusammen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zusammen" },
      },
      {
        say: [
          tr("Kuralı üç kelimede görebilirsin:"),
          de("ich wohne, du wohnst, er wohnt"),
          tr("Kendin için sona bir harf, karşındaki için iki harf, üçüncü kişi için tek harf geliyor."),
        ],
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Er wohnt in Berlin."),
          tr("Yani 'O Berlin'de oturuyor.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Er wohnt in Berlin"), tr("deyin.")],
        expect: { kind: "repeat", target: "Er wohnt in Berlin" },
      },
      {
        say: [tr("Sıra sende: bir kadın için 'O Hamburg'da oturuyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sie wohnt in Hamburg",
          hint: [
            tr("Üçüncü kişide fiil sonuna tek harf alır ve kadın için dişil zamir gelir:"),
            de("Sie wohnt in Hamburg."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız işi anlatır:"),
          de("Er arbeitet bei Aldi."),
          tr("Bu fiilde araya bir sesli harf giriyor, çünkü sonu tek başına söylenemiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Er arbeitet bei Aldi"), tr("deyin.")],
        expect: { kind: "repeat", target: "Er arbeitet bei Aldi" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Kadın arkadaşım Bosch'ta çalışıyor.'")],
        expect: {
          kind: "produce",
          target: "Meine Freundin arbeitet bei Bosch",
          hint: [
            tr("Kadın arkadaş dişil bir kelime, iyelik uzar; fiil de üçüncü kişi biçiminde kalır:"),
            de("Meine Freundin arbeitet bei Bosch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız ikinizi birden anlatır:"),
          de("Wir treffen uns oft."),
          tr("Yani 'Sık sık buluşuyoruz.' Bu kalıbı olduğu gibi ezberle, parçalara ayırmana gerek yok."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wir treffen uns oft"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wir treffen uns oft" },
      },
      {
        say: [
          tr("Birlikte bir şey yaptığınızı söylemek de kolay:"),
          de("Wir arbeiten zusammen."),
          tr("Yani 'Birlikte çalışıyoruz.'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Mein Freund wohnen in Berlin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Mein Freund wohnen in Berlin.",
          answer: false,
          why: [
            tr("Yanlış. Tek bir kişiden söz ediliyor, bu yüzden fiil sonuna tek harf almalı. Doğrusu:"),
            de("Mein Freund wohnt in Berlin."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir başkasını anlatabilirsin. Şimdi yeni bir tanıdığın senden sık sık söz ettiğin arkadaşını soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni bir tanıdığın, senin sık sık adını andığın arkadaşını merak ediyor. Nerede oturduğunu, ne iş yaptığını ve ne sıklıkta buluştuğunuzu anlat.",
      partner: "dinlemeyi seven, soru üstüne soru soran yeni bir tanıdık",
      opening: "Du sprichst so oft von Murat. Wer ist das?",
      openingTr: "Murat'tan çok söz ediyorsun. Kim bu?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-nicht",
    icon: "feelings",
    level: "A1",
    course: "de",
    title: "Das stimmt nicht!",
    titleTr: "nicht ile olumsuzlama",
    summary:
      "Fiilleri ve sıfatları olumsuzlamayı, olumsuzluk kelimesinin cümlede nereye gittiğini öğretir.",
    minutes: 9,
    focusId: "Negation-nicht",
    vocab: [
      { de: "nicht", tr: "değil" },
      { de: "verstehen", tr: "anlamak" },
      { de: "stimmen", tr: "doğru olmak" },
      { de: "gern", tr: "severek" },
      { de: "langsam", tr: "yavaş" },
    ],
    patterns: [
      { de: "Ich verstehe nicht.", tr: "anlamadığını söyler" },
      { de: "Das ist nicht …", tr: "bir şeyin öyle olmadığını söyler" },
      { de: "nicht so gern", tr: "pek sevmediğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün ikinci olumsuzluk kelimesini öğreneceğiz. Bir tanesini biliyorsun; o adları olumsuzluyordu, bu ise fiilleri ve sıfatları olumsuzluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede olumsuzluk fiilin içine girer: anlıyorum, anlamıyorum. Almancada ayrı bir kelimedir ve genellikle cümlenin sonuna atılır. Yeri şaşarsa cümle bozulur; neyse ki kural basit. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("nicht"),
          tr("Türkçesi 'değil' demek. Lütfen"),
          de("nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nicht" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("verstehen"),
          tr("Türkçesi 'anlamak' demek. Lütfen"),
          de("verstehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verstehen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("stimmen"),
          tr("Türkçesi 'doğru olmak' demek. Lütfen"),
          de("stimmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stimmen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("gern"),
          tr("Türkçesi 'severek' demek; bir şeyi sevdiğini söylerken kullanılır. Lütfen"),
          de("gern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gern" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("langsam"),
          tr("Türkçesi 'yavaş' demek. Lütfen"),
          de("langsam"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "langsam" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız ve muhtemelen en çok kullanacağın cümle:"),
          de("Ich verstehe nicht."),
          tr("Yani 'Anlamıyorum.' Olumsuzluk kelimesi fiilden sonra, cümlenin sonunda duruyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich verstehe nicht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich verstehe nicht" },
      },
      {
        say: [tr("Sıra sende: 'Çalışmıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich arbeite nicht",
          hint: [
            tr("Olumsuzluk kelimesi fiilin arkasına, cümlenin sonuna gider:"),
            de("Ich arbeite nicht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir iddiaya karşı çıkar:"),
          de("Das stimmt nicht."),
          tr("Yani 'Bu doğru değil.' Kibarca itiraz etmenin en kısa yolu."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das stimmt nicht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das stimmt nicht" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bu benim kitabım değil.'")],
        expect: {
          kind: "produce",
          target: "Das ist nicht mein Buch",
          hint: [
            tr("Burada olumsuzlanan şey kitabın kime ait olduğu, bu yüzden olumsuzluk kelimesi tam onun önüne gelir:"),
            de("Das ist nicht mein Buch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir şeyi pek sevmediğini söylemek için üç kelimelik hazır bir kalıp var:"),
          de("nicht so gern"),
          tr("Örnek:"),
          de("Ich schreibe nicht so gern."),
          tr("Yani 'Yazmayı pek sevmiyorum.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich schreibe nicht so gern"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich schreibe nicht so gern" },
      },
      {
        say: [
          tr("Ve karşındaki hızlı konuşuyorsa iki cümlen hazır olsun:"),
          de("Ich verstehe nicht. Langsam, bitte."),
          tr("Bunu söylemekten hiç çekinme; herkes anlayışla karşılar."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Langsam, bitte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Langsam, bitte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich verstehe nicht das."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich verstehe nicht das.",
          answer: false,
          why: [
            tr("Yanlış. Cümlede bir nesne varsa olumsuzluk kelimesi ondan sonra, en sona gider. Doğrusu:"),
            de("Ich verstehe das nicht."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık anlamadığını söyleyebilir ve itiraz edebilirsin. Şimdi bir görevli sana hızlı hızlı bir şeyler anlatıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kurumda görevli sana hızlı hızlı yönlendirme yapıyor ve yarısını anlamıyorsun. Anlamadığını söyle, yavaşlatmasını iste ve yanlış anladığı bir şeyi düzelt.",
      partner: "aceleci ama iyi niyetli bir görevli",
      opening: "Sie brauchen das Formular A und dann Zimmer zwölf, klar?",
      openingTr: "A formu lazım, sonra on ikinci odaya gideceksiniz, tamam mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-familienfest",
    icon: "party",
    level: "A1",
    course: "de",
    title: "Das Familienfest",
    titleTr: "Aile buluşması",
    summary:
      "Bir aile buluşmasını planlamayı: kimin geleceğini ve kimin ne getireceğini söylemeyi öğretir.",
    minutes: 8,
    focusId: "Possessiv",
    vocab: [
      { de: "das Fest", tr: "kutlama" },
      { de: "feiern", tr: "kutlamak" },
      { de: "bringen", tr: "getirmek" },
      { de: "der Onkel", tr: "amca, dayı" },
      { de: "der Kuchen", tr: "kek" },
    ],
    patterns: [
      { de: "Wer kommt zum Fest?", tr: "kimlerin geleceğini sorar" },
      { de: "Meine Tante bringt …", tr: "kimin ne getireceğini söyler" },
      { de: "Wir feiern zusammen.", tr: "birlikte kutladığınızı söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün bir aile buluşması planlayacağız: kim geliyor, kim ne getiriyor. Bu modülde öğrendiğin her şey bugün bir araya gelecek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Yeni bir kural yok; iyelik kelimesi ile nesne eki yan yana çalışacak. İkisini aynı cümlede doğru kurabilirsen bu modülü bitirmişsin demektir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Fest"),
          tr("Türkçesi 'kutlama' demek. Lütfen"),
          de("das Fest"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fest" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("feiern"),
          tr("Türkçesi 'kutlamak' demek. Lütfen"),
          de("feiern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "feiern" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("bringen"),
          tr("Türkçesi 'getirmek' demek. Lütfen"),
          de("bringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bringen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Onkel"),
          tr("Türkçesi 'amca' ya da 'dayı' demek. Lütfen"),
          de("der Onkel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Onkel" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Kuchen"),
          tr("Türkçesi 'kek' demek. Lütfen"),
          de("der Kuchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kuchen" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Wer kommt zum Fest?"),
          tr("Yani 'Kutlamaya kim geliyor?' Soru kelimesi başta, fiil hemen arkasında."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wer kommt zum Fest"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wer kommt zum Fest" },
      },
      {
        say: [
          tr("İkinci kalıbımızda iki kural aynı anda çalışıyor:"),
          de("Meine Tante bringt einen Kuchen."),
          tr(
            "Teyze dişil olduğu için iyelik uzadı; kek eril ve cümlenin nesnesi olduğu için sonuna o ek geldi.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Meine Tante bringt einen Kuchen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Meine Tante bringt einen Kuchen" },
      },
      {
        say: [tr("Sıra sende: 'Amcam bir kek getiriyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Onkel bringt einen Kuchen",
          hint: [
            tr("Amca eril bir kelime, bu yüzden iyelik kısa kalır; kek yine nesne olduğu için değişir:"),
            de("Mein Onkel bringt einen Kuchen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız buluşmanın kendisini anlatır:"),
          de("Wir feiern zusammen."),
          tr("Yani 'Birlikte kutluyoruz.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wir feiern zusammen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wir feiern zusammen" },
      },
      {
        say: [tr("Bir üretim daha: 'Annemler kutlamaya geliyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Meine Eltern kommen zum Fest",
          hint: [
            tr("Anne baba çoğul bir kelime; iyelik uzar ve fiil de çoğul biçiminde kalır:"),
            de("Meine Eltern kommen zum Fest."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Meine Oma bringt einen Kuchen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Meine Oma bringt einen Kuchen.",
          answer: true,
          why: [
            tr("Doğru. Babaanne dişil olduğu için iyelik uzamış, kek ise eril ve nesne olduğu için"),
            de("einen"),
            tr("almış; iki kural da doğru işlemiş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu modülü bitirdin: artık aileni tanıtabilir, kimin ne yaptığını anlatabilir ve gerektiğinde hayır diyebilirsin. Şimdi kuzeninle buluşmayı planlıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Cumartesi günkü aile buluşmasını kuzeninle planlıyorsun. Kimlerin geleceğini konuşun ve kimin ne getireceğine karar verin.",
      partner: "her şeyi listeleyen, planlamayı seven bir kuzen",
      opening: "Am Samstag feiern wir zusammen. Wer kommt alles?",
      openingTr: "Cumartesi birlikte kutluyoruz. Kimler geliyor?",
      minTurns: 4,
    },
  },
];

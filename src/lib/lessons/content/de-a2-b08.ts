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
 *
 * Sözlükçe havuzun A2 katmanından geliyor. Bu modül en çok "havuzda yok"
 * maddesi olan modüldü (16 madde): Weihnachten, Ostern, Feuerwerk,
 * Mitternacht, Vorsatz, Kompliment, Ausrede… Bunların bir kısmı havuzda
 * gerçekten eksik, bir kısmı ise madde başı değil. Dersler artık havuzda
 * BULUNAN kutlama sözcükleriyle çalışıyor (Weihnachtsbaum, schmücken,
 * Festival, Veranstaltung, Blumenstrauß, Trauzeuge, Braut, Bräutigam).
 */
export const deA2B08: Lesson[] = [
  {
    id: "de-a2-geburtstag",
    icon: "cake",
    level: "A2",
    course: "de",
    title: "Alles Gute zum Geburtstag!",
    titleTr: "Doğum günü",
    summary: "Doğum gününü kutlamayı ve tarihi söylemeyi öğretir.",
    minutes: 10,
    focusId: "Ordinalzahlen-Datum",
    vocab: [
      { de: "die Torte", tr: "pasta" },
      { de: "die Feier", tr: "kutlama" },
      { de: "das Fest", tr: "şenlik" },
      { de: "die Familienfeier", tr: "aile kutlaması" },
      { de: "festlich", tr: "şenlikli" },
      { de: "naschen", tr: "atıştırmak" },
      { de: "der Zwilling", tr: "ikiz" },
      { de: "die Jahreszeit", tr: "mevsim" },
    ],
    patterns: [
      { de: "Alles Gute zum Geburtstag!", tr: "doğum gününü kutlar" },
      { de: "Ich habe am dritten Mai Geburtstag.", tr: "doğum günü tarihini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün doğum günü kutluyoruz. Tarih söylemenin Almanca yolu sıra sayılarından geçiyor ve o sayılar ek alıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Tarih söylerken sayı bir sıra sayısına dönüşür ve önüne kaynaşmış bir edat gelir. Türkçede 'üç Mayıs' deriz, sayıyı hiç değiştirmeyiz; Almanca 'üçüncüsünde' der. Sıra sayısı bir ek alır ve yönelme hâline girer. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Torte"),
          tr("Türkçesi 'pasta' demek. Lütfen"),
          de("die Torte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Torte" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Feier"),
          tr("Türkçesi 'kutlama' demek. Lütfen"),
          de("die Feier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Feier" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Fest"),
          tr("Türkçesi 'şenlik, büyük kutlama' demek. Lütfen"),
          de("das Fest"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fest" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Familienfeier"),
          tr("Türkçesi 'aile kutlaması' demek. Lütfen"),
          de("die Familienfeier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Familienfeier" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("festlich"),
          tr("Türkçesi 'şenlikli, bayramlık' demek. Lütfen"),
          de("festlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "festlich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("naschen"),
          tr("Türkçesi 'tatlı atıştırmak' demek. Lütfen"),
          de("naschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "naschen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Zwilling"),
          tr("Türkçesi 'ikiz' demek. Lütfen"),
          de("der Zwilling"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zwilling" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Jahreszeit"),
          tr("Türkçesi 'mevsim' demek. Lütfen"),
          de("die Jahreszeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Jahreszeit" },
      },
      {
        say: [
          tr("İlk kalıbımız kutlamanın kendisi:"),
          de("Alles Gute zum Geburtstag!"),
          tr("Ezberlenen bir kalıp; kelime kelime çevrilmez, olduğu gibi kullanılır."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Doğum günün için sana bir pasta yapıyorum.' Almancası:"),
          de("Zum Geburtstag backe ich dir eine Torte."),
          tr("Lütfen"),
          de("Zum Geburtstag backe ich dir eine Torte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Zum Geburtstag backe ich dir eine Torte" },
      },
      {
        say: [tr("Sıra sende: 'Hafta sonu büyük bir aile kutlamamız var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Wochenende haben wir eine große Familienfeier",
          hint: [
            tr("Zaman ifadesi başta olduğu için özne fiilin arkasına düşer ve sıfat ek alır:"),
            de("Am Wochenende haben wir eine große Familienfeier."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız tarihi söylüyor:"),
          de("Ich habe am dritten Mai Geburtstag."),
          tr(
            "Sayı sıra sayısına dönüşmüş ve yönelme hâlinin ekini almış. Kaynaşmış edat de onun önünde.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kardeşim ve ben ikiziz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Bruder und ich sind Zwillinge",
          hint: [
            tr("İki özne birden olduğu için fiil çoğula uyar ve isim çoğul kalır:"),
            de("Mein Bruder und ich sind Zwillinge."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe am drei Mai Geburtstag."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe am drei Mai Geburtstag.",
          answer: false,
          why: [
            tr("Tarihte sayı sıra sayısına dönüşür ve ek alır. Doğrusu:"),
            de("Ich habe am dritten Mai Geburtstag."),
          ],
        },
      },
      {
        say: [tr("Şimdi birinin doğum gününü kutluyorsun ve kendi tarihini söylüyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir iş arkadaşının doğum günü. Onu kutla, kutlamanın nerede olacağını sor ve kendi doğum günü tarihini söyle.",
      partner: "doğum gününde ofise pasta getirmiş bir iş arkadaşı",
      opening: "Kommt, nehmt euch ein Stück Torte! Habt ihr auch bald Geburtstag?",
      openingTr: "Gelin, bir dilim pasta alın! Sizin de doğum gününüz yaklaştı mı?",
      goal: "Kutlama yapılmış, kutlamanın yeri ve zamanı konuşulmuş ve kendi tarihin sıra sayısıyla söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-party-planen",
    icon: "party",
    level: "A2",
    course: "de",
    title: "Wir planen eine Party",
    titleTr: "Parti planı",
    summary: "Bir kutlamayı birlikte planlamayı ve iş bölümü yapmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "planen", tr: "planlamak" },
      { de: "organisieren", tr: "organize etmek" },
      { de: "veranstalten", tr: "düzenlemek" },
      { de: "aufstellen", tr: "dizmek" },
      { de: "decken", tr: "sofra kurmak" },
      { de: "die Serviette", tr: "peçete" },
      { de: "der Teller", tr: "tabak" },
      { de: "der Besuch", tr: "ziyaret" },
    ],
    patterns: [
      { de: "Ich hoffe, dass alle kommen.", tr: "beklentisini yan cümleyle söyler" },
      { de: "Kannst du bitte den Tisch decken?", tr: "bir işi rica eder" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir parti planlıyoruz. Kim ne yapacak, kim gelecek — hepsi yan cümlelerle konuşuluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Umut, düşünce ve haber bildiren fiillerden sonra yan cümle gelir ve o cümlede fiil en sona gider. Bu kuralı modül 5'te görmüştün; burada gündelik bir plan konuşmasında çalıştıracağız. Önce sekiz kelime.",
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
          tr("İkinci kelimemiz:"),
          de("organisieren"),
          tr("Türkçesi 'organize etmek' demek. Lütfen"),
          de("organisieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "organisieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("veranstalten"),
          tr("Türkçesi 'düzenlemek' demek; bir etkinlik düzenlemek. Lütfen"),
          de("veranstalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "veranstalten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("aufstellen"),
          tr("Türkçesi 'dizmek, yerleştirmek' demek. Lütfen"),
          de("aufstellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufstellen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("decken"),
          tr("Türkçesi 'sofra kurmak' demek. Lütfen"),
          de("decken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "decken" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Serviette"),
          tr("Türkçesi 'peçete' demek. Lütfen"),
          de("die Serviette"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Serviette" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Teller"),
          tr("Türkçesi 'tabak' demek. Lütfen"),
          de("der Teller"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Teller" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Besuch"),
          tr("Türkçesi 'ziyaret' demek; gelen misafirler anlamında da kullanılır. Lütfen"),
          de("der Besuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Besuch" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich hoffe, dass alle kommen."),
          tr("Virgülden sonra yan cümle ve fiil en sonda. Ana cümle bozulmadan kalıyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Hafta sonu için bir parti planlıyoruz.' Almancası:"),
          de("Wir planen eine Party für das Wochenende."),
          tr("Lütfen"),
          de("Wir planen eine Party für das Wochenende"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir planen eine Party für das Wochenende" },
      },
      {
        say: [tr("Sıra sende: 'Herkesin geleceğini umuyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich hoffe, dass alle kommen",
          hint: [
            tr("Yan cümlede fiil en sona gider:"),
            de("Ich hoffe, dass alle kommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir rica:"),
          de("Kannst du bitte den Tisch decken?"),
          tr("Kip fiili başta olduğu için soru; asıl fiil sonda ve nesne belirtme hâlinde."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Lütfen tabakları masaya diz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Stell die Teller bitte auf den Tisch",
          hint: [
            tr("Emirde fiil başa geçer ve yön bildiren edat belirtme hâlini getirir:"),
            de("Stell die Teller bitte auf den Tisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich hoffe, dass alle kommen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich hoffe, dass alle kommen.",
          answer: true,
          why: [
            tr("Yan cümlede fiil en sonda ve çoğul özneye uymuş: cümle doğru."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir partiyi birlikte planlıyorsunuz ve işleri paylaşıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla evde parti planlıyorsunuz. Kimin ne yapacağını konuşun, kimin geleceğini tahmin edin ve eksikleri belirleyin.",
      partner: "listeyi eline almış, işleri paylaştırmak isteyen bir arkadaş",
      opening: "Okay, wir haben noch drei Tage. Was müssen wir alles besorgen?",
      openingTr: "Tamam, üç günümüz var. Neleri almamız lazım?",
      goal: "En az üç iş paylaşılmış, kimin geleceği konuşulmuş ve bir eksik belirlenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-gastgeschenk",
    icon: "flower",
    level: "A2",
    course: "de",
    title: "Was bringen wir mit?",
    titleTr: "Ev hediyesi",
    summary: "Davete giderken ne götüreceğini ve kime vereceğini konuşmayı öğretir.",
    minutes: 10,
    focusId: "Dativ",
    vocab: [
      { de: "der Gastgeber", tr: "ev sahibi" },
      { de: "schenken", tr: "hediye etmek" },
      { de: "der Blumenstrauß", tr: "çiçek buketi" },
      { de: "die Rose", tr: "gül" },
      { de: "überreichen", tr: "takdim etmek" },
      { de: "bewirten", tr: "ağırlamak" },
      { de: "gastfreundlich", tr: "misafirperver" },
      { de: "bescheiden", tr: "alçakgönüllü" },
    ],
    patterns: [
      { de: "Ich bringe der Gastgeberin einen Blumenstrauß mit.", tr: "kime ne götürdüğünü söyler" },
      { de: "Was schenken wir ihnen?", tr: "ne hediye edileceğini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir davete gidiyoruz ve ne götüreceğimizi konuşuyoruz. Almanya'da eli boş gidilmez ve hediyenin kime verildiği dilbilgisiyle işaretlenir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Hediye eden fiiller iki nesne alır: hediyeyi alan kişi yönelme hâlinde, hediyenin kendisi belirtme hâlinde. Sıra da aynı: kişi önce, şey sonra. Modül 4'ten tanıdık bu kuralı burada kutlama bağlamında çalıştıracağız. Önce sekiz kelime.",
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
          de("schenken"),
          tr("Türkçesi 'hediye etmek' demek. Lütfen"),
          de("schenken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schenken" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Blumenstrauß"),
          tr("Türkçesi 'çiçek buketi' demek. Lütfen"),
          de("der Blumenstrauß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Blumenstrauß" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Rose"),
          tr("Türkçesi 'gül' demek. Lütfen"),
          de("die Rose"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rose" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("überreichen"),
          tr("Türkçesi 'takdim etmek, elden vermek' demek. Lütfen"),
          de("überreichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "überreichen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("bewirten"),
          tr("Türkçesi 'ağırlamak' demek. Lütfen"),
          de("bewirten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bewirten" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("gastfreundlich"),
          tr("Türkçesi 'misafirperver' demek. Lütfen"),
          de("gastfreundlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gastfreundlich" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("bescheiden"),
          tr("Türkçesi 'alçakgönüllü, gösterişsiz' demek. Lütfen"),
          de("bescheiden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bescheiden" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich bringe der Gastgeberin einen Blumenstrauß mit."),
          tr(
            "Alan kişi yönelme hâlinde ve önde; hediye belirtme hâlinde ve arkada. Ayrılabilen ön ek cümlenin sonunda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Anna'ya bir kazak hediye etmek istiyorum.' Almancası:"),
          de("Ich möchte Anna einen Pullover schenken."),
          tr("Lütfen"),
          de("Ich möchte Anna einen Pullover schenken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte Anna einen Pullover schenken" },
      },
      {
        say: [tr("Sıra sende: 'Ev sahibine bir buket götürüyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bringe dem Gastgeber einen Blumenstrauß mit",
          hint: [
            tr("Alan kişi yönelme hâlinde ve önde, ayrılabilen ön ek sonda:"),
            de("Ich bringe dem Gastgeber einen Blumenstrauß mit."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir soru:"),
          de("Was schenken wir ihnen?"),
          tr("Alan kişi zamir olduğunda da yönelme hâlinde durur ve fiile yakın gelir."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kız arkadaşına kırmızı güller hediye ediyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Er schenkt seiner Freundin rote Rosen",
          hint: [
            tr("Alan kişi yönelme hâlinde ve önde, çoğul nesnede sıfat çoğul ekini alır:"),
            de("Er schenkt seiner Freundin rote Rosen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich bringe die Gastgeberin einen Blumenstrauß mit."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich bringe die Gastgeberin einen Blumenstrauß mit.",
          answer: false,
          why: [
            tr("Hediyeyi alan kişi yönelme hâline girer. Doğrusu:"),
            de("Ich bringe der Gastgeberin einen Blumenstrauß mit."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir davete gidiyorsunuz ve ne götüreceğinizi kararlaştırıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla akşam bir aile davetine gidiyorsunuz ve ne götüreceğinizi konuşuyorsunuz. Kime ne alacağınızı kararlaştırın ve nereden alacağınızı planlayın.",
      partner: "eli boş gitmek istemeyen bir arkadaş",
      opening: "Wir können doch nicht mit leeren Händen kommen. Was bringen wir mit?",
      openingTr: "Eli boş gidemeyiz herhâlde. Ne götürelim?",
      goal: "En az iki hediye seçeneği tartışılmış, biri seçilmiş ve nereden alınacağı kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-hochzeit",
    icon: "ring",
    level: "A2",
    course: "de",
    title: "Auf einer Hochzeit",
    titleTr: "Düğünde",
    summary: "Düğünde kimin kim olduğunu anlatmayı ve kutlama yapmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "die Braut", tr: "gelin" },
      { de: "der Bräutigam", tr: "damat" },
      { de: "der Trauzeuge", tr: "nikâh şahidi" },
      { de: "der Hochzeitstag", tr: "evlilik yıldönümü" },
      { de: "anstoßen", tr: "kadeh kaldırmak" },
      { de: "die Schwiegermutter", tr: "kayınvalide" },
      { de: "der Schwiegervater", tr: "kayınpeder" },
      { de: "feierlich", tr: "törensel" },
    ],
    patterns: [
      { de: "Wir stoßen auf das Brautpaar an.", tr: "kadeh kaldırırken kimin için olduğunu söyler" },
      { de: "Ich finde, dass die Rede schön war.", tr: "görüşünü yan cümleyle söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir düğündeyiz. Kimin kim olduğunu anlatmak ve kadeh kaldırmak, davette en çok işine yarayacak iki şey. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kadeh kaldırırken kimin şerefine olduğunu söyleyen bir edat kullanılır ve o edat belirtme hâlini getirir. Ayrıca görüş bildirirken yan cümle kuruluyor ve fiil yine sona gidiyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Braut"),
          tr("Türkçesi 'gelin' demek. Lütfen"),
          de("die Braut"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Braut" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Bräutigam"),
          tr("Türkçesi 'damat' demek. Lütfen"),
          de("der Bräutigam"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bräutigam" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Trauzeuge"),
          tr("Türkçesi 'nikâh şahidi' demek. Lütfen"),
          de("der Trauzeuge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Trauzeuge" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Hochzeitstag"),
          tr("Türkçesi 'evlilik yıldönümü' demek. Lütfen"),
          de("der Hochzeitstag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hochzeitstag" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("anstoßen"),
          tr("Türkçesi 'kadeh kaldırmak' demek. Lütfen"),
          de("anstoßen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anstoßen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Schwiegermutter"),
          tr("Türkçesi 'kayınvalide' demek. Lütfen"),
          de("die Schwiegermutter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schwiegermutter" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Schwiegervater"),
          tr("Türkçesi 'kayınpeder' demek. Lütfen"),
          de("der Schwiegervater"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schwiegervater" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("feierlich"),
          tr("Türkçesi 'törensel, ağırbaşlı' demek. Lütfen"),
          de("feierlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "feierlich" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wir stoßen auf das Brautpaar an."),
          tr(
            "Kimin şerefine kadeh kaldırıldığını söyleyen edat belirtme hâlini getiriyor ve ayrılabilen ön ek sonda duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Gelin beyaz bir elbise giyiyor.' Almancası:"),
          de("Die Braut trägt ein weißes Kleid."),
          tr("Lütfen"),
          de("Die Braut trägt ein weißes Kleid"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Braut trägt ein weißes Kleid" },
      },
      {
        say: [tr("Sıra sende: 'En iyi arkadaşım benim nikâh şahidim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein bester Freund ist mein Trauzeuge",
          hint: [
            tr("En üstünlük sıfatı isimden önce geldiğinde ek alır:"),
            de("Mein bester Freund ist mein Trauzeuge."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız görüş bildiriyor:"),
          de("Ich finde, dass die Rede schön war."),
          tr("Yan cümlede fiil en sonda; geçmiş zaman olduğu için kısa geçmiş biçimi kullanılıyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bence tören çok törenseldi.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich finde, dass die Feier sehr feierlich war",
          hint: [
            tr("Yan cümlede fiil en sona gider:"),
            de("Ich finde, dass die Feier sehr feierlich war."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir stoßen auf dem Brautpaar an."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir stoßen auf dem Brautpaar an.",
          answer: false,
          why: [
            tr("Kadeh kaldırırken kullanılan edat belirtme hâlini getirir, yönelme hâlini değil. Doğrusu:"),
            de("Wir stoßen auf das Brautpaar an."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir düğündesin ve yanındakiyle sohbet ediyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir düğünde masada yanında oturan biriyle sohbet ediyorsun. Kimin kim olduğunu sor, töreni değerlendir ve kadeh kaldırmayı öner.",
      partner: "gelinin ailesinden, herkesi tanıyan bir misafir",
      opening: "Sind Sie von der Seite der Braut oder vom Bräutigam?",
      openingTr: "Siz gelin tarafından mısınız, damat tarafından mı?",
      goal: "En az iki kişinin kim olduğu öğrenilmiş, tören hakkında görüş bildirilmiş ve kadeh kaldırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-feiertage",
    icon: "flag",
    level: "A2",
    course: "de",
    title: "Feste in Deutschland",
    titleTr: "Alman bayramları",
    summary: "Almanya'daki kutlamaları anlatmayı ve karşılaştırmayı öğretir.",
    minutes: 10,
    focusId: "Es-gibt",
    vocab: [
      { de: "der Weihnachtsbaum", tr: "Noel ağacı" },
      { de: "schmücken", tr: "süslemek" },
      { de: "das Festival", tr: "festival" },
      { de: "die Messe", tr: "fuar" },
      { de: "die Veranstaltung", tr: "etkinlik" },
      { de: "staatlich", tr: "devlete ait" },
      { de: "das Weihnachtsgeld", tr: "yılbaşı ikramiyesi" },
      { de: "die Laterne", tr: "sokak lambası" },
    ],
    patterns: [
      { de: "Im Dezember gibt es viele Feste.", tr: "hangi kutlamaların olduğunu anlatır" },
      { de: "Bei uns feiert man das anders.", tr: "kendi ülkendeki farkı söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Almanya'daki kutlamaları konuşuyoruz ve kendi ülkendekilerle karşılaştırıyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir ülkede neyin olduğunu anlatırken 'var' kalıbı kullanılır ve ardından gelen isim belirtme hâline girer. Genel bir âdeti anlatırken ise belirsiz özne kullanılır ve fiil hep tekil kalır. İkisi bir arada kültür anlatmanın en pratik yolu. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Weihnachtsbaum"),
          tr("Türkçesi 'Noel ağacı' demek. Lütfen"),
          de("der Weihnachtsbaum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Weihnachtsbaum" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("schmücken"),
          tr("Türkçesi 'süslemek' demek. Lütfen"),
          de("schmücken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schmücken" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Festival"),
          tr("Türkçesi 'festival' demek. Lütfen"),
          de("das Festival"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Festival" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Messe"),
          tr("Türkçesi 'fuar' demek. Lütfen"),
          de("die Messe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Messe" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Veranstaltung"),
          tr("Türkçesi 'etkinlik' demek. Lütfen"),
          de("die Veranstaltung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Veranstaltung" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("staatlich"),
          tr("Türkçesi 'devlete ait, resmî' demek. Lütfen"),
          de("staatlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "staatlich" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Weihnachtsgeld"),
          tr("Türkçesi 'yılbaşı ikramiyesi' demek; Almanya'da aralıkta ödenen ek maaş. Lütfen"),
          de("das Weihnachtsgeld"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Weihnachtsgeld" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Laterne"),
          tr("Türkçesi 'sokak lambası, fener' demek; çocuk yürüyüşlerinde taşınan fener de budur. Lütfen"),
          de("die Laterne"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Laterne" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Im Dezember gibt es viele Feste."),
          tr(
            "Zaman ifadesi başta olduğu için kişisiz özne fiilin arkasına düşüyor ve isim belirtme hâlinde duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Çocuklar salonu kutlama için süslüyor.' Almancası:"),
          de("Die Kinder schmücken den Saal für die Feier."),
          tr("Lütfen"),
          de("Die Kinder schmücken den Saal für die Feier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Kinder schmücken den Saal für die Feier" },
      },
      {
        say: [tr("Sıra sende: 'Bu yıl Noel ağacı salonda duruyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Weihnachtsbaum steht dieses Jahr im Wohnzimmer",
          hint: [
            tr("Zaman ifadesi belirtme hâline girer ve yer bildiren edat yönelme hâlini getirir:"),
            de("Der Weihnachtsbaum steht dieses Jahr im Wohnzimmer."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kendi ülkendeki farkı söylüyor:"),
          de("Bei uns feiert man das anders."),
          tr("Belirsiz özne kullanılıyor ve fiil tekil kalıyor; genel bir âdeti anlatmanın yolu bu."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Hafta sonu şehirde bir festival var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Wochenende gibt es ein Festival in der Stadt",
          hint: [
            tr("'Var' kalıbından sonra isim belirtme hâline girer:"),
            de("Am Wochenende gibt es ein Festival in der Stadt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Bei uns feiern man das anders."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Bei uns feiern man das anders.",
          answer: false,
          why: [
            tr("Belirsiz özne hep tekildir ve fiil de tekil çekimlenir. Doğrusu:"),
            de("Bei uns feiert man das anders."),
          ],
        },
      },
      {
        say: [tr("Şimdi Almanya'daki kutlamaları kendi ülkendekilerle karşılaştırıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir iş arkadaşın sana kendi ülkendeki kutlamaları soruyor. Almanya'daki bir kutlamayla kendi ülkendekini karşılaştır ve iki farkı anlat.",
      partner: "başka kültürleri merak eden bir iş arkadaşı",
      opening: "Wie feiert ihr das eigentlich bei euch?",
      openingTr: "Sizde bunu nasıl kutluyorsunuz?",
      goal: "İki kutlama karşılaştırılmış, en az iki fark söylenmiş ve iş arkadaşın da kendi âdetinden söz etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-einladung-absagen",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Ich muss leider absagen",
    titleTr: "Davet iptali",
    summary: "Bir daveti kibarca reddetmeyi ve yeni bir tarih önermeyi öğretir.",
    minutes: 10,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "die Absage", tr: "olumsuz cevap" },
      { de: "bedauern", tr: "üzülmek" },
      { de: "ausnahmsweise", tr: "istisna olarak" },
      { de: "noch mal", tr: "bir daha" },
      { de: "stattdessen", tr: "onun yerine" },
      { de: "derzeit", tr: "şu sıralar" },
      { de: "zusammenkommen", tr: "bir araya gelmek" },
      { de: "enttäuscht", tr: "hayal kırıklığına uğramış" },
    ],
    patterns: [
      { de: "Ich kann leider nicht kommen, weil ich arbeiten muss.", tr: "reddi sebebiyle söyler" },
      { de: "Können wir es noch mal versuchen?", tr: "yeni bir tarih önerir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir daveti reddediyoruz. Almancada reddetmek kaba değildir ama sebebini söylemek beklenir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Reddin üç parçası var: üzüntü, sebep ve alternatif. Sebep yan cümleyle söylenir ve o cümlede kip fiili en sona gider; asıl fiil onun hemen önünde durur. Bu ikili sıralama A2'de en çok karıştırılan yerlerden biri. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Absage"),
          tr("Türkçesi 'olumsuz cevap, iptal' demek. Lütfen"),
          de("die Absage"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Absage" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("bedauern"),
          tr("Türkçesi 'üzülmek, esef etmek' demek. Lütfen"),
          de("bedauern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bedauern" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("ausnahmsweise"),
          tr("Türkçesi 'istisna olarak, bu seferlik' demek. Lütfen"),
          de("ausnahmsweise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausnahmsweise" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("noch mal"),
          tr("Türkçesi 'bir daha, yeniden' demek. Lütfen"),
          de("noch mal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "noch mal" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("stattdessen"),
          tr("Türkçesi 'onun yerine' demek. Lütfen"),
          de("stattdessen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stattdessen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("derzeit"),
          tr("Türkçesi 'şu sıralar' demek. Lütfen"),
          de("derzeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "derzeit" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("zusammenkommen"),
          tr("Türkçesi 'bir araya gelmek' demek. Lütfen"),
          de("zusammenkommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zusammenkommen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("enttäuscht"),
          tr("Türkçesi 'hayal kırıklığına uğramış' demek. Lütfen"),
          de("enttäuscht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "enttäuscht" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich kann leider nicht kommen, weil ich arbeiten muss."),
          tr(
            "Yan cümlede iki fiil var: asıl fiil önce, kip fiili en sonda. Ana cümlede ise kip fiili ikinci sırada ve asıl fiil sonda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Gelemediğim için çok üzgünüm.' Almancası:"),
          de("Ich bedauere sehr, dass ich nicht kommen kann."),
          tr("Lütfen"),
          de("Ich bedauere sehr, dass ich nicht kommen kann"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bedauere sehr, dass ich nicht kommen kann" },
      },
      {
        say: [tr("Sıra sende: 'Çalışmam gerektiği için gelemiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kann nicht kommen, weil ich arbeiten muss",
          hint: [
            tr("Yan cümlede kip fiili en sona gider, asıl fiil onun önünde kalır:"),
            de("Ich kann nicht kommen, weil ich arbeiten muss."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız alternatif öneriyor:"),
          de("Können wir es noch mal versuchen?"),
          tr("Reddi yumuşatan asıl kısım bu: kapıyı kapatmak yerine yeni bir tarih açmak."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Onun yerine gelecek hafta buluşalım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Stattdessen treffen wir uns nächste Woche",
          hint: [
            tr("Bağlayıcı başta olduğu için özne fiilin arkasına düşer ve dönüşlü zamir onu izler:"),
            de("Stattdessen treffen wir uns nächste Woche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich kann nicht kommen, weil ich muss arbeiten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich kann nicht kommen, weil ich muss arbeiten.",
          answer: false,
          why: [
            tr("Yan cümlede kip fiili en sona gider, asıl fiil onun önünde durur. Doğrusu:"),
            de("Ich kann nicht kommen, weil ich arbeiten muss."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir daveti reddediyorsun ve yerine başka bir şey öneriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın seni cumartesi akşamına davet etti ama gidemiyorsun. Kibarca reddet, sebebini söyle ve yerine başka bir tarih öner.",
      partner: "davetini reddedilince biraz üzülen ama anlayışlı bir arkadaş",
      opening: "Du kommst doch am Samstag, oder?",
      openingTr: "Cumartesi geliyorsun, değil mi?",
      goal: "Ret kibarca söylenmiş, sebebi yan cümleyle verilmiş ve yeni bir tarihte anlaşılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-komplimente",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Das steht dir gut!",
    titleTr: "İltifat etme",
    summary: "İltifat etmeyi, karşılık vermeyi ve zamirin doğru hâlini öğretir.",
    minutes: 10,
    focusId: "Personalpronomen-Dativ",
    vocab: [
      { de: "edel", tr: "şık" },
      { de: "attraktiv", tr: "çekici" },
      { de: "modisch", tr: "modaya uygun" },
      { de: "lässig", tr: "havalı" },
      { de: "schlicht", tr: "sade" },
      { de: "super", tr: "süper" },
      { de: "talentiert", tr: "yetenekli" },
      { de: "humorvoll", tr: "esprili" },
    ],
    patterns: [
      { de: "Das steht dir gut!", tr: "bir kıyafet için iltifat eder" },
      { de: "Die Hose passt mir nicht mehr.", tr: "bir şeyin uymadığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iltifat ediyoruz. Almancada iltifat kalıpları kısadır ama içlerindeki zamir yanlış hâlde olursa cümle bozulur. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İltifat kalıplarında iltifat edilen kişi özne değil, yönelme hâlinde duruyor. Cümlenin öznesi kıyafetin ya da özelliğin kendisi. Türkçedeki 'bu sana yakışıyor' ile aynı yapı: 'sen' değil 'sana' diyoruz. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("edel"),
          tr("Türkçesi 'şık' demek. Lütfen"),
          de("edel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "edel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("attraktiv"),
          tr("Türkçesi 'çekici' demek. Lütfen"),
          de("attraktiv"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "attraktiv" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("modisch"),
          tr("Türkçesi 'modaya uygun' demek. Lütfen"),
          de("modisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "modisch" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("lässig"),
          tr("Türkçesi 'havalı, rahat' demek. Lütfen"),
          de("lässig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lässig" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("schlicht"),
          tr("Türkçesi 'sade' demek. Lütfen"),
          de("schlicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schlicht" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("super"),
          tr("Türkçesi 'süper, harika' demek. Lütfen"),
          de("super"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "super" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("talentiert"),
          tr("Türkçesi 'yetenekli' demek. Lütfen"),
          de("talentiert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "talentiert" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("humorvoll"),
          tr("Türkçesi 'esprili' demek. Lütfen"),
          de("humorvoll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "humorvoll" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Das steht dir gut!"),
          tr(
            "Cümlenin öznesi kıyafet; iltifat edilen kişi yönelme hâlinde. Türkçedeki 'sana yakışmış' ile birebir aynı mantık.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu ceketle çok havalı görünüyorsun.' Almancası:"),
          de("Mit dieser Jacke siehst du sehr lässig aus."),
          tr("Lütfen"),
          de("Mit dieser Jacke siehst du sehr lässig aus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mit dieser Jacke siehst du sehr lässig aus" },
      },
      {
        say: [tr("Sıra sende: 'Bu gözlük şu an çok moda.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Diese Brille ist gerade sehr modisch",
          hint: [
            tr("Sıfat yüklem olarak kullanıldığı için ek almaz:"),
            de("Diese Brille ist gerade sehr modisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Die Hose passt mir nicht mehr."),
          tr("Aynı yapı, olumsuz hâliyle: kıyafet özne, kişi yönelme hâlinde."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bu sana çok yakışıyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das steht dir sehr gut",
          hint: [
            tr("İltifat edilen kişi yönelme hâlinde durur, özne ise kıyafetin kendisidir:"),
            de("Das steht dir sehr gut."),
            tr("Tekrar dene."),
          ],
        },
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
            tr("Bu fiil kişiyi yönelme hâline sokar, belirtme hâline değil. Doğrusu:"),
            de("Das steht dir gut."),
          ],
        },
      },
      {
        say: [tr("Şimdi birine iltifat ediyorsun ve karşılık alıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir kutlamada bir arkadaşınla karşılaştın. Ona iltifat et, o da sana etsin; iltifata nasıl karşılık verileceğini de konuşun.",
      partner: "iltifatı hemen geri çeviren, mütevazı bir arkadaş",
      opening: "Oh, du siehst heute richtig gut aus! Ist das neu?",
      openingTr: "Aa, bugün çok güzel görünüyorsun! Yeni mi bu?",
      goal: "İki taraf da birer iltifat etmiş, en az biri karşılık vermiş ve konu bir başka şeye bağlanmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-streit",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Es tut mir leid",
    titleTr: "Özür ve barışma",
    summary: "Bir tartışmayı anlatmayı, özür dilemeyi ve barışmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "streiten", tr: "kavga etmek" },
      { de: "sich zanken", tr: "atışmak" },
      { de: "anschreien", tr: "birine bağırmak" },
      { de: "beleidigt", tr: "alınmış" },
      { de: "vergeben", tr: "affetmek" },
      { de: "absichtlich", tr: "bilerek" },
      { de: "gemein", tr: "kötü niyetli" },
      { de: "vorwerfen", tr: "suçlamak" },
    ],
    patterns: [
      { de: "Es tut mir leid, dass ich das gesagt habe.", tr: "özrü sebebiyle söyler" },
      { de: "Ich habe das nicht absichtlich gemacht.", tr: "kasıtlı olmadığını açıklar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir tartışmayı ve arkasından gelen özrü konuşuyoruz. Özrün Almanca kalıbı yine yönelme hâliyle kuruluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Özür kalıbında üzülen kişi özne değil, yönelme hâlinde duruyor; cümlenin öznesi kişisiz bir kelime. Arkasından bir yan cümle geliyor ve orada geçmiş zamanın yardımcı fiili en sona gidiyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("streiten"),
          tr("Türkçesi 'kavga etmek, tartışmak' demek. Lütfen"),
          de("streiten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "streiten" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sich zanken"),
          tr("Türkçesi 'atışmak' demek; küçük çaplı kavga. Lütfen"),
          de("sich zanken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich zanken" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("anschreien"),
          tr("Türkçesi 'birine bağırmak' demek. Lütfen"),
          de("anschreien"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anschreien" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("beleidigt"),
          tr("Türkçesi 'alınmış, gücenmiş' demek. Lütfen"),
          de("beleidigt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beleidigt" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("vergeben"),
          tr("Türkçesi 'affetmek' demek. Lütfen"),
          de("vergeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vergeben" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("absichtlich"),
          tr("Türkçesi 'bilerek, kasten' demek. Lütfen"),
          de("absichtlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "absichtlich" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("gemein"),
          tr("Türkçesi 'kötü niyetli, kırıcı' demek. Lütfen"),
          de("gemein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gemein" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("vorwerfen"),
          tr("Türkçesi 'suçlamak, yüzüne vurmak' demek. Lütfen"),
          de("vorwerfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorwerfen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Es tut mir leid, dass ich das gesagt habe."),
          tr(
            "Özrü söyleyen kişi yönelme hâlinde; özne kişisiz bir kelime. Yan cümlede yardımcı fiil en sonda.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kavgadan sonra kardeşini affetti.' Almancası:"),
          de("Nach dem Streit hat sie ihrem Bruder vergeben."),
          tr("Lütfen"),
          de("Nach dem Streit hat sie ihrem Bruder vergeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nach dem Streit hat sie ihrem Bruder vergeben" },
      },
      {
        say: [tr("Sıra sende: 'Bunu söylediğim için özür dilerim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Es tut mir leid, dass ich das gesagt habe",
          hint: [
            tr("Özrü dileyen kişi yönelme hâlinde ve yan cümlede yardımcı fiil en sonda:"),
            de("Es tut mir leid, dass ich das gesagt habe."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız açıklama yapıyor:"),
          de("Ich habe das nicht absichtlich gemacht."),
          tr("Olumsuzluk kelimesi zarfın önünde duruyor ve ortaç sonda kalıyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bardağı bilerek kırmadı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Er hat das Glas nicht absichtlich kaputt gemacht",
          hint: [
            tr("Olumsuzluk kelimesi zarfın önünde ve ortaç en sonda:"),
            de("Er hat das Glas nicht absichtlich kaputt gemacht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich tue mir leid, dass ich das gesagt habe."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich tue mir leid, dass ich das gesagt habe.",
          answer: false,
          why: [
            tr(
              "Bu kalıpta özne kişisiz bir kelimedir; kişi yalnız yönelme hâlinde bulunur. Doğrusu:",
            ),
            de("Es tut mir leid, dass ich das gesagt habe."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir tartışmadan sonra barışmaya çalışıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Dün bir arkadaşınla tartıştın ve bugün konuşmak için aradın. Ne olduğunu anlat, özür dile ve barışmayı öner.",
      partner: "hâlâ biraz alınmış ama konuşmaya açık bir arkadaş",
      opening: "Hallo. Ich bin ehrlich gesagt immer noch ein bisschen sauer. Was ist gestern passiert?",
      openingTr: "Merhaba. Açıkçası hâlâ biraz kırgınım. Dün ne oldu?",
      goal: "Olay anlatılmış, özür dilenmiş, kasıtlı olmadığı açıklanmış ve iki taraf barışmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-fernbeziehung",
    icon: "family",
    level: "A2",
    course: "de",
    title: "Meine Familie ist weit weg",
    titleTr: "Özlem",
    summary: "Uzaktaki aileyle iletişimi ve özlemi anlatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "der Kontakt", tr: "iletişim" },
      { de: "die Webcam", tr: "web kamerası" },
      { de: "die Sprachnachricht", tr: "sesli mesaj" },
      { de: "chatten", tr: "yazışmak" },
      { de: "mailen", tr: "e-posta atmak" },
      { de: "zurückschreiben", tr: "cevap yazmak" },
      { de: "die Umarmung", tr: "sarılma" },
      { de: "zusammenhalten", tr: "birlik olmak" },
    ],
    patterns: [
      { de: "Wenn ich sie sehe, freue ich mich sehr.", tr: "koşul ile duyguyu bağlar" },
      { de: "Wir haben jeden Tag Kontakt.", tr: "iletişim sıklığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün uzaktaki aileyi konuşuyoruz. Koşul cümlesi burada bir duygu anlatmak için kullanılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Koşul cümlesinde fiil en sona gider ve koşul başa geçtiğinde ana cümlede özne fiilin arkasına düşer. Bugün bu kalıbı bir dönüşlü fiille birlikte kullanacağız, yani ana cümlede zamir de sıraya girecek. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Kontakt"),
          tr("Türkçesi 'iletişim, temas' demek. Lütfen"),
          de("der Kontakt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kontakt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Webcam"),
          tr("Türkçesi 'web kamerası' demek. Lütfen"),
          de("die Webcam"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Webcam" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Sprachnachricht"),
          tr("Türkçesi 'sesli mesaj' demek. Lütfen"),
          de("die Sprachnachricht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sprachnachricht" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("chatten"),
          tr("Türkçesi 'yazışmak' demek. Lütfen"),
          de("chatten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "chatten" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("mailen"),
          tr("Türkçesi 'e-posta atmak' demek. Lütfen"),
          de("mailen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mailen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("zurückschreiben"),
          tr("Türkçesi 'cevap yazmak' demek. Lütfen"),
          de("zurückschreiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zurückschreiben" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Umarmung"),
          tr("Türkçesi 'sarılma, kucaklama' demek. Lütfen"),
          de("die Umarmung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Umarmung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zusammenhalten"),
          tr("Türkçesi 'birlik olmak, birbirine destek olmak' demek. Lütfen"),
          de("zusammenhalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zusammenhalten" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn ich sie sehe, freue ich mich sehr."),
          tr(
            "Koşul cümlesinde fiil sonda; ana cümlede fiil hemen virgülden sonra, özne onun arkasında ve dönüşlü zamir de öznenin arkasında.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Zor zamanlarda ailemiz birbirine destek olur.' Almancası:"),
          de("In schweren Zeiten hält unsere Familie zusammen."),
          tr("Lütfen"),
          de("In schweren Zeiten hält unsere Familie zusammen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "In schweren Zeiten hält unsere Familie zusammen" },
      },
      {
        say: [tr("Sıra sende: 'Bana lütfen bugün cevap yazar mısın?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Kannst du mir bitte heute zurückschreiben",
          hint: [
            tr("Yazılan kişi yönelme hâlinde ve ayrılabilen fiil kip fiiliyle birlikte sonda:"),
            de("Kannst du mir bitte heute zurückschreiben?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir haben jeden Tag Kontakt."),
          tr("Sıklık bildiren zaman ifadesi belirtme hâline giriyor ve isim artikelsiz kalıyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Babaannem sesli mesaj atmayı tercih ediyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Meine Oma schickt lieber eine Sprachnachricht",
          hint: [
            tr("Tercih bildiren kelime fiilden hemen sonra durur:"),
            de("Meine Oma schickt lieber eine Sprachnachricht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich sie sehe, ich freue mich sehr."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich sie sehe, ich freue mich sehr.",
          answer: false,
          why: [
            tr("Yan cümle başta olunca ana cümlede fiil hemen virgülden sonra gelir. Doğrusu:"),
            de("Wenn ich sie sehe, freue ich mich sehr."),
          ],
        },
      },
      {
        say: [tr("Şimdi uzaktaki ailenle nasıl görüştüğünü anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın ailenin uzakta olmasını soruyor. Onlarla nasıl ve ne sıklıkla görüştüğünü anlat, en çok neyi özlediğini söyle.",
      partner: "ailesi yakında olan, merak eden bir arkadaş",
      opening: "Deine Familie lebt ja weit weg. Wie oft habt ihr Kontakt?",
      openingTr: "Ailen çok uzakta yaşıyor. Ne sıklıkla görüşüyorsunuz?",
      goal: "İletişim biçimi ve sıklığı anlatılmış, en çok özlenen şey söylenmiş ve arkadaşın bir öneri getirmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-neujahr",
    icon: "party",
    level: "A2",
    course: "de",
    title: "Im neuen Jahr mehr Sport",
    titleTr: "Yılbaşı kararları",
    summary: "Yeni yıl kararlarını ve gerçekçi hedefleri anlatmayı öğretir.",
    minutes: 10,
    focusId: "Modalverb-wollen",
    vocab: [
      { de: "boxen", tr: "boks yapmak" },
      { de: "das Tennis", tr: "tenis" },
      { de: "sportlich", tr: "sportif" },
      { de: "das Training", tr: "antrenman" },
      { de: "motiviert", tr: "motive" },
      { de: "freiwillig", tr: "gönüllü" },
      { de: "verringern", tr: "azaltmak" },
      { de: "machbar", tr: "yapılabilir" },
    ],
    patterns: [
      { de: "Ich will dieses Jahr mehr Sport machen.", tr: "kararlı bir hedefi söyler" },
      { de: "Das ist schwer, aber machbar.", tr: "hedefin gerçekçiliğini değerlendirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde yeni yıl kararlarını konuşuyoruz. Kararlı niyet bildiren kip fiili burada tekrar karşına çıkıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir hedef söylenirken kararlı niyet bildiren kip fiili kullanılır; kibar istek biçimi burada zayıf kalır. Yanına bir zaman ifadesi geldiğinde o ifade belirtme hâline girer. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("boxen"),
          tr("Türkçesi 'boks yapmak' demek. Lütfen"),
          de("boxen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "boxen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Tennis"),
          tr("Türkçesi 'tenis' demek. Lütfen"),
          de("das Tennis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Tennis" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sportlich"),
          tr("Türkçesi 'sportif, spor yapan' demek. Lütfen"),
          de("sportlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sportlich" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Training"),
          tr("Türkçesi 'antrenman' demek. Lütfen"),
          de("das Training"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Training" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("motiviert"),
          tr("Türkçesi 'motive, istekli' demek. Lütfen"),
          de("motiviert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "motiviert" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("freiwillig"),
          tr("Türkçesi 'gönüllü olarak' demek. Lütfen"),
          de("freiwillig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "freiwillig" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("verringern"),
          tr("Türkçesi 'azaltmak' demek. Lütfen"),
          de("verringern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verringern" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("machbar"),
          tr("Türkçesi 'yapılabilir' demek. Lütfen"),
          de("machbar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "machbar" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich will dieses Jahr mehr Sport machen."),
          tr(
            "Kararlı niyet bildiren kip fiili ikinci sırada, asıl fiil sonda; zaman ifadesi belirtme hâlinde.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Haftada üç kez tenis oynuyorum.' Almancası:"),
          de("Ich spiele dreimal pro Woche Tennis."),
          tr("Lütfen"),
          de("Ich spiele dreimal pro Woche Tennis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich spiele dreimal pro Woche Tennis" },
      },
      {
        say: [tr("Sıra sende: 'Bu yıl daha çok boks yapmak istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich will dieses Jahr mehr boxen",
          hint: [
            tr("Kararlı niyet bildiren kip fiili ikinci sırada, asıl fiil sonda:"),
            de("Ich will dieses Jahr mehr boxen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız hedefi değerlendiriyor:"),
          de("Das ist schwer, aber machbar."),
          tr("Bağlaç iki sıfatı yan yana koyuyor ve söz dizimine dokunmuyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Telefonda geçirdiğim süreyi azaltmak istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich will die Zeit am Handy verringern",
          hint: [
            tr("Nesne belirtme hâline girer ve asıl fiil sonda kalır:"),
            de("Ich will die Zeit am Handy verringern."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich will diesem Jahr mehr Sport machen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich will diesem Jahr mehr Sport machen.",
          answer: false,
          why: [
            tr("Süre bildiren zaman ifadesi belirtme hâline girer, yönelme hâline değil. Doğrusu:"),
            de("Ich will dieses Jahr mehr Sport machen."),
          ],
        },
      },
      {
        say: [tr("Şimdi yeni yıl kararlarını konuşuyorsunuz ve birbirinizi değerlendiriyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Yılbaşı akşamı bir arkadaşınla yeni yıl kararlarınızı konuşuyorsunuz. En az iki hedef söyle, birinin gerçekçi olup olmadığını tartışın.",
      partner: "kararlarını her yıl bozan, şüpheci bir arkadaş",
      opening: "Und? Hast du dir für dieses Jahr etwas vorgenommen?",
      openingTr: "Ee? Bu yıl için bir karar aldın mı?",
      goal: "İki hedef söylenmiş, birinin gerçekçiliği tartışılmış ve ikisi de bir karar üzerinde anlaşmış olur.",
      minTurns: 8,
    },
  },
];

import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 4 — Ev ve mahalle (konular 031-040).
 *
 * Modülün tamamı tek bir hâlin etrafında dönüyor: Dativ. Öğrenci onu üç ayrı
 * yerde görüyor ve üçünde de aynı soruyu soruyor — KİME, NEREDE.
 *
 *   1. Kişi olarak (031, 037, 038): bir şeyi alan kişi Dativ'e giriyor.
 *      Türkçeyle karşıtlığı kurmak burada kolay, çünkü Türkçede de "ben"
 *      "bana" oluyor; zor olan sıralama — Almancada alan kişi verilen şeyden
 *      ÖNCE geliyor.
 *   2. Sahip olarak (032): bir şeyin kime ait olduğu.
 *   3. Yer olarak (033, 035, 036): bir şeyin nerede durduğu.
 *
 * Aradaki 034 kasıtlı olarak ters yönde duruyor: aynı edatlar hareket
 * anlatınca Akkusativ istiyor. İkisi arka arkaya öğretiliyor ki fark "nerede"
 * ile "nereye" sorusundan çıksın, ezberden değil. 039 ise modülün tek yan
 * cümlesi: gürültü şikâyeti, fiili sona iten ilk bağlacın doğal sahnesi.
 */
export const deA2B04: Lesson[] = [
  {
    id: "de-a2-dativ-geben",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Ich gebe dir den Schlüssel",
    titleTr: "Dativ nesnesi",
    summary: "Bir şeyi birine verirken kişiyi doğru biçimde söylemeyi öğretir.",
    minutes: 9,
    focusId: "Personalpronomen-Dativ",
    vocab: [
      { de: "geben", tr: "vermek" },
      { de: "zeigen", tr: "göstermek" },
      { de: "der Zettel", tr: "not kâğıdı" },
      { de: "die Pflanze", tr: "bitki" },
      { de: "kurz", tr: "kısaca" },
    ],
    patterns: [
      { de: "Ich gebe dir den Schlüssel.", tr: "birine bir şey verirken kullanılır" },
      { de: "Ich zeige dir die Wohnung.", tr: "birine bir şey gösterirken kullanılır" },
      { de: "Kannst du das für mich machen?", tr: "birinden bir şey rica ederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Tatile çıkıyorsun ve komşuna anahtarı bırakacaksın. Bugün bir şeyi birine verirken o kişiyi nasıl söyleyeceğini öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada bazı fiillerin iki nesnesi olur: verilen şey ve alan kişi. Alan kişi ayrı bir hâle girer ve zamir tamamen başka bir kelimeye dönüşür. Türkçede de aynısı olur aslında: 'ben' deriz ama 'bana ver' deriz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("geben"),
          tr("Türkçesi 'vermek' demek. Lütfen"),
          de("geben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geben" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("zeigen"),
          tr("Türkçesi 'göstermek' demek. Lütfen"),
          de("zeigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zeigen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Zettel"),
          tr("Türkçesi 'not kâğıdı' demek. Lütfen"),
          de("der Zettel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zettel" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Pflanze"),
          tr("Türkçesi 'bitki' demek. Lütfen"),
          de("die Pflanze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Pflanze" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("kurz"),
          tr("Türkçesi 'kısaca, kısa' demek. Lütfen"),
          de("kurz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kurz" },
      },
      {
        say: [
          tr("Önce üç kişi zamirinin yeni biçimini duyalım. 'Ben' kişisi"),
          de("mir"),
          tr("'sen' kişisi"),
          de("dir"),
          tr("'o' kişisi"),
          de("ihm"),
          tr(
            "olur. Türkçedeki 'bana, sana, ona' ile birebir aynı iş: kelime, alan kişi olduğu için biçim değiştiriyor.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich gebe dir den Schlüssel."),
          tr(
            "Yani 'Sana anahtarı veriyorum'. Sıraya dikkat et: önce alan kişi, sonra verilen şey. Türkçede de böyle söyleriz, o yüzden bu sıra sana doğal gelecek.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich gebe dir den Schlüssel"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich gebe dir den Schlüssel" },
      },
      {
        say: [tr("Sıra sende: 'Sana notu veriyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich gebe dir den Zettel",
          hint: [
            tr("Önce alan kişi, sonra verilen şey; not eril olduğu için nesne biçimine girer:"),
            de("Ich gebe dir den Zettel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Aynı sıra göstermek fiilinde de geçerli:"),
          de("Ich zeige dir die Wohnung."),
          tr("Kısa bir tur atacaksan şunu eklersin:"),
          de("Das dauert nur kurz."),
          tr("Lütfen"),
          de("Ich zeige dir die Wohnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich zeige dir die Wohnung" },
      },
      {
        say: [
          tr("Şimdi üçüncü kişiyle deneyelim: 'Ona anahtarı veriyorum.' Burada 'o' bir erkek komşu."),
        ],
        expect: {
          kind: "produce",
          target: "Ich gebe ihm den Schlüssel",
          hint: [
            tr("Alan kişi erkekse zamir başka bir biçime girer:"),
            de("Ich gebe ihm den Schlüssel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de rica etmek var. Bitkileri sulaması için:"),
          de("Kannst du das für mich machen?"),
          tr("Lütfen"),
          de("Kannst du das für mich machen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Kannst du das für mich machen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gebe dich den Schlüssel."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gebe dich den Schlüssel.",
          answer: false,
          why: [
            tr("Alan kişi bu biçime girmez; anahtarı alan kişi için ayrı bir biçim var. Doğrusu:"),
            de("Ich gebe dir den Schlüssel."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir şeyi birine verirken kişiyi doğru söyleyebilirsin. Şimdi komşunun kapısındasın: yarın yola çıkıyorsun ve anahtarı bırakman gerekiyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yarın tatile çıkıyorsun ve komşuna anahtarı bırakmaya geldin. Anahtarı verdiğini söyle, bitkileri sulamasını rica et ve nerede ne olduğunu göster.",
      partner: "yardıma her zaman hazır ama biraz unutkan, senli benli bir komşu",
      opening: "Ach, du fährst weg? Wann kommst du denn zurück?",
      openingTr: "Aa, gidiyor musun? Ne zaman döneceksin peki?",
      goal: "Anahtar teslim edilmiş, bitkiler için rica iletilmiş ve neyin nerede olduğu gösterilmiş olur.",
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
    minutes: 9,
    focusId: "Dativ",
    vocab: [
      { de: "gehören", tr: "ait olmak" },
      { de: "der Regenschirm", tr: "şemsiye" },
      { de: "der Handschuh", tr: "eldiven" },
      { de: "die Mütze", tr: "bere" },
      { de: "jemand", tr: "birisi" },
    ],
    patterns: [
      { de: "Wem gehört das?", tr: "bir şeyin kime ait olduğunu sorarken kullanılır" },
      { de: "Das gehört dem Nachbarn.", tr: "bir şeyin kime ait olduğunu söylerken kullanılır" },
      { de: "Das gehört mir.", tr: "bir şeyin sana ait olduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Apartmanın girişinde unutulmuş bir şemsiye duruyor ve kimin olduğu belli değil. Bugün bir şeyin kime ait olduğunu sormayı ve cevaplamayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçen derste kişi zamirlerinin biçim değiştirdiğini gördün. Bugün aynı şey isimlerin başındaki küçük kelimede oluyor: sahip olan kişi söylenirken o kelime değişiyor. Önce kelimeleri öğrenelim.",
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
          de("der Regenschirm"),
          tr("Türkçesi 'şemsiye' demek. Lütfen"),
          de("der Regenschirm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Regenschirm" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Handschuh"),
          tr("Türkçesi 'eldiven' demek. Lütfen"),
          de("der Handschuh"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Handschuh" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Mütze"),
          tr("Türkçesi 'bere' demek. Lütfen"),
          de("die Mütze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mütze" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("jemand"),
          tr("Türkçesi 'birisi' demek. Lütfen"),
          de("jemand"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jemand" },
      },
      {
        say: [
          tr("Sorumuz tek kelimeyle başlıyor:"),
          de("Wem gehört das?"),
          tr(
            "Yani 'Bu kime ait?' Soru kelimesi bile değişmiş durumda: 'kim' sorusunun sahiplik soran biçimi bu.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wem gehört das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wem gehört das" },
      },
      {
        say: [tr("Sıra sende: 'Şemsiye kime ait?'")],
        expect: {
          kind: "produce",
          target: "Wem gehört der Regenschirm",
          hint: [
            tr("Soru kelimesi başta, fiil hemen arkasında, ait olan şey sonda:"),
            de("Wem gehört der Regenschirm?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Cevapta sahip olan kişi söylenir ve önündeki kelime değişir:"),
          de("Das gehört dem Nachbarn."),
          tr("Eril kelimede"),
          de("dem"),
          tr("dişil kelimede"),
          de("der"),
          tr("olur. İyelik kelimeleri de aynı sonu alır, yani kız kardeşin için:"),
          de("Das gehört meiner Schwester."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das gehört dem Nachbarn"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das gehört dem Nachbarn" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bu kız kardeşime ait.'")],
        expect: {
          kind: "produce",
          target: "Das gehört meiner Schwester",
          hint: [
            tr("Dişil kelimelerde sahiplik biçimi başka bir hâl alır:"),
            de("Das gehört meiner Schwester."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Eşya seninse cevap çok kısa:"),
          de("Das gehört mir."),
          tr("Kimin olduğunu bilmiyorsan:"),
          de("Das gehört jemandem aus dem Haus."),
          tr("Lütfen"),
          de("Das gehört mir"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das gehört mir" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das gehört der Nachbar."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das gehört der Nachbar.",
          answer: false,
          why: [
            tr("Sahip olan kişi söylenirken önündeki kelime değişir. Doğrusu:"),
            de("Das gehört dem Nachbarn."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir şeyin kime ait olduğunu sorabilir ve cevaplayabilirsin. Şimdi apartmanın girişindesin, elinde bulunmuş bir bere var ve merdivenden biri iniyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Apartmanın girişinde unutulmuş eşyalar birikmiş. Kimin olduğunu sor, kendi eşyanı tanı, komşunun eşyasını ona ver ve kalanlar için ne yapacağınızı konuşun.",
      partner: "apartmandaki herkesi tanıyan meraklı bir komşu",
      opening: "Schon wieder liegt hier alles herum. Gehört Ihnen der Regenschirm?",
      openingTr: "Yine her şey ortalıkta kalmış. Şemsiye sizin mi?",
      goal: "Eşyaların kime ait olduğu bulunmuş ve kalanlar için ne yapılacağı kararlaşmış olur.",
      minTurns: 7,
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
    minutes: 9,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "die Schublade", tr: "çekmece" },
      { de: "liegen", tr: "yatık durmak" },
      { de: "stehen", tr: "dik durmak" },
      { de: "hinter", tr: "arkasında" },
      { de: "unter", tr: "altında" },
    ],
    patterns: [
      { de: "Der Schlüssel liegt auf dem Tisch.", tr: "bir şeyin nerede olduğunu söylerken kullanılır" },
      { de: "in der Schublade", tr: "bir şeyin içinde olduğunu söyler" },
      { de: "hinter der Tür", tr: "bir şeyin arkasında olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bir şey kaybolduğunda soru hep aynıdır: nerede? Bugün bir şeyin nerede durduğunu tarif etmeyi öğreneceğiz. Almancanın burada Türkçede olmayan bir inceliği var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'masada' deriz ve tek ek her şeyi halleder. Almancada iki şey birden gerekiyor: yeri söyleyen bir edat ve arkasından gelen kelimenin biçim değiştirmesi. Bir de eşyanın nasıl durduğuna göre fiil seçilir. Önce kelimeleri öğrenelim.",
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
          de("liegen"),
          tr("Türkçesi 'yatık durmak' demek. Lütfen"),
          de("liegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "liegen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("stehen"),
          tr("Türkçesi 'dik durmak' demek. Lütfen"),
          de("stehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stehen" },
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
          tr("Son kelimemiz:"),
          de("unter"),
          tr("Türkçesi 'altında' demek. Lütfen"),
          de("unter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unter" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Der Schlüssel liegt auf dem Tisch."),
          tr(
            "Yani 'Anahtar masanın üstünde'. Edattan sonraki kelimeye dikkat et: masa eril olmasına rağmen sözlükteki biçimini bıraktı. Yer anlatıldığında bütün kelimeler bu hâle giriyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Schlüssel liegt auf dem Tisch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Schlüssel liegt auf dem Tisch" },
      },
      {
        say: [tr("Sıra sende: 'Anahtar çekmecede.' Çekmecenin içinde olduğu için 'içinde' edatını kullan.")],
        expect: {
          kind: "produce",
          target: "Der Schlüssel liegt in der Schublade",
          hint: [
            tr("Çekmece dişil; yer anlatılırken dişil kelimeler de biçim değiştirir:"),
            de("Der Schlüssel liegt in der Schublade."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi fiil seçimi. Bir şey yatıyorsa bir fiil, dik duruyorsa başka bir fiil kullanılır:"),
          de("Die Flasche steht auf dem Tisch."),
          tr("ama"),
          de("Das Buch liegt auf dem Tisch."),
          tr(
            "Türkçede ikisine de 'duruyor' deriz; Almancada eşyanın duruşu fiile yansır. Şişe dik, kitap yatık.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Die Flasche steht auf dem Tisch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Die Flasche steht auf dem Tisch" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Çanta masanın altında duruyor.' Çanta yere konmuş, yani dik.")],
        expect: {
          kind: "produce",
          target: "Die Tasche steht unter dem Tisch",
          hint: [
            tr("Dik duran eşyalar için ayrı bir fiil var, masa ise yer bildirdiği için biçim değiştirir:"),
            de("Die Tasche steht unter dem Tisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kaybolan şeyler çoğu zaman şurada bulunur:"),
          de("Der Schlüssel liegt hinter der Tür."),
          tr("Lütfen"),
          de("Der Schlüssel liegt hinter der Tür"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Schlüssel liegt hinter der Tür" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Schlüssel liegt auf den Tisch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Schlüssel liegt auf den Tisch.",
          answer: false,
          why: [
            tr("Burada hareket yok, yer anlatılıyor; o zaman kelime başka bir biçime girer. Doğrusu:"),
            de("Der Schlüssel liegt auf dem Tisch."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir şeyin nerede olduğunu tarif edebilirsin. Şimdi telefondasın: evdeki biri senin anahtarını arıyor ve sen tarif edeceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Evden çıktın ama anahtarını unuttun ve evdeki birini aradın. Anahtarın nerede olabileceğini tarif et, başka yerleri de söyle ve bulunca ne yapacağını anlat.",
      partner: "telefonda odaları tek tek gezen, sabırlı bir ev arkadaşı",
      opening: "Ich bin jetzt in der Küche. Wo genau soll der Schlüssel liegen?",
      openingTr: "Şimdi mutfaktayım. Anahtar tam olarak nerede olacaktı?",
      goal: "Anahtarın nerede olabileceği tarif edilmiş ve bulununca ne yapılacağı kararlaşmış olur.",
      minTurns: 7,
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
    minutes: 9,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "stellen", tr: "dik koymak" },
      { de: "legen", tr: "yatık koymak" },
      { de: "hängen", tr: "asmak" },
      { de: "das Regal", tr: "raf" },
      { de: "die Vase", tr: "vazo" },
    ],
    patterns: [
      { de: "Ich stelle das Regal an die Wand.", tr: "bir şeyi bir yere dik koyarken kullanılır" },
      { de: "Ich lege das Buch auf den Tisch.", tr: "bir şeyi bir yere yatık koyarken kullanılır" },
      { de: "Wohin soll das?", tr: "bir şeyin nereye konacağını sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Geçen derste bir şeyin nerede durduğunu öğrendik. Bugün onu bir yere koyacağız ve tek bir şey değişince cümlenin yarısı değişecek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural şu: aynı edatlar iki farklı soruya cevap veriyor. Soru 'nerede' ise kelime bir biçime, 'nereye' ise başka bir biçime giriyor. Türkçede bu ayrım da eklerle yapılır: 'masada' ve 'masaya'. Yani mantık tanıdık, biçim yeni. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("stellen"),
          tr("Türkçesi 'dik koymak' demek. Lütfen"),
          de("stellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stellen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("legen"),
          tr("Türkçesi 'yatık koymak' demek. Lütfen"),
          de("legen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "legen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("hängen"),
          tr("Türkçesi 'asmak' demek. Lütfen"),
          de("hängen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hängen" },
      },
      {
        say: [
          tr("Bu fiil duvar işlerinin fiili:"),
          de("Ich hänge das Bild an die Wand."),
          tr("Hareket var, o yüzden duvar burada belirtme hâlinde."),
        ],
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Regal"),
          tr("Türkçesi 'raf' demek. Lütfen"),
          de("das Regal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Regal" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Vase"),
          tr("Türkçesi 'vazo' demek. Lütfen"),
          de("die Vase"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Vase" },
      },
      {
        say: [
          tr("İki cümleyi yan yana koyalım. Yer bildiren cümle:"),
          de("Das Regal steht an der Wand."),
          tr("Hareket bildiren cümle:"),
          de("Ich stelle das Regal an die Wand."),
          tr(
            "Edat aynı, duvar aynı; ama ikincisinde raf yol alıyor. Hareket varsa duvarın önündeki kelime nesne biçimine giriyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich stelle das Regal an die Wand"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich stelle das Regal an die Wand" },
      },
      {
        say: [tr("Sıra sende: 'Vazoyu masaya koyuyorum.' Vazo dik durur.")],
        expect: {
          kind: "produce",
          target: "Ich stelle die Vase auf den Tisch",
          hint: [
            tr("Vazo yol alıyor, yani masa nesne biçimine girer:"),
            de("Ich stelle die Vase auf den Tisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yatık koyduğun şeyler için ayrı fiil kullanılır:"),
          de("Ich lege das Buch auf den Tisch."),
          tr("Yer bildiren hâli ise geçen dersten tanıdık:"),
          de("Das Buch liegt auf dem Tisch."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich lege das Buch auf den Tisch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich lege das Buch auf den Tisch" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Notu masaya koyuyorum.' Not kâğıdı yatık durur.")],
        expect: {
          kind: "produce",
          target: "Ich lege den Zettel auf den Tisch",
          hint: [
            tr("Yatık koymanın fiili ayrı, hareket olduğu için masa da nesne biçiminde:"),
            de("Ich lege den Zettel auf den Tisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Nereye koyacağını bilmiyorsan sorman yeter:"),
          de("Wohin soll das?"),
          tr("Yani 'Bu nereye?' Lütfen"),
          de("Wohin soll das"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wohin soll das" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich stelle das Regal an der Wand."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich stelle das Regal an der Wand.",
          answer: false,
          why: [
            tr("Raf yol alıyor, yani hareket var; o zaman duvar nesne biçimine girer. Doğrusu:"),
            de("Ich stelle das Regal an die Wand."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık 'nerede' ile 'nereye' arasındaki farkı kurabiliyorsun. Şimdi taşınma günü: kutular kapıda ve arkadaşın her birini nereye koyacağını soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Taşınma günü ve arkadaşın kutuları içeri taşıyor. Her kutunun nereye gideceğini söyle, rafı nereye koyacağınıza karar ver ve fikrini değiştirdiğinde yeni yeri tarif et.",
      partner: "her kutuyu tek tek soran, yorulmuş bir arkadaş",
      opening: "Diese Kiste ist ziemlich schwer. Wohin soll ich sie stellen?",
      openingTr: "Bu kutu bayağı ağır. Nereye koyayım?",
      goal: "Her kutunun ve rafın yeri kararlaşmış, fikir değiştiğinde yeni yer de tarif edilmiş olur.",
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
    minutes: 9,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "einrichten", tr: "döşemek" },
      { de: "das Bild", tr: "tablo" },
      { de: "über", tr: "üstünde" },
      { de: "zwischen", tr: "arasında" },
      { de: "der Teppich", tr: "halı" },
    ],
    patterns: [
      { de: "Das Regal kommt an die Wand.", tr: "bir eşyanın nereye gideceğini söylerken kullanılır" },
      { de: "Das Bild hängt über dem Sofa.", tr: "bir eşyanın nerede durduğunu söylerken kullanılır" },
      { de: "zwischen dem Sofa und dem Fenster", tr: "iki şeyin arasını tarif ederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Oda boş, eşyalar ortada ve iki kişi ne nereye gitsin diye tartışıyor. Bugün son iki dersin kurallarını birlikte kullanacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste yeni bir kural yok; iki soruyu aynı konuşmanın içinde ayırt edeceksin. Bir de Almanların oda düzenlerken kullandığı kısa bir fiil var: bir eşyanın bir yere 'gelmesi'. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("einrichten"),
          tr("Türkçesi 'döşemek' demek. Lütfen"),
          de("einrichten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einrichten" },
      },
      {
        say: [
          tr("Fiilin kendisi ayrılabilenlerden:"),
          de("Wir richten heute das Wohnzimmer ein."),
          tr("Önek yine cümlenin sonuna düştü."),
        ],
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Bild"),
          tr("Türkçesi 'tablo, resim' demek. Lütfen"),
          de("das Bild"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bild" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("über"),
          tr("Türkçesi 'üstünde' demek. Lütfen"),
          de("über"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "über" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("zwischen"),
          tr("Türkçesi 'arasında' demek. Lütfen"),
          de("zwischen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zwischen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Teppich"),
          tr("Türkçesi 'halı' demek. Lütfen"),
          de("der Teppich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Teppich" },
      },
      {
        say: [
          tr("Almanlar oda düzenlerken çok kısa bir cümle kurar:"),
          de("Das Regal kommt an die Wand."),
          tr(
            "Yani 'Raf duvara gidecek'. Fiil 'gelmek' ama anlamı 'oraya konacak'. Hareket olduğu için duvar nesne biçiminde.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das Regal kommt an die Wand"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das Regal kommt an die Wand" },
      },
      {
        say: [tr("Sıra sende: 'Halı masanın altına gidecek.'")],
        expect: {
          kind: "produce",
          target: "Der Teppich kommt unter den Tisch",
          hint: [
            tr("Halı yol alıyor, yani masa nesne biçimine girer:"),
            de("Der Teppich kommt unter den Tisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Eşya yerine oturduktan sonra artık hareket kalmaz ve cümle öteki biçime döner:"),
          de("Das Bild hängt über dem Sofa."),
          tr("Yani 'Tablo kanepenin üstünde asılı'. Aynı odada iki cümle, iki farklı biçim."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das Bild hängt über dem Sofa"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das Bild hängt über dem Sofa" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Halı masanın altında duruyor.' Halı yatık durur.")],
        expect: {
          kind: "produce",
          target: "Der Teppich liegt unter dem Tisch",
          hint: [
            tr("Artık hareket yok, yer anlatılıyor; masa öteki biçime döner:"),
            de("Der Teppich liegt unter dem Tisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İki şeyin arasını tarif etmek için de bir edat var ve iki eşyayı birden alır:"),
          de("Die Lampe steht zwischen dem Sofa und dem Fenster."),
          tr("Lütfen"),
          de("Die Lampe steht zwischen dem Sofa und dem Fenster"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Die Lampe steht zwischen dem Sofa und dem Fenster",
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Lampe hängt über dem Tisch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Lampe hängt über dem Tisch.",
          answer: true,
          why: [
            tr("Doğru. Lamba asılı duruyor, hareket yok; o yüzden masa bu biçimde kaldı:"),
            de("Die Lampe hängt über dem Tisch."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir odayı baştan sona döşeyebilirsin. Şimdi yeni evdesin ve arkadaşınla oturma odasını düzenliyorsunuz.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni evinde arkadaşınla oturma odasını düzenliyorsun. Hangi eşyanın nereye gideceğini söyle, onun önerisine katıl ya da itiraz et ve sonunda odanın son hâlini tarif et.",
      partner: "dekorasyon konusunda kendine çok güvenen bir arkadaş",
      opening: "Also, ich finde, das Sofa gehört ans Fenster. Was meinst du?",
      openingTr: "Bence kanepenin yeri pencere kenarı. Sen ne dersin?",
      goal: "Eşyaların yerleri kararlaşmış ve odanın son hâli tarif edilmiş olur.",
      minTurns: 7,
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
    minutes: 9,
    focusId: "Dativ-Präpositionen",
    vocab: [
      { de: "die Nachbarschaft", tr: "mahalle" },
      { de: "die Bäckerei", tr: "fırın" },
      { de: "die Schule", tr: "okul" },
      { de: "der Spielplatz", tr: "oyun parkı" },
      { de: "neben", tr: "yanında" },
    ],
    patterns: [
      { de: "Ich wohne neben dem Park.", tr: "nerede oturduğunu tarif ederken kullanılır" },
      { de: "gegenüber der Schule", tr: "bir yerin karşısını tarif ederken kullanılır" },
      { de: "bei mir um die Ecke", tr: "çok yakında olduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Yeni bir mahalleye taşınan herkesin ilk sorusu aynı: fırın nerede, okul nerede? Bugün mahallendeki yerleri tarif etmeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Son iki derste edatların iki yüzü olduğunu gördün. Bugünküler öyle değil: bir grup edat vardır ki hep aynı biçimi ister, hareket olsa da olmasa da. Onları bir kez öğrenirsin ve bir daha düşünmezsin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Nachbarschaft"),
          tr("Türkçesi 'mahalle' demek. Lütfen"),
          de("die Nachbarschaft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nachbarschaft" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Bäckerei"),
          tr("Türkçesi 'fırın' demek. Lütfen"),
          de("die Bäckerei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bäckerei" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Schule"),
          tr("Türkçesi 'okul' demek. Lütfen"),
          de("die Schule"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schule" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Spielplatz"),
          tr("Türkçesi 'oyun parkı' demek. Lütfen"),
          de("der Spielplatz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Spielplatz" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("neben"),
          tr("Türkçesi 'yanında' demek. Lütfen"),
          de("neben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "neben" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich wohne neben dem Park."),
          tr(
            "Yani 'Parkın yanında oturuyorum'. Burada bir hareket yok, bir yer anlatılıyor; o yüzden park bu biçimde duruyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich wohne neben dem Park"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich wohne neben dem Park" },
      },
      {
        say: [tr("Sıra sende: 'Fırının yanında oturuyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich wohne neben der Bäckerei",
          hint: [
            tr("Fırın dişil olduğu için biçimi değişir:"),
            de("Ich wohne neben der Bäckerei."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Karşıyı tarif eden edat hep aynı biçimi ister, düşünmene gerek yok:"),
          de("Der Spielplatz ist gegenüber der Schule."),
          tr("Lütfen"),
          de("Der Spielplatz ist gegenüber der Schule"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Spielplatz ist gegenüber der Schule" },
      },
      {
        say: [tr("Şimdi sen tarif et: 'Okul parkın karşısında.'")],
        expect: {
          kind: "produce",
          target: "Die Schule ist gegenüber dem Park",
          hint: [
            tr("Önce yer, sonra fiil, en sonda karşısında olduğu şey:"),
            de("Die Schule ist gegenüber dem Park."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir yerin çok yakında olduğunu söylemek için hazır bir kalıp var:"),
          de("Die Bäckerei ist bei mir um die Ecke."),
          tr("Yani 'Fırın bize iki adım'. Lütfen"),
          de("Die Bäckerei ist bei mir um die Ecke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Bäckerei ist bei mir um die Ecke" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich wohne neben der Schule."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich wohne neben der Schule.",
          answer: true,
          why: [
            tr("Doğru. Oturmak bir yer bildirir, hareket değil; o yüzden okul bu biçimde kaldı:"),
            de("Ich wohne neben der Schule."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık mahalleni tarif edebilirsin. Şimdi apartmana yeni taşınan biri kapını çaldı ve etrafı soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Apartmana yeni taşınan komşun mahalleyi soruyor. Fırın, okul ve oyun parkının nerede olduğunu tarif et, en yakın markete nasıl gidileceğini söyle ve mahalleyi nasıl bulduğunu anlat.",
      partner: "her şeyi not alan, yeni taşınmış bir komşu",
      opening: "Wir sind gerade eingezogen. Gibt es hier eine Bäckerei in der Nähe?",
      openingTr: "Daha yeni taşındık. Buralarda yakında bir fırın var mı?",
      goal: "Fırın, okul ve parkın yeri tarif edilmiş, en yakın markete nasıl gidileceği söylenmiş olur.",
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
    minutes: 9,
    focusId: "Personalpronomen-Dativ",
    vocab: [
      { de: "die Bohrmaschine", tr: "matkap" },
      { de: "die Leiter", tr: "merdiven" },
      { de: "der Eimer", tr: "kova" },
      { de: "danken", tr: "teşekkür etmek" },
      { de: "nett", tr: "kibar" },
    ],
    patterns: [
      { de: "Kannst du mir helfen?", tr: "yardım isterken kullanılır" },
      { de: "Ich leihe dir die Leiter.", tr: "birine bir şey ödünç verirken kullanılır" },
      { de: "Das hilft mir sehr.", tr: "yardımın işine yaradığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Evde bir iş var ve tek başına olmuyor. Bugün komşundan yardım ve eşya istemeyi öğreneceğiz. İki fiil bu derste özel davranıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada bazı fiiller nesnesini doğrudan almaz; yardım eden de, teşekkür eden de kişiyi o değişmiş biçimde söyler. Türkçede bunu zaten yapıyoruz: 'bana yardım et' deriz, 'beni yardım et' demeyiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Bohrmaschine"),
          tr("Türkçesi 'matkap' demek. Lütfen"),
          de("die Bohrmaschine"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bohrmaschine" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Leiter"),
          tr("Türkçesi 'merdiven' demek. Lütfen"),
          de("die Leiter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Leiter" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Eimer"),
          tr("Türkçesi 'kova' demek. Lütfen"),
          de("der Eimer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Eimer" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("danken"),
          tr("Türkçesi 'teşekkür etmek' demek. Lütfen"),
          de("danken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "danken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("nett"),
          tr("Türkçesi 'kibar, hoş' demek. Lütfen"),
          de("nett"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nett" },
      },
      {
        say: [
          tr("İlk kalıbımız bir rica:"),
          de("Kannst du mir helfen?"),
          tr(
            "Yani 'Bana yardım eder misin?' Yardım eden kişi hep bu biçimde söylenir; başka türlüsü kulağa yanlış gelir.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Kannst du mir helfen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Kannst du mir helfen" },
      },
      {
        say: [tr("Sıra sende. Bir de eşya iste: 'Bana merdiveni ödünç verebilir misin?'")],
        expect: {
          kind: "produce",
          target: "Kannst du mir die Leiter leihen",
          hint: [
            tr("Önce alan kişi, sonra verilecek şey, asıl fiil en sonda:"),
            de("Kannst du mir die Leiter leihen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Karşındaki kabul ederse cevabı şöyle olur:"),
          de("Klar, ich leihe dir die Bohrmaschine."),
          tr("Lütfen"),
          de("Ich leihe dir die Bohrmaschine"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich leihe dir die Bohrmaschine" },
      },
      {
        say: [
          tr("Teşekkür ederken de aynı biçim karşına çıkıyor:"),
          de("Ich danke dir."),
          tr("ve yardımın işine yaradığını şöyle söylersin:"),
          de("Das hilft mir sehr."),
          tr("Lütfen"),
          de("Das hilft mir sehr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das hilft mir sehr" },
      },
      {
        say: [tr("Şimdi sen bir iltifat et: 'Bu çok kibarca.'")],
        expect: {
          kind: "produce",
          target: "Das ist sehr nett",
          hint: [
            tr("Kısa bir cümle yeter, sonunda değerlendirme durur:"),
            de("Das ist sehr nett."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Kannst du mich helfen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Kannst du mich helfen?",
          answer: false,
          why: [
            tr("Yardım edilen kişi bu fiilde başka bir biçimde söylenir. Doğrusu:"),
            de("Kannst du mir helfen?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık yardım isteyebilir, eşya ödünç alabilir ve teşekkür edebilirsin. Şimdi komşunun kapısını çalıyorsun: duvara bir raf asacaksın ama aletin yok.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Duvara raf asacaksın ama matkabın yok ve komşunun kapısını çaldın. Ne yapmak istediğini anlat, aleti ödünç iste, ne zaman geri vereceğini söyle ve teşekkür et.",
      partner: "aletlerine çok düşkün ama iyi niyetli, senli benli bir komşu",
      opening: "Hallo! Dich habe ich ja lange nicht gesehen. Brauchst du etwas?",
      openingTr: "Merhaba! Seni uzun süredir görmemiştim. Bir şeye mi ihtiyacın var?",
      goal: "Alet ödünç alınmış, ne zaman geri verileceği söylenmiş ve teşekkür edilmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-paket",
    icon: "mail",
    level: "A2",
    course: "de",
    title: "Ein Paket für den Nachbarn",
    titleTr: "Kargo teslim",
    summary: "Komşu adına gelen kargoyu teslim almayı ve haber vermeyi öğretir.",
    minutes: 9,
    focusId: "Dativ",
    vocab: [
      { de: "annehmen", tr: "teslim almak" },
      { de: "abgeben", tr: "teslim etmek" },
      { de: "die Unterschrift", tr: "imza" },
      { de: "der Briefkasten", tr: "posta kutusu" },
      { de: "der Empfänger", tr: "alıcı" },
    ],
    patterns: [
      { de: "Ich habe ein Paket für Sie.", tr: "kargoyu teslim ederken kullanılır" },
      { de: "Können Sie es dem Nachbarn geben?", tr: "kargoyu başkasına bırakırken kullanılır" },
      { de: "Ich nehme das Paket an.", tr: "kargoyu teslim aldığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Kapı çaldı ve gelen kargo senin değil, komşunun. Bugün kargoyu teslim almayı, komşuya bırakmayı ve haber vermeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ders modülün kişi hâlini son bir kez pekiştiriyor: kargonun verildiği kişi hep o değişmiş biçimde söyleniyor. Bir de A1'den tanıdığın önekli fiiller geri geliyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("annehmen"),
          tr("Türkçesi 'teslim almak' demek. Lütfen"),
          de("annehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "annehmen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("abgeben"),
          tr("Türkçesi 'teslim etmek' demek. Lütfen"),
          de("abgeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abgeben" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Unterschrift"),
          tr("Türkçesi 'imza' demek. Lütfen"),
          de("die Unterschrift"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Unterschrift" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Briefkasten"),
          tr("Türkçesi 'posta kutusu' demek. Lütfen"),
          de("der Briefkasten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Briefkasten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Empfänger"),
          tr("Türkçesi 'alıcı' demek. Lütfen"),
          de("der Empfänger"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Empfänger" },
      },
      {
        say: [
          tr("Kapıdaki kuryenin ilk cümlesi şu olacak:"),
          de("Ich habe ein Paket für Sie."),
          tr("Alıcı sen değilsen düzeltirsin:"),
          de("Der Empfänger wohnt oben."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe ein Paket für Sie"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe ein Paket für Sie" },
      },
      {
        say: [
          tr("Komşu adına almayı kabul edersen fiil ikiye ayrılır ve öneki sona gider:"),
          de("Ich nehme das Paket an."),
          tr("Lütfen"),
          de("Ich nehme das Paket an"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich nehme das Paket an" },
      },
      {
        say: [tr("Sıra sende. Kurye soruyor, sen cevap ver: 'Kargoyu komşuya verebilir misiniz?'")],
        expect: {
          kind: "produce",
          target: "Können Sie es dem Nachbarn geben",
          hint: [
            tr("Kargoyu alan kişi değişmiş biçimde söylenir, asıl fiil en sonda kalır:"),
            de("Können Sie es dem Nachbarn geben?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Teslim alırken bir de imza istenir:"),
          de("Ihre Unterschrift, bitte."),
          tr("Kargo küçükse başka bir seçenek de var:"),
          de("Legen Sie es bitte in den Briefkasten."),
          tr("Lütfen"),
          de("Legen Sie es bitte in den Briefkasten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Legen Sie es bitte in den Briefkasten" },
      },
      {
        say: [tr("Şimdi komşuna haber ver: 'Kargoyu yöneticiye verdim.'")],
        expect: {
          kind: "produce",
          target: "Ich habe das Paket dem Hausmeister gegeben",
          hint: [
            tr("Alan kişi değişmiş biçimde, geçmiş biçimi en sonda:"),
            de("Ich habe das Paket dem Hausmeister gegeben."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gebe das Paket dem Nachbarn."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gebe das Paket dem Nachbarn.",
          answer: true,
          why: [
            tr("Doğru. Kargoyu alan kişi bu biçimde, verilen şey ise nesne olarak duruyor:"),
            de("Ich gebe das Paket dem Nachbarn."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kargo kapıya geldiğinde ne diyeceğini biliyorsun. Şimdi zil çaldı ve kurye elinde bir kutuyla bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Kapıda bir kurye var ve elindeki kargo üst kattaki komşuna ait. Durumu açıkla, kargoyu onun adına teslim alıp almayacağını konuş, imza konusunu hallet ve komşuna nasıl haber vereceğini söyle.",
      partner: "günde yüz kapı çalan, acelesi olan bir kurye",
      opening: "Guten Tag, ein Paket für Familie Weber. Sind Sie das?",
      openingTr: "İyi günler, Weber ailesine kargo var. Siz misiniz?",
      goal: "Kargonun teslim alınıp alınmayacağı kararlaşmış, imza halledilmiş ve komşuya nasıl haber verileceği söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-laerm",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Der Lärm von oben",
    titleTr: "Gürültü şikâyeti",
    summary: "Gürültüden rahatsız olduğunu kibarca söylemeyi ve şart cümlesi kurmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "der Lärm", tr: "gürültü" },
      { de: "stören", tr: "rahatsız etmek" },
      { de: "die Nachtruhe", tr: "gece sessizliği" },
      { de: "der Streit", tr: "tartışma" },
      { de: "freundlich", tr: "dostça" },
    ],
    patterns: [
      { de: "Wenn es laut ist, kann ich nicht schlafen.", tr: "şartı ve sonucunu söylerken kullanılır" },
      { de: "Der Lärm stört mich.", tr: "rahatsız olduğunu söylerken kullanılır" },
      { de: "Können Sie bitte leiser sein?", tr: "kibarca rica ederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Üst kattan gelen gürültü uykunu kaçırıyor ve konuşman gerekiyor. Bugün bunu kavga çıkarmadan söylemeyi öğreneceğiz. Bir de yeni bir cümle yapısı var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede şartı fiile eklediğimiz bir ekle kurarız: 'gürültü olursa'. Fiil zaten sonda olduğu için bir şey değişmez. Almancada ise cümlenin başına bir bağlaç gelir ve o bağlaç fiili cümlenin en sonuna iter. Bu, Almancanın en çok şaşırtan kuralı. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Lärm"),
          tr("Türkçesi 'gürültü' demek. Lütfen"),
          de("der Lärm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Lärm" },
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
          de("die Nachtruhe"),
          tr("Türkçesi 'gece sessizliği' demek. Almanya'da bu bir kuraldır ve saati bellidir. Lütfen"),
          de("die Nachtruhe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nachtruhe" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Streit"),
          tr("Türkçesi 'tartışma, kavga' demek. Lütfen"),
          de("der Streit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Streit" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("freundlich"),
          tr("Türkçesi 'dostça' demek. Lütfen"),
          de("freundlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "freundlich" },
      },
      {
        say: [
          tr("Bir de ton meselesi var; komşuluk bozulmasın diye şöyle denir:"),
          de("Der Nachbar ist eigentlich sehr freundlich."),
        ],
      },
      {
        say: [
          tr("Önce basit hâliyle söyleyelim:"),
          de("Der Lärm stört mich."),
          tr(
            "Yani 'Gürültü beni rahatsız ediyor'. Suçlayıcı bir cümle değil; Almancada şikâyet böyle başlar.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Lärm stört mich"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Lärm stört mich" },
      },
      {
        say: [
          tr("Şimdi şart cümlesi:"),
          de("Wenn es laut ist, kann ich nicht schlafen."),
          tr(
            "İlk yarıya dikkat et: bağlaç başa geldi ve fiil o yarının en sonuna gitti. İkinci yarıda ise fiil hemen öne çıktı, çünkü ilk yarı bütünüyle cümlenin birinci öğesi sayılıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wenn es laut ist, kann ich nicht schlafen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wenn es laut ist, kann ich nicht schlafen" },
      },
      {
        say: [tr("Sıra sende: 'Gece geç olduğunda çalışamıyorum.' Bunu 'geç olursa' diye kur.")],
        expect: {
          kind: "produce",
          target: "Wenn es spät ist, kann ich nicht arbeiten",
          hint: [
            tr("Bağlaçlı yarıda fiil en sona gider, ikinci yarıda hemen öne çıkar:"),
            de("Wenn es spät ist, kann ich nicht arbeiten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ricayı da kibar tutarsın:"),
          de("Können Sie bitte leiser sein?"),
          tr("Gerekirse kuralı hatırlatırsın:"),
          de("Nach zehn Uhr ist Nachtruhe."),
          tr("Lütfen"),
          de("Können Sie bitte leiser sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Können Sie bitte leiser sein" },
      },
      {
        say: [tr("Şimdi sen kapıyı iyi niyetle kapat: 'Kavga istemiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich möchte keinen Streit",
          hint: [
            tr("İstenmeyen şey eril olduğu için olumsuzluk kelimesi de o biçime girer:"),
            de("Ich möchte keinen Streit."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn es ist laut, kann ich nicht schlafen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn es ist laut, kann ich nicht schlafen.",
          answer: false,
          why: [
            tr("Bağlaçtan sonra fiil o yarının en sonuna gider. Doğrusu:"),
            de("Wenn es laut ist, kann ich nicht schlafen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık rahatsızlığını kibarca ama net söyleyebilirsin. Şimdi üst kattaki komşunun kapısındasın ve içeriden müzik geliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Üst kattan gelen gürültü yüzünden uyuyamıyorsun ve komşunun kapısını çaldın. Durumu dostça anlat, ne zaman rahatsız olduğunu söyle, ricanı ilet ve bir çözümde anlaşın.",
      partner: "misafirleri olan, özür dilemeye hazır ama savunmaya da geçen bir komşu",
      opening: "Oh, guten Abend! Ist es zu laut bei uns?",
      openingTr: "Aa, iyi akşamlar! Bizden çok ses mi geliyor?",
      goal: "Rahatsızlık dostça anlatılmış ve iki tarafın da kabul ettiği bir çözümde anlaşılmış olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-hausmeister",
    icon: "repair",
    level: "A2",
    course: "de",
    title: "Der Hausmeister kommt",
    titleTr: "Yönetici ile arıza",
    summary: "Evdeki bir arızayı anlatmayı, göstermeyi ve randevu almayı öğretir.",
    minutes: 9,
    focusId: "Dativ",
    vocab: [
      { de: "tropfen", tr: "damlamak" },
      { de: "der Wasserhahn", tr: "musluk" },
      { de: "die Heizung", tr: "kalorifer" },
      { de: "der Handwerker", tr: "usta" },
      { de: "reparieren", tr: "tamir etmek" },
    ],
    patterns: [
      { de: "Bei mir tropft der Wasserhahn.", tr: "evindeki arızayı bildirirken kullanılır" },
      { de: "Ich zeige Ihnen die Heizung.", tr: "arızayı gösterirken kullanılır" },
      { de: "Der Handwerker kommt am Freitag.", tr: "ustanın ne zaman geleceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Musluk damlıyor, kalorifer ısıtmıyor ve yönetici kapıda. Bugün evdeki bir arızayı anlatmayı, göstermeyi ve randevuyu konuşmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ders modülü kapatıyor ve içinde modülün üç yüzü de var: kişiyi söylemek, yeri söylemek ve bir şeyi birine göstermek. Bir de Almancanın 'bende' demek için kullandığı kısa bir kalıp öğreneceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("tropfen"),
          tr("Türkçesi 'damlamak' demek. Lütfen"),
          de("tropfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tropfen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Wasserhahn"),
          tr("Türkçesi 'musluk' demek. Lütfen"),
          de("der Wasserhahn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wasserhahn" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Heizung"),
          tr("Türkçesi 'kalorifer' demek. Lütfen"),
          de("die Heizung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Heizung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Handwerker"),
          tr("Türkçesi 'usta' demek. Lütfen"),
          de("der Handwerker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Handwerker" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("reparieren"),
          tr("Türkçesi 'tamir etmek' demek. Lütfen"),
          de("reparieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "reparieren" },
      },
      {
        say: [
          tr("İşin sonunda olacak şey de belli:"),
          de("Der Handwerker repariert die Heizung."),
        ],
      },
      {
        say: [
          tr("Arızayı bildirirken Almanca 'benim evimde' demez, kısa keser:"),
          de("Bei mir tropft der Wasserhahn."),
          tr(
            "Yani 'Bende musluk damlıyor'. Baştaki iki kelime 'benim evimde' anlamına geliyor ve cümle onunla başladığı için fiil hemen arkasına geçti.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Bei mir tropft der Wasserhahn"), tr("deyin.")],
        expect: { kind: "repeat", target: "Bei mir tropft der Wasserhahn" },
      },
      {
        say: [tr("Sıra sende: 'Bende kalorifer çalışmıyor.'")],
        expect: {
          kind: "produce",
          target: "Bei mir funktioniert die Heizung nicht",
          hint: [
            tr("Kalıp başta, fiil hemen arkasında, olumsuzluk en sonda:"),
            de("Bei mir funktioniert die Heizung nicht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yöneticiyi içeri alıp arızayı gösterirsin. Gösterilen kişi yine o değişmiş biçimde:"),
          de("Ich zeige Ihnen die Heizung."),
          tr("Lütfen"),
          de("Ich zeige Ihnen die Heizung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich zeige Ihnen die Heizung" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Size mutfağı göstereyim.' Bunu 'gösteriyorum' diye kur.")],
        expect: {
          kind: "produce",
          target: "Ich zeige Ihnen die Küche",
          hint: [
            tr("Önce gösterilen kişi, sonra gösterilen yer:"),
            de("Ich zeige Ihnen die Küche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yönetici kendi tamir etmezse ustayı çağırır:"),
          de("Der Handwerker kommt am Freitag."),
          tr("Sen de uygun olup olmadığını söylersin:"),
          de("Am Freitag bin ich zu Hause."),
          tr("Lütfen"),
          de("Der Handwerker kommt am Freitag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Handwerker kommt am Freitag" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Bei mir ist die Lampe kaputt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Bei mir ist die Lampe kaputt.",
          answer: true,
          why: [
            tr("Doğru. Cümle 'bende' kalıbıyla başladı ve fiil hemen arkasına geçti:"),
            de("Bei mir ist die Lampe kaputt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Modülü bitirdin: artık kime, nerede ve nereye sorularının hepsini kurabiliyorsun. Şimdi kapı çaldı, yönetici geldi ve elinde not defteri var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Apartman yöneticisi arızaya bakmaya geldi. Sorunu anlat, ne zamandır sürdüğünü söyle, arızayı göster ve ustanın ne zaman geleceğini konuşup uygun bir gün üzerinde anlaş.",
      partner: "işini bilen ama her şeyi not defterine yazan bir apartman yöneticisi",
      opening: "Guten Tag, Sie haben angerufen. Was ist denn kaputt?",
      openingTr: "İyi günler, aramışsınız. Ne bozuldu?",
      goal: "Arıza gösterilmiş ve ustanın geleceği gün üzerinde anlaşılmış olur.",
      minTurns: 7,
    },
  },
];

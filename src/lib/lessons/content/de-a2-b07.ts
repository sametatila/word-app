import { de, tr, type Lesson } from "../types";

/**
 * A2 · Modül 7 — Seyahat (061–070).
 *
 * Modülün dil omurgası dört şey ve dördü de Türkçe konuşanın kendiliğinden
 * kuramayacağı yapılar:
 *
 *   1. **Yön edatları.** Türkçede her yere „-e/-a“ ile gidilir: denize,
 *      dağlara, İtalya'ya. Almancada gideceğin yerin türüne göre edat
 *      değişiyor ve arkasından gelen kelime belirtme hâline giriyor — yani
 *      hem edatı hem hâli seçmek gerekiyor.
 *   2. **`werden` ile gelecek.** Türkçede gelecek tek ekle kuruluyor
 *      (yağacak); Almancada cümle ikiye bölünüyor ve asıl fiil sona gidiyor.
 *   3. **`wenn` yan cümlesi.** Türkçede koşul ekle kuruluyor (hava güzelse);
 *      Almancada ayrı bir bağlaç geliyor ve o bağlaç fiili cümlenin sonuna
 *      atıyor.
 *   4. **Yönelme hâli.** „Anneme bir şey getiriyorum“ derken Türkçede tek ek
 *      var; Almancada artikel değişiyor ve öğrenci belirtme hâlini kullanıp
 *      „meine Mutter“ diyor.
 *
 * Sıra bir seyahatin kendi sırası: rota, otel, bavul, havalimanı, hava
 * tahmini, gezi, kamp, şehir turu, hediyelik, aksilik.
 */
export const deA2B07: Lesson[] = [
  {
    id: "de-a2-reiseplan",
    icon: "map",
    level: "A2",
    course: "de",
    title: "Wohin fahren wir?",
    titleTr: "Rota planı",
    summary: "Nereye gidileceğini söylemeyi öğretir; her yerin kendi edatını gösterir.",
    minutes: 9,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "das Gebirge", tr: "dağ silsilesi" },
      { de: "die Küste", tr: "sahil" },
      { de: "die Route", tr: "güzergâh" },
      { de: "abfahren", tr: "yola çıkmak" },
      { de: "die Fähre", tr: "feribot" },
    ],
    patterns: [
      { de: "Wir fahren ans Meer.", tr: "denize gidildiğini söyler" },
      { de: "Wir fahren in die Berge.", tr: "dağlara gidildiğini söyler" },
      { de: "Wir fahren nach Italien.", tr: "bir ülkeye gidildiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün tatil rotası planlamayı öğreneceğiz. Burada Türkçeden ayrılan bir şey var: Türkçede her yere aynı ekle gidersin, Almancada gideceğin yerin türüne göre kelime değişir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Denize, dağlara, bir ülkeye — üçü için üç ayrı kalıp var. Bunlar ezberlenecek kadar az ama bilinmeyince her cümlede takılırsın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Gebirge"),
          tr("Türkçesi 'dağ silsilesi' demek. Lütfen"),
          de("das Gebirge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gebirge" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Küste"),
          tr("Türkçesi 'sahil' demek. Lütfen"),
          de("die Küste"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Küste" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Route"),
          tr("Türkçesi 'güzergâh' demek. Lütfen"),
          de("die Route"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Route" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("abfahren"),
          tr("Türkçesi 'yola çıkmak' demek. Bu da ikiye bölünen fiillerden. Lütfen"),
          de("abfahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abfahren" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Fähre"),
          tr("Türkçesi 'feribot' demek. Lütfen"),
          de("die Fähre"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Fähre" },
      },
      {
        say: [
          tr(
            "Şimdi kural. Bir yere doğru gidiş anlatılırken kelime belirtme hâline girer. Ülke adlarında ise artikel yoktur ve tek bir kelime yeter.",
          ),
        ],
      },
      {
        say: [
          tr("İlk örnek: 'Denize gidiyoruz.' Almancası:"),
          de("Wir fahren ans Meer."),
          tr("Lütfen"),
          de("Wir fahren ans Meer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir fahren ans Meer" },
      },
      {
        say: [tr("Sıra sende: 'Dağlara gidiyoruz.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir fahren in die Berge",
          hint: [
            tr("Dağlar için başka bir edat var ve kelime belirtme hâline girer:"),
            de("Wir fahren in die Berge."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ülkeler için kalıp daha kısa:"),
          de("Wir fahren nach Italien."),
          tr("'İtalya'ya gidiyoruz' demek; artikel yok. Lütfen"),
          de("Wir fahren nach Italien"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir fahren nach Italien" },
      },
      {
        say: [tr("Şimdi sen: 'Sahile gidiyoruz.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir fahren an die Küste",
          hint: [
            tr("Sahil için denizle aynı edat kullanılır, kelime belirtme hâline girer:"),
            de("Wir fahren an die Küste."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yola çıkışı da söyleyelim:"),
          de("Wir fahren um sechs ab."),
          tr("'Altıda yola çıkıyoruz' demek; parça yine sonda. Lütfen"),
          de("Wir fahren um sechs ab"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir fahren um sechs ab" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir fahren in den Bergen."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir fahren in den Bergen.",
          answer: false,
          why: [
            tr("Bu cümle 'dağlarda dolaşıyoruz' demek olur. Oraya doğru gidiş anlatılıyorsa kelime belirtme hâline girmeli:"),
            de("Wir fahren in die Berge."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık rotanı anlatabilirsin. Şimdi bir arkadaşınla tatil planı yapacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla yaz tatilini planlıyorsunuz. Nereye gitmek istediğini söyle, güzergâhı konuş ve varış noktasında ne yapacağınızı anlat.",
      partner: "her yeri görmek isteyen, kararsız bir seyahat arkadaşı",
      opening: "Also, wohin fahren wir dieses Jahr? Ans Meer oder in die Berge?",
      openingTr: "Peki, bu yıl nereye gidiyoruz? Denize mi, dağlara mı?",
      goal: "Gidilecek yer, güzergâh ve orada yapılacaklar kararlaşmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-hotel",
    icon: "bed",
    level: "A2",
    course: "de",
    title: "An der Rezeption",
    titleTr: "Otelde",
    summary: "Otele giriş yapmayı ve resepsiyonda soru sormayı öğretir.",
    minutes: 9,
    focusId: "W-Fragen",
    vocab: [
      { de: "die Rezeption", tr: "resepsiyon" },
      { de: "reservieren", tr: "rezervasyon yaptırmak" },
      { de: "das Doppelzimmer", tr: "iki kişilik oda" },
      { de: "die Übernachtung", tr: "geceleme" },
      { de: "der Aufenthalt", tr: "kalış süresi" },
    ],
    patterns: [
      { de: "Ich habe reserviert.", tr: "rezervasyonu olduğunu söyler" },
      { de: "Wann gibt es Frühstück?", tr: "kahvaltı saatini sorar" },
      { de: "Der Schlüssel für Zimmer …", tr: "oda anahtarını ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün otele giriş yapmayı öğreneceğiz. Resepsiyonda konuşma neredeyse hep aynı üç cümleyle başlar; onları öğrenince gerisi kolay geliyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanca konuşulan yerlerde otel görevlisi genellikle resmî konuşur ve senden de aynısını bekler. Kalıplar buna göre kurulu. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Rezeption"),
          tr("Türkçesi 'resepsiyon' demek. Lütfen"),
          de("die Rezeption"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rezeption" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("reservieren"),
          tr("Türkçesi 'rezervasyon yaptırmak' demek. Lütfen"),
          de("reservieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "reservieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Doppelzimmer"),
          tr("Türkçesi 'iki kişilik oda' demek. Lütfen"),
          de("das Doppelzimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Doppelzimmer" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Übernachtung"),
          tr("Türkçesi 'geceleme' demek — bir gecelik konaklama. Lütfen"),
          de("die Übernachtung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Übernachtung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Aufenthalt"),
          tr("Türkçesi 'kalış süresi' demek. Lütfen"),
          de("der Aufenthalt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Aufenthalt" },
      },
      {
        say: [
          tr("İlk kalıbımız girişte söylenen cümle:"),
          de("Ich habe ein Zimmer reserviert."),
          tr("'Oda ayırtmıştım' demek. Lütfen"),
          de("Ich habe ein Zimmer reserviert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe ein Zimmer reserviert" },
      },
      {
        say: [tr("Sıra sende: 'İki kişilik oda ayırtmıştım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe ein Doppelzimmer reserviert",
          hint: [
            tr("Geçmiş biçim cümlenin sonunda kalır:"),
            de("Ich habe ein Doppelzimmer reserviert."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir soru:"),
          de("Wie lange dauert der Aufenthalt?"),
          tr("'Kalış ne kadar sürüyor?' demek. Lütfen"),
          de("Wie lange dauert der Aufenthalt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wie lange dauert der Aufenthalt" },
      },
      {
        say: [tr("Şimdi sen sor: 'Kahvaltı kaçta?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wann gibt es Frühstück",
          hint: [
            tr("Soru kelimesi başta, fiil hemen arkasında:"),
            de("Wann gibt es Frühstück?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız anahtar için:"),
          de("Der Schlüssel für Zimmer zwölf, bitte."),
          tr("Lütfen"),
          de("Der Schlüssel für Zimmer zwölf, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Schlüssel für Zimmer zwölf, bitte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe ein Zimmer für zwei Nächte reserviert."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe ein Zimmer für zwei Nächte reserviert.",
          answer: true,
          why: [
            tr("Doğru. Yardımcı fiil ikinci sırada, geçmiş biçim cümlenin en sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık otele giriş yapabilirsin. Şimdi resepsiyondasın ve görevliyle konuşacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir otele vardın ve resepsiyondasın. Rezervasyonun olduğunu söyle, kalış süreni belirt ve kahvaltı ile anahtar hakkında soru sor.",
      partner: "resmî konuşan, işini hızlı yapan bir otel görevlisi",
      opening: "Guten Abend! Haben Sie eine Reservierung?",
      openingTr: "İyi akşamlar! Rezervasyonunuz var mı?",
      goal: "Rezervasyon onaylanmış, kalış süresi netleşmiş ve kahvaltı ile anahtar konusu çözülmüş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-koffer",
    icon: "suitcase",
    level: "A2",
    course: "de",
    title: "Der Koffer ist gepackt",
    titleTr: "Bavul hazırlama",
    summary: "Bavula ne koyduğunu sormayı ve söylemeyi öğretir.",
    minutes: 9,
    focusId: "Perfekt-trennbar",
    vocab: [
      { de: "einpacken", tr: "bavula koymak" },
      { de: "die Zahnbürste", tr: "diş fırçası" },
      { de: "das Ladegerät", tr: "şarj aleti" },
      { de: "der Ausweis", tr: "kimlik" },
      { de: "leicht", tr: "hafif" },
    ],
    patterns: [
      { de: "Ich habe … eingepackt.", tr: "bavula ne koyduğunu söyler" },
      { de: "Hast du … mitgenommen?", tr: "bir şeyi alıp almadığını sorar" },
      { de: "Nichts vergessen?", tr: "unutulan bir şey olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bavul hazırlamayı konuşacağız. Burada geçmiş zamanın küçük bir ayrıntısı var: ikiye bölünen fiillerde geçmiş işareti fiilin ortasına giriyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ayrıntı ilk başta şaşırtıyor ama mantığı var: baştaki parça yerinde kalıyor, geçmiş işareti onun arkasına yerleşiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("einpacken"),
          tr("Türkçesi 'bavula koymak' demek. Lütfen"),
          de("einpacken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einpacken" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Zahnbürste"),
          tr("Türkçesi 'diş fırçası' demek. Lütfen"),
          de("die Zahnbürste"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zahnbürste" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Ladegerät"),
          tr("Türkçesi 'şarj aleti' demek. Lütfen"),
          de("das Ladegerät"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ladegerät" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Ausweis"),
          tr("Türkçesi 'kimlik' demek. Lütfen"),
          de("der Ausweis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Ausweis" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("leicht"),
          tr("Türkçesi 'hafif' demek. Lütfen"),
          de("leicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leicht" },
      },
      {
        say: [
          tr("Hedefin hep aynı:"),
          de("Der Koffer soll leicht bleiben."),
        ],
      },
      {
        say: [
          tr(
            "Şimdi kural. Bu fiilin geçmiş biçiminde işaret başa değil, baştaki parçanın hemen arkasına geliyor. Yani kelime içeriden büyüyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Her şeyi bavula koydum.' Almancası:"),
          de("Ich habe alles eingepackt."),
          tr("Lütfen"),
          de("Ich habe alles eingepackt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe alles eingepackt" },
      },
      {
        say: [tr("Sıra sende: 'Diş fırçamı koydum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe die Zahnbürste eingepackt",
          hint: [
            tr("Geçmiş işareti fiilin ortasına giriyor:"),
            de("Ich habe die Zahnbürste eingepackt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir soru:"),
          de("Hast du den Ausweis mitgenommen?"),
          tr("'Kimliği aldın mı?' demek. Lütfen"),
          de("Hast du den Ausweis mitgenommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hast du den Ausweis mitgenommen" },
      },
      {
        say: [tr("Şimdi sen sor: 'Şarj aletini aldın mı?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Hast du das Ladegerät mitgenommen",
          hint: [
            tr("Soruda yardımcı fiil başta, geçmiş biçim en sonda:"),
            de("Hast du das Ladegerät mitgenommen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız kısa bir kontrol sorusu:"),
          de("Nichts vergessen?"),
          tr("'Unuttuğun bir şey yok, değil mi?' demek. Lütfen"),
          de("Nichts vergessen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nichts vergessen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe alles einpackt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe alles einpackt.",
          answer: false,
          why: [
            tr("Geçmiş işareti eksik; ikiye bölünen fiillerde işaret ortaya girer. Doğrusu"),
            de("Ich habe alles eingepackt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bavul konuşmasını yapabilirsin. Şimdi yola çıkmadan önce ev arkadaşınla son kontrolü yapacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yola çıkmadan önce yol arkadaşınla bavulları kontrol ediyorsunuz. Neyi koyduğunu söyle, ona neyi aldığını sor ve unutulan bir şey olup olmadığını kontrol et.",
      partner: "her şeyi iki kere kontrol eden bir yol arkadaşı",
      opening: "Bist du fertig? Hast du alles eingepackt?",
      openingTr: "Hazır mısın? Her şeyi koydun mu?",
      goal: "Bavuldakiler karşılıklı sayılmış ve unutulan bir şey bulunmuş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-flughafen",
    icon: "plane",
    level: "A2",
    course: "de",
    title: "Am Flughafen",
    titleTr: "Havalimanında",
    summary: "Havalimanında ne yapılması gerektiğini anlatmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-müssen",
    vocab: [
      { de: "einchecken", tr: "check-in yapmak" },
      { de: "das Gate", tr: "kapı, biniş kapısı" },
      { de: "das Handgepäck", tr: "el bagajı" },
      { de: "der Abflug", tr: "kalkış" },
      { de: "landen", tr: "inmek" },
    ],
    patterns: [
      { de: "Wir müssen …", tr: "yapılması gerekeni söyler" },
      { de: "Das Gate schließt um …", tr: "kapının kaçta kapandığını söyler" },
      { de: "Ich habe nur Handgepäck.", tr: "yalnızca el bagajı olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün havalimanı dilini öğreneceğiz. Burada her şey bir zorunluluk zinciri: şunu yapmalısın, sonra şunu. Zorunluluk kalıbını biliyorsun, bugün onu yerinde kullanacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Havalimanı kelimelerinin çoğu uluslararası, yani tanıdık gelecek. Asıl iş cümleyi doğru kurmakta. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("einchecken"),
          tr("Türkçesi 'check-in yapmak' demek. Lütfen"),
          de("einchecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einchecken" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Gate"),
          tr("Türkçesi 'biniş kapısı' demek. Lütfen"),
          de("das Gate"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gate" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Handgepäck"),
          tr("Türkçesi 'el bagajı' demek. Lütfen"),
          de("das Handgepäck"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Handgepäck" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Abflug"),
          tr("Türkçesi 'kalkış' demek. Lütfen"),
          de("der Abflug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Abflug" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("landen"),
          tr("Türkçesi 'inmek' demek — uçağın inmesi. Lütfen"),
          de("landen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "landen" },
      },
      {
        say: [
          tr("Yolculuğun iki ucu iki fiil: kalkış check-in ile, varış şu cümleyle biter:"),
          de("Wir landen um acht Uhr."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız zorunluluğu anlatır:"),
          de("Wir müssen einchecken."),
          tr("'Check-in yapmalıyız' demek; asıl fiil sonda. Lütfen"),
          de("Wir müssen einchecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir müssen einchecken" },
      },
      {
        say: [tr("Sıra sende: 'Bir saat erken check-in yapmalıyız.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir müssen eine Stunde früher einchecken",
          hint: [
            tr("Zaman ortada kalır, asıl fiil en sonda:"),
            de("Wir müssen eine Stunde früher einchecken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız saat bildirir:"),
          de("Das Gate schließt um acht."),
          tr("'Kapı sekizde kapanıyor' demek. Lütfen"),
          de("Das Gate schließt um acht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das Gate schließt um acht" },
      },
      {
        say: [tr("Şimdi sen: 'Kalkış saat onda.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Abflug ist um zehn Uhr",
          hint: [
            tr("Saatlerle kullanılan edatı hatırla:"),
            de("Der Abflug ist um zehn Uhr."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız bagaj için:"),
          de("Ich habe nur Handgepäck."),
          tr("'Sadece el bagajım var' demek. Lütfen"),
          de("Ich habe nur Handgepäck"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe nur Handgepäck" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir müssen am Gate warten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir müssen am Gate warten.",
          answer: true,
          why: [
            tr("Doğru. Zorunluluk fiili ikinci sırada, asıl fiil çekilmeden cümlenin sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık havalimanında konuşabilirsin. Şimdi check-in bankosundasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Havalimanında check-in bankosundasın. Bagajın olup olmadığını söyle, kapının nerede ve kaçta kapandığını sor.",
      partner: "acelesi olan ama yardımcı olan bir havayolu görevlisi",
      opening: "Guten Tag! Haben Sie Gepäck zum Aufgeben?",
      openingTr: "İyi günler! Vermek istediğiniz bagajınız var mı?",
      goal: "Bagaj durumu bildirilmiş, kapı numarası ve kapanış saati öğrenilmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-wetterbericht",
    icon: "weather",
    level: "A2",
    course: "de",
    title: "Der Wetterbericht",
    titleTr: "Hava tahmini",
    summary: "Gelecek zamanla hava tahmini anlatmayı öğretir.",
    minutes: 9,
    focusId: "Futur-werden",
    vocab: [
      { de: "der Wetterbericht", tr: "hava tahmini" },
      { de: "regnen", tr: "yağmur yağmak" },
      { de: "das Gewitter", tr: "fırtına, gök gürültülü sağanak" },
      { de: "der Grad", tr: "derece" },
      { de: "bewölkt", tr: "bulutlu" },
    ],
    patterns: [
      { de: "Es wird regnen.", tr: "gelecekte olacak bir şeyi söyler" },
      { de: "Morgen wird es …", tr: "yarının havasını söyler" },
      { de: "bis zu dreißig Grad", tr: "sıcaklığın üst sınırını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün gelecek zamanı öğreneceğiz ve en doğal yeri hava tahmini. Türkçede gelecek tek ekle kurulur: yağacak. Almancada cümle ikiye bölünür. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural tanıdık gelecek: yardımcı fiil ikinci sıraya oturuyor, asıl fiil çekilmeden cümlenin sonuna gidiyor. Geçmiş zamandaki düzenin aynısı. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Wetterbericht"),
          tr("Türkçesi 'hava tahmini' demek. Lütfen"),
          de("der Wetterbericht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wetterbericht" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("regnen"),
          tr("Türkçesi 'yağmur yağmak' demek. Lütfen"),
          de("regnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "regnen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Gewitter"),
          tr("Türkçesi 'gök gürültülü sağanak' demek. Lütfen"),
          de("das Gewitter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gewitter" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Grad"),
          tr("Türkçesi 'derece' demek. Lütfen"),
          de("der Grad"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Grad" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("bewölkt"),
          tr("Türkçesi 'bulutlu' demek. Lütfen"),
          de("bewölkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bewölkt" },
      },
      {
        say: [
          tr("İlk örneğimiz:"),
          de("Morgen wird es regnen."),
          tr("'Yarın yağmur yağacak' demek. Yardımcı fiil ikinci sırada, asıl fiil en sonda. Lütfen"),
          de("Morgen wird es regnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Morgen wird es regnen" },
      },
      {
        say: [tr("Sıra sende: 'Yarın güneşli olacak.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Morgen wird es sonnig",
          hint: [
            tr("Zaman başta, yardımcı fiil hemen arkasında:"),
            de("Morgen wird es sonnig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci örnek:"),
          de("Es wird ein Gewitter geben."),
          tr("'Sağanak olacak' demek. Lütfen"),
          de("Es wird ein Gewitter geben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es wird ein Gewitter geben" },
      },
      {
        say: [tr("Şimdi sen: 'Yarın bulutlu olacak.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Morgen wird es bewölkt",
          hint: [
            tr("Kalıp aynı, sadece havayı anlatan kelime değişiyor:"),
            de("Morgen wird es bewölkt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sıcaklık için kalıbımız:"),
          de("Morgen wird es bis zu dreißig Grad warm."),
          tr("'Yarın otuz dereceye kadar çıkacak' demek. Lütfen"),
          de("Morgen wird es bis zu dreißig Grad warm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Morgen wird es bis zu dreißig Grad warm" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Morgen es wird regnen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Morgen es wird regnen.",
          answer: false,
          why: [
            tr("Zaman başta olduğu için yardımcı fiil ikinci sıraya geçmeli. Doğrusu"),
            de("Morgen wird es regnen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hava tahminini anlatabilirsin. Şimdi yol arkadaşınla yarının havasını konuşacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Tatildesin ve yol arkadaşınla yarının havasını konuşuyorsunuz. Tahmini anlat, sıcaklığı söyle ve buna göre ne yapacağınızı öner.",
      partner: "hava durumunu sürekli takip eden bir yol arkadaşı",
      opening: "Hast du den Wetterbericht gesehen? Wie wird das Wetter morgen?",
      openingTr: "Hava tahminine baktın mı? Yarın hava nasıl olacak?",
      goal: "Yarının havası ve sıcaklığı konuşulmuş, buna göre bir plan önerilmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-ausflug",
    icon: "mountain",
    level: "A2",
    course: "de",
    title: "Der Tagesausflug",
    titleTr: "Günübirlik gezi",
    summary: "Koşullu plan kurmayı öğretir: hava güzelse ne yaparız.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "der Ausflug", tr: "gezi" },
      { de: "die Wanderung", tr: "yürüyüş" },
      { de: "der Rucksack", tr: "sırt çantası" },
      { de: "der Gipfel", tr: "zirve" },
      { de: "sich lohnen", tr: "değmek" },
    ],
    patterns: [
      { de: "Wenn das Wetter gut ist, …", tr: "koşullu bir plan kurar" },
      { de: "Wir nehmen … mit.", tr: "yanınıza ne aldığınızı söyler" },
      { de: "Los geht's!", tr: "yola çıkma vaktini bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün koşullu plan kurmayı öğreneceğiz. Türkçede koşul ekle kurulur: hava güzelse. Almancada ayrı bir bağlaç geliyor ve o bağlaç fiili cümlenin sonuna atıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir de şu var: koşul cümlesi başta olduğunda tamamı birinci öğe sayılır, yani ana cümlenin fiili hemen arkasından gelir. Kulağa karışık geliyor ama örnekte hemen oturuyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Ausflug"),
          tr("Türkçesi 'gezi' demek — günübirlik. Lütfen"),
          de("der Ausflug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Ausflug" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Wanderung"),
          tr("Türkçesi 'yürüyüş' demek — doğada uzun yürüyüş. Lütfen"),
          de("die Wanderung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wanderung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Rucksack"),
          tr("Türkçesi 'sırt çantası' demek. Lütfen"),
          de("der Rucksack"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Rucksack" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Gipfel"),
          tr("Türkçesi 'zirve' demek. Lütfen"),
          de("der Gipfel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Gipfel" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich lohnen"),
          tr("Türkçesi 'değmek, buna değer olmak' demek. Lütfen"),
          de("sich lohnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich lohnen" },
      },
      {
        say: [
          tr("İlk örneğimiz:"),
          de("Wenn das Wetter gut ist, machen wir einen Ausflug."),
          tr("Koşul cümlesinde fiil sonda, ana cümlenin fiili ise hemen virgülden sonra. Lütfen"),
          de("Wenn das Wetter gut ist, machen wir einen Ausflug"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Wenn das Wetter gut ist, machen wir einen Ausflug",
        },
      },
      {
        say: [tr("Sıra sende: 'Hava güzelse yürüyüş yaparız.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wenn das Wetter gut ist, machen wir eine Wanderung",
          hint: [
            tr("Koşul cümlesinde fiil sonda, ana cümlede hemen virgülden sonra:"),
            de("Wenn das Wetter gut ist, machen wir eine Wanderung."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir nehmen den Rucksack mit."),
          tr("'Sırt çantasını yanımıza alıyoruz' demek. Lütfen"),
          de("Wir nehmen den Rucksack mit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir nehmen den Rucksack mit" },
      },
      {
        say: [tr("Şimdi sen: 'Yürüyüş buna değer.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Die Wanderung lohnt sich",
          hint: [
            tr("Dönüşlü zamir fiilin arkasına gelir:"),
            de("Die Wanderung lohnt sich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Nereye kadar gideceğini de söyleyebilirsin:"),
          de("Wir gehen bis zum Gipfel."),
          tr("Ve yola çıkarken söylenen söz:"),
          de("Los geht's!"),
          tr("'Hadi başlıyoruz' demek. Lütfen"),
          de("Los geht's"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Los geht's" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn es regnet, bleiben wir zu Hause."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn es regnet, bleiben wir zu Hause.",
          answer: true,
          why: [
            tr("Doğru. Koşul cümlesinde fiil sonda duruyor ve ana cümlenin fiili hemen virgülden sonra geliyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık koşullu plan kurabilirsin. Şimdi yol arkadaşınla yarınki geziyi planlayacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yol arkadaşınla yarınki günübirlik geziyi planlıyorsunuz. Hava iyi olursa ne yapacağınızı, kötü olursa ne yapacağınızı söyle ve yanınıza ne alacağınızı belirt.",
      partner: "her ihtimale hazırlıklı olmak isteyen bir yol arkadaşı",
      opening: "Was machen wir morgen, wenn das Wetter schlecht ist?",
      openingTr: "Yarın hava kötü olursa ne yapacağız?",
      goal: "Hava iyi ve kötü olursa ne yapılacağı kararlaşmış ve yanınıza ne alacağınız söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-camping",
    icon: "nature",
    level: "A2",
    course: "de",
    title: "Auf dem Campingplatz",
    titleTr: "Kampta",
    summary: "Kamp alanında neyin serbest, neyin yasak olduğunu sormayı öğretir.",
    minutes: 9,
    focusId: "Es-gibt",
    vocab: [
      { de: "zelten", tr: "kamp yapmak" },
      { de: "das Zelt", tr: "çadır" },
      { de: "der Schlafsack", tr: "uyku tulumu" },
      { de: "das Feuer", tr: "ateş" },
      { de: "die Dusche", tr: "duş" },
    ],
    patterns: [
      { de: "Wo dürfen wir zelten?", tr: "nerede kamp yapılabileceğini sorar" },
      { de: "Es gibt …", tr: "orada neyin bulunduğunu söyler" },
      { de: "… ist verboten.", tr: "bir şeyin yasak olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kamp alanında konuşmayı öğreneceğiz. İki şeye ihtiyacın olacak: neyin nerede olduğunu sormak ve neyin yasak olduğunu anlamak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kamp alanlarında kurallar tabelalarda yazar ve hep aynı kelimeyle biter. Onu tanıyınca tabelaların yarısını okuyabiliyorsun. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("zelten"),
          tr("Türkçesi 'kamp yapmak, çadır kurmak' demek. Lütfen"),
          de("zelten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zelten" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Zelt"),
          tr("Türkçesi 'çadır' demek. Lütfen"),
          de("das Zelt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Zelt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Schlafsack"),
          tr("Türkçesi 'uyku tulumu' demek. Lütfen"),
          de("der Schlafsack"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schlafsack" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Feuer"),
          tr("Türkçesi 'ateş' demek. Lütfen"),
          de("das Feuer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Feuer" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Dusche"),
          tr("Türkçesi 'duş' demek. Lütfen"),
          de("die Dusche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Dusche" },
      },
      {
        say: [
          tr("İlk kalıbımız bir izin sorusu:"),
          de("Wo dürfen wir zelten?"),
          tr("'Nerede kamp yapabiliriz?' demek. Lütfen"),
          de("Wo dürfen wir zelten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wo dürfen wir zelten" },
      },
      {
        say: [tr("Sıra sende: 'Burada kamp yapabilir miyiz?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Dürfen wir hier zelten",
          hint: [
            tr("Soruda izin fiili başa geçer, asıl fiil sonda kalır:"),
            de("Dürfen wir hier zelten?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız neyin bulunduğunu söyler:"),
          de("Es gibt hier Duschen."),
          tr("'Burada duşlar var' demek. Lütfen"),
          de("Es gibt hier Duschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es gibt hier Duschen" },
      },
      {
        say: [tr("Şimdi sen: 'Uyku tulumumu yanıma aldım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe den Schlafsack mitgenommen",
          hint: [
            tr("Geçmiş biçim cümlenin en sonunda kalır:"),
            de("Ich habe den Schlafsack mitgenommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız tabelalarda yazan kelime:"),
          de("Feuer machen ist verboten."),
          tr("'Ateş yakmak yasaktır' demek. Lütfen"),
          de("Feuer machen ist verboten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Feuer machen ist verboten" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es gibt hier Duschen nicht."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es gibt hier Duschen nicht.",
          answer: false,
          why: [
            tr("Artikelsiz bir ismi olumsuzlarken ayrı bir olumsuzluk kelimesi kullanılır. Doğrusu"),
            de("Es gibt hier keine Duschen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kamp alanında konuşabilirsin. Şimdi kamp alanına vardın ve görevliyle konuşuyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kamp alanına vardın ve görevliyle konuşuyorsun. Nerede çadır kurabileceğini sor, alanda neler olduğunu öğren ve neyin yasak olduğunu anla.",
      partner: "kuralları net anlatan, dost canlısı bir kamp görevlisi",
      opening: "Grüß Sie! Möchten Sie hier zelten?",
      openingTr: "Merhaba! Burada kamp mı yapacaksınız?",
      goal: "Çadırın nereye kurulacağı, alanda neler olduğu ve neyin yasak olduğu öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-stadtfuehrung",
    icon: "culture",
    level: "A2",
    course: "de",
    title: "Die Stadtführung",
    titleTr: "Şehir turu",
    summary: "Bir yerin geçmişini anlatmayı ve izlenimini söylemeyi öğretir.",
    minutes: 9,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "die Führung", tr: "rehberli tur" },
      { de: "die Kirche", tr: "kilise" },
      { de: "das Jahrhundert", tr: "yüzyıl" },
      { de: "der Turm", tr: "kule" },
      { de: "beeindruckend", tr: "etkileyici" },
    ],
    patterns: [
      { de: "Das war früher …", tr: "bir yerin eskiden ne olduğunu söyler" },
      { de: "… ist … Jahre alt.", tr: "bir yapının yaşını söyler" },
      { de: "Das ist beeindruckend.", tr: "izlenimini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün şehir turunda konuşmayı öğreneceğiz: bir yerin eskiden ne olduğunu anlatmak ve gördüğün şey hakkında bir şey söylemek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Rehber anlatırken geçmişi hep tek kelimelik biçimle söyler; sen de aynısını kullanacaksın. Bir de izlenimini söyleyecek bir kelime lazım, yoksa sadece dinleyen olursun. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Führung"),
          tr("Türkçesi 'rehberli tur' demek. Lütfen"),
          de("die Führung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Führung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Kirche"),
          tr("Türkçesi 'kilise' demek. Lütfen"),
          de("die Kirche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kirche" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Jahrhundert"),
          tr("Türkçesi 'yüzyıl' demek. Lütfen"),
          de("das Jahrhundert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Jahrhundert" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Turm"),
          tr("Türkçesi 'kule' demek. Lütfen"),
          de("der Turm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Turm" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("beeindruckend"),
          tr("Türkçesi 'etkileyici' demek. Lütfen"),
          de("beeindruckend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beeindruckend" },
      },
      {
        say: [
          tr("İlk kalıbımız geçmişi anlatır:"),
          de("Das war früher ein Markt."),
          tr("'Burası eskiden bir pazardı' demek. Lütfen"),
          de("Das war früher ein Markt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das war früher ein Markt" },
      },
      {
        say: [tr("Sıra sende: 'Burası eskiden bir okuldu.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Das war früher eine Schule",
          hint: [
            tr("Geçmiş tek kelimeyle söyleniyor, cümle ikiye bölünmüyor:"),
            de("Das war früher eine Schule."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yaş bildirir:"),
          de("Die Kirche ist dreihundert Jahre alt."),
          tr("Lütfen"),
          de("Die Kirche ist dreihundert Jahre alt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Kirche ist dreihundert Jahre alt" },
      },
      {
        say: [tr("Şimdi sen: 'Kule çok yüksek.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Turm ist sehr hoch",
          hint: [
            tr("Önce yapının adı, sonra fiil, sonra özelliği:"),
            de("Der Turm ist sehr hoch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız izlenimini söyler:"),
          de("Das ist wirklich beeindruckend."),
          tr("'Bu gerçekten etkileyici' demek. Lütfen"),
          de("Das ist wirklich beeindruckend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das ist wirklich beeindruckend" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Kirche ist aus dem fünfzehnten Jahrhundert."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Kirche ist aus dem fünfzehnten Jahrhundert.",
          answer: true,
          why: [
            tr("Doğru. Yüzyıl söylenirken sıra sayısı kullanılır ve kelime bu edattan sonra hâl değiştirir."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık şehir turunda konuşabilirsin. Şimdi rehberle birlikte meydandasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir şehir turundasın ve rehber sana meydanı anlatıyor. Soru sor, buranın eskiden ne olduğunu öğren ve gördüklerin hakkında izlenimini söyle.",
      partner: "şehrini çok seven, ayrıntı anlatmayı seven bir rehber",
      opening: "Hier stehen wir auf dem ältesten Platz der Stadt. Wissen Sie, was das früher war?",
      openingTr: "Şu an şehrin en eski meydanındayız. Burasının eskiden ne olduğunu biliyor musunuz?",
      goal: "Meydanın eskiden ne olduğu öğrenilmiş ve senin izlenimin söylenmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-souvenirs",
    icon: "gift",
    level: "A2",
    course: "de",
    title: "Souvenirs kaufen",
    titleTr: "Hediyelik",
    summary: "Kime ne aldığını söylemeyi öğretir; yönelme hâlini çalıştırır.",
    minutes: 9,
    focusId: "Dativ",
    vocab: [
      { de: "das Souvenir", tr: "hediyelik eşya" },
      { de: "typisch", tr: "yöreye özgü" },
      { de: "die Postkarte", tr: "kartpostal" },
      { de: "aussuchen", tr: "seçmek" },
      { de: "das Andenken", tr: "hatıra" },
    ],
    patterns: [
      { de: "Ich bringe meiner Mutter … mit.", tr: "kime ne getirdiğini söyler" },
      { de: "Ich suche etwas Typisches.", tr: "yöreye özgü bir şey aradığını söyler" },
      { de: "Das freut sie bestimmt.", tr: "karşıdakinin seveceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün hediyelik almayı öğreneceğiz. Burada önemli bir dilbilgisi var: bir şeyi birine getirdiğini söylerken o kişinin adı hâl değiştiriyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'anneme' derken tek ek yeter. Almancada ise kişiyi gösteren kelimenin artikeli değişiyor ve bu, en sık atlanan yerlerden biri. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Souvenir"),
          tr("Türkçesi 'hediyelik eşya' demek. Lütfen"),
          de("das Souvenir"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Souvenir" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("typisch"),
          tr("Türkçesi 'yöreye özgü, tipik' demek. Lütfen"),
          de("typisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "typisch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Postkarte"),
          tr("Türkçesi 'kartpostal' demek. Lütfen"),
          de("die Postkarte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Postkarte" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("aussuchen"),
          tr("Türkçesi 'seçmek' demek. Lütfen"),
          de("aussuchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aussuchen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Andenken"),
          tr("Türkçesi 'hatıra' demek. Lütfen"),
          de("das Andenken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Andenken" },
      },
      {
        say: [
          tr(
            "Şimdi kural. Bir şeyi birine verirken iki nesne oluyor: verilen şey ve verilen kişi. Kişiyi gösteren kelime yönelme hâline giriyor ve artikeli değişiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Anneme bir şey getiriyorum.' Almancası:"),
          de("Ich bringe meiner Mutter etwas mit."),
          tr("Lütfen"),
          de("Ich bringe meiner Mutter etwas mit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bringe meiner Mutter etwas mit" },
      },
      {
        say: [tr("Sıra sende: 'Arkadaşıma bir kartpostal getiriyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bringe meiner Freundin eine Postkarte mit",
          hint: [
            tr("Kişiyi gösteren kelime hâl değiştirir, getirilen şey değişmez:"),
            de("Ich bringe meiner Freundin eine Postkarte mit."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız dükkânda işini görür:"),
          de("Ich suche etwas Typisches."),
          tr("'Yöreye özgü bir şey arıyorum' demek. Lütfen"),
          de("Ich suche etwas Typisches"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich suche etwas Typisches" },
      },
      {
        say: [tr("Şimdi sen: 'Buna kesin sevinir.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Das freut sie bestimmt",
          hint: [
            tr("Sevinen kişi burada nesne gibi görünür, sevindiren şey öznedir:"),
            de("Das freut sie bestimmt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Ich habe ein schönes Andenken ausgesucht."),
          tr("'Güzel bir hatıra seçtim' demek. Lütfen"),
          de("Ich habe ein schönes Andenken ausgesucht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe ein schönes Andenken ausgesucht" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich bringe meine Mutter etwas mit."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich bringe meine Mutter etwas mit.",
          answer: false,
          why: [
            tr("Bir şeyi getirdiğin kişi yönelme hâline girmeli. Doğrusu"),
            de("Ich bringe meiner Mutter etwas mit."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hediyelik alabilirsin. Şimdi bir hediyelik dükkânındasın ve satıcıyla konuşacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir hediyelik dükkânındasın. Kime hediye aldığını söyle, yöreye özgü bir şey iste ve seçtiğin şeyin neden uygun olduğunu anlat.",
      partner: "yöresini iyi bilen, öneri yapmayı seven bir satıcı",
      opening: "Suchen Sie ein Geschenk für jemanden?",
      openingTr: "Birine hediye mi bakıyorsunuz?",
      goal: "Kime alınacağı konuşulmuş, yöresel bir şey seçilmiş ve neden uygun olduğu söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-reise-problem",
    icon: "train",
    level: "A2",
    course: "de",
    title: "Der Flug ist gestrichen",
    titleTr: "Seyahat aksiliği",
    summary: "Seyahatte çıkan bir aksiliği bildirmeyi ve yardım istemeyi öğretir.",
    minutes: 9,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "streichen", tr: "iptal etmek" },
      { de: "der Anschluss", tr: "aktarma, bağlantı" },
      { de: "verpassen", tr: "kaçırmak" },
      { de: "die Verspätung", tr: "rötar" },
      { de: "umbuchen", tr: "değişiklik yaptırmak" },
    ],
    patterns: [
      { de: "Der Flug ist gestrichen.", tr: "uçuşun iptal olduğunu söyler" },
      { de: "Wir haben … verpasst.", tr: "bir şeyi kaçırdığınızı söyler" },
      { de: "Wer hilft uns?", tr: "yardım arar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bu modülün son dersi. Bugün seyahatte işler ters gittiğinde ne diyeceğini öğreneceğiz — en çok işine yarayacak ders belki de bu. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Böyle bir anda iki şey lazım: durumu net anlatmak ve yardım istemek. Panikle uzun cümle kurmaya çalışmak yerine kısa kalıplar kullanacaksın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("streichen"),
          tr("Türkçesi 'iptal etmek' demek — uçuş ve sefer için kullanılır. Lütfen"),
          de("streichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "streichen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Anschluss"),
          tr("Türkçesi 'aktarma, bağlantı' demek. Lütfen"),
          de("der Anschluss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anschluss" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("verpassen"),
          tr("Türkçesi 'kaçırmak' demek. Lütfen"),
          de("verpassen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verpassen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Verspätung"),
          tr("Türkçesi 'rötar, gecikme' demek. Lütfen"),
          de("die Verspätung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Verspätung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("umbuchen"),
          tr("Türkçesi 'bileti değiştirmek' demek. Lütfen"),
          de("umbuchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umbuchen" },
      },
      {
        say: [
          tr("İlk kalıbımız durumu bildirir:"),
          de("Der Flug ist gestrichen."),
          tr("'Uçuş iptal edildi' demek. Lütfen"),
          de("Der Flug ist gestrichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Flug ist gestrichen" },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir haben den Anschluss verpasst."),
          tr("'Aktarmayı kaçırdık' demek. Lütfen"),
          de("Wir haben den Anschluss verpasst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir haben den Anschluss verpasst" },
      },
      {
        say: [tr("Sıra sende: 'Treni kaçırdık.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben den Zug verpasst",
          hint: [
            tr("Geçmiş biçim cümlenin en sonunda kalır:"),
            de("Wir haben den Zug verpasst."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [tr("Şimdi sen sor: 'Uçuşu değiştirebilir miyiz?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Können wir den Flug umbuchen",
          hint: [
            tr("Soruda çekimli fiil başta, asıl fiil çekilmeden sonda:"),
            de("Können wir den Flug umbuchen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız yardım arar:"),
          de("Wer hilft uns?"),
          tr("'Bize kim yardım edebilir?' demek. Lütfen"),
          de("Wer hilft uns"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wer hilft uns" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Zug hat eine Stunde Verspätung."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Zug hat eine Stunde Verspätung.",
          answer: true,
          why: [
            tr("Doğru. Rötar Almancada 'sahip olmak' fiiliyle söylenir; Türkçedeki 'treni bir saat rötarlı' ile aynı işi görür."),
          ],
        },
      },
      {
        say: [
          tr(
            "Modülü bitirdin. Şimdi havalimanı danışmasındasın: uçuşun iptal oldu ve bir çözüm arıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Uçuşun iptal oldu ve havalimanı danışmasındasın. Durumu anlat, aktarmayı kaçırdığını söyle ve bileti değiştirip değiştiremeyeceğini sor.",
      partner: "yoğun bir günde çözüm bulmaya çalışan bir havalimanı görevlisi",
      opening: "Ihr Flug wurde leider gestrichen. Wie kann ich Ihnen helfen?",
      openingTr: "Uçuşunuz maalesef iptal edildi. Size nasıl yardımcı olabilirim?",
      goal: "Durum anlatılmış, kaçırılan aktarma bildirilmiş ve biletin değişip değişmeyeceği netleşmiş olur.",
      minTurns: 8,
    },
  },
];

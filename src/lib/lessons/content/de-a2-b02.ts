import { de, tr, type Lesson } from "../types";

/**
 * A2 · Modül 2 — Benim hikâyem (011–020).
 *
 * Modül 1 Perfekt'i derinleştirdi. Bu modülün işi, geçmişi **anlatılabilir**
 * hâle getirmek: bir hayat hikâyesi tek tek olaylardan ibaret değil, olayların
 * arasında istekler, zorunluluklar ve yasaklar var.
 *
 * Üç yeni şey öğretiliyor ve üçü de Türkçe konuşan için ayrı bir zorluk:
 * kip fiillerinin kısa geçmişi, dönüşlü fiiller ve süre ile zaman noktasının
 * ayrımı.
 *
 * Sözlükçe havuzun A2 katmanından geliyor ve dilbilgisini TAŞIMIYOR — burada
 * dilbilgisi kalıplarda duruyor. 012 ve 013'ün öğrettiği kip geçmişleri
 * (wollte, konnte, musste, durfte) madde başı değil, fiilin çekimidir; havuza
 * girmezler ve sözlükçeye de girmezler. Ders onları kalıp olarak öğretiyor,
 * sözlükçe ise o kalıbın içinin doldurulacağı kelimeleri veriyor.
 */
export const deA2B02: Lesson[] = [
  {
    id: "de-a2-lebensweg",
    icon: "culture",
    level: "A2",
    course: "de",
    title: "Mein Weg nach Deutschland",
    titleTr: "Göç hikâyesi",
    summary: "Bir hayat hikâyesini sırayla anlatmayı öğretir: kaç yaşındaydın, sonra ne oldu.",
    minutes: 10,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "die Hauptstadt", tr: "başkent" },
      { de: "die Kultur", tr: "kültür" },
      { de: "die Landschaft", tr: "manzara" },
      { de: "vertraut", tr: "tanıdık" },
      { de: "auskommen", tr: "geçinmek" },
      { de: "sich ausdrücken", tr: "kendini ifade etmek" },
      { de: "die Kenntnisse", tr: "bilgi birikimi" },
      { de: "die Übersetzung", tr: "çeviri" },
    ],
    patterns: [
      { de: "Am Anfang war alles fremd.", tr: "gelişin ilk günlerini anlatır" },
      { de: "Ich hatte keine …", tr: "başlangıçta neyin eksik olduğunu söyler" },
      { de: "Heute komme ich gut aus.", tr: "bugünkü durumu özetler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kendi hikâyeni anlatıyorsun: nereden geldin, başta nasıldı, şimdi nasıl. Bu hikâye Almanya'da sana çok kez sorulacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir hayat hikâyesinde iki zaman iç içe geçer: geçmişte nasıl olduğu ve bugün nasıl olduğu. Geçmiş için olmak ve sahip olmak fiillerinin kısa biçimlerini kullanacağız; bugün için ise düz şimdiki zamanı. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Hauptstadt"),
          tr("Türkçesi 'başkent' demek. Lütfen"),
          de("die Hauptstadt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Hauptstadt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Kultur"),
          tr("Türkçesi 'kültür' demek. Lütfen"),
          de("die Kultur"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kultur" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Landschaft"),
          tr("Türkçesi 'manzara, doğal çevre' demek. Lütfen"),
          de("die Landschaft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Landschaft" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("vertraut"),
          tr("Türkçesi 'tanıdık, alışılmış' demek. Lütfen"),
          de("vertraut"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vertraut" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("auskommen"),
          tr("Türkçesi 'geçinmek, iyi anlaşmak' demek. Lütfen"),
          de("auskommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auskommen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("sich ausdrücken"),
          tr("Türkçesi 'kendini ifade etmek' demek. Lütfen"),
          de("sich ausdrücken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich ausdrücken" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Kenntnisse"),
          tr("Türkçesi 'bilgi birikimi' demek; hep çoğul kullanılır. Lütfen"),
          de("die Kenntnisse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kenntnisse" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Übersetzung"),
          tr("Türkçesi 'çeviri' demek. Lütfen"),
          de("die Übersetzung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Übersetzung" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Am Anfang war alles fremd."),
          tr("Gelişin ilk günlerini tek cümlede anlatır. Olmak fiilinin kısa geçmişi."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Başta manzara bile bana yabancıydı.' Almancası:"),
          de("Am Anfang war sogar die Landschaft fremd."),
          tr("Lütfen"),
          de("Am Anfang war sogar die Landschaft fremd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Anfang war sogar die Landschaft fremd" },
      },
      {
        say: [tr("Sıra sende: 'Bugün her şey tanıdık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Heute ist alles vertraut",
          hint: [
            tr("Bugün için olmak fiilinin şimdiki biçimi kullanılır:"),
            de("Heute ist alles vertraut."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich hatte keine …"),
          tr(
            "Başlangıçta neyin eksik olduğunu söyler. Sahip olmak fiilinin kısa geçmişi artı olumsuzluk.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Hiç dil bilgim yoktu.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich hatte keine Deutschkenntnisse",
          hint: [
            tr("Çoğul bir isim olduğu için olumsuzluk kelimesi çoğul biçimini alır:"),
            de("Ich hatte keine Deutschkenntnisse."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız bugünü özetliyor:"),
          de("Heute komme ich gut aus."),
          tr("Ayrılabilen bir fiil; şimdiki zamanda ön ek cümlenin sonuna düşüyor."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Am Anfang hatte ich keine Kenntnisse."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Am Anfang hatte ich keine Kenntnisse.",
          answer: true,
          why: [
            tr(
              "Zaman ifadesi başta, fiil ikinci sırada, özne arkada; çoğul isimde olumsuzluk kelimesi de çoğul biçiminde. Cümle doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana buraya nasıl geldiğini soruyor. Hikâyeni anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Dil kursunda yeni tanıştığın biri sana buraya nasıl geldiğini soruyor. Nereden geldiğini, başta neyin zor olduğunu ve bugün nasıl olduğunu anlat.",
      partner: "kursta yeni tanıştığın, kendisi de yeni gelmiş biri",
      opening: "Und du? Wie lange bist du schon hier?",
      openingTr: "Ya sen? Ne zamandır buradasın?",
      goal: "Geliş, başlangıçtaki zorluk ve bugünkü durum sırayla anlatılmış ve karşındaki de kendi hikâyesinden söz etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-wollte-konnte",
    icon: "plane",
    level: "A2",
    course: "de",
    title: "Ich wollte Pilot werden",
    titleTr: "Çocukluk hayalleri",
    summary: "Geçmişteki isteği, yapamamayı ve zorunluluğu anlatmayı öğretir.",
    minutes: 10,
    focusId: "Präteritum-Modal",
    vocab: [
      { de: "der Traum", tr: "rüya, hayal" },
      { de: "träumen", tr: "rüya görmek" },
      { de: "der Pilot", tr: "pilot" },
      { de: "der Tierarzt", tr: "veteriner" },
      { de: "der Feuerwehrmann", tr: "itfaiyeci" },
      { de: "berühmt", tr: "ünlü" },
      { de: "begabt", tr: "kabiliyetli" },
      { de: "der Wunsch", tr: "dilek" },
    ],
    patterns: [
      { de: "Ich wollte … werden.", tr: "çocukken ne olmak istediğini anlatır" },
      { de: "Ich konnte nicht …", tr: "geçmişte yapamadığın şeyi anlatır" },
      { de: "Ich musste …", tr: "geçmişteki zorunluluğu anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün çocukken ne olmak istediğini anlatıyoruz. Bunun için kip fiillerinin geçmiş biçimini öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kip fiilleri geçmişte Perfekt'e girmez; olmak ve sahip olmak gibi kendi kısa biçimlerini kullanır. İstemek, yapabilmek ve zorunda olmak fiillerinin geçmişleri şöyle:",
          ),
          de("wollte, konnte, musste"),
          tr("Bunlar madde başı değil, fiillerin çekimidir; ezberlenir. Önce sekiz kelime."),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Traum"),
          tr("Türkçesi 'rüya' demek, ama 'hayal' anlamında da kullanılır. Lütfen"),
          de("der Traum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Traum" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("träumen"),
          tr("Türkçesi 'rüya görmek, hayal kurmak' demek. Lütfen"),
          de("träumen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "träumen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Pilot"),
          tr("Türkçesi 'pilot' demek. Lütfen"),
          de("der Pilot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Pilot" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Tierarzt"),
          tr("Türkçesi 'veteriner' demek. Lütfen"),
          de("der Tierarzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tierarzt" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Feuerwehrmann"),
          tr("Türkçesi 'itfaiyeci' demek. Lütfen"),
          de("der Feuerwehrmann"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Feuerwehrmann" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("berühmt"),
          tr("Türkçesi 'ünlü' demek. Lütfen"),
          de("berühmt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "berühmt" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("begabt"),
          tr("Türkçesi 'kabiliyetli, yetenekli' demek. Lütfen"),
          de("begabt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "begabt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Wunsch"),
          tr("Türkçesi 'dilek, istek' demek. Lütfen"),
          de("der Wunsch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wunsch" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich wollte … werden."),
          tr(
            "Bir meslek söylenirken artikel kullanılmaz. Türkçedeki 'pilot olmak istiyordum' ile aynı: 'bir pilot' demeyiz.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Pilot olmak istiyordum.' Almancası:"),
          de("Ich wollte Pilot werden."),
          tr("Lütfen"),
          de("Ich wollte Pilot werden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wollte Pilot werden" },
      },
      {
        say: [tr("Sıra sende: 'Veteriner olmak istiyordum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich wollte Tierarzt werden",
          hint: [
            tr("Meslek adının önüne artikel gelmez ve asıl fiil sona gider:"),
            de("Ich wollte Tierarzt werden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich konnte nicht …"),
          tr("Geçmişte yapamadığın şeyi anlatır. Olumsuzluk kelimesi asıl fiilin hemen önünde."),
        ],
      },
      {
        say: [
          tr("Üçüncü kalıbımız:"),
          de("Ich musste …"),
          tr("Geçmişteki zorunluluğu anlatır; hayalin neden gerçekleşmediğini söylemenin yolu."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Çalışmak zorundaydım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich musste arbeiten",
          hint: [
            tr("Zorunluluk fiilinin kısa geçmişi ikinci sırada, asıl fiil sonda:"),
            de("Ich musste arbeiten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe Pilot werden gewollt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe Pilot werden gewollt.",
          answer: false,
          why: [
            tr("Kip fiilleri geçmişte Perfekt kurmaz, kısa biçimlerini kullanır. Doğrusu:"),
            de("Ich wollte Pilot werden."),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana çocukken ne olmak istediğini soruyor. Anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla çocukluk hayallerinizi konuşuyorsunuz. Ne olmak istediğini, neden olamadığını ve bunun yerine ne yapmak zorunda kaldığını anlat.",
      partner: "kendi çocukluk hayalini de anlatmak isteyen bir arkadaş",
      opening: "Sag mal, was wolltest du als Kind werden?",
      openingTr: "Söylesene, çocukken ne olmak istiyordun?",
      goal: "Çocukluk hayali, gerçekleşmeme sebebi ve bugünkü durum anlatılmış; arkadaşın da kendi hayalini söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-schulzeit",
    icon: "school",
    level: "A2",
    course: "de",
    title: "Meine Schulzeit",
    titleTr: "Okul yılları",
    summary: "Okulda nelerin zorunlu, nelerin yasak olduğunu geçmiş zamanla anlatmayı öğretir.",
    minutes: 10,
    focusId: "Präteritum-Modal",
    vocab: [
      { de: "das Zeugnis", tr: "karne" },
      { de: "das Gymnasium", tr: "lise" },
      { de: "der Mitschüler", tr: "sınıf arkadaşı" },
      { de: "der Klassenlehrer", tr: "sınıf öğretmeni" },
      { de: "das Schulfach", tr: "okul dersi" },
      { de: "streng", tr: "katı" },
      { de: "fleißig", tr: "çalışkan" },
      { de: "auswendig", tr: "ezbere" },
    ],
    patterns: [
      { de: "Wir durften nicht …", tr: "okulda neyin yasak olduğunu anlatır" },
      { de: "Wir mussten … lernen.", tr: "okulda neyin zorunlu olduğunu anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün okul yıllarını anlatıyoruz: neye izin vardı, ne yasaktı, ne zorunluydu. Kip fiillerinin geçmişini bir kez daha, ama bu kez izin ve yasakla çalışacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr("Geçen ders üç kip geçmişi gördün. Bugün dördüncüsü geliyor: izin fiilinin geçmişi."),
          de("durfte"),
          tr(
            "Olumsuzla birlikte kullanıldığında 'yasaktı' anlamına gelir; bu, okul anlatırken en çok gereken kalıp. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Zeugnis"),
          tr("Türkçesi 'karne' demek. Lütfen"),
          de("das Zeugnis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Zeugnis" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Gymnasium"),
          tr("Türkçesi 'lise' demek; üniversiteye hazırlayan okul türü. Lütfen"),
          de("das Gymnasium"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gymnasium" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Mitschüler"),
          tr("Türkçesi 'sınıf arkadaşı' demek. Lütfen"),
          de("der Mitschüler"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mitschüler" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Klassenlehrer"),
          tr("Türkçesi 'sınıf öğretmeni' demek. Lütfen"),
          de("der Klassenlehrer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Klassenlehrer" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Schulfach"),
          tr("Türkçesi 'okul dersi' demek; matematik, müzik gibi. Lütfen"),
          de("das Schulfach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Schulfach" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("streng"),
          tr("Türkçesi 'katı, sıkı' demek. Lütfen"),
          de("streng"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "streng" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("fleißig"),
          tr("Türkçesi 'çalışkan' demek. Lütfen"),
          de("fleißig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fleißig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("auswendig"),
          tr("Türkçesi 'ezbere' demek. Lütfen"),
          de("auswendig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auswendig" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wir durften nicht …"),
          tr(
            "Yasağı anlatır. Dikkat: izin fiilinin olumsuzu 'gerek yoktu' değil, 'yasaktı' demektir. Zorunluluk fiilinin olumsuzuyla karıştırılmamalı.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Derste konuşmamız yasaktı.' Almancası:"),
          de("Im Unterricht durften wir nicht sprechen."),
          tr("Lütfen"),
          de("Im Unterricht durften wir nicht sprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Im Unterricht durften wir nicht sprechen" },
      },
      {
        say: [tr("Sıra sende: 'Sınıf öğretmenimiz çok katıydı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Unser Klassenlehrer war sehr streng",
          hint: [
            tr("Olmak fiilinin kısa geçmişi ikinci sırada:"),
            de("Unser Klassenlehrer war sehr streng."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir mussten … lernen."),
          tr("Zorunluluğu anlatır. Asıl fiil yine cümlenin sonunda."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Her şeyi ezbere öğrenmek zorundaydık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir mussten alles auswendig lernen",
          hint: [
            tr("Zorunluluk fiilinin kısa geçmişi ikinci sırada, asıl fiil sonda:"),
            de("Wir mussten alles auswendig lernen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir durften nicht rauchen, aber wir mussten rauchen."),
          tr("cümlesi anlamlı mı, anlamsız mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir durften nicht rauchen, aber wir mussten rauchen.",
          answer: false,
          why: [
            tr(
              "Dilbilgisi doğru ama anlam kendi kendisiyle çelişiyor: birinci yarı yasak, ikinci yarı zorunluluk söylüyor. İzin fiilinin olumsuzu 'yasaktı' demektir.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana okul yıllarını soruyor. Neyin yasak, neyin zorunlu olduğunu anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla okul yıllarınızı karşılaştırıyorsunuz. Okulunda neyin yasak, neyin zorunlu olduğunu ve öğretmenlerinin nasıl olduğunu anlat.",
      partner: "kendi okulunu çok farklı hatırlayan bir arkadaş",
      opening: "War deine Schule eigentlich streng?",
      openingTr: "Senin okulun katı mıydı?",
      goal: "En az bir yasak ve bir zorunluluk anlatılmış, iki okul karşılaştırılmış ve hangisinin daha katı olduğuna karar verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-umzug-geschichte",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Der große Umzug",
    titleTr: "Taşınma hikâyesi",
    summary: "Bir taşınmayı baştan sona anlatmayı ve başlangıçtaki zorluğu söylemeyi öğretir.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "die Garage", tr: "garaj" },
      { de: "einziehen", tr: "yeni eve taşınmak" },
      { de: "auspacken", tr: "paketten çıkarmak" },
      { de: "der Kofferraum", tr: "araba bagajı" },
      { de: "leer", tr: "boş" },
      { de: "das Stockwerk", tr: "kat" },
      { de: "schleppen", tr: "sürükleyerek taşımak" },
      { de: "die Wohnungssuche", tr: "ev arayışı" },
    ],
    patterns: [
      { de: "Wir sind … eingezogen.", tr: "yeni eve ne zaman taşındığını anlatır" },
      { de: "Ich habe … ausgepackt.", tr: "taşınmadan sonra ne yaptığını anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir taşınmayı anlatıyoruz. Almanya'da çok sık taşınılır ve bu hikâye her sohbette işe yarar. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Taşınma hikâyesinde iki tür fiil bir arada durur: yer değiştirenler birinci yardımcı fiili, geri kalanlar ikinciyi alır. Bugünkü iki ayrılabilen fiil tam da bu ayrımı gösteriyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Garage"),
          tr("Türkçesi 'garaj' demek. Lütfen"),
          de("die Garage"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Garage" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("einziehen"),
          tr("Türkçesi 'yeni eve taşınmak, girmek' demek. Lütfen"),
          de("einziehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einziehen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("auspacken"),
          tr("Türkçesi 'paketten çıkarmak' demek. Lütfen"),
          de("auspacken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auspacken" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Kofferraum"),
          tr("Türkçesi 'araba bagajı' demek. Lütfen"),
          de("der Kofferraum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kofferraum" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("leer"),
          tr("Türkçesi 'boş' demek. Lütfen"),
          de("leer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leer" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Stockwerk"),
          tr("Türkçesi 'kat' demek; binadaki kat. Lütfen"),
          de("das Stockwerk"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Stockwerk" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("schleppen"),
          tr("Türkçesi 'sürükleyerek taşımak' demek; ağır bir şeyi zorla taşımak. Lütfen"),
          de("schleppen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schleppen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Wohnungssuche"),
          tr("Türkçesi 'ev arayışı' demek. Lütfen"),
          de("die Wohnungssuche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wohnungssuche" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wir sind … eingezogen."),
          tr(
            "Bu fiil bir yerden bir yere geçmeyi anlatıyor, o yüzden birinci yardımcı fiili alıyor. Ayrılabilen bir fiil, ortacı ortadan açılıyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Mayısta yeni eve taşındık.' Almancası:"),
          de("Im Mai sind wir eingezogen."),
          tr("Lütfen"),
          de("Im Mai sind wir eingezogen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Im Mai sind wir eingezogen" },
      },
      {
        say: [tr("Sıra sende: 'Kutuları garaja taşıdım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe die Kisten in die Garage geschleppt",
          hint: [
            tr("Yön bildiren bir edat belirtme hâlini getirir ve ortaç sona gider:"),
            de("Ich habe die Kisten in die Garage geschleppt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich habe … ausgepackt."),
          tr(
            "Bu fiil yer değiştirmiyor, o yüzden ikinci yardımcı fiili alıyor. Ön ek aynı, yardımcı fiil farklı.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bütün kutuları açtım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe alle Kartons ausgepackt",
          hint: [
            de("auspacken"),
            tr("yer değiştirmeyen bir fiil, ikinci yardımcı fiili alır:"),
            de("Ich habe alle Kartons ausgepackt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir sind im Mai in die neue Wohnung eingezogen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir sind im Mai in die neue Wohnung eingezogen.",
          answer: true,
          why: [
            de("einziehen"),
            tr("yer değiştiren bir fiil: yardımcı fiil doğru ve ortaç ortadan açılmış."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir arkadaşın taşınmanı soruyor. Baştan sona anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Yeni evine taşındın ve bir arkadaşın seni arıyor. Ev arayışını, taşınma gününü ve yeni evi anlat.",
      partner: "yeni evini merak eden bir arkadaş",
      opening: "Und? Wie war der Umzug?",
      openingTr: "Ee? Taşınma nasıl geçti?",
      goal: "Ev arayışı, taşınma günü ve yeni evin durumu anlatılmış ve arkadaşın gelip görmeye davet edilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-kennenlernen",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Wie habt ihr euch kennengelernt?",
    titleTr: "Tanışma hikâyesi",
    summary: "Dönüşlü fiillerle tanışma ve ilişki hikâyesi anlatmayı öğretir.",
    minutes: 10,
    focusId: "Reflexivverben",
    vocab: [
      { de: "sich vertragen", tr: "iyi geçinmek" },
      { de: "sich anfreunden", tr: "arkadaş olmak" },
      { de: "befreundet", tr: "arkadaş" },
      { de: "romantisch", tr: "romantik" },
      { de: "charmant", tr: "sevimli" },
      { de: "flirten", tr: "flört etmek" },
      { de: "verabredet sein", tr: "sözleşmiş olmak" },
      { de: "zusammenleben", tr: "birlikte yaşamak" },
    ],
    patterns: [
      { de: "Wir haben uns … kennengelernt.", tr: "nerede tanıştığınızı anlatır" },
      { de: "Wir verstehen uns gut.", tr: "bugünkü ilişkiyi özetler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün dönüşlü fiilleri öğreniyoruz ve bunu bir tanışma hikâyesiyle yapıyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada bazı fiiller yanlarında küçük bir zamir taşır. Türkçede bunun karşılığı çoğu zaman yoktur: 'tanıştık' deriz, arada bir kelime olmaz. Almancada o kelime olmadan cümle kurulamaz ve kişiye göre değişir. İki kişi söz konusuysa aynı zamir 'birbirimizle' anlamına gelir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("sich vertragen"),
          tr("Türkçesi 'iyi geçinmek' demek. Lütfen"),
          de("sich vertragen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich vertragen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sich anfreunden"),
          tr("Türkçesi 'arkadaş olmak' demek. Lütfen"),
          de("sich anfreunden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich anfreunden" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("befreundet"),
          tr("Türkçesi 'arkadaş, dost' demek; bir sıfat olarak kullanılır. Lütfen"),
          de("befreundet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "befreundet" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("romantisch"),
          tr("Türkçesi 'romantik' demek. Lütfen"),
          de("romantisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "romantisch" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("charmant"),
          tr("Türkçesi 'sevimli, cana yakın' demek. Lütfen"),
          de("charmant"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "charmant" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("flirten"),
          tr("Türkçesi 'flört etmek' demek. Lütfen"),
          de("flirten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "flirten" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("verabredet sein"),
          tr("Türkçesi 'buluşmak için sözleşmiş olmak' demek. Lütfen"),
          de("verabredet sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verabredet sein" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zusammenleben"),
          tr("Türkçesi 'birlikte yaşamak' demek. Lütfen"),
          de("zusammenleben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zusammenleben" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wir haben uns … kennengelernt."),
          tr(
            "Zamir burada 'birbirimizi' demek. Türkçede 'tanıştık' derken böyle bir kelime yok; Almancada olmazsa cümle eksik kalır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bir kursta tanıştık.' Almancası:"),
          de("Wir haben uns in einem Kurs kennengelernt."),
          tr("Lütfen"),
          de("Wir haben uns in einem Kurs kennengelernt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir haben uns in einem Kurs kennengelernt" },
      },
      {
        say: [tr("Sıra sende: 'Çabucak arkadaş olduk.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben uns schnell angefreundet",
          hint: [
            tr("Dönüşlü zamir fiilden hemen sonra durur ve ortaç sona gider:"),
            de("Wir haben uns schnell angefreundet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bugünü anlatıyor:"),
          de("Wir verstehen uns gut."),
          tr("Aynı zamir, bu kez şimdiki zamanda ve yine 'birbirimizi' anlamında."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Beş yıldır arkadaşız.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir sind seit fünf Jahren befreundet",
          hint: [
            tr("Süre bildiren edat kendinden sonraki ismi yönelme hâline sokar:"),
            de("Wir sind seit fünf Jahren befreundet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir haben in einem Kurs kennengelernt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir haben in einem Kurs kennengelernt.",
          answer: false,
          why: [
            tr("Dönüşlü zamir eksik; o olmadan fiil kimi tanıdığını söylemiyor. Doğrusu:"),
            de("Wir haben uns in einem Kurs kennengelernt."),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana yakın bir arkadaşınla nasıl tanıştığınızı soruyor. Anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Bir akşam yemeğinde biri sana en yakın arkadaşınla nasıl tanıştığınızı soruyor. Nerede tanıştığınızı, ilk izlenimini ve bugün nasıl olduğunuzu anlat.",
      partner: "yeni tanıştığın, meraklı bir sofra arkadaşı",
      opening: "Ihr kennt euch schon lange, oder? Wie habt ihr euch kennengelernt?",
      openingTr: "Siz uzun zamandır tanışıyorsunuz, değil mi? Nasıl tanıştınız?",
      goal: "Tanışma yeri, ilk izlenim ve bugünkü ilişki anlatılmış ve karşındaki de kendi tanışma hikâyesini söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-drei-jahre",
    icon: "calendar",
    level: "A2",
    course: "de",
    title: "Seit drei Jahren",
    titleTr: "Süre ve zaman noktası",
    summary: "Hâlâ süren bir zamanı ve geçmişte kalmış bir noktayı ayırmayı öğretir.",
    minutes: 10,
    focusId: "Dativ-Präpositionen",
    vocab: [
      { de: "seit", tr: "-den beri" },
      { de: "vor", tr: "önce" },
      { de: "seither", tr: "o zamandan beri" },
      { de: "zuvor", tr: "daha önce" },
      { de: "momentan", tr: "şu anda" },
      { de: "demnächst", tr: "yakında" },
      { de: "bislang", tr: "şimdiye kadar" },
      { de: "erst", tr: "ancak" },
    ],
    patterns: [
      { de: "Ich wohne seit … hier.", tr: "hâlâ süren bir zamanı anlatır" },
      { de: "Vor … bin ich gekommen.", tr: "geçmişte kalmış bir noktayı anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iki küçük kelimeyi ayırt etmeyi öğreniyoruz. İkisi de zaman söyler ama biri hâlâ süren bir şeyi, öteki bitmiş bir noktayı anlatır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'üç yıldır buradayım' ve 'üç yıl önce geldim' cümlelerinde iki ayrı ek kullanırız. Almancada iki ayrı edat vardır ve ikisi de kendinden sonraki ismi yönelme hâline sokar. Süre bildireni şimdiki zamanla, nokta bildireni geçmişle çalışır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("seit"),
          tr("Türkçesi 'bir zamandan beri' demek; hâlâ süren bir şeyi anlatır. Lütfen"),
          de("seit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "seit" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vor"),
          tr(
            "Zaman anlatırken Türkçesi 'önce' demek; yer anlatırken 'önünde' anlamına da gelir. Lütfen",
          ),
          de("vor"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vor" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("seither"),
          tr("Türkçesi 'o zamandan beri' demek. Lütfen"),
          de("seither"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "seither" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("zuvor"),
          tr("Türkçesi 'daha önce, ondan önce' demek. Lütfen"),
          de("zuvor"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zuvor" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("momentan"),
          tr("Türkçesi 'şu anda, şu sıralar' demek. Lütfen"),
          de("momentan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "momentan" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("demnächst"),
          tr("Türkçesi 'yakında' demek. Lütfen"),
          de("demnächst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "demnächst" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("bislang"),
          tr("Türkçesi 'şimdiye kadar' demek. Lütfen"),
          de("bislang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bislang" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("erst"),
          tr("Türkçesi 'ancak, daha' demek; beklenenden geç ya da az olduğunu söyler. Lütfen"),
          de("erst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erst" },
      },
      {
        say: [
          tr("İlk kalıbımız süreyi anlatıyor:"),
          de("Ich wohne seit … hier."),
          tr(
            "Fiil şimdiki zamanda kalıyor, çünkü durum hâlâ sürüyor. Türkçede 'oturuyorum' deriz, aynı mantık.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Üç yıldır burada oturuyorum.' Almancası:"),
          de("Ich wohne seit drei Jahren hier."),
          tr("Lütfen"),
          de("Ich wohne seit drei Jahren hier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wohne seit drei Jahren hier" },
      },
      {
        say: [tr("Sıra sende: 'İki aydır burada çalışıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich arbeite seit zwei Monaten hier",
          hint: [
            tr("Süre bildiren edat ismi yönelme hâline sokar ve fiil şimdiki zamanda kalır:"),
            de("Ich arbeite seit zwei Monaten hier."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız zaman noktasını anlatıyor:"),
          de("Vor … bin ich gekommen."),
          tr("Bu kez olay bitmiş, o yüzden fiil geçmişe geçiyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Üç yıl önce geldim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Vor drei Jahren bin ich gekommen",
          hint: [
            tr("Nokta bildiren edat geçmişle çalışır ve zaman ifadesi başta olunca özne arkaya düşer:"),
            de("Vor drei Jahren bin ich gekommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Seit drei Jahren wohne ich in Berlin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Seit drei Jahren wohne ich in Berlin.",
          answer: true,
          why: [
            tr(
              "Süre bildiren edat, yönelme hâlinde bir zaman ifadesi ve şimdiki zamanda bir fiil: üçü de doğru, çünkü oturma hâlâ sürüyor.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana ne zamandır burada olduğunu soruyor. İki kelimeyi de kullan.")],
      },
    ],
    roleplay: {
      scene:
        "Bir komşun sana ne zamandır bu şehirde olduğunu soruyor. Ne zaman geldiğini ve ne zamandır burada yaşadığını ayrı ayrı söyle, sonra ne zamandır çalıştığını da anlat.",
      partner: "yeni taşınmış, senin de ne zamandır burada olduğunu merak eden bir komşu",
      opening: "Wohnen Sie schon lange hier?",
      openingTr: "Uzun zamandır burada mı oturuyorsunuz?",
      goal: "Hem geliş noktası hem de süren durum ayrı cümlelerle söylenmiş ve komşuya da aynı soru sorulmuş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-veraenderung",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Was hat sich verändert?",
    titleTr: "Değişimler",
    summary: "Nelerin değiştiğini ve neye alıştığını anlatmayı öğretir.",
    minutes: 10,
    focusId: "Reflexivverben",
    vocab: [
      { de: "sich erinnern", tr: "hatırlamak" },
      { de: "merken", tr: "aklında tutmak" },
      { de: "ändern", tr: "değiştirmek" },
      { de: "verbessern", tr: "iyileştirmek" },
      { de: "wechseln", tr: "değiştirmek (yenisiyle)" },
      { de: "entspannt", tr: "rahatlamış" },
      { de: "unzufrieden", tr: "memnuniyetsiz" },
      { de: "weiterkommen", tr: "ilerlemek" },
    ],
    patterns: [
      { de: "Vieles hat sich verändert.", tr: "genel bir değişimi bildirir" },
      { de: "Ich erinnere mich an …", tr: "neyi hatırladığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün nelerin değiştiğini anlatıyoruz. Almancada 'değiştirmek' için iki ayrı fiil var ve ikisi aynı şey değil. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Aradaki fark şu: bir şeyi başka bir hâle getirmek ile bir şeyi bırakıp yenisini almak. Randevunun saatini kaydırırsan birincisi, doktoru bırakıp başkasına gidersen ikincisi. Türkçede ikisine de 'değiştirmek' deriz, bu yüzden karıştırmak kolay. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("sich erinnern"),
          tr("Türkçesi 'hatırlamak' demek; dönüşlü bir fiil. Lütfen"),
          de("sich erinnern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich erinnern" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("merken"),
          tr("Türkçesi 'aklında tutmak, fark etmek' demek. Lütfen"),
          de("merken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "merken" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("ändern"),
          tr("Türkçesi 'bir şeyi başka bir hâle getirmek' demek. Lütfen"),
          de("ändern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ändern" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("verbessern"),
          tr("Türkçesi 'iyileştirmek, geliştirmek' demek. Lütfen"),
          de("verbessern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verbessern" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("wechseln"),
          tr("Türkçesi 'bırakıp yenisini almak' demek; iş, doktor, yer değiştirmek. Lütfen"),
          de("wechseln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wechseln" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("entspannt"),
          tr("Türkçesi 'rahatlamış, gevşemiş' demek. Lütfen"),
          de("entspannt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "entspannt" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("unzufrieden"),
          tr("Türkçesi 'memnun olmayan' demek. Lütfen"),
          de("unzufrieden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unzufrieden" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("weiterkommen"),
          tr("Türkçesi 'ilerlemek, yol almak' demek. Lütfen"),
          de("weiterkommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weiterkommen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Vieles hat sich verändert."),
          tr(
            "Dönüşlü zamir burada 'kendiliğinden' anlamı katıyor: bir şeyi kimse değiştirmedi, kendi değişti.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'O zamandan beri çok şey değişti.' Almancası:"),
          de("Seither hat sich vieles verändert."),
          tr("Lütfen"),
          de("Seither hat sich vieles verändert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Seither hat sich vieles verändert" },
      },
      {
        say: [tr("Sıra sende: 'Randevumu değiştirmek istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte meinen Termin ändern",
          hint: [
            tr("Aynı şeyin başka bir hâle gelmesi söz konusu, o yüzden birinci fiil kullanılır:"),
            de("Ich möchte meinen Termin ändern."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich erinnere mich an …"),
          tr(
            "Bu fiil hem dönüşlü zamir hem de bir edat istiyor ve o edat kendinden sonrakini belirtme hâline sokuyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'İş değiştirmek istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte die Stelle wechseln",
          hint: [
            tr("Eskisini bırakıp yenisini almak söz konusu, o yüzden ikinci fiil kullanılır:"),
            de("Ich möchte die Stelle wechseln."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich erinnere an meine Kindheit."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich erinnere an meine Kindheit.",
          answer: false,
          why: [
            tr("Dönüşlü zamir eksik; bu fiil onsuz kullanılmaz. Doğrusu:"),
            de("Ich erinnere mich an meine Kindheit."),
          ],
        },
      },
      {
        say: [tr("Şimdi son yıllarda hayatında nelerin değiştiğini anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Uzun zamandır görmediğin bir arkadaşınla buluştun. Son yıllarda hayatında nelerin değiştiğini, neyi bilerek değiştirdiğini ve nelerin kendiliğinden değiştiğini anlat.",
      partner: "seni yıllar sonra gören eski bir arkadaş",
      opening: "Mensch, so lange nicht gesehen! Was hat sich bei dir verändert?",
      openingTr: "Vay, ne zamandır görüşmüyoruz! Sende neler değişti?",
      goal: "En az iki değişim anlatılmış, biri bilerek yapılmış biri kendiliğinden olmuş olarak ayrılmış ve arkadaşın da kendi değişimini söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-grosseltern",
    icon: "family",
    level: "A2",
    course: "de",
    title: "Bei meinen Großeltern",
    titleTr: "Dede-nine anıları",
    summary: "Çocukluk anılarını anlatmayı öğretir: orası nasıldı, ne vardı, neye izin vardı.",
    minutes: 10,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "das Enkelkind", tr: "torun" },
      { de: "der Topf", tr: "tencere" },
      { de: "der Kamin", tr: "şömine" },
      { de: "der Teig", tr: "hamur" },
      { de: "reich", tr: "zengin" },
      { de: "großziehen", tr: "büyütmek" },
      { de: "liebevoll", tr: "sevgi dolu" },
      { de: "erben", tr: "miras almak" },
    ],
    patterns: [
      { de: "Bei meinen Großeltern gab es …", tr: "orada neyin olduğunu anlatır" },
      { de: "Meine Großmutter war sehr …", tr: "bir kişiyi geçmiş zamanla tarif eder" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün dede ve ninenin evini anlatıyoruz: orada ne vardı, kokusu neydi, nasıl insanlardı. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir yeri geçmişte anlatırken en çok kullanılan kalıp 'vardı' demektir. Almancada bunun kendine has bir biçimi var ve ardından gelen isim belirtme hâline girer. Bugün onu ve olmak fiilinin kısa geçmişini bir arada çalışacağız. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Enkelkind"),
          tr("Türkçesi 'torun' demek. Lütfen"),
          de("das Enkelkind"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Enkelkind" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Topf"),
          tr("Türkçesi 'tencere' demek. Lütfen"),
          de("der Topf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Topf" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Kamin"),
          tr("Türkçesi 'şömine' demek. Lütfen"),
          de("der Kamin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kamin" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Teig"),
          tr("Türkçesi 'hamur' demek. Lütfen"),
          de("der Teig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Teig" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("reich"),
          tr("Türkçesi 'zengin' demek. Lütfen"),
          de("reich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "reich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("großziehen"),
          tr("Türkçesi 'büyütmek, yetiştirmek' demek; çocuk için kullanılır. Lütfen"),
          de("großziehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "großziehen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("liebevoll"),
          tr("Türkçesi 'sevgi dolu' demek. Lütfen"),
          de("liebevoll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "liebevoll" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("erben"),
          tr("Türkçesi 'miras almak' demek. Lütfen"),
          de("erben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erben" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Bei meinen Großeltern gab es …"),
          tr(
            "'Vardı' demenin yolu. Ardından gelen isim belirtme hâline girer; öznesi hep aynı kalır, kişiye göre değişmez.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Onlarda bir şömine vardı.' Almancası:"),
          de("Bei ihnen gab es einen Kamin."),
          tr("Lütfen"),
          de("Bei ihnen gab es einen Kamin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bei ihnen gab es einen Kamin" },
      },
      {
        say: [tr("Sıra sende: 'Mutfakta büyük bir tencere vardı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "In der Küche gab es einen großen Topf",
          hint: [
            de("der Topf"),
            tr("eril ve nesne olduğu için artikel ile sıfat birlikte belirtme hâline girer:"),
            de("In der Küche gab es einen großen Topf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir kişiyi tarif ediyor:"),
          de("Meine Großmutter war sehr …"),
          tr("Olmak fiilinin kısa geçmişi; sıfat fiilden sonra ve değişmeden durur."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Ninem çok sevgi doluydu.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Meine Großmutter war sehr liebevoll",
          hint: [
            tr("Yüklem olarak kullanılan sıfat hiç ek almaz:"),
            de("Meine Großmutter war sehr liebevoll."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Bei meinen Großeltern gab es einen Kamin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Bei meinen Großeltern gab es einen Kamin.",
          answer: true,
          why: [
            tr("'Vardı' kalıbı ardından gelen eril ismi belirtme hâline sokuyor; cümle doğru."),
          ],
        },
      },
      {
        say: [tr("Şimdi çocukken gittiğin bir evi anlatıyorsun: ne vardı, kim nasıldı.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla çocukluk anılarını konuşuyorsunuz. Dede ve ninenin evini anlat: orada ne vardı, onlar nasıl insanlardı ve orada ne yapmayı severdin.",
      partner: "kendi büyükanne evini de anlatan bir arkadaş",
      opening: "Warst du als Kind oft bei deinen Großeltern?",
      openingTr: "Çocukken dedenlerde çok kalır mıydın?",
      goal: "Evin içinde ne olduğu, kişilerin nasıl olduğu ve orada yapılan bir şey anlatılmış; arkadaşın da kendi anısını söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-peinlich",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Das war mir so peinlich!",
    titleTr: "Utanç anısı",
    summary: "Başına gelen utanç verici bir olayı anlatmayı öğretir.",
    minutes: 10,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "unangenehm", tr: "rahatsız edici" },
      { de: "ungeschickt", tr: "sakar" },
      { de: "verwirrt", tr: "kafası karışmış" },
      { de: "die Situation", tr: "durum" },
      { de: "gestehen", tr: "itiraf etmek" },
      { de: "sich verwählen", tr: "yanlış numara çevirmek" },
      { de: "auslachen", tr: "alay etmek" },
      { de: "komisch", tr: "tuhaf" },
    ],
    patterns: [
      { de: "Das war mir so peinlich!", tr: "utanç duygusunu doğrudan söyler" },
      { de: "Ich habe mich verwählt.", tr: "yaptığın yanlışı itiraf eder" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün başına gelen utanç verici bir olayı anlatıyoruz. Bu hikâyeler sohbeti açan hikâyelerdir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Duyguyu söylerken Almancada ilginç bir şey oluyor: utanan kişi öznenin değil, yönelme hâlinin içinde duruyor. Türkçedeki 'bana çok utanç verdi' ile aynı mantık. Bugün onu bir kuralsız fiille ve bir dönüşlü fiille birlikte çalışacağız. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("unangenehm"),
          tr("Türkçesi 'rahatsız edici, tatsız' demek. Lütfen"),
          de("unangenehm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unangenehm" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("ungeschickt"),
          tr("Türkçesi 'sakar, beceriksiz' demek. Lütfen"),
          de("ungeschickt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ungeschickt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("verwirrt"),
          tr("Türkçesi 'kafası karışmış' demek. Lütfen"),
          de("verwirrt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verwirrt" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Situation"),
          tr("Türkçesi 'durum' demek. Lütfen"),
          de("die Situation"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Situation" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("gestehen"),
          tr("Türkçesi 'itiraf etmek' demek. Lütfen"),
          de("gestehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gestehen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("sich verwählen"),
          tr("Türkçesi 'yanlış numara çevirmek' demek. Lütfen"),
          de("sich verwählen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich verwählen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("auslachen"),
          tr("Türkçesi 'birine gülmek, alay etmek' demek. Lütfen"),
          de("auslachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auslachen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("komisch"),
          tr("Türkçesi 'tuhaf, garip' demek. Lütfen"),
          de("komisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "komisch" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Das war mir so peinlich!"),
          tr(
            "Utanan kişi burada özne değil; cümlenin öznesi olayın kendisi. Kişi yönelme hâlinde duruyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu durum bana çok tatsız geldi.' Almancası:"),
          de("Die Situation war mir sehr unangenehm."),
          tr("Lütfen"),
          de("Die Situation war mir sehr unangenehm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Situation war mir sehr unangenehm" },
      },
      {
        say: [tr("Sıra sende: 'Bu bana çok tuhaf geldi.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das war mir sehr komisch",
          hint: [
            tr("Duyguyu yaşayan kişi yönelme hâlinde durur:"),
            de("Das war mir sehr komisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yanlışı itiraf ediyor:"),
          de("Ich habe mich verwählt."),
          tr("Dönüşlü bir fiil; zamir olmadan cümle kurulamaz."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Sonunda itiraf ettim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Ende habe ich alles gestanden",
          hint: [
            de("gestehen"),
            tr("kuralsız bir fiil ve zaman ifadesi başta olunca özne fiilin arkasına düşer:"),
            de("Am Ende habe ich alles gestanden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich war das sehr peinlich."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich war das sehr peinlich.",
          answer: false,
          why: [
            tr(
              "Özne olayın kendisi olmalı, kişi ise yönelme hâlinde durmalı. İkisi yer değiştirmiş. Doğrusu:",
            ),
            de("Das war mir sehr peinlich."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir arkadaşına başından geçen utanç verici bir olayı anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla oturmuş gülüyorsunuz ve o sana başından geçen en utanç verici olayı soruyor. Ne olduğunu sırayla anlat ve o an ne hissettiğini söyle.",
      partner: "kendi utanç anısını da anlatmaya hazır bir arkadaş",
      opening: "Erzähl mal, was war dir richtig peinlich?",
      openingTr: "Anlatsana, sana gerçekten ne utanç verdi?",
      goal: "Olay sırayla anlatılmış, o anki duygu söylenmiş ve arkadaşın da kendi anısını paylaşmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-erfolg",
    icon: "star",
    level: "A2",
    course: "de",
    title: "Darauf bin ich stolz",
    titleTr: "Gurur anısı",
    summary: "Başardığın bir şeyi ve arkasındaki emeği anlatmayı öğretir.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "hart", tr: "sert, zorlu" },
      { de: "weitermachen", tr: "devam etmek" },
      { de: "trainieren", tr: "antrenman yapmak" },
      { de: "der Wettbewerb", tr: "yarışma" },
      { de: "versuchen", tr: "denemek" },
      { de: "bewundern", tr: "hayran olmak" },
      { de: "aktiv", tr: "aktif" },
      { de: "geschickt", tr: "becerikli" },
    ],
    patterns: [
      { de: "Ich habe lange … trainiert.", tr: "başarının arkasındaki emeği anlatır" },
      { de: "Am Ende habe ich es geschafft.", tr: "sonucu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde başardığın bir şeyi anlatıyoruz. Bir başarı hikâyesi üç parçadan oluşur: emek, zorluk ve sonuç. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu modülde geçmişi anlatmanın bütün araçlarını topladın: Perfekt, kip fiillerinin kısa geçmişi ve dönüşlü fiiller. Bugün üçünü bir hikâyede bir arada kullanacağız. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("hart"),
          tr("Türkçesi 'sert' demek; zorlu bir iş için de kullanılır. Lütfen"),
          de("hart"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hart" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("weitermachen"),
          tr("Türkçesi 'devam etmek' demek. Lütfen"),
          de("weitermachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weitermachen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("trainieren"),
          tr("Türkçesi 'antrenman yapmak, çalışmak' demek. Lütfen"),
          de("trainieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "trainieren" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Wettbewerb"),
          tr("Türkçesi 'yarışma' demek. Lütfen"),
          de("der Wettbewerb"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wettbewerb" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("versuchen"),
          tr("Türkçesi 'denemek' demek. Lütfen"),
          de("versuchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "versuchen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("bewundern"),
          tr("Türkçesi 'hayran olmak' demek. Lütfen"),
          de("bewundern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bewundern" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("aktiv"),
          tr("Türkçesi 'aktif, hareketli' demek. Lütfen"),
          de("aktiv"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aktiv" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("geschickt"),
          tr("Türkçesi 'becerikli, eli yatkın' demek. Lütfen"),
          de("geschickt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geschickt" },
      },
      {
        say: [
          tr("İlk kalıbımız emeği anlatıyor:"),
          de("Ich habe lange … trainiert."),
          tr(
            "Yabancı kökenli ve sonu belirli bir heceyle biten fiiller ortacın hecesini almaz; sonu değişmeden kalır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yarışma için uzun süre çalıştım.' Almancası:"),
          de("Für den Wettbewerb habe ich lange trainiert."),
          tr("Lütfen"),
          de("Für den Wettbewerb habe ich lange trainiert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Für den Wettbewerb habe ich lange trainiert" },
      },
      {
        say: [tr("Sıra sende: 'Birçok kez denedim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe es oft versucht",
          hint: [
            de("versuchen"),
            tr("vurgusuz bir ön ekle başlıyor, o yüzden ortacın hecesini almıyor:"),
            de("Ich habe es oft versucht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sonucu söylüyor:"),
          de("Am Ende habe ich es geschafft."),
          tr("Zaman ifadesi başta olduğu için özne fiilin arkasına düşüyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Buna rağmen devam ettim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Trotzdem habe ich weitergemacht",
          hint: [
            tr("Bağlayıcı başta olduğu için özne fiilin arkasına düşer ve ortaç sona gider:"),
            de("Trotzdem habe ich weitergemacht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe lange getrainiert."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe lange getrainiert.",
          answer: false,
          why: [
            tr(
              "Sonu belirli bir heceyle biten yabancı kökenli fiiller ortacın hecesini almaz. Doğrusu:",
            ),
            de("Ich habe lange trainiert."),
          ],
        },
      },
      {
        say: [tr("Şimdi biri sana neyle gurur duyduğunu soruyor. Emeği ve sonucu birlikte anlat.")],
      },
    ],
    roleplay: {
      scene:
        "Bir iş görüşmesine hazırlanıyorsun ve bir arkadaşın seninle prova yapıyor. Sana neyle gurur duyduğunu soruyor; başardığın bir şeyi, arkasındaki emeği ve zorluğu anlat.",
      partner: "seninle görüşme provası yapan bir arkadaş",
      opening: "Also, erste Frage: Worauf bist du in deinem Leben stolz?",
      openingTr: "Peki, ilk soru: Hayatında neyle gurur duyuyorsun?",
      goal: "Bir başarı, arkasındaki emek ve karşılaşılan zorluk anlatılmış ve arkadaşın cevabı değerlendirip bir öneri vermiş olur.",
      minTurns: 8,
    },
  },
];

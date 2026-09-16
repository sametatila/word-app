import type { QuizWeek } from "../types";

/**
 * A2 · Hafta 4 · İş ve başvuru.
 *
 * ÖLÇÜLEN ŞEY: bir iş ilanını ve iş görüşmesini anlamak; `dass` yan cümlesi,
 * modal fiilin Präteritum'u, karşılaştırma ve `deshalb` sonrası devrik düzen.
 * Geri dönüş: `wortstellung.v2` ve `praeteritum.modal` (W1), `kasus.dativ`,
 * `verb.werden` ve `verb.bekommen` (W2), `nebensatz.weil` (W2).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w04-g3` (`interessanter`): Türkçe 'daha' ve İngilizce `more` aynı yanlışı
 *    üretiyor (`mehr interessant`), ama İngilizce konuşan için kural 'uzun
 *    sıfat `more` alır' olduğundan açıklama ayrıldı.
 *  - `w04-g5` (`deshalb möchte ich`): `weil` ile aynı anlam, farklı dizilim;
 *    İngilizce `so I want` sırası özneyi önde tutuyor.
 *  - `w04-v2` (`Lehrer werden`): `bekommen` şıkkı yalnız İngilizce varyantta
 *    anlamlı bir tuzak; tabanda `machen` 'yapmak' çevirisini temsil ediyor.
 *  - `w04-v3` (`verdienen`): 'kazanmak' Türkçede tek fiil; İngilizce
 *    `earn`/`win` ayrımı zaten var, o yüzden varyant yazılmadı.
 */
export const DE_A2_W04: QuizWeek = {
  id: "de-a2-w04",
  course: "de",
  level: "A2",
  no: 4,
  theme: "Arbeit und Bewerbung",
  themeTr: "İş ve başvuru",
  canDo: ["A2.RD.2", "A2.LS.3", "A2.SPK.3", "A2.GR.3", "A2.GR.4", "A2.GR.6"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Anzeige",
      genreTr: "Iş ilanı",
      title: "Café am Marktplatz sucht Mitarbeiter",
      body:
        "Wir suchen ab 1. Oktober einen Mitarbeiter oder eine Mitarbeiterin für unser Café am Marktplatz. " +
        "Sie arbeiten 20 Stunden pro Woche, meistens am Wochenende. Wir zahlen 14 Euro pro Stunde. " +
        "Sie sind freundlich und pünktlich und arbeiten gern im Team. Erfahrung im Service ist gut, aber nicht notwendig: Wir bilden Sie aus. " +
        "Sie sprechen gut Deutsch. Wenn Sie auch Englisch sprechen, ist das super, denn im Sommer haben wir viele Touristen. " +
        "Haben Sie Interesse? Dann schicken Sie Ihre Bewerbung bis zum 15. September an Herrn Keller. " +
        "Bitte schreiben Sie auch, seit wann Sie in der Stadt wohnen und wann Sie anfangen können. " +
        "Wir laden Sie dann zu einem Gespräch ein.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Bewerbungsgespräch",
      genreTr: "Iş görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Herr Keller", text: "Guten Tag, Frau Yıldız. Bitte setzen Sie sich. Warum möchten Sie bei uns arbeiten?" },
        { speaker: "Frau Yıldız", text: "Ich trinke hier oft Kaffee und finde das Café sehr gemütlich. Außerdem wohne ich ganz in der Nähe." },
        { speaker: "Herr Keller", text: "Haben Sie schon im Service gearbeitet?" },
        { speaker: "Frau Yıldız", text: "Ja, zwei Jahre in einem Hotel in Izmir. Dort musste ich auch oft Englisch sprechen." },
        { speaker: "Herr Keller", text: "Sehr gut. Und seit wann sind Sie in Deutschland?" },
        { speaker: "Frau Yıldız", text: "Seit acht Monaten. Vorher habe ich in Izmir einen Kurs in Deutsch gemacht." },
        { speaker: "Herr Keller", text: "Können Sie auch am Sonntag arbeiten?" },
        { speaker: "Frau Yıldız", text: "Am Samstag ja, am Sonntag leider nicht, weil ich da auf meinen Sohn aufpasse." },
        { speaker: "Herr Keller", text: "Kein Problem, das finden wir. Können Sie am 1. Oktober anfangen?" },
        { speaker: "Frau Yıldız", text: "Ja, das passt sehr gut." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-a2-w04-r1",
      block: "read",
      ref: "t1",
      stem: "Muss man schon im Service gearbeitet haben?",
      options: ["Ja, das ist notwendig.", "Ja, und man muss auch Englisch sprechen.", "Nein, aber man muss 40 Stunden arbeiten.", "Nein, das Café bildet neue Mitarbeiter aus."],
      answer: 3,
      why: "`gut, aber nicht notwendig` bir şartı tercihe indiriyor: `aber`dan sonraki kısım belirleyici. İlanlarda cümlenin ilk yarısını okuyup şart sanmak sık hata. İngilizce de şart değil: `Wenn …, ist das super` bir artı olarak geçiyor.",
      targets: ["lesen.detail", "konnektor.aber"],
    },
    {
      id: "de-a2-w04-r2",
      block: "read",
      ref: "t1",
      stem: "Wie viel arbeitet man in dem Café?",
      options: ["20 Stunden pro Tag", "14 Stunden pro Woche", "20 Stunden pro Woche", "14 Stunden am Wochenende"],
      answer: 2,
      why: "İlanda iki sayı var: 20 çalışma saati, 14 ise saat başına ücret (Euro). Bir sayıyı birimiyle birlikte okumak gerekiyor: `pro Woche` süreyi, `pro Stunde` ücreti bildiriyor.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-a2-w04-r3",
      block: "read",
      ref: "t1",
      stem: "Was soll man in der Bewerbung auch schreiben?",
      options: ["wie viel Geld man möchte", "wann man anfangen kann", "wo man früher gearbeitet hat", "welche Sprachen man spricht"],
      answer: 1,
      why: "`Bitte schreiben Sie auch` cümlesi iki şey istiyor: şehirde ne zamandan beri oturduğun ve ne zaman başlayabileceğin. Bir başvuruda mantıklı görünen ama ilanın istemediği bilgiyi seçmek, metni değil kendi beklentini okumak olur.",
      targets: ["lesen.detail", "nebensatz.indirekte-frage"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-a2-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Wo hat Frau Yıldız früher gearbeitet?",
      options: ["in einem Hotel", "in einem Café", "in einer Schule", "in einem Restaurant"],
      answer: 0,
      why: "Café başvurduğu ve müşterisi olduğu yer: `Ich trinke hier oft Kaffee` bugünkü bir alışkanlık, geçmişteki iş değil. Soru `früher` diyor; cevap `schon … gearbeitet` sorusuna verilen cevapta.",
      targets: ["hoeren.detail", "perfekt.haben"],
    },
    {
      id: "de-a2-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "Seit wann ist Frau Yıldız in Deutschland?",
      options: ["seit zwei Jahren", "seit einem Jahr", "seit Oktober", "seit acht Monaten"],
      answer: 3,
      why: "İki süre duyuluyor: iki yıl İzmir'deki otel işi (bitmiş), sekiz ay Almanya (`seit`, hâlâ sürüyor). `seit` sorusu yalnız bugün de süren durumu sorar; bitmiş işin süresi bu soruya cevap olmaz.",
      targets: ["hoeren.detail", "zeitangabe.seit"],
    },
    {
      id: "de-a2-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "Warum kann Frau Yıldız am Sonntag nicht arbeiten?",
      options: ["Sie macht einen Kurs.", "Sie passt auf ihren Sohn auf.", "Sie arbeitet im Hotel.", "Das Café ist am Sonntag zu."],
      answer: 1,
      why: "Sebep `weil` yan cümlesinde ve fiil sonda: `aufpasse`. Almancada yan cümlenin anlamı çoğu zaman son sözcükte tamamlanıyor; cümlenin sonunu beklemeden dinlemeyi bırakınca sebep kaçıyor.",
      targets: ["hoeren.detail", "nebensatz.weil"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-a2-w04-g1",
      block: "grammar",
      stem: "Ich hoffe, dass ___.",
      options: ["ich bekomme die Stelle", "bekomme ich die Stelle", "ich die Stelle bekomme", "ich die Stelle bekommen"],
      answer: 2,
      why: "`dass` yan cümlesinde özne `dass`ın hemen arkasında kalır, çekimli fiil en sona gider. `bekomme ich` devrik ana cümle düzeni; `bekommen` ise çekimsiz mastar, özneye uymuyor.",
      targets: ["nebensatz.dass"],
      byNative: {
        en: {
          options: ["ich bekomme die Stelle", "ich die Stelle bekomme", "bekomme ich die Stelle", "ich die Stelle bekommen"],
          answer: 1,
          why: "İngilizcede `that I get the job` sırası ana cümleyle aynıdır. Almancada `dass` çekimli fiili sona iter: `dass ich die Stelle bekomme`.",
        },
      },
    },
    {
      id: "de-a2-w04-g2",
      block: "grammar",
      stem: "In meinem alten Job ___ ich jeden Tag um fünf Uhr aufstehen.",
      options: ["muss", "musste", "müsste", "habe gemusst"],
      answer: 1,
      why: "Modal fiiller geçmişte çoğunlukla Präteritum'la söylenir ve umlautlarını kaybeder: `müssen` → `musste`. `müsste` umlautu koruyan Konjunktiv II ve 'gerekirdi' demek; tek bir nokta anlamı değiştiriyor.",
      targets: ["praeteritum.modal", "modal.muessen"],
      byNative: {
        en: {
          options: ["musste", "muss", "müsste", "habe gemusst"],
          answer: 0,
          why: "İngilizce `must`ın geçmiş biçimi yok, yerine `had to` gelir. Almanca `müssen`in kendi geçmişi var: `musste`. `habe gemusst` başka bir fiille birlikte kullanılmaz.",
        },
      },
    },
    {
      id: "de-a2-w04-g3",
      block: "grammar",
      stem: "Die Arbeit im Hotel war gut, aber die Arbeit im Café ist ___.",
      options: ["mehr interessant", "interessanter", "am interessantesten", "interessantere"],
      answer: 1,
      why: "Karşılaştırmada sıfatın sonuna `-er` eklenir, sıfat ne kadar uzun olursa olsun. 'Daha ilginç' düşüncesiyle `mehr` başa getiriliyor ama Almancada `mehr` yalnız miktar için ('daha çok para').",
      targets: ["vergleich.komparativ"],
      byNative: {
        en: {
          options: ["interessanter", "am interessantesten", "mehr interessant", "interessantere"],
          answer: 0,
          why: "İngilizcede uzun sıfatlar `more` alır (`more interesting`). Almancada sıfatın uzunluğu fark etmez, her zaman `-er`: `interessanter`, `schwieriger`.",
        },
      },
    },
    {
      id: "de-a2-w04-g4",
      block: "grammar",
      stem: "Am Ende sagt Frau Yıldız: „Ich danke ___ für das Gespräch.“",
      options: ["Sie", "Ihr", "Ihnen", "Ihren"],
      answer: 2,
      why: "`danken` teşekkür edilen kişiyi Dativ ile alır ve kibar `Sie`nin Dativ'i `Ihnen`. `Sie` bir kalıp gibi ezberlendiği için her yerde aynı kalacağı sanılıyor.",
      targets: ["kasus.dativ", "verb.danken"],
      byNative: {
        en: {
          options: ["Ihnen", "Sie", "Ihr", "Ihren"],
          answer: 0,
          why: "İngilizcede `thank you` nesnesi biçim değiştirmez ve fiil doğrudan nesne alır. Almanca `danken` bir Dativ fiilidir: `Sie` → `Ihnen`.",
        },
      },
    },
    {
      id: "de-a2-w04-g5",
      block: "grammar",
      stem: "Ich spreche gut Englisch, deshalb ___.",
      options: ["möchte ich im Hotel arbeiten", "ich möchte im Hotel arbeiten", "ich im Hotel arbeiten möchte", "möchte im Hotel ich arbeiten"],
      answer: 0,
      why: "`deshalb` bir bağlaç değil zarftır ve cümlenin birinci konumunu doldurur: çekimli fiil ikinci sırada, özne onun arkasında. `weil` gibi fiili sona itmez; `weil` ile `deshalb` aynı anlam ilişkisini kurar ama farklı dizilim ister.",
      targets: ["wortstellung.v2", "konnektor.deshalb"],
      byNative: {
        en: {
          options: ["ich möchte im Hotel arbeiten", "ich im Hotel arbeiten möchte", "möchte im Hotel ich arbeiten", "möchte ich im Hotel arbeiten"],
          answer: 3,
          why: "İngilizcede `so I want to work` ile özne önde kalır. Almanca `deshalb` birinci konumu doldurur ve fiil hemen arkasından gelir: `deshalb möchte ich`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-a2-w04-v1",
      block: "vocab",
      stem: "„Was sind Sie von ___?“ – „Ich bin Lehrerin.“",
      options: ["Stelle", "Arbeit", "Beruf", "Firma"],
      answer: 2,
      why: "`Was sind Sie von Beruf?` sabit bir kalıp: meslek `Beruf`. `Stelle` belli bir işyerindeki pozisyon, `Arbeit` yapılan iş ya da işyeri. Türkçe 'iş' sözcüğü üçünü birden karşıladığı için ayrım görünmüyor.",
      targets: ["nomen.beruf-stelle"],
      byNative: {
        en: {
          options: ["Beruf", "Stelle", "Arbeit", "Firma"],
          answer: 0,
          why: "İngilizce `job` hem meslek hem pozisyon demek. Almancada meslek `Beruf`, belli bir yerdeki pozisyon `Stelle`; soru kalıbı mesleği soruyor.",
        },
      },
    },
    {
      id: "de-a2-w04-v2",
      block: "vocab",
      stem: "Mein Sohn möchte später Lehrer ___.",
      options: ["machen", "lernen", "bekommen", "werden"],
      answer: 3,
      why: "Bir mesleğe, bir duruma geçiş `werden` ile anlatılır: 'öğretmen olmak'. `machen` 'yapmak' kelime kelime çeviri; `lernen` bir şeyi öğrenmek, kişi `Lehrer` öğrenilmez.",
      targets: ["verb.werden", "verb.bekommen"],
      byNative: {
        en: {
          options: ["werden", "bekommen", "machen", "lernen"],
          answer: 0,
          why: "`bekommen` İngilizce `become` gibi görünür ama 'almak' demektir: `Ich bekomme einen Brief`. 'Öğretmen olmak' (`become a teacher`) `Lehrer werden`.",
        },
      },
    },
    {
      id: "de-a2-w04-v3",
      block: "vocab",
      stem: "Wie viel Geld ___ man in diesem Job im Monat?",
      options: ["gewinnt", "verdient", "bezahlt", "spart"],
      answer: 1,
      why: "Çalışarak para kazanmak `verdienen`; `gewinnen` bir yarışmada ya da oyunda kazanmak. Türkçe 'kazanmak' ikisini de karşıladığı için `gewinnt` seçiliyor. `bezahlen` ise ödeyen tarafın fiili.",
      targets: ["verb.verdienen"],
      byNative: {
        en: {
          options: ["verdient", "gewinnt", "spart", "bezahlt"],
          answer: 0,
          why: "`gewinnt` İngilizce `win`e benzediği için seçiliyor ama `gewinnen` yarışmada kazanmak. `get paid` düşüncesi de `bezahlt`a çekiyor, oysa `bezahlen` ödeyen tarafın fiili. Maaş kazanmak `verdienen` (`earn`).",
        },
      },
    },
  ],
};

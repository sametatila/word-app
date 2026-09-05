import { de, tr, type Lesson } from "../types";

/**
 * A1 · Parti 9 — konular 081-090 (Modül 9: Sağlık ve vücut).
 *
 * Modül bir hastalığın seyrini takip ediyor: vücut adlandırılıyor, ağrı
 * anlatılıyor, randevu alınıyor, zorunluluk konuşuluyor, ilaç alınıyor, işe
 * haber veriliyor. Dilbilgisi bu seyre asılı: ağrı kalıbı kişiyi 'bana'
 * biçimine sokuyor, zorunluluk asıl fiili cümlenin sonuna atıyor, emir kipi
 * ise iki ayrı biçimde geliyor — eczacının kibar emri ile arkadaşın senli
 * öğüdü arka arkaya konuluyor ki fark duyulsun.
 */
export const deA1B09: Lesson[] = [
  {
    id: "de-a1-koerper",
    icon: "doctor",
    level: "A1",
    course: "de",
    title: "Der Körper",
    titleTr: "Vücut bölümleri",
    summary:
      "Vücut bölümlerini adlandırmayı ve her adın artikeliyle birlikte öğrenilmesi gerektiğini öğretir.",
    minutes: 8,
    focusId: "Artikel",
    vocab: [
      { de: "der Körper", tr: "vücut" },
      { de: "der Kopf", tr: "baş" },
      { de: "der Arm", tr: "kol" },
      { de: "das Bein", tr: "bacak" },
      { de: "die Hand", tr: "el" },
          { de: "das Gewicht", tr: "ağırlık" },
      { de: "der Mensch", tr: "insan" },
      { de: "das Leben", tr: "hayat" },
],
    patterns: [
      { de: "Das ist der Arm.", tr: "bir vücut bölümünü artikeliyle adlandırır" },
      { de: "Ich habe zwei Arme.", tr: "kaç tane olduğunu söyler" },
      { de: "Wie heißt das auf Deutsch?", tr: "bir şeyin Almancasını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün vücudumuzu Almanca adlandıracağız. Doktorda, eczanede, spor salonunda bu kelimeler olmadan hiçbir yere varamazsın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugün aynı zamanda bir alışkanlık kuracağız. Türkçede 'baş' dersin ve iş biter; Almancada kelimenin önündeki küçük kelime kelimenin bir parçasıdır. Onsuz öğrenilen kelime yarım öğrenilmiştir. Bugünkü beşlinin üçü ayrı artikel alıyor, tam bir alıştırma. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Körper"),
          tr("Türkçesi 'vücut' demek. Lütfen"),
          de("der Körper"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Körper" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Kopf"),
          tr("Türkçesi 'baş' demek. Lütfen"),
          de("der Kopf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kopf" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Arm"),
          tr("Türkçesi 'kol' demek. Lütfen"),
          de("der Arm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Arm" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Bein"),
          tr("Türkçesi 'bacak' demek. Lütfen"),
          de("das Bein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bein" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Hand"),
          tr("Türkçesi 'el' demek. Lütfen"),
          de("die Hand"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Hand" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Gewicht"),
          tr("Türkçesi 'ağırlık' demek. Lütfen"),
          de("das Gewicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gewicht" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Mensch"),
          tr("Türkçesi 'insan' demek. Lütfen"),
          de("der Mensch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mensch" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Leben"),
          tr("Türkçesi 'hayat' demek. Lütfen"),
          de("das Leben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Leben" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Das ist der Arm."),
          tr("Bir şeyi gösterip adlandırırken artikel olduğu gibi kalır. Üç artikelin üçü de bu derste var:"),
          de("der Kopf"),
          tr("eril,"),
          de("das Bein"),
          tr("nötr,"),
          de("die Hand"),
          tr("dişil."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist der Arm"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist der Arm" },
      },
      {
        say: [tr("Sıra sende: 'Bu bacak.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das ist das Bein",
          hint: [
            tr("Bacak nötr bir kelime, bu yüzden artikeli değişmeden gelir:"),
            de("Das ist das Bein."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sayıyla kuruluyor:"),
          de("Ich habe zwei Arme."),
          tr("Sayıdan sonra kelimenin çoğula girdiğini biliyorsun. Güzel haber: çoğulda artikel derdi biter, hepsi tek biçimde birleşir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe zwei Arme"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe zwei Arme" },
      },
      {
        say: [tr("Şimdi sen söyle: 'İki elim var.'")],
        expect: {
          kind: "produce",
          target: "Ich habe zwei Hände",
          hint: [
            tr("Bu kelimenin çoğulunda ortadaki sesli harf de değişiyor:"),
            de("Ich habe zwei Hände."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız bir kelimeyi bilmediğin her an işine yarayacak:"),
          de("Wie heißt das auf Deutsch?"),
          tr("Yani 'Bunun Almancası ne?' Bu soruyu sormaktan hiç çekinme."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie heißt das auf Deutsch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie heißt das auf Deutsch" },
      },
      {
        say: [
          tr("Küçük bir tavsiye: kelimeyi asla yalnız ezberleme."),
          de("Kopf"),
          tr("değil,"),
          de("der Kopf"),
          tr("diye öğren. Kulağın artikeli kelimenin bir hecesi gibi duysun; sonradan düzeltmek çok daha zor."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist die Kopf."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist die Kopf.",
          answer: false,
          why: [
            tr("Yanlış. Baş eril bir kelime. Doğrusu:"),
            de("Das ist der Kopf."),
          ],
        },
      },
      {
        say: [
          tr(
            "Vücut adları artık cebinde. Şimdi bir ilk yardım kursundasın ve eğitmen gösterdiği yerleri sana soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir ilk yardım kursundasın. Eğitmen vücut bölümlerini gösteriyor; adlarını artikelleriyle söyle ve bilmediklerinin Almancasını sor.",
      partner: "esprili ve çok sabırlı bir ilk yardım eğitmeni",
      opening: "Willkommen im Kurs! Sagen Sie mal, wie heißt das hier auf Deutsch?",
      openingTr: "Kursa hoş geldiniz! Söyleyin bakalım, bunun Almancası ne?",
      goal: "Gösterilen bütün vücut bölümleri artikeliyle söylenmiş ve bilmediklerinin Almancası öğrenilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-weh-tun",
    icon: "doctor",
    level: "A1",
    course: "de",
    title: "Mein Kopf tut weh",
    titleTr: "Ağrı anlatma",
    summary:
      "Neresinin ağrıdığını iki ayrı kalıpla anlatmayı ve ne zamandır sürdüğünü söylemeyi öğretir.",
    minutes: 9,
    focusId: "Dativ-gefallen",
    vocab: [
      { de: "weh tun", tr: "acımak" },
      { de: "der Schmerz", tr: "ağrı" },
      { de: "der Bauch", tr: "karın" },
      { de: "der Rücken", tr: "sırt" },
      { de: "der Hals", tr: "boğaz" },
          { de: "fehlen", tr: "eksik olmak" },
      { de: "die Sache", tr: "şey" },
      { de: "passieren", tr: "meydana gelmek" },
],
    patterns: [
      { de: "Mein Kopf tut weh.", tr: "hangi yerinin ağrıdığını söyler" },
      { de: "Mir tut der Rücken weh.", tr: "aynı şeyi 'bana' diyerek söyler" },
      { de: "Ich habe Schmerzen.", tr: "ağrın olduğunu genel olarak söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün ağrı anlatacağız. Doktorun ilk sorusu hep aynıdır ve cevabını bilmiyorsan muayene orada tıkanır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Ağrı anlatmanın iki yolu var, ikisi de doğru. Biri Türkçeye birebir benziyor, diğeri hiç benzemiyor ama Almanlar günlük konuşmada çoğunlukla ikincisini kullanıyor. İkisini de öğreneceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz iki parçadan oluşuyor:"),
          de("weh tun"),
          tr("Türkçesi 'acımak, ağrımak' demek. Lütfen"),
          de("weh tun"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weh tun" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Schmerz"),
          tr("Türkçesi 'ağrı' demek. Lütfen"),
          de("der Schmerz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schmerz" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Bauch"),
          tr("Türkçesi 'karın' demek. Lütfen"),
          de("der Bauch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bauch" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Rücken"),
          tr("Türkçesi 'sırt' demek. Lütfen"),
          de("der Rücken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Rücken" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Hals"),
          tr("Türkçesi 'boğaz' ya da 'boyun' demek. Lütfen"),
          de("der Hals"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hals" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("fehlen"),
          tr("Türkçesi 'eksik olmak' demek. Lütfen"),
          de("fehlen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fehlen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Sache"),
          tr("Türkçesi 'şey' demek. Lütfen"),
          de("die Sache"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sache" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("passieren"),
          tr("Türkçesi 'meydana gelmek' demek. Lütfen"),
          de("passieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "passieren" },
      },
      {
        say: [
          tr("Şimdi ilk yol, Türkçeyle aynı mantıkta:"),
          de("Mein Kopf tut weh."),
          tr("Yani 'Başım ağrıyor.' Ağrıyan yer özne oluyor, tıpkı Türkçedeki gibi."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mein Kopf tut weh"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mein Kopf tut weh" },
      },
      {
        say: [tr("Sıra sende: 'Karnım ağrıyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Bauch tut weh",
          hint: [
            tr("İyelik kelimesi karnın cinsiyetine bakar ve eril olduğu için kısa kalır:"),
            de("Mein Bauch tut weh."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi ikinci yol, ilk duyduğunda tuhaf gelecek:"),
          de("Mir tut der Rücken weh."),
          tr(
            "Kelime kelime 'bana sırt ağrıyor'. Ağrıyan yer artikeliyle duruyor, ağrıyan kişi ise 'bana' biçimine giriyor. Almanlar en çok bu biçimi kullanır.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mir tut der Rücken weh"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mir tut der Rücken weh" },
      },
      {
        say: [tr("Şimdi sen kur: 'Boğazım ağrıyor.'")],
        expect: {
          kind: "produce",
          target: "Mir tut der Hals weh",
          hint: [
            tr("Kişi 'bana' biçiminde, ağrıyan yer ise artikeliyle duruyor:"),
            de("Mir tut der Hals weh."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız neresi olduğunu söylemeden ağrın olduğunu bildirir:"),
          de("Ich habe Schmerzen."),
          tr("Ne kadar zamandır sürdüğünü de eklersin:"),
          de("seit gestern"),
          tr("yani 'dünden beri'. Almanlar süreyi cümlenin ortasına, nesneden önce koyar."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe seit gestern Schmerzen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe seit gestern Schmerzen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe Kopfschmerzen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe Kopfschmerzen.",
          answer: true,
          why: [
            tr("Doğru. Almancada ağrı adı vücut bölümüyle birleşip tek kelime olur; aynısını karın ve sırt için de yapabilirsin."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık neyin ağrıdığını anlatabilirsin. Şimdi doktorun karşısındasın ve o meşhur ilk soruyu duyacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Doktorun muayene odasındasın. Neresinin ağrıdığını, ne zamandır sürdüğünü anlat ve doktorun sorularına cevap ver.",
      partner: "aceleci ama dikkatle dinleyen bir doktor",
      opening: "Guten Tag! Was fehlt Ihnen denn?",
      openingTr: "İyi günler! Neyiniz var bakalım?",
      goal: "Ağrının yeri ve süresi anlatılmış; doktor ne yapacağını söylemiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-termin-arzt",
    icon: "phone",
    level: "A1",
    course: "de",
    title: "Ein Termin beim Arzt",
    titleTr: "Doktor randevusu",
    summary:
      "Telefonda randevu almayı ve gün ile saatin ayrı edatlarla söylendiğini öğretir.",
    minutes: 9,
    focusId: "Temporal-am-um",
    vocab: [
      { de: "der Termin", tr: "randevu" },
      { de: "die Praxis", tr: "muayenehane" },
      { de: "dringend", tr: "acil" },
      { de: "der Mittwoch", tr: "çarşamba" },
      { de: "möglich", tr: "mümkün" },
          { de: "der Arzt", tr: "doktor" },
      { de: "besuchen", tr: "ziyaret etmek" },
      { de: "die Stelle", tr: "pozisyon" },
],
    patterns: [
      { de: "Ich brauche einen Termin.", tr: "randevu istediğini söyler" },
      { de: "Geht es am Mittwoch?", tr: "belirli bir gün olur mu diye sorar" },
      { de: "Kommen Sie um zehn Uhr.", tr: "saat verirken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün telefonda randevu alacağız. Bunun için iki küçük kelimeyi karıştırmaman gerekiyor: biri günlerin, biri saatlerin önüne gelir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'çarşamba günü saat onda' dersin ve iki bilgi de aynı ekle gelir. Almancada gün için bir edat, saat için başka bir edat var ve yerlerini değiştirmek cümleyi bozar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Termin"),
          tr("Türkçesi 'randevu' demek. Lütfen"),
          de("der Termin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Termin" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Praxis"),
          tr("Türkçesi 'muayenehane' demek. Lütfen"),
          de("die Praxis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Praxis" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("dringend"),
          tr("Türkçesi 'acil' demek. Lütfen"),
          de("dringend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dringend" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Mittwoch"),
          tr("Türkçesi 'çarşamba' demek. Lütfen"),
          de("der Mittwoch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mittwoch" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("möglich"),
          tr("Türkçesi 'mümkün' demek. Lütfen"),
          de("möglich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "möglich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Arzt"),
          tr("Türkçesi 'doktor' demek. Lütfen"),
          de("der Arzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Arzt" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("besuchen"),
          tr("Türkçesi 'ziyaret etmek' demek. Lütfen"),
          de("besuchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "besuchen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Stelle"),
          tr("Türkçesi 'pozisyon' demek. Lütfen"),
          de("die Stelle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stelle" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız, telefonu açar açmaz söyleyeceğin cümle:"),
          de("Ich brauche einen Termin."),
          tr("Randevu eril bir kelime ve burada nesne, o yüzden tanıdığın ek yerinde duruyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich brauche einen Termin"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich brauche einen Termin" },
      },
      {
        say: [tr("Sıra sende: 'Acilen bir randevuya ihtiyacım var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich brauche dringend einen Termin",
          hint: [
            tr("Acil kelimesi fiilden hemen sonra, nesneden önce gelir:"),
            de("Ich brauche dringend einen Termin."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi günler. Gün adlarının önüne hep aynı küçük kelime gelir:"),
          de("am Mittwoch"),
          tr("Sormak istersen:"),
          de("Geht es am Mittwoch?"),
          tr("yani 'Çarşamba olur mu?' Karşındaki ya"),
          de("Ja, das ist möglich."),
          tr("der ya da"),
          de("Nein, das ist leider nicht möglich."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Geht es am Mittwoch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Geht es am Mittwoch" },
      },
      {
        say: [
          tr("Saatlerin önüne ise başka bir kelime gelir:"),
          de("um zehn Uhr"),
          tr("Karşındaki sana şöyle diyecek:"),
          de("Kommen Sie um zehn Uhr."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Kommen Sie um zehn Uhr"), tr("deyin.")],
        expect: { kind: "repeat", target: "Kommen Sie um zehn Uhr" },
      },
      {
        say: [tr("Şimdi ikisini tek soruda birleştir: 'Cumartesi saat dokuzda olur mu?'")],
        expect: {
          kind: "produce",
          target: "Geht es am Samstag um neun Uhr",
          hint: [
            tr("Önce gün, sonra saat; her birinin kendi edatı var:"),
            de("Geht es am Samstag um neun Uhr?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de bekleme salonunda duyacağın cümle:"),
          de("Bitte warten Sie einen Moment."),
          tr("Yani 'Bir dakika bekleyin lütfen.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Bitte warten Sie einen Moment"), tr("deyin.")],
        expect: { kind: "repeat", target: "Bitte warten Sie einen Moment" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich komme um Mittwoch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich komme um Mittwoch.",
          answer: false,
          why: [
            tr("Yanlış. Saatlerin edatı günlerde kullanılmaz. Doğrusu:"),
            de("Ich komme am Mittwoch."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık telefonda randevu alabilirsin. Şimdi muayenehaneyi arıyorsun ve sekreter telefonu açıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir doktor muayenehanesini arayıp randevu alıyorsun. Neden geldiğini söyle, hangi gün ve saatin sana uyduğunu konuş.",
      partner: "telefonda hızlı konuşan, dolu takvimli bir sekreter",
      opening: "Praxis Doktor Weber, guten Tag! Was kann ich für Sie tun?",
      openingTr: "Doktor Weber muayenehanesi, iyi günler! Size nasıl yardımcı olabilirim?",
      goal: "Randevunun günü ve saati kesinleşmiş, yanında ne getirmen gerektiği söylenmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-muessen",
    icon: "doctor",
    level: "A1",
    course: "de",
    title: "Du musst zum Arzt!",
    titleTr: "Zorunluluk",
    summary:
      "Zorunluluk anlatmayı ve asıl fiilin neden cümlenin sonuna gittiğini öğretir.",
    minutes: 9,
    focusId: "Modalverb-müssen",
    vocab: [
      { de: "müssen", tr: "zorunda olmak" },
      { de: "krank", tr: "hasta" },
      { de: "das Fieber", tr: "ateş" },
      { de: "das Bett", tr: "yatak" },
      { de: "sofort", tr: "hemen" },
          { de: "sollen", tr: "-meli" },
      { de: "bekommen", tr: "almak" },
      { de: "sich kümmern", tr: "ilgilenmek" },
],
    patterns: [
      { de: "Ich muss …", tr: "bir şeyi yapmak zorunda olduğunu söyler" },
      { de: "Du musst zum Arzt.", tr: "karşındakine ne yapması gerektiğini söyler" },
      { de: "Musst du arbeiten?", tr: "zorunda olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün Almancanın çok işe yarayan bir yapısını öğreneceğiz: zorunluluk. Bir kez kavradığında bütün benzer fiiller aynı kalıba oturacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede zorunluluk fiilin içine girer: 'gitmeliyim' tek kelimedir. Almancada iş ikiye bölünür: çekimli fiil ikinci sıraya oturur, asıl fiil ise mastar hâlinde cümlenin en sonuna atılır. Bu sona atma alışkanlığı Almancanın imzası. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("müssen"),
          tr("Türkçesi 'zorunda olmak' demek. Lütfen"),
          de("müssen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "müssen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("krank"),
          tr("Türkçesi 'hasta' demek. Lütfen"),
          de("krank"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "krank" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Fieber"),
          tr("Türkçesi 'ateş' demek, yani vücut ateşi. Lütfen"),
          de("das Fieber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fieber" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Bett"),
          tr("Türkçesi 'yatak' demek. Lütfen"),
          de("das Bett"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bett" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("sofort"),
          tr("Türkçesi 'hemen' demek. Lütfen"),
          de("sofort"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sofort" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("sollen"),
          tr("Türkçesi '-meli' demek. Lütfen"),
          de("sollen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sollen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("bekommen"),
          tr("Türkçesi 'almak' demek. Lütfen"),
          de("bekommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bekommen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich kümmern"),
          tr("Türkçesi 'ilgilenmek' demek. Lütfen"),
          de("sich kümmern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich kümmern" },
      },
      {
        say: [
          tr("Şimdi kuralı bir cümlede gör:"),
          de("Ich muss arbeiten."),
          tr(
            "Çekimli fiil ikinci sırada, asıl fiil en sonda ve mastar hâlinde. Cümle uzasa da o son kelime hep sonda kalır.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich muss arbeiten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich muss arbeiten" },
      },
      {
        say: [tr("Sıra sende: 'Hemen yatmam lazım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich muss sofort ins Bett",
          accept: ["Ich muss sofort ins Bett gehen"],
          hint: [
            tr("Zaman kelimesi çekimli fiilden hemen sonra gelir:"),
            de("Ich muss sofort ins Bett."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımızda ilginç bir şey var:"),
          de("Du musst zum Arzt."),
          tr(
            "Asıl fiil hiç söylenmemiş. 'Gitmek' o kadar açık ki Almanlar onu düşürüyor; sen de düşürebilirsin.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Du musst zum Arzt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Du musst zum Arzt" },
      },
      {
        say: [
          tr("Doktora neden gittiğini de söyleyebilmelisin:"),
          de("Ich bin krank und habe Fieber."),
          tr("Yani 'Hastayım ve ateşim var.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin krank und habe Fieber"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin krank und habe Fieber" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız soru biçimi:"),
          de("Musst du arbeiten?"),
          tr("Soruda çekimli fiil en başa geçiyor, asıl fiil yine sonda kalıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Musst du arbeiten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Musst du arbeiten" },
      },
      {
        say: [tr("Bir üretim daha: 'Hemen doktora gitmelisin.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Du musst sofort zum Arzt",
          hint: [
            tr("Burada da asıl fiili söylemene gerek yok:"),
            de("Du musst sofort zum Arzt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich muss arbeiten heute."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich muss arbeiten heute.",
          answer: false,
          why: [
            tr("Yanlış. Asıl fiil en sonda durmalı, zaman kelimesi ondan önce gelir. Doğrusu:"),
            de("Ich muss heute arbeiten."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu kalıp bundan sonra sık sık karşına çıkacak. Şimdi hasta olduğu hâlde işe gitmekte direten bir arkadaşınla konuşuyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın hasta ama yine de işe gitmek istiyor. Ne yapması gerektiğini söyle ve doktora gitmeye ikna et.",
      partner: "inatçı, sürekli şikâyet eden ama sonunda ikna olan bir arkadaş",
      opening: "Mir geht es schlecht, aber ich muss heute arbeiten. Ist das ein Problem?",
      openingTr: "Kötüyüm ama bugün çalışmak zorundayım. Sorun olur mu?",
      goal: "Arkadaşın bugün işe gitmemeye ve doktora gitmeye ikna olmuş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-apotheke",
    icon: "pill",
    level: "A1",
    course: "de",
    title: "In der Apotheke",
    titleTr: "Eczanede",
    summary:
      "Eczanede ilaç almayı ve kibar emir biçimini anlamayı öğretir.",
    minutes: 8,
    focusId: "Imperativ-Sie",
    vocab: [
      { de: "die Apotheke", tr: "eczane" },
      { de: "die Tablette", tr: "hap" },
      { de: "nehmen", tr: "almak" },
      { de: "täglich", tr: "günlük" },
      { de: "das Rezept", tr: "reçete" },
          { de: "geben", tr: "vermek" },
      { de: "wenig", tr: "az" },
      { de: "drücken", tr: "basmak" },
],
    patterns: [
      { de: "Nehmen Sie die Tabletten.", tr: "ilacı nasıl alacağını söyler" },
      { de: "dreimal täglich", tr: "günde üç kez demek" },
      { de: "Haben Sie ein Rezept?", tr: "reçete olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün eczanedeyiz. Asıl işimiz konuşmak değil anlamak: eczacının söylediği talimatı kaçırırsan ilacı yanlış kullanırsın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Talimatlar hep aynı biçimde gelir. Türkçede emir eki fiile yapışır: 'alın'. Almancada fiil cümlenin en başına geçer, hemen arkasından da kibar hitap gelir. Bu biçimi bir kez tanıdın mı her tabelada, her yönergede göreceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Apotheke"),
          tr("Türkçesi 'eczane' demek. Lütfen"),
          de("die Apotheke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Apotheke" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Tablette"),
          tr("Türkçesi 'hap' demek. Lütfen"),
          de("die Tablette"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tablette" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("nehmen"),
          tr("Türkçesi 'almak' demek; ilaç için de bu fiil kullanılır. Lütfen"),
          de("nehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nehmen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("täglich"),
          tr("Türkçesi 'günlük, her gün' demek. Lütfen"),
          de("täglich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "täglich" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Rezept"),
          tr("Türkçesi 'reçete' demek. Lütfen"),
          de("das Rezept"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Rezept" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("geben"),
          tr("Türkçesi 'vermek' demek. Lütfen"),
          de("geben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geben" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("wenig"),
          tr("Türkçesi 'az' demek. Lütfen"),
          de("wenig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wenig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("drücken"),
          tr("Türkçesi 'basmak' demek. Lütfen"),
          de("drücken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "drücken" },
      },
      {
        say: [
          tr("Şimdi kibar emir. Fiil başa geçiyor, kibar hitap hemen arkasına geliyor:"),
          de("Nehmen Sie die Tabletten."),
          tr("Yani 'Hapları alın.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Nehmen Sie die Tabletten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Nehmen Sie die Tabletten" },
      },
      {
        say: [tr("Sıra sende: aynı biçimle 'Lütfen bekleyin.' nasıl denir?")],
        expect: {
          kind: "produce",
          target: "Warten Sie bitte",
          accept: ["Bitte warten Sie"],
          hint: [
            tr("Fiil başa, kibar hitap hemen arkasına:"),
            de("Warten Sie bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi sıklık. Kaç kez olduğunu tek kelimeyle söylersin:"),
          de("dreimal täglich"),
          tr("yani 'günde üç kez'. Ne zaman alınacağı da eklenir:"),
          de("vor dem Essen"),
          tr("yani 'yemekten önce'."),
        ],
      },
      {
        say: [tr("Lütfen"), de("dreimal täglich vor dem Essen"), tr("deyin.")],
        expect: { kind: "repeat", target: "dreimal täglich vor dem Essen" },
      },
      {
        say: [tr("Şimdi sen eczacı ol ve söyle: 'Bunu günde iki kez alın.'")],
        expect: {
          kind: "produce",
          target: "Nehmen Sie das zweimal täglich",
          hint: [
            tr("Sayı ile sıklık kelimesi birleşir, sonra günlük kelimesi gelir:"),
            de("Nehmen Sie das zweimal täglich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Eczaneye girdiğinde sana sorulacak ilk şey de bu:"),
          de("Haben Sie ein Rezept?"),
          tr("Reçetesiz alabildiğin ilaçlar da var ama önce hep bu sorulur."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Haben Sie ein Rezept"), tr("deyin.")],
        expect: { kind: "repeat", target: "Haben Sie ein Rezept" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Nehmen Sie die Tabletten dreimal täglich."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Nehmen Sie die Tabletten dreimal täglich.",
          answer: true,
          why: [
            tr("Doğru. Fiil en başta, kibar hitap hemen arkasında, sıklık ise sonda; talimat tam kuralına uygun."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık eczacının söylediğini anlarsın. Şimdi boğazın ağrıyor ve eczaneye giriyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Boğazın ağrıyor ve eczanedesin. Şikâyetini anlat, ilaç iste ve eczacının verdiği talimatı tekrar ederek doğru anladığından emin ol.",
      partner: "titiz, her şeyi tek tek açıklayan bir eczacı",
      opening: "Guten Tag! Haben Sie ein Rezept?",
      openingTr: "İyi günler! Reçeteniz var mı?",
      goal: "İlaç alınmış ve nasıl kullanılacağı tekrar edilerek doğru anlaşılmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-krank-melden",
    icon: "phone",
    level: "A1",
    course: "de",
    title: "Ich bin krank",
    titleTr: "İşe rapor bildirme",
    summary:
      "Telefonla işe hasta olduğunu bildirmeyi ve hastalıkta hangi fiilin kullanılacağını öğretir.",
    minutes: 8,
    focusId: "Sein-Haben",
    vocab: [
      { de: "die Erkältung", tr: "soğuk algınlığı" },
      { de: "der Husten", tr: "öksürük" },
      { de: "bleiben", tr: "kalmak" },
      { de: "die Besserung", tr: "iyileşme" },
      { de: "wieder", tr: "tekrar" },
          { de: "antworten", tr: "cevap vermek" },
      { de: "die Antwort", tr: "cevap" },
      { de: "weg sein", tr: "gitmiş olmak" },
],
    patterns: [
      { de: "Ich bin krank.", tr: "hasta olduğunu bildirir" },
      { de: "Ich komme heute nicht.", tr: "gelemeyeceğini söyler" },
      { de: "Gute Besserung!", tr: "geçmiş olsun demek" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün sabah sabah işi arayıp hasta olduğunu bildireceğiz. Üç kısa cümle yetiyor ama yanlış fiili seçersen cümle tuhaf duyuluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Ayrım şu: bir durumdaysan 'olmak' fiilini, elinde bir şey varsa 'sahip olmak' fiilini kullanırsın. Türkçede ikisi de aynı ekle biter, 'hastayım' ve 'nezleyim' dersin; Almancada iki ayrı fiil gerekir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Erkältung"),
          tr("Türkçesi 'soğuk algınlığı' demek. Lütfen"),
          de("die Erkältung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Erkältung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Husten"),
          tr("Türkçesi 'öksürük' demek. Lütfen"),
          de("der Husten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Husten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("bleiben"),
          tr("Türkçesi 'kalmak' demek. Lütfen"),
          de("bleiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bleiben" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Besserung"),
          tr("Türkçesi 'iyileşme' demek. Lütfen"),
          de("die Besserung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Besserung" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("wieder"),
          tr("Türkçesi 'tekrar, yine' demek. Lütfen"),
          de("wieder"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wieder" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("antworten"),
          tr("Türkçesi 'cevap vermek' demek. Lütfen"),
          de("antworten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "antworten" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Antwort"),
          tr("Türkçesi 'cevap' demek. Lütfen"),
          de("die Antwort"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Antwort" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("weg sein"),
          tr("Türkçesi 'gitmiş olmak' demek. Lütfen"),
          de("weg sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weg sein" },
      },
      {
        say: [
          tr("Şimdi iki fiili yan yana gör:"),
          de("Ich bin krank und habe eine Erkältung."),
          tr(
            "Hasta olmak bir durum, o yüzden 'olmak' fiili. Soğuk algınlığı ise elindeki bir şey, o yüzden 'sahip olmak' fiili.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin krank und habe eine Erkältung"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin krank und habe eine Erkältung" },
      },
      {
        say: [tr("Sıra sende: 'Öksürüğüm var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe Husten",
          accept: ["Ich habe einen Husten"],
          hint: [
            tr("Elindeki bir şey olduğu için 'sahip olmak' fiili gelir:"),
            de("Ich habe Husten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız asıl haberi verir:"),
          de("Ich komme heute nicht."),
          tr("Olumsuzluk kelimesinin cümlenin sonunda durduğunu hatırlıyorsun."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich komme heute nicht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich komme heute nicht" },
      },
      {
        say: [tr("Şimdi iyi haberi ver: 'Yarın tekrar geliyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich komme morgen wieder",
          hint: [
            tr("Önce zaman, sonra tekrar kelimesi gelir:"),
            de("Ich komme morgen wieder."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ne yapacağını da söylersin:"),
          de("Ich bleibe heute im Bett."),
          tr("Yani 'Bugün yatakta kalıyorum.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bleibe heute im Bett"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bleibe heute im Bett" },
      },
      {
        say: [
          tr("Telefonu kapatmadan önce mutlaka şunu duyacaksın:"),
          de("Gute Besserung!"),
          tr("Yani 'Geçmiş olsun!' Sen de hasta birine bunu söylersin."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Gute Besserung"), tr("deyin.")],
        expect: { kind: "repeat", target: "Gute Besserung" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe krank."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe krank.",
          answer: false,
          why: [
            tr("Yanlış. Hasta olmak bir durumdur, elinde tuttuğun bir şey değil. Doğrusu:"),
            de("Ich bin krank."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık sabah o telefonu açabilirsin. Şimdi patronunu arıyorsun ve sesinden zaten anlıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Sabah patronunu arayıp hasta olduğunu bildiriyorsun. Neyin olduğunu anlat, bugün gelemeyeceğini söyle ve ne zaman döneceğini belirt.",
      partner: "anlayışlı ama soru üstüne soru soran bir patron",
      opening: "Guten Morgen! Sie klingen gar nicht gut. Was ist los?",
      openingTr: "Günaydın! Sesiniz hiç iyi gelmiyor. Ne oldu?",
      goal: "Patronun durumu öğrenmiş ve ne zaman döneceğin konusunda anlaşılmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-imperativ-du",
    icon: "idea",
    level: "A1",
    course: "de",
    title: "Trink viel Wasser!",
    titleTr: "Arkadaşça öğüt",
    summary:
      "Bir arkadaşına öğüt verirken kullanılan senli emir biçimini öğretir.",
    minutes: 8,
    focusId: "Imperativ-du",
    vocab: [
      { de: "schlafen", tr: "uyumak" },
      { de: "die Sorge", tr: "endişe" },
      { de: "der Saft", tr: "meyve suyu" },
      { de: "der Honig", tr: "bal" },
      { de: "viel", tr: "çok" },
          { de: "lassen", tr: "bırakmak" },
      { de: "machen", tr: "yapmak" },
      { de: "sagen", tr: "söylemek" },
],
    patterns: [
      { de: "Trink viel Wasser!", tr: "bol su içmesini söyler" },
      { de: "Bleib im Bett!", tr: "yatakta kalmasını söyler" },
      { de: "Mach dir keine Sorgen!", tr: "endişelenmemesini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Emir kipinin ikinci yüzünü öğreneceğiz. Eczacının kibar biçimini biliyorsun; bugün arkadaşına öğüt verirken kullanacağın senli biçimi alacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kuralı çok kısa: karşındaki için çektiğin fiilden sonundaki iki harfi at, özneyi de söyleme. Kalan şey emir olur. Türkçede de emir fiilin en yalın hâlidir, bu yüzden mantık sana yabancı gelmeyecek. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("schlafen"),
          tr("Türkçesi 'uyumak' demek. Lütfen"),
          de("schlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schlafen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Sorge"),
          tr("Türkçesi 'endişe' demek. Lütfen"),
          de("die Sorge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sorge" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Saft"),
          tr("Türkçesi 'meyve suyu' demek. Lütfen"),
          de("der Saft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Saft" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Honig"),
          tr("Türkçesi 'bal' demek; Almanlar hastayken bala çok güvenir. Lütfen"),
          de("der Honig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Honig" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("viel"),
          tr("Türkçesi 'çok' demek. Lütfen"),
          de("viel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "viel" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("lassen"),
          tr("Türkçesi 'bırakmak' demek. Lütfen"),
          de("lassen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lassen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("machen"),
          tr("Türkçesi 'yapmak' demek. Lütfen"),
          de("machen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "machen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sagen"),
          tr("Türkçesi 'söylemek' demek. Lütfen"),
          de("sagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sagen" },
      },
      {
        say: [
          tr("Kuralı iş başında gör. Karşındaki için fiil"),
          de("du trinkst"),
          tr("biçimindeydi. Sondaki iki harfi at, özneyi söyleme, elinde emir kalır:"),
          de("Trink viel Wasser!"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Trink viel Wasser"), tr("deyin.")],
        expect: { kind: "repeat", target: "Trink viel Wasser" },
      },
      {
        say: [
          tr("Sesli harfi değişen fiillerde iki ayrı davranış var, ikisini de duy:"),
          de("du sprichst"),
          tr("biçimindeki değişiklik emirde de kalır,"),
          de("Sprich!"),
          tr("dersin. Ama"),
          de("du schläfst"),
          tr("biçimindeki iki noktalı harf emirde düz hâline döner:"),
          de("Schlaf!"),
        ],
      },
      {
        say: [tr("Sıra sende: arkadaşına 'Bol bol uyu!' de.")],
        expect: {
          kind: "produce",
          target: "Schlaf viel",
          hint: [
            tr("Özne söylenmez ve bu fiilde iki noktalı harf düz hâline döner:"),
            de("Schlaf viel!"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci öğüdümüz:"),
          de("Bleib im Bett!"),
          tr("Yani 'Yatakta kal!' Aynı kural, aynı sadelik."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Bleib im Bett"), tr("deyin.")],
        expect: { kind: "repeat", target: "Bleib im Bett" },
      },
      {
        say: [tr("Bir tane daha: 'Yavaş konuş!' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sprich langsam",
          hint: [
            tr("Bu fiil sen biçiminde ortadaki sesini değiştiriyordu; emirde de öyle kalır:"),
            de("Sprich langsam!"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımızı parçalara ayırma, olduğu gibi ezberle:"),
          de("Mach dir keine Sorgen!"),
          tr("Yani 'Merak etme, kafana takma.' Hasta bir arkadaşa söyleyeceğin en iyi cümle."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mach dir keine Sorgen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mach dir keine Sorgen" },
      },
      {
        say: [
          tr("Bir de klasik ev tarifi:"),
          de("Trink Tee mit Honig!"),
          tr("Küçük bir ayrıntı:"),
          de("viel"),
          tr("sayılamayan şeyler için,"),
          de("viele"),
          tr("sayılabilenler için kullanılır."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Schlaf gut!"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Schlaf gut!",
          answer: true,
          why: [
            tr("Doğru. Fiil yalın hâlde, özne söylenmemiş; senli emrin tam kendisi. Almanlar bunu her akşam birbirine söyler."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık arkadaşça öğüt verebilirsin. Şimdi gribe yakalanmış bir arkadaşını arıyorsun ve ne yapması gerektiğini söylüyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Gribe yakalanan arkadaşını arıyorsun. Senli emir biçimiyle ona öğüt ver: ne içsin, ne yapsın, neye takılmasın.",
      partner: "kendine bakmayı hiç beceremeyen, biraz mızmız bir arkadaş",
      opening: "Ich bin so erkältet! Hast du einen Tipp für mich?",
      openingTr: "Fena üşütmüşüm! Bana bir tavsiyen var mı?",
      goal: "Arkadaşına en az üç öğüt verilmiş ve o ne yapacağını söylemiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-notruf",
    icon: "phone",
    level: "A1",
    course: "de",
    title: "Der Notruf",
    titleTr: "Acil durum",
    summary:
      "Acil durumda yardım çağırmayı ve telefonda en gerekli bilgileri vermeyi öğretir.",
    minutes: 8,
    focusId: "Imperativ-Sie",
    vocab: [
      { de: "der Notruf", tr: "acil çağrı" },
      { de: "der Unfall", tr: "kaza" },
      { de: "rufen", tr: "çağırmak" },
      { de: "die Hilfe", tr: "yardım" },
      { de: "die Polizei", tr: "polis" },
          { de: "das Krankenhaus", tr: "hastane" },
      { de: "die Achtung", tr: "dikkat" },
      { de: "die Lösung", tr: "çözüm" },
],
    patterns: [
      { de: "Rufen Sie den Notarzt!", tr: "ambulans çağırmasını söyler" },
      { de: "Hier ist ein Unfall.", tr: "kaza olduğunu bildirir" },
      { de: "Bleiben Sie ruhig.", tr: "sakin kalmasını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugünkü ders umarım hiç işine yaramaz ama gerektiğinde saniyeler değerlidir. Acil durumda söylenecek cümleleri öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Acil numarası Almanya'da ve bütün Avrupa'da aynı: bir bir iki. Telefonda uzun cümle kurmana gerek yok; kibar emir biçimi ve üç kısa bilgi yeter. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Notruf"),
          tr("Türkçesi 'acil çağrı' demek. Lütfen"),
          de("der Notruf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Notruf" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Unfall"),
          tr("Türkçesi 'kaza' demek. Lütfen"),
          de("der Unfall"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Unfall" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("rufen"),
          tr("Türkçesi 'çağırmak' demek. Lütfen"),
          de("rufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rufen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Hilfe"),
          tr("Türkçesi 'yardım' demek. Lütfen"),
          de("die Hilfe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Hilfe" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Polizei"),
          tr("Türkçesi 'polis' demek. Lütfen"),
          de("die Polizei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Polizei" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Krankenhaus"),
          tr("Türkçesi 'hastane' demek. Lütfen"),
          de("das Krankenhaus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Krankenhaus" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Achtung"),
          tr("Türkçesi 'dikkat' demek. Lütfen"),
          de("die Achtung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Achtung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Lösung"),
          tr("Türkçesi 'çözüm' demek. Lütfen"),
          de("die Lösung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Lösung" },
      },
      {
        say: [
          tr("Şimdi en önemli cümle. Kibar emir biçimini tanıyorsun:"),
          de("Rufen Sie den Notarzt!"),
          tr("Yani 'Acil doktoru çağırın!' Buradaki nesne belirli ve eril olduğu için"),
          de("den"),
          tr("biçiminde geldi; bildiğin nesne kuralının belirli hâli."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Rufen Sie den Notarzt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Rufen Sie den Notarzt" },
      },
      {
        say: [tr("Sıra sende: 'Lütfen yardım çağırın!' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Rufen Sie bitte Hilfe",
          accept: ["Bitte rufen Sie Hilfe"],
          hint: [
            tr("Fiil başta, kibar hitap hemen arkasında; yardım kelimesi burada artikel almaz:"),
            de("Rufen Sie bitte Hilfe!"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Telefondaki görevliye ne olduğunu söylemen gerek:"),
          de("Hier ist ein Unfall."),
          tr("Yani 'Burada bir kaza var.' Sonra nerede olduğunu söylersin; adres yeter, cümle kurmana bile gerek yok."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Hier ist ein Unfall"), tr("deyin.")],
        expect: { kind: "repeat", target: "Hier ist ein Unfall" },
      },
      {
        say: [
          tr("Görevlinin sana söyleyeceği ilk şey de şu olacak:"),
          de("Bleiben Sie ruhig."),
          tr("Yani 'Sakin olun.' Aynı kibar emir biçimi."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Bleiben Sie ruhig"), tr("deyin.")],
        expect: { kind: "repeat", target: "Bleiben Sie ruhig" },
      },
      {
        say: [tr("Şimdi iki emri birleştir: 'Sakin olun ve bekleyin.'")],
        expect: {
          kind: "produce",
          target: "Bleiben Sie ruhig und warten Sie",
          hint: [
            tr("İki emri bağlarken ikincisinde de kibar hitap tekrarlanır:"),
            de("Bleiben Sie ruhig und warten Sie."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Polis gerekiyorsa aynı kalıp işini görür:"),
          de("Rufen Sie die Polizei!"),
          tr("Bu kelime dişil olduğu için nesne hâlinde değişmiyor."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ruf Sie den Notarzt!"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ruf Sie den Notarzt!",
          answer: false,
          why: [
            tr("Yanlış. Burada senli emir ile kibar hitap karışmış. Kibar biçimde fiil mastar gibi kalır. Doğrusu:"),
            de("Rufen Sie den Notarzt!"),
          ],
        },
      },
      {
        say: [
          tr(
            "Umarım hiç kullanmazsın ama artık bu cümleler sende. Şimdi sokakta bir kaza gördün ve acil çağrı hattını arıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Sokakta bir kaza gördün ve acil çağrı hattını aradın. Ne olduğunu, nerede olduğunu söyle ve görevlinin sorularına kısa kısa cevap ver.",
      partner: "sakin sesli, adım adım yönlendiren bir acil çağrı görevlisi",
      opening: "Notruf eins eins zwei, guten Tag. Wo sind Sie?",
      openingTr: "Acil çağrı yüz on iki, iyi günler. Neredesiniz?",
      goal: "Kazanın yeri ve durumu bildirilmiş, görevli ekibin yola çıktığını söylemiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-gesund-leben",
    icon: "run",
    level: "A1",
    course: "de",
    title: "Gesund leben",
    titleTr: "Sağlıklı yaşam",
    summary:
      "Herkes için geçerli sağlık kurallarını 'man' öznesiyle anlatmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-müssen",
    vocab: [
      { de: "gesund", tr: "sağlıklı" },
      { de: "rauchen", tr: "sigara içmek" },
      { de: "genug", tr: "yeterince" },
      { de: "sich bewegen", tr: "hareket etmek" },
      { de: "wichtig", tr: "önemli" },
          { de: "leben", tr: "yaşamak" },
      { de: "das Ergebnis", tr: "sonuç" },
      { de: "hoch", tr: "yüksek" },
],
    patterns: [
      { de: "Man muss …", tr: "herkes için geçerli bir kural söyler" },
      { de: "Man muss mehr Obst essen.", tr: "daha fazlasını önerir" },
      { de: "Das ist wichtig.", tr: "bir şeyin önemli olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün genel geçer kurallar konuşacağız: ne yapmak gerekir, ne yapmamak gerekir. Bunun için bildiğin iki parçayı birleştireceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'bol su içmeli' dersin ve kimin içmesi gerektiğini söylemene gerek kalmaz. Almancada özne asla boş bırakılmaz; herkesi anlatan küçük bir özne konur. O özneyi harfleme dersinde tanımıştın, bugün zorunluluk kalıbıyla birlikte kullanacağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("gesund"),
          tr("Türkçesi 'sağlıklı' demek. Lütfen"),
          de("gesund"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gesund" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("rauchen"),
          tr("Türkçesi 'sigara içmek' demek. Lütfen"),
          de("rauchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rauchen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("genug"),
          tr("Türkçesi 'yeterince' demek. Lütfen"),
          de("genug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "genug" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz iki parçadan oluşuyor:"),
          de("sich bewegen"),
          tr("Türkçesi 'hareket etmek' demek. Lütfen"),
          de("sich bewegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich bewegen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("wichtig"),
          tr("Türkçesi 'önemli' demek. Lütfen"),
          de("wichtig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wichtig" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("leben"),
          tr("Türkçesi 'yaşamak' demek. Lütfen"),
          de("leben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leben" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Ergebnis"),
          tr("Türkçesi 'sonuç' demek. Lütfen"),
          de("das Ergebnis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ergebnis" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("hoch"),
          tr("Türkçesi 'yüksek' demek. Lütfen"),
          de("hoch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hoch" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Man muss gesund essen."),
          tr(
            "Yani 'Sağlıklı beslenmek gerekir.' Baştaki küçük özne 'herkes' demekti; zorunluluk kuralı da aynı işliyor, asıl fiil en sonda.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Man muss gesund essen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Man muss gesund essen" },
      },
      {
        say: [tr("Sıra sende: 'Yeterince uyumak gerekir.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Man muss genug schlafen",
          hint: [
            tr("Miktar kelimesi ortada, asıl fiil en sonda kalır:"),
            de("Man muss genug schlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımızda karşılaştırma yapıyoruz:"),
          de("Man muss mehr Obst essen."),
          tr("Tersi de aynı kolaylıkta kurulur:"),
          de("Man muss weniger Zucker essen."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Man muss mehr Obst essen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Man muss mehr Obst essen" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Daha az şeker yemek gerekir.'")],
        expect: {
          kind: "produce",
          target: "Man muss weniger Zucker essen",
          hint: [
            tr("Azlık kelimesi de tıpkı çokluk kelimesi gibi adın önüne gelir:"),
            de("Man muss weniger Zucker essen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir fiilin kendisi de özne olabilir:"),
          de("Rauchen ist nicht gesund."),
          tr("Türkçede 'sigara içmek sağlıklı değil' dersin ya, birebir aynısı."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Rauchen ist nicht gesund"), tr("deyin.")],
        expect: { kind: "repeat", target: "Rauchen ist nicht gesund" },
      },
      {
        say: [
          tr("Hareket için de aynı kalıp:"),
          de("Man muss sich viel bewegen."),
          tr("Sonunda da hükmünü verirsin:"),
          de("Das ist sehr wichtig."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist sehr wichtig"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist sehr wichtig" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Man muss viel Wasser trinken."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Man muss viel Wasser trinken.",
          answer: true,
          why: [
            tr("Doğru. Genel özne tek kişi sayılır, zorunluluk fiili ona göre çekilmiş ve asıl fiil cümlenin sonunda; her şey yerinde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık öneri verebilir ve alabilirsin. Şimdi doktorun kontrolündesin ve alışkanlıklarını soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yıllık kontrol için doktordasın ve alışkanlıklarını soruyor. Ne yediğini ve ne yaptığını anlat, doktorun önerilerine kendi cümlelerinle karşılık ver.",
      partner: "biraz sert konuşan ama iyi niyetli bir doktor",
      opening: "Sie sind oft müde, sagen Sie. Was essen Sie jeden Tag?",
      openingTr: "Sık sık yorgun olduğunuzu söylüyorsunuz. Her gün ne yiyorsunuz?",
      goal: "Alışkanlıkların anlatılmış ve doktorun önerdiği bir değişikliği kabul etmiş olursun.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-beim-zahnarzt",
    icon: "tooth",
    level: "A1",
    course: "de",
    title: "Beim Zahnarzt",
    titleTr: "Diş hekiminde",
    summary:
      "Diş ağrısını anlatmayı ve diş hekiminin kısa yönergelerini anlamayı öğretir.",
    minutes: 8,
    focusId: "Dativ-gefallen",
    vocab: [
      { de: "der Zahn", tr: "diş" },
      { de: "der Zahnarzt", tr: "diş hekimi" },
      { de: "der Mund", tr: "ağız" },
      { de: "öffnen", tr: "açmak" },
      { de: "ziehen", tr: "çekmek" },
          { de: "die Angst", tr: "korku" },
      { de: "der Schluss", tr: "bitiş" },
      { de: "möchten", tr: "istemek" },
],
    patterns: [
      { de: "Mir tut der Zahn weh.", tr: "diş ağrısını söyler" },
      { de: "Bitte den Mund öffnen.", tr: "ağzını açmasını ister" },
      { de: "Es zieht ein bisschen.", tr: "biraz canının yanacağını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bu modülün son dersindeyiz ve en korkulan koltuğa oturuyoruz: diş hekimi. Öğrendiğin ağrı kalıbı bugün gerçek bir sahnede işe yarayacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Burada yeni bir kural yok; ağrı kalıbı, randevu kalıbı ve zorunluluk kalıbı bir araya geliyor. Yeni olan tek şey, hekimin kısa yönergeleri: onları anlaman yeter, kurman gerekmez. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Zahn"),
          tr("Türkçesi 'diş' demek. Lütfen"),
          de("der Zahn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zahn" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Zahnarzt"),
          tr("Türkçesi 'diş hekimi' demek. Lütfen"),
          de("der Zahnarzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zahnarzt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Mund"),
          tr("Türkçesi 'ağız' demek. Lütfen"),
          de("der Mund"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mund" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("öffnen"),
          tr("Türkçesi 'açmak' demek. Lütfen"),
          de("öffnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "öffnen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("ziehen"),
          tr("Türkçesi 'çekmek' demek. Lütfen"),
          de("ziehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ziehen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Angst"),
          tr("Türkçesi 'korku' demek. Lütfen"),
          de("die Angst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Angst" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Schluss"),
          tr("Türkçesi 'bitiş' demek. Lütfen"),
          de("der Schluss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schluss" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("möchten"),
          tr("Türkçesi 'istemek' demek. Lütfen"),
          de("möchten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "möchten" },
      },
      {
        say: [
          tr("Şimdi ağrı kalıbımız yeni bir yerde:"),
          de("Mir tut der Zahn weh."),
          tr("Hatırlıyorsun: ağrıyan kişi 'bana' biçiminde, ağrıyan yer artikeliyle duruyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mir tut der Zahn weh"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mir tut der Zahn weh" },
      },
      {
        say: [tr("Sıra sende: 'Ağzım ağrıyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mir tut der Mund weh",
          hint: [
            tr("Kalıp aynı kalır, yalnızca ağrıyan yer değişir:"),
            de("Mir tut der Mund weh."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Koltuğa oturur oturmaz duyacağın cümle:"),
          de("Bitte den Mund öffnen."),
          tr(
            "Burada fiil mastar hâlinde ve en sonda. Almanlar kısa yönergeleri böyle verir: kimseye hitap etmeden, doğrudan işi söyleyerek.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Bitte den Mund öffnen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Bitte den Mund öffnen" },
      },
      {
        say: [
          tr("Bu cümleyi duyunca da hazırlıklı ol:"),
          de("Es zieht ein bisschen."),
          tr("Yani 'Biraz canın yanacak.' Hekimin nazik uyarısı budur."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es zieht ein bisschen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es zieht ein bisschen" },
      },
      {
        say: [
          tr("Randevu kalıbını da hatırlayalım:"),
          de("Ich habe einen Termin beim Zahnarzt."),
          tr("Buradaki küçük kelime, edatla artikelin kaynaşmış hâli."),
        ],
      },
      {
        say: [tr("Bir üretim daha: 'Diş hekimine gitmem lazım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich muss zum Zahnarzt",
          hint: [
            tr("Zorunluluk kalıbında 'gitmek' fiilini söylemene gerek yoktu:"),
            de("Ich muss zum Zahnarzt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe einen Termin beim Arzt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe einen Termin beim Arzt.",
          answer: true,
          why: [
            tr("Doğru. Randevu eril ve nesne olduğu için o ek gelmiş, edat da artikelle kaynaşmış; iki yer de kurallı."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu modülü bitirdin: artık neyin ağrıdığını anlatabilir, randevu alabilir, ilacını doğru kullanabilir ve gerektiğinde yardım çağırabilirsin. Şimdi o koltuğa oturuyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Diş hekiminin koltuğundasın. Hangi dişinin ne zamandır ağrıdığını anlat ve hekimin yönergelerine karşılık ver.",
      partner: "neşeli, durmadan konuşan bir diş hekimi",
      opening: "So, machen Sie bitte den Mund auf. Wo tut es weh?",
      openingTr: "Evet, lütfen ağzınızı açın. Neresi ağrıyor?",
      goal: "Ağrıyan diş bulunmuş ve ne yapılacağı söylenmiş olur.",
      minTurns: 6,
    },
  },
];

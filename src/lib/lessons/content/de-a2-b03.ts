import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 3 — konular 021-030 (Modül 3: Sağlık).
 *
 * A1'de sağlık "derdini söyleyebilmek"ti; burada konu bir tedaviyi
 * YÖNETMEYE dönüşüyor ve bunun dili üç kip fiilinin ayrışmasından geçiyor:
 * müssen zorunluluk, sollen başkasının söylediği, dürfen izin. Araya
 * dönüşlü fiiller giriyor — Türkçede karşılığı olmayan o küçük zamir
 * olmadan "kendimi kötü hissediyorum" cümlesi kurulamıyor, bu yüzden
 * modül boyunca üç ayrı derste geri geliyor.
 */
export const deA2B03: Lesson[] = [
  {
    id: "de-a2-arzt",
    icon: "doctor",
    level: "A2",
    course: "de",
    title: "Beim Arzt",
    titleTr: "Doktorda",
    summary: "Öneri almayı ve vermeyi öğretir: sollen kipi üç kalıpta.",
    minutes: 9,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "das Fieber", tr: "ateş" },
      { de: "die Tablette", tr: "hap" },
      { de: "nehmen", tr: "almak" },
      { de: "schlafen", tr: "uyumak" },
      { de: "der Husten", tr: "öksürük" },
    ],
    patterns: [
      { de: "Du sollst …", tr: "birine bir şey yapmasını önerirken kullanılır" },
      { de: "Ich soll …", tr: "kendi yapman gerekeni söylerken kullanılır" },
      { de: "Was soll ich tun?", tr: "'Ne yapmalıyım?' diye sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün doktordayız! 'Sen yapmalısın', 'Ben yapmalıyım' ve 'Ne yapmalıyım?' kalıplarını öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr("Bugünün fiili"),
          de("sollen"),
          tr(
            "ve birinin yapması gereken şeyi söyler. Doktor sana, sen kendine — bu ders boyunca hep onu kullanacağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Fieber"),
          tr("Türkçesi 'ateş' demek. Lütfen"),
          de("das Fieber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fieber" },
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
          tr("Türkçesi 'almak' demek. Lütfen"),
          de("nehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nehmen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schlafen"),
          tr("Türkçesi 'uyumak' demek. Lütfen"),
          de("schlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schlafen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Husten"),
          tr("Türkçesi 'öksürük' demek. Lütfen"),
          de("der Husten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Husten" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Du sollst …"),
          tr(
            "Birine bir şey yapmasını önerirken kullanılır: 'Sen … yapmalısın' demek. Asıl fiil cümlenin sonuna gider.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sen bir hap almalısın.' Almancası:"),
          de("Du sollst eine Tablette nehmen."),
          tr("Lütfen"),
          de("Du sollst eine Tablette nehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Du sollst eine Tablette nehmen" },
      },
      {
        say: [tr("Şimdi sıra sende: 'Sen uyumalısın.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Du sollst schlafen",
          hint: [
            tr("Kalıp:"),
            de("Du sollst"),
            tr("artı fiil, fiil sonda:"),
            de("Du sollst schlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich soll …"),
          tr("Kendi yapman gerekeni söylerken kullanılır: 'Ben … yapmalıyım' demek."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ben bir hap almalıyım.' Almancası:"),
          de("Ich soll eine Tablette nehmen."),
          tr("Lütfen"),
          de("Ich soll eine Tablette nehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich soll eine Tablette nehmen" },
      },
      {
        say: [tr("Peki 'Ben uyumalıyım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich soll schlafen",
          hint: [
            tr("Aynı kalıp, özne değişti:"),
            de("Ich soll schlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız bir soru:"),
          de("Was soll ich tun?"),
          tr("'Ne yapmalıyım?' demek. Doktora tam da bunu soracaksın. Lütfen"),
          de("Was soll ich tun?"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Was soll ich tun" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich soll ein Tablette nehmen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich soll ein Tablette nehmen.",
          answer: false,
          why: [
            de("die Tablette"),
            tr("dişil bir kelime; 'ein' değil 'eine' olmalı. Doğrusu:"),
            de("Ich soll eine Tablette nehmen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Çok iyi gidiyorsun. Şimdi doktorun karşısındasın: derdini anlat, ne yapman gerektiğini sor ve önerileri dinle.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Kendini iyi hissetmiyorsun ve doktora geldin. Şikâyetini anlat (ateş, öksürük), doktora 'Was soll ich tun?' diye sor ve sana söylediklerini 'Ich soll …' ile onayla.",
      partner: "sakin ve ilgili bir doktor",
      opening: "Guten Tag! Was fehlt Ihnen denn?",
      openingTr: "İyi günler! Neyiniz var?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-symptome",
    icon: "doctor",
    level: "A2",
    course: "de",
    title: "Ich fühle mich schlapp",
    titleTr: "Belirtiler",
    summary:
      "Kendini nasıl hissettiğini anlatmayı ve dönüşlü fiillerin küçük zamirini öğretir.",
    minutes: 9,
    focusId: "Reflexivverben",
    vocab: [
      { de: "sich fühlen", tr: "kendini hissetmek" },
      { de: "schlapp", tr: "bitkin" },
      { de: "schwindlig", tr: "başı dönen" },
      { de: "übel", tr: "midesi bulanan" },
      { de: "die Grippe", tr: "grip" },
    ],
    patterns: [
      { de: "Ich fühle mich …", tr: "kendini nasıl hissettiğini söyler" },
      { de: "Ich habe mich erkältet.", tr: "üşüttüğünü söyler" },
      { de: "Mir ist übel.", tr: "midesinin bulandığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Doktorun ilk sorusu 'neyiniz var' değil, 'kendinizi nasıl hissediyorsunuz' olur. Bugün tam bunun cevabını kuracağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bunun için yeni bir fiil türü lazım. Bazı Almanca fiiller yanlarında küçük bir zamir taşır ve o zamir olmadan cümle kurulmaz. Türkçede böyle bir şey yok; biz 'hissediyorum' deyip bitiriyoruz. Almancada 'kendimi' demek zorundasın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz iki parçadan oluşuyor:"),
          de("sich fühlen"),
          tr("Türkçesi 'kendini hissetmek' demek. Lütfen"),
          de("sich fühlen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich fühlen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("schlapp"),
          tr("Türkçesi 'bitkin, hâlsiz' demek. Lütfen"),
          de("schlapp"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schlapp" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("schwindlig"),
          tr("Türkçesi 'başı dönen' demek. Lütfen"),
          de("schwindlig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwindlig" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("übel"),
          tr("Türkçesi 'midesi bulanan' demek. Lütfen"),
          de("übel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "übel" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Grippe"),
          tr("Türkçesi 'grip' demek. Lütfen"),
          de("die Grippe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Grippe" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Ich fühle mich schlapp."),
          tr(
            "Ortadaki küçük kelime 'kendimi' demek ve atılamaz. Zamir kişiye göre değişir: sen için",
          ),
          de("dich"),
          tr("o için"),
          de("sich"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich fühle mich schlapp"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich fühle mich schlapp" },
      },
      {
        say: [tr("Sıra sende: 'Kendimi iyi hissetmiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich fühle mich nicht gut",
          hint: [
            tr("Küçük zamir fiilden hemen sonra gelir, olumsuzluk ise sonda:"),
            de("Ich fühle mich nicht gut."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız geçmiş zamanda:"),
          de("Ich habe mich erkältet."),
          tr("Yani 'Üşüttüm.' Zamir yardımcı fiilden hemen sonra, ortaç ise yine en sonda."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe mich erkältet"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe mich erkältet" },
      },
      {
        say: [
          tr("Üçüncü kalıp bambaşka çalışıyor:"),
          de("Mir ist übel."),
          tr(
            "Burada 'ben' değil 'bana' deniyor, tıpkı ağrı anlatırkenki gibi. Bunu bir kalıp olarak ezberle.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mir ist übel"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mir ist übel" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Başım dönüyor.'")],
        expect: {
          kind: "produce",
          target: "Mir ist schwindlig",
          hint: [
            tr("Aynı kalıp, yalnızca son kelime değişir:"),
            de("Mir ist schwindlig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Teşhis konduğunda da duyacağın cümle hazır:"),
          de("Sie haben eine Grippe."),
          tr("Yani 'Grip olmuşsunuz.'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Meine Tochter hat sich erkältet."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Meine Tochter hat sich erkältet.",
          answer: true,
          why: [
            tr("Doğru. Bu fiil küçük zamirini almış, zamir yardımcı fiilin hemen arkasına oturmuş ve ortaç sonda kalmış."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık halini tarif edebilirsin. Şimdi muayenehanedesin ve doktordan önce hemşire seni alıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Muayenehanede doktordan önce hemşire seni alıp belirtilerini kaydediyor. Kendini nasıl hissettiğini, ne zamandır sürdüğünü ve neyin olduğunu anlat.",
      partner: "hızlı çalışan, doğrudan soru soran bir hemşire",
      opening: "Bevor der Arzt kommt: Wie fühlen Sie sich heute?",
      openingTr: "Doktor gelmeden önce: bugün kendinizi nasıl hissediyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-duerfen",
    icon: "doctor",
    level: "A2",
    course: "de",
    title: "Das dürfen Sie nicht!",
    titleTr: "İzin ve yasak",
    summary:
      "İzin istemeyi, yasağı anlamayı ve üç kip fiilinin birbirinden nasıl ayrıldığını öğretir.",
    minutes: 9,
    focusId: "Modalverb-dürfen",
    vocab: [
      { de: "dürfen", tr: "izinli olmak" },
      { de: "erlaubt", tr: "izinli" },
      { de: "verboten", tr: "yasak" },
      { de: "der Alkohol", tr: "alkol" },
      { de: "die Ausnahme", tr: "istisna" },
    ],
    patterns: [
      { de: "Sie dürfen nicht …", tr: "bir şeyin yasak olduğunu söyler" },
      { de: "Darf ich …?", tr: "izin ister" },
      { de: "Das ist erlaubt.", tr: "bir şeyin serbest olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün elindeki kip fiilleri ayıracağız. Üçüncüsünü öğrenince hangisini ne zaman kullanacağın netleşecek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede tek bir ek üç işi birden görür: 'yapabilirim' hem yeteneği hem izni anlatır. Almanca bunları ayırır. Yetenek için bir fiil, zorunluluk için bir fiil, başkasının söylediği için bir fiil, izin için de bugün öğreneceğimiz fiil var. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("dürfen"),
          tr("Türkçesi 'izinli olmak' demek. Lütfen"),
          de("dürfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dürfen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("erlaubt"),
          tr("Türkçesi 'izinli, serbest' demek. Lütfen"),
          de("erlaubt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erlaubt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("verboten"),
          tr("Türkçesi 'yasak' demek. Lütfen"),
          de("verboten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verboten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Alkohol"),
          tr("Türkçesi 'alkol' demek. Lütfen"),
          de("der Alkohol"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Alkohol" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Ausnahme"),
          tr("Türkçesi 'istisna' demek. Lütfen"),
          de("die Ausnahme"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ausnahme" },
      },
      {
        say: [
          tr("Farkı üç cümlede duy. Zorunluluk:"),
          de("Ich muss Tabletten nehmen."),
          tr("Başkasının söylediği:"),
          de("Ich soll Tabletten nehmen."),
          tr("İzin:"),
          de("Ich darf Tabletten nehmen."),
          tr("Üçü de aynı iskelette duruyor, değişen tek şey ortadaki fiil."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız yasağı söyler:"),
          de("Sie dürfen nicht rauchen."),
          tr("Yani 'Sigara içmeniz yasak.' Doktorlar yasağı tam bu cümleyle kurar."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Sie dürfen nicht rauchen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Sie dürfen nicht rauchen" },
      },
      {
        say: [tr("Sıra sende: 'Alkol almamalısınız, yani yasak.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sie dürfen keinen Alkohol trinken",
          hint: [
            tr("Adı olumsuzlarken o kelimeyi kullanıyorduk ve alkol eril bir nesne:"),
            de("Sie dürfen keinen Alkohol trinken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız izin ister:"),
          de("Darf ich aufstehen?"),
          tr("Soruda kip fiili en başa geçiyor, asıl fiil yine sonda kalıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Darf ich aufstehen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Darf ich aufstehen" },
      },
      {
        say: [tr("Şimdi sen sor: 'Duş alabilir miyim?'")],
        expect: {
          kind: "produce",
          target: "Darf ich duschen",
          hint: [
            tr("Kip fiili başta, asıl fiil sonda:"),
            de("Darf ich duschen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Cevap iki türlü gelir:"),
          de("Das ist erlaubt."),
          tr("ya da"),
          de("Das ist leider verboten."),
          tr("Bir de kapı aralayan cümle var:"),
          de("Wir machen eine Ausnahme."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist leider verboten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist leider verboten" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Darf ich hier rauchen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Darf ich hier rauchen?",
          answer: true,
          why: [
            tr("Doğru. İzin sorarken kip fiili başa geçer, yer bildiren kelime ortada durur ve asıl fiil sonda kalır."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık neyin serbest neyin yasak olduğunu konuşabilirsin. Şimdi bir tedavinin ardından doktorun sana bir haftalık kuralları anlatıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir tedavinin ardından doktorun bir hafta boyunca uyman gereken kuralları anlatıyor. Neyi yapıp yapamayacağını tek tek sor ve yasakları teyit et.",
      partner: "kuralcı ama esprili bir doktor",
      opening: "Eine Woche lang gibt es ein paar Regeln. Haben Sie Fragen?",
      openingTr: "Bir hafta boyunca birkaç kural var. Sorunuz var mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-hausmittel",
    icon: "food",
    level: "A2",
    course: "de",
    title: "Omas Hausmittel",
    titleTr: "Ev çareleri",
    summary:
      "Yumuşak tavsiye vermeyi ve ev çarelerini anlatmayı öğretir.",
    minutes: 8,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "das Hausmittel", tr: "ev çaresi" },
      { de: "der Ingwer", tr: "zencefil" },
      { de: "die Zitrone", tr: "limon" },
      { de: "wirken", tr: "etki etmek" },
      { de: "der Tipp", tr: "tavsiye" },
    ],
    patterns: [
      { de: "Du solltest …", tr: "yumuşak bir tavsiye verir" },
      { de: "Tee mit Honig hilft.", tr: "neyin iyi geldiğini söyler" },
      { de: "Ich habe einen Tipp für dich.", tr: "bir tavsiyesi olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün Alman büyükannelerinin ilaç kutusunu açıyoruz. Bir de tavsiyeyi nazikleştirmenin yolunu öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Öneri fiilinin bir de yumuşak biçimi var. Sert hâli emir gibi duyulur, yumuşak hâli ise 'bence şöyle yapsan iyi olur' der. Arkadaşına akıl verirken hep yumuşak olanı kullanacaksın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Hausmittel"),
          tr("Türkçesi 'ev çaresi' demek. Lütfen"),
          de("das Hausmittel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Hausmittel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Ingwer"),
          tr("Türkçesi 'zencefil' demek. Lütfen"),
          de("der Ingwer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Ingwer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Zitrone"),
          tr("Türkçesi 'limon' demek. Lütfen"),
          de("die Zitrone"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zitrone" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("wirken"),
          tr("Türkçesi 'etki etmek' demek. Lütfen"),
          de("wirken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wirken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Tipp"),
          tr("Türkçesi 'tavsiye, öneri' demek. Lütfen"),
          de("der Tipp"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tipp" },
      },
      {
        say: [
          tr("Farkı yan yana duy. Sert biçim:"),
          de("Du sollst mehr schlafen."),
          tr("Yumuşak biçim:"),
          de("Du solltest mehr schlafen."),
          tr("Tek harflik fark ama biri talimat, öbürü tavsiye gibi duyuluyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Du solltest mehr schlafen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Du solltest mehr schlafen" },
      },
      {
        say: [tr("Sıra sende: 'Bol bol su içmelisin.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Du solltest viel Wasser trinken",
          hint: [
            tr("Yumuşak biçimi kullan ve asıl fiili sona at:"),
            de("Du solltest viel Wasser trinken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız neyin iyi geldiğini söyler:"),
          de("Tee mit Honig hilft gegen Husten."),
          tr("Yani 'Ballı çay öksürüğe iyi gelir.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Tee mit Honig hilft gegen Husten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Tee mit Honig hilft gegen Husten" },
      },
      {
        say: [
          tr("Aynı işi bugünkü kelimemizle de yapabilirsin:"),
          de("Ingwer wirkt sehr gut."),
          tr("Yani 'Zencefil çok iyi geliyor.'"),
        ],
      },
      {
        say: [
          tr("Üçüncü kalıbımız tavsiyeyi açar:"),
          de("Ich habe einen Tipp für dich."),
          tr("Bunu söyleyince karşındaki dinlemeye hazırlanır."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe einen Tipp für dich"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe einen Tipp für dich" },
      },
      {
        say: [tr("Bir üretim daha: 'Limonlu çay içmelisin.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Du solltest Tee mit Zitrone trinken",
          hint: [
            tr("Yumuşak biçim, sonra içeceğin adı, en sonda asıl fiil:"),
            de("Du solltest Tee mit Zitrone trinken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Du solltest viel zu schlafen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Du solltest viel zu schlafen.",
          answer: false,
          why: [
            tr("Yanlış. Kip fiilinden sonra gelen asıl fiil araya hiçbir şey almaz, doğrudan mastar hâlinde durur. Doğrusu:"),
            de("Du solltest viel schlafen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık nazikçe akıl verebilirsin. Şimdi büyükannenin mutfağındasın ve öksürüyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Büyükannenin mutfağında öksürüyorsun ve o hemen çare üretmeye başlıyor. Önerilerini dinle, sorular sor ve sen de kendi bildiğin bir çareyi anlat.",
      partner: "her derde bir çaresi olan, ısrarcı bir büyükanne",
      opening: "Kind, du hustest ja! Soll ich dir einen Tee machen?",
      openingTr: "Evladım, öksürüyorsun! Sana bir çay yapayım mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-apotheke-beratung",
    icon: "pill",
    level: "A2",
    course: "de",
    title: "Beratung in der Apotheke",
    titleTr: "Eczane danışma",
    summary:
      "Eczanede doz, yan etki ve reçete gerekip gerekmediğini sormayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-dürfen",
    vocab: [
      { de: "die Nebenwirkung", tr: "yan etki" },
      { de: "rezeptfrei", tr: "reçetesiz" },
      { de: "der Tropfen", tr: "damla" },
      { de: "die Salbe", tr: "merhem" },
      { de: "die Packung", tr: "kutu" },
    ],
    patterns: [
      { de: "Wie oft darf ich das nehmen?", tr: "ne sıklıkta alabileceğini sorar" },
      { de: "Gibt es Nebenwirkungen?", tr: "yan etki olup olmadığını sorar" },
      { de: "Das ist rezeptfrei.", tr: "reçetesiz alınabildiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! A1'de eczacının talimatını anlamayı öğrenmiştin. Bugün sıra sende: soruyu sen soracaksın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İzin fiilini soru olarak kullanmayı öğrendin. Şimdi onun önüne bir soru kelimesi koyacağız. O zaman soru kelimesi başa, kip fiili hemen arkasına geçiyor; asıl fiil ise inatla sonda kalıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Nebenwirkung"),
          tr("Türkçesi 'yan etki' demek. Lütfen"),
          de("die Nebenwirkung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nebenwirkung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("rezeptfrei"),
          tr("Türkçesi 'reçetesiz' demek. Lütfen"),
          de("rezeptfrei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rezeptfrei" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Tropfen"),
          tr("Türkçesi 'damla' demek. Lütfen"),
          de("der Tropfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tropfen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Salbe"),
          tr("Türkçesi 'merhem' demek. Lütfen"),
          de("die Salbe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Salbe" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Packung"),
          tr("Türkçesi 'kutu, paket' demek. Lütfen"),
          de("die Packung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Packung" },
      },
      {
        say: [
          tr("İlk kalıbımız dozu sorar:"),
          de("Wie oft darf ich das nehmen?"),
          tr("Sıralamayı say: soru kelimesi, kip fiili, özne, nesne, en sonda asıl fiil."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie oft darf ich das nehmen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie oft darf ich das nehmen" },
      },
      {
        say: [tr("Sıra sende: 'Damlaları ne sıklıkta alabilirim?' nasıl sorulur?")],
        expect: {
          kind: "produce",
          target: "Wie oft darf ich die Tropfen nehmen",
          hint: [
            tr("Sıra bozulmaz, yalnızca nesne değişir:"),
            de("Wie oft darf ich die Tropfen nehmen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız güvenliği sorar:"),
          de("Gibt es Nebenwirkungen?"),
          tr("Yani 'Yan etkisi var mı?' Bu soruyu her ilaçta sorabilirsin."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Gibt es Nebenwirkungen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Gibt es Nebenwirkungen" },
      },
      {
        say: [
          tr("Üçüncü kalıp eczacıdan gelir:"),
          de("Das ist rezeptfrei."),
          tr("Yani 'Bu reçetesiz veriliyor.' Reçete gerekiyorsa:"),
          de("Dafür brauchen Sie ein Rezept."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist rezeptfrei"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist rezeptfrei" },
      },
      {
        say: [tr("Bir üretim daha: 'Merhemi reçetesiz alabilir miyim?' nasıl sorulur?")],
        expect: {
          kind: "produce",
          target: "Darf ich die Salbe ohne Rezept kaufen",
          hint: [
            tr("Soru kelimesi olmadığı için kip fiili doğrudan başa geçer:"),
            de("Darf ich die Salbe ohne Rezept kaufen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wie oft ich darf das nehmen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wie oft ich darf das nehmen?",
          answer: false,
          why: [
            tr("Yanlış. Soru kelimesinden hemen sonra kip fiili gelmeli, özne ise onun arkasına düşmeli. Doğrusu:"),
            de("Wie oft darf ich das nehmen?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık eczanede soru sorabilirsin. Şimdi reçetesiz bir ağrı kesici alıyorsun ama nasıl kullanacağını bilmiyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Eczanede reçetesiz bir ağrı kesici alıyorsun ama nasıl kullanacağını bilmiyorsun. Ne sıklıkta alabileceğini, yan etkisi olup olmadığını ve kaç günlük yeteceğini sor.",
      partner: "acelesi olmayan, her şeyi ayrıntısıyla anlatan bir eczacı",
      opening: "Das bekommen Sie auch ohne Rezept. Möchten Sie eine kurze Beratung?",
      openingTr: "Bunu reçetesiz de alabilirsiniz. Kısa bir bilgilendirme ister misiniz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-sport-verletzung",
    icon: "sport",
    level: "A2",
    course: "de",
    title: "Beim Sport verletzt",
    titleTr: "Sakatlık",
    summary:
      "Sakatlığı anlatmayı ve neresini incittiğini söylerken kullanılan kalıbı öğretir.",
    minutes: 9,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "sich verletzen", tr: "sakatlanmak" },
      { de: "das Knie", tr: "diz" },
      { de: "der Knöchel", tr: "ayak bileği" },
      { de: "geschwollen", tr: "şişmiş" },
      { de: "der Verband", tr: "sargı" },
    ],
    patterns: [
      { de: "Ich habe mir das Knie verletzt.", tr: "neresini incittiğini söyler" },
      { de: "Ich bin hingefallen.", tr: "düştüğünü söyler" },
      { de: "Es ist geschwollen.", tr: "şiştiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün sahada bir şey oldu ve anlatmamız gerekiyor. Geçmiş zamanı, dönüşlü zamiri ve vücut adlarını aynı cümlede birleştireceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Küçük bir sürpriz var: neresini incittiğini söylerken o zamir 'kendimi' değil 'kendime' biçimine giriyor, çünkü asıl nesne dizin. Türkçede 'dizimi incittim' dersin ve mesele biter; Almanca araya bir 'bana' koyuyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz iki parçadan oluşuyor:"),
          de("sich verletzen"),
          tr("Türkçesi 'sakatlanmak, incinmek' demek. Lütfen"),
          de("sich verletzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich verletzen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Knie"),
          tr("Türkçesi 'diz' demek. Lütfen"),
          de("das Knie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Knie" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Knöchel"),
          tr("Türkçesi 'ayak bileği' demek. Lütfen"),
          de("der Knöchel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Knöchel" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("geschwollen"),
          tr("Türkçesi 'şişmiş' demek. Lütfen"),
          de("geschwollen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geschwollen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Verband"),
          tr("Türkçesi 'sargı, bandaj' demek. Lütfen"),
          de("der Verband"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Verband" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe mir das Knie verletzt."),
          tr(
            "Ortadaki zamir 'kendime' demek. Vücut bölümü ise iyelik almıyor, artikeliyle duruyor; kimin dizi olduğu zamirden zaten belli.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe mir das Knie verletzt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe mir das Knie verletzt" },
      },
      {
        say: [tr("Sıra sende: 'Kolumu incittim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe mir den Arm verletzt",
          hint: [
            tr("Zamir aynı kalır; kol eril ve nesne olduğu için artikeli değişir:"),
            de("Ich habe mir den Arm verletzt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız nasıl olduğunu anlatır:"),
          de("Ich bin hingefallen."),
          tr("Düşmek bir hareket, o yüzden yardımcı fiil değişiyor ve ek yine öneğin arkasına giriyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin hingefallen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin hingefallen" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız sonucu gösterir:"),
          de("Es ist geschwollen."),
          tr("Yani 'Şişmiş.' Doktora gitmeden önce bunu söylemen bile yeter."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es ist geschwollen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es ist geschwollen" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Dizim şişti.'")],
        expect: {
          kind: "produce",
          target: "Mein Knie ist geschwollen",
          hint: [
            tr("Burada diz özne olduğu için iyelik kelimesi geri geliyor:"),
            de("Mein Knie ist geschwollen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Başka bir yerin için de aynı kalıp işler:"),
          de("Ich habe mir den Knöchel verletzt und brauche einen Verband."),
          tr("Yani 'Ayak bileğimi incittim ve bana bir sargı lazım.'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe hingefallen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe hingefallen.",
          answer: false,
          why: [
            tr("Yanlış. Düşmek bir yer değiştirme, yani hareket fiili; yardımcı fiili farklı olmalı. Doğrusu:"),
            de("Ich bin hingefallen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık başına geleni anlatabilirsin. Şimdi halı sahada yere düştün ve takım arkadaşın yanına koştu.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Maç sırasında düştün ve takım arkadaşın yanına geldi. Ne olduğunu, neresinin incindiğini ve şu an nasıl hissettiğini anlat.",
      partner: "panikleyen ama yardım etmeye çalışan bir takım arkadaşı",
      opening: "Oh nein, du bist hingefallen! Wo tut es weh?",
      openingTr: "Eyvah, düştün! Neren acıyor?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-krankenkasse",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Die Versichertenkarte",
    titleTr: "Sağlık sigortası",
    summary:
      "Muayenehane resepsiyonundaki sigorta sorularını anlamayı ve cevaplamayı öğretir.",
    minutes: 9,
    focusId: "W-Fragen",
    vocab: [
      { de: "die Krankenkasse", tr: "sağlık sigortası" },
      { de: "versichert", tr: "sigortalı" },
      { de: "übernehmen", tr: "karşılamak" },
      { de: "die Gebühr", tr: "ücret" },
      { de: "privat", tr: "özel" },
    ],
    patterns: [
      { de: "Sind Sie versichert?", tr: "sigortalı olup olmadığını sorar" },
      { de: "Ihre Karte, bitte.", tr: "sigorta kartını ister" },
      { de: "Das übernimmt die Kasse.", tr: "masrafı sigortanın karşıladığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Almanya'da doktora girmeden önce hep aynı iki soru sorulur ve ikisi de sigortayla ilgilidir. Bugün o kapıyı geçiyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ders bir dilbilgisi dersi değil, bir hayatta kalma dersi. Yeni kural yok; bildiğin soru kalıplarını sağlık bürokrasisinin kelimeleriyle dolduracağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Krankenkasse"),
          tr("Türkçesi 'sağlık sigortası' demek. Lütfen"),
          de("die Krankenkasse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Krankenkasse" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("versichert"),
          tr("Türkçesi 'sigortalı' demek. Lütfen"),
          de("versichert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "versichert" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("übernehmen"),
          tr("Türkçesi 'karşılamak, üstlenmek' demek. Lütfen"),
          de("übernehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "übernehmen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Gebühr"),
          tr("Türkçesi 'ücret' demek. Lütfen"),
          de("die Gebühr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Gebühr" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("privat"),
          tr("Türkçesi 'özel' demek; sigortanın türünü anlatır. Lütfen"),
          de("privat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "privat" },
      },
      {
        say: [
          tr("İlk kalıbımız kapıdaki ilk soru:"),
          de("Sind Sie versichert?"),
          tr("Almanya'da herkes sigortalıdır ve iki tür vardır: kamu sigortası ve özel sigorta."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Sind Sie versichert"), tr("deyin.")],
        expect: { kind: "repeat", target: "Sind Sie versichert" },
      },
      {
        say: [tr("Sıra sende, cevabını ver: 'Özel sigortalıyım.'")],
        expect: {
          kind: "produce",
          target: "Ich bin privat versichert",
          hint: [
            tr("Sigortanın türü sıfat gibi araya girer:"),
            de("Ich bin privat versichert."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıp kartını ister:"),
          de("Ihre Karte, bitte."),
          tr("Sağlık kartını her ziyarette verirsin; yanında yoksa ücret ödersin."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ihre Karte, bitte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ihre Karte, bitte" },
      },
      {
        say: [
          tr("Üçüncü kalıp paranın kimden çıkacağını söyler:"),
          de("Das übernimmt die Kasse."),
          tr("Yani 'Bunu sigorta karşılıyor.' Karşılamıyorsa:"),
          de("Dafür gibt es eine Gebühr."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das übernimmt die Kasse"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das übernimmt die Kasse" },
      },
      {
        say: [tr("Şimdi sen sor: 'Bunu sigorta karşılıyor mu?'")],
        expect: {
          kind: "produce",
          target: "Übernimmt das die Krankenkasse",
          hint: [
            tr("Soru kelimesi olmadığı için fiil doğrudan başa geçer:"),
            de("Übernimmt das die Krankenkasse?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das bezahlt die Kasse."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das bezahlt die Kasse.",
          answer: true,
          why: [
            tr("Doğru. Nesne başa alınmış ama fiil ikinci sırada kalmış; asıl özne fiilin arkasına geçmiş. Almancada bu sıra son derece olağan."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık resepsiyonu geçebilirsin. Şimdi yeni bir muayenehanedesin ve görevli seni kaydediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni bir muayenehanenin resepsiyonundasın ve görevli seni kaydediyor. Sigorta sorularını cevapla ve masrafı kimin karşılayacağını sor.",
      partner: "formları hızlıca dolduran, işini bilen bir resepsiyon görevlisi",
      opening: "Guten Tag! Sind Sie gesetzlich oder privat versichert?",
      openingTr: "İyi günler! Kamu sigortalı mısınız yoksa özel mi?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-zahnarzt-termin",
    icon: "tooth",
    level: "A2",
    course: "de",
    title: "Notfall beim Zahnarzt",
    titleTr: "Acil diş",
    summary:
      "Acil bir diş ağrısını telefonda anlatmayı ve verilen talimatları teyit etmeyi öğretir.",
    minutes: 9,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "der Notfall", tr: "acil durum" },
      { de: "die Füllung", tr: "dolgu" },
      { de: "nüchtern", tr: "aç karnına" },
      { de: "die Betäubung", tr: "uyuşturma" },
      { de: "aushalten", tr: "dayanmak" },
    ],
    patterns: [
      { de: "Es tut sehr weh.", tr: "çok ağrıdığını söyler" },
      { de: "Sie sollen sofort kommen.", tr: "hemen gelmesi gerektiğini iletir" },
      { de: "Soll ich nüchtern bleiben?", tr: "aç gelip gelmeyeceğini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Gece yarısı başlayan diş ağrısı kimseyi dinlemez. Bugün acil hattı arayıp durumu anlatacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Öneri fiilini bir de şu işte kullanacaksın: karşındakinin sana söylediği talimatı tekrar edip teyit etmek. 'Hemen gelmeliyim, öyle mi?' demenin Almancası tam bu fiille kuruluyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Notfall"),
          tr("Türkçesi 'acil durum' demek. Lütfen"),
          de("der Notfall"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Notfall" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Füllung"),
          tr("Türkçesi 'dolgu' demek. Lütfen"),
          de("die Füllung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Füllung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("nüchtern"),
          tr("Türkçesi 'aç karnına' demek. Lütfen"),
          de("nüchtern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nüchtern" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Betäubung"),
          tr("Türkçesi 'uyuşturma' demek. Lütfen"),
          de("die Betäubung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Betäubung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("aushalten"),
          tr("Türkçesi 'dayanmak, katlanmak' demek. Lütfen"),
          de("aushalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aushalten" },
      },
      {
        say: [
          tr("İlk kalıbımız durumu anlatır:"),
          de("Es tut sehr weh."),
          tr("Neresi olduğunu söylemek istersen ağrı kalıbını hatırlıyorsun:"),
          de("Mir tut der Zahn weh."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es tut sehr weh"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es tut sehr weh" },
      },
      {
        say: [
          tr("İkinci kalıp karşı taraftan gelir:"),
          de("Sie sollen sofort kommen."),
          tr("Yani 'Hemen gelmeniz gerekiyor.' Bu talimat başkasından geldiği için o fiille kuruluyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Sie sollen sofort kommen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Sie sollen sofort kommen" },
      },
      {
        say: [
          tr("Üçüncü kalıp senin teyidin:"),
          de("Soll ich nüchtern bleiben?"),
          tr("Yani 'Aç mı kalmalıyım?' Kip fiili başa geçmiş, asıl fiil sonda kalmış."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Soll ich nüchtern bleiben"), tr("deyin.")],
        expect: { kind: "repeat", target: "Soll ich nüchtern bleiben" },
      },
      {
        say: [tr("Sıra sende: 'Aç karnına mı geleyim?' nasıl sorulur?")],
        expect: {
          kind: "produce",
          target: "Soll ich nüchtern kommen",
          hint: [
            tr("Kip fiili başta, asıl fiil sonda; yalnızca son kelime değişiyor:"),
            de("Soll ich nüchtern kommen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ağrı dayanılmaz hâle geldiyse söyleyeceğin cümle de var:"),
          de("Ich halte das nicht mehr aus."),
          tr("Ayrılabilen bir fiil; öneki cümlenin en sonuna gitmiş."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Buna artık dayanamıyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich halte das nicht mehr aus",
          hint: [
            tr("Önek sona gider, olumsuzluk ise ondan hemen önce durur:"),
            de("Ich halte das nicht mehr aus."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es tut mir der Zahn weh."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es tut mir der Zahn weh.",
          answer: false,
          why: [
            tr("Yanlış. Bu kalıpta ya 'bana' ile ya da ağrıyan yerle başlarsın; başa ayrıca bir doldurma öznesi konmaz. İki doğru biçim var:"),
            de("Mir tut der Zahn weh."),
            tr("ve"),
            de("Der Zahn tut mir weh."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık gece yarısı bile derdini anlatabilirsin. Şimdi acil diş hattını arıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Gece diş ağrınla acil diş hattını aradın. Ağrının ne kadar şiddetli olduğunu ve ne zamandır sürdüğünü anlat, ne yapman gerektiğini sor.",
      partner: "gece nöbetindeki yorgun ama sakin bir görevli",
      opening: "Zahnärztlicher Notdienst. Wie stark sind die Schmerzen?",
      openingTr: "Acil diş hattı. Ağrınız ne kadar şiddetli?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-stress",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Zu viel Stress",
    titleTr: "Stres ve uyku",
    summary:
      "Stresi anlatmayı ve dönüşlü zamirin olumsuz cümlede nereye oturduğunu öğretir.",
    minutes: 9,
    focusId: "Reflexivverben",
    vocab: [
      { de: "der Stress", tr: "stres" },
      { de: "sich konzentrieren", tr: "odaklanmak" },
      { de: "sich entspannen", tr: "rahatlamak" },
      { de: "der Druck", tr: "baskı" },
      { de: "abschalten", tr: "kafayı dağıtmak" },
    ],
    patterns: [
      { de: "Ich kann mich nicht konzentrieren.", tr: "odaklanamadığını söyler" },
      { de: "Entspann dich!", tr: "karşısındakine rahatlamasını söyler" },
      { de: "Ich muss mal abschalten.", tr: "kafasını dağıtması gerektiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Dönüşlü fiillere geri dönüyoruz, bu sefer stresli bir haftanın içinde. Küçük zamirin uzun cümlede nereye oturduğunu göreceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural basit ama hep aynı yerde hata yapılır: o küçük zamir çekimli fiilin hemen arkasına gider. Cümlede kip fiili varsa zamir kip fiilinin arkasına, olumsuzluk kelimesinin ise ÖNÜNE düşer. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Stress"),
          tr("Türkçesi 'stres' demek. Lütfen"),
          de("der Stress"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stress" },
      },
      {
        say: [
          tr("İkinci kelimemiz iki parçadan oluşuyor:"),
          de("sich konzentrieren"),
          tr("Türkçesi 'odaklanmak' demek. Lütfen"),
          de("sich konzentrieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich konzentrieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz de öyle:"),
          de("sich entspannen"),
          tr("Türkçesi 'rahatlamak' demek. Lütfen"),
          de("sich entspannen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich entspannen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Druck"),
          tr("Türkçesi 'baskı' demek. Lütfen"),
          de("der Druck"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Druck" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("abschalten"),
          tr("Türkçesi 'kafayı dağıtmak' demek; kelime kelime 'kapatmak' anlamına gelir. Lütfen"),
          de("abschalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abschalten" },
      },
      {
        say: [
          tr("İlk kalıbımızda üç şey aynı anda oluyor:"),
          de("Ich kann mich nicht konzentrieren."),
          tr("Kip fiili ikinci sırada, zamir hemen arkasında, olumsuzluk ondan sonra, asıl fiil en sonda."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich kann mich nicht konzentrieren"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich kann mich nicht konzentrieren" },
      },
      {
        say: [tr("Sıra sende: 'Rahatlayamıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kann mich nicht entspannen",
          hint: [
            tr("Sıra bozulmuyor, yalnızca sondaki fiil değişiyor:"),
            de("Ich kann mich nicht entspannen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız emir biçiminde:"),
          de("Entspann dich!"),
          tr("Emirde özne düşüyor ama küçük zamir düşmüyor, üstelik 'seni' biçimine giriyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Entspann dich"), tr("deyin.")],
        expect: { kind: "repeat", target: "Entspann dich" },
      },
      {
        say: [tr("Şimdi bir arkadaşına söyle: 'Otur ve rahatla.' Kısaca: 'Rahatla biraz.'")],
        expect: {
          kind: "produce",
          target: "Entspann dich ein bisschen",
          hint: [
            tr("Emirde fiil yalın hâlde, zamir hemen arkasında, miktar en sonda:"),
            de("Entspann dich ein bisschen!"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız çözümü söyler:"),
          de("Ich muss mal abschalten."),
          tr("Ortadaki küçük kelime 'bir', 'biraz' gibi cümleyi yumuşatır; Almanlar onu her yere serpiştirir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich muss mal abschalten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich muss mal abschalten" },
      },
      {
        say: [
          tr("Sebebini söylemek istersen:"),
          de("Der Druck bei der Arbeit ist zu groß."),
          tr("Yani 'İşteki baskı fazla.'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich kann mich nicht ausruhen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich kann mich nicht ausruhen.",
          answer: true,
          why: [
            tr("Doğru. Küçük zamir kip fiilinin hemen arkasına, olumsuzluk kelimesinin önüne oturmuş; asıl fiil de sonda kalmış."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kendi hâlini de anlatabilir, birini de rahatlatabilirsin. Şimdi iş arkadaşın haftalardır uyuyamadığını söylüyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş arkadaşın haftalardır uyuyamıyor ve sana açılıyor. Neler yaşadığını sor, kendi stresinden söz et ve ona ne yapması gerektiğini öner.",
      partner: "her şeyi kafasına takan, açılmaya ihtiyacı olan bir iş arkadaşı",
      opening: "Ich schlafe seit Wochen schlecht. Kennst du das?",
      openingTr: "Haftalardır kötü uyuyorum. Sen de yaşadın mı böyle bir şey?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-vorsorge",
    icon: "doctor",
    level: "A2",
    course: "de",
    title: "Gesund bleiben",
    titleTr: "Check-up",
    summary:
      "Düzenli sağlık kontrollerini konuşmayı ve genel geçer tavsiyeyi kurmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "die Vorsorge", tr: "koruyucu kontrol" },
      { de: "regelmäßig", tr: "düzenli" },
      { de: "die Untersuchung", tr: "muayene" },
      { de: "das Ergebnis", tr: "sonuç" },
      { de: "rechtzeitig", tr: "zamanında" },
    ],
    patterns: [
      { de: "Man soll regelmäßig zum Arzt gehen.", tr: "genel bir sağlık kuralı söyler" },
      { de: "einmal im Jahr", tr: "yılda bir kez demek" },
      { de: "Vorsorge ist wichtig.", tr: "koruyucu kontrolün önemini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bu modülün son dersinde hasta olmadan önceki hâle bakıyoruz: düzenli kontroller. Bir de tavsiyenin en genel biçimini kuracağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Herkesi anlatan o küçük özneyi biliyorsun; zorunluluk fiiliyle kullanmıştın. Bugün onu öneri fiiliyle birleştireceğiz. Fark ince ama gerçek: biri mecburiyet, öbürü toplumun doğru bulduğu şey. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Vorsorge"),
          tr("Türkçesi 'koruyucu kontrol' demek. Lütfen"),
          de("die Vorsorge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Vorsorge" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("regelmäßig"),
          tr("Türkçesi 'düzenli' demek. Lütfen"),
          de("regelmäßig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "regelmäßig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Untersuchung"),
          tr("Türkçesi 'muayene' demek. Lütfen"),
          de("die Untersuchung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Untersuchung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
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
          de("rechtzeitig"),
          tr("Türkçesi 'zamanında' demek. Lütfen"),
          de("rechtzeitig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rechtzeitig" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Man soll regelmäßig zum Arzt gehen."),
          tr(
            "Baştaki özne tek kişi sayılır, o yüzden fiil tekil biçimde; asıl fiil ise yine cümlenin sonunda.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Man soll regelmäßig zum Arzt gehen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Man soll regelmäßig zum Arzt gehen" },
      },
      {
        say: [tr("Sıra sende: 'Daha az stresli olmak gerekir.' Kısaca: 'Daha az stres olmalı.'")],
        expect: {
          kind: "produce",
          target: "Man soll weniger Stress haben",
          hint: [
            tr("Genel özne, tekil fiil, asıl fiil sonda:"),
            de("Man soll weniger Stress haben."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sıklığı verir:"),
          de("einmal im Jahr"),
          tr("Yani 'yılda bir kez'. Aynı biçimde"),
          de("zweimal im Jahr"),
          tr("ve"),
          de("einmal im Monat"),
          tr("diyebilirsin."),
        ],
      },
      {
        say: [tr("Lütfen"), de("einmal im Jahr"), tr("deyin.")],
        expect: { kind: "repeat", target: "einmal im Jahr" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Yılda bir kez muayeneye gidiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich gehe einmal im Jahr zur Untersuchung",
          hint: [
            tr("Önce fiil, sonra sıklık, en sonda gidilen yer:"),
            de("Ich gehe einmal im Jahr zur Untersuchung."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız gerekçeyi söyler:"),
          de("Vorsorge ist wichtig."),
          tr("Nedenini de eklersin:"),
          de("Man findet Probleme rechtzeitig."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Vorsorge ist wichtig"), tr("deyin.")],
        expect: { kind: "repeat", target: "Vorsorge ist wichtig" },
      },
      {
        say: [
          tr("Sonuçları beklerken de bir cümlen olsun:"),
          de("Wann bekomme ich das Ergebnis?"),
          tr("Yani 'Sonucu ne zaman alacağım?'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Man soll jedes Jahr zum Zahnarzt gehen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Man soll jedes Jahr zum Zahnarzt gehen.",
          answer: true,
          why: [
            tr("Doğru. Genel özne tekil sayıldığı için fiil tekil biçimde kalmış ve asıl fiil cümlenin sonuna gitmiş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu modülü bitirdin: artık belirtini anlatabiliyor, izin isteyebiliyor, tavsiye verebiliyor ve sigorta kapısını geçebiliyorsun. Şimdi kontrolün bitti ve doktorun bundan sonrasını konuşuyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yıllık kontrolün bitti ve doktorun bundan sonra hangi kontrolleri ne sıklıkta yaptırman gerektiğini anlatıyor. Sorularını sor ve kendi alışkanlıklarını anlat.",
      partner: "önleyici sağlığa çok inanan, sabırlı bir aile hekimi",
      opening: "Alles in Ordnung. Wann waren Sie das letzte Mal zur Vorsorge?",
      openingTr: "Her şey yolunda. En son ne zaman kontrole geldiniz?",
      minTurns: 4,
    },
  },
];

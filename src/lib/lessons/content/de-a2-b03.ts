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
 *
 * Sözlükçe havuzun A2 katmanından geliyor. Sağlık, havuzun en kalabalık
 * alanlarından biri (vücut, belirti, ilaç, muayene, sigorta) ve modül artık o
 * alanı gerçekten kullanıyor: 022 belirtiler, 025 eczane rafı, 026 sakatlık,
 * 030 koruyucu hekimlik. Eskiden bu derslerin öğrettiği kelimelerin çoğu B1
 * ve üstündeydi.
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
    minutes: 10,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "die Krankheit", tr: "hastalık" },
      { de: "das Medikament", tr: "ilaç" },
      { de: "husten", tr: "öksürmek" },
      { de: "die Behandlung", tr: "tedavi" },
      { de: "untersuchen", tr: "muayene etmek" },
      { de: "die Sprechstunde", tr: "muayene saati" },
      { de: "der Magen", tr: "mide" },
      { de: "der Puls", tr: "nabız" },
    ],
    patterns: [
      { de: "Sie sollen … nehmen.", tr: "doktorun söylediğini aktarır" },
      { de: "Was soll ich machen?", tr: "ne yapman gerektiğini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün doktordayız. Almancada doktorun söylediğini aktarmanın kendine has bir kip fiili var ve onu öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu kip fiili 'benim zorunluluğum' demez; 'başkası böyle söyledi' der. Doktorun tavsiyesini eve götürdüğünde tam olarak bunu kullanırsın. Türkçede 'içmem gerekiyormuş' derken kattığımız o anlam burada tek bir fiile yüklenmiş. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Krankheit"),
          tr("Türkçesi 'hastalık' demek. Lütfen"),
          de("die Krankheit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Krankheit" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Medikament"),
          tr("Türkçesi 'ilaç' demek. Lütfen"),
          de("das Medikament"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Medikament" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("husten"),
          tr("Türkçesi 'öksürmek' demek. Lütfen"),
          de("husten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "husten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Behandlung"),
          tr("Türkçesi 'tedavi' demek. Lütfen"),
          de("die Behandlung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Behandlung" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("untersuchen"),
          tr("Türkçesi 'muayene etmek' demek. Lütfen"),
          de("untersuchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "untersuchen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Sprechstunde"),
          tr("Türkçesi 'muayene saati' demek; doktorun hasta kabul ettiği saatler. Lütfen"),
          de("die Sprechstunde"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sprechstunde" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Magen"),
          tr("Türkçesi 'mide' demek. Lütfen"),
          de("der Magen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Magen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Puls"),
          tr("Türkçesi 'nabız' demek. Lütfen"),
          de("der Puls"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Puls" },
      },
      {
        say: [
          tr("İlk kalıbımız doktorun ağzından:"),
          de("Sie sollen … nehmen."),
          tr("Kip fiili ikinci sırada, asıl fiil cümlenin sonunda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Akşamları iki hap almalısınız.' Almancası:"),
          de("Abends sollen Sie zwei Tabletten nehmen."),
          tr("Lütfen"),
          de("Abends sollen Sie zwei Tabletten nehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Abends sollen Sie zwei Tabletten nehmen" },
      },
      {
        say: [tr("Sıra sende: 'Midem ağrıyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Magen tut weh",
          hint: [
            tr("Ağrıyan yer öznedir ve fiil ayrılabilen bir fiildir:"),
            de("Mein Magen tut weh."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız hastanın ağzından:"),
          de("Was soll ich machen?"),
          tr("'Ne yapmam gerekiyor' demenin en doğal yolu; doktora tavsiye sorar."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Doktor beni muayene etti.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Arzt hat mich untersucht",
          hint: [
            de("untersuchen"),
            tr("vurgusuz bir ön ekle başlıyor, o yüzden ortacın hecesini almıyor:"),
            de("Der Arzt hat mich untersucht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Sie sollen dieses Medikament dreimal am Tag nehmen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Sie sollen dieses Medikament dreimal am Tag nehmen.",
          answer: true,
          why: [
            tr("Kip fiili ikinci sırada, asıl fiil sonda; doktorun tavsiyesini aktaran doğru kalıp."),
          ],
        },
      },
      {
        say: [tr("Şimdi doktordasın. Şikâyetini anlat ve ne yapman gerektiğini sor.")],
      },
    ],
    roleplay: {
      scene:
        "Bir haftadır öksürüyorsun ve doktora gittin. Şikâyetini anlat, ne kadar zamandır sürdüğünü söyle ve ne yapman gerektiğini sor.",
      partner: "sakin sakin soru soran bir aile hekimi",
      opening: "Guten Tag, setzen Sie sich. Was fehlt Ihnen denn?",
      openingTr: "İyi günler, buyurun oturun. Şikâyetiniz nedir?",
      goal: "Şikâyet ve süresi anlatılmış, doktor bir tedavi söylemiş ve hasta onu kendi ağzıyla tekrar etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-symptome",
    icon: "doctor",
    level: "A2",
    course: "de",
    title: "Ich fühle mich nicht gut",
    titleTr: "Belirtiler",
    summary: "Kendini nasıl hissettiğini anlatmayı ve dönüşlü fiillerin küçük zamirini öğretir.",
    minutes: 10,
    focusId: "Reflexivverben",
    vocab: [
      { de: "sich fühlen", tr: "kendini hissetmek" },
      { de: "schwindlig", tr: "başı dönen" },
      { de: "übel", tr: "midesi bulanan" },
      { de: "die Grippe", tr: "grip" },
      { de: "erkältet sein", tr: "üşütmüş olmak" },
      { de: "schlimm", tr: "fena" },
      { de: "niesen", tr: "hapşırmak" },
      { de: "sich anstecken", tr: "hastalık kapmak" },
    ],
    patterns: [
      { de: "Ich fühle mich nicht gut.", tr: "genel hâlini söyler" },
      { de: "Mir ist schwindlig.", tr: "bedensel bir belirtiyi söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kendini nasıl hissettiğini anlatıyoruz. Almancada bunun iki ayrı yolu var ve hangisini kullanacağın belirtiye göre değişiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Birinci yol dönüşlü fiil: kendini iyi ya da kötü hissetmek. İkinci yol daha ilginç: baş dönmesi ya da mide bulantısı gibi belirtilerde kişi özne olmaz, yönelme hâlinde durur. Türkçede 'başım dönüyor' değil de 'bana fenalık geldi' der gibi. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
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
          de("schwindlig"),
          tr("Türkçesi 'başı dönen' demek. Lütfen"),
          de("schwindlig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwindlig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("übel"),
          tr("Türkçesi 'midesi bulanan' demek. Lütfen"),
          de("übel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "übel" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Grippe"),
          tr("Türkçesi 'grip' demek. Lütfen"),
          de("die Grippe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Grippe" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("erkältet sein"),
          tr("Türkçesi 'üşütmüş olmak' demek. Lütfen"),
          de("erkältet sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erkältet sein" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("schlimm"),
          tr("Türkçesi 'fena, kötü' demek. Lütfen"),
          de("schlimm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schlimm" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("niesen"),
          tr("Türkçesi 'hapşırmak' demek. Lütfen"),
          de("niesen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "niesen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich anstecken"),
          tr("Türkçesi 'hastalık kapmak' demek. Lütfen"),
          de("sich anstecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich anstecken" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich fühle mich nicht gut."),
          tr(
            "Dönüşlü zamir kişiye göre değişir ve fiilden hemen sonra durur. Olumsuzluk kelimesi zamirden sonra gelir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bugün kendimi çok fena hissediyorum.' Almancası:"),
          de("Heute fühle ich mich sehr schlimm."),
          tr("Lütfen"),
          de("Heute fühle ich mich sehr schlimm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Heute fühle ich mich sehr schlimm" },
      },
      {
        say: [tr("Sıra sende: 'Üşütmüşüm.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bin erkältet",
          hint: [
            tr("Bu durum bir sıfatla ve olmak fiiliyle kurulur:"),
            de("Ich bin erkältet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız daha da ilginç:"),
          de("Mir ist schwindlig."),
          tr(
            "Burada kişi özne değil, yönelme hâlinde. Cümlenin öznesi yok gibi görünüyor ve gerçekten de belirtiyi yaşayan kişi cümlenin merkezinde durmuyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Midem bulanıyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mir ist übel",
          hint: [
            tr("Belirtiyi yaşayan kişi yönelme hâlinde durur ve fiil olmak fiilidir:"),
            de("Mir ist übel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich bin schwindlig."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich bin schwindlig.",
          answer: false,
          why: [
            tr(
              "Bu belirtide kişi özne olmaz, yönelme hâlinde durur; böyle söylenince 'ben baş döndürücüyüm' gibi bir anlam çıkar. Doğrusu:",
            ),
            de("Mir ist schwindlig."),
          ],
        },
      },
      {
        say: [tr("Şimdi kendini iyi hissetmiyorsun ve birine anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Kendini iyi hissetmiyorsun ve bir iş arkadaşın fark ediyor. Belirtilerini tek tek anlat ve nasıl başladığını söyle.",
      partner: "seni fark eden ve endişelenen bir iş arkadaşı",
      opening: "Du siehst blass aus. Fühlst du dich nicht gut?",
      openingTr: "Solgun görünüyorsun. Kendini iyi hissetmiyor musun?",
      goal: "En az iki belirti doğru kalıpla anlatılmış ve iş arkadaşın bir öneride bulunmuş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-duerfen",
    icon: "doctor",
    level: "A2",
    course: "de",
    title: "Das dürfen Sie nicht!",
    titleTr: "İzin ve yasak",
    summary: "İzin istemeyi, yasağı anlamayı ve üç kip fiilinin birbirinden nasıl ayrıldığını öğretir.",
    minutes: 10,
    focusId: "Modalverb-dürfen",
    vocab: [
      { de: "dürfen", tr: "izinli olmak" },
      { de: "erlaubt", tr: "serbest" },
      { de: "die Erlaubnis", tr: "izin" },
      { de: "schädlich", tr: "zararlı" },
      { de: "harmlos", tr: "zararsız" },
      { de: "vorsichtig", tr: "dikkatli" },
      { de: "gefährlich", tr: "tehlikeli" },
      { de: "fett", tr: "yağlı" },
    ],
    patterns: [
      { de: "Darf ich …?", tr: "izin ister" },
      { de: "Das dürfen Sie nicht.", tr: "yasağı bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün izin ve yasak konuşuyoruz. İzin fiili A1'de karşına çıkmıştı; burada onu olumsuzuyla ve öteki kip fiillerinden ayırarak çalışacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "En kritik ayrım şu: izin fiilinin olumsuzu 'gerek yok' değil, 'yasak' demektir. Zorunluluk fiilinin olumsuzu ise gerçekten 'gerek yok' der. İkisini karıştırmak doktorun söylediğinin tam tersini anlamak demek. Önce sekiz kelime.",
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
          tr("Türkçesi 'serbest, izinli' demek. Lütfen"),
          de("erlaubt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erlaubt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Erlaubnis"),
          tr("Türkçesi 'izin' demek; verilen iznin kendisi. Lütfen"),
          de("die Erlaubnis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Erlaubnis" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schädlich"),
          tr("Türkçesi 'zararlı' demek. Lütfen"),
          de("schädlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schädlich" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("harmlos"),
          tr("Türkçesi 'zararsız' demek. Lütfen"),
          de("harmlos"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "harmlos" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("vorsichtig"),
          tr("Türkçesi 'dikkatli' demek. Lütfen"),
          de("vorsichtig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorsichtig" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("gefährlich"),
          tr("Türkçesi 'tehlikeli' demek. Lütfen"),
          de("gefährlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gefährlich" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("fett"),
          tr("Türkçesi 'yağlı' demek. Lütfen"),
          de("fett"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fett" },
      },
      {
        say: [
          tr("İlk kalıbımız izin ister:"),
          de("Darf ich …?"),
          tr("Kip fiili başa geçince cümle soru olur ve asıl fiil yine sonda kalır."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Spor yapabilir miyim?' Almancası:"),
          de("Darf ich Sport machen?"),
          tr("Lütfen"),
          de("Darf ich Sport machen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Darf ich Sport machen" },
      },
      {
        say: [tr("Sıra sende: 'Yağlı yiyebilir miyim?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Darf ich fett essen",
          hint: [
            tr("İzin fiili başta, asıl fiil sonda:"),
            de("Darf ich fett essen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yasağı bildirir:"),
          de("Das dürfen Sie nicht."),
          tr(
            "Bu cümle 'gerek yok' demek değil, 'yapmanız yasak' demektir. Doktorun ağzından duyulduğunda ciddiye alınır.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bu sağlığa zararlı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das ist schädlich für die Gesundheit",
          hint: [
            tr("Neye zararlı olduğu bir edatla söylenir ve o edat belirtme hâlini getirir:"),
            de("Das ist schädlich für die Gesundheit."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Sie dürfen nicht rauchen bedeutet: Rauchen ist nicht nötig."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Sie dürfen nicht rauchen bedeutet: Rauchen ist nicht nötig.",
          answer: false,
          why: [
            tr(
              "İzin fiilinin olumsuzu 'gerek yok' değil 'yasak' demektir. 'Gerek yok' için zorunluluk fiilinin olumsuzu kullanılır:",
            ),
            de("Sie müssen nicht rauchen."),
          ],
        },
      },
      {
        say: [tr("Şimdi doktora neyi yapıp yapamayacağını soruyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir ameliyattan sonra kontrole geldin ve nelere izin olduğunu öğrenmek istiyorsun. Spor, yemek ve iş konusunda tek tek sor.",
      partner: "net konuşan, kısa cevaplar veren bir doktor",
      opening: "Die Wunde sieht gut aus. Haben Sie Fragen?",
      openingTr: "Yara iyi görünüyor. Sorunuz var mı?",
      goal: "En az üç konuda izin sorulmuş, doktor her birine izin ya da yasak demiş ve hasta yasakları kendi ağzıyla tekrar etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-hausmittel",
    icon: "food",
    level: "A2",
    course: "de",
    title: "Omas Hausmittel",
    titleTr: "Ev çareleri",
    summary: "Yumuşak tavsiye vermeyi ve ev çarelerini anlatmayı öğretir.",
    minutes: 10,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "das Mittel", tr: "çare" },
      { de: "die Zitrone", tr: "limon" },
      { de: "der Tipp", tr: "tavsiye" },
      { de: "die Orange", tr: "portakal" },
      { de: "der Löffel", tr: "kaşık" },
      { de: "rühren", tr: "karıştırmak" },
      { de: "heiß", tr: "sıcak" },
      { de: "lauwarm", tr: "ılık" },
    ],
    patterns: [
      { de: "Du solltest … trinken.", tr: "yumuşak bir tavsiye verir" },
      { de: "Das hilft gegen …", tr: "bir çarenin neye iyi geldiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ev çarelerini konuşuyoruz ve tavsiyenin yumuşak biçimini öğreniyoruz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçen derste doktorun ağzından katı bir tavsiye gördün. Aynı kip fiilinin bir de yumuşak biçimi var; arkadaşına akıl verirken onu kullanırsın. Türkçedeki 'içsen iyi olur' ile 'içmelisin' arasındaki fark gibi. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Mittel"),
          tr("Türkçesi 'çare, ilaç' demek. Lütfen"),
          de("das Mittel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Mittel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Zitrone"),
          tr("Türkçesi 'limon' demek. Lütfen"),
          de("die Zitrone"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zitrone" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Tipp"),
          tr("Türkçesi 'tavsiye, öneri' demek. Lütfen"),
          de("der Tipp"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tipp" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Orange"),
          tr("Türkçesi 'portakal' demek. Lütfen"),
          de("die Orange"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Orange" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Löffel"),
          tr("Türkçesi 'kaşık' demek. Lütfen"),
          de("der Löffel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Löffel" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("rühren"),
          tr("Türkçesi 'karıştırmak' demek; kaşıkla karıştırmak. Lütfen"),
          de("rühren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rühren" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("heiß"),
          tr("Türkçesi 'sıcak' demek. Lütfen"),
          de("heiß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "heiß" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("lauwarm"),
          tr("Türkçesi 'ılık' demek. Lütfen"),
          de("lauwarm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lauwarm" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Du solltest … trinken."),
          tr(
            "Kip fiilinin yumuşak biçimi. Aynı fiilin sesli harfi değişiyor ve cümle emirden tavsiyeye dönüyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Limonlu sıcak bir çay içsen iyi olur.' Almancası:"),
          de("Du solltest heißen Tee mit Zitrone trinken."),
          tr("Lütfen"),
          de("Du solltest heißen Tee mit Zitrone trinken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Du solltest heißen Tee mit Zitrone trinken" },
      },
      {
        say: [tr("Sıra sende: 'Bunu ılık içsen iyi olur.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Du solltest das lauwarm trinken",
          hint: [
            tr("Kip fiilinin yumuşak biçimi ikinci sırada, asıl fiil sonda:"),
            de("Du solltest das lauwarm trinken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Das hilft gegen …"),
          tr("Bir çarenin neye iyi geldiğini söyler. Buradaki edat belirtme hâlini getirir."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bu öksürüğe iyi gelir.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das hilft gegen Husten",
          hint: [
            tr("Neye iyi geldiği belirtme hâliyle söylenir:"),
            de("Das hilft gegen Husten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Du sollst sofort ins Bett gehen, sagt meine Oma."),
          tr("cümlesinde kip fiili doğru seçilmiş mi?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Du sollst sofort ins Bett gehen, sagt meine Oma.",
          answer: true,
          why: [
            tr(
              "Burada başkasının söylediği aktarılıyor, o yüzden kip fiilinin katı biçimi doğru; yumuşak biçim tavsiye olurdu, bu ise iletilen bir talimat.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi hasta olan bir arkadaşına ev çareleri öneriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın üşütmüş ve seni arıyor. Ona en az iki ev çaresi öner, nasıl hazırlanacağını anlat ve neye iyi geldiğini söyle.",
      partner: "üşütmüş, sesi kısılmış bir arkadaş",
      opening: "Ich bin total erkältet. Hast du einen Tipp für mich?",
      openingTr: "Fena üşütmüşüm. Bana bir tavsiyen var mı?",
      goal: "En az iki çare önerilmiş, biri nasıl hazırlanacağıyla anlatılmış ve arkadaşın hangisini deneyeceğini söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-apotheke-beratung",
    icon: "pill",
    level: "A2",
    course: "de",
    title: "Beratung in der Apotheke",
    titleTr: "Eczane danışma",
    summary: "Eczanede doz, yan etki ve reçete gerekip gerekmediğini sormayı öğretir.",
    minutes: 10,
    focusId: "Modalverb-dürfen",
    vocab: [
      { de: "der Apotheker", tr: "eczacı" },
      { de: "die Packung", tr: "paket" },
      { de: "der Hustensaft", tr: "öksürük şurubu" },
      { de: "die Augentropfen", tr: "göz damlası" },
      { de: "die Kopfschmerzen", tr: "baş ağrısı" },
      { de: "die Schlaftablette", tr: "uyku hapı" },
      { de: "schlucken", tr: "yutmak" },
      { de: "die Tube", tr: "tüp" },
    ],
    patterns: [
      { de: "Bekomme ich das ohne Rezept?", tr: "reçete gerekip gerekmediğini sorar" },
      { de: "Wie oft darf ich das nehmen?", tr: "dozu sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün eczanedeyiz. Almanya'da eczacı sadece satmaz, danışmanlık da yapar; doğru soruyu sorabilmek işini görür. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Eczanede üç şey sorulur: reçete gerekiyor mu, ne sıklıkla alınacak, nasıl kullanılacak. İkincisinde izin fiili kullanılır, çünkü soru 'bana izin var mı' anlamındadır. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Apotheker"),
          tr("Türkçesi 'eczacı' demek. Lütfen"),
          de("der Apotheker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Apotheker" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Packung"),
          tr("Türkçesi 'paket, kutu' demek. Lütfen"),
          de("die Packung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Packung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Hustensaft"),
          tr("Türkçesi 'öksürük şurubu' demek. Lütfen"),
          de("der Hustensaft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hustensaft" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Augentropfen"),
          tr("Türkçesi 'göz damlası' demek; hep çoğul kullanılır. Lütfen"),
          de("die Augentropfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Augentropfen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Kopfschmerzen"),
          tr("Türkçesi 'baş ağrısı' demek. Lütfen"),
          de("die Kopfschmerzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kopfschmerzen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Schlaftablette"),
          tr("Türkçesi 'uyku hapı' demek. Lütfen"),
          de("die Schlaftablette"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schlaftablette" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("schlucken"),
          tr("Türkçesi 'yutmak' demek. Lütfen"),
          de("schlucken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schlucken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Tube"),
          tr("Türkçesi 'tüp' demek; krem ya da diş macunu tüpü. Lütfen"),
          de("die Tube"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tube" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Bekomme ich das ohne Rezept?"),
          tr("Reçete gerekip gerekmediğini sorar. Buradaki edat belirtme hâlini getirir."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Göz damlasını reçetesiz alabilir miyim?' Almancası:"),
          de("Bekomme ich die Augentropfen ohne Rezept?"),
          tr("Lütfen"),
          de("Bekomme ich die Augentropfen ohne Rezept"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bekomme ich die Augentropfen ohne Rezept" },
      },
      {
        say: [tr("Sıra sende: 'Bir paket hap istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte eine Packung Tabletten",
          hint: [
            tr("Ölçü bildiren isimden sonra ikinci isim artikelsiz durur:"),
            de("Ich möchte eine Packung Tabletten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız dozu soruyor:"),
          de("Wie oft darf ich das nehmen?"),
          tr("İzin fiili burada 'bana ne kadarına izin var' anlamını taşıyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Hapı yutmam gerekiyor mu?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Muss ich die Tablette schlucken",
          hint: [
            tr("Zorunluluk fiili başta, asıl fiil sonda:"),
            de("Muss ich die Tablette schlucken?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wie oft darf ich den Hustensaft nehmen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wie oft darf ich den Hustensaft nehmen?",
          answer: true,
          why: [
            de("der Hustensaft"),
            tr("eril ve nesne olduğu için artikeli belirtme hâline girmiş; kip fiili de doğru seçilmiş."),
          ],
        },
      },
      {
        say: [tr("Şimdi eczanedesin ve bir şey almak istiyorsun. Üç soruyu da sor.")],
      },
    ],
    roleplay: {
      scene:
        "Eczanedesin ve öksürüğün için bir şey almak istiyorsun. Reçete gerekip gerekmediğini, ne sıklıkla alacağını ve nasıl kullanacağını sor.",
      partner: "sabırla açıklayan bir eczacı",
      opening: "Guten Tag! Was kann ich für Sie tun?",
      openingTr: "İyi günler! Size nasıl yardımcı olabilirim?",
      goal: "Ürün alınmış, doz ve kullanım öğrenilmiş ve müşteri talimatı kendi ağzıyla tekrar etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-sport-verletzung",
    icon: "sport",
    level: "A2",
    course: "de",
    title: "Beim Sport verletzt",
    titleTr: "Sakatlık",
    summary: "Sakatlığı anlatmayı ve neresini incittiğini söylerken kullanılan kalıbı öğretir.",
    minutes: 10,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "verletzt", tr: "yaralı" },
      { de: "der Knöchel", tr: "ayak bileği" },
      { de: "geschwollen", tr: "şişmiş" },
      { de: "wehtun", tr: "ağrımak" },
      { de: "der Gips", tr: "alçı" },
      { de: "das Handgelenk", tr: "el bileği" },
      { de: "röntgen", tr: "röntgen çekmek" },
      { de: "die Erste Hilfe", tr: "ilk yardım" },
    ],
    patterns: [
      { de: "Ich habe mir … verletzt.", tr: "neresini incittiğini söyler" },
      { de: "Mein … tut weh.", tr: "neresinin ağrıdığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün sakatlık anlatıyoruz. Almancada vücudun bir yerini incittiğini söylerken beklenmedik bir kalıp kullanılır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kalıp şu: kendine zarar verdiğini söylerken dönüşlü zamir yönelme hâlinde durur ve incinen yerin önünde belirlilik takısı kullanılır. Türkçede 'bileğimi incittim' derken 'benim' deriz; Almanca 'kendime bileği incittim' der. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("verletzt"),
          tr("Türkçesi 'yaralı, incinmiş' demek. Lütfen"),
          de("verletzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verletzt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Knöchel"),
          tr("Türkçesi 'ayak bileği' demek. Lütfen"),
          de("der Knöchel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Knöchel" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("geschwollen"),
          tr("Türkçesi 'şişmiş' demek. Lütfen"),
          de("geschwollen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geschwollen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("wehtun"),
          tr("Türkçesi 'ağrımak, acıtmak' demek. Lütfen"),
          de("wehtun"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wehtun" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Gips"),
          tr("Türkçesi 'alçı' demek. Lütfen"),
          de("der Gips"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Gips" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Handgelenk"),
          tr("Türkçesi 'el bileği' demek. Lütfen"),
          de("das Handgelenk"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Handgelenk" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("röntgen"),
          tr("Türkçesi 'röntgen çekmek' demek. Lütfen"),
          de("röntgen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "röntgen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Erste Hilfe"),
          tr("Türkçesi 'ilk yardım' demek. Lütfen"),
          de("die Erste Hilfe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Erste Hilfe" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe mir … verletzt."),
          tr(
            "Dönüşlü zamir yönelme hâlinde ve incinen yerin önünde belirlilik takısı var. Türkçedeki iyelik ekinin yerini bu ikisi birlikte tutuyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Futbolda bileğimi incittim.' Almancası:"),
          de("Beim Fußball habe ich mir den Knöchel verletzt."),
          tr("Lütfen"),
          de("Beim Fußball habe ich mir den Knöchel verletzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Beim Fußball habe ich mir den Knöchel verletzt" },
      },
      {
        say: [tr("Sıra sende: 'Bileğim şişti.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Knöchel ist geschwollen",
          hint: [
            tr("Burada durum bir sıfatla anlatılır ve incinen yer öznedir:"),
            de("Mein Knöchel ist geschwollen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Mein … tut weh."),
          tr("Ağrıyan yer özne olur ve fiil ayrılabilen bir fiildir; şimdiki zamanda ön ek sona düşer."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Röntgenimi çektiler.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Sie haben mich geröntgt",
          hint: [
            tr("Belirsiz bir özne için çoğul kişi kullanılır ve ortaç sona gider:"),
            de("Sie haben mich geröntgt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe meinen Knöchel verletzt."),
          tr("cümlesi Almancada doğal duruyor mu?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe meinen Knöchel verletzt.",
          answer: false,
          why: [
            tr(
              "Dilbilgisi kurulabilir ama Almanca bunu böyle söylemez: kendine zarar verirken dönüşlü zamir yönelme hâlinde durur ve iyelik yerine belirlilik takısı gelir. Doğrusu:",
            ),
            de("Ich habe mir den Knöchel verletzt."),
          ],
        },
      },
      {
        say: [tr("Şimdi spor yaparken sakatlandın ve olanı anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Spor yaparken sakatlandın ve acile geldin. Nasıl olduğunu, neresini incittiğini ve şu an nasıl olduğunu anlat.",
      partner: "acil serviste hızlı çalışan bir hemşire",
      opening: "Was ist passiert? Wo tut es weh?",
      openingTr: "Ne oldu? Neresi acıyor?",
      goal: "Kazanın nasıl olduğu ve incinen yer anlatılmış, hemşire bir sonraki adımı söylemiş ve hasta onu tekrar etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-krankenkasse",
    icon: "office",
    level: "A2",
    course: "de",
    title: "Die Versichertenkarte",
    titleTr: "Sağlık sigortası",
    summary: "Muayenehane resepsiyonundaki sigorta sorularını anlamayı ve cevaplamayı öğretir.",
    minutes: 10,
    focusId: "W-Fragen",
    vocab: [
      { de: "die Krankenkasse", tr: "sağlık sigortası" },
      { de: "privat", tr: "özel" },
      { de: "notwendig", tr: "gerekli" },
      { de: "die Vereinbarung", tr: "anlaşma" },
      { de: "der Bescheid", tr: "resmî bildirim" },
      { de: "gültig sein", tr: "geçerli olmak" },
      { de: "bestätigen", tr: "onaylamak" },
      { de: "berechtigt", tr: "yetkili" },
    ],
    patterns: [
      { de: "Bei welcher Krankenkasse sind Sie?", tr: "resepsiyonun ilk sorusudur" },
      { de: "Meine Karte ist nicht mehr gültig.", tr: "kartla ilgili sorunu bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün muayenehane resepsiyonundayız. Almanya'da doktora gitmenin ilk adımı kartı uzatmak ve birkaç soruya cevap vermektir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Resepsiyonun soruları hep soru kelimesiyle başlar ve bu tür sorularda fiil ikinci sırada durur. Bir soru kelimesi bir edatla birleşince önce edat, sonra soru kelimesi gelir; Türkçe konuşan için en şaşırtıcı kısmı bu. Önce sekiz kelime.",
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
          de("privat"),
          tr("Türkçesi 'özel' demek. Lütfen"),
          de("privat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "privat" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("notwendig"),
          tr("Türkçesi 'gerekli' demek. Lütfen"),
          de("notwendig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "notwendig" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Vereinbarung"),
          tr("Türkçesi 'anlaşma' demek. Lütfen"),
          de("die Vereinbarung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Vereinbarung" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Bescheid"),
          tr("Türkçesi 'haber, resmî bildirim' demek. Lütfen"),
          de("der Bescheid"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bescheid" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("gültig sein"),
          tr("Türkçesi 'geçerli olmak' demek. Lütfen"),
          de("gültig sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gültig sein" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("bestätigen"),
          tr("Türkçesi 'onaylamak, teyit etmek' demek. Lütfen"),
          de("bestätigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bestätigen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("berechtigt"),
          tr("Türkçesi 'yetkili, hakkı olan' demek. Lütfen"),
          de("berechtigt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "berechtigt" },
      },
      {
        say: [
          tr("İlk kalıbımız resepsiyonun ağzından:"),
          de("Bei welcher Krankenkasse sind Sie?"),
          tr(
            "Edat en başta, hemen ardından soru kelimesi. Edat yönelme hâlini getirdiği için soru kelimesi de o hâle giriyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek cevap: 'Yasal sigortalıyım.' Almancası:"),
          de("Ich bin gesetzlich versichert."),
          tr("Lütfen"),
          de("Ich bin gesetzlich versichert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bin gesetzlich versichert" },
      },
      {
        say: [tr("Sıra sende: 'Özel sigortalıyım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bin privat versichert",
          hint: [
            tr("Sıfat yüklem olarak kullanıldığı için ek almaz:"),
            de("Ich bin privat versichert."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bir sorunu bildiriyor:"),
          de("Meine Karte ist nicht mehr gültig."),
          tr("'Artık değil' anlamı iki kelimeyle kuruluyor ve ikisi de fiilden sonra duruyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Randevuyu teyit edebilir misiniz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Können Sie den Termin bestätigen",
          hint: [
            tr("Kip fiili başta, asıl fiil sonda ve nesne belirtme hâlinde:"),
            de("Können Sie den Termin bestätigen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Bei welcher Krankenkasse sind Sie?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Bei welcher Krankenkasse sind Sie?",
          answer: true,
          why: [
            tr(
              "Edat başta, soru kelimesi onun getirdiği hâlde ve fiil ikinci sırada: resepsiyonun gerçekten sorduğu cümle bu.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi muayenehane resepsiyonundasın. Soruları cevapla ve kendi sorunu sor.")],
      },
    ],
    roleplay: {
      scene:
        "Yeni bir muayenehaneye ilk kez geldin. Resepsiyondaki görevli sigortanı ve kartını soruyor; cevapla ve muayenenin ücretsiz olup olmadığını sor.",
      partner: "resepsiyondaki hızlı konuşan bir görevli",
      opening: "Guten Tag. Waren Sie schon einmal bei uns? Bei welcher Krankenkasse sind Sie?",
      openingTr: "İyi günler. Daha önce bize geldiniz mi? Hangi sağlık sigortasındasınız?",
      goal: "Sigorta bilgisi verilmiş, kart sorunu varsa söylenmiş ve ücret konusu netleşmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-zahnarzt-termin",
    icon: "tooth",
    level: "A2",
    course: "de",
    title: "Notfall beim Zahnarzt",
    titleTr: "Acil diş",
    summary: "Acil bir diş ağrısını telefonda anlatmayı ve verilen talimatları teyit etmeyi öğretir.",
    minutes: 10,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "furchtbar", tr: "korkunç" },
      { de: "die Zahnschmerzen", tr: "diş ağrısı" },
      { de: "der Notarzt", tr: "acil doktoru" },
      { de: "schmerzhaft", tr: "acı verici" },
      { de: "das Kinn", tr: "çene" },
      { de: "ansonsten", tr: "aksi takdirde" },
      { de: "heftig", tr: "şiddetli" },
      { de: "zittern", tr: "titremek" },
    ],
    patterns: [
      { de: "Es ist dringend.", tr: "durumun aciliyetini bildirir" },
      { de: "Soll ich sofort kommen?", tr: "ne yapması gerektiğini teyit eder" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün acil bir diş ağrısıyla telefondayız. Acil bir durumda kısa ve net konuşmak gerekir; bugün o cümleleri öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Telefonda üç şey söylenir: ne olduğu, ne kadar acil olduğu ve ne yapılması gerektiği. Üçüncüsü bir soru olarak sorulur ve orada kip fiili başa geçer. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("furchtbar"),
          tr("Türkçesi 'korkunç' demek. Lütfen"),
          de("furchtbar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "furchtbar" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Zahnschmerzen"),
          tr("Türkçesi 'diş ağrısı' demek; hep çoğul kullanılır. Lütfen"),
          de("die Zahnschmerzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zahnschmerzen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Notarzt"),
          tr("Türkçesi 'acil doktoru' demek. Lütfen"),
          de("der Notarzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Notarzt" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schmerzhaft"),
          tr("Türkçesi 'acı verici' demek. Lütfen"),
          de("schmerzhaft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schmerzhaft" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Kinn"),
          tr("Türkçesi 'çene' demek. Lütfen"),
          de("das Kinn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kinn" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("ansonsten"),
          tr("Türkçesi 'aksi takdirde' demek. Lütfen"),
          de("ansonsten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ansonsten" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("heftig"),
          tr("Türkçesi 'şiddetli' demek. Lütfen"),
          de("heftig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "heftig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zittern"),
          tr("Türkçesi 'titremek' demek. Lütfen"),
          de("zittern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zittern" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Es ist dringend."),
          tr(
            "Üç kelimelik bir cümle ama telefonda en çok işe yarayan cümle bu. Öznesi kişisiz; durumun kendisini anlatır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Şiddetli diş ağrım var.' Almancası:"),
          de("Ich habe heftige Zahnschmerzen."),
          tr("Lütfen"),
          de("Ich habe heftige Zahnschmerzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe heftige Zahnschmerzen" },
      },
      {
        say: [tr("Sıra sende: 'Aksi takdirde beklemek zorundasınız.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ansonsten müssen Sie warten",
          hint: [
            tr("Bağlayıcı başta olduğu için özne fiilin arkasına düşer ve asıl fiil sonda kalır:"),
            de("Ansonsten müssen Sie warten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız talimatı teyit ediyor:"),
          de("Soll ich sofort kommen?"),
          tr("Kip fiili başa geçince cümle soru oluyor ve karşıdakinin ne istediğini teyit ediyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Şimdi mi gelmeliyim?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Soll ich jetzt kommen",
          hint: [
            tr("Kip fiili başta, asıl fiil sonda:"),
            de("Soll ich jetzt kommen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe heftig Zahnschmerzen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe heftig Zahnschmerzen.",
          answer: false,
          why: [
            tr(
              "Sıfat bir ismin önünde durduğunda ek alır; burada isim çoğul ve artikelsiz olduğu için sıfat çoğul ekini alır. Doğrusu:",
            ),
            de("Ich habe heftige Zahnschmerzen."),
          ],
        },
      },
      {
        say: [tr("Şimdi diş hekimini arıyorsun. Durumu anlat ve ne yapman gerektiğini sor.")],
      },
    ],
    roleplay: {
      scene:
        "Gece boyunca dişin ağrıdı ve sabah muayenehaneyi arıyorsun. Ağrını anlat, ne kadar acil olduğunu söyle ve bugün gelip gelemeyeceğini sor.",
      partner: "telefona bakan, randevu defterine göre konuşan bir görevli",
      opening: "Zahnarztpraxis Berger, guten Morgen. Was kann ich für Sie tun?",
      openingTr: "Berger diş kliniği, günaydın. Size nasıl yardımcı olabilirim?",
      goal: "Ağrı ve aciliyet anlatılmış, bir saat kararlaştırılmış ve hasta o saati tekrar etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-stress",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Zu viel Stress",
    titleTr: "Stres ve uyku",
    summary: "Stresi anlatmayı ve dönüşlü zamirin olumsuz cümlede nereye oturduğunu öğretir.",
    minutes: 10,
    focusId: "Reflexivverben",
    vocab: [
      { de: "der Stress", tr: "stres" },
      { de: "gestresst", tr: "stresli" },
      { de: "sich entspannen", tr: "rahatlamak" },
      { de: "abschalten", tr: "kafa dağıtmak" },
      { de: "unruhig", tr: "huzursuz" },
      { de: "sich ausschlafen", tr: "uykusunu almak" },
      { de: "sich hinlegen", tr: "uzanmak" },
      { de: "die Massage", tr: "masaj" },
    ],
    patterns: [
      { de: "Ich kann nicht abschalten.", tr: "kafayı dağıtamadığını söyler" },
      { de: "Ich muss mich entspannen.", tr: "ihtiyacını dönüşlü fiille söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün stresi konuşuyoruz. Dönüşlü fiiller bu derste bir kez daha karşına çıkacak, ama bu kez kip fiiliyle ve olumsuzla birlikte. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir kip fiili ile dönüşlü fiil aynı cümlede olduğunda zamir yerinde kalır: kip fiilinden hemen sonra. Asıl fiil sona gider ama zamir onunla birlikte gitmez. Bu, en çok karıştırılan sıralardan biri. Önce sekiz kelime.",
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
          tr("İkinci kelimemiz:"),
          de("gestresst"),
          tr("Türkçesi 'stresli' demek. Lütfen"),
          de("gestresst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gestresst" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
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
          de("abschalten"),
          tr("Türkçesi 'kafa dağıtmak' demek; cihaz kapatmak anlamına da gelir. Lütfen"),
          de("abschalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abschalten" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("unruhig"),
          tr("Türkçesi 'huzursuz' demek. Lütfen"),
          de("unruhig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unruhig" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("sich ausschlafen"),
          tr("Türkçesi 'uykusunu almak' demek. Lütfen"),
          de("sich ausschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich ausschlafen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("sich hinlegen"),
          tr("Türkçesi 'uzanmak' demek. Lütfen"),
          de("sich hinlegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich hinlegen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Massage"),
          tr("Türkçesi 'masaj' demek. Lütfen"),
          de("die Massage"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Massage" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich kann nicht abschalten."),
          tr(
            "Olumsuzluk kelimesi asıl fiilin hemen önünde duruyor. Bu fiil ayrılabilen bir fiil ama kip fiiliyle birlikte kullanılınca bölünmüyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Akşamları kafamı dağıtamıyorum.' Almancası:"),
          de("Abends kann ich nicht abschalten."),
          tr("Lütfen"),
          de("Abends kann ich nicht abschalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Abends kann ich nicht abschalten" },
      },
      {
        say: [tr("Sıra sende: 'Bir saat uzanmam gerekiyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich muss mich eine Stunde hinlegen",
          hint: [
            tr("Dönüşlü zamir kip fiilinden hemen sonra durur, asıl fiil sona gider:"),
            de("Ich muss mich eine Stunde hinlegen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich muss mich entspannen."),
          tr("Zamirin yeri burada da aynı: kip fiilinden hemen sonra, asıl fiilden çok önce."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Hafta sonu uykumu almak istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Wochenende möchte ich mich ausschlafen",
          hint: [
            tr("Zaman ifadesi başta olunca özne arkaya düşer, zamir hemen onun ardından gelir:"),
            de("Am Wochenende möchte ich mich ausschlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich muss mich am Wochenende ausschlafen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich muss mich am Wochenende ausschlafen.",
          answer: true,
          why: [
            tr("Dönüşlü zamir kip fiilinden hemen sonra, asıl fiil sonda: sıralama doğru."),
          ],
        },
      },
      {
        say: [tr("Şimdi çok stresli bir dönemdesin ve birine anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Son haftalarda çok stresli bir dönemden geçiyorsun ve bir arkadaşınla konuşuyorsun. Neyin seni yorduğunu ve neyin sana iyi geldiğini anlat.",
      partner: "seni dinleyip öneri getiren bir arkadaş",
      opening: "Du wirkst so unruhig in letzter Zeit. Ist alles okay bei dir?",
      openingTr: "Son zamanlarda huzursuz görünüyorsun. Her şey yolunda mı?",
      goal: "Stresin sebebi anlatılmış, en az bir rahatlama yolu konuşulmuş ve bir tanesini denemeye karar verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-vorsorge",
    icon: "doctor",
    level: "A2",
    course: "de",
    title: "Gesund bleiben",
    titleTr: "Check-up",
    summary: "Düzenli sağlık kontrollerini konuşmayı ve genel geçer tavsiyeyi kurmayı öğretir.",
    minutes: 10,
    focusId: "Modalverb-sollen",
    vocab: [
      { de: "die Gesundheit", tr: "sağlık" },
      { de: "fit sein", tr: "formda olmak" },
      { de: "die Lunge", tr: "akciğer" },
      { de: "kontrollieren", tr: "kontrol etmek" },
      { de: "jährlich", tr: "yıllık" },
      { de: "impfen", tr: "aşılamak" },
      { de: "die Blutprobe", tr: "kan örneği" },
      { de: "der Blutzucker", tr: "kan şekeri" },
    ],
    patterns: [
      { de: "Man sollte … machen.", tr: "genel geçer bir tavsiye verir" },
      { de: "Einmal im Jahr …", tr: "sıklığı söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde koruyucu sağlığı konuşuyoruz: düzenli kontroller, aşılar, tahliller. Bir de herkes için geçerli tavsiye kurmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'insan şunu yapmalı' deriz ve kimseyi kastetmeyiz. Almancada bunun için ayrı bir belirsiz özne var; fiil hep tekil kalır. Kip fiilinin yumuşak biçimiyle birleşince nazik ve genel bir tavsiye çıkar. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Gesundheit"),
          tr("Türkçesi 'sağlık' demek. Lütfen"),
          de("die Gesundheit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Gesundheit" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("fit sein"),
          tr("Türkçesi 'formda olmak' demek. Lütfen"),
          de("fit sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fit sein" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Lunge"),
          tr("Türkçesi 'akciğer' demek. Lütfen"),
          de("die Lunge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Lunge" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("kontrollieren"),
          tr("Türkçesi 'kontrol etmek' demek. Lütfen"),
          de("kontrollieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kontrollieren" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("jährlich"),
          tr("Türkçesi 'yıllık, her yıl' demek. Lütfen"),
          de("jährlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jährlich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("impfen"),
          tr("Türkçesi 'aşılamak' demek. Lütfen"),
          de("impfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "impfen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Blutprobe"),
          tr("Türkçesi 'kan örneği' demek. Lütfen"),
          de("die Blutprobe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Blutprobe" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Blutzucker"),
          tr("Türkçesi 'kan şekeri' demek. Lütfen"),
          de("der Blutzucker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Blutzucker" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Man sollte … machen."),
          tr(
            "Belirsiz özne ve kip fiilinin yumuşak biçimi. Kimseyi işaret etmeyen, herkes için geçerli bir tavsiye kurar.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yılda bir kez kan tahlili yaptırmalı.' Almancası:"),
          de("Man sollte einmal im Jahr eine Blutprobe machen."),
          tr("Lütfen"),
          de("Man sollte einmal im Jahr eine Blutprobe machen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Man sollte einmal im Jahr eine Blutprobe machen" },
      },
      {
        say: [tr("Sıra sende: 'Kan şekerini kontrol etmeli.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Man sollte den Blutzucker kontrollieren",
          hint: [
            tr("Belirsiz özne tekil kalır ve kip fiilinin yumuşak biçimi kullanılır:"),
            de("Man sollte den Blutzucker kontrollieren."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sıklığı söylüyor:"),
          de("Einmal im Jahr …"),
          tr("Zaman ifadesi başa geçince özne fiilin arkasına düşüyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kendimi her yıl aşılatıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich lasse mich jährlich impfen",
          hint: [
            tr("Bir işi başkasına yaptırmak için ayrı bir fiil kullanılır ve asıl fiil sonda kalır:"),
            de("Ich lasse mich jährlich impfen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Man sollten jährlich zum Arzt gehen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Man sollten jährlich zum Arzt gehen.",
          answer: false,
          why: [
            tr("Belirsiz özne hep tekildir, fiil de tekil çekimlenir. Doğrusu:"),
            de("Man sollte jährlich zum Arzt gehen."),
          ],
        },
      },
      {
        say: [tr("Şimdi sağlıklı kalmak için ne yaptığını konuşuyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Yıllık kontrolde doktorunla konuşuyorsun. Sağlıklı kalmak için ne yaptığını anlat ve doktorun tavsiyelerini dinleyip teyit et.",
      partner: "koruyucu sağlığa önem veren bir aile hekimi",
      opening: "Ihre Werte sehen gut aus. Was machen Sie denn für Ihre Gesundheit?",
      openingTr: "Değerleriniz iyi görünüyor. Sağlığınız için neler yapıyorsunuz?",
      goal: "Hastanın yaptıkları anlatılmış, doktor en az bir tavsiye vermiş ve hasta onu kendi ağzıyla tekrar etmiş olur.",
      minTurns: 8,
    },
  },
];

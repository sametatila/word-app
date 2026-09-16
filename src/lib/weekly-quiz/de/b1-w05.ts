import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 5 · Transfer.
 *
 * SAF TEKRAR DEĞİL. W1–W4'ün yapıları bilerek BAŞKA metin türlerinde
 * çıkıyor: görüş bildirme forumdan radyoya dinleyici bağlantısına, edilgen
 * haberden resmî bir şikâyet e-postasına, ilgi cümlesi deneyim yazısından
 * gündelik bir soruna, Genitiv haber dilinden mektup diline taşınıyor. Aynı
 * kuralı tanıdık bağlamın dışında da kurabilmek, ezberlenmiş bir kalıptan
 * ayrılan şey tam olarak bu.
 *
 * ARALIKLI TEKRAR — hangi madde neye dönüyor:
 *  - `w05-g1` → W1 `nebensatz.verbend`, `konnektor.weil-denn`
 *  - `w05-g2` → W3 `relativsatz.dativ`
 *  - `w05-g3` → W2/W4 `genitiv.praeposition`
 *  - `w05-g4` → W1 `konjunktiv2.modal`, bu kez kibar bir istekte
 *  - `w05-g5` → W4 `passiv.modal` ve W1 `nebensatz.dass` birlikte
 *  - `w05-v1` → W1 `falsefriend.eventuell`, `w05-v2` → W3
 *    `falsefriend.bekommen`, `w05-v3` → W2 `falsefriend.aktuell`
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w05-g4` (`Könnten Sie …?`): İngilizce `could` hem geçmiş hem kibar
 *    istek; `Konnten Sie` doğrudan bu aktarımdan geliyor.
 *  - `w05-v2` (`bekommen`): Türkçede `almak` hem `nehmen` hem `bekommen`;
 *    İngilizcede `get` doğru, `become` → `werden` yanlış.
 */
export const DE_B1_W05: QuizWeek = {
  id: "de-b1-w05",
  course: "de",
  level: "B1",
  no: 5,
  theme: "Transfer: Beschwerde und Radiodiskussion",
  themeTr: "Transfer: şikâyet ve radyo tartışması",
  canDo: ["B1.RD.2", "B1.WR.2", "B1.SPK.4", "B1.LS.3", "B1.GR.1", "B1.GR.2", "B1.GR.3", "B1.GR.4", "B1.GR.6"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Beschwerde-E-Mail",
      genreTr: "Şikâyet e-postası",
      title: "Betreff: Heizung in Wohnung 3B",
      body:
        "Sehr geehrter Herr Wolf,\n\n" +
        "ich schreibe Ihnen, weil die Heizung in unserer Wohnung seit zwei Wochen nicht richtig funktioniert. " +
        "Am 3. November wurde sie von einem Handwerker kontrolliert, der uns gesagt hat, dass ein Teil bestellt werden muss. " +
        "Seitdem haben wir leider nichts mehr gehört. Ich habe Sie am 8. November auch angerufen, aber niemand hat mich zurückgerufen.\n\n" +
        "Wegen der kaputten Heizung können unsere Kinder nachts kaum schlafen, und meine Frau, die zu Hause arbeitet, " +
        "muss tagsüber im Mantel am Schreibtisch sitzen. Wir haben schon zwei kleine elektrische Heizungen gekauft. " +
        "Deshalb ist unsere Stromrechnung jetzt deutlich höher.\n\n" +
        "Ich verstehe, dass so etwas passieren kann. Trotzdem finde ich, dass zwei Wochen zu lang sind. " +
        "Könnten Sie mir bitte bis Freitag mitteilen, wann die Heizung repariert wird? " +
        "Außerdem würde ich Sie bitten, uns die höheren Kosten für den Strom zu bezahlen.\n\n" +
        "Falls ich bis Freitag keine Antwort bekomme, werde ich mich an einen Anwalt wenden.\n\n" +
        "Mit freundlichen Grüßen\nEmre Kaya",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Radiosendung mit Hörern",
      genreTr: "Dinleyici bağlantılı radyo programı",
      plays: 2,
      segments: [
        { speaker: "Moderator", text: "Guten Abend! Heute geht es um die Frage: Sollte jeder das Recht haben, von zu Hause zu arbeiten? Zuerst spreche ich mit Katrin." },
        { speaker: "Katrin", text: "Hallo! Also, ich bin auf jeden Fall dafür. Seit ich zweimal pro Woche zu Hause arbeite, spare ich jeden Tag zwei Stunden im Zug." },
        { speaker: "Moderator", text: "Und Ihr Chef? Ist er zufrieden?" },
        { speaker: "Katrin", text: "Am Anfang war er nicht sicher. Aber inzwischen sieht er, dass ich zu Hause sogar mehr schaffe." },
        { speaker: "Moderator", text: "Danke, Katrin. Jetzt ist Jens am Telefon." },
        { speaker: "Jens", text: "Guten Abend. Ich sehe das etwas anders. Ich bin Koch – ich kann gar nicht von zu Hause arbeiten." },
        { speaker: "Moderator", text: "Das heißt, Sie sind dagegen?" },
        { speaker: "Jens", text: "Nicht dagegen. Aber ein Recht nur für Leute, die im Büro arbeiten, fände ich ungerecht." },
        { speaker: "Moderator", text: "Was wäre denn für Sie gerecht?" },
        { speaker: "Jens", text: "Zum Beispiel, dass Leute wie ich mehr freie Tage bekommen, wenn andere zu Hause bleiben dürfen." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b1-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Was ist bis jetzt passiert?",
      options: [
        "Die Heizung wurde repariert.",
        "Ein Handwerker hat die Heizung kontrolliert.",
        "Der Vermieter hat ein Teil bestellt.",
        "Die Familie hat eine neue Heizung bekommen.",
      ],
      answer: 1,
      why: "`wurde … kontrolliert` edilgen geçmiş: yapılmış bir iş. `bestellt werden muss` ise yapılması GEREKEN bir şey ve yapıldığı hiçbir yerde söylenmiyor; `Seitdem … nichts mehr gehört` tam tersini gösteriyor. Modal fiilli edilgeni olmuş bir olay gibi okumak tuzak.",
      targets: ["lesen.detail", "passiv.modal"],
    },
    {
      id: "de-b1-w05-r2",
      block: "read",
      ref: "t1",
      stem: "Warum ist die Stromrechnung höher?",
      options: [
        "Die Kinder können nachts nicht schlafen.",
        "Die Frau arbeitet zu Hause.",
        "Die Familie benutzt kleine elektrische Heizungen.",
        "Der Handwerker hat viel Strom gebraucht.",
      ],
      answer: 2,
      why: "`Deshalb` hemen önceki cümleye, satın alınan elektrikli ısıtıcılara bağlanıyor. Evde çalışan eş ve uyuyamayan çocuklar arızanın SONUÇLARI olarak anlatılıyor, faturanın sebebi olarak değil. `deshalb`ın neye geri döndüğünü bulmak gerekiyor.",
      targets: ["lesen.detail", "konnektor.deshalb"],
    },
    {
      id: "de-b1-w05-r3",
      block: "read",
      ref: "t1",
      stem: "Was möchte der Autor vom Vermieter?",
      options: [
        "eine andere Wohnung",
        "zwei neue elektrische Heizungen",
        "einen Anruf von seinem Anwalt",
        "bis Freitag eine Information und Geld für den Strom",
      ],
      answer: 3,
      why: "İki istek Konjunktiv II ile kibarca kuruluyor: `Könnten Sie …`, `würde ich Sie bitten …`. Kibar biçim isteği yumuşatır ama ortadan kaldırmaz. Avukat ise cevap GELMEZSE ne yapacağı: `Falls` bir koşul açıyor, istek değil.",
      targets: ["lesen.detail", "konjunktiv2.modal"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b1-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum ist Katrin dafür, von zu Hause zu arbeiten?",
      options: [
        "Sie braucht weniger Zeit für den Weg.",
        "Ihr Chef möchte das so.",
        "Sie verdient zu Hause mehr Geld.",
        "Sie arbeitet nicht gern mit Kollegen.",
      ],
      answer: 0,
      why: "Gerekçe `spare ich jeden Tag zwei Stunden im Zug`: tren yolculuğundan kazanılan zaman. `mehr schaffe` daha çok iş çıkarmak demek, daha çok kazanmak değil. İş çıkarmak ile para kazanmak yakın görünen ama ayrı iki fikir.",
      targets: ["hoeren.meinung"],
    },
    {
      id: "de-b1-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "Was denkt der Chef von Katrin heute?",
      options: [
        "Er ist nicht sicher.",
        "Er möchte, dass sie wieder ins Büro kommt.",
        "Er sieht, dass sie zu Hause viel schafft.",
        "Er arbeitet selbst von zu Hause.",
      ],
      answer: 2,
      why: "İki zaman işareti iki ayrı görüşü ayırıyor: `Am Anfang` eski tereddüt, `inzwischen` bugünkü görüş. Soru bugünü soruyor; ilk duyulan görüşü cevap sanmak tuzak.",
      targets: ["hoeren.meinung"],
    },
    {
      id: "de-b1-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "Was findet Jens ungerecht?",
      options: [
        "dass er als Koch arbeiten muss",
        "dass Katrin zu Hause arbeitet",
        "dass Köche zu viele freie Tage haben",
        "ein Recht, das nur Menschen im Büro haben",
      ],
      answer: 3,
      why: "`fände ich ungerecht` Konjunktiv II: Jens henüz var olmayan bir yasayı değerlendiriyor. Karşı çıktığı şey evden çalışmanın kendisi değil (`Nicht dagegen`), bu hakkın yalnız bir gruba verilmesi. Görüşün NEYE yöneldiğini ilgi cümlesi (`die im Büro arbeiten`) belirliyor.",
      targets: ["hoeren.meinung", "relativsatz.nominativ"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b1-w05-g1",
      block: "grammar",
      stem: "Ich schreibe Ihnen, weil die Heizung seit zwei Wochen nicht ___.",
      options: ["richtig funktioniert", "funktioniert richtig", "richtig funktionieren", "hat richtig funktioniert"],
      answer: 0,
      why: "`weil` bir yan cümle açar: çekimli fiil en sona gider, zarf (`richtig`) ondan önce kalır. Özne tekil (`die Heizung`), fiil de ona uyar. Resmî bir mektupta da kural aynı.",
      targets: ["nebensatz.verbend", "konnektor.weil-denn"],
      byNative: {
        en: {
          options: ["richtig funktioniert", "funktioniert richtig", "richtig funktionieren", "hat richtig funktioniert"],
          answer: 0,
          why: "`because the heating doesn't work properly` sırasında fiil zarftan önce geliyor ve İngilizcede `because` bunu değiştirmiyor. Almancada `weil` çekimli fiili sona iter: `nicht richtig funktioniert`.",
        },
      },
    },
    {
      id: "de-b1-w05-g2",
      block: "grammar",
      stem: "Der Handwerker, ___ ich die Heizung gezeigt habe, war sehr freundlich.",
      options: ["den", "der", "dem", "dessen"],
      answer: 2,
      why: "`zeigen` iki nesne alır: gösterilen şey Akkusativ (`die Heizung`), gösterilen kişi Dativ. Akkusativ yeri zaten dolu, yani ilgi zamiri kişiyi Dativ'de taşıyor: eril → `dem`.",
      targets: ["relativsatz.dativ"],
      byNative: {
        tr: {
          options: ["den", "der", "dem", "dessen"],
          answer: 2,
          why: "Türkçede `kaloriferi gösterdiğim usta` yapısında ustanın `-e` hâli görünmüyor, ek fiilin içinde eriyor. Almancada kişinin durumu zamirde görünmek zorunda: `jemandem etwas zeigen` → Dativ, eril → `dem`.",
        },
        en: {
          options: ["den", "der", "dem", "dessen"],
          answer: 2,
          why: "İngilizcede `the repairman I showed the heating to` zamirsiz ve durumsuz; resmî biçimde de tek `whom` var, o yüzden `den` geliyor. Almancada `zeigen` kişiyi Dativ ister: `dem`.",
        },
      },
    },
    {
      id: "de-b1-w05-g3",
      block: "grammar",
      stem: "Wegen ___ können die Kinder nachts kaum schlafen.",
      options: ["die kaputte Heizung", "der kaputten Heizung", "dem kaputten Heizung", "des kaputten Heizungs"],
      answer: 1,
      why: "Resmî yazıda `wegen` Genitiv ister. `Heizung` dişil: Genitiv tanımlığı `der`, sıfat `-en` alır, isim ek almaz. `-s` eki yalnız eril ve nötr isimlerde (`des Wetters`) gelir.",
      targets: ["genitiv.praeposition"],
      byNative: {
        tr: {
          options: ["die kaputte Heizung", "der kaputten Heizung", "dem kaputten Heizung", "des kaputten Heizungs"],
          answer: 1,
          why: "Türkçede `bozuk kalorifer yüzünden` edatı sona gelir ve isim değişmez. Almancada `wegen` önde durur ve arkasındaki öbeği Genitiv'e çeker; dişil isimde tanımlık `der` olur, bu da Nominativ'deki `der` ile aynı görünse de burada Genitiv.",
        },
      },
    },
    {
      id: "de-b1-w05-g4",
      block: "grammar",
      stem: "Welcher Satz ist eine höfliche Bitte in einem Brief?",
      options: [
        "Antworten Sie mir bis Freitag!",
        "Könnten Sie mir bitte bis Freitag antworten?",
        "Konnten Sie mir bis Freitag antworten?",
        "Sie antworten mir bis Freitag.",
      ],
      answer: 1,
      why: "Resmî bir istekte kibarlığı Konjunktiv II taşır: `Könnten Sie …?`. `Konnten` düz geçmiş zaman ve geçmişteki bir yeteneği sorar. `bitte`siz emir kipi ve düz bildirme cümlesi mektupta talimat gibi okunur.",
      targets: ["konjunktiv2.modal"],
      byNative: {
        tr: {
          options: [
            "Antworten Sie mir bis Freitag!",
            "Könnten Sie mir bitte bis Freitag antworten?",
            "Konnten Sie mir bis Freitag antworten?",
            "Sie antworten mir bis Freitag.",
          ],
          answer: 1,
          why: "Türkçede kibar rica `-abilir misiniz` ile şimdiki zamanda kurulur ve bu yeterince kibardır. Almanca resmî yazıda kibarlığı Konjunktiv II taşır: `Könnten Sie …?`. Noktasız `Konnten` ise geçmiş zaman.",
        },
        en: {
          options: [
            "Antworten Sie mir bis Freitag!",
            "Könnten Sie mir bitte bis Freitag antworten?",
            "Konnten Sie mir bis Freitag antworten?",
            "Sie antworten mir bis Freitag.",
          ],
          answer: 1,
          why: "İngilizce `Could you …?` hem kibar istek hem geçmiş zaman biçimi; bu yüzden `Konnten Sie` doğru görünür. Almancada ikisi ayrı: geçmiş `konnten`, kibar istek umlautlu `könnten`.",
        },
      },
    },
    {
      id: "de-b1-w05-g5",
      block: "grammar",
      stem: "Der Handwerker hat gesagt, dass ein Teil ___.",
      options: ["muss bestellt werden", "bestellt muss werden", "werden bestellt muss", "bestellt werden muss"],
      answer: 3,
      why: "Yan cümlede çekimli fiil en sona gider; modal fiilli edilgende çekimli fiil modalın kendisi (`muss`). Önünde Partizip ve `werden` mastarı sırasıyla durur.",
      targets: ["passiv.modal", "nebensatz.dass", "nebensatz.verbend"],
      byNative: {
        en: {
          options: ["muss bestellt werden", "bestellt muss werden", "werden bestellt muss", "bestellt werden muss"],
          answer: 3,
          why: "İngilizcede `that a part must be ordered` ana cümleyle aynı sırada kalıyor, o yüzden `muss bestellt werden` doğru görünür. Almancada `dass` çekimli modalı en sona iter: Partizip, `werden`, en sonda `muss`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b1-w05-v1",
      block: "vocab",
      stem: "Ich habe ___ am Freitag Zeit, aber ich muss noch meinen Chef fragen.",
      options: ["schließlich", "endlich", "eventuell", "sowieso"],
      answer: 2,
      why: "Cümlenin ikinci yarısı sonucun henüz belli olmadığını söylüyor, yani boşluğa olasılık bildiren bir sözcük gelmeli. `sowieso` `zaten, her durumda` demek ve `aber` ile çelişir; `schließlich`/`endlich` sonunda.",
      targets: ["falsefriend.eventuell"],
      byNative: {
        en: {
          options: ["schließlich", "endlich", "eventuell", "sowieso"],
          answer: 2,
          why: "`eventuell` = maybe; İngilizce `eventually` ise `schließlich`. Cümle bir plan belirsizliği anlatıyor: `eventually I have time` değil, `maybe I have time`.",
        },
      },
    },
    {
      id: "de-b1-w05-v2",
      block: "vocab",
      stem: "Falls ich bis Freitag keine Antwort ___, rufe ich einen Anwalt an.",
      options: ["nehme", "bekomme", "werde", "halte"],
      answer: 1,
      why: "Bir cevap, mektup ya da haber `bekommen` ile alınır: kişi bir şeyi kendi eliyle almıyor, ona geliyor. `nehmen` bir şeyi elle almak ya da seçmektir; `werden` olmak.",
      targets: ["falsefriend.bekommen", "verb.werden"],
      byNative: {
        tr: {
          options: ["nehme", "bekomme", "werde", "halte"],
          answer: 1,
          why: "Türkçede `almak` iki Almanca fiile bölünüyor: bir şeyi elle alıp tutmak `nehmen`, size gönderilen bir şeyi almak `bekommen`. `Cevap almak`ta cevap size geliyor: `bekommen`.",
        },
        en: {
          options: ["nehme", "bekomme", "werde", "halte"],
          answer: 1,
          why: "`get an answer` → `eine Antwort bekommen` burada birebir. Tuzak ters yönde: `bekommen`i `become` sanıp kaçınınca `werde` seçiliyor, ama `werden` = become.",
        },
      },
    },
    {
      id: "de-b1-w05-v3",
      block: "vocab",
      stem: "Die Frage, ob man von zu Hause arbeiten darf, ist gerade sehr ___.",
      options: ["aktuell", "eigentlich", "tatsächlich", "wirklich"],
      answer: 0,
      why: "Bir konunun şu an gündemde olduğunu `aktuell` söyler. Öteki üçü cümle zarfıdır (`asında`, `gerçekten`) ve `ist sehr …` yapısında tek başına yüklem olamaz.",
      targets: ["falsefriend.aktuell"],
      byNative: {
        en: {
          options: ["aktuell", "eigentlich", "tatsächlich", "wirklich"],
          answer: 0,
          why: "`aktuell` = current, topical; İngilizce `actually` ise `eigentlich` ya da `tatsächlich`. `sehr aktuell` = gündemde, tartışılan.",
        },
      },
    },
  ],
};

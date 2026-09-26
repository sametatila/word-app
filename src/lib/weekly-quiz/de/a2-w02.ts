import type { QuizWeek } from "../types";

/**
 * A2 · Hafta 2 · Sağlık ve randevu.
 *
 * ÖLÇÜLEN ŞEY: muayenehane duyurusunu ve randevu telefonunu anlamak; acıyı
 * Dativ ile söylemek (`mir tut … weh`), yasak ile gereksizliği ayırmak, kibar
 * emir ve `weil`. Geri dönüş: `perfekt.sein` (W1) `bleiben` istisnasıyla.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w02-g2` (`nicht dürfen`): İngilizce `must not` yasak, Almanca
 *    `nicht müssen` 'gerek yok' — anlamı tersine çeviren en tehlikeli aktarım.
 *  - `w02-g1` (`mir`): Türkçe 'başım' ve İngilizce `my head` iyelikle kuruluyor;
 *    `Mein Kopf tut weh` da doğru, ama `der Kopf` stemde varken acı çeken Dativ.
 *  - `w02-v2` (`Rezept`): İngilizce konuşan için `receipt` sahte dostu —
 *    `Kassenzettel` şıkkı bunu yakalıyor, varyant açıklaması adını koyuyor.
 *  - `w02-v3` (`krank werden`): İngilizce varyantta `bekomme` şıkkı; A1'deki
 *    `verb.bekommen` hedefi seviye üstünde yeniden yoklanıyor.
 */
export const DE_A2_W02: QuizWeek = {
  id: "de-a2-w02",
  course: "de",
  level: "A2",
  no: 2,
  theme: "Gesundheit und Termine",
  themeTr: "Sağlık ve randevu",
  canDo: ["A2.SPK.1", "A2.SPK.4", "A2.LS.2", "A2.LS.5", "A2.RD.3", "A2.GR.2", "A2.GR.3", "A2.GR.4", "A2.GR.5"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Information",
      genreTr: "Bilgi duyurusu",
      title: "Praxis Dr. Weber – wichtige Informationen",
      body:
        "Unsere Praxis ist vom 4. bis 15. August geschlossen, weil wir Urlaub machen. In dieser Zeit hilft Ihnen Dr. Schulz in der Bahnhofstraße 12. " +
        "Die Sprechstunde ist montags bis freitags von 8 bis 12 Uhr, am Dienstag und Donnerstag auch nachmittags von 15 bis 18 Uhr. " +
        "Bitte rufen Sie vorher an und vereinbaren Sie einen Termin. Ohne Termin müssen Sie oft lange warten. " +
        "Brauchen Sie nur ein Rezept für Ihre Medikamente? Dann schreiben Sie uns eine E-Mail. Sie können das Rezept zwei Tage später abholen. " +
        "Haben Sie Fieber oder Husten? Dann kommen Sie bitte nicht direkt in die Praxis, sondern rufen Sie zuerst an. " +
        "Wenn es sehr dringend ist, rufen Sie die 112 an.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Telefongespräch",
      genreTr: "Telefon görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Praxis", text: "Praxis Dr. Weber, guten Morgen. Was kann ich für Sie tun?" },
        { speaker: "Herr Arslan", text: "Guten Morgen, hier ist Arslan. Ich brauche einen Termin. Ich habe seit drei Tagen starke Rückenschmerzen." },
        { speaker: "Praxis", text: "Haben Sie auch Fieber?" },
        { speaker: "Herr Arslan", text: "Nein, Fieber habe ich nicht. Aber ich kann nicht lange sitzen." },
        { speaker: "Praxis", text: "Heute ist leider alles voll. Können Sie morgen früh um 8 Uhr 30 kommen?" },
        { speaker: "Herr Arslan", text: "Morgen früh muss ich arbeiten. Geht es auch am Nachmittag?" },
        { speaker: "Praxis", text: "Ja, um 16 Uhr. Bringen Sie bitte Ihren Ausweis mit." },
        { speaker: "Herr Arslan", text: "Gut, dann komme ich morgen um 16 Uhr. Vielen Dank!" },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-a2-w02-r1",
      block: "read",
      ref: "t1",
      stem: "Sie brauchen nur ein neues Rezept. Was machen Sie?",
      options: ["Sie rufen die 112 an.", "Sie kommen ohne Termin in die Praxis.", "Sie schreiben der Praxis eine E-Mail.", "Sie gehen zu Dr. Schulz."],
      answer: 2,
      why: "Duyuru her durum için ayrı bir yol veriyor. Önce senin durumunu anlatan koşul cümlesini (`Brauchen Sie nur ein Rezept?`) bulmak, sonra yalnız onun `Dann` kısmını okumak gerekiyor; başka bir durumun yolunu seçmek bu metin türünde en sık hata.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-a2-w02-r2",
      block: "read",
      ref: "t1",
      stem: "Wann können Sie am Mittwoch zum Arzt gehen?",
      options: ["von 15 bis 18 Uhr", "von 8 bis 12 Uhr", "von 8 bis 18 Uhr", "gar nicht"],
      answer: 1,
      why: "Öğleden sonra saatleri yalnız `am Dienstag und Donnerstag` için geçerli. `auch nachmittags` bir ekleme ve yalnız adı geçen günlere bağlı; bütün haftaya yayılmıyor.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-a2-w02-r3",
      block: "read",
      ref: "t1",
      stem: "Sie haben Fieber. Was ist richtig?",
      options: ["Sie rufen zuerst in der Praxis an.", "Sie gehen direkt in die Praxis.", "Sie warten bis zum 15. August.", "Sie holen ein Rezept ab."],
      answer: 0,
      why: "`nicht …, sondern …` yapısında geçerli olan, `sondern`dan sonraki kısımdır. Olumsuzlanan eylemi (`direkt in die Praxis`) talimat sanmak tipik okuma hatası.",
      targets: ["lesen.detail", "konnektor.sondern"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-a2-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum ruft Herr Arslan an?",
      options: ["Er hat Fieber.", "Er braucht ein Rezept.", "Er kann nicht arbeiten.", "Er hat Rückenschmerzen."],
      answer: 3,
      why: "`Fieber` diyalogda geçiyor ama bir soruya verilen olumsuz cevapta: `Fieber habe ich nicht`. Dinlerken duyulan her hastalık sözcüğü şikâyet değildir; olumsuzlanan sözcüğü elemek gerekiyor.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-a2-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "Wann hat Herr Arslan seinen Termin?",
      options: ["heute am Nachmittag", "morgen um 8:30 Uhr", "morgen um 16 Uhr", "heute um 8:30 Uhr"],
      answer: 2,
      why: "İlk önerilen saat (sabah) reddediliyor, yerine öğleden sonrası konuşuluyor. Telefonla randevuda geçerli olan son onaylanan saattir; ilk duyulan saati not etmek sık yapılan hata.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-a2-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "Warum kann Herr Arslan nicht morgen früh kommen?",
      options: ["Die Praxis ist voll.", "Er muss arbeiten.", "Er kann nicht lange sitzen.", "Er hat keinen Ausweis."],
      answer: 1,
      why: "`Heute ist alles voll` bugüne ait bir engel; yarın sabahı engelleyen Herr Arslan'ın kendi işi (`Morgen früh muss ich arbeiten`). `heute` ile `morgen früh` ayrımı kaçınca iki farklı gerekçe birbirine karışıyor.",
      targets: ["hoeren.detail", "modal.muessen"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-a2-w02-g1",
      block: "grammar",
      stem: "Seit gestern tut ___ der Kopf weh.",
      options: ["ich", "mich", "mein", "mir"],
      answer: 3,
      why: "`Mein Kopf tut weh` da doğru; ama cümlede `der Kopf` varsa acıyı çeken kişi Dativ'le söylenir: `mir`. Türkçede 'başım ağrıyor' iyelikle kurulduğu için `mein`, 'ben' diye düşününce `ich` akla geliyor.",
      targets: ["kasus.dativ", "verb.wehtun"],
      byNative: {
        en: {
          options: ["mir", "mein", "mich", "ich"],
          answer: 0,
          why: "İngilizcede `my head hurts` iyelikle kurulur; Almancada `Mein Kopf tut weh` da olur, ama `der Kopf` ile acı çeken Dativ'dedir: `mir tut der Kopf weh`. `mich` Akkusativ ve `wehtun` onu almaz.",
        },
      },
    },
    {
      id: "de-a2-w02-g2",
      block: "grammar",
      stem: "Der Arzt sagt: „Das ist verboten. Sie ___ heute keinen Sport machen.“",
      options: ["müssen", "dürfen", "wollen", "möchten"],
      answer: 1,
      why: "Yasak `nicht dürfen` (ya da `kein … dürfen`) ile kurulur. Türkçede olumsuzluk fiilin kendisine eklenir ('yapmamalısın'); Almancada `kein`/`nicht` modal fiilin anlamını da değiştirir: `nicht müssen` 'zorunda değilsin', yani serbestsin. Yasak anlamını yalnız `dürfen` taşır.",
      targets: ["modal.duerfen", "modal.muessen"],
      byNative: {
        en: {
          options: ["dürfen", "müssen", "wollen", "möchten"],
          answer: 0,
          why: "İngilizce `must not` yasak bildirir ama Almanca `nicht müssen` 'gerek yok' demektir. Yasak için `nicht dürfen`; İngilizceden `müssen` aktarmak anlamı tersine çeviriyor.",
        },
      },
    },
    {
      id: "de-a2-w02-g3",
      block: "grammar",
      stem: "Nehmen ___ die Tabletten bitte zweimal am Tag.",
      options: ["du", "Ihnen", "Sie", "Ihr"],
      answer: 2,
      why: "Kibar emirde fiil başa gelir ve `Sie` hemen arkasında kalır, düşmez. Türkçe emirde özne söylenmediği için boşluk yadırganıyor; `Ihnen` ise `Sie`nin Dativ biçimi, özne olamaz.",
      targets: ["imperativ.sie"],
      byNative: {
        en: {
          options: ["du", "Ihnen", "Sie", "Ihr"],
          answer: 2,
          why: "İngilizce emirde özne düşer (`Take the pills`). Almanca kibar emirde `Sie` fiilin arkasında kalır; `du` emrinde ise özne düşer ama doktor hastaya `Sie` der.",
        },
      },
    },
    {
      id: "de-a2-w02-g4",
      block: "grammar",
      stem: "Ich komme heute nicht zur Arbeit, weil ___.",
      options: ["ich krank bin", "ich bin krank", "bin ich krank", "krank ich bin"],
      answer: 0,
      why: "`weil` yan cümlesinde özne `weil`ın hemen arkasına, çekimli fiil en sona gider. `ich bin krank` ana cümle düzeni; `weil` onu yan cümleye çevirince fiil yer değiştiriyor.",
      targets: ["nebensatz.weil"],
      byNative: {
        en: {
          options: ["ich bin krank", "ich krank bin", "bin ich krank", "krank ich bin"],
          answer: 1,
          why: "İngilizcede `because I am sick` sırası ana cümleyle aynıdır. Almancada `weil` çekimli fiili cümlenin sonuna iter: `weil ich krank bin`.",
        },
      },
    },
    {
      id: "de-a2-w02-g5",
      block: "grammar",
      stem: "Letzte Woche ___ ich drei Tage im Bett geblieben.",
      options: ["habe", "hatte", "bin", "wurde"],
      answer: 2,
      why: "`bleiben` yer değiştirmez ama yine `sein` alır: `sein` ve `bleiben` bu kuralın bilinen istisnaları. Hareket yok diye `haben` seçmek, kuralı fazla harfiyen uygulamaktan geliyor.",
      targets: ["perfekt.sein", "verb.bleiben"],
      byNative: {
        en: {
          options: ["habe", "bin", "hatte", "wurde"],
          answer: 1,
          why: "İngilizcede `I have stayed`. Almancada `bleiben` hareket fiili olmadığı hâlde `sein` ile kurulur; `have`ın karşılığı sanılan `haben` burada yanlış.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-a2-w02-v1",
      block: "vocab",
      stem: "Ich habe morgen um 10 Uhr ___ beim Zahnarzt.",
      options: ["einen Plan", "einen Termin", "ein Datum", "eine Zeit"],
      answer: 1,
      why: "Doktor, kuaför ya da bir daire için ayrılan saat `Termin`dir. `Datum` yalnız takvimdeki tarih (15.08.), `Zeit` genel olarak zaman. 'Randevu' ile 'tarih' ayrı sözcükler ama 'gün vermek' düşüncesi `Datum`a çekiyor.",
      targets: ["nomen.termin"],
      byNative: {
        en: {
          options: ["einen Plan", "ein Datum", "einen Termin", "eine Zeit"],
          answer: 2,
          why: "İngilizce `date` hem tarih hem buluşma demek; Almanca `Datum` yalnız tarih. Doktor randevusu `Termin`; kökü aynı olsa da anlamca İngilizce `term` değil.",
        },
      },
    },
    {
      id: "de-a2-w02-v2",
      block: "vocab",
      stem: "Der Arzt hat mir ___ für die Tabletten gegeben.",
      options: ["ein Formular", "einen Kassenzettel", "einen Zettel", "ein Rezept"],
      answer: 3,
      why: "Doktorun yazdığı ilaç kâğıdı `Rezept`; aynı sözcük yemek tarifi de demek. `Kassenzettel` kasadan alınan fiş, `Formular` doldurulan belge. 'Kâğıt' diye düşününce genel `Zettel` seçiliyor ama eczane onu kabul etmez.",
      targets: ["nomen.rezept"],
      byNative: {
        en: {
          options: ["einen Kassenzettel", "ein Rezept", "einen Zettel", "ein Formular"],
          answer: 1,
          why: "`Rezept` İngilizce `receipt` gibi görünür ama reçete ya da yemek tarifi demektir. Alışveriş fişi `Kassenzettel`; sahte dost burada ters yöne çalışıyor.",
        },
      },
    },
    {
      id: "de-a2-w02-v3",
      block: "vocab",
      stem: "Mein Hals tut weh. Ich glaube, ich ___ krank.",
      options: ["werde", "habe", "wurde", "mache"],
      answer: 0,
      why: "Bir duruma geçiş `werden` ile anlatılır: `krank werden` 'hastalanmak'. `krank` bir sıfat, `haben` ya da `machen` ile yüklem olmaz ('hastalık yapmak' diye kurulamaz). `wurde` geçmiş, cümle ise şimdiyi anlatıyor.",
      targets: ["verb.werden", "verb.bekommen"],
      byNative: {
        en: {
          options: ["habe", "bekomme", "werde", "wurde"],
          answer: 2,
          why: "`bekommen` İngilizce `become` gibi görünür ama 'almak' demektir. 'Hastalanıyorum' (`I'm getting ill`) Almancada `ich werde krank`.",
        },
      },
    },
  ],
};

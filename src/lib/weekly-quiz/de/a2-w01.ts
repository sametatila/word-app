import type { QuizWeek } from "../types";

/**
 * A2 · Hafta 1 · Geçmişi anlatmak.
 *
 * ÖLÇÜLEN ŞEY: olmuş bir olayı anlatan bir e-postayı/konuşmayı anlamak ve
 * Perfekt'in iki kararını vermek — yardımcı fiil (`haben`/`sein`) ve Partizip
 * biçimi — artı `war`/`hatte` ve zamanı geriye ölçen `vor`. A1'deki Präsens,
 * `wortstellung.v2` ve `verb.trennbar` burada geçmiş zamanda yeniden çıkıyor.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w01-g2` (`sein` ile Perfekt): Türkçede yardımcı fiil seçimi yok,
 *    İngilizcede tek yardımcı (`have`). İki öğrenci de `haben gefahren`
 *    kuruyor; biri seçim olduğunu bilmediği için, öteki `have`i taşıdığı için.
 *  - `w01-g4` (`war`): İngilizce konuşan için `bin` ↔ `been` benzerliği gerçek
 *    bir tuzak ve `wurde` ↔ `became`; varyantta bu iki şık yan yana.
 *  - `w01-v1` (`vor drei Tagen`): Türkçede `önce` sonda; İngilizcede `ago`
 *    sonda ve `for` süre. İngilizce varyanta `bevor` şıkkı eklendi.
 *  - `w01-v2` (`Fotos machen`): kalıp fiili dile göre değişiyor, İngilizceden
 *    `nehmen` geliyor. W5'te düğün bağlamında yeniden yoklanıyor.
 */
export const DE_A2_W01: QuizWeek = {
  id: "de-a2-w01",
  course: "de",
  level: "A2",
  no: 1,
  theme: "Vom Wochenende erzählen",
  themeTr: "Geçmişi anlatmak",
  canDo: ["A2.SPK.3", "A2.WR.3", "A2.GR.1", "A2.RD.1", "A2.LS.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "E-Mail",
      genreTr: "E-posta",
      title: "Mein Wochenende",
      body:
        "Hallo Tom,\n\nwie geht es dir? Mein Wochenende war sehr schön, aber auch ein bisschen verrückt. " +
        "Am Samstag bin ich früh aufgestanden und mit dem Zug nach Hamburg gefahren. Dort habe ich meine Schwester besucht. " +
        "Wir sind zusammen durch die Altstadt gegangen und haben in einem kleinen Café Kuchen gegessen. " +
        "Am Abend wollten wir ins Kino gehen, aber es gab keine Karten mehr. Also haben wir zu Hause gekocht und lange geredet. " +
        "Am Sonntag hatte ich dann ein Problem: Mein Zug hatte eine Stunde Verspätung, und ich bin erst um Mitternacht in Berlin angekommen. " +
        "Heute bin ich total müde! Was hast du am Wochenende gemacht? Schreib mir bald!\n\nViele Grüße\nLena",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Gespräch",
      genreTr: "Sohbet",
      plays: 2,
      segments: [
        { speaker: "Jonas", text: "Hallo Mia! Wie war dein Wochenende?" },
        { speaker: "Mia", text: "Ganz schön stressig! Wir sind am Samstag umgezogen." },
        { speaker: "Jonas", text: "Ach ja! Hat alles geklappt?" },
        { speaker: "Mia", text: "Nicht ganz. Der Wagen ist erst um elf Uhr gekommen, nicht um acht." },
        { speaker: "Jonas", text: "Oh nein. Und wer hat euch geholfen?" },
        { speaker: "Mia", text: "Mein Bruder und zwei Kollegen. Am Abend haben wir Pizza bestellt und in der leeren Küche gegessen." },
        { speaker: "Jonas", text: "Und am Sonntag?" },
        { speaker: "Mia", text: "Da habe ich lange geschlafen und dann die Küche aufgeräumt. Ich war so müde!" },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-a2-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Was hat Lena in Hamburg NICHT gemacht?",
      options: ["Sie hat Kuchen gegessen.", "Sie hat ihre Schwester besucht.", "Sie hat zu Hause gekocht.", "Sie hat einen Film gesehen."],
      answer: 3,
      why: "Metin `wollten … gehen` diyor: `wollen`ın Präteritum'u bir niyeti bildirir, olayın gerçekleştiğini değil. Hemen ardından gelen `aber` planın bozulduğunu söylüyor. Niyet cümlesini olmuş bir olay gibi okumak bu sorunun tuzağı.",
      targets: ["lesen.detail", "praeteritum.modal"],
    },
    {
      id: "de-a2-w01-r2",
      block: "read",
      ref: "t1",
      stem: "Wo haben Lena und ihre Schwester Kuchen gegessen?",
      options: ["zu Hause", "in einem Café", "im Zug", "im Kino"],
      answer: 1,
      why: "Metinde iki yemek sahnesi var: gündüz eski şehirdeki kafe, akşam plan bozulunca evde yemek pişirmek. Olayları zaman işaretleriyle (`Am Abend`, `Also`) sıraya koymadan okuyunca iki sahne birbirine karışıyor.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-a2-w01-r3",
      block: "read",
      ref: "t1",
      stem: "Wann ist Lena in Berlin angekommen?",
      options: ["am Samstagabend", "am Sonntag um Mitternacht", "eine Stunde zu früh", "am Sonntagmorgen"],
      answer: 1,
      why: "`eine Stunde Verspätung` trenin geç kaldığı süre, varış saati değil; saat `erst um Mitternacht`. `erst` beklenenden geç demektir. Sayıyı gördüğü yerde cevap sanmak yerine, sayının neyi ölçtüğüne bakmak gerekiyor.",
      targets: ["lesen.detail", "zeitangabe.erst"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-a2-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "Wann ist der Wagen gekommen?",
      options: ["um acht Uhr", "am Abend", "um elf Uhr", "am Sonntag"],
      answer: 2,
      why: "Mia iki saat söylüyor ama biri olumsuzlanmış: `nicht um acht` planlanan saatti. Dinlerken olumsuzlanan bilgiyi elemek gerekiyor; `erst` gerçek saatin geç olduğunu işaret ediyor.",
      targets: ["hoeren.detail", "zeitangabe.erst"],
    },
    {
      id: "de-a2-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "Was haben Mia und die Helfer am Abend gemacht?",
      options: ["Sie haben Pizza gegessen.", "Sie sind ins Restaurant gegangen.", "Sie haben die Küche aufgeräumt.", "Sie haben lange geschlafen."],
      answer: 0,
      why: "`bestellen` restorana gitmek demek değil, yemek eve de sipariş edilir: Mia yemeği boş mutfakta yediklerini söylüyor. Mutfağı toplamak ve uzun uyumak ise pazar gününe ait.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-a2-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "Wer hat Mia beim Umzug geholfen?",
      options: ["Jonas", "ihre Eltern", "ihr Bruder und zwei Kollegen", "niemand"],
      answer: 2,
      why: "`Wer hat euch geholfen?` sorusunu Jonas soruyor, yani kendisi yardım etmemiş. Diyalog dinlerken soruyu soranla cevabı vereni ayırmak gerekiyor; soruyu soranın adını cevaba taşımak sık yapılan hata.",
      targets: ["hoeren.detail"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-a2-w01-g1",
      block: "grammar",
      stem: "Gestern ___ ich meinen Freund im Park getroffen.",
      options: ["habe", "bin", "war", "hatte"],
      answer: 0,
      why: "`treffen` Perfekt'i `haben` ile kurar; `sein` yalnız yer değiştirme ve durum değişimi fiillerinde (gehen, fahren, werden) kullanılır. Türkçede yardımcı fiil seçimi olmadığı için ikisi rastgele seçiliyor.",
      targets: ["perfekt.haben", "verb.treffen"],
      byNative: {
        en: {
          options: ["habe", "bin", "war", "hatte"],
          answer: 0,
          why: "İngilizcede tek yardımcı fiil var (`have met`), Almancada iki. `treffen` hareket fiili değil, o yüzden `haben`.",
        },
      },
    },
    {
      id: "de-a2-w01-g2",
      block: "grammar",
      stem: "Am Samstag ___ wir mit dem Zug nach Hamburg gefahren.",
      options: ["haben", "hatten", "sind", "waren"],
      answer: 2,
      why: "`fahren` bir yerden başka bir yere hareket bildirir, bu yüzden Perfekt'i `sein` ile kurar. Türkçede 'gittik' tek biçim; yardımcı fiili Türkçeden türetemeyince `haben` her fiile genelleniyor.",
      targets: ["perfekt.sein", "verb.fahren"],
      byNative: {
        en: {
          options: ["haben", "hatten", "sind", "waren"],
          answer: 2,
          why: "İngilizcede `we have travelled` hep `have` ile kurulur. Almancada yer değiştiren fiiller `sein` alır; `haben` İngilizceden gelen aktarım.",
        },
      },
    },
    {
      id: "de-a2-w01-g3",
      block: "grammar",
      stem: "Heute bin ich um sechs Uhr ___.",
      options: ["aufgestehen", "geaufstanden", "aufstehen", "aufgestanden"],
      answer: 3,
      why: "Ayrılabilir fiilde `ge-` başa değil, önekle kökün arasına girer: `auf-ge-standen`. `stehen` düzensiz bir fiildir, Partizip'i `-en` ile biter ve kök `stand` olur.",
      targets: ["partizip.trennbar", "verb.aufstehen"],
    },
    {
      id: "de-a2-w01-g4",
      block: "grammar",
      stem: "Letzte Woche ___ ich krank, deshalb bin ich zu Hause geblieben.",
      options: ["bin", "war", "habe", "hatte"],
      answer: 1,
      why: "`sein` ve `haben` geçmişte konuşmada da çoğunlukla Präteritum'la söylenir: `war`, `hatte`. Boşluğa tek sözcük sığıyor ve durum bildiren `krank` bir `sein` ister; `bin` şimdiki zaman kalıyor.",
      targets: ["sein.praeteritum"],
      byNative: {
        en: {
          options: ["bin", "war", "wurde", "hatte"],
          answer: 1,
          why: "`bin` İngilizce `been` gibi görünür ama şimdiki zamandır: `ich bin` = `I am`. Geçmiş `war` (= `was`). `wurde` ise `became`: bir durum değil, değişim.",
        },
      },
    },
    {
      id: "de-a2-w01-g5",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Gestern ich habe lange gearbeitet.",
        "Gestern ich lange gearbeitet habe.",
        "Gestern habe ich lange gearbeitet.",
        "Gestern habe ich gearbeitet lange.",
      ],
      answer: 2,
      why: "Ana cümlede çekimli fiil ikinci konumdadır: zaman zarfı başa gelince özne fiilin arkasına geçer, Partizip en sona gider. Türkçede fiil sonda olduğu için `lange gearbeitet habe` doğal görünüyor ama bu dizilim yalnız yan cümlede geçerli.",
      targets: ["wortstellung.v2", "perfekt.haben"],
      byNative: {
        en: {
          options: [
            "Gestern ich habe lange gearbeitet.",
            "Gestern habe ich lange gearbeitet.",
            "Gestern ich lange gearbeitet habe.",
            "Gestern habe ich gearbeitet lange.",
          ],
          answer: 1,
          why: "İngilizcede `Yesterday I worked` doğru: zarf başa gelse de özne önde kalır. Almancada fiil ikinci konuma çakılıdır; zarf birinci yeri alınca özne fiilin arkasına geçer.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-a2-w01-v1",
      block: "vocab",
      stem: "Ich habe Anna ___ drei Tagen im Supermarkt gesehen.",
      options: ["seit", "vor", "nach", "für"],
      answer: 1,
      why: "Geçmişteki bir anı bugünden geriye ölçerken `vor` + Dativ kullanılır: 'üç gün önce'. `seit` hâlâ süren bir durum içindir, bitmiş bir olayla gelmez. Türkçede 'önce' sona geldiği için edatın başa geldiği unutuluyor.",
      targets: ["zeitangabe.vor", "praeposition.dativ"],
      byNative: {
        en: {
          options: ["für", "bevor", "seit", "vor"],
          answer: 3,
          why: "İngilizce `ago` sona gelir, `for` ise süre bildirir. Almancada 'three days ago' `vor drei Tagen` olur; `für drei Tage` ileriye dönük süre, `bevor` bir bağlaçtır.",
        },
      },
    },
    {
      id: "de-a2-w01-v2",
      block: "vocab",
      stem: "Im Urlaub haben wir sehr viele Fotos ___.",
      options: ["gemacht", "getan", "genommen", "gegeben"],
      answer: 0,
      why: "Almancada fotoğraf 'yapılır': `Fotos machen`. `tun` genel bir 'yapmak' ama bu kalıpta kullanılmaz. Doğru fiil kalıbın parçasıdır ve tek tek sözcükleri çevirerek bulunamaz.",
      targets: ["kollokation.fotos-machen"],
      byNative: {
        en: {
          options: ["genommen", "gemacht", "getan", "gegeben"],
          answer: 1,
          why: "İngilizcede `take photos`, Almancada `Fotos machen`. `nehmen` kelime kelime çeviri; kalıp fiili dile göre değişiyor.",
        },
      },
    },
    {
      id: "de-a2-w01-v3",
      block: "vocab",
      stem: "Mein Opa ___ gern Geschichten von früher.",
      options: ["sagt", "spricht", "redet", "erzählt"],
      answer: 3,
      why: "Bir olayı ya da hikâyeyi baştan sona anlatmak `erzählen`. `sagen` tek bir söz ya da bilgi aktarır, `sprechen` ve `reden` ise 'konuşmak'tır ve `Geschichten` gibi bir nesneyi bu anlamda almaz.",
      targets: ["verb.erzaehlen"],
      byNative: {
        en: {
          options: ["sagt", "erzählt", "spricht", "redet"],
          answer: 1,
          why: "İngilizce `tell` Almancada ikiye bölünür: bir bilgiyi söylemek `sagen`, hikâye anlatmak `erzählen`. `tell stories` → `Geschichten erzählen`.",
        },
      },
    },
  ],
};

import { de, tr, type Lesson } from "../types";

/**
 * A2 — henüz partisine taşınmamış dersler.
 *
 * Katalog konu numarası sırasına göre partilere (de-a2-bNN.ts) taşınıyor;
 * burada yalnızca sırası gelmemiş olanlar duruyor. Doktor dersi 021 numarada,
 * yani üçüncü partide; o parti üretildiğinde bu dosya silinecek.
 *
 * A1 senaryoları "hayatta kalma" konuşmalarıydı; A2 senaryoları bir durumu
 * YÖNETMEYİ öğretiyor: doktora derdini anlatıp öneri almak, geçmişte olanı
 * anlatmak. Dil takımı da buna göre büyüyor: kip fiili (sollen) ve geçmiş
 * zaman (Perfekt) — ikisi de Türkçede doğrudan karşılığı olmayan yapılar.
 */
export const deA2: Lesson[] = [
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
          de("sollen"),
          tr(
            "fiili, birinin yapması gereken şeyi söyler. Doktor sana, sen kendine — bu ders boyunca hep onu kullanacağız. Önce kelimeleri öğrenelim.",
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
];

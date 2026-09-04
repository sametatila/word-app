import type { SkillExercise } from "../types";
import { a1U01 } from "./a1-u01";
import { a1U02 } from "./a1-u02";
import { a1U03 } from "./a1-u03";
import { a1U04 } from "./a1-u04";
import { a1U05 } from "./a1-u05";
import { a1U06 } from "./a1-u06";
import { a1U07 } from "./a1-u07";
import { a1U08 } from "./a1-u08";
import { a1U09 } from "./a1-u09";
import { a1U10 } from "./a1-u10";
import { a1U11 } from "./a1-u11";
import { a1U12 } from "./a1-u12";
import { a1U13 } from "./a1-u13";
import { a1U14 } from "./a1-u14";
import { a1U15 } from "./a1-u15";
import { a1U16 } from "./a1-u16";
import { a1U17 } from "./a1-u17";

/** A1 — okuma, dinleme ve yazma egzersizleri. */
export const a1: SkillExercise[] = [
  // Ünite 1 "Tanışma ve ben" tema-hizalı içerik EN BAŞTA durur → immersion
  // builder ünite 1'in okuma/dinleme/yazma slotlarını (konuma göre) bunlarla
  // doldurur. Eski genel A1 içeriği sonraki ünitelere kayar (köprü).
  ...a1U01,
  ...a1U02,
  ...a1U03,
  ...a1U04,
  ...a1U05,
  ...a1U06,
  ...a1U07,
  ...a1U08,
  ...a1U09,
  ...a1U10,
  ...a1U11,
  ...a1U12,
  ...a1U13,
  ...a1U14,
  ...a1U15,
  ...a1U16,
  ...a1U17,
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "a1-r1",
    level: "A1",
    skill: "reading",
    title: "Gehen wir ins Kino?",
    genre: "Mesaj",
    intro: "Sofia'nın arkadaşı Murat'a yazdığı bir WhatsApp mesajını okuyacaksın.",
    gloss: [
      { de: "frei haben", tr: "boş olmak", en: "to be free" },
      { de: "das Kino", tr: "sinema", en: "cinema" },
      { de: "sich treffen", tr: "buluşmak", en: "to meet" },
      { de: "danach", tr: "ondan sonra", en: "afterwards" },
      { de: "mitkommen", tr: "birlikte gelmek", en: "to come along" },
      { de: "Viele Grüße", tr: "sevgiler", en: "best wishes" },
    ],
    minutes: 3,
    text:
      "Hallo Murat! Wie geht es dir? Ich habe heute frei. Wollen wir zusammen ins Kino gehen? Der Film beginnt um 20 Uhr. Wir können uns um 19:30 Uhr vor dem Kino treffen. Danach essen wir vielleicht eine Pizza. Meine Schwester Lena kommt auch mit. Schreib mir bitte bis 17 Uhr!\n\nViele Grüße\nSofia",
    questions: [
      {
        text: "Wann beginnt der Film?",
        options: ["Um 17 Uhr", "Um 19:30 Uhr", "Um 20 Uhr"],
        answer: 2,
        explain:
          "Mesajta „Der Film beginnt um 20 Uhr“ yazıyor. 19:30 buluşma saati, 17 ise cevap yazma sınırı.",
      },
      {
        text: "Richtig oder falsch? Sofia kommt allein ins Kino.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Meine Schwester Lena kommt auch mit“ diyor, yani kız kardeşi Lena da geliyor.",
      },
      {
        text: "Was wollen sie nach dem Film machen?",
        options: ["Eine Pizza essen", "Nach Hause gehen", "Lena besuchen"],
        answer: 0,
        explain:
          "„Danach essen wir vielleicht eine Pizza“ cümlesi filmden sonraki planı söylüyor.",
      },
      {
        text: "Bis wann soll Murat antworten?",
        options: ["Bis 17 Uhr", "Bis 19:30 Uhr", "Bis 20 Uhr"],
        answer: 0,
        explain:
          "Son cümle „Schreib mir bitte bis 17 Uhr!“ — Murat en geç saat 17'ye kadar yazmalı.",
      },
      {
        kind: "gapfill",
        text: "Metinden tamamla: „Wir können uns um ___ Uhr vor dem Kino treffen.“",
        options: [],
        answer: 0,
        accept: ["19:30", "19.30", "halb acht"],
        explain: "Buluşma saati metinde „um 19:30 Uhr“ — film 20'de başlıyor, yarım saat önce buluşuyorlar.",
      },
      {
        kind: "short_answer",
        text: "Wer kommt auch mit ins Kino? (1–3 kelime)",
        options: [],
        answer: 0,
        accept: ["Lena", "Schwester Lena", "Sofias Schwester", "ihre Schwester", "die Schwester"],
        explain: "„Meine Schwester Lena kommt auch mit“ — Sofia'nın kız kardeşi Lena da geliyor.",
      },
    ],
  },
  {
    id: "a1-r2",
    level: "A1",
    skill: "reading",
    title: "Wohnung zu vermieten",
    genre: "İlan",
    intro: "Köln'de kiralık bir daire ilanı okuyacaksın.",
    gloss: [
      { de: "vermieten", tr: "kiraya vermek", en: "to rent out" },
      { de: "die Wohnung", tr: "daire", en: "apartment" },
      { de: "der Balkon", tr: "balkon", en: "balcony" },
      { de: "der Stock", tr: "kat", en: "floor" },
      { de: "die Miete", tr: "kira", en: "rent" },
      { de: "die Nebenkosten", tr: "yan giderler", en: "utility costs", note: "Kiraya ek ödenen ısıtma, su ve çöp gideridir." },
      { de: "das Haustier", tr: "evcil hayvan", en: "pet" },
      { de: "die Besichtigung", tr: "gezme", en: "viewing" },
    ],
    minutes: 3,
    text:
      "Schöne 2-Zimmer-Wohnung in Köln-Ehrenfeld zu vermieten. 54 Quadratmeter, mit Balkon und neuer Küche. Die Wohnung liegt im dritten Stock. Miete: 650 Euro pro Monat plus Nebenkosten. Die U-Bahn ist nur 5 Minuten zu Fuß entfernt. Keine Haustiere! Frei ab 1. September.\n\nHaben Sie Interesse? Rufen Sie Herrn Weber an: 0221 456789. Besichtigung am Samstag von 10 bis 12 Uhr.",
    questions: [
      {
        text: "Richtig oder falsch? Die Wohnung hat einen Balkon.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: İlanda „mit Balkon und neuer Küche“ yazıyor.",
      },
      {
        text: "Wann kann man die Wohnung besichtigen?",
        options: ["Am Samstag von 10 bis 12 Uhr", "Am 1. September", "Am Sonntagvormittag"],
        answer: 0,
        explain:
          "Son cümlede „Besichtigung am Samstag von 10 bis 12 Uhr“ deniyor. 1 Eylül dairenin boşalacağı tarih, gezme günü değil.",
      },
      {
        text: "Richtig oder falsch? Hunde und Katzen sind in der Wohnung erlaubt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Keine Haustiere!“ — evcil hayvan yasak.",
      },
      {
        text: "Was soll man bei Interesse machen?",
        options: ["Herrn Weber anrufen", "Eine E-Mail schreiben", "Zur U-Bahn gehen"],
        answer: 0,
        explain:
          "İlan „Rufen Sie Herrn Weber an“ diyor, yani telefonla aramak gerekiyor. U-Bahn sadece dairenin konumu için geçiyor.",
      },
    ],
  },
  {
    id: "a1-r3",
    level: "A1",
    skill: "reading",
    title: "Einladung zum Geburtstag",
    genre: "E-posta",
    intro: "Julia'nın arkadaşı Ayşe'ye gönderdiği doğum günü davetini okuyacaksın.",
    gloss: [
      { de: "der Geburtstag", tr: "doğum günü", en: "birthday" },
      { de: "die Party", tr: "parti", en: "party" },
      { de: "grillen", tr: "mangal yapmak", en: "to grill" },
      { de: "der Garten", tr: "bahçe", en: "garden" },
      { de: "der Kuchen", tr: "kek", en: "cake" },
      { de: "mitbringen", tr: "getirmek", en: "to bring along" },
      { de: "die Adresse", tr: "adres", en: "address" },
    ],
    minutes: 2,
    text:
      "Liebe Ayşe,\n\nam Sonntag habe ich Geburtstag. Ich werde 30 Jahre alt! Ich mache eine kleine Party bei mir zu Hause. Wir grillen im Garten und meine Mutter macht einen Kuchen. Die Party beginnt um 15 Uhr. Kannst du kommen? Bring bitte einen Salat mit. Meine Adresse: Gartenstraße 12.\n\nBis Sonntag!\nDeine Julia",
    questions: [
      {
        text: "Wie alt wird Julia?",
        options: ["12 Jahre", "15 Jahre", "30 Jahre"],
        answer: 2,
        explain:
          "„Ich werde 30 Jahre alt!“ cümlesi cevabı veriyor. 12 ev numarası, 15 ise partinin başlama saati.",
      },
      {
        text: "Was soll Ayşe mitbringen?",
        options: ["Einen Kuchen", "Einen Salat", "Fleisch zum Grillen"],
        answer: 1,
        explain:
          "„Bring bitte einen Salat mit“ — Ayşe salata getirmeli. Pastayı Julia'nın annesi yapıyor.",
      },
      {
        text: "Richtig oder falsch? Die Party ist in einem Restaurant.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: Julia „bei mir zu Hause“ diyor, parti kendi evinde, bahçede mangal yapacaklar.",
      },
      {
        text: "Wann beginnt die Party?",
        options: ["Um 12 Uhr", "Um 15 Uhr", "Um 18 Uhr"],
        answer: 1,
        explain: "Metinde açıkça „Die Party beginnt um 15 Uhr“ yazıyor.",
      },
    ],
  },
  {
    id: "a1-r4",
    level: "A1",
    skill: "reading",
    title: "Neue Öffnungszeiten",
    genre: "Duyuru",
    intro: "Bir süpermarketin kapısına asılmış duyuruyu okuyacaksın.",
    gloss: [
      { de: "die Öffnungszeiten", tr: "çalışma saatleri", en: "opening hours" },
      { de: "geschlossen", tr: "kapalı", en: "closed" },
      { de: "das Angebot", tr: "indirim", en: "special offer" },
      { de: "das Mineralwasser", tr: "maden suyu", en: "mineral water" },
      { de: "die Bäckerei", tr: "fırın", en: "bakery" },
      { de: "der Kunde", tr: "müşteri", en: "customer" },
    ],
    minutes: 2,
    text:
      "Liebe Kundinnen und Kunden!\n\nAb Montag, dem 4. Mai, haben wir neue Öffnungszeiten: Montag bis Freitag von 8 bis 21 Uhr, Samstag von 9 bis 20 Uhr. Am Sonntag ist unser Markt geschlossen.\n\nDiese Woche im Angebot: 1 Kilo Tomaten für nur 1,99 Euro und Mineralwasser für 0,49 Euro. Die Bäckerei im Markt öffnet schon um 7 Uhr.\n\nIhr REWE-Team in der Bahnhofstraße",
    questions: [
      {
        text: "Wann ist der Markt am Samstag geöffnet?",
        options: ["Von 8 bis 21 Uhr", "Von 9 bis 20 Uhr", "Von 7 bis 20 Uhr"],
        answer: 1,
        explain:
          "Duyuruda „Samstag von 9 bis 20 Uhr“ yazıyor. 8–21 hafta içi saatleri, 7 ise fırının açılış saati.",
      },
      {
        text: "Wann öffnet die Bäckerei?",
        options: ["Um 7 Uhr", "Um 8 Uhr", "Um 9 Uhr"],
        answer: 0,
        explain:
          "„Die Bäckerei im Markt öffnet schon um 7 Uhr“ — fırın marketten daha erken, saat 7'de açılıyor.",
      },
      {
        text: "Richtig oder falsch? Am Sonntag kann man im Markt einkaufen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Sonntag ist unser Markt geschlossen“ — pazar günü kapalı.",
      },
      {
        text: "Richtig oder falsch? Ein Kilo Tomaten kostet diese Woche 1,99 Euro.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Doğru: Kampanya bölümünde „1 Kilo Tomaten für nur 1,99 Euro“ deniyor. 0,49 Euro maden suyunun fiyatı.",
      },
    ],
  },
  {
    id: "a1-r5",
    level: "A1",
    skill: "reading",
    title: "Kurse an der Volkshochschule",
    genre: "Program",
    intro: "Bir halk eğitim merkezinin sonbahar kurs programını okuyacaksın.",
    gloss: [
      { de: "die Volkshochschule", tr: "halk eğitim merkezi", en: "adult education center" },
      { de: "der Anfänger", tr: "yeni başlayan", en: "beginner" },
      { de: "der Kursleiter", tr: "kurs eğitmeni", en: "course instructor" },
      { de: "das Erdgeschoss", tr: "zemin kat", en: "ground floor" },
      { de: "voll", tr: "dolu", en: "full" },
      { de: "die Anmeldung", tr: "kayıt", en: "registration" },
    ],
    minutes: 3,
    text:
      "Volkshochschule Bremen — Kurse im Herbst\n\nDeutsch A1 für Anfänger: Montag und Mittwoch, 18:00 bis 19:30 Uhr, Raum 204. Kursleiterin: Frau Schmidt. Preis: 120 Euro.\n\nKochkurs „Italienische Küche“: Freitag, 17:00 bis 20:00 Uhr, Küche im Erdgeschoss. Preis: 45 Euro pro Abend.\n\nYoga für Anfänger: Dienstag, 9:00 bis 10:00 Uhr. Der Kurs ist leider schon voll.\n\nAnmeldung im Büro (Raum 101) oder auf unserer Webseite.",
    questions: [
      {
        text: "Wann ist der Deutschkurs?",
        options: ["Montag und Mittwoch", "Dienstag", "Freitag"],
        answer: 0,
        explain:
          "Programda Deutsch A1 kursunun yanında „Montag und Mittwoch“ yazıyor. Salı yoga, cuma yemek kursu günü.",
      },
      {
        text: "Was kostet der Kochkurs pro Abend?",
        options: ["45 Euro", "120 Euro", "150 Euro"],
        answer: 0,
        explain:
          "Yemek kursu için „Preis: 45 Euro pro Abend“ deniyor. 120 Euro Almanca kursunun toplam ücreti.",
      },
      {
        text: "Richtig oder falsch? Man kann noch im Yogakurs mitmachen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Der Kurs ist leider schon voll“ — yoga kursu dolu, artık kayıt alınmıyor.",
      },
      {
        text: "Wo ist die Anmeldung?",
        options: ["In Raum 101", "In Raum 204", "Im Erdgeschoss"],
        answer: 0,
        explain:
          "Son satırda „Anmeldung im Büro (Raum 101)“ yazıyor. 204 Almanca kursunun sınıfı, zemin kat ise mutfağın yeri.",
      },
    ],
  },
  {
    id: "a1-r6",
    level: "A1",
    skill: "reading",
    title: "Information für unsere Fahrgäste",
    genre: "Duyuru",
    intro: "Metro istasyonuna asılmış bir yolcu bilgilendirme duyurusunu okuyacaksın.",
    gloss: [
      { de: "der Fahrgast", tr: "yolcu", en: "passenger" },
      { de: "die U-Bahn-Linie", tr: "metro hattı", en: "subway line" },
      { de: "der Hauptbahnhof", tr: "ana gar", en: "central station" },
      { de: "das Gleis", tr: "ray", en: "track" },
      { de: "abfahren", tr: "kalkmak", en: "to depart" },
      { de: "dauern", tr: "sürmek", en: "to last" },
      { de: "gültig", tr: "geçerli", en: "valid" },
      { de: "das Verständnis", tr: "anlayış", en: "understanding" },
    ],
    minutes: 3,
    text:
      "Information für unsere Fahrgäste\n\nVom 10. bis 14. Juni fährt die U-Bahn-Linie U3 nicht zwischen Hauptbahnhof und Stadtpark. Wir bauen neue Gleise. Bitte nehmen Sie den Bus 47. Der Bus fährt alle 10 Minuten vom Hauptbahnhof ab. Die Fahrt dauert circa 20 Minuten. Ihre Tickets für die U-Bahn sind auch im Bus gültig. Wir danken für Ihr Verständnis.\n\nIhre Verkehrsbetriebe München",
    questions: [
      {
        text: "Was ist das Problem?",
        options: [
          "Die U3 fährt nicht zwischen Hauptbahnhof und Stadtpark.",
          "Der Bus 47 fährt nicht.",
          "Der Hauptbahnhof ist geschlossen.",
        ],
        answer: 0,
        explain:
          "İlk cümle sorunu söylüyor: U3 hattı gar ile Stadtpark arasında çalışmıyor. 47 numaralı otobüs tam tersine çözüm olarak öneriliyor.",
      },
      {
        text: "Wie oft fährt der Bus 47?",
        options: ["Alle 10 Minuten", "Alle 14 Minuten", "Alle 20 Minuten"],
        answer: 0,
        explain:
          "„Der Bus fährt alle 10 Minuten“ — 10 dakikada bir. 20 dakika yolculuğun süresi, 14 ise tarihte geçiyor.",
      },
      {
        text: "Richtig oder falsch? Man muss für den Bus ein neues Ticket kaufen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Ihre Tickets für die U-Bahn sind auch im Bus gültig“ — metro bileti otobüste de geçerli.",
      },
      {
        text: "Wie lange dauert die Fahrt mit dem Bus?",
        options: ["Circa 10 Minuten", "Circa 20 Minuten", "Circa 47 Minuten"],
        answer: 1,
        explain: "„Die Fahrt dauert circa 20 Minuten“ cümlesi süreyi veriyor. 47 otobüsün numarası.",
      },
    ],
  },

  // ── Hikâye dizisi: Amir yeni taşındı, komşusu Frau Wagner ve kapıcı Herr Klose
  //    A1'in yeni alıştırmalarında bu üç kişi tekrar tekrar karşına çıkar.
  {
    id: "a1-r7",
    level: "A1",
    skill: "reading",
    title: "Der erste Tag",
    genre: "Mesaj",
    intro:
      "Amir yeni şehrine taşındı ve kardeşine yazıyor. Bu, A1'de takip edeceğin hikâyenin ilk bölümü.",
    gloss: [
      { de: "umziehen", tr: "taşınmak", en: "to move" },
      { de: "der Karton", tr: "karton kutu", en: "cardboard box" },
      { de: "das Bett", tr: "yatak", en: "bed" },
      { de: "der Nachbar / die Nachbarin", tr: "komşu", en: "neighbor" },
      { de: "klingeln", tr: "zil çalmak", en: "to ring" },
      { de: "der Kuchen", tr: "kek", en: "cake" },
      { de: "müde", tr: "yorgun", en: "tired" },
    ],
    minutes: 3,
    text:
      "Hallo Karim!\n\nIch bin da. Die Wohnung ist klein, aber hell. Ich habe noch keinen Tisch und kein Sofa — nur zwölf Kartons und ein Bett.\n\nHeute Morgen hat es geklingelt. Eine Nachbarin, Frau Wagner. Sie wohnt unter mir. Sie hatte einen Kuchen dabei und hat gesagt: „Willkommen im Haus.“ Ich war so überrascht, ich habe nur „danke“ gesagt.\n\nMorgen gehe ich zum Bürgeramt. Ich muss mich anmelden.\n\nIch bin sehr müde, aber es geht mir gut.\n\nDein Amir",
    questions: [
      {
        text: "Wie ist die Wohnung?",
        options: ["Klein, aber hell", "Groß und dunkel", "Klein und dunkel"],
        answer: 0,
        explain: "„Die Wohnung ist klein, aber hell.“ — küçük ama aydınlık.",
      },
      {
        text: "Was hat Amir noch nicht?",
        options: ["Einen Tisch und ein Sofa", "Ein Bett", "Kartons"],
        answer: 0,
        explain: "„Ich habe noch keinen Tisch und kein Sofa“ — yatağı ve kolileri var.",
      },
      {
        text: "Wer ist Frau Wagner?",
        options: ["Die Nachbarin unter ihm", "Seine Schwester", "Eine Kollegin"],
        answer: 0,
        explain: "„Eine Nachbarin, Frau Wagner. Sie wohnt unter mir.“",
      },
      {
        text: "Was macht Amir morgen?",
        options: ["Er geht zum Bürgeramt", "Er kauft ein Sofa", "Er besucht Frau Wagner"],
        answer: 0,
        explain: "„Morgen gehe ich zum Bürgeramt. Ich muss mich anmelden.“",
      },
    ],
  },
  {
    id: "a1-r8",
    level: "A1",
    skill: "reading",
    title: "Ihr Termin beim Bürgeramt",
    genre: "Resmî yazı",
    intro:
      "Almanya'ya taşınan herkesin ilk yazısı: ikamet kaydı randevu onayı. Amir'in aldığı belgeyi okuyacaksın.",
    gloss: [
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "die Anmeldung", tr: "ikamet kaydı", en: "residence registration" },
      { de: "der Ausweis", tr: "kimlik", en: "ID card" },
      { de: "der Mietvertrag", tr: "kira sözleşmesi", en: "lease" },
      { de: "mitbringen", tr: "getirmek", en: "to bring along" },
      { de: "pünktlich", tr: "dakik", en: "punctual" },
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
    ],
    minutes: 3,
    text:
      "Stadt Bremen — Bürgeramt Mitte\n\nIhr Termin: Dienstag, 14. Mai, 10:20 Uhr\nZimmer 214, 2. Stock\nGrund: Anmeldung\n\nBitte bringen Sie mit:\n• Ihren Pass oder Personalausweis\n• Den Mietvertrag\n• Das Formular „Wohnungsgeberbestätigung“ von Ihrem Vermieter\n\nBitte kommen Sie pünktlich. Nach 10 Minuten ist Ihr Termin nicht mehr gültig.\n\nSie können nicht kommen? Bitte sagen Sie online ab: www.bremen.de/termine\n\nDie Anmeldung ist kostenlos.",
    questions: [
      {
        text: "Wann ist der Termin?",
        options: ["Am Dienstag um 10:20 Uhr", "Am Dienstag um 14 Uhr", "Am 10. Mai"],
        answer: 0,
        explain: "„Dienstag, 14. Mai, 10:20 Uhr“ — 14 tarih, 10:20 saat.",
      },
      {
        text: "Was muss Amir nicht mitbringen?",
        options: ["Ein Foto", "Den Mietvertrag", "Den Pass"],
        answer: 0,
        explain: "Listede pasaport, kira sözleşmesi ve ev sahibi belgesi var — fotoğraf yok.",
      },
      {
        text: "Was passiert, wenn er 15 Minuten zu spät kommt?",
        options: [
          "Der Termin ist nicht mehr gültig",
          "Er muss 10 Euro zahlen",
          "Er wartet eine Stunde",
        ],
        answer: 0,
        explain: "„Nach 10 Minuten ist Ihr Termin nicht mehr gültig.“",
      },
      {
        text: "Richtig oder falsch? Die Anmeldung kostet Geld.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: son satır „Die Anmeldung ist kostenlos.“",
      },
    ],
  },
  {
    id: "a1-r9",
    level: "A1",
    skill: "reading",
    title: "Flohmarkt im Stadtpark",
    genre: "Duyuru",
    intro:
      "Almanya'nın en sevilen hafta sonu geleneklerinden biri: bit pazarı. Parktaki duyuruyu okuyacaksın.",
    gloss: [
      { de: "der Flohmarkt", tr: "bit pazarı", en: "flea market" },
      { de: "verkaufen", tr: "satmak", en: "to sell" },
      { de: "der Stand", tr: "tezgâh", en: "stall" },
      { de: "anmelden", tr: "kaydolmak", en: "to register" },
      { de: "gebraucht", tr: "ikinci el", en: "used" },
      { de: "die Kasse", tr: "kasa", en: "checkout" },
      { de: "bei Regen", tr: "yağmur olursa", en: "if it rains" },
    ],
    minutes: 3,
    text:
      "FLOHMARKT IM STADTPARK\nSamstag, 8. Juni, 9–16 Uhr\n\nAlles ist gebraucht: Bücher, Kleidung, Fahrräder, Spielzeug, Geschirr.\n\nSie möchten selbst verkaufen? Ein Stand kostet 15 Euro (3 Meter). Bitte bis Mittwoch anmelden: flohmarkt@stadtpark-verein.de\n\nWichtig: Kein Verkauf von neuen Waren. Bitte bringen Sie Ihren eigenen Tisch mit.\n\nFür Kinder unter 14 ist der Stand kostenlos.\n\nEssen und Kaffee gibt es am Eingang Nord.\n\nBei Regen: Der Flohmarkt ist am Sonntag.",
    questions: [
      {
        text: "Was kann man dort kaufen?",
        options: ["Gebrauchte Sachen", "Nur neue Kleidung", "Nur Bücher"],
        answer: 0,
        explain: "„Alles ist gebraucht: Bücher, Kleidung, Fahrräder, Spielzeug, Geschirr.“",
      },
      {
        text: "Was kostet ein Stand für ein Kind von 12 Jahren?",
        options: ["Nichts", "15 Euro", "3 Euro"],
        answer: 0,
        explain: "„Für Kinder unter 14 ist der Stand kostenlos.“",
      },
      {
        text: "Was muss man selbst mitbringen?",
        options: ["Einen Tisch", "Einen Stuhl", "Eine Kasse"],
        answer: 0,
        explain: "„Bitte bringen Sie Ihren eigenen Tisch mit.“",
      },
      {
        text: "Was passiert bei Regen?",
        options: [
          "Der Flohmarkt ist am Sonntag",
          "Der Flohmarkt fällt aus",
          "Der Flohmarkt ist in der Halle",
        ],
        answer: 0,
        explain: "Son satır: „Bei Regen: Der Flohmarkt ist am Sonntag.“",
      },
    ],
  },
  {
    id: "a1-r10",
    level: "A1",
    skill: "reading",
    title: "Vier Anzeigen — wer passt?",
    genre: "Sınav formatı",
    intro:
      "A1 sınavındaki klasik görev: kısa ilanları okuyup kimin neye ihtiyacı olduğunu eşleştirmek. Önce ilanları oku, sonra soruları çöz.",
    gloss: [
      { de: "die Anzeige", tr: "ilan", en: "ad" },
      { de: "suchen", tr: "aramak", en: "to look for" },
      { de: "der Unterricht", tr: "ders", en: "class" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "die Stunde", tr: "saat", en: "hour" },
      { de: "günstig", tr: "uygun fiyatlı", en: "affordable" },
      { de: "melden", tr: "iletişime geçmek", en: "to get in touch" },
    ],
    minutes: 4,
    text:
      "A) Deutsch lernen? Ich bin Studentin und gebe Unterricht. 12 Euro pro Stunde. Nur am Wochenende. Tel. 0176 555 12 12\n\nB) Fahrrad zu verkaufen, blau, 3 Jahre alt, fährt gut. 60 Euro. Nur Abholung, kein Versand. Tel. 0171 888 40 40\n\nC) Wir suchen eine Person für den Garten. Samstag, 4 Stunden, 15 Euro pro Stunde. Bitte bei Familie Roth melden: 0421 55 66 77\n\nD) Kinderbetreuung: Ich passe montags und mittwochs nachmittags auf Ihr Kind auf. Ich habe Erfahrung. Tel. 0160 222 33 44",
    questions: [
      {
        text: "Selin arbeitet Montag bis Freitag und will Deutsch lernen. Welche Anzeige passt?",
        options: ["A", "C", "D"],
        answer: 0,
        explain:
          "A ilanı Almanca dersi veriyor ve „nur am Wochenende“ — Selin hafta içi çalıştığı için tam uygun.",
      },
      {
        text: "Herr Yildiz möchte am Samstag Geld verdienen. Welche Anzeige passt?",
        options: ["C", "B", "A"],
        answer: 0,
        explain: "C ilanı cumartesi 4 saatlik bahçe işi için kişi arıyor, saati 15 euro.",
      },
      {
        text: "Anna hat kein Auto. Kann sie das Fahrrad aus Anzeige B kaufen?",
        options: [
          "Ja, aber sie muss es selbst abholen",
          "Ja, es wird geschickt",
          "Nein, es ist verkauft",
        ],
        answer: 0,
        explain: "„Nur Abholung, kein Versand“ — kargo yok, gelip almak gerekiyor.",
      },
      {
        text: "Familie Braun braucht mittwochs jemanden für ihren Sohn. Welche Nummer ruft sie an?",
        options: ["0160 222 33 44", "0421 55 66 77", "0176 555 12 12"],
        answer: 0,
        explain: "D ilanı pazartesi ve çarşamba öğleden sonra çocuk bakıyor.",
      },
    ],
  },
  {
    id: "a1-r11",
    level: "A1",
    skill: "reading",
    title: "Ein Zettel von Frau Wagner",
    genre: "Not",
    intro:
      "Hikâyenin ikinci bölümü: Amir eve gelince kapısında bir not buluyor.",
    gloss: [
      { de: "der Zettel", tr: "not kâğıdı", en: "note" },
      { de: "das Paket", tr: "paket", en: "package" },
      { de: "annehmen", tr: "teslim almak", en: "to accept" },
      { de: "vorbeikommen", tr: "uğramak", en: "to come by" },
      { de: "die Tasse", tr: "fincan", en: "cup" },
      { de: "leihen", tr: "ödünç vermek", en: "to lend" },
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
    ],
    minutes: 3,
    text:
      "Lieber Herr Amir,\n\nheute war der Postbote da. Sie waren nicht zu Hause, also habe ich Ihr Paket angenommen. Es ist bei mir.\n\nIch bin ab 17 Uhr da. Klingeln Sie einfach — zweimal, dann weiß ich, dass Sie es sind.\n\nUnd noch etwas: Sie haben doch keinen Tisch, oder? Mein Sohn hat einen kleinen Tisch im Keller. Er braucht ihn nicht mehr. Wenn Sie wollen, gehört er Ihnen.\n\nTrinken Sie Tee? Ich habe immer welchen da.\n\nIhre Nachbarin\nH. Wagner (Wohnung 3)",
    questions: [
      {
        text: "Warum hat Frau Wagner das Paket?",
        options: [
          "Amir war nicht zu Hause",
          "Das Paket ist für sie",
          "Der Postbote war krank",
        ],
        answer: 0,
        explain: "„Sie waren nicht zu Hause, also habe ich Ihr Paket angenommen.“",
      },
      {
        text: "Wann soll Amir kommen?",
        options: ["Ab 17 Uhr", "Vor 17 Uhr", "Am Wochenende"],
        answer: 0,
        explain: "„Ich bin ab 17 Uhr da.“",
      },
      {
        text: "Was bietet Frau Wagner ihm an?",
        options: ["Einen Tisch", "Ein Bett", "Einen Schlüssel"],
        answer: 0,
        explain: "Oğlunun bodrumdaki küçük masası: „Wenn Sie wollen, gehört er Ihnen.“",
      },
      {
        text: "Wie soll Amir klingeln?",
        options: ["Zweimal", "Einmal", "Dreimal"],
        answer: 0,
        explain: "„Klingeln Sie einfach — zweimal, dann weiß ich, dass Sie es sind.“",
      },
    ],
  },
  {
    id: "a1-r12",
    level: "A1",
    skill: "reading",
    title: "Die Hausordnung",
    genre: "Kurallar",
    intro:
      "Almanya'da her binada asılı olan metin: ev kuralları. Amir'in binasındaki listeyi okuyacaksın.",
    gloss: [
      { de: "die Hausordnung", tr: "apartman kuralları", en: "house rules" },
      { de: "die Ruhezeit", tr: "sessizlik saati", en: "quiet time" },
      { de: "der Müll", tr: "çöp", en: "trash" },
      { de: "trennen", tr: "ayrıştırmak", en: "to separate" },
      { de: "die Waschküche", tr: "çamaşırhane", en: "laundry room" },
      { de: "der Keller", tr: "bodrum", en: "basement" },
      { de: "erlaubt", tr: "serbest", en: "allowed" },
      { de: "verboten", tr: "yasak", en: "forbidden" },
    ],
    minutes: 4,
    text:
      "HAUSORDNUNG — Lindenstraße 8\n\n1. Ruhezeiten: 22–7 Uhr und sonntags den ganzen Tag. Bitte keine Waschmaschine und keine laute Musik.\n\n2. Müll: Bitte trennen! Gelber Sack (Plastik), blaue Tonne (Papier), braune Tonne (Bio), graue Tonne (Rest). Glas kommt in den Container an der Ecke.\n\n3. Waschküche: Jede Wohnung hat einen Tag. Der Plan hängt an der Tür. Bitte die Maschine nach dem Waschen sauber machen.\n\n4. Fahrräder: nur im Keller, nicht im Treppenhaus.\n\n5. Grillen auf dem Balkon ist verboten. Im Garten ist es erlaubt — bitte vorher bei den Nachbarn Bescheid sagen.\n\n6. Fragen? Hausmeister Klose, Wohnung 1, oder 0421 33 44 55.",
    questions: [
      {
        text: "Wann darf man nicht waschen?",
        options: [
          "Nach 22 Uhr und am Sonntag",
          "Nur nach 22 Uhr",
          "Nur am Samstag",
        ],
        answer: 0,
        explain: "Sessizlik saatleri 22–7 ve pazar günü tüm gün; makine de buna dahil.",
      },
      {
        text: "Wohin kommt eine leere Flasche aus Glas?",
        options: ["In den Container an der Ecke", "In die blaue Tonne", "In den gelben Sack"],
        answer: 0,
        explain: "„Glas kommt in den Container an der Ecke.“",
      },
      {
        text: "Wo darf das Fahrrad stehen?",
        options: ["Im Keller", "Im Treppenhaus", "Auf dem Balkon"],
        answer: 0,
        explain: "„Fahrräder: nur im Keller, nicht im Treppenhaus.“",
      },
      {
        text: "Darf Amir auf dem Balkon grillen?",
        options: [
          "Nein, aber im Garten ist es erlaubt",
          "Ja, immer",
          "Ja, aber nur am Wochenende",
        ],
        answer: 0,
        explain: "Balkonda yasak; bahçede serbest ama önceden komşulara haber verilmeli.",
      },
      {
        text: "Wer ist Herr Klose?",
        options: ["Der Hausmeister", "Der Vermieter", "Ein Nachbar aus Wohnung 3"],
        answer: 0,
        explain: "„Hausmeister Klose, Wohnung 1“ — 3 numaralı daire Frau Wagner'in.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "a1-l1",
    level: "A1",
    skill: "listening",
    title: "Auf dem Markt",
    genre: "Diyalog",
    intro: "Lena manavda alışveriş yapıyor; satıcıyla konuşmasını dinleyeceksin.",
    gloss: [
      { de: "suchen", tr: "aramak", en: "to look for" },
      { de: "der Apfel", tr: "elma", en: "apple" },
      { de: "das Kilo", tr: "kilo", en: "kilo" },
      { de: "frisch", tr: "taze", en: "fresh" },
      { de: "leider", tr: "maalesef", en: "unfortunately" },
      { de: "zahlen", tr: "ödemek", en: "to pay" },
      { de: "die Bäckerei", tr: "fırın", en: "bakery" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Verkäufer", text: "Guten Tag! Kann ich Ihnen helfen?" },
      { speaker: "Lena", text: "Ja, gern. Ich suche Äpfel." },
      { speaker: "Verkäufer", text: "Ja, hier bitte. Ein Kilo kostet 2 Euro 50." },
      {
        speaker: "Lena",
        text: "Gut, dann nehme ich zwei Kilo. Und haben Sie auch frisches Brot?",
      },
      {
        speaker: "Verkäufer",
        text: "Nein, leider nicht. Aber die Bäckerei ist gleich neben dem Markt.",
      },
      { speaker: "Lena", text: "Ah, danke. Dann zahle ich nur die Äpfel. Hier sind 5 Euro." },
      { speaker: "Verkäufer", text: "Vielen Dank und auf Wiedersehen!" },
    ],
    questions: [
      {
        text: "Was kauft Lena?",
        options: ["Äpfel", "Brot", "Äpfel und Brot"],
        answer: 0,
        explain:
          "Lena sadece elma alıyor: „Dann zahle ich nur die Äpfel.“ Ekmek istiyor ama satıcıda yok.",
      },
      {
        text: "Wie viel kostet ein Kilo Äpfel?",
        options: ["2 Euro 50", "5 Euro", "2 Euro"],
        answer: 0,
        explain:
          "Satıcı „Ein Kilo kostet 2 Euro 50“ diyor. 5 Euro Lena'nın iki kilo için verdiği para.",
      },
      {
        text: "Richtig oder falsch? Der Verkäufer hat frisches Brot.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: Satıcı „Nein, leider nicht“ diye cevap veriyor, ekmek yok.",
      },
      {
        text: "Wo ist die Bäckerei?",
        options: ["Gleich neben dem Markt", "Im Markt", "Am Bahnhof"],
        answer: 0,
        explain:
          "Satıcı „die Bäckerei ist gleich neben dem Markt“ diyor — fırın pazarın hemen yanında.",
      },
      {
        kind: "dictation",
        text: "Dikte: Lena'nın ilk cümlesini dinle ve yaz.",
        options: [],
        answer: 0,
        accept: ["Ja, gern. Ich suche Äpfel.", "Ja gern, ich suche Äpfel."],
        explain: "„Ja, gern. Ich suche Äpfel.“ — suchen (aramak) + Akkusativ nesne; Äpfel çoğul, umlautlu.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: olayları doğru sıraya koy.",
        options: [],
        answer: 0,
        items: ["Lena sucht Äpfel.", "Der Verkäufer sagt den Preis.", "Lena fragt nach Brot.", "Lena zahlt 5 Euro."],
        explain: "Önce elma aranır, fiyat söylenir, ekmek sorulur (yok), sonra yalnız elmalar ödenir.",
      },
    ],
  },
  {
    id: "a1-l2",
    level: "A1",
    skill: "listening",
    title: "Anruf bei der Arztpraxis",
    genre: "Telesekreter",
    intro: "Bir doktor muayenehanesinin telesekreter kaydını dinleyeceksin.",
    gloss: [
      { de: "die Praxis", tr: "muayenehane", en: "doctor's office" },
      { de: "geöffnet", tr: "açık", en: "open" },
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "der Vormittag", tr: "öğleden önce", en: "morning" },
      { de: "der Notfall", tr: "acil durum", en: "emergency" },
      { de: "wählen", tr: "numara çevirmek", en: "to dial" },
      { de: "Auf Wiederhören", tr: "hoşça kalın", en: "goodbye", note: "Telefonda vedalaşırken kullanılır." },
    ],
    minutes: 2,
    segments: [
      {
        text: "Guten Tag. Hier ist die Praxis von Doktor Meyer. Unsere Praxis ist von Montag bis Freitag von 8 bis 12 Uhr geöffnet, am Dienstag und Donnerstag auch von 15 bis 18 Uhr. Am Mittwochnachmittag ist die Praxis geschlossen. Möchten Sie einen Termin? Dann rufen Sie bitte am Vormittag an oder schreiben Sie uns eine E-Mail. In Notfällen wählen Sie bitte die 112. Vielen Dank und auf Wiederhören.",
      },
    ],
    questions: [
      {
        text: "Wann ist die Praxis am Vormittag geöffnet?",
        options: ["Von 8 bis 12 Uhr", "Von 15 bis 18 Uhr", "Von 8 bis 18 Uhr"],
        answer: 0,
        explain:
          "Kayıtta „von Montag bis Freitag von 8 bis 12 Uhr geöffnet“ deniyor. 15–18 sadece salı ve perşembe öğleden sonraları.",
      },
      {
        text: "Richtig oder falsch? Am Mittwochnachmittag ist die Praxis geöffnet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Am Mittwochnachmittag ist die Praxis geschlossen“ — çarşamba öğleden sonra kapalı.",
      },
      {
        text: "Was soll man für einen Termin machen?",
        options: ["Am Vormittag anrufen", "Am Nachmittag vorbeikommen", "Die 112 wählen"],
        answer: 0,
        explain:
          "„Dann rufen Sie bitte am Vormittag an“ — randevu için öğleden önce aranmalı. 112 sadece acil durumlar için.",
      },
    ],
  },
  {
    id: "a1-l3",
    level: "A1",
    skill: "listening",
    title: "Durchsage am Flughafen",
    genre: "Anons",
    intro: "Havaalanında İstanbul uçuşuyla ilgili bir anons dinleyeceksin.",
    gloss: [
      { de: "die Durchsage", tr: "anons", en: "announcement" },
      { de: "der Passagier", tr: "yolcu", en: "passenger" },
      { de: "der Flug", tr: "uçuş", en: "flight" },
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "starten", tr: "kalkmak", en: "to take off" },
      { de: "das Gate", tr: "biniş kapısı", en: "gate" },
    ],
    minutes: 2,
    segments: [
      {
        text: "Achtung, eine wichtige Durchsage für alle Passagiere nach Istanbul. Der Flug TK 1624 hat 40 Minuten Verspätung. Das Flugzeug startet nicht um 14:20 Uhr, sondern um 15 Uhr. Bitte gehen Sie erst um 14:15 Uhr zum Gate. Achtung, das Gate ist neu: Der Flug startet heute von Gate B12, nicht von Gate B7. Wir wünschen Ihnen einen guten Flug.",
      },
    ],
    questions: [
      {
        text: "Wann startet das Flugzeug heute?",
        options: ["Um 14:20 Uhr", "Um 15 Uhr", "Um 14:15 Uhr"],
        answer: 1,
        explain:
          "„Das Flugzeug startet nicht um 14:20 Uhr, sondern um 15 Uhr“ — rötar yüzünden yeni kalkış saati 15:00. 14:15 kapıya gitme saati.",
      },
      {
        text: "Von welchem Gate startet der Flug?",
        options: ["Von Gate B12", "Von Gate B7", "Von Gate B40"],
        answer: 0,
        explain:
          "Anonsta „Der Flug startet heute von Gate B12, nicht von Gate B7“ deniyor. B7 eski kapı.",
      },
      {
        text: "Richtig oder falsch? Der Flug nach Istanbul hat Verspätung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Der Flug TK 1624 hat 40 Minuten Verspätung“ — uçuşta 40 dakika rötar var.",
      },
      {
        text: "Wann sollen die Passagiere zum Gate gehen?",
        options: ["Um 14:15 Uhr", "Um 14:20 Uhr", "Um 15 Uhr"],
        answer: 0,
        explain:
          "„Bitte gehen Sie erst um 14:15 Uhr zum Gate“ — yolculardan kapıya 14:15'te gitmeleri isteniyor.",
      },
    ],
  },
  {
    id: "a1-l4",
    level: "A1",
    skill: "listening",
    title: "Im Restaurant",
    genre: "Diyalog",
    intro: "Emre ile bir garson arasındaki restoran konuşmasını dinleyeceksin.",
    gloss: [
      { de: "bestellen", tr: "sipariş etmek", en: "to order" },
      { de: "die Tomatensuppe", tr: "domates çorbası", en: "tomato soup" },
      { de: "das Hähnchen", tr: "piliç", en: "chicken" },
      { de: "der Reis", tr: "pilav", en: "rice" },
      { de: "der Apfelsaft", tr: "elma suyu", en: "apple juice" },
      { de: "sofort", tr: "hemen", en: "immediately" },
      { de: "die Toilette", tr: "tuvalet", en: "toilet" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Kellner", text: "Guten Abend! Was möchten Sie bestellen?" },
      {
        speaker: "Emre",
        text: "Guten Abend. Ich nehme die Tomatensuppe und danach das Hähnchen mit Reis.",
      },
      { speaker: "Kellner", text: "Gern. Und was möchten Sie trinken?" },
      {
        speaker: "Emre",
        text: "Ein Mineralwasser, bitte. Und meine Frau nimmt den Salat mit Käse und einen Apfelsaft.",
      },
      {
        speaker: "Kellner",
        text: "Also eine Tomatensuppe, ein Hähnchen mit Reis, ein Salat mit Käse, ein Mineralwasser und ein Apfelsaft. Kommt sofort!",
      },
      { speaker: "Emre", text: "Danke schön! Ach, eine Frage: Wo sind die Toiletten?" },
      { speaker: "Kellner", text: "Gleich links neben der Bar." },
    ],
    questions: [
      {
        text: "Was trinkt Emre?",
        options: ["Ein Mineralwasser", "Einen Apfelsaft", "Eine Cola"],
        answer: 0,
        explain:
          "Emre „Ein Mineralwasser, bitte“ diyor. Elma suyu eşinin içeceği.",
      },
      {
        text: "Wer nimmt den Salat mit Käse?",
        options: ["Emres Frau", "Emre", "Der Kellner"],
        answer: 0,
        explain:
          "Emre „meine Frau nimmt den Salat mit Käse“ diyor — salatayı eşi alıyor, kendisi çorba ve tavuk yiyor.",
      },
      {
        text: "Richtig oder falsch? Emre bestellt eine Tomatensuppe.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ich nehme die Tomatensuppe und danach das Hähnchen mit Reis“ diyor.",
      },
      {
        text: "Wo sind die Toiletten?",
        options: ["Links neben der Bar", "Rechts neben der Küche", "Neben dem Eingang"],
        answer: 0,
        explain: "Garsonun son cevabı: „Gleich links neben der Bar.“",
      },
    ],
  },
  {
    id: "a1-l5",
    level: "A1",
    skill: "listening",
    title: "Eine Nachricht von Deniz",
    genre: "Mesaj",
    intro: "Deniz, arkadaşı Ceren'in telesekreterine yarınki plan hakkında mesaj bırakıyor.",
    gloss: [
      { de: "das Wetter", tr: "hava", en: "weather" },
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "das Grad", tr: "derece", en: "degree" },
      { de: "das Schwimmbad", tr: "yüzme havuzu", en: "swimming pool" },
      { de: "drinnen", tr: "içeride", en: "inside" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "zurückrufen", tr: "geri aramak", en: "to call back" },
    ],
    minutes: 2,
    segments: [
      {
        speaker: "Deniz",
        text: "Hallo Ceren, hier ist Deniz. Wir wollen doch morgen zusammen in den Park gehen. Aber das Wetter wird leider schlecht. Es regnet morgen den ganzen Tag und es sind nur 12 Grad. Ich habe eine Idee: Wir gehen ins Schwimmbad! Das Schwimmbad ist ja drinnen. Es kostet 4 Euro. Ich hole dich um 11 Uhr mit dem Auto ab. Ruf mich bitte zurück. Tschüss!",
      },
    ],
    questions: [
      {
        text: "Wie wird das Wetter morgen?",
        options: ["Es regnet den ganzen Tag.", "Es ist sonnig und warm.", "Es schneit."],
        answer: 0,
        explain:
          "Deniz „Es regnet morgen den ganzen Tag und es sind nur 12 Grad“ diyor — bütün gün yağmurlu.",
      },
      {
        text: "Wohin möchte Deniz jetzt gehen?",
        options: ["Ins Schwimmbad", "In den Park", "Ins Kino"],
        answer: 0,
        explain:
          "Yeni fikri „Wir gehen ins Schwimmbad!“ — park eski plandı, yağmur yüzünden iptal.",
      },
      {
        text: "Richtig oder falsch? Deniz holt Ceren um 11 Uhr ab.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ich hole dich um 11 Uhr mit dem Auto ab“ diyor.",
      },
      {
        text: "Was kostet das Schwimmbad?",
        options: ["4 Euro", "11 Euro", "12 Euro"],
        answer: 0,
        explain:
          "„Es kostet 4 Euro“ cümlesi havuzun ücretini söylüyor. 11 buluşma saati, 12 ise hava sıcaklığı.",
      },
    ],
  },
  {
    id: "a1-l6",
    level: "A1",
    skill: "listening",
    title: "Durchsage im Supermarkt",
    genre: "Anons",
    intro: "Bir süpermarketin günün kampanyalarını duyurduğu anonsu dinleyeceksin.",
    gloss: [
      { de: "das Angebot", tr: "indirim", en: "special offer" },
      { de: "die Erdbeere", tr: "çilek", en: "strawberry" },
      { de: "der Käse", tr: "peynir", en: "cheese" },
      { de: "die Fleischtheke", tr: "et reyonu", en: "meat counter" },
      { de: "schließen", tr: "kapanmak", en: "to close" },
      { de: "die Kasse", tr: "kasa", en: "checkout" },
      { de: "der Einkauf", tr: "alışveriş", en: "shopping" },
    ],
    minutes: 2,
    segments: [
      {
        text: "Liebe Kundinnen und Kunden, herzlich willkommen! Heute haben wir viele Angebote für Sie. Frische Erdbeeren aus Spanien: 500 Gramm für nur 1 Euro 99. Käse aus Frankreich: 100 Gramm für 1 Euro 29. Und an unserer Fleischtheke: Hähnchen, das Kilo für 3 Euro 49. Unser Markt schließt heute um 20 Uhr. Die Kasse 5 ist geschlossen, bitte gehen Sie zu den Kassen 1 bis 4. Wir wünschen Ihnen einen schönen Einkauf!",
      },
    ],
    questions: [
      {
        text: "Woher kommen die Erdbeeren?",
        options: ["Aus Spanien", "Aus Frankreich", "Aus Deutschland"],
        answer: 0,
        explain:
          "Anonsta „Frische Erdbeeren aus Spanien“ deniyor. Fransa'dan gelen ürün peynir.",
      },
      {
        text: "Was kostet der Käse?",
        options: [
          "100 Gramm für 1 Euro 29",
          "500 Gramm für 1 Euro 99",
          "Das Kilo für 3 Euro 49",
        ],
        answer: 0,
        explain:
          "„Käse aus Frankreich: 100 Gramm für 1 Euro 29.“ Diğer fiyatlar çilek ve tavuğa ait.",
      },
      {
        text: "Richtig oder falsch? Der Markt schließt heute um 20 Uhr.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Unser Markt schließt heute um 20 Uhr“ cümlesi bunu söylüyor.",
      },
      {
        text: "Welche Kasse ist geschlossen?",
        options: ["Kasse 5", "Kasse 1", "Kasse 4"],
        answer: 0,
        explain:
          "„Die Kasse 5 ist geschlossen“ — müşteriler 1'den 4'e kadar olan kasalara yönlendiriliyor.",
      },
    ],
  },

  {
    id: "a1-l7",
    level: "A1",
    skill: "listening",
    title: "Herr Klose erklärt den Müll",
    genre: "Diyalog",
    intro:
      "Hikâyenin üçüncü bölümü: Amir çöpü yanlış kovaya atmış, kapıcı Herr Klose açıklıyor.",
    gloss: [
      { de: "der Hausmeister", tr: "kapıcı", en: "janitor" },
      { de: "die Tonne", tr: "çöp konteyneri", en: "waste bin" },
      { de: "der Joghurtbecher", tr: "yoğurt kabı", en: "yoghurt pot" },
      { de: "wegwerfen", tr: "çöpe atmak", en: "to throw away" },
      { de: "falsch", tr: "yanlış", en: "wrong" },
      { de: "die Strafe", tr: "ceza", en: "punishment" },
      { de: "kein Problem", tr: "sorun değil", en: "no problem" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Herr Klose", text: "Guten Morgen! Sie sind der neue Nachbar, oder?" },
      { speaker: "Amir", text: "Ja, guten Morgen. Amir. Ich wohne oben, im dritten Stock." },
      {
        speaker: "Herr Klose",
        text: "Klose, Hausmeister. Sagen Sie mal — war das Ihr Müll gestern? Die Joghurtbecher in der braunen Tonne?",
      },
      { speaker: "Amir", text: "Oh. Ja, vielleicht. Ist das falsch?" },
      {
        speaker: "Herr Klose",
        text: "Ja, aber kein Problem. Braun ist für Bio: Essen, Obst, Gemüse. Plastik kommt in den gelben Sack.",
      },
      { speaker: "Amir", text: "Und Papier?" },
      {
        speaker: "Herr Klose",
        text: "Blaue Tonne. Und Glas nicht ins Haus — der Container ist an der Ecke, neben der Bäckerei.",
      },
      { speaker: "Amir", text: "Das sind viele Farben." },
      {
        speaker: "Herr Klose",
        text: "Ja. Aber Sie lernen das schnell. Und wenn Sie fragen wollen: Wohnung 1, ich bin fast immer da.",
      },
    ],
    questions: [
      {
        text: "Was war falsch?",
        options: [
          "Joghurtbecher in der braunen Tonne",
          "Papier im gelben Sack",
          "Glas in der blauen Tonne",
        ],
        answer: 0,
        explain: "Kahverengi kova biyoatık için; yoğurt kabı plastik.",
      },
      {
        text: "Wohin kommt Plastik?",
        options: ["In den gelben Sack", "In die braune Tonne", "In die blaue Tonne"],
        answer: 0,
        explain: "„Plastik kommt in den gelben Sack.“",
      },
      {
        text: "Wo ist der Glascontainer?",
        options: ["An der Ecke neben der Bäckerei", "Im Keller", "Im Hof"],
        answer: 0,
        explain: "„Der Container ist an der Ecke, neben der Bäckerei.“",
      },
      {
        text: "Wie reagiert Herr Klose?",
        options: ["Freundlich — kein Problem", "Er ist sehr böse", "Er will eine Strafe"],
        answer: 0,
        explain: "„Ja, aber kein Problem.“ Sonunda soru sormaya da davet ediyor.",
      },
    ],
  },
  {
    id: "a1-l8",
    level: "A1",
    skill: "listening",
    title: "Beim Bäcker",
    genre: "Diyalog",
    intro: "Fırında sipariş: Almanya'da günün en sık tekrarlanan konuşmalarından biri.",
    gloss: [
      { de: "das Brötchen", tr: "küçük ekmek", en: "bread roll" },
      { de: "das Vollkornbrot", tr: "tam tahıllı ekmek", en: "whole grain bread" },
      { de: "die Scheibe", tr: "dilim", en: "slice" },
      { de: "geschnitten", tr: "dilimlenmiş", en: "sliced" },
      { de: "sonst noch etwas?", tr: "başka bir şey?", en: "anything else?" },
      { de: "das macht …", tr: "… eder", en: "that comes to …" },
      { de: "das Kleingeld", tr: "bozuk para", en: "small change" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Verkäuferin", text: "Guten Morgen! Was darf es sein?" },
      { speaker: "Amir", text: "Guten Morgen. Vier Brötchen, bitte." },
      { speaker: "Verkäuferin", text: "Gerne. Sonst noch etwas?" },
      { speaker: "Amir", text: "Ja, ein Vollkornbrot. Können Sie es schneiden?" },
      { speaker: "Verkäuferin", text: "Natürlich. Dicke oder dünne Scheiben?" },
      { speaker: "Amir", text: "Dünne, bitte." },
      { speaker: "Verkäuferin", text: "So. Das macht sechs Euro achtzig." },
      { speaker: "Amir", text: "Ich habe leider nur einen Zwanziger." },
      { speaker: "Verkäuferin", text: "Kein Problem. Dreizehn Euro zwanzig zurück. Schönen Tag!" },
    ],
    questions: [
      {
        text: "Was kauft Amir?",
        options: [
          "Vier Brötchen und ein Vollkornbrot",
          "Nur Brötchen",
          "Ein Brot und einen Kuchen",
        ],
        answer: 0,
        explain: "Önce dört küçük ekmek, sonra bir tam buğday ekmeği.",
      },
      {
        text: "Wie soll das Brot geschnitten werden?",
        options: ["In dünne Scheiben", "In dicke Scheiben", "Gar nicht"],
        answer: 0,
        explain: "„Dünne, bitte.“",
      },
      {
        text: "Wie viel kostet alles?",
        options: ["6,80 Euro", "13,20 Euro", "20 Euro"],
        answer: 0,
        explain: "„Das macht sechs Euro achtzig.“ 13,20 para üstü, 20 verdiği banknot.",
      },
    ],
  },
  {
    id: "a1-l9",
    level: "A1",
    skill: "listening",
    title: "Drei Ansagen",
    genre: "Sınav formatı",
    intro:
      "A1 dinleme bölümünün klasik görevi: üç kısa anons, her birine bir soru. Her anonsu ayrı dinleyebilirsin.",
    gloss: [
      { de: "die Ansage", tr: "duyuru", en: "announcement" },
      { de: "der Gleis", tr: "peron", en: "platform" },
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "geschlossen", tr: "kapalı", en: "closed" },
      { de: "das Angebot", tr: "indirim", en: "special offer" },
      { de: "die Kasse", tr: "kasa", en: "checkout" },
      { de: "der Ausgang", tr: "çıkış", en: "exit" },
    ],
    minutes: 3,
    segments: [
      {
        speaker: "Ansage 1",
        text: "Achtung auf Gleis 5: Der Zug nach Hamburg, Abfahrt 14:12 Uhr, hat heute etwa zehn Minuten Verspätung.",
      },
      {
        speaker: "Ansage 2",
        text: "Liebe Kunden, unser Markt schließt heute um 18 Uhr, nicht um 20 Uhr. Bitte kommen Sie zur Kasse. Morgen sind wir wieder normal für Sie da.",
      },
      {
        speaker: "Ansage 3",
        text: "Information für unsere Gäste: Das Schwimmbad ist heute nur bis 15 Uhr geöffnet. Der Grund ist ein Kinderfest. Der Eintritt ist ab 13 Uhr frei.",
      },
    ],
    questions: [
      {
        text: "Ansage 1: Wann fährt der Zug ungefähr?",
        options: ["Um 14:22 Uhr", "Um 14:12 Uhr", "Um 15 Uhr"],
        answer: 0,
        explain: "14:12 + yaklaşık 10 dakika gecikme = yaklaşık 14:22.",
      },
      {
        text: "Ansage 2: Was ist heute anders?",
        options: [
          "Der Markt schließt zwei Stunden früher",
          "Der Markt ist geschlossen",
          "Der Markt schließt später",
        ],
        answer: 0,
        explain: "„heute um 18 Uhr, nicht um 20 Uhr“ — iki saat erken.",
      },
      {
        text: "Ansage 3: Was kostet der Eintritt um 14 Uhr?",
        options: ["Nichts", "Den normalen Preis", "Die Hälfte"],
        answer: 0,
        explain: "„Der Eintritt ist ab 13 Uhr frei“ — saat 14'te ücretsiz.",
      },
    ],
  },
  {
    id: "a1-l10",
    level: "A1",
    skill: "listening",
    title: "Was ist ein Adventskalender?",
    genre: "Kültür",
    intro:
      "Aralık ayında her Alman evinde görünen şey: Advent takvimi. Kısa bir açıklama dinleyeceksin.",
    gloss: [
      { de: "der Advent", tr: "Noel öncesi dönem", en: "Advent", note: "Noel'den önceki dört haftayı kapsar." },
      { de: "der Kalender", tr: "takvim", en: "calendar" },
      { de: "das Türchen", tr: "küçük kapak", en: "little door" },
      { de: "aufmachen", tr: "açmak", en: "to open" },
      { de: "die Schokolade", tr: "çikolata", en: "chocolate" },
      { de: "basteln", tr: "el işi yapmak", en: "to do crafts" },
      { de: "sich freuen", tr: "sevinmek", en: "to be happy" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Lena", text: "Amir, hast du schon einen Adventskalender?" },
      { speaker: "Amir", text: "Einen was? Ein Kalender für Dezember?" },
      {
        speaker: "Lena",
        text: "Fast. Er hat 24 kleine Türchen. Vom 1. bis zum 24. Dezember machst du jeden Tag ein Türchen auf.",
      },
      { speaker: "Amir", text: "Und was ist drin?" },
      {
        speaker: "Lena",
        text: "Meistens Schokolade. Für Kinder oft ein kleines Spielzeug. Manche Familien basteln ihn selbst und schreiben kleine Texte hinein.",
      },
      { speaker: "Amir", text: "Auch für Erwachsene?" },
      {
        speaker: "Lena",
        text: "Klar! Mein Mann hat einen mit Kaffee, jeden Tag eine andere Sorte. Meine Mutter macht einen mit Tee.",
      },
      { speaker: "Amir", text: "Und wenn man zwei Türchen an einem Tag aufmacht?" },
      { speaker: "Lena", text: "Dann sagen die Kinder, du hast betrogen. Das ist eine ernste Sache." },
    ],
    questions: [
      {
        text: "Wie viele Türchen hat ein Adventskalender?",
        options: ["24", "31", "12"],
        answer: 0,
        explain: "„Er hat 24 kleine Türchen“ — 1'den 24 Aralık'a kadar.",
      },
      {
        text: "Was ist meistens drin?",
        options: ["Schokolade", "Geld", "Bücher"],
        answer: 0,
        explain: "„Meistens Schokolade“, çocuklarda küçük oyuncak.",
      },
      {
        text: "Was hat Lenas Mann?",
        options: [
          "Einen Kalender mit Kaffee",
          "Einen Kalender mit Tee",
          "Keinen Kalender",
        ],
        answer: 0,
        explain: "Kocasınınki kahve, annesininki çay.",
      },
      {
        text: "Was sagt Lena am Ende?",
        options: [
          "Zwei Türchen an einem Tag gilt als Betrug",
          "Man darf alle Türchen aufmachen",
          "Kinder mögen den Kalender nicht",
        ],
        answer: 0,
        explain: "„Dann sagen die Kinder, du hast betrogen. Das ist eine ernste Sache.“ — şakayla karışık.",
      },
    ],
  },
  {
    id: "a1-l11",
    level: "A1",
    skill: "listening",
    title: "Einen Termin absagen",
    genre: "Telefon",
    intro: "Amir doktor randevusunu iptal ediyor. Telefon konuşmasını dinleyeceksin.",
    gloss: [
      { de: "die Praxis", tr: "muayenehane", en: "doctor's office" },
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
      { de: "verschieben", tr: "ertelemek", en: "to postpone" },
      { de: "der Geburtstag", tr: "doğum günü", en: "birthday" },
      { de: "frei", tr: "boş", en: "available" },
      { de: "passen", tr: "uymak", en: "to suit" },
      { de: "die Versichertenkarte", tr: "sigorta kartı", en: "insurance card" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Praxis", text: "Praxis Dr. Neumann, Schmidt am Apparat. Guten Tag." },
      {
        speaker: "Amir",
        text: "Guten Tag. Hier ist Amir Haddad. Ich habe morgen um 9 Uhr einen Termin. Leider kann ich nicht kommen.",
      },
      { speaker: "Praxis", text: "Kein Problem. Wie ist Ihr Geburtsdatum, bitte?" },
      { speaker: "Amir", text: "Der zwölfte Vierte, neunzehnhundertsechsundneunzig." },
      { speaker: "Praxis", text: "Danke. Möchten Sie den Termin verschieben?" },
      { speaker: "Amir", text: "Ja, gerne. Haben Sie etwas am Nachmittag?" },
      {
        speaker: "Praxis",
        text: "Am Donnerstag um 15:30 Uhr wäre frei. Oder Freitag um 16 Uhr.",
      },
      { speaker: "Amir", text: "Donnerstag passt besser." },
      {
        speaker: "Praxis",
        text: "Gut, Donnerstag 15:30 Uhr. Bringen Sie bitte Ihre Versichertenkarte mit.",
      },
    ],
    questions: [
      {
        text: "Warum ruft Amir an?",
        options: [
          "Er kann morgen nicht kommen",
          "Er ist krank und braucht schnell einen Termin",
          "Er sucht eine neue Praxis",
        ],
        answer: 0,
        explain: "„Leider kann ich nicht kommen“ — randevuyu iptal ediyor.",
      },
      {
        text: "Was fragt die Praxis zuerst?",
        options: ["Sein Geburtsdatum", "Seine Adresse", "Seine Telefonnummer"],
        answer: 0,
        explain: "„Wie ist Ihr Geburtsdatum, bitte?“ — Almanya'da standart kimlik doğrulaması.",
      },
      {
        text: "Wann ist der neue Termin?",
        options: ["Donnerstag um 15:30 Uhr", "Freitag um 16 Uhr", "Morgen um 9 Uhr"],
        answer: 0,
        explain: "İki seçenekten „Donnerstag passt besser“ diyor.",
      },
      {
        text: "Was soll er mitbringen?",
        options: ["Die Versichertenkarte", "Ein Rezept", "Geld"],
        answer: 0,
        explain: "„Bringen Sie bitte Ihre Versichertenkarte mit.“",
      },
    ],
  },
  {
    id: "a1-l12",
    level: "A1",
    skill: "listening",
    title: "Amir lädt ein",
    genre: "Sesli mesaj",
    intro:
      "Hikâyenin dördüncü bölümü: Amir yerleşti ve komşularını davet ediyor. Sesli mesajı dinleyeceksin.",
    gloss: [
      { de: "einladen", tr: "davet etmek", en: "to invite" },
      { de: "endlich", tr: "sonunda", en: "finally" },
      { de: "fertig", tr: "hazır", en: "ready" },
      { de: "kochen", tr: "yemek pişirmek", en: "to cook" },
      { de: "scharf", tr: "acı", en: "spicy" },
      { de: "Bescheid sagen", tr: "haber vermek", en: "to let know" },
      { de: "gegen", tr: "civarında", en: "around" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Amir", text: "Hallo Frau Wagner, hier ist Amir aus dem dritten Stock." },
      {
        speaker: "Amir",
        text: "Die Wohnung ist endlich fertig. Der Tisch von Ihrem Sohn steht jetzt in der Küche — er ist perfekt, vielen Dank noch einmal.",
      },
      {
        speaker: "Amir",
        text: "Ich möchte Sie am Samstag zum Essen einladen, gegen 18 Uhr. Ich koche etwas aus Syrien. Nicht scharf, keine Sorge.",
      },
      {
        speaker: "Amir",
        text: "Herrn Klose habe ich auch gefragt. Er kommt, glaube ich — er hat gesagt: „Mal sehen.“",
      },
      { speaker: "Amir", text: "Sagen Sie mir bis Donnerstag Bescheid? Bis bald!" },
    ],
    questions: [
      {
        text: "Warum ruft Amir an?",
        options: [
          "Er lädt Frau Wagner zum Essen ein",
          "Er braucht wieder Hilfe",
          "Er sucht ein Paket",
        ],
        answer: 0,
        explain: "„Ich möchte Sie am Samstag zum Essen einladen.“",
      },
      {
        text: "Wo steht jetzt der Tisch?",
        options: ["In der Küche", "Im Keller", "Im Wohnzimmer"],
        answer: 0,
        explain: "„Der Tisch von Ihrem Sohn steht jetzt in der Küche.“",
      },
      {
        text: "Was sagt er über das Essen?",
        options: ["Es ist nicht scharf", "Es ist sehr scharf", "Es gibt nur Salat"],
        answer: 0,
        explain: "„Nicht scharf, keine Sorge.“",
      },
      {
        text: "Was hat Herr Klose gesagt?",
        options: ["„Mal sehen“", "„Ja, gerne“", "„Nein, danke“"],
        answer: 0,
        explain: "Kesin bir cevap vermemiş — Amir de „er kommt, glaube ich“ diyor.",
      },
      {
        text: "Bis wann soll Frau Wagner antworten?",
        options: ["Bis Donnerstag", "Bis Samstag", "Bis 18 Uhr"],
        answer: 0,
        explain: "„Sagen Sie mir bis Donnerstag Bescheid?“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "a1-w1",
    level: "A1",
    skill: "writing",
    title: "Sich vorstellen",
    genre: "Tanışma",
    intro: "Kendini tanıtmayı çalışacaksın: önce cümleler kur, sonra kısa bir forum mesajı yaz.",
    gloss: [
      { de: "heißen", tr: "adı olmak", en: "to be called" },
      { de: "kommen aus", tr: "…den gelmek", en: "to come from" },
      { de: "wohnen", tr: "oturmak", en: "to live" },
      { de: "arbeiten als", tr: "… olarak çalışmak", en: "to work as" },
      { de: "das Hobby", tr: "hobi", en: "hobby" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "form",
        prompt: "Kurs kayıt formunu Elif için doldur.",
        facts: "Elif Kaya, 29 yaşında, İzmir doğumlu; Berlin'de Schillerstraße 12'de oturuyor; öğretmen; Türkçe ve İngilizce biliyor.",
        fields: [
          { label: "Vorname", answer: "Elif" },
          { label: "Nachname", answer: "Kaya" },
          { label: "Alter", answer: "29", accept: ["29 Jahre"] },
          { label: "Geburtsort", answer: "Izmir", accept: ["İzmir"] },
          { label: "Wohnort", answer: "Berlin" },
          { label: "Beruf", answer: "Lehrerin", accept: ["Lehrer"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Aynı cümleyi resmî hitapla (Sie) yaz.",
        source: "Wo wohnst du?",
        answer: "Wo wohnen Sie?",
        why: "Resmî hitapta özne Sie (büyük harf) ve fiil -en biçiminde: wohnen Sie.",
      },
      {
        kind: "sentence",
        words: [
          { de: "der Kaffee", tr: "kahve", en: "coffee" },
          { de: "trinken", tr: "içmek", en: "to drink" },
        ],
        prompt: "Bu iki kelimeyle sabah rutinin hakkında bir cümle kur.",
        sample: "Ich trinke jeden Morgen einen Kaffee.",
      },
      {
        kind: "build",
        tr: "Benim adım Elif ve İzmir'den geliyorum.",
        answer: "Ich heiße Elif und komme aus Izmir.",
        hint: "Fiil ikinci pozisyonda; şehir adlarıyla „aus“ kullanılır.",
      },
      {
        kind: "build",
        tr: "Berlin'de küçük bir dairede oturuyorum.",
        answer: "Ich wohne in Berlin in einer kleinen Wohnung.",
        alternatives: ["In Berlin wohne ich in einer kleinen Wohnung."],
        hint: "„wohnen in“ kalıbı; die Wohnung dişil olduğu için „in einer kleinen Wohnung“.",
      },
      {
        kind: "build",
        tr: "Öğretmen olarak çalışıyorum.",
        answer: "Ich arbeite als Lehrerin.",
        hint: "Meslek söylerken „als“ kullanılır, artikel gerekmez.",
      },
      {
        kind: "free",
        prompt:
          "Yeni Almanca kursunun forumuna kendini tanıtan kısa bir mesaj yaz. Şu üç noktaya değin: adın ve nereli olduğun, nerede oturduğun, işin veya hobin.",
        checklist: [
          "Selamlama ile başladın mı? (Hallo zusammen!)",
          "Üç içerik noktasının hepsine değindin mi: isim ve memleket, oturduğun yer, iş veya hobi?",
          "Fiiller ikinci pozisyonda mı? (Ich heiße…, Ich wohne…)",
          "Veda cümlesiyle bitirdin mi? (Bis bald!)",
        ],
        minWords: 20,
        phrases: [
          { de: "Ich heiße …", tr: "Benim adım …", en: "My name is …" },
          { de: "Ich komme aus …", tr: "…'den geliyorum", en: "I'm from …" },
          { de: "Ich wohne in …", tr: "…'de oturuyorum", en: "I live in …" },
          { de: "Ich arbeite als …", tr: "… olarak çalışıyorum", en: "I work as a …" },
          { de: "Mein Hobby ist …", tr: "Hobim …", en: "My hobby is …" },
          { de: "Bis bald!", tr: "Yakında görüşürüz!", en: "See you soon!" },
        ],
        sample:
          "Hallo zusammen! Ich heiße Emre und ich komme aus der Türkei, aus Ankara. Jetzt wohne ich in Hamburg. Ich arbeite als Ingenieur. Meine Hobbys sind Fußball und Kochen. Ich lerne Deutsch für die Arbeit. Bis bald! Emre",
      },
    ],
  },
  {
    id: "a1-w2",
    level: "A1",
    skill: "writing",
    title: "Eine Nachricht an einen Freund",
    genre: "Mesaj",
    intro: "Arkadaşlarla plan yapmayı çalışacaksın: cümleler kur, sonra bir davete cevap yaz.",
    gloss: [
      { de: "sich treffen", tr: "buluşmak", en: "to meet" },
      { de: "die Einladung", tr: "davet", en: "invitation" },
      { de: "leider", tr: "maalesef", en: "unfortunately" },
      { de: "die Zeit haben", tr: "vakti olmak", en: "to have time" },
      { de: "vorschlagen", tr: "önermek", en: "to suggest" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Yarın sinemaya gidiyoruz.",
        answer: "Wir gehen morgen ins Kino.",
        alternatives: ["Morgen gehen wir ins Kino."],
        hint: "Zaman zarfı başa gelirse fiil yine ikinci pozisyonda kalır, özne fiilden sonra gelir.",
      },
      {
        kind: "build",
        tr: "Saat kaçta buluşuyoruz?",
        answer: "Um wie viel Uhr treffen wir uns?",
        hint: "Soru ifadesi başta, fiil hemen ardından gelir; „sich treffen“ dönüşlü fiil.",
      },
      {
        kind: "build",
        tr: "Maalesef bugün gelemiyorum.",
        answer: "Leider kann ich heute nicht kommen.",
        alternatives: [
          "Ich kann heute leider nicht kommen.",
          "Ich kann leider heute nicht kommen.",
          "Heute kann ich leider nicht kommen.",
        ],
        hint: "kann ikinci pozisyonda, kommen mastarı cümlenin sonunda.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın Jonas seni partisine davet etti ama cumartesi gelemiyorsun. Ona kısa bir mesaj yaz: teşekkür et, neden gelemediğini söyle, başka bir gün öner.",
        stimulus:
          "Hallo! Kommst du am Samstag zu meiner Party? Sie beginnt um 18 Uhr. Liebe Grüße, Jonas",
        checklist: [
          "Selamlama ve davet için teşekkür var mı?",
          "Gelemediğini ve nedenini yazdın mı?",
          "Yeni bir gün veya plan önerdin mi?",
          "Veda ile bitirdin mi? (Viele Grüße …)",
        ],
        minWords: 20,
        phrases: [
          { de: "Danke für deine Einladung!", tr: "Davetin için teşekkürler!", en: "Thanks for your invitation!" },
          { de: "Ich kann leider nicht kommen.", tr: "Maalesef gelemiyorum.", en: "Unfortunately I can't come." },
          { de: "Ich muss arbeiten.", tr: "Çalışmam gerekiyor.", en: "I have to work." },
          { de: "Hast du am Sonntag Zeit?", tr: "Pazar günü vaktin var mı?", en: "Do you have time on Sunday?" },
          { de: "Viele Grüße", tr: "Selamlar", en: "Best regards" },
        ],
        sample:
          "Hallo Jonas, danke für deine Einladung! Aber ich kann am Samstag leider nicht kommen. Ich muss am Abend arbeiten. Hast du am Sonntag Zeit? Wir können zusammen Kaffee trinken. Viele Grüße, Selin",
      },
    ],
  },
  {
    id: "a1-w3",
    level: "A1",
    skill: "writing",
    title: "Essen und Einkaufen",
    genre: "Günlük yaşam",
    intro: "Alışveriş ve yemek cümleleri kuracak, sonra bir arkadaşını akşam yemeğine davet edeceksin.",
    gloss: [
      { de: "kaufen", tr: "satın almak", en: "to buy" },
      { de: "das Frühstück", tr: "kahvaltı", en: "breakfast" },
      { de: "kochen", tr: "yemek pişirmek", en: "to cook" },
      { de: "der Nachtisch", tr: "tatlı", en: "dessert" },
      { de: "mitbringen", tr: "getirmek", en: "to bring along" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bir kilo domates almak istiyorum.",
        answer: "Ich möchte ein Kilo Tomaten kaufen.",
        hint: "möchte ikinci pozisyonda, kaufen mastarı cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Kahvaltıda ekmek ve peynir yiyorum.",
        answer: "Zum Frühstück esse ich Brot und Käse.",
        alternatives: ["Ich esse zum Frühstück Brot und Käse."],
        hint: "„Zum Frühstück“ başa gelince fiil ikinci pozisyonda kalır, özne sonra gelir.",
      },
      {
        kind: "build",
        tr: "Çay mı yoksa kahve mi içiyorsun?",
        answer: "Trinkst du Tee oder Kaffee?",
        hint: "Soru kelimesi olmayan sorularda fiil cümlenin başına gelir.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın Mia'yı evinde akşam yemeğine davet eden kısa bir e-posta yaz. Şu üç noktaya değin: yemek ne zaman, ne pişiriyorsun, Mia ne getirsin.",
        checklist: [
          "Selamlama ile başladın mı? (Liebe Mia / Hallo Mia)",
          "Gün ve saat verdin mi?",
          "Ne pişireceğini ve Mia'nın ne getireceğini yazdın mı?",
          "Veda ile bitirdin mi?",
        ],
        minWords: 20,
        phrases: [
          { de: "Ich lade dich zum Abendessen ein.", tr: "Seni akşam yemeğine davet ediyorum.", en: "I'm inviting you to dinner." },
          { de: "Ich koche …", tr: "… pişiriyorum", en: "I'm cooking …" },
          { de: "Hast du Zeit?", tr: "Vaktin var mı?", en: "Do you have time?" },
          { de: "Bring bitte … mit.", tr: "Lütfen … getir.", en: "Please bring … along." },
          { de: "Bis Freitag!", tr: "Cumaya görüşürüz!", en: "See you on Friday!" },
        ],
        sample:
          "Liebe Mia, ich lade dich zum Abendessen ein. Hast du am Freitag um 19 Uhr Zeit? Ich koche Nudeln mit Tomatensoße und einen Salat. Bring bitte einen Nachtisch mit. Ich freue mich! Bis Freitag! Deine Aylin",
      },
    ],
  },
  {
    id: "a1-w4",
    level: "A1",
    skill: "writing",
    title: "Meine Wohnung, mein Alltag",
    genre: "Günlük yaşam",
    intro: "Ev ve günlük rutin cümleleri kuracak, sonra yeni evini bir arkadaşına anlatacaksın.",
    gloss: [
      { de: "die Wohnung", tr: "daire", en: "apartment" },
      { de: "das Schlafzimmer", tr: "yatak odası", en: "bedroom" },
      { de: "hell", tr: "aydınlık", en: "bright" },
      { de: "die Arbeit", tr: "iş", en: "work" },
      { de: "fernsehen", tr: "televizyon izlemek", en: "to watch TV" },
      { de: "besuchen", tr: "ziyaret etmek", en: "to visit" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Dairem küçük ama çok güzel.",
        answer: "Meine Wohnung ist klein, aber sehr schön.",
        hint: "„aber“ bağlacından önce virgül gelir ve kelime sırasını değiştirmez.",
      },
      {
        kind: "build",
        tr: "İşe otobüsle gidiyorum.",
        answer: "Ich fahre mit dem Bus zur Arbeit.",
        alternatives: [
          "Zur Arbeit fahre ich mit dem Bus.",
          "Mit dem Bus fahre ich zur Arbeit.",
        ],
        hint: "Ulaşım aracı „mit + Dativ“ ile söylenir: mit dem Bus.",
      },
      {
        kind: "build",
        tr: "Akşamları televizyon izliyorum.",
        answer: "Am Abend sehe ich fern.",
        alternatives: ["Ich sehe am Abend fern."],
        hint: "fernsehen ayrılabilen fiildir: „fern“ parçası cümlenin sonuna gider.",
      },
      {
        kind: "free",
        prompt:
          "Yeni bir daireye taşındın. Arkadaşın Tom'a kısa bir e-posta yaz: dairen kaç odalı ve nasıl, hangi şehirde veya semtte, Tom seni ne zaman ziyaret edebilir.",
        checklist: [
          "Selamlama ile başladın mı?",
          "Daireyi tanıttın mı: oda sayısı ve bir özellik (büyük, aydınlık, balkonlu…)?",
          "Nerede oturduğunu yazdın mı?",
          "Tom'u ziyarete davet ettin mi ve veda ile bitirdin mi?",
        ],
        minWords: 20,
        phrases: [
          { de: "Ich habe eine neue Wohnung.", tr: "Yeni bir dairem var.", en: "I have a new apartment." },
          { de: "Die Wohnung hat zwei Zimmer.", tr: "Dairenin iki odası var.", en: "The apartment has two rooms." },
          { de: "Sie liegt im Zentrum.", tr: "Merkezde bulunuyor.", en: "It is in the city center." },
          { de: "Willst du mich besuchen?", tr: "Beni ziyaret etmek ister misin?", en: "Do you want to visit me?" },
          { de: "Du kannst am Wochenende kommen.", tr: "Hafta sonu gelebilirsin.", en: "You can come on the weekend." },
        ],
        sample:
          "Hallo Tom, ich habe eine neue Wohnung in München! Sie hat zwei Zimmer, eine Küche und einen kleinen Balkon. Die Wohnung ist hell und liegt im Zentrum. Willst du mich besuchen? Du kannst am Samstag kommen. Viele Grüße, Deniz",
      },
    ],
  },
  {
    id: "a1-w5",
    level: "A1",
    skill: "writing",
    title: "Eine Entschuldigung für die Schule",
    genre: "Resmî yazı",
    intro:
      "Almanya'da çocuğu okula gitmeyen her veli bunu yazar: kısa, resmî bir mazeret notu.",
    gloss: [
      { de: "die Entschuldigung", tr: "mazeret yazısı", en: "excuse note" },
      { de: "krank", tr: "hasta", en: "sick" },
      { de: "das Fieber", tr: "ateş", en: "fever" },
      { de: "der Unterricht", tr: "ders", en: "class" },
      { de: "fehlen", tr: "devamsızlık yapmak", en: "to be absent" },
      { de: "die Unterschrift", tr: "imza", en: "signature" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Oğlum Karim bugün hasta.",
        answer: "Mein Sohn Karim ist heute krank.",
        hint: "Fiil ikinci pozisyonda: Mein Sohn Karim ist …",
      },
      {
        kind: "build",
        tr: "Ateşi var ve okula gelemiyor.",
        answer: "Er hat Fieber und kann nicht in die Schule kommen.",
        hint: "„Fieber haben“ artikelsiz; kann + nicht + kommen sırası.",
      },
      {
        kind: "build",
        tr: "Lütfen bugünkü devamsızlığını mazur görün.",
        answer: "Bitte entschuldigen Sie sein Fehlen heute.",
        alternatives: ["Bitte entschuldigen Sie, dass er heute fehlt."],
        hint: "Resmî yazıda „Bitte entschuldigen Sie …“ standart kalıptır.",
      },
      {
        kind: "free",
        prompt:
          "Sınıf öğretmenine kısa bir mazeret yazısı yaz. Dört noktaya değin: hitap, çocuğun adı ve sınıfı, neden gelmediği ve hangi gün(ler), kapanış ve imza.",
        checklist: [
          "Resmî hitapla başladın mı? (Sehr geehrte Frau …)",
          "Çocuğun adını ve sınıfını yazdın mı?",
          "Nedeni ve tarihi yazdın mı?",
          "„Sie“ ile yazdın mı (du değil)?",
          "İsim ve tarihle bitirdin mi?",
        ],
        minWords: 25,
        phrases: [
          { de: "Sehr geehrte Frau …,", tr: "Sayın … Hanım,", en: "Dear Ms …," },
          { de: "mein Sohn / meine Tochter …", tr: "oğlum / kızım …", en: "my son / my daughter …" },
          { de: "ist seit … krank", tr: "…'den beri hasta", en: "has been sick since …" },
          { de: "Bitte entschuldigen Sie …", tr: "Lütfen … mazur görün.", en: "Please excuse …" },
          { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Yours sincerely" },
        ],
        sample:
          "Sehr geehrte Frau Berger,\n\nmein Sohn Karim Haddad aus der Klasse 3b ist seit gestern krank. Er hat Fieber und kann heute und morgen nicht in die Schule kommen. Bitte entschuldigen Sie sein Fehlen.\n\nAm Donnerstag ist er hoffentlich wieder da.\n\nMit freundlichen Grüßen\nAmir Haddad\n14. Mai",
      },
    ],
  },
  {
    id: "a1-w6",
    level: "A1",
    skill: "writing",
    title: "Formular und kurze Nachricht",
    genre: "Sınav formatı",
    intro:
      "A1 yazma bölümünün iki görevi: kısa bilgi alanlarını doldurmak ve üç noktaya değinen kısa bir mesaj yazmak. İkisini de burada çalışacaksın.",
    gloss: [
      { de: "das Formular", tr: "form", en: "form" },
      { de: "der Familienname", tr: "soyadı", en: "last name" },
      { de: "der Vorname", tr: "ad", en: "first name" },
      { de: "die Staatsangehörigkeit", tr: "vatandaşlık", en: "citizenship" },
      { de: "der Kurs", tr: "kurs", en: "course" },
      { de: "anmelden", tr: "kaydolmak", en: "to register" },
      { de: "die Uhrzeit", tr: "saat", en: "time of day" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bir Almanca kursuna kaydolmak istiyorum.",
        answer: "Ich möchte mich für einen Deutschkurs anmelden.",
        hint: "„sich anmelden für“ — dönüşlü fiil, „mich“ ikinci sırada gelir.",
      },
      {
        kind: "build",
        tr: "Akşamları saat altıdan sonra vaktim var.",
        answer: "Ich habe abends nach 18 Uhr Zeit.",
        alternatives: ["Abends nach 18 Uhr habe ich Zeit."],
        hint: "„abends“ zaman zarfı; fiil yine ikinci pozisyonda.",
      },
      {
        kind: "build",
        tr: "Lütfen bana fiyatı yazın.",
        answer: "Bitte schreiben Sie mir den Preis.",
        hint: "Emir kipi „Sie“ ile: fiil başta, „Sie“ hemen arkasında.",
      },
      {
        kind: "free",
        prompt:
          "Bir dil okuluna kısa bir e-posta yaz. Üç noktaya değin (sınav görevi tam olarak böyle sorar): hangi kursa kaydolmak istediğin, hangi gün ve saatlerde vaktin olduğu, öğrenmek istediğin bir bilgi (fiyat, süre veya başlangıç tarihi).",
        checklist: [
          "Selamlama ve kapanış var mı?",
          "Üç noktanın hepsine değindin mi?",
          "Bir soru sordun mu?",
          "Fiiller ikinci pozisyonda mı?",
          "Adını yazdın mı?",
        ],
        minWords: 30,
        phrases: [
          { de: "Guten Tag,", tr: "İyi günler,", en: "Good day," },
          { de: "Ich möchte mich für … anmelden.", tr: "… için kaydolmak istiyorum.", en: "I would like to register for …" },
          { de: "Ich habe am … Zeit.", tr: "… günü vaktim var.", en: "I have time on …" },
          { de: "Wie viel kostet der Kurs?", tr: "Kurs ne kadar?", en: "How much does the course cost?" },
          { de: "Wann beginnt der Kurs?", tr: "Kurs ne zaman başlıyor?", en: "When does the course start?" },
          { de: "Vielen Dank und viele Grüße", tr: "Teşekkürler ve selamlar", en: "Many thanks and best regards" },
        ],
        sample:
          "Guten Tag,\n\nich möchte mich für einen Deutschkurs A2 anmelden. Ich arbeite bis 17 Uhr, deshalb habe ich nur abends nach 18 Uhr Zeit — am besten am Montag und Mittwoch.\n\nWie viel kostet der Kurs und wann beginnt er? Bitte schreiben Sie mir auch, wie lange er dauert.\n\nVielen Dank und viele Grüße\nAmir Haddad",
      },
    ],
  },
  {
    id: "a1-w7",
    level: "A1",
    skill: "writing",
    title: "Eine Postkarte",
    genre: "Kültür",
    intro:
      "Almanya'da hâlâ yaşayan bir gelenek: tatilden kartpostal yollamak. Kısa, sıcak ve birkaç cümlelik.",
    gloss: [
      { de: "die Postkarte", tr: "kartpostal", en: "postcard" },
      { de: "der Urlaub", tr: "tatil", en: "vacation" },
      { de: "das Wetter", tr: "hava", en: "weather" },
      { de: "die Ostsee", tr: "Baltık Denizi", en: "Baltic Sea" },
      { de: "wandern", tr: "yürüyüş yapmak", en: "to hike" },
      { de: "die Grüße", tr: "selamlar", en: "greetings" },
      { de: "schicken", tr: "göndermek", en: "to send" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir haftadır Baltık Denizi'ndeyiz.",
        answer: "Wir sind seit einer Woche an der Ostsee.",
        hint: "„seit“ + Dativ: seit einer Woche. „an der Ostsee“ = deniz kenarında.",
      },
      {
        kind: "build",
        tr: "Hava harika ve her gün yüzüyoruz.",
        answer: "Das Wetter ist super und wir schwimmen jeden Tag.",
        hint: "„jeden Tag“ Akkusativ kalıbıdır.",
      },
      {
        kind: "build",
        tr: "Cumartesi günü eve dönüyoruz.",
        answer: "Am Samstag fahren wir nach Hause.",
        hint: "„nach Hause“ = eve doğru; „zu Hause“ = evde.",
      },
      {
        kind: "free",
        prompt:
          "Tatilden bir arkadaşına kartpostal yaz. Dört noktaya değin: nerede olduğun ve ne zamandır, hava, en çok ne yaptığın, ne zaman döneceğin. Kartpostal kısa olur — uzun tutma.",
        checklist: [
          "Selamlama ile başladın mı? (Liebe/Lieber …)",
          "Nerede olduğunu ve ne zamandır orada olduğunu yazdın mı?",
          "Havadan söz ettin mi?",
          "Ne yaptığını yazdın mı?",
          "Dönüş gününü yazdın mı ve selamla bitirdin mi?",
        ],
        minWords: 25,
        phrases: [
          { de: "Liebe Grüße aus …", tr: "…'den sevgiler", en: "Greetings from …" },
          { de: "Wir sind seit … hier.", tr: "…'den beri buradayız.", en: "We have been here since …" },
          { de: "Das Wetter ist …", tr: "Hava …", en: "The weather is …" },
          { de: "Wir gehen jeden Tag …", tr: "Her gün … gidiyoruz.", en: "We go … every day." },
          { de: "Am … kommen wir zurück.", tr: "… günü dönüyoruz.", en: "We come back on …" },
          { de: "Bis bald!", tr: "Yakında görüşürüz!", en: "See you soon!" },
        ],
        sample:
          "Liebe Sofia,\n\nliebe Grüße aus Rügen! Wir sind seit einer Woche an der Ostsee. Das Wetter ist super — nur am Montag hat es geregnet. Wir schwimmen jeden Tag und gestern sind wir vier Stunden gewandert.\n\nAm Samstag fahren wir nach Hause. Dann erzähle ich alles.\n\nBis bald!\nAmir",
      },
    ],
  },
  {
    id: "a1-w8",
    level: "A1",
    skill: "writing",
    title: "Antwort an Frau Wagner",
    genre: "Mesaj",
    intro:
      "Hikâyenin son bölümü: Frau Wagner'in notuna (a1-r11) cevap yazacaksın. Teşekkür, kabul ve bir soru.",
    gloss: [
      { de: "sich bedanken", tr: "teşekkür etmek", en: "to thank" },
      { de: "annehmen", tr: "kabul etmek", en: "to accept" },
      { de: "gern", tr: "memnuniyetle", en: "gladly" },
      { de: "passen", tr: "uymak", en: "to suit" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "wirklich", tr: "gerçekten", en: "really" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Paket için çok teşekkür ederim.",
        answer: "Vielen Dank für das Paket.",
        hint: "„danken für“ + Akkusativ: für das Paket.",
      },
      {
        kind: "build",
        tr: "Masayı memnuniyetle alırım.",
        answer: "Den Tisch nehme ich gern.",
        alternatives: ["Ich nehme den Tisch gern."],
        hint: "Nesneyi öne alırsan fiil yine ikinci sırada kalır: Den Tisch nehme ich …",
      },
      {
        kind: "build",
        tr: "Bu akşam saat altıda size uygun mu?",
        answer: "Passt es Ihnen heute Abend um 18 Uhr?",
        hint: "„Passt es Ihnen …?“ — kibar soru kalıbı, Ihnen Dativ.",
      },
      {
        kind: "free",
        prompt:
          "Frau Wagner'e kısa bir not yaz. Dört noktaya değin: paket için teşekkür, masa teklifine cevap, ne zaman uğrayacağın, kendinden küçük bir şey (çay içer misin sorusuna cevap gibi). Komşuna yazıyorsun — kibar ama sıcak.",
        checklist: [
          "Hitapla başladın mı? (Liebe Frau Wagner)",
          "Teşekkür ettin mi?",
          "Masa teklifine net cevap verdin mi?",
          "Bir saat/gün önerdin mi?",
          "„Sie“ ile yazdın mı ve imzaladın mı?",
        ],
        minWords: 30,
        phrases: [
          { de: "Vielen Dank für …", tr: "… için çok teşekkürler.", en: "Many thanks for …" },
          { de: "Das ist sehr nett von Ihnen.", tr: "Bu çok nazik bir davranış.", en: "That is very kind of you." },
          { de: "Den Tisch nehme ich gern.", tr: "Masayı memnuniyetle alırım.", en: "I'll gladly take the table." },
          { de: "Ich komme heute um … vorbei.", tr: "Bugün saat …'de uğrarım.", en: "I'll come by today at …" },
          { de: "Bis später!", tr: "Sonra görüşürüz!", en: "See you later!" },
        ],
        sample:
          "Liebe Frau Wagner,\n\nvielen Dank für das Paket! Das ist sehr nett von Ihnen.\n\nDen Tisch nehme ich gern — ich habe wirklich noch keinen. Passt es Ihnen heute Abend um 18 Uhr? Dann hole ich beides ab.\n\nUnd ja, ich trinke sehr gern Tee. In Syrien trinken wir ihn süß und stark.\n\nBis später!\nAmir (Wohnung 7)",
      },
    ],
  },
];

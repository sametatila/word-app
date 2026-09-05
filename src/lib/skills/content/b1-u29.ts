import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 29 — "Para, sipariş, malzeme" (dersler 113–116).
 *
 * Dersler: Das Bankkonto · Online bestellen · Kleidung kaufen ·
 * Das Material wählen.
 *
 * Bu ünitenin sözlükçesi bileşik isimlerle dolu (Girokonto, Geldautomat,
 * Bankleitzahl, Bedienungsanleitung, Mehrwertsteuer, Kunststoff) ve iki
 * aktarım hatası tam buradan çıkıyor:
 *   aus + malzeme   Türkçede malzeme ismin önüne yalın konur ('deri
 *                   çanta'), o yüzden Almancada da iki isim yan yana
 *                   yazılıyor. Almanca ya BİLEŞİK yapar (die Ledertasche)
 *                   ya da aus + Dativ ile söyler (eine Tasche aus Leder).
 *                   İki ayrı sözcük olarak yan yana durmaz.
 *   bileşik yazımı  Türkçede tamlama iki ayrı sözcüktür ('kullanma
 *                   kılavuzu'), Almancada TEK sözcük olur
 *                   (Bedienungsanleitung). Ayrı yazmak yalnız yazım
 *                   hatası değil — anlamı da dağıtır.
 *
 * Yeni 32 kelime: das Girokonto, das Bargeld, der Geldautomat,
 * die Einzahlung, die Zinsen, abheben, die Bankleitzahl, die EC-Karte,
 * die Lieferung, die Bedienungsanleitung, das Modell, die Mahnung,
 * der Schein, die Münze, die Mehrwertsteuer, die Chipkarte, das Kostüm,
 * der Strumpf, die Socke, der Schmuck, das Leder, die Wolle, der Stoff,
 * elegant, der Kunststoff, das Plastik, das Metall, das Holz, das Teil,
 * der Kasten, die Batterie, der Stecker.
 */
export const b1U29: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u29-r1",
    level: "B1",
    skill: "reading",
    unit: 29,
    title: "Das erste Girokonto",
    genre: "Banka bilgilendirmesi",
    intro: "Bir hesap açılıyor. Ne gerekiyor, ne ücretli?",
    minutes: 5,
    gloss: [
      { de: "das Girokonto", tr: "vadesiz hesap", en: "current account" },
      { de: "der Geldautomat", tr: "bankamatik", en: "cash machine" },
      { de: "abheben", tr: "para çekmek", en: "to withdraw" },
      { de: "das Bargeld", tr: "nakit", en: "cash" },
      { de: "die Einzahlung", tr: "para yatırma", en: "deposit" },
    ],
    text:
      "Für ein Girokonto brauchen Sie einen Ausweis und eine Meldebestätigung. " +
      "Mehr nicht. Das Konto selbst kostet bei uns nichts, solange jeden Monat " +
      "Geld eingeht.\n\n" +
      "Zur EC-Karte bekommen Sie eine Nummer, die Sie niemandem geben. " +
      "Am Geldautomaten unserer Bank ist das Abheben frei; bei anderen " +
      "Anbietern kostet es bis zu fünf Euro pro Mal.\n\n" +
      "Eine Einzahlung mit Bargeld geht am Schalter und am Automaten. Scheine " +
      "nimmt der Automat, Münzen meistens nicht — dafür müssen Sie " +
      "zum Schalter.\n\n" +
      "Zinsen gibt es auf diesem Konto keine. Wer sparen will, braucht ein " +
      "zweites Konto. Und noch ein Hinweis: Wenn eine Mahnung kommt, rufen " +
      "Sie sofort an. Das ist fast immer schneller gelöst, als man denkt.",
    questions: [
      {
        text: "Was braucht man für ein Girokonto?",
        options: ["Ausweis und Meldebestätigung", "Nur einen Ausweis", "Einen Vertrag"],
        answer: 0,
        explain: "„Für ein Girokonto brauchen Sie einen Ausweis und eine Meldebestätigung.“",
      },
      {
        text: "Wo ist das Abheben frei?",
        options: ["Überall", "Am Geldautomaten der eigenen Bank", "Nur am Schalter"],
        answer: 1,
        explain: "„Am Geldautomaten unserer Bank ist das Abheben frei …“",
      },
      {
        text: "Was nimmt der Automat NICHT?",
        options: ["Scheine", "Münzen", "Karten"],
        answer: 1,
        explain: "„Scheine nimmt der Automat, Münzen meistens nicht …“",
      },
      {
        kind: "gapfill",
        text: "Zur ___ bekommen Sie eine Nummer, die Sie niemandem geben.",
        options: [],
        answer: 0,
        accept: ["EC-Karte"],
        explain: "Bileşik tek sözcüktür (tireli de olsa): EC-Karte, „EC Karte“ değil.",
      },
      {
        kind: "short_answer",
        text: "Wie viel kostet das Abheben bei anderen Anbietern?",
        options: [],
        answer: 0,
        accept: ["bis zu fünf Euro", "fünf Euro", "5 Euro"],
        explain: "„… bei anderen Anbietern kostet es bis zu fünf Euro pro Mal.“",
      },
    ],
  },
  {
    id: "b1-u29-r2",
    level: "B1",
    skill: "reading",
    unit: 29,
    title: "Online bestellen — worauf achten?",
    genre: "Tüketici rehberi",
    intro: "İnternetten sipariş. Nelere dikkat edilmeli?",
    minutes: 5,
    gloss: [
      { de: "die Lieferung", tr: "teslimat", en: "delivery" },
      { de: "die Bedienungsanleitung", tr: "kullanma kılavuzu", en: "instruction manual" },
      { de: "die Mehrwertsteuer", tr: "KDV", en: "VAT" },
      { de: "die Mahnung", tr: "ihtar", en: "reminder" },
      { de: "das Modell", tr: "model", en: "model" },
    ],
    text:
      "Der Preis auf der ersten Seite ist fast nie der Endpreis. Prüfen Sie, " +
      "ob die Mehrwertsteuer schon drin ist und was die Lieferung kostet. " +
      "Bei schweren Sachen sind das schnell zwanzig Euro.\n\n" +
      "Schauen Sie auch, welches Modell Sie wirklich bestellen. Zwei Geräte " +
      "mit fast gleichem Namen können ganz anders sein. " +
      "Eine Bedienungsanleitung auf Deutsch ist nicht selbstverständlich — " +
      "das steht meistens ganz unten.\n\n" +
      "Bezahlen Sie möglichst erst bei Lieferung. Wer vorher überweist und " +
      "nichts bekommt, hat ein Problem, das lange dauert.\n\n" +
      "Und wenn doch eine Mahnung für etwas kommt, das Sie nie bestellt " +
      "haben: nicht zahlen, sondern schriftlich widersprechen. Eine Mahnung " +
      "ist kein Beweis, sondern nur ein Brief.",
    questions: [
      {
        text: "Was soll man beim Preis prüfen?",
        options: ["Ob Mehrwertsteuer und Lieferung drin sind", "Ob es Rabatt gibt", "Ob es das Modell noch gibt"],
        answer: 0,
        explain: "„Prüfen Sie, ob die Mehrwertsteuer schon drin ist und was die Lieferung kostet.“",
      },
      {
        text: "Was ist bei Geräten mit ähnlichem Namen wichtig?",
        options: ["Der Preis", "Welches Modell es genau ist", "Die Farbe"],
        answer: 1,
        explain: "„Schauen Sie auch, welches Modell Sie wirklich bestellen.“",
      },
      {
        text: "Was soll man bei einer falschen Mahnung tun?",
        options: ["Zahlen", "Schriftlich widersprechen", "Warten"],
        answer: 1,
        explain: "„… nicht zahlen, sondern schriftlich widersprechen.“",
      },
      {
        kind: "gapfill",
        text: "Eine ___ auf Deutsch ist nicht selbstverständlich.",
        options: [],
        answer: 0,
        accept: ["Bedienungsanleitung"],
        explain: "Türkçedeki iki sözcüklü tamlama Almancada TEK sözcük olur.",
      },
      {
        kind: "short_answer",
        text: "Wann soll man möglichst bezahlen?",
        options: [],
        answer: 0,
        accept: ["bei Lieferung", "erst bei Lieferung"],
        explain: "„Bezahlen Sie möglichst erst bei Lieferung.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u29-l1",
    level: "B1",
    skill: "listening",
    unit: 29,
    title: "Im Kleidungsgeschäft",
    genre: "Mağaza konuşması",
    intro: "Bir kıyafet aranıyor. Beden, renk, malzeme?",
    minutes: 4,
    gloss: [
      { de: "das Kostüm", tr: "takım (kadın)", en: "suit" },
      { de: "elegant", tr: "şık", en: "elegant" },
      { de: "die Wolle", tr: "yün", en: "wool" },
      { de: "der Stoff", tr: "kumaş", en: "fabric" },
    ],
    segments: [
      { text: "Ich suche ein Kostüm für eine Feier. Nicht zu elegant." },
      { text: "Gern. Welche Größe haben Sie?" },
      { text: "Achtunddreißig. Und bitte nichts aus Kunststoff." },
      { text: "Verstehe. Dieses hier ist aus Wolle, das trägt sich angenehm." },
      { text: "Der Stoff gefällt mir. Gibt es das auch in Blau?" },
      { text: "In Blau leider nur eine Nummer größer." },
      { text: "Dann probiere ich das graue. Und dazu vielleicht Strümpfe?" },
      { text: "Die liegen im Kasten am Eingang, gleich neben den Socken." },
    ],
    questions: [
      {
        text: "Wofür sucht die Kundin ein Kostüm?",
        options: ["Für die Arbeit", "Für eine Feier", "Für eine Reise"],
        answer: 1,
        explain: "„Ich suche ein Kostüm für eine Feier.“",
      },
      {
        text: "Woraus ist das erste Kostüm?",
        options: ["Aus Wolle", "Aus Kunststoff", "Aus Leder"],
        answer: 0,
        explain: "„Dieses hier ist aus Wolle, das trägt sich angenehm.“",
      },
      {
        text: "Warum nimmt sie nicht das blaue?",
        options: ["Es gefällt ihr nicht", "Es gibt es nur eine Nummer größer", "Es ist zu teuer"],
        answer: 1,
        explain: "„In Blau leider nur eine Nummer größer.“",
      },
      {
        kind: "gapfill",
        text: "Dieses hier ist ___ Wolle.",
        options: [],
        answer: 0,
        accept: ["aus"],
        explain: "Malzeme „aus“ + Dativ ile söylenir: aus Wolle, aus Leder.",
      },
      {
        kind: "short_answer",
        text: "Wo liegen die Strümpfe?",
        options: [],
        answer: 0,
        accept: ["im Kasten am Eingang", "im Kasten", "am Eingang"],
        explain: "„Die liegen im Kasten am Eingang, gleich neben den Socken.“",
      },
    ],
  },
  {
    id: "b1-u29-l2",
    level: "B1",
    skill: "listening",
    unit: 29,
    title: "Aus welchem Material?",
    genre: "Alışveriş danışması",
    intro: "Bir alet için malzeme seçiliyor. Hangisi ne için iyi?",
    minutes: 4,
    gloss: [
      { de: "das Metall", tr: "metal", en: "metal" },
      { de: "das Plastik", tr: "plastik", en: "plastic" },
      { de: "das Holz", tr: "ahşap", en: "wood" },
      { de: "der Stecker", tr: "fiş", en: "plug" },
    ],
    segments: [
      { text: "Diese Schüssel gibt es aus Holz, aus Metall und aus Plastik." },
      { text: "Was halten Sie für das Beste?" },
      { text: "Kommt darauf an. Metall hält am längsten, ist aber schwer." },
      { text: "Und Holz?" },
      { text: "Sieht am schönsten aus, darf aber nicht in die Maschine." },
      { text: "Dann lieber Metall. Bei Plastik habe ich kein gutes Gefühl." },
      { text: "Verstehe ich. Brauchen Sie sonst noch etwas?" },
      { text: "Ja, eine Batterie und einen Stecker für das kleine Teil hier." },
    ],
    questions: [
      {
        text: "Aus welchen drei Materialien gibt es die Schüssel?",
        options: ["Holz, Metall, Plastik", "Holz, Leder, Wolle", "Metall, Stoff, Plastik"],
        answer: 0,
        explain: "„Diese Schüssel gibt es aus Holz, aus Metall und aus Plastik.“",
      },
      {
        text: "Was ist der Nachteil von Metall?",
        options: ["Es ist schwer", "Es hält nicht lange", "Es sieht schlecht aus"],
        answer: 0,
        explain: "„Metall hält am längsten, ist aber schwer.“",
      },
      {
        text: "Was darf man mit Holz nicht machen?",
        options: ["In die Maschine geben", "Waschen", "Draußen benutzen"],
        answer: 0,
        explain: "„Sieht am schönsten aus, darf aber nicht in die Maschine.“",
      },
      {
        kind: "gapfill",
        text: "Diese Schüssel gibt es ___ Holz, ___ Metall und ___ Plastik.",
        options: [],
        answer: 0,
        accept: ["aus aus aus", "aus"],
        explain: "Her malzeme kendi „aus“unu alır.",
      },
      {
        kind: "short_answer",
        text: "Was braucht die Kundin noch?",
        options: [],
        answer: 0,
        accept: ["eine Batterie und einen Stecker", "Batterie und Stecker"],
        explain: "„Ja, eine Batterie und einen Stecker für das kleine Teil hier.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u29-w1",
    level: "B1",
    skill: "writing",
    unit: 29,
    title: "Was ich suche",
    genre: "Ürün sorusu",
    intro: "Aradığın ürünü tarif et. Malzeme iki isim yan yana yazılmaz.",
    minutes: 8,
    gloss: [
      { de: "das Leder", tr: "deri", en: "leather" },
      { de: "der Kunststoff", tr: "plastik malzeme", en: "synthetic material" },
      { de: "der Schmuck", tr: "takı", en: "jewellery" },
      { de: "das Teil", tr: "parça", en: "part" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Deri bir çanta arıyorum.",
        answer: "Ich suche eine Tasche aus Leder.",
        alternatives: ["Ich suche eine Ledertasche."],
        hint: "Ya aus + Dativ ya tek sözcüklü bileşik.",
      },
      {
        kind: "build",
        tr: "Plastikten bir şey istemiyorum.",
        answer: "Ich möchte nichts aus Kunststoff.",
        hint: "nichts + aus + malzeme.",
      },
      {
        kind: "build",
        tr: "Bu takı metalden mi ahşaptan mı?",
        answer: "Ist dieser Schmuck aus Metall oder aus Holz?",
        hint: "Her malzeme kendi „aus“unu alır.",
      },
      {
        kind: "form",
        prompt: "Ürün arama kartını doldur.",
        facts: "Aranan: takım elbise; kullanım: bir kutlama; beden: 38; malzeme isteği: yün, plastik değil; renk: gri.",
        fields: [
          { label: "Gesucht", answer: "Kostüm", accept: ["ein Kostüm", "das Kostüm"] },
          { label: "Anlass", answer: "eine Feier", accept: ["Feier", "für eine Feier"] },
          { label: "Größe", answer: "38", accept: ["achtunddreißig"] },
          { label: "Material", answer: "aus Wolle", accept: ["Wolle", "kein Kunststoff"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Malzeme yapısını düzelt.",
        source: "Ich suche eine Leder Tasche und einen Metall Kasten.",
        answer: "Ich suche eine Tasche aus Leder und einen Kasten aus Metall.",
        alternatives: ["Ich suche eine Ledertasche und einen Metallkasten."],
        why: "Türkçede malzeme ismin önüne yalın konur ('deri çanta', 'metal kutu'), o yüzden Almancada da iki isim ayrı ayrı yan yana yazılıyor. Almanca ikisinden birini seçer: ya BİLEŞİK yapar (Ledertasche, Metallkasten) ya da aus + Dativ ile söyler (eine Tasche aus Leder). İki ayrı sözcük olarak yan yana durmaz.",
      },
    ],
  },
  {
    id: "b1-u29-w2",
    level: "B1",
    skill: "writing",
    unit: 29,
    title: "Anfrage an den Anbieter",
    genre: "Sipariş yazısı",
    intro: "Bir siparişle ilgili yaz. Almanca tamlamayı tek sözcük yapar.",
    minutes: 12,
    gloss: [
      { de: "die Lieferung", tr: "teslimat", en: "delivery" },
      { de: "die Bedienungsanleitung", tr: "kullanma kılavuzu", en: "instruction manual" },
      { de: "die Mahnung", tr: "ihtar", en: "reminder" },
      { de: "der Schein", tr: "banknot", en: "note" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Kullanma kılavuzu pakette yoktu.",
        answer: "Die Bedienungsanleitung war nicht im Paket.",
        hint: "Tamlama tek sözcük.",
      },
      {
        kind: "build",
        tr: "Teslimat masrafı ilk sayfada yazmıyordu.",
        answer: "Die Kosten für die Lieferung standen nicht auf der ersten Seite.",
        hint: "Burada iki ayrı isim var, „für“ ile bağlanıyor.",
      },
      {
        kind: "free",
        prompt: "Bir çevrimiçi siparişle ilgili yaz: ne sipariş ettin ve ne zaman, ne eksik ya da yanlış geldi, hangi belgeler elinde, ne istiyorsun, ve ne zamana kadar. Resmî hitap ve kapanış kullan.",
        checklist: [
          "Sipariş ve tarih verilmiş mi?",
          "Sorun somut mu?",
          "Elindeki belgeler sayılmış mı?",
          "İstenen şey net mi?",
          "Resmî hitap ve kapanış var mı?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "am 3. April habe ich bei Ihnen ein Gerät bestellt, Modell R-200. " +
          "Die Lieferung kam pünktlich, aber das Paket war nicht vollständig.\n\n" +
          "Es fehlen zwei Teile: die Bedienungsanleitung auf Deutsch und der " +
          "Stecker. Ohne Stecker kann ich das Gerät gar nicht benutzen. " +
          "Die Batterie war dabei, das stimmt.\n\n" +
          "Ich habe den Beleg und die Bestätigung per Mail. Bezahlt habe ich " +
          "bei Lieferung, in bar, und ich habe den Schein noch auf der " +
          "Quittung stehen.\n\n" +
          "Ich bitte Sie, die fehlenden Teile bis zum 20. April zu schicken. " +
          "Eine Mahnung habe ich bisher nicht bekommen und erwarte auch keine, " +
          "solange die Sache offen ist.\n\n" +
          "Mit freundlichen Grüßen\nSedef Aydın",
        phrases: [
          { de: "Die Lieferung kam pünktlich, aber …", tr: "Teslimat zamanında geldi ama …", en: "The delivery came on time, but …" },
          { de: "Es fehlen zwei Teile: …", tr: "İki parça eksik: …", en: "Two parts are missing: …" },
          { de: "Ich bitte Sie, … zu schicken.", tr: "… göndermenizi rica ederim.", en: "I ask you to send …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Bileşik isimleri birleştir.",
        source: "Die Bedienungs Anleitung und die EC Karte lagen im Geld Automat.",
        answer: "Die Bedienungsanleitung und die EC-Karte lagen im Geldautomaten.",
        why: "Türkçede tamlama İKİ ayrı sözcüktür ('kullanma kılavuzu', 'para makinesi'), o yüzden Almancada da ayrı yazılıyor. Almancada bileşik isim TEK sözcüktür ve ayırmak yalnız yazım hatası değil — okuyucu iki bağımsız isim görür ve anlam dağılır. Kısaltmalı bileşiklerde araya tire girer: EC-Karte, U-Bahn.",
      },
    ],
  },
];

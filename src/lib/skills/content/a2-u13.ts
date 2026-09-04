import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 13 — "Rapor, geri bildirim, karşılaştırma".
 *
 * Dört ders: Die Krankmeldung · Das Gespräch mit der Chefin ·
 * Größer, schneller, billiger · Am besten! İçerik ünite 1-13'ün
 * kelimeleriyle sınırlı.
 *
 *   Ünite 13: die Halsschmerzen, die Rückenschmerzen, die Migräne,
 *             der Durchfall, ansteckend, verschicken, der Anhang,
 *             der Betreff · bewerten, motivieren, die Beförderung,
 *             der Bonus, der Verdienst, deutlich, sorgfältig, respektvoll ·
 *             der Unterschied, vergleichen, die Qualität, preiswert, stark,
 *             schwach, als, gigantisch · beliebt, das Einkaufszentrum,
 *             das Kaufhaus, der Schlussverkauf, die Ermäßigung,
 *             der Sonderpreis, der Stammkunde, das Preisschild
 *   Kalıplar: Ich muss Ihnen sagen, dass ich krank bin. · Das Attest ist im
 *             Anhang. · Ich bin zufrieden, weil ich viel gelernt habe. ·
 *             Das ist besser als das. · Das ist am billigsten. ·
 *             Gibt es eine Ermäßigung?
 *
 * İş bloğu kapanıp karşılaştırma bloğu açılıyor. İki klasik hata ölçülüyor:
 * karşılaştırmada „wie“ değil „als“ kullanılması ve en üstünlükte
 * karşılaştırma kelimesinin HİÇ kullanılmaması ("am billigsten", "der
 * billigste als alle" değil).
 */
export const a2U13: SkillExercise[] = [
  {
    id: "a2-u13-r1",
    level: "A2",
    skill: "reading",
    unit: 13,
    title: "Krankmeldung per E-Mail",
    genre: "E-posta",
    intro: "İşe gönderilen hastalık bildirimi. Ne yazılmış, ne eklenmiş?",
    gloss: [
      { de: "der Betreff", tr: "konu başlığı", en: "subject line" },
      { de: "die Halsschmerzen", tr: "boğaz ağrısı", en: "sore throat" },
      { de: "die Migräne", tr: "migren", en: "migraine" },
      { de: "ansteckend", tr: "bulaşıcı", en: "contagious" },
      { de: "der Anhang", tr: "ek", en: "attachment" },
      { de: "verschicken", tr: "yollamak", en: "to send" },
      { de: "die Rückenschmerzen", tr: "sırt ağrısı", en: "back pain" },
    ],
    minutes: 4,
    text:
      "Betreff: Krankmeldung 14. bis 16. März\n\n" +
      "Sehr geehrte Frau Petrow,\n\n" +
      "ich muss Ihnen leider sagen, dass ich heute nicht kommen kann. Ich habe seit gestern starke Halsschmerzen und Fieber.\n\n" +
      "Ich war heute Morgen beim Arzt. Er hat gesagt, dass es ansteckend ist, und hat mich bis Freitag krankgeschrieben. Das Attest ist im Anhang; das Original verschicke ich heute noch per Post.\n\n" +
      "Meine Termine am Donnerstag habe ich abgesagt. Die Unterlagen für das Projekt liegen bei Frau Klein auf dem Schreibtisch.\n\n" +
      "Ich melde mich am Freitag wieder.\n\n" +
      "Mit freundlichen Grüßen\nSinan Aydın",
    questions: [
      {
        text: "Was hat Sinan?",
        options: ["Migräne", "Halsschmerzen und Fieber", "Rückenschmerzen"],
        answer: 1,
        explain: "„Ich habe seit gestern starke Halsschmerzen und Fieber.“",
      },
      {
        kind: "gapfill",
        text: "Er hat gesagt, dass es ___ ist.",
        options: [],
        answer: 0,
        accept: ["ansteckend"],
        explain: "Bu yüzden doktor onu cumaya kadar rapor vermiş.",
      },
      {
        text: "Wo ist das Attest?",
        options: ["Im Anhang", "Bei Frau Klein", "Noch beim Arzt"],
        answer: 0,
        explain: "„Das Attest ist im Anhang; das Original verschicke ich heute noch per Post.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann ist Sinan krankgeschrieben?",
        options: [],
        answer: 0,
        accept: ["bis Freitag", "Freitag"],
        explain: "„hat mich bis Freitag krankgeschrieben“ — cuma günü tekrar haber verecek.",
      },
      {
        text: "Sinan hat seine Termine noch nicht abgesagt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Meine Termine am Donnerstag habe ich abgesagt.“",
      },
    ],
  },
  {
    id: "a2-u13-r2",
    level: "A2",
    skill: "reading",
    unit: 13,
    title: "Zwei Kaufhäuser im Vergleich",
    genre: "Dergi yazısı",
    intro: "İki mağaza karşılaştırması. Hangisi ucuz, hangisi kaliteli?",
    gloss: [
      { de: "vergleichen", tr: "karşılaştırmak", en: "to compare" },
      { de: "der Unterschied", tr: "fark", en: "difference" },
      { de: "die Qualität", tr: "kalite", en: "quality" },
      { de: "preiswert", tr: "uygun fiyatlı", en: "good value" },
      { de: "das Kaufhaus", tr: "büyük mağaza", en: "department store" },
      { de: "das Einkaufszentrum", tr: "alışveriş merkezi", en: "shopping centre" },
      { de: "der Schlussverkauf", tr: "sezon sonu indirimi", en: "end-of-season sale" },
      { de: "beliebt", tr: "sevilen", en: "popular" },
    ],
    minutes: 4,
    text:
      "Wir haben zwei Kaufhäuser in der Stadt verglichen: Meiners in der Altstadt und Nordstern im neuen Einkaufszentrum.\n\n" +
      "Der größte Unterschied ist der Preis. Bei Nordstern sind Jacken und Hosen deutlich preiswerter als bei Meiners. Im Schlussverkauf ist Nordstern sogar am billigsten in der ganzen Stadt.\n\n" +
      "Bei der Qualität sieht es anders aus. Die Stoffe bei Meiners sind stärker, und nach zwei Jahren sieht die Jacke dort noch gut aus. Bei Nordstern wird der Stoff schneller schwach.\n\n" +
      "Beliebt sind beide. Meiners ist bei älteren Kunden beliebter, Nordstern bei jungen Familien — vor allem, weil das Parkhaus dort gigantisch ist und man immer einen Platz findet.",
    questions: [
      {
        text: "Wo sind die Preise niedriger?",
        options: ["Bei Meiners", "Bei Nordstern", "Überall gleich"],
        answer: 1,
        explain: "„Bei Nordstern sind Jacken und Hosen deutlich preiswerter als bei Meiners.“",
      },
      {
        kind: "gapfill",
        text: "Im Schlussverkauf ist Nordstern sogar ___ billigsten in der ganzen Stadt.",
        options: [],
        answer: 0,
        accept: ["am"],
        explain: "En üstünlük iki parçadan oluşur: kaynaşmış edat önde, hece sonda — am billigsten.",
      },
      {
        text: "Wo ist die Qualität besser?",
        options: ["Bei Meiners", "Bei Nordstern", "Der Text sagt es nicht."],
        answer: 0,
        explain: "„Die Stoffe bei Meiners sind stärker … Bei Nordstern wird der Stoff schneller schwach.“",
      },
      {
        kind: "short_answer",
        text: "Warum mögen junge Familien Nordstern?",
        options: [],
        answer: 0,
        accept: ["wegen des Parkhauses", "das Parkhaus ist gigantisch", "wegen dem Parkhaus"],
        explain: "„vor allem, weil das Parkhaus dort gigantisch ist und man immer einen Platz findet“.",
      },
      {
        text: "Nur eines der beiden Kaufhäuser ist beliebt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Beliebt sind beide“ — yalnız müşteri kitleleri farklı.",
      },
    ],
  },
  {
    id: "a2-u13-l1",
    level: "A2",
    skill: "listening",
    unit: 13,
    title: "Das Jahresgespräch",
    genre: "Diyalog",
    intro: "Yıllık değerlendirme görüşmesi. Geri bildirim ne, çalışan ne istiyor?",
    gloss: [
      { de: "bewerten", tr: "değerlendirmek", en: "to assess" },
      { de: "sorgfältig", tr: "özenli", en: "careful" },
      { de: "deutlich", tr: "net", en: "clear" },
      { de: "motivieren", tr: "motive etmek", en: "to motivate" },
      { de: "die Beförderung", tr: "terfi", en: "promotion" },
      { de: "der Bonus", tr: "prim", en: "bonus" },
      { de: "respektvoll", tr: "saygılı", en: "respectful" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Petrow", text: "Setzen Sie sich. Wie war dieses Jahr für Sie?" },
      { speaker: "Sinan", text: "Insgesamt gut. Ich bin zufrieden, weil ich viel gelernt habe." },
      { speaker: "Frau Petrow", text: "Das sehe ich auch so. Sie arbeiten sehr sorgfältig, und die Kunden sagen, dass Sie immer respektvoll sind." },
      { speaker: "Sinan", text: "Danke. Gibt es auch etwas, das ich besser machen soll?" },
      { speaker: "Frau Petrow", text: "Ja, ein Punkt: Ihre Berichte sind manchmal zu kurz. Schreiben Sie bitte deutlicher, was Sie gemacht haben." },
      { speaker: "Sinan", text: "Verstanden. Darf ich auch etwas ansprechen? Ich hätte gern mehr Verantwortung." },
      { speaker: "Frau Petrow", text: "Das motiviert mich zu hören. Eine Beförderung ist dieses Jahr schwierig, aber einen Bonus im Dezember kann ich Ihnen zusagen." },
      { speaker: "Sinan", text: "Und im nächsten Jahr sprechen wir noch einmal über die Stelle?" },
      { speaker: "Frau Petrow", text: "Auf jeden Fall. Ich notiere das." },
    ],
    questions: [
      {
        text: "Wie bewertet Frau Petrow Sinans Arbeit?",
        options: ["Sehr sorgfältig", "Zu langsam", "Nicht ausreichend"],
        answer: 0,
        explain: "„Sie arbeiten sehr sorgfältig, und die Kunden sagen, dass Sie immer respektvoll sind.“",
      },
      {
        kind: "gapfill",
        text: "Ich bin zufrieden, weil ich viel gelernt ___.",
        options: [],
        answer: 0,
        accept: ["habe"],
        explain: "Yan cümlede geçmiş zamanın yardımcı fiili en sona gider: gelernt habe.",
      },
      {
        text: "Was soll Sinan verbessern?",
        options: ["Die Pünktlichkeit", "Seine Berichte", "Den Umgang mit Kunden"],
        answer: 1,
        explain: "„Ihre Berichte sind manchmal zu kurz. Schreiben Sie bitte deutlicher.“",
      },
      {
        kind: "short_answer",
        text: "Was kann Frau Petrow zusagen?",
        options: [],
        answer: 0,
        accept: ["einen Bonus", "einen Bonus im Dezember", "Bonus"],
        explain: "Terfi bu yıl zor ama „einen Bonus im Dezember kann ich Ihnen zusagen“.",
      },
    ],
  },
  {
    id: "a2-u13-l2",
    level: "A2",
    skill: "listening",
    unit: 13,
    title: "Im Schlussverkauf",
    genre: "Diyalog",
    intro: "Mağazada indirim konuşması. Hangi fiyat geçerli?",
    gloss: [
      { de: "der Schlussverkauf", tr: "sezon sonu indirimi", en: "end-of-season sale" },
      { de: "die Ermäßigung", tr: "indirim", en: "discount" },
      { de: "der Sonderpreis", tr: "özel fiyat", en: "special price" },
      { de: "das Preisschild", tr: "fiyat etiketi", en: "price tag" },
      { de: "der Stammkunde", tr: "sürekli müşteri", en: "regular customer" },
      { de: "preiswert", tr: "uygun fiyatlı", en: "good value" },
      { de: "die Qualität", tr: "kalite", en: "quality" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Kundin", text: "Entschuldigung, auf dem Preisschild steht 79 Euro. Gilt der Schlussverkauf auch hier?" },
      { speaker: "Verkäufer", text: "Ja, alles in dieser Reihe ist reduziert. Die Jacke kostet jetzt 49." },
      { speaker: "Kundin", text: "Und die daneben? Die gefällt mir eigentlich besser." },
      { speaker: "Verkäufer", text: "Die ist leider aus der neuen Kollektion, da gibt es keine Ermäßigung. Aber die Qualität ist auch deutlich besser." },
      { speaker: "Kundin", text: "Hm. Ich bin hier Stammkundin, geht da nichts?" },
      { speaker: "Verkäufer", text: "Einen Moment, ich frage kurz. … Ich kann Ihnen einen Sonderpreis machen: 65 statt 89." },
      { speaker: "Kundin", text: "Das ist fair. Dann nehme ich die neue." },
      { speaker: "Verkäufer", text: "Gute Wahl. Die hält deutlich länger als die reduzierte." },
    ],
    questions: [
      {
        text: "Was kostet die reduzierte Jacke jetzt?",
        options: ["49 Euro", "65 Euro", "79 Euro"],
        answer: 0,
        explain: "„Die Jacke kostet jetzt 49.“ 79 etiket fiyatı, 65 öteki ceketin özel fiyatı.",
      },
      {
        kind: "gapfill",
        text: "Die hält deutlich länger ___ die reduzierte.",
        options: [],
        answer: 0,
        accept: ["als"],
        explain: "Karşılaştırmada bu kelime kullanılır; „wie“ benzerlik bildirir, karşılaştırma değil.",
      },
      {
        text: "Warum bekommt sie einen Sonderpreis?",
        options: ["Sie ist Stammkundin.", "Die Jacke hat einen Fehler.", "Es ist der letzte Tag."],
        answer: 0,
        explain: "„Ich bin hier Stammkundin, geht da nichts?“ — satıcı sorup özel fiyat veriyor.",
      },
      {
        kind: "short_answer",
        text: "Welche Jacke kauft die Kundin?",
        options: [],
        answer: 0,
        accept: ["die neue", "die aus der neuen Kollektion", "die neue Jacke"],
        explain: "„Das ist fair. Dann nehme ich die neue.“",
      },
    ],
  },
  {
    id: "a2-u13-w1",
    level: "A2",
    skill: "writing",
    unit: 13,
    title: "als, wie und am …sten",
    genre: "Dil bilgisi",
    intro: "Karşılaştırma ile en üstünlük. İkisinde de klasik bir hata var.",
    gloss: [
      { de: "preiswert", tr: "uygun fiyatlı", en: "good value" },
      { de: "die Qualität", tr: "kalite", en: "quality" },
      { de: "der Unterschied", tr: "fark", en: "difference" },
      { de: "stark", tr: "güçlü", en: "strong" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bu ceket ötekinden daha uygun fiyatlı.",
        answer: "Diese Jacke ist preiswerter als die andere",
        hint: "Sıfat sonuna karşılaştırma eki alır ve iki şeyin arasında „als“ durur.",
      },
      {
        kind: "build",
        tr: "Bu, hepsinin en ucuzu.",
        answer: "Das ist am billigsten",
        hint: "En üstünlük iki parçalı: kaynaşmış edat önde, hece sonda. Karşılaştırma kelimesi KULLANILMAZ.",
      },
      {
        kind: "build",
        tr: "Aradaki fark ne?",
        answer: "Was ist der Unterschied",
        hint: "Soru kelimesi başta, fiil ikinci sırada.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: karşılaştırmada hangi kelime kullanılır?",
        source: "Diese Jacke ist stärker wie die andere.",
        answer: "Diese Jacke ist stärker als die andere.",
        alternatives: ["Diese Jacke ist stärker als die andere"],
        why: "„wie“ benzerlik bildirir (so stark wie), karşılaştırma ise hep „als“ ile kurulur.",
      },
    ],
  },
  {
    id: "a2-u13-w2",
    level: "A2",
    skill: "writing",
    unit: 13,
    title: "Eine Krankmeldung schreiben",
    genre: "Resmî yazı",
    intro: "İşe hastalık bildirimi yaz: ne oldun, ne kadar süreyle, işler ne olacak?",
    gloss: [
      { de: "der Betreff", tr: "konu başlığı", en: "subject line" },
      { de: "der Anhang", tr: "ek", en: "attachment" },
      { de: "verschicken", tr: "yollamak", en: "to send" },
      { de: "ansteckend", tr: "bulaşıcı", en: "contagious" },
      { de: "die Migräne", tr: "migren", en: "migraine" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "İnsan kaynaklarının yazısına göre hastalık bildirimini yaz. Konu başlığı koy, neyin olduğunu ve kaç gün geleyemeceğini söyle, belgeyi nasıl göndereceğini belirt ve işlerin ne olacağını yaz.",
        stimulus:
          "Sehr geehrte Mitarbeiterinnen und Mitarbeiter,\n\nbitte melden Sie sich im Krankheitsfall am ersten Tag schriftlich per E-Mail. Schreiben Sie in den Betreff das Wort „Krankmeldung“ und die Tage.\n\nDas Attest schicken Sie bitte zusätzlich per Post.\n\nMit freundlichen Grüßen\nPersonalabteilung",
        checklist: [
          "Konu başlığına „Krankmeldung“ ve tarihleri yazdın mı?",
          "Neyin olduğunu ve kaç gün geleyemeceğini söyledin mi?",
          "Belgeyi nasıl gönderdiğini belirttin mi (Anhang / Post)?",
          "İşlerin ne olacağına dair bir cümle ekledin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Ich muss Ihnen leider sagen, dass ich krank bin.", tr: "maalesef hasta olduğumu bildirmem gerekiyor", en: "unfortunately I must tell you that I am ill" },
          { de: "Das Attest ist im Anhang.", tr: "rapor ekte", en: "the sick note is attached" },
          { de: "Meine Termine habe ich abgesagt.", tr: "randevularımı iptal ettim", en: "I have cancelled my appointments" },
        ],
        sample:
          "Betreff: Krankmeldung 3. bis 5. April\n\nSehr geehrte Damen und Herren,\n\nich muss Ihnen leider sagen, dass ich seit gestern Abend krank bin. Ich habe starke Migräne und war heute Morgen beim Arzt.\n\nDer Arzt hat mich bis Freitag krankgeschrieben. Das Attest ist im Anhang, das Original verschicke ich heute noch per Post.\n\nMeine Termine am Donnerstag habe ich abgesagt. Die Unterlagen für das Projekt liegen bei meiner Kollegin auf dem Schreibtisch.\n\nIch melde mich am Freitag wieder.\n\nMit freundlichen Grüßen\nLena Fischer",
      },
    ],
  },
];

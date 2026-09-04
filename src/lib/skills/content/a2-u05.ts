import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 5 — "Değişim, anılar ve emek".
 *
 * Dört ders: Was hat sich verändert? · Bei meinen Großeltern ·
 * Das war mir so peinlich! · Darauf bin ich stolz. İçerik ünite 1-5'in
 * kelimeleriyle sınırlı.
 *
 *   Ünite 5: sich erinnern, merken, ändern, verbessern, wechseln, entspannt,
 *            unzufrieden, weiterkommen · das Enkelkind, der Topf, der Kamin,
 *            der Teig, reich, großziehen, liebevoll, erben · unangenehm,
 *            ungeschickt, verwirrt, die Situation, gestehen, sich verwählen,
 *            auslachen, komisch · hart, weitermachen, trainieren,
 *            der Wettbewerb, versuchen, bewundern, aktiv, geschickt
 *   Kalıplar: Vieles hat sich verändert. · Ich erinnere mich an … ·
 *             Bei meinen Großeltern gab es … · Das war mir so peinlich! ·
 *             Ich habe lange … trainiert. · Am Ende habe ich es geschafft.
 *
 * İki ince nokta ölçülüyor: "ändern" ile "wechseln" farkı (aynı şeyi başka
 * hâle getirmek ↔ bırakıp yenisini almak) ve duygunun yönelme hâliyle
 * kurulması ("Das war MIR peinlich" — utanan kişi özne değil).
 */
export const a2U05: SkillExercise[] = [
  {
    id: "a2-u05-r1",
    level: "A2",
    skill: "reading",
    unit: 5,
    title: "Was hat sich bei mir verändert?",
    genre: "Blog yazısı",
    intro: "Bir yıl sonra geriye bakış: neyi bilerek değiştirmiş, ne kendiliğinden değişmiş?",
    gloss: [
      { de: "sich erinnern", tr: "hatırlamak", en: "to remember" },
      { de: "wechseln", tr: "bırakıp yenisini almak", en: "to switch" },
      { de: "ändern", tr: "başka hâle getirmek", en: "to change" },
      { de: "verbessern", tr: "iyileştirmek", en: "to improve" },
      { de: "unzufrieden", tr: "memnuniyetsiz", en: "dissatisfied" },
      { de: "entspannt", tr: "rahatlamış", en: "relaxed" },
      { de: "weiterkommen", tr: "ilerlemek", en: "to make progress" },
    ],
    minutes: 4,
    text:
      "Vor genau einem Jahr habe ich meine Stelle gewechselt. Ich erinnere mich noch gut an den letzten Tag im alten Büro.\n\n" +
      "Damals war ich sehr unzufrieden. Ich bin jeden Morgen müde aufgestanden und habe abends nur noch auf dem Sofa gesessen. Ich wollte etwas ändern, aber ich hatte Angst.\n\n" +
      "Heute ist vieles anders. Die neue Arbeit ist nicht leichter, aber ich komme fachlich weiter und mein Deutsch hat sich stark verbessert, weil ich den ganzen Tag sprechen muss.\n\n" +
      "Was ich nicht geplant hatte: ich bin auch privat entspannter geworden. Meine Schwester sagt, ich lache wieder mehr. Manches ändert man selbst, manches ändert sich einfach.",
    questions: [
      {
        text: "Was hat der Autor vor einem Jahr gemacht?",
        options: ["Er ist umgezogen.", "Er hat die Stelle gewechselt.", "Er hat einen Kurs begonnen."],
        answer: 1,
        explain: "„Vor genau einem Jahr habe ich meine Stelle gewechselt.“",
      },
      {
        kind: "gapfill",
        text: "Ich ___ mich noch gut an den letzten Tag.",
        options: [],
        answer: 0,
        accept: ["erinnere"],
        explain: "„sich erinnern an“ dönüşlü ve edatlı: erinnere mich an. Zamir fiilden hemen sonra durur.",
      },
      {
        text: "Warum hat sich sein Deutsch verbessert?",
        options: ["Er hat einen Kurs gemacht.", "Er muss den ganzen Tag sprechen.", "Seine Schwester hilft ihm."],
        answer: 1,
        explain: "„weil ich den ganzen Tag sprechen muss“ — sebep yan cümlede.",
      },
      {
        kind: "short_answer",
        text: "Was sagt seine Schwester über ihn?",
        options: [],
        answer: 0,
        accept: ["Er lacht wieder mehr", "er lacht mehr", "ich lache wieder mehr"],
        explain: "„Meine Schwester sagt, ich lache wieder mehr.“",
      },
      {
        text: "Die neue Arbeit ist leichter als die alte.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die neue Arbeit ist nicht leichter“ — ama ilerleme sağlıyor.",
      },
    ],
  },
  {
    id: "a2-u05-r2",
    level: "A2",
    skill: "reading",
    unit: 5,
    title: "Bei meinen Großeltern",
    genre: "Anı",
    intro: "Bir çocukluk anısı: o evde ne vardı, kim nasıl biriydi?",
    gloss: [
      { de: "der Kamin", tr: "şömine", en: "fireplace" },
      { de: "der Topf", tr: "tencere", en: "pot" },
      { de: "der Teig", tr: "hamur", en: "dough" },
      { de: "das Enkelkind", tr: "torun", en: "grandchild" },
      { de: "liebevoll", tr: "sevgi dolu", en: "loving" },
      { de: "großziehen", tr: "büyütmek", en: "to raise" },
      { de: "reich", tr: "zengin", en: "rich" },
      { de: "erben", tr: "miras almak", en: "to inherit" },
    ],
    minutes: 4,
    text:
      "In den Sommerferien war ich immer bei meinen Großeltern auf dem Land. Sie hatten sieben Enkelkinder, aber ich war das einzige, das jedes Jahr blieb.\n\n" +
      "Bei ihnen gab es einen alten Kamin im Wohnzimmer. Im Juli hat ihn natürlich niemand angemacht, aber er hat immer nach Holz gerochen. In der Küche stand ein sehr großer Topf, und am Freitag hat meine Großmutter darin Suppe gekocht.\n\n" +
      "Am liebsten habe ich beim Backen geholfen. Ich durfte den Teig rühren, und danach durfte ich die Schüssel auslecken.\n\n" +
      "Reich waren sie nicht. Sie haben fünf Kinder allein großgezogen. Aber sie waren die liebevollsten Menschen, die ich kenne. Später habe ich von ihnen das kleine Haus geerbt.",
    questions: [
      {
        text: "Wie viele Enkelkinder hatten die Großeltern?",
        options: ["Fünf", "Sieben", "Eins"],
        answer: 1,
        explain: "„Sie hatten sieben Enkelkinder.“ Beş, kendi çocuklarının sayısı.",
      },
      {
        kind: "gapfill",
        text: "Bei ihnen ___ es einen alten Kamin im Wohnzimmer.",
        options: [],
        answer: 0,
        accept: ["gab"],
        explain: "„Vardı“ kalıbı: es gibt → es gab. Ardından gelen isim belirtme hâline girer: einen Kamin.",
      },
      {
        text: "Was hat der Autor beim Backen gemacht?",
        options: ["Den Teig gerührt", "Die Suppe gekocht", "Den Kamin angemacht"],
        answer: 0,
        explain: "„Ich durfte den Teig rühren.“ Çorbayı büyükanne pişiriyordu.",
      },
      {
        kind: "short_answer",
        text: "Was hat der Autor später geerbt?",
        options: [],
        answer: 0,
        accept: ["das kleine Haus", "das Haus", "ein Haus"],
        explain: "„Später habe ich von ihnen das kleine Haus geerbt.“",
      },
      {
        text: "Die Großeltern waren reich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Reich waren sie nicht.“ Beş çocuğu tek başlarına büyütmüşler.",
      },
    ],
  },
  {
    id: "a2-u05-l1",
    level: "A2",
    skill: "listening",
    unit: 5,
    title: "Das war mir so peinlich!",
    genre: "Diyalog",
    intro: "Bir utanç anısı anlatılıyor. Ne oldu ve nasıl bitti?",
    gloss: [
      { de: "sich verwählen", tr: "yanlış numara çevirmek", en: "to dial the wrong number" },
      { de: "unangenehm", tr: "rahatsız edici", en: "awkward" },
      { de: "verwirrt", tr: "kafası karışmış", en: "confused" },
      { de: "die Situation", tr: "durum", en: "situation" },
      { de: "gestehen", tr: "itiraf etmek", en: "to confess" },
      { de: "auslachen", tr: "alay etmek", en: "to laugh at" },
      { de: "komisch", tr: "tuhaf", en: "odd" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Pia", text: "Erzähl mal, was war dir richtig peinlich?" },
      { speaker: "Baran", text: "Letzte Woche im Büro. Ich habe meinen Chef angerufen — dachte ich." },
      { speaker: "Pia", text: "Du hast dich verwählt?" },
      { speaker: "Baran", text: "Ja. Ich habe fünf Minuten über das Projekt geredet, ganz normal. Die Person am Telefon hat gar nichts gesagt." },
      { speaker: "Pia", text: "Oh nein. Und dann?" },
      { speaker: "Baran", text: "Dann hat eine fremde Frau gefragt: Wer sind Sie denn? Ich war so verwirrt. Die ganze Situation war furchtbar unangenehm." },
      { speaker: "Pia", text: "Hat sie dich ausgelacht?" },
      { speaker: "Baran", text: "Nein, sie war sehr nett. Ich habe gestanden, dass ich mich verwählt habe, und wir haben beide gelacht." },
    ],
    questions: [
      {
        text: "Wen wollte Baran anrufen?",
        options: ["Seine Kollegin", "Seinen Chef", "Eine fremde Frau"],
        answer: 1,
        explain: "„Ich habe meinen Chef angerufen — dachte ich.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe gestanden, dass ich mich ___ habe.",
        options: [],
        answer: 0,
        accept: ["verwählt"],
        explain: "„sich verwählen“ dönüşlü; yan cümlede yardımcı fiil en sona gider: verwählt habe.",
      },
      {
        text: "Wie hat die fremde Frau reagiert?",
        options: ["Sie war nett.", "Sie hat ihn ausgelacht.", "Sie hat sofort aufgelegt."],
        answer: 0,
        explain: "„Nein, sie war sehr nett“ — sonunda ikisi de gülmüş.",
      },
      {
        kind: "dictation",
        text: "Baran'ın durumu nasıl bulduğunu söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Die ganze Situation war furchtbar unangenehm."],
        explain: "Sıfat yüklem olarak kullanıldığı için ek almıyor: „war unangenehm“.",
      },
    ],
  },
  {
    id: "a2-u05-l2",
    level: "A2",
    skill: "listening",
    unit: 5,
    title: "Darauf bin ich stolz",
    genre: "Röportaj",
    intro: "Kısa bir röportaj: neyi başardı, arkasında ne kadar emek var?",
    gloss: [
      { de: "trainieren", tr: "antrenman yapmak", en: "to train" },
      { de: "der Wettbewerb", tr: "yarışma", en: "competition" },
      { de: "hart", tr: "zorlu", en: "tough" },
      { de: "weitermachen", tr: "devam etmek", en: "to carry on" },
      { de: "versuchen", tr: "denemek", en: "to try" },
      { de: "bewundern", tr: "hayran olmak", en: "to admire" },
      { de: "geschickt", tr: "becerikli", en: "skilful" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Reporterin", text: "Frau Aydın, Sie haben letzten Monat den Wettbewerb gewonnen. Wie lange haben Sie dafür trainiert?" },
      { speaker: "Frau Aydın", text: "Fast drei Jahre. Am Anfang zweimal pro Woche, später jeden Tag vor der Arbeit." },
      { speaker: "Reporterin", text: "Das klingt hart." },
      { speaker: "Frau Aydın", text: "Es war hart. Im zweiten Jahr wollte ich aufhören. Ich habe es dreimal versucht und bin dreimal zurückgekommen." },
      { speaker: "Reporterin", text: "Warum haben Sie weitergemacht?" },
      { speaker: "Frau Aydın", text: "Wegen meiner Trainerin. Sie ist siebzig und immer noch sehr aktiv. Ich bewundere sie sehr." },
      { speaker: "Reporterin", text: "Und was sagen Sie jungen Leuten?" },
      { speaker: "Frau Aydın", text: "Man muss nicht besonders geschickt sein. Man muss nur am Ende noch da sein." },
    ],
    questions: [
      {
        text: "Wie lange hat Frau Aydın trainiert?",
        options: ["Einen Monat", "Fast drei Jahre", "Siebzig Jahre"],
        answer: 1,
        explain: "„Fast drei Jahre.“ Yetmiş, antrenörünün yaşı.",
      },
      {
        kind: "gapfill",
        text: "Ich habe es dreimal ___ und bin dreimal zurückgekommen.",
        options: [],
        answer: 0,
        accept: ["versucht"],
        explain: "„versuchen“ vurgusuz ön ekle başlar: ortaç „ge“ almaz — versucht.",
      },
      {
        text: "Warum hat sie weitergemacht?",
        options: ["Wegen des Geldes", "Wegen ihrer Trainerin", "Wegen ihrer Familie"],
        answer: 1,
        explain: "„Wegen meiner Trainerin. … Ich bewundere sie sehr.“",
      },
      {
        kind: "short_answer",
        text: "Wie alt ist ihre Trainerin?",
        options: [],
        answer: 0,
        accept: ["siebzig", "70", "siebzig Jahre"],
        explain: "„Sie ist siebzig und immer noch sehr aktiv.“",
      },
    ],
  },
  {
    id: "a2-u05-w1",
    level: "A2",
    skill: "writing",
    unit: 5,
    title: "ändern oder wechseln?",
    genre: "Dil bilgisi",
    intro: "Aynı şeyi başka hâle getirmek mi, bırakıp yenisini almak mı? Bir de duygunun hâli.",
    gloss: [
      { de: "ändern", tr: "başka hâle getirmek", en: "to change" },
      { de: "wechseln", tr: "bırakıp yenisini almak", en: "to switch" },
      { de: "sich erinnern", tr: "hatırlamak", en: "to remember" },
      { de: "unangenehm", tr: "rahatsız edici", en: "awkward" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Randevumu değiştirmek istiyorum.",
        answer: "Ich möchte meinen Termin ändern",
        hint: "Aynı randevu kalıyor, yalnız saati başka oluyor → „ändern“. Nesne belirtme hâline girer.",
      },
      {
        kind: "build",
        tr: "İş değiştirmek istiyorum.",
        answer: "Ich möchte die Stelle wechseln",
        hint: "Eskisini bırakıp yenisini alıyorsun → „wechseln“. İkisi Türkçede aynı kelime, Almancada değil.",
      },
      {
        kind: "build",
        tr: "Çocukluğumu hatırlıyorum.",
        answer: "Ich erinnere mich an meine Kindheit",
        hint: "Bu fiil hem dönüşlü zamir hem „an“ edatı ister ve edat belirtme hâlini getirir.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi doğru hâlle yeniden yaz: duyguyu yaşayan kişi özne olmaz.",
        source: "Ich war das sehr unangenehm.",
        answer: "Das war mir sehr unangenehm.",
        alternatives: ["Das war mir sehr unangenehm"],
        why: "Öznesi olayın kendisi, kişi ise yönelme hâlinde durur — Türkçedeki „bana tatsız geldi“ gibi.",
      },
    ],
  },
  {
    id: "a2-u05-w2",
    level: "A2",
    skill: "writing",
    unit: 5,
    title: "Worauf bist du stolz?",
    genre: "Forum mesajı",
    intro: "Başardığın bir şeyi anlat: arkasında ne kadar emek vardı, zor anda ne yaptın?",
    gloss: [
      { de: "trainieren", tr: "antrenman yapmak", en: "to train" },
      { de: "hart", tr: "zorlu", en: "tough" },
      { de: "weitermachen", tr: "devam etmek", en: "to carry on" },
      { de: "versuchen", tr: "denemek", en: "to try" },
      { de: "der Wettbewerb", tr: "yarışma", en: "competition" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Forumdaki soruya cevap yaz. Başardığın bir şeyi anlat: ne kadar çalıştın, ne zaman zorlandın, sonunda ne oldu.",
        stimulus:
          "FORUM · Kleine und große Erfolge\n\nHallo! Ich habe letzten Monat einen Wettbewerb gewonnen. Ich habe fast drei Jahre dafür trainiert und wollte im zweiten Jahr aufhören. Aber ich habe weitergemacht.\n\nWorauf seid ihr stolz — es muss nichts Großes sein!",
        checklist: [
          "Emeği süresiyle birlikte yazdın mı („Ich habe … lange trainiert / gelernt“)?",
          "Zorlandığın bir anı anlattın mı?",
          "Neden devam ettiğini söyledin mi?",
          "Sonucu Perfekt ile yazdın mı („Am Ende habe ich es geschafft“)?",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich habe lange dafür trainiert.", tr: "bunun için uzun süre çalıştım", en: "I trained for it a long time" },
          { de: "Es war wirklich hart.", tr: "gerçekten zorluydu", en: "it was really tough" },
          { de: "Am Ende habe ich es geschafft.", tr: "sonunda başardım", en: "in the end I made it" },
        ],
        sample:
          "Hallo,\n\nbei mir ist es die Fahrprüfung. Ich habe zweimal nicht bestanden und war danach sehr unzufrieden mit mir.\n\nIch habe dann fast ein Jahr lang jede Woche geübt, meistens früh am Morgen. Im Winter wollte ich aufhören, weil es dunkel und kalt war. Meine Nachbarin hat mich jedes Mal gefragt, wie es läuft — deshalb habe ich weitergemacht.\n\nIm Mai habe ich es beim dritten Mal geschafft. Das war kein Wettbewerb, aber für mich war es riesig.\n\nViele Grüße\nAli",
      },
    ],
  },
];

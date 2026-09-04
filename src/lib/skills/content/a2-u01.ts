import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 1 — "Geçmişi anlatmak".
 *
 * Dört ders: Letzter Urlaub · Genannt, verloren, gefallen · Ich habe alles
 * vorbereitet · Gestern Abend. İçerik ünite 1'in kelimeleriyle ve A1'de
 * öğrenilenlerle sınırlı; Perfekt'in üç yüzü (sein/haben ayrımı, kuralsız
 * ortaç, ayrılabilen fiil) burada okuma, dinleme ve yazmada çalıştırılıyor.
 *
 *   Ünite 1: die Natur, der Berg, losgehen, verreisen, hinfahren,
 *            zurückkommen, unternehmen, fantastisch · verlieren, nennen,
 *            weglaufen, fallen, verbrennen, backen, lügen, sterben ·
 *            vorbeikommen, zurückbringen, vorbereiten, aufwecken, ausgehen,
 *            zuhören, abschließen, ausschalten · einschlafen, spannend,
 *            abends, vorher, anschließend, zuletzt, das Programm, ansehen
 *   Kalıplar: Ich bin … verreist. · Wir haben … unternommen. · Ich habe …
 *             verloren. · Er ist … gefallen. · Ich habe alles vorbereitet. ·
 *             Anschließend bin ich eingeschlafen.
 */
export const a2U01: SkillExercise[] = [
  {
    id: "a2-u01-r1",
    level: "A2",
    skill: "reading",
    unit: 1,
    title: "Urlaubsgrüße aus den Bergen",
    genre: "E-posta",
    intro: "Bir tatil e-postası. Kim nereye gitti, orada ne yaptı ve ne zaman döndü?",
    gloss: [
      { de: "verreisen", tr: "seyahate çıkmak", en: "to travel away" },
      { de: "der Berg", tr: "dağ", en: "mountain" },
      { de: "die Natur", tr: "doğa", en: "nature" },
      { de: "unternehmen", tr: "bir şeyler yapmak", en: "to do something" },
      { de: "losgehen", tr: "yola çıkmak", en: "to set off" },
      { de: "zurückkommen", tr: "geri gelmek", en: "to come back" },
      { de: "fantastisch", tr: "muhteşem", en: "fantastic" },
    ],
    minutes: 3,
    text:
      "Hallo Deniz,\n\n" +
      "endlich habe ich Zeit zum Schreiben! Ich bin am ersten Juli mit meiner Schwester verreist. Wir sind nicht ans Meer gefahren, sondern in die Berge. Das war eine gute Idee: die Natur dort ist wirklich fantastisch.\n\n" +
      "Wir haben jeden Tag etwas unternommen. Am Montag sind wir schon um sechs Uhr losgegangen, weil wir vor dem Regen oben sein wollten. Am Dienstag habe ich meine Sonnenbrille verloren, aber ein Kind hat sie später gefunden. Am Mittwoch hat unsere Vermieterin einen Kuchen gebacken und uns eingeladen.\n\n" +
      "Am Sonntag bin ich zurückgekommen. Ich bin müde, aber sehr glücklich. Nächstes Jahr fahren wir wieder dorthin.\n\n" +
      "Liebe Grüße\nSelin",
    questions: [
      {
        text: "Wohin sind Selin und ihre Schwester gefahren?",
        options: ["Ans Meer", "In die Berge", "In eine große Stadt"],
        answer: 1,
        explain: "„Wir sind nicht ans Meer gefahren, sondern in die Berge.“ Deniz bilerek konmuş çeldirici.",
      },
      {
        kind: "gapfill",
        text: "Am Montag sind wir schon um sechs Uhr ___.",
        options: [],
        answer: 0,
        accept: ["losgegangen"],
        explain: "„losgehen“ hem ayrılabilen hem yer değiştiren bir fiil: ortacı „losgegangen“ ve yardımcı fiili „sein“.",
      },
      {
        text: "Was hat Selin am Dienstag verloren?",
        options: ["Ihren Schlüssel", "Ihre Sonnenbrille", "Ihr Handy"],
        answer: 1,
        explain: "„Am Dienstag habe ich meine Sonnenbrille verloren.“ Sonra bir çocuk bulmuş.",
      },
      {
        kind: "short_answer",
        text: "Wer hat am Mittwoch einen Kuchen gebacken?",
        options: [],
        answer: 0,
        accept: ["die Vermieterin", "unsere Vermieterin", "Vermieterin"],
        explain: "„Am Mittwoch hat unsere Vermieterin einen Kuchen gebacken.“",
      },
      {
        text: "Selin ist am Samstag zurückgekommen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Sonntag bin ich zurückgekommen.“",
      },
    ],
  },
  {
    id: "a2-u01-r2",
    level: "A2",
    skill: "reading",
    unit: 1,
    title: "Mein Abend vor dem Fernseher",
    genre: "Blog yazısı",
    intro: "Kısa bir blog yazısı: dün akşam sırayla ne oldu?",
    gloss: [
      { de: "das Programm", tr: "program", en: "programme" },
      { de: "ansehen", tr: "izlemek", en: "to watch" },
      { de: "spannend", tr: "sürükleyici", en: "exciting" },
      { de: "vorher", tr: "önceden", en: "beforehand" },
      { de: "anschließend", tr: "ardından", en: "afterwards" },
      { de: "einschlafen", tr: "uykuya dalmak", en: "to fall asleep" },
      { de: "zuletzt", tr: "en son", en: "last of all" },
      { de: "abends", tr: "akşamları", en: "in the evenings" },
    ],
    minutes: 3,
    text:
      "Abends bin ich meistens zu müde für große Pläne. Gestern war das auch so.\n\n" +
      "Vorher habe ich noch schnell gekocht und die Küche aufgeräumt. Anschließend habe ich mich auf das Sofa gesetzt und ein Programm über Island angesehen. Es war wirklich spannend: die Bilder von der Natur waren fantastisch.\n\n" +
      "Nach einer Stunde habe ich das Licht ausgeschaltet, weil meine Augen müde waren. Ich wollte nur kurz die Augen zumachen — aber ich bin sofort eingeschlafen. Um zwei Uhr nachts bin ich wieder wach geworden, und der Fernseher lief immer noch.\n\n" +
      "Zuletzt habe ich das Gerät ausgemacht und bin ins Bett gegangen. Heute Abend lese ich lieber ein Buch.",
    questions: [
      {
        text: "Was hat der Autor vor dem Fernsehen gemacht?",
        options: ["Er ist spazieren gegangen.", "Er hat gekocht und aufgeräumt.", "Er hat ein Buch gelesen."],
        answer: 1,
        explain: "„Vorher habe ich noch schnell gekocht und die Küche aufgeräumt.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe ein Programm über Island ___.",
        options: [],
        answer: 0,
        accept: ["angesehen"],
        explain: "„ansehen“ ayrılabilen bir fiil; ortacın hecesi ön ekle kökün arasına girer: angesehen.",
      },
      {
        text: "Warum hat er das Licht ausgeschaltet?",
        options: ["Seine Augen waren müde.", "Das Programm war langweilig.", "Er wollte lesen."],
        answer: 0,
        explain: "„weil meine Augen müde waren“ — sebep yan cümlede veriliyor.",
      },
      {
        kind: "short_answer",
        text: "Wann ist er wieder wach geworden?",
        options: [],
        answer: 0,
        accept: ["um zwei Uhr", "um zwei Uhr nachts", "zwei Uhr"],
        explain: "„Um zwei Uhr nachts bin ich wieder wach geworden.“",
      },
      {
        text: "Er ist beim Fernsehen eingeschlafen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „aber ich bin sofort eingeschlafen“ ve televizyon hâlâ açıktı.",
      },
    ],
  },
  {
    id: "a2-u01-l1",
    level: "A2",
    skill: "listening",
    unit: 1,
    title: "Wie war dein Wochenende?",
    genre: "Diyalog",
    intro: "İki arkadaş hafta sonunu konuşuyor. Kim nereye gitti, kim evde kaldı?",
    gloss: [
      { de: "verreisen", tr: "seyahate çıkmak", en: "to travel away" },
      { de: "hinfahren", tr: "araçla gitmek", en: "to drive there" },
      { de: "unternehmen", tr: "bir şeyler yapmak", en: "to do something" },
      { de: "vorbeikommen", tr: "uğramak", en: "to drop by" },
      { de: "weglaufen", tr: "kaçmak", en: "to run away" },
      { de: "zurückkommen", tr: "geri gelmek", en: "to come back" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Jonas", text: "Na, wie war dein Wochenende? Bist du verreist?" },
      { speaker: "Amina", text: "Ja, ich bin mit dem Auto zu meiner Tante hingefahren. Am Freitagabend bin ich losgefahren und am Sonntag zurückgekommen." },
      { speaker: "Jonas", text: "Und? Habt ihr etwas unternommen?" },
      { speaker: "Amina", text: "Nicht viel. Am Samstag ist ihr Hund weggelaufen, und wir haben ihn drei Stunden lang gesucht. Am Ende hat ihn ein Nachbar gefunden." },
      { speaker: "Jonas", text: "Oh je! Und danach?" },
      { speaker: "Amina", text: "Danach war ich zu müde. Meine Tante hat einen Kuchen gebacken, und wir sind einfach zu Hause geblieben. Und du?" },
      { speaker: "Jonas", text: "Ich bin hiergeblieben. Aber meine Schwester ist am Sonntag vorbeigekommen, das war schön." },
    ],
    questions: [
      {
        text: "Wann ist Amina losgefahren?",
        options: ["Am Freitagabend", "Am Samstagmorgen", "Am Sonntag"],
        answer: 0,
        explain: "„Am Freitagabend bin ich losgefahren“ — pazar günü ise dönüş günü.",
      },
      {
        kind: "gapfill",
        text: "Am Samstag ist ihr Hund ___.",
        options: [],
        answer: 0,
        accept: ["weggelaufen"],
        explain: "„weglaufen“ yer değiştiren bir fiil: „ist weggelaufen“, ortaç ortadan açılıyor.",
      },
      {
        text: "Wer hat den Hund gefunden?",
        options: ["Amina", "Ihre Tante", "Ein Nachbar"],
        answer: 2,
        explain: "„Am Ende hat ihn ein Nachbar gefunden.“",
      },
      {
        kind: "dictation",
        text: "Jonas'ın son cümlesini yaz.",
        options: [],
        answer: 0,
        accept: ["Aber meine Schwester ist am Sonntag vorbeigekommen, das war schön."],
        explain: "Ayrılabilen fiilin ortacı: vorbei + ge + kommen → vorbeigekommen; yardımcı fiil „ist“.",
      },
    ],
  },
  {
    id: "a2-u01-l2",
    level: "A2",
    skill: "listening",
    unit: 1,
    title: "Hast du alles vorbereitet?",
    genre: "Diyalog",
    intro: "Yola çıkmadan önce son kontrol. Neyi yapmışlar, neyi unutmuşlar?",
    gloss: [
      { de: "vorbereiten", tr: "hazırlamak", en: "to prepare" },
      { de: "abschließen", tr: "kilitlemek", en: "to lock" },
      { de: "ausschalten", tr: "kapatmak", en: "to switch off" },
      { de: "zurückbringen", tr: "geri götürmek", en: "to take back" },
      { de: "aufwecken", tr: "uyandırmak", en: "to wake up" },
      { de: "zuhören", tr: "dinlemek", en: "to listen" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ela", text: "So, wir fahren in zwanzig Minuten. Hast du alles vorbereitet?" },
      { speaker: "Murat", text: "Ich glaube schon. Ich habe die Taschen ins Auto gestellt und den Herd ausgeschaltet." },
      { speaker: "Ela", text: "Und die Bücher aus der Bibliothek? Hast du die zurückgebracht?" },
      { speaker: "Murat", text: "Oh nein. Die liegen noch auf dem Schreibtisch. Das mache ich schnell." },
      { speaker: "Ela", text: "Bitte hör mir kurz zu: die Bibliothek macht erst um zehn auf. Wir sind dann längst weg." },
      { speaker: "Murat", text: "Stimmt. Dann bringe ich sie nächste Woche zurück. Hast du die Kinder schon aufgeweckt?" },
      { speaker: "Ela", text: "Ja, vor einer halben Stunde. Und die Wohnungstür habe ich noch nicht abgeschlossen — das machen wir zuletzt." },
    ],
    questions: [
      {
        text: "Was hat Murat schon gemacht?",
        options: ["Die Bücher zurückgebracht", "Den Herd ausgeschaltet", "Die Tür abgeschlossen"],
        answer: 1,
        explain: "„Ich habe die Taschen ins Auto gestellt und den Herd ausgeschaltet.“",
      },
      {
        kind: "gapfill",
        text: "Hast du die Kinder schon ___?",
        options: [],
        answer: 0,
        accept: ["aufgeweckt"],
        explain: "„aufwecken“ ayrılabilen ve kurallı: ortacın hecesi araya girer, sonu düz kalır — aufgeweckt.",
      },
      {
        text: "Warum bringt Murat die Bücher jetzt nicht zurück?",
        options: ["Er findet sie nicht.", "Die Bibliothek ist noch zu.", "Ela will nicht warten."],
        answer: 1,
        explain: "„die Bibliothek macht erst um zehn auf. Wir sind dann längst weg.“",
      },
      {
        kind: "short_answer",
        text: "Was machen sie zuletzt?",
        options: [],
        answer: 0,
        accept: ["die Tür abschließen", "abschließen", "die Wohnungstür abschließen"],
        explain: "„die Wohnungstür habe ich noch nicht abgeschlossen — das machen wir zuletzt.“",
      },
    ],
  },
  {
    id: "a2-u01-w1",
    level: "A2",
    skill: "writing",
    unit: 1,
    title: "Perfekt: haben oder sein?",
    genre: "Dil bilgisi",
    intro: "Geçmiş zamanın üç yüzü: yardımcı fiil seçimi, kuralsız ortaç ve ayrılabilen fiil.",
    gloss: [
      { de: "verreisen", tr: "seyahate çıkmak", en: "to travel away" },
      { de: "unternehmen", tr: "bir şeyler yapmak", en: "to do something" },
      { de: "ausschalten", tr: "kapatmak", en: "to switch off" },
      { de: "verlieren", tr: "kaybetmek", en: "to lose" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Temmuzda seyahate çıktım.",
        answer: "Im Juli bin ich verreist",
        hint: "„verreisen“ yer değiştiren bir fiil → „sein“ alır. Zaman ifadesi başta olduğu için özne fiilin arkasına düşer.",
      },
      {
        kind: "build",
        tr: "Dağlarda çok şey yaptık.",
        answer: "In den Bergen haben wir viel unternommen",
        hint: "„unternehmen“ yer değiştirmez → „haben“. Vurgusuz ön ek yüzünden ortaçta „ge“ yok: unternommen.",
      },
      {
        kind: "build",
        tr: "Televizyonu kapattın mı?",
        answer: "Hast du den Fernseher ausgeschaltet",
        hint: "Soruda yardımcı fiil başa geçer, ortaç sonda kalır ve ayrılabilen ön ek ortacın başındadır: ausgeschaltet.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi geçmiş zamana çevir.",
        source: "Ich verliere meinen Schlüssel.",
        answer: "Ich habe meinen Schlüssel verloren.",
        alternatives: ["Ich habe meinen Schlüssel verloren"],
        why: "„verlieren“ kuralsız: ortacı „verloren“ ve vurgusuz ön ek yüzünden „ge“ almaz.",
      },
    ],
  },
  {
    id: "a2-u01-w2",
    level: "A2",
    skill: "writing",
    unit: 1,
    title: "Erzähl von deinem letzten Urlaub",
    genre: "E-posta",
    intro: "Bir arkadaşına tatilini anlatan kısa bir e-posta yaz.",
    gloss: [
      { de: "verreisen", tr: "seyahate çıkmak", en: "to travel away" },
      { de: "unternehmen", tr: "bir şeyler yapmak", en: "to do something" },
      { de: "zurückkommen", tr: "geri gelmek", en: "to come back" },
      { de: "fantastisch", tr: "muhteşem", en: "fantastic" },
      { de: "die Natur", tr: "doğa", en: "nature" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Selin'in e-postasına cevap yaz. Kendi son tatilini anlat: nereye gittin, ne yaptın, ne zaman döndün.",
        stimulus:
          "Hallo,\n\nich bin im Juli mit meiner Schwester in die Berge verreist. Wir haben jeden Tag etwas unternommen und am Sonntag bin ich zurückgekommen. Es war fantastisch!\n\nUnd du? Wohin bist du gefahren?\n\nLiebe Grüße\nSelin",
        checklist: [
          "Nereye gittiğini yer değiştiren bir fiille yazdın mı (bin … gefahren / verreist)?",
          "Orada ne yaptığını „haben“ ile yazdın mı (habe … gemacht / unternommen)?",
          "Ne zaman döndüğünü söyledin mi?",
          "Selin'e bir soru sordun mu?",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich bin nach … gefahren.", tr: "…-e gittim", en: "I travelled to …" },
          { de: "Wir haben viel unternommen.", tr: "çok şey yaptık", en: "we did a lot" },
          { de: "Am … bin ich zurückgekommen.", tr: "…-de geri döndüm", en: "I came back on …" },
        ],
        sample:
          "Hallo Selin,\n\nvielen Dank für deine E-Mail! Ich bin im August nach Antalya gefahren, zusammen mit meinem Bruder. Wir sind am ersten August losgefahren und waren zwei Wochen dort.\n\nWir haben viel unternommen: wir sind jeden Morgen geschwommen und haben abends in der Altstadt gegessen. Einmal sind wir mit dem Boot gefahren, das war fantastisch. Die Natur dort ist wirklich schön.\n\nAm 15. August bin ich zurückgekommen. Wohin fährst du nächstes Jahr?\n\nLiebe Grüße\nDeniz",
      },
    ],
  },
];

import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 7 — "Sıra, sebep, orantı" (dersler 25–28).
 *
 * Dersler: nachdem · bevor/während · deshalb/trotzdem · je … desto.
 *
 * Dördü de CÜMLE BAĞLAMA yolu ve her biri ana cümlenin fiilini başka yere
 * koyuyor — asıl ölçülen nokta bu:
 *   nachdem/bevor/während  yan cümle bağlacı → fiil yan cümlenin sonunda
 *   deshalb/trotzdem       ZARF, bağlaç değil → birinci öğe, fiil ikinci
 *   je … desto             je yan cümle (fiil sonda), desto ana cümle
 *                          (karşılaştırma öne, fiil hemen arkasında)
 * Türkçe konuşan için tuzak deshalb: "bu yüzden" Türkçede sırayı bozmaz,
 * Almancada bozar. r2 ve w1 doğrudan bunu çalıştırıyor.
 *
 * Yeni 32 kelime: danach, die Reihenfolge, inzwischen, nun, eben, seitdem,
 * übrigens, jemals, die Vorstellung, gleichzeitig, sich unterhalten,
 * unterwegs, los, mal, raus, dabei, der Stau, die Entscheidung, ablehnen,
 * deswegen, die Ursache, wieso, etwa, völlig, flüssig, je, tatsächlich,
 * absolut, interessiert, gar, klasse, wert.
 */
export const b1U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u7-r1",
    level: "B1",
    skill: "reading",
    unit: 7,
    title: "Mein Weg zur Arbeit",
    genre: "Günlük yazısı",
    intro: "Bir işe gidiş öyküsü. Olaylar hangi sırayla oldu, dikkatle takip et.",
    minutes: 5,
    gloss: [
      { de: "die Reihenfolge", tr: "sıra", en: "order" },
      { de: "unterwegs", tr: "yolda", en: "on the way" },
      { de: "der Stau", tr: "trafik sıkışıklığı", en: "traffic jam" },
      { de: "inzwischen", tr: "bu arada", en: "meanwhile" },
      { de: "seitdem", tr: "o zamandan beri", en: "since then" },
    ],
    text:
      "Früher fuhr ich mit dem Auto. Nachdem ich zweimal eine Stunde im Stau gestanden hatte, " +
      "änderte ich die Reihenfolge meines Morgens.\n\n" +
      "Nun stehe ich früher auf. Bevor ich aus dem Haus gehe, mache ich mir einen Kaffee und " +
      "packe alles. Während ich im Zug sitze, lese ich die Nachrichten. Danach habe ich noch " +
      "zwanzig Minuten und gehe den Rest zu Fuß.\n\n" +
      "Unterwegs treffe ich oft dieselben Leute. Mit einer Kollegin unterhalte ich mich " +
      "inzwischen fast jeden Tag. Wir sprechen über alles, gleichzeitig wird der Weg kürzer.\n\n" +
      "Seitdem ich den Zug nehme, komme ich ruhiger an. Das Auto war schneller, wenn die " +
      "Straße frei war — aber sie war eben fast nie frei. Übrigens spare ich auch Geld.",
    questions: [
      {
        text: "Warum änderte der Erzähler seinen Morgen?",
        options: ["Er stand zweimal lange im Stau", "Das Auto war kaputt", "Der Zug war billiger"],
        answer: 0,
        explain: "„Nachdem ich zweimal eine Stunde im Stau gestanden hatte, änderte ich die Reihenfolge …“",
      },
      {
        text: "Was macht er, bevor er aus dem Haus geht?",
        options: ["Er liest die Nachrichten", "Er macht Kaffee und packt", "Er ruft die Kollegin an"],
        answer: 1,
        explain: "„Bevor ich aus dem Haus gehe, mache ich mir einen Kaffee und packe alles.“",
      },
      {
        text: "Was macht er, während er im Zug sitzt?",
        options: ["Er schläft", "Er liest die Nachrichten", "Er arbeitet"],
        answer: 1,
        explain: "„Während ich im Zug sitze, lese ich die Nachrichten.“",
      },
      {
        kind: "gapfill",
        text: "___ ich den Zug nehme, komme ich ruhiger an.",
        options: [],
        answer: 0,
        accept: ["Seitdem"],
        explain: "Bir andan bugüne süren durum: „Seitdem“.",
      },
      {
        kind: "short_answer",
        text: "Wie lange geht er am Ende zu Fuß?",
        options: [],
        answer: 0,
        accept: ["zwanzig Minuten", "zwanzig", "20 Minuten"],
        explain: "„Danach habe ich noch zwanzig Minuten und gehe den Rest zu Fuß.“",
      },
    ],
  },
  {
    id: "b1-u7-r2",
    level: "B1",
    skill: "reading",
    unit: 7,
    title: "Warum ich abgelehnt habe",
    genre: "Blog yazısı",
    intro: "Biri iyi bir teklifi reddetmiş. Sebebi ile buna rağmen yaptığını ayırt et.",
    minutes: 5,
    gloss: [
      { de: "ablehnen", tr: "reddetmek", en: "to decline" },
      { de: "die Entscheidung", tr: "karar", en: "decision" },
      { de: "die Ursache", tr: "sebep", en: "cause" },
      { de: "deswegen", tr: "bu yüzden", en: "for that reason" },
      { de: "wert", tr: "değer", en: "worth" },
    ],
    text:
      "Im Frühling bekam ich ein Angebot: mehr Lohn, ein größeres Büro, eine neue Abteilung. " +
      "Trotzdem habe ich abgelehnt. Viele haben mich gefragt, wieso.\n\n" +
      "Die Ursache war nicht das Geld. Der Weg wäre täglich zwei Stunden gewesen. " +
      "Deswegen hätte ich meine Kinder kaum noch gesehen. Ich habe lange gerechnet, " +
      "und die Entscheidung war am Ende einfach.\n\n" +
      "Meine Vorstellung von einer guten Stelle hat sich geändert. Früher war der Titel " +
      "wichtig, deshalb habe ich jede Gelegenheit genommen. Heute ist mir die Zeit mehr wert. " +
      "Das ist tatsächlich der ganze Grund.\n\n" +
      "Ich sage nicht, dass Geld gar nicht zählt. Es zählt. Aber je länger man unterwegs ist, " +
      "desto weniger bleibt vom Tag. Meine Chefin war übrigens nicht böse. Sie meinte, sie " +
      "hätte wohl dasselbe gemacht.",
    questions: [
      {
        text: "Was war NICHT der Grund für die Absage?",
        options: ["Der lange Weg", "Das Geld", "Die Kinder"],
        answer: 1,
        explain: "„Die Ursache war nicht das Geld.“",
      },
      {
        text: "Wie lange wäre der Weg täglich gewesen?",
        options: ["Eine Stunde", "Zwei Stunden", "Drei Stunden"],
        answer: 1,
        explain: "„Der Weg wäre täglich zwei Stunden gewesen.“",
      },
      {
        text: "Was sagte die Chefin?",
        options: ["Sie war böse", "Sie verstand es", "Sie kündigte"],
        answer: 1,
        explain: "„Sie meinte, sie hätte wohl dasselbe gemacht.“",
      },
      {
        kind: "gapfill",
        text: "Früher war der Titel wichtig, ___ habe ich jede Gelegenheit genommen.",
        options: [],
        answer: 0,
        accept: ["deshalb", "deswegen"],
        explain: "Sonuç zarfı: „deshalb/deswegen“ — arkasından fiil gelir (habe ich).",
      },
      {
        kind: "short_answer",
        text: "In welcher Jahreszeit kam das Angebot?",
        options: [],
        answer: 0,
        accept: ["im Frühling", "Frühling"],
        explain: "„Im Frühling bekam ich ein Angebot …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u7-l1",
    level: "B1",
    skill: "listening",
    unit: 7,
    title: "Bevor wir losfahren",
    genre: "Yola çıkma konuşması",
    intro: "İki kişi yola çıkmadan önce işleri paylaşıyor. Ne önce, ne aynı anda?",
    minutes: 4,
    gloss: [
      { de: "los", tr: "hadi / yola", en: "off" },
      { de: "gleichzeitig", tr: "aynı anda", en: "at the same time" },
      { de: "dabei", tr: "bu sırada / yanında", en: "with it" },
      { de: "etwa", tr: "yaklaşık", en: "about" },
    ],
    segments: [
      { text: "Wann wollen wir los?" },
      { text: "Bevor der Verkehr schlimm wird. Also etwa um sechs." },
      { text: "Gut. Während du packst, hole ich das Auto raus." },
      { text: "Kannst du gleichzeitig die Karte holen? Dann sparen wir Zeit." },
      { text: "Mache ich. Nimm bitte etwas zu trinken mit." },
      { text: "Ist dabei. Nachdem wir gestern eingekauft hatten, habe ich alles bereitgelegt." },
      { text: "Klasse. Dann sind wir vor dem Stau draußen." },
      { text: "Hoffentlich. Übrigens fährt meine Schwester auch hin." },
    ],
    questions: [
      {
        text: "Wann wollen die beiden losfahren?",
        options: ["Um sechs", "Um acht", "Um zehn"],
        answer: 0,
        explain: "„Bevor der Verkehr schlimm wird. Also etwa um sechs.“",
      },
      {
        text: "Was macht die zweite Person, während die erste packt?",
        options: ["Sie schläft", "Sie holt das Auto raus", "Sie kauft ein"],
        answer: 1,
        explain: "„Während du packst, hole ich das Auto raus.“",
      },
      {
        text: "Wann wurde eingekauft?",
        options: ["Heute Morgen", "Gestern", "Vor einer Woche"],
        answer: 1,
        explain: "„Nachdem wir gestern eingekauft hatten, habe ich alles bereitgelegt.“",
      },
      {
        kind: "gapfill",
        text: "Kannst du ___ die Karte holen? Dann sparen wir Zeit.",
        options: [],
        answer: 0,
        accept: ["gleichzeitig"],
        explain: "„Kannst du gleichzeitig die Karte holen?“ — iki iş aynı anda.",
      },
      {
        kind: "short_answer",
        text: "Wer fährt auch dorthin?",
        options: [],
        answer: 0,
        accept: ["die Schwester", "meine Schwester", "Schwester"],
        explain: "„Übrigens fährt meine Schwester auch hin.“",
      },
    ],
  },
  {
    id: "b1-u7-l2",
    level: "B1",
    skill: "listening",
    unit: 7,
    title: "Je mehr, desto besser?",
    genre: "Öğrenme üzerine sohbet",
    intro: "İki kişi öğrenmeyi konuşuyor. Neyin artması neyi artırıyor, dinle.",
    minutes: 4,
    gloss: [
      { de: "flüssig", tr: "akıcı", en: "fluent" },
      { de: "völlig", tr: "tamamen", en: "completely" },
      { de: "jemals", tr: "hiçbir zaman", en: "ever", note: "olumsuz ve soru cümlelerinde" },
      { de: "interessiert", tr: "ilgili", en: "interested" },
    ],
    segments: [
      { text: "Sag mal, wirst du jemals völlig flüssig sprechen?" },
      { text: "Keine Ahnung. Aber je mehr ich rede, desto weniger denke ich nach." },
      { text: "Das kann sein. Bei mir ist es anders." },
      { text: "Wieso denn?" },
      { text: "Je länger ich lerne, desto unsicherer werde ich." },
      { text: "Dann lernst du eben zu viel allein. Such dir jemanden." },
      { text: "Vielleicht. Ich bin absolut interessiert, aber ich traue mich nicht." },
      { text: "Fang klein an. Nach zwei Wochen merkst du den Unterschied." },
    ],
    questions: [
      {
        text: "Was passiert, je mehr die erste Person redet?",
        options: ["Sie denkt weniger nach", "Sie wird müde", "Sie macht mehr Fehler"],
        answer: 0,
        explain: "„… je mehr ich rede, desto weniger denke ich nach.“",
      },
      {
        text: "Was passiert bei der zweiten Person?",
        options: ["Sie wird sicherer", "Sie wird unsicherer", "Nichts ändert sich"],
        answer: 1,
        explain: "„Je länger ich lerne, desto unsicherer werde ich.“",
      },
      {
        text: "Was rät die erste Person?",
        options: ["Mehr allein lernen", "Jemanden zum Reden suchen", "Aufhören"],
        answer: 1,
        explain: "„Dann lernst du eben zu viel allein. Such dir jemanden.“",
      },
      {
        kind: "gapfill",
        text: "Je mehr ich rede, ___ weniger denke ich nach.",
        options: [],
        answer: 0,
        accept: ["desto"],
        explain: "„je … desto“ ikilisi: ilk yarıda je, ikinci yarıda desto.",
      },
      {
        kind: "short_answer",
        text: "Nach wie langer Zeit merkt man den Unterschied?",
        options: [],
        answer: 0,
        accept: ["nach zwei Wochen", "zwei Wochen"],
        explain: "„Nach zwei Wochen merkst du den Unterschied.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u7-w1",
    level: "B1",
    skill: "writing",
    unit: 7,
    title: "Der Grund und die Folge",
    genre: "Açıklama metni",
    intro: "Bir gecikmeyi açıkla. Sebebi ve sonucu ayrı ayrı, doğru sırayla yaz.",
    minutes: 8,
    gloss: [
      { de: "der Stau", tr: "trafik sıkışıklığı", en: "traffic jam" },
      { de: "deswegen", tr: "bu yüzden", en: "for that reason" },
      { de: "die Ursache", tr: "sebep", en: "cause" },
      { de: "danach", tr: "ondan sonra", en: "after that" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Trafik vardı, bu yüzden geç geldim.",
        answer: "Es gab einen Stau, deshalb kam ich zu spät.",
        alternatives: ["Es gab einen Stau, deswegen kam ich zu spät."],
        hint: "„deshalb“ zarftır: hemen arkasından fiil gelir.",
      },
      {
        kind: "build",
        tr: "Toplantı bittikten sonra hemen size yazdım.",
        answer: "Nachdem die Besprechung zu Ende war, schrieb ich Ihnen sofort.",
        hint: "nachdem yan cümlesi; ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Sebebi bilmiyordum, yine de ondan sonra özür diledim.",
        answer: "Ich kannte die Ursache nicht, trotzdem entschuldigte ich mich danach.",
        hint: "„trotzdem“ de zarftır: fiil hemen arkasından.",
      },
      {
        kind: "form",
        prompt: "Gecikme bildiriminin künyesini doldur.",
        facts: "Bildiren: Nuri Öz; gecikme: 40 dakika; sebep: trafik; sonuç: toplantıya katılamadı; sonraki adım: ertesi gün rapor.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Verspätung", answer: "40 Minuten", accept: ["vierzig Minuten", "40"] },
          { label: "Ursache", answer: "Stau", accept: ["ein Stau", "der Verkehr"] },
          { label: "Folge", answer: "Besprechung verpasst", accept: ["die Besprechung verpasst", "nicht bei der Besprechung"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Sonuç cümlesindeki sırayı düzelt.",
        source: "Es gab einen Stau, deshalb ich kam zu spät.",
        answer: "Es gab einen Stau, deshalb kam ich zu spät.",
        why: "Türkçe 'bu yüzden' cümlenin sırasını bozmaz, o yüzden özne olduğu yerde bırakılıyor. Almancada deshalb BAĞLAÇ DEĞİL ZARFTIR: birinci öğedir, çekimli fiil hemen arkasından gelir, özne üçüncü sıraya kayar. Aynı kural trotzdem ve deswegen için de geçerli.",
      },
    ],
  },
  {
    id: "b1-u7-w2",
    level: "B1",
    skill: "writing",
    unit: 7,
    title: "Je mehr, desto …",
    genre: "Görüş metni",
    intro: "Bir şeyin artmasıyla neyin değiştiğini anlat. Orantıyı doğru kur.",
    minutes: 12,
    gloss: [
      { de: "je", tr: "ne kadar", en: "the (more)" },
      { de: "tatsächlich", tr: "gerçekten", en: "actually" },
      { de: "die Vorstellung", tr: "tasavvur / fikir", en: "idea" },
      { de: "sich unterhalten", tr: "sohbet etmek", en: "to converse" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Ne kadar çok sohbet edersem o kadar akıcı konuşuyorum.",
        answer: "Je mehr ich mich unterhalte, desto flüssiger spreche ich.",
        hint: "je yan cümle (fiil sonda), desto ana cümle (fiil karşılaştırmadan hemen sonra).",
      },
      {
        kind: "build",
        tr: "Yol ne kadar uzunsa günden o kadar az kalıyor.",
        answer: "Je länger der Weg ist, desto weniger bleibt vom Tag.",
        hint: "İki yarıda da karşılaştırma biçimi kullanılır.",
      },
      {
        kind: "free",
        prompt: "Bir alışkanlığını anlat ve orantı kur: neyi artırdığında ne değişiyor? En az iki 'je … desto' cümlesi kullan. Alışkanlığın ne olduğunu, ne zaman başladığını, ilk başta nasıl olduğunu ve şimdi nasıl olduğunu yaz.",
        checklist: [
          "Alışkanlık somut anlatılmış mı?",
          "Ne zaman başladığı söylenmiş mi (seitdem, nachdem)?",
          "En az iki 'je … desto' cümlesi var mı?",
          "Başlangıç ile bugün karşılaştırılmış mı?",
          "Bir sonuç zarfı (deshalb / trotzdem) kullanılmış mı?",
        ],
        minWords: 70,
        sample:
          "Seitdem ich mit dem Zug fahre, lese ich jeden Morgen zwanzig Minuten.\n\n" +
          "Am Anfang war das schwer. Ich war müde und völlig ohne Ruhe. " +
          "Nachdem ich das drei Wochen gemacht hatte, wurde es leichter.\n\n" +
          "Heute merke ich zwei Dinge. Je öfter ich lese, desto schneller verstehe ich " +
          "einen langen Satz. Und je mehr ich verstehe, desto interessierter werde ich. " +
          "Das ist tatsächlich der beste Teil.\n\n" +
          "Meine Vorstellung war früher, dass man dafür viel Zeit braucht. " +
          "Das ist falsch. Zwanzig Minuten reichen, deshalb schaffe ich es jeden Tag. " +
          "Manchmal bin ich müde, trotzdem mache ich weiter.",
        phrases: [
          { de: "Je …, desto …", tr: "Ne kadar …, o kadar …", en: "The more …, the more …" },
          { de: "Seitdem ich …", tr: "… -den beri", en: "Since I …" },
          { de: "Das ist tatsächlich …", tr: "Bu gerçekten …", en: "That is actually …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Orantı cümlesinin ikinci yarısını düzelt.",
        source: "Je mehr ich lerne, desto ich verstehe besser.",
        answer: "Je mehr ich lerne, desto besser verstehe ich.",
        why: "Türkçede 'o kadar' cümle sırasını değiştirmez. Almancada desto'dan SONRA önce karşılaştırma biçimi (besser) gelir, sonra çekimli fiil (verstehe), en son özne. je'li yarıda ise fiil sona gider (lerne).",
      },
    ],
  },
];

import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 10.
 *
 * B1 hücresini ONA tamamlayan son parti. Kurallar ve emsal: `de-b1.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 10 şehir ve ulaşım hattı: araç paylaşımı değerlendirmesi, arabasız gün
 * haberi, komşulara yazılan uzun mesaj. Dil bilgisi dolaylı soru ve „ob“ —
 * kibar soru sormanın yazılı biçimi.
 */
export const deB1P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r10",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Ein Jahr Carsharing statt eigenem Auto",
    genre: "review",
    intro: "Uzun bir kullanıcı değerlendirmesi: kime yaradı, nerede tökezledi, hesap nasıl çıktı.",
    gloss: [
      { de: "das Carsharing", tr: "araç paylaşımı", en: "car sharing" },
      { de: "die Stellfläche", tr: "park yeri", en: "parking space" },
      { de: "die Grundgebühr", tr: "sabit ücret", en: "basic fee" },
      { de: "verfügbar", tr: "müsait", en: "available" },
      { de: "spontan", tr: "ani", en: "spontaneous" },
      { de: "der Vergleich", tr: "karşılaştırma", en: "comparison" },
    ],
    minutes: 6,
    text:
      "Vier von fünf Sternen — nach einem Jahr ohne eigenes Auto\n\n" +
      "Wir haben unser Auto vor einem Jahr verkauft und nutzen seitdem nur noch Carsharing. " +
      "Hier der ehrliche Vergleich.\n\n" +
      "Das Geld: Unser altes Auto hat mit Versicherung, Steuer, Werkstatt und Stellfläche " +
      "ungefähr dreitausend Euro im Jahr gekostet. Beim Carsharing sind wir mit Grundgebühr " +
      "und Fahrten bei rund elfhundert Euro gelandet. Wir fahren also wirklich günstiger, " +
      "aber nur, weil wir selten und meistens kurz fahren.\n\n" +
      "Der Alltag: In neun von zehn Fällen steht ein Auto in fünf Minuten Entfernung. " +
      "Das klingt gut und ist es meistens auch. Der zehnte Fall ist das Problem: " +
      "Am Freitagnachmittag und am Sonntagabend ist oft nichts verfügbar. " +
      "Wer spontan zum Baumarkt will, plant lieber um.\n\n" +
      "Was uns überrascht hat: Wir fahren seltener, aber die Fahrten sind besser vorbereitet. " +
      "Früher sind wir wegen einer einzigen Sache losgefahren, heute sammeln wir.\n\n" +
      "Für wen? Für Leute in der Stadt mit gutem Nahverkehr. " +
      "Wer aufs Land fährt oder früh raus muss, wird schnell unzufrieden.",
    questions: [
      {
        text: "Wie viel hat das eigene Auto pro Jahr gekostet?",
        options: ["ungefähr elfhundert Euro", "ungefähr dreitausend Euro", "ungefähr fünfhundert Euro"],
        answer: 1,
        explain: "Sigorta, vergi, servis ve park yeriyle birlikte üç bin euro.",
      },
      {
        text: "Warum ist Carsharing für diese Familie günstiger?",
        options: [
          "weil sie selten und kurz fahren",
          "weil sie keine Versicherung zahlen",
          "weil sie das Auto teuer verkauft haben",
        ],
        answer: 0,
        explain: "„aber nur, weil wir selten und meistens kurz fahren“.",
      },
      {
        kind: "truefalse",
        text: "Es steht immer ein Auto in der Nähe.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "On durumun dokuzunda; cuma öğleden sonra ve pazar akşamı sorun çıkıyor.",
      },
      {
        kind: "gapfill",
        text: "Beim Carsharing zahlt die Familie rund ___ Euro im Jahr.",
        options: [],
        answer: 0,
        accept: ["elfhundert", "1100"],
        explain: "„bei rund elfhundert Euro gelandet“.",
      },
      {
        kind: "short_answer",
        text: "Was hat die Familie überrascht?",
        options: [],
        answer: 0,
        accept: [
          "die Fahrten sind besser vorbereitet",
          "sie planen die Fahrten besser",
          "besser vorbereitete Fahrten",
        ],
        explain: "Daha seyrek ama daha iyi planlanmış yolculuklar.",
      },
      {
        text: "Für wen ist das Modell nicht geeignet?",
        options: [
          "für Familien mit Kindern",
          "für Leute mit gutem Nahverkehr",
          "für Leute, die aufs Land oder früh losfahren",
        ],
        answer: 2,
        explain: "Son cümle tam bu iki grubu sayıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l10",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Reportage: Ein Tag ohne Autos",
    genre: "report",
    intro: "Radyo muhabiri arabasız gün uygulanan bir mahalleden bildiriyor: ne oldu, kim ne dedi.",
    gloss: [
      { de: "die Kreuzung", tr: "kavşak", en: "junction" },
      { de: "sperren", tr: "kapatmak", en: "to close off" },
      { de: "der Anwohner", tr: "mahalle sakini", en: "resident" },
      { de: "die Lieferung", tr: "teslimat", en: "delivery" },
      { de: "skeptisch", tr: "kuşkulu", en: "sceptical" },
      { de: "wiederholen", tr: "tekrarlamak", en: "to repeat" },
    ],
    minutes: 6,
    segments: [
      { text: "Seit heute Morgen um sechs ist die Kantstraße für Autos gesperrt, und zwar für vierundzwanzig Stunden." },
      { text: "Ich stehe auf einer Kreuzung, auf der sonst alle zwei Minuten ein Lastwagen abbiegt. Jetzt sitzen hier Leute auf Klappstühlen." },
      { speaker: "Frau Prinz", text: "Ich wohne seit dreißig Jahren hier und höre heute zum ersten Mal die Vögel in diesem Hof." },
      { text: "Nicht alle sind zufrieden. Ein Bäcker hat mir erzählt, dass seine Lieferung zwei Stunden zu spät kam." },
      { speaker: "Herr Lorenz", text: "Ich war skeptisch, ehrlich gesagt. Aber wenn die Lieferzeiten vorher besser geklärt werden, kann man das öfter machen." },
      { text: "Die Stadt hat gezählt: Auf dem Markt am Ende der Straße waren heute doppelt so viele Besucher wie an einem normalen Samstag." },
      { text: "Ob der Tag wiederholt wird, entscheidet der Stadtrat im November. Die Anwohner werden vorher befragt." },
    ],
    questions: [
      {
        text: "Wie lange bleibt die Straße gesperrt?",
        options: ["zwei Stunden", "vierundzwanzig Stunden", "das ganze Wochenende"],
        answer: 1,
        explain: "„für Autos gesperrt, und zwar für vierundzwanzig Stunden“.",
      },
      {
        text: "Was sagt Frau Prinz?",
        options: [
          "Sie hört zum ersten Mal die Vögel im Hof.",
          "Sie findet die Sperrung zu laut.",
          "Sie will wegziehen.",
        ],
        answer: 0,
        explain: "Otuz yıldır orada oturuyor ve ilk kez kuşları duyuyor.",
      },
      {
        kind: "truefalse",
        text: "Alle Geschäfte waren mit dem Tag zufrieden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Fırıncının teslimatı iki saat gecikmiş.",
      },
      {
        kind: "gapfill",
        text: "Auf dem Markt waren ___ so viele Besucher wie sonst.",
        options: [],
        answer: 0,
        accept: ["doppelt"],
        explain: "„doppelt so viele Besucher wie an einem normalen Samstag“.",
      },
      {
        kind: "short_answer",
        text: "Wer entscheidet über eine Wiederholung?",
        options: [],
        answer: 0,
        accept: ["der Stadtrat", "Stadtrat", "der Stadtrat im November"],
        explain: "„entscheidet der Stadtrat im November“; öncesinde sakinlere sorulacak.",
      },
      {
        text: "Unter welcher Bedingung ist Herr Lorenz dafür?",
        options: [
          "wenn die Lieferzeiten vorher geklärt werden",
          "wenn die Straße länger gesperrt bleibt",
          "wenn der Markt umzieht",
        ],
        answer: 0,
        explain: "„Aber wenn die Lieferzeiten vorher besser geklärt werden, kann man das öfter machen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w10",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Nachricht an die Hausgemeinschaft",
    genre: "message",
    intro: "Apartman grubuna ortak bir konuyu yazıyorsun: önce iki cümle kur, sonra net ve kibar bir mesaj yaz.",
    gloss: [
      { de: "der Hof", tr: "avlu", en: "courtyard" },
      { de: "der Abstellplatz", tr: "park yeri", en: "parking spot" },
      { de: "die Abstimmung", tr: "oylama", en: "vote" },
      { de: "zustimmen", tr: "onaylamak", en: "to agree" },
      { de: "die Rückmeldung", tr: "geri bildirim", en: "response" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bunu isteyip istemediğinizi bilmek istiyorum.",
        answer: "Ich möchte wissen, ob Sie das wollen.",
        alternatives: ["Ich würde gern wissen, ob Sie das wollen."],
        hint: "Evet-hayır sorusu dolaylı hâle gelince „ob“ ile kurulur ve fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Anahtarın kimde olduğunu kimse bilmiyor.",
        answer: "Niemand weiß, wer den Schlüssel hat.",
        alternatives: ["Keiner weiß, wer den Schlüssel hat."],
        hint: "Soru sözcüğüyle kurulan dolaylı soruda da fiil yan cümlenin sonuna gider.",
      },
      {
        kind: "free",
        prompt:
          "Apartman grubuna bir mesaj yaz: konuyu bir cümlede söyle, mevcut durumu kısaca anlat, somut öneriyi yaz, itirazı olabilecek komşuları düşün ve nasıl karar verileceğini söyle.",
        checklist: [
          "Konuyu ilk cümlede net söyle",
          "Mevcut durumu kısaca anlat",
          "Somut öneriyi ve neyi değiştireceğini yaz",
          "Karar yöntemini ve süreyi yaz",
        ],
        minWords: 90,
        phrases: [
          { de: "Es geht um …", tr: "Konu …", en: "This is about …" },
          { de: "Zurzeit ist es so, dass …", tr: "Şu anda durum şöyle: …", en: "At the moment the situation is that …" },
          { de: "Mein Vorschlag ist, …", tr: "Önerim …", en: "My suggestion is …" },
          { de: "Ich weiß nicht, ob alle damit einverstanden sind.", tr: "Herkesin buna razı olup olmadığını bilmiyorum.", en: "I don't know whether everyone agrees." },
          { de: "Bitte gebt mir bis … kurz Rückmeldung.", tr: "Lütfen …'e kadar kısa bir geri bildirim verin.", en: "Please give me brief feedback by …" },
        ],
        sample:
          "Hallo zusammen,\n\nes geht um die Fahrräder im Hof. " +
          "Zurzeit ist es so, dass acht Räder an der Wand stehen und der Weg zur Mülltonne schmal wird. " +
          "Zweimal ist schon jemand mit dem Kinderwagen hängen geblieben. " +
          "Mein Vorschlag ist, die alte Holzbank abzubauen und dort einen Ständer für sechs Räder " +
          "aufzustellen. Die Kosten liegen bei ungefähr achtzig Euro, das wären fünf Euro pro Wohnung. " +
          "Ich weiß nicht, ob alle damit einverstanden sind — vor allem die Bank wird von einigen " +
          "im Sommer genutzt, und ich verstehe, wenn das jemandem leidtut. " +
          "Eine zweite Möglichkeit wäre, die Bank an die andere Wand zu stellen. " +
          "Bitte gebt mir bis Sonntag kurz Rückmeldung, dann zählen wir einfach die Stimmen.\n\n" +
          "Viele Grüße\nYasemin aus Wohnung 9",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s10",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Autofreie Innenstadt — ja oder nein?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir şehir kararını tart ve bir koşul öner.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Senin şehrinin merkezi arabalara kapatılmalı mı? Görüşünü söyle, kimin zorlanacağını düşün ve hangi koşulla kabul edilebilir olduğunu anlat.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Bir gerekçe ver",
        "Kimin zorlanacağını düşün ve söyle",
        "Hangi koşulla kabul edilebilir olduğunu anlat",
      ],
      targets: [
        { de: "Ich bin grundsätzlich dafür, allerdings …", tr: "Temelde yanayım, ancak …" },
        { de: "Man darf dabei nicht vergessen, dass …", tr: "Bu sırada … olduğu unutulmamalı" },
        { de: "Schwierig wird es für …", tr: "… için zor olur" },
        { de: "Akzeptabel wäre es für mich, wenn …", tr: "Benim için … olursa kabul edilebilir" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Ich bin grundsätzlich dafür, allerdings nicht als Verbot von heute auf morgen. " +
        "In unserer Innenstadt fahren viele Autos im Kreis und suchen einen Parkplatz; " +
        "diese Fahrten bringen niemandem etwas und machen die Luft schlechter. " +
        "Man darf dabei aber nicht vergessen, dass nicht jeder frei wählen kann, wie er in die Stadt kommt. " +
        "Schwierig wird es für Leute, die schwer tragen, für ältere Nachbarn und für Handwerker, " +
        "die ihr Werkzeug dabeihaben. Wenn man diese Gruppen vergisst, wird aus einer guten Idee " +
        "schnell ein Streit, bei dem am Ende niemand mehr über Luft spricht. " +
        "Akzeptabel wäre es für mich, wenn es Ausnahmen für Lieferungen und für Menschen mit " +
        "Behinderung gibt und wenn gleichzeitig die Busse am Abend öfter fahren. " +
        "Ohne dieses zweite Stück ist die Sperrung nur eine halbe Lösung.",
      rubricHint:
        "Bir koşul ve karşı tarafın dikkate alınması beklenir; „grundsätzlich … allerdings“, „nicht vergessen, dass“ ve Konjunktiv II („wäre“) yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g10",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Können Sie mir sagen, ob …?",
    genre: "grammar",
    intro: "Soruyu bir cümlenin içine koyduğunda sıra değişir; kibar ve yazılı dilin temel yapısı budur.",
    focus: "Dolaylı sorular: ob ve soru sözcüğüyle",
    gloss: [
      { de: "die Auskunft", tr: "bilgi", en: "information" },
      { de: "abfahren", tr: "kalkmak", en: "to depart" },
      { de: "geöffnet", tr: "açık", en: "open" },
      { de: "das Büro", tr: "büro", en: "office" },
      { de: "nachfragen", tr: "sormak", en: "to inquire" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Soru sözcüğü varsa bağlaç odur",
        tr: "„Wann fährt der Zug?“ sorusu bir cümlenin içine girdiğinde soru sözcüğü aynı kalır ama fiil yan cümlenin SONUNA gider ve soru işareti yalnız ana cümleye bakar. Bu, hem kibarlık hem de yazı dili için temel yapıdır.",
        examples: [
          { de: "Können Sie mir sagen, wann der Zug abfährt?", tr: "Trenin ne zaman kalktığını söyleyebilir misiniz?", note: "abfährt → sonda" },
          { de: "Ich weiß nicht, wo das Büro ist.", tr: "Büronun nerede olduğunu bilmiyorum.", note: "ist → sonda" },
          { de: "Sie hat gefragt, wie viel das kostet.", tr: "Ne kadar tuttuğunu sordu.", note: "kostet → sonda" },
        ],
      },
      {
        heading: "Evet-hayır sorusu „ob“ ile girer",
        tr: "Soru sözcüğü olmayan sorularda bağlaç yoktur, bu yüzden „ob“ eklenir: „Ist das Büro geöffnet?“ → „Ich frage mich, OB das Büro geöffnet ist.“ Türkçedeki „-ip -mediğini“ yapısının karşılığıdır. „wenn“ ile karıştırılmaz: „wenn“ koşul ya da zaman bildirir.",
        examples: [
          { de: "Ich weiß nicht, ob das Büro heute geöffnet ist.", tr: "Büronun bugün açık olup olmadığını bilmiyorum.", note: "ob = -ip -mediği" },
          { de: "Könnten Sie nachfragen, ob noch Plätze frei sind?", tr: "Yer kalıp kalmadığını sorabilir misiniz?", note: "kibar rica" },
          { de: "Wenn das Büro geöffnet ist, gehe ich hin.", tr: "Büro açıksa giderim.", note: "wenn: koşul, karıştırma" },
        ],
      },
      {
        heading: "Ayrılabilen fiil ve modal fiil",
        tr: "Yan cümlede ayrılabilen fiil BİRLEŞİR: „Wann fährt der Zug ab?“ → „… wann der Zug abfährt.“ Modal yapıda ve Perfekt'te ise çekimli fiil en sona gider, mastar ya da Partizip onun önünde durur.",
        examples: [
          { de: "Ich frage, wann der Bus ankommt.", tr: "Otobüsün ne zaman geleceğini soruyorum.", note: "an + kommt birleşti" },
          { de: "Sag mir bitte, ob du morgen kommen kannst.", tr: "Yarın gelip gelemeyeceğini söyle.", note: "kommen kannst" },
          { de: "Er hat gefragt, warum ich abgesagt habe.", tr: "Neden iptal ettiğimi sordu.", note: "abgesagt habe" },
        ],
      },
    ],
    questions: [
      {
        text: "Können Sie mir sagen, wann der Zug ___?",
        options: ["abfährt", "fährt ab", "ab fährt"],
        answer: 0,
        explain: "Yan cümlede ayrılabilen fiil birleşir ve sona gider.",
      },
      {
        text: "Ich weiß nicht, ___ das Büro heute geöffnet ist.",
        options: ["wenn", "ob", "dass"],
        answer: 1,
        explain: "Evet-hayır sorusu dolaylı hâle gelince „ob“ ile girer.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Ich weiß nicht, wo ist das Büro.",
          "Ich weiß nicht, wo das Büro ist.",
          "Ich weiß nicht, wo das Büro es ist.",
        ],
        answer: 1,
        explain: "Dolaylı soruda fiil en sona gider, öne geçmez.",
      },
      {
        kind: "gapfill",
        text: "Sag mir bitte, ___ du morgen kommen kannst. (ob / wenn)",
        options: [],
        answer: 0,
        accept: ["ob"],
        explain: "Gelip gelemeyeceği soruluyor; koşul değil, evet-hayır sorusu.",
      },
      {
        kind: "gapfill",
        text: "Er hat gefragt, warum ich ___ habe. (absagen)",
        options: [],
        answer: 0,
        accept: ["abgesagt"],
        explain: "Perfekt yan cümlede Partizip, çekimli yardımcı fiilden önce durur.",
      },
      {
        kind: "gapfill",
        text: "Ich frage, wann der Bus ___. (ankommen)",
        options: [],
        answer: 0,
        accept: ["ankommt"],
        explain: "Ayrılabilen fiil yan cümlede birleşir: ankommt.",
      },
      {
        kind: "gapfill",
        text: "Könnten Sie nachfragen, ___ noch Plätze frei sind?",
        options: [],
        answer: 0,
        accept: ["ob"],
        explain: "Soru sözcüğü yok; bağlaç ob'dur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Sie", "hat", "gefragt", "wie viel", "das kostet"],
        explain: "Ana cümle normal sırada, dolaylı soruda fiil sonda: Sie hat gefragt, wie viel das kostet.",
      },
      {
        kind: "truefalse",
        text: "„Ich weiß nicht, wenn das Büro geöffnet ist.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Burada koşul değil soru var; doğrusu „ob das Büro geöffnet ist“.",
      },
      {
        kind: "truefalse",
        text: "„Können Sie mir sagen, wo die Auskunft ist?“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Soru sözcüğü bağlaç görevi görüyor, fiil yan cümlenin sonunda.",
      },
    ],
  },
];

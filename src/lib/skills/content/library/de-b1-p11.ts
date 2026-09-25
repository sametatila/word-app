import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 11.
 *
 * B1 hücresini YİRMİYE tamamlayan on partinin ilki (p11–p20). Kurallar ve
 * emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 11 hafıza ve yerel tarih hattı: kapanan bir fotoğrafçının arşivi,
 * tavan arasından çıkan mektuplar, şehir arşivine yazılan bir soru. Dil bilgisi
 * Plusquamperfekt ve nachdem — geçmişin geçmişi.
 */
export const deB1P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r11",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Viertausend Gesichter aus dem Fotoladen",
    genre: "article",
    intro: "Yerel bir gazete yazısı: kapanan bir fotoğrafçının arşivi ne oldu, gönüllüler ne yapıyor, kim itiraz ediyor.",
    gloss: [
      { de: "die Aufnahme", tr: "fotoğraf", en: "photograph" },
      { de: "einscannen", tr: "taramak", en: "to scan" },
      { de: "erkennen", tr: "tanımak", en: "to recognize" },
      { de: "der Zettel", tr: "not kâğıdı", en: "slip of paper" },
      { de: "öffentlich", tr: "herkesin önünde", en: "in public" },
      { de: "vorerst", tr: "şimdilik", en: "for now" },
    ],
    minutes: 6,
    text:
      "Viertausend Gesichter aus dem Fotoladen\n\n" +
      "Als das Fotostudio Brandt in der Bahnhofstraße vor drei Jahren schloss, wollte niemand die alten " +
      "Aufnahmen haben. Die Kisten standen monatelang in einem Keller, bis zwei Mitglieder des " +
      "Geschichtsvereins davon hörten.\n\n" +
      "Inzwischen haben die Freiwilligen fast viertausend Fotos eingescannt: Hochzeiten, Schulklassen, " +
      "Geschäfte, die es längst nicht mehr gibt. Das Problem ist, dass auf keinem Bild ein Name steht. " +
      "Der alte Fotograf hatte nur Datum und Nummer notiert.\n\n" +
      "Deshalb hängen jeden ersten Samstag im Monat zweihundert Bilder im Gemeindesaal. Wer jemanden " +
      "erkennt, schreibt den Namen auf einen Zettel. „Nachdem die Zeitung über die erste Ausstellung " +
      "berichtet hatte, standen die Leute bis auf die Straße“, erzählt die Vorsitzende Gisela Hoffmann. " +
      "Eine Besucherin fand ihre Eltern auf einem Hochzeitsbild, das sie selbst noch nie gesehen hatte.\n\n" +
      "Nicht alle freuen sich darüber. Einige möchten nicht, dass Fotos von ihnen öffentlich hängen. " +
      "Der Verein zeigt deshalb nur Bilder, die älter als fünfzig Jahre sind, und nimmt jedes Foto " +
      "sofort ab, wenn jemand darum bittet.\n\n" +
      "Ins Internet sollen die Bilder vorerst nicht. „Hier im Saal reden die Leute miteinander“, " +
      "sagt Hoffmann. „Das ist die halbe Arbeit.“",
    questions: [
      {
        text: "Warum hängt der Verein die Fotos im Saal auf?",
        options: [
          "weil auf den Bildern keine Namen stehen",
          "weil der Fotograf es so gewollt hat",
          "weil die Stadt den Saal bezahlt",
        ],
        answer: 0,
        explain: "„Das Problem ist, dass auf keinem Bild ein Name steht.“ Ziyaretçiler tanıdıkları kişilerin adını yazıyor.",
      },
      {
        text: "Was hatte der alte Fotograf notiert?",
        options: ["die Namen der Kunden", "nur Datum und Nummer", "den Preis der Bilder"],
        answer: 1,
        explain: "„Der alte Fotograf hatte nur Datum und Nummer notiert.“",
      },
      {
        kind: "truefalse",
        text: "Der Verein zeigt auch Fotos aus den letzten zwanzig Jahren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yalnız elli yıldan eski fotoğraflar gösteriliyor.",
      },
      {
        kind: "gapfill",
        text: "Die Freiwilligen haben fast ___ Fotos eingescannt.",
        options: [],
        answer: 0,
        accept: ["viertausend", "4000", "4.000"],
        explain: "„Inzwischen haben die Freiwilligen fast viertausend Fotos eingescannt.“",
      },
      {
        kind: "short_answer",
        text: "Was macht der Verein, wenn jemand nicht möchte, dass ein Foto von ihm hängt?",
        options: [],
        answer: 0,
        accept: ["das Foto sofort abnehmen", "er nimmt das Foto ab", "das Foto abnehmen", "er nimmt das Foto sofort ab", "Foto abnehmen", "sofort abnehmen"],
        explain: "„… und nimmt jedes Foto sofort ab, wenn jemand darum bittet.“",
      },
      {
        text: "Warum sollen die Bilder vorerst nicht ins Internet?",
        options: [
          "weil das Einscannen noch nicht fertig ist",
          "weil der Verein zu wenig Geld hat",
          "weil die Leute im Saal miteinander reden",
        ],
        answer: 2,
        explain: "Hoffmann'a göre salondaki sohbet işin yarısı: „Das ist die halbe Arbeit.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l11",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Die Briefe vom Dachboden",
    genre: "interview",
    intro: "Radyoda bir söyleşi: bir kadın tavan arasında dedesinin mektuplarını bulmuş; ailede ne anlatılmıştı, gerçekte ne olmuştu.",
    gloss: [
      { de: "der Dachboden", tr: "tavan arası", en: "attic" },
      { de: "die Schrift", tr: "yazı", en: "handwriting" },
      { de: "sehnsüchtig", tr: "özlem dolu", en: "longing" },
      { de: "abtippen", tr: "yazıya geçirmek", en: "to type up" },
      { de: "gleichzeitig", tr: "aynı anda", en: "at the same time" },
      { de: "wegwerfen", tr: "atmak", en: "to throw away" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Moderator", text: "In unserer Reihe „Fundstücke“ ist heute Petra Kessler zu Gast. Frau Kessler, Sie haben auf dem Dachboden Ihrer Mutter etwas gefunden." },
      { speaker: "Frau Kessler", text: "Ja, einen alten Schuhkarton mit sechzig Briefen. Mein Großvater hatte sie in den fünfziger Jahren aus Kanada an meine Großmutter geschrieben." },
      { speaker: "Moderator", text: "Wussten Sie, dass er in Kanada gewesen war?" },
      { speaker: "Frau Kessler", text: "Überhaupt nicht. Bei uns hat man immer erzählt, dass er damals zwei Jahre in Hamburg gearbeitet hat." },
      { speaker: "Frau Kessler", text: "Nachdem er zurückgekommen war, hat er nie wieder darüber gesprochen. Die Briefe klingen aber nicht unglücklich, eher sehnsüchtig." },
      { speaker: "Frau Kessler", text: "Das Schwierigste war die Schrift. Er hat in einer alten Schreibschrift geschrieben, die ich nicht lesen konnte. Eine Nachbarin von achtundachtzig Jahren hat mir geholfen." },
      { speaker: "Moderator", text: "Und was machen Sie jetzt mit den Briefen?" },
      { speaker: "Frau Kessler", text: "Ich tippe sie ab, einen pro Woche, und schicke ihn an meine Cousins. So lesen wir alle gleichzeitig, wie eine Geschichte in Fortsetzungen." },
      { speaker: "Frau Kessler", text: "Meine Mutter wollte den Karton übrigens erst wegwerfen. Zum Glück habe ich vorher hineingeschaut." },
    ],
    questions: [
      {
        text: "Was hat Frau Kessler gefunden?",
        options: [
          "ein Fotoalbum aus Hamburg",
          "einen Karton mit Briefen ihres Großvaters",
          "das Tagebuch ihrer Großmutter",
        ],
        answer: 1,
        explain: "„einen alten Schuhkarton mit sechzig Briefen“ — dedesi Kanada'dan büyükannesine yazmış.",
      },
      {
        text: "Was hatte die Familie über den Großvater erzählt?",
        options: [
          "Er hatte zwei Jahre in Hamburg gearbeitet.",
          "Er war nie von zu Hause weg gewesen.",
          "Er hatte in Kanada eine Firma gegründet.",
        ],
        answer: 0,
        explain: "„Bei uns hat man immer erzählt, dass er damals zwei Jahre in Hamburg gearbeitet hat.“",
      },
      {
        kind: "truefalse",
        text: "Nach seiner Rückkehr hat der Großvater nicht mehr über die Zeit gesprochen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Nachdem er zurückgekommen war, hat er nie wieder darüber gesprochen.“",
      },
      {
        kind: "gapfill",
        text: "Frau Kessler schickt jede Woche ___ Brief an ihre Cousins.",
        options: [],
        answer: 0,
        accept: ["einen", "1"],
        explain: "„Ich tippe sie ab, einen pro Woche, und schicke ihn an meine Cousins.“",
      },
      {
        kind: "short_answer",
        text: "Wer hat ihr beim Lesen der Schrift geholfen?",
        options: [],
        answer: 0,
        accept: ["eine Nachbarin", "die Nachbarin", "eine alte Nachbarin", "Nachbarin", "ihre Nachbarin", "eine ältere Nachbarin"],
        explain: "„Eine Nachbarin von achtundachtzig Jahren hat mir geholfen.“",
      },
      {
        text: "Warum schickt sie die Briefe einzeln?",
        options: [
          "weil sie noch nicht alle gefunden hat",
          "weil das Porto sonst zu teuer ist",
          "damit alle sie wie eine Geschichte in Fortsetzungen lesen",
        ],
        answer: 2,
        explain: "„So lesen wir alle gleichzeitig, wie eine Geschichte in Fortsetzungen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w11",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Anfrage an das Stadtarchiv",
    genre: "email",
    intro: "Oturduğun evin geçmişini araştırıyorsun: önce iki cümle kur, sonra şehir arşivine resmî bir e-posta yaz.",
    gloss: [
      { de: "die Unterlagen", tr: "belgeler", en: "documents" },
      { de: "der Besitzer", tr: "sahip", en: "owner" },
      { de: "die Akte", tr: "dosya", en: "file" },
      { de: "herausfinden", tr: "öğrenmek", en: "to find out" },
      { de: "vor Ort", tr: "yerinde", en: "on site" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Eski sahibi taşındıktan sonra ev on yıl boş kaldı.",
        answer: "Nachdem der alte Besitzer ausgezogen war, stand das Haus zehn Jahre leer.",
        alternatives: ["Das Haus stand zehn Jahre leer, nachdem der alte Besitzer ausgezogen war."],
        hint: "„nachdem“ önce olan işi taşır ve Plusquamperfekt ister (war + Partizip); ana cümle Präteritum'da kalır.",
      },
      {
        kind: "build",
        tr: "Evin hangi yıl yapıldığını öğrenmek isterim.",
        answer: "Ich würde gern erfahren, in welchem Jahr das Haus gebaut wurde.",
        alternatives: ["Gern würde ich erfahren, in welchem Jahr das Haus gebaut wurde."],
        hint: "Dolaylı soruda çekimli fiil sona gider; edilgen geçmişte „wurde“ en sonda durur.",
      },
      {
        kind: "free",
        prompt:
          "Şehir arşivine bir e-posta yaz: kim olduğunu ve hangi evde oturduğunu söyle, şimdiye kadar ne öğrendiğini anlat, hangi belgeleri aradığını sor, arşive ne zaman gelebileceğini yaz ve kibarca kapat.",
        checklist: [
          "Kendini ve evin adresini tanıt",
          "Şimdiye kadar öğrendiklerini kısaca anlat",
          "Aradığın belgeleri net biçimde sor",
          "Ne zaman gelebileceğini yaz ve kibarca kapat",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich beschäftige mich seit einiger Zeit mit …", tr: "Bir süredir … ile uğraşıyorum.", en: "For some time I have been looking into …" },
          { de: "Bisher habe ich herausgefunden, dass …", tr: "Şimdiye kadar … olduğunu öğrendim.", en: "So far I have found out that …" },
          { de: "Gibt es bei Ihnen Unterlagen zu …?", tr: "Sizde … ile ilgili belge var mı?", en: "Do you have any documents on …?" },
          { de: "Wäre es möglich, die Akten vor Ort anzusehen?", tr: "Dosyalara yerinde bakmak mümkün olur mu?", en: "Would it be possible to look at the files on site?" },
          { de: "Für einen Hinweis wäre ich Ihnen sehr dankbar.", tr: "Bir ipucu verirseniz çok minnettar olurum.", en: "I would be very grateful for any pointer." },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "mein Name ist Deniz Arslan, und ich wohne seit zwei Jahren im Haus Lindenweg 7. " +
          "Ich beschäftige mich seit einiger Zeit mit der Geschichte dieses Hauses. " +
          "Bisher habe ich herausgefunden, dass hier bis 1960 eine Bäckerei war. " +
          "Nachdem der alte Besitzer ausgezogen war, stand das Haus zehn Jahre leer; " +
          "das haben mir ältere Nachbarn erzählt. " +
          "Ich würde gern erfahren, in welchem Jahr das Haus gebaut wurde und wem es damals gehörte. " +
          "Gibt es bei Ihnen Unterlagen zu diesem Grundstück, zum Beispiel alte Pläne oder Fotos? " +
          "Wäre es möglich, die Akten vor Ort anzusehen? Ich hätte donnerstags und freitags " +
          "ab vierzehn Uhr Zeit.\n\n" +
          "Für einen Hinweis wäre ich Ihnen sehr dankbar.\n" +
          "Mit freundlichen Grüßen\nDeniz Arslan",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s11",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Muss man wissen, woher man kommt?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: kendi ailenden bir örnekle bir soruyu tart.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Kendi ailenin geçmişini bilmek sence ne kadar önemli? Görüşünü söyle, ailenden bildiğin ya da bilmediğin bir hikâyeyi anlat ve bu bilginin bugün sana ne kattığını açıkla.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Ailenden bir hikâye ya da bir boşluk anlat",
        "Karşı görüşü kısaca an",
        "Başkalarına bir öneriyle bitir",
      ],
      targets: [
        { de: "Für mich spielt … eine große Rolle.", tr: "Benim için … büyük rol oynuyor." },
        { de: "Erst nachdem …, habe ich verstanden, dass …", tr: "Ancak …'den sonra … olduğunu anladım" },
        { de: "Was mir bis heute fehlt, ist …", tr: "Bugün hâlâ eksik olan şey …" },
        { de: "Ich kann nur jedem empfehlen, …", tr: "Herkese içtenlikle … öneririm" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Für mich spielt die Familiengeschichte eine größere Rolle, als ich früher gedacht habe. " +
        "Lange hat mich das überhaupt nicht interessiert. Erst nachdem meine Großmutter gestorben war, " +
        "habe ich verstanden, dass mit ihr viele Geschichten verschwunden sind. Ich weiß zum Beispiel, " +
        "dass sie mit zwanzig allein in eine fremde Stadt gezogen ist, aber nicht, warum. " +
        "Was mir bis heute fehlt, ist ihre eigene Stimme dazu. Manche sagen, die Vergangenheit ändert " +
        "nichts an dem, was man heute ist. Das stimmt zum Teil, denn meine Entscheidungen treffe ich selbst. " +
        "Trotzdem verstehe ich manche Gewohnheiten in meiner Familie besser, seit ich mehr weiß. " +
        "Ich kann nur jedem empfehlen, die Älteren zu fragen, solange es noch geht, und die Antworten " +
        "aufzuschreiben.",
      rubricHint:
        "Kişisel bir hikâye ve bir karşı görüş beklenir; „nachdem“ ile Plusquamperfekt, „seit“ ve „solange“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g11",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Als wir ankamen, war der Zug schon weg",
    genre: "grammar",
    intro: "İki geçmiş olayı art arda anlatırken önce olanı bir adım daha geriye çekersin; bunun yolu Plusquamperfekt'tir.",
    focus: "Plusquamperfekt ve nachdem: geçmişin geçmişi",
    gloss: [
      { de: "ankommen", tr: "varmak", en: "to arrive" },
      { de: "vergessen", tr: "unutmak", en: "to forget" },
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
      { de: "losfahren", tr: "yola çıkmak", en: "to set off" },
      { de: "einschlafen", tr: "uykuya dalmak", en: "to fall asleep" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Geçmişin geçmişi",
        tr: "İki geçmiş olaydan ÖNCE olanı Plusquamperfekt'le söylersin: „hatte“ ya da „war“ + Partizip II. Türkçedeki „-mişti“ ekine benzer: „vardığımızda tren çoktan kalkmıştı“. Sonra olan olay Präteritum ya da Perfekt'te kalır.",
        examples: [
          { de: "Als wir ankamen, war der Zug schon abgefahren.", tr: "Vardığımızda tren çoktan kalkmıştı.", note: "önce olan: abgefahren" },
          { de: "Ich hatte den Schlüssel vergessen und musste warten.", tr: "Anahtarı unutmuştum ve beklemek zorunda kaldım.", note: "hatte + Partizip" },
          { de: "Sie war vorher noch nie in Wien gewesen.", tr: "Daha önce hiç Viyana'da bulunmamıştı.", note: "sein → war gewesen" },
        ],
      },
      {
        heading: "hatte mı, war mı?",
        tr: "Yardımcı fiil Perfekt'tekiyle aynıdır, yalnız Präteritum'a geçer: „habe gemacht“ → „hatte gemacht“, „bin gefahren“ → „war gefahren“. Yer değiştirme ve durum değişikliği bildiren fiiller „war“ ile, fiillerin çoğu „hatte“ ile kurulur.",
        examples: [
          { de: "Er hatte schon gegessen.", tr: "O çoktan yemek yemişti.", note: "haben → hatte" },
          { de: "Wir waren früh losgefahren.", tr: "Erkenden yola çıkmıştık.", note: "yer değiştirme → war" },
          { de: "Das Kind war schon eingeschlafen.", tr: "Çocuk çoktan uykuya dalmıştı.", note: "durum değişikliği → war" },
        ],
      },
      {
        heading: "nachdem: önce olan yan cümlede",
        tr: "„nachdem“ yan cümlesi önce olan olayı taşır, bu yüzden ana cümle geçmişteyse Plusquamperfekt ister. Ana cümle şimdiki zamandaysa yan cümle Perfekt'e iner. „nachdem“ bir yan cümle bağlacıdır: çekimli fiil sona gider.",
        examples: [
          { de: "Nachdem sie angekommen war, rief sie uns an.", tr: "Vardıktan sonra bizi aradı.", note: "war sonda, ana cümle Präteritum" },
          { de: "Nachdem ich den Brief gelesen hatte, habe ich lange nachgedacht.", tr: "Mektubu okuduktan sonra uzun uzun düşündüm.", note: "hatte sonda" },
          { de: "Nachdem ich die Arbeit beendet habe, gehe ich einkaufen.", tr: "İşi bitirdikten sonra alışverişe gidiyorum.", note: "şimdiki zaman → Perfekt" },
        ],
      },
    ],
    questions: [
      {
        text: "Als wir ankamen, ___ der Zug schon abgefahren.",
        options: ["hatte", "war", "wird"],
        answer: 1,
        explain: "„abfahren“ yer değiştirme bildirir; Plusquamperfekt'te yardımcı fiil war olur.",
      },
      {
        text: "Weil er den Schlüssel ___ hatte, konnte er nicht hinein.",
        options: ["vergessen", "vergaß", "vergisst"],
        answer: 0,
        explain: "„hatte“nın yanında Partizip II gelir: vergessen.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Nachdem sie gegessen hatte, sie ging los.",
          "Nachdem sie hatte gegessen, ging sie los.",
          "Nachdem sie gegessen hatte, ging sie los.",
        ],
        answer: 2,
        explain: "Yan cümlede çekimli fiil sonda; ana cümle fiille başlar: … hatte, ging sie los.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ die Tür schon abgeschlossen, als das Telefon klingelte. (haben)",
        options: [],
        answer: 0,
        accept: ["hatte"],
        explain: "Kapıyı kilitlemek telefonun çalmasından önce oldu; Plusquamperfekt: hatte abgeschlossen.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ früh losgefahren und kamen pünktlich an. (sein)",
        options: [],
        answer: 0,
        accept: ["waren"],
        explain: "„losfahren“ yer değiştirme bildirir; çoğul birinci kişide war → waren.",
      },
      {
        kind: "gapfill",
        text: "Nachdem sie den Brief ___ hatte, rief sie ihre Schwester an. (lesen)",
        options: [],
        answer: 0,
        accept: ["gelesen"],
        explain: "Plusquamperfekt'te Partizip II çekimli yardımcı fiilin önünde durur: gelesen hatte.",
      },
      {
        kind: "gapfill",
        text: "Nachdem ich die Arbeit beendet ___, gehe ich einkaufen. (haben)",
        options: [],
        answer: 0,
        accept: ["habe"],
        explain: "Ana cümle şimdiki zamanda; bu yüzden yan cümle Perfekt'e iner: beendet habe.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Nachdem", "der Bus", "abgefahren war", "standen", "wir allein da"],
        explain: "Yan cümle başta ve fiili sonda; ana cümle hemen fiille (standen) başlar.",
      },
      {
        kind: "truefalse",
        text: "„Nachdem ich gegessen, ging ich schlafen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yardımcı fiil eksik; doğrusu „Nachdem ich gegessen hatte, ging ich schlafen.“",
      },
      {
        kind: "truefalse",
        text: "„Das Kind war schon eingeschlafen, als wir nach Hause kamen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Uykuya dalmak eve gelmekten önce oldu; durum değişikliği olduğu için war + Partizip.",
      },
    ],
  },
];

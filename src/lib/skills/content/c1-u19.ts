import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 19 — "Varsayım dili ve üç tartışma: aidiyet, iklim, eğitim".
 *
 * Dört ders: Angenommen, es stimmt · Zwischen den Stühlen ·
 * Wer trägt die Verantwortung? · Bildung neu denken.
 *
 *   Kelime: die Hypothese, unterstellen, der Gedankengang, zutreffen,
 *           hypothetisch, die Schätzung, hervorrufen, sich unterziehen ·
 *           die Zugehörigkeit, die Teilhabe, ausgrenzen, die Zuschreibung,
 *           beheimatet, die Abstammung, die Verwandtschaft, sich niederlassen ·
 *           der Zielkonflikt, systemisch, der Einzelne, die Verlagerung,
 *           verursachen, zunehmend, die Adaption, unterbinden ·
 *           die Chancengleichheit, versäumen, die Weiche, überfällig,
 *           umdenken, voreingenommen, das Fachgebiet, die Maxime
 *
 * Ünitenin çekirdeği: TARAF OLDUĞUN BİR KONUDA DÜŞÜNMEK. İlk ders aracı
 * veriyor — "Angenommen, …" bir görüşü benimsemeden sonuna kadar
 * götürmeyi mümkün kılıyor. Kalan üç ders o aracın gerçekten gerektiği
 * yerler: aidiyet, iklimde sorumluluğun kaydırılması, eğitimde kaçırılmış
 * zaman.
 *
 * Aidiyet dersi öğrencinin kendi hayatına en yakın olanı, ve dilbilgisi
 * hattı da tam oradan geliyor: "So sehr …, so oft …" ve "Beides ist
 * zugleich möglich" — Almanca iki şeyi aynı anda, birbirini çürütmeden
 * söyleyebilen yapılara sahip. Tartışma çoğu zaman bu yapının yokluğunda
 * kayboluyor, çünkü Türkçe konuşan da Alman muhatabı da soruyu "ya o ya
 * bu" diye kuruyor.
 */
export const c1U19: SkillExercise[] = [
  {
    id: "c1-u19-r1",
    level: "C1",
    skill: "reading",
    unit: 19,
    title: "Angenommen, es stimmt",
    genre: "Deneme",
    intro: "Varsayım dili: bir görüşü benimsemeden sonuna kadar götürmek.",
    gloss: [
      { de: "die Hypothese", tr: "varsayım", en: "hypothesis" },
      { de: "unterstellen", tr: "varsaymak, isnat etmek", en: "to assume, to impute" },
      { de: "der Gedankengang", tr: "düşünce zinciri", en: "line of thought" },
      { de: "zutreffen", tr: "geçerli olmak", en: "to hold true" },
      { de: "hypothetisch", tr: "varsayımsal", en: "hypothetical" },
      { de: "voreingenommen", tr: "önyargılı", en: "biased" },
      { de: "die Maxime", tr: "ilke", en: "maxim" },
    ],
    minutes: 7,
    text:
      "DER SATZ, DER NICHTS BEHAUPTET\n\n" +
      "„Angenommen, Sie haben recht — was folgt daraus?“\n\n" +
      "Dieser Satz gibt nichts zu und nimmt nichts zurück. Er stellt eine Behauptung für die Dauer eines Gedankengangs auf und schaut, wohin sie führt.\n\n" +
      "In deutschen Diskussionen ist das ein anerkanntes Verfahren, kein rhetorischer Trick. Wer „angenommen“ sagt, signalisiert: Ich prüfe Ihre Position von innen, nicht von außen. Und wer daraufhin sagt „Sie geben mir also recht“, hat die Konstruktion nicht verstanden — was sich beim Gegenüber schnell herumspricht.\n\n" +
      "Die Formen unterscheiden sich im Gewicht. „Angenommen, …“ ist alltäglich und leicht. „Gesetzt den Fall, …“ ist formeller und klingt nach Prüfung. „Man stelle sich vor, …“ ruft ein Bild auf und wirkt rhetorisch. „Wenn man einmal unterstellt, dass …“ ist am vorsichtigsten und markiert am deutlichsten, dass hier nichts behauptet wird.\n\n" +
      "Wichtig ist dabei, dass die Annahme nicht zutreffen muss. Sie muss nur klar genug sein, damit man sieht, was aus ihr folgt.\n\n" +
      "Der eigentliche Nutzen zeigt sich, wenn man voreingenommen ist. Man kann eine Position, die man ablehnt, entweder bekämpfen oder durchrechnen. Bekämpfen ist schneller; durchrechnen bringt oft zutage, dass sie an einer bestimmten Stelle bricht — und diese Stelle zu benennen ist ein stärkeres Argument als jede Ablehnung.\n\n" +
      "Es hat auch eine unangenehme Kehrseite. Wer hypothetisch redet, kann sich hinter der Konstruktion verstecken: alles gesagt, nichts vertreten. Deshalb gehört zur Maxime, dass man am Ende die eigene Position benennt — angenommen, man hat eine.",
    questions: [
      {
        text: "Was tut ein Satz mit „Angenommen, …“?",
        options: [
          "Er gibt dem Gegenüber recht",
          "Er stellt eine Behauptung nur für die Dauer eines Gedankengangs auf",
          "Er lehnt eine Position ab",
        ],
        answer: 1,
        explain: "Hiçbir şey kabul edilmiyor, hiçbir şey geri alınmıyor.",
      },
      {
        kind: "gapfill",
        text: "___ den Fall, die Zahlen stimmen — was folgt daraus?",
        options: [],
        answer: 0,
        accept: ["Gesetzt"],
        explain: "Gesetzt den Fall: daha resmî, inceleme havasında.",
      },
      {
        text: "Welche Kehrseite nennt der Text?",
        options: [
          "Es ist zu kompliziert",
          "Man kann sich dahinter verstecken: alles gesagt, nichts vertreten",
          "Es wirkt unhöflich",
        ],
        answer: 1,
        explain: "Bu yüzden sonunda kendi konumunu adlandırmak gerekiyor.",
      },
      {
        kind: "short_answer",
        text: "Warum ist Durchrechnen laut Text stärker als Bekämpfen?",
        options: [],
        answer: 0,
        accept: [
          "es zeigt, an welcher Stelle die Position bricht",
          "man kann die Bruchstelle benennen",
          "weil man die Stelle benennen kann, an der sie bricht",
        ],
        explain: "Kırılma noktasını adlandırmak reddetmekten güçlü bir sav.",
      },
      {
        kind: "short_answer",
        text: "Wie unterscheidet sich „Man stelle sich vor, …“ von „Angenommen, …“?",
        options: [],
        answer: 0,
        accept: [
          "es ruft ein Bild auf und wirkt rhetorisch",
          "es ist rhetorischer",
          "es ruft ein Bild auf",
        ],
        explain: "Aynı işlev, farklı ağırlık.",
      },
    ],
  },
  {
    id: "c1-u19-r2",
    level: "C1",
    skill: "reading",
    unit: 19,
    title: "Wer trägt die Verantwortung?",
    genre: "Yorum yazısı",
    intro: "İklim tartışmasında sorumluluk nasıl kaydırılıyor?",
    gloss: [
      { de: "die Verlagerung", tr: "kaydırma", en: "shifting" },
      { de: "der Zielkonflikt", tr: "hedef çatışması", en: "conflict of goals" },
      { de: "systemisch", tr: "sistemsel", en: "systemic" },
      { de: "der Einzelne", tr: "birey", en: "the individual" },
      { de: "verursachen", tr: "yol açmak", en: "to cause" },
      { de: "unterbinden", tr: "engellemek", en: "to prevent" },
      { de: "zunehmend", tr: "giderek artan", en: "increasingly" },
    ],
    minutes: 7,
    text:
      "DER CO2-FUSSABDRUCK UND WER IHN ERFUNDEN HAT\n\n" +
      "Der Begriff „persönlicher CO2-Fußabdruck“ wurde in den 2000er Jahren durch eine groß angelegte Kampagne eines Ölkonzerns bekannt gemacht. Das ist keine Verschwörungserzählung, sondern belegte Werbegeschichte — und es sagt wenig darüber aus, ob der Begriff nützlich ist.\n\n" +
      "Nützlich ist er, weil er sichtbar macht, was ohne ihn unsichtbar bleibt. Wer einmal ausgerechnet hat, was ein Flug nach Bangkok bedeutet, weiß etwas, das er vorher nicht wusste.\n\n" +
      "Problematisch wird er durch die Verlagerung. Wenn die Verantwortung des Einzelnen zum Hauptthema wird, verschwindet die Frage nach den Rahmenbedingungen aus dem Blick. Ob jemand ohne Auto zur Arbeit kommt, hängt weniger von seiner Einstellung ab als davon, ob dort ein Bus fährt. Zwei Drittel der Emissionen entstehen in Bereichen, in denen Einzelne gar nicht entscheiden.\n\n" +
      "Hinzu kommt, dass Verursachen und Verhindern selten in derselben Hand liegen. Wer die Emissionen verursacht, kann sie oft nicht allein unterbinden, und wer sie unterbinden könnte, verursacht sie nicht.\n\n" +
      "Der Gegenschluss ist ebenso falsch. „Es ist ohnehin systemisch, also ist mein Verhalten egal“ ist bequem, und es stimmt nur, solange alle es sagen. Verhalten verändert Märkte, wenn es viele tun — langsam, aber messbar.\n\n" +
      "Der ehrlichste Satz zu diesem Thema ist deshalb ein Zielkonflikt: Individuelles Handeln reicht nicht aus und ist trotzdem nicht wirkungslos. Beides gilt zugleich. Wer nur die erste Hälfte sagt, entlastet sich; wer nur die zweite sagt, überfordert den Einzelnen und entlastet die Politik.\n\n" +
      "Was zunehmend fehlt, ist nicht Wissen, sondern die Bereitschaft, beide Hälften in einem Satz stehen zu lassen.",
    questions: [
      {
        text: "Was ist laut Text an dem Begriff nützlich?",
        options: [
          "Er ersetzt politische Maßnahmen",
          "Er macht sichtbar, was sonst unsichtbar bleibt",
          "Er wurde von einem Ölkonzern verbreitet",
        ],
        answer: 1,
        explain: "Kökeni pazarlama olsa da kavramın işlevi ayrı bir soru.",
      },
      {
        kind: "gapfill",
        text: "Problematisch wird er durch die ___ der Verantwortung.",
        options: [],
        answer: 0,
        accept: ["Verlagerung"],
        explain: "Sorumluluk bireye kayınca çerçeve sorusu gözden düşüyor.",
      },
      {
        text: "Welchen Gegenschluss nennt der Text ebenfalls falsch?",
        options: [
          "Dass individuelles Handeln alles entscheidet",
          "Dass eigenes Verhalten egal sei, weil alles systemisch ist",
          "Dass Emissionen messbar sind",
        ],
        answer: 1,
        explain: "„es stimmt nur, solange alle es sagen“.",
      },
      {
        kind: "short_answer",
        text: "Wie lautet der Zielkonflikt in einem Satz?",
        options: [],
        answer: 0,
        accept: [
          "individuelles Handeln reicht nicht aus und ist trotzdem nicht wirkungslos",
          "es reicht nicht aus und ist nicht wirkungslos",
          "beides gilt zugleich",
        ],
        explain: "Yalnız ilk yarı kendini aklıyor, yalnız ikinci yarı siyaseti.",
      },
      {
        text: "Der Text sagt, der Ursprung des Begriffs entscheide über seinen Wert.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: kökeni belgeli ama yararlı olup olmadığını söylemiyor.",
      },
    ],
  },
  {
    id: "c1-u19-l1",
    level: "C1",
    skill: "listening",
    unit: 19,
    title: "Zwischen den Stühlen",
    genre: "Söyleşi",
    intro: "Aidiyet: iki şey aynı anda doğru olabilir mi?",
    gloss: [
      { de: "die Zugehörigkeit", tr: "aidiyet", en: "belonging" },
      { de: "die Teilhabe", tr: "katılım, pay sahipliği", en: "participation" },
      { de: "die Zuschreibung", tr: "atfetme, yakıştırma", en: "ascription" },
      { de: "ausgrenzen", tr: "dışlamak", en: "to exclude" },
      { de: "beheimatet", tr: "yerleşik, yurt edinmiş", en: "at home" },
      { de: "die Abstammung", tr: "soy", en: "descent" },
      { de: "sich niederlassen", tr: "yerleşmek", en: "to settle" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Moderator", text: "Frau Öztürk, Sie sind hier geboren. Wo fühlen Sie sich zu Hause?" },
      { speaker: "Frau Öztürk", text: "Ich merke, dass die Frage immer mir gestellt wird und nie meinem Kollegen." },
      { speaker: "Moderator", text: "Das ist ein fairer Einwand." },
      { speaker: "Frau Öztürk", text: "Die Antwort ist trotzdem einfach: hier. Und in Izmir auch. Beides ist zugleich möglich — nur wird es selten so gefragt." },
      { speaker: "Frau Öztürk", text: "Ich bin hier beheimatet, ohne dort aufgehört zu haben." },
      { speaker: "Moderator", text: "Manche sagen, das gehe nicht. Man müsse sich entscheiden." },
      { speaker: "Frau Öztürk", text: "So sehr ich diese Erwartung verstehe, so oft geht sie an der Wirklichkeit vorbei. Zugehörigkeit ist keine Prüfung mit einer richtigen Antwort." },
      { speaker: "Herr Lang", text: "Ich sehe schon eine Grenze. Irgendwann muss man sagen können, wohin man gehört." },
      { speaker: "Frau Öztürk", text: "Sie sagen es doch auch nicht. Sie sind Bayer und Deutscher und Europäer, und niemand fragt Sie, was davon zählt." },
      { speaker: "Herr Lang", text: "Das ist etwas anderes." },
      { speaker: "Frau Öztürk", text: "Warum? Der Unterschied liegt in der Abstammung, nicht in der Teilhabe. Und genau das macht die Zuschreibung schwer erträglich — sie richtet sich nach etwas, das ich nicht ändern kann und nicht getan habe." },
      { speaker: "Moderator", text: "Was würden Sie stattdessen fragen?" },
      { speaker: "Frau Öztürk", text: "Wo ich mich niedergelassen habe. Oder woran ich arbeite. Beides sagt mehr über mich aus als eine Landkarte." },
      { speaker: "Herr Lang", text: "Damit kann ich leben." },
      { speaker: "Frau Öztürk", text: "Sehen Sie — wir sind uns nicht einig geworden. Wir haben nur die Frage ausgetauscht." },
    ],
    questions: [
      {
        text: "Was kritisiert Frau Öztürk an der Ausgangsfrage?",
        options: [
          "Sie ist zu persönlich",
          "Sie wird immer ihr gestellt und nie ihrem Kollegen",
          "Sie ist zu schwer zu beantworten",
        ],
        answer: 1,
        explain: "Sorunun kime yöneltildiği sorunun kendisinden fazlasını söylüyor.",
      },
      {
        kind: "gapfill",
        text: "___ sehr ich diese Erwartung verstehe, so oft geht sie an der Wirklichkeit vorbei.",
        options: [],
        answer: 0,
        accept: ["So"],
        explain: "So sehr …, so oft …: kabul ve itirazı aynı cümlede tutuyor.",
      },
      {
        text: "Welchen Vergleich zieht sie mit Herrn Lang?",
        options: [
          "Er sei auch zugewandert",
          "Er sei Bayer, Deutscher und Europäer, ohne gefragt zu werden, was zählt",
          "Er lebe im Ausland",
        ],
        answer: 1,
        explain: "Fark aidiyette değil, kime hangi sorunun sorulduğunda.",
      },
      {
        kind: "dictation",
        text: "Frau Öztürk'ün konuşmanın sonunda vardıkları noktayı özetlediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Wir sind uns nicht einig geworden. Wir haben nur die Frage ausgetauscht.",
          "wir haben nur die Frage ausgetauscht",
        ],
        explain: "Anlaşma değil, sorunun değişmesi — ve bu da bir sonuç.",
      },
    ],
  },
  {
    id: "c1-u19-l2",
    level: "C1",
    skill: "listening",
    unit: 19,
    title: "Es wäre an der Zeit gewesen",
    genre: "Panel",
    intro: "Eğitim tartışması: kaçırılmış zamanın dili.",
    gloss: [
      { de: "die Chancengleichheit", tr: "fırsat eşitliği", en: "equality of opportunity" },
      { de: "die Weiche", tr: "makas, yön belirleyen nokta", en: "switch point" },
      { de: "versäumen", tr: "kaçırmak", en: "to miss" },
      { de: "überfällig", tr: "çoktan gecikmiş", en: "overdue" },
      { de: "umdenken", tr: "yeniden düşünmek", en: "to rethink" },
      { de: "das Fachgebiet", tr: "uzmanlık alanı", en: "field" },
      { de: "die Adaption", tr: "uyarlama", en: "adaptation" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Moderatorin", text: "Herr Brandt, Sie sagen, die Weichen würden zu früh gestellt." },
      { speaker: "Herr Brandt", text: "Mit zehn Jahren. Hätte man das vor zwanzig Jahren geändert, stünden wir heute anders da." },
      { speaker: "Frau Ceylan", text: "Da bin ich vorsichtig. „Hätte man“ ist bequem — wir wissen nicht, was stattdessen passiert wäre." },
      { speaker: "Herr Brandt", text: "Wir haben Länder, die es anders machen. Das ist kein Gedankenspiel." },
      { speaker: "Frau Ceylan", text: "Andere Länder haben auch andere Voraussetzungen. Eine Adaption ist keine Kopie." },
      { speaker: "Moderatorin", text: "Worin sind Sie sich einig?" },
      { speaker: "Frau Ceylan", text: "Dass die Entscheidung mit zehn zu früh kommt. Nur nicht darin, was daraus folgt." },
      { speaker: "Herr Brandt", text: "Es wäre an der Zeit gewesen, das vor der letzten Reform zu klären. Man hat es versäumt, und jetzt reden wir wieder über Strukturen statt über Unterricht." },
      { speaker: "Frau Ceylan", text: "Das unterschreibe ich. Die Chancengleichheit entscheidet sich im Klassenzimmer, nicht im Schulgesetz." },
      { speaker: "Herr Brandt", text: "Wenn wir das ernst meinten, müssten wir die Fachgebiete öffnen. Wer Mathematik unterrichtet, sollte auch lesen lehren dürfen." },
      { speaker: "Frau Ceylan", text: "Das ist überfällig, ja. Aber es setzt voraus, dass wir Lehrkräfte anders ausbilden — und darüber redet niemand gern, weil es zehn Jahre dauert." },
      { speaker: "Moderatorin", text: "Also Umdenken statt Umbau?" },
      { speaker: "Frau Ceylan", text: "Beides. Nur in dieser Reihenfolge." },
    ],
    questions: [
      {
        text: "Was kritisiert Frau Ceylan an Herrn Brandts erstem Satz?",
        options: [
          "Er sei sachlich falsch",
          "„Hätte man“ sei bequem — man wisse nicht, was stattdessen passiert wäre",
          "Er sei zu vorsichtig",
        ],
        answer: 1,
        explain: "İrreal koşul kanıt değil; söylenmemiş alternatifi de içeriyor.",
      },
      {
        kind: "gapfill",
        text: "___ man das vor zwanzig Jahren geändert, stünden wir heute anders da.",
        options: [],
        answer: 0,
        accept: ["Hätte"],
        explain: "Bağlaçsız irreal koşul: fiil başa geçiyor.",
      },
      {
        text: "Worin sind sich beide einig?",
        options: [
          "In der Lösung",
          "Dass die Entscheidung mit zehn zu früh kommt",
          "Dass andere Länder kopiert werden sollten",
        ],
        answer: 1,
        explain: "Ortaklık teşhiste, sonuçta değil.",
      },
      {
        kind: "short_answer",
        text: "Warum redet laut Frau Ceylan niemand gern über die Lehrerausbildung?",
        options: [],
        answer: 0,
        accept: [
          "weil es zehn Jahre dauert",
          "weil es zu lange dauert",
          "es dauert zehn Jahre",
        ],
        explain: "Seçim döneminden uzun süren her reform siyaseten zor.",
      },
    ],
  },
  {
    id: "c1-u19-w1",
    level: "C1",
    skill: "writing",
    unit: 19,
    title: "Varsayım ve irreal koşul",
    genre: "Dil bilgisi",
    intro: "Varsayım kalıpları, bağlaçsız gerçek dışı koşul ve ikili kabul yapısı.",
    gloss: [
      { de: "angenommen", tr: "diyelim ki", en: "assuming" },
      { de: "hypothetisch", tr: "varsayımsal", en: "hypothetical" },
      { de: "überfällig", tr: "çoktan gecikmiş", en: "overdue" },
      { de: "die Zugehörigkeit", tr: "aidiyet", en: "belonging" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Diyelim ki haklısınız — bundan ne çıkar?",
        answer: "Angenommen, Sie haben recht — was folgt daraus",
        hint: "Angenommen'dan sonra normal ana cümle sırası gelir.",
      },
      {
        kind: "build",
        tr: "Bunu yirmi yıl önce değiştirmiş olsaydık bugün başka bir noktada olurduk.",
        answer: "Hätte man das vor zwanzig Jahren geändert, stünden wir heute anders da",
        hint: "Bağlaçsız irreal koşul: hätte başta, ana cümle Konjunktiv II.",
      },
      {
        kind: "build",
        tr: "Bu beklentiyi ne kadar anlasam da o kadar sık gerçeğin yanından geçiyor.",
        answer: "So sehr ich diese Erwartung verstehe, so oft geht sie an der Wirklichkeit vorbei",
        hint: "So sehr …, so oft …: iki yarı da fiil sonda değil, ikinci yarı fiille başlar.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: varsayım yapısı bir kabule dönüşmüş.",
        source: "Angenommen, Sie haben recht, dann gebe ich Ihnen also recht.",
        answer: "Angenommen, Sie haben recht — was folgt daraus?",
        alternatives: [
          "Angenommen, Sie haben recht — was folgt daraus",
          "Gesetzt den Fall, Sie haben recht: Was folgt daraus?",
        ],
        why: "Varsayım yapısının bütün değeri hiçbir şey iddia etmemesinde. Sonuna „also gebe ich Ihnen recht“ eklendiğinde yapı kendini iptal ediyor ve konuşan hem konumunu bırakmış hem de aracı kaybetmiş oluyor.",
      },
    ],
  },
  {
    id: "c1-u19-w2",
    level: "C1",
    skill: "writing",
    unit: 19,
    title: "İki yarıyı aynı cümlede tutmak",
    genre: "Görüş yazısı",
    intro: "Tartışmalı bir konuda kendi konumunu bırakmadan yazmak.",
    gloss: [
      { de: "der Zielkonflikt", tr: "hedef çatışması", en: "conflict of goals" },
      { de: "die Verlagerung", tr: "kaydırma", en: "shifting" },
      { de: "einschränken", tr: "sınırlamak", en: "to qualify" },
      { de: "unterstellen", tr: "varsaymak", en: "to assume" },
      { de: "die Teilhabe", tr: "katılım", en: "participation" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir okur mektubu yaz (Leserbrief). Konu: şehrin merkezinde özel araç trafiğini yasaklama önerisi. Yöntem zorunlu: (1) karşı görüşü VARSAYIM yapısıyla içeriden götür — „Angenommen, …“ ya da „Gesetzt den Fall, …“ — ve nerede kırıldığını adlandır; (2) hedef çatışmasını iki yarısıyla birlikte söyle, tek yarısını değil; (3) sonunda kendi konumunu açıkça yaz. Karşı tarafı kötü niyetle suçlama; kırılma noktasını göster.",
        stimulus:
          "GAZETE HABERİ\n\n" +
          "Neustadt: Innenstadt soll autofrei werden\n\n" +
          "Der Stadtrat prüft ein Fahrverbot für private Pkw im Bereich innerhalb des Rings. Betroffen wären rund 40.000 Fahrten täglich.\n\n" +
          "Befürworter nennen Luftqualität, Lärm und Sicherheit für Kinder.\n\n" +
          "Der Einzelhandel warnt vor Umsatzverlusten; ein Sprecher sagt, Kunden aus dem Umland würden künftig ins Einkaufszentrum an der Autobahn fahren.\n\n" +
          "Der Nahverkehr fährt aus zwei der fünf Vororte nur stündlich, abends gar nicht.",
        checklist: [
          "Karşı görüş varsayım yapısıyla içeriden götürüldü mü?",
          "Kırılma noktası somut olarak adlandırıldı mı?",
          "Hedef çatışması iki yarısıyla birlikte mi yazıldı?",
          "Kendi konumu sonda açıkça belirtildi mi?",
        ],
        minWords: 150,
        phrases: [
          { de: "Angenommen, die Befürchtung trifft zu:", tr: "diyelim ki bu kaygı yerinde", en: "assuming the concern holds" },
          { de: "Der Einwand bricht an einer bestimmten Stelle.", tr: "itiraz belli bir noktada kırılıyor", en: "the objection breaks at a specific point" },
          { de: "Beides gilt zugleich.", tr: "ikisi aynı anda geçerli", en: "both hold at once" },
        ],
        sample:
          "Zur Debatte über die autofreie Innenstadt\n\n" +
          "Der Einwand des Einzelhandels verdient mehr als die übliche Abwehr. Angenommen, er trifft zu: Kundinnen aus dem Umland fahren künftig an die Autobahn, die Umsätze in der Innenstadt sinken, Geschäfte schließen, und übrig bleibt eine ruhige Straße ohne Läden. Das ist kein erfundenes Szenario — Städte, die zu schnell gesperrt haben, kennen es.\n\n" +
          "Der Gedankengang bricht allerdings an einer bestimmten Stelle, und die steht in derselben Meldung: Aus zwei der fünf Vororte fährt der Bus stündlich, abends überhaupt nicht. Solange das so bleibt, ist das Auto keine Bequemlichkeit, sondern die einzige Verbindung. Der Einwand richtet sich damit nicht gegen die autofreie Innenstadt, sondern gegen ihre Reihenfolge.\n\n" +
          "Beides gilt zugleich, und beides gehört in denselben Satz: Die Innenstadt ist mit 40.000 Fahrten täglich für Kinder und Anwohner zu laut und zu gefährlich — und eine Sperrung ohne Takterhöhung verlagert die Kosten auf die, die am wenigsten Auswahl haben. Wer nur die erste Hälfte sagt, redet über Lebensqualität und meint die Innenstadtbewohner. Wer nur die zweite sagt, verteidigt den Zustand.\n\n" +
          "Meine Position: Das Fahrverbot ja, aber nicht vor dem Fahrplan. Zuerst Halbstundentakt aus allen fünf Vororten und ein Abendbus bis Mitternacht, dann die Sperrung — mit einem festen Datum im selben Beschluss, damit der zweite Schritt nicht wieder in der nächsten Wahlperiode verschwindet.",
      },
    ],
  },
];

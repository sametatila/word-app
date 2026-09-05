import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 25 — "Hayaldeki iş, Almanya'da yaşam, sınav, kapanış".
 *
 * Dört ders: Mein Traumjob · Leben in Deutschland · Vor der Prüfung ·
 * Schon so weit! Patikanın son ünitesi; içerik A2'nin tamamına açık.
 *
 *   Ünite 25: der Chirurg, der Buchhalter, der Programmierer, der Erzieher,
 *             der Gärtner, der Berater, der Tischler, unerfahren · ungerecht,
 *             anständig, getrennt, zudem, der Mülleimer, sonntags, pro,
 *             der Bäcker · aufgeregt, besorgt, konzentriert, ablegen,
 *             wiederholt, tagelang, schwierig, schläfrig · sich trauen, fast,
 *             sogar, immerhin, außerdem, ganz, selbst, erstaunt
 *   Kalıplar: Ich möchte Programmierer werden, weil ich gern am Computer
 *             arbeite. · Dafür brauche ich eine Ausbildung. · Hier ist alles
 *             sauberer als bei uns. · Den Müll trennt man hier getrennt. ·
 *             Wenn ich aufgeregt bin, kann ich nicht schlafen. · Nächste
 *             Woche lege ich meine Prüfung ab. · Ich habe fast alles
 *             verstanden. · Immerhin traue ich mich jetzt zu sprechen.
 *
 * Son ünite bilerek birikimli: kendi dört dersini ölçerken A2 boyunca
 * öğretilen gerekçe (weil), koşul (wenn) ve karşılaştırma (als) yapılarını
 * bir arada döndürüyor. Bir seviyenin son egzersizi tek bir kural
 * çalıştırmamalı — öğrencinin karşılaşacağı gerçek cümle üçünü birden taşır.
 * Kapanış yazması da bu yüzden serbest metin: kural sorusu değil, "ne
 * yapabiliyorsun" sorusu.
 */
export const a2U25: SkillExercise[] = [
  {
    id: "a2-u25-r1",
    level: "A2",
    skill: "reading",
    unit: 25,
    title: "Vier Wege in einen Beruf",
    genre: "Dergi yazısı",
    intro: "Dört kişi mesleğini nasıl seçtiğini anlatıyor. Yol hep düz mü?",
    gloss: [
      { de: "der Programmierer", tr: "yazılımcı", en: "programmer" },
      { de: "der Erzieher", tr: "çocuk eğitmeni", en: "childcare worker" },
      { de: "der Gärtner", tr: "bahçıvan", en: "gardener" },
      { de: "der Tischler", tr: "marangoz", en: "carpenter" },
      { de: "der Buchhalter", tr: "muhasebeci", en: "accountant" },
      { de: "der Berater", tr: "danışman", en: "adviser" },
      { de: "unerfahren", tr: "deneyimsiz", en: "inexperienced" },
    ],
    minutes: 4,
    text:
      "VIER WEGE IN EINEN BERUF\n\n" +
      "MARIA, 34, Programmiererin. „Ich wollte Chirurgin werden, ehrlich. Dann habe ich mit siebzehn eine Website für den Verein meines Vaters gebaut und nie wieder aufgehört. Ich möchte Programmiererin bleiben, weil ich gern allein und konzentriert arbeite.“\n\n" +
      "TOBIAS, 51, Tischler. „Mein Vater hatte die Werkstatt, also war es klar. Zwanzig Jahre habe ich das gedacht. Heute weiß ich: Es war klar, aber es war auch richtig.“\n\n" +
      "AYLA, 26, Erzieherin. „Ich habe als Buchhalterin angefangen. Zahlen kann ich, aber ich saß acht Stunden still. Nach zwei Jahren habe ich noch einmal eine Ausbildung gemacht. Am Anfang war ich unerfahren und die Kolleginnen zehn Jahre jünger. Das war komisch, aber nur drei Wochen lang.“\n\n" +
      "HENDRIK, 43, Gärtner. „Ich war Berater in einer großen Firma und habe gut verdient. Dann kam ein Jahr, in dem ich jeden Sonntag schlecht geschlafen habe. Jetzt verdiene ich weniger und schlafe besser. Für viele klingt das dumm. Für mich nicht.“\n\n" +
      "Vier Wege, und nur einer davon geradeaus.",
    questions: [
      {
        text: "Was wollte Maria ursprünglich werden?",
        options: ["Programmiererin", "Chirurgin", "Beraterin"],
        answer: 1,
        explain: "„Ich wollte Chirurgin werden, ehrlich.“ Yazılım işi on yedisinde başlamış.",
      },
      {
        kind: "gapfill",
        text: "Ich möchte Programmiererin bleiben, ___ ich gern allein und konzentriert arbeite.",
        options: [],
        answer: 0,
        accept: ["weil"],
        explain: "Gerekçe weil ile verilir ve çekimli fiil (arbeite) sona gider.",
      },
      {
        text: "Warum hat Ayla den Beruf gewechselt?",
        options: [
          "Sie konnte nicht mit Zahlen umgehen.",
          "Sie saß acht Stunden still.",
          "Die Kolleginnen waren zu jung.",
        ],
        answer: 1,
        explain: "„Zahlen kann ich, aber ich saß acht Stunden still.“",
      },
      {
        kind: "short_answer",
        text: "Was hat sich für Hendrik geändert?",
        options: [],
        answer: 0,
        accept: [
          "er verdient weniger und schläft besser",
          "weniger Geld, besserer Schlaf",
          "er schläft besser",
        ],
        explain: "„Jetzt verdiene ich weniger und schlafe besser.“",
      },
      {
        text: "Alle vier sind direkt in ihren Beruf gekommen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Vier Wege, und nur einer davon geradeaus.“",
      },
    ],
  },
  {
    id: "a2-u25-r2",
    level: "A2",
    skill: "reading",
    unit: 25,
    title: "Was mir hier aufgefallen ist",
    genre: "Forum yazısı",
    intro: "Almanya'ya taşınan biri gözlemlerini yazıyor. Neyi haklı, neyi tuhaf buluyor?",
    gloss: [
      { de: "getrennt", tr: "ayrı", en: "separated" },
      { de: "der Mülleimer", tr: "çöp kovası", en: "bin" },
      { de: "sonntags", tr: "pazarları", en: "on Sundays" },
      { de: "der Bäcker", tr: "fırıncı", en: "baker" },
      { de: "ungerecht", tr: "adaletsiz", en: "unfair" },
      { de: "anständig", tr: "düzgün, dürüst", en: "decent" },
      { de: "zudem", tr: "ayrıca", en: "moreover" },
      { de: "pro", tr: "başına", en: "per" },
    ],
    minutes: 4,
    text:
      "Ich bin jetzt zwei Jahre hier. Ein paar Sachen sind mir aufgefallen.\n\n" +
      "DER MÜLL. Bei uns gibt es einen Mülleimer, hier fünf. Am Anfang habe ich alles falsch gemacht und mein Nachbar hat es mir dreimal erklärt, sehr geduldig. Den Müll trennt man hier getrennt, und ehrlich gesagt finde ich das inzwischen richtig.\n\n" +
      "DER SONNTAG. Sonntags ist alles zu. Alles. Nur der Bäcker macht morgens für drei Stunden auf. Am Anfang war ich wütend, weil ich immer etwas vergessen hatte. Heute ist der Sonntag mein liebster Tag — die Stadt ist ruhiger als bei uns an jedem anderen Tag.\n\n" +
      "DIE PÜNKTLICHKEIT. Alles stimmt, bis der Zug kommt. Dann stimmt gar nichts mehr.\n\n" +
      "DIE MIETE. Hier ist vieles anständig geregelt, aber die Miete pro Quadratmeter ist in zwei Jahren um fast ein Fünftel gestiegen. Für Leute mit kleinem Gehalt ist das ungerecht, und zudem findet man kaum noch etwas.\n\n" +
      "Was ich sagen will: Nicht alles ist besser, nicht alles ist schlechter. Nur anders — und nach zwei Jahren merkt man, welches „anders“ man selbst behalten möchte.",
    questions: [
      {
        text: "Wie findet der Autor das Mülltrennen heute?",
        options: ["Zu kompliziert", "Richtig", "Ungerecht"],
        answer: 1,
        explain: "„ehrlich gesagt finde ich das inzwischen richtig“.",
      },
      {
        kind: "gapfill",
        text: "Die Stadt ist ruhiger ___ bei uns an jedem anderen Tag.",
        options: [],
        answer: 0,
        accept: ["als"],
        explain: "Karşılaştırma biçiminden sonra als gelir; A2 boyunca en çok karışan ayrıntılardan biri.",
      },
      {
        text: "Was ist am Sonntag offen?",
        options: ["Nichts", "Der Bäcker, morgens für drei Stunden", "Alle Geschäfte"],
        answer: 1,
        explain: "„Nur der Bäcker macht morgens für drei Stunden auf.“",
      },
      {
        kind: "short_answer",
        text: "Was findet der Autor ungerecht?",
        options: [],
        answer: 0,
        accept: [
          "dass die Miete so gestiegen ist",
          "die Miete",
          "die gestiegene Miete für Leute mit kleinem Gehalt",
        ],
        explain: "Kira metrekare başına iki yılda beşte bir artmış: „Für Leute mit kleinem Gehalt ist das ungerecht.“",
      },
      {
        text: "Der Autor findet, dass hier alles besser ist.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Nicht alles ist besser, nicht alles ist schlechter. Nur anders.“",
      },
    ],
  },
  {
    id: "a2-u25-l1",
    level: "A2",
    skill: "listening",
    unit: 25,
    title: "Vor der Prüfung",
    genre: "Diyalog",
    intro: "Sınav öncesi heyecan. Ne yardımcı oluyor, ne olmuyor?",
    gloss: [
      { de: "aufgeregt", tr: "heyecanlı", en: "nervous" },
      { de: "besorgt", tr: "endişeli", en: "worried" },
      { de: "konzentriert", tr: "odaklanmış", en: "focused" },
      { de: "ablegen", tr: "(sınava) girmek", en: "to take (an exam)" },
      { de: "wiederholt", tr: "tekrar tekrar", en: "repeatedly" },
      { de: "tagelang", tr: "günlerce", en: "for days" },
      { de: "schläfrig", tr: "uykulu", en: "sleepy" },
      { de: "schwierig", tr: "zor", en: "difficult" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ecem", text: "Nächste Woche lege ich meine Prüfung ab. Ich bin jetzt schon aufgeregt." },
      { speaker: "Marek", text: "Das ist normal. Wie viel lernst du gerade?" },
      { speaker: "Ecem", text: "Tagelang, jeden Abend bis eins. Aber wenn ich aufgeregt bin, kann ich nicht schlafen." },
      { speaker: "Marek", text: "Und am nächsten Morgen bist du schläfrig und lernst schlechter." },
      { speaker: "Ecem", text: "Genau das. Ich lese dieselbe Seite wiederholt und verstehe nichts." },
      { speaker: "Marek", text: "Dann hör um zehn auf. Wirklich. Zwei konzentrierte Stunden sind mehr als fünf müde." },
      { speaker: "Ecem", text: "Aber der schriftliche Teil ist so schwierig." },
      { speaker: "Marek", text: "Der schriftliche war bei mir auch das Schlimmste. Weißt du, was geholfen hat? Alte Prüfungen, mit Uhr." },
      { speaker: "Ecem", text: "Mit Uhr?" },
      { speaker: "Marek", text: "Ja. Nicht der Stoff macht Probleme, sondern die Zeit. Wenn du das dreimal übst, bist du am Tag selbst viel ruhiger." },
      { speaker: "Ecem", text: "Gut. Dann bin ich weniger besorgt als heute Morgen." },
    ],
    questions: [
      {
        text: "Wann legt Ecem die Prüfung ab?",
        options: ["Morgen", "Nächste Woche", "Nächsten Monat"],
        answer: 1,
        explain: "„Nächste Woche lege ich meine Prüfung ab.“",
      },
      {
        kind: "gapfill",
        text: "___ ich aufgeregt bin, kann ich nicht schlafen.",
        options: [],
        answer: 0,
        accept: ["Wenn"],
        explain: "Yan cümle başta olduğu için ana cümle fiille devam ediyor: kann ich.",
      },
      {
        text: "Was rät Marek für den schriftlichen Teil?",
        options: [
          "Länger lernen",
          "Alte Prüfungen mit Uhr üben",
          "Den Teil überspringen",
        ],
        answer: 1,
        explain: "„Alte Prüfungen, mit Uhr.“ — sorun konu değil, zaman.",
      },
      {
        kind: "dictation",
        text: "Marek'in iki saatle beş saati karşılaştırdığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Zwei konzentrierte Stunden sind mehr als fünf müde.",
          "Zwei konzentrierte Stunden sind mehr als fünf müde",
        ],
        explain: "Karşılaştırma biçimi burada tavsiyeyi taşıyor: nicelik değil, odak.",
      },
    ],
  },
  {
    id: "a2-u25-l2",
    level: "A2",
    skill: "listening",
    unit: 25,
    title: "Schon so weit!",
    genre: "Diyalog",
    intro: "A2'nin sonu. İki öğrenci bir yılda ne değiştiğini konuşuyor.",
    gloss: [
      { de: "sich trauen", tr: "cesaret etmek", en: "to dare" },
      { de: "immerhin", tr: "hiç değilse", en: "at least" },
      { de: "erstaunt", tr: "şaşırmış", en: "astonished" },
      { de: "sogar", tr: "hatta", en: "even" },
      { de: "außerdem", tr: "ayrıca", en: "besides" },
      { de: "fast", tr: "neredeyse", en: "almost" },
      { de: "selbst", tr: "kendisi, bizzat", en: "myself" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Amir", text: "Weißt du noch, letztes Jahr im September? Ich konnte nicht mal „Guten Tag“ sagen, ohne rot zu werden." },
      { speaker: "Ecem", text: "Und heute? Du hast eben zehn Minuten mit der Lehrerin geredet." },
      { speaker: "Amir", text: "Ich habe fast alles verstanden. Nicht alles — aber fast." },
      { speaker: "Ecem", text: "Bei mir ist es das Telefon. Ich habe letzte Woche selbst beim Arzt angerufen." },
      { speaker: "Amir", text: "Allein?" },
      { speaker: "Ecem", text: "Allein. Meine Schwester war erstaunt, sie hat das immer für mich gemacht." },
      { speaker: "Amir", text: "Das ist mehr als Grammatik. Immerhin traue ich mich jetzt zu sprechen, auch wenn es falsch ist." },
      { speaker: "Ecem", text: "Genau das war mein Problem. Ich wollte immer erst den perfekten Satz." },
      { speaker: "Amir", text: "Und dann war das Gespräch vorbei." },
      { speaker: "Ecem", text: "Und dann war das Gespräch vorbei. Machst du weiter mit B1?" },
      { speaker: "Amir", text: "Im Oktober. Außerdem lese ich jetzt sonntags Zeitung, sogar wenn ich nur die Hälfte verstehe." },
    ],
    questions: [
      {
        text: "Was konnte Amir vor einem Jahr nicht?",
        options: [
          "„Guten Tag“ sagen, ohne rot zu werden",
          "Zeitung lesen",
          "Beim Arzt anrufen",
        ],
        answer: 0,
        explain: "„Ich konnte nicht mal ‚Guten Tag‘ sagen, ohne rot zu werden.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe ___ alles verstanden.",
        options: [],
        answer: 0,
        accept: ["fast"],
        explain: "Kapanış cümlesinin dürüstlüğü burada: hepsi değil, neredeyse hepsi.",
      },
      {
        text: "Was war Ecems Problem beim Sprechen?",
        options: [
          "Sie kannte zu wenige Wörter.",
          "Sie wollte immer erst den perfekten Satz.",
          "Sie verstand die Fragen nicht.",
        ],
        answer: 1,
        explain: "„Ich wollte immer erst den perfekten Satz.“ — Amir tamamlıyor: „Und dann war das Gespräch vorbei.“",
      },
      {
        kind: "short_answer",
        text: "Was macht Amir jetzt sonntags?",
        options: [],
        answer: 0,
        accept: ["er liest Zeitung", "Zeitung lesen", "er liest sonntags Zeitung"],
        explain: "„Außerdem lese ich jetzt sonntags Zeitung, sogar wenn ich nur die Hälfte verstehe.“",
      },
    ],
  },
  {
    id: "a2-u25-w1",
    level: "A2",
    skill: "writing",
    unit: 25,
    title: "Gerekçe, koşul, karşılaştırma",
    genre: "Dil bilgisi",
    intro: "A2'nin üç yan cümlesi bir arada — hangisi fiili nereye atıyor?",
    gloss: [
      { de: "der Programmierer", tr: "yazılımcı", en: "programmer" },
      { de: "aufgeregt", tr: "heyecanlı", en: "nervous" },
      { de: "getrennt", tr: "ayrı", en: "separated" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Yazılımcı olmak istiyorum, çünkü bilgisayarda çalışmayı seviyorum.",
        answer: "Ich möchte Programmierer werden, weil ich gern am Computer arbeite",
        hint: "weil çekimli fiili sona atar: arbeite en sonda.",
      },
      {
        kind: "build",
        tr: "Heyecanlandığımda uyuyamıyorum.",
        answer: "Wenn ich aufgeregt bin, kann ich nicht schlafen",
        hint: "Yan cümle başta olduğu için ana cümle fiille başlar: kann ich.",
      },
      {
        kind: "build",
        tr: "Burada her şey bizdekinden daha temiz.",
        answer: "Hier ist alles sauberer als bei uns",
        hint: "Karşılaştırma: sıfat + -er, sonra als.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: üç yapıdan biri karışmış.",
        source: "Ich bin ruhiger, weil ich habe viel geübt.",
        answer: "Ich bin ruhiger, weil ich viel geübt habe.",
        alternatives: ["Ich bin ruhiger, weil ich viel geübt habe", "Ich bin ruhiger, denn ich habe viel geübt."],
        why: "weil yardımcı fiili de sona atar: geübt habe. Ana cümle sırası korunacaksa bağlaç denn olmalıydı — iki bağlaç anlamca yakın, dizilişleri değil.",
      },
    ],
  },
  {
    id: "a2-u25-w2",
    level: "A2",
    skill: "writing",
    unit: 25,
    title: "Ein Jahr Deutsch",
    genre: "Serbest metin",
    intro: "A2'nin kapanışı: bir yılda ne değişti, sırada ne var?",
    gloss: [
      { de: "sich trauen", tr: "cesaret etmek", en: "to dare" },
      { de: "immerhin", tr: "hiç değilse", en: "at least" },
      { de: "das Ziel", tr: "hedef", en: "goal" },
      { de: "erstaunt", tr: "şaşırmış", en: "astonished" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "free",
        prompt:
          "Kurs sonunda kendi metnini yaz: Bir yıl önce Almancanla ne yapamıyordun? Bugün ne yapabiliyorsun? Sana en çok ne zorluk çıkardı ve şimdi hedefin ne? En az bir gerekçe (weil), bir koşul (wenn) ve bir karşılaştırma (als) cümlesi kullan.",
        checklist: [
          "Bir yıl önce ne yapamadığını yazdın mı?",
          "Bugün ne yapabildiğine somut bir örnek verdin mi?",
          "En az bir weil, bir wenn ve bir als cümlesi var mı?",
          "Bir sonraki hedefini yazdın mı?",
        ],
        minWords: 70,
        phrases: [
          { de: "Vor einem Jahr konnte ich nicht …", tr: "bir yıl önce …-emiyordum", en: "a year ago I couldn't …" },
          { de: "Immerhin traue ich mich jetzt zu sprechen.", tr: "hiç değilse artık konuşmaya cesaret ediyorum", en: "at least I dare to speak now" },
          { de: "Mein nächstes Ziel ist …", tr: "sıradaki hedefim …", en: "my next goal is …" },
        ],
        sample:
          "Vor einem Jahr konnte ich im Supermarkt nicht einmal fragen, wo das Mehl steht. Ich habe gesucht, bis ich es selbst gefunden habe, weil ich mich nicht getraut habe.\n\n" +
          "Heute ist das anders. Letzte Woche habe ich beim Amt angerufen und einen Termin gemacht. Die Frau hat schnell gesprochen, und ich habe fast alles verstanden. Meine Schwester war erstaunt.\n\n" +
          "Am schwierigsten sind für mich immer noch die Nebensätze. Wenn ich schnell spreche, vergesse ich das Verb am Ende. Schreiben ist leichter als sprechen, weil ich beim Schreiben Zeit habe.\n\n" +
          "Mein nächstes Ziel ist der B1-Kurs im Oktober. Immerhin traue ich mich jetzt zu sprechen, auch wenn es nicht perfekt ist. Ein Jahr lang habe ich auf den perfekten Satz gewartet — das mache ich nicht noch einmal.",
      },
    ],
  },
];

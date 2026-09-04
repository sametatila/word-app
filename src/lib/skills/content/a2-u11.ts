import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 11 — "Yeni iş, sebep, yol, ekip".
 *
 * Dört ders: Die neue Stelle · Warum lernst du Deutsch? ·
 * Ich komme später, denn… · Die neuen Kollegen. İçerik ünite 1-11'in
 * kelimeleriyle sınırlı.
 *
 *   Ünite 11: die Bewerbung, das Bewerbungsgespräch, der Vertrag,
 *             das Gehalt, die Ausbildung, der Mitarbeiter, kündigen,
 *             der Nebenjob · weil, die Vokabel, die Grammatik, aussprechen,
 *             übersetzen, wegen, darum, sich informieren · denn, der Verkehr,
 *             mitfahren, die Nachtschicht, der Dienstplan, unterwegs sein,
 *             der Arbeitsweg, stressig · der Arbeitskollege, das Team,
 *             die Teamarbeit, der Geschäftsführer, der Azubi, das Büro,
 *             zusammenarbeiten, vorstellen
 *   Kalıplar: Ich will mich bewerben. · Ich lerne Deutsch, weil ich hier
 *             arbeite. · Wegen der Arbeit lerne ich Deutsch. · Ich komme
 *             später, denn der Verkehr ist schlimm. · Darf ich Ihnen …
 *             vorstellen?
 *
 * Ünitenin çekirdeği sebep bildirmenin ÜÇ yolu ve üçünün söz dizimi:
 * weil fiili sona atar, denn hiç dokunmaz, wegen ise yan cümle bile kurmaz.
 * Anlam üçünde de aynı; seçim yapıldığı an söz dizimi belirleniyor. Bu yüzden
 * üçü aynı ünitede yan yana çalışıyor.
 */
export const a2U11: SkillExercise[] = [
  {
    id: "a2-u11-r1",
    level: "A2",
    skill: "reading",
    unit: 11,
    title: "Wir suchen Verstärkung",
    genre: "İlan",
    intro: "Bir iş ilanı. Kim aranıyor, ne sunuluyor, nasıl başvurulur?",
    gloss: [
      { de: "der Mitarbeiter", tr: "çalışan", en: "employee" },
      { de: "die Ausbildung", tr: "meslek eğitimi", en: "vocational training" },
      { de: "das Gehalt", tr: "maaş", en: "salary" },
      { de: "der Vertrag", tr: "sözleşme", en: "contract" },
      { de: "die Bewerbung", tr: "iş başvurusu", en: "application" },
      { de: "das Bewerbungsgespräch", tr: "iş görüşmesi", en: "job interview" },
      { de: "der Nebenjob", tr: "ek iş", en: "side job" },
    ],
    minutes: 4,
    text:
      "CAFÉ LINDE SUCHT VERSTÄRKUNG\n\n" +
      "Wir sind ein kleines Team von acht Mitarbeitern und suchen ab Januar jemanden für den Service.\n\n" +
      "Sie brauchen keine Ausbildung als Koch oder Kellner. Wichtig sind gute Deutschkenntnisse und Freude an der Arbeit mit Menschen. Auch als Nebenjob am Wochenende möglich.\n\n" +
      "Wir bieten: einen festen Vertrag, ein Gehalt über dem Minimum und jeden zweiten Sonntag frei.\n\n" +
      "Ihre Bewerbung schicken Sie bitte per E-Mail an info@cafe-linde.de. Ein langes Anschreiben ist nicht nötig — zwei Sätze reichen. Das Bewerbungsgespräch dauert etwa zwanzig Minuten und findet direkt im Café statt.",
    questions: [
      {
        text: "Wie groß ist das Team?",
        options: ["Acht Mitarbeiter", "Zwanzig Mitarbeiter", "Zwei Mitarbeiter"],
        answer: 0,
        explain: "„Wir sind ein kleines Team von acht Mitarbeitern.“ Yirmi, görüşmenin dakikası.",
      },
      {
        kind: "gapfill",
        text: "Sie brauchen keine ___ als Koch oder Kellner.",
        options: [],
        answer: 0,
        accept: ["Ausbildung"],
        explain: "„Sie brauchen keine Ausbildung als Koch oder Kellner.“ Önemli olan dil bilgisi ve isteklilik.",
      },
      {
        text: "Was bietet das Café?",
        options: ["Jeden Sonntag frei", "Einen festen Vertrag", "Eine Wohnung"],
        answer: 1,
        explain: "„Wir bieten: einen festen Vertrag, ein Gehalt über dem Minimum und jeden zweiten Sonntag frei.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert das Bewerbungsgespräch?",
        options: [],
        answer: 0,
        accept: ["etwa zwanzig Minuten", "zwanzig Minuten", "20 Minuten"],
        explain: "„Das Bewerbungsgespräch dauert etwa zwanzig Minuten.“",
      },
      {
        text: "Man muss ein langes Anschreiben schicken.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein langes Anschreiben ist nicht nötig — zwei Sätze reichen.“",
      },
    ],
  },
  {
    id: "a2-u11-r2",
    level: "A2",
    skill: "reading",
    unit: 11,
    title: "Warum lernt ihr Deutsch?",
    genre: "Forum mesajı",
    intro: "Forumda üç cevap. Herkes sebebini başka bir yapıyla söylüyor.",
    gloss: [
      { de: "weil", tr: "çünkü", en: "because" },
      { de: "wegen", tr: "yüzünden", en: "because of" },
      { de: "darum", tr: "o yüzden", en: "that is why" },
      { de: "die Vokabel", tr: "sözcük", en: "vocabulary item" },
      { de: "die Grammatik", tr: "dil bilgisi", en: "grammar" },
      { de: "aussprechen", tr: "telaffuz etmek", en: "to pronounce" },
      { de: "übersetzen", tr: "tercüme etmek", en: "to translate" },
      { de: "sich informieren", tr: "bilgi almak", en: "to find out about" },
    ],
    minutes: 4,
    text:
      "FORUM · Deutsch lernen\n\n" +
      "Marta: Ich lerne Deutsch, weil meine Kinder hier zur Schule gehen. Ich möchte die Briefe von der Schule selbst lesen und nicht immer jemanden bitten, sie zu übersetzen.\n\n" +
      "Ibrahim: Bei mir ist es die Arbeit. Wegen meiner neuen Stelle brauche ich mindestens B1. Am schwersten finde ich die Grammatik — Vokabeln lerne ich gern, aber die Sätze bleiben lang und kompliziert.\n\n" +
      "Yara: Ich wohne seit acht Monaten hier und habe fast keine Kontakte. Darum lerne ich. Ich möchte mich beim Amt selbst informieren und nicht nur nicken. Mein Problem ist das Sprechen: ich weiß die Wörter, aber ich kann sie nicht gut aussprechen.",
    questions: [
      {
        text: "Warum lernt Marta Deutsch?",
        options: ["Wegen der Arbeit", "Wegen der Schule ihrer Kinder", "Wegen des Amtes"],
        answer: 1,
        explain: "„weil meine Kinder hier zur Schule gehen“ — okuldan gelen mektupları kendi okumak istiyor.",
      },
      {
        kind: "gapfill",
        text: "___ meiner neuen Stelle brauche ich mindestens B1.",
        options: [],
        answer: 0,
        accept: ["Wegen", "wegen"],
        explain: "Bu bir edat: yan cümle kurmaz, fiil sona gitmez. Başta olduğu için özne fiilin arkasına düşer.",
      },
      {
        text: "Was findet Ibrahim am schwersten?",
        options: ["Die Vokabeln", "Die Grammatik", "Das Sprechen"],
        answer: 1,
        explain: "„Am schwersten finde ich die Grammatik — Vokabeln lerne ich gern.“ Konuşmak Yara'nın sorunu.",
      },
      {
        kind: "short_answer",
        text: "Seit wann wohnt Yara hier?",
        options: [],
        answer: 0,
        accept: ["seit acht Monaten", "acht Monate", "8 Monate"],
        explain: "„Ich wohne seit acht Monaten hier und habe fast keine Kontakte.“",
      },
      {
        text: "Yara kennt die Wörter nicht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „ich weiß die Wörter, aber ich kann sie nicht gut aussprechen“.",
      },
    ],
  },
  {
    id: "a2-u11-l1",
    level: "A2",
    skill: "listening",
    unit: 11,
    title: "Ich komme später",
    genre: "Telefon görüşmesi",
    intro: "İşe geç kalma telefonu. Sebep ne, toplantı ne oluyor?",
    gloss: [
      { de: "denn", tr: "çünkü", en: "because" },
      { de: "der Verkehr", tr: "trafik", en: "traffic" },
      { de: "der Arbeitsweg", tr: "işe gidiş yolu", en: "commute" },
      { de: "unterwegs sein", tr: "yolda olmak", en: "to be on the way" },
      { de: "mitfahren", tr: "birlikte gitmek", en: "to ride along" },
      { de: "die Nachtschicht", tr: "gece vardiyası", en: "night shift" },
      { de: "stressig", tr: "stresli", en: "stressful" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Sinan", text: "Hallo Frau Petrow, hier ist Sinan. Ich komme heute leider später." },
      { speaker: "Frau Petrow", text: "Guten Morgen. Wie viel später denn?" },
      { speaker: "Sinan", text: "Etwa vierzig Minuten. Ich bin schon unterwegs, denn der Verkehr auf der B5 steht komplett." },
      { speaker: "Frau Petrow", text: "Kein Problem. Wir verschieben das Meeting auf zehn." },
      { speaker: "Sinan", text: "Danke. Mein Arbeitsweg ist normalerweise dreißig Minuten, heute wird es fast eine Stunde." },
      { speaker: "Frau Petrow", text: "Fahren Sie eigentlich immer allein?" },
      { speaker: "Sinan", text: "Meistens ja. Nächste Woche fahre ich bei einem Kollegen mit, das ist weniger stressig." },
      { speaker: "Frau Petrow", text: "Gute Idee. Und denken Sie an den neuen Dienstplan — Sie haben ab Montag Nachtschicht." },
    ],
    questions: [
      {
        text: "Wie viel später kommt Sinan?",
        options: ["Zwanzig Minuten", "Etwa vierzig Minuten", "Eine Stunde"],
        answer: 1,
        explain: "„Etwa vierzig Minuten.“ Bir saat, bugünkü toplam yol süresi.",
      },
      {
        kind: "gapfill",
        text: "Ich bin schon unterwegs, ___ der Verkehr auf der B5 steht komplett.",
        options: [],
        answer: 0,
        accept: ["denn"],
        explain: "Bu bağlaç söz dizimine dokunmaz: fiil ikinci sırada kalır, sona gitmez.",
      },
      {
        text: "Was passiert mit dem Meeting?",
        options: ["Es fällt aus.", "Es wird auf zehn verschoben.", "Es beginnt früher."],
        answer: 1,
        explain: "„Wir verschieben das Meeting auf zehn.“",
      },
      {
        kind: "short_answer",
        text: "Was hat Sinan ab Montag?",
        options: [],
        answer: 0,
        accept: ["Nachtschicht", "Nachtschicht ab Montag"],
        explain: "„denken Sie an den neuen Dienstplan — Sie haben ab Montag Nachtschicht“.",
      },
    ],
  },
  {
    id: "a2-u11-l2",
    level: "A2",
    skill: "listening",
    unit: 11,
    title: "Der erste Tag im Büro",
    genre: "Diyalog",
    intro: "İşteki ilk gün. Kim kim, kim kiminle çalışıyor?",
    gloss: [
      { de: "der Arbeitskollege", tr: "iş arkadaşı", en: "work colleague" },
      { de: "das Team", tr: "ekip", en: "team" },
      { de: "die Teamarbeit", tr: "takım çalışması", en: "teamwork" },
      { de: "der Geschäftsführer", tr: "genel müdür", en: "managing director" },
      { de: "der Azubi", tr: "çırak", en: "trainee" },
      { de: "zusammenarbeiten", tr: "birlikte çalışmak", en: "to work together" },
      { de: "das Büro", tr: "ofis", en: "office" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Adam", text: "Willkommen im Team! Ich zeige Ihnen kurz das Büro. Darf ich Ihnen erst meine Kollegen vorstellen?" },
      { speaker: "Herr Nowak", text: "Sehr gern." },
      { speaker: "Frau Adam", text: "Das ist Timo, unser Azubi im zweiten Jahr. Und dort hinten sitzt Frau Klein — mit ihr arbeiten Sie am meisten zusammen." },
      { speaker: "Herr Nowak", text: "Und wo sitzt der Geschäftsführer?" },
      { speaker: "Frau Adam", text: "Herr Bergmann hat ein eigenes Büro im dritten Stock. Er kommt aber fast jeden Tag zu uns runter." },
      { speaker: "Herr Nowak", text: "Wie läuft das hier normalerweise — arbeitet jeder allein?" },
      { speaker: "Frau Adam", text: "Nein, bei uns ist Teamarbeit wichtig. Wir haben jeden Montag eine kurze Runde um neun." },
      { speaker: "Herr Nowak", text: "Gut zu wissen. Und wo ist mein Platz?" },
      { speaker: "Frau Adam", text: "Gleich hier vorne, neben Timo." },
    ],
    questions: [
      {
        text: "Wer ist Timo?",
        options: ["Der Geschäftsführer", "Der Azubi", "Ein Kunde"],
        answer: 1,
        explain: "„Das ist Timo, unser Azubi im zweiten Jahr.“",
      },
      {
        kind: "gapfill",
        text: "Mit ihr arbeiten Sie am meisten ___.",
        options: [],
        answer: 0,
        accept: ["zusammen"],
        explain: "„zusammenarbeiten“ ayrılabilen bir fiil; şimdiki zamanda ön ek cümlenin sonuna düşer.",
      },
      {
        text: "Wo sitzt der Geschäftsführer?",
        options: ["Neben Timo", "Im dritten Stock", "Bei Frau Klein"],
        answer: 1,
        explain: "„Herr Bergmann hat ein eigenes Büro im dritten Stock.“",
      },
      {
        kind: "dictation",
        text: "Frau Adam'ın meslektaşlarını tanıtmak için sorduğu kibar soruyu yaz.",
        options: [],
        answer: 0,
        accept: ["Darf ich Ihnen erst meine Kollegen vorstellen?"],
        explain: "Kendisine tanıtılan kişi yönelme hâlinde (Ihnen), tanıtılanlar belirtme hâlinde, asıl fiil sonda.",
      },
    ],
  },
  {
    id: "a2-u11-w1",
    level: "A2",
    skill: "writing",
    unit: 11,
    title: "weil, denn oder wegen?",
    genre: "Dil bilgisi",
    intro: "Aynı sebep, üç yapı, üç ayrı söz dizimi. Seçimi yaptığın an sıra da belli oluyor.",
    gloss: [
      { de: "weil", tr: "çünkü", en: "because" },
      { de: "denn", tr: "çünkü", en: "because" },
      { de: "wegen", tr: "yüzünden", en: "because of" },
      { de: "der Verkehr", tr: "trafik", en: "traffic" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Almanca öğreniyorum çünkü burada çalışıyorum.",
        answer: "Ich lerne Deutsch, weil ich hier arbeite",
        hint: "Bu bağlaç yan cümle açar ve fiil EN SONA gider: „… weil ich hier arbeite“.",
      },
      {
        kind: "build",
        tr: "Geç geliyorum çünkü trafik berbat.",
        answer: "Ich komme später, denn der Verkehr ist schlimm",
        hint: "Bu bağlaç söz dizimine dokunmaz: virgülden sonra düz cümle, fiil ikinci sırada.",
      },
      {
        kind: "build",
        tr: "İş yüzünden Almanca öğreniyorum.",
        answer: "Wegen der Arbeit lerne ich Deutsch",
        hint: "Bu bir edat, yan cümle kurmaz. Başta olduğu için özne fiilin arkasına düşer.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: bu bağlaç fiili sona atmaz.",
        source: "Ich komme später, denn der Verkehr schlimm ist.",
        answer: "Ich komme später, denn der Verkehr ist schlimm.",
        alternatives: ["Ich komme später, denn der Verkehr ist schlimm"],
        why: "Fiili sona atan „weil“; „denn“den sonra cümle normal kurulur ve fiil ikinci sırada kalır.",
      },
    ],
  },
  {
    id: "a2-u11-w2",
    level: "A2",
    skill: "writing",
    unit: 11,
    title: "Eine kurze Bewerbung schreiben",
    genre: "Resmî yazı",
    intro: "İş ilanına kısa bir başvuru yaz: kimsin, neden yazıyorsun, ne zaman başlayabilirsin?",
    gloss: [
      { de: "die Bewerbung", tr: "iş başvurusu", en: "application" },
      { de: "die Ausbildung", tr: "meslek eğitimi", en: "vocational training" },
      { de: "der Nebenjob", tr: "ek iş", en: "side job" },
      { de: "das Bewerbungsgespräch", tr: "iş görüşmesi", en: "job interview" },
      { de: "weil", tr: "çünkü", en: "because" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "İlana kısa bir başvuru e-postası yaz. Kim olduğunu söyle, neden başvurduğunu bir sebep cümlesiyle anlat ve ne zaman başlayabileceğini yaz.",
        stimulus:
          "CAFÉ LINDE SUCHT VERSTÄRKUNG\n\nWir suchen ab Januar jemanden für den Service. Keine Ausbildung nötig, aber gute Deutschkenntnisse. Auch als Nebenjob am Wochenende möglich.\n\nWir bieten einen festen Vertrag und ein Gehalt über dem Minimum.\n\nIhre Bewerbung per E-Mail an info@cafe-linde.de — zwei Sätze reichen.",
        checklist: [
          "Resmî hitapla başladın mı („Sehr geehrte Damen und Herren“)?",
          "Hangi ilan için yazdığını söyledin mi?",
          "Sebebini „weil“ ya da „denn“ ile yazdın mı?",
          "Ne zaman başlayabileceğini ve resmî bir kapanışı ekledin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Ich bewerbe mich auf Ihre Anzeige.", tr: "ilanınıza başvuruyorum", en: "I am applying to your advert" },
          { de: "Ich habe schon in einem Café gearbeitet.", tr: "daha önce bir kafede çalıştım", en: "I have already worked in a café" },
          { de: "Ich kann ab Januar anfangen.", tr: "ocaktan itibaren başlayabilirim", en: "I can start in January" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\nich bewerbe mich auf Ihre Anzeige für den Service im Café Linde.\n\nIch heiße Amina Yildiz und bin 27 Jahre alt. Ich habe zwei Jahre in einem Café in Bremen gearbeitet, zuerst als Nebenjob und später in Vollzeit. Ich möchte gern bei Ihnen arbeiten, weil ich die Arbeit mit Gästen sehr mag und Ihr Café ganz in meiner Nähe ist.\n\nIch kann ab dem 8. Januar anfangen. Zu einem Bewerbungsgespräch komme ich gern jederzeit.\n\nMit freundlichen Grüßen\nAmina Yildiz",
      },
    ],
  },
];

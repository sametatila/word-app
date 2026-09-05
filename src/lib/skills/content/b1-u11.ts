import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 11 — "Edilgen çatı ve resmî yazışma" (dersler 41–44).
 *
 * Dersler: Passiv · Passiv in der Vergangenheit · Bei der Ausländerbehörde ·
 * Widerspruch schreiben.
 *
 * Edilgen çatı Türkçe konuşan için yarı tanıdık ve tuzak tam orada: Türkçede
 * edilgenlik TEK EKTİR (-il/-in), Almancada İKİ PARÇADIR (werden + Partizip II)
 * ve iki parçanın da ayrı ayrı yanlış gitmesi mümkün. Üç ayrı hata çıkıyor:
 *   1. ortaç yerine mastar   "muss gemeldet werden" değil "melden werden"
 *   2. eylem/durum ayrımı    Türkçe "onaylandı" ikisini de karşılar; Almanca
 *                            WURDE genehmigt (eylem) ≠ WAR genehmigt (durum)
 *   3. eyleyenin hâli        "tarafından" → von, ama von DATİV ister
 * (1) ünite 4'te çalışıldı; bu ünite (2) ve (3)'ü alıyor.
 *
 * Yeni 32 kelime: der Bereich, verbieten, das Verbot, die Vorschrift,
 * die Regel, offiziell, betreten, illegal, die Behörde, beantragen,
 * die Unterlagen, das Dokument, genehmigen, die Zustimmung, das Schreiben,
 * der Bescheid, benötigen, ablaufen, das Visum, der Anspruch, der Bürger,
 * rechtlich, die Dauer, informieren, die Anlage, hiermit, begründen,
 * der Beweis, das Gesetz, die Form, worüber, entschlossen.
 */
export const b1U11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u11-r1",
    level: "B1",
    skill: "reading",
    unit: 11,
    title: "Was hier gilt",
    genre: "Kurum yönergesi",
    intro: "Bir kurumun kuralları. Kim yapıyor değil, ne yapılıyor — çatıya dikkat et.",
    minutes: 5,
    gloss: [
      { de: "der Bereich", tr: "alan / bölüm", en: "area" },
      { de: "die Vorschrift", tr: "yönerge", en: "regulation" },
      { de: "betreten", tr: "girmek", en: "to enter" },
      { de: "verbieten", tr: "yasaklamak", en: "to forbid" },
      { de: "offiziell", tr: "resmî", en: "official" },
    ],
    text:
      "In diesem Gebäude gelten offizielle Vorschriften. Sie werden nicht gemacht, " +
      "um jemanden zu ärgern, sondern weil hier auch mit gefährlichen Sachen " +
      "gearbeitet wird.\n\n" +
      "Der hintere Bereich darf nur mit Ausweis betreten werden. Ohne Ausweis wird " +
      "niemand hereingelassen, auch Mitarbeiter nicht. Das Rauchen ist im ganzen " +
      "Haus verboten; das Verbot gilt auch auf der Terrasse.\n\n" +
      "Wer eine Regel nicht kennt, fragt am Eingang. Es ist nicht illegal, etwas " +
      "nicht zu wissen — es ist nur gefährlich. Fehler werden hier nicht bestraft, " +
      "sondern erklärt.\n\n" +
      "Neue Vorschriften werden immer schriftlich mitgeteilt. Sie hängen zwei Wochen " +
      "am Eingang, bevor sie gelten. Wer damit nicht einverstanden ist, kann das " +
      "sagen: dafür ist der Donnerstag da.",
    questions: [
      {
        text: "Warum gibt es die Vorschriften?",
        options: ["Um Leute zu ärgern", "Weil mit gefährlichen Sachen gearbeitet wird", "Weil das Gesetz es sagt"],
        answer: 1,
        explain: "„… sondern weil hier auch mit gefährlichen Sachen gearbeitet wird.“",
      },
      {
        text: "Wer darf den hinteren Bereich betreten?",
        options: ["Alle Mitarbeiter", "Nur Leute mit Ausweis", "Niemand"],
        answer: 1,
        explain: "„Der hintere Bereich darf nur mit Ausweis betreten werden.“",
      },
      {
        text: "Was passiert mit Fehlern?",
        options: ["Sie werden bestraft", "Sie werden erklärt", "Sie werden vergessen"],
        answer: 1,
        explain: "„Fehler werden hier nicht bestraft, sondern erklärt.“",
      },
      {
        kind: "gapfill",
        text: "Neue Vorschriften ___ immer schriftlich ___.",
        options: [],
        answer: 0,
        accept: ["werden mitgeteilt"],
        explain: "Edilgen: werden + Partizip II. Mastar (mitteilen) gelmez.",
      },
      {
        kind: "short_answer",
        text: "Wie lange hängen neue Vorschriften am Eingang?",
        options: [],
        answer: 0,
        accept: ["zwei Wochen", "2 Wochen"],
        explain: "„Sie hängen zwei Wochen am Eingang, bevor sie gelten.“",
      },
    ],
  },
  {
    id: "b1-u11-r2",
    level: "B1",
    skill: "reading",
    unit: 11,
    title: "Der Antrag wurde genehmigt",
    genre: "Süreç anlatımı",
    intro: "Bir başvuru süreci. Ne zaman 'wurde', ne zaman 'war' kullanıldığına dikkat et.",
    minutes: 6,
    gloss: [
      { de: "beantragen", tr: "başvurmak", en: "to apply for" },
      { de: "die Unterlagen", tr: "evrak", en: "documents" },
      { de: "genehmigen", tr: "onaylamak", en: "to approve" },
      { de: "der Bescheid", tr: "resmî yanıt", en: "official notice" },
      { de: "ablaufen", tr: "süresi dolmak", en: "to expire" },
    ],
    text:
      "Im März habe ich bei der Behörde ein neues Visum beantragt. Mein Visum " +
      "wäre im Juni abgelaufen, deshalb war ich früh dran.\n\n" +
      "Zuerst wurden alle Unterlagen geprüft. Ein Dokument fehlte, und ich wurde " +
      "angerufen. Nachdem ich es geschickt hatte, wurde der Antrag an die nächste " +
      "Stelle gegeben. Die Zustimmung wurde dort im Mai gegeben.\n\n" +
      "Der Bescheid kam per Post. Als ich ihn öffnete, war schon alles genehmigt — " +
      "ich musste nichts mehr tun. Zwischen dem ersten Termin und dem Bescheid " +
      "lagen elf Wochen. Die Dauer war lang, aber sie wurde mir am Anfang " +
      "ehrlich gesagt.\n\n" +
      "Mein Rat: Fragen Sie am Schalter, welche Unterlagen benötigt werden, und " +
      "machen Sie von allem ein Foto. Ein Bürger hat einen Anspruch darauf, " +
      "über den Stand informiert zu werden.",
    questions: [
      {
        text: "Wann wäre das Visum abgelaufen?",
        options: ["Im März", "Im Mai", "Im Juni"],
        answer: 2,
        explain: "„Mein Visum wäre im Juni abgelaufen …“",
      },
      {
        text: "Warum wurde die Person angerufen?",
        options: ["Ein Dokument fehlte", "Der Antrag war falsch", "Der Termin fiel aus"],
        answer: 0,
        explain: "„Ein Dokument fehlte, und ich wurde angerufen.“",
      },
      {
        text: "Wie lange dauerte alles?",
        options: ["Elf Wochen", "Drei Wochen", "Ein Jahr"],
        answer: 0,
        explain: "„Zwischen dem ersten Termin und dem Bescheid lagen elf Wochen.“",
      },
      {
        kind: "gapfill",
        text: "Die Zustimmung ___ dort im Mai gegeben.",
        options: [],
        answer: 0,
        accept: ["wurde"],
        explain: "Bir OLAY anlatılıyor (mayısta verildi) → wurde. „war“ durumu anlatırdı.",
      },
      {
        kind: "short_answer",
        text: "Wie kam der Bescheid?",
        options: [],
        answer: 0,
        accept: ["per Post", "mit der Post", "Post"],
        explain: "„Der Bescheid kam per Post.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u11-l1",
    level: "B1",
    skill: "listening",
    unit: 11,
    title: "Am Schalter",
    genre: "Kurum gişesi",
    intro: "Bir başvuru gişede konuşuluyor. Hangi evrak eksik, süre ne kadar?",
    minutes: 4,
    gloss: [
      { de: "die Behörde", tr: "resmî kurum", en: "authority" },
      { de: "benötigen", tr: "gerekmek", en: "to require" },
      { de: "das Dokument", tr: "belge", en: "document" },
      { de: "die Dauer", tr: "süre", en: "duration" },
    ],
    segments: [
      { text: "Guten Tag. Ich möchte ein neues Visum beantragen." },
      { text: "Gern. Welche Unterlagen haben Sie dabei?" },
      { text: "Den Ausweis, den Vertrag und die letzten drei Abrechnungen." },
      { text: "Gut. Ein Dokument wird noch benötigt: die Anmeldung der Wohnung." },
      { text: "Die habe ich zu Hause. Kann ich sie später schicken?" },
      { text: "Ja, per Post oder online. Erst danach wird der Antrag geprüft." },
      { text: "Und wie lang ist die Dauer etwa?" },
      { text: "Etwa acht Wochen. Der Bescheid wird Ihnen dann zugeschickt." },
    ],
    questions: [
      {
        text: "Welches Dokument fehlt?",
        options: ["Der Ausweis", "Die Anmeldung der Wohnung", "Der Vertrag"],
        answer: 1,
        explain: "„Ein Dokument wird noch benötigt: die Anmeldung der Wohnung.“",
      },
      {
        text: "Wann wird der Antrag geprüft?",
        options: ["Sofort", "Erst nach dem fehlenden Dokument", "Nach acht Wochen"],
        answer: 1,
        explain: "„Erst danach wird der Antrag geprüft.“",
      },
      {
        text: "Wie lange dauert es etwa?",
        options: ["Acht Wochen", "Drei Wochen", "Ein halbes Jahr"],
        answer: 0,
        explain: "„Etwa acht Wochen.“",
      },
      {
        kind: "gapfill",
        text: "Der Bescheid ___ Ihnen dann ___.",
        options: [],
        answer: 0,
        accept: ["wird zugeschickt"],
        explain: "Edilgen: wird + Partizip II (zugeschickt).",
      },
      {
        kind: "short_answer",
        text: "Wie viele Abrechnungen hat die Person dabei?",
        options: [],
        answer: 0,
        accept: ["drei", "die letzten drei", "drei Abrechnungen"],
        explain: "„Den Ausweis, den Vertrag und die letzten drei Abrechnungen.“",
      },
    ],
  },
  {
    id: "b1-u11-l2",
    level: "B1",
    skill: "listening",
    unit: 11,
    title: "Soll ich Widerspruch schreiben?",
    genre: "Danışma konuşması",
    intro: "Biri olumsuz bir karara itiraz etmeyi düşünüyor. Neye dayanacak?",
    minutes: 4,
    gloss: [
      { de: "der Anspruch", tr: "hak talebi", en: "claim" },
      { de: "begründen", tr: "gerekçelendirmek", en: "to justify" },
      { de: "der Beweis", tr: "kanıt", en: "evidence" },
      { de: "entschlossen", tr: "kararlı", en: "determined" },
    ],
    segments: [
      { text: "Der Bescheid ist da. Mein Antrag wurde abgelehnt." },
      { text: "Worüber genau? Steht ein Grund drin?" },
      { text: "Ja, angeblich fehlt ein Beweis für meine Wohnzeit." },
      { text: "Dann hast du rechtlich einen Anspruch auf Widerspruch." },
      { text: "Ich habe vier Wochen Zeit, oder?" },
      { text: "Genau. Und du musst ihn schriftlich begründen." },
      { text: "Die alten Verträge habe ich noch. Die lege ich als Anlage bei." },
      { text: "Sehr gut. Dann bist du entschlossen — schreib ihn heute." },
    ],
    questions: [
      {
        text: "Was ist mit dem Antrag passiert?",
        options: ["Er wurde genehmigt", "Er wurde abgelehnt", "Er ist noch offen"],
        answer: 1,
        explain: "„Der Bescheid ist da. Mein Antrag wurde abgelehnt.“",
      },
      {
        text: "Was fehlt angeblich?",
        options: ["Ein Beweis für die Wohnzeit", "Der Ausweis", "Die Zustimmung"],
        answer: 0,
        explain: "„… angeblich fehlt ein Beweis für meine Wohnzeit.“",
      },
      {
        text: "Was legt die Person als Anlage bei?",
        options: ["Fotos", "Die alten Verträge", "Nichts"],
        answer: 1,
        explain: "„Die alten Verträge habe ich noch. Die lege ich als Anlage bei.“",
      },
      {
        kind: "gapfill",
        text: "Mein Antrag ___ abgelehnt.",
        options: [],
        answer: 0,
        accept: ["wurde"],
        explain: "Geçmişte bir OLAY: wurde + Partizip II.",
      },
      {
        kind: "short_answer",
        text: "Wie lange hat man Zeit für den Widerspruch?",
        options: [],
        answer: 0,
        accept: ["vier Wochen", "4 Wochen"],
        explain: "„Ich habe vier Wochen Zeit, oder?“ — „Genau.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u11-w1",
    level: "B1",
    skill: "writing",
    unit: 11,
    title: "Der Weg des Antrags",
    genre: "Süreç raporu",
    intro: "Bir başvurunun aşamalarını yaz. Olay mı durum mu — çatıyı ona göre seç.",
    minutes: 8,
    gloss: [
      { de: "beantragen", tr: "başvurmak", en: "to apply for" },
      { de: "genehmigen", tr: "onaylamak", en: "to approve" },
      { de: "die Zustimmung", tr: "onay", en: "approval" },
      { de: "die Unterlagen", tr: "evrak", en: "documents" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Evrak mart ayında kontrol edildi.",
        answer: "Die Unterlagen wurden im März geprüft.",
        hint: "Geçmişte olay: wurden + Partizip II.",
      },
      {
        kind: "build",
        tr: "Bir belge daha gerekiyor.",
        answer: "Ein weiteres Dokument wird benötigt.",
        hint: "Şimdiki edilgen: wird + Partizip II.",
      },
      {
        kind: "build",
        tr: "Mektubu açtığımda her şey çoktan onaylanmıştı.",
        answer: "Als ich den Brief öffnete, war schon alles genehmigt.",
        hint: "Burada DURUM anlatılıyor, olay değil: war + Partizip II.",
      },
      {
        kind: "form",
        prompt: "Başvuru takip kartını doldur.",
        facts: "Başvuran: Nuri Öz; başvuru: yeni vize; başvuru ayı: mart; eksik belge: konut kaydı; süre: 8 hafta.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Antrag", answer: "neues Visum", accept: ["ein neues Visum", "Visum"] },
          { label: "Monat", answer: "März", accept: ["im März"] },
          { label: "Dauer", answer: "8 Wochen", accept: ["acht Wochen", "etwa acht Wochen"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Olayı anlatan çatıyı düzelt.",
        source: "Der Antrag war letzte Woche genehmigt.",
        answer: "Der Antrag wurde letzte Woche genehmigt.",
        why: "Türkçe 'onaylandı' hem olayı hem durumu karşılar, o yüzden ayrım görünmüyor. Almanca ayırır: WURDE genehmigt bir OLAYDIR (geçen hafta onaylama işlemi oldu), WAR genehmigt bir DURUMDUR (o an zaten onaylıydı). 'letzte Woche' bir zaman noktası verdiği için burada olay anlatılıyor.",
      },
    ],
  },
  {
    id: "b1-u11-w2",
    level: "B1",
    skill: "writing",
    unit: 11,
    title: "Widerspruch",
    genre: "Resmî itiraz",
    intro: "Olumsuz karara itiraz et. Kararı kimin verdiğini doğru biçimde göster.",
    minutes: 12,
    gloss: [
      { de: "hiermit", tr: "işbu yazıyla", en: "hereby" },
      { de: "begründen", tr: "gerekçelendirmek", en: "to justify" },
      { de: "die Anlage", tr: "ek", en: "enclosure" },
      { de: "das Gesetz", tr: "kanun", en: "law" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "İşbu yazıyla 12 Mart tarihli karara itiraz ediyorum.",
        answer: "Hiermit lege ich Widerspruch gegen den Bescheid vom 12. März ein.",
        hint: "„hiermit“ birinci öğe: fiil hemen arkasından, önek sonda.",
      },
      {
        kind: "build",
        tr: "Karar kurum tarafından yeterince gerekçelendirilmedi.",
        answer: "Die Entscheidung wurde von der Behörde nicht ausreichend begründet.",
        hint: "Eyleyen: von + Dativ.",
      },
      {
        kind: "free",
        prompt: "Bir başvurunun reddine itiraz mektubu yaz: hangi karara itiraz ettiğini (tarih ve numara), neden itiraz ettiğini, hangi belgeleri ek olarak gönderdiğini ve ne istediğini yaz. Resmî hitap ve kapanış kullan.",
        checklist: [
          "Resmî hitap ve kapanış var mı?",
          "Hangi karara itiraz edildiği (tarih) belirtilmiş mi?",
          "Gerekçe açık mı?",
          "Ekler sayılmış mı (Anlage)?",
          "Ne istendiği net mi?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "hiermit lege ich Widerspruch gegen Ihren Bescheid vom 12. März ein.\n\n" +
          "In dem Schreiben wird gesagt, dass ein Beweis für meine Wohnzeit fehlt. " +
          "Das ist nicht richtig. Die Wohnung wurde von mir im Januar angemeldet, " +
          "und der Vertrag wurde damals bei Ihnen abgegeben. Die Entscheidung wurde " +
          "deshalb von der Behörde auf einer falschen Grundlage getroffen.\n\n" +
          "Als Anlage schicke ich zwei Dokumente: den alten Vertrag und die Anmeldung. " +
          "Beide Dokumente sind offiziell und mit Datum.\n\n" +
          "Ich bitte Sie, den Antrag noch einmal zu prüfen und mich über den Stand " +
          "zu informieren.\n\n" +
          "Mit freundlichen Grüßen\nLeyla Kaya",
        phrases: [
          { de: "Hiermit lege ich Widerspruch ein.", tr: "İşbu yazıyla itiraz ediyorum.", en: "I hereby lodge an objection." },
          { de: "Als Anlage schicke ich …", tr: "Ek olarak gönderiyorum …", en: "Enclosed I am sending …" },
          { de: "Ich bitte Sie, … zu prüfen.", tr: "… incelemenizi rica ederim.", en: "I ask you to check …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Eyleyenin hâlini düzelt.",
        source: "Der Bescheid wurde von die Behörde geschickt.",
        answer: "Der Bescheid wurde von der Behörde geschickt.",
        why: "Türkçe 'tarafından' hâl istemez, o yüzden 'von' bir edat değil bir etiket sanılıp isim yalın bırakılıyor. Almancada von DAİMA Dativ ister: von der Behörde, von dem Amt, von den Kollegen — özne biçimi (die Behörde) burada hiç gelmez.",
      },
    ],
  },
];

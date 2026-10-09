/**
 * AI değerlendirme kalite testi — `npm run test:assess` (WP-03, adım 5)
 *
 *   CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_AI_TOKEN=... npm run test:assess
 *   CHAT_PROVIDER=groq GROQ_API_KEY=... npm run test:assess     (tek sağlayıcı)
 *   npm run test:assess -- --json                                 (ham çıktıyı da bas)
 *   npm run test:assess -- --only a2-w-mixed                     (tek örnek)
 *
 * 32 örnek cevap (A1–B2, doğru/yanlış/karışık, dört tür). Her örnekte insan
 * değerlendirmesi (rubrik puanları ve beklenen hata tipleri) önceden yazılı;
 * betik modelin puanını bununla karşılaştırır: alt puan farkı ±1 içinde mi,
 * beklenen hata tipleri yakalandı mı, hata span'leri metinde doğru yeri
 * gösteriyor mu, ayrıştırıcı JSON'u okuyabildi mi.
 *
 * Sonuçlar `docs/plan/assess-samples.md`'ye elle işlenir: bu betik ölçer,
 * karar insanın. Üretimle aynı istem ve aynı ayrıştırıcı kullanılır
 * (`assess-prompts.ts`); sağlayıcı zinciri de üretimdeki (`completeChat`).
 */
import "dotenv/config";
import { completeChat, chatProviders } from "../src/lib/chat-providers";
import {
  ASSESS_MAX_TOKENS,
  assessSystemPrompt,
  assessUserMessage,
  isLengthAdvice,
  minWordsFrom,
  parseAssessment,
  type AssessRequest,
} from "../src/lib/assess-prompts";
import type { ErrorType } from "../src/lib/errors";
import { enforceSeparable, findSeparableMisses, separableNotes } from "../src/lib/separable-check";

type Sample = {
  id: string;
  req: AssessRequest;
  /** İnsan puanı (0–4 × 4). */
  human: { task: number; grammar: number; vocab: number; structure: number };
  /** Yakalanması beklenen hata tipleri (alt küme). */
  expectErrors: ErrorType[];
  /** Metinde işaretlenmesi beklenen parçalar. */
  expectSpans?: string[];
  /**
   * Hedef uzunluk tutmuş: modelin HAM ipucu uzunluk tavsiyesi vermemeli
   * (ayrıştırıcının son kilidinden ÖNCE ölçülüyor; kilit onu zaten siler).
   */
  noLengthTip?: boolean;
  /**
   * Düzeltilmiş metin bu kalıba uymalı. Başa zarf + özne + fiil yazana ("Heute ich gehe") doğru
   * düzeltme TERSİNE ÇEVİRMEK (Heute gehe ich); zarfı sona atmak anlamı değiştiriyor (Samet,
   * 2026-10-07: "Erst ich schicke…" → "…den Brief erst zu" düzeltmesi "önce"yi "ancak"a çevirdi).
   */
  expectCorrected?: RegExp;
};

const S = (
  id: string,
  kind: AssessRequest["kind"],
  level: AssessRequest["level"],
  prompt: string,
  text: string,
  human: Sample["human"],
  expectErrors: ErrorType[],
  extra: Partial<AssessRequest["task"]> = {},
  expectSpans?: string[],
): Sample => ({
  id,
  /* Örnekler Türkçe geri bildirim bekliyor: insan puanları da Türkçe yazıldı. */
  /* Örnek küme ALMANCA kursun; `lang` zorunlu alan (bkz. assess-prompts). */
  req: { kind, level, lang: "de", task: { prompt, ...extra }, answer: { text }, native: "tr" },
  human,
  expectErrors,
  expectSpans,
});

const VERLAUFEN_SCENE = "Kaybolduğunu fark ettin ve bir dükkâna girip yardım istedin. Durumunu anlat, nereye gitmek istediğini söyle, tarifi dinle ve emin olmak için tekrar et.";
const VERLAUFEN_PARTNER = "sakin sakin tarif eden, sabırlı bir dükkân sahibi";
const VERLAUFEN_TARGETS = ["Ich habe mich verlaufen.", "Nehmen Sie die zweite Straße.", "Biegen Sie an der Ampel rechts ab."];

export const SAMPLES: Sample[] = [
  // ── A1 cümle ─────────────────────────────────────────────────────
  S("a1-s-ok", "sentence", "A1", "Çevir: Ben kahve içiyorum.", "Ich trinke Kaffee.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { target: "Ich trinke Kaffee." }),
  S("a1-s-conj", "sentence", "A1", "Çevir: O (kadın) Berlin'de yaşıyor.", "Sie wohne in Berlin.", { task: 3, grammar: 2, vocab: 4, structure: 4 }, ["conjugation"], { target: "Sie wohnt in Berlin." }, ["wohne"]),
  { ...S("a1-s-verbpos", "sentence", "A1", "Çevir: Bugün sinemaya gidiyorum.", "Heute ich gehe ins Kino.", { task: 3, grammar: 2, vocab: 4, structure: 1 }, ["verb_position"], { target: "Heute gehe ich ins Kino." }, ["ich gehe"]), expectCorrected: /^Heute gehe ich/i },
  /* Cihazda görüldü (2026-10-07, Cümle Kur, kelime "erst"): öğrenci "erst"i "önce" anlamında başa koymuş. */
  { ...S("a2-s-erst-v2", "sentence", "A2", "'erst' kelimesini kullanarak bir cümle kur.", "Erst ich schicke der Brief zu Herr Devald", { task: 4, grammar: 1, vocab: 4, structure: 2 }, ["verb_position", "case"], {}, ["ich schicke", "der Brief"]), expectCorrected: /^Erst schicke ich\b/i },
  S("a1-s-article", "sentence", "A1", "'Tisch' kelimesiyle bir cümle kur.", "Die Tisch ist groß.", { task: 3, grammar: 2, vocab: 3, structure: 4 }, ["article"], {}, ["Die"]),
  S("a1-s-meaning", "sentence", "A1", "Çevir: Ben yorgunum.", "Ich bin hungrig.", { task: 0, grammar: 4, vocab: 1, structure: 4 }, ["meaning"], { target: "Ich bin müde." }, ["hungrig"]),
  // ── A2 ───────────────────────────────────────────────────────────
  S("a2-s-perfekt", "sentence", "A2", "Perfekt ile söyle: Dün futbol oynadım.", "Gestern habe ich Fußball gespielt.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { constraints: ["Perfekt kullan"] }),
  S("a2-s-perfekt-wrong", "sentence", "A2", "Perfekt ile söyle: Dün futbol oynadım.", "Gestern ich habe Fußball spielen.", { task: 2, grammar: 1, vocab: 4, structure: 2 }, ["verb_position", "conjugation"], { constraints: ["Perfekt kullan"] }, ["ich habe", "spielen"]),
  S("a2-s-case", "sentence", "A2", "Çevir: Arkadaşımla sinemaya gidiyorum.", "Ich gehe mit mein Freund ins Kino.", { task: 3, grammar: 2, vocab: 4, structure: 4 }, ["case"], { target: "Ich gehe mit meinem Freund ins Kino." }, ["mein Freund"]),
  S("a2-w-ok", "writing", "A2", "Arkadaşına kısa bir mesaj yaz: Yarın buluşmayı teklif et, saat ve yer söyle. (en az 30 kelime)", "Hallo Anna, wie geht es dir? Ich habe morgen frei. Wollen wir uns treffen? Wir können um drei Uhr im Café am Markt Kaffee trinken. Danach gehen wir vielleicht ins Kino. Schreib mir bitte, ob du Zeit hast. Liebe Grüße, Mehmet", { task: 4, grammar: 4, vocab: 3, structure: 4 }, [], { constraints: ["en az 30 kelime"] }),
  S("a2-w-mixed", "writing", "A2", "Arkadaşına kısa bir mesaj yaz: Yarın buluşmayı teklif et, saat ve yer söyle. (en az 30 kelime)", "Hallo Anna. Morgen ich habe frei. Wir treffen uns? Um drei Uhr in der Cafe. Ich möchte ein Kaffee trinken mit dir. Dann wir gehen Kino. Bitte schreiben mir. Tschüss", { task: 3, grammar: 1, vocab: 3, structure: 2 }, ["verb_position", "article"], { constraints: ["en az 30 kelime"] }, ["ich habe", "ein Kaffee"]),
  // ── B1 ───────────────────────────────────────────────────────────
  S("b1-s-weil", "sentence", "B1", "'weil' ile bağla: Evde kalıyorum. Hastayım.", "Ich bleibe zu Hause, weil ich krank bin.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { target: "Ich bleibe zu Hause, weil ich krank bin." }),
  S("b1-s-weil-wrong", "sentence", "B1", "'weil' ile bağla: Evde kalıyorum. Hastayım.", "Ich bleibe zu Hause, weil ich bin krank.", { task: 3, grammar: 2, vocab: 4, structure: 2 }, ["verb_position"], { target: "Ich bleibe zu Hause, weil ich krank bin." }, ["ich bin krank"]),
  S("b1-w-opinion", "writing", "B1", "Görüşünü yaz: Şehirde mi köyde mi yaşamak daha iyi? Sebep ver. (en az 60 kelime)", "Ich finde, dass das Leben in der Stadt besser ist. Erstens gibt es in der Stadt mehr Arbeitsplätze und man kann leicht einen Job finden. Zweitens sind die Verkehrsmittel gut, deshalb braucht man kein Auto. Außerdem gibt es viele Möglichkeiten für die Freizeit, zum Beispiel Kinos, Theater und Restaurants. Natürlich ist das Leben auf dem Land ruhiger und die Luft ist sauberer, aber für junge Leute ist die Stadt interessanter. Deshalb möchte ich lieber in der Stadt wohnen.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { constraints: ["en az 60 kelime"] }),
  S("b1-w-opinion-weak", "writing", "B1", "Görüşünü yaz: Şehirde mi köyde mi yaşamak daha iyi? Sebep ver. (en az 60 kelime)", "Ich denke Stadt ist besser. In der Stadt gibt es viele Arbeit. Auch gibt es Bus und Bahn. Ich kann Kino gehen und Restaurant. Das Land ist ruhig aber langweilig. Ich mag Stadt.", { task: 2, grammar: 2, vocab: 2, structure: 1 }, ["article", "word_order"], { constraints: ["en az 60 kelime"] }),
  S("b1-sp-ok", "speaking", "B1", "Kendini tanıt: ad, nereli, ne iş yapıyorsun, hobiler.", "ich heiße mehmet ich komme aus istanbul und wohne seit zwei jahren in zürich ich arbeite als ingenieur und in meiner freizeit spiele ich gern fußball", { task: 4, grammar: 4, vocab: 4, structure: 4 }, []),
  S("b1-sp-err", "speaking", "B1", "Kendini tanıt: ad, nereli, ne iş yapıyorsun, hobiler.", "ich heiße mehmet ich komme von istanbul und ich wohne in zürich seit zwei jahre ich arbeite ingenieur und ich spiele fußball gern", { task: 4, grammar: 2, vocab: 3, structure: 3 }, ["case"], {}, ["zwei jahre"]),
  S("b1-rp-ok", "chat", "B1", "Doktorda randevu al: şikâyetini söyle, gün ve saat kararlaştır.", "Guten Tag, ich hätte gern einen Termin bei Dr. Weber.\nIch habe seit drei Tagen starke Kopfschmerzen.\nGeht es auch am Donnerstagnachmittag?\nUm 15 Uhr passt mir gut. Vielen Dank, auf Wiedersehen.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { targets: ["Ich hätte gern einen Termin", "Ich habe ... Schmerzen", "Passt Ihnen ...?"] }),
  S("b1-rp-weak", "chat", "B1", "Doktorda randevu al: şikâyetini söyle, gün ve saat kararlaştır.", "Hallo, ich will Termin.\nKopf tut weh.\nDonnerstag ok?\nJa gut.", { task: 2, grammar: 2, vocab: 1, structure: 1 }, ["article"], { targets: ["Ich hätte gern einen Termin", "Ich habe ... Schmerzen", "Passt Ihnen ...?"] }),
  // ── WP-30 yazma örnekleri ───────────────────────────────────────
  S("a1-w-wohnung", "writing", "A1", "Kendini tanıt: nerede oturuyorsun, evin nasıl? (en az 25 kelime)", "Hallo, ich heiße Ayşe. Ich wohne in Berlin in eine kleine Wohnung. Die Wohnung hat zwei Zimmer und ein Balkon. Ich wohne mit meine Schwester. Wir mögen die Wohnung sehr.", { task: 4, grammar: 2, vocab: 3, structure: 3 }, ["case"], { constraints: ["en az 25 kelime"] }, ["eine kleine Wohnung", "meine Schwester"]),
  S("a1-w-tag", "writing", "A1", "Bir günün: sabah, öğle, akşam ne yapıyorsun? (en az 30 kelime)", "Ich stehe um sieben Uhr auf. Dann ich frühstücke und gehe zur Arbeit. Am Mittag esse ich in der Kantine. Am Abend koche ich und sehe fern. Um elf Uhr gehe ich ins Bett.", { task: 4, grammar: 3, vocab: 3, structure: 3 }, ["verb_position"], { constraints: ["en az 30 kelime"] }, ["ich frühstücke"]),
  S("a2-w-urlaub", "writing", "A2", "Geçen tatilini anlat (Perfekt kullan, en az 40 kelime).", "Letzten Sommer ich bin nach Italien gefahren. Das Wetter war sehr schön und ich habe jeden Tag am Strand gelegen. Ich habe viel Pizza gegessen und neue Freunde kennengelernt. Am Abend wir sind in die Stadt gegangen. Es war ein tolles Urlaub.", { task: 4, grammar: 2, vocab: 3, structure: 3 }, ["verb_position", "article"], { constraints: ["Perfekt kullan", "en az 40 kelime"] }, ["ich bin", "ein tolles Urlaub"]),
  S("a2-w-einladung", "writing", "A2", "Arkadaşını doğum gününe davet et: tarih, saat, yer, ne getirsin? (en az 40 kelime)", "Liebe Lena, ich habe am Samstag Geburtstag und möchte dich zu meiner Party einladen. Die Party beginnt um 19 Uhr bei mir zu Hause. Kannst du bitte einen Salat mitbringen? Sag mir bis Donnerstag Bescheid, ob du kommen kannst. Ich freue mich auf dich! Liebe Grüße, Mehmet", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { constraints: ["en az 40 kelime"] }),
  S("b1-w-beschwerde", "writing", "B1", "Komşuna gürültü hakkında kibar bir not yaz. (en az 50 kelime)", "Lieber Herr Schmidt, ich schreibe Ihnen, weil ich in den letzten Wochen oft nachts nicht schlafen kann. Die Musik aus Ihrer Wohnung ist sehr laut, besonders am Wochenende. Ich verstehe, dass Sie gern Musik hören, aber ich muss früh aufstehen. Könnten Sie die Musik nach 22 Uhr leiser machen? Vielen Dank für Ihr Verständnis. Mit freundlichen Grüßen, Ayşe Demir", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { constraints: ["en az 50 kelime", "kibar"] }),
  S("b1-w-meinung-weak", "writing", "B1", "Görüşün: Ev ofisi mi, ofis mi? Sebep ver. (en az 60 kelime)", "Ich denke Homeoffice ist besser weil man muss nicht fahren. Man kann mehr schlafen und mit Familie sein. Aber manchmal ist langweilig und man hat keine Kollegen. Im Büro ist mehr Kontakt aber auch mehr Stress. Für mich Homeoffice ist besser.", { task: 3, grammar: 2, vocab: 2, structure: 2 }, ["verb_position"], { constraints: ["en az 60 kelime"] }, ["man muss"]),
  // ── Ayrılabilir fiil (QA F-0072, 2026-10-09) ─────────────────────
  /* Puanlı konuşma, Ü15 "Ich habe mich verlaufen", QA'nın cevabı birebir: 3. turda
     "abbiegen"in öneki yok. Rubrik hata bulmamıştı (Dil bilgisi 4/4, %100; düzeltilmiş
     metne "ab"ı sessizce eklemiş ama hata listesine yazmamıştı). İstem kuralı + kod notu +
     çerçevede zorlama (`lib/separable-check`); üretimle aynı yoldan ölçülüyor. */
  S("a1-rp-trennbar-miss", "chat", "A1", `${VERLAUFEN_SCENE} (Sınav: ${VERLAUFEN_PARTNER} ile konuşma)`, "Ja, ich habe mich verlaufen. Ich suche den Bahnhof.\nOkay, ich gehe geradeaus. Und dann?\nIch nehme die zweite Strasse und biege an der Ampel rechts.\nDanke, jetzt verstehe ich das.\nIch gehe an der Post vorbei und biege rechts ab. Vielen Dank!", { task: 4, grammar: 3, vocab: 4, structure: 4 }, ["verb_position"], { targets: VERLAUFEN_TARGETS, constraints: ["5 tur", "yardım yok"] }, ["biege"]),
  S("a1-rp-trennbar-ok", "chat", "A1", `${VERLAUFEN_SCENE} (Sınav: ${VERLAUFEN_PARTNER} ile konuşma)`, "Ja, ich habe mich verlaufen. Ich suche den Bahnhof.\nOkay, ich gehe geradeaus. Und dann?\nIch nehme die zweite Straße und biege an der Ampel rechts ab.\nDanke, jetzt verstehe ich das.\nIch gehe an der Post vorbei und biege rechts ab. Vielen Dank!", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { targets: VERLAUFEN_TARGETS, constraints: ["5 tur", "yardım yok"] }),
  /* Öneksiz gövde kendi anlamıyla doğru: kural bunu hata saymamalı. */
  S("a1-rp-steigen-ok", "chat", "A1", "Gardaki danışmada Berlin trenini sor: aktarma var mı, hangi peron? (Sınav: danışma memuru ile konuşma)", "Guten Tag, ich möchte nach Berlin fahren.\nMuss ich umsteigen?\nGut, ich steige in Hannover um.\nUnd dann steige ich in den Zug nach Berlin.\nDanke schön!", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { targets: ["Muss ich umsteigen?", "Ich steige in Hannover um.", "Fährt der Zug direkt?"] }),
  S("a1-s-anrufen-miss", "sentence", "A1", "Çevir: Seni yarın ararım.", "Ich rufe dich morgen.", { task: 3, grammar: 2, vocab: 4, structure: 3 }, ["verb_position"], { target: "Ich rufe dich morgen an." }, ["rufe"]),
  // ── B2 ───────────────────────────────────────────────────────────
  S("b2-s-passiv", "sentence", "B2", "Passiv'e çevir: Man renoviert das Haus.", "Das Haus wird renoviert.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { target: "Das Haus wird renoviert." }),
  S("b2-w-formal", "writing", "B2", "Resmî şikâyet e-postası: aldığın ürün bozuk çıktı; iade ya da değişim iste. (en az 80 kelime)", "Sehr geehrte Damen und Herren, ich habe am 3. Mai bei Ihnen einen Staubsauger bestellt, der am 10. Mai geliefert wurde. Leider musste ich feststellen, dass das Gerät nicht funktioniert: Der Motor läuft zwar an, aber es wird keine Saugleistung erzeugt. Da es sich offensichtlich um einen Produktionsfehler handelt, bitte ich Sie, das Gerät umzutauschen oder mir den Kaufpreis zu erstatten. Die Rechnung habe ich beigefügt. Ich wäre Ihnen dankbar, wenn Sie sich innerhalb der nächsten Woche bei mir melden könnten. Mit freundlichen Grüßen, Mehmet Yilmaz", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { constraints: ["en az 80 kelime", "resmî kayıt"] }),
  /* Cihazda görüldü (2026-09-29): İngilizce B1 Deneme 1, yazma 1. Metin 102
     kelime, ekran "102 / 100" yeşil; model "100 kelimeye ulaşacak şekilde
     uzat" diyordu. Kısıt sınav ucunun gönderdiği biçimde. */
  {
    id: "en-b1-w-room-102",
    req: {
      kind: "writing",
      level: "B1",
      lang: "en",
      native: "tr",
      task: {
        prompt:
          "You are going to start a course in another city and you have written to a student residence. Read the reply below and write an email back. Write about 100 words and answer all the points.\n\nReply from the residence: \"Thank you for your interest. We have single rooms and shared apartments. Please tell us which you prefer and why. Rooms are available from September 1 or from October 1 — which date do you need? Finally, do you have any questions about the building?\"",
        constraints: ["Say which type of room you prefer and give a reason.", "Say which date you need and why.", "Ask at least one clear question about the building.", "mindestens 100 Wörter"],
      },
      answer: {
        text: "Dear Sir or Madam,\n\nThank you for your quick answer. I would prefer a single room, because I need a quiet place for studying. In my last flat I shared the kitchen with four people and it was very noisy, so I could not concentrate.\n\nI need the room from September 1. My course starts on September 5 and I want to have some days to learn the way to the school.\n\nI have two questions about the building. Is there a place where I can keep my bicycle? And can I use the washing machines every day?\n\nBest regards,\nDeniz Kaya",
      },
    },
    human: { task: 4, grammar: 4, vocab: 3, structure: 4 },
    expectErrors: [],
    noLengthTip: true,
  },
];

async function main() {
  const providers = chatProviders();
  if (!providers.length) {
    console.error("Sohbet sağlayıcısı yok: CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_AI_TOKEN ya da GROQ_API_KEY ver.");
    process.exit(2);
  }
  const showJson = process.argv.includes("--json");
  const onlyAt = process.argv.indexOf("--only");
  const only = onlyAt >= 0 ? process.argv[onlyAt + 1] : null;
  const samples = only ? SAMPLES.filter((s) => s.id === only) : SAMPLES;
  console.log(`Sağlayıcı zinciri: ${providers.map((p) => `${p.name}/${p.model}`).join(" → ")}\n`);

  let within = 0, subscores = 0, errorsHit = 0, errorsExpected = 0, spansOk = 0, spansExpected = 0, parsed = 0, extraErrorsOnClean = 0, lengthClean = 0, lengthExpected = 0, correctedOk = 0, correctedExpected = 0;
  for (const s of samples) {
    const started = Date.now();
    /* Üretimle aynı ön ve son işlem (`lib/assess`): kodun notu isteme, çerçevedeki eksik önek sonuca. */
    const separable = findSeparableMisses(s.req.answer.text, s.req);
    let raw = "";
    try {
      raw = await completeChat(assessSystemPrompt(s.req.kind, s.req.level, s.req.lang, s.req.native), [{ role: "user", content: assessUserMessage(s.req, separableNotes(separable)) }], ASSESS_MAX_TOKENS);
    } catch (err) {
      console.log(`✗ ${s.id}: sağlayıcı hatası — ${(err as Error).message}`);
      continue;
    }
    const got = parseAssessment(raw, s.req.answer.text, s.req.kind, minWordsFrom(s.req.task.constraints));
    const a = got && enforceSeparable(got, separable, s.req.native);
    if (!a) {
      // Ham çıktı tam basılıyor: kırpılmış hâlinden ayrıştırma hatasının
      // sebebi anlaşılmıyordu (tırnak, kesik JSON, tek tırnak kapanış…).
      console.log(`✗ ${s.id}: JSON ayrıştırılamadı\n   ${raw.slice(0, 1500)}`);
      continue;
    }
    parsed++;
    const diffs = (["task", "grammar", "vocab", "structure"] as const).map((k) => a.score[k] - s.human[k]);
    const okWithin = diffs.every((d) => Math.abs(d) <= 1);
    if (okWithin) within++;
    subscores += diffs.filter((d) => Math.abs(d) <= 1).length;
    const gotTypes = new Set(a.errors.map((e) => e.type));
    for (const t of s.expectErrors) {
      errorsExpected++;
      if (gotTypes.has(t)) errorsHit++;
    }
    if (!s.expectErrors.length && a.errors.length) extraErrorsOnClean++;
    for (const span of s.expectSpans ?? []) {
      spansExpected++;
      if (a.errors.some((e) => e.span[1] > e.span[0] && s.req.answer.text.slice(e.span[0], e.span[1]).toLowerCase().includes(span.toLowerCase().split(" ")[0]))) spansOk++;
    }
    const mark = okWithin ? "✓" : "△";
    console.log(
      `${mark} ${s.id.padEnd(18)} insan ${Object.values(s.human).join("/")}  model ${[a.score.task, a.score.grammar, a.score.vocab, a.score.structure].join("/")}  genel ${String(a.score.overall).padStart(3)}  hatalar [${a.errors.map((e) => e.type).join(", ")}]  ${Date.now() - started}ms`,
    );
    if (got && a !== got) console.log(`     (kod: model eksik öneki yazmadı, ayrılabilir fiil denetimi ekledi; modelin dil bilgisi puanı ${got.score.grammar})`);
    if (a.errors.length) for (const e of a.errors) console.log(`     · ${e.type}: "${e.wrong}" → "${e.fix}" — ${e.why_tr}`);
    console.log(`     övgü: ${a.praise_tr}\n     ipucu: ${a.next_tip_tr}`);
    if (s.expectCorrected) {
      correctedExpected++;
      if (s.expectCorrected.test(a.corrected.trim())) correctedOk++;
      else console.log(`     ✗ düzeltme anlamı/yapıyı korumuyor: ${a.corrected}`);
    }
    if (s.noLengthTip) {
      lengthExpected++;
      const hamIpucu = parseAssessment(raw, s.req.answer.text, s.req.kind)?.next_tip_tr ?? "";
      if (isLengthAdvice(hamIpucu)) console.log(`     ✗ hedef tuttuğu hâlde uzunluk tavsiyesi (ham): ${hamIpucu}`);
      else lengthClean++;
    }
    if (showJson) console.log(raw);
  }
  const n = samples.length;
  console.log(`\nÖzet: ${parsed}/${n} ayrıştı · ${within}/${parsed} örnekte dört alt puan ±1 içinde · alt puan isabeti ${subscores}/${parsed * 4} · beklenen hata tipi ${errorsHit}/${errorsExpected} · span ${spansOk}/${spansExpected} · temiz cevaba hata yazma ${extraErrorsOnClean} · hedef tutunca uzunluk tavsiyesi yok ${lengthClean}/${lengthExpected} · düzeltme yapıyı koruyor ${correctedOk}/${correctedExpected}`);
  console.log("Kabul (WP-03): ±1 içinde ≥ 16/20, hata tipi ≥ %75, span ≥ %75, temiz cevaba hata ≤ 2; uzunluk tavsiyesi hepsinde yok.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

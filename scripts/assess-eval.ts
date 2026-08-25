/**
 * AI değerlendirme kalite testi — `npm run test:assess` (WP-03, adım 5)
 *
 *   MISTRAL_API_KEY=... npm run test:assess
 *   CHAT_PROVIDER=groq GROQ_API_KEY=... npm run test:assess     (tek sağlayıcı)
 *   npm run test:assess -- --json                                 (ham çıktıyı da bas)
 *   npm run test:assess -- --only a2-w-mixed                     (tek örnek)
 *
 * 20 örnek cevap (A1–B2, doğru/yanlış/karışık, dört tür). Her örnekte insan
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
  parseAssessment,
  type AssessRequest,
} from "../src/lib/assess-prompts";
import type { ErrorType } from "../src/lib/errors";

type Sample = {
  id: string;
  req: AssessRequest;
  /** İnsan puanı (0–4 × 4). */
  human: { task: number; grammar: number; vocab: number; structure: number };
  /** Yakalanması beklenen hata tipleri (alt küme). */
  expectErrors: ErrorType[];
  /** Metinde işaretlenmesi beklenen parçalar. */
  expectSpans?: string[];
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
  req: { kind, level, task: { prompt, ...extra }, answer: { text }, locale: "tr" },
  human,
  expectErrors,
  expectSpans,
});

export const SAMPLES: Sample[] = [
  // ── A1 cümle ─────────────────────────────────────────────────────
  S("a1-s-ok", "sentence", "A1", "Çevir: Ben kahve içiyorum.", "Ich trinke Kaffee.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { target: "Ich trinke Kaffee." }),
  S("a1-s-conj", "sentence", "A1", "Çevir: O (kadın) Berlin'de yaşıyor.", "Sie wohne in Berlin.", { task: 3, grammar: 2, vocab: 4, structure: 4 }, ["conjugation"], { target: "Sie wohnt in Berlin." }, ["wohne"]),
  S("a1-s-verbpos", "sentence", "A1", "Çevir: Bugün sinemaya gidiyorum.", "Heute ich gehe ins Kino.", { task: 3, grammar: 2, vocab: 4, structure: 1 }, ["verb_position"], { target: "Heute gehe ich ins Kino." }, ["ich gehe"]),
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
  S("b1-rp-ok", "roleplay", "B1", "Doktorda randevu al: şikâyetini söyle, gün ve saat kararlaştır.", "Guten Tag, ich hätte gern einen Termin bei Dr. Weber.\nIch habe seit drei Tagen starke Kopfschmerzen.\nGeht es auch am Donnerstagnachmittag?\nUm 15 Uhr passt mir gut. Vielen Dank, auf Wiedersehen.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { targets: ["Ich hätte gern einen Termin", "Ich habe ... Schmerzen", "Passt Ihnen ...?"] }),
  S("b1-rp-weak", "roleplay", "B1", "Doktorda randevu al: şikâyetini söyle, gün ve saat kararlaştır.", "Hallo, ich will Termin.\nKopf tut weh.\nDonnerstag ok?\nJa gut.", { task: 2, grammar: 2, vocab: 1, structure: 1 }, ["article"], { targets: ["Ich hätte gern einen Termin", "Ich habe ... Schmerzen", "Passt Ihnen ...?"] }),
  // ── B2 ───────────────────────────────────────────────────────────
  S("b2-s-passiv", "sentence", "B2", "Passiv'e çevir: Man renoviert das Haus.", "Das Haus wird renoviert.", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { target: "Das Haus wird renoviert." }),
  S("b2-w-formal", "writing", "B2", "Resmî şikâyet e-postası: aldığın ürün bozuk çıktı; iade ya da değişim iste. (en az 80 kelime)", "Sehr geehrte Damen und Herren, ich habe am 3. Mai bei Ihnen einen Staubsauger bestellt, der am 10. Mai geliefert wurde. Leider musste ich feststellen, dass das Gerät nicht funktioniert: Der Motor läuft zwar an, aber es wird keine Saugleistung erzeugt. Da es sich offensichtlich um einen Produktionsfehler handelt, bitte ich Sie, das Gerät umzutauschen oder mir den Kaufpreis zu erstatten. Die Rechnung habe ich beigefügt. Ich wäre Ihnen dankbar, wenn Sie sich innerhalb der nächsten Woche bei mir melden könnten. Mit freundlichen Grüßen, Mehmet Yilmaz", { task: 4, grammar: 4, vocab: 4, structure: 4 }, [], { constraints: ["en az 80 kelime", "resmî kayıt"] }),
];

async function main() {
  const providers = chatProviders();
  if (!providers.length) {
    console.error("Sohbet sağlayıcısı yok: MISTRAL_API_KEY / GROQ_API_KEY / CEREBRAS_API_KEY ver.");
    process.exit(2);
  }
  const showJson = process.argv.includes("--json");
  const onlyAt = process.argv.indexOf("--only");
  const only = onlyAt >= 0 ? process.argv[onlyAt + 1] : null;
  const samples = only ? SAMPLES.filter((s) => s.id === only) : SAMPLES;
  console.log(`Sağlayıcı zinciri: ${providers.map((p) => `${p.name}/${p.model}`).join(" → ")}\n`);

  let within = 0, subscores = 0, errorsHit = 0, errorsExpected = 0, spansOk = 0, spansExpected = 0, parsed = 0, extraErrorsOnClean = 0;
  for (const s of samples) {
    const started = Date.now();
    let raw = "";
    try {
      raw = await completeChat(assessSystemPrompt(s.req.kind, s.req.level), [{ role: "user", content: assessUserMessage(s.req) }], ASSESS_MAX_TOKENS);
    } catch (err) {
      console.log(`✗ ${s.id}: sağlayıcı hatası — ${(err as Error).message}`);
      continue;
    }
    const a = parseAssessment(raw, s.req.answer.text, s.req.kind);
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
    if (a.errors.length) for (const e of a.errors) console.log(`     · ${e.type}: "${e.wrong}" → "${e.fix}" — ${e.why_tr}`);
    console.log(`     övgü: ${a.praise_tr}\n     ipucu: ${a.next_tip_tr}`);
    if (showJson) console.log(raw);
  }
  const n = samples.length;
  console.log(`\nÖzet: ${parsed}/${n} ayrıştı · ${within}/${parsed} örnekte dört alt puan ±1 içinde · alt puan isabeti ${subscores}/${parsed * 4} · beklenen hata tipi ${errorsHit}/${errorsExpected} · span ${spansOk}/${spansExpected} · temiz cevaba hata yazma ${extraErrorsOnClean}`);
  console.log("Kabul (WP-03): ±1 içinde ≥ 16/20, hata tipi ≥ %75, span ≥ %75, temiz cevaba hata ≤ 2.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { CORRECTION_MARK, SUGGESTION_MARK, parseReply } from "../src/lib/chat-format";
import { filterCorrectionLines, guardCorrections, judgeCorrection } from "../src/lib/conversations/fix-guard";

/**
 * Düzeltme süzgeci — `npm run test:fix-guard`. Dil modeli istemez.
 *
 * İki şey sınanıyor: satır kararı (hangi düzeltme siliniyor, hangisi KALIYOR)
 * ve akış süzgecinin parçalanmış akışta da aynı sonucu vermesi. İkincisi
 * önemli: sağlayıcılar metni rastgele yerlerden bölüyor ve işaret ("[FIX]")
 * iki parçaya düşebiliyor; süzgeç orada şaşarsa ya düzeltme sızar ya da rol
 * metni kaybolur.
 */

let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  if (ok) console.log(`  ✓ ${name}`);
  else {
    fails++;
    console.log(`  ✗ ${name}${detail ? ` → ${detail}` : ""}`);
  }
};

// 2026-09-28, B1 "Das Vorstellungsgespräch" (iOS, canlı).
const SAID = "Ich bewerbe mich, weil ich habe viel Erfahrung im Verkauf und ich arbeite gern mit Kunden.";
const GOOD = "weil ich habe viel Erfahrung → weil ich viel Erfahrung habe (Verb-Endstellung)";
const BAD = "und ich arbeite gern → und gern mit Kunden arbeite ich (Verb-Endstellung)";

console.log("gözlenen hata");
check("weil düzeltmesi kalıyor", judgeCorrection(GOOD, SAID).keep);
{
  const v = judgeCorrection(BAD, SAID);
  check("und + fiil sonda siliniyor", !v.keep && v.reason === "coord_verb_final", JSON.stringify(v));
}
for (const label of ["Verb\u2011End\u2011stellung", "Verb am Ende", "Fiil sonda", "fiilin sona gitmesi", "verb-final position", "Verb at the end", "Nebensatz", "Verbendstellung"]) {
  const v = judgeCorrection(`und ich arbeite gern → und gern arbeite ich (${label})`, SAID);
  check(`etiket tanınıyor: ${label}`, !v.keep);
}

console.log("\ngerçek düzeltmeler süzgeçten geçiyor");
const real: [string, string][] = [
  ["ich arbeite seit 10 Jahre → ich arbeite seit 10 Jahren (Dativ)", "Ich arbeite als Ingenieur seit 10 Jahre."],
  ["Am Wochenende ich gehe → Am Wochenende gehe ich (V2-Regel)", "Am Wochenende ich gehe ins Kino."],
  ["ich habe ein Bruder → ich habe einen Bruder (Akkusativ)", "Ich habe ein Bruder in Deutschland."],
  // Sıralama bağlacıyla başlıyor ama V2 düzeltmesi: gerçek hata.
  ["und dann ich gehe → und dann gehe ich (V2-Regel)", "Ich esse und dann ich gehe nach Hause."],
  // Sıralama bağlacı + çekim düzeltmesi: "Verbendung" fiil sonu DEĞİL, çekim eki.
  ["und du arbeitet → und du arbeitest (Verbendung)", "Du wohnst hier und du arbeitet dort."],
  // Bağlaçla başlıyor ama parçada yan cümle bağlacı var: fiil sonda doğru olabilir.
  ["und weil ich habe Zeit → und weil ich Zeit habe (Verb-Endstellung)", "Ich komme, und weil ich habe Zeit, bleibe ich."],
  // Model sol tarafı kısaltmış: sözcükler sırayla geçiyor, uydurma değil.
  ["weil ich habe … Erfahrung → weil ich … Erfahrung habe (Verb-Endstellung)", SAID],
  // Tanıyıcı büyük harf ve noktalama düşürüyor; sol tarafta olması sorun değil.
  ["Ich Habe Ein Hund → ich habe einen Hund (Akkusativ)", "ich habe ein hund"],
  ["weiß nicht → weiß es nicht (Pronomen)", "ich weiss nicht"],
  ["Yesterday I go → Yesterday I went (Past Simple)", "Yesterday I go to work."],
  // Ok yok: biçim dışı, anlaşılamıyor, dokunulmuyor.
  ["Dativ nach seit", "Ich wohne seit 2 Jahre hier."],
];
for (const [line, said] of real) {
  const v = judgeCorrection(line, said);
  check(`kalıyor: ${line.slice(0, 48)}`, v.keep, JSON.stringify(v));
}

console.log("\nuydurma ve boş düzeltmeler");
{
  const v = judgeCorrection("ich habe ein Hund → ich habe einen Hund (Akkusativ)", "Ich habe einen Hund.");
  check("öğrencinin söylemediği parça siliniyor", !v.keep && v.reason === "not_said", JSON.stringify(v));
  const w = judgeCorrection("ich arbeite auch → Ich arbeite auch. (Rechtschreibung)", "ich arbeite auch");
  check("iki taraf aynı → siliniyor", !w.keep && w.reason === "same", JSON.stringify(w));
  const e = judgeCorrection("and I work with customers → and with customers I work (verb-final)", "I apply because I have a lot of experience and I work with customers.");
  check("İngilizce: and + fiil sonda siliniyor", !e.keep, JSON.stringify(e));
}

console.log("\ntam metin");
const REPLY = [
  `${CORRECTION_MARK} ${GOOD}`,
  `${CORRECTION_MARK} ${BAD}`,
  "Das ist super! Wie lange arbeiten Sie schon im Verkauf?",
  `${SUGGESTION_MARK} Seit fünf Jahren.`,
  `${SUGGESTION_MARK} Ich arbeite seit drei Jahren dort.`,
  `${SUGGESTION_MARK} Schon lange.`,
].join("\n");
{
  const { text, dropped } = filterCorrectionLines(REPLY, SAID);
  const p = parseReply(text);
  check("tek düzeltme kalıyor", p.corrections.length === 1 && p.corrections[0] === GOOD, JSON.stringify(p.corrections));
  check("gövde ve öneriler dokunulmamış", p.body === "Das ist super! Wie lange arbeiten Sie schon im Verkauf?" && p.suggestions.length === 3);
  check("neden kaydı", dropped.join() === "coord_verb_final", dropped.join());
}

console.log("\nakış süzgeci — her bölme noktasında aynı sonuç");
async function collect(chunks: string[], said: string): Promise<string> {
  async function* src() {
    for (const c of chunks) yield c;
  }
  let out = "";
  for await (const d of guardCorrections(src(), said)) out += d;
  return out;
}

async function streamTests() {
  const expected = filterCorrectionLines(REPLY, SAID).text;
  let bad = 0;
  let firstBad = "";
  // Tek bölme: her konum.
  for (let i = 0; i <= REPLY.length; i++) {
    const got = await collect([REPLY.slice(0, i), REPLY.slice(i)].filter(Boolean), SAID);
    if (got !== expected) {
      bad++;
      firstBad ||= `i=${i} ${JSON.stringify(got)}`;
    }
  }
  check(`iki parçaya her bölmede aynı (${REPLY.length + 1} bölme)`, bad === 0, firstBad);
  // Karakter karakter.
  check("karakter karakter aynı", (await collect([...REPLY], SAID)) === expected);
  // Rastgele parça boyları (tohumlu, tekrarlanabilir).
  let seed = 7;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
  let rbad = 0;
  for (let n = 0; n < 200; n++) {
    const chunks: string[] = [];
    for (let i = 0; i < REPLY.length; ) {
      const k = 1 + Math.floor(rnd() * 12);
      chunks.push(REPLY.slice(i, i + k));
      i += k;
    }
    if ((await collect(chunks, SAID)) !== expected) rbad++;
  }
  check("rastgele 200 bölmede aynı", rbad === 0, String(rbad));

  // Düzeltmesiz cevap birebir geçiyor (boş satırlar ve satır sonları dâhil).
  const plain = "Guten Tag!\n\nWie geht's?\n[SAY] Gut, danke.\n";
  check("düzeltmesiz cevap birebir", (await collect([...plain], "Hallo")) === plain);
  // Satır sonuyla bitmeyen son satır (akış son satırda kapanıyor).
  const tail = `Hallo\n${CORRECTION_MARK} ${BAD}`;
  check("son satırdaki düzeltme de süzülüyor", (await collect([tail], SAID)) === "Hallo\n");
  // Girintili işaret (ayrıştırıcı `trim` ediyor) de düzeltme sayılıyor.
  const indented = `  ${CORRECTION_MARK} ${BAD}\nWeiter.`;
  check("girintili düzeltme süzülüyor", (await collect([...indented], SAID)) === "Weiter.");
  // "[F" ile başlayıp işarete dönüşmeyen satır kaybolmuyor.
  const near = "[Fenster] ist offen.\nOk";
  check("işarete benzeyen düz satır korunuyor", (await collect([...near], "x")) === near);
}

streamTests().then(() => {
  console.log(fails === 0 ? "\ntamam: hepsi geçti" : `\nKALDI: ${fails}`);
  process.exit(fails === 0 ? 0 : 1);
});

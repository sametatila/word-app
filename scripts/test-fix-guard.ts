import { readFileSync } from "node:fs";
import { CORRECTION_MARK, SUGGESTION_MARK, parseReply } from "../src/lib/chat-format";
import { ensureRoleText, filterCorrectionLines, guardCorrections, judgeCorrection, splitInlineMarkers, stripModelTokenStream } from "../src/lib/conversations/fix-guard";
import { breakInlineMarkers } from "../src/lib/chat-format";

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

console.log("\nbağlaçtan sonra özneyi düşürmek üslup");
// 2026-09-29, `test:chat` de-b1-bewerbung/en (Groq).
for (const label of ["Redundantes Subjekt", "Subjektellipse", "redundant subject"]) {
  const v = judgeCorrection(`und ich arbeite gern → und arbeite gern (${label})`, SAID);
  check(`özne düşürme siliniyor: ${label}`, !v.keep && v.reason === "coord_ellipsis", JSON.stringify(v));
}
{
  const v = judgeCorrection("and I like working → and like working (Ellipsis)", "I sell cars and I like working with people.");
  check("İngilizcede de siliniyor", !v.keep && v.reason === "coord_ellipsis", JSON.stringify(v));
}
{
  // Özne değişiyorsa gerçek düzeltme olabilir: dokunulmuyor.
  const v = judgeCorrection("und ich arbeitet → und ich arbeite (Verbendung)", "Ich wohne hier und ich arbeitet dort.");
  check("bağlaç + özne + çekim düzeltmesi kalıyor", v.keep, JSON.stringify(v));
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

console.log("\nQA kullanıcısının sahte düzeltmeleri (2026-10-09, panel #13 #15 #16 #28)");
{
  const said = (t: string) => t;
  const cases: [string, string, Parameters<typeof judgeCorrection>[2], string][] = [
    ["Was machst du gern → Was machen Sie gern (Höflichkeitsform)", "Was machst du gern am Abend?", { register: "Sie" }, "register"],
    ["siebzehn achtundzwanzig → 17 28 (Zahlen)", "Meine Nummer ist siebzehn achtundzwanzig.", {}, "form_only"],
    ["Du kochst jetzt die Suppe → Ich koche jetzt die Suppe (Inhaltliche Korrektur)", "Du kochst jetzt die Suppe und ich schneide das Brot.", {}, "person_change"],
    ["Möchtest du auch einen Kaffee? → Möchten Sie auch einen Kaffee? (Höflichkeitsform)", "Möchtest du auch einen Kaffee?", { register: "du" }, "register"],
    ["weil ich in Dortmund studieren möchte → weil ich in Dortmund studieren will (V2-Regel)", "Ich lerne Deutsch, weil ich in Dortmund studieren möchte.", {}, "label_mismatch"],
    ["zur Uni → zur Universität (Wortwahl)", "Ich gehe jeden Tag zur Uni.", {}, "style"],
    ["bis fünf → bis fünf Uhr (Präzision)", "Ich arbeite bis fünf.", {}, "style"],
    ["Ich brauche Zahnpasta → Ich brauche eine Zahnpasta (Artikel)", "Ich brauche Zahnpasta.", {}, "mass_noun"],
    ["trinke Wasser → trinke ein Wasser (Artikel)", "Ich trinke Wasser.", {}, "mass_noun"],
    ["Halten Sie bitte hier → Bitte halten Sie hier (Satzstellung)", "Halten Sie bitte hier.", {}, "style"],
    ["gegenüber vom Bahnhof → gegenüber dem Bahnhof (Präposition)", "Ist es gegenüber vom Bahnhof?", {}, "style"],
  ];
  for (const [line, s, ctx, reason] of cases) {
    const v = judgeCorrection(line, said(s), ctx);
    check(`siliniyor (${reason}): ${line.slice(0, 44)}`, !v.keep && v.reason === reason, JSON.stringify(v));
  }
  // Gerçek düzeltmeler bu kurallardan geçmeli.
  const keep: [string, string, Parameters<typeof judgeCorrection>[2]][] = [
    ["Wie heißt du → Wie heißen Sie (Höflichkeitsform)", "Wie heißt du?", {}],
    ["hilf mich → hilf mir (Dativ)", "Kannst du hilf mich?", {}],
    ["Ich bin 24 Jahre → Ich bin 24 Jahre alt (Wortwahl)", "Ich bin 24 Jahre.", {}],
    ["Ich habe Hund → Ich habe einen Hund (Artikel)", "Ich habe Hund.", {}],
    ["ein Kaffee → einen Kaffee (Akkusativ)", "Ich möchte ein Kaffee.", {}],
    ["du arbeitet → du arbeitest (Konjugation)", "Du arbeitet viel.", { register: "du" }],
    ["Heute ich lerne → Heute lerne ich (V2-Regel)", "Heute ich lerne Deutsch.", {}],
  ];
  for (const [line, s, ctx] of keep) {
    const v = judgeCorrection(line, s, ctx);
    check(`kalıyor: ${line.slice(0, 48)}`, v.keep, JSON.stringify(v));
  }
}

console.log("\nsatır içi işaretler (panel #12)");
{
  const inline = "Ich freue mich, Sie kennenzulernen, Deniz. Woher kommen Sie?   [SAY] Ich komme aus der Türkei.   [SAY] Ich komme aus Istanbul.   [SAY] Ich komme aus einem kleinen Dorf.";
  const p = parseReply(inline);
  check("gövde işaretsiz", p.body === "Ich freue mich, Sie kennenzulernen, Deniz. Woher kommen Sie?", JSON.stringify(p.body));
  check("üç öneri", p.suggestions.length === 3 && p.suggestions[1] === "Ich komme aus Istanbul.", JSON.stringify(p.suggestions));
  const bullets = parseReply("Wie geht's?\n- [SAY] Gut.\n2. [SAY] Sehr gut.\n• [SAY] Es geht.");
  check("madde işaretli öneriler", bullets.suggestions.join("|") === "Gut.|Sehr gut.|Es geht.", JSON.stringify(bullets));
  const sep = parseReply("[FIX] ich habe ein Hund → ich habe einen Hund (Akkusativ)\u2028Schön! Wie heißt er?\u2028[SAY] Er heißt Max.");
  check("Unicode satır ayırıcısı", sep.corrections.length === 1 && sep.suggestions.length === 1 && sep.body === "Schön! Wie heißt er?", JSON.stringify(sep));
  check("düz metin dokunulmuyor", breakInlineMarkers("Ich habe 2 Katzen. [Fenster] auf.") === "Ich habe 2 Katzen. [Fenster] auf.");
}

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
  // Satır içi işaretlerin akışta bölünmesi: her bölme noktasında dizge sürümüyle aynı.
  const INLINE = "Woher kommen Sie? [SAY] Aus der Türkei. - [SAY] Aus Istanbul.\n[SAY] Aus Bonn.";
  const want = breakInlineMarkers(INLINE);
  async function split(chunks: string[]): Promise<string> {
    async function* src() {
      for (const c of chunks) yield c;
    }
    let out = "";
    for await (const d of splitInlineMarkers(src())) out += d;
    return out;
  }
  let ibad = 0;
  for (let i = 0; i <= INLINE.length; i++) {
    for (let j = i; j <= INLINE.length; j += 3) {
      if ((await split([INLINE.slice(0, i), INLINE.slice(i, j), INLINE.slice(j)].filter(Boolean))) !== want) ibad++;
    }
  }
  check("satır içi işaret akışta her bölmede aynı", ibad === 0, String(ibad));
  check("satır içi işaret karakter karakter", (await split([...INLINE])) === want, JSON.stringify(await split([...INLINE])));

  // Rol metni olmayan cevap (panel #39): yeniden üretiliyor; rol metinli cevap birebir geçiyor.
  async function role(attempts: string[][], retries = 1): Promise<{ out: string; tries: number }> {
    let tries = 0;
    let out = "";
    const make = () => {
      const chunks = attempts[Math.min(tries, attempts.length - 1)];
      tries++;
      return (async function* () {
        for (const c of chunks) yield c;
      })();
    };
    for await (const d of ensureRoleText(make, retries)) out += d;
    return { out, tries };
  }
  const NORMAL = `${CORRECTION_MARK} ${GOOD}\nDas ist super! Wie lange?\n${SUGGESTION_MARK} Seit fünf Jahren.\n${SUGGESTION_MARK} Lange.\n${SUGGESTION_MARK} Kurz.`;
  let rbad2 = 0;
  for (let i = 0; i <= NORMAL.length; i++) {
    const r = await role([[NORMAL.slice(0, i), NORMAL.slice(i)].filter(Boolean)]);
    if (r.out !== NORMAL || r.tries !== 1) rbad2++;
  }
  check("rol metinli cevap her bölmede birebir, tek deneme", rbad2 === 0, String(rbad2));
  const ONLY = `${SUGGESTION_MARK} Ich habe Größe M.\n${SUGGESTION_MARK} Meine Größe ist M.\n${SUGGESTION_MARK} Ich brauche M.`;
  const r1 = await role([[...ONLY], [...NORMAL]]);
  check("yalnız öneri → yeniden üretiliyor, ikinci deneme gidiyor", r1.out === NORMAL && r1.tries === 2, JSON.stringify(r1));
  // Rol cümlesi de [SAY] ile işaretlenmiş (QA F-0002): dört öneri satırı → ilki gövde, yeniden üretim yok.
  const FOUR = `${SUGGESTION_MARK} Zwei Pfund Äpfel, sehr gerne.\n${SUGGESTION_MARK} Ich nehme auch Birnen.\n${SUGGESTION_MARK} Was kostet das?\n${SUGGESTION_MARK} Danke, das ist alles.`;
  const r3 = await role([[...FOUR], [...NORMAL]]);
  const p3 = parseReply(r3.out);
  check("dört öneri satırı → ilki rol metni, tek deneme", r3.tries === 1 && p3.body === "Zwei Pfund Äpfel, sehr gerne." && p3.suggestions.length === 3, JSON.stringify(r3));

  // Sayılamayan isim listesi güncel mi (scripts/gen-mass-nouns.mjs)?
  const { massNouns } = (await import("./gen-mass-nouns.mjs")) as { massNouns: () => string[] };
  const committed = JSON.parse(readFileSync("src/lib/conversations/mass-nouns.generated.json", "utf8")) as string[];
  check("sayılamayan isim listesi words.json ile güncel", JSON.stringify(massNouns()) === JSON.stringify(committed), "node scripts/gen-mass-nouns.mjs");
  // Modelin özel işaretleri (QA F-0065): her bölmede silinmiş, metin aynen.
  const LEAK = "<|channel>thought\n<channel|>Gut, dann nehmen Sie den Zug um acht.\n[SAY] Danke!";
  const CLEAN = "Gut, dann nehmen Sie den Zug um acht.\n[SAY] Danke!";
  async function strip(chunks: string[]): Promise<string> {
    let out = "";
    for await (const d of stripModelTokenStream((async function* () { for (const c of chunks) yield c; })())) out += d;
    return out;
  }
  let sbad = 0;
  for (let i = 0; i <= LEAK.length; i++) if ((await strip([LEAK.slice(0, i), LEAK.slice(i)].filter(Boolean))) !== CLEAN) sbad++;
  check("model işaretleri her bölmede siliniyor", sbad === 0, String(sbad));
  check("model işaretleri karakter karakter", (await strip([...LEAK])) === CLEAN, JSON.stringify(await strip([...LEAK])));
  check("işaretsiz metin aynen", (await strip([..."Ich bin 3 < 5 und a|b."])) === "Ich bin 3 < 5 und a|b.");
  // İç not ve baştaki "thought" (QA F-0075): her bölmede kesiliyor; düz metin aynen akıyor.
  const NOTE = "thought\n[SAY] Das Wohnzimmer hat zwei Fenster.\nSchön! Wie groß ist es?\n[SAY] Sehr groß.\n\n(Not: Kullanıcı doğru söyledi. Bu yüzden\n[FIX] satırı yazılmadı. Ancak sistem gereği\n[SAY] satırları";
  const NOTE_OK = "[SAY] Das Wohnzimmer hat zwei Fenster.\nSchön! Wie groß ist es?\n[SAY] Sehr groß.";
  let nbad = 0;
  // Sondaki boş satırlar önemsiz (ayrıştırıcı kırpıyor).
  for (let i = 0; i <= NOTE.length; i++) if ((await strip([NOTE.slice(0, i), NOTE.slice(i)].filter(Boolean))).trimEnd() !== NOTE_OK) nbad++;
  check("iç not ve thought her bölmede kesiliyor", nbad === 0, `${nbad} · ${JSON.stringify(await strip([...NOTE]))}`);
  const PLAIN = "Natürlich! Die Notaufnahme ist links.\nNotiz: keine.\n[SAY] Danke.";
  check("'Not' ile başlayan sözcükler kesilmiyor", (await strip([...PLAIN])) === PLAIN.replace("\nNotiz: keine.", "\nNotiz: keine."), JSON.stringify(await strip([...PLAIN])));
  const r2 = await role([[...ONLY], [...ONLY]]);
  check("iki denemede de rol metni yok → öneriler yine gidiyor", r2.out === ONLY && r2.tries === 2, JSON.stringify(r2));
}

streamTests().then(() => {
  console.log(fails === 0 ? "\ntamam: hepsi geçti" : `\nKALDI: ${fails}`);
  process.exit(fails === 0 ? 0 : 1);
});

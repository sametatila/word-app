/**
 * Sohbet sağlayıcı kalite ölçümü.
 *
 *   CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_AI_TOKEN=... GROQ_API_KEY=... npm run test:chat
 *
 * Anahtarı olan her sağlayıcı aynı senaryodan geçirilir ve karşılaştırmalı
 * tablo basılır. Amaç genel bir "model iyi mi" testi değil — **bu uygulamanın
 * bağlı olduğu davranışları** ölçmek:
 *
 *   1. İşaret sözleşmesi — her turda 3 öneri satırı geliyor mu? Gelmezse öneri
 *      şeridi sessizce boş kalır ve sohbetin en önemli UX parçası ölür.
 *   2. Düzeltme isabeti — senaryoya bilerek yerleştirilmiş hataları
 *      yakalıyor mu, doğru cümleye yanlış düzeltme yapıştırıyor mu?
 *   3. Karakter bütünlüğü — Almanca (ä ö ü ß) ve Türkçe (ç ğ ı ö ş ü) harfleri
 *      bozuluyor mu? EğitimKit'te Llama'nın Türkçe token bozulması için ayrı
 *      bir temizleyici yazılmış; aynı sorun burada cümleyi okunamaz yapar.
 *   4. Seviyede kalma — ürettiği Almanca kelimeler A1–B1 havuzunda mı, yoksa
 *      B2/C1'e mi kaçıyor? Ölçüt uygulamanın kendi seviyeli kelime listesi.
 *   5. Türkçe'ye geçiş — öğrenci Türkçe sorunca Türkçe açıklıyor mu?
 *   6. Gecikme — ilk parçaya kadar geçen süre. Eller serbest döngüsünde
 *      cevabın gelmesi ne kadar uzarsa konuşma o kadar kopuyor.
 *   7. Yankı — karakter öğrencinin cümlesini (çoğu kez düzeltilmiş hâliyle)
 *      KENDİ AĞZINDAN, birinci kişiyle tekrar ediyor mu? Düzeltme zaten ayrı
 *      satırda; rol metnindeki kopya karakteri adayın yerine konuşturuyor.
 *
 * Senaryo sabit; prompt değişince ya da yeni sağlayıcı eklenince aynı komutla
 * tekrar çalışır ve karşılaştırılabilir sayı üretir.
 *
 * Birden çok senaryo var (kurs × ana dil); `EVAL_SCENARIO=de-b1-bewerbung/tr,…`
 * ile seçilir, `EVAL_PROVIDER=groq` ile tek sağlayıcı. Düzeltme sayıları iki
 * kez basılıyor: modelin HAM çıktısı ve sunucudaki süzgeçten (`fix-guard`)
 * SONRA öğrencinin gördüğü. İkisinin farkı süzgecin işi; ham sayı istemin işi.
 */
import { readFileSync } from "node:fs";
import { chatProviders, type ChatMessage, type Provider } from "../src/lib/chat-providers";

import { CORRECTION_MARK, SUGGESTION_MARK, parseReply } from "../src/lib/chat-format";
import { sourceFindConversation as findConversation } from "../src/lib/conversations/source";
import { chatPrompt, chatRegister } from "../src/lib/conversations/chat";
import { filterCorrectionLines } from "../src/lib/conversations/fix-guard";
import type { Conversation } from "../src/lib/conversations/types";
import type { NativeLang } from "../src/lib/courses";

/* ─────────────── Senaryo ─────────────── */

type Step = {
  say: string;
  /** Bilerek yerleştirilen hata: düzeltmede bu kelime geçmeli. */
  expectFix?: string;
  /** Cümle doğru — düzeltme satırı gelmemeli (yanlış pozitif ölçümü). */
  expectClean?: boolean;
  /** Türkçe soru — cevapta Türkçe açıklama beklenir. */
  expectTurkish?: boolean;
  /**
   * Bu kalıba uyan düzeltme YANLIŞ düzeltmedir (doğru bir parçanın
   * "düzeltilmesi"). Örn. sıralama bağlacıyla başlayan parçaya fiil-sonda.
   */
  forbidFix?: RegExp;
  /** En fazla bu kadar düzeltme satırı — fazlası doğru bir parçaya yapışmıştır. */
  maxFixes?: number;
};

/** Sol tarafı sıralama bağlacıyla başlayan düzeltme: "und ich arbeite… → …". */
const COORD_FIX = /^\s*(und|aber|oder|denn|sondern|and|but|or|so)\b/i;

/** A2 seviyesinde, Türk bir öğrencinin gerçekten kuracağı cümleler. */
const SCRIPT: Step[] = [
  { say: "Hallo! Ich heiße Samet.", expectClean: true },
  { say: "Ich wohne in Istanbul und ich habe zwei Kinder.", expectClean: true },
  // "seit" datif ister: seit 10 Jahren
  { say: "Ich arbeite als Ingenieur seit 10 Jahre.", expectFix: "Jahren" },
  // Fiil ikinci sırada olmalı: Am Wochenende gehe ich...
  { say: "Am Wochenende ich gehe ins Kino.", expectFix: "gehe" },
  { say: "Anlamadım, bunu Türkçe açıklar mısın?", expectTurkish: true },
  // Akkusativ: einen Bruder
  { say: "Ich habe ein Bruder in Deutschland.", expectFix: "einen" },
  { say: "Was machst du gern am Abend?", expectClean: true },
  { say: "Ich möchte besser Deutsch sprechen.", expectClean: true },
];

/**
 * Sözcük sırası ve sıralama bağlaçları (2026-09-28, iOS canlı, B1 "Das
 * Vorstellungsgespräch"): model weil-yan cümlesini doğru düzeltti, sonra aynı
 * cümlenin DOĞRU "und ich arbeite gern mit Kunden" parçasını da "und gern mit
 * Kunden arbeite ich (Verb-Endstellung)" diye bozdu. Beklenen: yalnız weil
 * düzeltmesi; und'lu parçalara hiç düzeltme yok.
 */
const BEWERBUNG: Step[] = [
  { say: "Guten Tag! Ich heiße Samet und ich komme aus der Türkei.", expectClean: true },
  {
    say: "Ich bewerbe mich, weil ich habe viel Erfahrung im Verkauf und ich arbeite gern mit Kunden.",
    // Sağ tarafın başı; model parçayı "…im Verkauf habe" diye uzatabiliyor.
    expectFix: "weil ich viel",
    forbidFix: COORD_FIX,
    maxFixes: 1,
  },
  { say: "Ich habe fünf Jahre im Verkauf gearbeitet und ich arbeite gern mit Kunden.", expectClean: true, forbidFix: COORD_FIX },
  { say: "Ich spreche Deutsch und Englisch, aber ich möchte mein Englisch verbessern.", expectClean: true, forbidFix: COORD_FIX },
  // Nachdem-yan cümlesinden sonra ana cümle fiille başlar: habe ich.
  { say: "Nachdem ich die Schule beendet hatte, ich habe eine Ausbildung gemacht.", expectFix: "habe ich", forbidFix: COORD_FIX },
];

/**
 * İngilizce kurs: düzeltme İngilizce dilbilgisiyle. Almanca kurallar (V2, fiil
 * sonda) İngilizceye uygulanmamalı; "and I like…" doğru.
 */
const INTERVIEW_EN: Step[] = [
  { say: "Hello, my name is Samet and I come from Turkey.", expectClean: true, forbidFix: COORD_FIX },
  {
    say: "I want this job because I have a lot of experience in sales and I like working with customers.",
    expectClean: true,
    forbidFix: COORD_FIX,
  },
  { say: "Yesterday I go to a job fair and I talked to many companies.", expectFix: "went", forbidFix: COORD_FIX, maxFixes: 1 },
  { say: "I like my job, but I want to learn new things.", expectClean: true, forbidFix: COORD_FIX },
];

/**
 * Yankı (2026-09-29, iOS/Android canlı, B1 "Der Lebenslauf"): öğrenci "Ich arbeite
 * seit drei Jahre als Buchhalterin…" dedi; düzeltme doğruydu, ama görüşmeci rol
 * metnine "Sehr gut. Ich arbeite seit drei Jahren als Buchhalterin bei einer Firma
 * in Köln." diye başladı: dört cihazın dördünde. Beklenen: düzeltme satırı + adayın
 * söylediğine cevap, adayın cümlesinin kopyası yok.
 */
const LEBENSLAUF: Step[] = [
  { say: "Guten Tag! Ich heiße Ayşe Demir.", expectClean: true },
  { say: "Ich arbeite seit drei Jahre als Buchhalterin bei einer Firma in Köln.", expectFix: "Jahren", maxFixes: 1 },
  { say: "Vorher habe ich zwei Jahre in einem Steuerbüro in Ankara gearbeitet.", expectClean: true },
  { say: "Ich habe BWL studiert, und danach ich bin nach Deutschland gekommen.", expectFix: "bin ich", forbidFix: COORD_FIX },
];

/**
 * QA kullanıcısının sahte düzeltmeleri (2026-10-09, panel #13 #15 #16 #28): iş
 * arkadaşı sahnesinde (hitap du) doğru cümleler "Höflichkeitsform", "Zahlen",
 * "V2-Regel" ve "Inhaltliche Korrektur" etiketleriyle düzeltildi. Hepsi doğru;
 * beklenen: düzeltme yok. Tek gerçek hata (Akkusativ) yakalanmalı.
 */
const KOLLEGE: Step[] = [
  { say: "Mir geht es gut, danke. Möchtest du auch einen Kaffee?", expectClean: true },
  { say: "Meine Nummer ist siebzehn achtundzwanzig.", expectClean: true },
  { say: "Ich lerne Deutsch, weil ich in Dortmund studieren möchte.", expectClean: true },
  { say: "Ich gehe jeden Tag zur Uni und arbeite bis fünf.", expectClean: true },
  { say: "Ich habe ein Termin um drei Uhr.", expectFix: "einen" },
];

/**
 * Rol karışması (QA F-0037, 2026-10-09): A1 "Welche Größe haben Sie?" sahnesinde
 * satış görevlisi rolündeki model müşteriye "Wo sind denn die Umkleidekabinen?"
 * diye sordu — sahne metnindeki "kabinin yerini sor" öğrencinin görevi. Beklenen:
 * görevli kabinin yerini SORMAZ (`ROLE_SLIPS`); öğrenci sorunca söyler.
 */
const GROESSE: Step[] = [
  { say: "Ich habe Größe M.", expectClean: true },
  { say: "Kann ich die Jacke anprobieren?", expectClean: true },
  { say: "Die Jacke ist schön, aber sie ist zu klein.", expectClean: true },
  { say: "Haben Sie die Jacke auch in L?", expectClean: true },
];

/** Rol metninde bu soru geçerse karakter öğrencinin görevini üstlenmiş demektir. */
const ROLE_SLIPS: Record<string, RegExp> = {
  "de-a1-groesse/tr": /\bwo\b[^?]*\b(umkleide|kabine)[^?]*\?/i,
};

type Scenario = { id: string; conversation: Conversation; native: NativeLang; script: Step[] };

/**
 * Ölçüm çıkarımı.
 *
 * Senaryonun gömülü hataları (Akkusativ, V2) genel dilbilgisi hataları;
 * istem konuşmanın kalıplarına odaklansa da her gerçek hatayı düzeltmek zorunda —
 * test tam olarak bunu ölçüyor. Kurs çiftleri: tr→de, en→de, tr→en, de→en.
 */
const SCENARIOS: Scenario[] = [
  { id: "de-a1-hallo/tr", conversation: findConversation("de-a1-hallo")!, native: "tr", script: SCRIPT },
  { id: "de-b1-bewerbung/tr", conversation: findConversation("de-b1-bewerbung")!, native: "tr", script: BEWERBUNG },
  { id: "de-b1-lebenslauf/tr", conversation: findConversation("de-b1-lebenslauf")!, native: "tr", script: LEBENSLAUF },
  { id: "de-a1-wie-gehts/tr", conversation: findConversation("de-a1-wie-gehts")!, native: "tr", script: KOLLEGE },
  { id: "de-a1-groesse/tr", conversation: findConversation("de-a1-groesse")!, native: "tr", script: GROESSE },
  { id: "de-b1-bewerbung/en", conversation: findConversation("de-b1-bewerbung")!, native: "en", script: BEWERBUNG },
  { id: "en-a2-interview/tr", conversation: findConversation("en-a2-interview")!, native: "tr", script: INTERVIEW_EN },
  { id: "en-a2-interview/de", conversation: findConversation("en-a2-interview")!, native: "de", script: INTERVIEW_EN },
];

/* ─────────────── Ölçütler ─────────────── */

/** Bozulma izleri: kelime ortasında rakam, mojibake, kayıp harf işareti. */
const GLITCH = /[A-Za-zÄÖÜäöüßÇĞİÖŞÜçğıöşü]\d{2,}|�|Ã[-¿]|â€/;

const TURKISH_MARKERS = /[çğışÇĞİŞ]|\b(bir|için|ile|değil|var|yok|demek|anlam)\b/i;

/** Seviye ölçümü: uygulamanın kendi seviyeli kelime listesi. */
function levelPools() {
  const rows = JSON.parse(readFileSync("data/app/words.json", "utf8")) as {
    de: string;
    niveau: string;
  }[];
  const low = new Set<string>();
  const high = new Set<string>();
  for (const r of rows) {
    const key = r.de.toLocaleLowerCase("de-DE");
    if (key.length < 5) continue; // kısa kelimeler çekimde çok karışıyor
    (["A1", "A2", "B1"].includes(r.niveau) ? low : high).add(key);
  }
  // Kök araması her kelimede yapılıyor; diziye bir kez çevrilir.
  return { low: [...low], high: [...high] };
}

/**
 * Seviyenin üstüne kaçan kelimeler — yönsel bir ölçü, kesin değil.
 *
 * Almanca çekimli olduğu için tam eşleşme aranmıyor: kelimenin ilk 5 harfi
 * yalnızca B2/C1 havuzunda geçiyorsa "üst seviye" sayılıyor. Çekim ve bileşik
 * kelimeler yüzünden bir miktar gürültü var; sağlayıcıları birbirine göre
 * karşılaştırmak için yeterli, mutlak bir yüzde olarak okunmamalı.
 */
function overLevel(text: string, pools: ReturnType<typeof levelPools>): string[] {
  const out = new Set<string>();
  for (const raw of text.split(/[^A-Za-zÄÖÜäöüß]+/)) {
    if (raw.length < 6) continue;
    const w = raw.toLocaleLowerCase("de-DE");
    const stem = w.slice(0, 5);
    const inLow = pools.low.some((k) => k.startsWith(stem));
    if (inLow) continue;
    const inHigh = pools.high.some((k) => k.startsWith(stem));
    if (inHigh) out.add(raw);
  }
  return [...out];
}

/** Karşılaştırma sözcükleri: küçük harf, ß=ss, harf/rakam dışı ayırıcı. */
function tokens(text: string): string[] {
  return text
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

/** İki sözcük dizisinin en uzun ortak alt dizisi (sıralı, bitişik olmak zorunda değil). */
function lcs(a: string[], b: string[]): number {
  const row = new Array(b.length + 1).fill(0);
  for (const x of a) {
    let prev = 0;
    for (let j = 1; j <= b.length; j++) {
      const keep = row[j];
      row[j] = x === b[j - 1] ? prev + 1 : Math.max(row[j], row[j - 1]);
      prev = keep;
    }
  }
  return row[b.length];
}

/**
 * Rol metninde öğrencinin cümlesini yineleyen cümle. Düzeltilmiş kopya tek
 * sözcükte ayrıldığı için eşitlik değil ortak alt dizi: öğrencinin sözcüklerinin
 * %70'i aynı sırayla tek bir cümlede geçiyorsa yankıdır. Kısa cümleler (5
 * sözcükten az) sayılmıyor; "Sie arbeiten also in Köln" gibi özetleme yakalanmıyor.
 */
function echoOf(body: string, said: string): string | null {
  const heard = tokens(said);
  if (heard.length < 5) return null;
  for (const sentence of body.split(/(?<=[.!?])\s+/)) {
    const words = tokens(sentence);
    if (words.length >= 5 && lcs(words, heard) >= Math.ceil(heard.length * 0.7)) return sentence.trim();
  }
  return null;
}

/**
 * Rol metninde adımın birinci kişi kalıbı ("Danach wechselte ich …", "Ich war
 * zuständig für …"): kalıplar öğrencinin cümleleri; karakter onları kendi
 * ağzından kurarsa öğrencinin yerine konuşuyor (2026-09-29, Groq, Lebenslauf:
 * "Und in Ihrer jetzigen Position, ich war zuständig für welche Aufgaben?").
 * Yalnız ich/I içeren ve en az üç sözcüklü kalıplar: "Können Sie …" gibi soru
 * kalıbını, "Ich heiße …" gibi tanışma kalıbını karakter de kendisi için doğal
 * olarak kurar.
 */
function patternInRole(body: string, patterns: Conversation["patterns"]): string | null {
  const text = ` ${tokens(body).join(" ")} `;
  for (const p of patterns) {
    const words = tokens(p.de);
    if (words.length < 3 || !words.some((w) => w === "ich" || w === "i")) continue;
    if (text.includes(` ${words.join(" ")} `)) return p.de;
  }
  return null;
}

/** Düzeltme isabeti — ham çıktıda ve süzgeçten sonra ayrı ayrı. */
type FixTally = { caught: number; falseFixes: number; wrong: string[] };

type Score = {
  provider: string;
  model: string;
  scenario: string;
  turns: number;
  suggestions: number[];
  fixesExpected: number;
  /** Yanlış düzeltme ölçülen tur sayısı (temiz cümle ya da yasak kalıp ya da fazla satır). */
  checkedTurns: number;
  raw: FixTally;
  guarded: FixTally;
  glitches: string[];
  /** Öğrencinin cümlesini ya da birinci kişi kalıbını kendi ağzından kuran rol cümleleri. */
  echoes: string[];
  /** Rol karışması: karakter öğrencinin görevindeki soruyu kendisi sordu (`ROLE_SLIPS`). */
  roleSlips: string[];
  turkishOk: boolean | null;
  overLevel: string[];
  firstTokenMs: number[];
  totalMs: number[];
  /** Limite takılıp beklenen tur sayısı — kapasite sinyali. */
  throttled: number;
  failed?: string;
};

/** Bir turun düzeltmelerini adımın beklentisiyle karşılaştırır. */
function tally(t: FixTally, step: Step, corrections: string[]): void {
  if (step.expectFix) {
    const hit = corrections.some((c) =>
      c.toLocaleLowerCase("de-DE").includes(step.expectFix!.toLocaleLowerCase("de-DE")),
    );
    if (hit) t.caught++;
  }
  const forbidden = step.forbidFix ? corrections.filter((c) => step.forbidFix!.test(c)) : [];
  const tooMany = step.maxFixes !== undefined && corrections.length > step.maxFixes;
  if ((step.expectClean && corrections.length) || forbidden.length || tooMany) {
    t.falseFixes++;
    t.wrong.push(...(step.expectClean ? corrections : forbidden.length ? forbidden : corrections));
  }
}

async function evaluate(provider: Provider, pools: ReturnType<typeof levelPools>, sc: Scenario): Promise<Score> {
  const script = sc.script;
  const system = chatPrompt(sc.conversation, { native: sc.native });
  const history: ChatMessage[] = [];
  const s: Score = {
    provider: provider.name,
    model: provider.model,
    scenario: sc.id,
    turns: 0,
    suggestions: [],
    fixesExpected: script.filter((x) => x.expectFix).length,
    checkedTurns: script.filter((x) => x.expectClean || x.forbidFix || x.maxFixes !== undefined).length,
    raw: { caught: 0, falseFixes: 0, wrong: [] },
    guarded: { caught: 0, falseFixes: 0, wrong: [] },
    glitches: [],
    echoes: [],
    roleSlips: [],
    turkishOk: null,
    overLevel: [],
    firstTokenMs: [],
    totalMs: [],
    throttled: 0,
  };

  for (const step of script) {
    history.push({ role: "user", content: step.say });
    // Ücretsiz katmanların dakikalık limiti dar (Groq: 8K token/dk).
    // 429 alınca bekleyip tekrar deniyoruz — ölçülmek istenen şey kalite,
    // limite takılmak testi bozmamalı.
    let started = Date.now();
    let first = 0;
    let text = "";
    let attempt = 0;
    for (;;) {
      started = Date.now();
      first = 0;
      text = "";
      try {
        for await (const delta of provider.stream(system, history)) {
          if (!first) first = Date.now() - started;
          text += delta;
        }
        break;
      } catch (err) {
        const msg = (err as Error).message;
        if (msg.includes("429") && attempt < 4) {
          attempt++;
          s.throttled++;
          process.stdout.write(" .");
          await new Promise((r) => setTimeout(r, 20_000));
          continue;
        }
        s.failed = msg.slice(0, 160);
        return s;
      }
    }
    s.turns++;
    s.firstTokenMs.push(first);
    s.totalMs.push(Date.now() - started);
    // Öğrencinin gördüğü (ve istemcinin geçmişte geri gönderdiği) metin süzülmüş olan.
    const shown = filterCorrectionLines(text, step.say, { register: chatRegister(sc.conversation), lang: sc.conversation.course === "en" ? "en" : "de" }).text;
    history.push({ role: "assistant", content: shown });

    const rawCorrections = parseReply(text).corrections;
    const { body, corrections, suggestions } = parseReply(shown);
    s.suggestions.push(suggestions.length);

    const glitch = text.match(GLITCH);
    if (glitch) s.glitches.push(glitch[0]);

    tally(s.raw, step, rawCorrections);
    tally(s.guarded, step, corrections);
    const echo = echoOf(body, step.say) ?? patternInRole(body, sc.conversation.patterns);
    if (echo) s.echoes.push(echo);
    const slip = ROLE_SLIPS[sc.id];
    if (slip && slip.test(body)) s.roleSlips.push(body.split("\n")[0].slice(0, 160));
    if (step.expectTurkish) s.turkishOk = TURKISH_MARKERS.test(body);

    s.overLevel.push(...overLevel(body, pools));

    // EVAL_SHOW=1 ile cevapların kendisi basılıyor.
    //
    // Bunun gerekli olduğu koç testinde öğrenildi: orada sayılar 8/8 verirken
    // çıktılardan biri düpedüz yanlıştı („w harfi v gibi okunmamalı“) ve
    // anahtar kelime eşleşmesi bunu kaçırmıştı. Sayı, içeriğin doğru olduğunu
    // göstermiyor — metni gözle okumak gerekiyor.
    if (process.env.EVAL_SHOW) {
      console.log(`\n  ${s.turns}. tur — öğrenci: ${step.say}`);
      console.log(`     ${body.replace(/\n/g, "\n     ")}`);
      for (const c of rawCorrections) console.log(`     ${CORRECTION_MARK}${corrections.includes(c) ? "" : " [SÜZÜLDÜ]"} ${c}`);
      for (const g of suggestions) console.log(`     ${SUGGESTION_MARK} ${g}`);
    }
    // Dakikalık istek limitinin altında kalacak aralık (varsayılan ~4.6/dk).
    await new Promise((r) => setTimeout(r, Number(process.env.EVAL_DELAY_MS) || 13_000));
  }
  s.overLevel = [...new Set(s.overLevel)];
  return s;
}

const median = (xs: number[]) =>
  xs.length ? [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] : 0;

async function main() {
  const providers = chatProviders();
  if (!providers.length) {
    console.error(
      "Hiçbir sağlayıcı anahtarı tanımlı değil.\n" +
        "Örnek: CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_AI_TOKEN=... GROQ_API_KEY=... npm run test:chat",
    );
    process.exit(1);
  }

  const pools = levelPools();
  const wanted = process.env.EVAL_SCENARIO?.split(",").map((x) => x.trim()).filter(Boolean);
  const scenarios = wanted?.length ? SCENARIOS.filter((x) => wanted.includes(x.id)) : SCENARIOS;
  const only = process.env.EVAL_PROVIDER;
  const chosen = only ? providers.filter((p) => p.name === only) : providers;
  if (!scenarios.length || !chosen.length) {
    console.error(`Senaryo ya da sağlayıcı yok. Senaryolar: ${SCENARIOS.map((x) => x.id).join(", ")}`);
    process.exit(1);
  }
  console.log(`Senaryo: ${scenarios.map((x) => `${x.id} (${x.script.length} tur)`).join(" · ")} · ${chosen.length} sağlayıcı\n`);

  const scores: Score[] = [];
  for (const p of chosen) {
    for (const sc of scenarios) {
      process.stdout.write(`${p.name} (${p.model}) · ${sc.id} çalışıyor…`);
      const s = await evaluate(p, pools, sc);
      console.log(s.failed ? ` HATA` : ` bitti`);
      scores.push(s);
    }
  }

  console.log("\n" + "─".repeat(78));
  for (const s of scores) {
    console.log(`\n▸ ${s.provider} — ${s.model} · ${s.scenario}`);
    if (s.failed) {
      console.log(`  ✗ ${s.turns}. turda düştü: ${s.failed}`);
      continue;
    }
    const sugAll = s.suggestions.filter((n) => n === 3).length;
    const sugNone = s.suggestions.filter((n) => n === 0).length;
    console.log(
      `  öneri           : ${sugAll}/${s.turns} turda tam 3 · ${sugNone} turda hiç yok`,
    );
    for (const [name, t] of [["ham", s.raw], ["süzgeçten sonra", s.guarded]] as const) {
      console.log(
        `  düzeltme (${name.padEnd(15)}): ${t.caught}/${s.fixesExpected} hata yakalandı · ` +
          `${t.falseFixes}/${s.checkedTurns} turda yanlış düzeltme`,
      );
      for (const w of t.wrong) console.log(`      ✗ ${w}`);
    }
    console.log(
      `  karakter        : ${s.glitches.length ? `✗ ${s.glitches.length} bozulma (${s.glitches.slice(0, 3).join(", ")})` : "✓ temiz"}`,
    );
    console.log(
      `  yankı           : ${s.echoes.length ? `✗ ${s.echoes.length}/${s.turns} turda karakter öğrencinin ağzından konuştu` : "✓ yok"}`,
    );
    for (const e of s.echoes) console.log(`      ✗ ${e}`);
    if (ROLE_SLIPS[s.scenario]) {
      console.log(
        `  rol karışması   : ${s.roleSlips.length ? `✗ ${s.roleSlips.length}/${s.turns} turda öğrencinin sorusunu karakter sordu` : "✓ yok"}`,
      );
      for (const e of s.roleSlips) console.log(`      ✗ ${e}`);
    }
    console.log(
      `  Türkçe'ye geçiş : ${s.turkishOk === null ? "—" : s.turkishOk ? "✓" : "✗ Türkçe açıklama gelmedi"}`,
    );
    console.log(
      `  seviye          : ${s.overLevel.length ? `${s.overLevel.length} üst seviye kelime (${s.overLevel.slice(0, 5).join(", ")})` : "✓ A1–B1 içinde"}`,
    );
    console.log(
      `  gecikme         : ilk parça ~${median(s.firstTokenMs)}ms · tur ~${median(s.totalMs)}ms`,
    );
    if (s.throttled) console.log(`  limit           : ${s.throttled} turda 429 beklendi`);
  }
  console.log("\n" + "─".repeat(78));
  console.log(
    "Not: seviye ölçümü yönseldir (Almanca çekim yüzünden gürültülü) — sağlayıcıları\n" +
      "birbirine göre karşılaştırmak için, mutlak yüzde olarak değil.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

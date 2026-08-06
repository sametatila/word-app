/**
 * Sohbet sağlayıcı kalite ölçümü.
 *
 *   CEREBRAS_API_KEY=... GROQ_API_KEY=... npm run test:chat
 *
 * Anahtarı olan her sağlayıcı aynı senaryodan geçirilir ve karşılaştırmalı
 * tablo basılır. Amaç genel bir "model iyi mi" testi değil — **bu uygulamanın
 * bağlı olduğu davranışları** ölçmek:
 *
 *   1. İşaret sözleşmesi — her turda 3 öneri (💬) geliyor mu? Gelmezse öneri
 *      şeridi sessizce boş kalır ve sohbetin en önemli UX parçası ölür.
 *   2. Düzeltme isabeti — senaryoya bilerek yerleştirilmiş hataları (✏️)
 *      yakalıyor mu, doğru cümleye yanlış düzeltme yapıştırıyor mu?
 *   3. Karakter bütünlüğü — Almanca (ä ö ü ß) ve Türkçe (ç ğ ı ö ş ü) harfleri
 *      bozuluyor mu? EğitimKit'te Llama'nın Türkçe token bozulması için ayrı
 *      bir temizleyici yazılmış; aynı sorun burada cümleyi okunamaz yapar.
 *   4. Seviyede kalma — ürettiği Almanca kelimeler A1–B1 havuzunda mı, yoksa
 *      B2/C1'e mi kaçıyor? Ölçüt uygulamanın kendi seviyeli kelime listesi.
 *   5. Türkçe'ye geçiş — öğrenci Türkçe sorunca Türkçe açıklıyor mu?
 *   6. Gecikme — ilk parçaya kadar geçen süre. Eller serbest döngüsünde
 *      cevabın gelmesi ne kadar uzarsa konuşma o kadar kopuyor.
 *
 * Senaryo sabit; prompt değişince ya da yeni sağlayıcı eklenince aynı komutla
 * tekrar çalışır ve karşılaştırılabilir sayı üretir.
 */
import { readFileSync } from "node:fs";
import { chatProviders, type ChatMessage, type Provider } from "../src/lib/chat-providers";

import { CORRECTION_MARK, SUGGESTION_MARK, parseReply } from "../src/lib/chat-format";
import { findLesson } from "../src/lib/lessons";
import { roleplayPrompt } from "../src/lib/lessons/roleplay";

/* ─────────────── Senaryo ─────────────── */

type Step = {
  say: string;
  /** Bilerek yerleştirilen hata: düzeltmede bu kelime geçmeli. */
  expectFix?: string;
  /** Cümle doğru — düzeltme satırı gelmemeli (yanlış pozitif ölçümü). */
  expectClean?: boolean;
  /** Türkçe soru — cevapta Türkçe açıklama beklenir. */
  expectTurkish?: boolean;
};

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
 * Ölçüm dersi.
 *
 * Senaryonun gömülü hataları (Akkusativ, V2) genel dilbilgisi hataları;
 * istem dersin kalıplarına odaklansa da her gerçek hatayı düzeltmek zorunda —
 * test tam olarak bunu ölçüyor.
 */
const LESSON = findLesson("de-a1-hallo")!;

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

type Score = {
  provider: string;
  model: string;
  turns: number;
  suggestions: number[];
  fixesCaught: number;
  fixesExpected: number;
  falseFixes: number;
  cleanTurns: number;
  glitches: string[];
  turkishOk: boolean | null;
  overLevel: string[];
  firstTokenMs: number[];
  totalMs: number[];
  /** Limite takılıp beklenen tur sayısı — kapasite sinyali. */
  throttled: number;
  failed?: string;
};

async function evaluate(provider: Provider, pools: ReturnType<typeof levelPools>): Promise<Score> {
  const system = roleplayPrompt(LESSON);
  const history: ChatMessage[] = [];
  const s: Score = {
    provider: provider.name,
    model: provider.model,
    turns: 0,
    suggestions: [],
    fixesCaught: 0,
    fixesExpected: SCRIPT.filter((x) => x.expectFix).length,
    falseFixes: 0,
    cleanTurns: SCRIPT.filter((x) => x.expectClean).length,
    glitches: [],
    turkishOk: null,
    overLevel: [],
    firstTokenMs: [],
    totalMs: [],
    throttled: 0,
  };

  for (const step of SCRIPT) {
    history.push({ role: "user", content: step.say });
    // Ücretsiz katmanların dakikalık istek limiti dar (Cerebras: 5/dk).
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
          process.stdout.write(" ⏳");
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
    history.push({ role: "assistant", content: text });

    const { body, corrections, suggestions } = parseReply(text);
    s.suggestions.push(suggestions.length);

    const glitch = text.match(GLITCH);
    if (glitch) s.glitches.push(glitch[0]);

    if (step.expectFix) {
      const hit = corrections.some((c) =>
        c.toLocaleLowerCase("de-DE").includes(step.expectFix!.toLocaleLowerCase("de-DE")),
      );
      if (hit) s.fixesCaught++;
    }
    if (step.expectClean && corrections.length) s.falseFixes++;
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
      for (const c of corrections) console.log(`     ${CORRECTION_MARK} ${c}`);
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
        "Örnek: CEREBRAS_API_KEY=... GROQ_API_KEY=... npm run test:chat",
    );
    process.exit(1);
  }

  const pools = levelPools();
  console.log(`Senaryo: ${SCRIPT.length} tur · A2 · ${providers.length} sağlayıcı\n`);

  const scores: Score[] = [];
  for (const p of providers) {
    process.stdout.write(`${p.name} (${p.model}) çalışıyor…`);
    const s = await evaluate(p, pools);
    console.log(s.failed ? ` HATA` : ` bitti`);
    scores.push(s);
  }

  console.log("\n" + "─".repeat(78));
  for (const s of scores) {
    console.log(`\n▸ ${s.provider} — ${s.model}`);
    if (s.failed) {
      console.log(`  ✗ ${s.turns}. turda düştü: ${s.failed}`);
      continue;
    }
    const sugAll = s.suggestions.filter((n) => n === 3).length;
    const sugNone = s.suggestions.filter((n) => n === 0).length;
    console.log(
      `  öneri (💬)      : ${sugAll}/${s.turns} turda tam 3 · ${sugNone} turda hiç yok`,
    );
    console.log(
      `  düzeltme (✏️)   : ${s.fixesCaught}/${s.fixesExpected} hata yakalandı · ` +
        `${s.falseFixes}/${s.cleanTurns} doğru cümleye yanlış düzeltme`,
    );
    console.log(
      `  karakter        : ${s.glitches.length ? `✗ ${s.glitches.length} bozulma (${s.glitches.slice(0, 3).join(", ")})` : "✓ temiz"}`,
    );
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

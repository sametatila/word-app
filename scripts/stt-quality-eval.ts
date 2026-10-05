/**
 * Konuşma tanıma kalite ölçümü — `npm run test:stt-quality -- <klip dizini>`
 *
 * Dizinde `index.tsv` (dosya \t dil \t beklenen) ve 16 kHz mono WAV klipler.
 * Klipler sentetik sesle üretilir (macOS `say`, Türkçe sesle Almanca/İngilizce
 * = kaba aksan; gürültülü kopya; sessizlik ve yalnız gürültü). Gerçek kullanıcı
 * sesi YOK. Her klip her sağlayıcıdan geçer; kabul ölçütü yürüyüştekine yakın:
 * artikel dışındaki beklenen sözcüklerin hepsi duyulanda. Sessizlik/gürültüde
 * boş dönmeyen her metin "uydurma" sayılır.
 */
import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sttProviders, type SttProvider } from "../src/lib/chat-providers";
import { sttCall, sttCallWorkersAiNoVad } from "../src/lib/stt";

const ARTICLES = new Set(["der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "the", "a", "an"]);
const fold = (t: string) =>
  t
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

function accepted(heard: string, expected: string): boolean {
  const h = new Set(fold(heard));
  const want = fold(expected).filter((w) => !ARTICLES.has(w));
  return want.length > 0 && want.every((w) => h.has(w));
}

type Row = { file: string; lang: string; expected: string };

async function main() {
  const dir = process.argv[2];
  if (!dir) throw new Error("klip dizini ver");
  const rows: Row[] = readFileSync(join(dir, "index.tsv"), "utf8")
    .trim()
    .split("\n")
    .map((l) => {
      const [file, lang, expected = ""] = l.split("\t");
      return { file, lang, expected };
    });
  const all = sttProviders();
  const pick = (n: string) => all.find((p) => p.name === n);
  const acc = process.env.CLOUDFLARE_ACCOUNT_ID;
  const cf: SttProvider | undefined = acc && process.env.CLOUDFLARE_AI_TOKEN
    ? { name: "cloudflare", dialect: "workers-ai", baseUrl: `https://api.cloudflare.com/client/v4/accounts/${acc}`, key: process.env.CLOUDFLARE_AI_TOKEN, model: "@cf/openai/whisper-large-v3-turbo" }
    : undefined;
  type Lane = { name: string; run: (f: File, lang: string) => Promise<{ text: string }> };
  const lanes: Lane[] = [];
  const dg = pick("deepgram");
  if (dg) lanes.push({ name: "deepgram nova-3", run: (f, l) => sttCall(dg, f, l) });
  const gq = pick("groq");
  if (gq) lanes.push({ name: "groq whisper", run: (f, l) => sttCall(gq, f, l) });
  if (cf) {
    lanes.push({ name: "workers-ai whisper +vad", run: (f, l) => sttCall(cf, f, l) });
    lanes.push({ name: "workers-ai whisper", run: (f, l) => sttCallWorkersAiNoVad(cf, f, l) });
  }
  const only = process.env.LANES?.split(",");
  const use = only ? lanes.filter((l) => only.some((o) => l.name.startsWith(o))) : lanes;

  const out: Record<string, { ok: number; total: number; hallu: number; quiet: number; fail: number; misses: string[]; ms: number[] }> = {};
  for (const lane of use) {
    const r = (out[lane.name] = { ok: 0, total: 0, hallu: 0, quiet: 0, fail: 0, misses: [] as string[], ms: [] as number[] });
    for (const row of rows) {
      const file = new File([readFileSync(join(dir, row.file))], row.file, { type: "audio/wav" });
      let text = "";
      const t0 = Date.now();
      for (let attempt = 0; ; attempt++) {
        try {
          text = (await lane.run(file, row.lang)).text;
          break;
        } catch (err) {
          const m = (err as Error).message;
          if (attempt < 4 && /429|rate/i.test(m)) {
            await new Promise((res) => setTimeout(res, 20_000));
            continue;
          }
          r.fail++;
          text = `HATA ${m.slice(0, 60)}`;
          break;
        }
      }
      r.ms.push(Date.now() - t0);
      if (!row.expected) {
        r.quiet++;
        if (text && !text.startsWith("HATA")) {
          r.hallu++;
          r.misses.push(`${row.file} (${row.lang}) → "${text}"`);
        }
        continue;
      }
      r.total++;
      if (accepted(text, row.expected)) r.ok++;
      else r.misses.push(`${row.file}: "${row.expected}" → "${text}"`);
    }
  }
  for (const [name, r] of Object.entries(out)) {
    const med = [...r.ms].sort((a, b) => a - b)[Math.floor(r.ms.length / 2)];
    console.log(`\n${name.padEnd(24)} tanındı ${r.ok}/${r.total}  sessizlik/gürültüde uydurma ${r.hallu}/${r.quiet}  hata ${r.fail}  medyan ${med} ms`);
    for (const m of r.misses) console.log(`    ${m}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

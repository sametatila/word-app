/**
 * Akışlı sohbetin jeton muhasebesi — `npm run test:chat-usage`.
 *
 * Veritabanı ve ağ gerektirmez. Çerçeveler sağlayıcıların GERÇEK akışından
 * alındı (2026-10-01, `stream_options.include_usage`):
 *   Cloudflare: her parçada `usage`, ara parçalarda 0, gerçek sayı sonda.
 *   Groq: bitiş parçasında `x_groq.usage`, ardından boş `choices`li `usage` parçası.
 *
 * NEDEN: akışlı sohbet çağrıları `ai_usage`a jetonsuz yazılıyordu ve sohbetin
 * maliyeti canlıdan ölçülemiyordu. Biçim değişirse (ya da sağlayıcı ara
 * parçada 0 gönderip sonda göndermezse) bu test kırılmalı.
 */
import { usageFromFrame } from "../src/lib/chat-providers";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

type U = { prompt: number; completion: number } | null;
const run = (frames: object[]): U => frames.reduce<U>((acc, f) => usageFromFrame(f as never, acc), null);

console.log("\nAkış kullanım bilgisi");
const cloudflare = [
  { choices: [{ delta: { content: "Hal" } }], usage: { prompt_tokens: 0, completion_tokens: 0 } },
  { choices: [{ delta: { content: "lo" } }], usage: { prompt_tokens: 0, completion_tokens: 0 } },
  { choices: [{ delta: {}, finish_reason: "length" }], usage: { prompt_tokens: 0, completion_tokens: 0 } },
  { choices: [{ delta: {}, finish_reason: "length" }], usage: { prompt_tokens: 16, completion_tokens: 8, neurons: 0.36 } },
];
const cf = run(cloudflare);
check("Cloudflare: son dolu değer alınıyor", cf?.prompt === 16 && cf?.completion === 8, JSON.stringify(cf));

const groq = [
  { choices: [{ delta: { content: "Hallo" } }] },
  { choices: [{ delta: {}, finish_reason: "stop" }], x_groq: { usage: { prompt_tokens: 74, completion_tokens: 35 } } },
  { choices: [], usage: { prompt_tokens: 74, completion_tokens: 35 } },
];
const gq = run(groq);
check("Groq: x_groq.usage ve son usage parçası", gq?.prompt === 74 && gq?.completion === 35, JSON.stringify(gq));

const groqOnlyX = run([{ choices: [{ delta: {}, finish_reason: "stop" }], x_groq: { usage: { prompt_tokens: 5, completion_tokens: 2 } } }]);
check("Groq: yalnız x_groq.usage da yetiyor", groqOnlyX?.prompt === 5 && groqOnlyX?.completion === 2, JSON.stringify(groqOnlyX));

check("kullanım hiç gelmezse null (sıfır yazılmıyor)", run([{ choices: [{ delta: { content: "x" } }] }]) === null);
const late0 = run([{ usage: { prompt_tokens: 10, completion_tokens: 3 } }, { usage: { prompt_tokens: 0, completion_tokens: 0 } }]);
check("dolu değerden sonra gelen 0 onu silmiyor", late0?.prompt === 10 && late0?.completion === 3, JSON.stringify(late0));
check("null usage parçası sorun çıkarmıyor", run([{ usage: null }, { choices: [] }]) === null);
check("kısmi ara sayı (0 giriş) kabul edilmiyor: akış yarıda kesilirse boş kalır",
  run([{ usage: { prompt_tokens: 0, completion_tokens: 1 } }]) === null);

console.log(`\n${total - failures}/${total} geçti`);
if (failures) process.exit(1);

export {};

/**
 * Kullanıma göre ücretlenen servislerin tarife hesabı — `npm run test:ai-budget`.
 *
 * Veritabanı ve ağ gerektirmez. Cloudflare'in neuron oranı GERÇEK akıştan
 * doğrulanıyor: 16 giriş + 8 çıkış jetonu için sağlayıcı `neurons: 0.36`
 * bildirdi (2026-10-01, `test:chat-usage`daki çerçeve). Tarife değişir de
 * tablo güncellenmezse bu test kırılmalı.
 */
import {
  CLOUDFLARE,
  cloudflareDayUsd,
  cloudflareNeurons,
  cloudflareSttNeurons,
  deepgramUsd,
  groqChatUsd,
  groqSttBilledSeconds,
  groqSttUsd,
  projectMonth,
} from "../src/lib/ai-budget-limits";

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
const near = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;

console.log("\nCloudflare");
const gemma = "@cf/google/gemma-4-26b-a4b-it";
const n = cloudflareNeurons(gemma, 16, 8);
check("Gemma 4: sağlayıcının bildirdiği 0,36 neuron", n != null && Math.abs(n - 0.36) < 0.01, String(n));
check("varsayılan model tarifede", cloudflareNeurons(gemma, 1, 1) != null);
check("tarifede olmayan model null", cloudflareNeurons("@cf/yok/model", 100, 100) === null);
const w = cloudflareSttNeurons("@cf/openai/whisper-large-v3-turbo", 60);
check("Whisper turbo: dakikası 46,63 neuron (≈ 0,0005 $)", w != null && near(w, 46.63) && near((w / 1000) * CLOUDFLARE.usdPer1kNeurons, 0.000513), String(w));
check("tarifede olmayan ses modeli null", cloudflareSttNeurons("@cf/yok/stt", 60) === null);
check("ücretsiz planda maliyet 0", cloudflareDayUsd(50_000, "free") === 0);
check("ücretlide ücretsiz pay düşülüyor", cloudflareDayUsd(CLOUDFLARE.freeNeuronsPerDay, "paid") === 0 && near(cloudflareDayUsd(CLOUDFLARE.freeNeuronsPerDay + 1000, "paid"), 0.011));

console.log("\nGroq");
check("ücretsiz katmanda 0", groqChatUsd("openai/gpt-oss-120b", 1e6, 1e6, "free") === 0);
check("ücretli: 1M giriş + 1M çıkış = 0,75 $", near(groqChatUsd("openai/gpt-oss-120b", 1e6, 1e6, "paid"), 0.75));
check("Whisper: istek başı en az 10 sn", groqSttBilledSeconds([2, 4.6, 30]) === 50);
check("Whisper ücretli: 1 saat = 0,04 $", near(groqSttUsd(3600, "paid"), 0.04) && groqSttUsd(3600, "free") === 0);

console.log("\nDeepgram ve tahmin");
check("nova-3: 60 dk = 0,258 $", near(deepgramUsd("nova-3", 3600), 0.258));
check("bilinmeyen model nova-3 fiyatıyla", near(deepgramUsd("nova-9", 60), 0.0043));
const mid = new Date(Date.UTC(2026, 9, 16, 0, 0)); // 15 gün geçmiş, ekim 31 gün
check("ay ortasında doğrusal tahmin", near(projectMonth(15, mid), 31), String(projectMonth(15, mid)));
check("ayın ilk anında sonsuza gitmiyor", Number.isFinite(projectMonth(1, new Date(Date.UTC(2026, 9, 1, 0, 0)))));

console.log(`\n${total - failures}/${total} geçti`);
if (failures) process.exit(1);

/**
 * Etkin yapay zekâ sağlayıcıları birim testi — `npm run test:ai-providers`.
 *
 * Veritabanı ve ağ gerektirmez. İzleme (uyarı motoru, panel) sağlayıcıları
 * `ai_usage` geçmişinden değil bu listeden okuyor; liste yanlışsa ya kaldırılan
 * bir sağlayıcı için uyarı gelir (2026-09-30, Mistral) ya da etkin bir
 * sağlayıcının arızası sessiz kalır.
 */
const KEYS = [
  "CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_AI_TOKEN", "CLOUDFLARE_AI_MODEL", "GROQ_API_KEY", "GROQ_MODEL", "CHAT_PROVIDER",
  "AZURE_SPEECH_KEY", "AZURE_SPEECH_REGION", "DEEPGRAM_API_KEY", "STT_ORDER",
];
for (const k of KEYS) delete process.env[k];

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

async function main() {
  const { activeAiProviders, activeAiProviderNames } = await import("../src/lib/ai-providers");
  const roles = (role: string) => activeAiProviders().filter((p) => p.role === role).map((p) => p.name).join(",");

  console.log("\nEtkin sağlayıcılar");
  check("anahtar yoksa dil modeli yok", roles("chat") === "", roles("chat"));
  check("anahtar yoksa konuşma tanıma yok", roles("stt") === "", roles("stt"));
  check("Edge seslendirme anahtarsız hep var", roles("tts") === "edge", roles("tts"));

  process.env.CLOUDFLARE_ACCOUNT_ID = "acc";
  process.env.CLOUDFLARE_AI_TOKEN = "cf";
  process.env.GROQ_API_KEY = "gq";
  process.env.AZURE_SPEECH_KEY = "az";
  process.env.AZURE_SPEECH_REGION = "germanywestcentral";
  process.env.DEEPGRAM_API_KEY = "dg";
  check("dil modeli sırası Cloudflare, Groq", roles("chat") === "cloudflare,groq", roles("chat"));
  check("konuşma tanıma sırası Azure, Deepgram, Groq", roles("stt") === "azure,deepgram,groq", roles("stt"));
  check("Azure anahtarı varsa seslendirme yedeği", roles("tts") === "edge,azure", roles("tts"));
  check("kaldırılan sağlayıcılar listede yok", !activeAiProviderNames().has("mistral") && !activeAiProviderNames().has("cerebras"));

  process.env.CHAT_PROVIDER = "groq";
  check("CHAT_PROVIDER sırayı değiştiriyor", roles("chat") === "groq,cloudflare", roles("chat"));
  delete process.env.CHAT_PROVIDER;

  delete process.env.CLOUDFLARE_ACCOUNT_ID;
  check("hesap kimliği yoksa Cloudflare etkin değil", roles("chat") === "groq", roles("chat"));

  console.log(`\n${total - failures}/${total} geçti`);
  if (failures) process.exit(1);
}

void main();

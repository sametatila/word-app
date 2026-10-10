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
  check("konuşma tanıma sırası Azure, Deepgram, Cloudflare, Groq", roles("stt") === "azure,deepgram,cloudflare,groq", roles("stt"));
  check("Azure anahtarı varsa seslendirme yedeği", roles("tts") === "edge,azure", roles("tts"));
  check("kaldırılan sağlayıcılar listede yok", !activeAiProviderNames().has("mistral") && !activeAiProviderNames().has("cerebras"));

  process.env.CHAT_PROVIDER = "groq";
  check("CHAT_PROVIDER sırayı değiştiriyor", roles("chat") === "groq,cloudflare", roles("chat"));
  delete process.env.CHAT_PROVIDER;

  delete process.env.CLOUDFLARE_ACCOUNT_ID;
  check("hesap kimliği yoksa Cloudflare etkin değil", roles("chat") === "groq", roles("chat"));
  check("hesap kimliği yoksa Cloudflare ses zincirinde de yok", roles("stt") === "azure,deepgram,groq", roles("stt"));

  /* QA F-0061: okunamayan çıktıdan sonra ikinci deneme öteki modelden gelsin,
     ama tek sağlayıcı varsa yine o denensin (sona atılır, düşürülmez). */
  console.log("\nOkunamayan çıktıdan sonra sağlayıcı sırası");
  const { chatProviders, avoidLast } = await import("../src/lib/chat-providers");
  const names = (avoid?: "cloudflare" | "groq") => avoidLast(chatProviders(), avoid).map((p) => p.name).join(",");
  check("tek sağlayıcı varsa kaçınılan yine denenir", names("groq") === "groq", names("groq"));
  process.env.CLOUDFLARE_ACCOUNT_ID = "acc";
  check("kaçınma yoksa sıra aynı", names() === "cloudflare,groq", names());
  check("Cloudflare'den kaçınınca önce Groq", names("cloudflare") === "groq,cloudflare", names("cloudflare"));
  check("Groq'tan kaçınınca önce Cloudflare", names("groq") === "cloudflare,groq", names("groq"));

  /* Yeniden üretimde döndürme (QA F-0002) yalnız hazır sağlayıcılar arasında: kotası dolup soğumaya
     alınan Groq her yeniden denemede başa gelip kesin 429 alıyordu (2026-10-10). */
  console.log("\nYeniden üretimde döndürme ve soğuma");
  const { rateLimited } = await import("../src/lib/chat-providers");
  const rot = (r: number, now?: number) => chatProviders(r, now).map((p) => p.name).join(",");
  check("döndürme yoksa sıra aynı", rot(0) === "cloudflare,groq", rot(0));
  check("ikinci deneme öteki modelden", rot(1) === "groq,cloudflare", rot(1));
  rateLimited("groq", new Response(null, { status: 429, headers: { "retry-after": "600" } }));
  check("soğumadaki Groq döndürmede başa gelmiyor", rot(1) === "cloudflare,groq", rot(1));
  check("soğumadaki Groq listeden düşmüyor (sonda)", rot(0) === "cloudflare,groq", rot(0));
  check("soğuma bitince döndürme yine öteki modelden", rot(1, Date.now() + 3_600_000) === "groq,cloudflare", rot(1, Date.now() + 3_600_000));

  console.log("\nDeepgram kredisi bitince");
  const { noteDeepgramFailure, deepgramResting } = await import("../src/lib/stt");
  const t0 = 1_000_000;
  check("başta dinlenmiyor", !deepgramResting(t0));
  noteDeepgramFailure(500, t0);
  check("5xx geçici: dinlenmiyor", !deepgramResting(t0 + 1));
  noteDeepgramFailure(429, t0);
  check("429 geçici: dinlenmiyor", !deepgramResting(t0 + 1));
  noteDeepgramFailure(402, t0);
  check("402 (kredi bitti): bir saat dinleniyor", deepgramResting(t0 + 59 * 60_000));
  check("bir saat sonra yeniden deneniyor", !deepgramResting(t0 + 61 * 60_000));
  noteDeepgramFailure(401, t0);
  check("401 (anahtar): dinleniyor", deepgramResting(t0 + 1));

  console.log(`\n${total - failures}/${total} geçti`);
  if (failures) process.exit(1);
}

void main();

export {};

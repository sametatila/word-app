/**
 * Koç kalite testi — `npm run test:coach`
 *
 *   MISTRAL_API_KEY=... npm run test:coach
 *
 * Sohbet testinden (chat-eval.ts) ayrı, çünkü ölçtüğü şey farklı: sohbette
 * konuşmanın akışı ve düzeltme dengesi ölçülüyor, burada **tek bir teşhisin
 * doğru olup olmadığı**.
 *
 * Senaryolar çevrimdışı mantığın tam olarak çuvalladığı yerleri taklit ediyor,
 * çünkü koç yalnızca oralarda çağrılıyor:
 *
 *   - tanınmayan kelime var ama önceden yazılmış bir sapmaya uymuyor
 *   - söylenen şey hedeften tamamen farklı
 *   - diyalogda hiçbir dal tutmuyor ama cevap aslında geçerli
 *   - diyalogda hiçbir dal tutmuyor ve cevap gerçekten konu dışı
 *
 * Ölçülenler biçim (tek satır, markdown yok, sarmalayan tırnak yok) ve
 * içerik (beklenen kelime geçiyor mu, yanlış onay veriliyor mu). Biçim kısmı
 * lib/coach.ts'teki `tidy` ile aynı kuralı sınıyor: bu test yazılırken
 * modelin markdown kalın işareti yazdığı ve tırnakla başlayan cümlenin
 * kırpılmayla bozulduğu böyle görüldü.
 */

import { tidy } from "../src/lib/coach-format";
import { SPEECH_SYSTEM, DIALOGUE_SYSTEM } from "../src/lib/coach-prompts";

const MISTRAL_KEY = process.env.MISTRAL_API_KEY;
const MODEL = process.env.MISTRAL_MODEL || "mistral-medium-latest";

type Case = {
  label: string;
  system: string;
  user: string;
  /** Cevapta geçmesi beklenen anahtar — teşhisin konuya değdiğini gösterir. */
  expect: string[];
  /** Geçmemesi gereken anahtar — yanlış onay ya da konuyu kaçırma. */
  reject?: string[];
};

const CASES: Case[] = [
  {
    label: "telaffuz · ö sesi o'ya kaymış",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Ich finde das Buch sehr schön.
Tanıyıcının duydukları: "ich finde das buch sehr schon", "ich finde das buch sehr schonen"
Tanınmayan kelimeler: schön
Farkı tek cümlede Türkçe açıkla.`,
    expect: ["schön", "ö"],
  },
  {
    label: "telaffuz · tamamen başka cümle",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Ich hätte gern einen Kaffee.
Tanıyıcının duydukları: "ich habe kein auto", "ich hab kein auto"
Tanınmayan kelimeler: hätte, gern, einen, kaffee
Farkı tek cümlede Türkçe açıkla.`,
    expect: ["kaffee"],
  },
  {
    label: "telaffuz · ü sesi u'ya kaymış",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Ich möchte über das Wetter sprechen.
Tanıyıcının duydukları: "ich möchte uber das wetter sprechen"
Tanınmayan kelimeler: über
Farkı tek cümlede Türkçe açıkla.`,
    expect: ["über", "ü"],
  },
  {
    // Bu üçü kural motorunun YAKALAYAMADIĞI durumlar: hata gerçek bir kelimeye
    // denk düşmüyor, dolayısıyla sapma listesinde karşılığı yok. Koçun kural
    // listesiyle akıl yürütmesi gereken yer tam olarak burası.
    label: "kural · sp/st şp/şt okunmamış",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Ich spreche ein bisschen Deutsch.
Tanıyıcının duydukları: "ich sprehe ein bisschen deutsch", "ich sprache ein bisschen deutsch"
Tanınmayan kelimeler: spreche
Bu görevin çalıştırdığı ses: Kelime başındaki „sp“ = şp
Farkı tek cümlede Türkçe açıkla.`,
    expect: ["şp", "sp"],
  },
  {
    label: "kural · vurgu sona kaymış",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Mein Vater ist Lehrer.
Tanıyıcının duydukları: "mein fater ist lehrer", "mein water ist lehrer"
Tanınmayan kelimeler: Vater
Farkı tek cümlede Türkçe açıkla.`,
    expect: ["v", "f"],
  },
  {
    // En önemli sınav: model varsayılan olarak ö/ü'yü suçlamamalı. Türkçede
    // bu sesler var; öğrenciye bilmediği bir hatayı söylemek güven kırıyor.
    label: "kural · ö/ü suçlanmamalı, uzunluk suçlanmalı",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Ich fühle mich gut.
Tanıyıcının duydukları: "ich fülle mich gut", "ich fuelle mich gut"
Tanınmayan kelimeler: fühle
Bu görevin çalıştırdığı ses: uzun ü
Farkı tek cümlede Türkçe açıkla.`,
    expect: ["uzun", "uzat", "h"],
    reject: ["yuvarla", "dudak"],
  },
  {
    label: "diyalog · geçerli ama senaryoda yazılmamış cevap",
    system: DIALOGUE_SYSTEM,
    user: `Uygulamanın sorusu (Almanca): Was möchten Sie trinken?
Öğrenciye verilen yönlendirme: İçecek siparişi ver.
Öğrencinin söylediği: "Für mich bitte ein Glas Wasser."
Senaryoda beklenen cevaplar: kaffee | tee | wasser | milch
Tek cümlede Türkçe olarak ne yapması gerektiğini söyle.`,
    // Geçerli bir cevap: koç bunu onaylamalı, "yanlış" dememeli.
    expect: ["doğru", "uygun", "olur", "geçerli", "tamam", "güzel"],
    reject: ["yanlış", "hatalı"],
  },
  {
    label: "diyalog · soruya uymayan cevap",
    system: DIALOGUE_SYSTEM,
    user: `Uygulamanın sorusu (Almanca): Was möchten Sie trinken?
Öğrenciye verilen yönlendirme: İçecek siparişi ver.
Öğrencinin söylediği: "Ich wohne in Berlin."
Senaryoda beklenen cevaplar: kaffee | tee | wasser | milch
Tek cümlede Türkçe olarak ne yapması gerektiğini söyle.`,
    // Somut bir Almanca cümle önermeli.
    expect: ["möchte", "ich"],
  },
];

const MARKDOWN = /\*\*|__|^[-*•]\s/;

async function ask(system: string, user: string): Promise<string> {
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${MISTRAL_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 120,
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0, 160)}`);
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function main() {
  if (!MISTRAL_KEY) {
    console.error("MISTRAL_API_KEY tanımlı değil.");
    process.exit(1);
  }

  console.log(`Koç testi · ${CASES.length} senaryo · ${MODEL}\n`);
  let failed = 0;

  for (const c of CASES) {
    let raw: string;
    try {
      raw = await ask(c.system, c.user);
    } catch (err) {
      console.log(`▸ ${c.label}\n  ✗ istek başarısız: ${(err as Error).message}\n`);
      failed++;
      continue;
    }

    // Ölçülen şey kullanıcının gördüğü metin: ham çıktı değil, tidy'den geçmişi.
    const shown = tidy(raw);
    const lower = shown.toLocaleLowerCase("tr-TR");
    const problems: string[] = [];

    if (!shown) problems.push("boş cevap");
    if (shown.includes("\n")) problems.push("tek satır değil");
    if (MARKDOWN.test(shown)) problems.push("markdown işareti temizlenemedi");
    if (!c.expect.some((k) => lower.includes(k.toLocaleLowerCase("tr-TR")))) {
      problems.push(`beklenen anahtarların hiçbiri yok: ${c.expect.join(", ")}`);
    }
    for (const bad of c.reject ?? []) {
      if (lower.includes(bad.toLocaleLowerCase("tr-TR"))) problems.push(`istenmeyen: "${bad}"`);
    }

    if (problems.length) failed++;
    console.log(`▸ ${c.label}`);
    console.log(`  ${problems.length ? "✗ " + problems.join(" · ") : "✓"}`);
    console.log(`  ${shown}`);
    // Temizlik gerektiyse görünsün: istem düzelirse tidy'nin yükü azalır.
    if (shown !== raw.trim()) console.log(`  (ham çıktı temizlendi)`);
    console.log("");

    // Ücretsiz katman dakikalık istek sayıyor; art arda atmak 429 getirir.
    await new Promise((r) => setTimeout(r, Number(process.env.EVAL_DELAY_MS) || 1500));
  }

  console.log(
    failed ? `${failed}/${CASES.length} senaryo sorunlu.` : `${CASES.length}/${CASES.length} geçti.`,
  );
  // Biçim kuralları kesin, içerik kuralları anahtar kelimeye bakıyor ve model
  // aynı şeyi başka kelimelerle söyleyebilir. Bu yüzden çıkış kodu 0: test bir
  // kapı değil, çıktıyı gözle görmek için bir araç.
}

void main();

/**
 * Koç kalite testi — `npm run test:coach`
 *
 *   MISTRAL_API_KEY=... npm run test:coach
 *   CHAT_PROVIDER=groq GROQ_API_KEY=... npm run test:coach   (tek sağlayıcıyı sına)
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

import { completeChat, chatProviders } from "../src/lib/chat-providers";
import { tidy } from "../src/lib/coach-format";
import { SPEECH_SYSTEM, DIALOGUE_SYSTEM } from "../src/lib/coach-prompts";

/**
 * Sağlayıcı seçimi üretimdekiyle aynı zincirden geliyor.
 *
 * Önce Mistral'a sabitlenmişti ve bu bir boşluk bırakıyordu: zincirde Mistral
 * dolunca Groq ve Cerebras devreye giriyor, yani gerçek kullanıcıların bir
 * kısmı hiç ölçülmemiş bir modelle konuşuyordu. Kural seti tek modele göre
 * ayarlanmış olabilirdi.
 *
 * Artık `completeChat` kullanılıyor — üretimin çağırdığı işlevin ta kendisi.
 * `CHAT_PROVIDER` ile tek tek sağlayıcı sınanabiliyor.
 */

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
    // Bu senaryo eskiden „ö sesi o'ya kaydı“ idi ve Türkçe konuşan için
    // gerçekçi değildi: Türkçede ö var. Gerçek hata uzunluk — „schön“de ö
    // uzun, „können“de kısa. Senaryo da ona çevrildi.
    label: "telaffuz · ö'nün uzunluğu",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Ich finde das Buch sehr schön.
Tanıyıcının duydukları: "ich finde das buch sehr schonen", "ich finde das buch sehr können"
Tanınmayan kelimeler: schön
Bu görevin çalıştırdığı ses: uzun ö
Farkı tek cümlede Türkçe açıkla.`,
    expect: ["uzun", "uzat", "schön"],
    reject: ["yuvarla", "dudak"],
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
    // Etiket önce "vurgu" diyordu ama senaryo aslında v/f karışması — düzeltildi.
    // Asıl önemlisi `reject` listesi: model bu vakada bir kez kuralı ters
    // çevirip „w harfi v gibi okunmamalı“ yazdı, ki bu düpedüz yanlış
    // (Almancada w = v). Anahtar kelime eşleşmesi bunu kaçırmıştı; hatalı
    // ifadeler artık açıkça reddediliyor.
    label: "kural · v harfi f okunmalı",
    system: SPEECH_SYSTEM,
    user: `Hedef cümle: Mein Vater ist Lehrer.
Tanıyıcının duydukları: "mein fater ist lehrer", "mein water ist lehrer"
Tanınmayan kelimeler: Vater
Farkı tek cümlede Türkçe açıkla.`,
    // Beklenen: v'nin f okunduğunu söylemesi. Reddedilen: w kuralını ters
    // çevirmesi — model bunu bir çalıştırmada gerçekten yaptı ve anahtar
    // kelime eşleşmesi kaçırmıştı. Çıktı kararlı değil, o yüzden bu satır
    // kalıcı bir bekçi.
    expect: ["f gibi", "f olarak", "f sesi"],
    reject: ["v gibi okunmamalı", "v gibi okunmaz", "v olarak okunmamalı"],
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
  return completeChat(system, [{ role: "user", content: user }], 120);
}

async function main() {
  const providers = chatProviders();
  if (!providers.length) {
    console.error(
      "Hiç sağlayıcı anahtarı tanımlı değil (MISTRAL_API_KEY, GROQ_API_KEY, CEREBRAS_API_KEY).",
    );
    process.exit(1);
  }

  console.log(
    `Koç testi · ${CASES.length} senaryo · ${providers[0].name} (${providers[0].model})` +
      (providers.length > 1 ? ` · yedek: ${providers.slice(1).map((p) => p.name).join(", ")}` : "") +
      "\n",
  );
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
    // Anahtar araması tırnaklardan arındırılmış metinde yapılıyor: modeller
    // kelimeleri tırnağa alıyor („f“ sesi) ve düz eşleşme bunu kaçırıyordu —
    // Groq'un doğru cevabı bu yüzden hatalı sayılmıştı. Aranan içerik, yazım
    // süsü değil.
    const lower = shown
      .toLocaleLowerCase("tr-TR")
      .replace(/["“”„'`´]/g, "")
      .replace(/\s+/g, " ");
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

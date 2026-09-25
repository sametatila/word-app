/**
 * Okuma seslendirme İŞ LİSTESİ — kendi karakter sesleri için (beceri okuma alıştırmaları).
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/tts-reading-jobs.ts <çıktı.jsonl>
 *
 * Sesli okunan tek okuma içeriği beceri alıştırmaları (`reading-player`): deneme sınavı ve haftalık quiz
 * okuma metinleri ekranda kalıyor, seslendirilmiyor. İstekler `reading-player` + `speakSegments` →
 * `mergeForSpeech` ile kuruluyor: her paragraf ayrı parça (`gapBefore` birleşmeyi engelliyor), önce
 * `cleanForSpeech`, sonra `splitForSpeech` (≤ 600 karakter, cümle sınırından). Her parça ayrı bir
 * `/api/tts` isteği, yani ayrı bir klip; anahtarı bu temiz metin. `mergeForSpeech` bir istemci
 * bileşeninin içinde (DOM'a dokunuyor), buraya aynısı yazıldı — oradaki bölme değişirse bu da değişmeli.
 *
 * Ses: `conversationVoice(kurs)` — kullanıcı tercihinden bağımsız, de → Katja → Defne, en → Jenny → Defne.
 * Hız: istemci `pace: "listen"` istiyor; dosya doğal hızda üretiliyor, hız sunum tarafının kararı.
 */
import { writeFileSync } from "node:fs";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { cleanForSpeech, splitForSpeech } from "../src/lib/tts/text";

const [out] = process.argv.slice(2);
const lines: string[] = [];
const seen = new Set<string>();
const by: Record<string, { jobs: number; chars: number }> = {};
for (const ex of BUNDLED_EXERCISES) {
  if (ex.skill !== "reading") continue;
  const lang = ex.id.startsWith("en-") ? "en" : "de";
  ex.text.split("\n\n").forEach((para, p) => {
    const text = cleanForSpeech(para);
    if (!text) return;
    splitForSpeech(text).forEach((part, k) => {
      const clean = cleanForSpeech(part);
      const key = `${lang}|${clean}`;
      if (!clean || seen.has(key)) return;   // aynı temiz metin bir kez seslendirilir
      seen.add(key);
      lines.push(JSON.stringify({ id: `${ex.id}.${p}.${k}`, field: "reading", lang, niveau: (ex as { level?: string }).level ?? null, text: part, clean, long: true }));
      const b = (by[lang] ??= { jobs: 0, chars: 0 });
      b.jobs++; b.chars += clean.length;
    });
  });
}
writeFileSync(out, lines.join("\n") + "\n");
console.log(`okuma: ${lines.length} iş`, by);

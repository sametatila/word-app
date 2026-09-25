/**
 * Ders anlatımı seslendirme İŞ LİSTESİ — kendi karakter sesleri için (anadili Türkçe kullanıcının dersleri).
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/tts-conversation-jobs.ts <çıktı.jsonl>
 *
 * conversation-player her adımda bir segment dizisini (`say`, ipucu `hint`, düzeltme `why` …) tek parti olarak
 * `speakSegments`e veriyor; "yeniden dinle" aynı diziyi çalıyor. `mergeForSpeech` (components/speak-button,
 * istemci bileşeni — içe aktarılamıyor, aşağıda aynısı) bitişik ve AYNI sesli segmentleri birleştirip ≤ 600
 * karakterlik parçalara bölüyor; her parça ayrı bir /api/tts isteği. Ses (`voiceForSegment`): Türkçe içerik →
 * TURKISH_VOICE (Emel), hedef dil → conversationVoice (Katja/Jenny) — hepsi Defne (tr/de/en). Adımın başına eklenen
 * anlatım övgüleri (`narration` bayraklı, birleşmez) ayrı istek; onlar da listede.
 * Rol yapma (`chat`) Edge'de kalıyor (envanterle aynı karar); Zürih (gsw-zh) dersleri kapsam dışı.
 */
import { writeFileSync } from "node:fs";
import { CONVERSATIONS } from "../src/lib/conversations/source";
import { translate } from "../src/lib/i18n/dict";
import { cleanForSpeech, splitForSpeech } from "../src/lib/tts/text";

const [out] = process.argv.slice(2);
type Seg = { lang: string; text: string; narration?: boolean; voice?: string; pitch?: string; pace?: string; gapBefore?: number };
const isSeg = (x: unknown): x is Seg =>
  !!x && typeof x === "object" && typeof (x as Seg).lang === "string" && typeof (x as Seg).text === "string";

/** speak-button `mergeForSpeech` */
function merge(segs: Seg[]): Seg[] {
  const merged: Seg[] = [];
  const same = (a: Seg, b: Seg) => a.lang === b.lang && a.narration === b.narration && a.voice === b.voice && a.pitch === b.pitch && a.pace === b.pace;
  for (const s of segs) {
    const text = cleanForSpeech(s.text);
    if (!text) continue;
    const last = merged[merged.length - 1];
    if (last && same(last, s) && !s.gapBefore) last.text = `${last.text} ${text}`;
    else merged.push({ ...s, text });
  }
  return merged.flatMap((m) => splitForSpeech(m.text).map((text) => ({ ...m, text })));
}

const lines: string[] = [];
const seen = new Set<string>();
const by: Record<string, { jobs: number; chars: number }> = {};
let voiced = 0;
function emit(id: string, segs: Seg[]) {
  merge(segs).forEach((s, k) => {
    if (s.voice) { voiced++; return; }            // kendi sesini söyleyen parça (kadro) — derste beklenmiyor, sayılır
    const clean = cleanForSpeech(s.text);
    const key = `${s.lang}|${clean}`;
    if (!clean || seen.has(key)) return;
    seen.add(key);
    lines.push(JSON.stringify({ id: `${id}.${k}`, field: "conversation", lang: s.lang, text: s.text, clean, long: true }));
    const b = (by[s.lang] ??= { jobs: 0, chars: 0 });
    b.jobs++; b.chars += clean.length;
  });
}

/** Ders ağacında her segment DİZİSİ bir çalma birimi. */
function walk(v: unknown, id: string) {
  if (Array.isArray(v)) {
    if (v.length && v.every(isSeg)) { emit(id, v as Seg[]); return; }
    v.forEach((x, i) => walk(x, `${id}.${i}`));
    return;
  }
  if (!v || typeof v !== "object") return;
  for (const [k, x] of Object.entries(v)) {
    if (k === "chat") continue;
    walk(x, `${id}.${k}`);
  }
}
for (const l of CONVERSATIONS) {
  if (l.course === "gsw-zh") continue;
  walk((l as unknown as { lecture: unknown }).lecture, `${l.course}.${l.id}`);
}
// anlatım övgüleri ve düzeltme girişi (anadil tr)
for (const key of ["conversation.praise_1", "conversation.praise_2", "conversation.praise_3", "conversation.praise_4", "conversation.praise_5", "conversationp.not_quite"])
  emit(`nar.${key}`, [{ lang: "tr", text: translate("tr", key), narration: true }]);

writeFileSync(out, lines.join("\n") + "\n");
console.log(`ders: ${lines.length} iş, kadro sesli (atlanan) ${voiced}`, by);

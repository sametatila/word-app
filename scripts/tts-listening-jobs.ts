/**
 * Dinleme seslendirme İŞ LİSTESİ — kendi karakter sesleri için.
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/tts-listening-jobs.ts <çıktı.jsonl>
 *
 * Uygulamanın dinlemede /api/tts'e gönderdiği istekler birebir kuruluyor:
 *   - Ses dağıtımı uygulamanın kendi `dialogueCast`ıyla (konuşmacı → cinsiyet → kadro koltuğu → ses + perde).
 *   - `dialogueSegments` + `mergeForSpeech` (components/speak-button, istemci bileşeni — DOM'a dokunduğu için
 *     içe aktarılamıyor) aşağıda aynısıyla yazıldı; oradaki kural değişirse bu da değişmeli.
 * Çalma biçimleri (her biri ayrı istek metni üretir, ikisi de listeye girer, aynı metin bir kez):
 *   - bütün diyalog tek seferde (aynı konuşmacının art arda replikleri BİRLEŞİR): deneme sınavı, haftalık quiz,
 *     beceri dinlemesi;
 *   - replik replik (birleşmez): modül sınavı (exam-player), seviye tespiti (beceri dinlemesinin ilk iki repliği,
 *     kadro o iki replikten kurulur).
 * Kadro sesi → karakter (karar 2026-09-21): 1. kadın Defne, 2. kadın Mira, 3. kadın Defne; 1. erkek Aras,
 * 2. erkek Can, 3. erkek Aras. 3. koltuğun ve 4.+ konuşmacının perde farkı yayında (sunucu eşlemesi) uygulanır;
 * iş satırı `cast` (istenen katalog sesi) ve `pitch`i taşır. Üretim anahtarı (karakter, dil, temiz metin).
 * Zürih (gsw-zh) kadrosu yok: kendi modelimiz lehçe konuşmuyor.
 */
import { writeFileSync } from "node:fs";
import { MOCK_PAPERS } from "../src/lib/mock-exams/source";
import { QUIZ_WEEKS } from "../src/lib/weekly-quiz";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { MODULE_EXAMS } from "../src/lib/lessons/module-exam";
import { dialogueCast } from "../src/lib/tts/speakers";
import { cleanForSpeech, splitForSpeech } from "../src/lib/tts/text";

const [out] = process.argv.slice(2);
type Seg = { speaker?: string; text: string };
type Req = { voice: string; pitch: string; text: string; gap: boolean };

const CHAR: Record<string, string> = {
  "de-DE-KatjaNeural": "defne", "de-DE-AmalaNeural": "mira", "de-DE-SeraphinaMultilingualNeural": "defne",
  "de-DE-ConradNeural": "aras", "de-DE-KillianNeural": "can", "de-DE-FlorianMultilingualNeural": "aras",
  "en-US-JennyNeural": "defne", "en-US-AriaNeural": "mira", "en-US-MichelleNeural": "defne",
  "en-US-GuyNeural": "aras", "en-US-AndrewNeural": "can", "en-US-ChristopherNeural": "aras",
};

/** speak-button `dialogueSegments`: kadro + konuşmacı değişince pay (birleşmeyi keser). */
function dialogue(course: string, segs: Seg[]): Req[] {
  const cast = dialogueCast(course, segs);
  let prev = "";
  return segs.map((s, i) => {
    const who = s.speaker ?? "";
    const gap = i > 0 && who !== prev;
    prev = who;
    return { voice: cast[i].voice, pitch: cast[i].pitch, text: s.text, gap };
  });
}

/** speak-button `mergeForSpeech`: aynı ses/perde ve paysız bitişikler birleşir, sonra ≤ 600 karakterlik parçalar. */
function merge(reqs: Req[]): Req[] {
  const merged: Req[] = [];
  for (const r of reqs) {
    const text = cleanForSpeech(r.text);
    if (!text) continue;
    const last = merged[merged.length - 1];
    if (last && last.voice === r.voice && last.pitch === r.pitch && !r.gap) last.text = `${last.text} ${text}`;
    else merged.push({ ...r, text });
  }
  return merged.flatMap((m) => splitForSpeech(m.text).map((text) => ({ ...m, text })));
}

const lines: string[] = [];
const seen = new Set<string>();
const by: Record<string, { jobs: number; chars: number }> = {};
let skipped = 0;
function emit(source: string, course: string, reqs: Req[]) {
  const lang = course === "en" ? "en" : "de";
  reqs.forEach((r, k) => {
    const char = CHAR[r.voice];
    if (!char) { skipped++; return; }
    const clean = cleanForSpeech(r.text);
    const key = `${char}|${lang}|${clean}`;
    if (!clean || seen.has(key)) return;
    seen.add(key);
    lines.push(JSON.stringify({ id: `${source}.${k}`, field: "listening", lang, char, cast: r.voice, pitch: r.pitch, text: r.text, clean, long: true }));
    const b = (by[char] ??= { jobs: 0, chars: 0 });
    b.jobs++; b.chars += clean.length;
  });
}
const whole = (source: string, course: string, segs: Seg[]) => emit(source, course, merge(dialogue(course, segs)));
const each = (source: string, course: string, segs: Seg[]) =>
  dialogue(course, segs).forEach((r, i) => emit(`${source}.r${i}`, course, merge([{ ...r, gap: false }])));

for (const paper of MOCK_PAPERS) for (const part of paper.parts) for (const task of part.tasks) for (const st of task.texts ?? [])
  if (st.kind === "audio") whole(`mock.${paper.id}.${st.id}`, paper.course, st.segments);
for (const week of QUIZ_WEEKS) week.items.forEach((it, n) => {
  const st = (it as { stimulus?: { kind: string; segments?: Seg[] } }).stimulus;
  if (st?.kind === "audio" && st.segments) whole(`quiz.${week.course}.${(week as { id?: string }).id ?? ""}.${n}`, week.course, st.segments);
});
for (const ex of BUNDLED_EXERCISES) {
  if (ex.skill !== "listening") continue;
  const course = ex.id.startsWith("en-") ? "en" : "de";
  whole(`skill.${ex.id}`, course, ex.segments);
  each(`placement.${ex.id}`, course, ex.segments.slice(0, 2).map((s: Seg) => ({ speaker: s.speaker, text: s.text })));
}
MODULE_EXAMS.forEach((plan, n) => {
  const turns = plan.listening?.turns;
  if (turns) each(`module.${(plan as { id?: string }).id ?? n}`, "de", turns.map((t: { speaker?: string; de: string }) => ({ speaker: t.speaker, text: t.de })));
});

writeFileSync(out, lines.join("\n") + "\n");
console.log(`dinleme: ${lines.length} iş, kadrosuz atlanan ${skipped}`, by);

/**
 * Ana dile çevrilmemiş metinleri sayar:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/report-native-gaps.ts`
 *
 * NEDEN BİR RAPOR. Bu eksenin her adımında yeni bir kalem çıktı ve hepsi
 * AYNI biçimde çıktı: bir şey bitmiş sayıldı, sonra ekrana bakınca hâlâ
 * Türkçe duran bir yer görüldü. Şablon notları, rol yapma senaryosu,
 * can-do ifadeleri — üçü de plan "bitti" dedikten sonra bulundu.
 *
 * Tek tek bulmak yerine SAYIYORUZ. Rapor kaynakları geziyor, her birinde
 * kaç benzersiz Türkçe dize olduğunu ve o kalemin bir çeviri hattı olup
 * olmadığını söylüyor. Yeni bir kalem eklendiğinde burada görünür.
 *
 * Kapı DEĞİL: sayılar düşerken bile "bitti" demek bu raporun işi değil,
 * kalemlerin kendi kapılarının işi. Burada amaç envanterin kaza eseri
 * keşfedilmesini bitirmek.
 */
import { readFileSync, existsSync } from "node:fs";
import { LESSONS } from "@/lib/lessons";
import { CANDO } from "@/lib/cando";
import { MODULE_EXAMS } from "@/lib/lessons/module-exam";
import type { ModuleExamPlan } from "@/lib/lessons/module-exam/types";
import type { Segment } from "@/lib/lessons/types";
import { resolveSegments, type NativeDict } from "@/lib/lessons/native";

const DICT = "src/lib/lessons/generated/native-en.json";
const dict = existsSync(DICT)
  ? (JSON.parse(readFileSync(DICT, "utf8")) as Record<string, Record<string, unknown>>)
  : null;

type Row = { kalem: string; benzersiz: number; hat: string | null; kapsanan: number };
const rows: Row[] = [];

const uniq = (xs: Iterable<string | undefined | null>) => {
  const s = new Set<string>();
  for (const x of xs) if (typeof x === "string" && x.trim()) s.add(x);
  return s;
};

// ── Anlatım ───────────────────────────────────────────────────────────
{
  /*
    ÇÖZÜCÜYLE sayılıyor, düz eşleşmeyle değil. Şablonun ürettiği 2.865 dize
    hiçbir `out/` dosyasında durmuyor — çözücü onu çerçeve deseniyle
    kuruyor. Düz eşleşme sayılsaydı bitmiş bir kalem eksik görünürdü.
  */
  const texts = new Set<string>();
  const eksik = new Set<string>();
  for (const l of LESSONS.filter((x) => x.course === "de"))
    for (const st of l.lecture ?? []) {
      const walk = (segs?: Segment[]) => {
        if (!segs) return;
        let prev: string | null = null;
        for (const sg of segs) {
          if (sg.lang !== "tr") { prev = sg.text; continue; }
          texts.add(sg.text);
          if (dict) {
            const one = resolveSegments(dict as unknown as NativeDict, l.id, prev ? [{ lang: "de", text: prev }, sg] : [sg]);
            if (!one) eksik.add(sg.text);
          }
          prev = null;
        }
      };
      walk(st.say);
      const e = st.expect as { hint?: Segment[]; why?: Segment[] } | undefined;
      walk(e?.hint);
      walk(e?.why);
    }
  rows.push({ kalem: "ders anlatımı", benzersiz: texts.size, hat: "lecture + word", kapsanan: texts.size - eksik.size });
}

// ── Can-do ────────────────────────────────────────────────────────────
{
  const u = uniq(CANDO.map((c) => c.tr));
  const covered = dict ? CANDO.filter((c) => dict.cando?.[c.id] !== undefined).length : 0;
  rows.push({ kalem: "can-do ifadeleri", benzersiz: u.size, hat: "cando", kapsanan: covered });
}

// ── Modül sınavı ──────────────────────────────────────────────────────
{
  const plans = Object.values(MODULE_EXAMS).flat() as ModuleExamPlan[];
  const texts: string[] = [];
  let candoEn = 0;
  for (const p of plans) {
    texts.push(p.titleTr);
    for (const f of p.focus) texts.push(f.tr);
    for (const c of p.canDo) {
      texts.push(c.tr);
      if (c.en?.trim()) candoEn++;
    }
    texts.push(p.listening.titleTr, p.listening.situation, p.reading.titleTr, p.reading.genre, p.writing.prompt);
    for (const t of p.listening.turns) texts.push(t.tr);
    for (const q of p.listening.questions) texts.push(q.tr);
    for (const q of p.reading.questions) texts.push(q.tr);
    for (const s of p.speaking) texts.push(s.situation, s.tr);
    for (const c of p.writing.checklist) texts.push(c);
  }
  const u = uniq(texts);
  /*
    `ExamCando.en` ZATEN VAR ve doluydu: kâğıtları yazan taraf İngilizceyi
    baştan düşünmüş. Kapsanan sayısı bu yüzden sıfır değil — kalemin
    tamamı sıfırdan yazılmayacak.
  */
  rows.push({ kalem: "modül sınavı", benzersiz: u.size, hat: null, kapsanan: candoEn ? uniq(plans.flatMap((p) => p.canDo.filter((c) => c.en?.trim()).map((c) => c.tr))).size : 0 });
}

// ── Rapor ─────────────────────────────────────────────────────────────
const pad = (s: string, n: number) => s + " ".repeat(Math.max(0, n - s.length));
console.log(pad("kalem", 20) + pad("benzersiz", 11) + pad("kapsanan", 10) + "hat");
let eksik = 0;
for (const r of rows) {
  eksik += r.benzersiz - r.kapsanan;
  console.log(
    pad(r.kalem, 20) +
      pad(String(r.benzersiz), 11) +
      pad(String(r.kapsanan), 10) +
      (r.hat ?? "— HAT YOK"),
  );
}
console.log(`\nkalan: ${eksik} benzersiz dize`);
if (!dict) console.log("(sözlük yok — `npm run lessons:apply` çalıştırılmamış)");

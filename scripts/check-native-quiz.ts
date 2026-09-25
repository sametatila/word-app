/**
 * Haftalık quiz çözücüsünü GERÇEK haftalar üzerinde denetler:
 *   `npm run check:quiz-native` (önce iki sözlüğü de `apply` ile kurar)
 *
 * Hattın kendi kapısı (`data/weekly-quiz/prose/check.ts`) YAZILANI ölçüyor.
 * Bu betik yazılanın uygulamaya VARDIĞINI ölçüyor — `check:mock-native`in
 * eşi ve aynı gerekçe: deneme kâğıdı hattında 6.627 dize yazılmış ama
 * `apply.mjs` dizini okumadığı için hiçbiri ekrana çıkmamıştı.
 *
 * DÖRT ÖLÇÜT:
 *
 *  1. KAPSAM. `PAIR_READY`deki her çift için (en → Almanca kurs, de →
 *     İngilizce kurs) o kursun HER haftası `resolveQuizWeek` ile çözülüyor.
 *     Hep-ya-hiç: tek dize eksikse hafta düşüyor ve eksik anahtar adıyla
 *     yazılıyor.
 *  2. TÜRKÇE KALDI MI. Çözülen haftanın her dizesi, alan adına bakmadan
 *     `isTurkishStem` ile taranıyor. Çıkarıcı yeni bir Türkçe alanı
 *     görmezse bu tarama görür.
 *  3. ÖĞRENİLEN DİL DOKUNULMADI. Tema, uyaranlar, kökler ve şıklar
 *     çözümden önce ve sonra BİREBİR aynı olmalı; quiz ölçtüğü şeyi ölçmeye
 *     devam etmeli. Cevap anahtarı da (okurun gördüğü `answer`) aynı.
 *  4. KAPI. Sözlük `native/<dil>` paketine değil kapılı `quiznative/<dil>`
 *     paketine gidiyor: açıklamalar cevap gerekçesi ve manifest herkese açık.
 *
 * Sonunda iki haftanın kapağını ve bir açıklamasını basıyor — İngilizce ve
 * Almanca arayüzde neyin görüneceğinin duman testi.
 */
import { readFileSync } from "node:fs";
import { QUIZ_WEEKS } from "@/lib/weekly-quiz";
import { resolveQuizWeek, quizKey, type QuizDict } from "@/lib/weekly-quiz/native";
import { resolveItem } from "@/lib/weekly-quiz/scoring";
import { isTurkishStem } from "@/lib/conversations/native";
import { PAIR_READY } from "@/lib/courses";
import { isGatedPack } from "@/lib/content/ids";
import { quizNativePack } from "@/lib/content/packs";
import type { QuizWeek } from "@/lib/weekly-quiz/types";
import { extractQuiz } from "../data/weekly-quiz/prose/make.js";

const DICTS: Record<"en" | "de", QuizDict> = {
  en: (JSON.parse(readFileSync("src/lib/conversations/generated/native-en.json", "utf8")) as { quiz?: QuizDict }).quiz ?? {},
  de: (JSON.parse(readFileSync("src/lib/conversations/generated/native-de.json", "utf8")) as { quiz?: QuizDict }).quiz ?? {},
};

let errors = 0;
const fail = (m: string) => {
  errors++;
  console.log(`  ✗ ${m}`);
};

/** Öğrenilen dildeki her şey — çözümden etkilenmemesi gereken yüz. */
const learned = (w: QuizWeek, reader: "en" | "de") =>
  JSON.stringify({
    theme: w.theme,
    stimuli: w.stimuli.map((s) => ({ ...s, genreTr: undefined })),
    items: w.items.map((it) => {
      const r = resolveItem(it, reader);
      return { id: r.id, stem: r.stem, options: r.options, answer: r.answer, targets: r.targets };
    }),
  });

const leftovers: string[] = [];
const walk = (v: unknown, where: string): void => {
  if (typeof v === "string") {
    if (isTurkishStem(v)) leftovers.push(`${where}: ${JSON.stringify(v.slice(0, 90))}`);
  } else if (Array.isArray(v)) for (const x of v) walk(x, where);
  else if (v && typeof v === "object") for (const x of Object.values(v)) walk(x, where);
};

const samples: string[] = [];
for (const reader of ["en", "de"] as const) {
  const dict = DICTS[reader];
  for (const course of PAIR_READY[reader]) {
    if (course !== "de" && course !== "en") continue;
    const rows = extractQuiz(course);
    const missing = rows.filter((r) => dict[quizKey(r.kind, r.tr)] === undefined);
    if (missing.length) {
      fail(`${reader} okur · ${course} kursu: ${missing.length} dize sözlükte yok (ilki [${missing[0].kind}] ${JSON.stringify(missing[0].tr.slice(0, 60))})`);
      continue;
    }
    const weeks = QUIZ_WEEKS.filter((w) => w.course === course);
    let ok = 0;
    for (const w of weeks) {
      const out = resolveQuizWeek(dict, w, reader);
      if (!out) {
        fail(`${w.id} ${reader} diline çözülemedi`);
        continue;
      }
      ok++;
      if (learned(out, reader) !== learned(w, reader)) fail(`${w.id}: öğrenilen dildeki yüz değişti`);
      /* Yalnız çevrilen alanlar taranıyor: öğrenilen dilin kendisinde Türkçe
         bir ad (`Ayşe`) içerik, leke değil. */
      walk(
        {
          themeTr: out.themeTr,
          genre: out.stimuli.map((s) => s.genreTr),
          why: out.items.map((it) => resolveItem(it, reader).why),
          byNative: out.items.map((it) => Object.values(it.byNative ?? {}).map((v) => v?.why)),
        },
        `${w.id} ${reader}`,
      );
      if (w.no === 1 && w.level === "A1") {
        const why = resolveItem(out.items[0], reader).why;
        samples.push(`  ${reader} · ${w.id}: kapak «${out.themeTr}» (${w.theme}) · ${out.stimuli[0]?.genreTr}\n      why: ${why.slice(0, 110)}`);
      }
    }
    console.log(`${reader} okur · ${course} kursu: ${ok}/${weeks.length} hafta çözülüyor · sözlük ${Object.keys(dict).length} girdi`);
  }
}

/* HEP-YA-HİÇ: tek anahtar eksilince hafta düşmeli. */
{
  const w = QUIZ_WEEKS.find((x) => x.course === "de")!;
  const cut = { ...DICTS.en };
  delete cut[quizKey("themeTr", w.themeTr)];
  if (resolveQuizWeek(cut, w, "en") !== null) fail("tek anahtar eksikken hafta yine çözüldü (hep-ya-hiç kırık)");
}

/* KAPI: quiz sözlüğü herkese açık pakete düşmemeli. */
for (const lang of ["en", "de"] as const)
  if (!isGatedPack(quizNativePack(lang))) fail(`${quizNativePack(lang)} kapılı değil — açıklamalar manifestte görünür`);

if (leftovers.length) {
  fail(`çözüldükten sonra ${leftovers.length} dize hâlâ Türkçe görünüyor`);
  for (const l of leftovers.slice(0, 20)) console.log(`      ${l}`);
}

console.log(`\nduman testi:\n${samples.join("\n")}`);
if (errors) {
  console.log(`\n${errors} hata`);
  process.exit(1);
}
console.log("\ntamam: haftalık quizin Türkçe yüzü iki anadile de hep-ya-hiç çözülüyor");

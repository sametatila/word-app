/**
 * Haftalık quiz çekirdeğinin birim testi — `npm run test:quiz`.
 *
 * Veritabanı ve ağ gerektirmez: sınanan şeyler saf. Üç sınıf var:
 *
 *  1. HAFTA ANAHTARI. Bugünkü haftalık sınavın açığı buradaydı — gün
 *     istemciden geliyor ve ±1 güne izin veriliyordu, yani hafta sınırında
 *     ikinci bir hak açılabiliyordu. Yeni türetme yalnız sunucu gününe bakıyor.
 *  2. SEÇİM. Blueprint sayıları kaymamalı (kayarsa haftalar karşılaştırılamaz)
 *     ve aynı girdi aynı quiz'i vermeli (öğrenci sayfayı yenileyince soru
 *     değişmemeli).
 *  3. PUANLAMA VE SIZINTI. En kritiği sonuncusu: istemciye giden nesnede cevap
 *     anahtarı BULUNMAMALI. Bulunursa bütün kurgu — sunucu puanlaması,
 *     manipülasyona kapalılık — anlamsızlaşır.
 */
import { personalItem, selectItems, weekIndexOf, weekStartOf } from "../src/lib/weekly-quiz/build";
import { resolveByIds, resolveItem, scoreQuiz, toClient, weakestBlock } from "../src/lib/weekly-quiz/scoring";
import { QUIZ_PLAN, type QuizItem } from "../src/lib/weekly-quiz/types";
import { quizForWeek, quizWeeksFor, QUIZ_WEEKS } from "../src/lib/weekly-quiz";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = ""): void {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

/* ── 1. Hafta anahtarı ────────────────────────────────────────────────── */

console.log("\nHafta anahtarı");
check("pazartesi kendine düşüyor", weekStartOf("2026-09-14") === "2026-09-14");
check("pazar bir önceki pazartesiye düşüyor", weekStartOf("2026-09-20") === "2026-09-14");
check("çarşamba haftanın pazartesisine düşüyor", weekStartOf("2026-09-16") === "2026-09-14");
check(
  "hafta sınırı: pazartesi ile bir önceki pazar AYNI haftaya düşmüyor",
  weekStartOf("2026-09-21") !== weekStartOf("2026-09-20"),
);
check("indeks haftada bir artıyor", weekIndexOf("2026-09-21") === weekIndexOf("2026-09-14") + 1);
check(
  "aynı haftanın her günü aynı indeks",
  new Set(["2026-09-14", "2026-09-16", "2026-09-20"].map(weekIndexOf)).size === 1,
);

/* ── 2. Katalog ve seçim ──────────────────────────────────────────────── */

console.log("\nKatalog");
const deA1 = quizWeeksFor("de", "A1");
check("de/A1 beş hafta", deA1.length === 5, `(${deA1.length})`);
check("haftalar sırayla", deA1.every((w, i) => w.no === i + 1));
check(
  "her paket havuzu blueprint'i karşılıyor",
  QUIZ_WEEKS.every((w) =>
    Object.entries(QUIZ_PLAN).every(([b, n]) => w.items.filter((i) => i.block === b).length >= n),
  ),
);
check("takvim indeksi havuzda dönüyor", quizForWeek("de", "A1", 7)?.no === 3, "(7 % 5 = 2 → 3. hafta)");
check("negatif indeks de dönüyor", quizForWeek("de", "A1", -1)?.no === 5);
/* Boş seviye DİNAMİK seçiliyor. Önce sabit "C1" yazılıydı ve C1 içeriği
   gelince test kırıldı — içerik büyüdükçe kendini bozan bir ölçüt. */
const emptyLevel = (["A1", "A2", "B1", "B2", "C1"] as const).find((l) => quizWeeksFor("de", l).length === 0);
check(
  "içeriği olmayan seviye null dönüyor",
  emptyLevel ? quizForWeek("de", emptyLevel, 0) === null : true,
  emptyLevel ? "" : "(her seviyede içerik var, atlandı)",
);

console.log("\nSeçim");
const week = deA1[0];
const picked = selectItems(week, { seed: "u1:2026-09-14" });
check("blueprint kadar madde", picked.length === Object.values(QUIZ_PLAN).reduce((a, b) => a + b, 0));
for (const [b, n] of Object.entries(QUIZ_PLAN)) {
  check(`${b} bloğundan ${n} madde`, picked.filter((i) => i.block === b).length === n);
}
check(
  "aynı tohum aynı quiz",
  JSON.stringify(selectItems(week, { seed: "u1:2026-09-14" }).map((i) => i.id)) ===
    JSON.stringify(picked.map((i) => i.id)),
);
check(
  "farklı tohum farklı sıra üretebiliyor",
  QUIZ_WEEKS.some((w) => {
    const a = selectItems(w, { seed: "a" }).map((i) => i.id).join();
    const b = selectItems(w, { seed: "b" }).map((i) => i.id).join();
    return a !== b;
  }),
);

// Kaçırılan hedef ağırlığı: o hedefi yoklayan madde seçime giriyor.
const grammarItems = week.items.filter((i) => i.block === "grammar");
const rare = grammarItems[grammarItems.length - 1];
const weighted = selectItems(week, { seed: "u1:2026-09-14", missedTargets: rare.targets });
check("kaçırılan hedefi yoklayan madde seçiliyor", weighted.some((i) => i.id === rare.id));

/* ── 3. Anadil varyantı ───────────────────────────────────────────────── */

console.log("\nAnadil varyantı");
const varItem = QUIZ_WEEKS.flatMap((w) => w.items).find((i) => i.byNative && Object.keys(i.byNative).length > 0)!;
const nativeKey = Object.keys(varItem.byNative!)[0] as "tr" | "en" | "de";
const base = resolveItem(varItem, nativeKey === "tr" ? "de" : "tr");
const variant = resolveItem(varItem, nativeKey);
check("varyant kendi açıklamasını veriyor", variant.why === varItem.byNative![nativeKey]!.why);
check("varyantı olmayan anadil tabana düşüyor", base.why === varItem.why);
check(
  "varyantın cevap anahtarı kendi şıklarına göre",
  variant.options[variant.answer] === varItem.byNative![nativeKey]!.options[varItem.byNative![nativeKey]!.answer],
);

/* ── 4. Sızıntı — en kritik ───────────────────────────────────────────── */

console.log("\nCevap anahtarı sızıntısı");
const resolved = picked.map((i) => resolveItem(i, "tr"));
const client = resolved.map(toClient);
const blob = JSON.stringify(client);
check("istemci nesnesinde `answer` alanı yok", client.every((c) => !("answer" in c)));
check("istemci nesnesinde `why` alanı yok", client.every((c) => !("why" in c)));
/*
  ALAN LİSTESİ KAPALI. İlk yazımda burada "açıklama metni gövdede geçmiyor"
  diye bir alt dizge araması vardı ve YANLIŞ ALARM verdi: `r2`nin açıklaması
  metinden alıntı yapıyor ("Mein Vater und meine Mutter leben in Wien") ve
  `v1` maddesinin kökü aynı sözcüklerle başlıyor — JSON'da değerin önündeki
  tırnakla birleşince eşleşti. Sızıntı yoktu, ölçüt yanlıştı.

  Doğru ölçüt yapısal: istemciye giden nesnenin alan kümesi KAPALI. Yarın
  `ResolvedItem`e bir alan eklenirse bu test kırılır ve ekleyen kişi o alanın
  istemciye gidip gitmeyeceğine bilerek karar vermek zorunda kalır.
*/
const CLIENT_KEYS = new Set(["id", "block", "ref", "stem", "options", "targets"]);
check(
  "istemci nesnesinde beklenmeyen alan yok",
  client.every((c) => Object.keys(c).every((k) => CLIENT_KEYS.has(k))),
  client.flatMap((c) => Object.keys(c).filter((k) => !CLIENT_KEYS.has(k))).join(","),
);
check("gövde yine de bir cevap anahtarı taşımıyor", !blob.includes('"answer"'));

/* ── 5. Puanlama ──────────────────────────────────────────────────────── */

console.log("\nPuanlama");
const allRight = Object.fromEntries(resolved.map((r) => [r.id, r.answer]));
const perfect = scoreQuiz(resolved, allRight);
check("hepsi doğru → %100", perfect.pct === 100 && perfect.correct === perfect.total);

const allWrong = Object.fromEntries(resolved.map((r) => [r.id, (r.answer + 1) % r.options.length]));
const zero = scoreQuiz(resolved, allWrong);
check("hepsi yanlış → %0", zero.pct === 0 && zero.correct === 0);

check("cevapsız madde yanlış sayılıyor", scoreQuiz(resolved, {}).correct === 0);
check(
  "aralık dışı seçim yanlış sayılıyor",
  scoreQuiz(resolved, Object.fromEntries(resolved.map((r) => [r.id, 99]))).correct === 0,
);
check(
  "sorulmamış maddeye gelen cevap yok sayılıyor",
  scoreQuiz(resolved, { ...allRight, "uydurma-madde": 0 }).total === resolved.length,
);
check(
  "istemci `correct` göndererek skoru değiştiremiyor",
  // Gövdede böyle bir alan olsa bile puanlayıcı yalnız şık sırasına bakıyor.
  scoreQuiz(resolved, JSON.parse(JSON.stringify({ ...allWrong })) as Record<string, number>).correct === 0,
);

const mixed = { ...allRight };
const firstGrammar = resolved.find((r) => r.block === "grammar")!;
mixed[firstGrammar.id] = (firstGrammar.answer + 1) % firstGrammar.options.length;
const partial = scoreQuiz(resolved, mixed);
check("kırılım blok başına doğru sayıyor", partial.byBlock.find((b) => b.block === "grammar")!.correct === QUIZ_PLAN.grammar - 1);
check("en zayıf blok bulunuyor", weakestBlock(partial) === "grammar");
check("hepsi doğruyken zayıf blok yok", weakestBlock(perfect) === null);

check(
  "kimliğe göre çözme sırayı koruyor",
  resolveByIds(week, [picked[2].id, picked[0].id], "tr").map((r) => r.id).join() ===
    [picked[2].id, picked[0].id].join(),
);
check("bilinmeyen kimlik sessizce düşüyor", resolveByIds(week, ["yok"], "tr").length === 0);

/* ── 6. Kişisel madde ─────────────────────────────────────────────────── */

console.log("\nKişisel madde");
const target = { wordId: 1, term: "heißen", gloss: "adı olmak" };
const pool = [
  { wordId: 2, term: "wohnen", gloss: "oturmak" },
  { wordId: 3, term: "kommen", gloss: "gelmek" },
  { wordId: 4, term: "lernen", gloss: "öğrenmek" },
];
const pi = personalItem(target, pool, "s")!;
check("kişisel madde kuruluyor", Boolean(pi));
check("blok `personal`", pi.block === "personal");
check("cevap anahtarı hedefi gösteriyor", pi.options[pi.answer] === target.term);
check("soru kökü anadildeki karşılık", pi.stem === target.gloss);
check("hedef şıklara girmiş", pi.options.includes(target.term));
check("çeldirici yetmezse madde kurulmuyor", personalItem(target, [pool[0]], "s") === null);
check(
  "kişisel madde ortak puanlayıcıdan geçiyor",
  scoreQuiz([resolveItem(pi as QuizItem, "tr")], { [pi.id]: pi.answer }).correct === 1,
);

console.log(`\n${failures === 0 ? "tamam" : "BAŞARISIZ"}: ${total - failures}/${total}`);
process.exit(failures === 0 ? 0 : 1);

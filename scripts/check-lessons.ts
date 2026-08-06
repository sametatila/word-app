/**
 * Ders içeriği doğrulaması: `npm run check:lessons`
 *
 * Veritabanı gerektirmez; kataloğu okur ve içerik sözleşmesini denetler.
 * İçerik üreten ajanın her partiden sonra çalıştırması zorunlu (bkz.
 * data/lessons-plan/SPEC.md): tip denetimi yapının doğruluğunu, bu betik
 * PEDAGOJİNİN sözleşmesini denetliyor — kelimeler gerçekten söyletiliyor mu,
 * puanlanan adım yeterli mi, doğru/yanlış cevapları tek kalıba saplanmış mı.
 *
 * İki seviye var: HATA (çıkış kodu 1 — parti kabul edilmez) ve UYARI
 * (yayına engel değil ama üretici gözden geçirmeli).
 */
import { LESSONS, lessonsFor, findLesson } from "../src/lib/lessons";
import { scoredSteps, type Lesson } from "../src/lib/lessons/types";
import { roleplayPrompt } from "../src/lib/lessons/roleplay";

let fails = 0;
let warns = 0;
function check(name: string, ok: boolean, extra = "") {
  if (!ok) fails++;
  console.log(`${ok ? "✓" : "✗"} ${name} ${extra}`.trimEnd());
}
function warn(name: string, ok: boolean, extra = "") {
  if (ok) return;
  warns++;
  console.log(`⚠ ${name} ${extra}`.trimEnd());
}

const repeatsOf = (l: Lesson) =>
  l.lecture
    .filter((s) => s.expect?.kind === "repeat")
    .map((s) => (s.expect as { target: string }).target.toLowerCase());

console.log(`Katalog: ${LESSONS.length} ders\n`);

// ── Katalog bütünlüğü ──
check("kimlikler benzersiz", new Set(LESSONS.map((l) => l.id)).size === LESSONS.length);
check("kimlikler kurallı (de-a1-slug)",
  LESSONS.every((l) => new RegExp(`^${l.course === "gsw-zh" ? "zh" : "de"}-${l.level.toLowerCase()}-[a-z0-9-]+$`).test(l.id)),
  `(${LESSONS.filter((l) => !new RegExp(`^de-${l.level.toLowerCase()}-[a-z0-9-]+$`).test(l.id)).map((l) => l.id).slice(0, 4).join(", ")})`);
check("kimlikle bulunuyor", findLesson(LESSONS[0].id)?.id === LESSONS[0].id);
check("kurs süzgeci karıştırmıyor", lessonsFor("gsw-zh").every((l) => l.course === "gsw-zh"));

// ── Ders başına sözleşme ──
for (const l of LESSONS) {
  const id = l.id;
  const bad = (msg: string, extra = "") => check(`${id}: ${msg}`, false, extra);
  const ok = (cond: boolean, msg: string, extra = "") => {
    if (!cond) bad(msg, extra);
  };

  ok(l.title.trim().length > 0 && l.titleTr.trim().length > 0, "başlıklar dolu");
  ok(l.summary.trim().length > 15, "özet bir cümle");
  ok(l.focusId.trim().length > 0, "odak kimliği var");
  ok(l.minutes >= 6 && l.minutes <= 15, "süre 6-15 dk", `(${l.minutes})`);
  ok(l.vocab.length === 5, "tam 5 kelime", `(${l.vocab.length})`);
  ok(l.patterns.length >= 2 && l.patterns.length <= 3, "2-3 kalıp", `(${l.patterns.length})`);
  ok(
    l.vocab.every((v) => v.de.trim() && v.tr.trim()),
    "kelime çiftleri dolu",
  );

  // Anlatım iskeleti
  ok(l.lecture[0]?.expect?.kind === "confirm", "onayla başlıyor");
  ok(l.lecture.length >= 14 && l.lecture.length <= 24, "anlatım 14-24 adım", `(${l.lecture.length})`);
  ok(!l.lecture[l.lecture.length - 1]?.expect, "kapanış adımı beklentisiz");
  ok(
    l.lecture.every((s) => s.say.length > 0 && s.say.every((seg) => seg.text.trim().length > 0)),
    "bütün segmentler dolu",
  );
  ok(
    l.lecture.every((s) =>
      s.say.every((seg) => seg.lang === "tr" || seg.lang === "de"),
    ),
    "segment dilleri geçerli",
  );
  // Almanca metin Türkçe segmentte durmamalı: seslendirme dili segmentten
  // seçiliyor, karışan dil yanlış sesle okunur. Sezgisel yalnızca Türkçede
  // OLMAYAN işaretlere bakıyor: ß, ä ve "der/die/das + Büyük" artikelli ad.
  const leakage = l.lecture.flatMap((s) =>
    s.say.filter(
      (seg) =>
        seg.lang === "tr" &&
        /[ßä]|\b(der|die|das|ein|eine|einen)\s+[A-ZÄÖÜ][a-zäöüß]/.test(seg.text),
    ),
  );
  warn(`${id}: tr segmentinde Almanca sızıntısı olabilir`, leakage.length === 0,
    `(${leakage.slice(0, 2).map((s) => s.text.slice(0, 40)).join(" | ")})`);

  // Her kelime sesli tekrar ettiriliyor
  const reps = repeatsOf(l);
  const missing = l.vocab.filter((v) => !reps.some((t) => t.includes(v.de.toLowerCase())));
  ok(missing.length === 0, "her kelime tekrar ettiriliyor",
    missing.length ? `(eksik: ${missing.map((v) => v.de).join(", ")})` : "");

  // Puanlanan adımlar
  const produces = l.lecture.filter((s) => s.expect?.kind === "produce");
  const tfs = l.lecture.filter((s) => s.expect?.kind === "truefalse");
  ok(produces.length >= 2, "en az 2 üretim", `(${produces.length})`);
  ok(tfs.length >= 1, "en az 1 doğru/yanlış", `(${tfs.length})`);
  ok(scoredSteps(l) >= 3, "puanlanan adım >= 3", `(${scoredSteps(l)})`);
  for (const s of produces) {
    const e = s.expect as { target: string; hint: { text: string }[] };
    ok(e.target.trim().length > 0, "üretim hedefi dolu");
    ok(e.hint.length > 0 && e.hint.every((h) => h.text.trim().length > 0), "üretim ipucu dolu");
    // İpucu doğruyu da söylemeli: "yanlış" demek öğretmez.
    warn(`${id}: ipucu doğru cümleyi içermiyor olabilir`,
      e.hint.some((h) => h.text.toLowerCase().includes(e.target.toLowerCase().split(" ").slice(-2).join(" "))) ||
      e.hint.some((h) => h.text.length > 20));
  }
  for (const s of tfs) {
    const e = s.expect as { statement: string; why: { text: string }[]; answer: boolean };
    ok(e.statement.trim().length > 0, "doğru/yanlış cümlesi dolu");
    ok(e.why.length > 0, "doğru/yanlış gerekçesi dolu");
    // Cümle, adımın söylediği metinde geçmeli — öğrenci neyi yargılayacağını duymalı.
    ok(
      s.say.some((seg) => seg.lang === "de" && seg.text.includes(e.statement.replace(/[.?!]$/, "").slice(0, 12))),
      "yargılanan cümle seste geçiyor",
    );
  }

  // Konuşma fazı
  ok(l.roleplay.scene.trim().length > 30, "sahne yeterince anlatılmış");
  ok(l.roleplay.partner.trim().length > 5, "rol tanımı var");
  ok(l.roleplay.opening.trim().length > 0 && l.roleplay.openingTr.trim().length > 0, "açılış çift dilli");
  ok(l.roleplay.opening.includes("?"), "açılış soruyla bitiyor");
  ok(l.roleplay.minTurns >= 3 && l.roleplay.minTurns <= 6, "tur alt sınırı 3-6", `(${l.roleplay.minTurns})`);
  const prompt = roleplayPrompt(l);
  ok(l.patterns.every((p) => prompt.includes(p.de)), "istem kalıpları taşıyor");
  ok(l.vocab.every((v) => prompt.includes(v.de)), "istem kelimeleri taşıyor");

  // Tekrar/üretimden SONRAKİ adım övgüyle başlamamalı: doğru cevapta motor
  // zaten övgü ekliyor, "Çok iyi! Harika! İkinci..." diye üst üste binerdi.
  // (Doğru/yanlış ve kapanış adımlarından sonra motor övgü eklemiyor; oralarda
  // içerik övgüsü serbest.)
  const doublePraise = l.lecture.filter((s, i) => {
    const prev = l.lecture[i - 1]?.expect?.kind;
    return (
      (prev === "repeat" || prev === "produce") &&
      /^(Çok iyi|Harika|Süper|Mükemmel|Bravo)/.test(s.say[0]?.text ?? "")
    );
  });
  warn(`${id}: övgü üst üste binebilir`, doublePraise.length === 0,
    `(${doublePraise.slice(0, 1).map((s) => s.say[0].text.slice(0, 30)).join("")})`);
}

// ── Katalog geneli ──
// Doğru/yanlış cevapları tek kalıba saplanmamalı: hepsi "yanlış" olursa
// öğrenci cümleyi okumadan cevabı ezberliyor.
const answers = LESSONS.flatMap((l) =>
  l.lecture
    .filter((s) => s.expect?.kind === "truefalse")
    .map((s) => (s.expect as { answer: boolean }).answer),
);
const trueRatio = answers.length ? answers.filter(Boolean).length / answers.length : 0;
warn("doğru/yanlış dengesi (hedef %25-60 doğru)",
  answers.length < 8 || (trueRatio >= 0.25 && trueRatio <= 0.6),
  `(doğru oranı ${(trueRatio * 100).toFixed(0)}%)`);

// Aynı kelime iki derste "yeni" diye öğretilmemeli (seviye içinde).
const seen = new Map<string, string>();
for (const l of LESSONS) {
  for (const v of l.vocab) {
    const key = `${l.level}:${v.de.toLowerCase()}`;
    if (seen.has(key)) {
      warn(`yinelenen kelime: ${v.de}`, false, `(${seen.get(key)} ve ${l.id}, ${l.level})`);
    } else {
      seen.set(key, l.id);
    }
  }
}

// Üretim hedefleri birbirinin kopyası olmamalı.
const targets = LESSONS.flatMap((l) =>
  l.lecture
    .filter((s) => s.expect?.kind === "produce")
    .map((s) => ({ id: l.id, t: (s.expect as { target: string }).target.toLowerCase() })),
);
const dupTargets = targets.filter((a, i) => targets.findIndex((b) => b.t === a.t) !== i);
warn("yinelenen üretim hedefi yok", dupTargets.length === 0,
  `(${[...new Set(dupTargets.map((d) => `${d.id}: ${d.t}`))].slice(0, 3).join(" | ")})`);

console.log(
  `\n${fails ? `${fails} HATA` : "Hata yok"} · ${warns ? `${warns} uyarı` : "uyarı yok"}`,
);
process.exit(fails ? 1 : 0);

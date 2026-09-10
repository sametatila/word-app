/**
 * ALMANCA sözlüğü GERÇEK içerik üzerinde denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-native-de.ts`
 *
 * Hatların kendi kapıları (`check:lessons-prose-de`, `check:skills-prose-de`,
 * `check:mock-prose-de`) YAZILANI ölçüyor: çıkarıcının bulduğu her dizenin
 * karşılığı var mı, kurallara uyuyor mu. Bu betik tersini soruyor —
 * üretilmiş `native-de.json`ı açıp çözücüleri gerçek ders, egzersiz ve
 * kâğıtlar üzerinde çalıştırıyor.
 *
 * ARADAKİ BOŞLUK BİR KEZ ZATEN AÇILDI ve tam bu sınıftaydı: deneme kâğıdı
 * hattında 6.627 dize yazılmıştı, `apply.mjs` dizini okumuyordu, YAZILANI
 * ölçen kapı bunu göremiyordu ve hiçbir yerde hata görünmüyordu. Yazmak
 * ile bağlamak ayrı iki iş; ikisini tek kapıya sormak birini sessizce
 * cevapsız bırakıyor.
 *
 * ÜÇÜNCÜ ÖLÇÜT — ÇIKTIDA TÜRKÇE KALDI MI. İlk iki ölçüt yalnız
 * ÇIKARICININ BİLDİĞİ alanları görüyor: içeriğe yeni bir Türkçe alan
 * eklenirse çıkarıcı onu görmez, sözlükte aranmaz, kapı yeşil kalır ve
 * Türkçe doğrudan ekrana çıkar. Bu tarama tam o boşluk için ve alan adına
 * hiç bakmıyor.
 */
import { readFileSync } from "node:fs";
import { LESSONS } from "@/lib/lessons";
import { BUNDLED_EXERCISES } from "@/lib/skills";
import { MOCK_PAPERS } from "@/lib/mock-exams";
import { resolveEnLesson, type DeDict } from "@/lib/lessons/native-de";
import { candoForLesson } from "@/lib/cando-map";
import {
  resolveExercise,
  resolveMockPaper,
  isTurkishStem,
  type ExerciseShape,
  type MockShape,
  type NativeDict,
} from "@/lib/lessons/native";

const dict = JSON.parse(
  readFileSync("src/lib/lessons/generated/native-de.json", "utf8"),
) as DeDict;

/* `resolveExercise` ve `resolveMockPaper` `NativeDict` bekliyor ama yalnız
   `prose` ile `mock` alanlarına dokunuyorlar. Almanca sözlükte o iki alan
   birebir aynı biçimde duruyor; eksik alanlar hiç okunmuyor. */
const asNative = dict as unknown as NativeDict;

const errors: string[] = [];
const H = (m: string) => errors.push(`  ${m}`);
const warnings: string[] = [];

/**
 * HECE, SÖZCÜK DEĞİL — taramanın bilerek açık bıraktığı dört dize.
 *
 * `isTurkishStem` küçük harfle başlayan `ne`, `mu`, `ve` gibi sözcükleri
 * Türkçe işareti sayıyor. Telaffuz yazımında bunlar sözcük değil HECE
 * oluyor: `be-NAA-ne`, `SI-ne-me`, `wo-ne`, `ve-rite`. Almanca okura göre
 * yazılmış doğru bir hece, Türkçe bir işlev sözcüğüyle aynı harfleri
 * taşıyabiliyor.
 *
 * ÖLÇÜT GEVŞETİLMEDİ, çünkü ölçüldü. 139.077 benzersiz kaynak dizede:
 *   · tireli zinciri tek sözcük sayan kural 7 GERÇEK Türkçe dize kaybediyor
 *     ("İş-yaşam dengesi", "E-postayı henüz göndermedim.")
 *   · "iki işaret birden" kuralı 2.428 dize kaybediyor ("Adınız ne?", "ve")
 * Dördü kurtarmak için bunları ödemek pahalı; ölçütün kendisi ayrıca
 * çıkarıcının hangi dizeyi çevireceğine karar veren yer — gevşetmek
 * Türkçenin İngilizce okurun ekranına sızması demek.
 *
 * Muafiyet DİZENİN KENDİSİNE bağlı, alana ya da egzersize değil: içerik
 * değişip dize kalkarsa kapı bunu ölü muafiyet olarak bildiriyor (uyarı,
 * hata değil — kardeş oturum kütüphane içeriğini hâlâ yazıyor).
 */
const EXEMPT = new Map<string, string>([
  ["Das „a“ allein ist kein „ei“, sondern ein kurzes „e“. „banana“ = be-NAA-ne.", "be-NAA-ne: schwa hecesi"],
  ["„the“ = de, „children“ = TSCHIL-dren, „cinema“ = SI-ne-me. In allen dreien steckt ein schwacher Vokal.", "SI-ne-me: schwa hecesi"],
  ["„cup of“ = ka-pof. Auch „want a“ wächst zusammen: wo-ne.", "wo-ne: schwa hecesi"],
  ["ve-rite your name", "kaynak içeriği: öğrencinin yanlış okuyuşu, çevrilmiyor"],
]);
const exemptSeen = new Set<string>();

/* ---- 1. Dersler -------------------------------------------------------- */
/* Yalnız İNGİLİZCE kurs. Almanca kursu anadili Almanca olan biri almıyor
   (`PAIR_READY`), o yüzden onun Almancası hiç yazılmadı ve aranmıyor. */
const lessons = LESSONS.filter((l) => l.course === "en");
let lessonOk = 0;
const leftover = new Map<string, string>();
let strings = 0;

const walk = (v: unknown, id: string): void => {
  if (typeof v === "string") {
    strings++;
    if (isTurkishStem(v)) {
      if (EXEMPT.has(v)) exemptSeen.add(v);
      else leftover.set(v, id);
    }
    return;
  }
  if (Array.isArray(v)) {
    for (const x of v) walk(x, id);
    return;
  }
  if (v && typeof v === "object") for (const x of Object.values(v)) walk(x, id);
};

for (const l of lessons) {
  const out = resolveEnLesson(dict, l);
  if (!out) {
    H(`[ders] çözülemedi: ${l.id}`);
    continue;
  }
  lessonOk++;
  /* Öğretilen dilin parçaları TARAMA DIŞINDA: `title`, `vocab[].de`,
     `patterns[].de` ve anlatımın İngilizce parçaları zaten İngilizce ve
     öyle kalmalı. Tarama Türkçe ARIYOR, İngilizceyi Türkçe sanmaz ama
     `statement` gibi alanlarda boşuna gürültü üretmemesi için ders
     nesnesinin tamamı veriliyor ve ölçüt yalnız Türkçe kökler. */
  walk(out, l.id);
}

/* ---- 2. Beceri egzersizleri -------------------------------------------- */
const exercises = (BUNDLED_EXERCISES as unknown as (ExerciseShape & { course?: string; id: string })[])
  .filter((e) => e.course === "en");
let exerciseOk = 0;
for (const e of exercises) {
  const out = resolveExercise(asNative, e);
  if (out) {
    exerciseOk++;
    walk(out, e.id);
  } else H(`[egzersiz] çözülemedi: ${e.id}`);
}

/* ---- 3. Deneme kâğıtları ------------------------------------------------ */
const papers = (MOCK_PAPERS as unknown as (MockShape & { course?: string; id: string })[])
  .filter((p) => p.course === "en");
let paperOk = 0;
for (const p of papers) {
  const out = resolveMockPaper(asNative, p);
  if (out) {
    paperOk++;
    walk(out, p.id);
  } else H(`[kâğıt] çözülemedi: ${p.id}`);
}

if (leftover.size) {
  H(`[tarama] çözülen içerikte ${leftover.size} Türkçe dize kaldı`);
  for (const [t, id] of [...leftover].slice(0, 10)) H(`    ${id}: ${JSON.stringify(t.slice(0, 60))}`);
}

/* ---- 4. Can-do köprüsü -------------------------------------------------- */
/* ÇÖZÜCÜDEN GEÇMİYOR: `nativeCando` sözlüğün ayrı bir alanını okuyor ve
   karşılığı olmayan ifadeyi DÜŞÜRÜYOR — yani eksik bir ifade hata değil,
   sessiz bir boşluk olarak görünür. Ders sayfasının altındaki köprü o
   yüzden burada ayrıca sayılıyor. */
const candoIds = [...new Set(lessons.flatMap((l) => candoForLesson(l)))].sort();
let candoOk = 0;
for (const id of candoIds) {
  if (dict.cando[id]) candoOk++;
  else H(`[can-do] karşılığı yok: ${id}`);
}

for (const [t, why] of EXEMPT) {
  if (!exemptSeen.has(t)) warnings.push(`  [muafiyet] içerikte yok, silinebilir — ${why}`);
}

if (warnings.length) {
  console.log(`\nUYARI (${warnings.length}):`);
  console.log(warnings.join("\n"));
}
if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
console.log(
  `\nözet: ders ${lessonOk}/${lessons.length} · egzersiz ${exerciseOk}/${exercises.length} · ` +
    `kâğıt ${paperOk}/${papers.length} · can-do ${candoOk}/${candoIds.length} · taranan dize ${strings}\n` +
    `sözlük: ders ${Object.keys(dict.lesson).length} · beceri ${Object.keys(dict.prose).length} · ` +
    `kâğıt ${Object.keys(dict.mock).length} · can-do ${Object.keys(dict.cando).length}`,
);
process.exit(errors.length ? 1 : 0);

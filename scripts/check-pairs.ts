import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";
import { and, eq, isNotNull, ne, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { words } from "@/lib/db/schema";
import { LESSONS } from "@/lib/lessons";
import { BUNDLED_EXERCISES } from "@/lib/skills";
import { MOCK_PAPERS } from "@/lib/mock-exams";
import {
  resolveLesson,
  resolveExercise,
  resolveMockPaper,
  type NativeDict,
  type ExerciseShape,
  type MockShape,
} from "@/lib/lessons/native";
import { resolveEnLesson, type DeDict } from "@/lib/lessons/native-de";
import {
  NATIVE_LANGS,
  PAIR_READY,
  enabledCourses,
  type CourseId,
  type NativeLang,
} from "@/lib/courses";

/**
 * PARİTE TAMLIK KAPISI — beyan ile veriyi karşılaştırır.
 *
 * `PAIR_READY` hangi (anadil, hedef) çiftinin kullanıcıya sunulduğunu SÖYLER;
 * bu betik verinin o sözü tutup tutmadığına BAKAR. İki yönde de:
 *
 *   - Hazır denen çiftte eksik varsa → CI KIRILIR. Yarım bir parite,
 *     çalışıyormuş gibi görünen bir hatadır: kullanıcı alıştırmayı kendi
 *     dilinde, dersi Türkçe görür ve bunu bize bildirmez, sadece bırakır.
 *   - Hazır DENMEYEN bir çiftin verisi tamamlandıysa → uyarır. Yoksa
 *     tamamlanmış bir parite aylarca kapalı kalır; kimse bakmaz.
 *
 * Ölçü kelime katmanı: karşılık ve örnek cümle çevirisi. Üç anadilin üçü de
 * artık gerçekten ÖLÇÜLÜYOR: Almanca sütunları (`de_gloss`, `beispiel_de`)
 * 0046 ile geldi ve o güne kadar bu betik Almanca anadilli her çifti koşulsuz
 * "0%" sayıyordu — yani ölçüm değil, bir yer tutucuydu. Beceri ve ders
 * metinleri ayrı fazlar (bkz. `docs/plan/native-language.md`) ve henüz
 * ölçülebilir bir alan taşımıyorlar — o katmanlar geldiğinde buraya eklenecek.
 *
 * ÜRETİM VERİTABANINDA OKUMA YAPAR, yazmaz. Adres kısıtı yok: bu bir denetim.
 */
const MIN_COVERAGE = 0.98; // %98: birkaç eksik satır pariteyi bozmaz, yüzde beşi bozar

type Layer = { name: string; have: number; total: number };

/**
 * Doluluk oranı. Toplam SIFIRSA -1 dönüyor, 1 değil: boş bir katman "tam"
 * sayılsaydı tohumlanmamış bir veritabanında bütün pariteler hazır görünürdü
 * — ilk koşuşta tam olarak bu oldu.
 */
const pct = (l: Layer) => (l.total > 0 ? l.have / l.total : -1);
const fmt = (l: Layer) => `${l.name} ${(pct(l) * 100).toFixed(1)}% (${l.have}/${l.total})`;

/** Bir çiftin kelime katmanındaki doluluğu. */
async function wordLayer(native: NativeLang, course: CourseId): Promise<Layer[]> {
  const gloss =
    native === "tr" ? words.tr : native === "en" ? words.en : words.deGloss;
  const example =
    native === "tr" ? words.beispielTr : native === "en" ? words.beispielEn : words.beispielDe;

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(words)
    .where(eq(words.course, course));

  const [{ have }] = await db
    .select({ have: sql<number>`count(*)::int` })
    .from(words)
    .where(and(eq(words.course, course), isNotNull(gloss), ne(gloss, "")));

  // Örnek çevirisi yalnız örneği OLAN satırlarda beklenir.
  const [{ withEx }] = await db
    .select({ withEx: sql<number>`count(*)::int` })
    .from(words)
    .where(and(eq(words.course, course), isNotNull(words.beispiel), ne(words.beispiel, "")));
  const [{ haveEx }] = await db
    .select({ haveEx: sql<number>`count(*)::int` })
    .from(words)
    .where(
      and(
        eq(words.course, course),
        isNotNull(words.beispiel),
        ne(words.beispiel, ""),
        example ? isNotNull(example) : sql`false`,
        example ? ne(example, "") : sql`false`,
      ),
    );

  return [
    { name: "karşılık", have, total },
    { name: "örnek çevirisi", have: haveEx, total: withEx },
  ];
}

/**
 * İÇERİK KATMANLARI — ders, beceri egzersizi, deneme kâğıdı.
 *
 * ARTIK GERÇEKTEN ÖLÇÜLÜYOR. Eskiden bu yer tutucuydu: `skill_exercises`
 * satırları sayılıyor, Türkçe için "tamam", öteki iki anadil için koşulsuz
 * "0" deniyordu ("Faz 3'te alan eklenince gerçek ölçüme dönecek"). O faz
 * geldi ve iki yönde de bitti — metin `data` içinde değil, ÜRETİLEN
 * sözlüklerde (`native-en.json`, `native-de.json`) ve çözücüler onu
 * çalışma anında uyguluyor. Yer tutucu bırakılsaydı tamamlanmış bir parite
 * hiç "!" işareti almazdı: kapı tam da onu bildirmek için var.
 *
 * ÖLÇÜT ÇÖZÜCÜNÜN KENDİSİ, alan sayısı değil. Hep-ya-hiç kuralı yüzünden
 * tek bir eksik dize içeriği TÜMDEN Türkçeye düşürüyor; yarım bir ders
 * "yarı hazır" değil, hazır DEĞİL. O yüzden sayılan şey "kaç ders
 * çözülüyor".
 *
 * Sözlük yoksa katman ÖLÇÜLEMEZ sayılıyor (total 0), sıfır değil: üretilen
 * dosya depoda durmuyor ve eksikliği "çeviri yok" demek değil, "bu
 * kopyada üretilmedi" demek. `check:pairs` betiği ikisini de kuruyor.
 */
const GENERATED = "src/lib/lessons/generated/";
const dictCache = new Map<string, unknown>();
function generated<T>(file: string): T | null {
  if (!dictCache.has(file)) {
    const p = GENERATED + file;
    dictCache.set(file, existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : null);
  }
  return (dictCache.get(file) ?? null) as T | null;
}

function contentLayers(native: NativeLang, course: CourseId): Layer[] {
  /* ALANI OLMAYAN İÇERİK ALMANCA KURSUN. 870 beceri egzersizinde `course`
     hiç yok — İngilizce kurs eklenmeden önce yazıldılar ve varsayılan her
     yerde "de" (mobil `nativeContent.ts` de böyle okuyor). Düz eşitlikle
     süzmek Almanca kursu 995 yerine 125 gösteriyordu, yani parite eksik
     çıkmadan önce YANLIŞ ölçülüyordu. */
  const of = (x: { course?: string }) => x.course ?? "de";
  const lessons = LESSONS.filter((l) => of(l) === course);
  const exercises = (BUNDLED_EXERCISES as unknown as (ExerciseShape & { course?: string })[]).filter(
    (e) => of(e) === course,
  );
  const papers = (MOCK_PAPERS as unknown as (MockShape & { course?: string })[]).filter(
    (p) => of(p) === course,
  );
  const sizes: [string, number][] = [
    ["ders metni", lessons.length],
    ["beceri metni", exercises.length],
    ["kâğıt metni", papers.length],
  ];

  /* Türkçe kaynağın kendisi: çeviri yok, eksik de yok. */
  if (native === "tr") return sizes.map(([name, n]) => ({ name, have: n, total: n }));

  const en = native === "en" ? generated<NativeDict>("native-en.json") : null;
  const de = native === "de" ? generated<DeDict>("native-de.json") : null;
  if (!en && !de) return sizes.map(([name]) => ({ name, have: 0, total: 0 }));

  const dict = (en ?? (de as unknown as NativeDict)) as NativeDict;
  return [
    {
      name: "ders metni",
      have: lessons.filter((l) => (de ? resolveEnLesson(de, l) : resolveLesson(dict, l))).length,
      total: lessons.length,
    },
    {
      name: "beceri metni",
      have: exercises.filter((e) => resolveExercise(dict, e)).length,
      total: exercises.length,
    },
    {
      name: "kâğıt metni",
      have: papers.filter((p) => resolveMockPaper(dict, p)).length,
      total: papers.length,
    },
  ];
}

async function main() {
  const courses = enabledCourses();
  let fails = 0;
  let hints = 0;
  let skipped = 0;

  console.log("\nParite tamlığı — beyan (PAIR_READY) ile veri karşılaştırması\n");

  for (const native of NATIVE_LANGS) {
    for (const c of courses) {
      if (c.targetLang === native) continue; // kendi dilini öğretmiyoruz
      const declared = (PAIR_READY[native] ?? []).includes(c.id);
      const layers = [...(await wordLayer(native, c.id)), ...contentLayers(native, c.id)];
      /*
        BOŞ KATMAN "UYGULANAMAZ", "eksik" değil. İlk yazımda `some` idi ve tek
        bir boş katman (ör. henüz beceri egzersizi olmayan bir kurs) bütün
        pariteleri ölçülemez yapıyordu. Karar ölçülebilen katmanlara bakıyor;
        hiçbiri ölçülemiyorsa parite hakkında konuşulamaz.
      */
      const measurable = layers.filter((l) => pct(l) >= 0);
      const unmeasured = measurable.length === 0;
      const complete = !unmeasured && measurable.every((l) => pct(l) >= MIN_COVERAGE);
      const pair = `${native}→${c.id}`;

      if (unmeasured) {
        console.log(`  ? ${pair}  ölçülemedi — bu kursta veri yok (tohumlanmamış veritabanı)`);
        skipped++;
        continue;
      }
      if (declared && !complete) {
        fails++;
        console.log(`  ✗ ${pair}  HAZIR DENDİ ama eksik`);
        for (const l of measurable) if (pct(l) < MIN_COVERAGE) console.log(`      ${fmt(l)}`);
      } else if (declared) {
        console.log(`  ✓ ${pair}  sunuluyor, veri tam`);
      } else if (complete) {
        hints++;
        console.log(`  ! ${pair}  veri TAM ama sunulmuyor — PAIR_READY'ye eklenebilir`);
      } else {
        const missing = measurable.filter((l) => pct(l) < MIN_COVERAGE).map(fmt).join(" · ");
        console.log(`  · ${pair}  sunulmuyor — ${missing}`);
      }
    }
  }

  if (fails) {
    console.error(`\n${fails} çift hazır diye sunuluyor ama verisi eksik. PAIR_READY'yi düzelt ya da veriyi tamamla.`);
    process.exit(1);
  }
  if (skipped) {
    console.log(`\n${skipped} çift ölçülemedi: bu denetim TOHUMLANMIŞ bir veritabanı ister.`);
    console.log("Anlamlı sonuç için canlı ya da tohumlanmış bir kopyaya bakın.");
  }
  console.log(hints ? `\ntamam — ${hints} çift açılmaya hazır (yukarıda "!" ile)` : "\ntamam: beyan ile veri uyumlu");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

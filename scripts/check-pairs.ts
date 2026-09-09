import "dotenv/config";
import { and, eq, isNotNull, ne, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { words, skillExercises } from "@/lib/db/schema";
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
 * Ölçü kelime katmanı: karşılık ve örnek cümle çevirisi. Beceri ve ders
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
    native === "tr" ? words.tr : native === "en" ? words.en : null;
  const example =
    native === "tr" ? words.beispielTr : native === "en" ? words.beispielEn : null;

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(words)
    .where(eq(words.course, course));

  // Almanca karşılık sütunu henüz YOK: alan eklenene kadar doluluk sıfır.
  if (!gloss) return [{ name: "karşılık", have: 0, total }, { name: "örnek çevirisi", have: 0, total }];

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
 * Beceri egzersizlerinin anadile bağlı metinleri.
 *
 * Bugün ÖLÇÜLEMİYOR: yönerge, sözlükçe ve açıklama `data` içinde tek dilde
 * (Türkçe) duruyor, dile göre bir alan yok. Türkçe için tamam sayılıyor,
 * ötekiler için sıfır — Faz 3'te alan eklenince gerçek ölçüme dönecek.
 */
async function skillLayer(native: NativeLang, course: CourseId): Promise<Layer> {
  const [{ total }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(skillExercises)
    .where(eq(skillExercises.course, course));
  return { name: "beceri metni", have: native === "tr" ? total : 0, total };
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
      const layers = [...(await wordLayer(native, c.id)), await skillLayer(native, c.id)];
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

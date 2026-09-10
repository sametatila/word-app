/**
 * İngilizce kursun beceri egzersizlerindeki GÖREV METİNLERİNİ paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/task-de/make.ts`
 *
 * YÜRÜYÜŞ KOPYALANMADI. Çıkarıcı kardeş hatta duruyor ve buradan `course`
 * argümanıyla çağrılıyor (`extractTasks("en")`). Kopya alınsaydı bir alan
 * eklendiğinde biri güncellenir öteki unutulurdu; unutulan tarafta o alan
 * sözlüğe hiç girmez ve hep-ya-hiç kuralı bütün egzersizi ana diline
 * düşürürdü — hiçbir yerde hata görünmeden.
 *
 * Yön: kaynak İngilizce kursun egzersizleri (`course === "en"`), yazılacak
 * dil ALMANCA. Kardeşi tam tersini yapıyor: Almanca kursun egzersizleri,
 * yazılacak dil İngilizce.
 *
 * ÖLÇÜLDÜ: 1.325 benzersiz dize, 9 paket.
 *   explanation.examples.tr 224 · free.checklist 162 · build.tr 98
 *   build.hint 98 · explanation.examples.note 95 · explanation.heading 76
 *   explanation.tr 76 · drill.tr 70 · drill.hint 70 · drill.fix 70
 *   question.text 69 · monologue.bulletsTr 59 · monologue.targets.tr 59
 *   free.prompt 41 · focus 25 · monologue.promptTr 15
 *   monologue.rubricHint 15 · question.option 3
 *
 * `form.*`, `rewrite.*` ve `reply.*` HİÇ ÇIKMIYOR: İngilizce kursta o
 * görev türleri henüz yok. Tür listesi kardeş hattan geldiği için ileride
 * eklendiklerinde kendiliğinden paketlenirler.
 *
 * Satırın İLGİLİ OLDUĞU hedef dil cümlesi (`de` alanı) burada İNGİLİZCE —
 * alan adı kardeş hattan geliyor, içeriği kursun hedef dili belirliyor.
 * Kapının kanıt ölçütü onu kullanıyor.
 */
import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { extractTasks, KINDS, type TaskRow } from "../task/make.js";

const DIR = new URL(".", import.meta.url).pathname;

export const taskRows = (): TaskRow[] => extractTasks("en");

if (process.argv[1]?.endsWith("task-de/make.ts")) {
  const rows = taskRows();
  /* `in/` HER SEFERİNDE SİLİNİP kuruluyor: kaynak küçüldüğünde artakalan
     paket dosyası kapıyı yanıltırdı. */
  if (existsSync(`${DIR}in`)) rmSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    const name = `t-${String(++n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce<Record<string, number>>((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  console.log(
    `${rows.length} benzersiz dize · ${n} paket\n` +
      KINDS.filter((k) => kinds[k]).map((k) => `${k} ${kinds[k]}`).join(" · "),
  );
}

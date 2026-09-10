/**
 * İngilizce kursun beceri egzersizlerindeki TÜRKÇE düz metni paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/prose-de/make.ts`
 *
 * NEDEN AYRI BİR HAT. Kardeşi `data/skills/prose` BÜTÜN egzersizlerden
 * Türkçe çıkarıp İNGİLİZCE yazdırıyor — anadili İngilizce olan kullanıcı
 * Almanca kursu görsün diye. Burada hem kapsam hem yön başka: kaynak
 * yalnız İNGİLİZCE kursun egzersizleri (`course === "en"`) ve yazılacak
 * dil ALMANCA. Anadili Almanca olan kullanıcı yalnız İngilizce kursu
 * alıyor (`PAIR_READY.de`), Almanca kursun egzersizlerini hiç görmüyor;
 * onları da paketlemek 2.655 dizeyi boşuna yazdırırdı.
 *
 * Aynı ayrım ders ekseninde de yapıldı ve gerekçesi orada yazılı
 * (`data/lessons/prose-de/make.mjs`): `--de` bayrağı ancak iki yönün
 * kaynağı aynı biçimdeyken işe yarıyor.
 *
 * ÖLÇÜLDÜ: 189 egzersiz (reading 49, listening 49, writing 41,
 * speaking 25, grammar 25) · 739 benzersiz yazılacak dize · 193 alıntı
 * (geçiş) · 5 paket.
 *   explain 550 · intro 189
 *
 * `note` TÜRÜ YOK ve bu ölçüldü: İngilizce kursun egzersizlerinde
 * `gloss[].note` ve `tasks[].phrases[].note` sıfır tane. Kardeş hatta
 * tür var çünkü Almanca kursun sözlükçesinde on bir not geçiyor.
 *
 * SORU KÖKÜ VE ŞIKLAR ÇEVRİLMİYOR: ikisi de ÖĞRENİLEN dilde, yani
 * İngilizce. Öğrencinin yargılayacağı cümle odur. Çözücü onlara hiç
 * dokunmuyor; paketlense yazan taraf birebir kopyalardı ve kapı da
 * göremezdi (Türkçe harf taşımadıkları için "karşılık Türkçenin aynısı"
 * kuralı susardı). Aynı tuzak ders hattında `statement` alanında
 * yakalanmıştı.
 *
 * SATIRIN İNGİLİZCE YÜZEYİ DE TAŞINIYOR (`en` alanı: metin, soru kökleri
 * ve şıklar). Kapı kanıt ölçütünü sözcük listesiyle değil BU alanla
 * kuruyor — açıklamaların çoğu metinden bir cümle alıntılıyor
 * ("Deniz «At seven o'clock.» diyor") ve o alıntı Almancada BİREBİR
 * durmak zorunda. Gerekçenin tamamı `check.ts` başında.
 */
import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { BUNDLED_EXERCISES } from "@/lib/skills";
import { isProseQuote } from "@/lib/lessons/native";

const DIR = new URL(".", import.meta.url).pathname;

export type ProseRow = {
  tr: string;
  kind: "intro" | "explain" | "gloss.tr";
  /** Kaç egzersizde geçiyor — sıralama buna göre. */
  n: number;
  /** Bağlam: egzersizin kimliği ve becerisi. En çok üç tane. */
  ctx: string[];
  /** Egzersizin İNGİLİZCE yüzeyi — kanıt ölçütü buradan çalışıyor. */
  en: string[];
  /**
   * `explain` için sorunun kökü ve doğru şıkkı. Açıklama neyin neden
   * doğru olduğunu söylüyor; kökü görmeden çevrilirse "çünkü ikinci şık"
   * gibi bir cümle bağlamsız kalır.
   */
  q?: string;
  a?: string;
};

type Q = { text?: string; options?: string[]; answer?: number; explain?: string };
type G = { de?: string; tr?: string };
type Ex = {
  id: string;
  course?: string;
  skill?: string;
  level?: string;
  intro?: string;
  text?: string;
  questions?: Q[];
  gloss?: G[];
  tasks?: { phrases?: G[] }[];
};

/** Egzersizin İngilizce yüzeyi: metin, soru kökleri, şıklar. */
const surfaceOf = (e: Ex): string[] => [
  ...String(e.text ?? "").split("\n"),
  ...(e.questions ?? []).flatMap((q) => [q.text ?? "", ...(q.options ?? [])]),
].filter((s) => s.trim());

export function extractProse(): ProseRow[] {
  const rows = new Map<string, ProseRow>();
  const add = (kind: ProseRow["kind"], tr: string | undefined, e: Ex, q?: Q, word?: string) => {
    if (typeof tr !== "string" || !tr.trim()) return;
    const key = kind + "|" + tr;
    const r = rows.get(key) ?? { tr, kind, n: 0, ctx: [], en: [] };
    r.n++;
    if (r.ctx.length < 3) r.ctx.push(`${e.id} · ${e.skill ?? "?"} ${e.level ?? ""}`.trim());
    /* Sözlükçe satırında ÖĞRETİLEN kelime yüzeyin başına konuyor: karşılığı
       yazan taraf onu görmeden yazamaz ("sinema" mı, "sinemaya gitmek" mi). */
    if (word && !r.en.includes(word)) r.en.unshift(word);
    /* Yüzey BİRİKİYOR: aynı dize birkaç egzersizde geçiyorsa kanıt
       hangisinden gelirse gelsin sayılmalı. Ortak yönergeler ("Metni
       oku ve soruları yanıtla.") onlarca egzersizde geçiyor. */
    for (const s of surfaceOf(e)) if (!r.en.includes(s)) r.en.push(s);
    if (q && !r.q) {
      r.q = q.text;
      r.a = q.options?.[q.answer ?? 0];
    }
    rows.set(key, r);
  };

  for (const e of (BUNDLED_EXERCISES as unknown as Ex[]).filter((x) => x.course === "en")) {
    add("intro", e.intro, e);
    for (const q of e.questions ?? []) add("explain", q.explain, e, q);
    /* SÖZLÜKÇENİN TÜRKÇE ANLAMI. Kardeş hat (`data/skills/prose`) bunu
       KAPSAM DIŞINDA bırakıyor ve gerekçesi orada yazılı: `GlossEntry`de
       `en` alanı zaten var ve Almanca kursta 5.633'ün 5.633'ü dolu —
       ikinci bir doğruluk kaynağı açmak, ikisi ayrışınca hangisinin doğru
       olduğunu bilinemez hâle getirir.

       İngilizce kursta o alan 1.207'nin 1.207'sinde BOŞ, yani ortada
       ayrışacak birinci kaynak yok. O zaman tasarımın kendi varsayılanı
       geçerli oluyor: anlam hattan gelir. Aynı karar ders ekseninde de
       verildi ve orada yeşil — `en-a1.json` derslerinin `vocab[].tr`
       alanı da `data/lessons/prose-de` üzerinden çözülüyor. */
    for (const g of [...(e.gloss ?? []), ...(e.tasks ?? []).flatMap((t) => t.phrases ?? [])])
      add("gloss.tr", g.tr, e, undefined, g.de);
  }

  /* Sıklık azalan; eşitlikte kısa önce, sonra alfabetik. Sıra KARARLI
     olmak zorunda, yoksa paketler her `make`te kayar ve yazılanlar
     tutmaz. `intro` ÖNCE: kısa yönergeler, dar bağlam. `explain` sona
     kalıyor çünkü hem uzun hem metne bağlı. */
  /* `gloss.tr` EN SONA ve bu kardeş hattaki `note` ile aynı gerekçe:
     s-001..s-005 yazılmış paketlerdi. Sözlükçe satırları sıklığa göre
     araya girseydi beş paketin tamamı kayardı. Sıralamanın BİRİNCİ ölçütü
     tür olduğu için sona eklemek eskileri hiç oynatmıyor. */
  const rank = (r: ProseRow) => (r.kind === "gloss.tr" ? 2 : r.kind === "explain" ? 1 : 0);
  return [...rows.values()].sort(
    (a, b) =>
      rank(a) - rank(b) || b.n - a.n || a.tr.length - b.tr.length || a.tr.localeCompare(b.tr, "tr"),
  );
}

/** Yazılacak satırlar — alıntılar dışarıda. */
export const proseWork = (): ProseRow[] => extractProse().filter((r) => !isProseQuote(r.tr));

/** Alıntı satırları: karşılıkları KENDİLERİ. Sözlüğe birim eşleme olarak giriyor. */
export const proseQuotes = (): ProseRow[] => extractProse().filter((r) => isProseQuote(r.tr));

if (process.argv[1]?.endsWith("make.ts")) {
  const rows = proseWork();
  /* `in/` HER SEFERİNDE SİLİNİP kuruluyor: kaynak küçüldüğünde artakalan
     paket dosyası kapıyı yanıltırdı. `out/` elle yazılan taraf, ona
     dokunulmuyor. */
  if (existsSync(`${DIR}in`)) rmSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `s-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce<Record<string, number>>(
    (a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a),
    {},
  );
  console.log(
    `${rows.length + proseQuotes().length} benzersiz dize · ${proseQuotes().length} alıntı (geçiş) · ` +
      `${rows.length} yazılacak · ${n} paket\n` +
      Object.entries(kinds)
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `  ${k} ${v}`)
        .join("\n"),
  );
}

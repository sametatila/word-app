/**
 * Platformlar arası KAYIT DEFTERİ paritesi.
 *
 * Web ve mobil aynı sabit listelerin iki kopyasını taşıyor: kurs kayıt
 * defteri, oynanabilir oyunlar, başarım grupları. Kopyalar sessizce ayrışıyor
 * ve ayrıştıkları ancak tek tek fark ediliyor:
 *   - `speechLocale` mobilde vardı, webde yoktu; web iki oynatıcıda tanıyıcı
 *     dilini elle kuruyordu ve İngilizce kursta Almanca duyuyordu.
 *   - İngilizce kursun alt satırı iki tarafta iki türlü yazılıydı.
 * İkisi de bu betik olsaydı ilk gün yakalanırdı.
 *
 * Ayrıştırma REGEX ile: mobil dosyaları React Native'e bağlı ve bu betik
 * Node'da tek başına çalışmalı. Biçim değişip liste okunamazsa betik sessizce
 * geçmiyor, boş liste olarak KALIYOR.
 */
import { readFileSync } from "node:fs";

const ESC = String.fromCharCode(27);
const C = { ok: ESC + "[32m", bad: ESC + "[31m", b: ESC + "[1m", off: ESC + "[0m", dim: ESC + "[2m" };
let fails = 0;

const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

function fail(title, detail) {
  fails++;
  console.log("  " + C.bad + "KALIR" + C.off + "  " + title);
  for (const l of detail) console.log("         " + C.dim + l + C.off);
}
function pass(title) {
  console.log("  " + C.ok + "gecer" + C.off + "  " + title);
}

/** İki listeyi SIRAYLA karşılaştırır. */
function sameList(title, a, b, labelA = "mobil", labelB = "web") {
  if (a.length && b.length && a.join("|") === b.join("|")) return pass(title + " (" + a.length + ")");
  fail(title, [labelA + ": " + (a.join(", ") || "okunamadi"), labelB + ": " + (b.join(", ") || "okunamadi")]);
}

/** İki kümeyi karşılaştırır (sıra önemsiz). */
function sameSet(title, a, b, labelA = "mobil", labelB = "web") {
  const sa = [...new Set(a)].sort();
  const sb = [...new Set(b)].sort();
  if (sa.length && sb.length && sa.join("|") === sb.join("|")) return pass(title + " (" + sa.length + ")");
  const onlyA = sa.filter((x) => !sb.includes(x));
  const onlyB = sb.filter((x) => !sa.includes(x));
  fail(title, ["yalniz " + labelA + ": " + (onlyA.join(", ") || "-"), "yalniz " + labelB + ": " + (onlyB.join(", ") || "-")]);
}

/**
 * Bir kaynakta `prop === "x"` ya da `prop !== "x"` biçiminde ADIYLA geçen
 * türler.
 *
 * İki biçimi de sayıyor, çünkü `LessonScreen` `produce`u
 * `expect?.kind !== "produce"` ile ayırıyor ve yalnız `===` arayan bir tarama
 * onu GÖRMEZ - kapı yanlışlıkla geçerdi. Kaçırmanın yönü önemli: burada
 * yanlış "geçer" demek hatayı gizlemek olur.
 */
const named = (src, prop) =>
  new Set([...src.matchAll(new RegExp(`${prop}\\s*[!=]==\\s*"(\\w+)"`, "g"))].map((x) => x[1]));

/* kurs kayit defteri */

/** Kurs bloklarını `id` -> alan haritası olarak çıkarır. */
function courses(src) {
  const start = src.indexOf("export const COURSES");
  if (start < 0) return {};
  const body = src.slice(start);
  const out = {};
  for (const blk of body.matchAll(/\{\s*\n\s*id: "([\w-]+)",(.*?)\n {2}\},/gs)) {
    const id = blk[1];
    const fields = blk[2];
    const one = {};
    for (const k of ["targetLang", "speechLocale", "enabled", "offeredToNewUsers", "hasArticles"]) {
      const m = fields.match(new RegExp("\\b" + k + ":\\s*([^,\\n]+)"));
      if (m) one[k] = m[1].trim();
    }
    for (const k of ["label", "sub"]) {
      const m = fields.match(new RegExp("\\b" + k + ":\\s*\\{(.*?)\\}", "s"));
      if (m) one[k] = m[1].split(/\s+/).join(" ").trim();
    }
    out[id] = one;
  }
  return out;
}

console.log("\n" + C.b + "1. KURS KAYIT DEFTERI" + C.off);
{
  const m = courses(read("mobile/src/lib/courses.ts"));
  const w = courses(read("src/lib/courses.ts"));
  sameSet("kurs kimlikleri", Object.keys(m), Object.keys(w));
  for (const id of Object.keys(m).filter((k) => k in w)) {
    const diff = [];
    for (const k of new Set([...Object.keys(m[id]), ...Object.keys(w[id])])) {
      if (m[id][k] !== w[id][k]) diff.push(k + "\n           mobil: " + m[id][k] + "\n           web  : " + w[id][k]);
    }
    if (diff.length) fail('kurs "' + id + '"', diff);
    else pass('kurs "' + id + '"');
  }
}

/* oynanabilir oyunlar */

console.log("\n" + C.b + "2. OYNANABILIR OYUNLAR" + C.off);
{
  const wm = read("src/lib/types.ts").match(/export const PLAYABLE_GAMES = \[(.*?)\]/s);
  const mm = read("mobile/src/game/session.ts").match(/export const PRACTICE_GAMES[^=]*=\s*\[(.*?)\n\];/s);
  const w = wm ? [...wm[1].matchAll(/"(\w+)"/g)].map((x) => x[1]) : [];
  const m = mm ? [...mm[1].matchAll(/game: "(\w+)"/g)].map((x) => x[1]) : [];
  sameSet("oyun kumesi", m, w);

  // Pratik seçicinin SIRASI da eşleşmeli: iki ekran aynı listeyi gösteriyor.
  const wp = [...read("src/app/(app)/learn/practice/page.tsx").matchAll(/\{ game: "(\w+)",/g)].map((x) => x[1]);
  sameList("pratik secici sirasi", m, wp);
}

/* basarim gruplari */

console.log("\n" + C.b + "3. BASARIM GRUPLARI" + C.off);
{
  const grab = (src) => {
    const m = src.match(/export const GROUP_ORDER[^=]*=\s*\[(.*?)\];/s);
    return m ? [...m[1].matchAll(/"(\w+)"/g)].map((x) => x[1]) : [];
  };
  sameList("grup sirasi", grab(read("mobile/src/data/achievements.ts")), grab(read("src/lib/achievement-groups.ts")));
}

/* sinav bolum sirasi */

console.log("\n" + C.b + "4. SINAV BOLUM SIRASI" + C.off);
{
  // Sıra AKIŞI belirliyor: mobil bölümleri bu sırayla yürütüyor, sunucu bu
  // sırayla puanlıyor. Ayrışırlarsa öğrenci bir bölümü çözerken puanı
  // başkasının hanesine yazılır. Mobil kopyası `ExamScreen` içinde ve
  // yorumu zaten "sunucudaki SECTION_ORDER ile aynı" diyor - o söz artık
  // ölçülüyor.
  const grab = (src) => {
    const m = src.match(/SECTION_ORDER[^=]*=\s*\[(.*?)\];/s);
    return m ? [...m[1].matchAll(/"(\w+)"/g)].map((x) => x[1]) : [];
  };
  sameList("bolum sirasi", grab(read("mobile/src/screens/ExamScreen.tsx")), grab(read("src/lib/exam-types.ts")));
}

/* deneme sinavi becerileri */

console.log("\n" + C.b + "5. DENEME SINAVI BECERILERI" + C.off);
{
  const grab = (src) => {
    const m = src.match(/type MockSkill =([^;]+);/s);
    return m ? [...m[1].matchAll(/"(\w+)"/g)].map((x) => x[1]) : [];
  };
  sameList("beceri sirasi", grab(read("mobile/src/data/exams/index.ts")), grab(read("src/lib/mock-exams/types.ts")));
}

/* CEFR seviyeleri */

console.log("\n" + C.b + "6. CEFR SEVIYELERI" + C.off);
{
  const grabW = read("src/lib/placement-score.ts").match(/PLACEMENT_LEVELS[^=]*=\s*\[(.*?)\];/s);
  const grabM = read("mobile/src/screens/SettingsScreen.tsx").match(/const LEVELS = \[(.*?)\];/s);
  sameList(
    "seviye listesi",
    grabM ? [...grabM[1].matchAll(/"(\w+)"/g)].map((x) => x[1]) : [],
    grabW ? [...grabW[1].matchAll(/"(\w+)"/g)].map((x) => x[1]) : [],
  );
}

/* anadil ekseni */

console.log("\n" + C.b + "7. ANADIL EKSENI" + C.off);
{
  // `NATIVE_LANGS` hangi anadillerin var olduğunu, `PAIR_READY` hangi
  // anadil→kurs çiftinin HAZIR olduğunu söylüyor. İkisi de iki platformda
  // ayrı ayrı yazılı ve ikisi de kullanıcıya ne sunulacağını belirliyor:
  // ayrışırlarsa bir platformda seçilebilen çift ötekinde seçilemez, üstelik
  // sunucu kapısı (`acceptsPair`) web kopyasına bakıyor - yani mobil fazladan
  // bir çift sunarsa kullanıcı 400 alır.
  const langs = (src) => {
    const m = src.match(/NATIVE_LANGS[^=]*=\s*\[(.*?)\];/s);
    return m ? [...m[1].matchAll(/"(\w+)"/g)].map((x) => x[1]) : [];
  };
  const pairs = (src) => {
    const m = src.match(/PAIR_READY[^=]*=\s*\{(.*?)\n\};/s);
    if (!m) return [];
    return [...m[1].matchAll(/(\w+):\s*\[([^\]]*)\]/g)].map(
      (x) => `${x[1]}=${[...x[2].matchAll(/"([\w-]+)"/g)].map((y) => y[1]).join(",")}`,
    );
  };
  const mob = read("mobile/src/lib/courses.ts");
  const web = read("src/lib/courses.ts");
  sameList("anadil listesi", langs(mob), langs(web));
  sameList("hazir cift tablosu", pairs(mob), pairs(web));
}

/* sosyal istemci yuzeyi */

console.log("\n" + C.b + "8. SOSYAL ISTEMCI YUZEYI" + C.off);
{
  // İki platform aynı 25 sosyal işlemi ayrı ayrı sarmalıyor. Biri yeni bir uç
  // eklerken ötekini unutursa o özellik tek platformda kalır ve kimse
  // söylemez - bu oturumda bulunan `mockAccess` (sunucuda vardı, ucu yoktu)
  // tam olarak bu sınıftan. İsim kümesi karşılaştırılıyor, imza değil:
  // parametre adları iki tarafta serbestçe farklı olabilir.
  const ops = (src) => [...src.matchAll(/^\s*(\w+):\s*\([^)]*\)\s*=>/gm)].map((x) => x[1]);
  sameSet("islem kumesi", ops(read("mobile/src/api/social.ts")), ops(read("src/lib/social/client.ts")));
}

/* tur turleri: sunucu ne uretiyor, mobil ne cizebiliyor */

console.log("\n" + C.b + "9. TUR TURLERI" + C.off);
{
  /*
   * Sunucu istemciyi tanımıyor: `Round["game"]` birleşimindeki her tür mobile
   * de gidebiliyor. Mobilin dağıtıcısında karşılığı olmayan tür sessizce
   * öz-değerlendirme kartına düşüyor - görev söylenmiyor ve cevap YANLIŞ TÜRLE
   * kaydediliyor. Haftalık sınavda bu her hafta iki soruydu (bkz. §11.13).
   *
   * İki tür bilerek dışarıda ve ikisinin de gerekçesi burada duruyor; listeye
   * yeni bir ad eklemek gerekiyorsa o ad için de bir cümle yazılmalı.
   */
  const KNOWN_GAPS = {
    free_sentence: "AI puanlı yazma turu; mobilde oynatıcısı yok. Haftalık sınav `?skipGames` ile susturuyor, normal oturum yolu §11.13'te açık.",
    speak: "Yalnız yürüyüş modunda üretiliyor ve orada kendi oynatıcısı var; genel dağıtıcıya hiç düşmüyor.",
  };
  const web = [...(read("src/lib/types.ts").match(/export type GameId =(.*?);/s)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((x) => x[1]);
  const mob = [...read("mobile/src/game/rounds.tsx").matchAll(/round\.game === "(\w+)"/g)].map((x) => x[1]);
  const missing = [...new Set(web)].filter((g) => !mob.includes(g));
  const unexplained = missing.filter((g) => !(g in KNOWN_GAPS));
  if (!web.length || !mob.length) fail("tur turleri okunamadi", [`web ${web.length}, mobil ${mob.length}`]);
  else if (unexplained.length) {
    fail("mobilde cizilemeyen tur", [
      ...unexplained.map((g) => `${g}: gerekcesi yok - ya oynatici ekle ya KNOWN_GAPS'e sebebiyle yaz`),
    ]);
  } else {
    pass(`sunucu ${new Set(web).size} tur, mobil ${new Set(mob).size} tanıyor`);
    for (const g of missing) console.log("         " + C.dim + `bilinen boşluk ${g}: ${KNOWN_GAPS[g]}` + C.off);
  }
}

/* icerigin tasidigi tur, istemcinin cizdigi tur */

console.log("\n" + C.b + "10. BECERI ICERIGI vs OYNATICI" + C.off);
{
  /*
   * Bu bölüm bir hatadan doğdu: `WritingList` `build` dışındaki her görevi
   * `FreeCard`a yönlendiriyordu ve `FreeCard`ın gönder düğmesi
   * `words >= t.minWords` ile açılıyor. Dumpta `rewrite` (189) ve `form` (47)
   * görevleri var ve ikisinde `minWords` YOK: `undefined` karşılaştırması
   * daima false, düğme hiç açılmıyor, görev settle edilemiyor. 356 yazma
   * egzersizinin 190'ı Android'de bitirilemiyordu.
   *
   * Kural bu yüzden ADI DEĞİL ALANI ölçüyor: dağıtıcının ismen tanımadığı bir
   * tür varsayılan dala düşer, o dalın çalışması için gereken alan da o türün
   * HER örneğinde bulunmak zorundadır. Yazmada varsayılan `FreeCard` ve
   * `minWords` ister; soruda varsayılan şıklı dal ve `options` ister.
   */
  const dump = ["mobile/src/data/skills/exercises.json", "mobile/src/data/skills/exercises-en.json"]
    .flatMap((f) => JSON.parse(read(f)));
  const quiz = read("mobile/src/game/skillQuiz.tsx");

  const taskNamed = named(quiz, "t\\.kind");
  const badTasks = new Set();
  for (const e of dump) {
    // Yalnız YAZMA egzersizinin görevleri: konuşma egzersizinin `tasks`ı başka
    // bir şey (kendi oynatıcısı var, `kind` taşımıyor).
    if (e.skill !== "writing") continue;
    for (const t of e.tasks ?? []) {
      if (taskNamed.has(t.kind)) continue;
      if (typeof t.minWords !== "number" && typeof t.minWords !== "string") badTasks.add(t.kind);
    }
  }
  if (badTasks.size) {
    fail("yazma gorevi cizilemez", [...badTasks].map((k) => `${k}: dagitici tanimiyor ve minWords yok -> gonder dugmesi hic acilmaz`));
  } else pass(`yazma gorev turleri (${[...taskNamed].sort().join(", ")} + varsayilan free)`);

  const qNamed = named(quiz, "kind");
  const badQ = new Set();
  for (const e of dump) {
    for (const q of e.questions ?? []) {
      const kind = q.kind ?? "mcq";
      if (qNamed.has(kind)) continue;
      if (!Array.isArray(q.options) || q.options.length < 2) badQ.add(kind);
    }
  }
  if (badQ.size) {
    fail("soru cizilemez", [...badQ].map((k) => `${k}: dagitici tanimiyor ve options yok -> sikkli dalda bos cikar`));
  } else pass("soru turleri (siksiz olanlar ismen taniniyor, kalani options tasiyor)");
}

/* ders anlatimi ve deneme sinavi maddeleri */

console.log("\n" + C.b + "11. DERS VE DENEME ICERIGI vs OYNATICI" + C.off);
{
  /*
   * 10. bölümün aynı kuralı iki içerik daha için: ders anlatımının ADIM
   * BEKLENTİLERİ ve deneme sınavının MADDE türleri. İkisinde de varsayılan dal
   * yok - tanınmayan tür ya hiç çizilmez ya yanlış çizilir, o yüzden ölçüt
   * basit: içerikte geçen her tür oynatıcıda ADIYLA geçmek zorunda.
   */
  const kinds = (files, walk) => {
    const out = new Set();
    for (const f of files) {
      const d = JSON.parse(read(f));
      for (const row of Array.isArray(d) ? d : [d]) walk(row, out);
    }
    return out;
  };

  const lessonFiles = ["de-a1", "de-a2", "de-b1", "de-b2", "de-c1", "en-a1", "en-a2"]
    .map((n) => `mobile/src/data/lessons/${n}.json`)
    .filter((f) => { try { read(f); return true; } catch { return false; } });
  const expectKinds = kinds(lessonFiles, (l, out) => {
    for (const st of l.lecture ?? []) if (st.expect?.kind) out.add(st.expect.kind);
  });
  const lessonNamed = named(read("mobile/src/screens/LessonScreen.tsx"), "kind");
  const missingExpect = [...expectKinds].filter((k) => !lessonNamed.has(k));
  if (!expectKinds.size) fail("anlatim beklentileri okunamadi", [`${lessonFiles.length} dosya`]);
  else if (missingExpect.length) fail("anlatim beklentisi cizilemez", missingExpect.map((k) => `${k}: LessonScreen tanimiyor`));
  else pass(`anlatim beklentileri (${[...expectKinds].sort().join(", ")})`);

  const itemKinds = kinds(["mobile/src/data/exams/papers.json", "mobile/src/data/exams/papers-en.json"], (p, out) => {
    for (const part of p.parts ?? []) for (const t of part.tasks ?? []) for (const it of t.items ?? []) if (it.kind) out.add(it.kind);
  });
  const mockNamed = new Set([
    ...named(read("mobile/src/game/mockExam.ts"), "item\\.kind"),
    ...named(read("mobile/src/screens/MockExamScreen.tsx"), "kind"),
  ]);
  const missingItem = [...itemKinds].filter((k) => !mockNamed.has(k));
  if (!itemKinds.size) fail("deneme maddeleri okunamadi", []);
  else if (missingItem.length) fail("deneme maddesi cizilemez", missingItem.map((k) => `${k}: oynatici tanimiyor`));
  else pass(`deneme madde turleri (${[...itemKinds].sort().join(", ")})`);
}

/* unite dugum turleri */

console.log("\n" + C.b + "12. UNITE DUGUM TURLERI" + C.off);
{
  /*
   * Patika ünitesinin düğüm türleri iki tarafta ayrı yazılı: sunucuda
   * `ImmersionItemKind`, mobilde `ItemKind`. Sunucu üretiyor, mobil çiziyor -
   * ayrışırlarsa ya çizilmeyen bir düğüm gelir ya hiç gelmeyen bir tür
   * çizilmeye çalışılır. Bulunduğunda mobilde fazladan bir `speak` vardı:
   * sunucu onu hiç üretmiyor, mobilin kendi ekranı da dallanmıyordu.
   *
   * Sıra önemsiz (küme karşılaştırması): iki dosya türleri farklı düzende
   * sayıyor ve düzen bir şey ifade etmiyor.
   */
  const union = (src, name) => {
    const i = src.indexOf(`${name} =`);
    if (i < 0) return [];
    const seg = src.slice(i, i + 1400);
    const end = seg.search(/;\s*(\n|$)/);
    return [...(end > 0 ? seg.slice(0, end) : seg).matchAll(/"([\w-]+)"/g)].map((x) => x[1]);
  };
  sameSet(
    "dugum turleri",
    union(read("mobile/src/data/unit.ts"), "export type ItemKind"),
    union(read("src/lib/immersion/types.ts"), "export type ImmersionItemKind"),
  );

  /*
   * İKİNCİ KOPYA DA ÖLÇÜLÜYOR. `ui/unitKind` bir zamanlar kendi `ItemKind`ını
   * yazıyordu ve o kopya ölü bir `speak` taşımaya devam etti - birinci kopya
   * düzeltilirken bu bölüm onu görmedi, çünkü yalnız `data/unit`e bakıyordu.
   * Artık `unitKind` tipi `data/unit`ten alıyor; kural da bunu ölçüyor, yani
   * biri yeniden kendi birleşimini yazarsa kapı söylüyor.
   */
  const kindSrc = read("mobile/src/ui/unitKind.tsx");
  if (/export type ItemKind\s*=/.test(kindSrc)) {
    fail("ui/unitKind kendi birlesimini yaziyor", ["tip `data/unit`ten alinmali; ikinci kopya sessizce ayrisiyor"]);
  } else if (!/import type \{ ItemKind \}/.test(kindSrc)) {
    fail("ui/unitKind tipi nereden aliyor belirsiz", ["`import type { ItemKind } from \"../data/unit\"` bekleniyor"]);
  } else pass("ui/unitKind tek tanimi kullaniyor");
}

/* kopya birlesimler: kademe, iliski, tepki */

console.log("\n" + C.b + "13. KOPYA BIRLESIMLER" + C.off);
{
  /*
   * Üçü de iki tarafta ayrı ayrı yazılı ve üçü de TELDEN geçiyor: sunucu bu
   * adları gönderiyor, istemci bu adlara göre renk/etiket/ikon seçiyor. Biri
   * yeni bir üye kazanırsa öteki onu tanımaz - rozet renksiz, ilişki
   * durumsuz, tepki etiketsiz kalır.
   *
   * `ItemStatus` bilerek DIŞARIDA: web durumu üç ayrı boole ile
   * (playable/done/attempted/open), mobil tek dizgeyle modelliyor. Aynı
   * fikrin iki ayrı gösterimi, kopya değil - telde geçen alanlar zaten
   * boolelar ve ikisi de onları okuyor.
   */
  const union = (src, name) => {
    const i = src.indexOf(name);
    if (i < 0) return [];
    const seg = src.slice(i, i + 900);
    const end = seg.search(/;\s*(\n|$)/);
    return [...(end > 0 ? seg.slice(0, end) : seg).matchAll(/"([\w-]+)"/g)].map((x) => x[1]);
  };
  sameList(
    "basarim kademeleri",
    union(read("mobile/src/data/achievements.ts"), "export type Tier ="),
    union(read("src/lib/achievements.ts"), "export type Tier ="),
  );
  sameList(
    "arkadaslik iliskileri",
    union(read("mobile/src/api/social.ts"), "export type Relation ="),
    union(read("src/lib/social/types.ts"), "export type Relation ="),
  );
  sameList(
    "tepki turleri",
    union(read("mobile/src/api/social.ts"), "export const REACTION_KINDS ="),
    union(read("src/lib/social/types.ts"), "export const REACTION_KINDS ="),
  );
}

/* ── 14. tepki tonlari ───────────────────────────────────────────────────── */
/*
 * Aynı tepki iki platformda aynı renkte çizilmeli. Tepki TÜRLERİ 13. bölümde
 * zaten karşılaştırılıyordu ama RENKLERİ hiç bakılmıyordu ve `star` webde
 * marka, mobilde seri rengiydi. Renk adları farklı yazılıyor (web CSS
 * belirteci, mobil palet alanı), o yüzden ikisi de role çevrilip
 * karşılaştırılıyor.
 */
console.log("\n" + C.b + "14. TEPKI TONLARI" + C.off);
{
  const ROLE = { brand: "primary", mint: "success", rose: "danger", flame: "streak", sky: "info", violet: "accent" };
  const webSrc = read("src/components/social/reaction-icons.tsx");
  const mobSrc = read("mobile/src/social/common.tsx");
  const kinds = [...read("src/lib/social/types.ts").matchAll(/export const REACTION_KINDS = \[([^\]]+)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/"(\w+)"/g)].map((x) => x[1]));

  const webSeg = webSrc.slice(webSrc.indexOf("export const REACTION_TONE"));
  const web = new Map(
    [...webSeg.slice(0, webSeg.indexOf("};")).matchAll(/(\w+):\s*"var\(--color-(\w+)\)"/g)].map((m) => [m[1], ROLE[m[2]] ?? m[2]]),
  );

  const mobSeg = mobSrc.slice(mobSrc.indexOf("export function reactionTone"));
  const mobBody = mobSeg.slice(0, mobSeg.indexOf("\n}"));
  const mob = new Map([...mobBody.matchAll(/case "(\w+)":\s*return colors\.(\w+);/g)].map((m) => [m[1], m[2]]));
  const fallback = (mobBody.match(/default:\s*return colors\.(\w+);/) ?? [])[1];

  const fmt = (get) => kinds.map((k) => `${k}:${get(k) ?? "?"}`);
  sameList("tepki tonlari", fmt((k) => mob.get(k) ?? fallback), fmt((k) => web.get(k)));
}

/* ── 15. konusma eslestirme tablolari ───────────────────────────────────── */
/*
 * Tanımlık ve tanıyıcı-noktalama tabloları iki tarafta iki kopya. Web sabit
 * Almanca yazılıydı ve İngilizce kursta iki sessiz hata veriyordu (bkz.
 * `test:numbers`); düzeltildi, ama kopyalar birbirini bilmiyor. Diller ve
 * karşılık sözcükleri karşılaştırılıyor.
 */
console.log("\n" + C.b + "15. KONUSMA ESLESTIRME TABLOLARI" + C.off);
{
  const webSrc = read("src/components/games/types.ts");
  const mobSrc = read("mobile/src/lib/voiceMatch.ts");

  /* `const <ad>: Record<...> = { de: ..., en: ... }` icindeki dil anahtarlari. */
  const langs = (src, name) => {
    const seg = src.slice(src.indexOf(`const ${name}`));
    const body = seg.slice(0, seg.indexOf("\n};"));
    return [...body.matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
  };
  sameList("tanimlik dilleri", langs(mobSrc, "ARTICLES"), langs(webSrc, "ARTICLES"));
  sameList("tanıyıcı noktalama dilleri", langs(mobSrc, "RECOGNIZER_PUNCT"), langs(webSrc, "RECOGNIZER_PUNCT"));

  /* Noktalama kumesi ve simge tablosu: web `games/types`, mobil `lib/textFold`. */
  const foldSrc = read("mobile/src/lib/textFold.ts");
  const reOf = (src, name) => {
    const m = src.match(new RegExp(`(?:export )?const ${name}(?::[^=]+)? = (/[^\\n]*/[a-z]*);`));
    return m ? m[1] : `${name} YOK`;
  };
  sameList("noktalama kumesi", [reOf(foldSrc, "PUNCT")], [reOf(webSrc, "PUNCT")]);
  sameList("kesme isareti kumesi", [reOf(foldSrc, "APOSTROF")], [reOf(webSrc, "APOSTROPHE")]);
  const symbols = (src) => {
    const seg = src.slice(src.indexOf("const SYMBOLS"));
    const body = seg.slice(0, seg.indexOf("\n};"));
    return [...body.matchAll(/"([^"]+)":\s"([^"]+)\s"/g)].map((m) => `${m[1]}=${m[2]}`);
  };
  sameList("simge tablosu", symbols(foldSrc), symbols(webSrc));

  /* Karsilik sozcukleri: ` punkt `, ` comma ` gibi. */
  const words = (src) => {
    const seg = src.slice(src.indexOf("const RECOGNIZER_PUNCT"));
    const body = seg.slice(0, seg.indexOf("\n};"));
    return [...body.matchAll(/"\s([a-z ]+)\s"/g)].map((m) => m[1]);
  };
  sameList("tanıyıcı noktalama sozcukleri", words(mobSrc), words(webSrc));
}

/* ── 16. sayi sozcugu modulu ─────────────────────────────────────────────── */
/*
 * `src/lib/numbers.ts` ile `mobile/src/lib/numbers.ts` gövdesi BİREBİR aynı
 * olmalı. Modül karşılaştırma katlamasının içinde: ayrılırsa aynı cevap iki
 * platformda farklı puan alır ve bunu hiçbir ekran göstermez. Web tarafı
 * uzun süre yalnız Almanca yapıyordu (eski adı `german-numbers.ts`).
 *
 * Başlık yorumu karşılaştırmadan HARİÇ: iki dosya kendi tarafının hikâyesini
 * anlatıyor. Kod gövdesi ilk bölüm ayracından başlıyor.
 */
console.log("\n" + C.b + "16. SAYI SOZCUGU MODULU" + C.off);
{
  const body = (p) => {
    const src = read(p);
    const i = src.indexOf("/* ─");
    return (i < 0 ? src : src.slice(i)).trim().split("\n").map((l) => l.trimEnd());
  };
  sameList("sayi modulu govdesi", body("mobile/src/lib/numbers.ts"), body("src/lib/numbers.ts"));
}

/* ── 17. cumle hakemi ────────────────────────────────────────────────────── */
/*
 * `src/lib/sentence-match.ts` ile `mobile/src/lib/sentenceMatch.ts` gövdesi
 * aynı olmalı: hüküm (exact/spelling/order/wrong) ve SRS kalitesi buradan
 * çıkıyor, ayrılırsa aynı cevap iki platformda farklı puan alır. Mobil bu
 * porta kadar ikili karşılaştırma yapıyordu (bkz. web-parity §11.19).
 *
 * İthalat satırları HARİÇ: yol takma adları ve dil kaynağı iki tarafta farklı
 * (web `@/lib/courses` `TargetLang` tipi, mobil `currentTargetLang()`).
 * Saf yardımcılar da karşılaştırılıyor - mobil kopyası web `lib/errors`in
 * yalnız saf parçasını taşıyor.
 */
console.log("\n" + C.b + "17. CUMLE HAKEMI" + C.off);
{
  const body = (p) => {
    const src = read(p);
    const i = src.indexOf("/**\n * Cümle eşleştirme");
    return (i < 0 ? src : src.slice(i))
      .split("\n")
      .map((l) => l.trimEnd())
      .filter((l) => !/^import /.test(l))
      /* Dil parametresinin TİPİ iki tarafta farkli yazili; davranis ayni. */
      .map((l) => l.replace(/lang: (?:TargetLang|string)( = (?:"de"|currentTargetLang\(\)))?/g, "lang"));
  };
  sameList("hakem govdesi", body("mobile/src/lib/sentenceMatch.ts"), body("src/lib/sentence-match.ts"));

  /* Saf yardimcilar: adlandirilmis islev govdesi. */
  const fn = (src, name) => {
    const i = src.indexOf(`export function ${name}`);
    if (i < 0) return [`${name} YOK`];
    return src.slice(i, src.indexOf("\n}", i)).split("\n").map((l) => l.trimEnd());
  };
  const webErr = read("src/lib/errors.ts");
  const mobErr = read("mobile/src/lib/errors.ts");
  /* Fark isaretleri: hangi isaretin hangi sozluk anahtarina bagli oldugu. */
  const marks = (src) => {
    const i = src.indexOf("TITLE_KEYS");
    const body = src.slice(i, src.indexOf("};", i));
    return [...body.matchAll(/(\w+): (?:"([\w.]+)"|undefined)/g)].map((m) => `${m[1]}=${m[2] ?? "-"}`);
  };
  sameList(
    "fark isaretleri",
    marks(read("mobile/src/ui/TokenDiff.tsx")),
    marks(read("src/components/feedback/diff-text.tsx")),
  );
  sameList(
    "hukum anahtarlari",
    [...read("mobile/src/lib/sentenceMatch.ts").matchAll(/^\s{2}(\w+): "([\w.]+)",$/gm)].map((m) => `${m[1]}=${m[2]}`),
    [...read("src/lib/sentence-match.ts").matchAll(/^\s{2}(\w+): "([\w.]+)",$/gm)].map((m) => `${m[1]}=${m[2]}`),
  );
  sameList("levenshtein", fn(mobErr, "levenshtein"), fn(webErr, "levenshtein"));
  sameList("classifyOrder", fn(mobErr, "classifyOrder"), fn(webErr, "classifyOrder"));
  sameList(
    "hata tipleri",
    [...read("mobile/src/lib/errors.ts").matchAll(/^\s{2}"(\w+)",$/gm)].map((m) => m[1]),
    [...webErr.matchAll(/^\s{2}"(\w+)",$/gm)].map((m) => m[1]),
  );
}

/* ── 18. tur -> hata tipi ────────────────────────────────────────────────── */
/*
 * Her oyunun YANLIŞ cevabına hangi hata tipini yazdığı iki tarafta aynı olmalı:
 * `lib/error-analytics` dökümü ve SRS ağırlığı (`srsWeightFor`) bu tipe bakıyor.
 * Mobil bu turdan önce hiç göndermiyordu (bkz. web-parity §11.19); artık
 * gönderiyor ve tablonun ayrışmaması gerekiyor.
 *
 * `free_sentence` webde var, mobilde oynatıcısı yok (§11.13) - listeye
 * girmiyor.
 */
console.log("\n" + C.b + "18. TUR -> HATA TIPI" + C.off);
{
  const OYUN = {
    artikel: "ArtikelRound",
    choice: "ChoiceRound",
    cloze: "ClozeRound",
    listen: "ListenRound",
    order: "OrderRound",
    plural: "PluralRound",
    scramble: "ScrambleRound",
    truefalse: "TrueFalseRound",
    typing: "TypingRound",
    translate: "TranslateRound",
  };
  /* `miss(...)`in ikinci argumani: ya tirnakli tip ya siniflandirici adi. */
  const tipOf = (metin) => {
    /* Ucluye de bakiyor: cloze yazarak modda siniflandirici, sikta "meaning". */
    const u = metin.match(/miss\(\s*[^,]+,\s*typeMode \? (classify\w+)\([^)]*\) : "(\w+)"/s);
    if (u) return `${u[1]}|${u[2]}`;
    const m = metin.match(/miss\(\s*[^,]+,\s*(?:"(\w+)"|(classify\w+)\()/s);
    if (m) return m[1] ?? m[2];
    const e = metin.match(/errorType: m\.errorType/);
    return e ? "sentenceMatch" : "?";
  };
  const mob = read("mobile/src/game/rounds.tsx");
  const bolum = (fn) => {
    const i = mob.indexOf(`function ${fn}(`);
    if (i < 0) return `${fn} YOK`;
    const j = mob.indexOf("\nfunction ", i + 1);
    return mob.slice(i, j < 0 ? undefined : j);
  };
  const satirlar = (get) => Object.keys(OYUN).sort().map((g) => `${g}:${get(g)}`);
  sameList(
    "tur -> hata tipi",
    satirlar((g) => tipOf(bolum(OYUN[g]))),
    satirlar((g) => tipOf(read(`src/components/games/${g}-game.tsx`))),
  );

  /*
   * IPUCU BILDIRIMI. Sunucu SRS puanini `hintUsed` ile belirliyor
   * (`lib/srs` `grade`: ipucu varsa kalite 3). Ipucu sunan her turun bunu
   * bildirmesi gerek; bildirmeyen turda ipucu BEDAVA olur.
   */
  const ipucu = (metin) => (/hintUsed/.test(metin) ? "bildiriyor" : "BILDIRMIYOR");
  const IPUCLU = { typing: "TypingRound", translate: "TranslateRound", scramble: "ScrambleRound", listen: "ListenRound" };
  sameList(
    "ipucu bildirimi",
    Object.keys(IPUCLU).sort().map((g) => `${g}:${ipucu(bolum(IPUCLU[g]))}`),
    Object.keys(IPUCLU).sort().map((g) => `${g}:${ipucu(read(`src/components/games/${g}-game.tsx`))}`),
  );

  /*
   * Oynanamayan tur turu susturuluyor mu. Sunucu `free_sentence`i karisik
   * oturuma koyuyor ve mobilde onu cizen bir bilesen yok; istemci ucun
   * `?skipGames=` suzgecini kullanmiyorsa tur oraya gidiyor (§11.13).
   */
  const susturma = (src, re) => (re.test(src) ? "susturuluyor" : "SUSTURULMUYOR");
  sameList(
    "free_sentence susturmasi",
    [susturma(read("mobile/src/game/session.ts"), /skipGames=/)],
    ["susturuluyor"],
    "mobil oturum cagrisi",
    "beklenen",
  );
  sameList(
    "free_sentence susturmasi (haftalik)",
    [susturma(read("mobile/src/game/weekly.ts"), /skipGames=/)],
    ["susturuluyor"],
    "mobil haftalik cagrisi",
    "beklenen",
  );
  sameList(
    "uc skipGames suzgeci",
    [susturma(read("src/app/api/session/route.ts"), /skipGames/)],
    ["susturuluyor"],
    "oturum ucu",
    "beklenen",
  );

  /* `assist` alani: sunucu taze kelimenin ardindaki yazma turunda gonderiyor. */
  const asist = (src) => (/round\.assist/.test(src) ? "okunuyor" : "OKUNMUYOR");
  sameList(
    "typing assist alani",
    [asist(read("mobile/src/game/rounds.tsx"))],
    [asist(read("src/components/games/typing-game.tsx"))],
  );

  /* cloze `mode` alani: sunucu "type" gonderiyor, iki istemci de okumali. */
  const clozeMode = (src) => (/round\.mode === "type"/.test(src) ? ["type modu okunuyor"] : ["type modu OKUNMUYOR"]);
  sameList(
    "cloze yazarak modu",
    clozeMode(read("mobile/src/game/rounds.tsx")),
    clozeMode(read("src/components/games/cloze-game.tsx")),
  );
}

/* ── 19. oturum paketi alanlari ─────────────────────────────────────────── */
/*
 * Sunucunun oturum paketine koydugu her alanin istemci tipinde KARSILIGI
 * olmali. Olmayan alan sessizce dusuyor: derleme kirilmiyor, istek basarili,
 * yalnizca o bilgi hic kullanilmiyor. Bu turda uc ornegi cikti - `errorType`
 * (§11.19), `mode` (§11.20), `assist` (§11.21) ve `meta.coverage` (§11.22).
 *
 * `partners` ve `level` listede YOK: yalniz `free_sentence` turunun alanlari ve
 * o turun mobilde oynaticisi yok (§11.13).
 */
console.log("\n" + C.b + "19. OTURUM PAKETI ALANLARI" + C.off);
{
  const web = read("src/lib/types.ts");
  const mob = read("mobile/src/game/session.ts");
  const seg = (src, start, end) => {
    const i = src.indexOf(start);
    if (i < 0) return "";
    const j = src.indexOf(end, i + start.length);
    return src.slice(i, j < 0 ? undefined : j);
  };
  /* Web `Round` union'i ile mobil `Round` tipindeki alan adlari. */
  const alanlar = (metin) =>
    [...new Set([...metin.matchAll(/^\s+(\w+)\??:/gm)].map((m) => m[1]))]
      .filter((a) => !["id", "game"].includes(a))
      .sort();
  const webRound = alanlar(seg(web, "export type Round =", "\nexport type Answer = {")).filter((a) => !["partners", "level"].includes(a));
  const mobRound = alanlar(seg(mob, "export type Round = {", "\n};"));
  const yok = (l) => (l.length ? l : ["eksik yok"]);
  sameList(
    "tur alanlari",
    yok(webRound.filter((a) => !mobRound.includes(a))),
    ["eksik yok"],
    "mobilde eksik",
    "beklenen",
  );

  /* Oturum meta alanlari. `pacing`, `leeches` ve `challengeBest` hicbir
     istemcide okunmuyor (web dahil) - ayri bir konu, bkz. §11.22. */
  const metaWeb = alanlar(seg(web, "  meta: {", "\n  };")).filter((a) => !["meta", "pacing", "leeches", "challengeBest"].includes(a));
  const metaMob = alanlar(seg(mob, "export type SessionMeta = {", "\n};"));
  sameList("meta alanlari", yok(metaWeb.filter((a) => !metaMob.includes(a))), ["eksik yok"], "mobilde eksik", "beklenen");
  /* Cevap yaniti: web `AnswerResult` ile mobil `SubmitResult`. */
  const resWeb = alanlar(seg(web, "export type AnswerResult = {", "\n};"));
  const resMob = alanlar(seg(mob, "export type SubmitResult = {", "\n};"));
  sameList("cevap yaniti alanlari", yok(resWeb.filter((a) => !resMob.includes(a))), ["eksik yok"], "mobilde eksik", "beklenen");

}

/* ── modul temalari ─────────────────────────────────────────────────────────
   Patika ünitelerinin adı. İki kopya elle tutuluyor: webde
   `lib/lessons/modules.ts` `MODULE_THEMES` (seviyeye göre), mobilde
   `data/moduleThemes.ts` (kursa VE seviyeye göre). Webin tablosu Almanca
   kursu anlatıyor, o yüzden karşılaştırma mobilin `de` dalıyla.

   Ölçülen sessiz ayrışma buydu: web B1'i 2026-09-05'te on sekiz modüle
   genişletti, mobil listede on tema kaldı. `de-b1.json` 180 ders taşıyor
   (18 modül), yani Patika'nın 11-18. üniteleri adını bulamayıp jenerik
   etikete düşüyordu - içerik yerindeydi, adı yoktu. */
{
  const web = read("src/lib/lessons/modules.ts");
  const mob = read("mobile/src/data/moduleThemes.ts");
  /* `seg` bu betikte blok-yerel bir yardımcı; burada da aynı işi yapan bir
     kopya duruyor (küçük ve iki satır - paylaşmak için yukarı taşımak
     dosyanın sırasını bozardı). */
  const cut = (src, start, end) => {
    const i = src.indexOf(start);
    if (i < 0) return "";
    const j = src.indexOf(end, i + start.length);
    return src.slice(i, j < 0 ? undefined : j);
  };
  const webBlock = cut(web, "export const MODULE_THEMES", "\n};");
  const mobDe = cut(mob, "  de: {", "\n  },");
  const arr = (src, level) => {
    const m = new RegExp(level + ":\\s*\\[([\\s\\S]*?)\\]").exec(src);
    return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : [];
  };
  for (const level of ["A1", "A2", "B1", "B2", "C1"]) {
    sameList("modul temalari " + level, arr(mobDe, level), arr(webBlock, level));
  }
}

console.log(
  fails === 0
    ? "\n" + C.ok + C.b + "KAYIT DEFTERLERI ESIT" + C.off + "\n"
    : "\n" + C.bad + C.b + fails + " AYRISMA" + C.off + "\n",
);
process.exit(fails === 0 ? 0 : 1);

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
import { readFileSync, readdirSync } from "node:fs";

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
  /*
   * Web `Round` birlesimi ile mobil `Round` tipindeki alan adlari.
   *
   * Yorumlar ONCE atiliyor ve alanlar SATIR BASINA bagli DEGIL: webin
   * birlesiminin bir kismi tek satirda yazilmis (`| { id: string; game:
   * "match"; words: RoundWord[] }`) ve satir basi arayan eski desen o
   * uyelerin alanlarini HIC gormuyordu - `words` ile `direction` iki tarafta
   * da varken "mobilde fazla" gorunuyordu. Ayirici artik `{` ya da `;` ya da
   * satir sonu.
   */
  const alanlar = (metin) =>
    [...new Set(
      [...metin
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/\/\/[^\n]*/g, " ")
        .matchAll(/[{;\n]\s*(\w+)\??:/g)].map((m) => m[1]),
    )]
      .filter((a) => !["id", "game"].includes(a))
      .sort();
  const webRound = alanlar(seg(web, "export type Round =", "\nexport type Answer = {")).filter((a) => !["partners", "level"].includes(a));
  const mobRound = alanlar(seg(mob, "export type Round = {", "\n};"));
  const yok = (l) => (l.length ? l : ["eksik yok"]);
  /*
   * IKI YON. Kapi bugune kadar yalniz web -> mobil yonune bakiyordu: mobilde
   * FAZLA olan bir alani hic yakalamiyordu. Fazlasi da bir hata - sunucunun
   * gondermedigi bir alani modellemek, onu okuyan ekranin her seferinde
   * `undefined` gormesi demek ve derleyici bunu soylemez. Olcumde uc olu alan
   * cikti (`blank`, `correctOrder`, `prompt`: hicbiri sunucuda yok, hicbiri
   * mobilde okunmuyordu) ve iki yerde `as unknown as` kacisi vardi - `answer`
   * `order` turunda dizi, `sentence` `translate` turunda nesne. Ucu de
   * temizlendikten sonra iki yon de bos, o yuzden istisna listesi YOK. */
  const ciftYon = (baslik, web, mob) => {
    sameList(baslik, yok(web.filter((a) => !mob.includes(a))), ["eksik yok"], "mobilde eksik", "beklenen");
    const fazla = mob.filter((a) => !web.includes(a));
    sameList(baslik + " (ters)", fazla.length ? fazla : ["fazla yok"], ["fazla yok"], "mobilde fazla", "beklenen");
  };
  ciftYon("tur alanlari", webRound, mobRound);

  /* Oturum meta alanlari. `pacing`, `leeches` ve `challengeBest` hicbir
     istemcide okunmuyor (web dahil) - ayri bir konu, bkz. §11.22. */
  const metaWeb = alanlar(seg(web, "  meta: {", "\n  };")).filter((a) => !["meta", "pacing", "leeches", "challengeBest"].includes(a));
  const metaMob = alanlar(seg(mob, "export type SessionMeta = {", "\n};"));
  ciftYon("meta alanlari", metaWeb, metaMob);
  /* Cevap yaniti: web `AnswerResult` ile mobil `SubmitResult`. */
  const resWeb = alanlar(seg(web, "export type AnswerResult = {", "\n};"));
  const resMob = alanlar(seg(mob, "export type SubmitResult = {", "\n};"));
  ciftYon("cevap yaniti alanlari", resWeb, resMob);

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

/* ── 20. deneme sinavi cevap katlamasi ─────────────────────────────────────
 * `src/lib/mock-exams/scoring.ts` ile `mobile/src/game/mockExam.ts` icindeki
 * `foldAnswer` AYNI kural olmak zorunda ve bunu iki dosya da yaziyor. Sonucu
 * mobil dosyanin yorumunda: ayrilirlarsa ogrenci EKRANDA DOGRU gorunen bir
 * cevabin sunucuda yanlis sayildigini gorur - kesme isareti kuralinin
 * eklenmesi tam bu hataydi (Ingilizce bosluk doldurmada dogru cevap yanlis
 * sayiliyordu).
 *
 * Kapisi yoktu. Karsilastirma yalnizca islevin GOVDESI: iki dosyanin geri
 * kalani tamamen farkli (biri sunucu puanlamasi, oteki mobil oturum
 * cagrilari). */
{
  const fold = (p) => {
    const src = read(p);
    const i = src.indexOf("export function foldAnswer");
    if (i < 0) return ["foldAnswer bulunamadi: " + p];
    const j = src.indexOf("\n}", i);
    return src
      .slice(i, j < 0 ? undefined : j + 2)
      .split("\n")
      .map((l) => l.trimEnd());
  };
  sameList("cevap katlamasi", fold("mobile/src/game/mockExam.ts"), fold("src/lib/mock-exams/scoring.ts"));
}

/* ── 21. yuruyus modunun ses tablosu ───────────────────────────────────────
 * Webin `lib/sfx.ts` `WALK_NOTES` tablosu, mobil `lib/sfxNotes.ts`
 * `SFX_NOTES`in uc girdisinin (micon / micoff / premium) KOPYASI ve web
 * dosyasi bunu kendisi yaziyor ("mobil ile BIREBIR ayni... govdesi
 * sfxNotes.tsteki nota tablosundan KOPYALANDI").
 *
 * Mobil tarafta tablonun uc kopyasini (Kotlin, Swift, mp3) koruyan bir kapi
 * VAR (`mobile/__tests__/sfxNotes.test.ts`); WEB kopyasini koruyan yoktu.
 * Yani nota tablosu degistiginde uc native cikti kirilip haber veriyor, web
 * sessizce eski sesi calmaya devam ediyordu.
 *
 * Karsilastirma sayi sayi: her ikili icin nota satirlari. */
{
  const rows = (src, table, cue) => {
    const t = src.indexOf(table);
    if (t < 0) return ["tablo bulunamadi: " + table];
    const head = "\n  " + cue + ": [";
    const i = src.indexOf(head, t);
    if (i < 0) return [cue + " bulunamadi"];
    const j = src.indexOf("\n  ],", i);
    /* Aramaya baslik ayracindan SONRA basliyoruz: acilis `[`si de bir satir
       sanilirsa ilk alan NaN cikiyor (iki tarafta ayni cikiyor, yani
       karsilastirma yine dogru ama ilk sayidaki bir ayrimi gizleyebilirdi). */
    return [...src.slice(i + head.length, j).matchAll(/\[([^\]]+)\]/g)].map((m) =>
      m[1].split(",").map((x) => String(Number(x.trim()))).join(","),
    );
  };
  const web = read("src/lib/sfx.ts");
  const mob = read("mobile/src/lib/sfxNotes.ts");
  for (const cue of ["micon", "micoff", "premium"]) {
    sameList("yuruyus sesi " + cue, rows(mob, "SFX_NOTES", cue), rows(web, "WALK_NOTES", cue));
  }
}

/* ── 22. ayni adi tasiyan sabitler ─────────────────────────────────────────
 * Iki tarafta AYNI ADLA duran sabit listeler. Otuz bolum elle eklenmisti;
 * bu bolum listeyi LISTELEYEREK bulundu: iki agacta ayni `export const AD`
 * arandi (23 esleme) ve kapida hic gecmeyenler ayrildi (18). Bugun degeri
 * ayni olan on bes cifti buraya baglandi - kalan uc ayri sebeple disarida
 * (asagida).
 *
 * Karsilastirma metin uzerinde ve normalize ediliyor: bosluklar teklenir, son
 * virgul ve `as const` atilir. Deger ifadesi olarak yazilmis olanlar (webin
 * `pkg.version`u gibi) buraya girmez. */
{
  /* Normalize: yorumlar atilir (iki taraf ayni karari kendi diliyle
     anlatiyor), bosluk teklenir, son virgul ve ayraclarin ici kirpilir,
     `as const` atilir. Yorum ayiklamasi SART: aksi halde bir tarafa gerekce
     yazmak kapiyi kiriyor. */
  const norm = (v) =>
    v
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/\/\/[^\n]*/g, " ")
      .replace(/\s+/g, " ")
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/([{[])\s+/g, "$1")
      .replace(/\s+([}\]])/g, "$1")
      .replace(/([{[])\s+/g, "$1")
      .replace(/\s+([}\]])/g, "$1")
      .replace(/\s*as const\s*$/, "")
      .trim();
  const val = (p, name) => {
    const src = read(p);
    const i = src.indexOf("export const " + name);
    if (i < 0) return ["bulunamadi: " + name + " @ " + p];
    let k = src.indexOf("=", i) + 1;
    const start = k;
    let depth = 0;
    for (; k < src.length; k++) {
      const c = src[k];
      if ("[{(".includes(c)) depth++;
      else if ("]})".includes(c)) depth--;
      else if (c === ";" && depth <= 0) break;
    }
    return [norm(src.slice(start, k))];
  };
  const PAIRS = [
    ["DEFAULT_AVATAR", "src/lib/avatar.ts", "mobile/src/lib/avatar.ts"],
    ["DEFAULT_NATIVE", "src/lib/courses.ts", "mobile/src/lib/courses.ts"],
    ["SAMPLE", "src/components/voice-picker.tsx", "mobile/src/ui/VoicePicker.tsx"],
    ["MIN_PASSWORD_LENGTH", "src/lib/auth/password-policy.ts", "mobile/src/lib/passwordPolicy.ts"],
    ["COMMON", "src/lib/auth/password-policy.ts", "mobile/src/lib/passwordPolicy.ts"],
    ["DETAIL_MAX", "src/lib/errors.ts", "mobile/src/lib/errors.ts"],
    ["ERROR_TYPES", "src/lib/errors.ts", "mobile/src/lib/errors.ts"],
    ["SPELLING_TOLERANCE", "src/lib/errors.ts", "mobile/src/lib/errors.ts"],
    ["GLASSES", "src/components/avatar-parts.tsx", "mobile/src/ui/avatarParts.tsx"],
    ["HATS", "src/components/avatar-parts.tsx", "mobile/src/ui/avatarParts.tsx"],
    ["HAT_COLORS", "src/components/avatar-parts.tsx", "mobile/src/ui/avatarParts.tsx"],
    ["MUSTACHES", "src/components/avatar-parts.tsx", "mobile/src/ui/avatarParts.tsx"],
    ["LEAGUE_TIERS", "src/lib/social/types.ts", "mobile/src/api/social.ts"],
    ["MOCK_LABELS", "src/lib/mock-exams/types.ts", "mobile/src/data/exams/index.ts"],
    ["MOCK_PASS_PCT", "src/lib/mock-exams/types.ts", "mobile/src/data/exams/index.ts"],
    ["TURKISH_VOICE", "src/lib/tts/voices.ts", "mobile/src/lib/voices.ts"],
    ["VERDICT_KEYS", "src/lib/sentence-match.ts", "mobile/src/lib/sentenceMatch.ts"],
    ["TIER_COLOR", "src/components/achievement-badge.tsx", "mobile/src/theme/colors.ts"],
    ["ALL_DONE_ID", "src/lib/quests.ts", "mobile/src/game/quests.ts"],
    ["ALL_DONE_XP", "src/lib/quests.ts", "mobile/src/game/quests.ts"],
  ];
  for (const [name, wp, mp] of PAIRS) sameList("sabit " + name, val(mp, name), val(wp, name));

  /* KIND_TINT yalniz ANAHTAR kumesi: webde CSS degiskeni, mobilde palet jeton
     ADI duruyor (sonradan cozuluyor). Degerler bilerek farkli bicimde, kume
     ayni olmali - bir unite turu eklenip oteki tarafta unutulursa renksiz
     kalir. */
  const keys = (p, name) => {
    const src = read(p);
    const i = src.indexOf("export const " + name);
    if (i < 0) return ["bulunamadi"];
    const j = src.indexOf("\n};", i);
    return [...src.slice(i, j).matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]).sort();
  };
  sameList(
    "unite turu tonlari (anahtar)",
    keys("mobile/src/ui/unitKind.tsx", "KIND_TINT"),
    keys("src/components/immersion/unit-pane.tsx", "KIND_TINT"),
  );

  /* Ses kayit defteri: kimlik + kurs. Etiket ve not anahtarlari iki tarafta
     ayni olmak zorunda degil (web notu dogrudan yaziyor, mobil sozlukten
     cekiyor), ama HANGI ses HANGI kursta sorusu ayni cevabi vermeli. */
  const voiceIds = (p) =>
    [...read(p).matchAll(/id: "([^"]+)"[^}]*?course: "([^"]+)"/g)].map((m) => m[1] + ":" + m[2]).sort();
  sameList("ses kayit defteri", voiceIds("mobile/src/lib/voices.ts"), voiceIds("src/lib/tts/voices.ts"));
}

/* ── 23. ses cue kumesi ────────────────────────────────────────────────────
 * Web on uc cue tanimliyor, mobil yedi. Fark ALTI cue ve hepsi mobilin SAHIP
 * OLDUGU yuzeylerde caliyor (bkz. web-parity 11.58): start (tur/patron/yuruyus
 * acilisi), stage ve perfect (etap ve kusursuz etap), record (rekor), unlock
 * (rozet ve gorev), danger (sure azaldi).
 *
 * Kapinin isi farki KAPATMAK degil, BUYUMESINI engellemek: alti cue burada
 * sebebiyle yazili. Webe yedincisi eklenirse kapi kirilir ve karar yeniden
 * verilir - sessizce buyumez. */
{
  const ALLOW = new Set([
    "start", //   tur acilisi
    "stage", //   etap bitti
    "perfect", // etabin tamami dogru
    "record", //  yeni rekor
    "unlock", //  rozet / gorev acildi
    "danger", //  sure azaldi
  ]);
  /* Sondaki `;` ISTEGE BAGLI: birlesimin SON uyesi `| "danger";` biciminde ve
     onu atlayan ilk surum on ucun on ikisini karsilastiriyordu - enjeksiyon
     denemesi bu yuzden yakalanmadi, kapi yanlis sebeple geciyordu. */
  const web = [...read("src/lib/sfx.ts").matchAll(/^\s*\|\s*"(\w+)";?$/gm)].map((m) => m[1]);
  const mob = [...(/export type SfxKind =([^;]+);/.exec(read("mobile/src/lib/sfxNotes.ts"))?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]);
  const eksik = web.filter((c) => !mob.includes(c) && !ALLOW.has(c));
  const fazla = mob.filter((c) => !web.includes(c));
  sameList("ses cue kumesi", eksik.length ? eksik : ["eksik yok"], ["eksik yok"], "mobilde kayitsiz eksik", "beklenen");
  sameList("ses cue kumesi (ters)", fazla.length ? fazla : ["fazla yok"], ["fazla yok"], "webde olmayan", "beklenen");
}

/* ── 24. deneme sinavi hata siniflandiricisi ───────────────────────────────
 * Web `components/mock-exam-player.tsx` `failOf` ile mobil
 * `game/mockExam.ts` `failReason` AYNI karari veriyor ve iki dosya da ayni
 * gerekceyi yaziyor: 403 iki ayri sey (koken denetimi ve kilitli kagit) ve
 * ikisini birden "oturumun dusmus" okumak kullaniciyi bos yere giris ekranina
 * gonderiyor. Kapisi yoktu.
 *
 * Karsilastirma yalniz KARAR SATIRLARI: durum kodu -> sebep esleme. Govdenin
 * geri kalani iki tarafta farkli (biri HttpError, oteki ApiError). */
{
  const rules = (p, fn) => {
    const src = read(p);
    const i = src.indexOf(fn);
    if (i < 0) return ["bulunamadi: " + fn];
    const j = src.indexOf("\n}", i);
    /* Satir basina: o dalda gecen DURUM KODLARI + donen sebep. Yalniz sebep
       dizisini karsilastirmak yetmiyordu - webden `|| st === 403` kosulunu
       cikaran bir enjeksiyon sirayi bozmadigi icin yakalanmadi. Kodlari da
       almak kosul degisikligini gorunur yapiyor; kosulun GERI KALANI (biri
       HttpError, oteki ApiError) bilerek disarida. */
    return src
      .slice(i, j < 0 ? undefined : j)
      .split("\n")
      .filter((l) => /return "/.test(l))
      .map((l) => {
        const kodlar = [...l.matchAll(/\b(4\d\d|5\d\d)\b/g)].map((m) => m[1]).join("+") || "-";
        const sebep = /return "(\w+)"/.exec(l)?.[1] ?? "?";
        return kodlar + " -> " + sebep;
      });
  };
  sameList(
    "deneme sinavi hata sirasi",
    rules("mobile/src/game/mockExam.ts", "export function failReason"),
    rules("src/components/mock-exam-player.tsx", "function failOf"),
  );
}

/* ── elle yazilmis icerik ciftleri ──────────────────────────────────────────
   Iki dosyanin "birebir ayni kalmali" dedigi ama hicbir kapinin bakmadigi
   veri. Modul temalari tam bu yuzden bes gun ayrisik kaldi (bkz. 11.52):
   dosya basliginda yazmak drift'i durdurmuyor, olcum durduruyor.

   Karsilastirma dizge dizgesi: her iki dosyadaki tirnakli degerler sirayla.
   Ice alma yolu (`@/lib/courses` ile `../lib/courses`) elenir - ayni modulun
   iki platformdaki yolu zaten farkli olmak zorunda. */
{
  const lits = (p) =>
    [...read(p).matchAll(/"([^"\n]+)"/g)]
      .map((m) => m[1])
      .filter((x) => !x.includes("lib/courses"));
  sameList("ilk kelimeler", lits("mobile/src/data/firstWords.ts"), lits("src/lib/first-words.ts"));
  sameList("demo yerlestirme", lits("mobile/src/data/demoPlacement.ts"), lits("src/lib/placement-demo.ts"));
}

/* ── 25. gorev panosunun toplu odulu ───────────────────────────────────────
 * `ALL_DONE_XP` iki tarafta adiyla karsilastiriliyor (bkz. 22) ama WEBIN
 * KARTI o sabiti ICE ALAMIYOR: `src/lib/quests.ts` `server-only` ve
 * `quest-card` bir istemci bileseni. Sayi bu yuzden kartin icine ELLE
 * yazilmis - iki yerde. Sunucudaki odul degistiginde web kullanicisina yanlis
 * miktar yazar ve hicbir sey uyarmaz.
 *
 * Kapi kartin yazdigi iki sayiyi sunucunun sabitiyle karsilastiriyor: rozette
 * ("+300 XP") ve dugmede (`claim_xp` icindeki `xp`). Mobil sabiti ice aliyor,
 * o yuzden orada elle yazilmis bir sayi YOK - kapinin bakacagi da yok. */
{
  const src = read("src/lib/quests.ts");
  const m = src.match(/export const ALL_DONE_XP\s*=\s*(\d+)/);
  const server = m ? m[1] : "okunamadi";
  const card = read("src/components/quest-card.tsx");
  /* Kartin toplu odul kutusu: `board.allDone` blogundan sonrasi. Iki sayi da
     o blokta; oncesindeki `q.xp` gibi degisken degerler zaten sayi degil. */
  const box = card.slice(card.indexOf("board.allDone"));
  const written = [
    (box.match(/\+\{?(\d+)\}? XP/) ?? [])[1] ?? "yok",
    (box.match(/claim_xp",\s*\{\s*xp:\s*(\d+)\s*\}/) ?? [])[1] ?? "yok",
  ];
  sameList("gorev toplu odulu (webin karti)", written, [server, server], "web karti", "sunucu sabiti");
}

/* ── 26. sosyal katmanin alanlari ve cumle tablolari ───────────────────────
 * Sosyal katman on iki uc ve bes ortak tip; hicbir kapi bakmiyordu. Iki sey
 * olculuyor:
 *
 * 1. Bes tipin alan kumesi IKI YONDE (bkz. 19: fazlasi da hata).
 * 2. Uc cumle tablosunun `case` kumesi. Adlar iki tarafta farkli
 *    (`feedText`/`describeShort` <-> `feedPhrase`/`reactionTarget`) ama
 *    tablolar ayni olaylari anlatmak zorunda: sunucu yeni bir etkinlik turu
 *    yazdiginda karsiligi olmayan taraf "bir sey oldu" diye genel bir cumle
 *    basiyor ve kimse fark etmiyor. Ayrica iki tablonun sunucunun
 *    `ACTIVITY_TYPES` / `NOTIFICATION_TYPES` listesini TAM kapsadigi
 *    olculuyor - kapsamayan tur sessizce varsayilana dusuyor.
 *
 * `reactionTarget` `friend_streak` tasimiyor: tepki verilebilen olaylar
 * `lib/social/reactions.ts` ile sinirli ve ortak seri onlarin arasinda degil
 * (iki tarafta da yok, yani ayrisma degil). */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const typeBlock = (src, name) => {
    const x = strip(src);
    const i = x.indexOf("export type " + name + " =");
    if (i < 0) return "";
    let k = x.indexOf("{", i);
    if (k < 0) return "";
    let d = 0;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) return x.slice(k, j + 1);
    }
    return "";
  };
  const flds = (b) => [...new Set([...b.matchAll(/[{;\n]\s*(\w+)\??:/g)].map((m) => m[1]))].sort();
  const wt = read("src/lib/social/types.ts");
  const mt = read("mobile/src/api/social.ts");
  for (const n of ["PublicUser", "FriendRow", "ReactionSummary", "FeedItem", "QuestView"]) {
    const w = flds(typeBlock(wt, n));
    const m = flds(typeBlock(mt, n));
    const eksik = w.filter((a) => !m.includes(a));
    const fazla = m.filter((a) => !w.includes(a));
    sameList("sosyal " + n + " alanlari", eksik.length ? eksik : ["ayrisma yok"], ["ayrisma yok"], "mobilde eksik", "beklenen");
    sameList("sosyal " + n + " alanlari (ters)", fazla.length ? fazla : ["ayrisma yok"], ["ayrisma yok"], "mobilde fazla", "beklenen");
  }

  /* Cumle tablolarinin `case` kumeleri. Islevin govdesindeki ILK `switch`
     alinir; ic ice switch yok. */
  const swCases = (src, fn) => {
    const x = strip(src);
    const i = x.indexOf(fn);
    if (i < 0) return ["bulunamadi: " + fn];
    const k = x.indexOf("switch", i);
    if (k < 0) return ["switch yok: " + fn];
    let b = x.indexOf("{", k);
    let d = 0;
    for (let j = b; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) {
        return [...new Set([...x.slice(b, j + 1).matchAll(/case\s+"([^"]+)"/g)].map((m) => m[1]))].sort();
      }
    }
    return ["okunamadi: " + fn];
  };
  const wc = read("src/lib/social/client.ts");
  const TABLES = [
    ["akis cumlesi", "function feedText", "function feedPhrase"],
    ["tepki hedefi", "function describeShort", "function reactionTarget"],
    ["bildirim cumlesi", "function notificationText", "function notificationText"],
  ];
  for (const [baslik, wf, mf] of TABLES) sameList(baslik + " tablosu", swCases(mt, mf), swCases(wc, wf));

  /* Sunucunun listesini TAM kapsama. */
  const konst = (name) => {
    const m = strip(wt).match(new RegExp("export const " + name + " = \\[([^\\]]*)\\]"));
    return m ? [...new Set((m[1].match(/"[^"]+"/g) ?? []).map((x) => x.slice(1, -1)))].sort() : ["okunamadi: " + name];
  };
  const kapsam = (baslik, liste, cases) => {
    const eksik = liste.filter((x) => !cases.includes(x));
    sameList(baslik, eksik.length ? eksik : ["kapsam tam"], ["kapsam tam"], "kapsanmayan", "beklenen");
  };
  kapsam("etkinlik turlerinin kapsami (mobil)", konst("ACTIVITY_TYPES"), swCases(mt, "function feedPhrase"));
  kapsam("etkinlik turlerinin kapsami (web)", konst("ACTIVITY_TYPES"), swCases(wc, "function feedText"));
  kapsam("bildirim turlerinin kapsami (mobil)", konst("NOTIFICATION_TYPES"), swCases(mt, "function notificationText"));
  kapsam("bildirim turlerinin kapsami (web)", konst("NOTIFICATION_TYPES"), swCases(wc, "function notificationText"));
}

/* ── 27. ozet ve rozet uclarinin alanlari ──────────────────────────────────
 * `/api/me` ile `/api/achievements` iki tarafin da okudugu iki uc ve hicbir
 * kapi bakmiyordu. Ikisinde de olculen ayni sey: sunucunun YAZDIGI alan
 * kumesi ile istemcinin MODELLEDIGI kume, iki yonde (bkz. 19).
 *
 * `/api/me` istisnasi: webin kendi `Me` tipi YOK - sunucu bilesenleri
 * `ensureProfile`/`getProgress`i dogrudan cagiriyor ve uc yalniz mobil icin
 * var. O yuzden karsilastirma ucun GOVDESINDEKI anahtarlarla yapiliyor,
 * ikinci bir tiple degil.
 *
 * `/api/achievements` GET govdesi `achievementBoard`dan geliyor
 * (`AchievementBoard`); mobil tarafta `Achievement` satirin tipi. Satir
 * alanlari karsilastiriliyor: tahtanin sarmalayici alanlari (`rows`,
 * `fresh`, `unlockedCount`, `total`) mobilde ayri bir tip degil, cagirma
 * yerinde aciliyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  /* Ucun `NextResponse.json({...})` govdesindeki ILK duzey anahtarlar. */
  const govde = (p, marker) => {
    const src = strip(read(p));
    /* `marker` govdenin ICINDEN bir satir; kapsayan `{` geriye dogru aranir.
       Ucun ilk `NextResponse.json(`i 401 hata govdesi - onu almamak icin. */
    const i = src.indexOf(marker);
    if (i < 0) return ["bulunamadi: " + marker];
    let k = src.lastIndexOf("{", i);
    let d = 0;
    for (let j = k; j < src.length; j++) {
      if ("{[(".includes(src[j])) d++;
      else if ("}])".includes(src[j])) {
        d--;
        if (d === 0) {
          const inner = src.slice(k + 1, j);
          /* Yalniz UST duzey: ic ice nesneler atlanarak taranir. */
          const out = [];
          let dd = 0;
          let buf = "";
          for (const c of inner) {
            if ("{[(".includes(c)) dd++;
            else if ("}])".includes(c)) dd--;
            if (c === "," && dd === 0) { out.push(buf); buf = ""; } else buf += c;
          }
          out.push(buf);
          /* Kisa yazim da sayilir (`mastered,` gibi): iki nokta arananinca
             sunucunun gonderdigi alan "eksik" gorunuyordu. */
          return [...new Set(out.map((x) => (x.match(/^\s*(\w+)\s*(?::|$)/) ?? [])[1]).filter(Boolean))].sort();
        }
      }
    }
    return ["okunamadi: " + marker];
  };
  const typeFields = (p, name) => {
    const x = strip(read(p));
    const i = x.indexOf("export type " + name + " =");
    if (i < 0) return ["bulunamadi: " + name];
    let k = x.indexOf("{", i);
    let d = 0;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) {
        return [...new Set([...x.slice(k, j + 1).matchAll(/[{;\n]\s*(\w+)\??:/g)].map((m) => m[1]))].sort();
      }
    }
    return ["okunamadi: " + name];
  };
  const ciftYon = (baslik, sunucu, istemci) => {
    const eksik = sunucu.filter((a) => !istemci.includes(a));
    const fazla = istemci.filter((a) => !sunucu.includes(a));
    sameList(baslik, eksik.length ? eksik : ["ayrisma yok"], ["ayrisma yok"], "mobilde eksik", "beklenen");
    sameList(baslik + " (ters)", fazla.length ? fazla : ["ayrisma yok"], ["ayrisma yok"], "mobilde fazla", "beklenen");
  };
  ciftYon("/api/me alanlari", govde("src/app/api/me/route.ts", "name: profile.displayName"), typeFields("mobile/src/lib/useMe.ts", "Me"));

  /* Rozet satiri: sunucu tarafinda `AchievementRow` alanlari + tanimdan
     gelenler (`...def`). Tanim alanlari `AchievementDef`de yaziyor. */
  const rowWeb = [...new Set([
    ...typeFields("src/lib/achievements.ts", "AchievementRow"),
    ...typeFields("src/lib/achievements.ts", "AchievementDef"),
  ])].filter((a) => !["metric", "titleKey", "hintKey"].includes(a)).sort();
  ciftYon("rozet satiri alanlari", rowWeb, typeFields("mobile/src/data/achievements.ts", "Achievement"));
}

/* ── 28. sosyal hata kodlarinin karsiligi ──────────────────────────────────
 * Sunucunun donebildigi HER hata kodunun iki istemcide de bir cumlesi olmali.
 * Haritada olmayan kod ikisinde de "baglanti kurulamadi"ya dusuyor - yanlis
 * teshis: kullanici sebebini bilmeden ayni islemi tekrar deniyor. Webde tam
 * bu yasandi ve `bio_invalid` sonradan eklendi (bkz. lib/social/client
 * yorumu); kod eklenirken haritalarin unutulmasini bir sey engellemiyordu.
 *
 * Kodlar uc yerden toplaniyor: `new SocialError("...")`, `fail("...")` ve
 * dogrudan yazilan `error: "..."`. `failed` yalnizca WEBIN haritasinda:
 * sunucu kodu degil, istemcinin kendi ag hatasi sentinel'i (mobilde
 * `ApiError` olmayan her sey ayni yere dusuyor). */
{
  const dirs = ["src/app/api/social", "src/lib/social"];
  const codes = new Set();
  const walk = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      if (e.isDirectory()) walk(d + "/" + e.name, out);
      else if (e.name.endsWith(".ts")) out.push(d + "/" + e.name);
    }
    return out;
  };
  for (const d of dirs) {
    for (const f of walk(d)) {
      const src = read(f);
      for (const m of src.matchAll(/new SocialError\(\s*"([a-z_]+)"/g)) codes.add(m[1]);
      for (const m of src.matchAll(/\bfail\(\s*"([a-z_]+)"/g)) codes.add(m[1]);
      for (const m of src.matchAll(/error:\s*"([a-z_]+)"/g)) codes.add(m[1]);
    }
  }
  const harita = (p, name) => {
    const src = read(p);
    const i = src.indexOf("const " + name);
    if (i < 0) return new Set(["bulunamadi: " + name]);
    const blok = src.slice(i, src.indexOf("};", i));
    return new Set([...blok.matchAll(/^\s*(\w+):/gm)].map((m) => m[1]));
  };
  const mob = harita("mobile/src/api/social.ts", "ERROR_KEY");
  const web = harita("src/lib/social/client.ts", "ERROR_KEYS");
  const sunucu = [...codes].sort();
  const eksik = (m) => {
    const e = sunucu.filter((c) => !m.has(c));
    return e.length ? e : ["kapsam tam"];
  };
  sameList("sosyal hata kodlari (mobil)", eksik(mob), ["kapsam tam"], "eslenmeyen", "beklenen");
  sameList("sosyal hata kodlari (web)", eksik(web), ["kapsam tam"], "eslenmeyen", "beklenen");
  /* Iki haritanin kendisi de ayni olmali; tek fark webin `failed` sentinel'i. */
  sameSet("sosyal hata haritalari", [...mob], [...web].filter((c) => c !== "failed"));
}

/* ── 29. sosyal istemci yuzeyi (yol + yontem + istek govdesi) ──────────────
 * Iki `social` nesnesi yirmi bes cagriyi ayni adla tasiyor. Bugune kadar
 * yalniz CEVAP tipleri olculuyordu (bkz. 26); ISTEK tarafi - yol, HTTP
 * yontemi ve govdedeki alanlar - hic olculmuyordu. Bir tarafa alan eklenip
 * otekine eklenmezse sunucu onu sessizce dusuruyor: derleme kirilmiyor,
 * istek 200 donuyor, yalnizca o ayar hic uygulanmiyor.
 *
 * Karsilastirma metin uzerinde: `call<...>` / `api<...>` tip parametreleri
 * atiliyor (iki tarafta ayri tip ADLARI olabilir, sozlesme ayni), `json(` ile
 * `j(` ortak `BODY(` adina cekiliyor, bosluk tekleniyor. Geriye yol dizgesi,
 * yontem ve govde ifadesi kaliyor - degisen her sey ayrisma. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  /* `fn<...>(` -> `CALL(`; acili ayraclar ELLE dengeleniyor cunku tip
     parametresinin icinde virgul de `{}` de olabiliyor. */
  const dropGenerics = (x, fn) => {
    let out = "";
    let i = 0;
    for (;;) {
      const k = x.indexOf(fn + "<", i);
      if (k < 0) { out += x.slice(i); break; }
      out += x.slice(i, k) + "CALL";
      let j = k + fn.length;
      let d = 0;
      for (; j < x.length; j++) {
        if (x[j] === "<") d++;
        else if (x[j] === ">" && --d === 0) { j++; break; }
      }
      i = j;
    }
    return out.split(fn + "(").join("CALL(");
  };
  const sigs = (p, fn) => {
    const x = dropGenerics(strip(read(p)), fn);
    const i = x.indexOf("export const social = {");
    if (i < 0) return {};
    let k = x.indexOf("{", i);
    let d = 0;
    let end = -1;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) { end = j; break; }
    }
    const body = x.slice(k + 1, end);
    const out = {};
    d = 0;
    let buf = "";
    const parts = [];
    for (const c of body) {
      if ("{[(".includes(c)) d++;
      else if ("}])".includes(c)) d--;
      if (c === "," && d === 0) { parts.push(buf); buf = ""; } else buf += c;
    }
    parts.push(buf);
    for (const part of parts) {
      const m = part.match(/^\s*(\w+)\s*:/);
      if (!m) continue;
      out[m[1]] = part.slice(part.indexOf(":") + 1).replace(/\bjson\(/g, "BODY(").replace(/\bj\(/g, "BODY(").replace(/\s+/g, " ").trim();
    }
    return out;
  };
  const w = sigs("src/lib/social/client.ts", "call");
  const m = sigs("mobile/src/api/social.ts", "api");
  sameSet("sosyal istemci cagri adlari", Object.keys(m), Object.keys(w));
  const ayrisan = Object.keys(w).filter((k) => k in m && w[k] !== m[k]);
  sameList("sosyal istemci cagri govdeleri", ayrisan.length ? ayrisan : ["ayrisma yok"], ["ayrisma yok"], "ayrisan", "beklenen");
}

/* ── 30. sosyal gorunum tiplerinin alanlari ────────────────────────────────
 * 26. bolum ADI AYNI olan bes tipi olcuyordu. Sosyal katmanin geri kalan on
 * bir tipi iki tarafta AYRI ADLA duruyor (webde `...View` soneki) ve o yuzden
 * hicbir kapiya girmiyordu - oysa hepsi ayni ucun cevabi.
 *
 * `BoardView` istisnasi: web satiri tipin ICINDE yaziyor, mobil `BoardRow`
 * diye ayirmis. Ikisi ayni sozlesme, o yuzden mobil tarafta iki tipin alanlari
 * birlestiriliyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const block = (src, name) => {
    const x = strip(src);
    const i = x.indexOf("export type " + name + " =");
    if (i < 0) return null;
    let k = x.indexOf("{", i);
    if (k < 0) return null;
    let d = 0;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) return x.slice(k, j + 1);
    }
    return null;
  };
  const flds = (src, ...names) => {
    const all = [];
    for (const n of names) {
      const b = block(src, n);
      if (b === null) return ["bulunamadi: " + n];
      all.push(...[...b.matchAll(/[{;\n]\s*(\w+)\??:/g)].map((mm) => mm[1]));
    }
    return [...new Set(all)].sort();
  };
  const wc = read("src/lib/social/client.ts");
  const mo = read("mobile/src/api/social.ts");
  /* [web adi, mobil adlari...] */
  const PAIRS = [
    ["SocialMeView", ["SocialMe"]],
    ["FriendsView", ["FriendsView"]],
    ["PendingView", ["PendingView"]],
    ["SearchHitView", ["SearchHit"]],
    ["SuggestionView", ["Suggestion"]],
    ["BoardView", ["BoardView", "BoardRow"]],
    ["LeagueRowView", ["LeagueRow"]],
    ["LeagueView", ["LeagueView"]],
    ["NotificationView", ["NotificationView"]],
    ["PublicProfileView", ["PublicProfileView"]],
  ];
  for (const [wn, mns] of PAIRS) {
    const w = flds(wc, wn);
    const m = flds(mo, ...mns);
    const eksik = w.filter((a) => !m.includes(a));
    const fazla = m.filter((a) => !w.includes(a));
    sameList("sosyal " + wn + " alanlari", eksik.length ? eksik : ["ayrisma yok"], ["ayrisma yok"], "mobilde eksik", "beklenen");
    sameList("sosyal " + wn + " alanlari (ters)", fazla.length ? fazla : ["ayrisma yok"], ["ayrisma yok"], "mobilde fazla", "beklenen");
  }
}

/* ── 31. tepki ikonlari ────────────────────────────────────────────────────
 * 14. bolum tepkilerin RENGINI olcuyor, 13. bolum turlerini; CIZIMI hicbir
 * kapiya girmiyordu. Ayni tepkinin iki platformda ayni ikonu olmali - renk
 * bir kez ayrismisti (`star`), ikon da ayrisabilir ve fark yalniz ekran
 * goruntusunde gorunur.
 *
 * Web `REACTION_ICON` bir tablo, mobil `ReactionGlyph` bir `switch`; ikisi de
 * tur -> bilesen ADI olarak okunuyor. Mobilin `default` dali `wow` (turler
 * sirasindaki son uye), webin tablosunda karsiligi acikca yaziyor. */
{
  const kinds = [...read("src/lib/social/types.ts").matchAll(/export const REACTION_KINDS = \[([^\]]+)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/"(\w+)"/g)].map((x) => x[1]));
  const webSrc = read("src/components/social/reaction-icons.tsx");
  const webSeg = webSrc.slice(webSrc.indexOf("export const REACTION_ICON"));
  const web = new Map([...webSeg.slice(0, webSeg.indexOf("};")).matchAll(/(\w+):\s*(\w+Icon)/g)].map((m) => [m[1], m[2]]));
  const mobSrc = read("mobile/src/social/common.tsx");
  const mobSeg = mobSrc.slice(mobSrc.indexOf("export function ReactionGlyph"));
  const mobBody = mobSeg.slice(0, mobSeg.indexOf("\n}"));
  const mob = new Map([...mobBody.matchAll(/case "(\w+)":\s*return <(\w+Icon)/g)].map((m) => [m[1], m[2]]));
  const fallback = (mobBody.match(/default:\s*return <(\w+Icon)/) ?? [])[1];
  const fmt = (get) => kinds.map((k) => k + ":" + (get(k) ?? "?"));
  sameList("tepki ikonlari", fmt((k) => mob.get(k) ?? fallback), fmt((k) => web.get(k)));
}

/* ── 32. akis kartinin olay karosu ─────────────────────────────────────────
 * Kart NEYIN kutlandigini karonun ikonu ve rengiyle soyluyor: seri kilometre
 * tasi, basarim, lig birinciligi ve ortak gorev aksi halde tipatip ayni
 * gorunuyor ve fark yalniz cumlenin icinde kaliyor. Iki tarafin tablosu
 * "birebir" diye yaziliydi ama hicbir kapi bakmiyordu.
 *
 * Renk adlari 14. bolumdeki ayni ROLE haritasiyla cevriliyor (web CSS
 * belirteci, mobil palet alani). `default` dali iki tarafta da var ve
 * karsilastirmaya "default" adiyla giriyor - tanimadigi olay turunde ikisinin
 * ayni yedegi cizmesi gerekiyor. */
{
  const ROLE = { brand: "primary", mint: "success", rose: "danger", flame: "streak", sky: "info", violet: "accent" };
  const webSrc = read("src/components/social/feed.tsx");
  const mobSrc = read("mobile/src/social/FeedList.tsx");
  const seg = (src, marker) => {
    const i = src.indexOf(marker);
    if (i < 0) return "";
    return src.slice(i, src.indexOf("\n}", i));
  };
  const w = seg(webSrc, "function eventTile");
  const m = seg(mobSrc, "function eventTile");
  const webRows = [
    ...[...w.matchAll(/case "(\w+)":\s*return \{ Icon: (\w+Icon), tint: "var\(--color-(\w+)\)" \}/g)].map((x) => [x[1], x[2], ROLE[x[3]] ?? x[3]]),
    ...[...w.matchAll(/default:\s*return \{ Icon: (\w+Icon), tint: "var\(--color-(\w+)\)" \}/g)].map((x) => ["default", x[1], ROLE[x[2]] ?? x[2]]),
  ];
  const mobRows = [
    ...[...m.matchAll(/case "(\w+)":\s*return \{ icon: (\w+Icon), tint: colors\.(\w+) \}/g)].map((x) => [x[1], x[2], x[3]]),
    ...[...m.matchAll(/default:\s*return \{ icon: (\w+Icon), tint: colors\.(\w+) \}/g)].map((x) => ["default", x[1], x[2]]),
  ];
  const fmt = (rows) => rows.map(([k, i, t]) => k + ":" + i + "/" + t);
  sameList("akis olay karosu", fmt(mobRows), fmt(webRows));
}

/* ── 33. kelimenin turu ve cogul notu ──────────────────────────────────────
 * `typLabel` ve `grammarNote` iki tarafta AYNI kelimeye ayni seyi demeli:
 * ayrisirlarsa ayni kelime bir uygulamada "isim", otekinde "diger" olur ya da
 * cogulu iki turlu yazilir. Kurallar mobile yeni kopyalandi (bkz. 11.80) ve
 * kopya en cok kopyalandigi gun dogrudur.
 *
 * Karsilastirma DESENLER uzerinde: her iki govdedeki duzenli ifadeler ve
 * sozluk anahtarlari sirayla. Ceviri cagrisinin bicimi farkli
 * (`translate(lang, k)` <-> `t(k)`) ama anahtar ADI ayni, o yuzden anahtarlar
 * ayri ayri cikariliyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const fn = (p, name) => {
    const x = strip(read(p));
    const i = x.indexOf("export function " + name);
    if (i < 0) return "";
    const j = x.indexOf("\n}", i);
    return x.slice(i, j < 0 ? undefined : j);
  };
  const keys = (b) => [...b.matchAll(/"(words\.[\w.]+)"/g)].map((m) => m[1]);
  /* Duzenli ifade govdeleri: `.test(`/`.match(`/`.exec(` ile kullanilanlar ve
     bir degiskene atananlar. Capa aranmiyor - `typLabel`in mastar eki deseni
     `^` ile baslamiyor. */
  const regexes = (b) => [
    ...[...b.matchAll(/(\/(?:[^/\\\n]|\\.)+\/[gimsuy]*)\s*\.(?:test|match|exec)\(/g)].map((m) => m[1]),
    ...[...b.matchAll(/=\s*(\/(?:[^/\\\n]|\\.)+\/[gimsuy]*)/g)].map((m) => m[1]),
  ];
  for (const [name, wp, mp] of [
    ["typLabel", "src/components/games/types.ts", "mobile/src/game/wordGrammar.ts"],
    ["grammarNote", "src/components/games/types.ts", "mobile/src/game/wordGrammar.ts"],
  ]) {
    const w = fn(wp, name);
    const m = fn(mp, name);
    sameList("dilbilgisi " + name + " anahtarlari", keys(m), keys(w));
    sameList("dilbilgisi " + name + " desenleri", regexes(m), regexes(w));
  }
  /* Umlaut govdesi: webin `lib/german` icindeki islev, mobilde ayni dosyada
     yerel bir kopya. Harf haritasi ve "au" kurali ayni kalmali. */
  const um = (p) => {
    const x = strip(read(p));
    const i = x.indexOf("function umlautStem");
    const j = x.indexOf("\n}", i);
    return x
      .slice(i, j)
      .replace(/\s+/g, " ")
      /* Son virgul ve ayrac ici bosluklar teklenir: iki taraf ayni haritayi
         farkli bicimlendirmis olabilir, onemli olan degerler. */
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/([{[])\s+/g, "$1")
      .replace(/\s+([}\]])/g, "$1")
      .replace(/^export /, "")
      .trim();
  };
  sameList("umlaut govdesi", [um("mobile/src/game/wordGrammar.ts")], [um("src/lib/german.ts")]);
}

/* ── 34. deneme sinavi hedef etiketleri ────────────────────────────────────
 * Sonuc ekranindaki "hedefe gore" kirilimi. Hedef ICERIKTEN geliyor, kapali
 * bir kumeden degil: iki taraf da adi sozluk anahtarina cevirmek zorunda ve
 * tanimadigi hedefte HAM ADI yazmali. Mobil anahtari elle kuruyordu
 * (`goal_${g.goal}`) ve sozlukte karsiligi olmayan hedefte anahtarin kendisi
 * ekrana cikiyordu.
 *
 * Iki harita adiyla karsilastiriliyor; kume ayrisirsa bir tarafta okunur bir
 * etiket, otekinde ham ad kalir. */
{
  const map = (p) => {
    const src = read(p);
    const i = src.indexOf("const GOAL_KEYS");
    if (i < 0) return ["bulunamadi: GOAL_KEYS @ " + p];
    const blok = src.slice(i, src.indexOf("};", i));
    return [...blok.matchAll(/(\w+):\s*"([^"]+)"/g)].map((m) => m[1] + "=" + m[2]).sort();
  };
  sameList("deneme sinavi hedef etiketleri", map("mobile/src/screens/MockExamScreen.tsx"), map("src/components/mock-exam-player.tsx"));
}

console.log(
  fails === 0
    ? "\n" + C.ok + C.b + "KAYIT DEFTERLERI ESIT" + C.off + "\n"
    : "\n" + C.bad + C.b + fails + " AYRISMA" + C.off + "\n",
);
process.exit(fails === 0 ? 0 : 1);

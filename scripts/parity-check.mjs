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
    ["VOICES", "src/lib/tts/voices.ts", "mobile/src/lib/voices.ts"],
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
  /* UST DUZEY alanlar; ic ice nesneler ATLANIR - govde ayiklayicisi da ust
     duzey okuyor ve `levels` gibi bir alanin SATIR alanlari ("niveau",
     "seen", ...) orada gorunmuyor. Ikisini ayni duzeyde tutmak sart, yoksa
     ic ice her alan "mobilde fazla" cikar. */
  const typeFields = (p, name) => {
    const x = strip(read(p));
    const i = x.indexOf("export type " + name + " =");
    if (i < 0) return ["bulunamadi: " + name];
    let k = x.indexOf("{", i);
    let d = 0;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) {
        const govde = x.slice(k + 1, j);
        const out = [];
        let dd = 0;
        let buf = "";
        for (const c of govde) {
          if ("{[(".includes(c)) dd++;
          else if ("}])".includes(c)) dd--;
          if (c === ";" && dd === 0) { out.push(buf); buf = ""; } else buf += c;
        }
        out.push(buf);
        return [...new Set(out.map((seg) => (seg.match(/^\s*(\w+)\??\s*:/) ?? [])[1]).filter(Boolean))].sort();
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
  sameList("umlaut govdesi", [um("mobile/src/lib/german.ts")], [um("src/lib/german.ts")]);
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

/* ── 35. gramer turetmesinin kurallari ─────────────────────────────────────
 * Unite gramer alistirmasi IKI TARAFTA DA ders adimlarindan turetiliyor
 * (hukum adimlari ve uretim hedefleri) ve iki gerceklestirme ayri dosyada
 * duruyor. Ayrisirlarsa ayni unite iki uygulamada baska sorular verir -
 * ogrenci webde gecip mobilde kalabilir.
 *
 * Olculen sayilar: dizme uzunlugunun alt/ust siniri, hukum/dizme bolusmesi
 * ve tohum etiketleri. Metinler olculmuyor - ikisi de artik sozlukten
 * geliyor ve dil basina ayri. */
{
  const nums = (p, fn) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf(fn);
    if (i < 0) return ["bulunamadi: " + fn];
    const body = src.slice(i, src.indexOf("\n}", i));
    return [
      "alt=" + ((body.match(/length\s*<\s*(\d+)/) ?? [])[1] ?? "?"),
      "ust=" + ((body.match(/length\s*>\s*(\d+)/) ?? [])[1] ?? "?"),
      "bolusme=" + ((body.match(/Math\.ceil\(count\s*\/\s*(\d+)\)/) ?? [])[1] ?? "?"),
      "tohum=" + [...body.matchAll(/\|(judge|order)`/g)].map((m) => m[1]).join("+"),
      /* Yalniz ternary'nin KUYRUGU: alan adi iki tarafta ayri yazilıyor
         (`e.answer` <-> `step.expect.answer`), onemli olan hangi sikkin
         dogru sayildigi. */
      "yanit=" + ((body.match(/answer:\s*[\w.]+\s*(\?\s*\d+\s*:\s*\d+)/) ?? [])[1] ?? "?").replace(/\s+/g, " ").trim(),
    ];
  };
  sameList(
    "gramer turetmesi",
    nums("mobile/src/game/immersionQuiz.ts", "export function deriveGrammar"),
    nums("src/lib/immersion/grammar.ts", "export function deriveGrammar"),
  );
}

/* ── 36. kurs diline ait sabit sik cifti ───────────────────────────────────
 * `["Richtig", "Falsch"]` KODA gomuluyken Ingilizce kursta da Almanca
 * cikiyordu (bkz. 11.84) ve HICBIR kapi bunu goremiyordu: Turkce harf
 * tasimadigi icin `i18n-hardcoded` atliyor, sozluk anahtari olmadigi icin
 * `i18n:check` atliyor.
 *
 * Kural: bu ciftler yalniz ICERIK dosyalarinda ve kendi tablolarinda
 * (`MOCK_LABELS`) yazili olabilir; kodda gecerlerse kurs dili sabitlenmis
 * demektir. Yorumlar ayiklaniyor - gerekcesini yazmak kapiyi kirmamali. */
{
  const PAIRS = [["Richtig", "Falsch"], ["Ja", "Nein"], ["True", "False"], ["Yes", "No"]];
  const SKIP = /\/(content|data|i18n|mock-exams|generated|__tests__)\//;
  const walk = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules/.test(p)) walk(p, out); }
      else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
    return out;
  };
  /* Yorumlar satir sayisini koruyarak silinir (satir numarasi anlamli kalsin). */
  const strip = (src) => {
    let out = "";
    let i = 0;
    let mode = 0;
    while (i < src.length) {
      const c = src[i];
      const n = src[i + 1];
      if (mode === 0) {
        if (c === "/" && n === "/") { mode = 1; i += 2; continue; }
        if (c === "/" && n === "*") { mode = 2; i += 2; continue; }
        out += c;
        i++;
      } else if (mode === 1) {
        if (c === "\n") { mode = 0; out += c; }
        i++;
      } else {
        if (c === "*" && n === "/") { mode = 0; i += 2; continue; }
        if (c === "\n") out += c;
        i++;
      }
    }
    return out;
  };
  const hits = [];
  for (const root of ["src", "mobile/src"]) {
    for (const f of walk(root)) {
      if (SKIP.test("/" + f + "/")) continue;
      const src = strip(read(f));
      for (const [a, b] of PAIRS) {
        const re = new RegExp('"' + a + '"\\s*,\\s*"' + b + '"');
        if (re.test(src)) hits.push(f + ' ["' + a + '", "' + b + '"]');
      }
    }
  }
  sameList("kursa gomulu sik cifti", hits.length ? hits : ["gomulu cift yok"], ["gomulu cift yok"], "kodda", "beklenen");
}

/* ── 37. iki tarafta ayni adi tasiyan SABITLER (sayi + dizge) ──────────────
 * 22. bolum LISTELERI karsilastiriyor; tek basina duran sayilar disarida
 * kaliyordu. `DANGER_SECONDS` tam boyle ayrismisti: web 8, mobil 10 - ve
 * mobil yorumu "web ile ayni" DIYORDU, yani ayrisma iki taraftan da
 * gorunmuyordu.
 *
 * Bu bolum elle bakim istemiyor: iki agacta `const AD = <sayi>;` bicimindeki
 * her sabit toplaniyor ve ADI IKISINDE DE gecenler karsilastiriliyor. Yeni
 * bir ortak sabit yazildigi anda kapiya giriyor.
 *
 * Icerik/uretilmis dizinler disarida: oradaki sayilar mufredat verisi. */
{
  /* Ad tek basina sozlesme tasimayan, iki dosyanin bambaska isler icin
     kullanabildigi genel adlar. `KEY` webde beceri ilerlemesinin depolama
     anahtari, mobilde onboarding tercihlerininki - ayni ad, ayri is. */
  const GENERIC = new Set(["KEY", "PREFIX", "SUFFIX", "MAX", "MIN", "LIMIT", "SIZE", "BASE", "URL", "PATH", "NAME", "TTL", "DELAY", "TIMEOUT", "COUNT", "STEP"]);
  const walk = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|\/content|\/generated|__tests__|\/i18n/.test("/" + p)) walk(p, out); }
      else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
    return out;
  };
  /*
   * AYNI AD BIR AGACTA IKI KEZ GECEBILIYOR ve o zaman "adi ayni olan sabit"
   * artik tek bir sey degil: `DANGER_SECONDS` webde hem `boss-player`da
   * (patron turu, mobilin `BossScreen`iyle eslesen) hem `challenge-player`da
   * (mobilde KARSILIGI OLMAYAN sure-kazanma modu) yazili ve ikisinin dogru
   * degeri farkli. Once bu bolum "son tanimi" aliyordu ve yanlis ciftle
   * karsilastirip web tarafinda bir ayar degistirtti (11.86'nin duzeltmesi:
   * 11.94).
   *
   * Kural: bir ad bir agacta BIRDEN COK yerde tanimliysa karsilastirmaya
   * girmiyor, ayri bir satirda "belirsiz" diye bildiriliyor - hangi ciftin
   * kastedildigini kapi bilemez, insan bilir.
   */
  const grab = (root) => {
    const m = new Map();
    const coklu = new Set();
    for (const f of walk(root)) {
      for (const x of read(f).matchAll(/^\s*(?:export\s+)?const ([A-Z][A-Z0-9_]{2,})\s*(?::\s*number\s*)?=\s*(-?\d+(?:\.\d+)?)\s*;/gm)) {
        if (m.has(x[1]) && m.get(x[1]) !== x[2]) coklu.add(x[1]);
        m.set(x[1], x[2]);
      }
    }
    for (const k of coklu) m.delete(k);
    return { m, coklu };
  };
  const { m: w, coklu: wCok } = grab("src");
  const { m, coklu: mCok } = grab("mobile/src");
  const ortak = [...w.keys()].filter((k) => m.has(k) && !GENERIC.has(k)).sort();
  const ayrisan = ortak.filter((k) => w.get(k) !== m.get(k)).map((k) => k + ": mobil " + m.get(k) + " / web " + w.get(k));
  sameList("ortak sayisal sabitler", ayrisan.length ? ayrisan : ["ayrisma yok (" + ortak.length + ")"], ["ayrisma yok (" + ortak.length + ")"], "ayrisan", "beklenen");
  /*
   * BELIRSIZLER SESSIZCE DUSMESIN. Karsilastirmadan cikan her ad burada
   * yazili duruyor; yenisi cikarsa kapi kaliyor ve insan bakiyor - cunku
   * "ayni adin iki isi" ya mesru bir tesaduftur ya da adlandirma hatasidir,
   * ikisini kapi ayirt edemez. Bugunku yedisi de mesru: farkli uclarin hiz
   * sinirlari, farkli listelerin sayfa boyu, farkli modlarin esikleri.
   */
  const BELIRSIZ = ["DAILY_LIMIT", "DANGER_SECONDS", "MAX_CHARS", "MAX_TARGET", "MIN_CONFIDENCE", "PAGE_SIZE", "PASS_RATIO"];
  /* Dizge tarafinin belirsizleri: iki ayri "kapat" anahtari ve iki saglayicinin
     jeton adresi. Genel adlar (KEY, PREFIX) zaten GENERIC'te. */
  const BELIRSIZ_DIZGE = ["DISMISS_KEY", "TOKEN_URL"];
  const belirsiz = [...new Set([...wCok, ...mCok])].sort();
  sameSet("belirsiz sabit adlari", belirsiz, BELIRSIZ, "bulunan", "kayitli");

  /* Dizge ve mantiksal sabitler de ayni kuralla. `KEY` gibi genel adlar
     disarida (bkz. GENERIC): iki dosya ayni adi bambaska bir is icin
     kullanabiliyor ve ad tek basina sozlesme tasimiyor. */
  /* Sayisal bolumdeki ayni kural: bir ad bir agacta birden cok DEGERLE
     tanimliysa karsilastirmaya girmiyor (bkz. 11.94). */
  const grabStr = (root) => {
    const map = new Map();
    const coklu = new Set();
    for (const f of walk(root)) {
      for (const x of read(f).matchAll(/^\s*(?:export\s+)?const ([A-Z][A-Z0-9_]{2,})\s*(?::[^=\n]+)?=\s*("(?:[^"\\\\]|\\\\.)*"|true|false)\s*(?:as const)?\s*;/gm)) {
        if (map.has(x[1]) && map.get(x[1]) !== x[2]) coklu.add(x[1]);
        map.set(x[1], x[2]);
      }
    }
    for (const k of coklu) map.delete(k);
    return { map, coklu };
  };
  const { map: ws, coklu: wsCok } = grabStr("src");
  const { map: ms, coklu: msCok } = grabStr("mobile/src");
  const ortakS = [...ws.keys()].filter((k) => ms.has(k) && !GENERIC.has(k)).sort();
  const ayrisanS = ortakS.filter((k) => ws.get(k) !== ms.get(k)).map((k) => k + ": mobil " + ms.get(k) + " / web " + ws.get(k));
  sameList("ortak dizge sabitleri", ayrisanS.length ? ayrisanS : ["ayrisma yok (" + ortakS.length + ")"], ["ayrisma yok (" + ortakS.length + ")"], "ayrisan", "beklenen");
  const belirsizS = [...new Set([...wsCok, ...msCok])].filter((k) => !GENERIC.has(k)).sort();
  sameSet("belirsiz dizge sabit adlari", belirsizS, BELIRSIZ_DIZGE, "bulunan", "kayitli");
}

/* ── 38. sinav yazma bolumunun degerlendirme istegi ────────────────────────
 * Ayni kompozisyon iki uygulamada AYNI PUANI almali. Puani model veriyor ve
 * modele ne soylendigi istekte: gorev metni, kisitlar ve dil. Kisit listesi
 * "en az N kelime" satirini elle ekliyor - iki taraftan birinde unutulursa
 * ayni yazi bir uygulamada gecer, otekinde kalir ve sebebi hicbir yerde
 * gorunmez.
 *
 * Sozcugu sozcuguna degil, ISTEGIN SEKLI karsilastiriliyor: kisit ifadesi ve
 * `locale`. Alan adlari iki tarafta ayni (`task.constraints`, `answer.text`). */
{
  const sekil = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const c = (src.match(/constraints:\s*(\[[^\]]*\])/) ?? [])[1];
    const l = (src.match(/locale:\s*("(\w+)"|`[^`]*`)/) ?? [])[1];
    return [
      "kisit=" + (c ? c.replace(/\s+/g, " ").replace(/\b(item|w)\./g, "GOREV.") : "yok"),
      "dil=" + (l ?? "yok"),
    ];
  };
  sameList("sinav yazma degerlendirme istegi", sekil("mobile/src/screens/ExamScreen.tsx"), sekil("src/components/exam-player.tsx"));

  /* Ceviri turunun IKINCI SANSI: yerel hakem "yanlis" dediginde modele
     sorulan istek. Istem metni ("Cevir: ...") modele gidiyor, arayuze degil -
     iki tarafta da ham dizge olarak duruyor ve iki ham-metin tabaninda da
     yazili. Tabanlardaki muafiyetin kapisi bu olcum: istem, esikler ve dil
     ayrisirsa ayni cevap bir uygulamada kabul edilir, otekinde edilmez. */
  const ikinciSans = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const istem = (src.match(/prompt:\s*(`[^`]*`)/) ?? [])[1];
    return [
      "istem=" + (istem ? istem.replace(/\$\{[^}]*\}/g, "${}") : "yok"),
      "bekleme=" + ((src.match(/ASSESS_WAIT_MS\s*=\s*(\d+)/) ?? [])[1] ?? "yok"),
      "esik=" + ((src.match(/ASSESS_ACCEPT\s*=\s*(\d+)/) ?? [])[1] ?? "yok"),
      "soz=" + ((src.match(/split\(\/\\s\+\/\)\.length\s*>=\s*(\d+)/) ?? [])[1] ?? "yok"),
    ];
  };
  sameList("ceviri ikinci sansi", ikinciSans("mobile/src/game/rounds.tsx"), ikinciSans("src/components/games/translate-game.tsx"));

  /* Monolog (konusma) degerlendirmesi: ayni kayit iki uygulamada ayni puani
     almali. Istek sekli tikatipina ayni yazilmis - kisit satiri sure araligini
     ELLE kuruyor ve hedefler listesi ayni alandan geliyor. Gecme esigi de
     olculuyor: puani aldiktan sonra "gecti mi" karari ayrisirsa ayni kayit
     bir uygulamada egzersizi bitirir, otekinde bitirmez. */
  const monolog = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf("async function evaluate");
    const body = i < 0 ? "" : src.slice(i, src.indexOf("\n  }", i));
    const al = (re) => (body.match(re) ?? [])[1];
    return [
      "istem=" + (al(/prompt:\s*([\w.]+)/) ?? "yok"),
      "hedef=" + (al(/targets:\s*([\w.]+)\.map/) ?? "yok"),
      "kisit=" + (al(/constraints:\s*\[(`[^`]*`)/) ?? "yok").replace(/\$\{[^}]*\}/g, "${}"),
      "esik=" + (al(/overall\s*>=\s*(\d+)/) ?? al(/score\s*>=\s*(\d+)/) ?? "yok"),
    ];
  };
  sameList("monolog degerlendirmesi", monolog("mobile/src/game/skillLibrary.tsx"), monolog("src/components/skills/monologue-player.tsx"));
}

/* ── 39. ders isabet orani ─────────────────────────────────────────────────
 * Aynı derste aynı performans iki uygulamada AYNI yuzdeyi vermeli. Uc kural
 * birlikte belirliyor:
 *   1. hangi adimlar puanlaniyor (`produce` + `truefalse`),
 *   2. isabet ne zaman sayiliyor (yalniz ILK denemede),
 *   3. yuzde formulu.
 *
 * Ikincisi ayrismisti: mobil her dogruda sayiyordu, kacinci denemede
 * oldugundan bagimsiz - ucuncu denemede bilen ogrenci ilk denemede bilenle
 * ayni yuzdeyi aliyordu. Ekranin kendi olcumu ayrimi zaten biliyor
 * (`lesson_step` degeri 2/1), puan gormezden geliyordu. */
{
  /* `p` ekran/oynatici, `tanim` puanlanan adim yuklemi (mobilde ayri dosyada:
     `scoredSteps`; webde oynaticinin icinde iki kez yaziliyor). */
  const oku = (p, kaynak, tanim = p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const tsrc = read(tanim).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const sayilan = tsrc.match(/expect\?\.kind === "(\w+)" \|\| s\.expect\?\.kind === "(\w+)"/);
    /* Formul: 100 * min(dogru, toplam) / toplam */
    const formul = src.match(/Math\.round\(\(100 \* Math\.min\(([\w.]+), ([\w.]+)\)\) \/ \2\)/);
    return [
      "puanlanan=" + (sayilan ? sayilan[1] + "+" + sayilan[2] : "okunamadi"),
      "formul=" + (formul ? "100*min(d,t)/t" : "okunamadi"),
      "ilkdeneme=" + (kaynak.test(src) ? "evet" : "HAYIR"),
    ];
  };
  sameList(
    "ders isabet orani",
    oku("mobile/src/screens/LessonScreen.tsx", /if \(tries === 0\) setCorrect/, "mobile/src/data/lessons/index.ts"),
    oku("src/components/lessons/lesson-player.tsx", /ok && isFirstTry\) setCorrectCount/),
  );
}

/* ── 40. ogrenme uclarina gun GONDERILIYOR mu ──────────────────────────────
 * Uc `day` gelmezse SUNUCUNUN UTC gunune dusuyor (`clampDay`). Gece yarisina
 * yakin oynayan kullanicinin cevaplari yanlis gune yaziliyor: gunluk
 * istatistik ve seri o gunden hesaplaniyor. Kod tabanindaki kural bunu
 * bastan beri soyluyor ("yerel gun gonderilir") ama hicbir sey tutmuyordu -
 * yuruyus oynaticisi iki cagrisinda da gunu atliyordu, buyume raporu da.
 *
 * Kural: `searchParams.get("day")` okuyan OGRENME uclarina taraycidan giden
 * her GET adresi `day=` tasimali. Sosyal uclar disarida: haftayi sunucu
 * belirliyor ve iki istemci de bilerek gun gondermiyor (bkz. 29). */
{
  const OGRENME = ["session", "quests", "daily", "weekly", "growth"];
  const walk = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules/.test(p)) walk(p, out); }
      else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
    return out;
  };
  const eksik = [];
  for (const f of [...walk("src/components"), ...walk("src/lib")]) {
    const src = read(f).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    for (const m of src.matchAll(/["`]\/api\/(\w+)([^"`\n]*)["`]/g)) {
      if (!OGRENME.includes(m[1])) continue;
      const kuyruk = m[2];
      /* Adreste sorgu yoksa govdeyle gonderiliyor olabilir (POST); yalniz
         SORGULU adresler denetleniyor. */
      if (!kuyruk.startsWith("?")) continue;
      if (!kuyruk.includes("day=")) eksik.push(f + " -> /api/" + m[1] + kuyruk.slice(0, 40));
    }
  }
  sameList("ogrenme uclarina gun", eksik.length ? eksik : ["hepsi gun gonderiyor"], ["hepsi gun gonderiyor"], "gun yok", "beklenen");
}

/* ── 41. kalip kullanildi mi ───────────────────────────────────────────────
 * Dersin asil amaci kalibi KULLANMAK, yalniz gormek degil; ozet bunu
 * isaretliyor. Kural iki tarafta ayri dosyada kopyalanmis: govde cikarimi
 * ("Ich möchte …" -> "ich möchte"), en az uzunluk ve hangi turlarin
 * taranacagi. Ayrisirsa ayni konusma bir uygulamada kalibi kullanmis, otekinde
 * kullanmamis sayilir. */
{
  const kural = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf("function patternUsed");
    if (i < 0) return ["bulunamadi"];
    const body = src.slice(i, src.indexOf("\n}", i)).replace(/\s+/g, " ");
    return [
      "govde=" + ((body.match(/split\((\/[^)]+\/)\)/) ?? [])[1] ?? "yok"),
      "temizlik=" + ((body.match(/replace\((\/\[\^[^)]+\/gu)/) ?? [])[1] ?? "yok"),
      "enaz=" + ((body.match(/length < (\d+)/) ?? [])[1] ?? "yok"),
      "rol=" + ((body.match(/role === "(\w+)"/) ?? [])[1] ?? "yok"),
    ];
  };
  sameList("kalip kullanildi mi", kural("mobile/src/game/roleplay.ts"), kural("src/components/lessons/lesson-player.tsx"));
}

/* ── 42. niyet eslestirme (dialogue) ───────────────────────────────────────
 * Kapali temali senaryoda ogrencinin soyledigi, dallarin `match` koklerine
 * gore eslestiriliyor - model gerekmiyor. Kural mobile YENI kopyalandi
 * (cevrimdisi rol yapma portunun ilk adimi) ve bir kopya en cok kopyalandigi
 * gun dogrudur.
 *
 * Olculen: kisa kok siniri, kok arama kurali ve puanlama. Ayrisirsa ayni
 * cumle bir uygulamada dali tutar, otekinde tutmaz - yani ayni ders bir
 * tarafta ilerler, otekinde tikanir. */
{
  const kural = (p, fn) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf(fn);
    const body = i < 0 ? "" : src.slice(i, src.indexOf("\n}", i)).replace(/\s+/g, " ");
    return body;
  };
  const say = [
    "kisasinir=" + ((read("mobile/src/game/dialogue.ts").match(/WHOLE_WORD_MAX = (\d+)/) ?? [])[1] ?? "yok"),
    "contains=" + kural("mobile/src/game/dialogue.ts", "function contains").replace(/\breply\.match \?\? \[\]/, "reply.match"),
    "match=" + kural("mobile/src/game/dialogue.ts", "export function matchReply").replace(/\(reply\.match \?\? \[\]\)/, "reply.match"),
    "used=" + kural("mobile/src/game/dialogue.ts", "export function usedTargets"),
  ];
  const web = [
    "kisasinir=" + ((read("src/lib/dialogue.ts").match(/WHOLE_WORD_MAX = (\d+)/) ?? [])[1] ?? "yok"),
    "contains=" + kural("src/lib/dialogue.ts", "function contains"),
    "match=" + kural("src/lib/dialogue.ts", "export function matchReply"),
    "used=" + kural("src/lib/dialogue.ts", "export function usedTargets"),
  ];
  sameList("niyet eslestirme", say, web);

  /* Sozlu metnin normalizasyonu: iki tarafta ayni noktalama kumesi ve ayni
     kucultme yerelı. Umlaut BILEREK korunuyor (schön/schon). */
  const norm = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "noktalama=" + ((src.match(/const PUNCTUATION = (\/[^\n]+\/g)/) ?? [])[1] ?? "yok"),
      "govde=" + ((src.match(/export function normalizeSpoken[\s\S]*?return ([\s\S]*?);\s*\n\}/) ?? [])[1] ?? "yok").replace(/\s+/g, " ").replace(/lang === "de"/, "DE"),
    ];
  };
  sameList("sozlu metin normalizasyonu", norm("mobile/src/lib/speech.ts"), norm("src/lib/speech.ts"));
}

/* ── 43. cevrimdisi rol yapma ──────────────────────────────────────────────
 * Saglayici kapaliyken konusma ders verisinden oynaniyor. Iki gerceklestirme
 * ayri dosyada; ayrisirlarsa ayni ders bir uygulamada gecilebilir, otekinde
 * gecilemez (gecme kosulu konusmanin YAPILMASINI istiyor).
 *
 * Olculen: kalip esiginin uzunlugu, ozet puan formulu ve KARSI TARAFIN
 * cumleleri. Cumleler hedef DILE gore secilen bir tabloda: dordu de Almanca
 * SABITTI ve Ingilizce kursta da Almanca cikiyordu (11.96). */
{
  const kural = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const fn = (ad) => {
      const i = src.indexOf(ad);
      return i < 0 ? "yok" : src.slice(i, src.indexOf("\n}", i)).replace(/\s+/g, " ");
    };
    const coach = (() => {
      const i = src.indexOf("const COACH");
      if (i < 0) return "yok";
      return src.slice(i, src.indexOf("\n};", i)).replace(/\s+/g, " ");
    })();
    return [
      "uzunkok=" + ((fn("export function patternUsed").match(/length >= (\d+)/) ?? [])[1] ?? "yok"),
      "puan=" + ((fn("export function offlineSummary").match(/Math\.round\(\(100 \* \(([^)]+)\)\) \/ ([\w.]+)\)/) ?? []).slice(1).join("/") || "yok"),
      "koc=" + coach,
    ];
  };
  sameList("cevrimdisi rol yapma", kural("mobile/src/game/offlineRoleplay.ts"), kural("src/lib/lessons/offline-roleplay.ts"));
}

/* ── 44. olcum paritesi: istemciden atilan olaylar ─────────────────────────
 * Sunucudan atilan olaylar iki platforma da yaziliyor; ISTEMCIDEN atilanlar
 * platforma ozgu. Webin istemcisinden atilip mobilde hic atilmayan bir ad,
 * Androidde cevapsiz kalan bir soru demek - bes tanesi tam boyleydi
 * (11.97). Kalanlar web-ozel ve burada YAZILI: yenisi cikarsa kapi kaliyor
 * ve insan "bunun mobil yuzeyi var mi" diye bakiyor.
 *
 * Yorumlar ayiklaniyor: webin bir yorumunda gecen `track("exam_start", ...)`
 * ornegi taramada yanlis pozitif uretmisti. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const walk = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|\/content|\/generated|__tests__/.test("/" + p)) walk(p, out); }
      else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
    return out;
  };
  const atilan = (dirs, extra = []) => {
    const set = new Set();
    for (const d of dirs) for (const f of walk(d)) for (const m of strip(read(f)).matchAll(/\btrack\(\s*"([a-z_]+)"/g)) set.add(m[1]);
    for (const f of extra) for (const m of strip(read(f)).matchAll(/\btrack\(\s*"([a-z_]+)"/g)) set.add(m[1]);
    return set;
  };
  const sunucu = atilan(["src/app/api", "src/lib"]);
  const web = atilan(["src/components", "src/app"]);
  const mob = atilan(["mobile/src"], ["mobile/App.tsx"]);
  /* Web istemcisine ozgu olmasi MESRU olanlar; her biri bir yuzey farki. */
  const WEB_OZEL = [
    "challenge_play", //        sure-kazanma modu mobilde yok
    "client_error", //          Next hata siniri
    "coach_show", //            koc baloncugu mobilde yok
    "feedback_why_opened", //   mobil "neden"i her zaman gosteriyor, acma eylemi yok
    "install_prompt", //        PWA kurulum onerisi
    "invite_open", //           tarayici olcum katmani
    "page_view", //             tarayici olcum katmani
    "panel_open", //            tarayici olcum katmani
    "push_open", //             tarayici olcum katmani
    "push_optin", //            tarayici bildirim istemi
    "sound_toggle", //          mobilde ses anahtari yok (sistem sesi)
    "stage_done", //            mobilde etap duraklamasi yok
    "time_spent", //            tarayici olcum katmani
    "walk_capture", //          tarayici mikrofon yolu tanilamasi
    "walk_listen", //           tarayici mikrofon yolu tanilamasi
    "walk_switch", //           tarayici mikrofon yolu tanilamasi
  ];
  const eksik = [...web].filter((n) => !mob.has(n) && !sunucu.has(n)).sort();
  sameSet("olcum paritesi (yalniz web istemcisinde)", eksik, WEB_OZEL, "bulunan", "kayitli");
}

/* ── 45. beceri egzersizinin madde sayisi ──────────────────────────────────
 * Liste satiri "3 madde" yaziyor ve XP hesabi da ayni sayiyi kullaniyor
 * (`xpFor`). Konusma UC bicimde geliyor - soyleyis gorevleri, diyalog turlari
 * ya da tek monolog - ve ucu ayri sayiliyor; kural iki tarafta ayri dosyada
 * kopyalanmis. Ayrisirsa ayni egzersiz iki uygulamada baska madde sayisi
 * gosterir ve XP tavani da kayar. */
{
  const kural = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf("export function itemCount");
    if (i < 0) return ["bulunamadi"];
    const body = src.slice(i, src.indexOf("\n}", i)).replace(/\s+/g, " ");
    const dal = (re) => (body.match(re) ?? [])[1] ?? "yok";
    return [
      /* Mobil tipte alanlar istege bagli, o yuzden `?.` ve `?? 0` var;
         SAYILAN sey ayni (gorev listesinin uzunlugu). Karsilastirmada
         isaretler atiliyor. */
      "yazma=" + dal(/skill === "writing"\) return ([\w.?\[\] ]+?)(?:;| \?\?)/).replace(/\?\./g, "."),
      "konusma_diyalog=" + (/dialogue/.test(body) ? "var" : "yok"),
      "konusma_monolog=" + (/monologue/.test(body) ? "1" : "yok"),
      "varsayilan=" + (/questions/.test(body) ? "questions" : "yok"),
    ];
  };
  sameList("beceri madde sayisi", kural("mobile/src/data/skills/index.ts"), kural("src/lib/skills/meta.ts"));
}

/* ── 46. etkinlik seridi: isi basamaklari ve pencere ───────────────────────
 * Son iki haftanin calisma ritmi iki tarafta AYRI dosyada cizilliyor. Gun
 * sayisi ve taban yuzdesi adlandirilmis sabit oldugu icin 37 zaten
 * karsilastiriyor; ISI TABLOSU dizi oldugu icin oraya girmiyor ve elle
 * kopyalanmis durumda. Ayrisirsa ayni calisma iki uygulamada baska
 * yogunlukta gorunur - "bu hafta daha mi az calistim" sorusuna iki ayri
 * cevap veren bir grafik, hic olmayandan kotudur. */
{
  const rampa = (p) => {
    const src = read(p);
    const m = src.match(/const HEAT_RAMP[^=]*=\s*(\[[^;]*\])\s*;/);
    return m ? [m[1].replace(/\s+/g, "")] : ["bulunamadi: " + p];
  };
  sameList("isi basamaklari", rampa("mobile/src/screens/ProgressScreen.tsx"), rampa("src/components/progress-view.tsx"));
}

/* ── 47. yapabildiklerim: beceri kodu -> etiket anahtari ──────────────────
 * `/api/cando` beceriyi CEFR koduyla gonderiyor (RD/LS/WR/SPK/GR) ve iki
 * taraf da kodu kendi tablosundan cevirmek zorunda. Mobil tablo UZUN ADLARLA
 * yaziliydi ("reading"), yani arama her satirda bosa dusuyor ve ifadenin
 * altinda ceviri yerine ham kod yaziyordu - tip `string` oldugu icin ne tsc
 * ne lint goruyordu. Kapi iki tabloyu satir satir esliyor. */
{
  const tablo = (p, ad) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf(ad);
    if (i < 0) return ["bulunamadi: " + ad];
    const govde = src.slice(src.indexOf("{", i), src.indexOf("}", i) + 1);
    return [...govde.matchAll(/(\w+)\s*:\s*"([^"]+)"/g)].map((m) => m[1] + "=" + m[2]).sort();
  };
  sameList(
    "cando beceri etiketleri",
    tablo("mobile/src/screens/CandoScreen.tsx", "const SKILL_KEY"),
    tablo("src/lib/cando.ts", "const CANDO_SKILL_LABEL_KEYS"),
  );
}

/* ── 48. rozet duvari: bilinmeyen grup atilmiyor ──────────────────────────
 * Sunucu `GROUP_ORDER`da OLMAYAN bir grup gonderirse o rozetler hesaplanip
 * aciliyor ve sayiya giriyor; duvar listenin uzerinde donuyorsa hicbir
 * bolumde CIKMIYOR ve hata da vermiyor. Iki taraf da satirlari kovalayip
 * bilinmeyen grubu sona eklemek zorunda; kapi ikisinde de o dusme yolunu
 * ariyor. */
{
  const kova = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "GROUP_ORDER ile kuruluyor=" + (/new Map<[^>]*>\(GROUP_ORDER\.map/.test(src) ? "evet" : "hayir"),
      "bilinmeyen grup ekleniyor=" + (/else\s+g\.set\(/.test(src) ? "evet" : "hayir"),
    ];
  };
  sameList(
    "rozet grup kovalari",
    kova("mobile/src/screens/AchievementsScreen.tsx"),
    kova("src/components/achievement-wall.tsx"),
  );
}

/* ── 49. ornek cumle kurali ───────────────────────────────────────────────
 * Havuzdaki `beispiel` alani 497 maddede numarali bir derleme ("1. … 2. …"),
 * 53 maddede cumleler bosluksuz egik cizgiyle ayrilmis. Web bunlari tek
 * cumleye indiriyor ve nokta ile biten kisaltmalari ("vor ca. 6000 Jahren")
 * cumle sonu saymiyor; mobil kopyasi yalnizca satir sonuna bakiyordu ve ayni
 * kelime iki uygulamada iki ayri ornek gosteriyordu. Kural artik iki tarafta
 * ayni; kapi hem kisaltma listesini hem ayiklama adimlarini esliyor. */
{
  const kural = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf("ABBREVIATIONS = new Set(");
    const liste = i < 0 ? ["bulunamadi"] : [...src.slice(i, src.indexOf("]", i)).matchAll(/"([^"]+)"/g)].map((m) => m[1]).sort();
    return [
      "kisaltma=" + liste.join(","),
      "tek harf kisaltma=" + (/m\[1\]\.length === 1/.test(src) ? "var" : "yok"),
      "madde numarasi=" + (/split\(\/\\s\+\\d\+\\\.\\s\+\//.test(src) ? "var" : "yok"),
      "egik cizgi=" + (/\(\[\.!\?\]\)\\s\*\\\/\\s\*/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("ornek cumle kurali", kural("mobile/src/data/example.ts"), kural("src/lib/example.ts"));
}

/* ── 50. gunde yeni kelime siniri ─────────────────────────────────────────
 * Uc degeri 0-40 arasina kirpiyor (`/api/profile`). Web kaydiricisi ve mobil
 * cip listesi ayni araligi teklif etmek zorunda: yuzey sunucunun kabul
 * etmedigi bir sayi teklif ederse kullanici sectigini kaydedilmis saniyor,
 * sunucu sessizce kirpiyor ve ekran bir sonraki acilista baska bir sayi
 * gosteriyor. Ucu de burada yan yana. */
{
  const src = read("src/app/api/profile/route.ts");
  const m = src.match(/clampInt\(body\.newPerDay,\s*(\d+),\s*(\d+)\)/);
  const uc = m ? [m[1], m[2]] : ["?", "?"];
  const web = read("src/components/profile-form.tsx");
  const wm = web.match(/label=\{t\("settings\.new_per_day"\)\}[\s\S]{0,200}?min=\{(\d+)\}[\s\S]{0,80}?max=\{(\d+)\}/);
  const mob = read("mobile/src/screens/SettingsScreen.tsx");
  const mm = mob.match(/const NEW_PER_DAY = \[([^\]]*)\]/);
  const sayilar = mm ? mm[1].split(",").map((x) => Number(x.trim())) : [];
  sameList(
    "gunde yeni kelime araligi",
    ["alt=" + Math.min(...sayilar), "ust=" + Math.max(...sayilar)],
    ["alt=" + uc[0], "ust=" + uc[1]],
    "mobil cipleri",
    "uc kirpmasi",
  );
  sameList(
    "gunde yeni kelime araligi (web)",
    wm ? ["alt=" + wm[1], "ust=" + wm[2]] : ["kaydirici bulunamadi"],
    ["alt=" + uc[0], "ust=" + uc[1]],
    "web kaydiricisi",
    "uc kirpmasi",
  );
}

/* ── 51. buyuk/kucuk harf cevirisi YEREL olmali ───────────────────────────
 * Turkcede "i" nin buyugu "İ", "I" degil. Arayuz metnini `toUpperCase()` ile
 * ya da elle "tr-TR" yazarak cevirmek iki yonde de bozuyor: Turkce arayuzde
 * "İLERLEME" yerine "ILERLEME", Ingilizce arayuzde "PROMOTION" yerine
 * "PROMOTİON". Dogru yol yereli calisma aninda sormak (mobil `dateLocale()`,
 * web `localeOf(lang)`); bu bolum kacaklari sayiyor.
 *
 * MUAF olanlar metin degil VERI: kupon/davet kodu (harf buyuklugu kodun
 * kendisi), bas harf avatari (kisi adi, arayuz dili degil), Almanca govde
 * islemleri ve ders metni ayiklama (kaynagin dili Turkce, sabit dogru). */
{
  const walkUI = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|\/content|\/generated|__tests__/.test("/" + p)) walkUI(p, out); }
      else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
    return out;
  };
  /* Kisi adinin bas harfi arayuz metni degil; iki tarafta da ayni sekilde
     "tr-TR" ile buyutuluyor ve oyle kaliyor. */
  const MUAF = ["mobile/src/ui/PersonAvatar.tsx", "src/components/avatar.tsx"];
  /* Huni sayfasi da yonetime kapali (`adminGate`) ve yalniz Turkce: metinleri
     koda gomulu, kullaniciya acik degil - yonetim panosuyla ayni sebep. */
  const MUAF_KLASOR = ["src/app/admin/", "src/app/(app)/analytics/"];
  /* ARANAN sey dar: CEVIRMEN CIKTISINA uygulanan harf cevirisi (metin) ve
     .tsx icinde elle yazilmis "tr-TR" buyutmesi (arayuzde cizilen sey).
     Veri uzerindeki `toLowerCase()` (e-posta, kullanici adi, eslestirme)
     mesru ve aranmiyor - o kadar genis bir kural yalnizca gurultu uretir. */
  /* SAYI/TARIH BICIMI de yerelden gelmeli: `toLocaleString("tr-TR")` bin
     ayracini Ingilizce ve Almanca arayuzde de Turkce kuruyor. Yonetim panosu
     (src/app/admin) disarida: orasi yalniz Turkce ve kullaniciya acik degil. */
  /* Veritabani LIKE kalibi (`%${q}%`) yuzde BICIMI degil: kapanis suslunun
     ardindan gelen % onu ayiriyor; ic ice suslu tasiyan LIKE'lar da yalniz
     veri katmaninda (.ts) yaziliyor ve desen zaten .tsx ile sinirli. */
  const PCT_TPL = /`\s*%\$\{[^}]*\}(?!%)/g;
  const TR_UPPER = /\.toLocaleUpperCase\(\s*(?:"tr-TR"|'tr-TR')\s*\)/g;
  const DESENLER = [
    /\.toLocaleString\(\s*["']tr-TR["']/g,
    /* YUZDE BICIMI de yerelden gelmeli: `%{n}` Turkce yazimi koda gomuyor
       ("%62"), Ingilizcede "62%" ve Almancada "62 %" olmasi gerekiyor.
       Dogru yol mobilde `formatPercent(n)`, webde `t("common.pct", { n })`. */
    />\s*%\{/g,
    /* Sablon dizgisinde de ayni sey: `%${n}` ("%85"). Ilk yazimda yalniz JSX
       bicimi araniyordu ve tur ozetindeki `%${accuracy}` ile sinav bolum
       agirligindaki `%${s.weight}` GORUNMUYORDU - ikisi de kullaniciya cikan
       metindi. */
    PCT_TPL,
    /\bt[x]?\((?:[^()]|\([^()]*\))*\)\s*(?:\?\?\s*"[^"]*"\s*)?\.to(?:Locale)?UpperCase\(\s*(?:"tr-TR"|'tr-TR'|)\s*\)/g,
    TR_UPPER,
  ];
  const kacak = [];
  for (const kok of ["mobile/src", "src"]) {
    for (const f of walkUI(kok)) {
      if (MUAF.includes(f) || MUAF_KLASOR.some((d) => f.startsWith(d))) continue;
      const src = read(f).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
      for (const re of DESENLER) {
        /* Elle yazilmis "tr-TR" buyutmesi yalniz ARAYUZDE (.tsx) kacak; veri
           katmaninda (.ts) mesru. Desen SIRAYLA degil KENDISIYLE seciliyor:
           dizinin basina yeni bir desen eklendiginde indis kaymasi bu kurali
           sessizce baska bir desene uyguluyordu. */
        if ((re === TR_UPPER || re === PCT_TPL) && !f.endsWith(".tsx")) continue;
        for (const m of src.matchAll(re)) kacak.push(f + ": " + m[0].trim().slice(0, 60));
      }
    }
  }
  sameList("yerelsiz harf cevirisi", kacak.length ? kacak : ["yok"], ["yok"], "bulunan", "beklenen");
}

/* ── 52. kullanici sikayeti: sebepler sunucununkiyle ayni ────────────────
 * `/api/social/reports` dort sebep kabul ediyor (`REPORT_REASONS`) ve iki
 * yuzey de kendi listesini ELLE yaziyor. Mobil ucunu yaziyordu: sikayeti bu
 * uce girmeyen kullanicinin bildirebilecegi hicbir yol kalmiyordu ve eksik
 * bir sebep, o sikayetin hic gelmemesi demek. Kapi ucunu de sunucunun
 * listesiyle esliyor. */
{
  const sunucu = (() => {
    const m = read("src/lib/social/types.ts").match(/REPORT_REASONS = \[([^\]]*)\]/);
    return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]).sort() : ["bulunamadi"];
  })();
  const mobil = [...read("mobile/src/screens/UserScreen.tsx").matchAll(/social\.report\(u\.userId,\s*"([^"]+)"\)/g)].map((m) => m[1]).sort();
  const web = (() => {
    const src = read("src/components/social/public-profile.tsx");
    const blok = src.slice(src.indexOf('["spam"'), src.indexOf("].map((["));
    return [...blok.matchAll(/\["([a-z]+)",/g)].map((m) => m[1]).sort();
  })();
  sameSet("sikayet sebepleri (mobil)", mobil, sunucu, "mobil", "sunucu");
  sameSet("sikayet sebepleri (web)", web, sunucu, "web", "sunucu");
}

/* ── 53. bildirim satiri nereye goturur ───────────────────────────────────
 * Iki yuzey de bildirim turunu ELLE bir hedefe esliyor ve ikisinin de bir
 * `default` dali var - yani listeye yeni bir tur eklendiginde hicbir sey
 * kirilmiyor, satir sessizce akisa goturuyor. `league_up` tam olarak boyle
 * kacmisti: "bir ust lige ciktin" bildirimi webde akisa gidiyordu, satirin
 * anlattigi seyin bulundugu yere degil. Kapi ACIKCA ele alinan turleri iki
 * tarafta esliyor. */
{
  const daller = (p, imza) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf(imza);
    if (i < 0) return ["bulunamadi: " + imza];
    const govde = src.slice(i, src.indexOf("\n}", i));
    return [...new Set([...govde.matchAll(/case "([a-z_]+)":/g)].map((m) => m[1]))].sort();
  };
  sameSet(
    "bildirim yonlendirmesi",
    daller("mobile/src/screens/InboxScreen.tsx", "function open(n: NotificationView)"),
    daller("src/components/social/inbox.tsx", "function hrefFor(n: NotificationView)"),
    "mobil",
    "web",
  );
}

/* ── 54. akis olay karolari ───────────────────────────────────────────────
 * Karonun tek isi "NE kutlaniyor" sorusunu bir bakista cevaplamak. Iki taraf
 * da tur -> karo eslemesini elle yaziyor ve `default` dali var: `ACTIVITY_TYPES`
 * listesindeki `friend_streak` ile `league_up` ikisinde de o dala dusuyordu,
 * yani karo isini tam da bu iki olayda yapmiyordu. Kapi hem iki tarafi
 * birbirine hem de PAYLASILAN LISTEYE bagliyor: yeni bir olay turu eklenince
 * sessizce genel kivilcima dusmesin. */
{
  const liste = (() => {
    const m = read("src/lib/social/types.ts").match(/ACTIVITY_TYPES = \[([^\]]*)\]/);
    return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]).sort() : ["bulunamadi"];
  })();
  const daller = (p, imza) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf(imza);
    if (i < 0) return ["bulunamadi: " + imza];
    const govde = src.slice(i, src.indexOf("\n}", i));
    return [...new Set([...govde.matchAll(/case "([a-z_]+)":/g)].map((m) => m[1]))].sort();
  };
  sameSet("akis karolari (mobil)", daller("mobile/src/social/FeedList.tsx", "function eventTile"), liste, "mobil", "ACTIVITY_TYPES");
  sameSet("akis karolari (web)", daller("src/components/social/feed.tsx", "function eventTile"), liste, "web", "ACTIVITY_TYPES");
}

/* ── 55. sosyal tiplerde NULL alinabilirlik ───────────────────────────────
 * 26. bolum alan ADLARINI esliyor, tiplerini degil. `ReactionSummary.names`
 * webde `(string | null)[]` (adsiz kullanici `null` gelir, bkz.
 * `social/reactions`), mobilde `string[]` yaziliydi: `join` bosluk basiyor
 * ve tepki satiri "Ali, , ve 2 kisi" cikiyordu. Ad kumesi ayni oldugu icin
 * hicbir kapi gormuyordu.
 *
 * Burada yalnizca NULL ALINABILIRLIK olculuyor (tam tip degil): mobil kendi
 * kisayollarini kullaniyor ve tam tip esligi gurultu uretirdi, ama "bu alan
 * bos gelebilir mi" sorusu iki tarafta ayni cevabi vermek zorunda. */
{
  const govde = (src, name) => {
    const x = src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = x.indexOf("export type " + name + " =");
    if (i < 0) return "";
    let k = x.indexOf("{", i);
    if (k < 0) return "";
    let d = 0;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) return x.slice(k + 1, j);
    }
    return "";
  };
  /* Alanlari UST DUZEYDE ayirir (ic ice nesne/dizi atlanir) ve her biri icin
     "bos gelebilir mi" bayragini dondurur: `?` ya da `| null`/`| undefined`. */
  const bosluk = (src, name) => {
    const b = govde(src, name);
    if (!b) return ["bulunamadi: " + name];
    const parts = [];
    let d = 0;
    let buf = "";
    for (const c of b) {
      if ("{[(".includes(c)) d++;
      else if ("}])".includes(c)) d--;
      if ((c === ";" || c === ",") && d === 0) { parts.push(buf); buf = ""; } else buf += c;
    }
    parts.push(buf);
    const out = [];
    for (const seg of parts) {
      const m = seg.match(/^\s*(\w+)(\??)\s*:([\s\S]*)$/);
      if (!m) continue;
      const bos = m[2] === "?" || /\|\s*(null|undefined)/.test(m[3]);
      out.push(m[1] + "=" + (bos ? "bos olabilir" : "dolu"));
    }
    return out.sort();
  };
  const wt = read("src/lib/social/types.ts");
  const mt = read("mobile/src/api/social.ts");
  for (const n of ["PublicUser", "FriendRow", "ReactionSummary", "FeedItem", "QuestView"]) {
    sameList("sosyal " + n + " bosluk", bosluk(mt, n), bosluk(wt, n), "mobil", "web");
  }
}

/* ── 56. kod bozdurma hata sebepleri ──────────────────────────────────────
 * `/api/premium/redeem` sebebi DOGRUDAN sozluk anahtari olarak gonderiyor ve
 * iki istemci de tanidigi sebeplerin listesini ELLE yaziyor; tanimadigi sebep
 * "daha sonra tekrar dene"ye dusuyor. `self` (kendi davet kodu) tam olarak
 * boyle kacmisti: kullanicinin yapmasi gereken belli ve tekrar denemek hicbir
 * zaman ise yaramayacak, ama iki istemci de genel mesaji yaziyordu.
 *
 * Beklenen kume SUNUCUDAN turetiliyor: promo katmaninin `reason` birlesimi +
 * `AttachResult`in kullaniciya donen degerleri (`ok` ve `unknown_code` yok -
 * ilki hata degil, ikincisi ucta `not_found`a cevriliyor) + hiz siniri. */
{
  const birlesim = (p, imza) => {
    const src = read(p);
    const i = src.indexOf(imza);
    if (i < 0) return [];
    return [...src.slice(i, src.indexOf(";", i)).matchAll(/"([a-z_]+)"/g)].map((m) => m[1]);
  };
  const sunucu = [...new Set([
    ...birlesim("src/lib/premium/promo.ts", 'reason: "not_found"'),
    ...birlesim("src/lib/premium/referral.ts", "type AttachResult ="),
    "rate_limited",
  ])].filter((x) => x !== "ok" && x !== "unknown_code").sort();
  const liste = (p, imza) => {
    const src = read(p);
    const i = src.indexOf(imza);
    if (i < 0) return ["bulunamadi: " + imza];
    return [...src.slice(i, src.indexOf("]", i)).matchAll(/"([a-z_]+)"/g)].map((m) => m[1]).sort();
  };
  sameSet("promo hata sebepleri (mobil)", liste("mobile/src/screens/PaywallScreen.tsx", "const PROMO_ERRORS"), sunucu, "mobil", "sunucu");
  sameSet("promo hata sebepleri (web)", liste("src/components/premium-paywall.tsx", "const known ="), sunucu, "web", "sunucu");
}

/* ── 57. seviye testi asamalari ───────────────────────────────────────────
 * Sunucu DORT asamali bir test veriyor (`PlacementStage`) ve iki istemci de
 * dordunu oynuyor. Uzun sure boyle DEGILDI: mobil tipi yalnizca `vocab`
 * tasiyordu, yani Android'de seviye testi kelime olcuyor, dilbilgisi/okuma/
 * dinleme hic sorulmuyor ve `perSkill` uc alanini bos donduruyordu
 * (docs/plan/web-parity.md §11.119, §11.168'de kapandi).
 *
 * Kapi artik MUAFIYETSIZ: sunucunun asama listesi ile mobil tipin alanlari
 * birebir. Sunucu besinci bir asama eklerse burasi kirmiziya doner. */
{
  const sunucu = (() => {
    const m = read("src/lib/placement-score.ts").match(/type PlacementStage =([^;]*);/);
    return m ? [...m[1].matchAll(/"([a-z]+)"/g)].map((x) => x[1]).sort() : ["bulunamadi"];
  })();
  const mobil = (() => {
    const m = read("mobile/src/game/placement.ts").match(/type PlacementTest = \{([^}]*)\}/);
    return m ? [...m[1].matchAll(/(\w+)\s*:/g)].map((x) => x[1]).sort() : ["bulunamadi"];
  })();
  sameSet("seviye testi asamalari (sunucu)", sunucu, mobil, "sunucu", "mobil");
}

/* ── 58. sinav sonucunun alanlari ─────────────────────────────────────────
 * Sunucu `ExamResult` donduruyor; mobil ekran kendi dar `Result` tipini elle
 * yaziyor ve yazmadigi alan SESSIZCE dusuyor. `id` tam olarak boyle kaybolmus
 * ve sertifikaya ulasmanin yolunu kapatmisti (11.122).
 *
 * Kapi tam esitlik istemiyor - mobil bazi alanlari zaten baska yerden
 * biliyor - ama DUSEN alanlarin listesi burada yazili: sunucu yeni bir alan
 * eklerse liste tutmuyor, kapi kaliyor ve insan "bunu mobil de kullanmali mi"
 * diye bakiyor. */
{
  const ustDuzey = (p, name) => {
    const x = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = x.indexOf("type " + name + " =");
    if (i < 0) return ["bulunamadi: " + name];
    let k = x.indexOf("{", i);
    let d = 0;
    let son = -1;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) { son = j; break; }
    }
    if (son < 0) return ["okunamadi: " + name];
    const govde = x.slice(k + 1, son);
    const parcalar = [];
    let dd = 0;
    let buf = "";
    for (const c of govde) {
      if ("{[(".includes(c)) dd++;
      else if ("}])".includes(c)) dd--;
      if ((c === ";" || c === ",") && dd === 0) { parcalar.push(buf); buf = ""; } else buf += c;
    }
    parcalar.push(buf);
    return [...new Set(parcalar.map((seg) => (seg.match(/^\s*(\w+)\??\s*:/) ?? [])[1]).filter(Boolean))].sort();
  };
  const web = ustDuzey("src/lib/exam-types.ts", "ExamResult");
  const mobil = ustDuzey("mobile/src/screens/ExamScreen.tsx", "Result");
  /* Mobilin BILEREK almadiklari: seviye ve modul rota parametresinde, tur
     ondan tureniyor, tarih de sonuc ekraninda kullanilmiyor. */
  const KAYITLI_DUSEN = ["at", "kind", "level", "module"];
  sameSet("sinav sonucu alanlari", web, [...mobil, ...KAYITLI_DUSEN].sort(), "sunucu", "mobil + kayitli dusen");
}

/* ── 60. sinav kapaginin alanlari ─────────────────────────────────────────
 * 58 SONUC tipini kapiya aliyor; kapak tipi aciktaydi ve `canDo` tam olarak
 * oradan dusmustu: sunucu gonderiyor, mobil tipi yazmiyor, yuzey listeyi hic
 * gostermiyordu (11.125). Ayni kalibin ucuncu ornegiydi, o yuzden kapak da
 * kapiya aliniyor. */
{
  const alanlar = (p, name) => {
    const x = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = x.indexOf("type " + name + " =");
    if (i < 0) return ["bulunamadi: " + name];
    let k = x.indexOf("{", i);
    let d = 0;
    let son = -1;
    for (let j = k; j < x.length; j++) {
      if (x[j] === "{") d++;
      else if (x[j] === "}" && --d === 0) { son = j; break; }
    }
    if (son < 0) return ["okunamadi: " + name];
    const govde = x.slice(k + 1, son);
    const parcalar = [];
    let dd = 0;
    let buf = "";
    for (const c of govde) {
      if ("{[(".includes(c)) dd++;
      else if ("}])".includes(c)) dd--;
      if ((c === ";" || c === ",") && dd === 0) { parcalar.push(buf); buf = ""; } else buf += c;
    }
    parcalar.push(buf);
    return [...new Set(parcalar.map((seg) => (seg.match(/^\s*(\w+)\??\s*:/) ?? [])[1]).filter(Boolean))].sort();
  };
  const web = alanlar("src/lib/exam-types.ts", "ExamCover");
  /* Mobil kapagi kendi `Paper` tipinin icinde yaziyor; satiri ayikliyoruz. */
  const mobilSatir = (read("mobile/src/screens/ExamScreen.tsx").match(/^\s*cover: \{([^}]*(?:\{[^}]*\}[^}]*)*)\} \| null;/m) ?? [])[1] ?? "";
  /* IC ICE nesneler atlaniyor: `canDo` satirinin kendi alanlari (de/tr/en)
     ust duzeyde degil ve sunucu tipinde de ayri bir tipte duruyor. */
  const mobilParca = [];
  {
    let d = 0;
    let buf = "";
    for (const c of mobilSatir) {
      if ("{[(".includes(c)) d++;
      else if ("}])".includes(c)) d--;
      if ((c === ";" || c === ",") && d === 0) { mobilParca.push(buf); buf = ""; } else buf += c;
    }
    mobilParca.push(buf);
  }
  const mobil = [...new Set(mobilParca.map((seg) => (seg.match(/^\s*(\w+)\??\s*:/) ?? [])[1]).filter(Boolean))].sort();
  sameSet("sinav kapagi alanlari", mobil, web, "mobil", "sunucu");
}

/* ── 59. sinav kacanlari hangi bolumlerden toplaniyor ─────────────────────
 * Sonuc ekranindaki kirilim, sinavin OGRETEN kismi: yuzde neyi kacirdigini
 * soylemiyor. Iki taraf da kacanlari cevap noktalarinda elle biriktiriyor ve
 * unutulan bolum sessizce kirilimin disinda kaliyor - mobilde bastan beri
 * hicbiri yoktu (11.123). Kapi iki tarafin da hangi bolumler icin kayit
 * actigini esliyor. */
{
  const bolumler = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [...new Set([...src.matchAll(/section:\s*"([a-z]+)"/g)].map((m) => m[1]))].sort();
  };
  /* Okuma ve dinleme IKI TARAFTA da tek cagriyla bildiriliyor: bolum kimligi
     degiskenden geliyor (`section: id` / `section: kind`), yani dizgi olarak
     dosyada yok. Desen goruldugunde ikisi de listeye ekleniyor. */
  const tam = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const dinamik = /section:\s*(id|kind)\b/.test(src) ? ["reading", "listening"] : [];
    return [...new Set([...bolumler(p), ...dinamik])].sort();
  };
  sameSet("sinav kacan bolumleri", tam("mobile/src/screens/ExamScreen.tsx"), tam("src/components/exam-player.tsx"), "mobil", "web");
}

/* ── 61. onerilen adimin adresi mobilde taniniyor mu ──────────────────────
 * Sunucu "siradaki adim"i bir WEB ADRESIYLE veriyor (`nextStep.href`) ve
 * mobil onu ekrana cevirmek zorunda (`routeFromHref`). Taninmayan adres
 * `null` donuyor ve dugme hic cizilmiyor - yani sunucu yeni bir bicim
 * uretirse Android'de oneri SESSIZCE KAYBOLUR. Kapi iki tarafi esliyor. */
{
  const sunucu = [...new Set(
    [...read("src/lib/proficiency-data.ts").matchAll(/href:\s*[`"]([^`"$]*)/g)].map((m) => {
      const p = m[1].replace(/\/$/, "");
      return p.startsWith("/immersion/skill") ? "/immersion/skill/" : p.startsWith("/lessons") ? "/lessons/" : p;
    }),
  )].filter(Boolean).sort();
  const mobil = [...new Set(
    [...read("mobile/src/lib/pushRoute.ts").matchAll(/path\s*(?:===|\.startsWith\()\s*"([^"]+)"/g)].map((m) => m[1]),
  )].filter((p) => /^\/(learn\/game|immersion|lessons)/.test(p)).sort();
  sameSet("onerilen adim adresleri", mobil, sunucu, "mobil esleyici", "sunucu");
}

/* ── 62. gelisim serisi cizgisinin geometrisi ─────────────────────────────
 * Sekiz haftalik cizgi iki tarafta AYRI cizilliyor (web SVG, mobil
 * react-native-svg) ve ayni raporu anlatmak zorunda. En onemlisi OLCULMEMIS
 * haftanin cizgiyi KESMESI: boslugu sifir saymak, olcum yapilmamis bir
 * haftayi "puanin dibe vurdu" diye cizerdi. Kutu olculeri de ayni, yoksa
 * ayni veri iki uygulamada baska bir egim gosterir. */
{
  const geo = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf("function Spark");
    if (i < 0) return ["bulunamadi"];
    const govde = src.slice(i, i + 1600);
    const bul = (re, ad) => ad + "=" + ((govde.match(re) ?? [])[1] ?? "yok");
    return [
      bul(/const W = (\d+)/, "W"),
      bul(/const H = (\d+)/, "H"),
      bul(/\(H - (\d+)\)/, "ic bosluk"),
      /* Kesme IKI BICIMDE de yaziliyor: web koordinat yokluguna bakiyor
         (`if (!c)`), mobil degerin kendisine (`if (v === null)`). Aranan sey
         ikisinde de ayni: cizginin kopmasi (`open = false`). Bicimlerden
         birine bakan bir desen yanlis pozitif verir. */
      "kesme=" + (/open = false/.test(govde) ? "var" : "yok"),
      "tavan=" + (/max \?\? Math\.max\(1/.test(govde) ? "max ?? en buyuk" : "?"),
    ];
  };
  sameList("gelisim serisi geometrisi", geo("mobile/src/ui/GrowthPanel.tsx"), geo("src/components/progress-panel.tsx"));
}

/* ── 63. tur kaydi dusunce kullaniciya ne deniyor ─────────────────────────
 * Cevaplar sunucuya yazilamadiginda EKRAN SUSMAMALI: puan artmis gorunur,
 * sunucuda hicbir sey degismez. Iki taraf da AYNI IKI durumu ayirmak
 * zorunda - kuyruga alindi (baglanti donunce gider) ve sunucu reddetti
 * (gitmeyecek); tek bir "kaydedilemedi" metni ikisini birbirine karistirir.
 * Mobilde bu metinler hic yoktu (`GameScreen` catch bloku bostu). */
{
  const uyari = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return ["session.save_failed", "session.save_queued"].filter((k) => src.includes(k)).sort();
  };
  sameSet("tur kaydi uyarilari", uyari("mobile/src/screens/GameScreen.tsx"), uyari("src/components/session-player.tsx"), "mobil", "web");
}

/* ── 64. sinav sonucu gonderilemediginde ──────────────────────────────────
 * Yirmi dakikalik sinavin puani ISTEMCIDE zaten toplandi. Kayit dusunce
 * ekran onu gostermeli (yuzde + bolum kirilimi); mobil burada %0 yaziyordu.
 * GECTI/KALDI yazilmiyor: o karari sunucu veriyor, esik istemcide yok. */
{
  const cevrimdisi = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "yerel yuzde=" + (/setOffline\(/.test(src) ? "var" : "yok"),
      "bolum kirilimi=" + (/sections:\s*sections\.map\(/.test(src) ? "var" : "yok"),
      "metin=" + (src.includes("exam.saved_offline") ? "var" : "yok"),
      "gecti kaldi=" + (/offline[\s\S]{0,400}?exam\.(passed|not_passed)/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("sinav cevrimdisi sonucu", cevrimdisi("mobile/src/screens/ExamScreen.tsx"), cevrimdisi("src/components/exam-player.tsx"));
}

/* ── 65. haftalik sinav gonderilemediginde ────────────────────────────────
 * Haftada TEK hak var. Sonuc yazilamayinca web hata kartina dusup puani
 * ekrandan siliyordu, mobil puani gosteriyor ama KAYDEDILMEDIGINI
 * soylemiyordu - ikisi de kullaniciyi hakkini harcadigi sanisina birakiyor.
 * Iki taraf da ayni ucu tutmak zorunda: yerel puan + acik uyari. */
{
  const bicim = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "yerel puan=" + (/filter\(\(a\) => a\.correct\)\.length/.test(src) ? "var" : "yok"),
      "uyari=" + (src.includes("weekly.not_sent") ? "var" : "yok"),
      "sonuc ekrani=" + (/setNotSent\(true\)[\s\S]{0,200}?setPhase\("done"\)|setNotSent\(true\);[\s\S]{0,80}?\}\s*setPhase\("done"\)/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("haftalik sinav gonderilemedi", bicim("mobile/src/screens/WeeklyScreen.tsx"), bicim("src/components/weekly-player.tsx"));
}

/* ── 66. cevrimdisi bitirilen dersin kuyrugu ──────────────────────────────
 * Ders bitince sonuc `/api/lesson`a yaziliyor; ag yokken iki tarafta da
 * DUSUYORDU. Yerel isaret Patika'yi bitmis gosteriyor, sunucu dersi hic
 * ogrenmiyor: XP yok, tekrar merdiveni yok, cihaz degisince ders geri
 * geliyor. Iki kuyruk ayri teknolojide (AsyncStorage / localStorage) ama
 * ayni sozlesmeyi tutmak zorunda: ayni depolama anahtari, kendi gunu,
 * ders basina tek kayit ve 4xx'in kuyruga girmemesi. */
{
  const kuyruk = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "anahtar=" + ((src.match(/"(lernomi-lessons-pending)"/) ?? [])[1] ?? "yok"),
      "gun=" + (/day:/.test(src) ? "var" : "yok"),
      "ders basina tek=" + (/filter\(\(x\) => x\.lessonId !== item\.lessonId\)/.test(src) ? "var" : "yok"),
      "sinir=" + ((src.match(/slice\(-(\d+)\)/) ?? [])[1] ?? "yok"),
      "kalani birak=" + (/slice\(i\)/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("ders sonucu kuyrugu", kuyruk("mobile/src/game/lessonProgress.ts"), kuyruk("src/lib/lesson-queue.ts"));

  /* Gonderim govdesi de esit olmali: web `day` ve `seconds`i HIC
     gondermiyordu - her ders sunucuda sifir saniye goruluyor ve gece
     yarisindan sonra bitirilen ders serinin yanlis gunune yaziliyordu. */
  const govde = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf("const payload = {");
    if (i < 0) return ["payload bulunamadi"];
    const govde = src.slice(i, src.indexOf("}", i) + 1);
    /* Kisayol yazim da sayiliyor (`seconds` ile `seconds: secs` ayni alan);
       yalnizca iki nokta arayan bir desen yanlis ayrisma gosterirdi. */
    return ["lessonId", "correct", "roleplayDone", "day", "seconds"].filter((k) => new RegExp("\\b" + k + "\\s*[:,}]").test(govde)).sort();
  };
  sameSet("ders kayit govdesi", govde("mobile/src/screens/LessonScreen.tsx"), govde("src/components/lessons/lesson-player.tsx"), "mobil", "web");
}

/* ── 67. serbest yazma gorevi rubrikle puanlaniyor mu ─────────────────────
 * Mobil kart metni HIC OKUMUYORDU: yeterli kelime yazilinca gorev dogru
 * sayiliyor, ornek cevap aciliyordu - ogrenci ne yazarsa yazsin tam puan.
 * Web ayni gorevi bastan beri `/api/assess` rubrigiyle puanliyor. Iki taraf
 * da ayni govdeyi gondermek ve ayni ucu ayirmak zorunda: premium/kota reddi
 * ag hatasi degil (uydurma puan verilmez) ve saglayici kapaliyken metin
 * `/api/assess/queue`e birakilir (kayit defteri §11.12). */
{
  /* Web ucu ayri bir istemciden cagiriyor (`assess-client`): iki dosya
     birlikte okunuyor, yoksa "uc yok" gibi yanlis bir ayrisma cikar. */
  const yazma = (...yollar) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "uc=" + (/"\/api\/assess"/.test(src) ? "var" : "yok"),
      "kind=" + (/kind: "writing"/.test(src) ? "writing" : "yok"),
      "hedefler=" + (/targets:/.test(src) ? "var" : "yok"),
      "olcutler=" + (/constraints:/.test(src) ? "var" : "yok"),
      "egzersiz kimligi=" + (/exerciseId/.test(src) ? "var" : "yok"),
      "kuyruk=" + (/assess\/queue/.test(src) ? "var" : "yok"),
      "kapi ayrimi=" + (/premium/i.test(src) && /quota/i.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "serbest yazma degerlendirmesi",
    yazma("mobile/src/game/skillQuiz.tsx"),
    yazma("src/components/skills/writing-player.tsx", "src/lib/assess-client.ts"),
  );
}

/* ── 68. sinav bolum satirinin bicimi ─────────────────────────────────────
 * Ayni veri (bolum yuzdesi) iki DURUMDA da ayni okunmali: sonuc kartinda ve
 * kayit gonderilemediginde. Webde cevrimdisi liste seritsiz ve renksiz duz
 * bir listeydi, sonuc karti ise seritli - ayni sey iki bicimde. Ayrica gecen
 * bolum webde notr renkteydi: "hangi bolumu gectim" sorusu ancak yuzdeler tek
 * tek okunarak cevaplaniyordu. Android iki durumu da ayni cizip iki rengi de
 * kullaniyor. Sayilar ikiser: normal sonuc + cevrimdisi. */
{
  const satir = (p, metin, serit) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "yuzde rengi=" + (src.match(metin) ?? []).length,
      "serit=" + (src.match(serit) ?? []).length,
    ];
  };
  sameList(
    "sinav bolum satiri",
    satir(
      "mobile/src/screens/ExamScreen.tsx",
      /color=\{[sx]\.pct >= 50 \? colors\.successText : colors\.dangerText\}/g,
      /backgroundColor: [sx]\.pct >= 50 \? colors\.primary : colors\.danger/g,
    ),
    satir(
      "src/components/exam-player.tsx",
      /color: [sx]\.pct >= 50 \? "var\(--color-success\)" : "var\(--color-danger\)"/g,
      /background: [sx]\.pct >= 50 \? "var\(--color-brand\)" : "var\(--color-danger\)"/g,
    ),
  );
}

/* ── 69. tur ozetinde "zorlandiklarin" listesi ────────────────────────────
 * Web tur bitince o turda yanlis bilinen kelimeleri listeliyor ve kelime
 * listesine kapi aciyor. Mobilde bu liste HIC yoktu: tur bitiyor, hangi
 * kelimede takildigin hicbir yerde yazmiyordu. Dahasi `SessionProgress`in
 * `missed` alani mobil tipte `unknown[]` idi - sunucu saklıyor, mobil ne
 * gonderiyor ne okuyor; yani Androidde baslanan tur webde surdurulunce liste
 * bos geliyordu. Alti satir siniri ve kelime listesine kapi iki tarafta da
 * ayni. */
{
  const liste = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "baslik=" + (src.includes("session.missed_title") ? "var" : "yok"),
      "sinir=" + ((src.match(/missed(?:\.current)?\.slice\(0, (\d+)\)/) ?? [])[1] ?? "yok"),
      "kalani say=" + (src.includes("session.n_more_words") ? "var" : "yok"),
      "not=" + (src.includes("session.missed_note") ? "var" : "yok"),
      "kelime listesi kapisi=" + (src.includes("words.my_words") ? "var" : "yok"),
      /* Liste SUNUCUYA da gidiyor: yarim kalan tur oteki cihazda surerken
         zorlanilan kelimeler kaybolmasin. */
      "ilerlemede=" + (/missed: missed\.current/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("tur ozeti zorlandiklarin", liste("mobile/src/screens/GameScreen.tsx"), liste("src/components/session-player.tsx"));
}

/* ── 70. tur ozetinin sonuc halkasi ───────────────────────────────────────
 * Android ozetin ortasinda halka cizip icine "kac dogru / kac soru" yaziyor;
 * halkanin dolulugu turun kendisi. Webde halka YOKTU, ayni bilgi asagidaki
 * karolarda bir sayi olarak duruyordu ve "tur nasil gecti" bir bakista
 * cevaplanmiyordu. Iki taraf da ayni iceriği tasimali: dogru/toplam + etiket. */
{
  const halka = (p, re) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "halka=" + (re.test(src) ? "var" : "yok"),
      "dogru bolu toplam=" + (/\{(?:tally\.correct|finalCorrect)\}\/\{(?:tally\.total|total \|\| 0)\}/.test(src) ? "var" : "yok"),
      "etiket=" + (src.includes('t("game.correct")') ? "var" : "yok"),
    ];
  };
  sameList(
    "tur ozeti sonuc halkasi",
    halka("mobile/src/screens/GameScreen.tsx", /<ProgressRing/),
    halka("src/components/session-player.tsx", /conic-gradient/),
  );
}

/* ── 71. seviye testinin yeniden alma suresi ──────────────────────────────
 * Test 30 gunde bir alinabiliyor. Sunucu bunu yalniz BILDIRIYOR (`GET
 * /api/placement` → canRetake, retakeDays), kapiyi ISTEMCI tutuyor. Mobil
 * durumu hic sormuyordu: Androidde test istenildigi kadar tekrarlanabiliyor
 * ve her bitis seviyeyi yeniden yazabiliyordu - sik tekrar seviye tahminini
 * "ezber"e cevirir. Iki taraf da ayni ucu sorup ayni ucu tutmali. */
{
  const kapi = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "durum=" + (/canRetake/.test(src) ? "var" : "yok"),
      "kalan gun=" + (src.includes("placement.retake_in") ? "var" : "yok"),
      "son alma=" + (src.includes("placement.last_taken") ? "var" : "yok"),
      "secilen seviye=" + (src.includes("placement.you_chose") ? "var" : "yok"),
    ];
  };
  sameList("seviye testi bekleme suresi", kapi("mobile/src/screens/PlacementScreen.tsx"), kapi("src/components/placement/placement-test.tsx"));
}

/* ── 72. seviye testi sonucunda seviyeyi KULLANICI seciyor ────────────────
 * Sunucu oneriyi veriyor ama `accept` hangi seviyenin kabul edildigini AYRICA
 * aliyor: "onerine katilmiyorum, B1'den baslayacagim" bastan beri mumkundu.
 * Mobil her zaman oneriyi uyguluyordu - kendi seviyesini bilen kullanicinin
 * burada soyleyecek sozu yoktu. Iki taraf da bes seviyeyi gostermeli, oneriyi
 * isaretlemeli ve SECILENI kabul etmeli. */
{
  const secim = (p, kabul) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "bes seviye=" + (/\["A1", "A2", "B1", "B2", "C1"\]|PLACEMENT_LEVELS\.map/.test(src) ? "var" : "yok"),
      "oneri isareti=" + (src.includes("placement.suggested") ? "var" : "yok"),
      "dugme metni=" + (src.includes("placement.continue_with") && src.includes("placement.pick_and_continue") ? "var" : "yok"),
      "secileni kabul=" + (kabul.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "seviye testi seviye secimi",
    secim("mobile/src/screens/PlacementScreen.tsx", /acceptPlacement\(result\.id, level\)/),
    secim("src/components/placement/placement-test.tsx", /action: "accept"[\s\S]{0,120}?chosen|level: chosen/),
  );
}

/* ── 73. "gun" YAZMA anahtari gonderiliyor mu ─────────────────────────────
 * Bir ucun `clampDay(body.day)` yazmasi sunun isareti: satir O GUNE yaziliyor
 * ve gunluk sayimlar (kota, seri, gorev) o gunun satirlarindan cikiyor. Gun
 * gonderilmezse SUNUCUNUN gunu (UTC) isliyor - gece yarisindan sonra yapilan
 * is dunku gune dusuyor. `/api/assess` tam boyleydi: web bastan beri
 * gonderiyordu, mobil dort cagri yerinin hicbirinde gondermiyordu.
 *
 * Olculen sey CAGRI YERI degil UC: bir ucun yazma cagrilarindan en az biri gun
 * tasiyorsa o platform "gonderiyor" sayiliyor. Cagri yeri basina olcmek yanlis
 * pozitif uretiyordu - ayni ucun bazi eylemleri (mock-exam `save`) gun
 * istemiyor, ve web cagriyi bir yardimcidan (`post`) geciriyor, yani uc adi
 * cagri yerinde hic gecmiyor. */
{
  const gunIsteyen = [];
  const gez = (yol) => {
    for (const e of readdirSync(new URL("../src/app" + yol, import.meta.url), { withFileTypes: true })) {
      if (e.isDirectory()) gez(yol + "/" + e.name);
      else if (e.name === "route.ts" && /clampDay\(/.test(read("src/app" + yol + "/route.ts"))) gunIsteyen.push(yol);
    }
  };
  gez("/api");

  const gunGonderenler = (kokler) => {
    const dosyalar = [];
    const yurut = (d) => {
      for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
        const p = d + "/" + e.name;
        if (e.isDirectory()) { if (!/node_modules|__tests__|\/data\//.test("/" + p)) yurut(p); }
        else if (/\.tsx?$/.test(e.name)) dosyalar.push(p);
      }
    };
    for (const k of kokler) yurut(k);
    const gonderen = new Set();
    const cagiran = new Set();
    for (const f of dosyalar) {
      const src = read(f).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
      for (const uc of gunIsteyen) {
        let i = -1;
        while ((i = src.indexOf(uc, i + 1)) >= 0) {
          const pencere = src.slice(i, i + 900);
          if (!/JSON\.stringify\(\{/.test(pencere)) continue;
          cagiran.add(uc);
          if (/\bday\b/.test(pencere)) gonderen.add(uc);
        }
      }
    }
    return { gonderen, cagiran };
  };
  const m = gunGonderenler(["mobile/src"]);
  const w = gunGonderenler(["src/components", "src/lib", "src/app/(app)"]);
  /* Yalniz IKI TARAFIN DA cagirdigi uclar karsilastiriliyor: bir tarafta hic
     cagrilmayan uc bu bolumun sorusu degil (onu check:endpoints tutuyor). */
  const ortak = gunIsteyen.filter((u) => m.cagiran.has(u) && w.cagiran.has(u));
  const eksikMobil = ortak.filter((u) => !m.gonderen.has(u) && w.gonderen.has(u));
  const eksikWeb = ortak.filter((u) => !w.gonderen.has(u) && m.gonderen.has(u));
  sameList(
    "gun anahtari tasiyan uclar",
    eksikMobil.length ? eksikMobil.map((u) => u + " (mobil gondermiyor)") : ["yok"],
    eksikWeb.length ? eksikWeb.map((u) => u + " (web gondermiyor)") : ["yok"],
    "mobil eksigi",
    "web eksigi",
  );
}

/* ── 74. tur boru hattinda tip kacisi ─────────────────────────────────────
 * `as unknown as` bir sozlesme kacisi: tip yanlis oldugunu soylemek yerine
 * susturuluyor. Tur boru hattinda tam bir ornegi vardi - sunucu `cloze` ve
 * `plural` turlarinda sikleri DUZ DIZGE gonderiyor (o turlarda ikinci dil
 * satiri yok), `choice` ve `listen` turlarinda NESNE; mobil tipi yalnizca
 * nesneyi biliyordu ve iki cagri yeri kacisla gecistiriyordu. Alan bicimi
 * degisirse hata derlemede degil CALISMA ANINDA cikardi - hem de sessizce:
 * sik listesi bos gorunur ve tur "kendini degerlendir"e duserdi.
 *
 * Web ayni seyi oyun basina ayri tiplerle soyluyor (`Round` birlesimi), yani
 * orada kacisa gerek yok. Iki taraf da SIFIR tasimali. */
{
  const kacis = (yollar, re) => yollar.map((p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return (src.match(re) ?? []).length;
  }).reduce((a, b) => a + b, 0);
  const MOBIL = ["mobile/src/game/rounds.tsx", "mobile/src/game/session.ts"];
  const WEB = ["src/components/session-player.tsx", "src/lib/types.ts", "src/lib/session.ts"];
  /* Iki kacis bicimi de sayiliyor. Ikincisi `round.word!`: tip "olmayabilir"
     diyor, kod "vardir" diye kestiriyor. Sekiz tur bileseni boyle yaziyordu;
     sunucu kelimesiz bir tur uretse sonuc derleme hatasi degil, calisma
     aninda bos ekran olurdu. */
  const olcu = (yollar) => [
    "birlesim kacisi=" + kacis(yollar, /as unknown as/g),
    "unlem=" + kacis(yollar, /\bround\.[a-zA-Z]+!/g),
  ];
  sameList("tur boru hattinda tip kacisi", olcu(MOBIL), olcu(WEB));
}

/* ── 75. yalniz simge tasiyan dugmenin ADI var mi ─────────────────────────
 * Icinde metin olmayan bir dugme, ekran okuyucuda "dugme" diye okunur: ne
 * yaptigi soylenmez. Web bunu `aria-label` ile, mobil `accessibilityLabel`
 * ile veriyor ve iki tarafta da SIFIR etiketsiz dugme olmali. Olcum tek
 * cocugu simge olan dugmelere bakiyor - metinli dugmede ad zaten metnin
 * kendisi. */
{
  const gez = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__/.test("/" + p)) gez(p, out); }
      else if (e.name.endsWith(".tsx")) out.push(p);
    }
    return out;
  };
  const say = (kokler, re, etiket) => {
    let n = 0;
    for (const k of kokler) for (const f of gez(k)) {
      for (const m of read(f).matchAll(re)) if (!m[1].includes(etiket)) n++;
    }
    return n;
  };
  const mobil = say(["mobile/src"], /<PressableScale\b([^>]*)>\s*<[A-Za-z]+Icon\b[^>]*\/>\s*<\/PressableScale>/g, "accessibilityLabel");
  const web = say(["src/components", "src/app"], /<button\b([^>]*)>\s*<[A-Za-z]+Icon\b[^>]*\/>\s*<\/button>/g, "aria-label");
  /* Anahtar (Switch) da metinsiz bir denetim: ekran okuyucu yanindaki basligi
     kendiliginden ILISKILENDIRMIYOR, "acik anahtar" deyip neyin anahtari
     oldugunu soylemiyor. Webin karsiligi `<input type="checkbox">` ve orada
     etiket `<label>` ile bagli, o yuzden sayim mobile ozel - beklenen sifir. */
  const anahtar = say(["mobile/src"], /<Switch\b([^>]*)\/>/g, "accessibilityLabel");
  sameList("etiketsiz simge dugmesi", ["adsiz dugme=" + mobil, "adsiz anahtar=" + anahtar], ["adsiz dugme=" + web, "adsiz anahtar=0"]);
}

/* ── 76. basili kalan cipin DURUMU soyleniyor mu ──────────────────────────
 * Secili cip gorsel olarak belli ama ekran okuyucu rengi gormez: durumu
 * ayrica soylenmeli. Mobil bunu MERKEZDEN veriyor (`ui/Chip`
 * accessibilityState), web her cagri yerinde kendi soyluyor - o yuzden webde
 * unutulabiliyor ve iki yerde unutulmustu (dinleme oynaticisinin "yavas" ve
 * "metni goster" cipleri). Olcum: `chip-active` yazan her dosyada en az o
 * kadar `aria-*` durum bildirimi olmali. */
{
  const gez = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__/.test("/" + p)) gez(p, out); }
      else if (e.name.endsWith(".tsx")) out.push(p);
    }
    return out;
  };
  const eksik = [];
  for (const f of gez("src/components")) {
    const src = read(f);
    const cip = (src.match(/chip-active/g) ?? []).length;
    if (!cip) continue;
    const durum = (src.match(/aria-(?:pressed|current|selected)/g) ?? []).length;
    if (durum < cip) eksik.push(f.split("/").pop() + " (" + cip + " cip, " + durum + " durum)");
  }
  /* Mobil tarafta cip TEK bilesen: durum orada bir kez yaziliyor, cagri yeri
     basina unutulamaz. Kapi yine de bilesenin durumu verdigini dogruluyor. */
  const mobilEksik = /accessibilityState=\{\{ selected: active \}\}/.test(read("mobile/src/ui/Chip.tsx")) ? [] : ["ui/Chip durum vermiyor"];
  sameList("cip durum bildirimi", mobilEksik.length ? mobilEksik : ["yok"], eksik.length ? eksik : ["yok"], "mobil", "web");
}

/* ── 77. seviye testi sonucu kaydedilemediginde ───────────────────────────
 * On dakikalik testin sonucu kayit dusunce ekrandan silinmemeli: puanlama
 * SAF bir islev ve sunucu da onu kullaniyor, yani ayni sonucu istemcide
 * hesaplamak uydurmak degil. Web hata kartina dusup testi yok ediyordu.
 * Ucu birden gerekiyor: yerel sonuc, kaydedilmedigini SOYLEMEK ve seviyeyi
 * yine de uygulamak (kabul edilecek satir yoksa profile yazarak). */
{
  const kurtarma = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "yerel sonuc=" + (/scorePlacement\(|estimateLevel\(/.test(src) ? "var" : "yok"),
      "uyari=" + (src.includes("placement.not_saved") ? "var" : "yok"),
      "seviye yine de=" + (/api\/profile|updateProfile\(/.test(src) ? "var" : "yok"),
      "tekrar dene=" + (src.includes("common.try_again") ? "var" : "yok"),
    ];
  };
  sameList("seviye testi kayit kurtarma", kurtarma("mobile/src/screens/PlacementScreen.tsx"), kurtarma("src/components/placement/placement-test.tsx"));
}

/* ── 78. gelen kutusu: tur → simge ve tur → gidilen yer ───────────────────
 * Sunucu dokuz bildirim turu gonderiyor. Iki tarafin da AYNI turleri
 * tanimasi gerekiyor: taninmayan tur genel bir simgeye ve akisa dusuyor,
 * yani satir neyle ilgili oldugunu soylemiyor ve dokununca baska yere
 * goturuyor. `league_up` boyleydi - aktoru de olmadigi icin ekranda hicbir
 * ipucu kalmiyordu. */
{
  const kume = (p, blok) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf(blok);
    if (i < 0) return ["bulunamadi"];
    /* Pencere islevin KENDISIYLE sinirli: sabit uzunluktaki bir pencere
       komsu islevin `case`lerini de yutuyordu (yonlendirme haritasi, simge
       haritasindan `friend_milestone` calmisti). */
    const son = src.indexOf("\n}", i);
    const govde = src.slice(i, son < 0 ? i + 1400 : son);
    return [...new Set([...govde.matchAll(/case "([a-z_]+)"/g)].map((m) => m[1]))].sort();
  };
  sameSet("gelen kutusu simgeleri", kume("mobile/src/screens/InboxScreen.tsx", "function tileFor"), kume("src/components/social/inbox.tsx", "function tileFor"), "mobil", "web");
  sameSet("gelen kutusu yonlendirmesi", kume("mobile/src/screens/InboxScreen.tsx", "function open("), kume("src/components/social/inbox.tsx", "function hrefFor"), "mobil", "web");
}

/* ── 79. yazilarim listesinde tur adlari ──────────────────────────────────
 * `/api/assessments` dort tur dondurüyor: writing, sentence, speaking,
 * roleplay. Mobil listesi yalniz ikisini biliyordu; otekiler HAM ANAHTARIYLA
 * ("sentence") ciziliyordu - kullanici satirin ne oldugunu anlamiyordu.
 * Iki tarafin haritasi ayni turleri ve AYNI sozluk anahtarlarini tasimali. */
{
  const harita = (p, ad) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const i = src.indexOf(ad);
    if (i < 0) return ["bulunamadi"];
    const govde = src.slice(i, src.indexOf("};", i));
    return [...govde.matchAll(/([a-z]+):\s*"([^"]+)"/g)].map((m) => m[1] + "=" + m[2]).sort();
  };
  /* Satirin ust cizgisi ayni ucluyu tasimali: tur, seviye, GUN. Gun mobilde
     yoktu - "ne zaman yazmistim" sorusu listede cevapsizdi. */
  const ucLu = (p, re) => (re.test(read(p)) ? ["tur+seviye+gun"] : ["eksik"]);
  sameList(
    "yazilarim satir basligi",
    ucLu("mobile/src/screens/WritingsScreen.tsx", /w\.level\} · \{w\.day\}/),
    ucLu("src/components/writings-card.tsx", /it\.level\} · \{it\.day\}/),
  );
  sameSet(
    "yazilarim tur adlari",
    harita("mobile/src/screens/WritingsScreen.tsx", "const KIND_KEY"),
    harita("src/components/writings-card.tsx", "const KIND_LABEL_KEYS"),
    "mobil", "web",
  );
}

/* ── 80. seviye rengi ─────────────────────────────────────────────────────
 * Paletin kendi yorumu seviyelere renk veriyor (mint=A1, sky=A2, violet=B1,
 * brand=B2, rose=C1) ve web ilerleme seridini oyle ciziyor. Mobil bes seviyeyi
 * de YESIL ciziyordu: seviyeler birbirinden yalnizca yazidan ayirt ediliyor,
 * paletteki bilgi ekranda hic gorunmuyordu. Esleme iki tarafta da ayni
 * olmali - renk kimlik tasiyorsa iki uygulamada ayni kimligi tasimali. */
{
  const esle = (p, re, cev) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [...src.matchAll(re)].map((m) => m[1] + "=" + cev(m[2])).sort();
  };
  const mobil = esle(
    "mobile/src/screens/ProgressScreen.tsx",
    /case "(A1|A2|B1|B2|C1)": return colors\.([a-z]+);/g,
    (v) => v,
  );
  /* Mobil `default` dali B2'yi tasiyor (birebir yazmak yerine); kapi onu da
     listeye ekliyor ki iki taraf ayni bes satiri gostersin. */
  if (mobil.length && !mobil.some((x) => x.startsWith("B2="))) mobil.push("B2=primary");
  const jetonMobil = { success: "mint", info: "sky", accent: "violet", danger: "rose", primary: "brand" };
  const web = esle(
    "src/components/progress-view.tsx",
    /(A1|A2|B1|B2|C1): "var\(--color-([a-z]+)\)"/g,
    (v) => v,
  );
  sameSet(
    "seviye renkleri",
    mobil.map((x) => x.replace(/=(\w+)$/, (_, k) => "=" + (jetonMobil[k] ?? k))).sort(),
    web,
    "mobil", "web",
  );
}

/* ── 81. beceri ve patika turu simgeleri ──────────────────────────────────
 * Ayni uc kavram (okuma, dinleme, yazma) iki uygulamada IKI AYRI cizimle
 * gosteriliyordu: web `BookOpen`/`Headphones`/`Pen`, Android kendi
 * `Read`/`Listen`/`Write` ailesi. Simge bir kavramin kimligiyse iki
 * uygulamada ayni kimlik olmali - ustelik iki tarafta da her iki aile
 * mevcut, yani ayrisma bir eksiklikten degil SECIMDEN geliyordu. */
{
  const simge = (p, re) => [...read(p).matchAll(re)].map((m) => m[1] + "=" + m[2]).sort();
  sameSet(
    "beceri simgeleri",
    simge("mobile/src/screens/SkillsScreen.tsx", /key: "(reading|listening|writing|speaking|grammar)"[^}]*icon: ([A-Za-z]+Icon)/g),
    simge("src/components/skills/theme.ts", /^  (reading|listening|writing|speaking|grammar): ([A-Za-z]+Icon),$/gm),
    "mobil", "web",
  );
  sameSet(
    "patika turu simgeleri",
    simge("mobile/src/ui/unitKind.tsx", /^  (read|listen|write|grammar|quiz|lesson|checkpoint): \(p\) => <([A-Za-z]+Icon)/gm),
    simge("src/components/immersion/unit-pane.tsx", /case "(read|listen|write|grammar|quiz|lesson|checkpoint)":\s*\n?\s*return <([A-Za-z]+Icon)/g),
    "mobil", "web",
  );
}

/* ── 82. basarim duvarinin hata durumu ────────────────────────────────────
 * Yuklenemeyen bir liste "basligin altinda bombos sayfa" demek: kullanici
 * ekranin bozuk oldugunu saniyor. Iki taraf da AYNI kabugu cizmeli - kupa
 * simgesi, baslik, sebep ve tekrar deneme. Mobilde ciplak bir cumle vardi. */
{
  const kabuk = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "kart=" + (/EmptyCard/.test(src) ? "var" : "yok"),
      "kupa=" + (/TrophyIcon/.test(src) ? "var" : "yok"),
      "baslik=" + (src.includes('achievements.achievements') ? "var" : "yok"),
      "sebep=" + (src.includes("achievements.couldn_t_load_achievements") ? "var" : "yok"),
      "tekrar dene=" + (src.includes("common.try_again") ? "var" : "yok"),
    ];
  };
  sameList("basarim hata kabugu", kabuk("mobile/src/screens/AchievementsScreen.tsx"), kabuk("src/components/achievement-wall.tsx"));
}

/* ── 83. ses ipuclari: hangi olayin sesi var ──────────────────────────────
 * Ses bir geri bildirim kanali: telefona bakmayan kullanici (yuruyus modu,
 * cebteki telefon) olan biteni YALNIZ sesten anliyor. Webde on uc ipucu
 * vardi, mobilde yedi - turun acilisi, rozet acilisi, sure uyarisi, rekor ve
 * kusursuz tur MOBILDE YOKTU. Varlik farki sanilmisti (web-parity §11.15) ama
 * uc calma yolu da nota TABLOSUNDAN sentezliyor; eksik olan satirlardi.
 *
 * `stage` webe ozel kaliyor: etap karti mobilde yok. */
{
  /* Birlesimin SON satiri noktali virgulle bitiyor; ilk yazimda desen onu
     kaciriyordu ve iki taraf da kendi son ipucunu kaybediyordu. */
  const kumeM = new Set([...read("mobile/src/lib/sfxNotes.ts").matchAll(/^  \| "([a-z]+)";?$/gm)].map((m) => m[1]));
  const kumeW = new Set([...read("src/lib/sfx.ts").matchAll(/^  \| "([a-z]+)";?$/gm)].map((m) => m[1]));
  kumeW.delete("stage");
  sameSet("ses ipuclari", [...kumeM].sort(), [...kumeW].sort(), "mobil", "web (stage haric)");

  /* Ipucu VAR olmasi yetmez, CALINMASI da gerek: her ipucunun iki tarafta da
     en az bir cagri yeri olmali. */
  const cagrilan = (kokler, re) => {
    const dosyalar = [];
    const gez = (d) => {
      for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
        const p = d + "/" + e.name;
        if (e.isDirectory()) { if (!/node_modules|__tests__/.test("/" + p)) gez(p); }
        else if (/\.tsx?$/.test(e.name)) dosyalar.push(p);
      }
    };
    for (const k of kokler) gez(k);
    const set = new Set();
    for (const f of dosyalar) for (const m of read(f).matchAll(re)) { set.add(m[1]); if (m[2]) set.add(m[2]); }
    return set;
  };
  const cM = cagrilan(["mobile/src"], /sfx\(\s*(?:[a-zA-Z]+ \? )?"([a-z]+)"(?: : "([a-z]+)")?/g);
  /* Web mikrofon ipuclarini bir sarmalayicidan caliyor (`walkCue`), cunku
     ekran kapaliyken WebAudio askiya aliniyor; sarmalayici da sayiliyor. */
  const cW = cagrilan(["src/components", "src/lib"], /(?:play|walkCue|pocketWalkCue)\(\s*(?:[a-zA-Z]+ \? )?"([a-z]+)"(?: : "([a-z]+)")?/g);
  cW.delete("stage");
  sameSet("calinan ses ipuclari", [...cM].sort(), [...cW].sort(), "mobil", "web (stage haric)");
}

/* ── 84. geri bildirim TEK cagriyla veriliyor mu ──────────────────────────
 * Iki tarafta da haptik sarmalayicisi sesi de caliyor (`haptic` → `sfx`,
 * `vibrate` → `play`). Ikisini birden yazmak sesi iki kez tetikliyor; mobilde
 * dort cagri yeri boyleydi ve ses yalnizca `sfx` icindeki 120 ms yineleme
 * penceresi sayesinde tek duyuluyordu - pencereye bagli, gorunmez bir denge.
 * Iki tarafta da SIFIR cift cagri olmali. */
{
  const cift = (kokler, re) => {
    const bulunan = [];
    const gez = (d) => {
      for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
        const p = d + "/" + e.name;
        if (e.isDirectory()) { if (!/node_modules|__tests__/.test("/" + p)) gez(p); }
        else if (/\.tsx?$/.test(e.name)) {
          /* Yorumlar ONCE atiliyor: sarmalayicinin kendi aciklamasi kaliba
             ornek olarak `haptic("correct"); sfx("correct")` yaziyor ve kapi
             onu gercek bir cagri sanmisti. */
          const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
          for (const satir of src.split("\n")) if (re.test(satir)) bulunan.push(p.split("/").pop());
        }
      }
    };
    for (const k of kokler) gez(k);
    return bulunan.sort();
  };
  const m = cift(["mobile/src"], /haptic\("([a-z]+)"\)[\s\S]*sfx\("\1"\)/);
  const w = cift(["src/components"], /vibrate\("([a-z]+)"\)[\s\S]*play\("\1"\)/);
  sameList("cift geri bildirim cagrisi", m.length ? m : ["yok"], w.length ? w : ["yok"]);
}

/* ── 85. kelime listesi satirinin alanlari ────────────────────────────────
 * Kayit defteri §11.11 bu satiri "web ileride, karar Samet'te" diye
 * birakmisti: Android satiri duz, web satiri aciliyordu. Sonraki turlarda uc
 * ve ekran genisletildi ama KAYIT eskidi. Kapi artik iki satirin ayni
 * alanlari gosterdigini olcuyor - kayit degil kod konusuyor. */
{
  const alanlar = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "ingilizce=" + (/\b(w|r)\.en\b/.test(src) ? "var" : "yok"),
      /* Mobil ikisini bir yardimciya sarmis (`grammarLine` → `typLabel` +
         `grammarNote`), web ikisini satirda yan yana yaziyor: aranan sey
         etiketin kendisi. */
      "tur ve cogul=" + (/typLabel\(|grammarLine\(/.test(src) ? "var" : "yok"),
      "ornek cumle=" + (/firstExample\(|ExampleLines/.test(src) ? "var" : "yok"),
      "tekrar takvimi=" + (/dueLabel/i.test(src) ? "var" : "yok"),
      /* Alanin TIPTE gecmesi yetmez, CIZILMESI gerek: ilk yazim yalnizca adi
         ariyordu ve satirdan silinse bile tip tanimi yuzunden "var" diyordu. */
      "unutma sayisi=" + (/\.lapses \?/.test(src) ? "var" : "yok"),
      "suluk=" + (/leech/.test(src) ? "var" : "yok"),
      "seviye=" + (/\{(?:w|r)\.niveau\}/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("kelime satiri alanlari", alanlar("mobile/src/screens/WordsScreen.tsx"), alanlar("src/components/word-list.tsx"));
}

console.log(
  fails === 0
    ? "\n" + C.ok + C.b + "KAYIT DEFTERLERI ESIT" + C.off + "\n"
    : "\n" + C.bad + C.b + fails + " AYRISMA" + C.off + "\n",
);
process.exit(fails === 0 ? 0 : 1);

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
import { existsSync, readFileSync, readdirSync } from "node:fs";

const ESC = String.fromCharCode(27);
/** 209: `PALETTE` tablosunun govdesi - dosyadaki baska cift dizilerini alma. */
function govdeAl209(src) {
  const i = src.indexOf("PALETTE");
  if (i < 0) return "";
  const j = src.indexOf("];", i);
  return j < 0 ? "" : src.slice(i, j);
}

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

  /* Kartın ALTINDAKİ satır da: oyunun ne yaptırdığını söyleyen tek cümle.
     Mobil kart yalnız adı gösteriyordu, yani "Cümleyi Diz" ile "Cümleyi
     Çevir" arasındaki farkı bilmeyen kullanıcı oyunu açmadan seçemiyordu. */
  const ipucu = (p, re) => [...read(p).matchAll(re)].map((x) => x[1]);
  sameList(
    "pratik karti aciklamalari",
    ipucu("mobile/src/game/session.ts", /hint: "(prac\.\w+)"/g),
    ipucu("src/app/(app)/learn/practice/page.tsx", /hint: "(prac\.\w+)"/g),
  );
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
    speak: "Yalnız yürüyüş modunda üretiliyor ve orada kendi oynatıcısı var; genel dağıtıcıya hiç düşmüyor.",
  };
  const web = [...(read("src/lib/types.ts").match(/export type GameId =(.*?);/s)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((x) => x[1]);
  const mob = [...read("mobile/src/game/rounds.tsx").matchAll(/round\.game === "(\w+)"/g)].map((x) => x[1]);
  const missing = [...new Set(web)].filter((g) => !mob.includes(g));
  const unexplained = missing.filter((g) => !(g in KNOWN_GAPS));
  /* Kapanan bir boşluk listede kalmamalı: gerekçe artık yanlış olur ve bir
     sonraki okuyan "mobilde bu tur yok" diye bilir. (`check:endpoints`in
     `stale` denetimi, `check:colors`ın karşılıksız istisnası — aynı kural.) */
  const kapanan = Object.keys(KNOWN_GAPS).filter((g) => !missing.includes(g));
  if (!web.length || !mob.length) fail("tur turleri okunamadi", [`web ${web.length}, mobil ${mob.length}`]);
  else if (unexplained.length || kapanan.length) {
    fail("mobilde cizilemeyen tur", [
      ...unexplained.map((g) => `${g}: gerekcesi yok - ya oynatici ekle ya KNOWN_GAPS'e sebebiyle yaz`),
      ...kapanan.map((g) => `${g}: bosluk KAPANMIS (mobil artik ciziyor) - KNOWN_GAPS'ten cikar`),
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

  const susturma = (src, re) => (re.test(src) ? "susturuluyor" : "SUSTURULMUYOR");
  /* Oynanamayan tur turu susturuluyor mu diye soran iki kapi BURADAYDI ve
     ikisi de "mobil susturmali" diyordu. Bosluk kapandi: tur artik mobilde de
     oynaniyor, susturma kalkti ve olcum tersine dondu (§171 "tur susturmasi").
     Kapiyi guncellemek yerine birakmak, kapanan bir boslugu kurum gibi
     korumak olurdu. */
  /* Ucun suzgeci DURUYOR ve durmali: istemci bir turu cizemiyorsa ona
     soyleyebilmeli. Bugun kullanan yok; yarin yeni bir tur turu geldiginde
     ilk carkta o kullanilacak. */
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
  /* `partners` ve `level` BURADAN ELENIYORDU: webin `free_sentence` uyesine
     ait bu iki alani mobil tanimiyordu ve suzgec o boslugu "fazla degil"
     diye gecistiriyordu. Tur mobile geldi (§171), alanlar da geldi; suzgec
     kalkti. */
  const webRound = alanlar(seg(web, "export type Round =", "\nexport type Answer = {"));
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
    ["DEFAULT_AVATAR", "src/lib/avatar-config.ts", "mobile/src/lib/avatar.ts"],
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
    ["ALL_DONE_ID", "src/lib/quest-constants.ts", "mobile/src/game/quests.ts"],
    ["ALL_DONE_XP", "src/lib/quest-constants.ts", "mobile/src/game/quests.ts"],
  ];
  for (const [name, wp, mp] of PAIRS) sameList("sabit " + name, val(mp, name), val(wp, name));

  /* ARMA TURETIMI. Avatar secmemis kisi kimliginden turetilen armayla
     ciziliyor ve o arma bir KIMLIK: ayni kisi telefonda ve tarayicida ayni
     gorunmeli. Bir zamanlar gorunmuyordu - renkler ayniydi ama mobil duz bir
     capraz gradyan, web dondurulmus bir gradyan + desen ciziyordu. Burasi
     hash'i, paleti, desen listesini ve uc secici ifadeyi karsilastiriyor. */
  const crest = (p) => {
    const src = read(p);
    const kes = (desen) => {
      const m = src.match(desen);
      return m ? norm(m[0]) : "YOK";
    };
    return [
      kes(/function hash\(seed: string\): number \{[\s\S]*?\n\}/),
      kes(/const PALETTE: \[string, string\]\[\] = \[[\s\S]*?\n\];/),
      kes(/const PATTERNS = \[[^\]]+\] as const;/),
      kes(/const h = hash\([^;]+\);/),
      kes(/PALETTE\[[^\]]+\]/),
      kes(/PATTERNS\[[^\]]+\]/),
      kes(/rotate = [^;]+/),
    ];
  };
  sameList("arma turetimi", crest("mobile/src/ui/Avatar.tsx"), crest("src/components/avatar.tsx"));

  /* AVATAR COZUMLEME. Iki taraf ayni ham JSON'u okuyor (sunucudaki tek kayit);
     birinin kabul edip otekinin attigi bir parca, ayni kisinin iki platformda
     farkli gorunmesi demek. `null` = hic secmemis ayrimi da burada. */
  const parseAv = (p) => {
    const src = read(p);
    const kes = (desen) => {
      const m = src.match(desen);
      return m ? norm(m[0]) : "YOK";
    };
    return [
      kes(/const ID = [^\n]+/),
      kes(/const HEX = [^\n]+/),
      kes(/const part = [^\n]+/),
      kes(/export function parseAvatar\(raw: unknown\): AvatarConfig \| null \{[\s\S]*?\n\}/),
    ];
  };
  sameList("avatar cozumleme", parseAv("mobile/src/lib/avatar.ts"), parseAv("src/lib/avatar-config.ts"));

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

/* ── 25. gorev panosunun toplu odulu ve kimligi ─────────────────────
 * Bu kapi once "kartin yazdigi sayi sunucunun sabitiyle ayni mi" diye
 * soruyordu ve dogru cevabi almasina ragmen YANLIS SORUYDU: sayinin kartin
 * icinde yazili OLMASI kusurdu, degeri degil. Sebep yapisaldi - `lib/quests`
 * `server-only`, `quest-card` istemci bileseni, o yuzden kart hem odulu hem
 * de toplu gorevin kimligini ("all", uc yerde) elle yaziyordu.
 *
 * Sabitler `lib/quest-constants` icine (server-only DEGIL) tasindi; `quests`
 * oradan yeniden disa veriyor, kart dogrudan oradan aliyor. Kapi artik
 * "sayi kac yerde yazili" diye soruyor: kartta ne odul rakami ne de kimlik
 * dizgesi kalmali, ikisi de ice alinmali. Mobil zaten kendi sabitini ice
 * aliyor (bkz. 22, cift `mobile/src/game/quests.ts` <-> quest-constants). */
{
  const src = read("src/lib/quest-constants.ts");
  const odul = (src.match(/export const ALL_DONE_XP\s*=\s*(\d+)/) ?? [])[1];
  sameList("toplu odul kaynagi", [odul ? "sayi var" : "SAYI YOK"], ["sayi var"], "quest-constants", "beklenen");

  /* Yorum ayiklanir (satir sayisi korunarak): gerekce metnindeki rakam ya da
     "all" kelimesi bulgu sayilmasin. */
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/\/\/[^\n]*/g, "");
  const card = strip(read("src/components/quest-card.tsx"));
  /* Kartin toplu odul kutusu: `board.allDone` blogundan sonrasi. */
  const box = card.slice(card.indexOf("board.allDone"));
  /* Bos liste ile karsilastirmak YETMEZ (`sameList` iki tarafi da bos gorup
     duser). Her satir "var"/"yok" isaretiyle yazilir ve MUTLAK beklenen
     listeyle karsilastirilir - olculemeyen taraf sessizce yesil kalamasin. */
  const bulgu = [
    "ice alim=" + (/import \{[^}]*ALL_DONE_XP[^}]*\} from "@\/lib\/quest-constants"/.test(card) ? "var" : "YOK"),
    "elle odul=" + (new RegExp("\\b" + odul + "\\b").test(box) ? "VAR" : "yok"),
    "elle kimlik=" + (/"all"/.test(box) ? "VAR" : "yok"),
  ];
  sameList("toplu odul kartta elle yazili degil", bulgu, ["ice alim=var", "elle odul=yok", "elle kimlik=yok"], "bulunan", "beklenen");
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
   * ikisini kapi ayirt edemez. Bugunku altisi da mesru: farkli listelerin
   * sayfa boyu, farkli modlarin esikleri, farkli metinlerin uzunluk tavani.
   *
   * `DAILY_LIMIT` BU LISTEDEN CIKTI ve cikis sebebi kaydedilmeye deger: uc
   * ayri ucta ayni adla ayri sayilar duruyordu (400, 120, 20) ve bu "mesru
   * tesaduf" sayilmisti. Oysa uc sayi da kullanim sartlarinda YAZILI bir
   * sozdu; kaynak `lib/quotas` olunca ad artik tek degere isaret ediyor.
   * Yani belirsizligin bir kismi tesaduf degil, tek kaynagin eksikligiydi.
   */
  const BELIRSIZ = ["DANGER_SECONDS", "MAX_CHARS", "MAX_TARGET", "MIN_CONFIDENCE", "PAGE_SIZE", "PASS_RATIO"];
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
    const tam = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    /* YALNIZ CEVIRI TURUNUN GOVDESI. Mobil dosyasi butun turlari tasiyor ve
       olcum "dosyadaki ilk `prompt:`" diyordu: serbest cumle turu eklenince
       kapi onun istemini ceviri turunun istemi sandi. Dilim turun kendi
       fonksiyonundan basliyor; webin dosyasi zaten tek tur. */
    const bas = tam.indexOf("function TranslateRound");
    const src = bas < 0 ? tam : tam.slice(bas);
    const istem = (src.match(/prompt:\s*(`[^`]*`)/) ?? [])[1];
    /* Sayilar DOSYANIN TAMAMINDAN: sabitler modulun tepesinde, turun
       fonksiyonundan once duruyor - dilim onlari kesiyordu. */
    return [
      "istem=" + (istem ? istem.replace(/\$\{[^}]*\}/g, "${}") : "yok"),
      "bekleme=" + ((tam.match(/ASSESS_WAIT_MS\s*=\s*(\d+)/) ?? [])[1] ?? "yok"),
      "esik=" + ((tam.match(/ASSESS_ACCEPT\s*=\s*(\d+)/) ?? [])[1] ?? "yok"),
      "soz=" + ((tam.match(/split\(\/\\s\+\/\)\.length\s*>=\s*(\d+)/) ?? [])[1] ?? "yok"),
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
  /* Web istemcisine ozgu olmasi MESRU olanlar; her biri bir yuzey farki.
     UCU LISTEDEN DUSTU (page_view, time_spent, client_error): "tarayici olcum
     katmani" diye yazilmislardi ama olculen sey tarayiciya ait degildi -
     hangi ekran acildi, ne kadar kalindi, hangi hata yakalanmadi. Mobil
     bunlari yazmayinca panodaki ekran tablosu yalniz web kullanicilarini
     gosteriyordu, yani veri yanliydi (bkz. §11.178). */
  /* BIRI DAHA DUSTU (push_optin): "tarayici bildirim istemi, mobil karsiligi
     `notif_prime`" diye yaziliydi ve bu, iki adin AYNI SEYI olctugunu kabul
     edip farkli adlarda birakmak demekti - panelin izin hunisi yalniz
     `push_optin` okudugu icin Android kullanicilari hunide hic gorunmuyordu.
     Mobil artik ucuncu sonucu da (verildi/reddedildi/sonra) ayni adla ve ayni
     degerlerle yaziyor; `notif_prime` secilen saat icin duruyor (bkz. §168).

     UCU DAHA DUSTU (challenge_play, walk_listen, walk_switch): ikisi
     "tarayici mikrofon yolu tanilamasi" diye yazilmisti ama olculen sey
     tarayiciya ait degildi - dinleme kac kez bos dondu, tur kac kez cebe
     gecti. Androidde de ikisi de oluyordu ve hicbiri yazilmiyordu, yani
     Azure faturasini yazan kip yalniz web kullanicilarindan gorulebiliyordu
     (bkz. §11.212). `challenge_play`in gerekcesi ise artik dogru degildi:
     hayatta kalma modu mobile geldi (§11.199) ve tur ozetinden girisi de
     eklendi. */
  const WEB_OZEL = [
    "feedback_why_opened", //   kural bagi (`why.href`) IKI TARAFTA da hep null; asagida denetleniyor
    "install_prompt", //        PWA kurulum onerisi
    "invite_open", //           tarayici olcum katmani
    "panel_open", //            tarayici olcum katmani
    "walk_capture", //          tarayicinin getUserMedia kisiti; native kaydedicide karsiligi yok
  ];
  /* `feedback_why_opened` MUAF cunku webde de HIC yazilmiyor: olay kural
     bagina dokunuldugunda yaziliyor, bag ise iki tarafta da her zaman null
     (`lib/why` ve `game/why`: `const href = null`). Gerekce once "mobil
     neden'i her zaman gosteriyor" diye yaziliydi ve bu yanlisti - fark
     gosterme degil, olmayan bir bag. Bag gercek bir adres uretmeye baslarsa
     olay mobilde de gerekli olur ve bu satir duser. */
  const bagVar = ["src/lib/why.ts", "mobile/src/game/why.ts"].some((f) => {
    const src = strip(read(f));
    /* `href` yalnizca `const href = null` uzerinden geliyor mu: baska bir
       deger atanirsa (`href: "/grammar/..."`) bag gercek olmus demektir. */
    return !/const href = null;/.test(src) || /\bhref\s*[:=]\s*[`"']/.test(src);
  });
  if (bagVar) WEB_OZEL.splice(WEB_OZEL.indexOf("feedback_why_opened"), 1);
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
 * OLCUM §183'E TASINDI. Bu kapi ucun kirpmasindan ve iki kaydiricidan SAYI
 * cikarip karsilastiriyordu; yani sayinin uc yerde yazili olmasini veri
 * sayiyordu. Sinir artik tek kaynakta (`lib/profile-limits`, mobilde
 * `lib/profileDefaults`) ve yuzeyler onu okuyor - karsilastirilacak ikinci
 * bir sayi kalmadi. §146'nin basina gelenin aynisi (bkz. §11.278). */

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
  const MUAF = ["mobile/src/ui/Avatar.tsx", "src/components/avatar.tsx"];
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
  /* Muaf dosya hâlâ duruyor mu: yolu değişmiş bir muafiyet sessiz bir delik
     (aynı kural §119'da web sayımının yolları için de var). */
  for (const f of MUAF) if (!existsSync(new URL("../" + f, import.meta.url))) kacak.push(`MUAF yolu yok: ${f}`);
  for (const d of MUAF_KLASOR) if (!existsSync(new URL("../" + d, import.meta.url))) kacak.push(`MUAF_KLASOR yolu yok: ${d}`);
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
      /* Desenler AD SINIRINA kapali (bkz. dosyanin sonundaki oz-denetim):
         `/EmptyCard/` oneki `EmptyCard2`yi de eslesirdi ve yeniden
         adlandirilmis bir bileseni hâlâ "var" sayardi. `icon={Ad}` bicimi
         ikisinde de ayni. */
      "kart=" + (/<EmptyCard[\s/>]/.test(src) ? "var" : "yok"),
      "kupa=" + (/icon=\{TrophyIcon\}/.test(src) ? "var" : "yok"),
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
 * `stage` de geldi: etap karti artik mobilde de var (§108). */
{
  /* Birlesimin SON satiri noktali virgulle bitiyor; ilk yazimda desen onu
     kaciriyordu ve iki taraf da kendi son ipucunu kaybediyordu. */
  const kumeM = new Set([...read("mobile/src/lib/sfxNotes.ts").matchAll(/^  \| "([a-z]+)";?$/gm)].map((m) => m[1]));
  const kumeW = new Set([...read("src/lib/sfx.ts").matchAll(/^  \| "([a-z]+)";?$/gm)].map((m) => m[1]));
  sameSet("ses ipuclari", [...kumeM].sort(), [...kumeW].sort());

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
  sameSet("calinan ses ipuclari", [...cM].sort(), [...cW].sort());
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

/* ── 86. rozet acilis kutlamasi ───────────────────────────────────────────
 * Rozet acilisinin kendi ani var: siraya alinmis tek kartlar, ikiden cogunda
 * TOPLU kart, kapatilabilir ve sesli. Kayit defteri §11.15 bunu "mobilde HIC
 * YOK, karar Samet'in" diye birakmisti; sonraki turlarda mobil kutlamayi
 * kazandi ama KAYIT eskidi. Kapi dort olcuyu birden tutuyor - kutlamanin
 * hangi parcasi dusarse dussun burasi kirmiziya doner. */
{
  const kutlama = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "tekli esik=" + ((src.match(/MAX_SOLO = (\d+)/) ?? [])[1] ?? "yok"),
      "toplu kart=" + (/kind: "batch"/.test(src) ? "var" : "yok"),
      "sira=" + (/kind: "solo", queue/.test(src) ? "var" : "yok"),
      "ses=" + (/(?:sfx|play)\("unlock"\)/.test(src) ? "var" : "yok"),
      "gorulduyu bildir=" + (/seen:/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("rozet acilis kutlamasi", kutlama("mobile/src/ui/AchievementUnlock.tsx"), kutlama("src/components/achievement-unlock.tsx"));
}

/* ── 87. gunun turu: tablonun iki OZEL durumu ─────────────────────────────
 * Gunluk siralamanin iki hali kullaniciya bir sey soylemek zorunda: tablo BOS
 * ("ilk oynayan sen ol") ve tabloda YALNIZ KENDISI var ("ilk sensin, tablo
 * gun ilerledikce doluyor"). Iki platform birer tanesini gosteriyordu: mobil
 * bos hali, web tek satirli hali. Otekinde ekran sessiz kaliyor ve kullanici
 * "kimse oynamamis" ya da "ekran bozuk" saniyor. */
{
  const hal = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "bos tablo=" + (src.includes("daily.be_first_to_play_today") ? "var" : "yok"),
      "tek satir=" + (src.includes("daily.first_today") ? "var" : "yok"),
    ];
  };
  sameList("gunun turu tablo halleri", hal("mobile/src/screens/DailyScreen.tsx"), hal("src/components/daily-player.tsx"));
}

/* ── 88. yazilarim listesinin BOS hali ────────────────────────────────────
 * Bos liste bir cikis yolu vermeli: ne oldugunu anlatan bir satir ve
 * kullaniciyi yazma alistirmalarina goturen bir dugme. Mobilde tek cumle
 * vardi ve "nereye gidecegim" sorusu cevapsizdi. Hata hali AYRI kalmali -
 * agi kopan kullaniciya "yazin yok" demek yanlis. */
{
  const bos = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "baslik=" + (src.includes("writ.empty_title") ? "var" : "yok"),
      "aciklama=" + (src.includes("writ.empty_sub") ? "var" : "yok"),
      "cikis yolu=" + (src.includes("writ.go_to_writing") ? "var" : "yok"),
      "hata ayri=" + (/writings\.couldn_t_load_writings|writ\.load_failed/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("yazilarim bos hali", bos("mobile/src/screens/WritingsScreen.tsx"), bos("src/components/writings-card.tsx"));
}

/* ── 89. sinav kapaginda BOLUMLER ve SURE ─────────────────────────────────
 * "Ne kadar surecek, neler sorulacak" sorusu sinava GIRMEDEN cevaplanmali.
 * Android kapaginda bolum listesi (madde sayilariyla) ve toplam dakika var;
 * web kapagi yalniz basligi ve odaklari gosteriyordu. Sayilar kagittan degil
 * sabit plandan geliyor - kapagi acmak haftanin kagidini harcamamali. */
{
  const kapak = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "bolum listesi=" + (src.includes("exam.sections") ? "var" : "yok"),
      "sure=" + (src.includes("exam.minutes") ? "var" : "yok"),
      "odaklar=" + (src.includes("exam.measures_these") || /focus/.test(src) ? "var" : "yok"),
      "deneme uyarisi=" + (/trial/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("sinav kapagi", kapak("mobile/src/screens/ExamScreen.tsx"), kapak("src/components/exam-player.tsx"));
}

/* ── 90. ekran olcumu: dort soru iki tarafta da cevapli mi ────────────────
 * Panodaki ekran tablosu iki platformu birlikte gosteriyor; biri olcmuyorsa
 * tablo YANLI olur ve bunu okuyan kimse anlamaz. Web dort soruyu tek yerden
 * cevapliyor (`components/telemetry`): hangi ekran acildi, ekranda ne kadar
 * kalindi, gunun ilk acilisi, yakalanmamis hata. Mobil yalniz SEKME
 * dokunusunu ve gunun ilk acilisini yaziyordu - yigin ekranlari (profil,
 * kelimeler, sinav, ayarlar) hic sayilmiyordu. */
{
  const olcum = (yollar) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return ["page_view", "time_spent", "app_open", "client_error"].map((ad) => ad + "=" + (new RegExp('track\\("' + ad + '"').test(src) ? "var" : "yok"));
  };
  /* Olaylarin TANIMLI olmasi yetmez, olcum katmaninin BAGLI olmasi da gerek:
     ilk yazimda kapi yalnizca `track("time_spent")` satirini ariyordu ve
     `attachTelemetry()` cagrisi App'ten silinince kirmizi olmuyordu. */
  const bagli = (p, re) => (re.test(read(p)) ? "var" : "yok");
  sameList(
    "ekran olcumu",
    [...olcum(["mobile/src/lib/telemetry.ts", "mobile/App.tsx"]), "bagli=" + bagli("mobile/App.tsx", /attachTelemetry\(\)/)],
    [...olcum(["src/components/telemetry.tsx", "src/app/error.tsx"]), "bagli=" + bagli("src/components/app-shell.tsx", /<Telemetry/)],
  );
}

/* ── 91. oyun sesleri anahtari ────────────────────────────────────────────
 * Sesleri susturmanin tek yolu telefonu kismak olmamali: bu TTS'i de susturur,
 * yani sessiz bir yerde calismak isteyen kullanici TELAFFUZU da kaybeder.
 * Web ikisini ayiriyor ("telaffuz sesi ayri - bu kapaliyken de calisir") ve
 * mobilde anahtarin kendisi YOKTU. Ayrim iki tarafta da ayni: bayrak yalniz
 * kisa efektleri kapatiyor. */
{
  const ses = (yollar) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "tercih=" + (/soundEnabled\(/.test(src) ? "var" : "yok"),
      "ayar satiri=" + (src.includes("snd.game_sounds") ? "var" : "yok"),
      "olcum=" + (/track\("sound_toggle"/.test(src) ? "var" : "yok"),
      "efekt kapisi=" + (/if \(!soundOn\) return|!soundEnabled\(\)/.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "oyun sesleri anahtari",
    ses(["mobile/src/lib/sfx.ts", "mobile/src/screens/SettingsScreen.tsx"]),
    ses(["src/lib/sfx.ts", "src/components/sound-settings.tsx"]),
  );
}

/* ── 92. yazma turunda ipucu yuzeyi ───────────────────────────────────────
 * Ayni kelime iki platformda AYNI zorlukta yazilmali. Web yazma turunun
 * basliginda "12 harf - S ile basliyor" satirini BEDAVA gosteriyordu;
 * Androidde boyle bir satir yok, harf sayisi ancak ipucu dugmesine basinca
 * (iskelet) goruluyor ve o dugme `hintUsed` gonderip SRS kalitesini
 * dusuruyor. Yani webde ayni cevap daha kolay veriliyor ve sunucu ikisini
 * AYNI kalitede sayiyordu.
 *
 * Olculen uc sey: tur her iki tarafta da yalniz tur/cogul satirini bedava
 * gosteriyor mu, iskelet dugmenin arkasinda mi, ve dugme cezayi yaziyor mu. */
{
  const ipucu = (p, gramer) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "gramer satiri=" + (gramer.test(src) ? "var" : "yok"),
      "bedava harf ipucu=" + (/letter_hint|firstLetter/.test(src) ? "var" : "yok"),
      "iskelet dugme arkasinda=" + (/hintShown \?|shown \?/.test(src) ? "var" : "yok"),
      "ceza=" + (/hintUsed/.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "yazma turu ipucu yuzeyi",
    ipucu("mobile/src/game/rounds.tsx", /grammarLine\(/),
    ipucu("src/components/games/typing-game.tsx", /typLabel\(/),
  );
}

/* ── 93. tur ekranlarindaki WEB-OZEL metinler ─────────────────────────────
 * `src/i18n/web/*` webin kendi anahtarlari icin var ve orasi sessizce
 * buyuyor. `rounds.` uzayindaki her web-ozel anahtar, Androidde OLMAYAN bir
 * satirin ekrana ciktigi anlamina geliyor - ve dort tanesi bedava ipucu
 * cikti: yazma turunda harf sayisi + bas harf, ceviri turunda odak kelimesi
 * chip'i + kelime sayisi, bosluk doldurmada yer tutucunun icindeki ANLAM.
 * Ucu de `hintUsed` gondermiyordu, yani ayni cevap webde daha kolay veriliyor
 * ve SRS ikisini ayni kalitede sayiyordu. Dordu de etiketin tekrariydi
 * (`is_match_right`, `what_you_heard`, `which_plural`, `tap_to_listen`).
 *
 * Kalanlar asagida SEBEBIYLE yazili. Liste bir kabul kaydi, bir bahane degil:
 * yeni bir satir eklemek gerekcesini yazmayi gerektiriyor. */
{
  const SEBEP = {
    /* SERBEST YAZMA TURUNUN ALTI ANAHTARI BURADAYDI ("mobilde oynaticisi
       yok"). Tur mobile geldi (§171) ve altisi da ortak sozluge tasindi:
       artik ikisi de ayni cumleyi soyluyor. */
    /* Bos yuvanin etiketi: webde yuva bir div ve aria-label gerekiyor;
       mobilde ayni yerde GERCEK metin duruyor ("Harflere dokun") ve ekran
       okuyucu onu zaten okuyor. Geri alma etiketleri (`undo_*`) ortak
       sozluge tasindi - orada iki taraf da ayni seyi soyluyor. */
    "rounds.empty_letter_slot": "bos harf yuvasinin aria etiketi; mobilde yerinde gercek metin var (rounds.tap_letters)",
    "rounds.empty_word_slot": "bos kelime yuvasinin aria etiketi; mobilde rounds.tap_words",
    "rounds.great": "yazma turu geri bildirim basligi; mobilde FeedbackFooter kendi basligini kuruyor",
    "rounds.means": "dogru/yanlis kartindaki ayrac sozcugu; mobilde anlam tek satirda birlesiyor",
    "rounds.no_tts": "tarayicida konusma sentezi olmayabilir; Android'de sistem TTS her zaman var",
    "rounds.understood": "tanitim turunun ekran okuyucu etiketi",
    "rounds.write_sentence_ph": "ceviri turu yer tutucusu; mobilde `rounds.write_sentence` hedef dili de yaziyor",
  };
  const web = [...read("src/i18n/web/tr.ts").matchAll(/"(rounds\.[a-z_0-9]+)":/g)].map((m) => m[1]).sort();
  sameList("tur ekranlarinda web-ozel metin", Object.keys(SEBEP).sort(), web);
}

/* ── 94. "neden" kural tablolari ──────────────────────────────────────────
 * Yanlis cevabin gerekcesi. Mobilde yirmi dokuz satirlik bir sadelestirme
 * vardi ("tam gramer tablolari tasinmadi") ve bedeli olculebilirdi: web
 * yanlis cevapta KURALI soyluyordu ("-ung ile bitenler disil", "yan cumlede
 * fiil sona gider", "Kirche ch, Kirsche sch"), Android yalniz dogru cevabi
 * tekrar ediyordu. Ayni hatayi yapan iki kullanicidan biri kurali ogreniyor,
 * oteki kelimeyi ezberliyordu.
 *
 * Olculen sey motorun ICERIGI: artikel kurallari (sira onemli - ilk uyan
 * kazaniyor), cogul desenleri, yazim ipuclari ve hangi hata tiplerinin
 * gerekce aldigi. Plumbing ayri (web `translate(lang, ...)` ile cagriliyor,
 * cunku sunucuda da calisiyor; mobilde `t()` dili zaten biliyor). */
{
  const tablolar = (p) => {
    const src = read(p);
    const art = [...src.matchAll(/artikel: "(der|die|das)", rule: "([a-z.]+)"/g)].map((m) => m[2] + "=" + m[1]);
    const plural = [...src.matchAll(/^\s{2}(\w*): "(plrule\.[a-z]+)",?$/gm)].map((m) => m[1] + "=" + m[2]);
    const sp = [...src.matchAll(/"(sphint\.[a-z]+)"/g)].map((m) => m[1]);
    const kapsam = [...src.matchAll(/^\s{4}case "(\w+)":?$/gm)].map((m) => m[1]);
    return [...art, ...plural, ...new Set(sp), ...kapsam];
  };
  sameList("neden kural tablolari", tablolar("mobile/src/game/why.ts"), tablolar("src/lib/why.ts"));
}

/* ── 95. kural parcaciklari ───────────────────────────────────────────────
 * `RULES` dizisi iki tarafta da BIREBIR ayni olmali: kural kimligi, seviyesi,
 * hata tipi, sozluk anahtari ve Almanca ornek. Mobil kopyasi `i18n-scan`
 * sayimindan muaf (ornekler Almanca icerik) - muafiyetin kapisi burasi. */
{
  const kurallar = (p) => [...read(p).matchAll(/^  r\("([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]*)"/gm)].map((m) => m.slice(1, 6).join("/"));
  sameList("kural parcaciklari", kurallar("mobile/src/game/whyRules.ts"), kurallar("src/lib/why-rules.ts"));
}

/* ── 96. karistirma ciftleri ──────────────────────────────────────────────
 * Ayrim cumleleri (schon/schon, Kirche/Kirsche) elle secilmis icerik; iki
 * kopyanin kelimesi kelimesine ayni kalmasi olculuyor. */
{
  const ciftler = (p) => [...read(p).matchAll(/^  c\("([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)"\),$/gm)].map((m) => m.slice(1, 7).join("/"));
  sameList("karistirma ciftleri", ciftler("mobile/src/lib/confusables.ts"), ciftler("src/lib/confusables.ts"));
}

/* ── 97. yuruyus modunun cikmaz durumlari ─────────────────────────────────
 * Bir ag hatasi BITMIS TUR gibi gosterilmemeli. Androidde kuyruk cagrisinin
 * iki `catch`i de sessizdi ve kullaniciyi "Tur bitti! 0/0 - kaydedildi"
 * ekranina dusuruyordu: once mikrofon izni isteniyor, ekran kilidi aciliyor,
 * arka plan servisi basliyor, karsilama okunuyor, sonra tur bitmis sayiliyor.
 * Ustelik bos kuyrukla (tekrar zamani gelen kelime yoksa) da ayni sey
 * oluyordu. Web `walk-player` uc ayri ekran ciziyor: hata, izin yok, bos.
 *
 * `unsupported` olcum disi: tarayicinin konusma tanimasi olmayabilir, Android
 * kendi tanijicisiyla geliyor. */
{
  const durumlar = (p, re) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return Object.entries(re).map(([ad, x]) => ad + "=" + (x.test(src) ? "var" : "yok"));
  };
  sameList(
    "yuruyus modu cikmaz durumlari",
    durumlar("mobile/src/screens/WalkModeScreen.tsx", {
      hata: /phase === "error"/,
      "izin yok": /phase === "denied"/,
      bos: /setNoMore\(true\); setPhase\("done"\)/,
      duraklama: /phase === "stopped"/,
    }),
    durumlar("src/components/walk-player.tsx", {
      hata: /status === "error"/,
      "izin yok": /status === "denied"/,
      bos: /status === "empty"/,
      duraklama: /status === "paused"/,
    }),
  );
}

/* ── 98. rol yapma sinavi ─────────────────────────────────────────────────
 * WP-22 webde vardi, Androidde YOKTU: ders ozetindeki "Sinav olarak dene"
 * dugmesi ve `/lessons/[id]/exam` yuzeyi yalniz webdeydi, yani ayni dersi
 * bitiren iki kullanicidan yalniz biri olculebiliyordu.
 *
 * Olculen sey sinavin SOZLESMESI: iki sabit (kac tur, kac saniye), modele
 * giden istegin anahtarlari (`mode: "exam"`, rubrik turu, hedef kaliplar,
 * kisitlar, gun) ve sonuc kartinin parcalari (rubrik, en iyi cumleler, en sik
 * hata, yapabilirlik). Yedek puan olcum disi: saglayici kapaliyken web kural
 * tabanli bir puan gosteriyor, mobil hic puan vermiyor - bu ayrim mobilde
 * zaten yerlesik (bkz. `ExamScreen` yazma adimi). */
{
  /* `gun` her tarafta KENDI istegi kuran dosyadan okunuyor: mobilde sinav
     ekrani, webde `assess-client` (orada `day` istemci yardimcisinin icinde
     ekleniyor). Ilk yazimda birlesik govdeye bakiyordu ve ders oynaticisinin
     kendi `day:` satirini gorup yesil kaliyordu - sinavdan `day` silindiginde
     kirmizi OLMADI. */
  const sinav = (yollar, tek) => {
    const kirp = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const src = kirp(yollar.map((p) => read(p)).join("\n"));
    const solo = kirp(read(tek));
    const sabit = (ad) => new RegExp(ad + " = (\\d+)").exec(src)?.[1] ?? "?";
    return [
      "tur=" + sabit("EXAM_TURNS"),
      "saniye=" + sabit("EXAM_SECONDS"),
      "istem modu=" + (/mode: "exam"|mode\b[^\n]*"exam"/.test(src) ? "var" : "yok"),
      "rubrik turu=" + (/kind: "roleplay"/.test(src) ? "var" : "yok"),
      "hedef kaliplar=" + (/targets: lesson\.patterns/.test(src) ? "var" : "yok"),
      "kisitlar=" + (/constraints: \[`\$\{EXAM_TURNS\} tur`/.test(src) ? "var" : "yok"),
      "gun=" + (/day:/.test(solo) ? "var" : "yok"),
      "en iyi cumleler=" + (/rpexam\.best_sentences/.test(src) ? "var" : "yok"),
      "en sik hata=" + (/rpexam\.most_common/.test(src) ? "var" : "yok"),
      "yapabilirlik=" + (/lessonp\.i_can/.test(src) ? "var" : "yok"),
      /* ESKIDEN `/>= 60/` ARANIYORDU. Esik sabite tasininca bu satir iki
         tarafta da "yok" uretecek ve karsilastirma yesil kalacakti - §144'un
         tuzagi. Artik hem sayinin KENDISI hem de ekranin sabiti kullanip
         kullanmadigi okunuyor; mutlak olcut §186-187'de. */
      "esik=" + sabit("EXAM_PASS_SCORE"),
      "esik kaynaktan=" + (/>= EXAM_PASS_SCORE/.test(src) ? "var" : "yok"),
      "giris dugmesi=" + (/lessonp\.try_as_exam/.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "rol yapma sinavi",
    sinav(["mobile/src/screens/RoleplayExamScreen.tsx", "mobile/src/screens/LessonScreen.tsx", "mobile/src/game/roleplay.ts"], "mobile/src/screens/RoleplayExamScreen.tsx"),
    sinav(["src/components/lessons/roleplay-exam.tsx", "src/components/lessons/lesson-player.tsx", "src/lib/lessons/roleplay-const.ts"], "src/lib/assess-client.ts"),
  );
}

/* ── 99. ders yapabilirlik eslemesi ───────────────────────────────────────
 * Sinavin sonuc kartindaki "Yapabildiklerim" satiri dersin simgesi + seviyesi
 * (konusma ifadesi) ve dilbilgisi odagi (gramer ifadesi) ile secilyor. Iki
 * kopyanin tablolari birebir ayni kalmali; mobil metni `/api/cando`dan
 * okuyor, web 213 satirlik veri dosyasindan - secim AYNI. */
{
  const esleme = (p) => {
    const src = read(p);
    const tema = [...src.matchAll(/(\w+): "(social|service|work)"/g)].map((m) => m[1] + "=" + m[2]);
    const spk = [...src.matchAll(/(A1|A2|B1|B2|C1): \{ social: (\d+), service: (\d+), work: (\d+) \}/g)].map((m) => m.slice(1).join(":"));
    const gr = [...src.matchAll(/\[(\/[^/]+\/i), \{ A1: (\d+), A2: (\d+), B1: (\d+), B2: (\d+), C1: (\d+) \}\]/g)].map((m) => m.slice(1).join(":"));
    return [...tema, ...spk, ...gr];
  };
  sameList("ders yapabilirlik eslemesi", esleme("mobile/src/game/candoMap.ts"), esleme("src/lib/cando-map.ts"));
}

/* ── 100. hayatta kalma turu ──────────────────────────────────────────────
 * Web'de `/learn/challenge` baştan beri vardı, Android'de EKRAN yoktu: uç
 * (`/api/challenge`) ve dalga mantığı sunucuda dururken rekor tablosuna
 * yalnız tarayıcıdan oynayanlar yazıyordu (§11.25 ile aynı sınıf - web
 * bileşeninin kendi başlığı da "mobilde bu modun karşılığı YOK" diyordu).
 *
 * Ayni rekor tablosunda iki farklı oyun yarışmasın diye SAYILAR ölçülüyor:
 * başlangıç süresi, bonus, hızlı bonus, ceza, hızlı sınır, tavan, tehlike
 * eşiği, çarpan basamakları ve puan formülü. Bir de giriş noktası: ekran
 * varsa ama menüde yoksa kimse bulamaz. */
{
  const mod = (p, giris) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const sabit = (ad) => new RegExp("const " + ad + " = ([\\d.]+)").exec(src)?.[1] ?? "?";
    const carpan = [...src.matchAll(/combo >= (\d+)\) return ([\d.]+)/g)].map((m) => m[1] + "x" + m[2]);
    return [
      "baslangic=" + sabit("START_SECONDS"),
      "bonus=" + sabit("BONUS_MS"),
      "hizli bonus=" + sabit("FAST_BONUS_MS"),
      "ceza=" + sabit("PENALTY_MS"),
      "hizli sinir=" + sabit("FAST_LIMIT_MS"),
      "tavan=" + sabit("MAX_SECONDS"),
      "tehlike=" + sabit("DANGER_SECONDS"),
      ...carpan,
      "puan formulu=" + (/\(10 \+ tier \* 5 \+ \(fast \? 5 : 0\)\) \* multiplier\(nextCombo\)/.test(src) ? "var" : "yok"),
      "kilometre taslari=" + (/\[3, 5, 7, 10, 15\]\.includes\(nextCombo\)/.test(src) ? "var" : "yok"),
      "giris=" + (new RegExp(giris).test(read(giris.startsWith("/learn") ? "src/components/learn/learn-hub.tsx" : "mobile/src/screens/LearnScreen.tsx")) ? "var" : "yok"),
    ];
  };
  sameList(
    "hayatta kalma",
    mod("mobile/src/screens/ChallengeScreen.tsx", 'navigate\\("Challenge"\\)'),
    mod("src/components/challenge-player.tsx", "/learn/challenge"),
  );
}

/* ── 101. yazma gorevinin yuzeyi ──────────────────────────────────────────
 * Beceri kutuphanesinin yazma gorevi. Androidde gonder dugmesi ASGARI kelime
 * sayisina bagliydi ve atlama dugmesi yoktu: asgariye ulasamayan ogrencinin
 * gorevi kapatma yolu hic yoktu, `onAllDone` cagrilmiyor ve EGZERSIZ
 * BITIRILEMIYORDU. Web kisa metni de degerlendiriyor, yalniz gorevi
 * "tamamlandi" saymiyor (`writp.min_words_note`).
 *
 * Uc sey daha olculuyor: dusuk puandan sonra tekrar deneme yolu, kalip
 * ciplerinin metne EKLEMESI (mobilde yalniz seslendiriyordu - yazma
 * gorevinde kalip listesi telaffuz alistirmasi degil, malzeme) ve cumle
 * hukmu (tam / yazim sapmasi / sira). */
{
  const yazma = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "gonderme esigi=" + (/words >= 5|words < 5/.test(src) ? "bes kelime" : "asgari"),
      "atla=" + (/writp\.skip_task/.test(src) ? "var" : "yok"),
      "bir daha dene=" + (/writp\.try_once_more/.test(src) ? "var" : "yok"),
      "kisa cevap notu=" + (/writp\.min_words_note/.test(src) ? "var" : "yok"),
      "oneri satiri=" + (/writp\.improve/.test(src) && /writp\.retry_suggest/.test(src) ? "var" : "yok"),
      "kalip ekler=" + (/writp\.useful_phrases/.test(src) ? "var" : "yok"),
      "hukum=" + (/writp\.exact/.test(src) && /writp\.order_only/.test(src) ? "var" : "yok"),
      "hukum olcutu=" + (/verdict === "exact" \|\| \w+\.verdict === "spelling"/.test(src) ? "exact+spelling" : "baska"),
      /* Cumle kurma PARCALARLA: kart mobilde duz bir metin kutusuydu, yani
         ayni gorev iki platformda iki farkli zorluktaydi ve "cumleyi KUR"
         adinin karsiligi yalniz webdeydi. */
      "parcalarla kurma=" + (/exam\.tap_chunks/.test(src) ? "var" : "yok"),
      "iki yanlista acilir=" + (/>= 2\) setPhase\("revealed"\)/.test(src) ? "var" : "yok"),
      "tohumlu dizilis=" + (/seededShuffle\(/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("yazma gorevi yuzeyi", yazma("mobile/src/game/skillQuiz.tsx"), yazma("src/components/skills/writing-player.tsx"));
}

/* ── 102. tohumlu karistirma ──────────────────────────────────────────────
 * Cumle kurma gorevinde parcalarin dizilisi bundan geliyor. Iki tarafta ayni
 * algoritma olmali: tohum ayni ise sira da ayni olsun ki ayni gorev iki
 * platformda ayni karisiklikla cikmaya devam etsin. */
{
  const govde = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ").replace(/\s+/g, " ");
    const al = (ad, re) => ad + "=" + (re.test(src) ? "var" : "yok");
    return [
      al("fnv", /h \^= key\.charCodeAt\(i\); h = Math\.imul\(h, 16777619\);/),
      al("mulberry", /a = \(a \+ 0x6d2b79f5\) >>> 0; let t = Math\.imul\(a \^ \(a >>> 15\), 1 \| a\);/),
      al("fisher-yates", /const j = Math\.floor\(rand\(\) \* \(i \+ 1\)\);/),
    ];
  };
  sameList("tohumlu karistirma", govde("mobile/src/lib/shuffle.ts"), govde("src/lib/shuffle.ts"));
}

/* ── 103. koc balonu ──────────────────────────────────────────────────────
 * Erdi'nin ogrenme anlarinda soyledigi tek cumle. Kirk cumlelik tablo webin
 * KENDI sozlugunde duruyordu (`coach.*`), bilesen de yalniz webdeydi: sinav
 * baslarken, sonucunda ve zayif nokta turunun ozetinde web konusuyor, Android
 * yalnizca bir maskot gosteriyordu.
 *
 * Olculen: an tablosu (sekiz an x bes cumle), yer tutucu kurali (isim yoksa
 * virguluyle duser), tekrar etmeyen secim ve ucu de BAGLI mi - olay tanimli
 * olmasi yetmez, balonun cagrildigi yer de gerekli (§90'in dersi). */
{
  /* BAĞLANTI ÖLÇÜMÜ EKRANLARDAN, tablodan DEĞİL. İlk yazımda ikisi birlikte
     okunuyordu ve an tablosu zaten `"weak_done"` dizgesini taşıdığı için
     ekrandaki çağrı koparıldığında kapı yeşil kalıyordu - §90'in dersini
     yazdığım satırın altında yine aynı hatayı yaptım. */
  const koc = (tablo, ekranlar) => {
    const kirp = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const src = kirp(tablo.map((p) => read(p)).join("\n"));
    const ekran = kirp(ekranlar.map((p) => read(p)).join("\n"));
    const anlar = [...new Set([...src.matchAll(/"coach\.(\w+?)_[1-5]"/g)].map((m) => m[1]))].sort();
    return [
      ...anlar,
      "yer tutucu=" + (/replace\(\/,\\s\*\\\{name\\\}\/g, ""\)/.test(src) ? "var" : "yok"),
      "tekrarsiz secim=" + (/function pickIndex\(/.test(src) ? "var" : "yok"),
      /* SAYIYLA: "en az bir yerde var" yetmez - iki sinav yuzeyi de (modul/
         seviye sinavi ve rol yapma sinavi) kendi balonunu cizmeli. */
      "sinav girisi=" + (ekran.match(/moment="exam_intro"/g) ?? []).length,
      "sinav sonucu=" + (ekran.match(/exam_pass" : "exam_fail"/g) ?? []).length,
      "zayif nokta=" + (ekran.match(/"weak_done"/g) ?? []).length,
    ];
  };
  sameList(
    "koc balonu",
    koc(
      ["mobile/src/game/coachLines.ts", "mobile/src/ui/CoachBubble.tsx"],
      ["mobile/src/screens/ExamScreen.tsx", "mobile/src/screens/RoleplayExamScreen.tsx", "mobile/src/screens/GameScreen.tsx"],
    ),
    koc(
      ["src/lib/coach-lines.ts", "src/components/coach-bubble.tsx"],
      ["src/components/exam-player.tsx", "src/components/lessons/roleplay-exam.tsx", "src/components/session-player.tsx"],
    ),
  );
}

/* ── 104. degerlendirme neden alinamadi ───────────────────────────────────
 * Mobil premium ve adil kullanim disindaki HER seyi tek cumleye indiriyordu
 * ("servis su an kapali"): metni cok uzun olan da, oturumu dusen de, istegi
 * eksik giden de ayni YANLIS aciklamayi goruyordu. Web durum koduna gore
 * dokuz ayri sebep ayiriyor ve 403'u ikiye boluyor (premium kapisi /
 * yetkisizlik) - ayirt edilmezse premium reddi "gecersiz istek" diye gorunur.
 *
 * Olculen: sebep tablosu ve durum kodu eslemesi. `quota` iki tarafta AYRI
 * anahtar (`assessw.fail_quota`): webde hak dolunca kural tabanli yedek
 * gosteriliyor, mobilde puan hic verilmiyor - metin gercekten farkli. */
{
  const sebep = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const tablo = [...src.matchAll(/^\s{2}(\w+): "(assess\w*\.fail_\w+)",?$/gm)].map((m) => m[1] + "=" + m[2].replace(/^assessw?\./, ""));
    /* İki taraf aynı şeyi başka kabukla dönüyor (`return X` / `return { ok:
       false, reason: X }`) ve web hata alanını `err.error`, mobil `err.message`
       diye okuyor - kabuk soyuluyor, KARAR karşılaştırılıyor. */
    const duz = src
      .replace(/\{ ok: false, reason: /g, "")
      .replace(/ \}/g, "")
      .replace(/err\.(error|message)/g, "err.x")
      .replace(/\s+/g, " ");
    const kod = [...duz.matchAll(/case (\d{3}): return ([^;]+);/g)].map((m) => m[1] + "->" + m[2].replace(/"/g, "").trim());
    return [...tablo, ...kod];
  };
  sameList("degerlendirme hata sebepleri", sebep("mobile/src/lib/assessFail.ts"), sebep("src/lib/assess-client.ts"));
}

/* ── 105. tur BOS dondugunde ──────────────────────────────────────────────
 * Mobil bos listeyi "Tur bitti - 0/0" diye gosteriyordu ve iki ayri durum
 * ayni yanlis cumleye dusuyordu: gunluk hedefini bitiren kullanici kutlama
 * yerine sifirli bir skor karti goruyor, Pratik'ten kelimesi olmayan bir
 * oyunu secen ise neden bos oldugunu hic ogrenemiyordu. Web ikisini ayri
 * ekranla karsiliyor: hedef karti + "yeni kelimelerle devam", pratik karti +
 * "karisik tura don".
 *
 * Ayni sinif §11.185 (yuruyus modunda ag hatasinin "tur bitti" gorunmesi):
 * BIR DURUM SONUC DEGIL. */
{
  const bos = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "hedef karti=" + (/session\.goal_done"/.test(src) ? "var" : "yok"),
      "gunun ozeti=" + (/session\.today_summary/.test(src) ? "var" : "yok"),
      "yeni kelimelerle devam=" + (/session\.continue_with_new/.test(src) ? "var" : "yok"),
      "ekstra istegi=" + (/extra: true/.test(src) ? "var" : "yok"),
      "oyunda kelime yok=" + (/session\.no_words_for_game/.test(src) ? "var" : "yok"),
      "mod notu=" + (/session\.review_only_mode/.test(src) ? "var" : "yok"),
      "karisik tura don=" + (/session\.back_to_mixed/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("bos tur ekranlari", bos("mobile/src/screens/GameScreen.tsx"), bos("src/components/session-player.tsx"));
}

/* ── 106. bolum arasi karti ───────────────────────────────────────────────
 * Sinav bolumleri arasinda okunan kart: Teil sirasi, Almanca ve kendi
 * dilindeki adi, bolumun NE ISTEDIGI, kac madde ve kalan sure. Mobil kapaktan
 * dogrudan ilk soruya, bolum bitince de dogrudan sonrakine geciyordu - ogrenci
 * girdigi bolumun ne soracagini hic okumuyordu.
 *
 * SAYAC da olculuyor: kart sirasinda sure DURMAMALI (web yalniz kapak/sonuc/
 * hata fazlarini disarida birakiyor). Durdurmak Androidde bolumler arasinda
 * sinirsiz okuma suresi verirdi. */
{
  const kart = (p, brief) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const brifler = [...new Set([...src.matchAll(/"(exam\.brief_\w+)"/g)].map((m) => m[1]))].sort();
    return [
      "brif sayisi=" + brifler.length,
      ...brifler,
      "teil sirasi=" + (/Teil \{/.test(src) ? "var" : "yok"),
      "madde ve sure=" + (/exam\.items_and_time/.test(src) ? "var" : "yok"),
      "bolume basla=" + (/exam\.start_section/.test(src) ? "var" : "yok"),
      "sayac kartta isler=" + (brief.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "bolum arasi karti",
    kart("mobile/src/screens/ExamScreen.tsx", /phase !== "bolum" && phase !== "bolumGiris"/),
    kart("src/components/exam-player.tsx", /phase === "cover" \|\| phase === "loading"/),
  );
}

/* ── 107. sinav kagidinin kurallari ───────────────────────────────────────
 * Ayni kagit iki platformda ayni sinav olmali. Iki yerde degildi:
 *
 * IPUCU. Web sinav bolumunu "ipucu yok" baglamiyla sariyor ve dort turun
 * ipucu dugmesi orada gorunmuyor; Androidde dugme duruyordu. Kapak "kagidin
 * kurali" diye yazarken dugmenin orada durmasi sozu bozuyordu.
 *
 * CEVAP. Mobil cumle kurma bolumunde iki adimliydi: "Kontrol et" kenarligi
 * yesile/kirmiziya ceviriyor, DOGRU CEVABI yaziyor, sonra "Siradaki". Ayni
 * yapilar sonraki maddelerde tekrar gectigi icin bu sinavi kolaylastiriyordu.
 * Web tek dugme veriyor ve altina "cevap sinav sonunda gosterilir" yaziyor. */
{
  const kural = (yollar) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "ipucu baglami=" + (/useNoHints\(\)/.test(src) ? "var" : "yok"),
      "sinav sariyor=" + (/<NoHints>/.test(src) ? "var" : "yok"),
      "cevap sonunda=" + (/exam\.answers_at_end/.test(src) ? "var" : "yok"),
      "tek dugme=" + (/exam\.answer_and_next/.test(src) ? "var" : "yok"),
      "cumle kurma cevabi acilmiyor=" + (/common\.answer_is/.test(src) ? "aciliyor" : "acilmiyor"),
    ];
  };
  sameList(
    "sinav kagidinin kurallari",
    kural(["mobile/src/screens/ExamScreen.tsx", "mobile/src/game/noHints.tsx"]),
    kural(["src/components/exam-player.tsx", "src/components/games/no-hints.tsx"]),
  );
}

/* ── 108. etap duraklamasi ve bahis ───────────────────────────────────────
 * Tur mobilde bastan sona TEK PARCA akiyordu: durulacak bir yer, o ana
 * kadarki ozet ve bahis mekanigi yoktu. Sunucu bahsi baştan beri destekliyor
 * (`/api/answers` `wager`, `xpForWager`) ve mobil tipinde alan bile duruyordu
 * ("mobilde bahis yok, alan sozlesme icin var").
 *
 * Olculen: etap boyu, bahis payinin iki sabiti (dogru 10 / yanlis 3), kartin
 * parcalari ve bahsin sunucuya GIDIYOR olmasi - kart cizilip istek gitmezse
 * bahis bir suslemeye doner. */
{
  const etap = (yollar) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "etap boyu=" + (/STAGE_SIZE = (\d+)/.exec(src)?.[1] ?? "?"),
      "pay tahmini=" + (/\? 10 : 3/.test(src) ? "10/3" : "baska"),
      "sayac=" + (/stage\.counter/.test(src) ? "var" : "yok"),
      "tertemiz=" + (/stage\.clean/.test(src) ? "var" : "yok"),
      "etap istatistigi=" + (/stage\.this_stage/.test(src) && /stage\.best_streak/.test(src) ? "var" : "yok"),
      "bahis anahtari=" + (/wager\.next_stage/.test(src) && /wager\.rules/.test(src) ? "var" : "yok"),
      "bahis sonucu=" + (/stage\.wager_won/.test(src) && /wager\.even/.test(src) ? "var" : "yok"),
      "devam/yeter=" + (/stage\.continue_bet/.test(src) && /stage\.enough/.test(src) ? "var" : "yok"),
      "durma notu=" + (/stage\.stop_note/.test(src) ? "var" : "yok"),
      "bahis sunucuya=" + (/stake: /.test(src) ? "var" : "yok"),
      "etap sesi=" + (/"perfect" : "stage"/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("etap duraklamasi", etap(["mobile/src/screens/GameScreen.tsx"]), etap(["src/components/session-player.tsx"]));
}

/* ── 109. dinleme oynaticisi ──────────────────────────────────────────────
 * Mobil kart metnin TAMAMINI tek seferde okuyordu: hangi replikte olundugu
 * gorunmuyor, yavaslatma yolu yok ve "once yalnizca dinleyerek dene" uyarisi
 * hic yazilmiyordu - ustelik metni acan dugme hemen yanindaydi. Web bolum
 * bolum caliyor, calan repligi isaretliyor, yavas modu ayri tutuyor.
 *
 * Olcum disi iki satir: `listenp.real_audio` (gercek lehce kaydi - iki
 * tarafta da UYKUDA, icerikte tek bir `audio` alani yok) ve `listenp.no_tts`
 * (tarayicida konusma sentezi olmayabilir; Android kendi TTS'iyle geliyor). */
{
  const dinle = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "bolum sayaci=" + (/listenp\.playing/.test(src) ? "var" : "yok"),
      "baslat/bitti=" + (/listenp\.start/.test(src) && /listenp\.done/.test(src) ? "var" : "yok"),
      "tekrar notu=" + (/listenp\.replay_note/.test(src) ? "var" : "yok"),
      "yavas mod=" + (/listenp\.slow/.test(src) ? "var" : "yok"),
      "once dinle=" + (/listenp\.hint_listen_first/.test(src) ? "var" : "yok"),
      "satira dokun=" + (/listenp\.tap_line/.test(src) ? "var" : "yok"),
      "calan replik isaretli=" + (/i === segIdx|segIdx === i/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("dinleme oynaticisi", dinle("mobile/src/screens/ItemScreen.tsx"), dinle("src/components/skills/listening-player.tsx"));
}

/* ── 110. konusma alistirmasinin bos hali ─────────────────────────────────
 * Gorev listesi bos gelirse mobil cizim `task.de`ye dokunup EKRANI
 * COKERTIYORDU; web ayni yerde tek satirlik bir not gosteriyor. Bugun
 * icerikte gorevsiz bir konusma egzersizi yok (50 egzersiz, sifir bos) ama
 * icerik her turda yeniden uretiliyor - koruma bedava, coken ekran degil.
 *
 * Olcum disi uc satir: `speakp.scoring_off`, `speakp.rate_limited` ve
 * `speakp.send_failed` webin SES YUKLEME yoluna ait (`/api/pronounce`);
 * mobil konusmayi cihazdaki taniyiciyla metin olarak esliyor (§11.136). */
{
  const bos = (p, re) => [ "bos liste korumasi=" + (re.test(read(p)) ? "var" : "yok") ];
  sameList(
    "konusma alistirmasi bos hali",
    bos("mobile/src/game/skillLibrary.tsx", /if \(!task\) \{/),
    bos("src/components/skills/speaking-player.tsx", /speakp\.no_sentences/),
  );
}

/* ── 111. yerlestirme testinin uc yuzeyi ──────────────────────────────────
 * Androidde ekran dogrudan soruya basliyordu: asamanin NE SORDUGU yazmiyor,
 * asamayi atlama yolu yok ve "bilmiyorum" dugmesi yoktu.
 *
 * Ucuncusu olcumun kendisini bozuyordu: bilmeyen kullanicinin tek yolu TAHMIN
 * etmekti ve tutan bir tahmin yerlestirme seviyesini yukseltiyordu. Web ucunu
 * de veriyor; "bilmiyorum" yanlis cevapla ayni, farki tahmini ortadan
 * kaldirmasi. */
{
  const yer = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const basliklar = [...new Set([...src.matchAll(/"(plc\.(?:vocab|grammar|reading|listening))"/g)].map((m) => m[1]))].sort();
    return [
      "asama basligi=" + basliklar.length,
      ...basliklar,
      "asamayi atla=" + (/plc\.skip_stage/.test(src) ? "var" : "yok"),
      "bilmiyorum=" + (/plc\.dont_know/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("yerlestirme yuzeyleri", yer("mobile/src/screens/PlacementScreen.tsx"), yer("src/components/placement/placement-test.tsx"));
}

/* ── 112. beceri sonuc karti ve silme hatasi ──────────────────────────────
 * Iki kucuk sessizlik:
 *
 * SONUC KUYRUGA ALINDIYSA SOYLENMIYORDU. Mobil cevrimdisi kaldiginda sonucu
 * kuyruga aliyor (`queueItemRecord`) ama ekran bunu yazmiyordu: kullanici XP
 * satiri olmayan bir kart goruyor ve kaydedilip kaydedilmedigini bilemiyordu.
 *
 * SUNUCU METNI EKRANA CIKIYORDU. Hesap silme hatasinda bilinen iki hal
 * cevriliyor, gerisi better-auth'un INGILIZCE cumlesiyle gosteriliyordu. */
{
  const kart = (p, re) => [ "kuyruk notu=" + (re.test(read(p)) ? "var" : "yok") ];
  sameList(
    "beceri sonucu cevrimdisi notu",
    kart("mobile/src/screens/ItemScreen.tsx", /skillp\.saved_offline/),
    kart("src/components/skills/player-shell.tsx", /skillp\.saved_offline/),
  );
  const ham = (p, re) => [ "ham sunucu metni=" + (re.test(read(p)) ? "var" : "yok") ];
  sameList(
    "silme hatasi cevrilmis",
    ham("mobile/src/lib/auth.ts", /message: message \|\| t\(/),
    ham("src/components/account-delete-form.tsx", /setError\(text\)|setError\(message\)/),
  );
}

/* ── 113. giris yontemi baglama hatalari ──────────────────────────────────
 * Web ag hatasini otekilerden AYIRIYOR: "internet baglantini kontrol et" ile
 * "biraz sonra tekrar dene" iki ayri cumle. Mobil ikisini de tek cumleye
 * dusuruyordu - ustelik baglama yolunda ag hatasinin kendi cevrilmis metni
 * ZATEN uretiliyordu (`signInGoogleNative` `NETWORK`), ekranda atiliyordu.
 *
 * §11.192 ile ayni sinif: bir cumle birkac sebebin ortusu. */
{
  const bag = (p, re) => [
    "baglama cevrimdisi=" + (re.link.test(read(p)) ? "var" : "yok"),
    "kaldirma cevrimdisi=" + (re.unlink.test(read(p)) ? "var" : "yok"),
  ];
  sameList(
    "giris yontemi hatalari",
    bag("mobile/src/ui/LinkedAccounts.tsx", { link: /"NETWORK"/, unlink: /links\.unlink_offline/ }),
    bag("src/components/account/linked-accounts.tsx", { link: /links\.link_offline/, unlink: /links\.unlink_offline/ }),
  );
}

/* ── 114. yuruyus modunda teslim isareti ──────────────────────────────────
 * Iki yonlu bir ayrisma:
 *
 * ANDROID SOYLEMIYORDU. Atlama bastan beri taniniyordu (`parseSkip`) ama
 * varligi hicbir yerde yazmiyor ve SOYLENMIYORDU: bilmedigi kelimede tikanan
 * kullanici ya susuyor (duyulmadi sayiliyor) ya da yanlis bir sey soyluyordu.
 * Web girise bir kez okuyor ("Bilmedigin kelimede <weiter> de").
 *
 * WEB YALNIZ ALMANCA TANIYORDU. Ayristiricinin adi da bunu soyluyordu
 * (`parseSkipDe`): Ingilizce kursta "skip" demek turu atlatmiyordu. Mobil bu
 * duzeltmeyi almisti, web almamisti - ve girişte okunan sozcuk de sabit
 * "weiter"di, yani Ingilizce kursta Almanca bir sozcuk okunuyordu. */
{
  /* "ingilizce taniniyor" ölçümü ilk yazımda yalnız `en: [` arıyordu ve
     dosyadaki BAŞKA bir tablo (evet/hayır kalıpları) onu karşılıyordu:
     atlama tablosundan İngilizce silindiğinde kapı yeşil kaldı. Desen artık
     tablonun kendi adına bağlı. */
  const teslim = (yollar, re, skipRe) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "giriste okunuyor=" + (/walk\.skip_hint_before/.test(src) ? "var" : "yok"),
      "sozcuk dile gore=" + (re.test(src) ? "var" : "yok"),
      "ingilizce taniniyor=" + (skipRe.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "yuruyus teslim isareti",
    teslim(["mobile/src/screens/WalkModeScreen.tsx", "mobile/src/lib/voiceMatch.ts"], /skipWord\(\)/, /const SKIP: Record<string, RegExp\[\]> = \{[\s\S]{0,400}?en: \[/),
    teslim(["src/components/walk-player.tsx", "src/lib/voice-intent.ts"], /skipWord\(course\)/, /const SKIP_WORDS[\s\S]{0,200}?en: \[/),
  );
}

/* ── 115. ders adiminda atlama ────────────────────────────────────────────
 * Tikanan ogrencinin ilerleme yolu mobilde yalniz "yazarak cevapla"ydi ve o
 * da dogru cevabi BILMEYI gerektiriyor: bilmeyen ogrencinin dersi bitirme
 * yolu yoktu. Web her beklentili adimda bir atlama baglantisi veriyor ve
 * atlanan adimi olcumde SIFIR sayiyor (`lesson_step` degeri 0, kind
 * "<tur>:skip") - yani atlama sessizce "dogru" sayilmiyor. */
{
  const atla = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "atlama yolu=" + (/lessonp\.skip_step/.test(src) ? "var" : "yok"),
      "olcumde sifir=" + (/track\("lesson_step", 0, `\$\{k\}:skip`\)/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("ders adiminda atlama", atla("mobile/src/screens/LessonScreen.tsx"), atla("src/components/lessons/lesson-player.tsx"));
}

/* ── 116. sohbet servisi kapaliyken ve yarim kalan konusma ────────────────
 * Iki yanlis mesaj:
 *
 * "BIRAZDAN TEKRAR DENE" derken ders DEVAM EDIYORDU. Saglayici kapaliysa
 * mobil cevrimdisi rol yapmaya dusuyor (`game/offlineRoleplay`) ama mesaj
 * "yapay zeka sohbeti kullanilamiyor, birazdan tekrar dene" diyordu: calisan
 * bir sey bozuk sanilyordu. Web hangi yedege dusuldugunu adlandiriyor
 * (senaryolu konusma / kaliplar).
 *
 * "KONUSMA BITTI" yarim birakildiginda da yaziliyordu. Sunucu `passed`
 * donduruyor (asgari tur doldu mu) ve mobil yaniti okumuyordu. */
{
  const sohbet = (p) => {
    const src = read(p).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return [
      "yedegin adi=" + (/chat_off_scripted/.test(src) && /chat_off_patterns/.test(src) ? "var" : "yok"),
      "yarim kaldi basligi=" + (/lessonp\.conversation_unfinished/.test(src) ? "var" : "yok"),
      /* SUNUCU YANITINDAN okunuyor mu: özet bileşeninin kendi `passed`
         alanı da dosyada geçtiği için gevşek desen yanıt okumasını hiç
         ölçmüyordu (enjeksiyonda kırmızı olmadı). */
      "passed okunuyor=" + (/d\?\.passed|setSaved\(data\)/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("sohbet yedegi ve yarim konusma", sohbet("mobile/src/screens/LessonScreen.tsx"), sohbet("src/components/lessons/lesson-player.tsx"));
}

/* ── 117. yerlestirilmis karonun ekran okuyucu etiketi ────────────────────
 * Havuzdaki karo ile YERLESTIRILMIS karo mobilde ayni seyi soyluyordu ("S"):
 * dokunmanin ne yapacagi ayirt edilemiyordu. Web yerlestirilmis karoya "S
 * harfini geri al" diyor. §93'un kayitli gerekcesi de yanlisti ("mobilde
 * yuva bir View, okunmuyor") - yuva bir Pressable ve etiketi vardi, yalnizca
 * EYLEMI soylemiyordu. */
{
  /* Harf webde `scramble-game`de, kelime `order-game`de: iki dosya birlikte
     okunuyor (mobilde ikisi de `rounds.tsx` icinde). */
  const karo = (yollar, re) => {
    const src = yollar.map((p) => read(p)).join("\n");
    return [
      "harfi geri al=" + (re.letter.test(src) ? "var" : "yok"),
      "kelimeyi geri al=" + (re.word.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "yerlestirilmis karo etiketi",
    karo(["mobile/src/game/rounds.tsx"], { letter: /undoKey="rounds\.undo_letter"/, word: /undoKey="rounds\.undo_word"/ }),
    karo(["src/components/games/scramble-game.tsx", "src/components/games/order-game.tsx"], { letter: /rounds\.undo_letter/, word: /rounds\.undo_word/ }),
  );
}

/* ── 118. mobil sayimin muafiyetleri gercekten kapili mi ──────────────────
 * `mobile/scripts/i18n-scan.js` icindeki SKIP_CONTENT listesi "bu dosya ham
 * metin sayimindan muaf" diyor ve her satirin yaninda hangi kapinin onu
 * olctugu YAZILI. Yazmak bir kapi degil: §11.207'de tam da boyle bir gerekce
 * yanlis cikti ("mobilde yuva bir View, okunmuyor" - oysa Pressable'di).
 *
 * Burasi yazilani OLCUYOR: her `check:parity "X"` adi bu dosyada gercekten
 * uretiliyor mu. Adlar bazen dinamik ("modul temalari " + level, "sabit " +
 * name), o yuzden onek eslesmesi de kabul. */
{
  const tarama = read("mobile/scripts/i18n-scan.js");
  /* Kapanis isareti SKIP_CONTENT'ten SONRA aranmali: ayni satir yukarida
     SKIP_ASCII icin de geciyor ve bastan arayinca pencere BOS kaliyordu
     (kapi sessizce hicbir sey olcmuyordu - bu oturumda altinci kez ayni
     sinif: desen komsuyu yakaliyor). */
  const bas = tarama.indexOf("const SKIP_CONTENT = [");
  const blok = tarama.slice(bas, tarama.indexOf("].map((p) => path.join(SRC", bas));
  const iddia = [...new Set([...blok.matchAll(/check:parity`? "([^"]+)"/g)].map((m) => m[1]))].sort();
  const kendim = read("scripts/parity-check.mjs");
  /* Ad dinamik kurulmus olabilir ("modul temalari " + level, "sabit " + name):
     adin her ONEKI de kabul. */
  const uretiliyor = (ad) => {
    if (kendim.includes(`sameList("${ad}"`) || kendim.includes(`sameSet("${ad}"`)) return true;
    const parca = ad.split(" ");
    for (let i = 1; i <= parca.length; i++) if (kendim.includes(`"${parca.slice(0, i).join(" ")} " +`)) return true;
    return false;
  };
  const bulunan = iddia.filter(uretiliyor);
  sameList("mobil sayim muafiyetlerinin kapilari", bulunan, iddia, "gercekten olculen", "listede yazan");
}

/* ── 119. web sayiminin muafiyet yollari yasiyor mu ───────────────────────
 * `scripts/i18n-hardcoded.mjs` uc liste tutuyor: SKIP (sayimdan cikan yol),
 * FORCE (SKIP'in icinde kalan ama yine de sayilan MANTIK dosyasi) ve
 * SKIP_ASCII (yalniz ASCII kuralindan muaf).
 *
 * OLMAYAN BIR YOL SESSIZ BIR DELIK: bugun hicbir sey atlamiyor ama o yola bir
 * dosya konursa Turkce metni hic sayilmadan iceri girer ve kimse karar
 * vermemis olur. Olculdu: `lib/cheatsheet` boyleydi - dilbilgisi sayfasi
 * 2026-08'de kaldirilmis, muafiyet listede kalmisti. */
{
  const betik = read("scripts/i18n-hardcoded.mjs").split("\n");
  const dizi = (ad) => {
    const i = betik.findIndex((l) => l.startsWith(`const ${ad} = [`));
    if (i < 0) return null;
    let j = i + 1;
    while (j < betik.length && !betik[j].trimStart().startsWith("]")) j++;
    return betik.slice(i, j).map((l) => /^\s*"([^"]+)",/.exec(l)?.[1]).filter(Boolean);
  };
  const hepsi = ["SKIP", "FORCE", "SKIP_ASCII"].flatMap((ad) => (dizi(ad) ?? []).map((p) => `${ad}:${p}`));
  const yasayan = hepsi.filter((x) => existsSync(new URL("../src/" + x.split(":")[1], import.meta.url)));
  sameList("web sayim muafiyetlerinin yollari", yasayan, hepsi, "diskte var", "listede yazan");
}

/* ── 120. premium kilidi olculuyor mu ─────────────────────────────────────
 * `premium_gate` iki platformun da olay kayit defterinde YAZILIYDI ve
 * gerekcesi de duruyordu ("paywall'i hangi kisit besliyor, oradan gorulur")
 * ama HICBIRI gondermiyordu: paywall'i GORENLER sayiliyor (`paywall_view`),
 * oraya ITEN kilit sayilmiyordu. §90'in dersi bir kez daha - olayin TANIMLI
 * olmasi yetmez.
 *
 * Olculen uc sey: iki tarafta da ayni kilit turleri gonderiliyor mu, turler
 * sunucunun kendi sozlugunden mi (`lib/premium/gates` PREMIUM_GATES) ve
 * sozlukteki her tur ya olculuyor ya da MUAF listesinde gerekcesiyle duruyor. */
{
  /* Dosyalarin KENDISI de olculuyor: tur listesi ayni kaldigi surece bir
     EKRANIN susmasi gorunmez kaliyor (ayni turu baska bir ekran hâlâ
     gonderiyor). Bu tam olarak bir kez oldu - rol yapma sinavindaki yayin
     dusmustu ve uc kontrol de yesil kalmisti. */
  const suskun = (yollar) => yollar.filter((p) => !/premium_gate"|notePremiumGate\(/.test(read(p)));
  const kilitTurleri = (yollar) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    /* Tur adi duz dizgi olabilir ("pocket_walk") ya da bir kosulun iki ucunda
       ("writing" : "speaking") - ikisi de sayiliyor, yoksa kosullu yayan
       dosya "hic gondermiyor" gibi gorunurdu. */
    const cagri = [...src.matchAll(/(?:track\("premium_gate", 0,|notePremiumGate\()([^;]*?)\)/g)]
      /* Kosul KARSILASTIRMASI turu degil: `req.kind === "sentence" ? ...`
         icindeki "sentence" bir kilit adi degil, ona giden yolun sartidir. */
      .map((m) => m[1].replace(/===\s*"\w+"/g, " "));
    return [...new Set(cagri.flatMap((c) => [...c.matchAll(/"(\w+)"/g)].map((m) => m[1])))].sort();
  };
  const sozluk = read("src/lib/premium/gates.ts").split("export const PREMIUM_GATES")[1] ?? "";
  const gecerli = [...sozluk.slice(0, sozluk.indexOf("} as const")).matchAll(/^  (\w+):/gm)].map((m) => m[1]).sort();
  /* `lib/premium.ts` listede YOK: orasi yardimcinin TANIMI, cagiran degil -
     tur birligi asagida ayrica olculuyor. */
  const MOB = [
    "mobile/src/screens/WalkModeScreen.tsx", "mobile/src/screens/ExamScreen.tsx",
    "mobile/src/game/skillQuiz.tsx", "mobile/src/game/skillLibrary.tsx", "mobile/src/screens/RoleplayExamScreen.tsx",
    "mobile/src/screens/MockExamScreen.tsx",
  ];
  const WEB = ["src/lib/assess-client.ts", "src/components/walk-player.tsx", "src/components/mock-exam-player.tsx"];
  const mob = kilitTurleri(MOB);
  const web = kilitTurleri(WEB);
  sameList("premium kilidi olcumu", mob, web);

  const sessiz = [...suskun(MOB), ...suskun(WEB)].map((p) => p.split("/").pop());
  sameList("premium kilidi: reddeden her yuzey", sessiz.length ? sessiz : ["yok"], ["yok"], "susan yuzey", "beklenen");

  /* Uydurma bir tur panoda sessizce bos bir satir olurdu (once tam bunun
     ornegi yaziliydi: "exam_full", "unlimited_tour" - hicbiri yok). */
  const disarda = [...new Set([...mob, ...web])].filter((x) => !gecerli.includes(x));
  sameList("premium kilidi turleri sozlukte", disarda.length ? disarda : ["yok"], ["yok"], "sozlukte olmayan", "beklenen");

  /* Mobil yardimcinin tur birligi sunucunun sozlugu olmali: burada kendi
     listesini tutsaydi sozluge eklenen bir kilit mobilde derlenmezdi. */
  const birlik = (read("mobile/src/lib/premium.ts").match(/notePremiumGate\(gate: ([^)]*)\)/)?.[1] ?? "")
    .match(/"\w+"/g)?.map((x) => x.slice(1, -1)).sort() ?? [];
  sameList("premium kilidi sozlugu (mobil yardimci)", birlik, gecerli, "mobil", "sunucu");

  /* MUAF: `weekly_exam` sozlukte var ama HIC UYGULANMIYOR - `canWeeklyExam`i
     yalnizca `premium/status` (bilgi) ve `premium/consume` (cagirani yok,
     bkz. web-parity §11.24) okuyor, `/api/weekly` kilide hic bakmiyor. Reddin
     olmadigi yerde olculecek an da yok. Muafiyetin kendisi olculuyor: ucuncu
     bir cagiran cikarsa kilit uygulanmaya baslamis demektir ve bu satir duser. */
  /* Yollar PARCADAN kuruluyor: tam uc yolunu duz dizgi yazmak
     `check-endpoints`e "bu uc cagriliyor" diye gorunuyordu - orasi kaynak
     dosyalarda uc yolu ariyor ve burasi ucu cagirmiyor, dosyasini OKUYOR. */
  const uc = (f) => "src/app/api/" + f + "/route.ts";
  const cagiran = [uc("premium/status"), uc("premium/consume"), uc("weekly"), uc("exam"), "src/lib/weekly.ts"]
    .filter((f) => read(f).includes("canWeeklyExam"));
  const MUAF = cagiran.length === 2 ? ["weekly_exam"] : [];
  const olculmeyen = gecerli.filter((g) => !mob.includes(g) && !MUAF.includes(g));
  sameList("premium kilidi eksiksiz", olculmeyen.length ? olculmeyen : ["yok"], ["yok"], "olculmeyen kilit", "beklenen");
}

/* ── 121. yuruyus turunun ARASI olculuyor mu ──────────────────────────────
 * Android turun BASINI (`walk_start`) ve SONUNU (`walk_end`) yaziyordu, arasini
 * hic yazmiyordu. Web ise her dinlemeyi (`walk_listen`) ve cebe her gecisi
 * (`walk_switch`) sayiyordu - yani "hangi kaynak kac kez bos donuyor",
 * "kesinti turu ne siklikta boluyor" ve "Azure kac saniye ses aliyor"
 * sorulari YALNIZ web kullanicilari icin cevaplanabiliyordu. Uygulamanin en
 * pahali ozelliginin faturasini yazan sey tam olarak bu.
 *
 * Olculen: yuruyus olay adlari iki tarafta ayni mi ve `walk_listen` /
 * `walk_switch` ayni dilbilgisiyle mi yaziliyor. */
{
  const yuruyus = (yollar) => {
    const src = yollar.map((p) => read(p)).join("\n").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
    const adlar = [...new Set([...src.matchAll(/track\("(walk_\w+)"/g)].map((m) => m[1]))];
    /* `kaynak:sonuc` bicimi: iki tarafta kaynak adlari farkli (tarayici/sunucu
       - native/azure) ama BICIM ayni olmali, yoksa panoda iki ayri sutun
       gerekir ve karsilastirma yapilamaz. */
    /* HER cagri "kaynak:sonuc" tasimali. Once "en az biri" diye olculuyordu ve
       enjeksiyon bunu YAKALAMADI: duzlestirilen cagrinin yanindaki sabit
       ("stt:premium") kurali tek basina saglıyordu - olcunun komsusunu olcmenin
       bir ornegi daha. */
    const kindler = [...src.matchAll(/track\("walk_listen",\s*[^,]+,\s*([^)]+)\)/g)].map((m) => m[1]);
    const bicim = kindler.length && kindler.every((k) => k.includes(":")) ? "kaynak:sonuc" : "duz";
    /* Gecisin KIND'i degil DEGERI karsilastiriliyor: tarayicinin gecis
       sebepleri (dark · hidden · dark-exit) ile Androidinkiler (ekran durumu,
       servis) gercekten farkli ve olmalari da gerekiyor. Ortak olan dilbilgisi:
       1 = cebe alindi, 0 = ekrana donuldu. Deger kaymasi panoyu sessizce
       tersine cevirirdi. */
    const gecis = [...new Set([...src.matchAll(/track\("walk_switch", ([^,]+),/g)].flatMap((m) => m[1].match(/\d/g) ?? []))].sort();
    return [...adlar.sort(), "bicim=" + bicim, "gecis degerleri=" + gecis.join("/")];
  };
  /* MUAF: `walk_capture` tarayicinin getUserMedia kisitini (echoCancellation)
     yaziyor - native kaydedicide boyle bir dugme YOK, karsiligi olmayan bir
     olay. Muafiyet kendini denetliyor: web o cagriyi `micSettings` disinda bir
     seyden besler hâle gelirse gerekce duser. */
  const webSrc = read("src/components/walk-player.tsx");
  const MUAF = /track\("walk_capture", micSettings\(\)/.test(webSrc) ? ["walk_capture"] : [];
  const web = yuruyus(["src/components/walk-player.tsx"]).filter((x) => !MUAF.includes(x));
  const mob = yuruyus(["mobile/src/screens/WalkModeScreen.tsx"]);
  sameList("yuruyus turu olcumu", mob, web);
}

/* ── 122. olcum paritesinin TERS yonu ─────────────────────────────────────
 * §44 yalniz "web yaziyor, mobil yazmiyor" diye soruyordu. Ters yon aynen
 * sessiz: Android'in yazip webin yazmadigi bir ad, WEB kullanicilari icin
 * cevapsiz kalan bir soru demek. Olculdugunde bir tane gercek cikti -
 * `onboarding_existing_account`: "zaten hesabin var mi" cikisi IKI tarafta da
 * duruyor (`auth.already_have_account`), yalniz mobil sayiyordu. Kayitli
 * kullanicinin akisin neresinde kendini buldugu webde hic yazilmiyordu ve o
 * cikislar akisi TERK edenlerle karisiyordu.
 *
 * Kalanlar mobil-ozel ve burada YAZILI, her biri gerekcesiyle. */
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
    for (const f of [...dirs.flatMap((d) => walk(d)), ...extra]) for (const m of strip(read(f)).matchAll(/\btrack\(\s*"([a-z_]+)"/g)) set.add(m[1]);
    return set;
  };
  const web = atilan(["src/components", "src/app", "src/lib"]);
  const mob = atilan(["mobile/src"], ["mobile/App.tsx"]);
  const MOB_OZEL = [
    "notif_prime", //   bildirim izni ONCESI hazirlik ekrani; webin karsiligi tarayici istemi (`push_optin`)
    "purchase_done", // satin alma yalniz magazada (Play/RevenueCat)
    "purchase_start",
  ];
  /* Iki muafiyet de kendini denetliyor: (1) `notif_prime` bir CIFTIN yarisi -
     webin ucu (`push_optin`) susarsa gerekce kalmaz; (2) satin alma webe
     gelirse (odeme saglayicisi eklenirse) iki ad orada da gerekli olur. */
  const cift = web.has("push_optin");
  const webdeOdeme = /createCheckout|stripe\.|\/api\/premium\/checkout/.test(
    ["src/app/(app)/premium/page.tsx", "src/components/premium-paywall.tsx"].map((f) => strip(read(f))).join("\n"),
  );
  const kayitli = MOB_OZEL.filter((n) => (n === "notif_prime" ? cift : !webdeOdeme));
  const eksik = [...mob].filter((n) => !web.has(n)).sort();
  sameSet("olcum paritesi (yalniz mobil istemcisinde)", eksik, kayitli.sort(), "bulunan", "kayitli");
}

/* ── 123. son etabin bahsi ────────────────────────────────────────────────
 * Bahis Androidde YALNIZ etap sinirinda kapaniyordu (`closeStage`). Tur
 * kelime kalmadigi ya da gunluk hedef doldugu icin bittiyse bahis sessizce
 * buharlasiyordu: kullanici XP'sini ortaya koyuyor, ne kazandigini ne
 * kaybettigini ogreniyor, hicbir sey de olmuyordu. Web bunu bastan beri
 * kapatiyor (`closing = isLast || etap siniri`) ve sonucu OZET kartinda
 * gosteriyor - etap karti gosterilmeden tur bittigi icin baska yer yok.
 *
 * Olculen uc sey: bahis etap sinirinda kapaniyor mu, TURUN SONUNDA kapaniyor
 * mu, ve sonucu ozet gosteriyor mu. */
{
  const govde = (src, bas) => {
    const i = src.indexOf(bas);
    if (i < 0) return "";
    /* Govde, ayni girintideki kapanis parantezine kadar: ad ile eslesip
       KOMSU fonksiyonu okumak bu dosyada birden fazla kez tuzak oldu. */
    const girinti = " ".repeat(bas.length - bas.trimStart().length) + "}";
    const son = src.indexOf("\n" + girinti, i);
    return son < 0 ? src.slice(i) : src.slice(i, son);
  };
  const mobSrc = read("mobile/src/screens/GameScreen.tsx");
  const webSrc = read("src/components/session-player.tsx");
  const mob = [
    "etap sinirinda=" + (/stake:/.test(govde(mobSrc, "  async function closeStage() {")) ? "kapanir" : "kapanmaz"),
    "tur sonunda=" + (/stake:/.test(govde(mobSrc, "  async function finish() {")) ? "kapanir" : "kapanmaz"),
    /* Ozet: `StageCard` de ayni degiskeni gosteriyor, o yuzden ozet
       bolumundeki gosterim AYRICA araniyor (etap kartinin disinda). */
    "ozet gosterir=" + (/wagerResult !== null/.test(mobSrc.slice(0, mobSrc.indexOf("function StageCard"))) ? "evet" : "hayir"),
  ];
  const kapanis = webSrc.match(/const closing = ([^;]+);/)?.[1] ?? "";
  const web = [
    "etap sinirinda=" + (/STAGE_SIZE === 0/.test(kapanis) ? "kapanir" : "kapanmaz"),
    "tur sonunda=" + (/isLast/.test(kapanis) ? "kapanir" : "kapanmaz"),
    "ozet gosterir=" + (/result\?\.wagerXp \?/.test(webSrc) ? "evet" : "hayir"),
  ];
  sameList("son etabin bahsi", mob, web);
}

/* ── 124. tur ozetinin BOLUM SIRASI ───────────────────────────────────────
 * Ozet karti iki platformda da ayni bolumlerden kuruluyor ama SIRA olculmemis
 * hicbir seydi. Olculdugunde iki gercek cikti:
 *   - Androidde "devam" dugmesi ICERIGIN ORTASINDA duruyordu: zorlandigin
 *     kelimeler ve yarinki tekrar sayisi birincil dugmenin ALTINDA kaliyordu,
 *     yani turu bitiren kullanici onlari hic gormeden devam ediyordu.
 *   - Webde "paylas" CIKIS dugmesinin altindaydi; paylasmak da yeni bir sey
 *     baslatiyor, cikis ise grubun sonu olmali.
 *
 * Olculen: bolumlerin gorunme sirasi. Bolum adlari ortak, desenler platforma
 * ait - iki tarafta ayni anahtar kullanilmiyor (ornegin baslik webde
 * `summary.round_done`, mobilde `common.round_done`). */
{
  const BOLUM = [
    ["halka", /game\.correct/, /game\.correct/],
    ["baslik", /summary\.(round_done|stopped)/, /common\.round_done/],
    ["xp", /CountUp value=\{xp\}/, /xpGained\} XP/],
    ["uc sayi", /summary\.accuracy/, /summary\.accuracy/],
    ["bahis", /session\.wager_won/, /stage\.wager_won/],
    ["gunluk hedef", /learn\.daily_goal/, /learn\.daily_goal/],
    ["pekisen", /sessionw\.n_mastered/, /sessionw\.n_mastered/],
    ["seri onarildi", /game\.streak_saved/, /game\.streak_saved/],
    ["yarinki tekrar", /sessionw\.due_tomorrow/, /sessionw\.due_tomorrow/],
    ["zorlandiklarin", /session\.missed_title/, /session\.missed_title/],
    ["devam", /t\("game\.continue"\)/, /t\("game\.continue"\)/],
    ["hayatta kalma", /t\("challenge\.title"\)/, /t\("challenge\.title"\)/],
    ["paylas", /<ShareResult/, /t\("common\.share"\)/],
    ["bitir", /t\("common\.finish"\)/, /t\("common\.finish"\)/],
  ];
  /* MUAF (bolum tablosunda YOK, gerekcesi burada):
     - `PushOptIn`: web bildirim iznini tam burada istiyor cunku tarayicida
       reddedilen izin kalici olarak kapaniyor - ikinci sans yok. Mobilde izin
       ayri bir hazirlik EKRANINDAN isteniyor (`NotifPrimeScreen`, ilk girisin
       ardindan bir kez) ve sistem diyalogu ancak kullanici "Hatirlat" derse
       aciliyor. Ikisi ayni huni adimi, ayri yuzey.
     - kayit uyarisi (`session.save_failed`): webde tur EKRANINDA, mobilde
       ozette. Web ozete geldiginde kayit coktan denenmis oluyor. */
  const dilim = (src, bas, son) => {
    const i = src.indexOf(bas);
    const j = son ? src.indexOf(son, i) : -1;
    return i < 0 ? "" : src.slice(i, j < 0 ? src.length : j);
  };
  const sira = (src, ix) =>
    BOLUM.map(([ad, ...d]) => [ad, src.search(d[ix])])
      .filter(([, i]) => i >= 0)
      .sort((a, b) => a[1] - b[1])
      .map(([ad]) => ad);
  /* Dilim HALKADAN basliyor: `summary.stopped`ten baslatinca halka dilimin
     DISINDA kaliyordu ve "webde halka yok" gibi gorunuyordu - olcunun
     komsusunu olcmenin bir baska bicimi. */
  const web = dilim(read("src/components/session-player.tsx"), "SONUÇ HALKASI");
  const mob = dilim(read("mobile/src/screens/GameScreen.tsx"), "if (phase === \"done\") {", "\n/**");
  sameList("tur ozetinin bolum sirasi", sira(mob, 1), sira(web, 0));
}

/* ── 125. Ogren sekmesindeki yollar ───────────────────────────────────────
 * Iki taraf da ayni satirlari gosteriyordu ama SIRA ve SIMGE olculmemisti.
 * Olculdugunde uc fark cikti ve ucu de webdeydi: seviye sinavi satiri
 * Androidde en altta, webde ortadaydi; "Pratik" simgesi Androidde soru
 * isareti (`QuizIcon`), webde nisan tahtasiydi (`TargetIcon`); hayatta kalma
 * Androidde alev, webde kalpti. Ustelik webdeki gerekce de eskimisti
 * ("hayatta kalma mobilde YOK") - mod §11.199'da Android'e geldi.
 *
 * Olculen: satir sirasi, simge ADI ve renk - renk ADIYLA degil HEX'iyle,
 * cunku iki taraf ayni tonu ayri adla tutuyor (`--color-rose-500` /
 * `colors.danger`). */
{
  /* Web jetonlari: globals.css. Mobil: `theme/colors` acik palet, ramp
     indirmesiyle birlikte (`orange[500]` gibi). */
  const css = read("src/app/globals.css");
  const webHex = (jeton) => (css.match(new RegExp("--color-" + jeton + ":\\s*(#[0-9a-f]{3,8})", "i"))?.[1] ?? jeton).toLowerCase();
  const renkSrc = read("mobile/src/theme/colors.ts");
  const ramp = {};
  for (const m of renkSrc.matchAll(/export const (\w+) = \{([^}]+)\} as const;/g)) {
    ramp[m[1]] = Object.fromEntries([...m[2].matchAll(/(\d+): "(#[0-9a-f]{3,8})"/gi)].map((x) => [x[1], x[2]]));
  }
  const acik = renkSrc.slice(renkSrc.indexOf("export const light: Palette = {"), renkSrc.indexOf("export const dark"));
  const mobHex = (ad) => {
    const v = acik.match(new RegExp("\\b" + ad + ": ([^,\\n]+)"))?.[1]?.trim() ?? ad;
    const r = v.match(/^(\w+)\[(\d+)\]$/);
    return (r ? ramp[r[1]]?.[r[2]] ?? v : v.replace(/"/g, "")).toLowerCase();
  };
  const webSatir = (src) =>
    [...src.matchAll(/tone="var\(--color-([\w-]+)\)"\s*\n\s*icon=\{<(\w+)[\s\S]*?\n\s*title=\{t\("([\w.]+)"/g)]
      .map((m) => `${m[3]} ${m[2]} ${webHex(m[1])}`);
  const mobSatir = (src) =>
    /* Iki bileseni de okuyor (`WedgeTile` one cikan, `ActionRow` liste) ve
       basliktan renge kadar TEMBEL geciyor: `learn.level_exam` basligi
       `{ level }` tasiyor ve acgozlu bir sinif orada duruyordu. */
    /* BILESEN ADINA capalanmis: capasiz hâli ekran BASLIGINDAN
       (`AppHeader title={t("learn.learn")}`) baslayip ilk karonun rengine
       kadar uzaniyordu ve ilk satir "learn.learn" diye okunuyordu - olcunun
       komsusunu olcmenin onuncu bicimi. */
    [...src.matchAll(/<(?:WedgeTile|ActionRow) title=\{t\("([\w.]+)"[\s\S]*?tint=\{colors\.(\w+)\}\s*icon=\{(\w+)\}/g)]
      .map((m) => `${m[1]} ${m[3]} ${mobHex(m[2])}`);
  const web = webSatir(read("src/components/learn/learn-hub.tsx"));
  const mob = mobSatir(read("mobile/src/screens/LearnScreen.tsx"));
  sameList("ogren sekmesi yollari", mob, web);
}

/* ── 126. kelime listesinin suzgecleri ────────────────────────────────────
 * Iki sureyi de ayni sey suzuyor (seviye + durum) ama webde iki grup TEK
 * seritte, aralarinda ince bir cizgiyle duruyordu ve iki ayri "Tumu" cipi
 * yan yana cikiyordu: hangisinin neyi sifirladigi okunmuyordu. Androidde
 * gruplar ayri seritler ve sifirlama cipi grubun ADINI tasiyor ("Seviye").
 *
 * Olculen: iki grubun secenekleri, sifirlama etiketleri, bes durumun sozluk
 * anahtarlari ve "ne zaman tekrar" esikleri. */
{
  const web = read("src/components/word-list.tsx");
  const mob = read("mobile/src/screens/WordsScreen.tsx");
  const mobData = read("mobile/src/data/words.ts");
  const idler = (src, blok) => {
    const b = src.slice(src.indexOf(blok), src.indexOf("];", src.indexOf(blok)));
    /* Bos kimlik = "sifirlama" ogesi; iki taraf onu ayri bicimlerde yaziyor
       (nesne alani / duz bos dizgi) ve zaten ETIKETIYLE asagida ayrica
       olculuyor - burada elenmezse fark bicimden gelirdi, anlamdan degil. */
    return [...b.matchAll(/id: "(\w*)"|\{ key: "(\w*)"|"([A-C][12])"/g)].map((m) => m[1] ?? m[2] ?? m[3]).filter(Boolean);
  };
  /* Mobil seviye listesi duz dizgi dizisi, web nesne dizisi - ikisi de
     ayni kumeye indiriliyor. */
  const webSeviye = idler(web, "const LEVELS = [");
  const mobSeviye = idler(mob, "const LEVELS = [");
  const webDurum = idler(web, "const STATUSES = [");
  const mobDurum = idler(mob, "const FILTERS: ");
  /* Sifirlama etiketi: her grubun ILK ogesinin anahtari. */
  const webSifir = [
    web.slice(web.indexOf("const LEVELS = [")).match(/labelKey: "([\w.]+)"/)?.[1] ?? "-",
    web.slice(web.indexOf("const STATUSES = [")).match(/labelKey: "([\w.]+)"/)?.[1] ?? "-",
  ];
  const mobSifir = [
    mob.match(/t\("(words\.filter_\w+)"\)\}<\/Text>/)?.[1] ?? mob.match(/lv \|\| t\("([\w.]+)"\)/)?.[1] ?? "-",
    mob.slice(mob.indexOf("const FILTERS: ")).match(/label: "([\w.]+)"/)?.[1] ?? "-",
  ];
  const anahtar = (src) => [...new Set([...src.matchAll(/"(words\.status_\w+)"/g)].map((m) => m[1]))].sort();
  const zaman = (src) => [...new Set([...src.matchAll(/"(words\.(?:due_\w+|not_studied))"/g)].map((m) => m[1]))].sort();
  sameList(
    "kelime listesi suzgecleri",
    [...mobSeviye, "|", ...mobDurum, "|", ...mobSifir, "|", ...anahtar(mobData), "|", ...zaman(mobData + mob)],
    [...webSeviye, "|", ...webDurum, "|", ...webSifir, "|", ...anahtar(web), "|", ...zaman(web)],
  );
}

/* ── 127. haftalik sinavin sonuc ekrani ───────────────────────────────────
 * Sinav bitiyordu ve Androidde "{total} sorudan {correct} dogru" disinda
 * hicbir sey yazmiyordu: HANGI kelimede takildigin hicbir yerde
 * gorunmuyordu. Web ayni yerde yanlis bilinen kelimeleri cip cip yaziyor
 * ("tekrar kuyruguna donenler"), hepsi dogruysa da onu soyluyor. Tur
 * ozetinde bu liste iki tarafta da vardi; haftalik sinavda yalniz webde.
 *
 * Olculen: sonuc ekraninin bolum sirasi. Desenler platforma ait - puan
 * basligi webde `weekly.your_score`, mobilde halkanin altindaki
 * `weekly.score`; cikis webde "Ogren'e don", mobilde "Bitir". */
{
  const BOLUM = [
    ["puan halkasi", /weekly\.your_score/, /weekly\.score/],
    ["dogru sayisi", /common\.n_correct/, /weekly\.done_sub/],
    ["gonderilemedi", /weekly\.not_sent/, /weekly\.not_sent/],
    ["kuyruga donenler", /weekly\.back_in_queue/, /weekly\.back_in_queue/],
    ["hepsi dogru", /weekly\.all_correct/, /weekly\.all_correct/],
    ["haftada bir", /weekly\.once_a_week/, /weekly\.once_a_week/],
    ["cikis", /weekly\.back_to_learn/, /common\.finish/],
  ];
  const dilim = (src, bas, son) => {
    const i = src.indexOf(bas);
    const j = src.indexOf(son, i);
    return i < 0 ? "" : src.slice(i, j < 0 ? src.length : j);
  };
  const web = dilim(read("src/components/weekly-player.tsx"), 'if (phase === "done" && result) {', "\n  const round =");
  const mob = dilim(read("mobile/src/screens/WeeklyScreen.tsx"), 'if (phase === "done") {', "\n  // play");
  const sira = (src, ix) =>
    BOLUM.map(([ad, ...d]) => [ad, src.search(d[ix])])
      .filter(([, i]) => i >= 0)
      .sort((a, b) => a[1] - b[1])
      .map(([ad]) => ad);
  sameList("haftalik sinav sonucu", sira(mob, 1), sira(web, 0));
}

/* ── 128. gunluk turun tanitimi ───────────────────────────────────────────
 * Android turu DOGRUDAN baslatiyordu: kullanici ne oynayacagini, kac soru
 * oldugunu, TEK HAK oldugunu ve herkesin ayni turu oynadigini hicbir yerde
 * okumadan kendini ilk sorunun icinde buluyordu. Web ayni yerde bir tanitim
 * karti gosteriyor ve bugunun tablosunu da oraya koyuyor - "kime
 * yetisiyorum" sorusu oynamaya iten seyin kendisi. Mobilin kendi duzeni
 * haftalik sinavda zaten boyle (`WeeklyScreen` `ready`); gunluk tur tek
 * istisnaydi.
 *
 * Olculen: ekranin fazlari ve tanitim kartinin bolum sirasi. `session_start`
 * artik iki tarafta da BASLA'ya basinca yaziliyor - ekrani acan herkesi
 * "basladi" saymak huninin ilk adimini oldugundan buyuk gosteriyordu. */
{
  const mobSrc = read("mobile/src/screens/DailyScreen.tsx");
  const webSrc = read("src/components/daily-player.tsx");
  const faz = (src, re) => (src.match(re)?.[1] ?? "").match(/"(\w+)"/g)?.map((x) => x.slice(1, -1)).sort() ?? [];
  /* Adlar bir yerde ayri: web oynanan fazi "playing", mobil "play" diyor ve
     mobilde bir de "auth" var (webde oturum ROTA duzeyinde cozuluyor). */
  const mob = faz(mobSrc, /type Phase = ([^;]+);/).filter((x) => x !== "auth").map((x) => (x === "play" ? "playing" : x));
  const web = faz(webSrc, /type Status = ([^;]+);/).map((x) => (x === "play" ? "playing" : x));
  sameList("gunluk tur fazlari", mob.sort(), web.sort());

  const BOLUM = [
    ["ust satir", /daily\.daily_round/, /daily\.daily_round/],
    ["baslik", /daily\.same_words/, /daily\.same_words/],
    ["tanitim", /daily\.pitch/, /daily\.pitch/],
    ["basla", /common\.start/, /common\.start/],
    ["sonra", /common\.later/, /common\.later/],
    ["bugunun tablosu", /daily\.today_s_ranking/, /daily\.today_s_ranking/],
  ];
  const dilim = (src, bas, son) => {
    const i = src.indexOf(bas);
    const j = src.indexOf(son, i);
    return i < 0 ? "" : src.slice(i, j < 0 ? src.length : j);
  };
  const sira = (src, ix) =>
    BOLUM.map(([ad, ...d]) => [ad, src.search(d[ix])])
      .filter(([, i]) => i >= 0)
      .sort((a, b) => a[1] - b[1])
      .map(([ad]) => ad);
  sameList(
    "gunluk tur tanitimi",
    sira(dilim(mobSrc, 'if (phase === "ready") {', '\n  if (phase === "empty")'), 1),
    sira(dilim(webSrc, 'if (status === "ready" && data) {', "\n  if (status ==="), 0),
  );

  /* `session_start` tanitim ekraninda DEGIL, BASLA dugmesinde yazilmali. */
  const nerede = (src) => (/session_start", 0, "daily"\)/.test(src) ? (/(onPress|onClick)=\{\(\) => \{[^}]*session_start", 0, "daily"/.test(src.replace(/\n/g, " ")) ? "basla dugmesinde" : "baska yerde") : "hic yazilmiyor");
  sameList("gunluk tur olcum ani", [nerede(mobSrc)], [nerede(webSrc)]);
}

/* ── 129. dersin kapanis ozeti ────────────────────────────────────────────
 * Uc fark cikti, ucu de Androidde:
 *   - "Artik sunu yapabilirim" (`lessonp.i_can`) satiri hic yoktu: kullanici
 *     kac dogru yaptigini goruyor, NE KAZANDIGINI gormuyordu.
 *   - Konusma tamamlanmadiginda baslik "tamamlanmadi" deyip susuyordu: kac
 *     tur gerektigi yazmiyor, konusmaya donmenin yolu da gorunmuyordu -
 *     dersi kapatmaktan baska yapilacak bir sey yoktu (§11.206'nin sinifi).
 *   - Iki taraf da IKI sayi gosteriyordu ama ikincileri farkliydi (webde tur
 *     sayisi, Androidde basari yuzdesi); ikisi de gercek bir sey soyluyor,
 *     ucu birden iki tarafta duruyor.
 *
 * Olculen: ozetin bolum sirasi. */
{
  const BOLUM = [
    ["baslik", /lesson\.lesson_complete/, /lesson\.lesson_complete/],
    ["alistirma", /lessonp\.practice/, /lesson\.correct_production/],
    ["basari", /lesson\.accuracy/, /lesson\.accuracy/],
    ["tur sayisi", /lessonp\.n_turns/, /lesson\.phase_roleplay/],
    ["kelimeler", /lessonp\.words_of_lesson/, /lessonp\.words_of_lesson/],
    ["yapabildiklerim", /lessonp\.i_can/, /lessonp\.i_can/],
    ["duzeltmeler", /lessonp\.corrections/, /lessonp\.corrections/],
    ["en az kac tur", /lessonp\.min_turns_note/, /lessonp\.min_turns_note/],
    ["sonraki gun", /lessonp\.next_in_days/, /lessonp\.next_in_days/],
    ["konusmaya don", /lessonp\.back_to_conversation/, /lessonp\.back_to_conversation/],
    ["sinav olarak dene", /lessonp\.try_as_exam/, /lessonp\.try_as_exam/],
    ["patikaya don", /lesson\.back_to_path/, /lesson\.back_to_path/],
  ];
  /* KALIPLAR bolumu tablonun DISINDA: iki taraf ayni listeyi ayri adla
     yaziyor (`lessonp.patterns` / `lesson.patterns_you_learned`) ve sirasi da
     ayri (webde kelimelerden sonra, mobilde once). Ayni bilgi, ayri yer -
     siralamayi burada zorlamak tasarimi degil olcuyu duzeltmek olurdu. */
  const dilim = (src, bas, son) => {
    const i = src.indexOf(bas);
    const j = src.indexOf(son, i);
    /* YORUMLAR ATILIYOR — sonra. Once atilsaydi kesme noktalari kayardi;
       atilmasaydi `lessonp.i_can`e ATIF yapan bir yorum ("web ozetin altinda
       bunu yaziyor") bolumun kendisinden once gorunur ve sira yanlis
       okunurdu. Nitekim ilk calistirmada tam olarak oyle oldu. */
    const dilimlenmis = i < 0 ? "" : src.slice(i, j < 0 ? src.length : j);
    return dilimlenmis.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  };
  const sira = (src, ix) =>
    BOLUM.map(([ad, ...d]) => [ad, src.search(d[ix])])
      .filter(([, i]) => i >= 0)
      .sort((a, b) => a[1] - b[1])
      .map(([ad]) => ad);
  const web = dilim(read("src/components/lessons/lesson-player.tsx"), 'lesson.lesson_complete', "\n  if (phase ===");
  const mob = dilim(read("mobile/src/screens/LessonScreen.tsx"), "function Summary({", "\nfunction ");
  sameList("ders kapanis ozeti", sira(mob, 1), sira(web, 0));
}

/* ── 130. yerlestirme sinavi ──────────────────────────────────────────────
 * Iki fark cikti, ikisi de Androidde:
 *   - TANITIM EKRANI yoktu: kac asama oldugunu, ne kadar surecegini ve
 *     sonunda seviyeyi YINE KENDISININ sececegini hicbir yerde okumadan ilk
 *     sorunun icinde buluyordu. Yerlestirme kullanicinin uygulamayla ilk
 *     ciddi temasi; ne oldugunu bilmeden girilen on bes dakikalik bir olcum
 *     yarida birakiliyor. `exam_start` de ekran ACILINCA yaziliyordu.
 *   - BECERI PROFILI cizilmiyordu. Sunucu dort asamanin her biri icin ayri
 *     bir seviye donduruyor (`perSkill`) ve tanitim bunu acikca vaat ediyor
 *     ("beceri profili alirsin") - vaat edilen sey veri olarak geliyor,
 *     ekranda gorunmuyordu. Onerinin NEDEN o seviye oldugu (dort asamanin
 *     ortancasi) da yalniz webde yaziliydi.
 *
 * Olculen: tanitim ve sonuc ekranlarinin bolum sirasi, `exam_start`in ani.
 *
 * SINIRI YAZILI: kapi KAYNAK METNI okuyor, calisma anini degil. Bir bolumun
 * silinmesini ya da adinin degismesini goruyor; `if (false)` ile olu birakmayi
 * GORMUYOR. Gercek gerileme birincisi gibi oluyor (biri blogu siliyor ya da
 * anahtari degistiriyor), o yuzden enjeksiyonlar da oyle yapildi. */
{
  const BOLUM = [
    ["tanitim basligi", /onboarding\.kisa_yerlestirme_sinavi/, /onboarding\.kisa_yerlestirme_sinavi/],
    ["tanitim metni", /plc\.intro/, /plc\.intro/],
    ["son alma", /placement\.last_taken/, /placement\.last_taken/],
    ["basla", /t\("common\.start"\)/, /t\("common\.start"\)/],
    ["beceri profili", /describePerSkill\(result\.perSkill/, /describePerSkill\(result\.perSkill/],
    ["ortanca notu", /placew\.median_note/, /placew\.median_note/],
    ["kaydedilmedi", /placement\.not_saved/, /placement\.not_saved/],
    ["seviye cipleri", /placement\.suggested/, /placement\.suggested/],
  ];
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const web = strip(read("src/components/placement/placement-test.tsx"));
  const mob = strip(read("mobile/src/screens/PlacementScreen.tsx"));
  /* TANITIMDAN BASLIYOR: dosyanin basindan aramak mobilde "son alma"yi en
     one koyuyordu, cunku o dizgi BEKLEME SURESI ekraninda da geciyor - ayri
     bir ekran, ayni anahtar. Olcunun komsusunu olcmenin bir baska bicimi. */
  const bastan = (src, bas) => (src.indexOf(bas) < 0 ? src : src.slice(src.indexOf(bas)));
  const sira = (src, ix) =>
    BOLUM.map(([ad, ...d]) => [ad, src.search(d[ix])])
      .filter(([, i]) => i >= 0)
      .sort((a, b) => a[1] - b[1])
      .map(([ad]) => ad);
  sameList(
    "yerlestirme ekranlari",
    sira(bastan(mob, "onboarding.kisa_yerlestirme_sinavi"), 1),
    sira(bastan(web, "onboarding.kisa_yerlestirme_sinavi"), 0),
  );

  /* `exam_start` tanitimin BASLA dugmesinde yazilmali, ekran acilisinda
     degil: ekrani acan herkesi "basladi" saymak huninin payini oldugundan
     buyuk gosteriyordu (§11.219'un ayni dersi). */
  const ani = (src) => {
    const i = src.indexOf('exam_start", 0, "placement');
    if (i < 0) return "hic yazilmiyor";
    /* EN YAKIN onceki isaret kazanir: cagri bir `useEffect` govdesinde mi
       (ekran acilisi) yoksa bir baslatma yolunda mi (dugme ya da `start`
       fonksiyonu). Sabit uzunlukta bir pencereye bakmak webde yanlis cevap
       veriyordu - orada cagri `function start()` icinde, dugme ise baska
       satirda. */
    const once = src.slice(0, i);
    const acilis = once.lastIndexOf("useEffect(");
    const baslat = Math.max(once.lastIndexOf("function start("), once.lastIndexOf("onPress={"), once.lastIndexOf("onClick={"));
    return baslat > acilis ? "basla dugmesinde" : "ekran acilisinda";
  };
  sameList("yerlestirme olcum ani", [ani(mob)], [ani(web)]);
}

/* ── 131. seviye sinavinda sik davranisi ve ses hatasi ────────────────────
 * Iki sey cikti, ikisi de Androidde:
 *   - SINAV ORTASINDA DOGRU CEVAP GOSTERILIYORDU. Secilen sik yesile, yanlis
 *     olan kirmiziya boyaniyor ve siklar kilitleniyordu; ayni metnin sonraki
 *     sorulari kolaylasiyordu. Uygulamanin kendi sozu bunun tersi ve AYNI
 *     ekranda yazili: `exam.answers_at_end` - "cevap sinav sonunda
 *     gosterilir". Web yalniz SECIMI isaretliyor.
 *   - SES ALINAMAZSA SINAV TIKANIYORDU. Konusma maddesinin hata dalinda
 *     ekranda yalniz "Kaydet" kaliyordu: mikrofon izni yoksa ya da taniyici
 *     hicbir sey duymuyorsa ilerlemenin YOLU YOKTU. Web iki denemeden sonra
 *     maddeyi atliyor ve nedenini yaziyor.
 *
 * Olculen: sik boyamasinda dogru cevaba bakan bir dal var mi, ve ses hatasi
 * dalinda ilerleten bir cikis var mi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const mob = strip(read("mobile/src/screens/ExamScreen.tsx"));
  const web = strip(read("src/components/exam-player.tsx"));
  /* "Dogru cevabi acan" desen: sik cizilirken `q.answer` ile karsilastirma.
     Bolum SONUNDA dogru/yanlis sayilmasi ayri sey (o `correctRef`te ve
     `onMiss`te) - burada aranan, SEKLIN kendisini boyayan karsilastirma. */
  const acikliyor = (src) => {
    /* Desen ILK yazilisinda yalniz `q.answer`a bakiyordu ve AYNI dosyada yuz
       satir asagida duran ayni hatayi (`Choice`, `i === answerIdx`) hic
       gormedi - olcunun komsusunu olcmenin on ikinci bicimi. Simdi "dogru
       cevabi tutan her ad" araniyor: sik cizilirken ona bakan bir dal varsa
       cevap aciliyor demektir. */
    const dogru = /(backgroundColor|className|const bg)[^\n]*\b(?:oi|i|pick|picked|chosen) === (?:q\.answer|answerIdx|item\.answer|correctIndex)\b/;
    const ters = /(backgroundColor|className|const bg)[^\n]*\b(?:q\.answer|answerIdx|correctIndex) === (?:oi|i|pick)\b/;
    return dogru.test(src) || ters.test(src) ? "aciyor" : "acmiyor";
  };
  /* Ses hatasindan cikis: hata dalinda ilerleten bir dugme ve sebebi. */
  const cikis = (src) =>
    [
      "sebep=" + (/exam\.audio_failed_(retry|skip)/.test(src) ? "yaziyor" : "yazmiyor"),
      "ilerletiyor=" + (/(phase|spk) === "(err|failed)"[\s\S]{0,900}?(onDone\(false, 0\)|onClick=\{advance\})/.test(src) ? "evet" : "hayir"),
    ];
  sameList("sinav sik davranisi", ["sik boyamasi=" + acikliyor(mob), ...cikis(mob)], ["sik boyamasi=" + acikliyor(web), ...cikis(web)]);
}

/* ── 132. yerlestirmede cevap aciliyor mu ─────────────────────────────────
 * Web burayi bilerek ikiye bolmus: GERCEK test yalniz secimi isaretliyor
 * (`placement/placement-test`), misafir akisindaki DEMO ise cevabi aciyor
 * (`placement/demo-placement`) - biri olcum, oteki ilk temas.
 *
 * Androidde ikisi de aciyordu, cunku tek ekran iki soru kumesini de ayni
 * bilesenle ciziyor (`ChoiceGame`). Yani kullanicinin seviyesini OLCEN test
 * aynı zamanda ona ogretiyordu: ayni yapi sonraki maddelerde tekrar gectigi
 * icin ogrenilen sey sonraki cevaplari degistiriyordu. Ustelik haptik ve ses
 * de dogru/yanlis tonundaydi - titresim de cevabi soyluyordu.
 *
 * Olculen: her iki tarafta gercek testin acmadigi, demonun actigi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  /* Web'de iki ayri dosya; mobilde tek ekran + bilesene giden bayrak. */
  const webGercek = /o === q\.answer|=== q\.answer \? "option-correct"/.test(strip(read("src/components/placement/placement-test.tsx")));
  const webDemo = /o === q\.answer/.test(strip(read("src/components/placement/demo-placement.tsx")));
  const mobEkran = strip(read("mobile/src/screens/PlacementScreen.tsx"));
  const mobOyun = strip(read("mobile/src/game/ChoiceGame.tsx"));
  /* Bilesen bayragi tasiyor mu ve ekran GERCEK testte kapatiyor mu. */
  const bayrak = /reveal = true/.test(mobOyun) && /reveal\?: boolean/.test(mobOyun);
  const kosullu = /reveal=\{!usingReal\}/.test(mobEkran);
  /* Bayrak VARSAYILAN olarak aciyor (`reveal = true`), o yuzden "acmiyor"
     diyebilmek icin ekranin onu acikca kapatmasi gerekiyor. Ilk yazilisinda
     demo, bayrak gecilmediginde "acmiyor" diye okunuyordu - varsayilan ters
     okunmus. */
  const mobGercek = !(bayrak && kosullu);
  const mobDemo = !/reveal=\{false\}/.test(mobEkran);
  sameList(
    "yerlestirmede cevap acilmasi",
    ["gercek test=" + (mobGercek ? "aciyor" : "acmiyor"), "demo=" + (mobDemo ? "aciyor" : "acmiyor")],
    ["gercek test=" + (webGercek ? "aciyor" : "acmiyor"), "demo=" + (webDemo ? "aciyor" : "acmiyor")],
  );
}

/* ── 133. yarim birakilinca kaybedilen sey ────────────────────────────────
 * Basliktaki carpi ve donanim geri tusu SEVIYE SINAVINI (kirk bes dakika) ve
 * YERLESTIRMEYI (on bes dakika) tek dokunusta cope atiyordu ve soru
 * sorulmuyordu: cevaplar hicbir yere kaydedilmiyor, ikisi de bastan basliyor.
 * Uygulamanin kendi duzeni bunu zaten biliyor - tur ekrani
 * (`GameScreen` `useBackConfirm`) ve deneme kagidi (`MockExamScreen`
 * `ConfirmDialog`) bastan beri soruyor; en pahali iki yuzey atlanmisti.
 * (Web sinav SURERKEN hic cikis dugmesi vermiyor, yani orada boyle bir
 * dokunus yok.)
 *
 * Olculen: cevabi kurtarilamayan her ekranda cikis onaya bagli mi. */
{
  const KORUNAN = [
    "mobile/src/screens/GameScreen.tsx",
    "mobile/src/screens/MockExamScreen.tsx",
    "mobile/src/screens/ExamScreen.tsx",
    "mobile/src/screens/PlacementScreen.tsx",
  ];
  const korumasiz = KORUNAN.filter((f) => {
    const src = read(f);
    /* Iki kalip da kabul: `useBackConfirm` (donanim tusunu da yakaliyor) ya
       da ekranin kendi onay durumu + `ConfirmDialog`. Onemli olan cikisin
       SORULMASI, hangi yardimciyla sorulduğu degil. */
    /* Desenler AD SINIRINA kapali. Ilk yazilisinda `<ConfirmDialog` ONEK
       olarak eslesiyordu ve enjeksiyonda `<ConfirmDialog2` diye yeniden
       adlandirilan bileseni hâlâ "onay var" sayiyordu - olcunun komsusunu
       olcmenin on ucuncu bicimi. */
    return !(/useBackConfirm\(/.test(src) || /<ConfirmDialog[\s/>]/.test(src));
  }).map((f) => f.split("/").pop());
  sameList("cikis onayi (kurtarilamayan cevap)", korumasiz.length ? korumasiz : ["yok"], ["yok"], "korumasiz", "beklenen");

  /* MUAF: haftalik sinav ve gunluk tur. Ikisinde de yarim birakmak HAKKI
     harcamiyor - kayit yalnizca bitiste yaziliyor, yani kullanici geri
     girip bastan alabiliyor. Muafiyet kendini denetliyor: haftalik durumu
     `done: Boolean(row)` diye okuyor ve o satiri yalniz `finishWeekly`
     yaziyor; baska bir yazan cikarsa gerekce duser. */
  const weekly = read("src/lib/weekly.ts");
  const yazan = [...weekly.matchAll(/insert\(exams\)/g)].length;
  const finishte = /export async function finishWeekly[\s\S]*?insert\(exams\)/.test(weekly);
  sameList(
    "haftalik hak yarida harcanmiyor",
    ["exams yazan yer=" + yazan, "yazan=" + (finishte ? "finishWeekly" : "baskasi")],
    ["exams yazan yer=1", "yazan=finishWeekly"],
  );
}

/* ── 134. sinav sayaci ────────────────────────────────────────────────────
 * Seviye sinavinin suresi Androidde her saniye bir SAYICI azaltarak
 * isliyordu ve `setInterval` uygulama arka plana alininca duruyor: kullanici
 * uygulamadan cikip donunce sayac biraktigi yerden devam ediyordu, yani kirk
 * bes dakikalik sinav istenildigi kadar uzatilabiliyordu. Sure sinavin
 * KISITI ve o kisit Androidde delinebiliyordu. Web bastan beri gecen sureyi
 * duvar saatinden hesapliyor.
 *
 * Ikinci fark: son iki dakikada sayac webde kirmiziya donuyor, Androidde
 * sonuna kadar ayni renkteydi - "sure bitiyor" uyarisi hic verilmiyordu.
 *
 * DENEME KAGIDI BILEREK FARKLI: orada butce GOREV basina ve kalan saniye
 * kaydediliyor (`secondsLeft`), yani birakip donmek surdurmek demek. Iki
 * platform da orada ayni sayici kalibini kullaniyor ve asagida ayrica
 * olculuyor - "hepsi duvar saati olsun" demek o tasarimi bozardi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const mobSinav = strip(read("mobile/src/screens/ExamScreen.tsx"));
  const webSinav = strip(read("src/components/exam-player.tsx"));
  const kaynak = (src) =>
    /seconds \??\.?\s*(?:\?\? 0\s*)?\) - Math\.floor\(\(Date\.now\(\) - startedAt/.test(src.replace(/\s+/g, " ")) ||
    /paper\.seconds - Math\.floor\(\(Date\.now\(\) - startedAt/.test(src)
      ? "duvar saati"
      : "sayici";
  const uyari = (src) => {
    const m = src.match(/left < (\d+)/);
    return m ? "esik=" + m[1] : "uyari yok";
  };
  sameList("sinav sayaci", [kaynak(mobSinav), uyari(mobSinav)], [kaynak(webSinav), uyari(webSinav)]);

  /* Deneme kagidinda iki taraf da GOREV butcesini sayiciyla isletiyor ve
     kalan saniyeyi kaydediyor; kalip birebir ayni olmali. */
  const mobKagit = strip(read("mobile/src/screens/MockExamScreen.tsx"));
  const webKagit = strip(read("src/components/mock-exam-player.tsx"));
  const kagit = (src) => [
    "sayici=" + (/setLeft\(\(s\) => \(s <= 1 \? 0 : s - 1\)\)/.test(src) ? "var" : "yok"),
    "kalan kaydediliyor=" + (/secondsLeft: left/.test(src) ? "evet" : "hayir"),
  ];
  sameList("deneme kagidi sayaci", kagit(mobKagit), kagit(webKagit));
}

/* ── 135. zamanli yuzeylerde surenin KAYNAGI ──────────────────────────────
 * §134 seviye sinavini duzeltti; ayni soruyu butun zamanli yuzeylere sordum.
 * Kural: bir ZAMAN SINIRI olcum kisitiysa, sure duvar saatinden gelmeli -
 * her saniye bir sayiciyi azaltmak, uygulama arka plana alininca (webde
 * sekme gizlendiginde) sureyi durduruyor ve sinir delinebiliyor.
 *
 * Rol yapma sinavinda hata IKI platformda da vardi ve ikisi birlikte
 * duzeltildi. Hayatta kalma turu bunu bastan beri dogru yapiyor.
 *
 * DENEME KAGIDI listede YOK ve gerekcesi §134'te: orada butce gorev basina,
 * kalan saniye kaydediliyor ve birakip donmek SURDURMEK demek. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  /* Duvar saati izi: kalan sure `Date.now()` ile bir hedeften/baslangictan
     hesaplaniyor mu. Sayici izi: `setLeft((s) => s - 1)` gibi bir azaltma. */
  const kaynak = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    /* Duvar saati izi: kalan sure bir HEDEF ya da BASLANGIC damgasiyla
       `Date.now()` arasindaki farktan geliyor. Ilk yazilisinda desen
       "`) / 1000`"a capalanmisti ve seviye sinavinin kendi ifadesini
       (`(Date.now() - startedAt.current) / 1000`) hic gormedi: iki taraf da
       "sure yok" diye okunuyor ve karsilastirma bos bir esitlikle geciyordu.
       Ustteki karsilastirmanin komsusunu olcmenin on dorduncu bicimi. */
    const duvar = /(?:deadline|startedAt)(?:\.current)?\s*-\s*Date\.now\(\)|Date\.now\(\)\s*-\s*(?:deadline|startedAt)(?:\.current)?/.test(src);
    const sayici = /setLeft\(\((?:s|n)\) => (?:s|n) - 1\)|setLeft\(\((?:s|n)\) => \((?:s|n) <= 1/.test(src);
    return yol.split("/").pop() + "=" + (sayici ? "sayici" : duvar ? "duvar saati" : "sure yok");
  };
  const mob = ["mobile/src/screens/ExamScreen.tsx", "mobile/src/screens/RoleplayExamScreen.tsx", "mobile/src/screens/ChallengeScreen.tsx"].map(kaynak);
  const web = ["src/components/exam-player.tsx", "src/components/lessons/roleplay-exam.tsx", "src/components/challenge-player.tsx"].map(kaynak);
  /* Dosya adlari farkli; karsilastirma yalniz KAYNAK uzerinden. */
  sameList("zamanli yuzeylerin sure kaynagi", mob.map((x) => x.split("=")[1]), web.map((x) => x.split("=")[1]));
  /* Ucunde de duvar saati olmali: iki taraf ayni sekilde YANLIS olsa ustteki
     karsilastirma gecerdi - §11.227'nin dersi. */
  const sayiciyla = [...mob, ...web].filter((x) => x.endsWith("=sayici"));
  sameList("zamanli yuzeyler duvar saatinde", sayiciyla.length ? sayiciyla : ["yok"], ["yok"], "sayiciyla isleyen", "beklenen");
}

/* ── 136. cevrimdisi tur cevaplari ────────────────────────────────────────
 * Tur cevaplari webde yalniz BELLEKTE bekliyordu (`session-player`
 * `pending.current`): ag yoksa bir sonraki gonderimde tekrar deneniyor, ama
 * sekme kapanirsa cevaplar YOK OLUYORDU. SRS aralik ilerlemiyor, XP
 * verilmiyor, kullanici ayni kelimeleri yeniden goruyor - hem de bunu
 * bilmeden, cunku ekran "kaydi bekliyor" diyordu ve kayit hic olmayacakti.
 * Android bunu bastan depolamaya yaziyor (`game/session` `queueAnswers`).
 *
 * Olculen: iki tarafta da kalici bir kuyruk var mi, kalici hata ayrimi ayni
 * mi ve kuyruk ayni uc kurali tutuyor mu. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const kuyruk = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return [
      "kalici depolama=" + (/(localStorage|AsyncStorage)\.setItem\(\s*(KEY|ANSWER_QUEUE_KEY)/.test(src) ? "var" : "yok"),
      /* Sinir: eski turlar SRS icin degerini yitiriyor. */
      /* Sinir `queueAnswers`in KENDI govdesinden okunuyor: dosyanin ilk
         `slice(-N)`ine bakmak mobilde alakasiz bir kirpmayi (-200) buluyordu
         ve kapi "sinir 200'e 20" diye ayrisiyordu - olcunun komsusunu
         olcmenin on besinci bicimi. */
      "sinir=" + ((src.match(/queueAnswers\([^)]*\)[^{]*\{(.*?)\n?\s*\}\s*(?:export|const|\/\*|$)/s)?.[1] ?? src).match(/slice\(-(\d+)\)/)?.[1] ?? "yok"),
      /* Bir kayit dusunce sonrakiler DENENMIYOR (ag yoksa bosuna istek). */
      "dus-durdur=" + (/remaining\.push\(\.\.\.list\.slice\(i\)\); break;/.test(src) ? "var" : "yok"),
      /* Kalici hata ayrimi: 401/403/408/429 GECICI sayiliyor mu. */
      "gecici sayilanlar=" + [...new Set([...src.matchAll(/status === (401|403|408|429)/g)].map((m) => m[1]))].sort().join("/"),
    ];
  };
  sameList("cevrimdisi cevap kuyrugu", kuyruk("mobile/src/game/session.ts"), kuyruk("src/lib/answer-queue.ts"));

  /* Kuyrugu KIMSE cagirmazsa yazilmis olmasi bir sey ifade etmiyor (§90'in
     dersi): iki oynaticinin da hem yazan hem bosaltan tarafi olmali. */
  const cagri = (yol) => {
    const src = strip(read(yol));
    return ["yazan=" + (/queueAnswers\(/.test(src) ? "var" : "yok"), "bosaltan=" + (/flushPendingAnswers\(/.test(src) ? "var" : "yok")];
  };
  sameList("kuyrugu cagiran", cagri("mobile/src/game/session.ts"), cagri("src/components/session-player.tsx"));
}

/* ── 137. deneme kagidi listesinde bolum durumu ───────────────────────────
 * Bir kagit 80-205 dakika suruyor ve bolum bolum cozuluyor, yani listenin
 * cevaplamasi gereken soru "nerede kaldim". Android bunu satir satir
 * gosteriyor (`MockExamsScreen` `PartBadge`: yuzde, gecti/kaldi, yarim
 * kaldi). Webde ayni veri ZATEN cekiliyordu (`done` ve `running`) ama yalniz
 * ortalama blogunda ve "yarim kalanlar" listesinde kullaniliyordu: bir kagidin
 * hangi bolumlerini cozdugun listede hic gorunmuyordu.
 *
 * Olculen: iki tarafta da satirin durumu var mi, ayni uc hâli mi tasiyor ve
 * yarim kalan bitmisi ezerek mi gosteriliyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const durum = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return [
      "yarim=" + (/mockexams\.state_running/.test(src) ? "var" : "yok"),
      "bitmis=" + (/mockexams\.state_done/.test(src) ? "var" : "yok"),
      /* Gecti/kaldi rengi: iki tarafta da ton `passed`e bakiyor. */
      "gecti-tonu=" + (/passed\s*\?/.test(src) ? "var" : "yok"),
      /* Yarim kalan, bitmisi EZMELI: kullanici o bolume yeniden girmis. */
      "yarim ezer=" + (/(running|state === "running")/.test(src) ? "var" : "yok"),
    ];
  };
  sameList(
    "deneme kagidi bolum durumu",
    durum("mobile/src/screens/MockExamsScreen.tsx"),
    durum("src/app/(app)/mock-exams/page.tsx"),
  );

  /* MUAF: `mockexams.state_local` ("yalniz bu cihazda") yalniz Androidde.
     Orada sonuc cihaza da yaziliyor (`mockExamLocal` `pushLocalResult`) cunku
     uygulama cevrimdisi acilabiliyor ve liste sunucu olmadan da bu soruya
     cevap vermek zorunda; webde liste SUNUCUDA ciziliyor, yani sunucu yoksa
     sayfa da yok. Muafiyet kendini denetliyor: web listesi bir gun istemciye
     tasinirsa (ve `localStorage` okumaya baslarsa) bu satir duser. */
  const webListe = strip(read("src/app/(app)/mock-exams/page.tsx"));
  const istemcide = /"use client"|localStorage/.test(webListe);
  /* Ad sinirina kapali: `/pushLocalResult/` oneki `pushLocalResult2`yi de
     eslesiyordu ve enjeksiyon gecmisti (§11.226'daki `<ConfirmDialog` ile
     ayni hata, ayni turda ikinci kez). */
  const mobilYerel = /pushLocalResult\(/.test(strip(read("mobile/src/screens/MockExamScreen.tsx")));
  /* Uc hâlden yalniz biri bekleniyor. (Ilk yazilisinda iki taraf da ayni
     sabiti donduruyordu, yani kapi hicbir sey olcmuyordu - kendi yazdigim
     bos bir esitlik.) */
  const hal = istemcide
    ? "web listesi istemcide: yerel kopya webde de gerekli"
    : mobilYerel
      ? "muaf: mobil yerel kopya tutuyor, web listesi sunucuda ciziliyor"
      : "mobilde yerel kopya YOK";
  sameList("bolum durumu yerel kopya", [hal], ["muaf: mobil yerel kopya tutuyor, web listesi sunucuda ciziliyor"], "bulunan", "beklenen");
}

/* ── 138. KAPILARIN KENDI DENETIMI: onek eslesmesi ────────────────────────
 * Bu dosya iki turda ust uste ayni hatayi yapti: bir BILESEN ya da FONKSIYON
 * adini sinirsiz bir desenle aradi (`/ConfirmDialog/`, `/pushLocalResult/`)
 * ve enjeksiyonda yeniden adlandirilan adi (`ConfirmDialog2`,
 * `pushLocalResult2`) hâlâ "var" saydi. Yani kapi, olcmesi gereken seyin
 * ONEKINI olcuyordu ve gercek bir gerilemeyi kacirirdi.
 *
 * Iki ornegi tek tek duzeltmek yerine SINIF kapatiliyor: kapi kendi kaynagini
 * okuyor ve `.test()` icinde kullanilan SADE bir bilesen/fonksiyon adi
 * (buyuk harfle baslayan ya da `<` ile yazilan, hic metakarakter tasimayan
 * desen) bulursa ihlal veriyor. §118/§119'un kalibi: listeyi degil, listenin
 * KENDISINI olcmek.
 *
 * Kucuk harfli sade adlar (`premium`, `leech`, `dialogue` gibi alan/tur
 * adlari) DISARIDA: onlarda onek eslesmesi pratikte zararsiz ve hepsini
 * sinirlamak yuz desen degistirmek olurdu. Kural, yakalanan iki gercek
 * hatanin bicimine kapali tutuluyor. */
{
  const kendi = read("scripts/parity-check.mjs").split("\n");
  const sinirsiz = [];
  kendi.forEach((satir, i) => {
    for (const m of satir.matchAll(/\/((?:\\.|\[[^\]]*\]|[^/\n\\])+)\/[a-z]*\.test\(/g)) {
      const govde = m[1];
      if (!/^<?[A-Za-z_][A-Za-z0-9_]*$/.test(govde)) continue; // metakarakter var: bu kural degil
      const ad = govde.replace(/^</, "");
      if (govde.startsWith("<") || /^[A-Z]/.test(ad)) sinirsiz.push(`${i + 1}: /${govde}/`);
    }
  });
  sameList("kapilarda onek eslesmesi", sinirsiz.length ? sinirsiz : ["yok"], ["yok"], "sinirsiz ad deseni", "beklenen");
}

/* ── 139. calisma suresi karosu ───────────────────────────────────────────
 * Ayni karo iki platformda iki ayri BICIMDE yaziliyordu: web `prog.hours` +
 * `skills.dk` ile "11 sa 20 dk", Android tek anahtarla "11s 20dk". Almanca
 * arayuzde fark daha gorunurdu ("11 Std 20 Min." / "11 Std. 20 Min."), yani
 * ayni sayi iki uründe farkli okunuyordu. Etiket de ayriydi: web "Calisma
 * suresi", Android "Toplam sure".
 *
 * Olculen: karonun etiketi ve sure bicimini kuran anahtarlar. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const sure = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    const anahtarlar = [...new Set([...src.matchAll(/"((?:time|prog|skills|progress)\.[\w]*(?:hours|minutes|dk|time_total|study_time)[\w]*)"/g)].map((m) => m[1]))].sort();
    return anahtarlar;
  };
  sameList("calisma suresi karosu", sure("mobile/src/screens/ProgressScreen.tsx").concat(sure("mobile/src/lib/useMe.ts")).sort(), sure("src/components/progress-view.tsx"));
}

/* ── 140. birikmis toplam sayilar bicimli mi ──────────────────────────────
 * Ust bardaki XP rozeti HAM sayiyi basiyordu ("12450"), oysa webin geri
 * kalani `formatNumber` kullaniyor: Turkce ve Almanca arayuzde binlik ayraci
 * nokta, Ingilizcede virgul. Ust bar uygulamanin HER ekraninda duruyor, yani
 * ayracsiz sayi en cok gorulen sayiydi.
 *
 * Olculen: iki tarafta da JSX'in icine ham bir birikmis toplam basilmiyor.
 * Kural tek tek dosya adi saymiyor, YUZEYI tariyor - yeni bir ekran ayni
 * hatayi yaparsa da yakalanir.
 *
 * MUAF iki bicim, ikisi de gerekcesiyle:
 *   - `{a, b, c}` gibi virgullu ifadeler: bunlar JSX cocugu degil, cozme
 *     (destructuring) kalibi ve tarama onlari da goruyor.
 *   - `app/admin/*`: yonetim panosu bastan beri TEK DILLI (metinler kodda
 *     Turkce yazili), orada `toLocaleString("tr-TR")` tutarsizlik degil
 *     bilincli bir secim. Muafiyet kendini denetliyor: panoya `useT`/`t(`
 *     girerse (yani cok dilli olursa) satir duser. */
{
  const walkTsx = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__|\/i18n/.test("/" + p)) walkTsx(p, out); }
      else if (/\.tsx$/.test(e.name)) out.push(p);
    }
    return out;
  };
  const hamlar = [];
  for (const kok of ["src/components", "src/app", "mobile/src"]) {
    for (const f of walkTsx(kok)) {
      if (f.startsWith("src/app/admin")) continue; // yukaridaki muafiyet
      const src = read(f).replace(/\/\*[\s\S]*?\*\//g, " ");
      /* IKI GOSTERIM YERI: JSX cocugu (webin kalibi) ve `value=`/`label=`
         nitelikleri (mobilin kalibi - toplamlar `Stat`/`StatTile` icine prop
         olarak giriyor). Ilk yazilisinda yalniz cocuk pozisyonu araniyordu ve
         enjeksiyon mobil tarafta HIC yakalanmadi: `value={me.xp}` niteliktir.
         Olcunun komsusunu olcmenin on altinci bicimi. */
      for (const m of src.matchAll(/(?:>|\}|\s|(?:value|label|title)=)\{([^{}]*\b(?:totalXp|weeklyXp|\w*\.xp|xp)\b[^{}]*)\}/g)) {
        const ifade = m[1].trim();
        /* `format*` bicimli; `,` cozme kalibi; `:` nesne; `=>` islev. */
        if (/format|=>|:|,/.test(ifade)) continue;
        /* NITELIK pozisyonunda bicimleme BIR KATMAN ASAGIDA olabiliyor.
           Iki cift muaf ve ikisi de dosya+etiket olarak yazili (etiket adi tek
           basina yetmez: webin `Stat`i icinde bicimliyor, mobilin `Stat`i
           bicimlemiyor - ayni ad, ayri davranis):
             - `social/public-profile` `<Stat>`: `formatNumber`i kendi
               govdesinde cagiriyor (asagida denetleniyor),
             - `session-player` `<CountUp>`: TUR BASINA kazanilan XP, iki
               haneli bir sayi; Android de ham yaziyor (`+${xpGained} XP`). */
        const etiket = src.slice(0, m.index).match(/<([A-Z]\w*)[^<>]*$/)?.[1] ?? "";
        const cift = f.split("/").pop() + ":" + etiket;
        if (cift === "public-profile.tsx:Stat" || cift === "session-player.tsx:CountUp") continue;
        hamlar.push(f.split("/").pop() + ": {" + ifade + "}");
      }
    }
  }
  sameList("birikmis toplam bicimi", hamlar.length ? hamlar : ["yok"], ["yok"], "ham basilan", "beklenen");

  /* Muafiyetlerin kendisi: `<Stat>` gercekten bicimliyor mu, `CountUp`
     gercekten ham mi. Biri degisirse muafiyet gerekcesi de degisir. */
  const statBicimli = /formatNumber\(value \?\? 0, lang\)/.test(read("src/components/social/public-profile.tsx"));
  const countUpHam = /return <>\{shown\}<\/>;/.test(read("src/components/celebrate.tsx"));
  sameList(
    "toplam bicimi muafiyetleri",
    ["Stat bicimliyor=" + (statBicimli ? "evet" : "hayir"), "CountUp ham=" + (countUpHam ? "evet" : "hayir")],
    ["Stat bicimliyor=evet", "CountUp ham=evet"],
    "bulunan",
    "beklenen",
  );

  /* Yonetim panosu hâlâ tek dilli mi. */
  const pano = ["src/app/admin/dashboard.tsx", "src/app/admin/users-table.tsx"].map((f) => read(f)).join("\n");
  sameList("yonetim panosu tek dilli", [/\buseT\(|\bt\(\"/.test(pano) ? "cok dilli olmus" : "tek dilli"], ["tek dilli"], "bulunan", "beklenen");
}

/* ── 141. tarih ve yuzde arayuz dilinde mi ────────────────────────────────
 * Premium bitis tarihi iki platformda da CIHAZIN/TARAYICININ dilinden
 * biciimleniyordu: webde yerel `undefined` biraklimis, Androidde hic
 * verilmemisti. Arayuzu Turkce secmis ama telefonu/tarayicisi Ingilizce olan
 * kullanici "September 11, 2026" goruyordu. Odeme kararinin dayandigi tarih
 * bu; iki hata birlikte duzeltildi (§11.228'in kalibi).
 *
 * Olculen: `toLocale*` cagrilarinin hepsi arayuz yerelini aliyor mu. Kural
 * yuzey tariyor, dosya adi saymiyor.
 *
 * MUAF: `app/admin/*` - pano bastan beri tek dilli (bkz. §140) ve orada
 * `tr-TR` bilincli. Muafiyet §140'ta ayrica denetleniyor. */
{
  const walkAll = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__/.test("/" + p)) walkAll(p, out); }
      else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
    return out;
  };
  const yerelsiz = [];
  for (const kok of ["src/components", "src/app", "mobile/src"]) {
    for (const f of walkAll(kok)) {
      if (f.startsWith("src/app/admin")) continue;
      const src = read(f).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
      /* Argument penceresi: `[^,)]*` ile kesmek `dateLocale()`in kendi
         kapanis parantezinde duruyordu ve kapi dogru cagrilari "yerelsiz"
         sayiyordu - on yedinci biçim. Simdi cagrinin ilk kirk karakterine
         bakiliyor. */
      for (const m of src.matchAll(/\.toLocale(?:Date|Time)?String\(([\s\S]{0,40})/g)) {
        const arg = m[1].trim();
        /* Kabul edilen: `dateLocale()` (mobil), `localeOf(lang)` (web) ve dil
           kodunu dogrudan veren `currentLang()`. Bos ya da `undefined`
           cihazin/tarayicinin dilini secer. */
        if (/^\s*(?:dateLocale\(\)|localeOf\(|currentLang\(\)|[\w.]*locale|[\w.]*lang\b)/.test(arg)) continue;
        yerelsiz.push(f.split("/").pop() + ": toLocale…(" + (arg.split("\n")[0].slice(0, 24) || "bos") + ")");
      }
    }
  }
  sameList("tarih yereli arayuzden", yerelsiz.length ? yerelsiz : ["yok"], ["yok"], "yerelsiz cagri", "beklenen");

  /*
   * YUZDE ISARETI: yeri dile ait (tr "%85", en "85%", de "85 %") ve iki taraf
   * da onu bicimleyiciden almali (`formatPercent` / `common.pct`).
   *
   * BU KAPI BIR KEZ YANLIS OLCTU ve yanlis bir borc raporladi (bkz.
   * web-parity §11.235'in duzeltmesi): tarama `width: ${pct}%` gibi DUZEN
   * yuzdelerini de sayiyordu ve "otuz iki yerde koda gomulu" diyordu. Otuz
   * ikisinin otuz biri CSS genisligiydi; gercek sayi BIRDI. Simdi eslesmenin
   * cevresindeki seksen karakter okunuyor ve duzen baglamlari (genislik,
   * yukseklik, gradyan, esneme) disarida.
   */
  const kodaGomulu = [];
  for (const kok of ["src/components", "src/app", "mobile/src"]) {
    for (const f of walkAll(kok)) {
      if (f.startsWith("src/app/admin") || /\/i18n\//.test(f)) continue;
      const src = read(f).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
      for (const m of src.matchAll(/\{\s*(?:\w+\.)?(?:pct|accuracy)\s*\}\s*%|%\s*\{\s*(?:\w+\.)?(?:pct|accuracy)\s*\}|`\$\{[^`]*(?:pct|accuracy)[^`]*\}%`/g)) {
        const pencere = src.slice(Math.max(0, m.index - 80), m.index + 40);
        if (/width|height|gradient|flexBasis|style\s*=|style:\s*\{/.test(pencere)) continue;
        /* BICIMLEYICININ KENDI YEDEGI muaf: `formatPercent` Intl yoksa elle
           yaziyor ve orasi kuralin kaynagi, ihlali degil. */
        if (/catch \{/.test(pencere) && /formatPercent/.test(src.slice(Math.max(0, m.index - 400), m.index))) continue;
        kodaGomulu.push(f.split("/").pop() + ": " + m[0].trim().slice(0, 30));
      }
    }
  }
  sameList("yuzde isareti sozlukten", kodaGomulu.length ? kodaGomulu : ["yok"], ["yok"], "koda gomulu", "beklenen");
}

/* ── 143. ayarlarda seviye aciklamasi ─────────────────────────────────────
 * Dort seviye aciklamasi sozlukte duruyordu (`level.*_desc`) ve mobilde yalniz
 * onboarding'de okunuyordu: ayarlarda seviye "A1…C1" diye gorunuyor, hangi
 * seviyenin ne anlama geldigi yazmiyordu. Web aciklamayi "bu dugmeyi senden
 * baskasi cevirmiyor" cumlesinin basina koyarak zaten gosteriyordu; mobil de
 * artik ayni cumleyi kuruyor.
 *
 * (Bu turda once webe IKINCI bir aciklama satiri eklemistim - orada zaten bir
 * tane vardi ve ben yalniz `title` niteligini gormustum. Kapinin kendisi
 * yakaladi: enjeksiyon yesil kalinca dosyada desenin IKI kez gectigi ortaya
 * cikti. Yinelenen satir geri alindi.)
 *
 * Olculen: seciliye gore acilan aciklama ve anahtar tablosu. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const tablo = (yol) => {
    const src = strip(read(yol));
    return [...new Set([...src.matchAll(/"((?:level\.\w+_desc)|onboarding\.i_m_just_starting_out)"/g)].map((m) => m[1]))].sort();
  };
  const gorunur = (yol, desen) => (desen.test(strip(read(yol))) ? "var" : "yok");
  sameList(
    "ayarlarda seviye aciklamasi",
    [...tablo("mobile/src/screens/SettingsScreen.tsx"), "gorunur satir=" + gorunur("mobile/src/screens/SettingsScreen.tsx", /LEVEL_DESC_KEY\[level\]/)],
    [...tablo("src/components/profile-form.tsx"), "gorunur satir=" + gorunur("src/components/profile-form.tsx", /LEVELS\.find\(\(l\) => l\.id === level\)\?\.descKey/)],
  );
}

/* ── 144. gunluk hedef araligi ────────────────────────────────────────────
 * OLCUM §183'E TASINDI ve bu kapi TAM DA kendi uyardigi tuzaga dustu.
 *
 * Kapi ucun kirpmasindan ve iki kaydiricidan sayi cikarip karsilastiriyordu.
 * Sinirlar tek kaynaga tasinip yuzeyler sabiti okumaya baslayinca UC TARAF DA
 * "?" dondurdu - ve "?" ile "?" esit oldugu icin kapi YESIL kaldi. Yani
 * hicbir sey olcmeden gecti; kendi govdesindeki not ("alt=Infinity diye
 * bildirdi, yani hicbir sey olcmuyordu") bu kez sessiz bicimde tekrar etti.
 *
 * Ders: bir kapi olcemedigi seyi "bilinmiyor" diye isaretleyip iki tarafta da
 * ayni isareti uretiyorsa, karsilastirma kapiyi korumaz. §183 bu yuzden
 * KAYNAGA bakiyor - sayiya degil. */

/* ── 145. gorunen adin uzunlugu ───────────────────────────────────────────
 * OLCUM §183'E TASINDI. Kapi dort ad kutusundan `maxLength` SAYISINI cikarip
 * ucun `slice`iyle karsilastiriyordu. Dort kutu da artik siniri kaynaktan
 * aliyor (`PROFILE_LIMITS.displayNameMax`), yani okunacak bir sayi yok;
 * dogru soru "sayi kac yerde yazili" ve onu §183 soruyor. */

/* ── 146. sosyal profilin sinirlari ───────────────────────────────────────
 * BU KAPI SAYILARI OKUYORDU ve dogru sorudan bir adim geride kaldi.
 *
 * Eski olcum dort yuzeydeki SAYIYI (20 ve 140) kuralin sayisiyla
 * karsilastiriyordu; yani sayinin dort yerde yazili olmasini VERI sayip
 * yalnizca ayni kalmalarini kolluyordu. Dogru soru "sayilar ayni mi" degil,
 * "sayi kac yerde yazili": yuzeyler artik siniri KAYNAKTAN aliyor (webde
 * dogrudan `lib/social/username`, mobilde kendi tek kaynagindan) ve sunucunun
 * deseni de sinirlardan kuruluyor. Olcum §182'ye tasindi; orada hem mobilin
 * kaynagi sunucuyla karsilastiriliyor hem de yuzeylerin kendi sabitini
 * tutmadigi denetleniyor.
 *
 * Kapi burada birakilmadi cunku iki kapinin ayni seyi farkli sorularla
 * olcmesi, biri bayatladiginda otekinin onu ortmesi demek. */

/* ── 147. ortak gorev karti ───────────────────────────────────────────────
 * Iki fark cikti, ikisi de ayni kartta ve zit yonlerde:
 *   - ARKADAS SECME satiri: Android her arkadasin HAFTALIK XP'sini yaziyor,
 *     web yalniz adi. Ortak gorevde partner secmek "kim gercekten cekecek"
 *     kararidir ve o soruya cevap veren tek sayi bu; webde secim kor
 *     yapiliyordu.
 *   - ILERLEME CUBUGU: web cubuga etiket koyuyor (`aria-label`), Android
 *     hicbir sey soylemiyordu - yuzde yalniz GORSELDE vardi, sesli okuyucu
 *     bos bir kutu goruyordu.
 *
 * Anahtar da ortak tabana tasindi: etiket `socialw.progress_pct` diye
 * web-ozel sozlukte duruyordu, artik `social.progress_pct`. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const kart = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return [
      "arkadas satirinda haftalik xp=" + (/social\.xp_this_week/.test(src) ? "var" : "yok"),
      "cubuk etiketi=" + (/social\.progress_pct/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("ortak gorev karti", kart("mobile/src/social/Quests.tsx"), kart("src/components/social/quests.tsx"));
}

/* ── 148. arkadas satirindaki eylemler ────────────────────────────────────
 * Satirda uc eylem var: durt/alkisla, gorev daveti, arkadaslıktan cikar.
 * Androidde ucu de SIMGE + METIN (`FriendRows` `ActionTile`); webde ikisi
 * metinliydi, gorev dugmesi ise yalniz hedef simgesiydi. Ne yaptigini sormak
 * icin farenin ustunde beklemesi gerekiyordu (`title`) - dokunmatik ekranda
 * hic ogrenilemiyordu. Satirin oteki iki dugmesi zaten metinliydi, yani
 * sessiz olan tek dugme buydu.
 *
 * Olculen: uc eylemin de GORUNUR bir adi var mi. `title` ipuclari webin
 * kendi eklentisi ve sayilmiyor: ipucu, adin yerini tutmuyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const eylemler = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    /* Gorunur ad: dugmenin ICINDE ya da `label=` ile gecen sozluk anahtari.
       `title=`/`aria-label=` gorunur ad DEGIL. */
    const gorunur = (anahtar) => {
      /* Duz metin taramasi, RegExp DEGIL: anahtar noktali (`friendrows.quest`)
         ve kacis dizisi kurmak bu dosyada bir kez bozuk desen uretti.
         ANAHTARIN KENDISI araniyor, `t("...")` kalibi degil: iki taraf da
         kosullu yaziyor (`t(cheer ? "friendrows.cheer" : "friendrows.nudge")`)
         ve kalip arayan ilk hâli o eylemi IKI TARAFTA DA "sessiz" sayiyordu -
         bos bir mutabakat. */
      const iz = '"' + anahtar + '"';
      let k = -1;
      while ((k = src.indexOf(iz, k + 1)) >= 0) {
        /* Geriye dogru en yakin nitelik adini bul: gizli etiket mi, gorunur
           ad mi. `title`/`aria-label`/`accessibilityLabel` GORUNUR ad degil. */
        const once = src.slice(Math.max(0, k - 120), k);
        const nitelik = once.match(/([\w-]+)=\{[^{}]*$/)?.[1] ?? "";
        if (/^(title|aria-label|accessibilityLabel|accessibilityHint)$/.test(nitelik)) continue;
        return "adi var";
      }
      return "sessiz";
    };
    return [
      "durt/alkisla=" + (gorunur("friendrows.nudge") === "adi var" || gorunur("friendrows.cheer") === "adi var" ? "adi var" : "sessiz"),
      "gorev=" + gorunur("friendrows.quest"),
      "cikar=" + (gorunur("social.remove") === "adi var" || gorunur("friendrows.remove") === "adi var" ? "adi var" : "sessiz"),
    ];
  };
  sameList("arkadas satiri eylemleri", eylemler("mobile/src/social/FriendRows.tsx"), eylemler("src/components/social/friend-list.tsx"));
}

/* ── 149. koda gomulu dil ─────────────────────────────────────────────────
 * Iki ornek cikti ve ikisi de "sozlukte karsiligi dururken kodda yazilmis
 * dil" sinifindan:
 *   - Mobil ses secicisinin ekran okuyucu etiketi TURKCE gomuluydu
 *     (`${v.label} sesini dinle`): arayuzu Ingilizce ya da Almanca olan
 *     kullanicinin okuyucusu da Turkce soyluyordu. Web ayni dugmeye sozlukten
 *     etiket veriyordu; anahtar ortak tabana tasindi (`voice.listen_to`).
 *   - Web sinav kapaginda kagit YOKSA "Niveauprufung", "Modulprufung",
 *     "Prufung A2" diye ALMANCA dizgiler gomuluydu. Kagit VARSA basligin
 *     Almanca olmasi doğru (`cover.titleDe` gercekten Almanca ve `lang`
 *     niteligi de onu soyluyor) ama yoklugunda uydurma Almanca yerine sozluk
 *     kullanilmali - Android oyle yapiyor.
 *
 * Olculen: iki yuzeyde de etiketin/basligin sozlukten gelmesi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const ses = (yol) => {
    const src = strip(read(yol));
    return /voice\.listen_to/.test(src) ? "sozlukten" : /sesini dinle|Listen to|anhoren/.test(src) ? "koda gomulu" : "yok";
  };
  sameList("ses secici etiketi", [ses("mobile/src/ui/VoicePicker.tsx")], [ses("src/components/voice-picker.tsx")]);

  /* Sinav kapagi: kagit yokken sozluk mu, uydurma Almanca mi. */
  /* Kagit VARKEN Almanca dogru, YOKKEN sozluk. O yuzden olculen sey dizginin
     varligi degil, YEDEK DALIN ne kullandigi: `cover?.titleDe ?? (...)` ve
     goz kapagindaki `cover ? ... : ...` ifadelerinin YANLIS tarafi. */
  const kapak = strip(read("src/components/exam-player.tsx")).replace(/\s+/g, " ");
  const baslikYedek = kapak.match(/cover\?\.titleDe \?\? \(([^)]*\([^)]*\)[^)]*)*\)/)?.[0] ?? "";
  const gozYedek = kapak.match(/: module === null \? t\("exam\.level_exam"[^}]*\}/)?.[0] ?? "";
  sameList(
    "sinav kapagi kagitsiz hâl",
    [
      "baslik yedegi=" + (/t\("exam\.(level|module)_exam"/.test(baslikYedek) ? "sozlukten" : "uydurma almanca"),
      "goz kapagi yedegi=" + (gozYedek ? "sozlukten" : "uydurma almanca"),
    ],
    ["baslik yedegi=sozlukten", "goz kapagi yedegi=sozlukten"],
    "web",
    "beklenen",
  );
}

/* ── 150. gecme notu sabitten mi ──────────────────────────────────────────
 * Deneme kagidinin gecme notu TEK yerde yazili (`MOCK_PASS_PCT = 60`) ama
 * renk esikleri dort yerde "60" diye ELLE kopyalanmisti - ikisi webde, ikisi
 * mobilde. Bugun tutuyorlar; sorun sunun: gecme notu admin panelinden
 * degistirilebiliyor (`premium/gates` `unlockPct` yorumuna bak) ve
 * degistiginde renk "gecti" demeye devam ederdi. Yani puan kirmizi olmasi
 * gerekirken yesil gorunurdu - kullanicinin kagidi gectigini sanmasi.
 *
 * Olculen: dort yuzeyde de esigin SABITTEN gelmesi. Sayi karsilastirilmiyor
 * (iki platformun sabiti ayri dosyalarda), esigin ADI araniyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const esik = (yol, desenler) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return desenler.map((d) => {
      const m = src.match(new RegExp(d + "\\s*>=\\s*([\\w.]+)"));
      return (m?.[1] ?? "yok") === "MOCK_PASS_PCT" ? "sabitten" : "elle: " + (m?.[1] ?? "yok");
    });
  };
  const mob = [
    ...esik("mobile/src/screens/MockExamScreen.tsx", ["score\\.score"]),
    ...esik("mobile/src/screens/MockStatsScreen.tsx", ["s\\.pct"]),
  ];
  const web = [
    ...esik("src/components/mock-exam-player.tsx", ["score\\.score"]),
    ...esik("src/app/(app)/mock-exams/stats/page.tsx", ["s\\.pct"]),
  ];
  sameList("gecme notu esigi", mob, web);
  const elle = [...mob, ...web].filter((x) => x !== "sabitten");
  sameList("gecme notu hepsi sabitten", elle.length ? elle : ["yok"], ["yok"], "elle yazilmis", "beklenen");
}

/* ── 151. yazdiklarim ekrani ──────────────────────────────────────────────
 * Iki eksik, ikisi de Androidde ve ikisi de "ekranda yazmayan ama bilinmesi
 * gereken" sinifindan:
 *   - ALT BASLIK yoktu. Web kartin altinda listenin ne topladigini ve
 *     metinlerin YALNIZ KULLANICIYA gorundugunu yaziyor (`writ.sub`);
 *     mobilde yalniz baslik vardi, yani "bunlar kime gorunuyor" sorusu
 *     ekranda hic cevaplanmiyordu.
 *   - YUKLEME ISKELETI sessizdi. Web iskelete `aria-busy` ve etiket koyuyor;
 *     mobilde yukleme yalniz gorseldeydi ve sesli okuyucu bos bir ekran
 *     duyuruyordu (§11.241'deki cubugun aynisi).
 *
 * Olculen: iki metnin de iki tarafta kullanilmasi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const yaz = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return [
      "alt baslik=" + (/writ\.sub/.test(src) ? "var" : "yok"),
      "iskelet etiketi=" + (/writ\.loading/.test(src) ? "var" : "yok"),
    ];
  };
  sameList("yazdiklarim ekrani", yaz("mobile/src/screens/WritingsScreen.tsx"), yaz("src/components/writings-card.tsx"));
}

/* ── 152. iskelet ekran okuyucuya ne diyor ────────────────────────────────
 * Ayni eksik iki turda iki ayri ekranda cikinca (§11.241 ilerleme cubugu,
 * §11.245 yazdiklarim iskeleti) tek tek degil KOKTEN bakildi: mobilin
 * iskelet bilesenlerinde hicbir erisilebilirlik ozelligi yoktu. Iskelet yalniz
 * GORSEL bir isaretti; sesli okuyucu kullanan biri bos bir ekran duyuyor,
 * uygulamanin calisip calismadigini bilemiyordu.
 *
 * Webin cozumu iki parcali ve dogru olan o: KAP duyuruyor (`SkeletonCard`:
 * `role="status" aria-busy`), SUS OLAN gizleniyor (satir/cizgi/karo
 * iskeletleri `aria-hidden`) - her satirin ayri ayri duyurulmasi gurultu
 * olurdu. Mobil de artik oyle.
 *
 * Olculen: kap duyuruyor mu ve sus gizleniyor mu. Bilesen ADLARI iki tarafta
 * ayri (`SkeletonRows` / `RowSkeleton`), o yuzden ad degil ROL esleniyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const govde = (src, ad) => {
    const i = src.indexOf("function " + ad);
    if (i < 0) return "";
    const j = src.indexOf("function ", i + 9);
    return src.slice(i, j < 0 ? src.length : j);
  };
  const mobSrc = strip(read("mobile/src/ui/Skeleton.tsx")).replace(/\s+/g, " ");
  const webSrc = strip(read("src/components/skeleton.tsx")).replace(/\s+/g, " ");
  const mob = [
    "kap duyuruyor=" + (/accessibilityState=\{\{ busy: true \}\}/.test(govde(mobSrc, "SkeletonCard")) ? "evet" : "hayir"),
    "kap etiket alabiliyor=" + (/accessibilityLabel=\{label\}/.test(govde(mobSrc, "SkeletonCard")) ? "evet" : "hayir"),
    "sus gizli=" + (/accessibilityElementsHidden/.test(govde(mobSrc, "SkeletonRows")) ? "evet" : "hayir"),
  ];
  const web = [
    "kap duyuruyor=" + (/aria-busy="true"/.test(govde(webSrc, "SkeletonCard")) ? "evet" : "hayir"),
    "kap etiket alabiliyor=" + (/aria-label=\{label\}/.test(govde(webSrc, "SkeletonCard")) ? "evet" : "hayir"),
    "sus gizli=" + (/aria-hidden/.test(govde(webSrc, "RowSkeleton")) ? "evet" : "hayir"),
  ];
  sameList("iskelet erisilebilirligi", mob, web);
}

/* ── 153. modal arka plani erisilebilirlik agacindan cikiyor mu ───────────
 * Webde onay diyalogu `<dialog>` uzerine kurulu ve bunu BEDAVA aliyor: odak
 * tuzagi, Esc ve arka planin inert olmasi tarayicinin isi (bileşenin kendi
 * yorumu da bunu soyluyor). RN `Modal` ise yalniz GORSEL olarak one geliyor;
 * erisilebilirlik agacinda arka plan ERISILEBILIR kaliyor, yani VoiceOver
 * kart bitince arkadaki ekrani okumaya devam ediyor ve kullanici hangi soruyu
 * cevapladigini kaybediyor. `accessibilityViewIsModal` onun karsiligi.
 *
 * Olculen: mobilde modal cizen HER bilesen bunu tasiyor mu. Kural yuzey
 * tariyor - yeni bir modal ayni seyi unutursa da yakalanir. Webde karsilik
 * `<dialog>`in kendisi; orada ayrica isaret aranmiyor, `<dialog>` kullanildigi
 * denetleniyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const walkTsx3 = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__/.test("/" + p)) walkTsx3(p, out); }
      else if (/\.tsx$/.test(e.name)) out.push(p);
    }
    return out;
  };
  const isaretsiz = [];
  for (const f of walkTsx3("mobile/src")) {
    const src = strip(read(f));
    if (!/<Modal\b/.test(src)) continue;
    if (!/accessibilityViewIsModal/.test(src)) isaretsiz.push(f.split("/").pop());
  }
  sameList("modal arka plani", isaretsiz.length ? isaretsiz : ["yok"], ["yok"], "isaretsiz modal", "beklenen");

  /* Webin karsiligi: onay diyalogu `<dialog>` uzerinde mi. */
  const webDialog = /<dialog\b/.test(strip(read("src/components/confirm-dialog.tsx"))) ? "dialog uzerinde" : "elle modal";
  sameList("web onay diyalogu", [webDialog], ["dialog uzerinde"], "bulunan", "beklenen");
}

/* ── 154. secili durum duyuruluyor mu ─────────────────────────────────────
 * Bir dugme "secili" oldugunu yalniz RENKLE soyluyorsa, ekran okuyucu
 * kullanan icin o bilgi YOK demektir. Deneme kagidinin sik cipi tam boyleydi
 * ve HATA IKI PLATFORMDA DA vardi: secilince zemin ve kenarlik degisiyor,
 * duyurulan hicbir sey yok - sinavda ogrencinin kendi cevabini
 * dogrulayamamasi demek. Ikisi birlikte kapatildi (`aria-pressed` /
 * `accessibilityState={{ selected }}`).
 *
 * Olculen: SECILI DURUMA gore stil degistiren her basilabilir, o durumu
 * duyuruyor mu. Kural yuzey tariyor; iki tarafi da ayni anda gezdigi icin
 * "ikisi birden sessiz" hâli de yakalaniyor (§11.228'in dersi).
 *
 * SINIRI YAZILI: tarama etiketin KENDI icine bakiyor. Secili sinifi bir
 * degiskene alinmissa (`const cls = ...; className={cls}`) etikette iz
 * kalmiyor ve o dugme gorunmuyor. Boyle iki yer var (beceri quizi) ve ikisi
 * de elle duzeltildi; kural, izi etiketinde tasiyanlari kapaliyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const walkTsx4 = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const p = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__|\/i18n/.test("/" + p)) walkTsx4(p, out); }
      else if (/\.tsx$/.test(e.name)) out.push(p);
    }
    return out;
  };
  const sessiz = [];
  for (const [kok, etiket, secim, duyuru] of [
    /* Mobilde `accessibilityState` SART: yalniz `accessibilityRole="radio"`
       vermek "bu bir secenek" diyor ama HANGISININ secili oldugunu
       soylemiyor - enjeksiyon tam bunu gosterdi. */
    ["mobile/src", "<PressableScale", /(active|selected|secili|isActive|on)\s*\?/, /accessibilityState/],
    /* `[?:]` yerine YALNIZ `?`: Tailwind'in `active:scale-95` sozde sinifi
       "secili durum" degil, BASILI ANI - iki nokta yuzunden basarim rozeti
       yanlis alarm veriyordu. Secili durumun izi bir kosul: `active ? ...`
       ya da `chip-active`/`option-correct` sinifinin kosullu verilmesi. */
    ["src/components", "<button", /\b(?:active|selected|isActive)\s*\?|chip-active|option-correct/, /aria-pressed|aria-checked|aria-current|aria-selected/],
  ]) {
    for (const f of walkTsx4(kok)) {
      if (f.startsWith("src/app/admin")) continue;
      const src = strip(read(f));
      /* Acilis etiketi, OK ISARETINDE bitmeyen ilk `>`e kadar. `...?>` ile
         kesmek `onClick={() => ...}` icindeki `>`te duruyordu ve etiketin
         geri kalani (className, aria-*) hic goruhlmuyordu: webin seviye cipi
         enjeksiyonu bu yuzden kacmisti. §11.239'daki `[^>]*` hatasinin ayni
         sinifi, bu kez kendi kapimda. */
      const re = new RegExp(etiket + "\\b[\\s\\S]{0,600}?[^=]>", "g");
      for (const m of src.matchAll(re)) {
        if (!secim.test(m[0])) continue;
        if (duyuru.test(m[0])) continue;
        sessiz.push(f.split("/").pop() + ": " + m[0].replace(/\s+/g, " ").slice(0, 40));
      }
    }
  }
  sameList("secili durum duyurusu", sessiz.length ? sessiz : ["yok"], ["yok"], "sessiz secim", "beklenen");
}

/* ── 155. "zaten kullanildi" bilgisi ──────────────────────────────────────
 * Eslestirme maddesinde kullanilan bir sik SOLUYOR (opaklik 0.45) ve bu bir
 * BILGI: "bu siki baska bir maddede kullandin". Opaklik onu yalniz GOZE
 * soyluyordu; ekran okuyucu kullanan ogrenci ayni siki ikinci kez sectigini
 * ancak sonucta goruyordu. Iki platformda da oyleydi.
 *
 * Sik YINE BASILABILIR kaliyor - cevabini tasimak isteyen ogrenci
 * engellenmemeli (iki oynaticinin da kendi notu bunu soyluyor), o yuzden
 * cozum `disabled` degil bir IPUCU.
 *
 * Olculen: solma kuralinin varligi ve ipucunun ayni kosula bagli olmasi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const solma = (yol, ipucu) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return [
      "solma=" + (/opacity: (?:dim \? 0\.45|usedKeys\?\.has\(o\.key\) && value !== o\.key \? 0\.45)/.test(src) ? "var" : "yok"),
      "ipucu=" + (ipucu.test(src) ? "var" : "yok"),
      "hâlâ basilabilir=" + (/disabled=\{dim\}|disabled=\{usedKeys/.test(src) ? "hayir" : "evet"),
    ];
  };
  sameList(
    "eslestirmede kullanilmis sik",
    solma("mobile/src/screens/MockExamScreen.tsx", /accessibilityHint=\{dim \? t\("mockexam\.option_used"\)/),
    solma("src/components/mock-exam-player.tsx", /title=\{usedKeys\?\.has\(o\.key\) && value !== o\.key \? t\("mockexam\.option_used"\)/),
  );
}

/* ── 156. gecici metin ve yukleme duyurusu ────────────────────────────────
 * Iki sey cikti:
 *   - KOCUN CUMLESI dort saniye durup kayboluyor. Ekran okuyucu kullanan biri
 *     onu HIC duymuyordu: ne odakta ne de canli bir bolgedeydi. Web ayni
 *     cumleyi `role="status"` ile duyuruyor (iki dalinda da). Gecici metin,
 *     canli bolgenin tam tanimi.
 *   - DORT KARTIN YUKLEME HÂLI sessizdi (gunluk gorevler, zayif noktalar,
 *     gelisim paneli, neler yapabilirim). §152'nin artigi: kok duzeltme
 *     `SkeletonCard`tan gecen ekranlari kapsiyordu, bu dordu iskeletini KENDI
 *     kuruyor. Webde dordu de `role="status" aria-busy` + etiket tasiyor.
 *
 * Olculen: kocun iki dali ve dort kartin yukleme duyurusu. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const say = (yol, re) => [...strip(read(yol)).matchAll(re)].length;
  sameList(
    "kocun cumlesi duyuruluyor",
    ["canli bolge=" + say("mobile/src/ui/CoachBubble.tsx", /accessibilityLiveRegion="polite"/g)],
    ["canli bolge=" + say("src/components/coach-bubble.tsx", /role="status"/g)],
  );

  const CIFT = [
    ["mobile/src/ui/DailyQuests.tsx", "src/components/quest-card.tsx"],
    ["mobile/src/ui/WeakSpots.tsx", "src/components/weak-spots-card.tsx"],
    ["mobile/src/ui/GrowthPanel.tsx", "src/components/progress-panel.tsx"],
    ["mobile/src/screens/CandoScreen.tsx", "src/components/cando-card.tsx"],
  ];
  /* Duyuru IKI yoldan gelebiliyor ve olcum ikisini de tanimali, yoksa dogru
     olan bir yapiyi kusur sanar: kart iskeletini KENDI kuruyorsa isareti
     kendi tasir (`aria-busy` / `busy: true`), paylasilan kutuyu kullaniyorsa
     (`SkeletonCard`, §152'nin kok duzeltmesi) isaret o kutunun icinde ve
     dosyada gorunen tek sey ETIKET olur. Olcut iki platformda ayni bicimde
     yazili: ya kendi isareti, ya etiketli `SkeletonCard`.

     Ilk surum webde yalniz `aria-busy` ariyordu; "yapabildiklerim" Android
     yerlesimine gecip paylasilan kutuya gecince kapi onu "sessiz" sandi -
     oysa duyuru kutunun icinden geliyordu. */
  const DUYURU = /accessibilityState=\{\{ busy: true \}\}|aria-busy="true"|<SkeletonCard[^>]*label=\{t\(/;
  const mob = CIFT.map(([m]) => m.split("/").pop() + "=" + (DUYURU.test(strip(read(m))) ? "duyuruyor" : "sessiz"));
  const web = CIFT.map(([, w]) => w.split("/").pop() + "=" + (DUYURU.test(strip(read(w))) ? "duyuruyor" : "sessiz"));
  sameList("yukleme duyurusu (dort kart)", mob.map((x) => x.split("=")[1]), web.map((x) => x.split("=")[1]));
}

/* ── 157. eylemin sonucu duyuruluyor mu ───────────────────────────────────
 * "Kaydedildi", "kod tanimlandi", "oturum kapatildi" gibi satirlar bir
 * EYLEMIN CEVABI. Kullanici dugmeye basiyor, odak dugmede kaliyor ve ekran
 * okuyucu hicbir sey soylemiyordu: kaydin olup olmadigi duyulmuyordu.
 * Tarama gosterdi ki bu IKI PLATFORMDA da boyleydi - webde on uc, mobilde on
 * iki dosyada gecici mesaj var ve yalniz biri (webin gorev karti) duyuruyordu.
 *
 * Webde duzeltme KOKTEN yapildi: `AuthNotice` otuz dokuz cagri yerinin ortak
 * kutusu - hata `alert` (sozu keser), basari `status` (sirasini bekler).
 *
 * Olcum, dosyanin herhangi bir yerinde rol aramaz - MESAJIN KENDI cizim
 * yerine bakar: `{msg && <X ...>` etiketinin acilisinda isaret var mi. Ilk
 * surum dosyayi tariyordu ve profil formundan `role="status"` silindiginde
 * komsu `role="alert"` yuzunden yesil kaliyordu (yirminci "komsuyu olcme"
 * vakasi, enjeksiyonla yakalandi). */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  /* Mesajin KENDI cizim blogu: `{` den baslayip DENGELI kapanisina kadar.
     Ilk surum yalnizca acilis etiketine bakiyordu ve iki yerde bos donuyordu:
     isaret ic elemandaysa (balon sarmalayici `Animated.View`/`motion.div`)
     goremiyordu. Ikinci surumun kosul deseni de `{flash > 0 ?` bicimini
     kacirip iki tarafi birden "cizim-yok" sayiyordu - yani hicbir sey
     olcmeden yesil kaliyordu. Denge sayaci ikisini de kapatir ve komsu
     blogu (profil formunda "kaydedildi"nin yanindaki hata satiri) iceri
     almaz. */
  const blok = (src, i) => {
    let derinlik = 0, tirnak = "";
    for (let j = i; j < src.length; j++) {
      const c = src[j];
      if (tirnak) { if (c === tirnak && src[j - 1] !== "\\") tirnak = ""; continue; }
      if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
      if (c === "{") derinlik++;
      else if (c === "}" && --derinlik === 0) return src.slice(i, j + 1);
    }
    return src.slice(i);
  };
  const durum = (yol, degisken, isaret) => {
    const src = strip(read(yol));
    if (!new RegExp("\\[\\s*" + degisken + "\\s*,").test(src)) return "durum-yok";
    const re = new RegExp("\\{\\s*" + degisken + "\\b", "g");
    /* Yalniz KOSULLU CIZIM bloklari: `{msg}` gibi duz yerlestirmeler degil. */
    const bloklar = [...src.matchAll(re)].map((m) => blok(src, m.index)).filter((x) => /<[A-Za-z]/.test(x) && /\?|&&/.test(x));
    if (bloklar.length === 0) return "cizim-yok";
    return bloklar.every((x) => isaret.test(x)) ? "duyuruyor" : "sessiz";
  };
  const MOB = /accessibilityLiveRegion="polite"/;
  /* Webde ya dogrudan rol var ya da ortak kutudan geciyor. */
  const WEB = /role="(status|alert)"|<AuthNotice[\s/>]/;
  const CIFT = [
    /* Iki tarafta da yalniz BASARISIZLIK yaziliyor: kayit dokunusta oldugu
       icin basari ayrica soylenmiyor, kontrolun kendisi yeni durumu gosterir. */
    ["ayarlar", "mobile/src/screens/SettingsScreen.tsx", "msg", "src/components/profile-form.tsx", "saveError"],
    ["promo kodu", "mobile/src/screens/PaywallScreen.tsx", "msg", "src/components/premium-paywall.tsx", "msg"],
    ["bagli hesaplar", "mobile/src/ui/LinkedAccounts.tsx", "msg", "src/components/account/linked-accounts.tsx", "msg"],
    ["oturumlar", "mobile/src/ui/ActiveSessions.tsx", "msg", "src/components/account/active-sessions.tsx", "msg"],
    ["gunluk gorev parlamasi", "mobile/src/ui/DailyQuests.tsx", "flash", "src/components/quest-card.tsx", "flash"],
    ["sosyal ayarlar", "mobile/src/screens/SocialSettingsScreen.tsx", "msg", "src/components/social/social-settings.tsx", "msg"],
    ["arkadas satiri", "mobile/src/social/FriendRows.tsx", "msg", "src/components/social/friend-list.tsx", "msg"],
    ["baskasinin profili", "mobile/src/screens/UserScreen.tsx", "msg", "src/components/social/public-profile.tsx", "msg"],
    ["seviye belirleme", "mobile/src/screens/PlacementScreen.tsx", "saved", "src/components/placement/demo-placement.tsx", "saved"],
    ["meydan okuma parlamasi", "mobile/src/screens/ChallengeScreen.tsx", "flash", "src/components/celebrate.tsx", "shown"],
    ["bildirim izni", "mobile/src/screens/NotificationsScreen.tsx", "msg", "src/components/push-settings.tsx", "error"],
  ];
  const mob = CIFT.map(([ad, m, md]) => ad + "=" + durum(m, md, MOB));
  const web = CIFT.map(([ad, , , w, wd]) => ad + "=" + durum(w, wd, WEB));
  sameList("eylem sonucu duyurusu", mob, web);
  /* Iki taraf da SESSIZ olursa esitlik saglanir ve kapi bos yere yesil kalir
     (§11.228 sinifi). O yuzden her iki liste ayrica BEKLENENE olculuyor:
     "cizim-yok"/"durum-yok" da burada ortaya cikar, yani kapi kendi olcum
     hatasini da bildirir. */
  const beklenen = CIFT.map(([ad]) => ad + "=duyuruyor");
  sameList("mobil sonuc duyurusu", mob, beklenen, "bulunan", "beklenen");
  sameList("web sonuc duyurusu", web, beklenen, "bulunan", "beklenen");

  /* Ortak kutu: hata sozu keser (`alert`), basari sirasini bekler (`status`). */
  const kutu = strip(read("src/components/auth-shell.tsx")).replace(/\s+/g, " ");
  sameList(
    "ortak bildirim kutusu",
    ["rol=" + (/role=\{tone === "error" \? "alert" : "status"\}/.test(kutu) ? "tona gore" : "yok")],
    ["rol=tona gore"],
    "bulunan",
    "beklenen",
  );
}

/* ── 158. geri alinamayan adim once soruluyor mu ──────────────────────────
 * Android'de yikici ya da geri alinamayan her adimin onunde `ConfirmDialog`
 * duruyor: sinavi birakma, yerlestirmeyi birakma, yuruyusu bitirme, turdan
 * cikma, cikis yapma, hesap silme. Webde yedisinden UCU yoktu ve iki tanesi
 * daha kotusuydu: sinav ile yerlestirmede cikis DUGMESI bile yoktu, yani
 * kullanici bitirene kadar kapana kisiliyordu (ayni kapan deneme sinavinda
 * daha once kapatilmisti).
 *
 * Metinler zaten ORTAK SOZLUKTE duruyordu (`exam.quit_title`, `plc.quit_*`,
 * `walkmode.end_walk`) - yani eksik olan ceviri degil, ceviriyi kullanan
 * yuzeydi. Kapi anahtarla olcuyor: iki tarafta da AYNI cumlenin sorulmasi
 * gerekiyor, benzerinin degil. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  /* `ConfirmDialog` blogunun icindeki baslik anahtari: dosyanin baska
     yerindeki ayni dizgi sayilmasin diye acilis etiketinden kapanisina kadar
     olan dilime bakiliyor. */
  const sorulan = (yol) => {
    const src = strip(read(yol));
    const out = [];
    const re = /<ConfirmDialog[\s>]/g;
    for (const m of src.matchAll(re)) {
      const dilim = src.slice(m.index, src.indexOf("/>", m.index) + 2);
      const b = dilim.match(/title=\{t[x]?\("([a-z0-9_.]+)"\)\}/);
      if (b) out.push(b[1]);
    }
    return out.sort();
  };
  const CIFT = [
    ["sinavi birakma", "mobile/src/screens/ExamScreen.tsx", "src/components/exam-player.tsx"],
    ["deneme sinavini birakma", "mobile/src/screens/MockExamScreen.tsx", "src/components/mock-exam-player.tsx"],
    ["yerlestirmeyi birakma", "mobile/src/screens/PlacementScreen.tsx", "src/components/placement/placement-test.tsx"],
    ["yuruyusu bitirme", "mobile/src/screens/WalkModeScreen.tsx", "src/components/walk-player.tsx"],
    ["cikis yapma", "mobile/src/screens/ProfileScreen.tsx", "src/components/profile/profile-view.tsx"],
    ["hesap silme", "mobile/src/screens/DeleteAccountScreen.tsx", "src/components/account-delete-form.tsx"],
  ];
  sameList(
    "geri alinamayan adim soruluyor",
    CIFT.map(([ad, m]) => ad + "=" + (sorulan(m).join("+") || "sormuyor")),
    CIFT.map(([ad, , w]) => ad + "=" + (sorulan(w).join("+") || "sormuyor")),
  );
  /* Iki taraf da sormazsa esitlik saglanirdi (bkz. §157 notu): mutlak olcut. */
  sameList(
    "onay kutusu her iki tarafta",
    CIFT.map(([ad, m, w]) => ad + "=" + (sorulan(m).length && sorulan(w).length ? "var" : "eksik")),
    CIFT.map(([ad]) => ad + "=var"),
    "bulunan",
    "beklenen",
  );

  /* Sinav ve yerlestirmede bir de CIKIS DUGMESI olmali: onay kutusu olup onu
     acan dugme olmazsa kullanici yine kapanda kalir. */
  const acan = (yol, anahtar) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return new RegExp('aria-label=\\{t\\("' + anahtar + '"\\)\\}').test(src) ? "dugme var" : "dugme yok";
  };
  sameList(
    "cikis dugmesi",
    [
      "sinav=" + acan("src/components/exam-player.tsx", "exam.quit_title"),
      "deneme=" + acan("src/components/mock-exam-player.tsx", "mockexam.quit_title"),
      "yerlestirme=" + acan("src/components/placement/placement-test.tsx", "plc.quit_title"),
    ],
    ["sinav=dugme var", "deneme=dugme var", "yerlestirme=dugme var"],
    "bulunan",
    "beklenen",
  );
}

/* ── 159. tam ekran kutlama kapatilabilir mi ──────────────────────────────
 * Rozet kutlamasi ekrani tam kapliyor. Androidde `Modal`: kendi penceresini
 * aciyor, geri tusu kapatiyor (`onRequestClose`) ve TalkBack arkayi
 * gormuyor. Webde ayni ekran duz bir `fixed inset-0` katmaniydi - arkadaki
 * dugmeler sekmeyle geziliyordu, ekran okuyucu arka sayfayi okumaya devam
 * ediyordu ve karti kapatmanin TEK yolu fareyle tiklamakti. Bilesenin kendi
 * dokumanindaki 3. kural ("her zaman kapatilabilir") klavyede tutmuyordu.
 *
 * Olculen dort sey: diyalog rolu, odagin kutlamaya tasinmasi, klavyeyle
 * kapatma ve mobilde geri tusu + arka planin gizlenmesi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const w = strip(read("src/components/achievement-unlock.tsx")).replace(/\s+/g, " ");
  const m = strip(read("mobile/src/ui/AchievementUnlock.tsx")).replace(/\s+/g, " ");
  const web = [
    "rol=" + (/role="dialog"/.test(w) && /aria-modal="true"/.test(w) ? "diyalog" : "yok"),
    "odak=" + (/\.focus\(\)/.test(w) ? "kutlamada" : "arkada"),
    "kapatma=" + (/"Escape"/.test(w) ? "klavye+isaret" : "yalniz isaret"),
  ];
  const mob = [
    "rol=" + (/accessibilityViewIsModal/.test(m) && /<Modal[\s]/.test(m) ? "diyalog" : "yok"),
    /* RN `Modal` odagi kendi penceresine tasiyor: ayri bir cagri gerekmiyor. */
    "odak=" + (/<Modal[\s]/.test(m) ? "kutlamada" : "arkada"),
    "kapatma=" + (/onRequestClose=/.test(m) ? "klavye+isaret" : "yalniz isaret"),
  ];
  sameList("kutlama kapatilabilir", mob, web);
}

/* ── 160. hata ekraninda yerinde tekrar deneme ────────────────────────────
 * Androidde bir yuzey verisini okuyamayinca kart iki sey gosteriyor: ne
 * oldugu ve BIRINCIL bir "tekrar dene". Webde alti sunucu sayfasi ile
 * yuruyus modunun hata kartinda o dugme yoktu - tek yol sekmeden cikip geri
 * gelmek ya da sayfayi elle yenilemekti. Sebep coguldukla gecici (baglanti
 * kesintisi) oldugu icin kullaniciyi ekrandan atiyordu.
 *
 * Olcum EŞLESTIRME degil MUTLAK: her iki platformda da hata karti gosteren
 * her yuzey kendi tekrar denemesini tasimali. Iki taraf birden eksik olsaydi
 * karsilastirma yesil kalirdi (§157 dersi).
 *
 * Her satir cift olcuyor: hata METNI hala orada mi (yuzey duruyor mu) ve
 * tekrar deneme dugmesi var mi. Yalniz dugmeye bakmak, hata dali silinince
 * kapiyi sessizce yesil birakirdi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const durum = (yol, hataIsareti, tekrarIsareti) => {
    const src = strip(read(yol));
    if (!hataIsareti.test(src)) return "hata dali yok";
    return tekrarIsareti.test(src) ? "tekrar var" : "tekrar yok";
  };
  const WEB_TEKRAR = /<RetryButton[\s/>]|t\("common\.try_again"\)/;
  const MOB_TEKRAR = /common\.try_again|friends\.try_again/;
  const WEB = [
    ["kelimeler", "src/app/(app)/words/page.tsx", /words\.couldn_t_load_your_words/],
    ["arkadaslar", "src/app/(app)/friends/page.tsx", /socialw\.friends_load_failed/],
    ["arkadas ayarlari", "src/app/(app)/friends/settings/page.tsx", /socialw\.friends_load_failed/],
    ["profil", "src/app/(app)/profile/page.tsx", /profw\.load_failed/],
    ["ayarlar", "src/app/(app)/profile/settings/page.tsx", /settings/],
    ["baskasinin profili", "src/app/(app)/u/[username]/page.tsx", /profw\.load_failed/],
    ["yuruyus", "src/components/walk-player.tsx", /walk\.error_title/],
  ];
  const MOB = [
    ["kelimeler", "mobile/src/screens/WordsScreen.tsx", /words\.couldn_t_load_your_words/],
    ["arkadaslar", "mobile/src/screens/FriendsScreen.tsx", /ErrorText/],
    ["yuruyus", "mobile/src/screens/WalkModeScreen.tsx", /walk\.error_title/],
    ["basarimlar", "mobile/src/screens/AchievementsScreen.tsx", /common\.try_again/],
    ["yazilar", "mobile/src/screens/WritingsScreen.tsx", /common\.try_again/],
  ];
  sameList(
    "web hata kartinda tekrar deneme",
    WEB.map(([ad, yol, re]) => ad + "=" + durum(yol, re, WEB_TEKRAR)),
    WEB.map(([ad]) => ad + "=tekrar var"),
    "bulunan",
    "beklenen",
  );
  sameList(
    "mobil hata kartinda tekrar deneme",
    MOB.map(([ad, yol, re]) => ad + "=" + durum(yol, re, MOB_TEKRAR)),
    MOB.map(([ad]) => ad + "=tekrar var"),
    "bulunan",
    "beklenen",
  );
}

/* ── 161. tarih kullanicinin biciminde mi ─────────────────────────────────
 * Sunucu tarihleri "2026-09-11" diye saklıyor; kullanici onu oyle okumaz.
 * Uygulamanin her yerinde `toLocaleDateString` var - IKI yer haric: seviye
 * belirleme girisindeki "son test" satiri ve gelisim panelindeki kilometre
 * taslari. Iki yer de IKI PLATFORMDA birden hamdi (§11.228 sinifi), yani
 * karsilastirma degil mutlak olcut yakalar.
 *
 * Gun-yalniz dizgi `T00:00:00` ile okunmali: `new Date("2026-09-11")` UTC
 * gece yarisi demek ve TR'de bir gun GERIYE kayar.
 *
 * Tarama iki desene bakiyor: arayuzde gosterilen `slice(0, 10)` (gun anahtari
 * uretmek icin kullanilani `const` satirinda kaliyor, o sayilmiyor) ve JSX
 * metninde dogrudan basilan tarih alani. */
{
  /* Dilimlenen sey bir TARIH alani olmali: `userId.slice(0, 10)` kimlik
     kisaltmasi ve arayuzde dogru duruyor (ilk surum onu da sayiyordu). */
  const HAM_DILIM = /\b(at|createdAt|updatedAt|lastAt|date|day)\.slice\(0, ?10\)|toISOString\(\)\.slice\(0, ?10\)/;
  const HAM_ALAN = /\{\s*[A-Za-z_$][\w.$]*\.(at|createdAt|updatedAt|lastAt)\s*\}\s*</;
  const gez = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      if (e.isDirectory()) gez(d + "/" + e.name, out);
      else if (e.name.endsWith(".tsx")) out.push(d + "/" + e.name);
    }
    return out;
  };
  const tara = (kok) => {
    const bulunan = [];
    for (const yol of gez(kok)) {
      /* Blok yorumu satir sayisini KORUYARAK siliniyor: bosluga cevirmek
         satirlari kaydirir ve kapi yanlis satiri bildirir (ilk surumde oldu). */
      const src = read(yol)
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
      for (const [i, satir] of src.split("\n").entries()) {
        /* Gun anahtari uretimi gosterim degil: `const today = ...slice(0,10)`. */
        if (HAM_DILIM.test(satir) && !/\b(const|let|var)\b/.test(satir)) bulunan.push(`${yol}:${i + 1}`);
        if (HAM_ALAN.test(satir)) bulunan.push(`${yol}:${i + 1}`);
      }
    }
    return bulunan;
  };
  const web = tara("src");
  const mob = tara("mobile/src");
  sameList("webde ham tarih", web.length ? web : ["yok"], ["yok"], "bulunan", "beklenen");
  sameList("mobilde ham tarih", mob.length ? mob : ["yok"], ["yok"], "bulunan", "beklenen");
}

/* ── 162. emoji ───────────────────────────────────────────────────────────
 * Proje kurali: kodda da arayuzde de emoji yok. Sebep tek bir estetik tercih
 * degil: emoji platformdan platforma BASKA cizilir (Android, iOS ve web ayri
 * setler kullanir), ekran okuyucu onu uzun bir ada cevirip cumlenin ortasina
 * sokar ve dar bir satirda sayinin yanindaki simge etiketin yerini tutmaz.
 *
 * Tarama yonetim panelinde bes tane buldu: kullanici sayisinin yanindaki kisi
 * simgesi (iki yerde), zor kelime satirindaki damla ve "hata yok" satirindaki
 * kutlama (iki yerde). Yerlerine kelime kondu.
 *
 * Isaret karakterleri (onay, yildiz, muzik) emoji DEGIL ve kapsam disinda:
 * tek bir glife sahipler, metin akisinda duruyorlar. */
{
  const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2B00}-\u{2BFF}\u{2728}\u{2764}]/u;
  const gez = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      if (e.isDirectory()) gez(d + "/" + e.name, out);
      else if (/\.(ts|tsx)$/.test(e.name)) out.push(d + "/" + e.name);
    }
    return out;
  };
  const tara = (kok) =>
    gez(kok).flatMap((yol) =>
      read(yol)
        .split("\n")
        .map((satir, i) => (EMOJI.test(satir) ? `${yol}:${i + 1}` : null))
        .filter(Boolean),
    );
  /* Icerik kutuphanesi HARIC: ders metinleri gercek dunyadan aliniyor ve
     icinde emoji gecen bir uygulama yorumu ornek metnin kendisi. */
  const web = tara("src").filter((x) => !x.includes("/skills/content/"));
  sameList("webde emoji", web.length ? web : ["yok"], ["yok"], "bulunan", "beklenen");
  const mob = tara("mobile/src");
  sameList("mobilde emoji", mob.length ? mob : ["yok"], ["yok"], "bulunan", "beklenen");
}

/* ── 163. tekil bicim ─────────────────────────────────────────────────────
 * Sozlukte cogul YOKTU. "{n} friends" bir arkadasta "1 friends" diye
 * cikiyordu, Almancada "1 Freunde" - ve Almanca yalniz ismi degil edati ve
 * fiili de degistiriyor ("noch 1 Tag", "1 Wort droht"). Turkcede sorun yok:
 * sayidan sonra isim tekil kalir, yani hata yalniz iki dilde GORUNUYORDU ve
 * iki platformda birden vardi.
 *
 * Cozum iki cozucude de ayni kural: `n` birse ve `<anahtar>.one` varsa o
 * kullanilir, yoksa temel anahtar. Cogul bicimi olmayan hicbir anahtar
 * etkilenmiyor.
 *
 * Kapi uc sey olcuyor: kuralin IKI cozucude de yazili olmasi, tekil
 * anahtarlarin oksuz olmamasi (temeli yoksa hic kullanilmaz) ve tekil ile
 * cogul bicimin AYNI yer tutuculari tasimasi - `{n}` tekilde dusunce cumle
 * sayiyi hic gostermez. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const KURAL = /_one`\]?\)?/;
  const cozucu = (yol) => (/\$\{key\}\.one/.test(strip(read(yol))) ? "tekili ariyor" : "yok");
  sameList(
    "tekil kurali cozucude",
    ["mobil=" + cozucu("mobile/src/lib/i18n.ts")],
    ["mobil=tekili ariyor"],
    "bulunan",
    "beklenen",
  );
  sameList(
    "tekil kurali cozucude (web)",
    ["web=" + cozucu("src/lib/i18n/dict.ts")],
    ["web=tekili ariyor"],
    "bulunan",
    "beklenen",
  );

  const sozluk = (yol) => {
    const out = new Map();
    for (const m of read(yol).matchAll(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) out.set(m[1], m[2]);
    return out;
  };
  const yer = (x) => [...x.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
  /* DENETIM DIL DIL. Ilk surum uc dili tek haritada birlestiriyordu ve iki
     enjeksiyonu birden kaciriyordu: Ingilizcedeki temel anahtar silinince
     Turkcedeki ayni anahtar oksuzlugu ortuyordu, ve yer tutucu
     karsilastirmasi haritaya EN SON yazan dilin metnine bakiyordu. */
  const denetle = (etiket, yollar) => {
    const bulgu = [];
    for (const y of yollar) {
      const d = sozluk(y);
      const dil = y.replace(/.*\//, "").replace(/\.ts$/, "");
      const oksuz = [...d.keys()].filter((k) => k.endsWith(".one") && !d.has(k.slice(0, -4)));
      const kayik = [...d.keys()]
        .filter((k) => k.endsWith(".one") && d.has(k.slice(0, -4)))
        .filter((k) => yer(d.get(k)) !== yer(d.get(k.slice(0, -4))));
      const sayi = [...d.keys()].filter((k) => k.endsWith(".one")).length;
      bulgu.push(`${dil}: oksuz=${oksuz.length ? oksuz.join("+") : "yok"}, kayma=${kayik.length ? kayik.join("+") : "yok"}, tekil=${sayi > 0 ? "var" : "yok"}`);
    }
    sameList(
      etiket,
      bulgu,
      yollar.map((y) => `${y.replace(/.*\//, "").replace(/\.ts$/, "")}: oksuz=yok, kayma=yok, tekil=var`),
      "bulunan",
      "beklenen",
    );
  };
  denetle("mobil sozlukte tekil", ["mobile/src/i18n/tr.ts", "mobile/src/i18n/en.ts", "mobile/src/i18n/de.ts"]);
  denetle("web sozlukte tekil", ["src/i18n/web/tr.ts", "src/i18n/web/en.ts", "src/i18n/web/de.ts"]);
  void KURAL;
}

/* ── 164. liste satirinda ad tek satirda mi ───────────────────────────────
 * Gorunen ad kirk karaktere kadar olabiliyor. Liste ve siralama satirlarinda
 * ikinci satira dusen bir ad satiri buyutuyor: madalyalar, puanlar ve
 * avatarlar hizadan cikiyor, liste dalgalaniyor. Iki uygulama da bunu her
 * yerde kirpiyordu - GUNLUK TUR SIRALAMASI haric; orada yalniz Android
 * sarmaliyordu, webin ayni satiri `min-w-0 truncate` tasiyor.
 *
 * Olcum, adin cizildigi yerin KENDI etiketine ve bir ustune bakiyor: kirpma
 * cogu zaman sarmalayan kutuda (`<span truncate><Link>{ad}</Link></span>`).
 * Iki sey bilerek disarida: `const ad = ...` gibi ATAMALAR (cizim degil) ve
 * `t("...", { name: ... })` gibi PARAMETRE nesneleri (cumlenin icinde gecen
 * ad, satir degil). Her dosyada en az bir cizim bulunmasi da olculuyor -
 * yoksa deyim degisince kapi hicbir sey olcmeden yesil kalirdi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const etiketSonu = (src, bas) => {
    let derinlik = 0, tirnak = "";
    for (let j = bas; j < src.length; j++) {
      const c = src[j];
      if (tirnak) { if (c === tirnak && src[j - 1] !== "\\") tirnak = ""; continue; }
      if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
      if (c === "{") derinlik++;
      else if (c === "}") derinlik--;
      else if (c === ">" && derinlik === 0) return j;
    }
    return -1;
  };
  /* Cizimin kendi etiketi ve bir ustu. */
  const atalar = (src, i) => {
    const out = [];
    let p = i;
    while (out.length < 2) {
      const bas = src.lastIndexOf("<", p - 1);
      if (bas < 0) break;
      p = bas;
      if (/^<\/|^<[^A-Za-z]/.test(src.slice(bas, bas + 2))) continue;
      const son = etiketSonu(src, bas);
      if (son < 0) continue;
      out.push({ bas, son, tag: src.slice(bas, son + 1) });
    }
    return out;
  };
  const METIN = /^<(Text|span|p|h1|h2|h3|strong|div|li)\b/;
  const durum = (yol, isaret) => {
    const src = strip(read(yol));
    let sayi = 0, kirpilmayan = 0;
    /* Cizim ifadesi DENGELI okunuyor: `{kosul ? <Link>{ad}</Link> : ad}`
       ic ice suslu parantez tasiyor ve duz bir desen onu goremiyordu - webin
       arkadas tablosunda kapi "cizim yok" deyip hicbir sey olcmuyordu. */
    let sonSon = -1;
    for (let i = 0; i < src.length; i++) {
      if (src[i] !== "{" || i < sonSon) continue;
      let d = 0, son = -1;
      for (let j = i; j < src.length && j < i + 400; j++) {
        if (src[j] === "{") d++;
        else if (src[j] === "}" && --d === 0) { son = j; break; }
      }
      if (son < 0) continue;
      const ifade = src.slice(i, son + 1);
      if (!/\bname\b/.test(ifade)) continue;
      if (/\bname\s*:/.test(ifade)) continue; // parametre nesnesi
      /*
        Ifadenin ICINDEKI ic etiketlerin OZNITELIKLERINDE gecen ad sayilmaz:
        `{linked ? (<Link aria-label={name}>...</Link>) : ...}` bir ad cizimi
        DEGIL, ic elemanin kendi ozniteligi. Ilk surum bunu cizim sanip webin
        akis ve istek satirlarini "sarmaliyor" diye bildirdi - oysa ikisi de
        kirpiyordu. Metin konumunda kalan bir `name` yoksa aday duser.
      */
      let metinde = false;
      for (let k = 0; k < ifade.length; ) {
        if (ifade[k] === "<" && /[A-Za-z]/.test(ifade[k + 1] ?? "")) {
          const es = etiketSonu(ifade, k);
          k = es < 0 ? ifade.length : es + 1;
          continue;
        }
        if (/[A-Za-z_$]/.test(ifade[k]) ) {
          let e = k;
          while (e < ifade.length && /[\w$]/.test(ifade[e])) e++;
          if (ifade.slice(k, e) === "name") metinde = true;
          k = e;
          continue;
        }
        k++;
      }
      if (!metinde) continue;
      const satirBas = src.lastIndexOf("\n", i) + 1;
      if (/\b(const|let|var)\s+[\w{}\s,]+=\s*$/.test(src.slice(satirBas, i))) continue; // atama
      const ust = atalar(src, i);
      if (!ust.length || i < ust[0].son) continue; // oznitelik
      if (!METIN.test(ust[0].tag)) continue;
      sonSon = son;
      sayi++;
      if (!ust.some((x) => isaret.test(x.tag))) kirpilmayan++;
    }
    if (sayi === 0) return "cizim yok";
    return kirpilmayan ? "sarmaliyor" : "tek satir";
  };
  const MOB = /numberOfLines=\{1\}/;
  const WEB = /truncate|line-clamp/;
  const CIFT = [
    ["gunluk siralama", "mobile/src/screens/DailyScreen.tsx", "src/components/daily-player.tsx"],
    ["arkadas tablosu", "mobile/src/social/FriendsBoard.tsx", "src/components/social/friends-board.tsx"],
    ["akis", "mobile/src/social/FeedList.tsx", "src/components/social/feed.tsx"],
    ["istekler", "mobile/src/social/Requests.tsx", "src/components/social/requests.tsx"],
  ];
  const mob = CIFT.map(([ad, m]) => ad + "=" + durum(m, MOB));
  const web = CIFT.map(([ad, , w]) => ad + "=" + durum(w, WEB));
  const beklenen = CIFT.map(([ad]) => ad + "=tek satir");
  sameList("liste satirinda ad", mob, web);
  sameList("mobil liste satiri", mob, beklenen, "bulunan", "beklenen");
  sameList("web liste satiri", web, beklenen, "bulunan", "beklenen");

  /* Alt sekme etiketi de tek satirda kalmali: dort sekmede 320 pikselde
     Almanca "Fähigkeiten" kiriliyor ve cubugun yuksekligi degisiyordu.
     Androidde `numberOfLines={1} adjustsFontSizeToFit`, webde `nowrap` +
     `clamp()` punto. */
  const tek = (yol, re) => (re.test(strip(read(yol)).replace(/\s+/g, " ")) ? "tek satir" : "sarmaliyor");
  sameList(
    "sekme etiketi",
    ["mobil=" + tek("mobile/src/navigation/TabBar.tsx", /numberOfLines=\{1\} adjustsFontSizeToFit/)],
    ["mobil=tek satir"],
    "bulunan",
    "beklenen",
  );
  sameList(
    "sekme etiketi (web)",
    ["web=" + tek("src/components/app-shell.tsx", /whitespace-nowrap"[^<]*fontSize: "clamp\(/)],
    ["web=tek satir"],
    "bulunan",
    "beklenen",
  );
}

/* ── 165. sinav kapagi kagidi uretmiyor ───────────────────────────────────
 * `POST {action:"start"}` kagidi uretiyor ve sunucu `exam_start` yaziyor.
 * Android bunu ekran acilir acilmaz atiyordu: kapagi acip vazgecen kullanici
 * "sinava baslamis" sayiliyor, baslama/bitirme hunisi sisiyordu. Web hicbir
 * zaman oyle yapmadi - kapagi ayri uctan (GET) okuyup `start`i ancak dugmeye
 * basilinca atiyor. Sayilar (madde sayisi, sure) sabit, kagit gerekmiyor.
 *
 * Ayni turda ucun eksigi de kapatildi: kapak yalnizca MODUL sinavi icin
 * vardi, seviye sinavinin "kac dakika, hangi bolumler" sorusu cevapsizdi.
 * `?kind=level` iki istemcide de ayni cevabi veriyor.
 *
 * Olculen: (1) iki istemci de kapagi GET ile okuyor, (2) `start` POSTu bir
 * DUGMEYE bagli, mount etkisinde degil. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const mob = strip(read("mobile/src/screens/ExamScreen.tsx"));
  const web = strip(read("src/components/exam-player.tsx"));
  const uc = strip(read("src/app/api/exam/route.ts"));

  /* `start` POSTunun govdesi: hangi fonksiyonun icinde? */
  const govde = (src, ad) => {
    const i = src.indexOf(ad);
    if (i < 0) return "";
    let d = 0, bas = -1;
    for (let j = i; j < src.length; j++) {
      if (src[j] === "{") { if (bas < 0) bas = j; d++; }
      else if (src[j] === "}") { if (--d === 0) return src.slice(bas, j + 1); }
    }
    return "";
  };
  const mobStart = govde(mob, "const startExam = useCallback(");
  const webStart = govde(web, "async function start()");
  /* Iki tarafi da BEKLENENE olcuyoruz: iki taraf birden mount etkisinde
     olsaydi karsilastirma yesil kalirdi (§157 dersi). Dugmeye baglilik iki
     sey birden istiyor - POSTun dogru fonksiyonda olmasi ve o fonksiyonun
     baslatma dugmesine bagli olmasi; yalniz birine bakmak, fonksiyonu
     mount etkisinden cagirinca kapiyi kandirirdi. */
  sameList(
    "sinav baslatma dugmede",
    [
      "mobil=" + (/action: "start"/.test(mobStart) && /onPress=\{startExam\}/.test(mob.replace(/\s+/g, " ")) ? "dugmede" : "mount etkisinde"),
      "web=" + (/action: "start"/.test(webStart) && /onStart=\{\(\) => void start\(\)\}/.test(web.replace(/\s+/g, " ")) ? "dugmede" : "mount etkisinde"),
    ],
    ["mobil=dugmede", "web=dugmede"],
    "bulunan",
    "beklenen",
  );

  /* Kapak iki istemcide de GET ile ve iki sinav turu icin de okunuyor. */
  const kapak = (src) => {
    const d = src.replace(/\s+/g, " ");
    return (/kind=level/.test(d) ? "seviye" : "-") + "+" + (/[?&]module=\$\{/.test(d) ? "modul" : "-");
  };
  sameList(
    "kapak okuma",
    ["mobil=" + kapak(mob), "web=" + kapak(web), "uc=" + (/kind"\) === "level"/.test(uc) ? "seviye kapagi var" : "yok")],
    ["mobil=seviye+modul", "web=seviye+modul", "uc=seviye kapagi var"],
    "bulunan",
    "beklenen",
  );
}

/* ── 166. olcum sozlugunde olu ad ─────────────────────────────────────────
 * `EVENT_NAMES` hem istemcilerin sozlugu hem sunucunun DOGRULAMA listesi.
 * Icinde hicbir yerin yazmadigi bes ad duruyordu ve biri zararsiz degildi:
 * `start_card` yonetim panelinde tur hunisinin ILK BASAMAGI olarak
 * ciziliyordu. Kart `/learn` hub olunca kaldirilmis, olay 2026-09-08'den beri
 * hic akmiyor - yani huninin ilk cubugu kalici olarak sifirdi ve bu, olcumun
 * bozuldugunu degil URUNUN coktugunu dusundurur.
 *
 * Uretim dogruladi (yalniz okuma): start_card son 2026-09-08, daily_play ve
 * plan_start son 2026-09-04, session_round ve speak_self hic yok.
 *
 * Bes ad sozlukten, huni iki yuzeyden (panel ve rapor) kalkti. Kapi artik
 * sozlukteki her adin bir yazani olmasini istiyor - istemcide ya da sunucuda.
 * `scripts/test-events.ts` ayni seyi daha ayrintili yapiyor; buradaki olcum
 * onun MUAFIYET LISTELERININ bos kalmasi: liste dolmaya basladiginda olu ad
 * yeniden birikiyor demektir. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const test = strip(read("scripts/test-events.ts")).replace(/\s+/g, " ");
  const bos = (re) => (re.test(test) ? "bos" : "dolu");
  sameList(
    "olcum sozlugu muafiyetleri",
    [
      "baska yerde yazilan=" + bos(/WRITTEN_ELSEWHERE = new Set<string>\(\[\]\)/),
      "planli ama yazilmayan=" + bos(/PLANNED: Record<string, string> = \{ \}/),
    ],
    ["baska yerde yazilan=bos", "planli ama yazilmayan=bos"],
    "bulunan",
    "beklenen",
  );

  /* Huni artik turun BASLATILMASINDAN basliyor: iki yuzeyde de ilk basamak
     `session_start`. Biri guncellenip oteki unutulursa panel ile rapor ayni
     sayiyi iki turlu anlatir. */
  const panel = strip(read("src/app/admin/dashboard.tsx")).replace(/\s+/g, " ");
  const rapor = strip(read("scripts/report-events.ts")).replace(/\s+/g, " ");
  sameList(
    "tur hunisinin ilk basamagi",
    [
      /* Cubugun ETIKETINE bakiliyor, sayfadaki herhangi bir "Tur başladı"
         yazisina degil: bolumun ipucu metni de ayni sozu iceriyor ve ilk
         surum onu gorup cubuk degisse bile yesil kaliyordu. */
      "panel=" + (/label: "Tur başladı"/.test(panel) && !/startCard/.test(panel) ? "tur basladi" : "baslangic karti"),
      "rapor=" + (/\["session_start", "tur baslatildi"\]|\["session_start", "tur başlatıldı"\]/.test(rapor) && !/start_card/.test(rapor) ? "tur basladi" : "baslangic karti"),
    ],
    ["panel=tur basladi", "rapor=tur basladi"],
    "bulunan",
    "beklenen",
  );

  /* Sesin hangi ekranda dinlendigi iki platformda da yaziliyor. */
  const sesOlayi = (yol, re) => (re.test(strip(read(yol))) ? "yaziyor" : "yazmiyor");
  sameList(
    "ses kullanimi olcumu",
    ["mobil=" + sesOlayi("mobile/src/lib/tts.ts", /trackOnce\("tts_play"/)],
    ["web=" + sesOlayi("src/components/speak-button.tsx", /trackOnce\("tts_play"/)].map((x) => x.replace("web=", "mobil=")),
    "mobil",
    "web",
  );
}

/* ── 167. ayni olay ayni SOZCUKLE yaziliyor mu ────────────────────────────
 * Olay adinin ayni olmasi yetmiyor: `kind` alani da ayni sozlukten gelmeli.
 * Tur olayinda gelmiyordu - web `mixed` / `single:<oyun>` / `extra` yaziyor,
 * Android `session` / `practice` yaziyordu. Ayni kavram iki dille yazilinca
 * panelde tur TURU kirilimi iki platform arasinda karsilastirilamiyor.
 *
 * Daha kotusu Androidin kendi icindeydi: baslangic `practice`/`session`,
 * bitis HER ZAMAN `session` yaziyordu. Yani tek oyunluk bir turun baslangici
 * ile bitisi eslestirilemiyordu - "alistirma turlari tamamlaniyor mu" sorusu
 * Androidde cevapsizdi. Web ayni tuzagi daha once gormus ve turun turunu bir
 * kez hesaplayip saklamis (`sessionKind`); mobil de artik oyle.
 *
 * Olculen: tur olayinin baslangic ve bitiste AYNI degiskeni tasimasi ve iki
 * platformun ayni sozcuk kalibini kullanmasi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const mob = strip(read("mobile/src/screens/GameScreen.tsx")).replace(/\s+/g, " ");
  const web = strip(read("src/components/session-player.tsx")).replace(/\s+/g, " ");
  /* Degisken adi iki tarafta farkli (`onlyGame` / `opts.game`) ve NOKTA
     tasiyabiliyor: ilk surum nokta kabul etmiyordu ve webi "baska sozcuk"
     diye bildirdi - kalibin kendisi aynidir, degisken adi olcumun konusu
     degil. */
  const kalip = /sessionKind\.current = .*\? `single:\$\{[\w.]+\}` : .*\? "extra" : "mixed"/;
  const durum = (src) => [
    "sozcuk kalibi=" + (kalip.test(src) ? "mixed/single/extra" : "baska"),
    "baslangic=" + (/track\("session_start", 0, sessionKind\.current\)/.test(src) ? "saklanan tur" : "yerinde yazilan"),
    "bitis=" + (/track\("session_done", [a-zA-Z.]+, sessionKind\.current\)/.test(src) ? "saklanan tur" : "yerinde yazilan"),
  ];
  const beklenen = ["sozcuk kalibi=mixed/single/extra", "baslangic=saklanan tur", "bitis=saklanan tur"];
  sameList("tur olayinin sozcugu", durum(mob), durum(web));
  sameList("mobil tur olayi", durum(mob), beklenen, "bulunan", "beklenen");
  sameList("web tur olayi", durum(web), beklenen, "bulunan", "beklenen");

  /* Arama olcumu: ayni ad, ayni kind, iki platformda da ekran basina bir kez. */
  const arama = (yol) => (/trackOnce\("search", [^,]+, "words"\)/.test(strip(read(yol))) ? "olculuyor" : "olculmuyor");
  sameList(
    "kelime aramasi olcumu",
    ["mobil=" + arama("mobile/src/screens/WordsScreen.tsx"), "web=" + arama("src/components/word-list.tsx")],
    ["mobil=olculuyor", "web=olculuyor"],
    "bulunan",
    "beklenen",
  );
}

/* ── 168. bildirim izni hunisi iki platformu da sayiyor mu ────────────────
 * Panelin izin hunisi tek bir addan besleniyor: `push_optin`, degerleri
 * 1 verildi / 0 reddedildi / 2 sonra. Web bunu uc yolda da yaziyordu; Android
 * `notif_prime` yaziyordu ve o ad hunide hic okunmuyor - yani Android
 * kullanicilarinin izin verip vermedigi panelde GORUNMUYORDU.
 *
 * Androidin kendi olcumu de yarimdi: `notif_prime` dugmeye BASILDIGI anda
 * yaziliyor ("sordu" demek), reddedilen yol hicbir sey yazmiyordu. Yani
 * "sordu -> verdi/reddetti" adimi Androidde olculemiyordu.
 *
 * `notif_prime` duruyor: secilen hatirlatma saati Androide ozel bir ayrinti
 * ve webde karsiligi yok. Olculen, iki platformun da UC sonucu ayni adla ve
 * ayni degerlerle yazmasi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const degerler = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    const out = new Set();
    for (const m of src.matchAll(/track\("push_optin",\s*([^)]+)\)/g)) {
      const arg = m[1].trim();
      if (/\?/.test(arg)) { out.add("1"); out.add("0"); }
      else out.add(arg);
    }
    return [...out].sort().join("+") || "yok";
  };
  sameList(
    "bildirim izni sonucu",
    ["mobil=" + degerler("mobile/src/screens/NotifPrimeScreen.tsx"), "web=" + degerler("src/components/push-optin.tsx")],
    ["mobil=0+1+2", "web=0+1+2"],
    "bulunan",
    "beklenen",
  );
  /* Panelin okudugu ad degismemeli: huni `push_optin` uzerine kurulu. */
  const panel = strip(read("src/lib/admin.ts")).replace(/\s+/g, " ");
  sameList(
    "panelin izin hunisi",
    ["okudugu ad=" + (/name='push_optin' and value=1/.test(panel) ? "push_optin" : "baska")],
    ["okudugu ad=push_optin"],
    "bulunan",
    "beklenen",
  );
}

/* ── 169. panel olcumu arayuz DILINE bagli olmamali ───────────────────────
 * `panel_open` hangi katli bolumun acildigini yaziyor. Ad iki yoldan
 * cikariliyordu: `data-panel` ozniteligi, YOKSA basligin METNI. Metin tablosu
 * TURKCE yaziliydi ("Nerede zayifim", "Tek oyuna odaklan", "Siradaki") ve
 * hicbir panel `data-panel` tasimiyordu - yani Ingilizce ya da Almanca
 * arayuzde hicbir eslesme olmuyor, olay HIC yazilmiyordu. Olcumun dile bagli
 * olmasi, o dillerde olcumun olmamasi demek.
 *
 * Dort katli bolume ad kondu, metin tablosu kalkti. Kapi iki sey olcuyor:
 * olcum katmaninin yalniz `data-panel` okumasi ve `aria-expanded` tasiyan her
 * dugmenin bir adi olmasi - adsiz bir bolum sessizce olculmez. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const tele = strip(read("src/components/telemetry.tsx")).replace(/\s+/g, " ");
  sameList(
    "panel adi nereden",
    [
      "kaynak=" + (/const key = el\.dataset\.panel;/.test(tele) ? "oznitelik" : "metin"),
      "metin tablosu=" + (/PANEL_TEXT\b/.test(tele) ? "duruyor" : "yok"),
    ],
    ["kaynak=oznitelik", "metin tablosu=yok"],
    "bulunan",
    "beklenen",
  );

  const gezTsx = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const yol = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__|\/admin/.test("/" + yol)) gezTsx(yol, out); }
      else if (e.name.endsWith(".tsx")) out.push(yol);
    }
    return out;
  };
  const etiketSonu = (src, bas) => {
    let derinlik = 0, tirnak = "";
    for (let j = bas; j < src.length; j++) {
      const c = src[j];
      if (tirnak) { if (c === tirnak && src[j - 1] !== "\\") tirnak = ""; continue; }
      if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
      if (c === "{") derinlik++;
      else if (c === "}") derinlik--;
      else if (c === ">" && derinlik === 0) return j;
    }
    return -1;
  };
  const adsiz = [];
  for (const yol of [...gezTsx("src/components"), ...gezTsx("src/app")]) {
    if (yol.endsWith("telemetry.tsx")) continue;
    const src = strip(read(yol));
    for (const m of src.matchAll(/aria-expanded=/g)) {
      const bas = src.lastIndexOf("<", m.index);
      const son = etiketSonu(src, bas);
      if (son < 0) continue;
      const tag = src.slice(bas, son + 1);
      /* `Disclosure` kendi `data-panel`ini iceriden veriyor: cagri yerinde
         `panel` adi yeterli. */
      if (/data-panel/.test(tag) || /panel=\{?["{]/.test(tag)) continue;
      adsiz.push(`${yol}:${src.slice(0, m.index).split("\n").length}`);
    }
  }
  sameList("adsiz katli bolum", adsiz.length ? adsiz : ["yok"], ["yok"], "bulunan", "beklenen");
}

/* ── 170. degerlendirmenin OGRETEN kismi gosteriliyor mu ──────────────────
 * `/api/assess` yalniz puan dondurmuyor: her hatanin gerekcesi (`why_tr`),
 * duzeltilmis cumle, ovgu ve siradaki ipucu da geliyor. Web bunlarin hepsini
 * ortak bir kartla cizyor (`feedback/assessment-card`); Android rol yapma
 * sinavinda yalniz dort rubrik cubugu, sinav yazmasinda ise YALNIZ SAYI
 * gosteriyordu. Yani ogrenci "72" goruyor, neyi yanlis yaptigini
 * ogrenmiyordu - oysa sinavin ogreten kismi tam olarak o.
 *
 * Alanlar sunucudan zaten geliyordu ve istemcide dusuyordu (§11.22 sinifi:
 * "sunucu gonderiyor, istemci tanimiyor").
 *
 * Olculen: iki platformda da ayni DORT bilginin cizilmesi ve kartin ortak
 * bir bilesen olmasi - iki yerde iki ayri kart, er gec ayrisir. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const kart = (yol) => {
    const src = strip(read(yol)).replace(/\s+/g, " ");
    return [
      "rubrik=" + (/assess\.task/.test(src) ? "var" : "yok"),
      "hata gerekcesi=" + (/why_tr/.test(src) ? "var" : "yok"),
      "duzeltilmis=" + (/assess\.corrected/.test(src) ? "var" : "yok"),
      /* CIZIME bakiliyor, dosyada gecmesine degil: alanin TIP tanimi da
         `praise_tr` yaziyor ve ilk surum cizim silinince bile yesil kaldi. */
      "ovgu=" + (/\{\s*result\.praise_tr\s*\?/.test(src) ? "var" : "yok"),
      "ipucu=" + (/\{\s*result\.next_tip_tr\s*\?/.test(src) ? "var" : "yok"),
    ];
  };
  const mob = kart("mobile/src/ui/AssessmentCard.tsx");
  const web = kart("src/components/feedback/assessment-card.tsx");
  sameList("degerlendirme karti", mob, web);
  sameList(
    "degerlendirme karti (mutlak)",
    mob,
    ["rubrik=var", "hata gerekcesi=var", "duzeltilmis=var", "ovgu=var", "ipucu=var"],
    "bulunan",
    "beklenen",
  );

  /* Karti CAGIRAN yuzeyler: iki platformda da ayni uc yer. Rol yapma sinavi
     ve sinav yazmasi iki tarafta da karti kullanmali; kendi cizimini yapan
     bir yuzey karttan kopar. */
  const kullanan = (yol, re) => (re.test(strip(read(yol))) ? "kart" : "kendi cizimi");
  sameList(
    "karti kullanan yuzeyler",
    [
      "rol yapma sinavi=" + kullanan("mobile/src/screens/RoleplayExamScreen.tsx", /<AssessmentCard[\s/>]/),
      "sinav yazmasi=" + kullanan("mobile/src/screens/ExamScreen.tsx", /<AssessmentCard[\s/>]/),
    ],
    [
      "rol yapma sinavi=" + kullanan("src/components/lessons/roleplay-exam.tsx", /<AssessmentCard[\s/>]/),
      "sinav yazmasi=" + kullanan("src/components/exam-player.tsx", /<AssessmentCard[\s/>]/),
    ],
    "mobil",
    "web",
  );
}

/* ── 171. serbest cumle turu ──────────────────────────────────────────────
 * Kelime turunun tek gercek SERBEST URETIM adimi: hedef yok, sik yok, yalniz
 * kelimeler. Mobilde hic yoktu ve tur sunucudan `skipGames=free_sentence`
 * ile SUSTURULUYORDU - yani Android kullanicisi o adimi hic gormuyordu,
 * haftalik sinav da orada sunucunun daha kolay `typing` yedegine dusuyordu
 * (§11.13).
 *
 * Portun uc parcasi var ve ucu birden olculuyor: turun kendisi, kural tabanli
 * YEDEK puanlama (saglayici kapaliyken web puan verir, mobil vermezse ayni
 * turda iki farkli urun olur) ve SRS KALITE ESLEMESI. Sonuncusu en sessiz
 * olani: iki uygulamanin ayni cevaba farkli kalite vermesi, ayni kelimenin
 * telefonda ve tarayicida farkli zamanda tekrara dusmesi demek. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const mob = strip(read("mobile/src/game/rounds.tsx")).replace(/\s+/g, " ");
  const web = strip(read("src/components/games/free-sentence-game.tsx")).replace(/\s+/g, " ");

  /* Kalite esigi tablosu: 90/70/40 -> 5/4/3/2. Iki tarafta da AYNI. */
  const esik = (src) => {
    const m = src.match(/(\w+) >= 90 \? 5 : \1 >= 70 \? 4 : \1 >= 40 \? 3 : 2/);
    return m ? "90/70/40" : "baska";
  };
  const yedekKalite = (src) => (/quality: correct \? 3 : 2/.test(src) ? "en fazla 3" : "baska");
  const durum = (src) => [
    "kalite esikleri=" + esik(src),
    "dogru esigi=" + (/>= 70/.test(src) ? "70" : "baska"),
    "yedek kalitesi=" + yedekKalite(src),
    "yedek puanlama=" + (/fallbackAssessment\(/.test(src) ? "var" : "yok"),
  ];
  const beklenen = ["kalite esikleri=90/70/40", "dogru esigi=70", "yedek kalitesi=en fazla 3", "yedek puanlama=var"];
  sameList("serbest cumle turu", durum(mob), durum(web));
  sameList("mobil serbest cumle", durum(mob), beklenen, "bulunan", "beklenen");
  sameList("web serbest cumle", durum(web), beklenen, "bulunan", "beklenen");

  /* Susturma kalkti mi: iki cagri da `skipGames` tasimamali. */
  const susturma = (yol) => (/skipGames/.test(strip(read(yol))) ? "susturuyor" : "yok");
  sameList(
    "tur susturmasi",
    [
      "oturum=" + susturma("mobile/src/game/session.ts"),
      "haftalik=" + susturma("mobile/src/game/weekly.ts"),
    ],
    ["oturum=yok", "haftalik=yok"],
    "bulunan",
    "beklenen",
  );
}

/* ── 172. ayni hatirlatma iki kez gitmesin ────────────────────────────────
 * Uzak push Androidde BAGLI: cihaz jetonu yaziliyor (`/api/push/device`) ve
 * sunucu uc hatirlatmayi da o jetona gonderiyor (`lib/push` runReminders /
 * runStreakAlerts / runWeeklyReminders). Mobil AYNI ZAMANDA ayni uc
 * hatirlatmayi cihazda YEREL olarak zamanliyordu ve sunucu kullanicinin kendi
 * saatine bakiyor - yani kullanici ayni hatirlatmayi ayni saatte IKI KEZ
 * aliyordu. Ustelik ikisi ayni sey degil: sunucununki kisisellestirilmis
 * (ad, seri, bekleyen kelime, haftalik rakip), yereldeki genel bir cumle.
 *
 * Defterdeki "mobilde uzak push yok" notu BAYAT cikti; uretimde iki Android
 * jetonu kayitli ve FCM anahtarlarinin ucu de dolu.
 *
 * Yerel zamanlama silinmedi, KOSULA baglandi: jeton yoksa (izin yok, Play
 * hizmetleri yok, FCM kapali) hatirlatma yine cihazdan geliyor.
 *
 * Olculen: kosulun TEK KAPIDA olmasi (her hatirlatma turu ondan geciyor),
 * jeton yazilinca yerellerin iptal edilmesi ve sunucunun uc hatirlatmasinin
 * da cihaz jetonlarina gitmesi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const notif = strip(read("mobile/src/lib/notifications.ts")).replace(/\s+/g, " ");
  const cihaz = strip(read("mobile/src/lib/pushDevice.ts")).replace(/\s+/g, " ");
  const sunucu = strip(read("src/lib/push.ts"));

  sameList(
    "yerel hatirlatma kosullu",
    [
      "tek kapi=" + (/async function schedule\([^)]*\)[^{]*\{ if \(hasPushDevice\(\)\) return;/.test(notif) ? "var" : "yok"),
      "jeton yazilinca iptal=" + (/await cancelLocalReminders\(\)/.test(cihaz) ? "var" : "yok"),
      "bayrak yaziliyor=" + (/setPushDevice\(true\)/.test(cihaz) && /setPushDevice\(false\)/.test(cihaz) ? "var" : "yok"),
      /* Bayrak AYRI dosyadan okunuyor mu: jetonu yazan modulden okumak, iki
         modul arasinda dairesel bir ice aktarma kurar (o da buradan
         `cancelLocalReminders` cagiriyor). Kapi bunu ayrica olcuyor cunku
         derleyici daireyi hata saymaz - sessizce yukleme sirasina baglar. */
      "bayrak kaynagi=" + (/from "\.\/pushState"/.test(notif) ? "ayri modul" : "jetonu yazan modul"),
    ],
    ["tek kapi=var", "jeton yazilinca iptal=var", "bayrak yaziliyor=var", "bayrak kaynagi=ayri modul"],
    "bulunan",
    "beklenen",
  );

  /* Sunucunun uc hatirlatmasi da cihaz jetonlarina gidiyor mu: biri unutulsa
     o tur Androidde yalnizca yerel kopyayla gelirdi ve o kopya artik
     kurulmuyor - yani hatirlatma HIC gelmezdi. */
  const govde = (ad) => {
    const i = sunucu.indexOf(`function ${ad}`);
    if (i < 0) return "";
    const j = sunucu.indexOf("\nexport ", i + 10);
    return sunucu.slice(i, j < 0 ? sunucu.length : j);
  };
  /* BIR SEVIYE DEVIR IZLENIYOR. Iki hatirlatma gonderimi ortak yardimciya
     (`deliverRound`) devrediyor ve FCM cagrisi ORADA. Ilk surum yalniz
     fonksiyonun kendi govdesine bakip "seri: fcm yok" dedi - yani komsuyu
     degil, dogru yerin BIR USTUNU olcuyordu. */
  const fcmGonderiyor = (ad) => {
    const g = govde(ad);
    if (/sendFcmRows\(/.test(g)) return "fcm var";
    const devir = g.match(/return (\w+)\(/);
    return devir && /sendFcmRows\(/.test(govde(devir[1])) ? "fcm var" : "fcm yok";
  };
  sameList(
    "sunucu hatirlatmalari cihaza gidiyor",
    ["gunluk", "seri", "haftalik"].map(
      (ad, i) => ad + "=" + fcmGonderiyor(["runReminders", "runStreakAlerts", "runWeeklyReminders"][i]),
    ),
    ["gunluk=fcm var", "seri=fcm var", "haftalik=fcm var"],
    "bulunan",
    "beklenen",
  );
}

/* ── 173. hatirlatma saatinin varsayilani ─────────────────────────────────
 * Uc anahtar (gunluk, seri, haftalik), saat listesi ve tercih ucu iki
 * platformda ayni cikti. Ayrisan tek sey VARSAYILAN SAAT: mobil ekrani kapali
 * anahtarda saati kod icindeki sabitten ciziyordu ("19:00"), sunucu ise
 * kullanicinin kayitli saatini tutuyor (sema varsayilani 12). Hicbir seye
 * dokunmamis bir kullanici anahtari Androidde acinca 19:00, webde 12:00
 * aliyordu - ayni hesap, ayni durum, iki farkli saat.
 *
 * Olculen uc sey: saat listesinin ayni olmasi, iki istemcinin de varsayilani
 * SEMADAN alması, ve ucun kabul araligi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const web = strip(read("src/components/notification-settings.tsx"));
  const mob = strip(read("mobile/src/screens/NotificationsScreen.tsx"));
  const sema = strip(read("src/lib/db/schema.ts"));
  const bildirim = strip(read("mobile/src/lib/notifications.ts"));

  const webSaatler = (web.match(/const HOURS = \[([^\]]*)\]/) ?? [])[1] ?? "";
  const mobSaatler = (mob.match(/const TIMES = \[([^\]]*)\]/) ?? [])[1] ?? "";
  /* Mobil listede saat "HH:MM" biciminde: DAKIKA da bir sayi ve ilk surum
     "09:00"in sifirini ayri bir saat sandi. Iki taraftan da yalniz SAAT
     okunuyor. */
  const saatler = (x) => [...x.matchAll(/(\d{1,2})(?::\d{2})?/g)].map((m) => String(Number(m[1]))).filter((v, i, a) => a.indexOf(v) === i);
  sameList("hatirlatma saati listesi", saatler(mobSaatler), saatler(webSaatler));

  const semaVarsayilan = (sema.match(/reminder_hour"\)\.notNull\(\)\.default\((\d+)\)/) ?? [])[1] ?? "?";
  sameList(
    "varsayilan saat semadan",
    [
      "mobil=" + ((strip(read("mobile/src/lib/profileDefaults.ts")).match(/reminderHour: (\d+)/) ?? [])[1] ?? "yok"),
      "sema=" + semaVarsayilan,
    ],
    ["mobil=" + semaVarsayilan, "sema=" + semaVarsayilan],
    "bulunan",
    "beklenen",
  );

  /* Kapali anahtarda da saat TASINIYOR mu: tasinmazsa ekran yine kendi
     sabitini cizer ve ayrisma geri gelir. */
  sameList(
    "kapali anahtarda saat",
    [
      "tercih tasiyor=" + (/hour: string;/.test(bildirim) ? "var" : "yok"),
      "ekran okuyor=" + (/setDailyTime\(p\.hour\)/.test(mob) ? "var" : "yok"),
    ],
    ["tercih tasiyor=var", "ekran okuyor=var"],
    "bulunan",
    "beklenen",
  );
}

/* ── 174. profilin varsayilanlari tek yerde mi ────────────────────────────
 * Profil daha yuklenmemisken ekranlar bir deger gostermek zorunda ve mobilde
 * o deger ekranin ICINDE yaziliydi. Bir tanesi yanlisti: gunde yeni kelime
 * icin 10, semanin varsayilani ise 15 (`profiles.new_per_day`). Sunucuda 15
 * duran bir hesapta ayar ekrani kisa bir an 10 gosteriyor ve kullanici o anda
 * kaydiriciya dokunursa 10 YAZILIYORDU - ekranin tahmini gercegin yerine
 * geciyordu. Webde bu sorun yok: sayfa sunucuda ciziliyor, gercek degerle
 * geliyor (§11.269'daki hatirlatma saatiyle ayni sinif).
 *
 * Sayilar artik tek yerde (`lib/profileDefaults`) ve kapi onlari SEMAYLA
 * karsilastiriyor: iki yerde yazili bir varsayilan, er gec ayrisir. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"\'`\\])\/\/.*$/gm, "$1");
  const sema = strip(read("src/lib/db/schema.ts")).replace(/\s+/g, " ");
  const mob = strip(read("mobile/src/lib/profileDefaults.ts")).replace(/\s+/g, " ");
  /* Sema satiri: `dailyGoal: integer("daily_goal").notNull().default(20)` */
  const semaVar = new Map(
    [...sema.matchAll(/"(\w+)"\)[^,;]*?\.default\(([^)]*)\)/g)].map((m) => [m[1], m[2].replace(/"/g, "")]),
  );
  const mobVar = new Map(
    [...mob.matchAll(/(\w+): ("?[\w]+"?),/g)].map((m) => [m[1], m[2].replace(/"/g, "")]),
  );
  const CIFT = [
    ["dailyGoal", "daily_goal"],
    ["newPerDay", "new_per_day"],
    ["level", "level"],
    ["course", "course"],
    ["reminderHour", "reminder_hour"],
  ];
  sameList(
    "profil varsayilanlari",
    CIFT.map(([ad]) => ad + "=" + (mobVar.get(ad) ?? "yok")),
    CIFT.map(([ad, sutun]) => ad + "=" + (semaVar.get(sutun) ?? "?")),
    "mobil",
    "sema",
  );

  /* Ekranlar sayiyi KENDI ICINDE yazmamali: tek kaynak varken ikinci bir
     sabit, kaynagin degismesini sessizce yutar. */
  const ayarlar = strip(read("mobile/src/screens/SettingsScreen.tsx")).replace(/\s+/g, " ");
  const kaynaktan = (alan) =>
    new RegExp("me\\?\\." + alan + " \\?\\? PROFILE_DEFAULTS\\." + alan).test(ayarlar) ? "kaynaktan" : "kendi sabiti";
  sameList(
    "ayar ekrani kaynaktan okuyor",
    ["dailyGoal", "newPerDay", "level", "course"].map((a) => a + "=" + kaynaktan(a)),
    ["dailyGoal", "newPerDay", "level", "course"].map((a) => a + "=kaynaktan"),
    "bulunan",
    "beklenen",
  );
}

/* ── 175. pekismis esigi tek yerde mi ─────────────────────────────────────
 * Kirk bir ortak sayisal sabitin hepsi iki platformda ayni cikti. Ayrisma
 * SUNUCUNUN KENDI ICINDE bulundu: "pekismis" esigi (yirmi bir gun) ALTI yerde
 * yaziliydi - iki modulde ayri ayri `const MASTERED_DAYS = 21`, dort yerde de
 * dogrudan `21` (kelimeler sayfasi, kelime ucu iki kez, kelime listesi).
 * Altisi da bugun ayniydi; biri degistirilse otekiler sessizce eski kalir ve
 * ayni kelime bir yerde "pekismis", baska yerde "ogreniliyor" gorunurdu.
 *
 * Esik artik tekrar araligini hesaplayan yerde (`lib/srs`) ve okuyan herkes
 * oradan aliyor. Mobil bu esigi hic hesaplamiyor: `status` alanini sunucudan
 * okuyor, yani platformlar arasi ayrisma ihtimali de yok.
 *
 * Olculen: esigin tanimi tek yerde mi ve arayuzde satir ici bir kopyasi
 * kalmis mi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const gez = (d, out = []) => {
    for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
      const yol = d + "/" + e.name;
      if (e.isDirectory()) { if (!/node_modules|__tests__|\.next/.test("/" + yol)) gez(yol, out); }
      else if (/\.(ts|tsx)$/.test(e.name)) out.push(yol);
    }
    return out;
  };
  const tanim = [];
  const kopya = [];
  for (const yol of gez("src")) {
    const src = strip(read(yol));
    if (/const MASTERED_DAYS\s*=/.test(src)) tanim.push(yol);
    /* Esigin satir ici kopyasi: `intervalDays` ile yirmi birin ayni
       karsilastirmada gectigi her yer. */
    if (/intervalDays\s*[<>]=?\s*21\b|21\s*[<>]=?\s*[\w.]*intervalDays/.test(src)) kopya.push(yol);
  }
  sameList("pekismis esigi tanimi", tanim, ["src/lib/srs.ts"], "bulunan", "beklenen");
  sameList("pekismis esiginin satir ici kopyasi", kopya.length ? kopya : ["yok"], ["yok"], "bulunan", "beklenen");
}

/* ── 176. turun cevabi duyuruluyor mu ─────────────────────────────────────
 * Uygulamanin EN COK KULLANILAN yuzeyi: her kelime turunun sonunda cikan
 * geri bildirim seridi ("Dogru!" ya da "Cevap: …", gerekce, anlam). Webde bu
 * serit `role="status" aria-live="polite"` tasiyor; mobilde HIC tasimiyordu -
 * ekran okuyucu kullanan biri cevabinin dogru mu yanlis mi oldugunu
 * ogrenmiyordu. Renk, ikon ve maskot yalniz GORENE bir sey soyluyor.
 *
 * §157'nin taramasi bunu kacirdi ve sebebi ogretici: orada gecici MESAJ
 * durumlari arandi (`setMsg`, `setFlash`), buradaki bicim ayri - bir
 * `Feedback` nesnesi ve onu cizen ayri bir bilesen. Ayni kusur, baska
 * kaliptaydi.
 *
 * Olculen: iki platformun geri bildirim seridinin de duyurmasi ve serbest
 * cumle turunun sonuc satirinin duyurmasi (o serit FeedbackFooter'dan
 * gecmiyor, kendi blogunu ciziyor). */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  /* Bilesenin govdesi: dosyada baska bir yerdeki duyuru bunu yesil yapmasin. */
  const govde = (yol, imza) => {
    const src = strip(read(yol));
    const i = src.indexOf(imza);
    if (i < 0) return "";
    const j = src.indexOf("\nfunction ", i + imza.length);
    return src.slice(i, j < 0 ? src.length : j).replace(/\s+/g, " ");
  };
  const mobSerit = govde("mobile/src/game/rounds.tsx", "function FeedbackFooter(");
  const webSerit = strip(read("src/components/games/round-sheet.tsx")).replace(/\s+/g, " ");
  const mobSerbest = govde("mobile/src/game/rounds.tsx", "function FreeSentenceRound(");
  const webSerbest = strip(read("src/components/games/free-sentence-game.tsx")).replace(/\s+/g, " ");

  const mob = [
    "geri bildirim seridi=" + (/accessibilityLiveRegion="polite"/.test(mobSerit) ? "duyuruyor" : "sessiz"),
    /* Webde serbest cumle turu sonucu GameShell'in seridinden geciyor; mobilde
       kendi blogu var, o yuzden iki tarafta ayri yerde olculuyor. */
    "serbest cumle sonucu=" + (/accessibilityLiveRegion="polite"/.test(mobSerbest) ? "duyuruyor" : "sessiz"),
  ];
  const web = [
    "geri bildirim seridi=" + (/role="status" aria-live="polite"/.test(webSerit) ? "duyuruyor" : "sessiz"),
    "serbest cumle sonucu=" + (/<GameShell[\s/>]/.test(webSerbest) && /role="status" aria-live="polite"/.test(webSerit) ? "duyuruyor" : "sessiz"),
  ];
  sameList("tur geri bildirimi duyurusu", mob, web);
  const beklenen = ["geri bildirim seridi=duyuruyor", "serbest cumle sonucu=duyuruyor"];
  sameList("mobil tur geri bildirimi", mob, beklenen, "bulunan", "beklenen");
  sameList("web tur geri bildirimi", web, beklenen, "bulunan", "beklenen");
}

/* ── 177. puanin duyurulmasi (durum nesnesi kalibi) ───────────────────────
 * §11.272'nin dersi uygulandi: canli bolge sinifi bu kez GECICI MESAJ degil
 * DURUM NESNESI kalibiyla tarandi (`useState<{...} | null>` ve onun cizim
 * bloklari). Web ve mobil birlikte seksen cizim verdi; cogu yuklenen VERI
 * (liste, profil alani) ve duyurulmamasi dogru - ekran okuyucu onlari zaten
 * sirasi gelince okuyor. Eylemin CEVABI olan uc yuzey kaldi:
 *
 *   - beceri konusma puani (web `speaking-player`)
 *   - monolog puani ve rubrigi (web `monologue-player`)
 *   - mobil beceri kutuphanesinin sonuc blogu (`game/skillLibrary`)
 *
 * Ucu de sessizdi, yani IKI PLATFORM birden (§11.228 sinifi). Kayit bitiyor,
 * odak dugmede kaliyor, ekranda yuzde ve rubrik cikiyor ve ekran okuyucu
 * hicbir sey soylemiyordu.
 *
 * Ayrica etkin oturumlarin iki durum satiri (`stale`, `failed`) webde ortak
 * bildirim kutusundan gecerken mobilde duz metindi - §157 o bilesenin `msg`
 * satirini kapatmisti ama bu ikisi `msg` degil, durum nesnesinin alani. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const govde = (yol, imza, bitis = "\n}") => {
    const src = strip(read(yol));
    const i = src.indexOf(imza);
    if (i < 0) return "";
    const j = src.indexOf(bitis, i + imza.length);
    return src.slice(i, j < 0 ? src.length : j).replace(/\s+/g, " ");
  };
  const CIFT = [
    [
      "beceri konusma puani",
      () => (/<View accessibilityLiveRegion="polite">/.test(govde("mobile/src/game/skillLibrary.tsx", 'phase === "result" ?')) ? "duyuruyor" : "sessiz"),
      () => (/<div role="status" className="mt-4">/.test(strip(read("src/components/skills/speaking-player.tsx"))) ? "duyuruyor" : "sessiz"),
    ],
    [
      "monolog puani",
      () => (/<View accessibilityLiveRegion="polite">/.test(govde("mobile/src/game/skillLibrary.tsx", 'phase === "result" ?')) ? "duyuruyor" : "sessiz"),
      () => (/<motion\.section role="status"/.test(strip(read("src/components/skills/monologue-player.tsx"))) ? "duyuruyor" : "sessiz"),
    ],
    [
      "oturum durum satiri",
      () => {
        const src = strip(read("mobile/src/ui/ActiveSessions.tsx")).replace(/\s+/g, " ");
        const dallar = [...src.matchAll(/\{result\.state === "(stale|failed)" \? \( <Text([^>]*)>/g)];
        return dallar.length === 2 && dallar.every((m) => /accessibilityLiveRegion="polite"/.test(m[2])) ? "duyuruyor" : "sessiz";
      },
      () => {
        const src = strip(read("src/components/account/active-sessions.tsx")).replace(/\s+/g, " ");
        const dallar = [...src.matchAll(/state === "(stale|failed)" \? <AuthNotice/g)];
        return dallar.length === 2 ? "duyuruyor" : "sessiz";
      },
    ],
  ];
  const mob = CIFT.map(([ad, m]) => ad + "=" + m());
  const web = CIFT.map(([ad, , w]) => ad + "=" + w());
  const beklenen = CIFT.map(([ad]) => ad + "=duyuruyor");
  sameList("puan duyurusu", mob, web);
  sameList("mobil puan duyurusu", mob, beklenen, "bulunan", "beklenen");
  sameList("web puan duyurusu", web, beklenen, "bulunan", "beklenen");
}

/* ── 178. YERINDE degisen sonuc (dizge durum makinesi kalibi) ─────────────
 * Sinifin dorduncu kalibi: `phase`/`status` gibi DIZGE durum makineleriyle
 * cizilen sonuc dallari. Iki platformda altmis bes dal bulundu ve cogu
 * SESSIZ - ama o dogru: onlar TAM EKRAN sonuclar, ekran degisince ekran
 * okuyucu yeni ekrani kendiliginden okuyor ve bir de canli bolge eklemek ayni
 * seyi iki kez soyletirdi.
 *
 * Olcut bu yuzden "sonuc dali mi" degil, "ekran mi degisiyor yoksa ACIK bir
 * kutunun/ekranin ICI mi". Iki cift yerinde degisiyordu ve ikisi de iki
 * platformda birden sessizdi:
 *
 *   - bildirim kutusunun sonucu ("Bildirildi" / "Gonderilemedi"): diyalog
 *     acik kaliyor, ici degisiyor,
 *   - sinavin konusma bolumundeki ses hatasi/ipucu satiri: mikrofon
 *     dugmesinin altinda beliriyor, odak dugmede kaliyor.
 *
 * Bu ayrim kapinin kendisinde de yazili duruyor ki bir sonraki tarama
 * "butun sonuc dallari duyurmali" diye yanlis bir kural cikarmasin. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const d = (yol) => strip(read(yol)).replace(/\s+/g, " ");
  const CIFT = [
    [
      "bildirim kutusu sonucu",
      () => (/state === "done" \? \( <View accessibilityLiveRegion="polite"/.test(d("mobile/src/ui/ReportSheet.tsx")) ? "duyuruyor" : "sessiz"),
      () => (/state === "done" \? \( <div role="status"/.test(d("src/components/report-dialog.tsx")) ? "duyuruyor" : "sessiz"),
    ],
    [
      "bildirim kutusu hatasi",
      () => (/state === "error" \? <Text accessibilityLiveRegion="polite"/.test(d("mobile/src/ui/ReportSheet.tsx")) ? "duyuruyor" : "sessiz"),
      () => (/state === "error" \? \( <p role="alert"/.test(d("src/components/report-dialog.tsx")) ? "duyuruyor" : "sessiz"),
    ],
    [
      "sinav ses hatasi",
      () => (/\{tip \? <Text accessibilityLiveRegion="polite"/.test(d("mobile/src/screens/ExamScreen.tsx")) ? "duyuruyor" : "sessiz"),
      () => (/spk === "failed" \? \( <p role="alert"/.test(d("src/components/exam-player.tsx")) ? "duyuruyor" : "sessiz"),
    ],
  ];
  const mob = CIFT.map(([ad, m]) => ad + "=" + m());
  const web = CIFT.map(([ad, , w]) => ad + "=" + w());
  const beklenen = CIFT.map(([ad]) => ad + "=duyuruyor");
  sameList("yerinde degisen sonuc", mob, web);
  sameList("mobil yerinde sonuc", mob, beklenen, "bulunan", "beklenen");
  sameList("web yerinde sonuc", web, beklenen, "bulunan", "beklenen");
}

/* ── 179. diyalogun ADI var mi ────────────────────────────────────────────
 * Modal butunlugunun dort parcasi: arka plan erisilebilirlik agacindan cikar,
 * geri tusu/Esc kapatir, zemine dokunus kapatir ve kutunun BIR ADI olur.
 * Ilk ucu iki platformda da tamamdi; dorduncusu eksikti.
 *
 * Webin uc `<dialog>`u adsizdi: ekran okuyucu "diyalog" diyor ama ne
 * sordugunu soylemiyordu - kutunun konusu ancak icerik okunmaya baslayinca
 * anlasiliyordu. Baslik zaten ekranda duruyor; `aria-labelledby` onu kutunun
 * adi yapiyor. Mobilde ayni eksik iki modalda vardi (mikrofon aciklamasi ve
 * rozet kutlamasi); ConfirmDialog ve ReportSheet baştan beri adliydi.
 *
 * Olculen: her modalin adi ve kapanma yolu. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const d = (yol) => strip(read(yol)).replace(/\s+/g, " ");
  const MOB = [
    ["onay", "mobile/src/ui/ConfirmDialog.tsx"],
    ["bildirim", "mobile/src/ui/ReportSheet.tsx"],
    ["mikrofon", "mobile/src/ui/MicDisclosure.tsx"],
    ["kutlama", "mobile/src/ui/AchievementUnlock.tsx"],
    ["sertifika", "mobile/src/ui/CertificateSheet.tsx"],
  ];
  sameList(
    "mobil modalin adi",
    MOB.map(([ad, yol]) => {
      const src = d(yol);
      /* Ad ya dogrudan etiket ya da baslik metni olarak veriliyor; ikisi de
         ekran okuyucuya kutunun ne oldugunu soyluyor. */
      const adli = /accessibilityLabel=/.test(src) && /accessibilityViewIsModal/.test(src);
      return ad + "=" + (adli ? "adli" : "adsiz");
    }),
    MOB.map(([ad]) => ad + "=adli"),
    "bulunan",
    "beklenen",
  );
  const WEB = [
    ["onay", "src/components/confirm-dialog.tsx"],
    ["bildirim", "src/components/report-dialog.tsx"],
    ["mikrofon", "src/components/mic-disclosure.tsx"],
  ];
  sameList(
    "web diyalogunun adi",
    WEB.map(([ad, yol]) => {
      const src = d(yol);
      const adli = /aria-labelledby=\{basligId\}/.test(src) && /<h2 id=\{basligId\}/.test(src);
      return ad + "=" + (adli ? "adli" : "adsiz");
    }),
    WEB.map(([ad]) => ad + "=adli"),
    "bulunan",
    "beklenen",
  );

  /* Kapanma yolu: mobilde geri tusu, webde Esc. Biri eksikse kutu kapana
     doner - ilk uc parcanin en kolay bozulani bu. */
  sameList(
    "modal kapanma yolu",
    MOB.map(([ad, yol]) => ad + "=" + (/onRequestClose=/.test(d(yol)) ? "var" : "yok")),
    MOB.map(([ad]) => ad + "=var"),
    "mobil",
    "beklenen",
  );
  sameList(
    "diyalog kapanma yolu",
    WEB.map(([ad, yol]) => ad + "=" + (/onCancel=/.test(d(yol)) ? "var" : "yok")),
    WEB.map(([ad]) => ad + "=var"),
    "web",
    "beklenen",
  );
}

/* ── 180. sifre yoneticisi doldurabiliyor mu ──────────────────────────────
 * Etiket taramasi simetrik cikti: iki platform da form alanlarini YER
 * TUTUCUYLA adlandiriyor (tarayici ve TalkBack onu ad olarak okuyor, yani
 * alanlar kullanilabilir). Ayrisan sey otomatik doldurmaydi.
 *
 * Web on uc alanda `autoComplete` veriyor (e-posta, ad, mevcut/yeni parola,
 * tek kullanimlik kod). Mobilde yalnizca dort alan vardi ve ucu SMS koduydu:
 * yani Androidde kayitli parolasi olan kullaniciya oneri HIC cikmiyor, giris
 * elle yaziliyordu.
 *
 * Ipucunun DOGRU olmasi ayrica onemli: kayitta `new-password`, giriste
 * `current-password`. Yanlisini vermek yoneticiye yanlis kaydi onerir - yeni
 * parolayi eskisinin uzerine yazmak gibi. O yuzden kapi yalniz "ipucu var mi"
 * demiyor, HANGI ipucu oldugunu da olcuyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const d = (yol) => strip(read(yol)).replace(/\s+/g, " ");
  const auth = d("mobile/src/screens/AuthScreen.tsx");
  const parola = d("mobile/src/ui/ChangePassword.tsx");
  const sifirla = d("mobile/src/screens/ResetPasswordScreen.tsx");
  const webAuth = d("src/components/auth-form.tsx");
  const webParola = d("src/components/account/change-password.tsx");
  const webSifirla = d("src/components/reset-password-form.tsx");

  const kipeGore = (src) => {
    const m = src.match(/autoComplete=\{mode === "(signin|signup)" \? "([\w-]+)" : "([\w-]+)"\}/);
    if (!m) return false;
    const secim = new Set([m[2], m[3]]);
    return secim.has("current-password") && secim.has("new-password");
  };
  /*
   * SAYIYLA OLCULUYOR, VARLIKLA DEGIL. Ilk surum dosyada ipucunun gecmesine
   * bakiyordu ve iki enjeksiyonu kaciriyordu: giris e-postasinin ipucu
   * silinince SIFIRLAMA ekranindaki e-posta alani, yeni parolanin ipucu
   * silinince "tekrar" alani kapiyi yesil tutuyordu - yani komsu alan olculen
   * alanin yerine geciyordu. Her dosyada KAC alanin ipucu tasidigi sayiliyor.
   */
  const kac = (src, re) => (src.match(re) ?? []).length;
  const CIFT = [
    ["giris e-postasi", () => (kac(auth, /autoComplete="email" textContentType="emailAddress"/g) === 2 ? "var" : "yok"), () => (kac(webAuth, /autoComplete="email"/g) === 1 ? "var" : "yok")],
    ["ad", () => (kac(auth, /autoComplete="name" textContentType="name"/g) === 1 ? "var" : "yok"), () => (kac(webAuth, /autoComplete="name"/g) === 1 ? "var" : "yok")],
    [
      /*
       * OLCUM BICIME DEGIL DAVRANISA BAKIYOR. Ilk surum mobildeki tam ifadeyi
       * ariyordu (`mode === "signup" ? ... : ...`); web ayni karari TERS
       * sirayla yaziyor (`mode === "signin" ? "current-password" : ...`) ve
       * kapi dogru kodu "yok" diye bildirdi. Onemli olan iki ipucunun da
       * gecmesi ve kararin KIPE baglanmasi - sirasi degil (§167'deki degisken
       * adi dersinin aynisi).
       */
      "parola (kipe gore)",
      () => (kipeGore(auth) ? "var" : "yok"),
      () => (kipeGore(webAuth) ? "var" : "yok"),
    ],
    ["mevcut parola", () => (kac(parola, /autoComplete="current-password"/g) === 1 ? "var" : "yok"), () => (kac(webParola, /autoComplete="current-password"/g) === 1 ? "var" : "yok")],
    /* Yeni parola IKI alanda: yeni ve "tekrar". */
    ["yeni parola", () => (kac(parola, /autoComplete="new-password"/g) === 2 ? "var" : "yok"), () => (kac(webParola, /autoComplete="new-password"/g) === 2 ? "var" : "yok")],
    ["sifirlanan parola", () => (kac(sifirla, /autoComplete="new-password"/g) === 2 ? "var" : "yok"), () => (kac(webSifirla, /autoComplete="new-password"/g) === 2 ? "var" : "yok")],
  ];
  const mob = CIFT.map(([ad, m]) => ad + "=" + m());
  const web = CIFT.map(([ad, , w]) => ad + "=" + w());
  const beklenen = CIFT.map(([ad]) => ad + "=var");
  sameList("otomatik doldurma ipucu", mob, web);
  sameList("mobil otomatik doldurma", mob, beklenen, "bulunan", "beklenen");
  sameList("web otomatik doldurma", web, beklenen, "bulunan", "beklenen");
}

/* ── 181. klavye davranisi ────────────────────────────────────────────────
 * Web telefonda da kullaniliyor (PWA) ve orada ayni alanlar BASKA
 * davraniyordu: ad ilk harfi buyutmuyor, e-posta ve arama kutusu ilk harfi
 * BUYUTUYOR ve duzeltmeye acikti. Android bastan beri ada `words`, e-postaya
 * ve aramaya `none` diyor.
 *
 * Kucuk ama her girisi etkiliyor: "Ahmet" yerine "ahmet" yazilmasi ya da
 * e-postanin "Ali@..." diye baslamasi kullaniciyi geri donup duzeltmeye
 * zorluyor. Sayisal alanlar ve promosyon kodu zaten esti (`inputMode`,
 * `autoCapitalize="characters"`).
 *
 * Olculen: dort alanin buyuk harf davranisi iki platformda ayni mi. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  /* Alanin KENDI etiketine bakiliyor: dosyada baska bir alanin ozniteligi
     olculen alanin yerine gecmesin (§180'in dersi). */
  const etiket = (yol, deger) => {
    const src = strip(read(yol));
    const i = src.indexOf(`value={${deger}}`);
    if (i < 0) return "";
    const bas = src.lastIndexOf("<", i);
    let derinlik = 0, tirnak = "";
    for (let j = bas; j < src.length; j++) {
      const c = src[j];
      if (tirnak) { if (c === tirnak && src[j - 1] !== "\\") tirnak = ""; continue; }
      if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
      if (c === "{") derinlik++;
      else if (c === "}") derinlik--;
      else if (c === ">" && derinlik === 0) return src.slice(bas, j + 1).replace(/\s+/g, " ");
    }
    return "";
  };
  const buyuk = (tag) => (tag.match(/autoCapitalize="(\w+)"/) ?? [])[1] ?? "yok";
  const CIFT = [
    ["giris adi", ["src/components/auth-form.tsx", "name"], ["mobile/src/screens/AuthScreen.tsx", "name"]],
    ["giris e-postasi", ["src/components/auth-form.tsx", "email"], ["mobile/src/screens/AuthScreen.tsx", "email"]],
    ["profil adi", ["src/components/profile-form.tsx", "displayName"], ["mobile/src/screens/SettingsScreen.tsx", "name"]],
    ["kelime aramasi", ["src/components/word-list.tsx", "term"], ["mobile/src/screens/WordsScreen.tsx", "q"]],
  ];
  sameList(
    "klavye buyuk harf davranisi",
    CIFT.map(([ad, , [my, md]]) => ad + "=" + buyuk(etiket(my, md))),
    CIFT.map(([ad, [wy, wd]]) => ad + "=" + buyuk(etiket(wy, wd))),
  );
  /* Iki taraf birden "yok" olursa esitlik saglanir: mutlak olcut de var. */
  sameList(
    "buyuk harf davranisi yazili",
    CIFT.map(([ad, [wy, wd], [my, md]]) => ad + "=" + (buyuk(etiket(wy, wd)) !== "yok" && buyuk(etiket(my, md)) !== "yok" ? "yazili" : "eksik")),
    CIFT.map(([ad]) => ad + "=yazili"),
    "bulunan",
    "beklenen",
  );
}

/* ── 182. girdi sinirlari tek kaynaktan mi ────────────────────────────────
 * Uzunluk sinirlari karsilastirildi: gorunen ad (40), iki adimli kod (ortak
 * sabit), kullanici adi (20) ve biyografi (140) - dordu de iki platformda
 * AYNI sayiydi. Kusur sayida degil, sayinin KAC YERDE yazili oldugundaydi:
 * kullanici adi uc yerde (sunucunun deseni + iki istemci), biyografi de uc
 * yerde. Ucu bugun ayniydi; biri degisse otekiler sessizce eski kalir ve
 * kullanici YAZABILDIGI bir adin reddedildigini gorurdu - istemci onu kabul
 * ediyor, sunucu geri ceviriyor.
 *
 * Sunucu tarafinda desen artik sinirlardan KURULUYOR (`USERNAME_MIN/MAX`),
 * web onlari dogrudan ice aktariyor, mobil kendi tek kaynagindan okuyor ve
 * bu kapi ikisini sunucuyla karsilastiriyor. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const sunucu = strip(read("src/lib/social/username.ts")).replace(/\s+/g, " ");
  const mob = strip(read("mobile/src/lib/profileDefaults.ts")).replace(/\s+/g, " ");
  const websos = strip(read("src/components/social/social-settings.tsx")).replace(/\s+/g, " ");
  const mobsos = strip(read("mobile/src/screens/SocialSettingsScreen.tsx")).replace(/\s+/g, " ");

  const al = (src, re) => (src.match(re) ?? [])[1] ?? "yok";
  const sunucuAd = al(sunucu, /USERNAME_MAX = (\d+)/);
  const sunucuBio = al(sunucu, /BIO_MAX = (\d+)/);
  sameList(
    "sosyal sinirlar",
    [
      "kullanici adi=" + al(mob, /usernameMax: (\d+)/),
      "biyografi=" + al(mob, /bioMax: (\d+)/),
      /* Bekleme suresi de sinir: SURESI cumlenin icinde yazili degil, sayidan
         besleniyor (bkz. 185), o yuzden iki tarafta ayni olmak zorunda. */
      "bekleme=" + al(mob, /changeCooldownDays: (\d+)/),
    ],
    [
      "kullanici adi=" + sunucuAd,
      "biyografi=" + sunucuBio,
      "bekleme=" + al(sunucu, /USERNAME_CHANGE_COOLDOWN_DAYS = (\d+)/),
    ],
    "mobil",
    "sunucu",
  );

  /* Ekranlar sayiyi KENDI ICINDE yazmamali. */
  sameList(
    "sosyal sinirlar kaynaktan",
    [
      "mobil ad=" + (/maxLength=\{SOCIAL_LIMITS\.usernameMax\}/.test(mobsos) ? "kaynaktan" : "kendi sabiti"),
      "mobil biyografi=" + (/slice\(0, SOCIAL_LIMITS\.bioMax\)/.test(mobsos) ? "kaynaktan" : "kendi sabiti"),
      "web ad=" + (/maxLength=\{USERNAME_MAX\}/.test(websos) ? "kaynaktan" : "kendi sabiti"),
      "web biyografi=" + (/slice\(0, BIO_MAX\)/.test(websos) ? "kaynaktan" : "kendi sabiti"),
    ],
    ["mobil ad=kaynaktan", "mobil biyografi=kaynaktan", "web ad=kaynaktan", "web biyografi=kaynaktan"],
    "bulunan",
    "beklenen",
  );

  /* Desen de sinirlardan kuruluyor mu: desende ayri bir sayi kalirsa sinir
     degistiginde kural degismez ve ayrisma sunucunun ICINDE olur. */
  sameList(
    "kullanici adi deseni",
    ["kaynak=" + (/new RegExp\(`\^\[a-z0-9_\]\{\$\{USERNAME_MIN\},\$\{USERNAME_MAX\}\}\$`\)/.test(sunucu) ? "sinirlardan" : "elle yazili")],
    ["kaynak=sinirlardan"],
    "bulunan",
    "beklenen",
  );
}

/* ── 183. profil sinirlari tek kaynaktan mi ───────────────────────────────
 * Uc sinir (gunluk hedef 5-120, gunde yeni kelime 0-40, gorunen ad 40 karakter)
 * BES yerde yaziliydi: ucun kirpmasi, webin iki kaydiricisi ve ad kutusu,
 * mobilin ayni uc kutusu. Besi de ayniydi; biri degisse otekiler sessizce eski
 * kalir ve kullanici SECEBILDIGI bir degerin kaydedilmedigini gorurdu - arayuz
 * kabul ediyor, uc kirpiyor.
 *
 * Sinirlar artik `lib/profile-limits`ta; mobil ayni sayilari kendi tek
 * kaynaginda tutuyor (ayri paket, ice aktaramiyor) ve bu kapi ikisini
 * karsilastiriyor. Ayrica yuzeylerin ve ucun sabiti OKUDUGU denetleniyor:
 * sayiyi geri yazan bir yuzey, kaynagin degismesini sessizce yutar.
 *
 * §50, §144 ve §145 bu olcume tasindi; ucu de sayilari karsilastiriyordu. */
{
  const strip = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
  const d = (yol) => strip(read(yol)).replace(/\s+/g, " ");
  const kaynak = d("src/lib/profile-limits.ts");
  const mobKaynak = d("mobile/src/lib/profileDefaults.ts");
  const al = (src, re) => (src.match(re) ?? [])[1] ?? "yok";
  const uc = (src) => [
    "gunluk hedef=" + al(src, /dailyGoal: \{ min: (\d+), max: \d+ \}/) + "-" + al(src, /dailyGoal: \{ min: \d+, max: (\d+) \}/),
    "yeni kelime=" + al(src, /newPerDay: \{ min: (\d+), max: \d+ \}/) + "-" + al(src, /newPerDay: \{ min: \d+, max: (\d+) \}/),
    "ad=" + al(src, /displayNameMax: (\d+)/),
  ];
  sameList("profil sinirlari", uc(mobKaynak), uc(kaynak), "mobil", "sunucu");

  /* Ucun kendisi de sabiti okumali: kirpma sayiyi geri yazarsa kaynak
     degistiginde uc eski sinirla kirpar ve arayuzle ayrisir. */
  const route = d("src/app/api/profile/route.ts");
  sameList(
    "uc sinirlari kaynaktan",
    [
      "ad=" + (/name\.slice\(0, PROFILE_LIMITS\.displayNameMax\)/.test(route) ? "kaynaktan" : "kendi sabiti"),
      "gunluk hedef=" + (/clampInt\(body\.dailyGoal, PROFILE_LIMITS\.dailyGoal\.min, PROFILE_LIMITS\.dailyGoal\.max\)/.test(route) ? "kaynaktan" : "kendi sabiti"),
      "yeni kelime=" + (/clampInt\(body\.newPerDay, PROFILE_LIMITS\.newPerDay\.min, PROFILE_LIMITS\.newPerDay\.max\)/.test(route) ? "kaynaktan" : "kendi sabiti"),
    ],
    ["ad=kaynaktan", "gunluk hedef=kaynaktan", "yeni kelime=kaynaktan"],
    "bulunan",
    "beklenen",
  );

  /* Bes yuzey: iki kaydirici cifti ve iki ad kutusu (her platformda ikişer). */
  const webForm = d("src/components/profile-form.tsx");
  const webAuth = d("src/components/auth-form.tsx");
  const mobAyar = d("mobile/src/screens/SettingsScreen.tsx");
  const mobAuth = d("mobile/src/screens/AuthScreen.tsx");
  sameList(
    "yuzeyler sinirlari kaynaktan",
    [
      "web hedef=" + (/min=\{PROFILE_LIMITS\.dailyGoal\.min\} max=\{PROFILE_LIMITS\.dailyGoal\.max\}/.test(webForm) ? "kaynaktan" : "kendi sabiti"),
      "web yeni=" + (/min=\{PROFILE_LIMITS\.newPerDay\.min\} max=\{PROFILE_LIMITS\.newPerDay\.max\}/.test(webForm) ? "kaynaktan" : "kendi sabiti"),
      "web ad=" + (/maxLength=\{PROFILE_LIMITS\.displayNameMax\}/.test(webForm) && /maxLength=\{PROFILE_LIMITS\.displayNameMax\}/.test(webAuth) ? "kaynaktan" : "kendi sabiti"),
      "mobil hedef=" + (/min=\{PROFILE_LIMITS\.dailyGoal\.min\} max=\{PROFILE_LIMITS\.dailyGoal\.max\}/.test(mobAyar) ? "kaynaktan" : "kendi sabiti"),
      "mobil yeni=" + (/min=\{PROFILE_LIMITS\.newPerDay\.min\} max=\{PROFILE_LIMITS\.newPerDay\.max\}/.test(mobAyar) ? "kaynaktan" : "kendi sabiti"),
      "mobil ad=" + (/maxLength=\{PROFILE_LIMITS\.displayNameMax\}/.test(mobAyar) && /maxLength=\{PROFILE_LIMITS\.displayNameMax\}/.test(mobAuth) ? "kaynaktan" : "kendi sabiti"),
    ],
    ["web hedef=kaynaktan", "web yeni=kaynaktan", "web ad=kaynaktan", "mobil hedef=kaynaktan", "mobil yeni=kaynaktan", "mobil ad=kaynaktan"],
    "bulunan",
    "beklenen",
  );
}

/* ── 184-192. politika sayisi CUMLENIN ICINDE yaziliydi ───────────────────
 * §183'un sorusunun ("sayi kac yerde yazili") sozluge uzanan hali. Iki kural
 * kodda TEK sabitti ama kullaniciya SOYLEYEN cumle sayiyi duz metin olarak
 * tasiyordu:
 *
 *   184 - parola alt siniri (`MIN_PASSWORD_LENGTH`): "en az 10 karakter" ve
 *         "Parola en az 10 karakter olmali" - uc dil, iki platform, on iki
 *         dizge.
 *   185 - kullanici adi bekleme suresi (`USERNAME_CHANGE_COOLDOWN_DAYS`):
 *         "14 gunde bir degisir" ve hata cumlesi - yine on iki dizge.
 *   186 - guvenilen cihazin omru (`TWO_FACTOR_TRUST_DAYS`): "bu cihazda 30
 *         gun kod sorulmaz". Bu sayi HICBIR yerde yazili degildi - cumle
 *         better-auth'un `trustDeviceMaxAge` VARSAYILANINA guveniyordu.
 *         Kutuphane varsayilani degisse ekran eski sureyi soylemeye devam
 *         ederdi. Artik eklentiye acikca geciliyor.
 *   187 - rol yapma sinavinin gecme esigi (`EXAM_PASS_SCORE`): iki platformun
 *         ekrani `overall >= 60` diye elle karsilastiriyordu ve esigi soyleyen
 *         cumle ("esigin altinda (60)") alti dizgede ayrica yaziliydi.
 *   188 - pekisme araligi (`MASTERED_DAYS`): "21+ gun aralik".
 *   189 - yeterlilik penceresi (`DECAY_DAYS`): "son 30 gun".
 *   190 - seviye sinavi gecme esikleri (`PASS_TOTAL`/`PASS_SECTION`):
 *         "toplam %70 ve her bolum %50" - tek cumlede IKI sayi.
 *   191 - haftalik sinavin pekismis esigi (`MIN_MASTERED`): "30'a ulasinca".
 *   192 - hiz turunun suresi (`BOSS_SECONDS`): "modulun kelimeleri, 60 sn".
 *   193 - davet odulu (`referral.rewardDays`): "sana 7 gun Premium veriyoruz".
 *         Bu, otekilerden BIR ADIM DAHA KOTU bir durumdu: sayi bir kod sabiti
 *         degil, PANELDEN ayarlanan bir deger. Iki ekran da 7'yi elle
 *         yaziyordu, yani odul panelden degistirildigi anda sunucu yeni
 *         sureyi verir, iki ekran eski sayiyi soylemeye devam ederdi - kod
 *         hic degismeden bozulan bir soz. Sayi artik `/api/premium/status`
 *         yanitindan geliyor.
 *
 * 188-192'de sayilarin dordu `server-only` modullerde ya da yalniz sunucuda
 * duruyordu; MIN_MASTERED ve BOSS_SECONDS istemciye acilan ayri dosyalara
 * tasindi, mobil kopyalar `lib/learningRules` icinde toplandi. Adlar web ile
 * birebir ayni, o yuzden ayrisma "ortak sayisal sabitler" kapisina dusuyor.
 *
 * Sabit degisseydi kural degisir, cumle ESKI SAYIYI soylemeye devam ederdi:
 * form "en az 10 karakter" der, sunucu on ikiyi isterdi; kullanici neyi
 * yanlis yaptigini ogrenemezdi. Karsilastirmali bir kapinin bunu gormesi
 * imkansizdi, cunku iki platformun cumlesi de AYNI yanlisi soyleyecekti
 * (§11.228 sinifi) - olcut mutlak olmak zorunda.
 *
 * Cumleler artik `{n}` tasiyor ve her cagiran sabiti geciriyor. Kapi iki sey
 * soruyor: alti sozluk dosyasinda rakam kalmamis mi, ve her cagiran sabiti
 * geciriyor mu. */
{
  const SOZLUKLER = [
    "mobile/src/i18n/tr.ts", "mobile/src/i18n/en.ts", "mobile/src/i18n/de.ts",
    "src/i18n/base/tr.ts", "src/i18n/base/en.ts", "src/i18n/base/de.ts",
  ];
  /* Yorumlar ayiklanir (satir sayisi korunarak): gerekce metnindeki sabit adi
     "geciriyor" sayilmasin. */
  const sil = (x) => x.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/\/\/[^\n]*/g, "");
  const kisa = (y) => y.replace(/.*\/(\w+)\/(\w+)\.ts$/, "$1-$2");

  const POLITIKALAR = [
    {
      ad: "parola uzunlugu",
      yer: ["{n}"],
      anahtarlar: ["auth.password_min_hint", "autherror.password_min_length"],
      gecis: /n:\s*MIN_PASSWORD_LENGTH/,
      cagiranlar: [
        "src/components/auth-form.tsx", "src/components/reset-password-form.tsx",
        "src/components/account/change-password.tsx", "src/lib/auth/errors.ts",
        "mobile/src/screens/AuthScreen.tsx", "mobile/src/screens/ResetPasswordScreen.tsx",
        "mobile/src/ui/ChangePassword.tsx", "mobile/src/lib/authErrors.ts",
      ],
    },
    {
      ad: "kullanici adi beklemesi",
      yer: ["{n}"],
      anahtarlar: ["social.err_username_cooldown", "socialsettings.username_cooldown"],
      gecis: /n:\s*(USERNAME_CHANGE_COOLDOWN_DAYS|SOCIAL_LIMITS\.changeCooldownDays)/,
      cagiranlar: [
        "src/lib/social/client.ts", "src/components/social/social-settings.tsx",
        "mobile/src/api/social.ts", "mobile/src/screens/SocialSettingsScreen.tsx",
      ],
    },
    {
      ad: "guvenilen cihaz omru",
      yer: ["{n}"],
      anahtarlar: ["twofa.trust_note"],
      gecis: /n:\s*TWO_FACTOR_TRUST_DAYS/,
      cagiranlar: ["src/components/two-factor-form.tsx", "mobile/src/screens/AuthScreen.tsx"],
    },
    {
      ad: "rol yapma gecme esigi",
      yer: ["{n}"],
      anahtarlar: ["rpexam.below_threshold"],
      gecis: /n:\s*EXAM_PASS_SCORE/,
      cagiranlar: ["src/components/lessons/roleplay-exam.tsx", "mobile/src/screens/RoleplayExamScreen.tsx"],
    },
    {
      ad: "pekisme araligi",
      yer: ["{days}"],
      anahtarlar: ["progress.bar_note"],
      gecis: /days:\s*MASTERED_DAYS/,
      cagiranlar: ["src/components/progress-view.tsx", "mobile/src/screens/ProgressScreen.tsx"],
    },
    {
      ad: "yeterlilik penceresi",
      yer: ["{days}"],
      anahtarlar: ["progp.window"],
      gecis: /days:\s*DECAY_DAYS/,
      cagiranlar: ["src/components/progress-panel.tsx", "mobile/src/ui/GrowthPanel.tsx"],
    },
    {
      ad: "sinav gecme esikleri",
      yer: ["{total}", "{section}"],
      anahtarlar: ["exam.rules_body"],
      gecis: /total:\s*PASS_TOTAL, section:\s*PASS_SECTION/,
      cagiranlar: ["src/components/exam-player.tsx", "mobile/src/screens/ExamScreen.tsx"],
    },
    {
      ad: "haftalik pekismis esigi",
      yer: ["{min}"],
      anahtarlar: ["weekly.pitch_short"],
      gecis: /min:\s*MIN_MASTERED/,
      cagiranlar: ["src/components/weekly-player.tsx", "mobile/src/screens/WeeklyScreen.tsx"],
    },
    {
      ad: "hiz turu suresi",
      yer: ["{n}"],
      anahtarlar: ["exam.speed_round_link"],
      gecis: /n:\s*BOSS_SECONDS/,
      cagiranlar: ["src/components/exam-player.tsx", "mobile/src/screens/ExamScreen.tsx"],
    },
    {
      ad: "davet odulu",
      yer: ["{days}"],
      anahtarlar: ["referral.explain"],
      /* Sabit degil SUNUCU YANITI: panelden ayarlanan deger istemciye
         `referral.rewardDays` olarak iniyor. */
      gecis: /days:\s*referral\.rewardDays/,
      cagiranlar: ["src/components/premium-paywall.tsx", "mobile/src/screens/PaywallScreen.tsx"],
    },
  ];

  for (const pol of POLITIKALAR) {
    const bulgu = [];
    const beklenen = [];
    for (const y of SOZLUKLER) {
      const src = read(y);
      for (const a of pol.anahtarlar) {
        const m = src.match(new RegExp('"' + a.replace(/\./g, "\\.") + '":\\s*"([^"]*)"'));
        const deger = m ? m[1] : null;
        const ad = kisa(y) + " " + a.split(".")[0];
        /* HANGI yer tutucu arandigi politikadan geliyor. Ilk yazimda hep
           `{n}` araniyordu ve iki cumle YANLIS yerden gecti: `progp.window`
           ile `weekly.pitch_short` zaten baska bir sey icin `{n}` tasiyordu,
           kapi onu gorup "tamam" dedi - olcum komsuyu olcuyordu. */
        const eksik = pol.yer.filter((y) => !deger?.includes(y));
        bulgu.push(ad + "=" + (!deger ? "ANAHTAR YOK" : eksik.length ? "YER TUTUCU YOK " + eksik.join("+") : /\d/.test(deger) ? "RAKAM VAR" : "tamam"));
        beklenen.push(ad + "=tamam");
      }
    }
    sameList(pol.ad + " cumlede rakamsiz", bulgu, beklenen, "bulunan", "beklenen");

    const gecen = pol.cagiranlar.map((y) => {
      const src = sil(read(y));
      const kullanir = pol.anahtarlar.some((a) => src.includes(a));
      return y.replace(/.*\//, "") + "=" + (!kullanir ? "ANAHTAR YOK" : pol.gecis.test(src) ? "gecirir" : "GECIRMEZ");
    });
    sameList(
      pol.ad + " cagiranlari",
      gecen,
      pol.cagiranlar.map((y) => y.replace(/.*\//, "") + "=gecirir"),
      "bulunan",
      "beklenen",
    );
  }

  /* 186'nin ikinci yarisi: cumle dogru sayiyi sorsa bile SUNUCU sayiyi
     eklentiye vermiyorsa soz yine kutuphane varsayilanina bagli kalir. */
  const sunucu = sil(read("src/lib/auth/server.ts"));
  sameList(
    "guvenilen cihaz omru eklentiye geciliyor",
    ["trustDeviceMaxAge=" + (/trustDeviceMaxAge: TWO_FACTOR_TRUST_DAYS \* 24 \* 60 \* 60/.test(sunucu) ? "sabitten" : "VARSAYILANA BIRAKILMIS")],
    ["trustDeviceMaxAge=sabitten"],
    "bulunan",
    "beklenen",
  );

  /* -- 230. PAYLASIM: ayni tur, ayni metin, ayni yerlerde dugme ---------
   *
   * Ayni ozellik iki uygulamada iki ayri seydi:
   *
   *  - Web tur sonucunu Wordle'in ogrettigi DESENLE paylasiyor (kareler +
   *    seviye basligi + istatistik satiri, gunun turunda ayrica "ayni
   *    sorular herkese ayni" cagrisi). Android tek cumlelik duz bir metin
   *    gonderiyordu.
   *  - Metnin sozluk anahtarlari webde `sharew.*` diye YALNIZ webde
   *    duruyordu, yani Android'in o metni uretmesi mumkun degildi.
   *  - GUNUN TURUNDA Android'de paylasim dugmesi HIC YOKTU. Oysa gunun turu
   *    paylasilmaya en deger tur: sorular o seviyedeki HERKESE ayni geliyor,
   *    yani karsi taraf kiyaslayabilecegi bir sey goruyor.
   *
   * Anahtarlar `share.*` olarak ortak kumeye tasindi (`i18n-pull` base'i
   * mobilden uretiyor, yani tasima mobile yazilip cekildi) ve metin uretimi
   * `mobile/src/lib/share.ts`e kopyalandi.
   *
   * YURUYUS KIPI bilincli olarak duz cumlede kaldi: orada tur basina
   * dogru/yanlis dizisi tutulmuyor (ne webde ne Androidde), yani cizilecek
   * desen yok. Ayrim platformlar arasinda degil, TURUN TURU arasinda - ve
   * iki tarafta ayni. */
  {
    const mw = sil(read("src/components/share-result.tsx"));
    const mm = sil(read("mobile/src/lib/share.ts"));
    /* Desen uretimi: ayni sabitler, ayni karakterler, ayni "son kareler"
       kurali. Sayilar iki yerde yazili oldugu icin ikisi de okunuyor. */
    const desen = (src) => [
      "MAX_ROWS=" + ((src.match(/MAX_ROWS = (\d+)/) ?? [])[1] ?? "?"),
      "PER_ROW=" + ((src.match(/PER_ROW = (\d+)/) ?? [])[1] ?? "?"),
      "kare=" + (/\(ok\) => \(ok \? "■" : "□"\)/.test(src) ? "dolu/bos" : "?"),
      "son kareler=" + (/slice\(-MAX_ROWS \* PER_ROW\)/.test(src) ? "evet" : "HAYIR"),
    ];
    sameList("paylasim deseni", desen(mm), desen(mw), "mobil", "web");

    /* Metnin govdesi: basliklar, istatistik satiri ve gunun turu dali. */
    const govde = (src) => [
      "baslik=" + (/share\.head_daily[\s\S]{0,120}share\.head\b/.test(src) ? "gunluk+normal" : "EKSIK"),
      "gunluk istatistik=" + (/share\.points[\s\S]{0,120}share\.of_questions/.test(src) ? "puan+soru" : "EKSIK"),
      "normal istatistik=" + (/share\.n_words[\s\S]{0,120}share\.pct_correct/.test(src) ? "kelime+yuzde" : "EKSIK"),
      "seri=" + (/share\.streak_short[\s\S]{0,80}social\.days_streak/.test(src) ? "iki dal" : "EKSIK"),
      "gunluk cagri=" + (/share\.daily_cta/.test(src) ? "var" : "YOK"),
    ];
    sameList("paylasim metni govdesi", govde(mm), govde(mw), "mobil", "web");

    /* Anahtarlar ORTAK kumede mi: `sharew.` hicbir yerde kalmamali.
       (base<->mobil birebirligini `i18n:check` ayrica zorluyor.) */
    const WEB_SOZLUK = ["src/i18n/web/tr.ts", "src/i18n/web/en.ts", "src/i18n/web/de.ts"];
    const MOB_SOZLUK = ["mobile/src/i18n/tr.ts", "mobile/src/i18n/en.ts", "mobile/src/i18n/de.ts"];
    const ANAHTARLAR = ["share.head", "share.head_daily", "share.points", "share.of_questions", "share.n_words", "share.pct_correct", "share.streak_short", "share.daily_cta"];
    sameList(
      "paylasim anahtarlari ortak kumede",
      [
        "webde kalan sharew=" + WEB_SOZLUK.reduce((n, y) => n + (read(y).match(/"sharew\./g) ?? []).length, 0),
        "mobil sozlukte eksik=" + ANAHTARLAR.filter((k) => !MOB_SOZLUK.every((y) => read(y).includes('"' + k + '"'))).length,
      ],
      ["webde kalan sharew=0", "mobil sozlukte eksik=0"],
      "bulunan",
      "beklenen",
    );

    /* Dugmenin bulundugu turlar: oturum, gunun turu (desenli) ve yuruyus
       (duz cumle). Ucu de iki platformda. */
    sameList(
      "paylasim dugmesi hangi turlarda",
      [
        "oturum=" + (/shareRoundResult\(\{ marks: answers\.current/.test(sil(read("mobile/src/screens/GameScreen.tsx"))) ? "desenli" : "YOK"),
        "gunun turu=" + (/shareRoundResult\(\{[\s\S]{0,400}kind: "daily"/.test(sil(read("mobile/src/screens/DailyScreen.tsx"))) ? "desenli" : "YOK"),
        "yuruyus=" + (/shareResult\(tally\.correct, tally\.total\)/.test(sil(read("mobile/src/screens/WalkModeScreen.tsx"))) ? "duz" : "YOK"),
      ],
      [
        "oturum=" + (/<ShareResult\b/.test(sil(read("src/components/session-player.tsx"))) ? "desenli" : "YOK"),
        "gunun turu=" + (/kind="daily"/.test(sil(read("src/components/daily-player.tsx"))) ? "desenli" : "YOK"),
        "yuruyus=" + (/shareText\(resultText\(/.test(sil(read("src/components/walk-player.tsx"))) ? "duz" : "YOK"),
      ],
      "mobil",
      "web",
    );
  }

  /* -- 229. durum dallarinin TASARIMI: maskot, kutlama, cikis yolu -------
   *
   * §227 bekleme, §228 hata dalini olctu; bu tur ayni dallarin TASARIMINA
   * bakti ve uc kusur cikti:
   *
   *  1. MASKOT. Android'in yuruyus ekrani DORT yerde maskot ciziyor
   *     (giris, duraklama, bitis, baslangic) - webde HIC yoktu. Meydan
   *     okumanin bos dali, rol yapma sinavinin ve seviye sinavinin hata
   *     dallari da Android'de maskotlu, webde ciplak metindi. Ayni kip bir
   *     platformda karakterli, otekinde metin blogu olarak duruyordu.
   *  2. YURUYUSUN BITIS EKRANI. Android konfeti + maskot + sonuc + DEVAM +
   *     PAYLAS sunuyor; web yalniz "bitir" diyordu - yeni bir tura devam
   *     etmek icin kipten cikip yeniden girmek gerekiyordu ve sonucu
   *     paylasmanin hicbir yolu yoktu. Kutlama esigi de Android'den: %60.
   *  3. BOS HALIN CIKIS YOLU. "Yapabildiklerim" bos dali iki platformda da
   *     "konusma ve alistirmalari bitirdikce" diyor ama gidilecek yeri
   *     GOSTERMIYORDU; ev kalibi zaten bu (`WritingsScreen` bos hali yazma
   *     alistirmalarina goturuyor). Ikisi de eksik oldugu icin
   *     karsilastirma geciyordu - olcut mutlak alindi.
   *
   * Olcum DAL GOVDESI uzerinden: capadan baslayip JSX yiginini bosalana
   * kadar yuruyup dalin KENDI agacini aliyor. Boylece komsu dalda duran bir
   * maskot "var" sayilmiyor ve dalin uzunlugu onemsiz. */
  {
    const acilisSonu = (blok) => {
      let derinlik = 0, tirnak = null;
      for (let i = 0; i < blok.length; i++) {
        const c = blok[i];
        if (tirnak) { if (c === tirnak && blok[i - 1] !== "\\") tirnak = null; continue; }
        if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
        if (c === "{") derinlik++;
        else if (c === "}") derinlik--;
        else if (c === ">" && derinlik === 0) return i;
      }
      return -1;
    };
    /** Capadan sonraki ilk JSX agacinin govdesi (yigin bosalinca biter). */
    const dalGovdesi = (src, capa) => {
      const bas = src.indexOf(capa);
      if (bas < 0) return null;
      let k = bas, derinlik = 0, basladi = false, ilk = -1;
      while (k < src.length) {
        const j = src.indexOf("<", k);
        if (j < 0) break;
        if (src[j + 1] === "/") {
          const kapanis = src.indexOf(">", j);
          if (kapanis < 0) break;
          derinlik--;
          k = kapanis + 1;
          if (basladi && derinlik === 0) return src.slice(ilk, k);
          continue;
        }
        if (src[j + 1] === ">") { if (!basladi) { basladi = true; ilk = j; } derinlik++; k = j + 2; continue; }
        if (!/[A-Za-z]/.test(src[j + 1] ?? "")) { k = j + 1; continue; }
        const son = acilisSonu(src.slice(j));
        if (son < 0) break;
        const etiket = src.slice(j, j + son + 1);
        if (!basladi) { basladi = true; ilk = j; }
        if (!/\/\s*>$/.test(etiket)) derinlik++;
        k = j + son + 1;
        if (basladi && derinlik === 0) return src.slice(ilk, k);
      }
      return null;
    };
    /* TANIK ZORUNLU. Ilk yazim capayi `src.indexOf` ile ariyordu ve sinav
       oynaticisinda `phase === "error"` ILK olarak sayacin muafiyet
       listesinde geciyor (`... || phase === "error") return;`) - govde
       bambaska bir agactan doluyor ve kapi dogru koda "YOK" diyordu. Artik
       her cift bir TANIK tasiyor: dalin govdesinde mutlaka bulunmasi gereken
       bir metin. Tanik yoksa olcum "DAL YOK" diyor, sessizce gecmiyor. */
    const maskot = (yol, capa, tanik) => {
      const g = dalGovdesi(sil(read(yol)), capa);
      if (g === null || !g.includes(tanik)) return "DAL YOK";
      return /<Mascot\b/.test(g) ? "maskot" : "YOK";
    };

    const CIFTLER = [
      ["meydan bos", "mobile/src/screens/ChallengeScreen.tsx", 'phase === "empty"', 'challenge.none_title', "src/components/challenge-player.tsx", 'status === "empty"', 'challenge.none_title'],
      ["rol hata", "mobile/src/screens/RoleplayExamScreen.tsx", 'if (phase === "error")', 'rpexam.service_down', "src/components/lessons/roleplay-exam.tsx", 'if (phase === "error")', 'rpexam.service_down'],
      ["rol puanlama", "mobile/src/screens/RoleplayExamScreen.tsx", 'if (phase === "scoring")', 'item.mono_scoring', "src/components/lessons/roleplay-exam.tsx", 'if (phase === "scoring")', 'item.mono_scoring'],
      ["sinav hata", "mobile/src/screens/ExamScreen.tsx", "if (err) {", '{err}', "src/components/exam-player.tsx", 'if (phase === "error") {', 'exam.load_or_save_failed'],
      ["yuruyus giris", "mobile/src/screens/WalkModeScreen.tsx", 'phase === "intro" ? (', 'walkmode.listen_and_say_it', "src/components/walk-player.tsx", 'if (status === "ready" || status === "paused")', 'walk.intro_1'],
      ["yuruyus bitis", "mobile/src/screens/WalkModeScreen.tsx", 'phase === "done" ? (', 'walkmode.correct', "src/components/walk-player.tsx", 'if (status === "done")', 'walk.done_sub'],
    ];
    sameList(
      "durum dallarinda maskot",
      CIFTLER.map(([ad, my, mc, mt]) => ad + "=" + maskot(my, mc, mt)),
      CIFTLER.map(([ad, , , , wy, wc, wt]) => ad + "=" + maskot(wy, wc, wt)),
      "mobil",
      "web",
    );

    /* Yuruyusun bitis ekrani: kutlama, devam ve paylasim iki tarafta da. */
    const wm = sil(read("mobile/src/screens/WalkModeScreen.tsx"));
    const ww = sil(read("src/components/walk-player.tsx"));
    sameList(
      "yuruyus bitis ekrani",
      [
        "kutlama=" + (/<Celebrate show=\{tally\.total > 0 && donePct >= 60\}/.test(wm) ? "var" : "YOK"),
        "esik=" + (/donePct >= 60/.test(wm) ? "60" : "?"),
        "devam=" + (/onPress=\{newTour\}/.test(wm) ? "var" : "YOK"),
        "paylasim=" + (/shareResult\(tally\.correct, tally\.total\)/.test(wm) ? "var" : "YOK"),
      ],
      [
        "kutlama=" + (/<Confetti fire=\{tally\.total > 0 && donePct >= 60 \? 1 : 0\}/.test(ww) ? "var" : "YOK"),
        "esik=" + (/donePct >= 60/.test(ww) ? "60" : "?"),
        /* Dugmenin HEM ISI hem ETIKETI olculuyor. Ilk yazim "ya biri ya
           oteki" diyordu ve etiketi "bitir"e cevirmek kapiyi yesil biraktı -
           oysa iki dugmenin ikisi de "bitir" yazan bir ekran tam olarak
           duzeltilen kusur. */
        "devam=" + (/onClick=\{\(\) => \{ setStatus\("loading"\); void load\(\); \}\}[\s\S]{0,160}t\("common\.continue"\)/.test(ww) ? "var" : "YOK"),
        "paylasim=" + (/shareText\(resultText\(lang, tally\.correct, tally\.total\), "result"\)/.test(ww) ? "var" : "YOK"),
      ],
      "mobil",
      "web",
    );

    /* Bos halin cikis yolu: "yapabildiklerim" iki platformda da Patika'ya. */
    const cm = sil(read("mobile/src/screens/CandoScreen.tsx"));
    const cw = sil(read("src/components/cando-card.tsx"));
    sameList(
      "yapabildiklerim bos halinin cikis yolu",
      [
        "mobil eylem=" + (/action=\{t\("nav\.path"\)\}/.test(cm) ? "Patika" : "YOK"),
        "mobil hedef=" + (/navigate\("Tabs", \{ screen: "Path" \}\)/.test(cm) ? "Path sekmesi" : "YOK"),
        "web eylem=" + (/t\("nav\.path"\)/.test(cw) ? "Patika" : "YOK"),
        "web hedef=" + (/href="\/immersion"/.test(cw) ? "/immersion" : "YOK"),
      ],
      ["mobil eylem=Patika", "mobil hedef=Path sekmesi", "web eylem=Patika", "web hedef=/immersion"],
      "bulunan",
      "beklenen",
    );
  }

  /* -- 228. HATA dali: duyuruluyor mu, sebebi dogru mu, tekrar yolu var mi --
   *
   * §227 beklemeyi duyurulur kildi; bu tur ayni yuzeylerin HATA dalini
   * olcuyor ve uc ayri kusur cikti:
   *
   *  1. Yirmi bir hata dalinin HICBIRI kendini duyurmuyordu. §222 sosyal
   *     eylemlerin hatasini `ErrorText` ile duyurulur kilmisti; bunlar
   *     ekranin TAMAMINI kaplayan hata dallari ve ayri kume.
   *  2. "Yapabildiklerim" iki platformda da ISTEK HATASI ile BOS LISTEYI ayni
   *     kartla karsiliyordu: agi kopan kullaniciya "giris yapip dersleri
   *     bitir" yaziyordu - yanlis sebep - ve tekrar deneme yolu yoktu.
   *     Ikisi de yanlis oldugu icin karsilastirma geciyordu (§11.228 sinifi),
   *     olcut mutlak alindi.
   *  3. Iki web yuzeyinde YERINDE TEKRAR DENEME yoktu ve Android'de vardi:
   *     meydan okuma (`ChallengeScreen` birincil dugme olarak deniyor) ve
   *     seviye sinavi (`ExamScreen`, gerekcesi orada yazili: haftanin kagidi
   *     gecici bir ag kesintisiyle harcanabiliyordu). Sinavda tekrar yalniz
   *     kagit ALINAMADIGINDA sunuluyor - cevaplar cevrimdisi kaydedildiyse
   *     bastan acmak o kaydi cope atar.
   *
   * Duyuru olcumu §227'nin ATA YURUYUSU ile: isaretten geri gidip saran
   * `return`i bulup JSX etiket yiginini tutuyor, isareti ATALARDA ariyor. */
  {
    const acilisSonu = (blok) => {
      let derinlik = 0, tirnak = null;
      for (let i = 0; i < blok.length; i++) {
        const c = blok[i];
        if (tirnak) { if (c === tirnak && blok[i - 1] !== "\\") tirnak = null; continue; }
        if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
        if (c === "{") derinlik++;
        else if (c === "}") derinlik--;
        else if (c === ">" && derinlik === 0) return i;
      }
      return -1;
    };
    /* `capa`: yurumenin BASLADIGI dugum. Varsayilan `return` cogu dalda
       dogru, ama bir hata dali JSX UCLUSUNUN icinde de olabilir
       (`phase === "error" ? (`) - orada en yakin `return` KOMSU bir okun
       govdesine dusuyor ve yigin bambaska bir agactan doluyor. O uc yuzeyde
       capa dalin kendi kosulu; yani sinir yine bir dugum, tahmin degil. */
    const atalar = (src, isaret, capa) => {
      const hedef = src.indexOf(isaret);
      if (hedef < 0) return null;
      const bas = capa ? src.lastIndexOf(capa, hedef) : src.lastIndexOf("return", hedef);
      if (bas < 0) return null;
      const yigin = [];
      let k = bas;
      while (k < hedef) {
        const j = src.indexOf("<", k);
        if (j < 0 || j >= hedef) break;
        if (src[j + 1] === "/") {
          const kapanis = src.indexOf(">", j);
          if (kapanis < 0) break;
          yigin.pop();
          k = kapanis + 1;
          continue;
        }
        /* PARCA (`<>`): acilisi yigina girmezse kapanisi (`</>`) yanlis bir
           ogeyi dusurur - sinav oynaticisinin `section`u boyle kayboluyordu
           ve kapi "SESSIZ" diyordu. Parca da bir kare olarak sayiliyor. */
        if (src[j + 1] === ">") { yigin.push("<>"); k = j + 2; continue; }
        if (!/[A-Za-z]/.test(src[j + 1] ?? "")) { k = j + 1; continue; }
        const son = acilisSonu(src.slice(j));
        if (son < 0) break;
        const etiket = src.slice(j, j + son + 1);
        if (!/\/\s*>$/.test(etiket)) yigin.push(etiket);
        k = j + son + 1;
      }
      return yigin;
    };
    /* Isaretin KENDISI de sayilir: WritingsScreen'de kap bos hali de tasiyor,
       o yuzden canli bolge ortak kaba degil hata METNINE konuldu. */
    const duyuruyor = (src, isaret, desen, capa) => {
      const yigin = atalar(src, isaret, capa);
      if (yigin === null) return "ISARET YOK";
      const hedef = src.indexOf(isaret);
      const kendi = src.lastIndexOf("<", hedef);
      const kendiEtiket = kendi >= 0 ? src.slice(kendi, kendi + (acilisSonu(src.slice(kendi)) + 1 || 0)) : "";
      return yigin.some((e) => desen.test(e)) || desen.test(kendiEtiket) ? "duyuruyor" : "SESSIZ";
    };
    const WEB = /role="alert"/;
    const MOB = /accessibilityLiveRegion="assertive"/;

    const DALLAR = [
      ["src/components/boss-player.tsx", 't("exam.could_not_load")'],
      ["src/components/challenge-player.tsx", 't("challenge.load_failed")'],
      ["src/components/daily-player.tsx", 't("daily.couldn_t_load_daily_round")'],
      ["src/components/weekly-player.tsx", 't("weekly.load_failed")'],
      ["src/components/placement/placement-test.tsx", 't("placement.couldn_t_load_test")'],
      ["src/components/walk-player.tsx", 't("walk.error_title")'],
      ["src/components/lessons/roleplay-exam.tsx", 't("rpexam.service_down")'],
      ["src/components/session-player.tsx", "{content.title}"],
      ["src/components/exam-player.tsx", 't("exam.load_or_save_failed")'],
      ["src/components/cando-card.tsx", 't("cando.couldn_t_load")'],
      ["mobile/src/screens/BossScreen.tsx", '"boss.not_ready" : "exam.could_not_load"'],
      ["mobile/src/screens/ChallengeScreen.tsx", 't("challenge.load_failed")'],
      ["mobile/src/screens/DailyScreen.tsx", 't("daily.couldn_t_load_daily_round")'],
      ["mobile/src/screens/WeeklyScreen.tsx", 't("weekly.couldn_t_load_weekly_quiz")'],
      ["mobile/src/screens/GameScreen.tsx", 't("game.couldn_t_load_round")'],
      ["mobile/src/screens/WalkModeScreen.tsx", 'tx("walk.error_title")'],
      ["mobile/src/screens/WordsScreen.tsx", 't("words.couldn_t_load_your_words")', 'phase === "error" ? ('],
      ["mobile/src/screens/WritingsScreen.tsx", 't("writings.couldn_t_load_writings")', 'phase === "error" ? ('],
      ["mobile/src/screens/RoleplayExamScreen.tsx", 'tx("rpexam.service_down")'],
      ["mobile/src/screens/ExamScreen.tsx", "{err}"],
      ["mobile/src/screens/CandoScreen.tsx", 't("cando.couldn_t_load")', 'phase === "error" ? ('],
    ];
    const kisa = (y) => y.split("/").pop().replace(/\.tsx$/, "");
    sameList(
      "hata dali duyuruluyor",
      DALLAR.map(([y, isaret, capa]) => kisa(y) + "=" + duyuruyor(sil(read(y)), isaret, y.startsWith("mobile/") ? MOB : WEB, capa)),
      DALLAR.map(([y]) => kisa(y) + "=duyuruyor"),
      "bulunan",
      "beklenen",
    );

    /* Yapabildiklerim: hata metni BOS metinden ayri, ve tekrar yolu var. */
    const cw = sil(read("src/components/cando-card.tsx"));
    const cm = sil(read("mobile/src/screens/CandoScreen.tsx"));
    sameList(
      "yapabildiklerim hata dali bos daldan ayri",
      [
        "web hata metni=" + (/cando\.couldn_t_load/.test(cw) ? "kendi" : "BOS METNI"),
        "web bos metni=" + (/cando\.sign_in_and_finish_lessons_and/.test(cw) ? "var" : "YOK"),
        "web tekrar=" + (/\bsetAttempt\b/.test(cw) ? "var" : "YOK"),
        "mobil hata metni=" + (/cando\.couldn_t_load/.test(cm) ? "kendi" : "BOS METNI"),
        "mobil bos metni=" + (/cando\.sign_in_and_finish_lessons_and/.test(cm) ? "var" : "YOK"),
        "mobil tekrar=" + (/\bsetAttempt\b/.test(cm) ? "var" : "YOK"),
      ],
      ["web hata metni=kendi", "web bos metni=var", "web tekrar=var", "mobil hata metni=kendi", "mobil bos metni=var", "mobil tekrar=var"],
      "bulunan",
      "beklenen",
    );

    /* Yerinde tekrar deneme: Android'de olan iki yuzey webde de olmali. */
    const chw = sil(read("src/components/challenge-player.tsx"));
    const exw = sil(read("src/components/exam-player.tsx"));
    const exm = sil(read("mobile/src/screens/ExamScreen.tsx"));
    const chm = sil(read("mobile/src/screens/ChallengeScreen.tsx"));
    sameList(
      "hata dalinda yerinde tekrar deneme",
      [
        "meydan mobil=" + (/onPress=\{load\}/.test(chm) ? "var" : "YOK"),
        "meydan web=" + (/setAttempt\(\(n\) => n \+ 1\)/.test(chw) ? "var" : "YOK"),
        "sinav mobil=" + (/setAttempt\(\(n\) => n \+ 1\)/.test(exm) ? "var" : "YOK"),
        "sinav web=" + (/onClick=\{\(\) => void start\(\)\}/.test(exw) ? "var" : "YOK"),
        /* Cevrimdisi kayit varken tekrar SUNULMUYOR - kaydi cope atardi. */
        "sinav web cevrimdisi ayrimi=" + (/offline \? null : \(/.test(exw) ? "var" : "YOK"),
      ],
      ["meydan mobil=var", "meydan web=var", "sinav mobil=var", "sinav web=var", "sinav web cevrimdisi ayrimi=var"],
      "bulunan",
      "beklenen",
    );
  }

  /* -- 227. ekrani kaplayan BEKLEME kendini duyuruyor mu ---------------
   *
   * "Hazirlaniyor", "puanlaniyor", "seviyen hesaplaniyor": bu dallar ekranin
   * TAMAMINI kaplayip bir cumle yaziyor ve on ucunun HICBIRI canli bolge
   * degildi. Ekran okuyucu kullanan biri "basla"ya basip hicbir sey
   * duymuyordu - ekranin dondugunu mu, hazirlandigini mi bilemiyor.
   *
   * Ucunde `aria-busy` vardi ve YETMIYOR: `aria-busy` "bu bolge
   * guncelleniyor" der, MONTE EDILDIGINDE hicbir sey okutmaz. Okutan
   * `role="status"`. Yani o uc dal da sessizdi - kapinin `aria-busy`
   * aramasi yanlis olurdu (§11.228 sinifi).
   *
   * §221 ROTA yedeklerini duyurulur kilmisti (`loading.tsx`), §152 kart
   * iskeletlerini; bunlar ucuncu kume: BILESENIN ICINDEKI bekleme dali.
   *
   * OLCUM ATA YURUYUSUYLE. Isaretten geri gidip onu saran `return`i bulup
   * oradan ileri JSX ETIKET YIGINI tutuluyor; isarete gelindiginde yigin
   * atalari tasiyor ve isaret onlarin BIRINDE aranıyor. Pencere yok, komsu
   * yok: `<Frame role="status">` cocugun etiketinde gorunmez ama atadir,
   * yanindaki kardes bir `role="status"` ise yigina hic girmez. */
  {
    const acilisSonu = (blok) => {
      let derinlik = 0, tirnak = null;
      for (let i = 0; i < blok.length; i++) {
        const c = blok[i];
        if (tirnak) { if (c === tirnak && blok[i - 1] !== "\\") tirnak = null; continue; }
        if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
        if (c === "{") derinlik++;
        else if (c === "}") derinlik--;
        else if (c === ">" && derinlik === 0) return i;
      }
      return -1;
    };
    /** `isaret`i saran JSX atalarinin acilis etiketleri (en dis once). */
    const atalar = (src, isaret) => {
      const hedef = src.indexOf(isaret);
      if (hedef < 0) return null;
      const bas = src.lastIndexOf("return", hedef);
      if (bas < 0) return null;
      const yigin = [];
      let k = bas;
      while (k < hedef) {
        const j = src.indexOf("<", k);
        if (j < 0 || j >= hedef) break;
        if (src[j + 1] === "/") {
          const kapanis = src.indexOf(">", j);
          if (kapanis < 0) break;
          yigin.pop();
          k = kapanis + 1;
          continue;
        }
        /* Parca (`<>`) da bir kare: acilisi yigina girmezse kapanisi yanlis
           bir ogeyi dusurur (bkz. §228'in ayni tamiri). */
        if (src[j + 1] === ">") { yigin.push("<>"); k = j + 2; continue; }
        if (!/[A-Za-z]/.test(src[j + 1] ?? "")) { k = j + 1; continue; }
        const son = acilisSonu(src.slice(j));
        if (son < 0) break;
        const etiket = src.slice(j, j + son + 1);
        /* Kendi kendini kapatan etiket ata olmaz. */
        if (!/\/\s*>$/.test(etiket)) yigin.push(etiket);
        k = j + son + 1;
      }
      return yigin;
    };
    const duyuruyor = (src, isaret, desen) => {
      const yigin = atalar(src, isaret);
      if (yigin === null) return "ISARET YOK";
      return yigin.some((e) => desen.test(e)) ? "duyuruyor" : "SESSIZ";
    };
    const WEB_ISARET = /role="status"/;
    const MOBIL_ISARET = /accessibilityLiveRegion="polite"/;

    const WEB = [
      ["src/components/boss-player.tsx", 't("exam.preparing")'],
      ["src/components/walk-player.tsx", 't("walk.preparing")'],
      ["src/components/daily-player.tsx", 't("daily.preparing")'],
      ["src/components/challenge-player.tsx", 't("challenge.preparing")'],
      ["src/components/exam-player.tsx", '"exam.preparing" : "item.mono_scoring"'],
      ["src/components/weekly-player.tsx", '"weekly.preparing" : "weekly.saving"'],
      ["src/components/placement/placement-test.tsx", '"plc.preparing" : "placement.calculating_your_level"'],
      ["src/components/session-player.tsx", 't("session.preparing")'],
    ];
    const MOBIL = [
      ["mobile/src/screens/BossScreen.tsx", 't("exam.preparing")'],
      ["mobile/src/screens/ChallengeScreen.tsx", 't("challenge.preparing")'],
      ["mobile/src/screens/PlacementScreen.tsx", 't("placement.calculating_your_level")'],
      ["mobile/src/screens/RoleplayExamScreen.tsx", 'tx("item.mono_scoring")'],
      ["mobile/src/screens/MockExamScreen.tsx", 't("mockexam.scoring")'],
    ];
    const kisa = (y) => y.split("/").pop().replace(/\.tsx$/, "");
    sameList(
      "ekrani kaplayan bekleme duyuruluyor",
      [...WEB, ...MOBIL].map(([y, isaret]) =>
        kisa(y) + "=" + duyuruyor(sil(read(y)), isaret, y.startsWith("mobile/") ? MOBIL_ISARET : WEB_ISARET),
      ),
      [...WEB, ...MOBIL].map(([y]) => kisa(y) + "=duyuruyor"),
      "bulunan",
      "beklenen",
    );
  }

  /* -- 226. "yapabildiklerim": ayni sayfa mi, iki ayri urun mu ---------
   *
   * Tasarim eksenindeki en buyuk ayrisma buydu ve iki platform ayni veriyi
   * (`/api/cando`) iki FARKLI SAYFA olarak ciziyordu:
   *
   *   Android: hepsi birden. Ustte seviye basina ILERLEME CUBUKLU ozet karti,
   *     altinda her seviye kendi kartinda, ifadenin altinda becerinin adi.
   *   Web (eski): bes seviye CIPI ve liste yalnizca SECILI seviyeyi
   *     gosteriyordu; ifadeler beceri basliklarina bolunuyordu; seviye
   *     sayilari ciplerin icine sikismisti; ve durum dairesi `aria-hidden`
   *     tasidigi icin "kanitli/gelisiyor/henuz yok" ekran okuyucuya HIC
   *     ulasmiyordu (`aria-hidden` `title`i da susturur).
   *
   * Ayrica bos LISTE dali webde yoktu: `!data` (istek hatasi) karsilaniyor,
   * "veri geldi ama ici bos" hali bos bir sayfa birakiyordu - Android o dalda
   * da sebebi soyluyor.
   *
   * Kapi yerlesimin KENDISINI okuyor, metni degil: gruplama anahtari, ozet
   * cubugu, satirin erisilebilir adi, beceri alt satiri ve bos liste dali. */
  {
    const mob = sil(read("mobile/src/screens/CandoScreen.tsx"));
    const web = sil(read("src/components/cando-card.tsx"));
    sameList(
      "yapabildiklerim yerlesimi",
      [
        "gruplama=" + (/g\[it\.cando\.level\]/.test(mob) ? "seviye" : "?"),
        "tum seviyeler=" + (/LEVELS\.filter\(\(lv\) => byLevel\[lv\]\?\.length\)/.test(mob) ? "evet" : "HAYIR"),
        "seviye suzgeci=" + (/\bsetLevel\b/.test(mob) ? "VAR" : "yok"),
        "ozet cubugu=" + (/b\.proven \/ b\.total/.test(mob) ? "var" : "YOK"),
        "satir durum adi=" + (/accessibilityLabel=\{t\(it\.state === "proven"/.test(mob) ? "var" : "YOK"),
        "beceri alt satiri=" + (/SKILL_KEY\[it\.cando\.skill\]/.test(mob) ? "var" : "YOK"),
        "bos liste dali=" + (/!\(data\?\.items \?\? \[\]\)\.length/.test(mob) ? "var" : "YOK"),
      ],
      [
        "gruplama=" + (/byLevel\.set\(it\.cando\.level/.test(web) ? "seviye" : "?"),
        "tum seviyeler=" + (/CANDO_LEVELS\.filter\(\(lv\) => byLevel\.get\(lv\)\?\.length\)/.test(web) ? "evet" : "HAYIR"),
        "seviye suzgeci=" + (/\bsetLevel\b/.test(web) ? "VAR" : "yok"),
        "ozet cubugu=" + (/b\.proven \/ b\.total/.test(web) ? "var" : "YOK"),
        "satir durum adi=" + (/aria-label=\{t\(it\.state === "proven"/.test(web) ? "var" : "YOK"),
        "beceri alt satiri=" + (/CANDO_SKILL_LABEL_KEYS\[it\.cando\.skill/.test(web) ? "var" : "YOK"),
        "bos liste dali=" + (/!items\.length/.test(web) ? "var" : "YOK"),
      ],
      "mobil",
      "web",
    );
    /* Mutlak olcut: durum dairesi `aria-hidden` TASIMAMALI - eski kusur tam
       olarak buydu ve "etiket var" olcusu tek basina onu yakalamaz (ikisi bir
       arada da yazilabilir, o zaman etiket yine susar). */
    sameList(
      "durum dairesi susturulmamis",
      ["aria-hidden=" + (/aria-hidden/.test(web) ? "VAR" : "yok")],
      ["aria-hidden=yok"],
      "bulunan",
      "beklenen",
    );
  }

  /* -- 225. sik seciciler: "hangisi secili" renkten baska bir kanaldan
   *    da soyleniyor mu --------------------------------------------------
   *
   * Bu turda eksen SECIM BILGISIYDI: bir dugme/satir/cip secili oldugunu
   * yalnizca ZEMIN RENGIYLE anlatiyorsa ekran okuyucu kullanicisi hangisini
   * sectigini hicbir yoldan ogrenemez. Olcut mutlak: secime gore stil
   * degistiren bir denetim, secimi bir DURUMA da yazmak zorunda.
   *
   * Yedi ayri kusur cikti ve dordu ANDROID'deydi - birini kopyalamak yanlis
   * olurdu, o yuzden olcut karsilastirma degil mutlak:
   *
   *  1. Android `OptionButton` (oyun turlarinin ortak sik dugmesi) iki
   *     durumu da YANLIS seyden okuyordu: `selected: state !== "idle"`
   *     cevaptan sonra DOGRU sikki "secili" diye okutuyordu (kullanici
   *     baskasini secmis olsa bile), `disabled: state !== "idle"` ise
   *     dokunulmayan siklari "acik" gosteriyordu - oysa `choose` cevaptan
   *     sonra hepsini yutuyor. Artik `answered`/`chosen` proplari var.
   *  2. Android beceri alistirmasinin sik ve siralama dugmeleri (`skillQuiz`)
   *     hic durum tasimiyordu; webde ayni dugmeler `aria-pressed` tasiyor.
   *  3. Android tepki cubugu: kendi tepkim yalnizca dolu zeminle anlatiliyordu.
   *  4. Android sosyal gorunurluk satirlari gercek bir radyo grubu (yaninda
   *     nokta bile var) ama rol/durum bilgisi yoktu.
   *  5. Web kenar cubugu gezinmesi (masaustu, iki blok): hangi sayfada
   *     oldugun yalnizca gradyandan okunuyordu - KENDI KARDESI olan alt cubuk
   *     ayni bilgiyi `aria-current` ile veriyor, Android'de sekme
   *     `accessibilityState={{ selected }}` tasiyor (bkz. TabBar).
   *  6. Web /mock-exams seviye seridi: ayni serit /skills'te `aria-current`
   *     tasiyor, burada tasimiyordu.
   *  7. Web tepki SECICISI: menude secilebilir oge `menuitemradio` +
   *     `aria-checked` ister; `role="menuitem"` durum tasimaz (ikisi de
   *     eksikti - §11.228 sinifi: "iki taraf da yanlis oldugu icin
   *     karsilastirma geciyor").
   *
   * Kapi PENCERE kullanmiyor: isaretten geri gidip onu ICEREN en yakin
   * acilis etiketini bulup o etiketi okuyor (§11.339 kurali - sinir bir
   * mesafe degil, bir dugum).
   *
   * BU KAPI ADI GECEN YUZEYLERI TUTAR; eksenin KENDISINI butun agacta
   * `check:selection` olcuyor (`scripts/check-selection-state.mjs`): secime
   * gore stil kuran her denetim durumu da yazmali - iki olcutle, cunku
   * etiket duzeyi olcut secimini etiketin DISINDA hesaplayan denetimleri
   * (Android `ChoiceGame`, web `match-game`) hic olcmuyordu. */
  {
    /** Acilis etiketinin sonu: tirnak ve suslu derinligine bakan `>`. */
    const acilisSonu = (blok) => {
      let derinlik = 0, tirnak = null;
      for (let i = 0; i < blok.length; i++) {
        const c = blok[i];
        if (tirnak) { if (c === tirnak && blok[i - 1] !== "\\") tirnak = null; continue; }
        if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
        if (c === "{") derinlik++;
        else if (c === "}") derinlik--;
        else if (c === ">" && derinlik === 0) return i;
      }
      return -1;
    };
    /** `isaret`i ICINDE tasiyan `<ad` acilis etiketlerinin tamami. */
    const kapsayanlar = (src, isaret, ad) => {
      const cikti = [];
      for (let j = src.indexOf(isaret); j >= 0; j = src.indexOf(isaret, j + 1)) {
        const a = src.lastIndexOf("<" + ad, j);
        if (a < 0) continue;
        const son = acilisSonu(src.slice(a));
        if (son < 0) continue;
        const etiket = src.slice(a, a + son + 1);
        if (etiket.includes(isaret)) cikti.push(etiket);
      }
      return cikti;
    };
    /** Bir dosyadaki tum `<ad` acilis etiketleri. */
    const tumEtiketler = (src, ad) => {
      const cikti = [];
      for (let j = src.indexOf("<" + ad); j >= 0; j = src.indexOf("<" + ad, j + 1)) {
        const son = acilisSonu(src.slice(j));
        if (son < 0) continue;
        cikti.push(src.slice(j, j + son + 1));
      }
      return cikti;
    };

    /* -- mobil: oyun turlarinin ortak sik dugmesi -- */
    const rounds = sil(read("mobile/src/game/rounds.tsx"));
    const optDurum = rounds.match(/accessibilityState=\{\{ disabled: ([^,]+), selected: ([^}]+)\}\}/) ?? [];
    /* `state={st}` gecen cagirilar SECILEBILIR olanlar; `state="idle"` ile
       cagirilan iki dugme ("zorlandim"/"anladim") gercek dugme, hep acik. */
    const secilebilir = rounds.split("\n").filter((l) => l.includes("<OptionButton") && l.includes("state={st}"));

    /* -- mobil: beceri alistirmasi -- */
    const sq = sil(read("mobile/src/game/skillQuiz.tsx"));
    const sqSik = kapsayanlar(sq, "setPick(oi)", "PressableScale");
    const sqSira = kapsayanlar(sq, "onPress={() => tap(pos)}", "PressableScale");

    /* -- mobil: tepki cubugu (serit + secici) -- */
    const rb = sil(read("mobile/src/social/ReactionBar.tsx"));
    const rbSecim = kapsayanlar(rb, "void pick(k)", "PressableScale");

    /* -- mobil: sosyal gorunurluk radyo grubu -- */
    const ss = sil(read("mobile/src/screens/SocialSettingsScreen.tsx"));
    const ssSatir = kapsayanlar(ss, "visibility: v.key", "PressableScale");

    sameList(
      "mobil secim durumu dogru seyi olcuyor",
      [
        "sik dugmesi disabled=" + (optDurum[1]?.trim() ?? "YOK"),
        "sik dugmesi selected=" + (optDurum[2]?.trim() ?? "YOK"),
        "secilebilir cagiri=" + secilebilir.length,
        "answered gecen=" + secilebilir.filter((l) => /\banswered=\{/.test(l)).length,
        "chosen gecen=" + secilebilir.filter((l) => /\bchosen=\{/.test(l)).length,
        "beceri sikki=" + (sqSik.length === 1 && /accessibilityState=\{\{ selected: pick === oi/.test(sqSik[0]) ? "durumlu" : "DURUMSUZ"),
        "beceri siralamasi=" + (sqSira.length === 1 && /accessibilityState=\{\{ selected: picked === pos/.test(sqSira[0]) ? "durumlu" : "DURUMSUZ"),
        "tepki secimi=" + rbSecim.length + "/" + rbSecim.filter((e) => /accessibilityState=\{\{ selected: mine \}\}/.test(e)).length,
        "gorunurluk satiri=" + (ssSatir.length === 1 && /accessibilityRole="radio"/.test(ssSatir[0]) && /selected: active/.test(ssSatir[0]) ? "radyo+durumlu" : "EKSIK"),
      ],
      [
        "sik dugmesi disabled=answered",
        "sik dugmesi selected=chosen",
        "secilebilir cagiri=6",
        "answered gecen=6",
        "chosen gecen=6",
        "beceri sikki=durumlu",
        "beceri siralamasi=durumlu",
        "tepki secimi=2/2",
        "gorunurluk satiri=radyo+durumlu",
      ],
      "bulunan",
      "beklenen",
    );

    /* -- web: secime gore stil degistiren her bagin durumu da yazmali --
       Olcut mutlak ve GENEL: `active` ya da `=== level` ile stil kuran bir
       `<Link` `aria-current` tasimazsa kusurdur. Boylece yarin eklenen
       dorduncu gezinme blogu da kendiliginden olculur. Kapinin hic bag
       gormeden gecmesi de engelli: gorulen bag sayisi ayrica raporlaniyor. */
    const WEB_GEZINME = [
      "src/components/app-shell.tsx",
      "src/app/(app)/mock-exams/page.tsx",
      "src/app/(app)/skills/page.tsx",
    ];
    let secili = 0, akimsiz = 0;
    for (const y of WEB_GEZINME) {
      for (const etiket of tumEtiketler(sil(read(y)), "Link")) {
        const secimeBagli = /\bactive\b/.test(etiket) || /=== level\b/.test(etiket);
        if (!secimeBagli) continue;
        secili++;
        if (!/\baria-current=/.test(etiket)) akimsiz++;
      }
    }

    /* Web tepki secicisi: `menuitem` durum tasimaz. */
    const wrb = sil(read("src/components/social/reaction-bar.tsx"));
    const wrbSecici = kapsayanlar(wrb, "void pick(k)", "button").filter((e) => /role="menuitem/.test(e));

    sameList(
      "web secim durumu renkten baska bir kanalda da",
      [
        "secime bagli bag=" + secili,
        "aria-current tasimayan=" + akimsiz,
        "tepki secicisi=" + (wrbSecici.length === 1 && /role="menuitemradio"/.test(wrbSecici[0]) && /aria-checked=\{s\.mine === k\}/.test(wrbSecici[0]) ? "menuitemradio+checked" : "EKSIK"),
      ],
      ["secime bagli bag=5", "aria-current tasimayan=0", "tepki secicisi=menuitemradio+checked"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 224. kip yuzeyleri: odak, Escape ve duyuru ─────────────────────
   * Bu eksen ikisinde de ZATEN yapilmisti ve olcum bunu dogruladi - kapi
   * gerilemeyi tutmak icin yazildi:
   *
   *   mobil bes kip (rozet, sertifika, onay, mikrofon, bildir) hepsi
   *     `accessibilityViewIsModal` + `onRequestClose` tasiyor
   *   web uc kipi yerel `<dialog>` + `showModal()` ile aciyor (odak tuzagi ve
   *     Escape tarayicidan), dorduncusu (`achievement-unlock`) elle:
   *     `role="dialog" aria-modal`, odagi aliyor, Escape'i dinliyor ve
   *     kapanista odagi GERI VERIYOR
   *
   * Web'in `<dialog>` kullanmayan tek yuzeyi yuruyusun KARANLIK ORTUSU ve
   * orada iki kusur vardi: kendini duyurmuyordu ve klavye icin cikis yoktu
   * (cikis uc dokunus; ortu her seyi kapatiyor ve tiklamalari yutuyor, yani
   * WCAG 2.1.2 anlaminda bir klavye tuzagi). Ortu WEB'E OZEL - mobilde ekran
   * gercekten kapaniyor - o yuzden olcut mutlak, karsilastirma degil. */
  {
    const mobKipler = [
      ["rozet", "mobile/src/ui/AchievementUnlock.tsx"],
      ["sertifika", "mobile/src/ui/CertificateSheet.tsx"],
      ["onay", "mobile/src/ui/ConfirmDialog.tsx"],
      ["mikrofon", "mobile/src/ui/MicDisclosure.tsx"],
      ["bildir", "mobile/src/ui/ReportSheet.tsx"],
    ];
    const eksik = [];
    for (const [ad, f] of mobKipler) {
      const src = sil(read(f));
      if (!/accessibilityViewIsModal/.test(src) || !/onRequestClose/.test(src)) eksik.push(ad);
    }
    const webDialog = ["confirm-dialog", "mic-disclosure", "report-dialog"].filter(
      (ad) => !/showModal\(\)/.test(sil(read("src/components/" + ad + ".tsx"))),
    );
    const webRozet = sil(read("src/components/achievement-unlock.tsx"));
    const webYuruyus = sil(read("src/components/walk-player.tsx"));
    sameList(
      "kip yuzeyleri: odak, Escape ve duyuru",
      [
        "mobil kip sayisi=" + mobKipler.length,
        "mobil eksik=" + (eksik.length ? eksik.join(", ") : "yok"),
        "web showModal eksik=" + (webDialog.length ? webDialog.join(", ") : "yok"),
        "web rozet elle=" + (/role="dialog"/.test(webRozet) && /aria-modal/.test(webRozet) && /geri\?\.focus\?\.\(\)/.test(webRozet) ? "odak+Escape+geri" : "EKSIK"),
        /* PENCERE DEGIL YAPI (11.339'un kurali): `role="status"` ile
           `walk.dark_listening` arasina uzun bir gerekce yorumu girdi ve 200
           karakterlik pencere yetmedi - ayni tuzagin BESINCI bicimi. Isaretten
           geri gidip ondan hemen once acilan `<div`in etiketine bakiliyor. */
        "web karanlik ortu duyurusu=" + (() => {
          const j = webYuruyus.indexOf("walk.dark_listening");
          if (j < 0) return "ISARET YOK";
          const k = webYuruyus.lastIndexOf("<div", j);
          if (k < 0) return "KAP YOK";
          return /role="status"/.test(webYuruyus.slice(k, webYuruyus.indexOf(">", k) + 1)) ? "var" : "YOK";
        })(),
        "web karanlik ortu Escape=" + (/e\.key !== "Escape"[\s\S]{0,80}exitDark\(\)/.test(webYuruyus) ? "var" : "YOK"),
      ],
      [
        "mobil kip sayisi=5", "mobil eksik=yok", "web showModal eksik=yok",
        "web rozet elle=odak+Escape+geri",
        "web karanlik ortu duyurusu=var", "web karanlik ortu Escape=var",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 223. turun SONUCU duyuruluyor mu ───────────────────────────────
   * Bir tur bitince kart soru listesinin YERINE geliyor: sorular kayboluyor,
   * yerine puan ve yargi ("gectin" / "biraz daha calis") beliriyor. Sesli
   * okuyucu kullanan biri bunu hic duymuyordu - tur bitti mi, kac dogru,
   * gecti mi, hicbiri.
   *
   * 11.336'nin sinifi: IKI TARAF DA sessizdi, yani karsilastirmali bir kapi
   * bunu goremezdi. Olcut mutlak.
   *
   * Kapi ARTIK BUTUN sonuc yuzeylerini tutuyor: beceri egzersizi (bes
   * oynatici da `player-shell`den geciyor), unite quizi, patron turu, meydan
   * okuma, gunun turu, haftalik sinav, deneme sinavi, rol yapma, seviye
   * sinavi, oturumun ETAP ve BITIS kartlari, yuruyus. Oturum iki sonuc
   * tasidigi icin iki ayri olcut var.
   * Kapiyi yesil tutmak icin degil, her yuzeyin kendi turunda dogru yere
   * konmasi icin boyle: sonuc kabi her ekranda ayri yerde. */
  {
    const webBeceri = sil(read("src/components/skills/player-shell.tsx"));
    const webQuiz = sil(read("src/components/immersion/quiz-player.tsx"));
    const mobBeceri = sil(read("mobile/src/screens/ItemScreen.tsx"));
    const mobQuiz = sil(read("mobile/src/screens/QuizScreen.tsx"));
    const webPatron = sil(read("src/components/boss-player.tsx"));
    const webMeydan = sil(read("src/components/challenge-player.tsx"));
    const webGunun = sil(read("src/components/daily-player.tsx"));
    const mobPatron = sil(read("mobile/src/screens/BossScreen.tsx"));
    const mobMeydan = sil(read("mobile/src/screens/ChallengeScreen.tsx"));
    const mobGunun = sil(read("mobile/src/screens/DailyScreen.tsx"));
    const webHaftalik = sil(read("src/components/weekly-player.tsx"));
    const webDeneme = sil(read("src/components/mock-exam-player.tsx"));
    const webRol = sil(read("src/components/lessons/roleplay-exam.tsx"));
    const mobHaftalik = sil(read("mobile/src/screens/WeeklyScreen.tsx"));
    const mobDeneme = sil(read("mobile/src/screens/MockExamScreen.tsx"));
    const mobRol = sil(read("mobile/src/screens/RoleplayExamScreen.tsx"));
    const webSinav = sil(read("src/components/exam-player.tsx"));
    const webOturum = sil(read("src/components/session-player.tsx"));
    const webYuruyus = sil(read("src/components/walk-player.tsx"));
    const mobSinav = sil(read("mobile/src/screens/ExamScreen.tsx"));
    const mobOturum = sil(read("mobile/src/screens/GameScreen.tsx"));
    const mobYuruyus = sil(read("mobile/src/screens/WalkModeScreen.tsx"));
    /* Mobil tarafta canli bolge SONUC METNINDE; hangi metin oldugu ekrana
       gore degisiyor, o yuzden her biri kendi dizesiyle araniyor. */
    const mobSonuc = (src, desen) => (desen.test(src) ? "duyuruyor" : "SESSIZ");
    /**
     * Sonucu isaretleyen dizeden GERI gidip ondan hemen once acilan kabin
     * etiketini okuyor: kap `<section ...>` ya da `<div ...>` olabilir.
     * Pencere tahmin edilmiyor, en yakin kap bulunuyor.
     */
    /**
     * Dalin KOK ELEMANI: capadan sonraki ilk acilis etiketi.
     *
     * Yuruyus ve patron turunun sonucu `<Frame role="status">` ile
     * duyuruluyor; `Frame` bir BILESEN, yani `<section`/`<div` arayan
     * `dalDuyuruyor` onu bulamaz. Ilk yazim bu yuzden 120 karakterlik bir
     * pencere kullaniyordu ve ARAYA konfeti + maskot girince yetmedi -
     * pencere tuzaginin ALTINCI vakasi. Dogrusu mesafe degil dugum: dalin
     * kok elemanini okumak.
     */
    const dalKoku = (src, capa) => {
      const i = src.indexOf(capa);
      if (i < 0) return "";
      const j = src.indexOf("<", i);
      if (j < 0) return "";
      let derinlik = 0, tirnak = null;
      for (let k = j; k < src.length; k++) {
        const c = src[k];
        if (tirnak) { if (c === tirnak && src[k - 1] !== "\\") tirnak = null; continue; }
        if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
        if (c === "{") derinlik++;
        else if (c === "}") derinlik--;
        else if (c === ">" && derinlik === 0) return src.slice(j, k + 1);
      }
      return "";
    };
    const dalDuyuruyor = (src, isaret) => {
      const j = src.indexOf(isaret);
      if (j < 0) return "ISARET YOK";
      const oncesi = src.slice(0, j);
      const k = Math.max(oncesi.lastIndexOf("<section"), oncesi.lastIndexOf('<div role="status" className="card'), oncesi.lastIndexOf('<div className="card'));
      if (k < 0) return "KAP YOK";
      const etiket = src.slice(k, src.indexOf(">", k) + 1);
      return /role="status"/.test(etiket) ? "duyuruyor" : "SESSIZ";
    };
    sameList(
      "turun sonucu duyuruluyor",
      [
        "web beceri=" + (/role="status"[\s\S]{0,80}card mt-5 p-5 text-center/.test(webBeceri) ? "duyuruyor" : "SESSIZ"),
        "web quiz=" + (/<div role="status" className="card relative p-6 text-center">/.test(webQuiz) ? "duyuruyor" : "SESSIZ"),
        "web patron=" + (/role="status"/.test(dalKoku(webPatron, 'if (status === "won" || status === "lost")')) ? "duyuruyor" : "SESSIZ"),
        "web meydan=" + (/<div role="status" className="text-center">/.test(webMeydan) ? "duyuruyor" : "SESSIZ"),
        "web gunun=" + (/<div role="status" className="card overflow-hidden">/.test(webGunun) ? "duyuruyor" : "SESSIZ"),
        "mobil beceri=" + mobSonuc(mobBeceri, /accessibilityLiveRegion="polite" variant="h2"/),
        "mobil quiz=" + mobSonuc(mobQuiz, /accessibilityLiveRegion="polite" variant="h2"/),
        "mobil patron=" + mobSonuc(mobPatron, /accessibilityLiveRegion="polite"[\s\S]{0,140}boss\.passed/),
        "mobil meydan=" + mobSonuc(mobMeydan, /accessibilityLiveRegion="polite" variant="display"/),
        "mobil gunun=" + mobSonuc(mobGunun, /accessibilityLiveRegion="polite" variant="display"/),
        /* SONUC DALINDA MI, DOSYANIN HERHANGI BIR YERINDE MI? Bu dosyalarda
           ayni kart sinifi uc-bes kez geciyor (giris, hata, sonuc) ve yalniz
           "dosyada bir yerde role=status var" demek komsuyu olcmek olurdu:
           rol yanlis dala kayarsa kapi yine yesil kalirdi.
           KARAKTER PENCERESI DE YETMEDI - ilk yazimda 400 karakter verdim,
           gercek mesafe 547 cikti ve kapi kendi kendine kirmizi oldu. Pencere
           tahmin etmek yerine SONUCU ISARETLEYEN dizeden GERI gidip ondan
           hemen once acilan kabin etiketine bakiliyor. */
        "web haftalik=" + dalDuyuruyor(webHaftalik, "weekly.your_score"),
        "web deneme=" + dalDuyuruyor(webDeneme, "mockexam.result"),
        "web rol yapma=" + dalDuyuruyor(webRol, "rpexam.below_threshold"),
        "mobil haftalik=" + mobSonuc(mobHaftalik, /accessibilityLiveRegion="polite" variant="h1"/),
        "mobil deneme=" + mobSonuc(mobDeneme, /accessibilityLiveRegion="polite" variant="bodyStrong"/),
        "mobil rol yapma=" + mobSonuc(mobRol, /accessibilityLiveRegion="polite" variant="h1"/),
        /* SON UC YUZEY COK DURUMLU: sinav (tek sonuc; bolum gecisleri calisan
           fazin icinde bir KAPAK, ayri bir sonuc degil - ilk varsayim
           yanlisti ve olcum duzeltti), oturum (ETAP karti + BITIS karti, iki
           ayri sonuc) ve yuruyus (bitis). */
        "web sinav=" + dalDuyuruyor(webSinav, "exam.not_passed"),
        "web oturum etap=" + dalDuyuruyor(webOturum, "stage.clean"),
        "web oturum bitis=" + (/<Stagger role="status" className="card overflow-hidden">/.test(webOturum) ? "duyuruyor" : "SESSIZ"),
        "web yuruyus=" + (/role="status"/.test(dalKoku(webYuruyus, 'if (status === "done")')) ? "duyuruyor" : "SESSIZ"),
        "mobil sinav=" + mobSonuc(mobSinav, /accessibilityLiveRegion="polite" variant="h1">\{formatPercent\(pct\)\}/),
        "mobil oturum etap=" + mobSonuc(mobOturum, /accessibilityLiveRegion="polite" variant="h2"[\s\S]{0,80}stage\.clean/),
        "mobil oturum bitis=" + mobSonuc(mobOturum, /accessibilityLiveRegion="polite" variant="h1"[\s\S]{0,120}common\.round_done/),
        "mobil yuruyus=" + mobSonuc(mobYuruyus, /accessibilityLiveRegion="polite" variant="h1"[\s\S]{0,140}walkmode\.done_title/),
      ],
      [
        "web beceri=duyuruyor", "web quiz=duyuruyor", "web patron=duyuruyor",
        "web meydan=duyuruyor", "web gunun=duyuruyor",
        "mobil beceri=duyuruyor", "mobil quiz=duyuruyor", "mobil patron=duyuruyor",
        "mobil meydan=duyuruyor", "mobil gunun=duyuruyor",
        "web haftalik=duyuruyor", "web deneme=duyuruyor", "web rol yapma=duyuruyor",
        "mobil haftalik=duyuruyor", "mobil deneme=duyuruyor", "mobil rol yapma=duyuruyor",
        "web sinav=duyuruyor", "web oturum etap=duyuruyor", "web oturum bitis=duyuruyor",
        "web yuruyus=duyuruyor",
        "mobil sinav=duyuruyor", "mobil oturum etap=duyuruyor", "mobil oturum bitis=duyuruyor",
        "mobil yuruyus=duyuruyor",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 222. sosyal eylemin hatasi duyuruluyor mu ──────────────────────
   * Istek kabul etmek, durtmek, tepki vermek, ortak gorev kurmak: hepsi
   * basarisiz olabilir ve hepsi ayni satiri ciziyor. O satir IKI PLATFORMDA
   * DA sessizdi - webde on bir yerde elle yazilmis kirmizi metin (`role`
   * yok), mobilde `social/common` `ErrorText` (`accessibilityLiveRegion`
   * yok). Yani sesli okuyucu kullanan biri eyleminin basarisiz oldugunu
   * hic ogrenmiyordu.
   *
   * IKI TARAF DA YANLIS OLDUGU ICIN karsilastirmali bir kapi bunu goremezdi
   * (11.228'in sinifi: "her iki taraf da ayni yanlisi yapiyorsa esitlik
   * kontrolu gecer"). Olcut mutlak: bir eylem basarisiz olduysa duyurulur.
   *
   * Kapi ayrica webde ELLE YAZILMIS hata satiri kalmadigini okuyor - on bir
   * yuvayi tek bilesende toplamanin en kolay yanlisi birini atlamak. */
  {
    const webHata = sil(read("src/components/social/error-text.tsx"));
    const mobHata = sil(read("mobile/src/social/common.tsx"));
    /* Sosyal bilesenlerde `{err}` ciziminin elle yazilmis hali kaldi mi. */
    const elle = [];
    for (const e of readdirSync(new URL("../src/components/social", import.meta.url), { withFileTypes: true })) {
      if (!/\.tsx$/.test(e.name) || e.name === "error-text.tsx") continue;
      const src = sil(read("src/components/social/" + e.name));
      if (/\{err\}<\/(?:p|span)>/.test(src)) elle.push(e.name);
    }
    sameList(
      "sosyal eylemin hatasi duyuruluyor",
      [
        "web ortak bilesen=" + (/role="alert"/.test(webHata) ? "duyuruyor" : "SESSIZ"),
        "web elle yazilmis kalan=" + (elle.length ? elle.join(", ") : "yok"),
        "mobil ortak bilesen=" + (/accessibilityLiveRegion="polite"[\s\S]{0,120}dangerText/.test(mobHata) ? "duyuruyor" : "SESSIZ"),
      ],
      ["web ortak bilesen=duyuruyor", "web elle yazilmis kalan=yok", "mobil ortak bilesen=duyuruyor"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 221. rota yedekleri kendini DUYURUYOR mu ───────────────────────
   * On dort `loading.tsx` dosyasi da gelecek duzenin seklini dogru ciziyordu
   * (11.334'te sosyal merkezde eksik olan buydu ve duzeltildi) - ama
   * hicbiri kendini DUYURMUYORDU ve on dordunun kokü `aria-hidden`di. Yani
   * sesli okuyucu kullanan biri bir sekmeye gectiginde hicbir sey duymuyor:
   * ekran sessizce bos kaliyor, sonra icerik bir anda ortaya cikiyor.
   *
   * Mobil bunu KOKTE cozmustu (`ui/Skeleton` `SkeletonCard`:
   * `accessibilityRole="progressbar"`, gerekcesi orada yazili) ve webin
   * `SkeletonCard`i da `role="status" aria-busy` tasiyor - eksik olan ROTA
   * seviyesindeki yedeklerdi. 11.329'da ayni sinif TEK bir bilesende
   * cikmisti; bu kapi butun rotalari birden okuyor.
   *
   * Kapi iki sey soyluyor: her yedek `LoadingRegion` kullaniyor mu, ve
   * hicbirinin kokunde `aria-hidden` KALMADI mi (kokte kalirsa etiketin
   * kendisi de gizlenir ve bolge hic duyurulmaz - duzeltmenin en kolay
   * yanlisi). */
  {
    const yedekler = [];
    const tara = (d) => {
      for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
        const yol = d + "/" + e.name;
        if (e.isDirectory()) tara(yol);
        else if (e.name === "loading.tsx") yedekler.push(yol);
      }
    };
    tara("src/app");
    const duyurmayan = [];
    const kokuGizli = [];
    for (const f of yedekler) {
      const src = sil(read(f));
      if (!/<LoadingRegion\b/.test(src)) duyurmayan.push(f);
      if (/return \([\s\S]{0,60}aria-hidden/.test(src)) kokuGizli.push(f);
    }
    sameList(
      "rota yedekleri kendini duyuruyor",
      [
        "yedek sayisi=" + yedekler.length,
        "duyurmayan=" + (duyurmayan.length ? duyurmayan.join(", ") : "yok"),
        "kokü gizli=" + (kokuGizli.length ? kokuGizli.join(", ") : "yok"),
        "mobil kok duyurusu=" + (/accessibilityRole="progressbar"/.test(sil(read("mobile/src/ui/Skeleton.tsx"))) ? "var" : "YOK"),
      ],
      ["yedek sayisi=" + yedekler.length, "duyurmayan=yok", "kokü gizli=yok", "mobil kok duyurusu=var"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 220. sosyal merkez: yukleme dali gercek dizilimi ciziyor mu ─────
   * Sosyal merkezin "arkadaslar" sekmesi iki platformda AYNI dizilimi
   * cizyor ve sira bilincli: cevap bekleyen is (gelen istek), bu haftanin
   * taahhudu (ortak gorev), sonra liste ve tablo. Bu kisim zaten esitti.
   *
   * YUKLEME DALI esit DEGILDI. Android yuklenirken gercek dizilimin aynisini
   * ciziyor (istek karti, gorev karti, iki kisi satiri); web yalniz UC KISI
   * SATIRI ciziyordu ve veri gelince ilk iki kart USTTE belirip listeyi asagi
   * itiyordu. Ayni sinif 11.329'da rozet duvarinda cikti (iskeletin
   * duyurusu) ve mobilin baska bir ekraninda gerekcesi yazili: "icerik
   * gelince kartlar ortadan yukari sicramiyor, olduklari yerde beliriyor".
   *
   * Ilginc yani: `QuestsSkeleton` webde ZATEN vardi ama yalniz `Quests`in
   * kendi yuklemesinde kullaniliyordu - merkez yuklenirken `Quests` henuz
   * takili olmadigi icin o iskelet hic gorunmuyordu. */
  {
    const webMerkez = sil(read("src/components/social/friends-hub.tsx"));
    const mobMerkez = sil(read("mobile/src/screens/FriendsScreen.tsx"));
    const webIstek = sil(read("src/components/social/requests.tsx"));
    const sira = (src, adlar) => adlar.map((a) => (src.indexOf(a) >= 0 ? src.indexOf(a) : Infinity));
    const artan = (xs) => xs.every((v, i) => i === 0 || (xs[i - 1] < v && v !== Infinity));
    const webSira = sira(webMerkez, ["<RequestCardSkeleton", "<QuestsSkeleton", "<PersonRowSkeleton"]);
    const mobSira = sira(mobMerkez, ["<RequestCardSkeleton", "<QuestsSkeleton", "<FriendCardSkeleton"]);
    sameList(
      "sosyal merkez yukleme dali",
      [
        "web istek iskeleti=" + (/export function RequestCardSkeleton/.test(webIstek) ? "var" : "YOK"),
        "web uc parca=" + (webSira.every((x) => x !== Infinity) ? "var" : "EKSIK"),
        "web sira=" + (artan(webSira) ? "istek+gorev+liste" : "AYRI"),
        "mobil uc parca=" + (mobSira.every((x) => x !== Infinity) ? "var" : "EKSIK"),
        "mobil sira=" + (artan(mobSira) ? "istek+gorev+liste" : "AYRI"),
        /* Gercek dizilim de olculuyor: yukleme dali ona benzemek zorunda. */
        "web gercek sira=" + (artan(sira(webMerkez, ["<Requests incoming", "<Quests friends", "<FriendList friends", "<FriendsBoard"])) ? "dogru" : "AYRI"),
        "mobil gercek sira=" + (artan(sira(mobMerkez, ["<Requests incoming", "<Quests friends", "<FriendRows friends", "<FriendsBoard"])) ? "dogru" : "AYRI"),
      ],
      [
        "web istek iskeleti=var",
        "web uc parca=var", "web sira=istek+gorev+liste",
        "mobil uc parca=var", "mobil sira=istek+gorev+liste",
        "web gercek sira=dogru", "mobil gercek sira=dogru",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 219. gelen kutusu: "ne kadar once", hedefler ve rozetin tavani ──
   * Gelen kutusu iki platformda satir satir eslesiyor (avatar/karo,
   * okunmamis KALIN + nokta, tepki simgesi, chevron, imlecli sayfalama,
   * ilk yuklemede `markRead("all")`). Olculmeyen uc sey vardi:
   *
   * 1. `timeAgo` iki yerde ayri ayri yazili ve SATIR SATIR ayni: saniye
   *    hesabi, dort esik (60 sn / 60 dk / 24 sa / 7 gun) ve sonunda yerel
   *    kisa tarih. Ikisinden biri degistirilirse ayni bildirim iki
   *    platformda baska yas gosterir.
   * 2. Bildirim hedefleri. Android'de "gelen istekler" ve "ortak gorev"
   *    kendi sekmelerinde degil, arkadas listesinin basinda; web bu
   *    satirlarda kaldirilmis sekme adlarini yaziyordu ve yalniz
   *    `hub-tab`daki ALIAS sayesinde calisiyordu.
   * 3. Rozetin tavani: iki platform da 9'dan sonra "9+" yaziyor - rozet
   *    genisleyip basligi itmesin. Sayi tek yerde degil, iki yerde. */
  {
    const webZaman = sil(read("src/lib/social/client.ts"));
    const mobZaman = sil(read("mobile/src/api/social.ts"));
    const webKutu = sil(read("src/components/social/inbox.tsx"));
    const mobKutu = sil(read("mobile/src/screens/InboxScreen.tsx"));
    const webZil = sil(read("src/components/social/notification-bell.tsx"));
    const mobZil = sil(read("mobile/src/social/InboxBell.tsx"));
    /** `timeAgo` govdesi: imzadan kapanis suslu parantezine kadar. */
    const yas = (src) => {
      const i = src.indexOf("export function timeAgo");
      if (i < 0) return "timeAgo yok";
      const g = src.slice(i, src.indexOf("\n}", i));
      const esik = [
        /s < 60/.test(g) ? "60sn" : "YOK",
        /m < 60/.test(g) ? "60dk" : "YOK",
        /h < 24/.test(g) ? "24sa" : "YOK",
        /d < 7/.test(g) ? "7gun" : "YOK",
        /* DESEN `[^)]*` ILE YAZILMISTI ve hicbir seyi olcmuyordu: cagri
           `toLocaleDateString(localeOf(lang), {...})` bicimindeyken ilk `)`
           `localeOf(lang)`in kapanisi, yani sinif orada duruyor. Iki taraf
           da "YOK" dedi - iki tarafin AYNI sekilde basarisiz olmasi kusurun
           kodda degil olcumde oldugunun isareti. */
        /toLocaleDateString\([\s\S]{0,40}day: "numeric", month: "short"/.test(g) ? "kisa tarih" : "YOK",
      ];
      return esik.join("+");
    };
    sameList(
      "gelen kutusu: yas, hedefler ve rozet tavani",
      [
        "web yas=" + yas(webZaman),
        "mobil yas=" + yas(mobZaman),
        "web istek hedefi=" + (/case "friend_request":[\s\S]{0,80}tab=friends/.test(webKutu) ? "friends" : "KALDIRILMIS SEKME"),
        "web gorev hedefi=" + (/case "quest_completed":[\s\S]{0,80}tab=friends/.test(webKutu) ? "friends" : "KALDIRILMIS SEKME"),
        "mobil istek hedefi=" + (/case "friend_request": goFriends\(nav, "friends"\)/.test(mobKutu) ? "friends" : "BASKA"),
        "mobil gorev hedefi=" + (/case "quest_completed": goFriends\(nav, "friends"\)/.test(mobKutu) ? "friends" : "BASKA"),
        "web rozet tavani=" + (/unread > 9 \? "9\+"/.test(webZil) ? "9+" : "YOK"),
        "mobil rozet tavani=" + (/unread > 9 \? "9\+"/.test(mobZil) ? "9+" : "YOK"),
        "web ilk yuklemede okundu=" + (/markRead\("all"\)/.test(webKutu) ? "var" : "YOK"),
        "mobil ilk yuklemede okundu=" + (/markRead\("all"\)/.test(mobKutu) ? "var" : "YOK"),
      ],
      [
        "web yas=60sn+60dk+24sa+7gun+kisa tarih",
        "mobil yas=60sn+60dk+24sa+7gun+kisa tarih",
        "web istek hedefi=friends", "web gorev hedefi=friends",
        "mobil istek hedefi=friends", "mobil gorev hedefi=friends",
        "web rozet tavani=9+", "mobil rozet tavani=9+",
        "web ilk yuklemede okundu=var", "mobil ilk yuklemede okundu=var",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 218. ses ayarlari: okuma sesi ve oyun sesleri ayni bolumde mi ───
   * Android'de "Ses" bolumu ikisini birden tasiyor: okuma sesi (alt etiketi
   * `settings.reading_voice`, sonra `VoicePicker`), bir ayirici, sonra oyun
   * sesleri anahtari (`snd.game_sounds`).
   *
   * Webde oyun sesleri BILDIRIM AYARLARINDA duruyordu ve gerekcesi yaziliydi:
   * "oyun sesleri de bir 'ne zaman rahatsiz edilirim' ayari". Savunulabilir
   * ama sonucu su: sesle ilgili ayar arayan kullanici IKI yere bakmak zorunda
   * ve iki platform ayni ayari iki ayri ekranda tutuyor. Picker'in alt
   * etiketi de eksikti - mobil onun ne oldugunu soyluyor, webde basliksiz
   * duruyordu.
   *
   * Kapi ayni anahtarin IKI yerde birden cizilmemesini de okuyor: tasima
   * sirasinda eskisini silmemek en kolay hata. */
  {
    const webForm = sil(read("src/components/profile-form.tsx"));
    const webBildirim = sil(read("src/components/notification-settings.tsx"));
    const mobAyar = sil(read("mobile/src/screens/SettingsScreen.tsx"));
    /* Ses bolumunun govdesi: `settings.sound` etiketinden sonraki blok. */
    const sesBlogu = (src, ad) => {
      const i = src.indexOf(ad);
      return i < 0 ? "" : src.slice(i, i + 1200);
    };
    const webSes = sesBlogu(webForm, 'label={t("settings.sound")}');
    const mobSes = sesBlogu(mobAyar, 'label={t("settings.sound")}');
    sameList(
      "ses ayarlari ayni bolumde",
      [
        "web okuma sesi etiketi=" + (/settings\.reading_voice/.test(webSes) ? "var" : "YOK"),
        "web picker=" + (/<VoicePicker\b/.test(webSes) ? "var" : "YOK"),
        "web oyun sesleri=" + (/<SoundSettings bare \/>/.test(webSes) ? "ayni bolumde" : "BASKA YERDE"),
        "web bildirimlerde ses=" + (/\bSoundSettings\b/.test(webBildirim) ? "VAR (iki yerde)" : "yok"),
        "mobil okuma sesi etiketi=" + (/settings\.reading_voice/.test(mobSes) ? "var" : "YOK"),
        "mobil picker=" + (/<VoicePicker\b/.test(mobSes) ? "var" : "YOK"),
        "mobil oyun sesleri=" + (/snd\.game_sounds/.test(mobSes) ? "ayni bolumde" : "BASKA YERDE"),
      ],
      [
        "web okuma sesi etiketi=var", "web picker=var", "web oyun sesleri=ayni bolumde",
        "web bildirimlerde ses=yok",
        "mobil okuma sesi etiketi=var", "mobil picker=var", "mobil oyun sesleri=ayni bolumde",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 217. kelimenin durumu: kural kac yerde yazili ──────────────────
   * Ayni siniflandirma webde DORT yerde ayri ayri yaziliydi: `/api/words`un
   * govde eslemesi, iki SQL suzgeci (`/words` sayfasi ve ayni uc) ve listenin
   * etiket islevi (`word-list` `statusOf`). Dordu de ayni esikleri kullaniyordu
   * (`MASTERED_DAYS` ucunde de `lib/srs`ten geliyor), ama kural dort kez
   * yazildigi icin biri duzeltilip otekilerin eski kalmasi icin dort yol vardi.
   *
   * Mobilde kural TEK yerde (`data/words` `statusOf`) ve yorumu "web
   * `word-list` `statusOf` ile AYNI esikler" DIYOR - olcen bir sey yoktu.
   * Zorunlulugu yazan cumle, bu turlarda tekrar eden sinif.
   *
   * Artik iki yer var ve ikisi de tek kaynaktan okuyor: `lib/word-status`
   * `coarseStatus` (ucun uc degeri) ve `wordStatus` (listenin bes bandi).
   * `FAMILIAR_DAYS` iki platformda ayni adla; sayinin kendisi "ortak sayisal
   * sabitler" kapisina dusuyor.
   *
   * "Tekrar zamani" etiketi de ayni sinif: mobil `dueLabelKey`in yorumu web
   * `dueLabel` ile ayni esikleri iddia ediyor, o yuzden ikisinin GOVDESI
   * karsilastiriliyor. */
  {
    const kaynak = sil(read("src/lib/word-status.ts"));
    const uc = sil(read("src/app/api/words/route.ts"));
    const liste = sil(read("src/components/word-list.tsx"));
    const mobVeri = sil(read("mobile/src/data/words.ts"));
    /* "Tekrar zamani" esikleri: iki taraftan da ayni uc karar okunuyor. */
    const dueEsik = (src) => {
      const g = src.slice(src.indexOf("86400000") - 400, src.indexOf("86400000") + 400);
      return [
        /days <= 0/.test(g) ? "bugun" : "YOK",
        /days === 1/.test(g) ? "yarin" : "YOK",
        /due_in_days/.test(g) ? "gun" : "YOK",
      ].join("+");
    };
    sameList(
      "kelimenin durumu ve tekrar zamani",
      [
        "kaynak bant sayisi=" + ((kaynak.match(/"(?:new|learning|familiar|mastered|leech)"/g) ?? []).length ? "bes" : "EKSIK"),
        "uc govdesi=" + (/status: coarseStatus\(r\.intervalDays\)/.test(uc) ? "kaynaktan" : "elle yazili"),
        "liste etiketi=" + (/STATUS_TONE\[wordStatus\(r\)\]/.test(liste) ? "kaynaktan" : "elle yazili"),
        "listede elle esik=" + (/intervalDays >= MASTERED_DAYS|intervalDays >= 3/.test(liste) ? "VAR" : "yok"),
        "web familiar sabiti=" + ((kaynak.match(/FAMILIAR_DAYS = (\d+)/) ?? [])[1] ?? "yok"),
        "mobil familiar sabiti=" + ((mobVeri.match(/FAMILIAR_DAYS = (\d+)/) ?? [])[1] ?? "yok"),
        "web tekrar esigi=" + dueEsik(liste),
        "mobil tekrar esigi=" + dueEsik(mobVeri),
      ],
      [
        "kaynak bant sayisi=bes",
        "uc govdesi=kaynaktan",
        "liste etiketi=kaynaktan",
        "listede elle esik=yok",
        "web familiar sabiti=3",
        "mobil familiar sabiti=3",
        "web tekrar esigi=bugun+yarin+gun",
        "mobil tekrar esigi=bugun+yarin+gun",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 216. Gelisim ekrani: ad, ustalik kartinin hedefi ve sayi bicimi ──
   * Uc ayrisma birden:
   *
   * 1. EKRANIN ADI. Ayni ekran webde "Ilerlemem" (`progw.my_progress`,
   *    web-only sozlukte), Android'de "Gelisim" (`progress.progress`, TABAN
   *    sozlukte) diye yaziyordu. §11.102/§11.126 dokuz `prog.*`/`progw.*`
   *    kopyasini mobil kaynakli anahtarlara tasimisti; bu BIRI hayatta
   *    kalmisti, cunku cagriliyordu ve olu-anahtar kapisi yalniz cagrilmayani
   *    goruyor.
   * 2. USTALIK KARTININ HEDEFI. Android'de serit Kelimeler'e goturuyor
   *    (gerekcesi orada: "Kart hedefsiz duruyordu, satir da bagalamsizdi;
   *    ikisi birlesti"), webde tiklanamiyordu - hedef sekme cubugunda var ama
   *    karttan yol yoktu. Dokunulabilirligi SOYLEYEN chevron da yoktu.
   * 3. SAYI BICIMI. Web `formatNumber` ile bin ayraci koyuyor, mobil bu tek
   *    satirda ham sayi yaziyordu - oysa ayni dosyada baska alti yerde
   *    `formatNumber` geciyor. Rozet duvarinda ayni sinif zaten duzeltilmisti. */
  {
    const webIlerleme = sil(read("src/components/progress-view.tsx"));
    const webSayfa = sil(read("src/app/(app)/profile/progress/page.tsx"));
    const mobIlerleme = sil(read("mobile/src/screens/ProgressScreen.tsx"));
    const webSozluk = sil(read("src/i18n/web/tr.ts"));
    sameList(
      "Gelisim ekraninin adi ve ustalik karti",
      [
        "web baslik=" + (/titleMeta\("progress\.progress"\)/.test(webSayfa) ? "progress.progress" : "AYRI ANAHTAR"),
        "web geri dugmesi=" + (/title=\{t\("progress\.progress"\)\}/.test(webSayfa) ? "progress.progress" : "AYRI ANAHTAR"),
        "mobil baslik=" + (/t\("progress\.progress"\)/.test(mobIlerleme) ? "progress.progress" : "AYRI ANAHTAR"),
        "olu progw anahtari=" + (/"progw\./.test(webSozluk) ? "VAR" : "yok"),
        "web kart hedefi=" + (/<Link href="\/words" aria-label=\{t\("profile\.my_words"\)\}/.test(webIlerleme) ? "Kelimeler" : "YOK"),
        "mobil kart hedefi=" + (/nav\.navigate\("Words"\)[\s\S]{0,120}profile\.my_words/.test(mobIlerleme) ? "Kelimeler" : "YOK"),
        "web sayi bicimi=" + (/formatNumber\(mastered, lang\)/.test(webIlerleme) ? "yerelden" : "HAM"),
        "mobil sayi bicimi=" + (/formatNumber\(mastered\)/.test(mobIlerleme) ? "yerelden" : "HAM"),
      ],
      [
        "web baslik=progress.progress", "web geri dugmesi=progress.progress",
        "mobil baslik=progress.progress", "olu progw anahtari=yok",
        "web kart hedefi=Kelimeler", "mobil kart hedefi=Kelimeler",
        "web sayi bicimi=yerelden", "mobil sayi bicimi=yerelden",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 215. rozet duvari: yanit denetimi ve iskeletin duyurusu ─────────
   * Iki istemci de `/api/achievements`in govdesini KORU KORUNE kabul
   * etmiyor - cunku sayaci eksik bir yanitta ilerleme serigi `NaN%` genislik
   * alir ve sayac satiri `formatNumber(undefined)` yazar. Mobil ucunu birden
   * denetliyordu (`rows`, `total`, `unlockedCount`) ve yorumu "web de ayni
   * denetimi yapiyor" DIYORDU; web `unlockedCount`a bakmiyordu. Zorunlulugu
   * yazan cumle, olcen yok - bu turlarda tekrar eden sinif.
   *
   * Iskeletin DUYURUSU da olculuyor: web duvarinin iskeleti elle yazilmis tek
   * iskeletti ve `aria-busy` tasimiyordu (kalip `components/skeleton`
   * `SkeletonCard`ta var), mobilde kokte `accessibilityRole="progressbar"`
   * duruyor. */
  {
    const webDuvar = sil(read("src/components/achievement-wall.tsx"));
    const mobDuvar = sil(read("mobile/src/screens/AchievementsScreen.tsx"));
    const alan = (src, ad) => (new RegExp('typeof (?:data|d)\\.' + ad + ' === "number"').test(src) ? ad : "EKSIK " + ad);
    sameList(
      "rozet duvari yanit denetimi",
      [
        "web dizi=" + (/Array\.isArray\((?:data|d)\??\.rows\)/.test(webDuvar) ? "var" : "YOK"),
        "web " + alan(webDuvar, "total"),
        "web " + alan(webDuvar, "unlockedCount"),
        "mobil dizi=" + (/Array\.isArray\((?:data|d)\??\.rows\)/.test(mobDuvar) ? "var" : "YOK"),
        "mobil " + alan(mobDuvar, "total"),
        "mobil " + alan(mobDuvar, "unlockedCount"),
        "web iskelet duyurusu=" + (/aria-busy="true" aria-label=\{t\("achievements/.test(webDuvar) ? "var" : "YOK"),
        "mobil iskelet duyurusu=" + (/accessibilityRole="progressbar"/.test(sil(read("mobile/src/ui/Skeleton.tsx"))) ? "var" : "YOK"),
      ],
      [
        "web dizi=var", "web total", "web unlockedCount",
        "mobil dizi=var", "mobil total", "mobil unlockedCount",
        "web iskelet duyurusu=var", "mobil iskelet duyurusu=var",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 214. karar ile yukleme ayni dili okuyor mu ──────────────────────
   * Isinma (`first-words`) ve deneme yerlestirme (`placement-demo`) iceriginin
   * hangi ANA DIL - KURS paritesinde var oldugu veriden geliyor: `hasX(lang,
   * course)` onboarding'in "bu adimi gosterecek miyim" karari, `xFor(lang,
   * course, ...)` de yuklemesi. Ikisi AYNI dili okumak zorunda.
   *
   * Isinmada okumuyordu: web yuklemeyi `firstWordsFor("tr", ...)` diye SABIT
   * yaziyordu, karar ise gercek dili veriyordu. Bugun tek parite `tr-de`
   * oldugu icin fark gorunmuyor - ama `de-de` ya da `en-en` paritesi
   * yazildigi gun onboarding kullaniciyi isinmaya yollar, sayfa Turkce seti
   * yukler. Dogrudan `/first-words` adresine giren Almanca arayuzlu kullanici
   * bugun de Turkce karsilik goruyordu.
   *
   * Kardes yuzey (`demo-placement`) bastan beri dogruydu, yani bu bir tasarim
   * karari degil gozden kacmaydi. */
  {
    const dil = (ad, f, desen) => ad + "=" + (desen.test(sil(read(f))) ? "arayuzden" : "SABIT");
    sameList(
      "karar ile yukleme ayni dili okuyor",
      [
        dil("web isinma karari", "src/components/course-onboarding.tsx", /hasFirstWords\(lang, course\)/),
        dil("web isinma yuklemesi", "src/components/first-practice.tsx", /firstWordsFor\(lang,/),
        dil("web yerlestirme karari", "src/components/course-onboarding.tsx", /hasDemoPlacement\(lang, course\)/),
        dil("web yerlestirme yuklemesi", "src/components/placement/demo-placement.tsx", /demoPlacementFor\(lang,/),
        dil("mobil isinma karari", "mobile/src/screens/OnboardingScreen.tsx", /hasFirstWords\(currentLang\(\), course\)/),
        dil("mobil isinma yuklemesi", "mobile/src/screens/FirstPracticeScreen.tsx", /firstWordsFor\(currentLang\(\),/),
        dil("mobil yerlestirme karari", "mobile/src/screens/OnboardingScreen.tsx", /hasDemoPlacement\(lang, course\)/),
        dil("mobil yerlestirme yuklemesi", "mobile/src/screens/PlacementScreen.tsx", /demoPlacementFor\(currentLang\(\),/),
      ],
      [
        "web isinma karari=arayuzden", "web isinma yuklemesi=arayuzden",
        "web yerlestirme karari=arayuzden", "web yerlestirme yuklemesi=arayuzden",
        "mobil isinma karari=arayuzden", "mobil isinma yuklemesi=arayuzden",
        "mobil yerlestirme karari=arayuzden", "mobil yerlestirme yuklemesi=arayuzden",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 213. modul sinavinin kurs kontrolu: uc yolun hepsinde ───────────
   * Modul sinavi planlari Almanca yazilmis ve kurs boyutu YOK
   * (`hasModuleExams`, gerekcesi kendi dosyasinda: "Ingilizce ogrenen birinin
   * Patika'sinda Almanca baslikli modul sinavlari cikiyor ve actiginda
   * Almanca kagit geliyordu").
   *
   * Varsayimin adi var ama UC YOL var ve ucunde de uygulanmasi gerekiyor:
   * kapak ucu, modul listesi ve KAGIT URETIMI. Ilk ikisi uyguluyordu, ucuncu
   * uygulamiyordu - `/api/exam`a dogrudan `{action:"start", module: 3}`
   * gonderen bir Ingilizce kurs kullanicisi Almanca kagit aliyordu. Arayuzden
   * erisilmiyordu (iki istemci de listeyi bos aliyor), yani kusur
   * gorunmuyordu; adi olan bir varsayimin en onemli yerde uygulanmamasi tam
   * bu turlarda tekrar eden sinif.
   *
   * Mobil tarafta ayri bir kapi GEREKMIYOR ve bu da olculuyor: modul listesi
   * sunucudan geliyor (`/api/exam?level=`), yani kural tek yerde. */
  {
    const rota = sil(read("src/app/api/exam/route.ts"));
    const kapi = (ad, desen) => ad + "=" + (desen.test(rota) ? "var" : "YOK");
    const mobilPath = sil(read("mobile/src/screens/PathScreen.tsx"));
    sameList(
      "modul sinavi kurs kontrolu",
      [
        kapi("kapak", /hasModuleExams\(profile\.course \?\? "de"\) \? moduleExamPlan/),
        kapi("liste", /hasModuleExams\(listProfile\.course \?\? "de"\)/),
        kapi("kagit uretimi", /moduleNo !== null && !hasModuleExams\(profile\.course \?\? "de"\)/),
        "mobil liste kaynagi=" + (/api<[^>]*>\(`\/api\/exam\?level=/.test(mobilPath) ? "sunucu" : "KENDI KOPYASI"),
      ],
      ["kapak=var", "liste=var", "kagit uretimi=var", "mobil liste kaynagi=sunucu"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 212. sohbet balonunun bicimi: uc balon, iki platform ────────────
   * Uygulamada uc sohbet balonu var - koc balonu, ders balonlari ve rol yapma
   * sinavi - ve ucu de ayni sey: yaricap panel basamagi (mobil radii.lg = 20),
   * konusan tarafa bakan alt kose kucuk (chip = mobil radii.sm = 10).
   *
   * Oyle DEGILDI. Koc balonu mobilde kuyruk kosesini bastan beri yapiyordu,
   * ders ve rol yapma balonlarinin dort kosesi esitti; webde ucunde de kuyruk
   * vardi ama yaricaplar olcek disi Tailwind varsayilanlariydi (16 govde,
   * 4-6 kuyruk). Yani ayni uygulamada uc farkli balon bicimi vardi ve hicbiri
   * belgelenen olcege oturmuyordu.
   *
   * Kapi bicimi OLCUYOR: webde sinif adlari, mobilde borderRadius degerleri. */
  {
    const webBalon = (ad, f, kuyruk) => {
      const src = sil(read(f));
      const govde = /rounded-panel/.test(src) ? "panel" : "OLCEK DISI";
      const k = new RegExp("rounded-" + kuyruk + "-chip").test(src) ? "chip" : "OLCEK DISI";
      return ad + "=" + govde + "+" + k;
    };
    const mobBalon = (ad, f, kose) => {
      const src = sil(read(f));
      const govde = /borderRadius: radii\.lg/.test(src) ? "panel" : "OLCEK DISI";
      const k = new RegExp(kose + ": radii\\.sm").test(src) ? "chip" : "KUYRUK YOK";
      return ad + "=" + govde + "+" + k;
    };
    sameList(
      "sohbet balonunun bicimi",
      [
        webBalon("web koc", "src/components/coach-bubble.tsx", "bl"),
        webBalon("web ders", "src/components/lessons/lesson-player.tsx", "bl"),
        webBalon("web rol yapma", "src/components/lessons/roleplay-exam.tsx", "bl"),
        mobBalon("mobil koc", "mobile/src/ui/CoachBubble.tsx", "borderBottomLeftRadius"),
        mobBalon("mobil ders", "mobile/src/screens/LessonScreen.tsx", "borderBottomLeftRadius"),
        mobBalon("mobil rol yapma", "mobile/src/screens/RoleplayExamScreen.tsx", "borderBottomLeftRadius"),
      ],
      [
        "web koc=panel+chip",
        "web ders=panel+chip",
        "web rol yapma=panel+chip",
        "mobil koc=panel+chip",
        "mobil ders=panel+chip",
        "mobil rol yapma=panel+chip",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 211. rubrik gecme notu: alti cagri yeri ──────────────────────────
   * Serbest yazma ve monolog "dogru/yanlis" degil rubrikle olculuyor ve o tur
   * 60'ta gecilmis sayiliyor. Sayi alti yerde elle yaziliydi: webde iki
   * oynatici, mobilde dort yer (karar, puan rengi ve tavsiye satiri).
   *
   * Ikisi ayrissaydi ayni metin bir platformda gecmis, oburunde kalmis
   * sayilirdi - ve 11.313'un kusuruyla ayni sinif: karari sunucu degil iki
   * istemci ayri ayri veriyor. */
  {
    const cagri = (ad, f) => {
      const src = sil(read(f));
      /* Ad SINIRLI (`\b`): sade `/RUBRIC_PASS_PCT/` bir onek eslesmesi olurdu ve
         "kapilarda onek eslesmesi" kapisi bunu hemen yakaladi - `RUBRIC_PASS_PCT2`
         diye yeniden adlandirilan bir sabit hâlâ "var" sayilirdi. */
      return ad + "=" + (/\bRUBRIC_PASS_PCT\b/.test(src) ? (/>=\s*60\b|<\s*60\b/.test(src) ? "kaynaktan + ELLE ESIK" : "kaynaktan") : "elle yazili");
    };
    sameList(
      "rubrik gecme notu cagri yerleri",
      [
        "web sabit=" + ((sil(read("src/lib/score-bands.ts")).match(/RUBRIC_PASS_PCT = (\d+)/) ?? [])[1] ?? "yok"),
        "mobil sabit=" + ((sil(read("mobile/src/lib/learningRules.ts")).match(/RUBRIC_PASS_PCT = (\d+)/) ?? [])[1] ?? "yok"),
        cagri("web monolog", "src/components/skills/monologue-player.tsx"),
        cagri("web yazma", "src/components/skills/writing-player.tsx"),
        cagri("mobil kutuphane", "mobile/src/game/skillLibrary.tsx"),
        cagri("mobil yazma turu", "mobile/src/game/skillQuiz.tsx"),
      ],
      [
        "web sabit=60",
        "mobil sabit=60",
        "web monolog=kaynaktan",
        "web yazma=kaynaktan",
        "mobil kutuphane=kaynaktan",
        "mobil yazma turu=kaynaktan",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 210. beceri "bitti" esigi: sunucu, web ve mobil ─────────────────
   * Sunucu bir beceri egzersizini yalniz SON PUANI 70'i gecince bitmis
   * sayiyor (`lib/immersion/progress`: Patika kapisini da bununla aciyor).
   * Web ayni esigi uc yerde ayri ayri yazmisti, mobilde ise esik HIC YOKTU:
   * `markItemDone` egzersiz biter bitmez cagriliyordu ve `syncItemProgress`
   * sunucudan gelen her satiri puanina bakmadan kumeye katiyordu.
   *
   * Kullanicinin gordugu: %10 alan bir egzersiz Android'de yesil onayli,
   * "3/5 tamamlandi" sayacinin icinde ve Patika'nin beceri yuvasinda bitmis;
   * web'de ayni egzersiz hala "siradaki". Iki uygulama ayni hesabin ayni
   * ilerlemesini farkli okuyordu.
   *
   * Sayinin kendisi "ortak sayisal sabitler" kapisina dusuyor
   * (`SKILL_DONE_PCT` iki agacta ayni adla). Bu kapi CAGRI YERLERINI okuyor:
   * esitlik tek basina yetmez, karari veren karsilastirma sabiti kullanmiyorsa
   * baglanti kopuk kalir ve sayi yeniden ayrisir. */
  {
    const webKaynak = sil(read("src/lib/score-bands.ts"));
    const mobKaynak = sil(read("mobile/src/lib/learningRules.ts"));
    /* Cagri yeri = `isSkillDone(` gecen dosya. Elle yazilmis esik = ayni
       dosyada `>= 70` ya da `>= DONE_PCT` bicimi; ikisi birlikte olcum,
       cunku "kaynaktan okuyor" ile "kaynagi ice aliyor ama yine elle
       karsilastiriyor" ayri seylerdir. */
    const cagiriyor = (f) => (/isSkillDone\(/.test(sil(read(f))) ? "kaynaktan" : "elle yazili");
    const elleEsik = (f) => (/>=\s*(70|DONE_PCT)\b/.test(sil(read(f))) ? " + ELLE ESIK" : "");
    const yer = (ad, f) => ad + "=" + cagiriyor(f) + elleEsik(f);
    sameList(
      "beceri bitti esigi cagri yerleri",
      [
        "web sabit=" + ((webKaynak.match(/SKILL_DONE_PCT = (\d+)/) ?? [])[1] ?? "yok"),
        "mobil sabit=" + ((mobKaynak.match(/SKILL_DONE_PCT = (\d+)/) ?? [])[1] ?? "yok"),
        yer("sunucu kapisi", "src/lib/immersion/progress.ts"),
        yer("web liste", "src/app/(app)/skills/page.tsx"),
        yer("web oynatici", "src/app/(app)/immersion/skill/[id]/page.tsx"),
        yer("mobil sunucu birlesimi", "mobile/src/game/lessonProgress.ts"),
        yer("mobil oynatici", "mobile/src/screens/ItemScreen.tsx"),
      ],
      [
        "web sabit=70",
        "mobil sabit=70",
        "sunucu kapisi=kaynaktan",
        "web liste=kaynaktan",
        "web oynatici=kaynaktan",
        "mobil sunucu birlesimi=kaynaktan",
        "mobil oynatici=kaynaktan",
      ],
      "bulunan",
      "beklenen",
    );
  }


  /* 210'un ikinci yarisi: AYNI iki sayi (70 / 40) uygulamanin dort ayri
   * yerinde bir puani "iyi / orta / zayif" diye bantliyor - yazma kartinin
   * puan tonu, degerlendirme kartinin tonu, egzersiz sonucundaki maskot ve
   * konfeti. Dordu de elle yaziliydi; biri degistirilirse ayni puan iki
   * ekranda iki ayri renk alirdi.
   *
   * Kapi bandi HESAPLAYAN cagriyi ariyor: sabiti ice alip yine `>= 70`
   * yazmak baglantiyi kurmuyor. */
  {
    const bant = (ad, f) => {
      const src = sil(read(f));
      const kaynak = /scoreBand\(/.test(src);
      const elle = /(>=|<)\s*(70|40)\b/.test(src);
      return ad + "=" + (kaynak && !elle ? "kaynaktan" : kaynak ? "kaynaktan + ELLE ESIK" : "elle yazili");
    };
    sameList(
      "puan bandi cagri yerleri",
      [
        bant("web yazma karti", "src/components/writings-card.tsx"),
        bant("web degerlendirme karti", "src/components/feedback/assessment-card.tsx"),
        bant("web egzersiz sonucu", "src/components/skills/player-shell.tsx"),
        bant("mobil yazma listesi", "mobile/src/screens/WritingsScreen.tsx"),
        bant("mobil egzersiz sonucu", "mobile/src/screens/ItemScreen.tsx"),
      ],
      [
        "web yazma karti=kaynaktan",
        "web degerlendirme karti=kaynaktan",
        "web egzersiz sonucu=kaynaktan",
        "mobil yazma listesi=kaynaktan",
        "mobil egzersiz sonucu=kaynaktan",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 209. arma paleti: on iki renk cifti ─────────────────────────────
   * Arma rengi bir KIMLIK: "ayni kisi telefonda ve tarayicida ayni renkte
   * gorunmeli, yoksa listede tanidigin kisiyi renginden bulamazsin" - bunu
   * iki dosyanin yorumu da SOYLUYOR, olcen bir sey yoktu. Tam bu turlarda
   * tekrar tekrar cikan sinif: zorunlulugu yazan cumle.
   *
   * Renkler bilerek jetona bagli DEGIL (tema degistiginde kimlik degismesin),
   * o yuzden `check:colors` iki dosyayi da atliyor - yani ham hex'leri
   * karsilastiran baska bir kapi yoksa ayrisma hicbir yerden gorunmuyor.
   * Sira da onemli: secim kimligin hash'inden indeksle yapiliyor, cift
   * yerleri degisirse ayni kisi iki platformda AYRI renge duser. */
  {
    const ciftler = (f) => {
      const blok = govdeAl209(sil(read(f)));
      return [...blok.matchAll(/\["(#[0-9a-fA-F]{6})",\s*"(#[0-9a-fA-F]{6})"\]/g)]
        .map((m, i) => i + ":" + m[1].toLowerCase() + ">" + m[2].toLowerCase());
    };
    const web = ciftler("src/components/avatar.tsx");
    const mob = ciftler("mobile/src/ui/Avatar.tsx");
    /* Palet tablosunun govdesi: `PALETTE`ten kapanis parantezine kadar.
       Dosyanin tamamini taramak baska cift dizilerini de (desen tablolari,
       gradyanlar) icine alirdi. */
    sameList("arma paleti", mob.length ? mob : ["mobilde palet bulunamadi"], web.length ? web : ["webde palet bulunamadi"], "mobil", "web");
    sameList("arma paleti uzunlugu", ["cift=" + mob.length], ["cift=12"], "bulunan", "beklenen");
  }

  /* ── 208. ilerlemeye sayilan maddeler: sunucu ile iki istemci ─────────
   * Sunucu `total`a yalniz OYNANABILIR ve tamamlanabilir maddeleri katiyor
   * (`lib/immersion/state`: `completable = playable ∩ {lesson,read,listen,
   * write}`). Iki istemci ayni kumeyi suzuyordu ama `playable` sartini
   * ATLIYORDU.
   *
   * Ayrisma Ingilizce kursta CANLIYDI: seviye basina 25 unite × 2 okuma = 50
   * yuva var, havuzda 13 metin - yani yuvalarin cogu `ref: null`, oynanamaz.
   * Sunucu uniteyi bitmis sayip sonrakini aciyor, ekranda ise ilerleme
   * "5/10"da takili kaliyor ve unite bitmemis gorunuyordu. Kullanicinin
   * bildirdigi "13 madde ama x/10" sikayetinin bir kat altindaki sebep.
   *
   * Almancada havuzlar tam tamina yetiyor (25 × 2 = 50, havuz 50), o yuzden
   * orada ayni kusur GIZLI kaliyordu - iki kursu ayri olcmek gerekti.
   *
   * Kapi uc yerin AYNI uc turu ve `playable` sartini tasidigini okuyor. */
  {
    const sunucu = sil(read("src/lib/immersion/state.ts"));
    const webPane = sil(read("src/components/immersion/unit-pane.tsx"));
    const mobUnit = sil(read("mobile/src/screens/UnitScreen.tsx"));
    const turler = (src, ad) => {
      const blok = govdeAl(src, ad);
      if (!blok) return "counted yok";
      const k = ["lesson", "read", "listen", "write"].filter((t) => blok.includes(`"${t}"`));
      return k.join("+") || "tur yok";
    };
    /* GOVDE TAM ALINIYOR, PENCEREYLE DEGIL. Ilk yazim `ad`dan sonraki 420
       karakteri tariyordu ve web dosyasinda `counted`in HEMEN ARDINDAKI
       satirda da `playable` geciyor (acik maddeler suzgeci): enjeksiyon
       `i.playable &&`i sildigi hâlde kapi yesil kaldi. Olcum yine komsuyu
       olcuyordu - bu kez uc dakika once yazdigim kapida. */
    const govdeAl = (src, ad) => {
      const i = src.indexOf(ad);
      if (i < 0) return "";
      const j = src.indexOf("\n}", i);
      const k = src.indexOf(";", i);
      return src.slice(i, Math.min(...[j, k].filter((x) => x > i)) + 1);
    };
    const oynanabilir = (src, ad) => (/playable/.test(govdeAl(src, ad)) ? "var" : "YOK");
    sameList(
      "ilerlemeye sayilan maddeler",
      [
        "sunucu turler=" + (() => { const i = sunucu.indexOf("completable"); const b = sunucu.slice(i, i + 420);
          return ["lesson", "read", "listen", "write"].filter((t) => b.includes(`"${t}"`)).join("+"); })(),
        "sunucu oynanabilir=" + oynanabilir(sunucu, "completable"),
        "web turler=" + turler(webPane, "function counted"),
        "web oynanabilir=" + oynanabilir(webPane, "function counted"),
        "mobil turler=" + turler(mobUnit, "const counted"),
        "mobil oynanabilir=" + oynanabilir(mobUnit, "const counted"),
      ],
      [
        "sunucu turler=lesson+read+listen+write",
        "sunucu oynanabilir=var",
        "web turler=lesson+read+listen+write",
        "web oynanabilir=var",
        "mobil turler=lesson+read+listen+write",
        "mobil oynanabilir=var",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 207. hesap silmede magaza uyarisi ───────────────────────────────
   * "Hesabi silmek aboneligi durdurmaz" cumlesi uc ayri metin ister, cunku
   * iptal YOLU magazaya gore degisiyor (Play Store > Odemeler ve abonelikler
   * / Ayarlar > Apple Hesabi > Abonelikler). Yanlisini gostermek kullaniciyi
   * hic var olmayan bir ekrana yolluyor.
   *
   * Webde metin "Google Play" diyordu: aboneligi App Store'dan alan biri de
   * hesabini webden silebiliyor ve web hangi magaza oldugunu BILMIYOR. Oraya
   * magaza adi yazmayan ucuncu bir metin kondu.
   *
   * KAPI YAZILMASININ SEBEBI BIR OLCUM HATASI. Ilk taramada "mobilde magaza
   * uyarisi yok" sonucuna varmistim; oysa vardi - cagri
   * `tx(Platform.OS === "ios" ? "a" : "b")` bicimindeydi ve anahtar cikaran
   * desenim KOSULLU cagriyi gormuyordu. Kapi bu yuzden anahtarlari tek tek,
   * dogru yuzeyde ariyor. */
  {
    const webSil = sil(read("src/components/account-delete-form.tsx"));
    const mobSil = sil(read("mobile/src/screens/DeleteAccountScreen.tsx"));
    sameList(
      "hesap silmede magaza uyarisi",
      [
        "web=" + (/subscription_cancel_store/.test(webSil) ? "magaza adsiz" : /subscription_cancel_(play|appstore)/.test(webSil) ? "TEK MAGAZA ADI" : "YOK"),
        "mobil android=" + (/subscription_cancel_play/.test(mobSil) ? "var" : "YOK"),
        "mobil ios=" + (/subscription_cancel_appstore/.test(mobSil) ? "var" : "YOK"),
        "mobil platforma bagli=" + (/Platform\.OS === "ios" \? "deleteaccount\.subscription_cancel_appstore"/.test(mobSil) ? "evet" : "HAYIR"),
      ],
      ["web=magaza adsiz", "mobil android=var", "mobil ios=var", "mobil platforma bagli=evet"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 206. saglayici katalogundaki env anahtarlari ornekte yazili mi ──
   * `.env.example` operatorun TEK kesif yolu: AGENTS.md uc env dosyasinin
   * ayni anahtar kumesini tasimasini sart kosuyor ve kume oradan cikiyor.
   * Sohbet/STT saglayici katalogu ise anahtar adlarini KENDI ICINDE tutuyor
   * (`envKey`, `envModel`, `sttEnvModel`) ve onlari `process.env[cfg.x]` diye
   * HESAPLI okuyor.
   *
   * Hesapli okuma, "kodda gecen env anahtarlari" taramasindan KACIYOR: duz
   * `process.env.AD` arayan bir tarama bu sekizini hic gormuyor. Nitekim
   * `MISTRAL_STT_MODEL` katalogda adi geciyor ve okunuyordu ama ucunun de
   * disindaydi - operator Groq'un STT modelini ezebiliyor, Mistral'inkini
   * ezebilecegini HIC ogrenemiyordu.
   *
   * Kapi listeyi kataloktan cikarip ornekte ariyor: yeni bir saglayici
   * eklendiginde anahtarlari da belgelensin. */
  {
    const katalog = read("src/lib/chat-providers.ts");
    const ornek = read(".env.example");
    const anahtarlar = [...katalog.matchAll(/(?:envKey|envModel|sttEnvModel):\s*"([A-Z0-9_]+)"/g)].map((m) => m[1]);
    const ornekAd = new Set([...ornek.matchAll(/^\s*([A-Z][A-Z0-9_]*)\s*=/gm)].map((m) => m[1]));
    const eksik = anahtarlar.filter((k) => !ornekAd.has(k));
    sameList(
      "katalog env anahtarlari ornekte",
      eksik.length ? eksik : ["hepsi yazili (" + anahtarlar.length + ")"],
      ["hepsi yazili (" + anahtarlar.length + ")"],
      "ornekte olmayan",
      "beklenen",
    );
  }

  /* ── 205. derin baglanti: iddia edilen yol ile karsilanan yol ────────
   * Ayni liste UC yerde yazili: iOS beyani (`APP_LINK_PATHS`), Android
   * manifestosu (`intent-filter` `android:path`) ve uygulamanin kendisi
   * (`lib/deepLink` `parseDeepLink`). Ucu ayrisabilir ve iki yonu de kotudur:
   *
   *   - IDDIA EDILIP KARSILANMAYAN yol: baglanti uygulamayi ACAR ve kullanici
   *     bos ekranda kalir. Iki dosyanin da yorumu bunu yaziyor.
   *   - KARSILANIP IDDIA EDILMEYEN yol: baglanti tarayicida acilir, uygulama
   *     hic haberdar olmaz. `/auth/app` tam boyleydi - Android hem iddia
   *     ediyor hem karsiliyordu, iOS beyani ise iki yolda kalmisti. Sonucu:
   *     Apple'in yerel girisinin desteklenmedigi bir iOS surumunde akis
   *     tarayiciya dusuyor, donus baglantisi uygulamayi acmiyor ve uc dakika
   *     yasayan token oluyor - kullanici uygulamada hâlâ girmemis.
   *
   * Manifestonun yorumu da "iki yol" diyordu ve ucuncusu eklendiginde geride
   * kalmisti: zorunlulugu yazan cumlenin bayatlamasi, bu defterin en sik
   * tekrar eden sinifi. */
  {
    const aasa = read("src/app/.well-known/apple-app-site-association/route.ts");
    const manifest = read("mobile/android/app/src/main/AndroidManifest.xml");
    const derin = sil(read("mobile/src/lib/deepLink.ts"));

    const beyan = [...(aasa.match(/APP_LINK_PATHS = \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]).sort();
    const iddia = [...manifest.matchAll(/android:path="([^"]+)"/g)].map((m) => m[1]).sort();
    /* Karsilanan yollar: `parseDeepLink` icindeki yol karsilastirmalari. */
    const karsilanan = [...derin.matchAll(/(?:pathname === |startsWith\()"([^"]+)"/g)].map((m) => m[1]).sort();

    sameList("derin baglanti yollari (iOS beyani / Android manifestosu)", beyan, iddia, "iOS", "Android");
    sameList("derin baglanti yollari (beyan / karsilanan)", beyan, karsilanan, "beyan", "parseDeepLink");
  }

  /* ── 204. DURUM SATIRI duyuruluyor mu (yuzey taramasi) ───────────────
   * §154'un kardesi: orada "secili durum", burada "bir eylemin cevabi".
   * Bir islemden sonra YERINDE beliren metin (hata, "kaydedildi", "puan
   * verilemedi") yalniz GORSEL bir degisiklikse, odagi dugmede kalan ekran
   * okuyucu kullanicisi hicbir sey duymaz - dugmeye bastigini ama bir sey
   * olmadigini saniyor.
   *
   * Tarama neden bu kadar DAR: elle bakarken uc yanlis alarm cikti ve ucu de
   * ogreticiydi - (1) web `AuthNotice` duyuruyu KOKTE tasiyor ve rol hesaplı
   * (`role={tone === "error" ? "alert" : "status"}`), duz `role="status"`
   * arayan bir desen onu gormuyor; (2) `notification-settings` iyimser yazip
   * hatayi BILEREK yutuyor, duyurulacak bir sey yok; (3) duyuru cogu zaman
   * ortak bir cocuk bilesende. Yani "duyuru var mi" sorusu dosya duzeyinde
   * sorulamaz. Kural bu yuzden yalniz ADI BELLI durum degiskenlerinin
   * (`msg`, `error`, `saveError`, `note`, `failNote`) DOGRUDAN bir metin
   * etiketine kosullu baglandigi yerleri tariyor; ortak bilesenden gecenler
   * zaten deseni tutturmuyor ve listeye girmiyor.
   *
   * Bulundugunda uc yer sessizdi ve ucu de mobildeydi (web karsiliklarinin
   * hepsi duyuruyordu): hesap silme hatasi, satin alma hatasi ve beceri
   * quizinin "puan verilemedi" notu. Ilki en agiri - yok etme akisinda
   * "parola yanlis" diyen bir satir. */
  {
    const strip5 = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
    const walkTsx5 = (d, out = []) => {
      for (const e of readdirSync(new URL("../" + d, import.meta.url), { withFileTypes: true })) {
        const p = d + "/" + e.name;
        if (e.isDirectory()) { if (!/node_modules|__tests__|\/i18n|\/admin/.test("/" + p)) walkTsx5(p, out); }
        else if (/\.tsx$/.test(e.name)) out.push(p);
      }
      return out;
    };
    const sessiz = [];
    for (const [kok, etiket, duyuru] of [
      ["mobile/src", "<Text", /accessibilityLiveRegion/],
      ["src/components", "<p", /role=|aria-live/],
    ]) {
      const re = new RegExp("\\{\\s*(?:msg|error|saveError|note|failNote)\\s*(?:\\?|&&)\\s*" + etiket + "\\b[\\s\\S]{0,400}?[^=]>", "g");
      for (const f of walkTsx5(kok)) {
        const src = strip5(read(f));
        for (const m of src.matchAll(re)) {
          if (duyuru.test(m[0])) continue;
          sessiz.push(f.split("/").pop() + ": " + m[0].replace(/\s+/g, " ").slice(0, 40));
        }
      }
    }
    sameList("durum satiri duyurusu", sessiz.length ? sessiz : ["yok"], ["yok"], "sessiz satir", "beklenen");
  }

  /* ── 203. gunun turu siralamasinda madalya ───────────────────────────
   * Mobil ilk uce dolu daire + beyaz rakam veriyor ve rengi ORTAK kademe
   * olceginden (`TIER_COLOR`) okuyor; webde madalya HIC yoktu, ilk uc
   * dorduncuden ayirt edilemiyordu.
   *
   * Bu, defterde ikinci kez ayni yonde cikan bir fark: mobil tarafta
   * duzeltilmis (orada yorumda "ayni cakisma rozet ekraninda duzeltilmisti
   * ama burasi gozden kacmisti" yaziyor) ama webe hic ulasmamis. Renk
   * secimi de rastgele degil, mobil tarafta OLCULMUS: madalya rengini yaziya
   * vermek acik temada okunmuyor (altin 2.88, gumus 2.56, bronz 3.09; esik
   * 4.5), dolu zemin + beyaz icerik ucunde de esigi geciyor.
   *
   * Kapi ucunu de mutlak olcutle tutuyor: iki tarafta da kural var mi, ikisi
   * de ortak olcekten mi okuyor, ve kural AYNI mi (ilk uc, sonrasi yok). */
  {
    const webGun = sil(read("src/components/daily-player.tsx"));
    const mobGun = sil(read("mobile/src/screens/DailyScreen.tsx"));
    const kural = (src) => {
      const i = src.indexOf("function medalColor");
      return i < 0 ? "" : src.slice(i, src.indexOf("\n}", i)).replace(/\s+/g, " ").trim();
    };
    const beklenen = "function medalColor(rank: number): string | null { return rank === 1 ? TIER_COLOR.gold : rank === 2 ? TIER_COLOR.silver : rank === 3 ? TIER_COLOR.bronze : null;";
    sameList(
      "siralama madalyasi",
      [
        "web kural=" + (kural(webGun) === beklenen ? "ayni" : kural(webGun) ? "FARKLI" : "YOK"),
        "mobil kural=" + (kural(mobGun) === beklenen ? "ayni" : kural(mobGun) ? "FARKLI" : "YOK"),
        /* Dolu zemin + beyaz icerik: rengi yaziya vermek okunmuyor. */
        "web dolu zemin=" + (/rounded-full[^"]*text-white/.test(webGun) ? "var" : "YOK"),
        "mobil dolu zemin=" + (/borderRadius: 13[\s\S]{0,120}backgroundColor: mc/.test(mobGun) ? "var" : "YOK"),
      ],
      ["web kural=ayni", "mobil kural=ayni", "web dolu zemin=var", "mobil dolu zemin=var"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 202. tohumlu mu, rastgele mi ────────────────────────────────────
   * §201'den cikan soru: KALAN secimler hangi tarafta tohumlu, hangi tarafta
   * rastgele? Tarama uc sonuc verdi.
   *
   *   a) Harf bulmacasi AYRISIKTI. Web turun kimligiyle tohumluyor
   *      (`games/scramble-game` `makePool(word.de, round.id)`), mobil
   *      `Math.random()` kullaniyordu. Iki sonucu vardi: ayni tur iki
   *      platformda farkli bulmaca oluyordu, VE mobilde ekran yeniden
   *      kuruldugunda harfler yerinden oynuyordu - mobilin KENDI
   *      `lib/shuffle` dosyasinin basinda tam bu sebep yazili. Duzeltildi.
   *   b) Eslestirme oyunu iki tarafta da RASTGELE ve bu bilincli: her
   *      acilista baska sira isteniyor. Parite var; kapinin bunu bilmesi
   *      gerekiyor, yoksa sonraki tarama onu "eksik tohum" sanip bozar.
   *   c) Cesaret cumlesi iki tarafta da rastgele secilyor - ayni gerekce.
   *
   * Olcut mutlak: her yuzey icin BEKLENEN yontem yazili. "Iki taraf da ayni"
   * diye sormak yetmez - ikisi birden rastgeleye donerse karsilastirma yine
   * yesil kalirdi. */
  {
    const mobTur = sil(read("mobile/src/game/rounds.tsx"));
    const webBulmaca = sil(read("src/components/games/scramble-game.tsx"));
    const webEslestirme = sil(read("src/components/games/match-game.tsx"));
    const govde = (src, ad) => {
      const i = src.indexOf("function " + ad);
      return i < 0 ? "" : src.slice(i, src.indexOf("\n}", i));
    };
    sameList(
      "tohumlu secim yontemleri",
      [
        "web bulmaca=" + (/seededShuffle\(/.test(govde(webBulmaca, "makePool")) ? "tohumlu" : "rastgele"),
        "mobil bulmaca=" + (/seededShuffle\(/.test(govde(mobTur, "ScrambleRound")) ? "tohumlu" : "rastgele"),
        "mobil bulmaca tohumu=" + (/round\.id\)/.test(govde(mobTur, "ScrambleRound")) ? "tur kimligi" : "BASKA"),
        /* Bilerek rastgele olanlar: donuslerse de gorunsun. */
        "web eslestirme=" + (/shuffle\(words\.map/.test(webEslestirme) ? "rastgele" : "DEGISTI"),
        "mobil eslestirme=" + (/Math\.random\(\)/.test(govde(mobTur, "MatchRound")) ? "rastgele" : "DEGISTI"),
      ],
      ["web bulmaca=tohumlu", "mobil bulmaca=tohumlu", "mobil bulmaca tohumu=tur kimligi", "web eslestirme=rastgele", "mobil eslestirme=rastgele"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 201. gramer sorularinin secimi ──────────────────────────────────
   * `deriveGrammar` iki tarafta ayni kurali uyguluyordu ama SECIMI yapan
   * karistirma ayni degildi. Mobil dosyanin icinde `seededOrder` diye ayri
   * bir uygulama duruyordu; yorumu "web'deki seededShuffle ile ayni amac"
   * diyordu - amac ayniydi, algoritma degil. Ikisi de FNV-1a ile tohumluyor
   * ama kopya xorshift + `Math.abs(h) % (i+1)`, web (ve mobilin KENDI
   * `lib/shuffle`i) mulberry32 + `Math.floor(rand() * (i+1))` kullaniyordu.
   *
   * Sira farki masum degil: hukum sayisi yaridan coksa dilimleme SECIMI de
   * degistiriyor. Dokuz hukum ve dort secim ile olculdu - ornek unitelerin
   * hepsinde iki platform FARKLI soru kumesi seciyordu.
   *
   * Ikinci ayrisma tohumun kendisindeydi: mobil `de-` onekini SABIT
   * yaziyordu, yani Ingilizce kursta webin tohumundan (`${kurs}-...`) farkli
   * bir dizi uretiyordu.
   *
   * Kapi ucunu de mutlak olcutle tutuyor: paylasilan karistirma kullaniliyor
   * mu, dosyada ayri bir kopya kalmis mi, ve tohum kursu tasiyor mu. */
  {
    const mob = sil(read("mobile/src/game/immersionQuiz.ts"));
    const web = sil(read("src/lib/immersion/grammar.ts"));
    sameList(
      "gramer sorulari ayni siradan",
      [
        "mobil karistirma=" + (/seededShuffle\(judges,/.test(mob) && /seededShuffle\(orders,/.test(mob) ? "paylasilan" : "AYRI KOPYA"),
        "mobil kopya kalmis mi=" + (/function seededOrder/.test(mob) ? "EVET" : "hayir"),
        "web karistirma=" + (/seededShuffle\(judges,/.test(web) && /seededShuffle\(orders,/.test(web) ? "paylasilan" : "AYRI KOPYA"),
        "mobil tohum kursu tasiyor=" + (/`\$\{currentCourseId\(\)\}-\$\{String\(level\)\.toLowerCase\(\)\}-u\$\{String\(unitIndex\)\.padStart\(2, "0"\)\}`/.test(mob) ? "evet" : "HAYIR"),
        /* Hukum/dizme oraninin da ayni kalmasi gerek: biri yariyi, oteki
           ucte biri alsaydi ayni unitede farkli agirlik olurdu. */
        "mobil oran=" + ((mob.match(/Math\.ceil\(count \/ (\d+)\)/) ?? [])[1] ?? "yok"),
        "web oran=" + ((web.match(/Math\.ceil\(count \/ (\d+)\)/) ?? [])[1] ?? "yok"),
      ],
      [
        "mobil karistirma=paylasilan",
        "mobil kopya kalmis mi=hayir",
        "web karistirma=paylasilan",
        "mobil tohum kursu tasiyor=evet",
        "mobil oran=2",
        "web oran=2",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 200. unite quizinde tekrar sorulari ─────────────────────────────
   * Webin `deriveQuiz`i sorularin ucte birini ONCEKI unitelerden secip kendi
   * sorularinin arasina serpiyor (`pickReview` + `interleave`); mobilde bu
   * mekanizma HIC yoktu. Android ogrencisi unite quizinde yalniz o unitenin
   * kelimelerini goruyordu - ayni ekran, ayni icerik, farkli ogretim.
   *
   * Ayrisma bir sayida ya da bir metinde degil, bir MEKANIZMANIN yoklugunda
   * duruyordu; hicbir kapi "orada olmayan seyi" aramiyordu. §11.292'nin
   * dersinin devami: sabitleri karsilastirmak, o sabitleri kullanan hesabi
   * korumuyor - ve hesabin KENDISI bir tarafta hic yoksa karsilastirilacak
   * sayi da yok.
   *
   * Secim mantigi birebir ayni tasindi (asal carpan 37, `take` carpani 13,
   * adim ve guard dahil), o yuzden govdeler satir satir karsilastirilabiliyor.
   * Cagri yerleri ayri olcut: havuz gecilmezse islev sessizce eski davranisa
   * duser ve govde karsilastirmasi yesil kalir. */
  {
    const govde = (p, ad) => {
      const src = sil(read(p));
      const i = src.indexOf("function " + ad);
      if (i < 0) return ["bulunamadi: " + ad + " @ " + p];
      return src
        .slice(i, src.indexOf("\n}", i))
        .split("\n")
        .map((l) => l.trim().replace(/\s+/g, " "))
        .filter(Boolean);
    };
    sameList("tekrar secimi govdesi", govde("mobile/src/game/immersionQuiz.ts", "pickReview"), govde("src/lib/immersion/quiz.ts", "pickReview"));
    sameList("tekrar serpistirme govdesi", govde("mobile/src/game/immersionQuiz.ts", "interleave"), govde("src/lib/immersion/quiz.ts", "interleave"));

    const mobEkran = sil(read("mobile/src/screens/QuizScreen.tsx"));
    const webSayfa = sil(read("src/app/(app)/immersion/quiz/[unit]/page.tsx"));
    const mobQuiz = sil(read("mobile/src/game/immersionQuiz.ts"));
    sameList(
      "tekrar havuzu cagri yerleri",
      [
        "mobil havuz=" + (/earlierPool\(params\.level, params\.unitIndex\)/.test(mobEkran) ? "geciyor" : "GECMIYOR"),
        "web havuz=" + (/const earlier = briefs\.filter\(\(b\) => b\.index < brief\.index\)/.test(webSayfa) ? "kuruyor" : "KURMUYOR"),
        "mobil karistirma=" + (/interleave\(own, back\)/.test(mobQuiz) ? "var" : "YOK"),
        /* Aciklama nereden geldigini soyluyor; anahtar ORTAK sozlukte olmali
           (once yalniz webde `quizw.` onekiyle duruyordu). */
        "ortak anahtar=" + (/quiz\.from_earlier/.test(mobQuiz) && /quiz\.from_earlier/.test(webSayfa) ? "iki tarafta" : "AYRISIK"),
        /* ORAN da olculmeli. Ilk yazimda yalniz `pickReview` ve `interleave`
           govdeleri karsilastiriliyordu; oysa "sorularin kaci tekrar" karari
           `deriveQuiz` icinde ve iki govdenin de disinda. Enjeksiyon bunu
           gosterdi: webde `count / 3` yerine `count / 4` yazmak butun kapilari
           yesil birakiyordu. Mutlak olcut, cunku iki taraf birlikte
           degistirilebilir. */
        "mobil oran=" + ((sil(read("mobile/src/game/immersionQuiz.ts")).match(/pickReview\(brief, review, Math\.floor\(count \/ (\d+)\)\)/) ?? [])[1] ?? "yok"),
        "web oran=" + ((sil(read("src/lib/immersion/quiz.ts")).match(/pickReview\(brief, review, Math\.floor\(count \/ (\d+)\)\)/) ?? [])[1] ?? "yok"),
      ],
      ["mobil havuz=geciyor", "web havuz=kuruyor", "mobil karistirma=var", "ortak anahtar=iki tarafta", "mobil oran=3", "web oran=3"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 199. bosluksuz katlama: "karsiligidir" diyen yorum yanlisti ─────
   * Webin `foldTight`i basinda "mobil `lib/textFold` `foldTight`" yaziyordu
   * ama KARSILIGI DEGILDI: mobil tarafta `foldTight` `foldCompare` uzerine
   * kuruluyor (umlaut katlamasi + SAYI katlamasi), webde ise yalniz
   * `normalize` vardi. Yani ayni cevap iki platformda farkli yargilaniyordu -
   * "Fuesse" ya da "5" yazan Android'de yedek gecisi geciyor, webde
   * gecemiyordu. On uc ornekle olculdu: yedisinde ayrisiyordu.
   *
   * `foldTight` YEDEK gecis: tam eslesme tutmayinca bosluksuz karsilastirma
   * deneniyor. Yani ayrisma "cevap yanlis sayildi" diye gorunuyor, bir hata
   * gibi degil.
   *
   * Kapi govdeleri karsilastirmiyor (yapilar farkli: web `normalize`,
   * mobil `foldCompare`), her tarafi MUTLAK olcute bagliyor: iki katlama da
   * hem harf katlamasindan hem sayi katlamasindan gecmeli. */
  {
    const webT = sil(read("src/components/games/types.ts"));
    const mobT = sil(read("mobile/src/lib/textFold.ts"));
    const webT2 = sil(read("src/components/skills/quiz.tsx"));
    const mobT2 = sil(read("mobile/src/game/skillQuiz.tsx"));
    const govde = (src, ad) => {
      const i = src.indexOf("function " + ad);
      return i < 0 ? "" : src.slice(i, src.indexOf("\n}", i));
    };
    sameList(
      "bosluksuz katlama ayni hatti izliyor",
      [
        /* Webin tabani artik `foldCompare` (mobildeki adla ayni); `foldTight`
           ona DELEGE ediyor. Olcum tabana bakmali - yoksa delegasyon eklenince
           iki satir birden "YOK" der ve kapi yanlis yerden kirmizi verir. */
        "web taban harf=" + (/foldCase\(normalize\(/.test(govde(webT, "foldCompare")) ? "var" : "YOK"),
        "web taban sayi=" + (/foldNumbers\(/.test(govde(webT, "foldCompare")) ? "var" : "YOK"),
        "web bosluksuz tabandan=" + (/return foldCompare\(s, lang\)\.replace/.test(govde(webT, "foldTight")) ? "evet" : "HAYIR"),
        "mobil taban=" + (/foldCompare\(/.test(govde(mobT, "foldTight")) ? "var" : "YOK"),
        "mobil taban harf=" + (/foldCase\(/.test(govde(mobT, "foldCompare")) ? "var" : "YOK"),
        "mobil taban sayi=" + (/foldNumbers\(/.test(govde(mobT, "foldCompare")) ? "var" : "YOK"),
        /* Harf katlamasi ayni cifti kullanmali: biri "ue" oteki "u" yazsaydi
           "schön" ile "schon" karisirdi (webin kendi yorumunun uyardigi sey). */
        /* Beceri egzersizinin yazili cevap kabulu de ORTAK katlamadan
           gecmeli. Web kendi zincirini yaziyordu: sabit `de-DE` kucultme,
           kosulsuz umlaut katlamasi ve SAYI katlamasi YOK - yani "two" ile
           "2" mobilde kabul ediliyor, webde edilmiyordu. Mobil bu duzeltmeyi
           coktan yapmisti; kapi ikisini birden tutuyor. */
        "web beceri katlamasi=" + (/return foldCompare\(s\)/.test(govde(webT2, "fold")) ? "ortak" : "kendi zinciri"),
        "mobil beceri katlamasi=" + (/return foldCompare\(s, currentTargetLang\(\)\)/.test(govde(mobT2, "fold")) ? "ortak" : "kendi zinciri"),
        "harf tablosu=" + (
          /ß\/g, "ss"[\s\S]{0,80}ä\/g, "ae"[\s\S]{0,80}ö\/g, "oe"[\s\S]{0,80}ü\/g, "ue"/.test(govde(webT, "foldCase"))
          && /ß\/g, "ss"[\s\S]{0,80}ä\/g, "ae"[\s\S]{0,80}ö\/g, "oe"[\s\S]{0,80}ü\/g, "ue"/.test(govde(mobT, "foldCase"))
            ? "ayni" : "AYRISIK"
        ),
      ],
      [
        "web taban harf=var",
        "web taban sayi=var",
        "web bosluksuz tabandan=evet",
        "mobil taban=var",
        "mobil taban harf=var",
        "mobil taban sayi=var",
        "web beceri katlamasi=ortak",
        "mobil beceri katlamasi=ortak",
        "harf tablosu=ayni",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 198. gunun turunun puan formulu ─────────────────────────────────
   * Iki dosyanin da yorumu "formul ayni" diyordu (`game/daily`: "web'deki
   * lib/daily-score ile AYNI (ekranla tablo ayrismasin)"; `lib/daily-score`:
   * "iki kopya formul, ekranda gorunen puanla tabloya yazilanin ayrismasi
   * demekti"). Yani gerekcesi de, sonucu da yaziliydi - olcen bir sey yoktu.
   *
   * Sabitler zaten korunuyordu ("ortak sayisal sabitler" bes sayiyi da
   * goruyor, enjeksiyonla dogrulandi) ama GOVDE korunmuyordu: mobilde
   * `combo >= 3` yerine `combo >= 2` yazmak butun kapilari yesil birakiyordu.
   * Kullanicinin gordugu sey sudur - tur boyunca ekranda bir puan birikiyor,
   * gun sonunda tabloda baska bir sayi yaziyor.
   *
   * Karsilastirma §16'nin kalibi: govde satir satir, yorumlar ayiklanarak
   * (iki taraf kendi hikayesini anlatiyor) ve bosluk teklenerek. */
  {
    const govde = (p, ad) => {
      const src = sil(read(p));
      const i = src.indexOf("export function " + ad);
      if (i < 0) return ["bulunamadi: " + ad + " @ " + p];
      const j = src.indexOf("\n}", i);
      return src
        .slice(i, j)
        .split("\n")
        .map((l) => l.trim().replace(/\s+/g, " "))
        .filter(Boolean);
    };
    sameList(
      "gunun turu puan formulu",
      govde("mobile/src/game/daily.ts", "scoreAnswer"),
      govde("src/lib/daily-score.ts", "scoreAnswer"),
    );
  }

  /* ── 197. degerlendirme bekleme tavanlari ────────────────────────────
   * Ayni cevap iki platformda FARKLI noktada "zaman asimi" oluyordu:
   *
   *   tek cevap   web 20000 (`ASSESS_TIMEOUT_MS`)   mobil 25000 (genel tavan)
   *   rol yapma   web 20000 (varsayilan)            mobil 30000 (elle)
   *   ceviri onay web 6000 (`ASSESS_WAIT_MS`)       mobil 6000 (ayni ad)
   *
   * Ucuncu satir zaten esti ve sebebi ogretici: iki taraf da sayiyi AYNI ADLA
   * yaziyordu, o yuzden ortak sabit taramasi onu koruyordu. Ilk ikisi adsizdi
   * (biri genel tavana dusuyor, oteki cagri yerinde elle yazili) ve kimse
   * bakmiyordu.
   *
   * Rol yapma tavani BILEREK daha uzun: konusmanin tamami gonderiliyor, tek
   * cumle degil. Fark artik iki tarafta AYNI adla yazili; webin varsayilanla
   * yetinmesi bir riskti - uzun bir konusma webde zaman asimina duserken
   * mobilde puanlaniyordu.
   *
   * Kapi sayilari degil CAGRI YERLERINI okuyor: sayilar zaten "ortak sayisal
   * sabitler"de karsilastiriliyor (alt cizgi kalktigi icin; `20_000` o
   * taramaya girmiyordu). Burada sorulan sey, yuzeylerin o sabiti gercekten
   * geciriyor mu oldugu.
   *
   * `game/skillLibrary` LISTEDE YOK: baska bir oturumun surmekte olan isi
   * (henuz git'te degil). Yayina girdiginde bu listeye eklenmeli. */
  {
    const YUZEYLER = [
      ["mobile/src/screens/ExamScreen.tsx", /timeoutMs: ASSESS_TIMEOUT_MS/],
      ["mobile/src/game/rounds.tsx", /timeoutMs: ASSESS_TIMEOUT_MS/],
      ["mobile/src/game/skillQuiz.tsx", /timeoutMs: ASSESS_TIMEOUT_MS/],
      ["mobile/src/screens/RoleplayExamScreen.tsx", /timeoutMs: ASSESS_ROLEPLAY_TIMEOUT_MS/],
      ["src/components/lessons/roleplay-exam.tsx", /timeoutMs: ASSESS_ROLEPLAY_TIMEOUT_MS/],
    ];
    const bulgu = YUZEYLER.map(([yol, re]) => {
      const src = sil(read(yol));
      const ad = yol.split("/").slice(-1)[0] + (yol.startsWith("mobile") ? " (mobil)" : " (web)");
      /* Elle yazilmis bir tavan kalmamali: sabit geciliyor gorunurken baska
         bir cagri rakamla kalabilir. */
      const elle = /timeoutMs: \d/.test(src);
      return ad + "=" + (elle ? "ELLE YAZILI" : re.test(src) ? "sabitten" : "GECMIYOR");
    });
    sameList(
      "degerlendirme tavani cagri yerleri",
      bulgu,
      YUZEYLER.map(([yol]) => yol.split("/").slice(-1)[0] + (yol.startsWith("mobile") ? " (mobil)" : " (web)") + "=sabitten"),
      "bulunan",
      "beklenen",
    );
  }

  /* ── 196. konusma pencereleri: hangisi bilincli fark, hangisi ayrisma ──
   * Iki platformun mikrofon sureleri tek tek eslendi. Cikan tablo:
   *
   *   yuruyus cevabi   web ANSWER_WINDOW_MS 8000    mobil ayni ad, ayni sayi
   *   yuruyus onayi    web CONFIRM_SILENCE_MS 7000  mobil ayni ad, ayni sayi
   *   ders             web SILENCE_MS 12000         mobil LISTEN_CEILING_MS
   *   seviye sinavi    web SPEAK_MAX_MS 12000       mobil ayni ad (bkz. 195)
   *
   * Yuruyus ikilisi zaten ayniydi ama mobilde ADSIZ birer rakamdi; ad
   * verilince "ortak sayisal sabitler" kapisi onlari kendiliginden
   * karsilastiriyor (enjeksiyonla dogrulandi).
   *
   * Ders satiri ayri yazildi cunku SAYI ayni olmali, AD olmamali: webde sayac
   * yalniz kendiliginden acilan mikrofon icin isliyor (kullanici kendi
   * dokunduysa sinir yok), mobilde ise her durumda ust sinir. Ayni ada
   * zorlamak yanlis olurdu; esitligi mutlak olcut tutuyor. Mobil 8000'di ve
   * gerekcesi yaziliydi degil - dort saniyelik fark ogrenciyi cumlesini
   * kurarken kesiyordu. Gercek bitis karari zaten sayiya bakmiyor:
   * `listenOnce` konusma durduktan ~800 ms sonra donuyor.
   *
   * Rol yapma sinavi BILEREK disarida: webde tarayici tanıyicisi kendi
   * bitiriyor ve hic ust sinir yok, mobilde 8000 bir emniyet tavani. Ikisi
   * ayni birimi olcmuyor, karsilastirmak yanlis olurdu. */
  {
    const webDers = sil(read("src/components/lessons/lesson-player.tsx"));
    const mobDers = sil(read("mobile/src/screens/LessonScreen.tsx"));
    const mobYuruyus = sil(read("mobile/src/screens/WalkModeScreen.tsx"));
    const al = (src, re) => (src.match(re) ?? [])[1] ?? "yok";
    sameList(
      "ders konusma penceresi",
      [
        "web=" + al(webDers, /SILENCE_MS = (\d+)/),
        "mobil=" + al(mobDers, /LISTEN_CEILING_MS = (\d+)/),
        "mobil sabiti kullaniyor=" + (/listenOnce\(currentTargetLocale\(\), LISTEN_CEILING_MS\)/.test(mobDers) ? "evet" : "HAYIR"),
        /* Yuruyus ikilisi ADIYLA duruyor mu: rakama donerse ortak sabit
           taramasi onlari goremez ve sessizce ayrisirlar. */
        "yuruyus cevabi adiyla=" + (/listenOnce\(currentTargetLocale\(\), ANSWER_WINDOW_MS\)/.test(mobYuruyus) ? "evet" : "HAYIR"),
        "yuruyus onayi adiyla=" + (/listenOnce\(currentTargetLocale\(\), CONFIRM_SILENCE_MS\)/.test(mobYuruyus) ? "evet" : "HAYIR"),
      ],
      ["web=12000", "mobil=12000", "mobil sabiti kullaniyor=evet", "yuruyus cevabi adiyla=evet", "yuruyus onayi adiyla=evet"],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 195. yorumun soyledigi ama olculmeyen iki zorunluluk ────────────
   * Tarama yon degistirdi: sayilardan YORUMLARA. Kodun icinde "su su ile ayni
   * olmali" diyen cumleleri dolasip hangisinin kapisi yok diye bakildi. Iki
   * tanesi kirli cikti:
   *
   *   a) `skills/speaking-player` icinde `PASS = 80` duruyordu ve basinda
   *      "lib/pronounce'daki PASS_SCORE ile ayni olmali" yaziliydi. Esik
   *      `lib/pronounce-const` icine alindi, ikisi de oradan okuyor.
   *   b) Ayni dosyadaki `MAX_MS = 8000`in yorumu "sinav oynaticisiyla ayni"
   *      diyordu ve YANLISTI - sinav 12 saniye kaydediyor. Yanlis yorum
   *      yokluktan kotu: sonraki okuyan yanlis tarafi duzeltir. Yorum
   *      gerekcesiyle duzeltildi ve kapi ikisinin AYRI kalmasini bekliyor.
   *
   * Ucuncu bulgu sayiyla ilgiliydi ve iki platform arasindaydi: seviye
   * sinavinin konusma maddesinde web 12 saniye kaydediyor, mobil 8 saniye
   * dinliyordu - ayni sinav, ayni soru, farkli sure. Ikisi 12'de eslendi ve
   * sayi AYNI ADLA yazildigi icin ("ortak sayisal sabitler") ayrisma
   * kendiliginden yakalaniyor; alt cizgili `12_000` o taramaya girmedigi icin
   * duz yazildi. */
  {
    const konusma = sil(read("src/components/skills/speaking-player.tsx"));
    const sinavWeb = sil(read("src/components/exam-player.tsx"));
    const sinavMob = sil(read("mobile/src/screens/ExamScreen.tsx"));
    const al = (src, re) => (src.match(re) ?? [])[1] ?? "yok";
    sameList(
      "telaffuz esigi ve kayit sureleri",
      [
        "beceri esigi=" + (/\bPASS_SCORE\b/.test(konusma) && !/const PASS =/.test(konusma) ? "kaynaktan" : "kendi kopyasi"),
        "beceri kaydi=" + al(konusma, /MAX_MS = (\d+)/),
        "sinav kaydi (web)=" + al(sinavWeb, /SPEAK_MAX_MS = (\d+)/),
        "sinav dinlemesi (mobil)=" + al(sinavMob, /SPEAK_MAX_MS = (\d+)/),
        "mobil sabiti kullaniyor=" + (/listenOnce\(currentTargetLocale\(\), SPEAK_MAX_MS\)/.test(sinavMob) ? "evet" : "HAYIR"),
      ],
      [
        "beceri esigi=kaynaktan",
        /* Beceri kaydi sinavdan KISA kalmali: tek cumle soyleniyor. Sayi
           burada YAZILI cunku "ayri olmali"yi ancak mutlak bir olcut
           tutabilir - iki tarafi karsilastirmak onlari esitlemeye davet
           ederdi. */
        "beceri kaydi=8000",
        "sinav kaydi (web)=12000",
        "sinav dinlemesi (mobil)=12000",
        "mobil sabiti kullaniyor=evet",
      ],
      "bulunan",
      "beklenen",
    );
  }

  /* ── 194. panelin varsayilani ile gecme notu ──────────────────────────
   * `mock.unlockPct` (sonraki kagit paketini acan yuzde) ile `MOCK_PASS_PCT`
   * (kagidin gecme notu) ayni olmak zorunda ve bunu SOYLEYEN bir yorum vardi
   * (`gates.ts`, `unlockPct` alaninin aciklamasi: "Varsayilan MOCK_PASS_PCT
   * ile ayni olmali"). Olcen bir sey yoktu - zorunlulugu yazan cumle, tam da
   * bu turlarda tekrar tekrar cikan sinif.
   *
   * Ayrismanin bedeli kullaniciya iki farkli "basari" tanimi gostermek olurdu:
   * kagidi "gecti" diye isaretlenen biri sonraki paketi acamazdi. Varsayilan
   * artik sabitin KENDISI; kapi hem esitligi hem de sayinin elle yazilmamis
   * olmasini okuyor (esitlik tek basina yetmez - ikisi birlikte degistirilip
   * ayni sayiya getirilebilir ve baglanti yine kopuk kalir). */
  {
    const gates = sil(read("src/lib/premium/gates.ts"));
    const pas = (read("src/lib/mock-exams/types.ts").match(/MOCK_PASS_PCT = (\d+)/) ?? [])[1] ?? "yok";
    /* VARSAYILANLAR blogundan sonrasi. Ilk yazim dosyanin tamamina bakiyordu
       ve TIP bildirimini (`unlockPct: number;`) okuyup "number;" buldu - yine
       komsuyu olcmek. Varsayilan, tipin degil `DEFAULT_PREMIUM_CONFIG`in
       icinde. */
    const varsayilanlar = gates.slice(gates.indexOf("DEFAULT_PREMIUM_CONFIG"));
    const acilis = (varsayilanlar.match(/unlockPct: ([^,\n]+)/) ?? [])[1]?.trim() ?? "yok";
    sameList(
      "paket acilis yuzdesi gecme notundan",
      ["varsayilan=" + acilis, "gecme notu okunabildi=" + (pas === "yok" ? "HAYIR" : "evet")],
      ["varsayilan=MOCK_PASS_PCT", "gecme notu okunabildi=evet"],
      "bulunan",
      "beklenen",
    );
  }

  /* 193'un ikinci yarisi: cumle yanittan beslense de YANIT o alani
     tasimiyorsa ekran bos basar. Iki istemci de alani gormeli - mobil
     kendi tipini yaziyor (uzak uca bagli), web ortak tipi ice aliyor. */
  sameList(
    "davet odulu yanitta var",
    [
      "sunucu=" + (/rewardDays: cfg\.referral\.rewardDays/.test(sil(read("src/lib/premium/referral.ts"))) ? "donduruyor" : "DONDURMUYOR"),
      "ortak tip=" + (/rewardDays: number/.test(sil(read("src/lib/premium/referral-types.ts"))) ? "var" : "YOK"),
      "web=" + (/\bReferralStats\b/.test(sil(read("src/components/premium-paywall.tsx"))) ? "ortak tipten" : "kendi kopyasi"),
      "mobil=" + (/rewardDays: number/.test(sil(read("mobile/src/lib/premium.ts"))) ? "var" : "YOK"),
    ],
    ["sunucu=donduruyor", "ortak tip=var", "web=ortak tipten", "mobil=var"],
    "bulunan",
    "beklenen",
  );

  /* 187'nin ikinci yarisi: cumle sabitten beslense de KARARI veren
     karsilastirma elle yazilmis bir sayiysa ikisi ayrisabilir - kullanici
     "gecti" yazan bir ekranda gecmemis sayilir. */
  sameList(
    "rol yapma esigi kararda da kaynaktan",
    [
      "web=" + (/overall >= EXAM_PASS_SCORE/.test(sil(read("src/components/lessons/roleplay-exam.tsx"))) ? "kaynaktan" : "elle yazili"),
      "mobil=" + (/overall >= EXAM_PASS_SCORE/.test(sil(read("mobile/src/screens/RoleplayExamScreen.tsx"))) ? "kaynaktan" : "elle yazili"),
    ],
    ["web=kaynaktan", "mobil=kaynaktan"],
    "bulunan",
    "beklenen",
  );
}

console.log(
  fails === 0
    ? "\n" + C.ok + C.b + "KAYIT DEFTERLERI ESIT" + C.off + "\n"
    : "\n" + C.bad + C.b + fails + " AYRISMA" + C.off + "\n",
);
process.exit(fails === 0 ? 0 : 1);
